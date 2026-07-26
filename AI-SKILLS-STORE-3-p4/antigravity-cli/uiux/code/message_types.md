# Antigravity CLI — Message Types

Source: Binary reverse-engineering of `agy v1.0.0` (internal codename `jetski/cascade`).
Messages follow Bubble Tea conventions: `type Msg struct` with `tea.Msg` interface.

---

## Primary UI Messages

### `messages.StoreUpdateMsg`
- **Package**: `messages`
- **Role**: Propagates store state changes to UI models
- **Payload**: Contains `store.CombinedState` snapshot
- **Dispatch Pattern**:
  ```
  struct { F uintptr; X0 messages.StoreUpdateMsg; X1 *model.RootModel; X2 string }
  ```
- **Handled By**: `ConversationModel`, `RootModel`, `ArtifactViewModel`, `ArtifactDetailModel`, `TasksModel`, `TaskDetailModel`, `DiffModel`, `OnboardingModel`, `ConversationPickerModel`, `AuthModel`, `McpAuthModel`, `ToolConfirmationModel`, `FeedbackModel`

### `messages.OpenMcpAuthMsg`
- **Package**: `messages`
- **Role**: Opens the MCP authentication dialog
- **Dispatch Pattern**:
  ```
  struct { F uintptr; X0 *model.McpAuthModel; X1 messages.OpenMcpAuthMsg }
  ```
- **Handled By**: `McpAuthModel`, `RootModel`

### `commands.OpenDoneMsg`
- **Package**: `commands`
- **Role**: Signals completion of a file open operation
- **Dispatch Pattern**:
  ```
  struct { F uintptr; X0 *model.PromptModel; X1 commands.OpenDoneMsg }
  ```
- **Handled By**: `PromptModel`, `RootModel`

### `BatchMsg`
- **Package**: `tea` (Bubble Tea)
- **Role**: Batch of commands to execute in parallel
- **Handled By**: `ConversationModel`

### `SequenceMsg`
- **Package**: `tea` (Bubble Tea)
- **Role**: Sequence of commands to execute in order
- **Handled By**: `ConversationModel`

### `BlinkMsg`
- **Package**: `tea` (Bubble Tea)
- **Role**: Cursor blink timer tick
- **Handled By**: `ConversationModel`

### `AcqCardCodeMsg`
- **Package**: `messages` (likely)
- **Role**: Acquire card code event
- **Handled By**: `RootModel`

### `ActionFromMsg`
- **Package**: `messages` (likely)
- **Role**: Keybinding action dispatched to model
- **Handled By**: `RootModel`

### `UserMsg`
- **Package**: Internal
- **Role**: User-generated message event
- **Handled By**: `ConversationModel`

### `ReadMsg`
- **Package**: Internal
- **Role**: Read operation completion
- **Handled By**: `ConversationModel`

### `WriteMsg`
- **Package**: Internal
- **Role**: Write operation completion
- **Handled By**: `ConversationModel`

---

## Store-Level Messages

### `store.SubagentStepsUpdate`
- **Package**: `store`
- **Role**: Subagent step update notification
- **Fields**: `StepIndex`, `Status`, `Output`
- **Handled By**: `TaskDetailModel`, `SubagentDetailModel`

### `store.pendingUpdate`
- **Package**: `store`
- **Role**: Pending state update notification
- **Type**: Internal store message (likely unexported)

---

## RootModel Dispatch Table

The RootModel uses a function-pointer dispatch mechanism where `F` is a function
pointer and `X0`–`X5` are typed arguments. Each entry represents a message handler.

```go
// Full dispatch pattern struct:
type dispatchEntry struct {
    F  uintptr        // function pointer to handler
    X0 interface{}    // first arg (typically *model.Type)
    X1 interface{}    // second arg (typically string or secondary type)
    X2 interface{}    // third arg
    X3 interface{}    // fourth arg
    X4 interface{}    // fifth arg
    X5 interface{}    // sixth arg
}
```

### Discovered Dispatch Entries

