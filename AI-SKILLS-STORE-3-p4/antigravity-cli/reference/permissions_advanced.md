# Permissions System — Advanced Reference

## 5 Decision Values
The permission system supports 5 decision values, not 3:
```json
"decision": {
  "type": "string",
  "enum": ["allow", "deny", "ask", "force_ask", "deny_unless_prior_grant"],
  "description": "Decision for the tool call: 'allow' to proceed, 'deny' to block, 'ask' to request user confirmation."
}
```

### Decision Meanings
| Value | Behavior |
|-------|----------|
| `allow` | Auto-approve, no user prompt |
| `deny` | Block execution entirely |
| `ask` | Request user confirmation (standard) |
| `force_ask` | Force prompt even if previously granted |
| `deny_unless_prior_grant` | Block unless explicitly granted before |

## Permission Grant Caching
- Grants stored in `permission_grants_workspace` table
- Keyed by tool name + args hash
- Cache expiry configurable in settings

## Auto-approve Modes
- `Accept-edits mode`: auto-approves file write operations at specific steps
- `--dangerously-skip-permissions` flag: skips all permission prompts
- `Auto-approve all tool permission requests without prompting`: global setting

## Permission Scopes
```
PERMISSION_SCOPE_WORKSPACE
```
Permissions can be scoped to workspace level.

## Permission Override
- `BypassSandbox: true` in tool call -> permission prompt
- `Ask permission` tool returns: `decision` (stop/continue/block) + `reason`
- `list_permissions` tool shows all granted permissions with expiry
- `ReloadPermissions` reloads from `config.json` with error handling

## UI Strings
```
"Requests permission for:"
"Requesting permission for:"
"No, deny and always deny for %s (Persist to settings.json)"
```

## PolicyGuardian Integration
Runs as a gate before tool execution:
- Tool usage policies
- Permission boundaries
- Security constraints
- Data classification policies
- Custom user-defined rules
