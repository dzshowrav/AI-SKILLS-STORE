# UI Layout Specifications

---

## App Layout (80x24 Mobile-First)

```
┌─ StatusBar (1 line) ────────────────────────────────────┐  Line 1
│ ● deepseek-v4-flash │ General                    [≡]    │
├─────────────────────────────────────────────────────────┤  Line 2
│  ┌─ Chat Messages (viewport, flexible height) ────────┐ │
│  │ User: "Write a function to sort files by date"     │ │
│  │                                                     │ │
│  │ ● deepseek-v4-flash │ General                       │ │
│  │  I'll create a file sorter...                       │ │
│  │                                                     │ │
│  │  ┌─ Tool Card ─────────────────────────────────┐   │ │
│  │  │ ✓ run_command (1.2s)                        │   │ │
│  │  │ $ go build ./...                            │   │ │
│  │  │ Output: ✓ build succeeded                   │   │ │
│  │  └─────────────────────────────────────────────┘   │ │
│  │                                                     │ │
│  │  ┌─ Tool Card ─────────────────────────────────┐   │ │
│  │  │ ● write_file (running...)                    │   │ │
│  │  │ ████████████░░░░░░ 65%                       │   │ │
│  │  └─────────────────────────────────────────────┘   │ │
│  │                                                     │ │
│  │  Tools: 2  Duration: 4.5s                          │ │
│  │                                                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
├─ Separator (1 line) ────────────────────────────────────┤
│ ┌─ Command Input (3 lines max) ───────────────────────┐ │
│ │ > Add sorting by modification date in descending    │ │
│ │   order and write tests                              │ │
│ └─────────────────────────────────────────────────────┘ │
├─ StatusLine (1 line) ───────────────────────────────────┤
│ Files: 3  Terminals: 1  Git: main  Tokens: 1,234       │
└─────────────────────────────────────────────────────────┘ Line 24
```

---

## Chat Message Format

### User Messages
```
┌─ User ─────────────────────────────────────────────┐
│ │ User: "Write a function to sort files by date"   │
└────────────────────────────────────────────────────┘
```

Style: `userRoleStyle` (color 33, bold), content in default.