| # | Pattern | Purpose |
|---|---------|---------|
| 1 | `{ X0 *model.RootModel; X1 string }` | RootModel + string payload |
| 2 | `{ X0 messages.StoreUpdateMsg; X1 *model.RootModel; X2 string }` | Store update propagation |
| 3 | `{ X0 *model.AuthModel; X1 string }` | Authentication flow |
| 4 | `{ X0 *model.DiffModel; X1 string }` | Open diff view |
| 5 | `{ X0 *model.PromptModel; X1 bool }` | Open prompt (flag variant) |
| 6 | `{ X0 *model.PromptModel; X1 commands.OpenDoneMsg }` | Open complete |
| 7 | `{ X0 *model.PromptModel; X1 string; X2 bool; X3 context.Context; X4 model.PathExpectation; X5 bool }` | Open file with context |
| 8 | `{ X0 *model.ToolConfirmationModel }` | Tool confirmation dialog |
| 9 | `{ X0 *model.ProactiveFeedbackModel }` | Proactive feedback dialog |
| 10 | `{ X0 *model.McpAuthModel; X1 string }` | MCP auth dialog |
| 11 | `{ X0 *model.McpAuthModel; X1 messages.OpenMcpAuthMsg }` | MCP auth with msg payload |
| 12 | `{ X0 *model.HelpModel }` | Help overlay |
| 13 | `{ X0 *model.AgentsModel; X1 string }` | Agents list view |
| 14 | `{ X0 *model.SuggestionModel; X1 bool }` | Suggestions list |
| 15 | `{ X0 *model.AtSuggestionModel }` | @-mention suggestions |
| 16 | `{ X0 *model.CommentInputModel }` | Comment input dialog |
| 17 | `{ X0 *model.ArtifactViewModel }` | Artifact viewer |
| 18 | `{ X0 *model.ArtifactDetailModel }` | Artifact detail view |
| 19 | `{ X0 *model.ConversationPickerModel; X1 string }` | Conversation picker |
| 20 | `{ X0 *model.ConversationPickerModel; X1 *backend.ConversationSummary }` | Conversation picker with summary |
| 21 | `{ X0 *model.FeedbackModel; X1 string; X2 string }` | Feedback form |
| 22 | `{ X0 model.SettingsErrorModel }` | Settings error display |
| 23 | `{ X0 model.WorkspaceTrustModel }` | Workspace trust dialog |
| 24 | `{ X0 *model.TasksModel; X2 int }` | Tasks list (note: X1 skipped) |
| 25 | `{ X0 *store.Manager; X1 *model.TasksModel; X2 int }` | Tasks with store manager |
| 26 | `{ X0 string; X1 string; X2 store.Choice; X3 *model.ToolConfirmationModel; X4 string; X5 string }` | Complex choice dispatch |

---

## Message Flow Diagram

```
                    ┌─────────────────┐
                    │  User Input      │
                    │  (tea.KeyMsg,    │
                    │   tea.MouseMsg)  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Conversation   │
                    │  Model          │
                    │                 │
                    │  BatchMsg       │
                    │  SequenceMsg    │
                    │  BlinkMsg       │
                    │  UserMsg        │
                    │  ReadMsg        │
                    │  WriteMsg       │
                    └────────┬────────┘
                             │
               ┌─────────────┼─────────────┐
               │             │             │
               ▼             ▼             ▼
    ┌─────────────────┐ ┌─────────┐ ┌──────────────┐
    │  RootModel       │ │ store.  │ │ backend.     │
    │  Dispatch        │ │ Manager │ │ ServerBackend│
    │                  │ │         │ │              │
    │  StoreUpdateMsg◄─┼─│ Combined│ │ AuthStatus   │
    │  OpenMcpAuthMsg  │ │ State   │ │ Conversation │
    │  OpenDoneMsg     │ │         │ │ Summary      │
    │  AcqCardCodeMsg  │ │ Subagent│ │ Feedback     │
    │  ActionFromMsg   │ │ Steps   │ │              │
    └────────┬─────────┘ └─────────┘ └──────────────┘
             │
             ├──▶ *model.AuthModel
             ├──▶ *model.DiffModel
             ├──▶ *model.PromptModel
             ├──▶ *model.ToolConfirmationModel
             ├──▶ *model.ProactiveFeedbackModel
             ├──▶ *model.McpAuthModel
             ├──▶ *model.HelpModel
             ├──▶ *model.AgentsModel
             ├──▶ *model.SuggestionModel
             ├──▶ *model.AtSuggestionModel
             ├──▶ *model.CommentInputModel
             ├──▶ *model.ArtifactViewModel
             ├──▶ *model.ArtifactDetailModel
             ├──▶ *model.ConversationPickerModel
             ├──▶ *model.FeedbackModel
             ├──▶ model.SettingsErrorModel
             ├──▶ model.WorkspaceTrustModel
             └──▶ *model.TasksModel
```
