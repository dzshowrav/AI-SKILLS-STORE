# Antigravity CLI — UI Model Types

Source: Binary reverse-engineering of `agy v1.0.0` (internal codename `jetski/cascade`).
Go `model` package — 28 discovered UI model structs.

---

## Primary Screens

### `model.ConversationModel`
- **Package**: `model`
- **Role**: Primary chat/conversation screen
- **Composition**: Referenced by RootModel via `messages` (struct `{ F uintptr; R *model.ConversationModel }`)
- **Store References**: `store.Manager`, `store.Record`, `store.CombinedState`, `store.Choice`
- **Key Functions**:
  - `renderMessageListItems` — renders message viewport
  - `handleStep` — process conversation step
  - `handleToolCall` — process tool call
  - `handleInput` — handle user text input
  - `handleSuggestionSelection` — handle suggestion selection
  - `handleViewportUpdates` — viewport scroll handling
  - `handleAuthRequests` — auth flow
  - `updateSuggestions` — update suggestion list
  - `updateMessageMetadata` — update message metadata
  - `showHelp` — show help overlay
  - `initInputReader` — initialize input reader
  - `closePanel` — close active panel
- **Messages Handled**: `BatchMsg`, `SequenceMsg`, `StoreUpdateMsg`, `BlinkMsg`, `UserMsg`, `ReadMsg`, `WriteMsg`

### `model.RootModel`
- **Package**: `model`
- **Role**: Top-level application model — dispatches to all sub-models
- **Composition**: Contains references to all other models as fields; uses dispatch structs `{ F uintptr; X0 *model.<Type>; X1 ... }`
- **Key Functions**:
  - dispatch handlers for every sub-model screen
  - `handleSettings`, `handleSettingsChanges`
  - `handleList`, `handleListPages`, `handleListNetworkRequests`
  - `handleModelsCommand`
  - `handleOnboardingTransition`
  - `handleFileEvent`
  - `handleHelpCommand`
  - `handleInputCh`, `handleInputIkj`
  - `handleTabCompletion`
  - `handleTaskMode`
  - `handleViewportStrategy`
  - `handleAuthResult`
  - `initModelConfig`, `initAuth`, `initAuthority`, `initWorkspaceDirs`
  - `initFileList`, `initFileTree`
- **Messages Handled**: `StoreUpdateMsg`, `OpenMcpAuthMsg`, `OpenDoneMsg`, `AcqCardCodeMsg`, `ActionFromMsg`
- **Dispatch Pattern** (binary struct reflection):
  ```
  struct { F uintptr; X0 *model.RootModel; X1 string }
  struct { F uintptr; X0 messages.StoreUpdateMsg; X1 *model.RootModel; X2 string }
  struct { F uintptr; X0 *model.AuthModel; X1 string }
  struct { F uintptr; X0 *model.DiffModel; X1 string }
  struct { F uintptr; X0 *model.PromptModel; X1 bool }
  struct { F uintptr; X0 *model.PromptModel; X1 commands.OpenDoneMsg }
  struct { F uintptr; X0 *model.PromptModel; X1 string; X2 bool; X3 context.Context; X4 model.PathExpectation; X5 bool }
  struct { F uintptr; X0 *model.ToolConfirmationModel }
  struct { F uintptr; X0 *model.ProactiveFeedbackModel }
  struct { F uintptr; X0 *model.McpAuthModel; X1 string }
  struct { F uintptr; X0 *model.McpAuthModel; X1 messages.OpenMcpAuthMsg }
  struct { F uintptr; X0 *model.HelpModel }
  struct { F uintptr; X0 *model.AgentsModel; X1 string }
  struct { F uintptr; X0 *model.SuggestionModel; X1 bool }
  struct { F uintptr; X0 *model.AtSuggestionModel }
  struct { F uintptr; X0 *model.CommentInputModel }
  struct { F uintptr; X0 *model.ArtifactViewModel }
  struct { F uintptr; X0 *model.ArtifactDetailModel }
  struct { F uintptr; X0 *model.ConversationPickerModel; X1 string }
  struct { F uintptr; X0 *model.ConversationPickerModel; X1 *backend.ConversationSummary }
  struct { F uintptr; X0 *model.FeedbackModel; X1 string; X2 string }
  struct { F uintptr; X0 model.SettingsErrorModel }
  struct { F uintptr; X0 model.WorkspaceTrustModel }
  struct { F uintptr; X0 *model.TasksModel; X2 int }
  struct { F uintptr; X0 *store.Manager; X1 *model.TasksModel; X2 int }
  struct { F uintptr; X0 string; X1 string; X2 store.Choice; X3 *model.ToolConfirmationModel; X4 string; X5 string }
  ```

