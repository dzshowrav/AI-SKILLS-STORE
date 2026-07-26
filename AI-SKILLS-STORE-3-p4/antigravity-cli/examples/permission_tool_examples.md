# Permission & Inline Question Tool Examples

---

## Ask Permission

```
Agent needs confirmation before destructive operation:

→ ask_permission
  message: "Delete the file /workspace/tmp/cache.db?"

  → User responds with decision
  ← Returns: { decision: "continue", reason: "OK, it's just cache" }

  → Agent proceeds with deletion
```

Decision enum: `"stop"` — abort, `"continue"` — proceed, `"block"` — deny permanently.

---

## Ask Question

```
Agent needs additional information:

→ ask_question
  question: "What port should the dev server run on?"

  ← Returns: "3000"

  → Agent uses port 3000 for run_command
```

---

## List Permissions

```
Agent shows what permissions have been granted:

→ list_permissions

  ← Returns:
    read_file: 15 grants (expires: never)
    run_command: 8 grants (expires: in 1h)
    write_file: 3 grants (expires: in 30m)
    web_search: granted always
```
