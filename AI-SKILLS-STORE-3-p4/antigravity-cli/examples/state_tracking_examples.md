# State Tracking Examples

---

## Editor State Tracking

```
EditorStateTracker tracks:

  Active Document: src/main.go
  Cursor: Line 42, Column 15
  Selection: Lines 40-45
  Visible Range: Lines 30-55
  Dirty: true (unsaved changes)

Used for:
  - Providing context-aware edits
  - Inserting at cursor position
  - Showing current file in UI
```

---

## File View History

```
FileViewTracker records:

  Viewed Files:
    1. src/main.go (viewed 5 times) ← current
    2. src/utils.go (viewed 3 times)
    3. tests/main_test.go (viewed 2 times)
    4. go.mod (viewed 1 time)

Available via Ctrl+R → Recent Files
```

---

## Grep History

```
UserGrepTracker stores:

  Recent Searches:
    1. "func Handler" in handlers/ (12 results) ← current
    2. "TODO" in src/ (45 results)
    3. "error handling" in *.go (8 results)

Available via:
  - Searching with n/N keys
  - Search dropdown history
  - "/" key to start search
```