### `model.ArtifactViewModel`
- **Package**: `model`
- **Role**: Artifact content viewer
- **Store References**: `store.Manager`, `store.Record`
- **Key Functions**:
  - `openArtifact` — open artifact view
  - `updateArtifacts` — update artifacts list
- **Messages Handled**: `StoreUpdateMsg`

### `model.ArtifactDetailModel`
- **Package**: `model`
- **Role**: Artifact detail/expanded view
- **Store References**: `store.Manager`, `store.Record`
- **Key Functions**:
  - `openArtifact` — open from detail context
- **Messages Handled**: `StoreUpdateMsg`

---

## Search Screens

### `model.CodeSearchModel`
- **Package**: `model`
- **Role**: Code search across project files
- **Store References**: `store.Manager`
- **Key Functions**:
  - `openFile` — open search result file
  - `openFileNolog` — open file without logging
- **Internal Types**: `model.codeSearchResultItem` (ResultId, Path, Line, Column, Content, MatchType)

### `model.InFileSearchModel`
- **Package**: `model`
- **Role**: Search within currently open file
- **Store References**: `store.Manager`

---

## Tasks / Agents Screens

### `model.TasksModel`
- **Package**: `model`
- **Role**: Task list overview
- **Store References**: `store.Manager`, `store.TaskManager`
- **Key Functions**:
  - `handleList` — list tasks
  - `handleTaskMode` — toggle task mode
- **Messages Handled**: `StoreUpdateMsg`

### `model.TaskDetailModel`
- **Package**: `model`
- **Role**: Individual task detail view
- **Store References**: `store.Manager`, `store.TaskManager`, `store.TrajectoryInfo`
- **Key Functions**:
  - `buildTaskDetailLines` — build detail lines for task display
  - `updateStepInTrajectory` — update individual step
  - `buildSubagentTrajectory` — build subagent trajectory
- **Messages Handled**: `StoreUpdateMsg`, `store.SubagentStepsUpdate`

### `model.ActiveItemsModel`
- **Package**: `model`
- **Role**: Active/todo items panel
- **Store References**: `store.Manager`

### `model.SubagentDetailModel`
- **Package**: `model`
- **Role**: Subagent execution detail view
- **Store References**: `store.Manager`, `store.SubagentStepsUpdate`
- **Key Functions**:
  - `handleSubagentAlerts` — handle subagent alert events

---

## Dialogs

### `model.AuthModel`
- **Package**: `model`
- **Role**: Authentication dialog
- **Key Functions**:
  - `initAuth` — initialize auth flow
  - `handleAuthRequests` — process auth requests
  - `handleAuthResult` — process auth result
- **Messages Handled**: `StoreUpdateMsg`
- **Dispatch**: `struct { F uintptr; X0 *model.AuthModel; X1 string }`

### `model.McpAuthModel`
- **Package**: `model`
- **Role**: MCP server authentication dialog
- **Store References**: `store.Manager`
- **Internal Types**: `model.mcpServerEntry` (Name, Description, URL, Status, Enabled, Tools)
- **Key Functions**:
  - `handleListNetworkRequests` — list MCP network requests
- **Messages Handled**: `StoreUpdateMsg`, `OpenMcpAuthMsg`
- **Dispatch**: `struct { F uintptr; X0 *model.McpAuthModel; X1 string }` / `struct { F uintptr; X0 *model.McpAuthModel; X1 messages.OpenMcpAuthMsg }`

### `model.ToolConfirmationModel`
- **Package**: `model`
- **Role**: Tool execution confirmation dialog
- **Store References**: `store.Manager`, `store.Choice`
- **Key Functions**:
  - `handleToolConfirmation` — handle tool confirmation
- **Messages Handled**: `StoreUpdateMsg`
- **Dispatch**: `struct { F uintptr; X0 *model.ToolConfirmationModel }`

### `model.PermissionsModel`
- **Package**: `model`
- **Role**: File/permission approval dialog
- **Store References**: `store.Manager`

### `model.AskQuestionModel`
- **Package**: `model`
- **Role**: Ask a question prompt
- **Store References**: `store.Manager`

### `model.CommentInputModel`
- **Package**: `model`
- **Role**: Comment text input dialog
- **Dispatch**: `struct { F uintptr; X0 *model.CommentInputModel }`

