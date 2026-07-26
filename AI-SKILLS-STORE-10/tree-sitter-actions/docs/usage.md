# Usage Guide

This guide shows how to use the tree-sitter-actions parser in different contexts.

## As a Command-Line Tool

Parse and inspect `.actions` files using the tree-sitter CLI:

```bash
# Parse a file and show the syntax tree
tree-sitter parse examples/with_priority.actions

# Test the grammar
tree-sitter test
```

See the [README](../README.md#development-and-testing) for development workflow details.

## As a Rust Library

### Basic Parsing

Add to your `Cargo.toml`:

```toml
[dependencies]
tree-sitter = "0.25"
tree-sitter-actions = "0.4"
```

Parse `.actions` files:

```rust
use tree_sitter::{Parser, TreeCursor};
use tree_sitter_actions::LANGUAGE;

fn main() {
    let source_code = "[ ] Buy milk\n!1\n";

    let mut parser = Parser::new();
    parser
        .set_language(&LANGUAGE.into())
        .expect("Error loading Actions parser");

    let tree = parser.parse(source_code, None).unwrap();
    let root_node = tree.root_node();

    println!("{}", root_node.to_sexp());
}
```

### Testing with Examples

The library includes all example files for testing your parser implementation:

```rust
use tree_sitter_actions::examples;

#[test]
fn test_parse_priority() {
    let input = examples::properties::WITH_PRIORITY;
    // input contains: "[x] context test !1\n"

    let parsed = my_parse_to_struct(input);
    assert_eq!(parsed.priority, Some(1));
    assert!(parsed.completed);
}

#[test]
fn test_parse_children() {
    let input = examples::children::WITH_CHILDREN;
    // input contains a parent task with child tasks

    let parsed = my_parse_to_struct(input);
    assert_eq!(parsed.children.len(), 2);
    assert_eq!(parsed.children[0].children.len(), 1); // grandchild
}

#[test]
fn test_parse_dates() {
    let input = examples::dates::WITH_DO_DATE;

    let parsed = my_parse_to_struct(input);
    assert!(parsed.do_date.is_some());
}
```

### Available Example Categories

Examples are organized by category:

- `examples::properties::*` - Priority, description, story, context, ID
  - `WITH_PRIORITY`
  - `WITH_DESCRIPTION`
  - `WITH_STORY`
  - `WITH_CONTEXT`
  - `WITH_ID_NO_DASH`
  - `WITH_ID_WITH_DASH`

- `examples::children::*` - Hierarchical task structures
  - `MINIMAL`
  - `WITH_CHILDREN`
  - `WITH_CHILDREN_AND_SECOND_ROOT`

- `examples::dates::*` - Date-related properties
  - `WITH_DO_DATE`
  - `WITH_COMPLETED_DATE`
  - `WITH_RECURRING_DAILY_DO_DATE`
  - `WITH_RECURRING_WEEKLY_DO_DATE`

- `examples::actions::*` - Complex examples
  - `WITH_EVERYTHING` - An action with all possible properties

All examples are `&'static str` constants embedded at compile time, so there's no runtime I/O overhead.

### Walking the Syntax Tree

Use tree-sitter's cursor API to traverse parsed actions:

```rust
use tree_sitter::TreeCursor;

fn walk_tree(cursor: &mut TreeCursor) {
    loop {
        let node = cursor.node();
        println!("{}: {}", node.kind(), node.utf8_text(source).unwrap());

        if cursor.goto_first_child() {
            walk_tree(cursor);
            cursor.goto_parent();
        }

        if !cursor.goto_next_sibling() {
            break;
        }
    }
}
```

See the [actions specification](action_specification.md) for details on the grammar and node types.
- as well as the `test/trees/` directory to see example parse trees

## In Text Editors

Tree-sitter grammars can be used in editors for syntax highlighting, folding, and indentation.

### Neovim

Add to your tree-sitter config:

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.actions = {
  install_info = {
    url = "https://github.com/clearheadtodo-devs/tree-sitter-actions",
    files = {"src/parser.c", "src/scanner.c"},
    branch = "master",
  },
  filetype = "actions",
}
```

Then run `:TSInstall actions` in Neovim.

### Other Editors

Consult your editor's tree-sitter plugin documentation:
- **Helix**: Add to `languages.toml`
- **Emacs**: Use `tree-sitter-langs`
- **VS Code**: Use a tree-sitter extension

## In Other Languages

Tree-sitter has bindings for many languages. The grammar in this repository can be used with:

- **JavaScript/TypeScript**: `npm install tree-sitter-actions`
- **Python**: Use `py-tree-sitter` with this grammar
- **Go**: Use `go-tree-sitter`
- **Rust**: As shown above

The examples in `examples/` directory are available in the published packages and can be used for testing in any language.

### JavaScript/TypeScript Schema Access

Both schemas are available in the npm package:

```javascript
// Import JSON Schema for validation
import jsonSchema from 'tree-sitter-actions/schema';

// Validate serialized data
import Ajv from 'ajv';
const ajv = new Ajv();
const validate = ajv.compile(jsonSchema);
const valid = validate(yourActionsData);
if (!valid) console.error(validate.errors);
```

```javascript
// Import SQL Schema for database initialization
import { readFileSync } from 'fs';
import sqlSchema from 'tree-sitter-actions/schema/sql';

// For ESM, you'll need to read it as text
// The schema is exported as a file path, read it:
const sql = readFileSync(new URL('tree-sitter-actions/schema/sql', import.meta.url), 'utf-8');

// Or in CommonJS:
const sql = require('fs').readFileSync(
  require.resolve('tree-sitter-actions/schema/sql'),
  'utf-8'
);

// Apply to SQLite (using better-sqlite3)
import Database from 'better-sqlite3';
const db = new Database('tasks.db');
db.exec(sql);
```

**Note:** The SQL schema is a reference implementation - customize it for your needs (add user_id, timestamps, custom indexes, etc.).

## Common Patterns

### Validating Actions Files

```rust
fn validate_actions_file(source: &str) -> Result<(), String> {
    let mut parser = Parser::new();
    parser.set_language(&LANGUAGE.into()).unwrap();

    let tree = parser.parse(source, None)
        .ok_or("Failed to parse")?;

    if tree.root_node().has_error() {
        return Err("Parse errors found".to_string());
    }

    Ok(())
}
```

### Converting to Data Structures

```rust
struct Action {
    completed: bool,
    title: String,
    priority: Option<u8>,
    children: Vec<Action>,
}

fn parse_action(node: Node, source: &str) -> Action {
    // Walk the tree and extract fields
    // See the specification for node types
    todo!()
}
```

### Exporting to JSON with Validation

The library includes a JSON Schema for validating exported data:

```rust
use tree_sitter_actions::{LANGUAGE, ACTIONS_SCHEMA};
use serde_json::json;
use jsonschema::JSONSchema;

fn export_to_json(source: &str) -> Result<serde_json::Value, Box<dyn std::error::Error>> {
    // 1. Parse the .actions file
    let mut parser = tree_sitter::Parser::new();
    parser.set_language(&LANGUAGE.into())?;
    let tree = parser.parse(source, None).ok_or("Parse failed")?;

    // 2. Convert AST to your data structures
    let actions = convert_tree_to_actions(&tree, source)?;

    // 3. Serialize to JSON
    let json_output = serde_json::to_value(&actions)?;

    // 4. Validate against the canonical schema
    let schema: serde_json::Value = serde_json::from_str(ACTIONS_SCHEMA)?;
    let compiled = JSONSchema::compile(&schema)?;

    compiled.validate(&json_output)
        .map_err(|e| format!("Validation failed: {}", e))?;

    Ok(json_output)
}
```

**Why validate?**
- Ensures your JSON export matches the [canonical format](action_specification.md#json-serialization-format)
- Catches bugs in your AST-to-JSON conversion logic
- Guarantees interoperability with other tools
- The schema uses the same regex patterns as the parser

**Dependencies needed:**
```toml
[dependencies]
tree-sitter-actions = "0.4"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
jsonschema = "0.18"
```

### Using the SQL Schema for Persistent Storage

The library includes a reference SQL schema for applications that need database storage:

```rust
use tree_sitter_actions::ACTIONS_SQL_SCHEMA;
use rusqlite::Connection;

fn initialize_database(db_path: &str) -> Result<Connection, Box<dyn std::error::Error>> {
    // Create or open the database
    let conn = Connection::open(db_path)?;

    // Apply the reference schema
    conn.execute_batch(ACTIONS_SQL_SCHEMA)?;

    Ok(conn)
}
```

**The SQL schema is a reference implementation** - use it as a starting point and customize as needed:

```rust
// Option 1: Use it directly
let conn = initialize_database("tasks.db")?;

// Option 2: Extract and customize it
use std::fs::File;
use std::io::Write;

let mut file = File::create("custom_schema.sql")?;
file.write_all(ACTIONS_SQL_SCHEMA.as_bytes())?;
// Edit custom_schema.sql to add:
// - user_id fields for multi-user systems
// - created_at/updated_at timestamps
// - deleted_at for soft deletes
// - Custom indexes for your query patterns
```

**Why use the reference schema?**
- Proven normalized structure for actions data
- Includes indexes for common query patterns
- Enables interoperability between tools using the same schema
- Well-documented in the [specification](action_specification.md#sql-storage-schema)

**Dependencies needed:**
```toml
[dependencies]
tree-sitter-actions = "0.4"
rusqlite = "0.32"  # For SQLite
# Or use postgres, mysql, etc.
```

**Note:** The schema is designed for SQLite but can be adapted for PostgreSQL, MySQL, or other databases. See the [SQL Storage Schema documentation](action_specification.md#sql-storage-schema) for adaptation guidelines.

## Further Reading

- [README](../README.md) - Project overview and development workflow
- [Action Specification](action_specification.md) - Grammar and file format details
- [Rust Bindings](rust-bindings.md) - How the Rust package is built (maintainers)
