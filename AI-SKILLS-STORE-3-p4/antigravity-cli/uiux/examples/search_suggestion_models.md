# Search & Suggestion Models — Code Search and Auto-Complete

Source: Binary structural analysis of code search results, suggestion filtering, and mention completion.

## CodeSearchModel

```go
type CodeSearchModel struct {
    query   string
    results []codeSearchResultItem
    cursor  int

    // Search state
    searching bool
    error     string

    width, height int
}

type codeSearchResultItem struct {
    ResultID  string
    Path      string
    Line      int
    Column    int
    Content   string    // matching line content
    MatchType string    // "exact", "fuzzy", "semantic"
    Score     float64   // relevance score
}
```

## InFileSearchModel

```go
type InFileSearchModel struct {
    query   string
    matches []Match
    cursor  int

    // Current file reference
    filePath string
    content  []string   // file lines for context display

    width, height int
}

type Match struct {
    Line    int
    Column  int
    Content string
    Length  int    // match length in characters
}
```

## SuggestionModel — Auto-Complete

```go
type SuggestionModel struct {
    suggestions []Suggestion
    visible     bool
    cursor      int

    width, height int
}

type Suggestion struct {
    Label       string
    Description string
    Icon        string   // displayed prefix icon
    Action      string   // action type: "command", "mention", "file"
}
```

## AtSuggestionModel — @-Mention Completion

```go
type AtSuggestionModel struct {
    suggestions []string
    cursor      int
    filter      string   // current filter text after "@"

    width, height int
}
```

## Update — CodeSearchModel

```go
func (m *CodeSearchModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.WindowSizeMsg:
        m.width = msg.Width
        m.height = msg.Height
        return m, nil

    case tea.KeyMsg:
        switch msg.String() {
        case "up":
            if m.cursor > 0 {
                m.cursor--
            }
        case "down":
            if m.cursor < len(m.results)-1 {
                m.cursor++
            }
        case "enter":
            // Open selected result in editor / diff view
            return m, messages.OpenSearchResult(m.results[m.cursor].ResultID)
        case "esc":
            return m, messages.CloseSearch()
        case "backspace":
            if len(m.query) > 0 {
                m.query = m.query[:len(m.query)-1]
                return m, m.executeSearch()
            }
        default:
            if len(msg.String()) == 1 {
                m.query += msg.String()
                return m, m.executeSearch()
            }
        }

    case messages.SearchResultsMsg:
        m.results = msg.Results
        m.searching = false
        m.cursor = 0
        return m, nil

    case messages.StoreUpdateMsg:
        // Re-index available files from store
        return m, nil
    }
}
```

## Update — SuggestionModel

```go
func (m *SuggestionModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.KeyMsg:
        if !m.visible {
            return m, nil
        }
        switch msg.String() {
        case "up":
            if m.cursor > 0 {
                m.cursor--
            }
        case "down":
            if m.cursor < len(m.suggestions)-1 {
                m.cursor++
            }
        case "enter", "tab":
            // Complete with selected suggestion
            m.visible = false
            return m, messages.SuggestionSelected(m.suggestions[m.cursor])
        case "esc":
            m.visible = false
            m.cursor = 0
        }

    case messages.UpdateSuggestionsMsg:
        m.suggestions = msg.Suggestions
        m.visible = len(msg.Suggestions) > 0
        m.cursor = 0
        return m, nil
    }
}
```

## View — CodeSearchModel

