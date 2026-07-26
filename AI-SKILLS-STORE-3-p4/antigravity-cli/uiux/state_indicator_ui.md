# State Tracking Indicators UI

---

## Editor State in StatusBar

```
● main.go:42:15 | handlers/utils.go | tests/main_test.go | Files: 3
```

Shows:
- Current file + cursor position (active editor)
- Other open files (tab preview)
- Total file count

---

## Recent Files List

```
Ctrl+R ── Recent Files ──────────────────────────────
│                                                     │
│  ● src/main.go              (current)               │
│  ○ src/utils.go             (viewed 12m ago)        │
│  ○ tests/main_test.go       (viewed 30m ago)        │
│  ○ go.mod                   (viewed 1h ago)         │
│  ○ internal/handler.go      (viewed 2h ago)         │
│                                                     │
│  5 files total                                      │
└─────────────────────────────────────────────────────┘
```

- Current file marked
- Timestamp of last view
- Searchable with type-ahead

---

## Search/Grep History UI

```
/ ── Search History ────────────────────────────────
│                                                      │
│  > func Handler                                      │
│                                                      │
│  Recent:                                             │
│  ● "func Handler"  in handlers/    12 results        │
│  ○ "error handling" in *.go         8 results        │
│  ○ "TODO"          in src/         45 results        │
│  ○ "FIXME"         in **/*.go       3 results        │
│                                                      │
│  Press Enter to repeat, Del to remove                │
└──────────────────────────────────────────────────────┘
```

- Shows last N searches
- Pattern match count
- Path scope shown
- Delete to clear individual entries
