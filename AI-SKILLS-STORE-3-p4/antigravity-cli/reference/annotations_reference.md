# Annotations System Reference

---

## Overview

```
cortex/annotations_manager/
```

The annotations system manages metadata attached to steps, tool calls, and messages.

---

## Annotation Types

```go
type Annotation struct {
    ID          string
    TargetID    string           // Step, ToolCall, or Message ID
    TargetType  AnnotationTarget // What type of target
    Key         string
    Value       string
    CreatedAt   time.Time
    Author      string           // "user" or "agent"
}

type AnnotationTarget string
const (
    TargetStep     AnnotationTarget = "step"
    TargetToolCall AnnotationTarget = "tool_call"
    TargetMessage  AnnotationTarget = "message"
    TargetArtifact AnnotationTarget = "artifact"
)
```

---

## Use Cases

- User comments on code actions
- Review feedback on edits
- Step metadata for trajectory reconstruction
- Tool call result annotations
- Error context annotations
- Performance annotations (duration breakdown)
