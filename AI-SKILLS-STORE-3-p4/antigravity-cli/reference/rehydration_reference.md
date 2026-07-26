# Rehydration System Reference

---

## Overview

```
cortex/rehydration/
```

Rehydration recovers agent state after restart or disconnect. It reloads the full execution context from persisted data.

---

## Rehydration Process

```
1. Load conversation from SQLite
2. Restore message history
3. Rebuild tool call states
4. Reconnect MCP servers
5. Restore editor/file/grep trackers
6. Reload in-progress steps
7. Resume agent loop
```

---

## What Gets Rehydrated

| Component | Data Source |
|-----------|-------------|
| Conversation | `conversations` table |
| Messages | `messages` table |
| Tool calls | `tool_calls` table |
| Permission grants | `permission_grants` table |
| Editor state | `state/editor_state_tracker.go` |
| File views | `state/file_view_tracker.go` |
| Grep searches | `state/user_grep_tracker.go` |
| MCP connections | `mcp_config.json` + server states |
| Sidecars | SidecarManager state |
| Artifacts | Artifact directory scan |

---

## Recovery Granularity

- **Full rehydration**: Complete state recovery (new session same workspace)
- **Partial rehydration**: Only conversation + message history (shared across devices)
- **Minimal rehydration**: Just conversation list (performance mode)
