# Tool Schema Definitions

All tools implement the `Tool` interface:

```go
type Tool interface {
    Name() string
    Description() string
    Schema() *jsonschema.Schema
    Execute(ctx context.Context, args json.RawMessage) (*ToolResult, error)
    Validate(args json.RawMessage) error
    Capabilities() []Capability
    IsHidden() bool
}
```

---

## File Tools

### read_file

Read a file from the workspace.

```json
{
  "name": "read_file",
  "description": "Read the complete contents of a file from the workspace",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "File path relative to workspace root"
      }
    },
    "required": ["path"]
  }
}
```

Errors:
- `file not found: %s`

---

### write_file

Create a new file or overwrite an existing one.

```json
{
  "name": "write_file",
  "description": "Create a new file or overwrite existing file with content",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "File path to write to"
      },
      "content": {
        "type": "string",
        "description": "Content to write"
      },
      "overwrite": {
        "type": "boolean",
        "description": "Overwrite existing file (errors if false and file exists)"
      }
    },
    "required": ["path", "content"]
  }
}
```

Errors:
- `%s already exists and its contents were not overwritten with your code contents. If you intend to overwrite the file, make the same call with Overwrite set to true.`

---

### edit_file

Apply line-based edits using exact string replacement.

```json
{
  "name": "edit_file",
  "description": "Apply line-based edits to a file using exact string replacement",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "File path to edit"
      },
      "edits": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "oldString": {
              "type": "string",
              "description": "Text to replace"
            },
            "newString": {
              "type": "string",
              "description": "Replacement text"
            }
          },
          "required": ["oldString", "newString"]
        }
      },
      "dryRun": {
        "type": "boolean",
        "description": "Preview changes without applying"
      }
    },
    "required": ["path", "edits"]
  }
}
```

Errors:
- `oldString not found in content`
- `Found multiple matches for oldString. Provide more surrounding lines.`

---

## Command Tools

### run_command

Execute a shell command in the workspace.

```json
{
  "name": "run_command",
  "description": "Execute a shell command in the workspace",
  "inputSchema": {
    "type": "object",
    "properties": {
      "command": {
        "type": "string",
        "description": "Shell command to execute"
      },
      "description": {
        "type": "string",
        "description": "Short past-tense phrase describing what this accomplishes"
      },
      "timeout": {
        "type": "integer",
        "description": "Timeout in milliseconds"
      },
      "RunPersistent": {
        "type": "boolean",
        "description": "Create persistent terminal session"
      },
      "TerminalID": {
        "type": "string",
        "description": "Reuse existing persistent terminal by ID"
      },
      "is_background": {
        "type": "boolean",
        "description": "Run in background"
      },
      "BypassSandbox": {
        "type": "boolean",
        "description": "Bypass sandbox restrictions"
      }
    },
    "required": ["command"]
  }
}
```

Output templates:
- Success: `The command completed successfully.`
- Failure: `The command failed with exit code: %d`
- No output: `No output`
- Truncated (>100KB): `Output snapshot:`
- Sandbox error: `There were sandbox errors that may or may not be related to the failure.`

---

### background_command

Run a command in the background.

```json
{
  "name": "background_command",
  "description": "Run a command in the background",
  "inputSchema": {
    "type": "object",
    "properties": {
      "command": {
        "type": "string",
        "description": "Shell command to execute"
      },
      "description": {
        "type": "string",
        "description": "Short past-tense phrase describing what this accomplishes"
      }
    },
    "required": ["command"]
  }
}
```

Returns: `Background command ID: <uuid>`

---

### get_command_status

Check status of a background command.

```json
{
  "name": "get_command_status",
  "description": "Get status of a background command",
  "inputSchema": {
    "type": "object",
    "properties": {
      "command_id": {
        "type": "string",
        "description": "ID of the command to get status for"
      }
    },
    "required": ["command_id"]
  }
}
```

---

## Search Tools

### search_code

Search code using language server.

```json
{
  "name": "search_code",
  "description": "Search code in the workspace using language server",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query"
      },
      "path": {
        "type": "string",
        "description": "Optional path filter"
      },
      "regex": {
        "type": "boolean",
        "description": "Use regex"
      }
    },
    "required": ["query"]
  }
}
```

---

### glob

Fast file pattern matching.

```json
{
  "name": "glob",
  "description": "Fast file pattern matching with glob patterns",
  "inputSchema": {
    "type": "object",
    "properties": {
      "pattern": {
        "type": "string",
        "description": "Glob pattern to match"
      },
      "path": {
        "type": "string",
        "description": "Directory to search in"
      },
      "excludePatterns": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Patterns to exclude"
      }
    },
    "required": ["pattern"]
  }
}
```

---

### grep

Search file contents using regex.

```json
{
  "name": "grep",
  "description": "Search file contents using regular expressions",
  "inputSchema": {
    "type": "object",
    "properties": {
      "pattern": {
        "type": "string",
        "description": "Regex pattern to search for"
      },
      "path": {
        "type": "string",
        "description": "Directory to search"
      },
      "include": {
        "type": "string",
        "description": "File pattern to include"
      }
    },
    "required": ["pattern"]
  }
}
```

---

## Web Tools

### web_search

Search the web.

```json
{
  "name": "web_search",
  "description": "Search the web for information",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query"
      },
      "count": {
        "type": "integer",
        "description": "Number of results"
      }
    },
    "required": ["query"]
  }
}
```

---

### web_fetch

Fetch a URL.

```json
{
  "name": "web_fetch",
  "description": "Fetch a URL and return its content",
  "inputSchema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "format": "uri",
        "description": "URL to fetch"
      },
      "max_length": {
        "type": "integer",
        "description": "Max characters to return"
      }
    },
    "required": ["url"]
  }
}
```

