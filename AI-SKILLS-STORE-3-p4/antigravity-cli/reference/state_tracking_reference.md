# State Tracking Reference

---

## EditorStateTracker

Tracks which files are open in editor sessions.

```go
type EditorStateTracker struct {
    OpenEditors      map[string]EditorSession  // URI → EditorSession
    ActiveDocument   string                     // Currently focused URI
    CursorPosition   Position                   // Current cursor position
    SelectionRange   Range                      // Current selection
}

type EditorSession struct {
    URI          string
    FilePath     string
    Language     string
    IsDirty      bool
    Cursor       Position
    Selections   []Range
    VisibleRange Range
    OpenedAt     time.Time
}

type Position struct {
    Line      int32
    Column    int32
}

type Range struct {
    Start Position
    End   Position
}
```

---

## FileViewTracker

Tracks which files the agent has viewed/read during the session.

```go
type FileViewTracker struct {
    ViewedFiles     map[string]*FileView
    CurrentView     string   // Currently viewed file URI
    ViewHistory     []string // Ordered history of viewed files
}

type FileView struct {
    URI          string
    Path         string
    FirstViewed  time.Time
    LastViewed   time.Time
    ViewCount    int32
    MaxOffset    int64    // Furthest read position
    ContentHash  string   // For detecting changes
}
```

Used for:
- Understanding what context the agent has seen
- Avoiding redundant file reads
- Providing "recent files" list (`Ctrl+R`)

---

## UserGrepTracker

Tracks user-initiated grep searches.

```go
type UserGrepTracker struct {
    RecentSearches  []GrepQuery
}

type GrepQuery struct {
    Pattern   string
    Path      string
    Include   string
    IsRegex   bool
    Results   int32
    Timestamp time.Time
}
```

Used for:
- Repeating recent searches (`n`/`N` navigation)
- Search history in command palette
- Context for agent understanding what user was looking for

---

## State Initialization

```go
func GetStateInitializationData() *StateInitData
func UploadStateInitializationData(data *StateInitData)
```

`StateInitData` contains:
- Open editor sessions
- Last viewed files
- Recent grep queries
- Active code actions
- Step-to-file mappings

---

## State → Trajectory Integration

```go
func GetCodeStepsFromFileStateMaps(state *FileState) []*Step
func GetSnapshotToStepOptionsForTrajectoryType(trajType TrajectoryType) *SnapshotOptions
```

Maps file states back to steps for trajectory reconstruction.
