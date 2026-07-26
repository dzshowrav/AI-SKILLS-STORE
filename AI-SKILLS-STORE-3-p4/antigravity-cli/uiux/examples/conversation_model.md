# Conversation Model — Main Chat Interface

Source: Binary structural analysis of message dispatch, state flag fields, and input mode enums.

## ConversationModel

```go
type ConversationModel struct {
    store    *store.Manager
    viewport lipgloss.Viewport // scrollable message area
    input    tea.Model         // text input component (bubbles/textinput)
    messages []Message

    // State flags (boolean fields discovered in binary:
    //   showTerminal, showNotice, showPendingLine, showReason,
    //   showShortcutHint, showSelection)
    showTerminal     bool // terminal output panel visible
    showNotice       bool // notice banner visible
    showPendingLine  bool // "Waiting..." line visible
    showReason       bool // reasoning panel visible
    showShortcutHint bool // keybinding help bar visible
    showSelection    bool // text selection active

    // Input mode (enum fields: handleInput, handleInputCh, handleInputIkj)
    // Binary shows 3 input mode variants:
    //   InputModeDefault  = 0  — normal text entry
    //   InputModeChar     = 1  — character-by-character (vim-like)
    //   InputModeIkj      = 2  — ijkl navigation mode
    inputMode InputMode

    // Suggestions state
    suggestions     []Suggestion
    showSuggestions bool
    suggestionCursor int

    width, height int
}

// Message types handled by ConversationModel.Update:
//   tea.BatchMsg          — batch of commands
//   tea.SequenceMsg       — sequential commands
//   messages.StoreUpdateMsg — store state changed
//   BlinkMsg              — cursor blink tick
//   UserMsg               — user submitted message
//   ReadMsg               — async read complete
//   WriteMsg              — async write complete
```

## Update — Message Handler

```go
func (m *ConversationModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.WindowSizeMsg:
        m.width = msg.Width
        m.height = msg.Height
        m.viewport.Width = msg.Width
        m.viewport.Height = msg.Height - m.headerHeight() - m.inputHeight() - m.statusHeight()
        return m, nil

    case tea.KeyMsg:
        switch {
        case m.showSuggestions:
            return m.handleSuggestionNavigation(msg)
        default:
            return m.handleInputMode(msg)
        }

    case messages.StoreUpdateMsg:
        // Refresh from store (new messages, trajectory changes,
        // artifact updates, tool status changes)
        m.refreshFromStore(msg.State)
        m.viewport.GotoBottom()
        return m, nil

    case BlinkMsg:
        // Cursor blink — re-render to toggle cursor visibility
        return m, nil

    case UserMsg:
        m.messages = append(m.messages, Message{
            Role:    "user",
            Content: msg.Text,
        })
        m.viewport.GotoBottom()
        return m, nil

    case ReadMsg:
        // Async read from subprocess/stream completed
        m.handleStreamOutput(msg.Data)
        return m, nil
    }
}
```

## View — Rendering Structure

```go
func (m *ConversationModel) View() string {
    // Layout (top to bottom):
    //   1. Header bar    — model name, token count, status icons
    //   2. Viewport      — scrollable message list
    //   3. Input area    — text input + suggestion dropdown
    //   4. Status line   — keybinding hints, tool execution status

    header := m.renderHeader()
    messages := m.viewport.View()
    input := m.input.View()
    status := m.renderStatusLine()

    return lipgloss.JoinVertical(lipgloss.Top,
        header,
        messages,
        input,
        status,
    )
}
```

## Discovered Functions

```go
// renderMessageListItems — renders the message viewport content.
//   - Processes each message by role (user, assistant, system, tool)
//   - Applies syntax highlighting to code blocks
//   - Renders tool call results inline
//   - Handles collapsed/expanded states for long outputs
func (m *ConversationModel) renderMessageListItems() string

// handleStep — processes a conversation step from trajectory.
//   - Called when StoreUpdateMsg contains new trajectory steps
//   - Updates message list, tool call states, artifact references
func (m *ConversationModel) handleStep(step StepInfo)

// handleToolCall — processes a tool call from the assistant.
//   - Parses tool name, arguments, and execution state
//   - Requests confirmation for dangerous tools
//   - Dispatches to tool execution via store
func (m *ConversationModel) handleToolCall(tool ToolCall)

// handleInput — handles user text input in default mode.
//   - Manages input buffer, cursor position, text selection
func (m *ConversationModel) handleInput(msg tea.KeyMsg)

// handleSuggestionSelection — handles suggestion dropdown navigation.
//   - Up/Down to cycle, Enter to select, Escape to dismiss
func (m *ConversationModel) handleSuggestionSelection(msg tea.KeyMsg)

// updateSuggestions — updates suggestion list based on input context.
//   - Triggers on "/" for commands, "@" for mentions, "#" for files
//   - Filters suggestions by current input prefix
func (m *ConversationModel) updateSuggestions()

// updateMessageMetadata — updates metadata (token count, model info)
//
//	for a message after it's been processed.
func (m *ConversationModel) updateMessageMetadata(index int, metadata MessageMetadata)
```

## Message Structure

```go
type Message struct {
    Role       string         // "user", "assistant", "system", "tool"
    Content    string         // message text (may contain markdown)
    ToolCalls  []ToolCall     // tool invocations (assistant only)
    ToolResult *ToolResult    // tool execution result (tool only)
    Metadata   MessageMetadata

    // UI state (not from API)
    Collapsed  bool           // long content collapsed
    Selected   bool           // text selection state
    Animated   bool           // streaming animation in progress
}

type MessageMetadata struct {
    Model        string
    TokensIn     int
    TokensOut    int
    Duration     time.Duration
    FinishReason string
}

type InputMode int
const (
    InputModeDefault InputMode = iota // Normal text entry
    InputModeChar                     // Character-by-character (vim)
    InputModeIkj                      // Navigation mode (ijkl keys)
)
```

## Key Design Takeaways

1. **Three input modes** — default (multi-line text), char-by-char (for precise editing), and ikj navigation (vim-like). Switched by keybinding.
2. **Six boolean state flags** control visibility of UI sections (terminal, notice, pending, reason, hints, selection).
3. **Suggestions are a drop-down overlay** rendered above the input area, not replacing it.
4. **Message viewport content is rebuilt per render** via `renderMessageListItems` — the viewport stores rendered lines, not model objects.
5. **Store-driven updates** — `StoreUpdateMsg` is the primary mechanism for refreshing UI from backend state changes (new tokens, tool results, trajectory steps).
