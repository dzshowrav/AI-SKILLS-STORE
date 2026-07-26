# Annotations UI

---

## Step Annotation Overlay

```
● Code Action: main.go (annotated)
  ┌─ Annotations ───────────────────────────────────┐
  │  💬 jane_doe (2m ago):                           │
  │    "Could we use context.WithTimeout here?"      │
  │                                                  │
  │  💬 agent (1m ago):                              │
  │    "Good point. Added timeout handling."         │
  │                                                  │
  │  [ Add Comment ]  [ Resolve ]                    │
  └──────────────────────────────────────────────────┘
```

---

## Review Annotation

```
● Step: run_command — "npm test"
  ┌─ Review ─────────────────────────────────────────┐
  │  ⭐ review_engineer:                              │
  │    "The test command needs a --coverage flag"     │
  │    Status: Open                                   │
  └──────────────────────────────────────────────────┘
```

---

## Annotation Indicators in Step List

```
Steps:
  1. ✓ run_command (1.2s)              ← no annotations
  2. ✓ edit_file (0.5s)    💬 3        ← 3 comments
  3. ● write_file (running)            ← active
  4. ⚠ run_command (0.8s)   ⭐         ← reviewed
```

Annotation counts shown next to step in the list.
