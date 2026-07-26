# Tree Sitter Actions File Format Parser
===============================
A simple Tree Sitter parser for the custom `.actions` file format.

## Usage
1. Generate the parser:
    ```bash
    tree-sitter generate
    ```
2. Test the parser on an example file:
    ```bash
    tree-sitter parse examples/with_priority.actions
    ```
3. Use the parser in your project as needed, directly with the CLI is fine
  - we can also build the parser into other apps by using this as a library in a client applications
  - or maybe you have an editor that supports tree-sitter grammars, you can use this grammar to get syntax highlighting and other features for `.actions` files!
4. For tools that export to JSON, use the included JSON Schema to validate:
    ```bash
    npm run generate:schema  # Regenerate schema from patterns
    ```

For detailed usage examples (Rust library, editors, JSON validation), see [docs/usage.md](docs/usage.md).
# Overview
This is a simple parser for the custom `.actions` [File Format](docs/action_specification.md) to be used in whatever form may be needed.

Actions can be thought of as planned, intended actions to be taken on by an agent.
- Could be fun plans you have for a trip
- Could outline the needs for an LLM to follow
- This could be traditional Tasks

This could be seen as a set of Intended Actions from a CIO ontology standpoint, but the usecases can vary these are just what we have in mind upon writing.

## Purpose
My purpose in creating this parser is to create the intention management file format that the world deserved. Slightly more complex than todo.txt, but not by much, while still being a plaintext format that can be used in whatever format may work for you.

In particular, the values are (you can also read this in the file specification linked above):
- Human Readable and Writable
  - Minimal syntax to remember and change
  - treesitter is tolerant of errors, trying to parse as best as possible
- Unambigous parsing parameters to make it easy to parse for machines
  - For example, we do NOT use whitespace to indicate structure, instead, we use specific characters like `>` with a recurrence for how many levels deep you are
  - Great lengths have been taken to make reading the tree easy for implementors, using only normal rules and ensuring we are careful about the use of `labels` vs syntax tree formats

## Quick Example

```actions
[ ] Take out trash @2025-01-21T19:00 #01950000-0000-7000-8000-000000000001
[x] Team meeting $ Discuss Q1 roadmap !1 *Projects +Work @2025-01-20T14:00 D60 %2025-01-20T15:05
[ ] Parent task >[ ] Child task >>[ ] Grandchild task
```

**Key features:**
- **States**: `[ ]` not started, `[x]` completed, `[-]` in-progress, `[=]` blocked, `[_]` cancelled
- **Metadata**: `$` description, `!` priority, `*` story/project, `+` contexts (tags)
- **Scheduling**: `@` do-date/time, `D` duration (minutes); recurring schedules are represented in `.ics` files
- **Tracking**: `%` completed date, `#` UUID
- **Hierarchy**: `>` child actions (up to 5 levels deep)

See [docs/action_specification.md](docs/action_specification.md) for complete syntax reference.

## Usecases
This is to serve as a simple file format that can be used in several contexts:
- As a parsing library within any editor that supports tree-sitter grammars.
  - at its simplest, using this parser is as simple as installing the tree-sitter library and editing your own `.actions` files! things like syntax highlighting, indentation, and folding should "just work" (knock on wood)
- As a core parsing library for downstream projects like the rust CLI im working on
  - Allows the bulk of the parsing to be done by this grammar, with things like the CLI and guis just using the tree to generate data and do their own functionality
    - In particular, being able to parse this data, put it into a proper data structure or even database, and then re-encode the data back into the `.actions` format is a key usecase
