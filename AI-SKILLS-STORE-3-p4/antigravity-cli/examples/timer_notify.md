# Timer & Notification Examples

## One-Shot Timer
Notify after 5 minutes to check build status:
```json
{
  "name": "notify_user",
  "arguments": {
    "prompt": "Please check if the build has completed and report the status",
    "durationSeconds": 300,
    "timerCondition": "never"
  }
}
```

## Cron Timer (Every Hour)
```json
{
  "name": "notify_user",
  "arguments": {
    "prompt": "Hourly status check - review current task progress",
    "cronExpression": "0 * * * *",
    "maxFirings": 24
  }
}
```

## Early Termination Timer
Cancels early when a specific task completes:
```json
{
  "name": "notify_user",
  "arguments": {
    "prompt": "Deployment check - verify the deployment status",
    "durationSeconds": 120,
    "timerCondition": "deploy-task-123"
  }
}
```

## Wait for Command Output
```json
{
  "name": "wait",
  "arguments": {
    "durationMs": 5000
  }
}
```

## Check Command Status
```json
{
  "name": "command_status",
  "arguments": {
    "commandId": "build-456",
    "waitSeconds": 30
  }
}
```

## Send Input to Running Terminal
```json
{
  "name": "send_command_input",
  "arguments": {
    "commandId": "node-repl-789",
    "input": "console.log(JSON.stringify(result, null, 2))\n"
  }
}
```
