# Subagent Advanced Features

## Subagent Roles
Each subagent can have a named role for UI display and distinction:
```json
"role": {
  "type": "string",
  "description": "A 2-5 word description of the subagent's role. Should read similar to a job title, e.g. 'Codebase Researcher', 'Database Debugger', etc. Should also be detailed enough to distinguish between different subagents who might share similar purposes."
}
```

## Subagent System Prompt
```json
"systemPrompt": {
  "type": "string",
  "description": "A detailed system prompt for this subagent."
}
```

## Workspace Modes
```json
"workspaceMode": {
  "type": "string",
  "enum": ["inherit", "branch", "share"],
  "description": "Workspace mode for the subagent."
}
```
- `"inherit"` (default) — same workspace as parent agent
- `"branch"` — new isolated workspace branched/cloned from parent
- `"share"` — new workspace sharing parent's underlying repo directory (like `git worktree`), independent branching without storage duplication

## Resume from ID
```json
"resumeFromID": {
  "type": "string",
  "description": "ID of a previous subagent to resume from. If provided, the agent will continue from the previous context. If empty, the subagent will start with an empty context. Use to resume work from a cancelled subagent, or when the task benefits from previous context."
}
```

## File Tools for Subagents
```json
"useFileTools": {
  "type": "boolean",
  "description": "Set true to equip the subagent with tools to create and edit files, and run commands."
}
```
When false, subagent has read-only browser/web access.

## Batch Subagent Invocation
```json
{
  "name": "invoke_subagents",
  "inputSchema": {
    "type": "object",
    "properties": {
      "subagents": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "task": { "type": "string" },
            "role": { "type": "string" },
            "workspaceMode": { "type": "string" },
            "systemPrompt": { "type": "string" },
            "useFileTools": { "type": "boolean" }
          }
        },
        "description": "Array of subagents to invoke concurrently."
      }
    },
    "required": ["subagents"]
  }
}
```

## Batch Subagent Cleanup
When subagents are killed:
- Branched workspaces are deleted
- Logs and artifacts are preserved
- `kill_all_subagents` terminates all descendants recursively