- **Schemas for validation and storage** - The repository provides bundled schemas for downstream tools:
  - **JSON Schema** - Canonical [JSON Schema](schema/actions.schema.json) for validating serialized `.actions` data
    - Generated from the same regex patterns used by the parser to ensure consistency
    - Available in npm package (`tree-sitter-actions/schema`) and Rust crate (`ACTIONS_SCHEMA` constant)
    - Validates JSON exports match the [canonical format](docs/action_specification.md#json-serialization-format)
  - **SQL Schema** - Reference [SQL schema](schema/actions.sql) for persistent database storage
    - Normalized relational schema designed for SQLite (adaptable to PostgreSQL, MySQL, etc.)
    - Available in npm package (`tree-sitter-actions/schema/sql`) and Rust crate (`ACTIONS_SQL_SCHEMA` constant)
    - Use as-is or customize for your application (add user_id, timestamps, etc.)
    - See [SQL storage documentation](docs/action_specification.md#sql-storage-schema) for details
- As a reading tool for things like LLM agents who actually prefer viewing data as AST trees rather than plaintext when it comes to reading data

# Querying Actions

Once you've parsed `.actions` files, you'll need to query and filter the data. This project provides three complementary approaches depending on your needs:

## Tree-Sitter Queries (Structural Pattern Matching)

**Best for:** Editor features, simple filtering, syntax-level tasks

Tree-sitter queries work directly on the AST without conversion. Great for:
- Syntax highlighting and code folding in editors
- Finding actions by simple patterns (all P1 actions, completed items, etc.)
- Quick filtering without data conversion overhead

```bash
# Find all priority 1 actions
tree-sitter query queries/actions/p1-actions.scm examples/with_priority.actions

# Find all completed actions
tree-sitter query queries/actions/completed-actions.scm examples/*.actions
```

**Example queries provided:**
- State filters: `completed-actions.scm`, `not-started.scm`, `in-progress.scm`, `blocked-actions.scm`
- Priority filters: `p1-actions.scm`
- Structure filters: `with-children.scm`, `with_specific_story.scm`

See [`queries/actions/`](queries/actions/) for all available queries and usage examples.

## JSON + jq (Data Pipeline Processing)

**Best for:** Ad-hoc queries, Unix pipelines, one-off scripts

After converting `.actions` to JSON (using the canonical [JSON Schema](schema/actions.schema.json)), use `jq` for powerful filtering and transformations:

```bash
# Find P1 actions (assuming you have actions-to-json converter)
actions-to-json tasks.actions | jq -f examples/queries/jq/p1-actions.jq

# Get completion statistics by project
jq -f examples/queries/jq/completion-stats.jq tasks.json

# Filter by context
jq -f examples/queries/jq/by-context.jq --arg ctx "work" tasks.json
```

**Example queries provided:**
- Filters: `p1-actions.jq`, `completed-actions.jq`, `by-context.jq`, `by-story.jq`
- Aggregations: `completion-stats.jq`, `priority-summary.jq`
- Transformations: `flatten-all.jq`, `with-children.jq`

See [`examples/queries/jq/`](examples/queries/jq/) for all examples and usage patterns.

## SQL (Application Storage)

**Best for:** Applications, persistent storage, complex queries at scale

The canonical [SQL schema](schema/actions.sql) provides normalized relational storage for applications that need:
- Complex multi-criteria queries with indexes
- Persistent storage and concurrent access
- Relational aggregations and reporting
- Integration with existing database systems

```sql
-- Find P1 actions in 'work' context due this week
SELECT a.* FROM actions a
JOIN action_contexts c ON a.id = c.action_id
WHERE a.priority = 1
  AND c.context = 'work'
  AND a.do_datetime >= date('now', 'weekday 0', '-7 days');

-- Completion rate by project
SELECT story,
       COUNT(*) as total,
       SUM(CASE WHEN state = 'completed' THEN 1 ELSE 0 END) as completed
FROM actions
WHERE story IS NOT NULL
GROUP BY story;
```

**Schema includes:**
- Normalized tables: `actions`, `action_contexts` (plus optional extension tables as needed by implementations)
- Indexes for common query patterns
- Views for convenient access
- Adapts to SQLite, PostgreSQL, MySQL

See [`schema/actions.sql`](schema/actions.sql) for the complete schema and [`examples/queries/sql/`](examples/queries/sql/) for 40+ example queries.

## Which Approach to Use?

| Use Case | Recommended Approach | Why |
|----------|---------------------|-----|
| Editor syntax highlighting | Tree-sitter queries | Native, fast, no conversion |
| Quick filter in terminal | Tree-sitter or jq | Minimal overhead |
| One-off data analysis | jq | Powerful, composable, no setup |
| Task management app | SQL | Persistent, indexed, concurrent |
| Complex reports | SQL | Aggregations, joins, performance |
| Pipeline processing | jq | Unix philosophy, composable |

**You can use multiple approaches together:**
```bash
# Parse → JSON → jq filter → SQL import → complex queries
actions-to-json tasks.actions | \
  jq '.actions[] | select(.priority == 1)' | \
  sqlite3 myapp.db < import-filtered.sql
```

For complete documentation on querying, see:
- [Action Specification](docs/action_specification.md) - Includes JSON and SQL serialization formats
- [`queries/actions/README.md`](queries/actions/README.md) - Tree-sitter query patterns
- [`examples/queries/jq/README.md`](examples/queries/jq/README.md) - jq query examples
- [`examples/queries/sql/README.md`](examples/queries/sql/README.md) - SQL query examples


# Inspirations
- [Neovim](https://neovim.io/) was one of the first editors to use tree-sitter for syntax highlighting and code understanding and gave me a glimpse into the power and speed of tree-sitter
- [Todoist](https://www.todoist.com/) has been my main GTD tool, and while i want to create a FOSS alternative here, much of my design language has come from using todoist for years
  - in particular, the "quick add" syntax of todoist has been a big inspiration for the syntax of this file format
  - As well as deep calendar integration to allow tasks to be scheduled
  - I tinkered with creating a todoist client, but i feel uneasy about building projects around a closed source, proprietary API that may change at any time
- [Taskwarrior](https://taskwarrior.org/) showed the power we can get if we work with data rather than text alone.
  - They made the design decision to use entirely structured data, having people do commands that ultimately get saved in SQLite. A good, solid system but I love working in my editor, so having a plaintext format as the base ground upone which we can build feels more right for my sensibilities
  - [Azure Devops](https://azure.microsoft.com/en-us/products/devops) is what we use at my employer and while it has all the bad parts of microsoft, it also does a good job of placing the graph database as a core part of the application and has always stuck with me as a good example of how to think about tasks as more than just text
    - in particular, the ability to make hierarchical tasks, link tasks together, and have rich metadata has always been something ive wanted to see in a plaintext format
- [Neorg](https://github.com/nvim-neorg/neorg) is a tree-sitter based note taking system that uses treesitter as its core engine for parsing notes, and inspired me to think about how to use tree-sitter for my own plaintext formats
  - in addition, i feel neorg made many good syntactic decisions as well like the discipline of NOT using whitespace as parsing data.
    - The reason this file format exists rather than using Neorg directly is that Neorg is a big project that tries to do much more than actions, and it didnt feel right using it for this small purpose.
- [Org Mode](https://orgmode.org/) is the granddaddy of plaintext task and while, like neorg, it tries to do too much for my purpose, one cannot deny the power that org mode users enjoy and i believe that comes directly from a strong plaintext format specification that has built upon over decades from brilliant users.
- [todo.txt](todotxt.org) to show the power of simplicity in plaintext task management and being something that ive seen inspire many great engineers when using the most simple tools
  - Still, for this purpose, we needed more things than what we got

# Formatting

The repository includes a [Topiary](https://topiary.tweag.io/) formatter for `.actions` files. The formatter enforces **vertical spacing only** - each action on its own line. Horizontal spacing and indentation are preserved from input (the format is whitespace-insensitive by design).

## Using the Formatter

```bash
# Format a file
TOPIARY_CONFIG_FILE=.topiary/languages.ncl topiary format myfile.actions

# Format via stdin
cat myfile.actions | TOPIARY_CONFIG_FILE=.topiary/languages.ncl topiary format --language actions --query .topiary/queries/actions.scm
```

## Formatter Scope

The formatter does one thing: ensures each action is on its own line.

**Before:**
```actions
[ ] Task 1[ ] Task 2>[ ] Child
```

**After:**
```actions
[ ] Task 1
[ ] Task 2
>[ ] Child
```

Horizontal spacing (`[x]Task` vs `[x] Task`) and indentation are **not** enforced - the format is whitespace-insensitive, so both are valid. See the [formatting specification](../specifications/formatting.md) for details.

## Testing the Formatter

```bash
npm run test:formatting
```

Test cases are in `examples/formatting/` (symlinked from `specifications/examples/formatting/`).

# Development and Testing

Tests are organized into `examples/`, `test/trees/`, and `test/corpus/` directories that work together to enable reuse by downstream projects.

Run tests:
```bash
npm run test:grammar
```

Regenerate tests after modifying the grammar or examples:
```bash
npm run regen:verify
```

## Neovim Integration Debugging

When working on syntax highlighting and queries for Neovim, use the debugging scripts in `scripts/nvim/`:

```bash
# Check if Neovim can find the queries
nvim --headless examples/minimal.actions +"source scripts/nvim/check_queries.lua" +q

# Test if highlights are capturing correctly
nvim --headless examples/recurring_log_example.actions +"source scripts/nvim/test_highlights.lua" +q

# Check if conceal metadata is being applied
nvim --headless examples/minimal.actions +"source scripts/nvim/check_conceal_metadata.lua" +q
```

See `scripts/nvim/README.md` for detailed documentation on debugging Neovim integration issues.

For details on the test architecture, build system, and contributing workflow, see [docs/contributing.md](docs/contributing.md).
