# Batch Subagent Invocation Examples

---

## Concurrent Subagents

```
User: "Research the codebase and suggest improvements"
```

```
→ invoke_subagents
  subagents: [
    {
      name: "code-reviwer",
      task: "Review all .go files in the handlers/ directory and report any issues"
    },
    {
      name: "performance-auditor",
      task: "Check for performance issues in the database queries"
    },
    {
      name: "security-checker",
      task: "Look for security vulnerabilities in the auth module"
    }
  ]

  ← code-reviwer: Found 3 lint issues
  ← performance-auditor: Found 1 N+1 query in users.go
  ← security-checker: Found no vulnerabilities
```

## Unified Manage Subagents

```
→ manage_subagents
  action: "list"

  ← Returns:
    - conv-abc: code-reviwer (running, 3 steps)
    - conv-def: performance-auditor (done, 5 steps)
    - conv-ghi: security-checker (running, 2 steps)

→ manage_subagents
  action: "kill"
  conversationIDs: ["conv-ghi"]

  ← Subagent conv-ghi terminated.
```