```go
func (m *CodeSearchModel) View() string {
    // Layout:
    //   1. Search bar (with query input)
    //   2. Result count
    //   3. Result list (scrollable)
    //   4. Status line / keybinding hints

    searchBar := m.renderSearchBar()
    resultCount := fmt.Sprintf(" %d results\n", len(m.results))
    results := m.renderResults()
    status := m.renderStatus()

    return lipgloss.JoinVertical(lipgloss.Top,
        searchBar,
        resultCount,
        results,
        status,
    )
}

func (m *CodeSearchModel) renderSearchBar() string {
    return fmt.Sprintf(" Search: %s█", m.query)
}

func (m *CodeSearchModel) renderResults() string {
    if len(m.results) == 0 {
        if m.searching {
            return " Searching..."
        }
        if m.query != "" {
            return " No results found."
        }
        return ""
    }

    var b strings.Builder
    for i, r := range m.results {
        cursor := " "
        if i == m.cursor {
            cursor = ">"
        }

        // Truncate path for display
        displayPath := r.Path
        if len(displayPath) > m.width-20 {
            displayPath = "..." + displayPath[len(displayPath)-m.width+23:]
        }

        score := fmt.Sprintf("%.0f%%", r.Score*100)

        b.WriteString(fmt.Sprintf(" %s %s:%d:%d  %s  %s\n",
            cursor,
            styles.Path.Render(displayPath),
            r.Line, r.Column,
            styles.Score.Render(score),
            r.Content,
        ))
    }
    return b.String()
}
```

## View — SuggestionModel

```go
func (m *SuggestionModel) View() string {
    if !m.visible || len(m.suggestions) == 0 {
        return ""
    }

    // Renders as a dropdown above the input area:
    //   ┌─────────────────────┐
    //   │ > /help  Show help  │
    //   │   /clear Clear      │
    //   └─────────────────────┘

    var b strings.Builder
    b.WriteString(styles.SuggestionBox.Top(m.width))
    for i, s := range m.suggestions {
        cursor := " "
        if i == m.cursor {
            cursor = styles.Active.Render(">")
        }

        line := fmt.Sprintf(" %s %s %s",
            cursor,
            s.Icon,
            styles.SuggestionLabel.Render(s.Label),
        )
        if s.Description != "" {
            line += "  " + styles.Dim.Render(s.Description)
        }
        b.WriteString(styles.SuggestionBox.Inner(line, m.width))
    }
    b.WriteString(styles.SuggestionBox.Bottom(m.width))
    return b.String()
}
```

## Discovered Functions

```go
// handleSuggestionSelection — handles navigation and selection
//
//	in the suggestion dropdown.
//	Up/Down to navigate, Enter/Tab to select, Escape to dismiss.
func (m *SuggestionModel) handleSuggestionSelection(msg tea.KeyMsg)

// updateSuggestions — rebuilds the suggestion list based on
//
//	current input context (prefix matching).
//	Triggered by:
//	  - "/" prefix → command suggestions
//	  - "@" prefix → mention suggestions
//	  - "#" prefix → file suggestions
//	  - plain text → contextual suggestions (recent files, etc.)
func updateSuggestions(input string, context SuggestionContext) []Suggestion

// executeSearch — performs a code search with the current query.
//
//	Sends a SearchResultsMsg back through the Bubble Tea program
//	when results are ready.
func (m *CodeSearchModel) executeSearch() tea.Cmd

// filterSuggestions — filters a suggestion list by a prefix string.
//
//	Used by AtSuggestionModel to filter mentions by typed text.
func filterSuggestions(suggestions []string, filter string) []string
```

## Suggestion Context

```go
// SuggestionContext provides the context needed to generate
// relevant suggestions.
type SuggestionContext struct {
    InputText    string
    CursorPos    int
    PrefixChar   string   // "/", "@", "#", or ""
    RecentFiles  []string
    AvailableCmds []Command
    OpenFiles    []string
}
```

## Key Design Takeaways

1. **Three search modes** — `CodeSearchModel` (repository-wide search), `InFileSearchModel` (current file search), and suggestion-based search (dropdown auto-complete).
2. **Typed suggestion triggers** — prefix characters `/`, `@`, `#` activate different suggestion domains (commands, mentions, files).
3. **Dropdown rendering** — suggestions render as a bordered box above the input area, with a cursor indicator (`>`) and optional descriptions.
4. **Real-time search** — `CodeSearchModel` executes a search on every keystroke, with a `searching` flag to show a loading state.
5. **Result details** — each search result shows path, line:column, relevance score (as percentage), and the matching line content.
6. **Suggestion box styling** — uses box-drawing characters (`─`, `│`) to create a distinct visual boundary between input and suggestions.
7. **Delegated suggestion handling** — `SuggestionModel` is a child of `ConversationModel`; it receives its own `UpdateSuggestionsMsg` and only renders when `visible` is true.
