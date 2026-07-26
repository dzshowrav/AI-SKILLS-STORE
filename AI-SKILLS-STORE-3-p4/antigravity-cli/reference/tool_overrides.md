# Tool Override Mapper Reference

---

## Overview

The `ToolOverrideMapper` allows runtime modification of tool arguments before they reach the executor. This is used for:
- Injecting context (e.g., workspace path)
- Enforcing policies (e.g., restricting dangerous flags)
- Applying user preferences
- Default values for optional fields

---

## Architecture

```
cortex/tools/tooloverrides/
  tool_override_mapper.go
```

```go
func NewToolOverrideMapper(rules []OverrideRule) *ToolOverrideMapper
func (m *ToolOverrideMapper) ApplyOverrides(toolName string, args json.RawMessage) (json.RawMessage, error)
func applyArgumentOverridesToSchema(schema *jsonschema.Schema, overrides map[string]interface{})
```

---

## Override Rules

```go
type OverrideRule struct {
    ToolName  string                 // Tool to apply overrides to ("" = all)
    Args      map[string]interface{} // Arguments to override
    Mode      OverrideMode           // How to apply
}

type OverrideMode string
const (
    OverrideModeSet   OverrideMode = "set"     // Always set this value
    OverrideModeMerge OverrideMode = "merge"   // Merge with existing
    OverrideModeDefault OverrideMode = "default" // Only set if not provided
)
```

---

## Example

```json
{
  "toolOverrides": [
    {
      "toolName": "run_command",
      "args": {
        "timeout": 30000,
        "is_background": false
      },
      "mode": "default"
    },
    {
      "toolName": "write_file",
      "args": {
        "workspaceRoot": "/home/user/project"
      },
      "mode": "set"
    }
  ]
}
```
