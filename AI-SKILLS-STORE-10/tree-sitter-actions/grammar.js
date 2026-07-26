// Import patterns from shared source
const PATTERNS = require('./patterns.js');

// Configuration
const MAX_DEPTH = 5;

// Generate depth rules programmatically
const depthRules = {};
for (let i = 1; i <= MAX_DEPTH; i++) {
  // Marker rule: >, >>, >>>, etc.
  depthRules[`depth${i}_marker`] = $ => '>'.repeat(i);

  // Action rule with optional children (leaf level has no children)
  const isLeaf = i === MAX_DEPTH;
  depthRules[`depth${i}_action`] = isLeaf ?
    $ => seq(
      field('marker', $[`depth${i}_marker`]),
      $._action_body
    ) :
    $ => seq(
      field('marker', $[`depth${i}_marker`]),
      $._action_body,
      repeat(field('child', $[`depth${i + 1}_action`]))
    );
}

module.exports = grammar({
  name: 'actions',

  extras: $ => [
    /\s/, // Allow whitespace anywhere
  ],

  rules: {
    source_file: $ => repeat($.root_action),

    // Common action body (state + name + metadata)
    _action_body: $ => seq(
      field('state', $.state),
      field('name', $.name),
      repeat(field('metadata', $._metadata))
    ),

    // Root level actions (depth 0)
    root_action: $ => seq(
      $._action_body,
      repeat(field('child', $.depth1_action))
    ),

    // Spread generated depth rules (depth1-5 markers and actions)
    ...depthRules,

    // State markers - explicit state names per specification
    state: $ => seq(
      field('open', $.state_open),
      field('value', choice(
        $.state_not_started,
        $.state_completed,
        $.state_in_progress,
        $.state_blocked,
        $.state_cancelled
      )),
      field('close', $.state_close)
    ),

    state_open: $ => '[',
    state_close: $ => ']',

    state_not_started: $ => ' ',
    state_completed: $ => 'x',
    state_in_progress: $ => '-',
    state_blocked: $ => '=',
    state_cancelled: $ => '_',

    // Action name - can contain text and links
    name: $ => repeat1(choice(
      $.link,
      $.name_text_chunk
    )),

    // Text chunk within name (excludes metadata markers and [)
    name_text_chunk: $ => PATTERNS.safe_text,

    // Metadata fields (hidden node, children are the actual metadata)
    _metadata: $ => choice(
      $.description,
      $.priority,
      $.story,
      $.context,
      $.do_date,
      $.due_date,
      $.completed_date,
      $.created_date,
      $.predecessor,
      $.alias,
      $.sequential,
      $.id
    ),

    // Description: delimited by $ ... $ (can span lines, content is optional)
    description: $ => prec.right(seq(
      field('icon', $.description_marker),
      field('text', optional($.description_content)),
      field('close', $.description_marker)
    )),

    description_content: $ => repeat1(choice(
      $.link,
      $.description_text_chunk
    )),

    description_marker: $ => token('$'),

    // Text chunk within description (excludes metadata markers except $ and excludes [)
    description_text_chunk: $ => PATTERNS.description_text,

    // Link: [[text|url]] or [[url]]
    link: $ => seq(
      '[[',
      choice(
        // Full form: [[text|url]]
        seq(
          field('text', $.link_text),
          '|',
          field('url', $.link_url)
        ),
        // Shorthand: [[url]]
        field('url', $.link_url)
      ),
      ']]'
    ),

    // Link text (everything except | and ])
    link_text: $ => /[^\|\]]+/,

    // Link URL (everything except | and ])
    link_url: $ => /[^\|\]]+/,

    // Priority: ! followed by number (icon_value archetype)
    priority: $ => seq(
      field('icon', '!'),
      field('value', $.priority_level)
    ),

    // Priority level (1-5)
    priority_level: $ => PATTERNS.number,

    // Story/Project: * followed by name (icon_value archetype)
    story: $ => seq(
      field('icon', '*'),
      field('value', $.story_name)
    ),

    // Story name
    story_name: $ => PATTERNS.safe_text,

    // Context: + followed by comma-separated tags (icon_list archetype)
    context: $ => seq(
      field('icon', '+'),
      optional(seq(
        field('item', $.tag),
        repeat(seq(',', optional(field('item', $.tag))))
      ))
    ),

    // Individual context tag
    tag: $ => PATTERNS.tag_text,

    // Do-date/time: @ followed by ISO 8601 date/time, optional duration
    // (icon_composite archetype)
    do_date: $ => seq(
      field('icon', '@'),
      field('datetime', $.datetime),
      optional(field('duration', $.duration))
    ),

    // Due-date/time: : followed by ISO 8601 date/time, optional duration
    // (icon_composite archetype)
    due_date: $ => seq(
      field('icon', ':'),
      field('datetime', $.datetime),
      optional(field('duration', $.duration))
    ),

    // ISO 8601 datetime: YYYY-MM-DD or YYYY-MM-DDTHH:MM or YYYY-MM-DDTHH:MM:SS with optional timezone
    datetime: $ => /[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}(:[0-9]{2}(\.[0-9]+)?)?(Z|[+-][0-9]{2}:?[0-9]{2})?)?/,

    // Duration: D followed by number of minutes
    duration: $ => seq(
      'D',
      field('minutes', $.minutes)
    ),

    minutes: $ => PATTERNS.number,

    // Completed date: % followed by ISO 8601 date/time (icon_datetime archetype)
    completed_date: $ => seq(
      field('icon', '%'),
      field('datetime', $.datetime)
    ),

    // Created date: ^ followed by ISO 8601 date/time (icon_datetime archetype)
    created_date: $ => seq(
      field('icon', '^'),
      field('datetime', $.datetime)
    ),

    // Predecessor: < followed by action name or UUID (icon_value archetype)
    predecessor: $ => seq(
      field('icon', '<'),
      field('value', $.predecessor_reference)
    ),

    // Predecessor reference can be a UUID, short UUID, or an action name
    predecessor_reference: $ => choice(
      $.uuid_value,
      $.short_uuid_value,
      $.predecessor_name
    ),

    // Predecessor name - action name reference (not UUID)
    // Excludes characters that would indicate UUID format and metadata markers
    predecessor_name: $ => PATTERNS.safe_text,

    // UUID value: hyphenated (standard) or compact (32 hex, no dashes)
    // prec(2): wins over short_uuid_value and predecessor_name
    uuid_value: $ => choice(
      token(prec(2, PATTERNS.uuid_hyphenated)),
      token(prec(2, PATTERNS.uuid_compact)),
    ),

    // Short UUID value - 8 or more contiguous hex chars (no dashes), like git short hashes
    // prec(1): wins over predecessor_name (safe_text) when the input is pure hex
    short_uuid_value: $ => token(prec(1, PATTERNS.short_uuid)),

    // Malformed id value - a permissive fallback so a bad/half-typed id parses
    // as an `id` node rather than erroring the line (relaxed parser, Decision 6).
    // prec(1) keeps a real uuid_value (prec 2) winning when the text is valid.
    malformed_id: $ => token(prec(1, PATTERNS.malformed_id)),

    // Alias: = followed by alias name (icon_value archetype)
    alias: $ => seq(
      field('icon', '='),
      optional(field('value', $.alias_name))
    ),

    // Alias name - alphanumeric, underscores, hyphens
    alias_name: $ => PATTERNS.identifier,

    // Sequential marker: ~ indicates children are sequential (marker_only archetype)
    sequential: $ => field('icon', '~'),

    // ID: # followed by a UUID, or a permissive malformed fallback the linter
    // then flags as invalid (E006) or incomplete (W013). (icon_value archetype)
    id: $ => seq(
      field('icon', $.id_hash),
      field('value', choice($.uuid_value, $.malformed_id))
    ),

    id_hash: $ => '#',
  }
});
