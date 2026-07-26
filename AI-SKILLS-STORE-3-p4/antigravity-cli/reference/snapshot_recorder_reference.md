# SnapshotRecorder Reference

---

## Overview

```
cortex/snapshot_recorder/
```

Records periodic snapshots of agent state for undo/revert support.

---

## Snapshot Contents

```go
type Snapshot struct {
    ID              string
    Timestamp       time.Time
    ConversationID  string
    Messages        []Message         // Snapshot of messages
    Steps           []*Step           // Snapshot of steps
    ToolStates      map[string]string // Tool state map
    EditorState     *EditorState      // Editor snapshot
    FileViewState   *FileViewState    // File view snapshot
    PermissionState []Grant           // Permission grants
}
```

---

## Triggers

- After every N steps (configurable, default 5)
- Before reverting an action
- On user request (`Ctrl+Z` for undo)
- On session end
- Time-based (every 5 minutes)
