# Diff Model — File Diff Viewer

Source: Binary structural analysis of diff rendering, zone tracking, and keybinding constants.

## DiffModel

```go
type DiffModel struct {
    store *store.Manager
    files []DiffFile

    // Navigation (from binary: KeyDiffViewNextFile, KeyDiffViewPrevFile)
    currentFile int

    // Render cache (functions: renderFilePreview, renderFileSection,
    //   createFileDiffEntry, openDiffZones)
    preview   string          // pre-rendered file preview
    sections  []DiffSection   // collapsible diff sections
    diffZones []DiffZone      // clickable/focusable diff regions

    // Mode tracking
    sideBySide bool // side-by-side vs unified view

    width, height int
}

type DiffFile struct {
    Path       string
    Status     string // "added", "modified", "deleted", "renamed"
    OldPath    string // for renamed files
    OldContent string
    NewContent string
    Lines      []DiffLine
    Sections   []DiffSection
    Hunks      []DiffHunk
}

type DiffLine struct {
    Type     DiffLineType // "added", "removed", "context"
    OldLine  int
    NewLine  int
    Content  string
}

type DiffLineType string
const (
    DiffLineAdded   DiffLineType = "added"   // + (green)
    DiffLineRemoved DiffLineType = "removed" // - (red)
    DiffLineContext DiffLineType = "context" //   (default)
)

type DiffSection struct {
    Header string
    Lines  []DiffLine
    Start  int
    End    int
}

type DiffHunk struct {
    OldStart int
    OldEnd   int
    NewStart int
    NewEnd   int
    Header   string
    Lines    []DiffLine
}

type DiffZone struct {
    // A focusable region in the diff view (for interactive staging)
    FileIndex int
    StartLine int
    EndLine   int
    Action    string // "stage", "unstage", "discard"
}
```

## Keybindings

```go
// Keybinding constants discovered in binary:
const (
    KeyDiffViewNextFile = "down"  // Next file in diff list
    KeyDiffViewPrevFile = "up"    // Previous file in diff list
    KeyZoomIn           = "+"     // Zoom in / expand detail
    KeyZoomOut          = "-"     // Zoom out / collapse
    KeyEscape           = "esc"   // Close diff view, return to conversation
    KeyToggleSideBySide = "tab"   // Toggle side-by-side / unified
    KeyStageHunk        = "s"     // Stage selected hunk
    KeyDiscardHunk      = "d"     // Discard selected hunk
)
```

## Update

```go
func (m *DiffModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.WindowSizeMsg:
        m.width = msg.Width
        m.height = msg.Height
        m.rebuildPreview()
        return m, nil

    case tea.KeyMsg:
        switch msg.String() {
        case KeyDiffViewNextFile:
            if m.currentFile < len(m.files)-1 {
                m.currentFile++
                m.rebuildPreview()
            }
        case KeyDiffViewPrevFile:
            if m.currentFile > 0 {
                m.currentFile--
                m.rebuildPreview()
            }
        case KeyEscape:
            return m, messages.SwitchToConversation()
        case KeyToggleSideBySide:
            m.sideBySide = !m.sideBySide
            m.rebuildPreview()
        case KeyStageHunk:
            return m, m.stageCurrentHunk()
        case KeyDiscardHunk:
            return m, m.discardCurrentHunk()
        }
    }
}
```

## Discovered Functions

```go
// openDiffZones — creates focusable DiffZone entries for each hunk.
//
//	Each hunk becomes a zone that can be staged/discarded individually.
func (m *DiffModel) openDiffZones(fileIndex int) []DiffZone

// renderFilePreview — renders the current file's diff as a string.
//
//	Respects sideBySide mode and section collapse state.
func (m *DiffModel) renderFilePreview() string

// renderFileSection — renders a single diff section (one hunk).
//
//	Color-codes lines: green for additions, red for deletions,
//	dim for context.
func (m *DiffModel) renderFileSection(section DiffSection) string

// updateFileDetail — loads file content and builds diff for a file.
//
//	Called when navigating to a new file or after store update.
func (m *DiffModel) updateFileDetail(fileIndex int)

// createFileDiffEntry — builds a DiffFile from old/new content.
//
//	Uses a diff algorithm (likely go-diff) to compute line-level changes.
func createFileDiffEntry(path string, oldContent, newContent string) DiffFile

// rebuildPreview — re-renders the cached preview string.
//
//	Called after navigation, resize, or mode toggle.
func (m *DiffModel) rebuildPreview()
```

## View

```go
func (m *DiffModel) View() string {
    if len(m.files) == 0 {
        return "No changes to display."
    }

    file := m.files[m.currentFile]

    // Top: file header with path and status
    header := m.renderFileHeader(file)

    // Middle: diff content (from cache)
    body := m.preview

    // Bottom: navigation hints
    hints := m.renderStatusHints()

    return lipgloss.JoinVertical(lipgloss.Top, header, body, hints)
}

func (m *DiffModel) renderFileHeader(file DiffFile) string {
    statusColor := styles.DiffStatus(file.Status)
    return fmt.Sprintf(" %s %s",
        statusColor.Render(file.Status),
        styles.Bold.Render(file.Path),
    )
}
```

## Key Design Takeaways

1. **Zone-based interaction** — each diff hunk becomes a `DiffZone` that supports staging/discarding actions. This enables granular change management.
2. **Preview caching** — `preview` string is rebuilt on navigation/resize/mode changes, not on every render frame.
3. **Side-by-side mode** — toggleable via Tab, changes the rendering algorithm for the entire diff.
4. **File list navigation** — Up/Down cycles through files; each navigation triggers a full re-render of the diff content.
5. **Color coding** — standard diff colors: green (additions), red (deletions), dim (context), with status badges per file.