### `model.FeedbackModel`
- **Package**: `model`
- **Role**: User feedback form
- **Store References**: `store.Manager`, `backend.Feedback`
- **Key Functions**:
  - `showFeedbackSurvey` — show feedback survey
- **Dispatch**: `struct { F uintptr; X0 *model.FeedbackModel; X1 string; X2 string }`

### `model.ProactiveFeedbackModel`
- **Package**: `model`
- **Role**: Proactive feedback suggestion dialog
- **Store References**: `store.Manager`
- **Internal Types**: `model.proactiveChoice` (Label, Description, Action, Icon)
- **Dispatch**: `struct { F uintptr; X0 *model.ProactiveFeedbackModel }`

### `model.WorkspaceTrustModel`
- **Package**: `model`
- **Role**: Workspace trust confirmation dialog
- **Dispatch**: `struct { F uintptr; X0 model.WorkspaceTrustModel }`

### `model.OnboardingModel`
- **Package**: `model`
- **Role**: First-run onboarding flow
- **Key Functions**:
  - `handleOnboardingTransition` — handle onboarding step transitions
- **Messages Handled**: `StoreUpdateMsg`

### `model.SettingsErrorModel`
- **Package**: `model`
- **Role**: Settings error display
- **Dispatch**: `struct { F uintptr; X0 model.SettingsErrorModel }`

---

## Selection / Picker Models

### `model.ConversationPickerModel`
- **Package**: `model`
- **Role**: Conversation history picker
- **Store References**: `store.Manager`, `backend.ConversationSummary`
- **Messages Handled**: `StoreUpdateMsg`
- **Dispatch**: `struct { F uintptr; X0 *model.ConversationPickerModel; X1 string }` / `struct { F uintptr; X0 *model.ConversationPickerModel; X1 *backend.ConversationSummary }`

### `model.SuggestionModel`
- **Package**: `model`
- **Role**: Command/autocomplete suggestions list
- **Store References**: `store.Manager`
- **Key Functions**:
  - `updateSuggestions` — update suggestion items
  - `handleSuggestionSelection` — handle suggestion selection
- **Dispatch**: `struct { F uintptr; X0 *model.SuggestionModel; X1 bool }`

### `model.AtSuggestionModel`
- **Package**: `model`
- **Role**: @-mention autocomplete suggestions
- **Dispatch**: `struct { F uintptr; X0 *model.AtSuggestionModel }`

### `model.SuggestionModel` (alternate)
> Note: Appears twice in binary — may be a shared type or copy for different suggestion contexts.

---

## Viewer Models

### `model.DiffModel`
- **Package**: `model`
- **Role**: File diff viewer
- **Key Functions**:
  - `openDiffZones` — open diff zones
  - `renderFilePreview` — render file preview in diff view
  - `renderFileSection` — render file section
  - `createFileDiffEntry` — create diff entry for file
  - `updateFileDetail` — update file detail
  - `updateFileList` — update file list
  - `updateFileStateLocked` — thread-safe file state update
- **Messages Handled**: `StoreUpdateMsg`
- **Dispatch**: `struct { F uintptr; X0 *model.DiffModel; X1 string }`

### `model.PromptModel`
- **Package**: `model`
- **Role**: File path prompt / open file dialog
- **Internal Types**: `model.PathExpectation`
- **Key Functions**:
  - `openFile` — open file at path
  - `openFilePointer` — open file at pointer location
  - `createFile` — create new file
  - `createFilePreview` — create file preview
  - `openSetting` — open setting from prompt
- **Dispatch**:
  - `struct { F uintptr; X0 *model.PromptModel; X1 bool }`
  - `struct { F uintptr; X0 *model.PromptModel; X1 commands.OpenDoneMsg }`
  - `struct { F uintptr; X0 *model.PromptModel; X1 string; X2 bool; X3 context.Context; X4 model.PathExpectation; X5 bool }`

### `model.HelpModel`
- **Package**: `model`
- **Role**: Help/commands reference overlay
- **Key Functions**:
  - `showHelp` — display help content
  - `handleHelpCommand` — process help command
- **Dispatch**: `struct { F uintptr; X0 *model.HelpModel }`

### `model.AgentsModel`
- **Package**: `model`
- **Role**: Subagent/agent list viewer
- **Store References**: `store.Manager`
- **Dispatch**: `struct { F uintptr; X0 *model.AgentsModel; X1 string }`

---

## Internal Structs

