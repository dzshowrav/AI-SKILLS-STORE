# Statusline System Reference

## Overview
The statusline is a fully customizable status bar at the bottom of the terminal UI.

## Features
- **Toggle**: `/statusline enable` / `/statusline disable`
- **Custom text**: `/statusline set "text"` — set custom statusline content
- **Reset**: `/statusline delete` — revert to built-in default
- **Built-in default**: Shows context-aware information

## UI States
```
"Statusline on. (%s)"     — Statusline enabled with content
"Statusline off."          — Statusline disabled
"Toggle the statusline"    — Command hint
"Custom statusline command cleared. Reverted to built-in default."
"Statusline set to: %s"    — Custom content confirmed
"Run /statusline delete to reset, or /statusline enable to retry."
```

## Persistence
```
"failed to persist statusline config: %v"
"failed to persist statusline config"
```
Statusline config is persisted to settings file.

## Default Content
The built-in default statusline shows:
- Current mode/state
- Active conversation info
- Agent status
- Keybinding hints when available

## Implementation
```
cortex/settings/statusline.go (presumed path)
```
- Custom command execution via embedded shell
- Template-based content rendering
- Async refresh on state changes
