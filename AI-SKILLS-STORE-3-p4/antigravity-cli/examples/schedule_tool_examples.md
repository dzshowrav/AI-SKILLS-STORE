# Schedule Tool Examples

---

## Schedule a Command

```
User: "Run tests every morning"
```

```
→ schedule
  action: "create"
  schedule: "0 9 * * *"
  command: "npm test"
  description: "Daily test run"

  ← Scheduled task created (ID: sched-001)
```

---

## List Schedules

```
→ schedule
  action: "list"

  ← Returns:
    - sched-001: "0 9 * * *" → npm test (active)
    - sched-002: "0 2 * * 0" → backup script (active)
```

---

## Remove Schedule

```
→ schedule
  action: "delete"
  id: "sched-002"

  ← Schedule sched-002 removed.
```
