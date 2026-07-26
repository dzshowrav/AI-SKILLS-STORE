# PostHook Pipeline Visualization

---

## Step Progress with PostHooks

```
● Step 3/5: edit_file (main.go)
  ┌─ Pipeline Progress ────────────────────────────────┐
  │  ✓ Execute          (0.02s)                        │
  │  ✓ Checkpoint       (0.01s)                        │
  │  ✓ Assess           (0.00s)                        │
  │  ✓ Log to conv      (0.01s)                        │
  │  ● KI Insertion     (checking...)                   │
  │  ○ Knowledge Gen    (pending)                       │
  │  ○ Timestamp        (pending)                       │
  │  ○ Invocations      (pending)                       │
  │  ○ Continue check   (pending)                       │
  └────────────────────────────────────────────────────┘
```

---

## Knowledge Insertion Indicator

```
● KI Insertion Hook: 2 KIs matched

  ┌─ Knowledge Items ───────────────────────────────┐
  │  ✓ "code_style"          → inserted into prompt  │
  │  ✓ "error_handling"      → inserted into prompt  │
  └──────────────────────────────────────────────────┘
```

---

## Knowledge Generation Indicator

```
● Knowledge Generation Hook: 1 KI created

  ┌─ Generated Knowledge ───────────────────────────┐
  │  ✓ "api_pattern_rest"                           │
  │    From: handlers/users.go                      │
  │    Type: code_pattern                           │
  └──────────────────────────────────────────────────┘
```
