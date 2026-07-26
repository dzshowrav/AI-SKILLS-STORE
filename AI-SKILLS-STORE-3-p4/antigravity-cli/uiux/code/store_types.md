# Antigravity CLI — Store & Backend Types

Source: Binary reverse-engineering of `agy v1.0.0` (internal codename `jetski/cascade`).
Three packages: `store`, `backend`, and supporting types.

---

## Store Package Types

### `store.Manager`
- **Role**: Central state manager — the single source of truth for UI state
- **References**: `store.Record`, `store.Store`, `store.CombinedState`, `store.Choice`, `store.TaskManager`, `store.StatusLineRunner`, `store.ProtoStore`
- **Handles**: `store.SubagentStepsUpdate`, `store.pendingUpdate`
- **Key Relationships**:
  ```
  RootModel → store.Manager → store.CombinedState
                            → store.Record (key-value)
                            → store.Store (interface)
                            → store.ProtoStore (impl)
  ```
- **Usage**: Every model that reads or writes application state holds a reference to `store.Manager`

### `store.CombinedState`
- **Role**: Full UI state snapshot — the complete observable state at any point in time
- **Contains**:
  - `store.UIPhase` — current UI phase
  - `store.ArtifactReviewStatus` — artifact review state
  - `store.TrajectoryInfo` — step trajectory
  - `store.SubagentStepsUpdate` — subagent step updates
- **Usage**: Propagated to UI models via `messages.StoreUpdateMsg`

### `store.Record`
- **Role**: Generic store record with key-value access pattern
- **Package**: `store`
- **Methods (inferred)**: `Get(key)`, `Set(key, value)`, `Delete(key)`

### `store.Store`
- **Role**: Core storage interface
- **Package**: `store`
- **Type**: Interface

### `store.StoreClient`
- **Role**: Client wrapper around `store.Store`
- **Package**: `store`

### `store.ProtoStore`
- **Role**: Protobuf-backed store implementation
- **Package**: `store`
- **Implements**: `store.Store`

### `store.Stmt`
- **Role**: Prepared statement for store queries
- **Package**: `store`

### `store.Choice`
- **Role**: User choice/selection within a store interaction
- **Package**: `store`
- **Usage**: Passed through dispatch handlers: `struct { F uintptr; X0 string; X1 string; X2 store.Choice; X3 *model.ToolConfirmationModel; X4 string; X5 string }`

### `store.UIPhase`
- **Role**: UI phase enum — identifies the current operational phase of the application
- **Package**: `store`
- **Type**: String-based enum
- **Discovered Values**:
  - `"MODEL_CHAT_GPT_4_1_MINI_2025_04_14*"` — AI model identifier strings
  - Additional model identifiers from the `agy models` command set
- **Usage**: Drives UI state transitions in `CombinedState`

### `store.TaskManager`
- **Role**: Task management state — tracks running tasks and task lifecycle
- **Package**: `store`
- **Contains**:
  - `store.taskKey` — task identification key
  - `store.runningTask` — currently executing task
  - `store.scoredCandidate` — scored candidate result
- **Key Functions (delegated)**:
  - `handleTaskMode` — toggle task mode in UI
  - `handleList` — list all tasks

### `store.StatusLineRunner`
- **Role**: Status line UI component state — manages the bottom status bar rendering
- **Package**: `store`
- **Usage**: Rendered as part of the conversation model status line

### `store.TrajectoryInfo`
- **Role**: User interaction trajectory/step history — records the sequence of steps taken
- **Package**: `store`
- **Contains**: Step index, step status, step metadata
- **Usage**: Used by `TaskDetailModel` for trajectory rendering

### `store.ArtifactReviewStatus`
- **Role**: Artifact review status — tracks whether artifacts have been reviewed
- **Package**: `store`
- **Usage**: Part of `CombinedState`

### `store.SubagentStepsUpdate`
- **Role**: Subagent step update information — propagated from subagent execution
- **Package**: `store`
- **Fields**: `StepIndex`, `Status`, `Output`
- **Usage**: Sent to UI models via typed message; handled by `SubagentDetailModel`

### `store.SummariesCallback`
- **Role**: Callback type for conversation summarization events
- **Package**: `store`

### `store.AdditionalConvoDir`
- **Role**: Additional conversation directory configuration
- **Package**: `store`

---

## Backend Package Types

### `backend.ServerBackend`
- **Role**: Central backend service — manages all server-side operations
- **Package**: `backend`
- **Key Relationships**:
  ```
  RootModel → store.Manager → backend.ServerBackend
  ```
- **Capabilities (inferred)**:
  - Authentication management
  - Conversation storage & retrieval
  - Feedback submission
  - Idle state tracking
  - Credits/usage tracking
  - Onboarding state management
  - Hooks file management

### `backend.AuthStatus`
- **Role**: Authentication status descriptor
- **Package**: `backend`
- **Fields**:
  - `Status` — auth status string
  - `Provider` — auth provider name
  - `ExpiresAt` — token expiration timestamp

### `backend.ConversationSummary`
- **Role**: Lightweight conversation metadata for list display
- **Package**: `backend`
- **Fields**:
  - `ConversationID` — unique conversation identifier
  - `Title` — conversation title
  - `MessageCount` — number of messages
  - `LastUpdated` — last modification timestamp
- **Usage**: Passed to `ConversationPickerModel`:
  ```
  struct { F uintptr; X0 *model.ConversationPickerModel; X1 *backend.ConversationSummary }
  ```

### `backend.Feedback`
- **Role**: User feedback data structure
- **Package**: `backend`
- **Fields**:
  - `Type` — feedback type/category
  - `Message` — feedback text
  - `Rating` — numeric rating

### `backend.FullyIdleWaiter`
- **Role**: Idle state waiter — blocks until the backend is fully idle
- **Package**: `backend`

### `backend.G1CreditsInfo`
- **Role**: G1 API credits usage information
- **Package**: `backend`
- **Fields (inferred)**: Credits remaining, credits used, reset date

### `backend.HooksFile`
- **Role**: Hooks configuration file — manages file system hooks
- **Package**: `backend`

### `backend.OnboardingStatus`
- **Role**: Onboarding progress tracker
- **Package**: `backend`
- **Fields (inferred)**: Current step, completed steps, skipped steps

---

## Store Data Flow

```
User Input
    │
    ▼
model.*Model  ◄──── messages.StoreUpdateMsg
    │
    ▼
store.Manager
    │
    ├──▶ store.Store / store.ProtoStore  (persistence)
    ├──▶ store.CombinedState              (state snapshot)
    ├──▶ store.Record                     (key-value access)
    ├──▶ store.TaskManager                (task lifecycle)
    ├──▶ store.StatusLineRunner           (status bar)
    └──▶ backend.ServerBackend            (server ops)
            │
            ├── backend.AuthStatus
            ├── backend.ConversationSummary
            ├── backend.Feedback
            ├── backend.OnboardingStatus
            ├── backend.G1CreditsInfo
            └── backend.HooksFile
```

---

## Dispatch Pattern with Store Types

The `RootModel` dispatch mechanism passes store types as arguments:

```
struct { F uintptr; X0 *store.Manager; X1 *model.TasksModel; X2 int }
struct { F uintptr; X0 string; X1 string; X2 store.Choice; X3 *model.ToolConfirmationModel; X4 string; X5 string }
```

This shows that `store.Manager` and `store.Choice` are directly dispatched
to model handlers alongside the target model pointer.
