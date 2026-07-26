# Artifact Models — Content Display & Review

Source: Binary structural analysis of artifact rendering, mermaid diagram handling, and review status tracking.

## ArtifactViewModel — Artifact List

```go
type ArtifactViewModel struct {
    artifacts []Artifact
    activeID  string

    // Mermaid diagram support (from binary: KeyCycleMermaid, model.mermaidImageInfo)
    cycleMode   MermaidCycleMode
    mermaidInfo *mermaidImageInfo

    width, height int
}

type MermaidCycleMode int
const (
    MermaidSource    MermaidCycleMode = iota // Show source code
    MermaidRendered                          // Show rendered image
    MermaidSideBySide                        // Show both
)

type mermaidImageInfo struct {
    Content  string // Mermaid diagram source (Markdown)
    ImageURL string // URL to rendered image (external renderer)
    Width    int    // Image display width
    Height   int    // Image display height
}
```

## ArtifactDetailModel — Single Artifact View

```go
type ArtifactDetailModel struct {
    artifact Artifact
    content  string    // rendered content
    language string    // detected language for syntax highlighting

    width, height int
}
```

## Artifact — Core Structure

```go
type Artifact struct {
    ID       string
    Title    string
    Content  string
    Language string   // programming language (for highlighting)
    MimeType string   // "text/markdown", "text/html", "image/svg+xml", etc.

    // Review status (from store)
    ReviewStatus store.ArtifactReviewStatus
}
```

## Update — ArtifactViewModel

```go
func (m *ArtifactViewModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.WindowSizeMsg:
        m.width = msg.Width
        m.height = msg.Height
        return m, nil

    case tea.KeyMsg:
        switch msg.String() {
        case "up":
            m.selectPreviousArtifact()
        case "down":
            m.selectNextArtifact()
        case "enter":
            return m, messages.OpenArtifactDetail(m.activeID)
        case "esc":
            return m, messages.SwitchToConversation()
        case "m":
            m.cycleMode = (m.cycleMode + 1) % 3
            return m, nil
        }

    case messages.StoreUpdateMsg:
        m.updateArtifacts(msg.State)
        return m, nil
    }
}
```

## Update — ArtifactDetailModel

```go
func (m *ArtifactDetailModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.WindowSizeMsg:
        m.width = msg.Width
        m.height = msg.Height
        return m, nil

    case tea.KeyMsg:
        switch msg.String() {
        case "esc":
            return m, messages.CloseArtifactDetail()
        case "a", "y":
            // Approve artifact
            return m, messages.ApproveArtifact(m.artifact.ID)
        case "r":
            // Request changes
            return m, messages.RequestArtifactChanges(m.artifact.ID)
        }

    case messages.StoreUpdateMsg:
        m.refreshContent(msg.State)
        return m, nil
    }
}
```

## Discovered Functions

```go
// openArtifact — opens an artifact for viewing.
//
//	Switches the active screen to ArtifactDetailModel and
//	loads the artifact content with syntax highlighting.
func (m *ArtifactViewModel) openArtifact(id string)

// updateArtifacts — updates the artifact list from store state.
//
//	Called on StoreUpdateMsg to refresh artifact metadata
//	(approval status, content changes).
func (m *ArtifactViewModel) updateArtifacts(state CombinedState)

// buildToolCall — builds a tool call result that includes artifact display.
//
//	When a tool produces an artifact (e.g., code generation, file creation),
//	this function creates the artifact entry and associates it with
//	the tool call.
func buildToolCall(artifact Artifact) ToolCall

// KeyCycleMermaid — cycles the mermaid diagram display mode.
//
//	Pressing 'm' cycles through:
//	  1. Show source code only
//	  2. Show rendered image only
//	  3. Side-by-side (source + image)
func KeyCycleMermaid(m *ArtifactViewModel)

// renderMermaid — renders a mermaid diagram source as an image.
//
//	If a renderer URL is configured, sends the source to the renderer
//	and displays the returned image in the viewport.
func renderMermaid(source string) (*mermaidImageInfo, error)
```

## View — ArtifactViewModel

```go
func (m *ArtifactViewModel) View() string {
    // Layout:
    //   1. Header "Artifacts (N)"
    //   2. Artifact list (scrollable)
    //   3. Preview pane (selected artifact)
    //   4. Mermaid controls (if applicable)
    //   5. Status bar

    header := m.renderHeader()
    list := m.renderArtifactList()
    preview := m.renderPreview()
    status := m.renderStatus()

    return lipgloss.JoinVertical(lipgloss.Top,
        header,
        lipgloss.JoinHorizontal(lipgloss.Top, list, preview),
        status,
    )
}

func (m *ArtifactViewModel) renderArtifactList() string {
    var b strings.Builder
    for _, a := range m.artifacts {
        active := a.ID == m.activeID
        statusIcon := m.statusIcon(a.ReviewStatus.Status)

        if active {
            b.WriteString(styles.Active.Render("> "))
        } else {
            b.WriteString("  ")
        }

        b.WriteString(fmt.Sprintf("%s %s\n", statusIcon, a.Title))
    }
    return b.String()
}

func (m *ArtifactViewModel) statusIcon(status string) string {
    switch status {
    case "approved":
        return styles.Green.Render("✓")
    case "changes_requested":
        return styles.Yellow.Render("!")
    default:
        return styles.Dim.Render("·")
    }
}
```

## View — ArtifactDetailModel

```go
func (m *ArtifactDetailModel) View() string {
    // Layout:
    //   1. Header (artifact title + language badge)
    //   2. Content area (syntax highlighted)
    //   3. Review controls (approve/request changes)
    //   4. Status bar

    header := m.renderHeader()
    content := m.renderContent()
    controls := m.renderReviewControls()
    status := m.renderStatus()

    return lipgloss.JoinVertical(lipgloss.Top,
        header,
        content,
        controls,
        status,
    )
}

func (m *ArtifactDetailModel) renderContent() string {
    // Apply syntax highlighting based on m.language
    // If content exceeds viewport, enable scrolling
    highlighted := syntaxHighlight(m.content, m.language)
    return m.viewport.Render(highlighted)
}

func (m *ArtifactDetailModel) renderReviewControls() string {
    return lipgloss.JoinHorizontal(lipgloss.Center,
        styles.ReviewButton.Render("[A] Approve"),
        "  ",
        styles.ReviewButton.Render("[R] Request Changes"),
        "  ",
        styles.ReviewButton.Render("[Esc] Close"),
    )
}
```

## Key Design Takeaways

1. **Split pane layout** — ArtifactViewModel shows a list on the left and a preview on the right (when the terminal is wide enough).
2. **Mermaid diagram support** — three display modes: source-only, rendered image, or side-by-side. The `m` key cycles through them.
3. **Review workflow** — artifacts support an approval workflow (approve / request changes) via keybindings from the detail view.
4. **Syntax highlighting** — content is highlighted based on detected language before display.
5. **Status iconography** — `·` (pending), `✓` (approved), `!` (changes requested) — consistent with the checkbox pattern used across the UI.
6. **Tool call integration** — `buildToolCall` creates artifacts from tool outputs, linking file generation tools directly to the artifact view.
