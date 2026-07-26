# Model Composition — RootModel Dispatch Hub

Source: Binary structural analysis of message dispatch patterns, function pointer tables, and typed argument slots (X0–X5).

## RootModel — Central Dispatcher

```go
// RootModel is the top-level Bubble Tea model.
// Binary analysis reveals:
//   - struct { F uintptr; X0 *model.SomeModel; X1 ... }
//   - F = function pointer to the message handler
//   - X0–X5 = typed arguments (child models carried as fields)
// The single F field acts as a virtual dispatch: each embedded message
// type carries its own handler pointer.

type RootModel struct {
    // Child model slots (inferred from handler dispatch targets)
    conversation       *ConversationModel
    artifactView       *ArtifactViewModel
    artifactDetail     *ArtifactDetailModel
    diff               *DiffModel
    auth               *AuthModel
    mcpAuth            *McpAuthModel
    help               *HelpModel
    agents             *AgentsModel
    prompt             *PromptModel
    settings           *SettingsErrorModel
    workspaceTrust     *WorkspaceTrustModel
    onboarding         *OnboardingModel
    toolConfirmation   *ToolConfirmationModel
    proactiveFeedback  *ProactiveFeedbackModel
    feedback           *FeedbackModel
    suggestion         *SuggestionModel
    atSuggestion       *AtSuggestionModel
    commentInput       *CommentInputModel
    conversationPicker *ConversationPickerModel
    tasks              *TasksModel
    search             *CodeSearchModel
    inFileSearch       *InFileSearchModel
    subagentDetail     *SubagentDetailModel
    taskDetail         *TaskDetailModel

    store *store.Manager

    width, height int
    activeScreen ScreenType
}
```

## Update — Message Dispatch

```go
// Update dispatches based on the message type, then optionally
// routes to the active child model.

func (m *RootModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case messages.StoreUpdateMsg:
        // Forward to active screen so it refreshes from store state
        return m.activeModel.Update(msg)

    case tea.WindowSizeMsg:
        m.width, m.height = msg.Width, msg.Height
        // Resize ALL child models so any screen switch works immediately
        for _, model := range m.allModels() {
            model.SetSize(m.width, m.height)
        }
        return m, nil

    case tea.KeyMsg:
        // Route keystrokes to the active screen
        switch m.activeScreen {
        case ScreenConversation:
            return m.conversation.Update(msg)
        case ScreenDiff:
            return m.diff.Update(msg)
        case ScreenArtifact:
            return m.artifactView.Update(msg)
        case ScreenAuth:
            return m.auth.Update(msg)
        case ScreenHelp:
            return m.help.Update(msg)
        case ScreenSettings:
            return m.settings.Update(msg)
        case ScreenTasks:
            return m.tasks.Update(msg)
        case ScreenSearch:
            return m.search.Update(msg)
        case ScreenOnboarding:
            return m.onboarding.Update(msg)
        default:
            return m, nil
        }

    case messages.SwitchScreenMsg:
        m.activeScreen = msg.Screen
        m.activeModel = m.modelForScreen(msg.Screen)
        return m, m.activeModel.Init()
    }
}
```

## View — Screen Rendering

```go
// View renders the active screen, or a special overlay if one is open.

func (m *RootModel) View() string {
    // If an overlay/dialog is active, render it over the current screen
    if m.activeDialog != nil {
        return m.renderOverlay(m.activeScreen.View(), m.activeDialog.View())
    }

    switch m.activeScreen {
    case ScreenConversation:
        return m.conversation.View()
    case ScreenDiff:
        return m.diff.View()
    case ScreenArtifact:
        return m.artifactView.View()
    case ScreenAuth:
        return renderCentered(m.auth.View(), m.width, m.height)
    case ScreenHelp:
        return m.help.View()
    case ScreenSettings:
        return m.settings.View()
    case ScreenTasks:
        return m.tasks.View()
    case ScreenSearch:
        return m.search.View()
    case ScreenOnboarding:
        return m.onboarding.View()
    default:
        return m.conversation.View()
    }
}

// renderCentered wraps content in vertical + horizontal centering.
// Binary references: used for auth, onboarding, and workspace trust screens.
func renderCentered(content string, w, h int) string {
    lines := strings.Split(content, "\n")
    vPad := (h - len(lines)) / 2
    if vPad < 0 {
        vPad = 0
    }
    return strings.Repeat("\n", vPad) + lipgloss.PlaceHorizontal(w, lipgloss.Center, content)
}
```

## Helper Patterns

```go
// activeModel returns the tea.Model for the current screen.
// Used in Update to forward messages.
func (m *RootModel) modelForScreen(s ScreenType) tea.Model {
    switch s {
    case ScreenConversation:
        return m.conversation
    case ScreenDiff:
        return m.diff
    // ... one case per screen type
    default:
        return m.conversation
    }
}

// allModels returns every child model for bulk resize.
func (m *RootModel) allModels() []tea.Model {
    return []tea.Model{
        m.conversation, m.artifactView, m.artifactDetail,
        m.diff, m.auth, m.mcpAuth, m.help, m.agents,
        m.prompt, m.settings, m.workspaceTrust, m.onboarding,
        m.toolConfirmation, m.proactiveFeedback, m.feedback,
        m.suggestion, m.atSuggestion, m.commentInput,
        m.conversationPicker, m.tasks, m.search, m.inFileSearch,
        m.subagentDetail, m.taskDetail,
    }
}
```

## Key Design Takeaways

1. **Single dispatch point** — every message enters through `RootModel.Update`, then routes by type and active screen.
2. **All children resized together** — `WindowSizeMsg` iterates every model so screen switches are instant.
3. **`F` pointer dispatch** — the compiled binary shows each embedded type carries a function pointer for its handler, mimicking Go interface dispatch at the struct level.
4. **Overlay rendering** — dialogs render on top of the current screen without changing `activeScreen`.
5. **24 child models** — the root holds references to every possible screen; most are nil until first use.
