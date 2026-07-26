# Keybinding Reference

Complete keybinding map organized by category.

---

## Architecture
```
keybindings.Manager           — Central keybinding registry
keybindings.Action            — Typed action identifier
keybindings.Scope             — Context scope for bindings
keybindings.ModelID           — Per-screen model identifier
keybindings.ModelPanelConfig  — Per-model binding config
```

## Action Resolution
- `func(keybindings.ModelID, uv.Event) keybindings.Action` — resolve keypress to action
- `map[keybindings.Scope]*keybindings.Keymap` — scope-to-keymap mapping
- `map[keybindings.ModelID]keybindings.ModelPanelConfig` — per-model config

## Discovered Actions (from binary)
```
ActionDiff              ActionEdit              ActionDelete
ActionDeleteJump        ActionImportance        ActionLabel
ActionGeneric           ActionGenericH          ActionCallback
ActionDiffRequest       ActionDiffResponse      ActionOnUnsavedFile
ActionDebugInfo         ActionDescriptor        ActionEntry
ActionExecutor          ActionHandler           ActionIndex
ActionInteraction       ActionNode              ActionName
ActionLine              ActionItem              ActionKind
ActionKeypressParam     ActionClickParam        ActionDoubleClickParam
ActionDragParam         ActionDragPathParam     ActionMoveParam
ActionFindParam         ActionLiteralSupport    ActionResolveSupport
ActionClientCapabilities
```

## Discovered Key Constants (from binary)
```
KeyCycleMermaid         — Cycle mermaid diagram view
KeyDiffViewNextFile     — Next file in diff view
KeyDiffViewPrevFile     — Previous file in diff view
KeySearch               — Open file search
KeyZoomIn               — Zoom in (browser/diagram)
KeySubmit               — Submit/confirm selection
KeyReject               — Reject/decline
KeyDelete               — Delete item
KeyEscape               — Close/back (artifact viewer)
KeyBackspace            — Go back
KeyDown                 — Navigate down
KeyDownshift            — Shift+down (multi-select)
KeyBestOfNCancelModel   — Cancel best-of-N mode
KeyBestOfNSelectFocused — Select focused item in best-of-N
KeyBestOfNSwitchFocusNo — Switch focus in best-of-N
```

## Keybinding Persistence
```
"error loading keybindings from %s: %w (delete %s and run /keybindings to restore)"
```
Keybindings stored in config file. Reset via `/keybindings` command.

---

| Key | Action |
|-----|--------|
| `Up` / `Down` | Scroll messages / Navigate list |
| `PgUp` / `PgDn` | Page scroll |
| `Home` / `End` | Top / Bottom |
| `Ctrl+u` / `Ctrl+d` | Half page up / down |
| `Ctrl+f` / `Ctrl+b` | Full page up / down |
| `Tab` | Next focusable element |
| `Shift+Tab` | Previous focusable element |

---

## Chat / Input

| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `Shift+Enter` | Newline in input |
| `Ctrl+Enter` | Send (alternative) |
| `Alt+Enter` | Execute command |
| `Ctrl+v` | Paste |
| `Ctrl+z` | Undo last edit |
| `Ctrl+y` | Redo |
| `Ctrl+s` | Save |
| `Ctrl+o` | Open file |
| `Ctrl+r` | Recent files |
| `Ctrl+e` | Editor commands |

---

## Panel Management

| Key | Action |
|-----|--------|
| `Ctrl+b` | Toggle sidebar / context panel |
| `Ctrl+j` | Focus panel down |
| `Ctrl+k` | Focus panel up |
| `Ctrl+p` | Open command palette |
| `Ctrl+g` | Go to line |
| `Ctrl+h` | Toggle help |

---

## Agent Control

| Key | Action |
|-----|--------|
| `Ctrl+c` | Stop agent (when running) |
| `Ctrl+Enter` | Force submit |
| `Esc` | Cancel / Exit mode |

---

## Search

| Key | Action |
|-----|--------|
| `/` | Start search (in tool cards list) |
| `n` | Next match |
| `N` / `Shift+n` | Previous match |
| `Ctrl+f` | Find in file |
| `Enter` | Confirm selection |
| `Esc` | Clear search / Exit search mode |

---

## Text Editing (Input)

| Key | Action |
|-----|--------|
| `Left` / `Right` | Move cursor |
| `Ctrl+Left` / `Ctrl+Right` | Word jump |
| `Alt+Left` / `Alt+Right` | Word jump (alt) |
| `Alt+Backspace` | Delete word backward |
| `Alt+Delete` / `Ctrl+Delete` | Delete word forward |
| `Ctrl+a` | Select all |
| `Ctrl+w` | Delete word backward |
| `Ctrl+u` | Delete to beginning of line |
| `Ctrl+k` | Delete to end of line |

---

## File Edit (Diff View)

| Key | Action |
|-----|--------|
| `i` | Enter insert mode |
| `Esc` | Exit insert mode |
| `dd` | Delete line |
| `yy` | Yank / copy line |
| `cc` | Change line |
| `u` | Undo |
| `Ctrl+r` | Redo |
| `:w` | Save |
| `:q` | Quit |

---

## Tool Card Interaction

| Key | Action |
|-----|--------|
| `Enter` | Expand / collapse tool card |
| `Up` / `Down` | Navigate between tool cards |
| `Esc` | Close expanded card |

---

## Conversation Session Commands

| Prefix | Action |
|--------|--------|
| `-c` | Resume most recent conversation |
| `--conversation <id>` | Resume specific conversation by ID |
| `--continue` | Same as `-c` |

---

## Mouse Events

On Termux, touch gestures are translated to mouse events:

| Gesture | Event |
|---------|-------|
| Scroll up | MouseWheelUp |
| Scroll down | MouseWheelDown |
| Tap | Left click |

Handled via `tea.MouseWheelMsg` and `tea.MouseMsg(tea.MouseLeft)`.
