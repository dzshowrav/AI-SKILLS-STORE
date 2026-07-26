/**
 * Regex patterns used throughout the grammar
 *
 * Exports actual RegExp objects to avoid double-escaping hell.
 * Use these directly in grammar.js rules (no `new RegExp()` needed).
 *
 * Structural Archetypes:
 * - icon_value: icon + text (priority, story, alias, predecessor, id)
 * - icon_datetime: icon + datetime (completed_date, created_date)
 * - icon_composite: icon + parts (do_date: datetime, duration)
 * - icon_list: icon + items (context)
 * - icon_rich_text: icon + text/links (description)
 * - marker_only: just icon (sequential)
 */

// Characters that introduce metadata fields
// Updated to include = (alias) and ~ (sequential)
const METADATA_CHARS = '$!*+@%^#><~=:';

// Build a character class that excludes specific chars plus newline and brackets
const notChars = (chars) => new RegExp(`[^\\n${escapeForCharClass(chars)}\\[\\]]+`);

// Same as notChars, but never lets the match start or end on whitespace.
// Interior whitespace is still allowed (so "do something" stays one token
// worth of prose), but trailing space before a following metadata sigil is
// left for the formatter to own, instead of being silently swallowed into
// this token's own byte range. Without this, a greedy tree-sitter token can
// absorb the exact same space a topiary `@prepend_space` rule also adds,
// producing a double space that depends on which field precedes the
// boundary rather than on any query rule.
const notCharsTrimmed = (chars) => {
  const excluded = escapeForCharClass(chars);
  const boundary = `[^\\s\\n${excluded}\\[\\]]`;
  const interior = `[^\\n${excluded}\\[\\]]`;
  return new RegExp(`${boundary}(?:${interior}*${boundary})?`);
};

// Escape chars that have special meaning inside a character class. `[` is
// included because tree-sitter's Rust regex engine treats a bare `[` inside a
// class as the start of a nested class (set operations), not a literal.
function escapeForCharClass(str) {
  return str.replace(/[\^\-\]\[\\]/g, '\\$&');
}

// A single escape sequence: a backslash followed by any escapable char — a
// metadata sigil, a bracket, or a backslash itself. This is what lets a
// freeform field hold a literal reserved char (\$500, \#42, \\ for a literal
// backslash) written with a leading backslash.
const escapeSeq = (chars) => `\\\\[${escapeForCharClass(chars + '[]\\')}]`;

// Like notCharsTrimmed, but a backslash-escape sequence counts as ordinary
// content and may appear at the trimmed boundaries too. A bare backslash
// before a non-escapable char stays literal (a lenient parse); the formatter
// always writes \\ for a literal backslash, so its own output round-trips
// unambiguously.
const escapedTextTrimmed = (chars) => {
  const excluded = escapeForCharClass(chars);
  const esc = escapeSeq(chars);
  const boundary = `(?:${esc}|[^\\s\\n${excluded}\\[\\]])`;
  const interior = `(?:${esc}|[^\\n${excluded}\\[\\]])`;
  return new RegExp(`${boundary}(?:${interior}*${boundary})?`);
};

module.exports = {
  // Reference for documentation/other tools
  metadata_chars: METADATA_CHARS,

  // Structural primitives (consolidated patterns)
  safe_text: escapedTextTrimmed(METADATA_CHARS), // General text excluding metadata markers (but \-escapes allowed), trailing space left to the formatter
  identifier: /[a-zA-Z0-9_-]+/, // Alphanumeric identifiers with underscores/hyphens
  number: /[0-9]+/, // Numeric values
  tag_text: notCharsTrimmed(METADATA_CHARS + ','), // Tag text (excludes comma for list separation), trailing space left to the formatter
  // Description text (delimited by $, can span lines; excludes [ so links can
  // parse). A backslash-escape (\$ \[ \] \\) counts as literal content, so a
  // description can hold a literal $ without closing the block.
  //
  // Trimmed like safe_text/tag_text: the match never starts or ends on
  // whitespace, so a space adjacent to a link or the closing $ is left as an
  // unowned gap for the formatter to own -- not baked into this leaf's byte
  // range. Without this, topiary's reconstructed spacing stacked on top of the
  // swallowed space and produced a non-idempotent double space around links.
  // Interior whitespace (including newlines) is still allowed. Unlike
  // safe_text this excludes only $ and [ (not every metadata sigil), because
  // inside a description !@%+ etc. are ordinary text.
  description_text: /(?:\\[$\[\]\\]|[^\s$\[])(?:(?:\\[$\[\]\\]|[^$\[])*(?:\\[$\[\]\\]|[^\s$\[]))?/,

  // UUID patterns
  // Full hyphenated UUID (standard format)
  uuid_hyphenated: /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/,
  // Compact 32-char UUID (no dashes)
  uuid_compact: /[0-9a-fA-F]{32}/,
  // Short UUID is 8 or more contiguous hex chars (no dashes), like git short hashes
  // Written as {8}[hex]* instead of {8,} — tree-sitter's DFA handles the split form greedily
  short_uuid: /[0-9a-fA-F]{8}[0-9a-fA-F]*/,
  // Malformed id: a permissive run of alphanumerics/hyphens accepted after `#`
  // so a bad or half-typed id (#123, #abc-def, #01950000-0000-7000-8000) forms an
  // `id` node instead of erroring the whole line. The grammar stays relaxed
  // (Decision 6); the linter classifies the captured text as invalid (E006) or
  // incomplete (W013). Lower precedence than uuid_value, so a real uuid still
  // parses as a uuid.
  malformed_id: /[0-9A-Za-z][0-9A-Za-z-]*/,

  // Export helper for custom patterns
  notChars,
};
