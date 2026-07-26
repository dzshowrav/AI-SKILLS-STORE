# Antigravity CLI — Rendering Functions

Source: Binary reverse-engineering of `agy v1.0.0` (internal codename `jetski/cascade`).
All discovered rendering and view-building function signatures, grouped by domain.

---

## List Rendering

### `renderList`
- **Role**: Render a list of items
- **Signature (inferred)**: `func (m *Model) renderList(items []ListItem) string`
- **Used By**: ConversationModel, TasksModel, DiffModel

### `renderListItem`
- **Role**: Render a single list item
- **Signature (inferred)**: `func (m *Model) renderListItem(item ListItem, index int, focused bool) string`
- **Used By**: ConversationModel, TasksModel

### `renderList` (overloaded)
- **Role**: Render filtered/sorted list
- **Signature (inferred)**: `func (m *Model) renderList(items []ListItem, filter string, sort SortOrder) string`
- **Used By**: CodeSearchModel, ConversationPickerModel

---

## Message Rendering

### `renderMessageListItems`
- **Role**: Render conversation message viewport — the full message history for display
- **Signature (inferred)**: `func (m *ConversationModel) renderMessageListItems() string`
- **Used By**: ConversationModel.View()
- **Key Behavior**:
  - Iterates over `m.messages[]`
  - Renders user messages with "You:" prefix
  - Renders assistant messages with formatted content
  - Renders tool call results inline
  - Splits content on `\n` for proper viewport line counting

---

## Card Rendering

### `renderCard`
- **Role**: Render a tool card or artifact card in the UI
- **Signature (inferred)**: `func (m *Model) renderCard(card ToolCard) string`
- **Used By**: ConversationModel (tool execution view), ArtifactViewModel
- **Sub-renderers**:
  - Status icon (○ queued, ● running, ✓ success, ✗ error, … truncated)
  - Color coding (green/blue/yellow/red per card state)
  - Collapsed/expanded toggle
  - Progress bar for running operations
  - Arguments panel (when expanded)
  - Truncated output display

### `renderItem`
- **Role**: Render a single item (generic)
- **Used By**: Multiple models for list item rendering

---

## Table Rendering

### `renderTable`
- **Role**: Render a complete table structure
- **Signature (inferred)**: `func renderTable(header []string, rows [][]string, opts TableOptions) string`
- **Used By**: SettingsModel, ModelsList display

### `renderTableHeader`
- **Role**: Render table header row
- **Signature (inferred)**: `func renderTableHeader(columns []string, widths []int) string`
- **Called By**: `renderTable`

### `renderTableRow`
- **Role**: Render a single table row
- **Signature (inferred)**: `func renderTableRow(columns []string, widths []int, focused bool) string`
- **Called By**: `renderTable`

### `renderTableCell`
- **Role**: Render an individual table cell
- **Signature (inferred)**: `func renderTableCell(content string, width int, align Align) string`
- **Called By**: `renderTableHeader`, `renderTableRow`

### `createTable`
- **Role**: Create table data structure (pre-render)
- **Signature (inferred)**: `func createTable(header []string, rows [][]string) Table`
- **Used By**: Models list, providers list

---

## Tab Rendering

### `renderTabBar`
- **Role**: Render settings tab bar at top of settings screen
- **Signature (inferred)**: `func renderTabBar(tabs []Tab, activeTab int) string`
- **Used By**: SettingsModel

---

## File Rendering

### `renderFilePreview`
- **Role**: Render file preview in diff view — shows the file content with syntax highlighting
- **Signature (inferred)**: `func (m *DiffModel) renderFilePreview(file FileEntry) string`
- **Used By**: DiffModel

### `renderFileSection`
- **Role**: Render a section of a file (e.g., a diff hunk)
- **Signature (inferred)**: `func renderFileSection(section FileSection, opts SectionOptions) string`
- **Used By**: DiffModel

### `createFilePreview`
- **Role**: Create file preview content (pre-render)
- **Signature (inferred)**: `func createFilePreview(path string, content []string) FilePreview`
- **Used By**: PromptModel, DiffModel

### `createFileDiffEntry`
- **Role**: Create a diff entry structure for a file
- **Signature (inferred)**: `func createFileDiffEntry(path string, oldContent, newContent []string) DiffEntry`
- **Used By**: DiffModel

### `updateFileDetail`
- **Role**: Update file detail view after state change
- **Signature (inferred)**: `func (m *DiffModel) updateFileDetail(fileID string)`
- **Used By**: DiffModel

### `updateFileList`
- **Role**: Update file list display
- **Signature (inferred)**: `func (m *DiffModel) updateFileList(files []FileEntry)`
- **Used By**: DiffModel

### `updateFileStateLocked`
- **Role**: Thread-safe update of file state (uses mutex)
- **Signature (inferred)**: `func (m *DiffModel) updateFileStateLocked(fileID string, state FileState)`
- **Used By**: DiffModel (goroutine-safe access)

