# Dialogs & Screens Reference

## Dialog Screens

### Ask Question Dialog
```go
model.AskQuestionModel
```
Interactive question dialog for user input.
- Presents a question to the user
- Accepts text response
- Returns response to the agent

### Tool Confirmation Dialog
```go
model.ToolConfirmationModel
```
Tool execution confirmation with `store.Choice`:
- Shows tool name, arguments, permissions
- User can confirm, reject, or modify
- Used before executing dangerous operations

### Permissions Dialog
```go
model.PermissionsModel
```
Permission grants management:
- List all granted permissions with expiry
- Revoke individual permissions
- View pending permission requests

### Workspace Trust Dialog
```go
model.WorkspaceTrustModel
```
Workspace trust confirmation:
- Shown on first access to unknown workspace
- Options: trust, don't trust, remember decision
- Affects permission scope and sandbox restrictions

### MCP Auth Dialog
```go
model.McpAuthModel
```
MCP server authentication:
- Triggered via `messages.OpenMcpAuthMsg`
- Handles OAuth/API key entry for MCP servers
- Shows server name and auth requirements

### Feedback Form
```go
model.FeedbackModel
```
User feedback submission:
- Sentiment/rating input
- Free text feedback
- Submit to analytics/telemetry

### Comment Input
```go
model.CommentInputModel
```
Inline comment entry:
- Used in code review/diff views
- Submit comment on selected lines
- Supports threaded replies

### Prompt Editor
```go
model.PromptModel
```
Prompt editing screen:
- View/edit current prompt
- Load prompt from templates
- Save as custom prompt

### Help Screen
```go
model.HelpModel
```
Keyboard shortcuts and help reference:
- All available keybindings
- Command list
- Quick start guide

## Full Screens

### Conversation Screen
```go
model.ConversationModel
```
Main conversation interface:
- Message history display
- Input area
- Artifact rendering
- Tool call visualization

### Artifact View
```go
model.ArtifactViewModel
model.ArtifactDetailModel
```
Artifact rendering:
- Syntax highlighted code display
- Collapsible sections
- Diff view
- Full-screen detail mode

### Code Search
```go
model.CodeSearchModel
```
Code search interface:
- Search input with autocomplete
- Results list with file paths
- Code preview on selection
- Filter by file extension

### Diff View
```go
model.DiffModel
```
Code diff viewer:
- Side-by-side or unified diff
- File-by-file navigation (`KeyDiffViewNextFile/PrevFile`)
- Syntax highlighting
- Collapsed/expanded sections

### Task Detail
```go
model.TaskDetailModel
```
Background task details:
- Task ID, type, status
- Output/error display
- Start/stop/cancel controls

### Active Items
```go
model.ActiveItemsModel
```
Active goals, tasks, and background items overview.

### Subagent Detail
```go
model.SubagentDetailModel
```
Subagent management:
- List active subagents
- View subagent status
- Kill subagent
- View subagent output

### Agents Management
```go
model.AgentsModel
```
Agent configuration and management.

### Settings
```go
model.SettingsErrorModel
```
Settings management with tabbed interface:
- `renderGeneralTab` — general settings
- `renderCommandsTab` — command settings
- `renderShortcutsTab` — keyboard shortcuts
- `renderVimTab` — vim mode settings
- `ExtensionPanelTab` — extension configuration

### Onboarding
```go
onboarding.OnboardingModel
```
New user onboarding flow:
- Welcome screen
- Feature introduction
- Configuration wizard
- Browser onboarding port (`GetBrowserOnboardingPort`)
- Step-by-step guide with `PostOnboardingStepType`
- `AGENT_ONBOARDING_STATE_COMPLETED` flag

### Auth Screen
```go
model.AuthModel
```
Authentication/login:
- Provider selection
- Token/credential entry
- OAuth flow

### Conversation Picker
```go
model.ConversationPickerModel
```
Switch between active conversations:
- List of recent conversations
- Search/filter
- Create new conversation

### In-File Search
```go
model.InFileSearchModel
```
Search within currently viewed file:
- Search input
- Match navigation
- Case-sensitive toggle
- Regex toggle

### Suggestion Overlay
```go
model.SuggestionModel
model.AtSuggestionModel
```
Autocomplete/suggestion popup:
- @mention suggestions (agents, commands, files)
- Command autocomplete (`/` commands)
- Knowledge item suggestions

### Proactive Feedback
```go
model.ProactiveFeedbackModel
```
Proactive user satisfaction prompts:
- Shown after task completion
- Quick rating (thumbs up/down)
- Optional feedback text

## Panel Management
```go
ActivePanel          — Currently active panel
SetActivePanel(id)   — Switch to panel
SendActionToChatPanel — Forward action to chat
ExtensionPanelTab    — Extension browser panel
```
- Panels are independently scrollable
- Panel focus is tracked per `ModelID`
- `ModelPanelConfig` stores per-model binding configs
