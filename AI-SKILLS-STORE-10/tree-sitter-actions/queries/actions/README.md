# Tree-Sitter Query Patterns

This directory contains tree-sitter query patterns for the `.actions` file format.

## Editor Queries

These queries are used by editors for syntax features:

- **`highlights.scm`** - Syntax highlighting rules
- **`folds.scm`** - Code folding regions
- **`indents.scm`** - Indentation rules

## Filtering Queries

These queries help filter actions based on common criteria:

### By State
- **`completed-actions.scm`** - Find all completed actions `[x]`
- **`not-started.scm`** - Find all not-started actions `[ ]`
- **`in-progress.scm`** - Find all in-progress actions `[-]`
- **`blocked-actions.scm`** - Find all blocked/awaiting actions `[=]`

### By Priority
- **`p1-actions.scm`** - Find all priority 1 actions `!1`

### By Structure
- **`with-children.scm`** - Find all parent actions that have children
- **`with_specific_story.scm`** - Find all actions with a story/project `*Story`

## Usage

### Basic Usage

```bash
# Find all P1 actions in a file
tree-sitter query queries/actions/p1-actions.scm examples/with_priority.actions

# Find all completed actions
tree-sitter query queries/actions/completed-actions.scm examples/with_everything.actions

# Find actions with children
tree-sitter query queries/actions/with-children.scm examples/with_children.actions
```

### With Multiple Files

```bash
# Query across all example files
for file in examples/*.actions; do
  echo "=== $file ==="
  tree-sitter query queries/actions/completed-actions.scm "$file"
done
```

### Integration with Other Tools

Tree-sitter queries output matches in this format:
```
pattern [row, col] - [row, col]
  capture: content
```

You can pipe this to other tools:

```bash
# Count P1 actions
tree-sitter query queries/actions/p1-actions.scm examples/*.actions | grep -c "action.name"

# Extract just the action names
tree-sitter query queries/actions/completed-actions.scm examples/*.actions \
  | grep "action.name" \
  | sed 's/.*: //'
```

## Creating Custom Queries

Tree-sitter queries use a Lisp-like syntax to match AST nodes. See the [tree-sitter query documentation](https://tree-sitter.github.io/tree-sitter/using-parsers#pattern-matching-with-queries) for details.

### Common Patterns

**Match actions with specific metadata:**
```scheme
(root_action
  name: (name) @action.name
  metadata: (priority) @priority
  (#eq? @priority "!1"))
```

**Match by state:**
```scheme
(root_action
  state: (state
    (state_completed)) @state
  name: (name) @action.name)
```

**Match parent-child relationships:**
```scheme
(root_action
  name: (name) @parent.name
  (child_action) @child)
```

## Notes

- These queries work on the AST produced by the tree-sitter parser
- For complex filtering (e.g., "P1 actions due this week"), use `jq` queries on JSON output instead
- Queries are case-sensitive and match exact patterns
- Editor integrations (Neovim, etc.) automatically use `highlights.scm`, `folds.scm`, and `indents.scm`

## When to Use Tree-Sitter Queries vs. Other Approaches

**Use tree-sitter queries when:**
- You need editor features (syntax highlighting, folding, navigation)
- You want simple, fast filtering without conversion overhead
- You're working directly with `.actions` files in their plaintext form

**Consider alternatives when:**
- **Complex filtering** → Use [jq queries](../../examples/queries/jq/) for multi-criteria filters, aggregations, or transformations
- **Application storage** → Use [SQL](../../examples/queries/sql/) for persistent storage, indexed queries, or relational operations
- **Data pipelines** → Use [jq queries](../../examples/queries/jq/) for composable Unix-style processing

See the [main README](../../README.md#querying-actions) for a complete comparison of query approaches.
