# Inbox & Notifications UI

---

## Inbox Panel

```
┌─ Inbox ───────────────────────────────────────────┐
│  Notifications (3 unread)                [Mark all]│
├──────────────────────────────────────────────────┤
│  ● [5m ago]  Build #1234 failed                   │
│    ⤷ npm test: 3 tests failed                     │
│                                                    │
│  ● [1h ago]  Test coverage dropped to 72%         │
│    ⤷ Threshold: 80%                               │
│                                                    │
│  ● [2h ago]  PR #56 approved by jane_doe          │
│    ⤷ "Great work on the auth refactor!"           │
│                                                    │
│  ○ [1d ago]  Scheduled: Daily test run passed     │
│    ⤷ All 42 tests passed ✓                        │
└────────────────────────────────────────────────────┘
```

- Unread: ● (bold)
- Read: ○ (dim)
- Expand with Enter
- Mark all read button
- Time-ordered display

---

## Task List UI

```
┌─ Tasks ───────────────────────────────────────────┐
│  Pending (3)           [ + New Task ] [ Filter ]   │
├──────────────────────────────────────────────────┤
│  🔴 [Jul 1] Refactor auth API ← OVERDUE           │
│     Migrate from JWT to OAuth2                    │
│                                                    │
│  🟡 [Jul 5] Update README                          │
│                                                    │
│  🟢 [No date] Write unit tests for handlers        │
│                                                    │
│  Completed (2)           [ Hide ]                  │
│  ✓ [Jun 10] Set up CI pipeline                     │
│  ✓ [Jun 8] Fix login redirect bug                  │
└────────────────────────────────────────────────────┘
```

- Priority colors: 🔴 high, 🟡 medium, 🟢 low
- Overdue warning
- Expand to see description
- Mark complete checkbox
- Filter by status/priority
