# Detailed Tool Card States

---

## Multi-Replace Tool Card

```
┌─ ● multi_replace_file_content (3 chunks) ──────┐
│ │  Path: main.go                                  │
│ │  Chunks:                                        │
│ │    ✓ func process() → func process(ctx)         │
│ │    ✓ func validate() → func validate(ctx)       │
│ │    ● import "fmt" → import (...)                │
│ │  Progress: ████████████░░░░░░ 65%               │
│ └─────────────────────────────────────────────────┘
```

---

## Tab Code Edit Card

```
┌─ ✓ tab_code_edit (2 chunks) ────────────────────┐
│ │  Tab: main.go                                   │
│ │  Status: Applied ✓                              │
│ │  Duration: 0.3s                                 │
│ └─────────────────────────────────────────────────┘
```

---

## MCP Tool Call Card

```
┌─ ● call_mcp_tool ───────────────────────────────┐
│ │  Server: database                                │
│ │  Tool: query                                     │
│ │  Args: {"sql": "SELECT * FROM users LIMIT 5"}    │
│ │  Status: Running...                              │
│ └─────────────────────────────────────────────────┘
```

---

## Notebook Execution Card

```
┌─ ✓ execute_notebook_cells ──────────────────────┐
│ │  Notebook: analysis.ipynb                       │
│ │  Cells: 3/3 executed                            │
│ │  Duration: 3.9s                                 │
│ │  Status: Complete ✓                             │
│ │  Output:                                        │
│ │    cell-001: Loaded 1000 rows                    │
│ │    cell-002: Mean: 42.5, Std: 7.2               │
│ │    cell-003: Chart generated                    │
│ └─────────────────────────────────────────────────┘
```

---

## Knowledge Tool Card

```
┌─ ✓ knowledge_write_to_file ─────────────────────┐
│ │  Path: .knowledge/database_schema/reference.md   │
│ │  Status: Created ✓                               │
│ │  Duration: 0.2s                                  │
│ └─────────────────────────────────────────────────┘
```

---

## Ask Permission Card

```
┌─ … ask_permission (Waiting) ─────────────────────┐
│ │  Message: Delete the file tmp/cache.db?           │
│ │  Decision: [ Continue ] [ Stop ] [ Block ]        │
│ └─────────────────────────────────────────────────┘
```

---

## Ask Question Card

```
┌─ … ask_question (Waiting) ───────────────────────┐
│ │  Question: What port should the server run on?    │
│ │  Answer: █                                       │
│ └─────────────────────────────────────────────────┘
```

---

## Schedule Tool Card

```
┌─ ✓ schedule ────────────────────────────────────┐
│ │  Action: create                                  │
│ │  Schedule: "0 9 * * *" → npm test                │
│ │  Status: Active ✓                                │
│ │  ID: sched-001                                   │
│ └─────────────────────────────────────────────────┘
```

---

## Sed Tool Card

```
┌─ ✓ sed ─────────────────────────────────────────┐
│ │  Path: src/*.go                                  │
│ │  Expression: s/old-repo/new-repo/g               │
│ │  Files affected: 5                               │
│ │  Status: Applied ✓                               │
│ │  Duration: 0.8s                                  │
│ └─────────────────────────────────────────────────┘
```

---

## Manage Inbox Card

```
┌─ Inbox ──────────────────────────────────────────┐
│ │  Unread: 3                                       │
│ │  ● "Build #1234 failed" — 5m ago                 │
│ │  ● "Test coverage dropped" — 1h ago              │
│ │  ● "PR #56 approved" — 2h ago                    │
│ └─────────────────────────────────────────────────┘
```

---

## Manage Task Card

```
┌─ Tasks ──────────────────────────────────────────┐
│ │  3 pending, 2 completed                          │
│ │  🔴 [Jul 1] Refactor auth API — OVERDUE          │
│ │  🟡 [Jul 5] Update README                        │
│ │  🟢 [─] Write unit tests                         │
│ └─────────────────────────────────────────────────┘
```
