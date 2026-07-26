# Neovim Debugging Tools

This directory contains debugging scripts for testing tree-sitter-actions integration with Neovim.

## Scripts

### `check_queries.lua`
Verifies that Neovim can find the highlights query file in its runtime path.

```bash
nvim --headless examples/minimal.actions +"source scripts/nvim/check_queries.lua" +q
```

### `test_highlights.lua`
Tests if the highlights query loads and shows all captures on the buffer.

```bash
nvim --headless examples/recurring_log_example.actions +"source scripts/nvim/test_highlights.lua" +q
```

### `check_conceal_metadata.lua`
Checks if conceal metadata (`#set! conceal "icon"`) is being properly applied to captures.

```bash
nvim --headless examples/minimal.actions +"source scripts/nvim/check_conceal_metadata.lua" +q
```

### `debug_all_captures.lua`
Shows all captures on the first line with their metadata for detailed debugging.

```bash
nvim --headless examples/recurring_log_example.actions +"source scripts/nvim/debug_all_captures.lua" +q
```

## Common Issues

### Queries not found
**Symptom:** `check_queries.lua` shows 0 files found
**Cause:** The `queries` field in nvim-treesitter parser config points to wrong directory
**Solution:** Ensure it points to `queries/actions` not `queries` (to avoid double-nesting)

### Captures match but no concealment
**Symptom:** `test_highlights.lua` shows captures but text doesn't conceal
**Cause:** Either `concealcursor` setting or missing `#set!` directive
**Solution:**
- Set `concealcursor=` (empty) to show concealment in normal mode
- Use `((node) @conceal (#set! conceal "icon"))` with double parens for standalone patterns

### Anonymous tokens can't be captured
**Symptom:** Literal strings like `[`, `]`, `>`, `#` don't show in captures
**Cause:** Anonymous tokens in grammar aren't exposed as nodes in parse tree
**Solution:** Make them named nodes in `grammar.js`:
```javascript
// Before
state: $ => seq('[', $.state_value, ']')

// After
state: $ => seq($.state_open, $.state_value, $.state_close)
state_open: $ => '['
state_close: $ => ']'
```

### Empty concealment doesn't work
**Symptom:** Nodes captured with `@conceal` but no metadata still show
**Cause:** Concealment without metadata just applies highlight group, doesn't hide
**Solution:** Explicitly set empty concealment: `((node) @conceal (#set! conceal ""))`
