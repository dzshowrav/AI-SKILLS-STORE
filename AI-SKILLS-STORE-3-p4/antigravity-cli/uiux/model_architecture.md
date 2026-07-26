# Bubble Tea Model Architecture — Complete Reference

## Root Model
`model.RootModel` — the top-level model that manages all screens.

## Screen Models (28 total)
```
model.RootModel               — Root/top-level model
model.ConversationModel       — Main conversation screen
model.ArtifactViewModel       — Artifact viewing/rendering
model.ArtifactDetailModel     — Artifact detail panel
model.CodeSearchModel         — Code search interface
model.TaskDetailModel         — Task detail view
model.ActiveItemsModel        — Active items/tasks list
model.AskQuestionModel        — Interactive question dialog
model.PermissionsModel        — Permission grants management
model.CommentInputModel       — Comment/feedback input
model.SettingsErrorModel      — Settings error state
model.SubagentDetailModel     — Subagent details panel
model.WorkspaceTrustModel     — Workspace trust dialog
model.ToolConfirmationModel   — Tool execution confirmation
model.ProactiveFeedbackModel  — Proactive user feedback
model.AtSuggestionModel       — @mention autocomplete
model.ConversationPickerModel — Conversation selector
model.InFileSearchModel       — In-file text search
model.SuggestionModel         — General suggestions/completions
model.DiffModel               — Code diff viewer
model.AuthModel               — Authentication/login screen
model.AgentsModel             — Agent management
model.McpAuthModel            — MCP authentication dialog
model.FeedbackModel           — User feedback form
model.PromptModel             — Prompt editor
model.TasksModel              — Tasks list/management
model.HelpModel               — Help/keyboard shortcuts reference
onboarding.OnboardingModel   — New user onboarding flow
```

## Model Construction Pattern
Each model has a constructor:
```go
func(uv.Event, *keybindings.Manager) (model.ModelName, tea.Cmd)
```

## Update Pattern
```go
func(model.ModelName) (model.ModelName, tea.Cmd)
```

## Shared Model Types
- `model.ToolConfirmationModel` stores `store.Choice` for pending confirmations
- `model.SuggestionModel` — used in suggestions overlay
- `model.AuthModel` — stores auth state
- `model.DiffModel` — stores diff content with expanded/collapsed state
- `model.PromptModel` — stores prompt text for editing

## Cross-Model Communication
```
messages.StoreUpdateMsg   — Store state changes
commands.OpenDoneMsg      — Async operation complete
messages.OpenMcpAuthMsg   — MCP auth dialog trigger
```
Models communicate via typed messages through the Bubble Tea update loop.

## Panel System
```go
keybindings.ModelID             — Unique model/screen identifier
keybindings.ModelPanelConfig    — Per-model panel configuration
ActivePanel                     — Currently active panel tracking
```
- `SetActivePanel(panel)` — switch active panel
- `GetSendActionToChatPanel(action)` — send action to conversation panel
- `SendActionToChatPanel` — forward messages to chat panel
- `ExtensionPanelTab` — extension/plugin panel

## AltScreen & Fullscreen
```go
AltScreen           — Alternate screen buffer
EnterAltScreen      — Enter alt screen
ExitAltScreen       — Exit alt screen
Fullscreen          — Fullscreen mode
CanAltScreen        — Whether alt screen is available
TermSupportsAltScreen — Terminal capability check
```
Used for full-page screens like diffs, artifacts, and help.