### `model.codeSearchResultItem`
- **Fields**: ResultId, Path, Line, Column, Content, MatchType
- **Used By**: `CodeSearchModel`

### `model.mcpServerEntry`
- **Fields**: Name, Description, URL, Status, Enabled, Tools
- **Used By**: `McpAuthModel`

### `model.mermaidImageInfo`
- **Fields**: Content, ImageURL, Width, Height
- **Used By**: Artifact rendering pipeline

### `model.proactiveChoice`
- **Fields**: Label, Description, Action, Icon
- **Used By**: `ProactiveFeedbackModel`

### `model.settingField`
- **Fields**: Name, Type, Value, Options, Description
- **Used By**: Settings rendering

### `model.settingOption`
- **Fields**: Label, Value, Selected
- **Used By**: Settings rendering

### `model.PathExpectation`
- **Used By**: `PromptModel` — path validation context

---

## Complete Function Index (alphabetical)

### `render*` — View functions
- `renderCard` — render a tool card / artifact card
- `renderFilePreview` — render file preview in diff view
- `renderFileSection` — render file section
- `renderItem` — render a single item
- `renderList` — render a list of items
- `renderListItem` — render a single list item
- `renderMessageListItems` — render conversation message viewport
- `renderMessageListItems` — renders all messages in conversation view
- `renderTabBar` — render settings tab bar
- `renderTable` — render a table
- `renderTableCell` — render a single table cell
- `renderTableHeader` — render table header row
- `renderTableRow` — render a table row
- `renderTaskCheckBox` — render task checkbox
- `renderView` — render a tool call view
- `renderWorkspace` — render workspace tree

### `handle*` — Event handlers
- `handleAuthRequests` — process auth requests
- `handleAuthResult` — process auth result
- `handleFileEvent` — process file system event
- `handleHelpCommand` — process help command
- `handleInput` — handle user text input
- `handleInputCh` — handle input channel
- `handleInputIkj` — handle input (Ikj variant)
- `handleList` — handle list operation
- `handleListNetworkRequests` — list network requests
- `handleListPages` — list pages
- `handleModelsCommand` — handle models command
- `handleOnboardingTransition` — handle onboarding transition
- `handleSettings` — handle settings interaction
- `handleSettingsChanges` — handle settings change events
- `handleStep` — process conversation step
- `handleStepFn` — process step function
- `handleSubagentAlerts` — handle subagent alert events
- `handleSuggestionSelection` — handle suggestion selection
- `handleTabCompletion` — handle tab completion
- `handleTaskMode` — toggle task mode
- `handleToolCall` — process tool call
- `handleToolConfirmation` — process tool confirmation
- `handleToolListChanged` — handle tool list change
- `handleViewportStrategy` — handle viewport rendering strategy
- `handleViewportUpdates` — handle viewport scroll updates

### `build*` — Construction helpers
- `buildSubagentTrajectory` — build subagent trajectory display
- `buildTaskDetailLines` — build task detail lines
- `buildToolCall` — build tool call display
- `buildToolsGroups` — build tool groups display

### `create*` — Creation helpers
- `createFile` — create a new file
- `createFileDiffEntry` — create diff entry for file
- `createFileJ` — create file (variant J)
- `createFilePreview` — create file preview
- `createMessage` — create a message
- `createTable` — create table structure
- `createWorkspaceOrWorktree` — create workspace or worktree

### `open*` — Open helpers
- `openArtifact` — open artifact view
- `openDiffZones` — open diff zones
- `openFile` — open file
- `openFileNolog` — open file without logging
- `openFilePointer` — open file at pointer location
- `openSetting` — open setting

### `init*` — Initialization helpers
- `initAuth` — initialize auth flow
- `initAuthority` — initialize authority
- `initFileList` — initialize file list
- `initFileTree` — initialize file tree
- `initInputReader` — initialize input reader
- `initModelConfig` — initialize model configuration
- `initWorkspaceDirs` — initialize workspace directories

### `update*` — Update helpers
- `updateArtifacts` — update artifacts list
- `updateFileDetail` — update file detail view
- `updateFileList` — update file list
- `updateFileStateLocked` — update file state (thread-safe)
- `updateList` — update list data
- `updateMessageMetadata` — update message metadata
- `updateStepInTrajectory` — update step in trajectory
- `updateSuggestions` — update suggestion list

### `show*` — Show helpers
- `showFeedbackSurvey` — show feedback survey
- `showHelp` — show help overlay
- `showMessage` — show a message
