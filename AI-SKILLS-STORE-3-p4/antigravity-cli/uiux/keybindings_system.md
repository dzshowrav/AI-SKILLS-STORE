# Keybinding System — Complete Reference

## Architecture
```go
keybindings.Manager             — Central keybinding manager
keybindings.Action              — Typed action identifier
keybindings.Scope               — Keybinding scope/context
keybindings.ModelID             — Model identifier for per-screen bindings
keybindings.ModelPanelConfig    — Per-model panel keybinding config
```

## Key Mapping
```go
map[keybindings.ModelID]keybindings.ModelPanelConfig  — Per-model config
map[keybindings.Scope]*keybindings.Keymap              — Per-scope keymap
```

## Action Resolution
```go
func(keybindings.ModelID, uv.Event) keybindings.Action
func(keybindings.Action, keybindings.Scope) string     — Get binding string
func(keybindings.Action, keybindings.Scope) []string    — Get all bindings
```

## Actions Discovered
```
ActionDiff              — Show diff view
ActionEdit              — Enter edit mode
ActionDelete            — Delete selected item
ActionDeleteJump        — Delete and jump
ActionImportance        — Mark importance
ActionLabel             — Label/tag item
ActionGeneric           — Generic action handler
ActionGenericH          — Generic handler variant
ActionDiffRequest       — Request diff
ActionDiffResponse      — Respond to diff
ActionCallback          — Action callback
ActionDiffRefreshMcpServersSendTerminalInput... — Multi-action chains
ActionOnUnsavedFile     — Handle unsaved file action
ActionDebugInfo         — Debug information
ActionDescriptor        — Action description
ActionEntry             — Entry point action
ActionExecutor          — Action executor dispatch
ActionHandler           — Action handler dispatch
ActionIndex             — Action index
ActionInteraction       — User interaction action
ActionItem              — Action item
ActionKind              — Action type kind
ActionName              — Action name
ActionNode              — Tree node action
ActionLine              — Line action
ActionKeypressParam     — Keypress parameter
ActionClickParam        — Click parameter
ActionDoubleClickParam  — Double click parameter
ActionDragParam         — Drag parameter
ActionDragPathParam     — Drag path parameter
ActionMoveParam         — Move parameter
ActionFindParam         — Find parameter
ActionLiteralSupport    — Literal support
ActionResolveSupport    — Resolve support
ActionClientCapabilities — Client capabilities
ActionDebugInfo         — Debug info
```

## Key Names
```
KeyCycleMermaid       — Cycle through mermaid diagram views
KeyDiffViewNextFile   — Next file in diff view
KeyDiffViewPrevFile   — Previous file in diff view
KeySearch             — Open search
KeyZoomIn             — Zoom in
KeySubmit             — Submit/confirm
KeyReject             — Reject/decline
KeyDelete             — Delete
KeyEscape             — Close/escape (artifact viewer)
KeyBackspace          — Backspace/go back
KeyDown               — Move down
KeyDownshift          — Shift+down
KeyBestOfNCancelModel — Cancel best-of-N mode
KeyBestOfNSelectFocused — Select focused in best-of-N
KeyBestOfNSwitchFocusNo — Switch focus in best-of-N
KeyAddTeamDomainInternalSeatManagementServicejsonhook — (team mgmt)
```

## Scope System
```
keybindings.Scope  — Defines which context keys are active
```
Scopes determine which keybindings apply based on:
- Current active model/screen
- Panel focus state
- Dialog open state
- Input mode (insert/normal)

## Keybinding Persistence
```
error loading keybindings from %s: %w (delete %s and run /keybindings to restore)
```
Keybindings are persisted to config and can be reset via `/keybindings` command.

## UI Text Display
```
"Toggle the statusline"
"Run /statusline delete to reset, or /statusline enable to retry"
"Statusline on. (%s)"
"Statusline off."
```
