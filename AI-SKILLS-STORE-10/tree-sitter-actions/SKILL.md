---
name: tree-sitter-actions
description: Tree-sitter parser and grammar for the .actions plaintext task/action file format. TRIGGER when code references '.actions' files, tree-sitter grammars, or plaintext task management formats.
---

# Tree-Sitter Actions

A tree-sitter parser for the custom `.actions` plaintext file format — a task/action management format with metadata, hierarchy, and scheduling.

## Package Exports

```json
{
  ".": "./lib/index.js",
  "./grammar": "./bindings/node/index.js",
  "./parser": "./parser.js",
  "./patterns": "./patterns.js",
  "./schema": "./schema/actions.schema.json",
  "./schema/sql": "./schema/actions.sql"
}
```

## Quick Example

```actions
[ ] Take out trash @2025-01-21T19:00 #01950000-0000-7000-8000-000000000001
[x] Team meeting $ Discuss Q1 roadmap !1 *Projects +Work @2025-01-20T14:00 D60 %2025-01-20T15:05
[ ] Parent task >[ ] Child task >>[ ] Grandchild task
```

## Action Syntax

### States
- `[ ]` — not started
- `[x]` — completed
- `[-]` — in-progress
- `[=]` — blocked
- `[_]` — cancelled

### Metadata Fields
- `$` description
- `!` priority (e.g., `!1`, `!2`)
- `*` story/project
- `+` context/tag (e.g., `+Work`, `+Personal`)
- `@` do-date/time (ISO 8601)
- `D` duration in minutes (e.g., `D60`)
- `%` completed date/time
- `#` UUID

### Hierarchy
- `>` child task (up to 5 levels deep)
- `>>` grandchild, `>>>` great-grandchild, etc.

## Commands

```bash
# Build the parser
tree-sitter generate && tree-sitter build

# Test the parser
tree-sitter parse examples/with_priority.actions
npm run test:all

# Generate schema from patterns
npm run generate:schema

# Test formatting
npm run test:formatting

# Test grammar
npm run test:grammar

# Regenerate test trees after grammar changes
npm run regen:verify
```

## Querying Actions

### Tree-Sitter Queries (Structural Pattern Matching)

Best for editor features and syntax-level filtering.

```bash
# Find all priority 1 actions
tree-sitter query queries/actions/p1-actions.scm examples/*.actions

# Find all completed actions
tree-sitter query queries/actions/completed-actions.scm examples/*.actions
```

Available query files in `queries/actions/`:
- State: `completed-actions.scm`, `not-started.scm`, `in-progress.scm`, `blocked-actions.scm`
- Priority: `p1-actions.scm`
- Structure: `with-children.scm`, `with_specific_story.scm`

### JSON + jq (Data Pipeline Processing)

For ad-hoc queries and Unix pipeline processing.

```bash
# Find P1 actions
actions-to-json tasks.actions | jq -f examples/queries/jq/p1-actions.jq

# Completion stats by project
jq -f examples/queries/jq/completion-stats.jq tasks.json
```

Available query files in `examples/queries/jq/`:
- Filters: `p1-actions.jq`, `completed-actions.jq`, `by-context.jq`, `by-story.jq`
- Aggregations: `completion-stats.jq`, `priority-summary.jq`
- Transformations: `flatten-all.jq`, `with-children.jq`

### SQL (Application Storage)

For persistent storage and complex queries. Schema in `schema/actions.sql`.

```sql
-- Find P1 actions in 'work' context due this week
SELECT a.* FROM actions a
JOIN action_contexts c ON a.id = c.action_id
WHERE a.priority = 1 AND c.context = 'work'
  AND a.do_datetime >= date('now', 'weekday 0', '-7 days');

-- Completion rate by project
SELECT story, COUNT(*) as total,
  SUM(CASE WHEN state = 'completed' THEN 1 ELSE 0 END) as completed
FROM actions WHERE story IS NOT NULL GROUP BY story;
```

## Formatting

Uses Topiary formatter. Enforces vertical spacing (one action per line).

```bash
TOPIARY_CONFIG_FILE=.topiary/languages.ncl topiary format myfile.actions
```

## Neovim Debugging

```bash
# Check if queries are found
nvim --headless examples/minimal.actions +"source scripts/nvim/check_queries.lua" +q

# Test highlight captures
nvim --headless examples/recurring_log_example.actions +"source scripts/nvim/test_highlights.lua" +q
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run test:all` | Run all tests (grammar, schema, formatting, highlights) |
| `npm run test:grammar` | Run tree-sitter tests |
| `npm run test:schema` | Validate JSON schema |
| `npm run test:formatting` | Run formatting tests |
| `npm run test:highlights` | Run highlight query tests |
| `npm run build:parser` | Generate grammar + build + schema |
| `npm run generate:schema` | Regenerate JSON schema from patterns |
| `npm run regen:verify` | Regenerate all test fixtures + verify |