### Assistant Messages
```
┌─ Assistant Header ─────────────────────────────────┐
│ │ ● deepseek-v4-flash │ General                     │
│ └──────────────────────────────────────────────────┘
│ Here's the function that sorts files by modification
│ date:
│
│ ```go
│ func SortByDate(files []os.FileInfo) []os.FileInfo {
│ ...
│ ```
│
│ This function uses `os.Stat` to get modification time.
```

Style: Role header in `color 39` (blue, bold). Content rendered via glamour (markdown).

### Tool Messages
```
┌─ Tool Message ─────────────────────────────────────┐
│ │ System: run_command completed (exit: 0)           │
│ │ The command completed successfully.               │
└────────────────────────────────────────────────────┘
```

Style: `color 245` (dim).

---

## Tool Card Component

### States

**Queued (○)**
```
┌─ ○ run_command ───────────────────────────────────┐
│ │ Queued — waiting to execute                       │
└────────────────────────────────────────────────────┘
```
Border: color 240. Icon: `○` (white on dim).

**Running (●)**
```
┌─ ● write_file ────────────────────────────────────┐
│ │ Writing file: /src/main.go...                     │
│ │ ████████████░░░░░░ 65%                            │
└────────────────────────────────────────────────────┘
```
Border: color 39 (blue). Icon: `●` (blue). Optional progress bar.

**Completed (✓)**
```
┌─ ✓ run_command (1.2s) ────────────────────────────┐
│ │ $ go build ./...                                  │
│ │ ✓ build succeeded                                 │
└────────────────────────────────────────────────────┘
```
Border: color 42 (green). Icon: `✓` (green). Shows duration.

**Failed (✗)**
```
┌─ ✗ run_command (0.8s) ────────────────────────────┐
│ │ $ go test ./...                                   │
│ │ ✗ exit code 1                                     │
│ │ FAIL: TestSortFiles — expected 5 got 3            │
└────────────────────────────────────────────────────┘
```
Border: color 196 (red). Icon: `✗` (red). Shows error.

**Waiting for approval**
```
┌─ … run_command ───────────────────────────────────┐
│ │ $ rm -rf /data                                   │
│ │ ⚠ Needs your approval (Enter to approve,         │
│ │   Esc to deny)                                   │
└────────────────────────────────────────────────────┘
```
Border: color 220 (yellow). Icon: `…` (yellow).

### Interaction
- Enter: Toggle expand/collapse
- When collapsed, show only title line and status
- When expanded, show full tool output
- Auto-collapse completed cards after 2s (via tea.Tick)

---

## Context Panel (Sidebar)

Toggled with `Ctrl+B`. Overlays on right side.

```
┌─ Context Panel ──────────────────────────────────┐
│  Files Changed (3)              [+ toggle]        │
│  ┬ src/main.go                                    │
│  ├ src/utils.ts                                   │
│  └ tests/test_main.go                             │
│                                                    │
│  Terminals (1)                   [+ toggle]        │
│  ┬ $ npm run dev                                  │
│    │ PID: 12345  running 5m                       │
│    └────────────────────────────────────────      │
│                                                    │
│  Subagents (2)                   [+ toggle]        │
│  ├ research-agent (running)                        │
│  │  └ Task: Research API patterns                 │
│  └ code-reviewer (done)                            │
│     └ Result: Found 2 issues                      │
│                                                    │
│  Artifacts (1)                   [+ toggle]        │
│  ┬ architecture.md                                 │
└────────────────────────────────────────────────────┘
```

Each section is collapsible. Active sections show highlighted borders.

---

### Workspace Trust Dialog
```
┌─ Trust Workspace? ──────────────────────────────────────┐
│                                                          │
│  Path: /data/data/com.termux/files/home/unknown-project  │
│                                                          │
│  Do you trust the authors of the files in this           │
│  workspace? Trusting enables tool execution and          │
│  file access in this directory.                          │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │  [Trust]  [Don't Trust]  [Remember Decision]   │     │
│  └────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
```

### Onboarding Screen
```
┌─ Welcome to Antigravity CLI ────────────────────────────┐
│                                                          │
│  ┌─ Step 2 of 5 ──────────────────────────────────────┐ │
│  │  ★  Welcome & Setup                                │ │
│  │  ★  Workspace Configuration                        │ │
│  │  ★  Model Selection           ← You are here       │ │
│  │  ☆  Keybindings Overview                           │ │
│  │  ☆  First Task                                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  Select your default model for coding tasks:              │
│                                                          │
│  ○ deepseek-v4-flash (Recommended)                       │
│  ○ claude-sonnet-4-5                                     │
│  ○ gpt-4o                                                │
│                                                          │
│  [Tab] Next  [Enter] Select  [Esc] Skip                  │
└──────────────────────────────────────────────────────────┘
```

### MCP Auth Dialog
```
┌─ MCP Authentication ────────────────────────────────────┐
│                                                          │
│  Server: my-mcp-server                                   │
│                                                          │
│  This server requires authentication:                    │
│                                                          │
│  API Key: [_____________________________]               │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │  [Connect]              [Cancel]               │     │
│  └────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
```

### Full-Screen Diff View
```
┌─ Diff View                               [← →] nav     ┐
├─────────────────────────────────────────────────────────┤
│  src/main.go                                             │
│  --- a/src/main.go        +++ b/src/main.go              │
│  @@ -10,5 +10,7 @@                                       │
│   func main() {                                          │
│   │ fmt.Println("hello")                                 │
│  +│ fmt.Println("world")                                 │
│   │ }                                                     │
│                                                          │
│  src/utils.go                                             │
│  --- a/src/utils.go       +++ b/src/utils.go              │
│  @@ -1,3 +1,5 @@                                         │
│  +package utils                                           │
│   import "fmt"                                            │
├─────────────────────────────────────────────────────────┤
│  [F1] Help  [←→] Files  [Tab] Expand  [Esc] Close        │
└─────────────────────────────────────────────────────────┘
```

### Settings Screen (Tabbed)
```
┌─ Settings ────────────────────────────────────────────────┐
│  [General] [Commands] [Shortcuts] [Vim] [Extensions]      │
├───────────────────────────────────────────────────────────┤
│  ┌─ General ────────────────────────────────────────────┐ │
│  │  Model:      deepseek-v4-flash              [Edit]   │ │
│  │  Theme:      dark                             [Edit] │ │
│  │  Statusline: on                      [Toggle] [Set] │ │
│  │  ...                                                 │ │
│  └──────────────────────────────────────────────────────┘ │
├───────────────────────────────────────────────────────────┤
│  [Tab/←→] Tabs  [Enter] Edit  [Esc] Close                 │
└───────────────────────────────────────────────────────────┘
```

### Task Detail Screen
```
┌─ Task Detail ────────────────────────────────────────────┐
│  Task: build-frontend                                     │
│  Status: ● Running (12.3s)                                │
│  Command: npm run build                                   │
├───────────────────────────────────────────────────────────┤
│  Output:                                                   │
│  > frontend@1.0.0 build                                   │
│  > vite build                                              │
│                                                           │
│  ✓ building for production...                              │
│  ✓ 42 modules transformed                                 │
├───────────────────────────────────────────────────────────┤
│  [K] Kill  [R] Refresh  [Esc] Close                       │
└───────────────────────────────────────────────────────────┘
```

### Subagent Detail Screen
```
┌─ Subagent Detail ────────────────────────────────────────┐
│  Subagent: security-audit                                 │
│  Role: Security Auditor                                   │
│  Status: ● Running                                       │
│  Workspace: branch (isolated)                             │
│  Elapsed: 45.2s                                          │
├───────────────────────────────────────────────────────────┤
│  Last output:                                              │
│  "Found 3 potential vulnerabilities in auth module..."    │
├───────────────────────────────────────────────────────────┤
│  [K] Kill  [V] View Output  [R] Resume  [Esc] Close      │
└───────────────────────────────────────────────────────────┘
```

### Ask Question Dialog
```
┌─ Question ──────────────────────────────────────────────┐
│                                                          │
│  The agent wants to ask:                                 │
│                                                          │
│  "Which API endpoint should I use for user auth?"        │
│                                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │  [__________________________________]          │     │
│  └────────────────────────────────────────────────┘     │
│                                                          │
│  [Enter] Submit  [Esc] Cancel                           │
└──────────────────────────────────────────────────────────┘
```

### Feedback / Proactive Feedback
```
┌─ How's it going? ───────────────────────────────────────┐
│                                                          │
│  Was the last response helpful?                          │
│                                                          │
│     [👍] Yes    [👎] No    [Skip]                       │
│                                                          │
│  (Optional) Any additional feedback:                     │
│  [___________________________________________]          │
│                                                          │
│  [Enter] Submit                                          │
└──────────────────────────────────────────────────────────┘
```

### Comment Input
```
┌─ Add Comment ───────────────────────────────────────────┐
│                                                          │
│  File: src/auth.go:42                                    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │ This function could use better error handling   │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  [Enter] Submit  [Esc] Cancel  [Tab] Preview            │
└──────────────────────────────────────────────────────────┘
```

## Command Palette

`Ctrl+P` opens the command palette overlay.

```
┌──────────────────────────────────────────────────────┐
│  Ctrl+P  Command Palette                             │
├──────────────────────────────────────────────────────┤
│  > /sessions                                         │
│                                                      │
│  Commands:                                           │
│  ● /help         Show help and available commands    │
│  ● /sessions     Manage conversations                │
│  ● /models       Select model provider               │
│  ● /clear        Clear current conversation          │
│  ● /exit         Exit the CLI                        │
│  ● /feature      Create new feature                  │
│  ● /component    Create Bubble Tea component         │
│  ● /command      Create custom command               │
│  ● /mcp          Create MCP server                   │
│  ● /screen       Create Bubble Tea screen            │
│  ● /test         Write tests                         │
│  ● /docs         Write documentation                 │
│                                                      │
│  Tip: Use Up/Down to navigate, Enter to select       │
└──────────────────────────────────────────────────────┘
```

Commands update in real-time as user types.

---

## Agent Status Overlay

When the agent is running, the main content area dims and an overlay appears.

```
┌──────────────────────────────────────────────────────┐
│  ╭──────────────────────────────────────────────╮    │
│  │  Agent Control Toolbar                        │    │
│  │                                                │    │
│  │  Agent is running — controls disabled          │    │
│  │                                                │    │
│  │  [ ■  Stop Agent ]    [ ✕  Force Close ]      │    │
│  ╰──────────────────────────────────────────────╯    │
│                                                      │
│  (main conversation view dimmed)                     │
│                                                      │
│                                                      │
│  [ Return to Agent ]                                 │
└──────────────────────────────────────────────────────┘
```

- Overlay appears when agent is processing
- Main content gets `color 240` (dim) overlay
- Bottom button "Return to Agent" if user interacted with dimmed content

---

## Color Themes

Built-in color themes from embedded XML:

| Theme | Type | Background |
|-------|------|------------|
| catppuccin-frappe | Dark | Soft dark |
| solarized-dark | Dark | Dark brown |
| solarized-light | Light | Light beige |
| 256-base16-snazzy | Dark | Dark blue-gray |
| gruvbox-light | Light | Warm light |
| modus-vivendi | Dark | Black |
| paraiso-light | Light | Light gray |

---

## Fixed Layout Constants

```
StatusBar          = 1 line
Chat Separator     = 1 line
Command Input      = 3 lines max (expands with content)
Status Line        = 1 line
Bottom Safe Area   = 1 line (keyboard padding)

Available for Viewport = totalHeight - 7 fixed lines
```

This layout is designed for 80x24 minimum terminal size, with the viewport occupying ~17 lines.
