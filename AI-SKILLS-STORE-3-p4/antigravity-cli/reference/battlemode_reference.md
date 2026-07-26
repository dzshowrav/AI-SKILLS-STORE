# BattleMode Reference

---

## Overview

BattleMode is a restricted execution sandbox with path-level controls. It wraps the model API to intercept and rewrite file paths.

---

## Configuration

```go
type BattleModeConfig struct {
    AllowedPaths []string   // Only these paths are accessible
    Replacements []string   // Path rewrite rules
}
```

### AllowedPaths
List of absolute directory paths that tools can access:
```json
{
  "allowedPaths": [
    "/workspace/project-a",
    "/tmp/workdir"
  ]
}
```

### Replacements
Path prefix rewrites applied to all file operations:
```json
{
  "replacements": [
    ["/home/user/project", "/workspace/project-a"],
    ["/etc/config", "/workspace/config-stubs"]
  ]
}
```

---

## Activation

BattleMode is separate from regular sandbox. Uses `BattleModePermissionManager` instead of the standard one.

```go
func WrapModelAPIWithReplacer(api ModelAPI) ModelAPI
```

---

## Permission Manager

`BattleModePermissionManager` enforces:
- Only `AllowedPaths` are readable/writable
- Path rewrites via `Replacements`
- Deny all operations outside allowed paths
- No bypass available (unlike regular sandbox)

---

## Use Cases

- **Competitions**: LeetCode-style coding challenges
- **CTF**: Capture-the-flag environments
- **Code interviews**: Screen-based coding tests
- **Locked-down environments**: CI/CD pipelines

---

## Difference from Regular Sandbox

| Feature | Regular Sandbox | BattleMode |
|---------|----------------|------------|
| Path restriction | Optional allow/deny lists | Strict allowed paths only |
| Bypass available | Yes (`BypassSandbox`) | No |
| Network restriction | Configurable | Full restriction |
| Permission override | Via `--dangerously-skip-permissions` | Not available |
| Path rewriting | No | Yes (`Replacements`) |
| Permission manager | Standard | `BattleModePermissionManager` |
