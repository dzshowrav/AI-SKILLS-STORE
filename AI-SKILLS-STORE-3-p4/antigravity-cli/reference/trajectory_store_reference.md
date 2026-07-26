# Trajectory Store Reference

---

## Overview

```
cortex/trajectory_store/
cortex/trajectory/
cortex/traj/
```

Persists execution trajectories for debugging, replay, and analysis.

---

## Storage Format

```
<project-dir>/events/<timestamp>.json
```

Each file is a complete trajectory:

```json
{
  "trajectoryId": "uuid",
  "conversationId": "uuid",
  "timestamp": "2025-06-15T10:30:00.123Z",
  "steps": [
    {
      "index": 0,
      "type": "run_command",
      "command": "npm test",
      "status": "DONE",
      "exitCode": 0,
      "output": "PASS 1 passed",
      "duration": "1.2s",
      "toolCalls": [...],
      "annotations": {...}
    }
  ],
  "metrics": {
    "totalDuration": "4.5s",
    "totalTokens": 1500,
    "toolCount": 3,
    "subagentCount": 0
  }
}
```

---

## Trajectory Types

```go
type TrajectoryType string
const (
    TrajTypeConversation TrajectoryType = "conversation"  // Full conversation
    TrajTypeStep         TrajectoryType = "step"          // Single step
    TrajTypeSession      TrajectoryType = "session"       // Whole session
)
```

---

## Trajectory Views

```go
type StepView interface {
    Source() string
    TargetURI() string
    Status() string
    Duration() time.Duration
}
```

Implementations:
- `CodeActionStepView` — Code edit action view
- `CommandStepView` — Shell command view
- `SearchStepView` — Code search view
- `BrowserStepView` — Browser action view
- `SubagentStepView` — Subagent call view
