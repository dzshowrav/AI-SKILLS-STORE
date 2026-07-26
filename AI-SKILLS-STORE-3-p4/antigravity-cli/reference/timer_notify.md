# Timer & Notification Reference

## Step Type
```
CORTEX_STEP_TYPE_NOTIFY_USER
CortexStepNotifyUser
```

## Tool: `notify_user`

### Parameters
- `prompt` (string, required): The message content to include in the notification when the timer fires or cron triggers. Sent as a high-priority message.
- `durationSeconds` (integer, optional): Number of seconds to wait. One-shot timer. Mutually exclusive with `cronExpression`.
- `cronExpression` (string, optional): Standard 5-field cron expression. Recurring schedules. Example: `*/5 * * * *`. Mutually exclusive with `durationSeconds`.
- `maxFirings` (integer, optional): Max number of cron firings before stopping. Default: unlimited.
- `timerCondition` (string, optional): Controls early termination of one-shot timers.
  - `"never"` (default): Wait until expiry unconditionally
  - `"any"`: Cancel if any message received
  - Specific sender ID: Cancel if message from that subagent/task ID

### Timer States
```
"Timer has expired"
"%s (iteration %d)"
```

### Notification Timeout
```go
NotificationTimeoutSeconds int `json:"NotificationTimeoutSeconds,omitempty" jsonschema:"-"`
```

### Related
- `sync.runtime_notifyListNotifyAll` — broadcast notification
- `sync.runtime_notifyListNotifyOne` — single notification
