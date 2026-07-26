# Antigravity CLI — Keybinding Types

Source: Binary reverse-engineering of `agy v1.0.0` (internal codename `jetski/cascade`).
Package: `keybindings`

---

## Architecture

```go
type Manager struct {
    Bindings map[keybindings.ModelID]keybindings.ModelPanelConfig
}
```

The `keybindings.Manager` is the central registry. It stores a per-screen
(`ModelID`) configuration (`ModelPanelConfig`). Each configuration maps
keys to actions via `Keymap` entries, scoped by `Scope`.

---

## Core Types

### `keybindings.Manager`
- **Role**: Central keybinding registry
- **Fields**:
  - `map[keybindings.ModelID]keybindings.ModelPanelConfig` — per-screen keybinding configs
- **Persistence**: Keybindings stored in config file on disk
- **Reset**: `/keybindings` command restores defaults
- **Error Pattern**:
  ```
  "error loading keybindings from %s: %w (delete %s and run /keybindings to restore)"
  ```

### `keybindings.ModelID`
- **Role**: Per-screen model identifier — unique key for each screen's keybinding config
- **Type**: Typed string or int enum
- **Usage**: Used as map key in `Manager.Bindings`

### `keybindings.ModelPanelConfig`
- **Role**: Per-model keybinding configuration
- **Contains**: Scope, keymaps, actions for a specific screen

### `keybindings.Scope`
- **Role**: Context scope for keybindings — determines when a binding is active
- **Type**: String or enum
- **Usage**: Filters active bindings based on current UI context

### `keybindings.Keymap`
- **Role**: Key-to-action mapping entry
- **Fields (inferred)**:
  - Key sequence
  - Action identifier
  - Scope filter
  - Description / label

### `keybindings.Action`
- **Role**: Typed action identifier — what action to execute when a keybinding fires
- **Type**: Typed string or int enum

---

## Discovered Action Values

The following action constant values were extracted from the binary:

| Action | Purpose |
|--------|---------|
| `ActionDiff` | View diff |
| `ActionEdit` | Edit content |
| `ActionDelete` | Delete item |
| `ActionDeleteJump` | Delete and jump |
| `ActionImportance` | Toggle importance |
| `ActionLabel` | Apply label |
| `ActionGeneric` | Generic action |
| `ActionGenericH` | Generic horizontal action |
| `ActionCallback` | Execute callback |
| `ActionDiffRequest` | Request diff |
| `ActionDiffResponse` | Respond to diff |
| `ActionOnUnsavedFile` | Handle unsaved file |
| `ActionDebugInfo` | Show debug information |
| `ActionDescriptor` | Action descriptor metadata |
| `ActionEntry` | Entry point action |
| `ActionExecutor` | Executor action |
| `ActionHandler` | Handler action |
| `ActionIndex` | Index action |
| `ActionInteraction` | Interaction action |
| `ActionNode` | Node action |
| `ActionName` | Name action |
| `ActionLine` | Line action |
| `ActionItem` | Item action |
| `ActionKind` | Kind action |
| `ActionKeypressParam` | Keypress parameter |
| `ActionClickParam` | Click parameter |
| `ActionDoubleClickParam` | Double-click parameter |
| `ActionDragParam` | Drag parameter |
| `ActionDragPathParam` | Drag path parameter |
| `ActionMoveParam` | Move parameter |
| `ActionFindParam` | Find parameter |
| `ActionLiteralSupport` | Literal support |
| `ActionResolveSupport` | Resolve support |
| `ActionClientCapabilities` | Client capabilities |

---

## Discovered Key Constants

Key constants extracted from the binary:

| Constant | Purpose |
|----------|---------|
| `KeyCycleMermaid` | Cycle through mermaid diagram views |
| `KeyDiffViewNextFile` | Next file in diff view |
| `KeyDiffViewPrevFile` | Previous file in diff view |
| `KeySearch` | Toggle search mode |
| `KeyZoomIn` | Zoom in / expand |
| `KeySubmit` | Submit current input |
| `KeyReject` | Reject current action |
| `KeyDelete` | Delete current item |
| `KeyEscape` | Escape / cancel |
| `KeyBackspace` | Backspace |
| `KeyDown` | Move down |
| `KeyDownshift` | Move down (shifted) |
| `KeyBestOfNCancelModel` | Cancel best-of-N model selection |
| `KeyBestOfNSelectFocused` | Select focused best-of-N option |
| `KeyBestOfNSwitchFocusNo` | Switch focus in best-of-N |

---

## Binding Registry Structure (Inferred)

```
keybindings.Manager
│
├── ModelID("conversation") → ModelPanelConfig
│   ├── Scope("default")
│   │   ├── Keymap{ Key: "j",     Action: ActionDown }
│   │   ├── Keymap{ Key: "k",     Action: ActionUp }
│   │   └── Keymap{ Key: "ctrl+c", Action: ActionEscape }
│   └── Scope("insert")
│       ├── Keymap{ Key: "enter",  Action: ActionSubmit }
│       └── Keymap{ Key: "esc",    Action: ActionEscape }
│
├── ModelID("diff") → ModelPanelConfig
│   ├── Keymap{ Key: "n",     Action: KeyDiffViewNextFile }
│   └── Keymap{ Key: "p",     Action: KeyDiffViewPrevFile }
│
├── ModelID("artifact") → ModelPanelConfig
│   ├── Keymap{ Key: "z",     Action: KeyZoomIn }
│   └── Keymap{ Key: "c",     Action: KeyCycleMermaid }
│
└── ModelID("bestofn") → ModelPanelConfig
    ├── Keymap{ Key: "esc",   Action: KeyBestOfNCancelModel }
    ├── Keymap{ Key: "enter", Action: KeyBestOfNSelectFocused }
    └── Keymap{ Key: "tab",   Action: KeyBestOfNSwitchFocusNo }
```

---

## Error Handling

```go
// Error pattern when loading keybindings from config
const errPattern = "error loading keybindings from %s: %w (delete %s and run /keybindings to restore)"
```

- Config file corruption triggers a user-visible error with recovery instructions
- The `/keybindings` command restores default keybindings
- Custom keybindings are user-editable in the config file