---

## Agent Communication Tools

### send_message

Send a message to another agent.

```json
{
  "name": "send_message",
  "description": "Send a message to another agent (subagent, peer agent)",
  "inputSchema": {
    "type": "object",
    "properties": {
      "recipient": {
        "type": "string",
        "description": "The recipient ID to send the message to, e.g. a subagent conversation ID."
      },
      "message": {
        "type": "string",
        "description": "Message content"
      }
    },
    "required": ["recipient", "message"]
  }
}
```

---

### finish

Complete the task.

```json
{
  "name": "finish",
  "description": "Complete the task and end interaction. Must include a summary of work done.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "summary": {
        "type": "string",
        "description": "Brief summary of what was accomplished"
      }
    },
    "required": ["summary"]
  }
}
```

Prompt: `Call the finish tool only if you have verified that your changes pass all targeted tests.`

---

## Subagent Tools

### define_subagent

Define a reusable subagent.

```json
{
  "name": "define_subagent",
  "description": "Define a named subagent for specialized tasks",
  "inputSchema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Unique name for this subagent"
      },
      "description": {
        "type": "string",
        "description": "Description of when to use this subagent"
      },
      "system_prompt": {
        "type": "string",
        "description": "System prompt for the subagent"
      },
      "tool_groups": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Tool groups: read, write, communication, browser"
      }
    },
    "required": ["name", "description", "system_prompt"]
  }
}
```

---

### invoke_subagent

Invoke a defined subagent.

```json
{
  "name": "invoke_subagent",
  "description": "Invoke a previously defined subagent",
  "inputSchema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Name of the subagent to invoke"
      },
      "task": {
        "type": "string",
        "description": "Task description for the subagent"
      }
    },
    "required": ["name", "task"]
  }
}
```

---

### list_subagents

```json
{
  "name": "list_subagents",
  "description": "List all active subagents and their conversation IDs"
}
```

---

### kill_subagent

```json
{
  "name": "kill_subagent",
  "description": "Terminate specific subagents and all their descendants",
  "inputSchema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "Subagent conversation ID to kill"
      }
    },
    "required": ["id"]
  }
}
```

Cleanup: `When a subagent is killed, its branched workspaces will be deleted, but its logs and artifacts will be preserved.`

---

### kill_all_subagents

```json
{
  "name": "kill_all_subagents",
  "description": "Terminate all subagents and all their descendants"
}
```

---

## Browser Tools

### browser_navigate

```json
{
  "name": "browser_navigate",
  "description": "Navigate to a URL in the browser",
  "inputSchema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "format": "uri"
      }
    },
    "required": ["url"]
  }
}
```

---

### browser_click

```json
{
  "name": "browser_click",
  "description": "Click on an element in the browser",
  "inputSchema": {
    "type": "object",
    "properties": {
      "selector": {
        "type": "string"
      },
      "xpath": {
        "type": "string"
      }
    }
  }
}
```

---

### browser_screenshot

```json
{
  "name": "browser_screenshot",
  "description": "Take a screenshot of the current page"
}
```

---

### browser_javascript

```json
{
  "name": "browser_javascript",
  "description": "Execute JavaScript on a page in the browser for navigation and interaction",
  "inputSchema": {
    "type": "object",
    "properties": {
      "script": {
        "type": "string",
        "description": "JavaScript expression or statement"
      }
    },
    "required": ["script"]
  }
}
```

---

### browser_scroll

```json
{
  "name": "browser_scroll",
  "description": "Scroll the page in a specified direction",
  "inputSchema": {
    "type": "object",
    "properties": {
      "direction": {
        "type": "string",
        "enum": ["left", "right", "up", "down"],
        "description": "Direction of the scroll"
      }
    },
    "required": ["direction"]
  }
}
```

---

### browser_console_logs

```json
{
  "name": "browser_console_logs",
  "description": "Capture browser console logs since last capture"
}
```

---

## Tool Execution Pipeline

```
Tool Called
  → Step Created (PENDING)
  → Permission Check (WAITING if needs approval)
  → Validation (Validate JSON schema)
  → Pre-Tool Hook (plugin hooks)
  → Execution (RUNNING)
  → Post-Tool Hook
  → Result Truncation (if >100KB → "Output snapshot:")
  → Step Completed (DONE)
  → On Error (ERROR)
  → On Cancel (CANCELED)
```

### Step Status Machine

```go
StepStatusPending  = 1  // Created but not started
StepStatusRunning  = 2  // Currently executing
StepStatusWaiting  = 3  // Waiting for user approval
StepStatusDone     = 4  // Completed successfully
StepStatusError    = 5  // Failed with error
StepStatusCanceled = 6  // Canceled by user
```

### Step Types

```go
StepTypeCodeAction    = 0  // File edit
StepTypeGrepSearch    = 1  // Search
StepTypeRunCommand    = 2  // Shell command
StepTypeReadFile      = 3
StepTypeWriteFile     = 4
StepTypeBrowserAction = 5
StepTypeWebSearch     = 6
StepTypeSubagentCall  = 7
StepTypeSendMessage   = 8
StepTypeMCPToolCall   = 9
```

### Step Sources

```go
StepSourceUserExplicit = 1  // User explicitly requested
StepSourceLLM          = 2  // LLM-generated
StepSourceSystemSDK    = 3  // SDK/API
StepSourcePlugin       = 4  // Plugin
```

### Permission Cache

Grants are cached in `permission_grants_workspace` table to avoid re-prompting for identical tool+args combinations.
