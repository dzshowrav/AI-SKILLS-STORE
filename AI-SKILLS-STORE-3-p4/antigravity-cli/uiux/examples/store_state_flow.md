# Store State Flow — How Data Reaches the UI

Source: Binary structural analysis of store.Manager, CombinedState, and the StoreUpdateMsg dispatch chain.

## Architecture Overview

```
Backend / Service Layer
       │
       ▼
  store.Manager       ← Central state store
       │
       ▼
  messages.StoreUpdateMsg   ← Event broadcast
       │
       ▼
  RootModel.Update(msg)
       │
       ▼
  activeModel.Update(msg)   ← Screen-specific update
       │
       ▼
  View re-renders
```

## Store Manager

```go
// store.Manager is the central state hub.
// Binary fields:
//   store.Manager.m        sync.RWMutex
//   store.Manager.record   *store.Record      // current state record
//   store.Manager.Store    *store.Store        // persistent storage
//   store.Manager.combined CombinedState       // aggregated UI state

type Manager struct {
    mu       sync.RWMutex
    record   *Record
    Store    *Store
    combined CombinedState
}

// Update writes a new record and broadcasts the change.
func (m *Manager) Update(record Record) {
    m.mu.Lock()
    defer m.mu.Unlock()
    m.record = &record
    m.combined = m.buildCombinedState(record)
    // Notify all listeners (Bubble Tea programs)
    m.broadcast()
}

// Subscribe adds a listener channel for state updates.
func (m *Manager) Subscribe() <-chan CombinedState {
    ch := make(chan CombinedState, 10)
    m.listeners = append(m.listeners, ch)
    return ch
}
```

## CombinedState

```go
// CombinedState aggregates all UI-relevant state from the store
// into a single struct that gets sent via StoreUpdateMsg.

type CombinedState struct {
    Phase              UIPhase              // UI phase
    Trajectory         TrajectoryInfo       // step history
    ArtifactReview     ArtifactReviewStatus // artifact state
    SubagentSteps      SubagentStepsUpdate  // subagent updates
    AdditionalConvoDir AdditionalConvoDir   // extra dirs
    Messages           []Message            // conversation messages
    Session            SessionInfo          // current session
    Config             ConfigState          // settings
}

// UIPhase — the current phase of the conversation/execution cycle.
// These values were discovered as string constants in the binary.
type UIPhase string
const (
    PhaseThinking        UIPhase = "thinking"        // Model is generating
    PhaseWaitingInput    UIPhase = "waiting_input"   // Waiting for user
    PhaseExecutingTool   UIPhase = "executing_tool"  // Tool running
    PhaseDisplayingResult UIPhase = "displaying_result" // Showing output
    PhaseError           UIPhase = "error"           // Error state
)
```

## Trajectory & Subagent Updates

```go
// TrajectoryInfo — the step-by-step execution history.
// Each step is one action taken by the model (thought, tool call, response).

type TrajectoryInfo struct {
    Steps       []StepInfo
    CurrentStep int
}

type StepInfo struct {
    Index     int
    Action    string   // "think", "tool_call", "tool_result", "message"
    Input     string   // model's input/thought
    Output    string   // result or response
    Status    string   // "running", "completed", "failed"
    Duration  time.Duration
    Timestamp time.Time
}

type SubagentStepsUpdate struct {
    // Subagent-specific step updates
    SubagentID string
    StepIndex  int
    Status     string   // "running", "completed", "failed"
    Output     string
    TokenUsage TokenUsage
}
```

## StoreUpdateMsg — The Notification

```go
// StoreUpdateMsg is the primary mechanism for pushing state from
// the backend to the UI. It wraps the full CombinedState.

type StoreUpdateMsg struct {
    State CombinedState
}

// NewStoreUpdateMsg creates a message from the manager's current state.
// Called by store.Manager.broadcast() after every Update().
func NewStoreUpdateMsg(m *Manager) tea.Msg {
    m.mu.RLock()
    defer m.mu.RUnlock()
    return StoreUpdateMsg{State: m.combined}
}
```

## Dispatch Chain

```go
// 1. Backend triggers an update
storeManager.Update(newRecord)

// 2. Manager builds CombinedState and broadcasts
func (m *Manager) broadcast() {
    for _, listener := range m.listeners {
        select {
        case listener <- m.combined:
        default:
            // Drop if listener is full (non-blocking)
        }
    }
}

// 3. Bubble Tea program receives StoreUpdateMsg
func (m *RootModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case messages.StoreUpdateMsg:
        m.conversation.Update(msg)   // always update conversation
        m.artifactView.Update(msg)   // always update artifacts
        m.tasks.Update(msg)          // always update tasks
        // ... etc
        return m, nil
    }
}
```

## UI Phase State Machine

```go
// The UIPhase drives what the UI shows:
//
//   thinking ─────► executing_tool ────► displaying_result
//       │                                      │
//       └───────── waiting_input ◄──────────────┘
//                      │
//                      ▼
//                   error
//
// - PhaseThinking:        Shows "Working..." with spinner
// - PhaseWaitingInput:    Shows input prompt, enables text entry
// - PhaseExecutingTool:   Shows tool card with progress
// - PhaseDisplayingResult: Shows tool output / model response
// - PhaseError:           Shows error message with retry option

func (m *ConversationModel) phaseChanged(old, new UIPhase) tea.Cmd {
    switch new {
    case PhaseThinking:
        m.showPendingLine = true
        return m.startThinkingAnimation()
    case PhaseWaitingInput:
        m.showPendingLine = false
        return nil
    case PhaseExecutingTool:
        return m.showToolExecutionUI()
    case PhaseError:
        return m.handlePhaseError()
    }
    return nil
}
```

## Additional Store State Types

```go
// ArtifactReviewStatus — tracks the state of artifact reviews.
// Used by both ArtifactViewModel and ArtifactDetailModel.
type ArtifactReviewStatus struct {
    ArtifactID  string
    Status      string   // "pending", "approved", "changes_requested"
    ReviewCount int
    Comments    []ReviewComment
}

type AdditionalConvoDir struct {
    Path string
    Name string
    Mode string   // "read", "write", "read_write"
}

type SessionInfo struct {
    ID        string
    CreatedAt time.Time
    MessageCount int
    TokenUsage   TokenUsage
}

type ConfigState struct {
    Theme         string
    DefaultModel  string
    MaxTokens     int
    Temperature   float64
}

type TokenUsage struct {
    TokensIn  int
    TokensOut int
    Cost      float64
}
```

## Key Design Takeaways

1. **Single notification channel** — `StoreUpdateMsg` carries the entire `CombinedState`. Every model receives the full state and extracts what it needs.
2. **Non-blocking broadcast** — the manager drops updates if a listener channel is full, preventing backpressure from slowing the backend.
3. **Phase-driven UI** — `UIPhase` is the primary state driver for the conversation screen, controlling spinner visibility, input enablement, and tool card display.
4. **Trajectory-driven rendering** — instead of separate update messages for every tool step, the trajectory is accumulated in the store and the UI renders from it.
5. **Mutex-protected reads** — `buildCombinedState` reads while holding a read lock, ensuring consistency during concurrent backend updates.
6. **All models update unconditionally** — RootModel forwards `StoreUpdateMsg` to every child model, not just the active one. This ensures background state (artifacts, tasks, subagents) stays current.