---

## Task Rendering

### `renderTaskCheckBox`
- **Role**: Render a task checkbox (checked/unchecked/in-progress)
- **Signature (inferred)**: `func renderTaskCheckBox(status TaskStatus) string`
- **States**: `[ ]` pending, `[x]` completed, `[~]` in-progress, `[!]` failed

### `buildTaskDetailLines`
- **Role**: Build formatted detail lines for a task display
- **Signature (inferred)**: `func (m *TaskDetailModel) buildTaskDetailLines(task Task) []string`
- **Used By**: TaskDetailModel

### `updateStepInTrajectory`
- **Role**: Update a single step within the trajectory display
- **Signature (inferred)**: `func (m *TaskDetailModel) updateStepInTrajectory(stepIndex int, status Status, output string)`
- **Used By**: TaskDetailModel (driven by `store.SubagentStepsUpdate`)

---

## Workspace Rendering

### `renderWorkspace`
- **Role**: Render workspace directory tree
- **Signature (inferred)**: `func renderWorkspace(tree WorkspaceTree) string`
- **Used By**: RootModel / file list panel

### `createWorkspaceOrWorktree`
- **Role**: Create a workspace or worktree entry
- **Signature (inferred)**: `func createWorkspaceOrWorktree(path string, isWorktree bool) WorkspaceEntry`
- **Used By**: initWorkspaceDirs

---

## Tool Rendering

### `renderView`
- **Role**: Render a tool call view — formats tool name, args, and output
- **Signature (inferred)**: `func renderView(tc ToolCall) string`
- **Used By**: ConversationModel

### `buildToolCall`
- **Role**: Build a tool call display structure from raw data
- **Signature (inferred)**: `func buildToolCall(name string, args map[string]interface{}) ToolCallDisplay`
- **Used By**: Tool execution pipeline

### `buildToolsGroups`
- **Role**: Build groups of tools (e.g., by category or execution order)
- **Signature (inferred)**: `func buildToolsGroups(tools []Tool) []ToolGroup`
- **Used By**: Tool listing / suggestions

### `handleToolCall`
- **Role**: Handle tool call event from the LLM/AI service
- **Signature (inferred)**: `func (m *ConversationModel) handleToolCall(tc ToolCall) (tea.Model, tea.Cmd)`
- **Used By**: ConversationModel.Update()

### `handleToolConfirmation`
- **Role**: Handle tool confirmation dialog interaction
- **Signature (inferred)**: `func (m *ToolConfirmationModel) handleToolConfirmation(confirmed bool)`
- **Used By**: ToolConfirmationModel

### `handleToolListChanged`
- **Role**: Handle tool list change event
- **Signature (inferred)**: `func (m *Model) handleToolListChanged(tools []Tool)`
- **Used By**: ConversationModel

---

## Artifact Rendering

### `openArtifact`
- **Role**: Open artifact view for a specific artifact
- **Signature (inferred)**: `func (m *Model) openArtifact(id string) tea.Cmd`
- **Used By**: ArtifactViewModel, ArtifactDetailModel

### `updateArtifacts`
- **Role**: Update artifacts list with new data
- **Signature (inferred)**: `func (m *Model) updateArtifacts(artifacts []Artifact)`
- **Used By**: ArtifactViewModel

---

## Suggestion Rendering

### `updateSuggestions`
- **Role**: Update suggestions list based on current input context
- **Signature (inferred)**: `func (m *SuggestionModel) updateSuggestions(input string, context SuggestionContext)`
- **Used By**: SuggestionModel, AtSuggestionModel

### `handleSuggestionSelection`
- **Role**: Handle user selection of a suggestion
- **Signature (inferred)**: `func (m *SuggestionModel) handleSuggestionSelection(index int) tea.Cmd`
- **Used By**: SuggestionModel, AtSuggestionModel

---

## Rendering Call Graph (Inferred)

```
ConversationModel.View()
├── renderMessageListItems()
│   ├── renderListItem()  [per message]
│   ├── renderCard()      [per tool card]
│   └── renderTaskCheckBox() [per checklist item]
│
DiffModel.View()
├── renderTabBar()         [diff mode tabs]
├── renderFilePreview()
│   ├── renderFileSection()
│   └── createFileDiffEntry()
└── renderList()           [file list]

SettingsModel.View()
├── renderTabBar()         [settings tabs]
└── renderTable()
    ├── renderTableHeader()
    ├── renderTableRow()
    └── renderTableCell()

ArtifactViewModel.View()
└── renderCard()           [artifact cards]

TaskDetailModel.View()
└── buildTaskDetailLines()

ConversationModel.Update()
├── handleToolCall()
├── handleSuggestionSelection()
└── updateSuggestions()
```
