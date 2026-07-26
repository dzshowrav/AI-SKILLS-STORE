# Inbox & Task Management Examples

---

## Manage Inbox

```
User: "Show my notifications"
```

```
→ manage_inbox
  action: "list"

  ← Returns:
    unread: 3
    notifications:
      - "Build #1234 failed" (5m ago)
      - "Test coverage dropped to 72%" (1h ago)
      - "PR #56 approved" (2h ago)

→ manage_inbox
  action: "mark_read"
  id: "notif-001"

  ← Notification marked as read.
```

---

## Manage Task

```
User: "Create a task for the API refactor"
```

```
→ manage_task
  action: "create"
  title: "Refactor authentication API"
  description: "Migrate from JWT to OAuth2"
  priority: "high"
  due_date: "2025-07-01"

  ← Task created with ID: task-042

→ manage_task
  action: "list"
  status: "pending"

  ← Returns:
    - task-042: "Refactor authentication API" (high, due Jul 1)
    - task-038: "Update README" (low, due Jul 5)
```
