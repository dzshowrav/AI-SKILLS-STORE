---
name: antigravity-cli
description: Complete Antigravity CLI (agy) reconstruction reference — every feature, tool, schema, config, UI pattern, API, and implementation detail needed to rebuild from scratch. Google's AI coding assistant CLI for Termux/Android.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  platform: termux, linux, macos
  version: 1.0.0
---

# Antigravity CLI (agy) — Complete Reconstruction Reference

This document contains every single detail extracted from the Antigravity CLI binary (`agy.va39` v1.0.0, 166MB ARM64 glibc Go binary) and its Termux wrapper (`agy`, 15KB Android ELF). Use this to rebuild the entire system from scratch.

---

## 0. Binary Architecture

### Two-Layer Deployment
```
/usr/bin/agy          — 15KB Android native ELF (linker64) wrapper
/usr/bin/agy.va39     — 166MB ARM64 glibc Go binary (v1.0.0)
```

### Wrapper Logic (agy ELF)
1. Reads `/proc/self/exe` to find own path
2. Strips `.va39` suffix from own name to find the real binary (`agy` → `agy.va39`)
3. Checks `AGY_AUTO_UPDATE` env var
4. Invokes `qemu-aarch64` to run the glibc binary
5. Uses `execv` to replace process image
6. Falls back to `%s/bin/qemu-aarch64` path

### Build Info
- **Language**: Go (standard library + gRPC + protobuf)
- **Compiler**: Go 1.24+ (gc)
- **Target**: linux/arm64
- **CGO**: enabled (glibc dependencies: libc.so, libdl.so)
- **Net**: `netdns=cgo` (uses system resolver)
- **Version**: `r27d` (Android NDK version for wrapper)
- **Size**: 165,695,240 bytes (agy.va39)
- **Compression**: UPX? No — raw ELF

### Internal Dependencies (from strings)
```
github.com/agnivade/levenshtein
github.com/charmbracelet/glamour  (markdown rendering)
github.com/charmbracelet/lipgloss  (terminal styling)
github.com/google/cel-go           (expression evaluation)
github.com/google/shlex             (shell lexer)
github.com/google/uuid              (UUID generation)
github.com/jdkato/prose             (NLP)
github.com/microcosm-cc/bluemonday  (HTML sanitization)
github.com/olekukonezko/tablewriter (table rendering)
github.com/pkoukk/tiktoken-go       (token counting)
github.com/sabhiram/go-gitignore    (gitignore patterns)
github.com/xeipuuv/gojsonschema     (JSON schema validation)
google.golang.org/grpc              (gRPC)
google.golang.org/protobuf          (protobuf)
charm.land/bubbletea/v2             (TUI framework)
charm.land/bubbles                  (TUI components)
charm.land/charm                    (Charm cloud)
go.uber.org/zap                     (logging)
go.uber.org/automaxprocs            (CPU detection)
golang.org/x/sync/errgroup          (concurrency)
gopkg.in/yaml.v3                    (YAML parsing)
gorm.io/gorm                        (ORM)
gorm.io/driver/sqlite               (SQLite driver)
mvdan.cc/sh/v3                      (shell script interpreter)
github.com/fsnotify/fsnotify        (file watching)
github.com/atotto/clipboard         (clipboard access)
github.com/creack/pty               (PTY allocation)
github.com/neovim/go-client         (Neovim integration)
```

---

## 1. CLI System

### Entry Point

```
cmd/tc/main.go — Bootstrap with:
  1. Flag parsing (cobra or pflag)
  2. Config loading (koanf: file + env + flags)
  3. Logging initialization (zap)
  4. Model/service initialization
  5. Start Bubble Tea program
  6. Graceful shutdown via signal.NotifyContext
```

### Complete Flag Set
```go
type CLIArgs struct {
    AddDirs     []string `name:"add-dir" description:"Add a directory to the workspace (repeatable)"`
    Agent       string   `name:"agent" description:"Agent for the current CLI session"`
    Continue    bool     `name:"continue" short:"c" description:"Continue the most recent conversation"`
    Conversation string  `name:"conversation" description:"Resume a previous conversation by ID"`
    DangerouslySkipPermissions bool `name:"dangerously-skip-permissions" description:"Auto-approve all tool permission requests without prompting"`
    PromptInteractive bool `name:"prompt-interactive" short:"i" description:"Run an initial prompt interactively and continue the session"`
    LogFile     string   `name:"log-file" description:"Override CLI log file path"`
    Mode        string   `name:"mode" description:"Set agent execution mode (accept-edits, plan)"`
    Model       string   `name:"model" description:"Model for the current CLI session"`
    NewProject  bool     `name:"new-project" description:"Create a new project for this session"`
    Print       bool     `name:"print" short:"p" description:"Run a single prompt non-interactively and print the response"`
    PrintTimeout Duration `name:"print-timeout" default:"5m0s" description:"Timeout for print mode wait"`
    Project     string   `name:"project" description:"Project ID for the current CLI session"`
    Sandbox     bool     `name:"sandbox" description:"Run in a sandbox with terminal restrictions enabled"`
}
```

### Subcommand Routing
```go
type CLICommand string

const (
    CmdAgent     CLICommand = "agent"
    CmdAgents    CLICommand = "agents"
    CmdChangelog CLICommand = "changelog"
    CmdHelp      CLICommand = "help"
    CmdInstall   CLICommand = "install"
    CmdModels    CLICommand = "models"
    CmdPlugin    CLICommand = "plugin"
    CmdPlugins   CLICommand = "plugins"
    CmdUpdate    CLICommand = "update"
)
```

### Subcommand Implementations

#### `agent` / `agents`
Fetches from backend API `GetAvailableAgents()`. Returns list of:
```go
type Agent struct {
    ID          string
    Name        string
    Description string
    SystemPrompt string
    ToolGroups  []string
    Model       string
    AgentType   AgentType // UserAgent, MainAgent, Subagent
    IsAgentic   bool
    AgentPath   string
    Version     string
}
```

#### `changelog`
Reads embedded version data. Current: v1.0.0 "Initial release of the Antigravity CLI."

#### `install`
```go
type InstallArgs struct {
    Dir         string `description:"Custom directory target to configure PATH for"`
    SkipAliases bool   `description:"Bypass shell profile alias purging"`
    SkipPath    bool   `description:"Bypass shell profile PATH appending"`
}
```
Writes to shell profile: `~/.bashrc`, `~/.zshrc`, etc. Adds `export PATH=...` and shell aliases.

#### `models`
```go
type Model struct {
    Name        string     // "Gemini 3.5 Flash"
    ID          string     // "gemini-2.5-flash"
    Tier        ModelTier  // Medium, High, Low
    Capabilities []Capability
    Provider    string
    ContextSize int
    Pricing     PricingTier
}

type ModelTier string
const (
    TierLow    ModelTier = "Low"
    TierMedium ModelTier = "Medium"
    TierHigh   ModelTier = "High"
    TierThinking ModelTier = "Thinking"
)
```

Available models from `agy models` output:
- Gemini 3.5 Flash (Medium, High, Low)
- Gemini 3.1 Pro (Low, High)
- Claude Sonnet 4.6 (Thinking)
- Claude Opus 4.6 (Thinking)
- GPT-OSS 120B (Medium)

Fetched via `GetAvailableModels` gRPC endpoint.

#### `plugin` / `plugins`
```
agy plugin list                  # List installed plugins
agy plugin install <name>        # Install plugin
agy plugin uninstall <name>      # Uninstall plugin
agy plugin enable <name>         # Enable plugin
agy plugin disable <name>        # Disable plugin
```

#### `update`
```go
type UpdateArgs struct {
    Auto bool `short:"y" name:"yes" description:"Apply updates without prompting"`
}
// Also checks AGY_AUTO_UPDATE env var
```

---

## 2. Configuration System

### Configuration Discovery
The agent walks from CWD up to repo root discovering:

```
.projects/<project-id>/
  .agents/
    agents.md                    # Agent instructions
    rules/*.md                   # Rule files
    skills.json                  # Skill references
    plugins.json                 # Plugin references
    mcp_config.json              # MCP server definitions
  AGENTS.md                      # Alternative agent instructions
  GEMINI.md                      # Alternative agent instructions
  
~/.gemini/config/                # Global config directory
  mcp_config.json                # Global MCP servers
  config.json                    # User settings

configs/users/<username>/_agents/ # Per-user agent configs (CitC)
```

### Configuration Files

#### `.agents/rules/*.md` (Rule Format)
```markdown
# Rule Title

Description of the rule that gets merged into agent instructions.

- Bullet points with specific guidance
- Code conventions
- Architecture patterns
```

#### `skills.json`
```json
{
  "skills": [
    {
      "name": "skill-name",
      "description": "Skill description",
      "path": "/path/to/shared/skills.json",
      "version": "1.0.0"
    }
  ]
}
```

#### `plugins.json`
```json
{
  "plugins": [
    {
      "name": "plugin-name",
      "enabled": true,
      "config": {}
    }
  ]
}
```

#### `mcp_config.json`
```json
{
  "mcpServers": {
    "server-name": {
      "command": "python3",
      "args": ["-m", "mcp_server"],
      "env": {
        "API_KEY": "${API_KEY}"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

---

## 3. Agent System

### Agent Config Structure
```go
type AgentConfig struct {
    Name           string
    Description    string
    SystemPrompt   string
    ToolGroups     []string
    AllowedTools   []string
    DisallowedTools []string
    Model          string
    Mode           AgentMode
    Temperature    float64
    MaxTokens      int
    AgentType      AgentType
    IsAgentic      bool
    AgentPath      string
    Version        string
}
```

### Agent Modes
```go
type AgentMode string
const (
    ModeAcceptEdits AgentMode = "accept-edits"  // Agent proposes, user approves
    ModePlan        AgentMode = "plan"           // Agent plans first, then executes
)
```

### Agent Types
```go
type AgentType int32
const (
    AgentTypeUnspecified AgentType = 0
    AgentTypeUser        AgentType = 1  // User-facing agent
    AgentTypeMain        AgentType = 2  // Main conversation agent
    AgentTypeSubagent    AgentType = 3  // Spawned subagent
)
```

### System Prompt (built-in)
```
You are an expert AI coding assistant and are pair programming with a USER
to solve a coding task. When asked, you focus on outlining the USER's main
goals and anticipating likely next steps they will take. Your response should
be well-organized and reflect the essence of the dialog.
```

Alternative (Codeium-based):
```
You are Cascade, a powerful agentic AI coding assistant designed by the
Codeium engineering team: a world-class AI company based in Silicon Valley,
California.
```

### Non-Interactive Mode Prompt
```
You are in NON-INTERACTIVE mode. The user will not respond to questions
or requests for approval. Work autonomously.
```

### Research Subagent Prompt
```
You are a research subagent. Your job is to explore the codebase, read files,
and search for information on behalf of the main agent. You have read-only
access and cannot make any changes to the codebase. Focus on gathering
accurate, relevant information and reporting your findings clearly and
concisely back to the main agent via the send_message tool.
```

### Agent Environment Variables
```
ANTIGRAVITY_CONVERSATION_ID=<uuid>
ANTIGRAVITY_EXECUTABLE_DATA_DIR=<path>
ANTIGRAVITY_SIDECAR_WEB_PORT=<port>
ANTIGRAVITY_SAFECLIS_SOURCE=<source>
AGY_BROWSER_ACTIVE_PORT_FILE=<path>
JETSKI_BROWSER_USER_DATA_DIR=<path>
CODEIUM_VMODULE=<value>
```

---

## 4. Conversation System

### Conversation Model
```go
type Conversation struct {
    ID            string    `gorm:"primaryKey"`
    ProjectID     string    `gorm:"index"`
    AgentID       string
    AgentName     string    `gorm:"column:agent_name"`
    AgentPath     string
    ModelName     string
    CreatedAt     time.Time
    UpdatedAt     time.Time
    LastMessageAt time.Time
    Title         string
    Messages      []Message `gorm:"foreignKey:ConversationID"`
    Metadata      JSON
    SandboxID     string
    WorkspaceID   string
}

type Message struct {
    ID             string    `gorm:"primaryKey"`
    ConversationID string    `gorm:"index"`
    Role           string    // "user", "assistant", "tool", "system"
    Content        string
    ToolCalls      []ToolCall `gorm:"foreignKey:MessageID"`
    CreatedAt      time.Time
    TokenCount     int
    Metadata       JSON
}

type ToolCall struct {
    ID          string    `gorm:"primaryKey"`
    MessageID   string    `gorm:"index"`
    ToolName    string
    Arguments   JSON
    Result      string
    Status      ToolCallStatus
    Duration    time.Duration
    Error       string
    CreatedAt   time.Time
}
```

### Conversation Commands
- `/continue` or `-c` — Resume most recent conversation
- `--conversation <id>` — Resume specific conversation by ID
- Conversations have unique IDs used for subagent spawning
- Context menus: Right-click to Rename or Delete

### Conversation Storage
- SQLite via gorm
- `conversations` table
- `messages` table (foreign key: conversation_id)
- `tool_calls` table (foreign key: message_id)
- `last_active_at` timestamp for ordering

---

## 5. Tool System

### Architecture
Each tool implements:
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

### Tool Lifecycle (Cortex Step Pipeline)
```
Tool Called
  → Step Created (PENDING)
  → Permission Check (WAITING if needs approval)
  → Validation (Validate schema)
  → Pre-Tool Hook (plugin hooks)
  → Execution (RUNNING)
  → Post-Tool Hook
  → Result Truncation (if >100KB)
  → Step Completed (DONE)
  → On Error (ERROR)
  → On Cancel (CANCELED)
```

### Step Status Machine
```go
type StepStatus int32
const (
    StepStatusUnspecified StepStatus = 0
    StepStatusPending     StepStatus = 1
    StepStatusRunning     StepStatus = 2
    StepStatusWaiting     StepStatus = 3  // Waiting for user approval
    StepStatusDone        StepStatus = 4
    StepStatusError       StepStatus = 5
    StepStatusCanceled    StepStatus = 6
)
```

### Step Source Types
```go
type StepSource int32
const (
    StepSourceUnspecified    StepSource = 0
    StepSourceUserExplicit   StepSource = 1  // User explicitly requested
    StepSourceLLM            StepSource = 2  // LLM-generated
    StepSourceSystemSDK      StepSource = 3  // SDK/API
    StepSourcePlugin         StepSource = 4  // Plugin
)
```

### Step Types
```go
type StepType int32
const (
    StepTypeCodeAction      StepType = 0  // File edit
    StepTypeGrepSearch      StepType = 1  // Search
    StepTypeRunCommand      StepType = 2  // Shell command
    StepTypeReadFile        StepType = 3
    StepTypeWriteFile       StepType = 4
    StepTypeBrowserAction   StepType = 5
    StepTypeWebSearch       StepType = 6
    StepTypeSubagentCall    StepType = 7
    StepTypeSendMessage     StepType = 8
    StepTypeMCPToolCall     StepType = 9
)
```

### Complete Tool Definitions

#### Tool: `read_file`
```json
{
  "name": "read_file",
  "description": "Read the complete contents of a file from the workspace",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": { "type": "string", "description": "File path relative to workspace root" }
    },
    "required": ["path"]
  }
}
```

#### Tool: `write_file`
```json
{
  "name": "write_file",
  "description": "Create a new file or overwrite existing file with content",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": { "type": "string", "description": "File path to write to" },
      "content": { "type": "string", "description": "Content to write" },
      "overwrite": { "type": "boolean", "description": "Overwrite existing file (errors if false and file exists)" }
    },
    "required": ["path", "content"]
  }
}
```

Error message: `%s already exists and its contents were not overwritten with your code contents. If you intend to overwrite the file, make the same call with Overwrite set to true. If you want to edit this file, please view its contents first then use a code edit tool. Otherwise, create a new file with a different name.`

#### Tool: `edit_file`
```json
{
  "name": "edit_file",
  "description": "Apply line-based edits to a file using exact string replacement",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": { "type": "string", "description": "File path to edit" },
      "edits": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "oldString": { "type": "string", "description": "Text to replace" },
            "newString": { "type": "string", "description": "Replacement text" }
          },
          "required": ["oldString", "newString"]
        }
      },
      "dryRun": { "type": "boolean", "description": "Preview changes without applying" }
    },
    "required": ["path", "edits"]
  }
}
```

#### Tool: `run_command`
```json
{
  "name": "run_command",
  "description": "Execute a shell command in the workspace",
  "inputSchema": {
    "type": "object",
    "properties": {
      "command": { "type": "string", "description": "Shell command to execute" },
      "description": { "type": "string", "description": "Short past-tense phrase describing what this accomplishes" },
      "timeout": { "type": "integer", "description": "Timeout in milliseconds" },
      "RunPersistent": { "type": "boolean", "description": "Create persistent terminal session" },
      "TerminalID": { "type": "string", "description": "Reuse existing persistent terminal by ID" },
      "is_background": { "type": "boolean", "description": "Run in background" },
      "BypassSandbox": { "type": "boolean", "description": "Bypass sandbox restrictions" }
    },
    "required": ["command"]
  }
}
```

Output templates:
- Success: `The command completed successfully.`
- Failure: `The command failed with exit code: {{ $exitCode }}`
- No output: `No output`
- Truncated: `Output snapshot:` (when >100KB)
- Sandbox error: `There were sandbox errors that may or may not be related to the failure. If you think the failure is because of running in the sandbox, you can run the command again with BypassSandbox set to true to request explicit user permission.`
- Canceled: `The following output was generated before the cancellation.`

#### Tool: `background_command`
```json
{
  "name": "background_command",
  "description": "Run a command in the background",
  "inputSchema": {
    "type": "object",
    "properties": {
      "command": { "type": "string" },
      "description": { "type": "string" }
    },
    "required": ["command"]
  }
}
```
Returns `CommandId` for later status check.

#### Tool: `get_command_status`
```json
{
  "name": "get_command_status",
  "description": "Get status of a background command",
  "inputSchema": {
    "type": "object",
    "properties": {
      "command_id": { "type": "string", "description": "ID of the command to get status for" }
    },
    "required": ["command_id"]
  }
}
```

#### Tool: `search_code`
```json
{
  "name": "search_code",
  "description": "Search code in the workspace using language server",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Search query" },
      "path": { "type": "string", "description": "Optional path filter" },
      "regex": { "type": "boolean", "description": "Use regex" }
    },
    "required": ["query"]
  }
}
```

#### Tool: `glob`
```json
{
  "name": "glob",
  "description": "Fast file pattern matching with glob patterns",
  "inputSchema": {
    "type": "object",
    "properties": {
      "pattern": { "type": "string", "description": "Glob pattern to match" },
      "path": { "type": "string", "description": "Directory to search in" },
      "excludePatterns": { "type": "array", "items": { "type": "string" } }
    },
    "required": ["pattern"]
  }
}
```

#### Tool: `grep`
```json
{
  "name": "grep",
  "description": "Search file contents using regular expressions",
  "inputSchema": {
    "type": "object",
    "properties": {
      "pattern": { "type": "string", "description": "Regex pattern to search for" },
      "path": { "type": "string", "description": "Directory to search" },
      "include": { "type": "string", "description": "File pattern to include" }
    },
    "required": ["pattern"]
  }
}
```

#### Tool: `web_search`
```json
{
  "name": "web_search",
  "description": "Search the web for information",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Search query" },
      "count": { "type": "integer", "description": "Number of results" }
    },
    "required": ["query"]
  }
}
```

#### Tool: `web_fetch`
```json
{
  "name": "web_fetch",
  "description": "Fetch a URL and return its content",
  "inputSchema": {
    "type": "object",
    "properties": {
      "url": { "type": "string", "format": "uri", "description": "URL to fetch" },
      "max_length": { "type": "integer", "description": "Max characters" }
    },
    "required": ["url"]
  }
}
```

#### Tool: `send_message` (Agent Communication)
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
      "message": { "type": "string", "description": "Message content" }
    },
    "required": ["recipient", "message"]
  }
}
```

#### Tool: `finish`
```json
{
  "name": "finish",
  "description": "Complete the task and end interaction. Must include a summary of work done.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "summary": { "type": "string", "description": "Brief summary of what was accomplished" }
    },
    "required": ["summary"]
  }
}
```

Prompt: `Call the finish tool **only if** you have verified that your changes pass all targeted tests. Make sure to include a brief summary of your work right before calling the finish tool with the following format:`

#### Tool: `subagent_define`
```json
{
  "name": "define_subagent",
  "description": "Define a named subagent for specialized tasks",
  "inputSchema": {
    "type": "object",
    "properties": {
      "name": { "type": "string", "description": "Unique name for this subagent" },
      "description": { "type": "string", "description": "Description of when to use this subagent" },
      "system_prompt": { "type": "string", "description": "System prompt for the subagent" },
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

#### Tool: `subagent_invoke`
```json
{
  "name": "invoke_subagent",
  "description": "Invoke a previously defined subagent",
  "inputSchema": {
    "type": "object",
    "properties": {
      "name": { "type": "string", "description": "Name of the subagent to invoke" },
      "task": { "type": "string", "description": "Task description for the subagent" }
    },
    "required": ["name", "task"]
  }
}
```

#### Tool: `subagent_list`
```json
{
  "name": "list_subagents",
  "description": "List all active subagents and their conversation IDs"
}
```

#### Tool: `subagent_kill`
```json
{
  "name": "kill_subagent",
  "description": "Terminate specific subagents and all their descendants",
  "inputSchema": {
    "type": "object",
    "properties": {
      "id": { "type": "string", "description": "Subagent conversation ID to kill" }
    },
    "required": ["id"]
  }
}
```

Cleanup behavior: `When a subagent is killed, its branched workspaces will be deleted, but its logs and artifacts will be preserved.`

#### Tool: `subagent_kill_all`
```json
{
  "name": "kill_all_subagents",
  "description": "Terminate all subagents and all their descendants"
}
```

#### Browser Tools

##### `browser_navigate`
```json
{
  "name": "browser_navigate",
  "description": "Navigate to a URL in the browser",
  "inputSchema": {
    "type": "object",
    "properties": {
      "url": { "type": "string", "format": "uri" }
    },
    "required": ["url"]
  }
}
```

##### `browser_click`
```json
{
  "name": "browser_click",
  "description": "Click on an element in the browser",
  "inputSchema": {
    "type": "object",
    "properties": {
      "selector": { "type": "string" },
      "xpath": { "type": "string" }
    }
  }
}
```

##### `browser_screenshot`
```json
{
  "name": "browser_screenshot",
  "description": "Take a screenshot of the current page"
}
```

##### `browser_javascript`
```json
{
  "name": "browser_javascript",
  "description": "Execute JavaScript on a page in the browser for navigation and interaction. The JavaScript runs in the page context and should be a valid expression or statement sequence. Does not modify page content.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "script": { "type": "string", "description": "JavaScript expression or statement" }
    },
    "required": ["script"]
  }
}
```

##### `browser_scroll`
```json
{
  "name": "browser_scroll",
  "description": "Scroll the page in a specified direction. For vertical scroll, dy is automatically set to the height of the element/page. For horizontal scroll, dx the width of the element/page. Will output the number of pixels scrolled, indicating 0 pixels if no scrolling occurred.",
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

JavaScript implementation:
```javascript
const originalScrollBehavior = getComputedStyle(document.documentElement).scrollBehavior;
document.documentElement.style.scrollBehavior = 'smooth';
// Start a timeout to handle cases where "scrollend" does not trigger
const timeout = setTimeout(() => { /* cleanup */ }, 1000);
document.addEventListener("scrollend", cleanup, { once: true });
// For vertical scroll, dy is auto-set to element/page height
// For horizontal scroll, dx set to width
window.scrollBy(0, dy);
```

##### `browser_console_logs`
```json
{
  "name": "browser_console_logs",
  "description": "Capture browser console logs since last capture"
}
```

JavaScript implementation:
```javascript
const logs = [...window.__jetski_console_buffer_{{CONTEXT_ID}}];
delete window.__revert_jetski_console_buffer_{{CONTEXT_ID}};
```

Console buffer setup:
```javascript
const consoleMethods = ['assert', 'clear', 'count', 'countReset', 'debug', 'dir', 'dirxml', ...];
const originalConsole = {};
consoleMethods.forEach(method => {
    originalConsole[method] = console[method];
    console[method] = function(...args) {
        // buffer the log
    };
});
window.__revert_jetski_console_buffer_{{CONTEXT_ID}} = function() {
    consoleMethods.forEach(m => console[m] = originalConsole[m]);
};
```

### Tool Permission / Safety System

```go
type PermissionScope struct {
    ToolName         string
    Command          string   // For run_command
    Path             string   // For file operations
    Intent           DataIntent // read, persist, transmit, execute
    DataType         DataType  // code, config, script
    SecurityType     SecurityType // any, secrets, infrastructure
    ChangeType       ChangeType // path, env_var, alias
}

type DataIntent string
const (
    IntentRead      DataIntent = "read"
    IntentPersist   DataIntent = "persist"
    IntentTransmit  DataIntent = "transmit"
    IntentExecute   DataIntent = "execute"
    IntentOther     DataIntent = "other"
)

type DataType string
const (
    DataTypeCode   DataType = "code"
    DataTypeConfig DataType = "config"
    DataTypeScript DataType = "script"
)

type SecurityType string
const (
    SecurityAny            SecurityType = "any"
    SecuritySecrets        SecurityType = "secrets"
    SecurityInfrastructure SecurityType = "infrastructure"
    SecurityCode           SecurityType = "code"
)
```

Permission grant caching: grants stored in `permission_grants_workspace` table with tool name + args hash.

### Tool Confirmation Panel (UI)
```
"Tool confirmation failed: %v"
"Requests permission for:"
"Allow access to this file?"
"Requesting permission for:"
```

---

## 6. Plugin System

### Plugin Directory Structure
```
plugins/<plugin_name>/
  plugin.json       # Required manifest
  hooks.json        # Optional lifecycle hooks
  mcp_config.json   # Optional MCP servers
  rules/            # Optional rule files (merged when active)
  skills/           # Optional skill files
  data/             # Persistent data directory
```

### Plugin Manifest (plugin.json)
```json
{
  "name": "plugin-name",
  "description": "Plugin description",
  "version": "1.0.0",
  "author": "Author Name",
  "dependencies": {
    "other-plugin": ">=1.0.0"
  },
  "min_cli_version": "1.0.0",
  "skills": ["skill1", "skill2"],
  "rules": ["rule1.md", "rule2.md"],
  "mcp_servers": ["server1"]
}
```

### Lifecycle Hooks (hooks.json)
```json
{
  "hooks": [
    { "event": "on_activate", "command": "echo 'plugin activated'" },
    { "event": "on_deactivate", "command": "echo 'plugin deactivated'" },
    { "event": "before_conversation", "command": "..." },
    { "event": "after_conversation", "command": "..." },
    { "event": "before_tool_call", "command": "..." },
    { "event": "after_tool_call", "command": "..." }
  ]
}
```

### Plugin Loading
1. Scan `plugins/` directory in workspace root and global config
2. Read `plugin.json` for each
3. Merge rules from `rules/` into active rule set
4. Register MCP servers from `mcp_config.json`
5. Make skills from `skills/` available
6. Register lifecycle hooks from `hooks.json`

---

## 7. Sidecar System

### Sidecar Definition
```go
type SidecarConfig struct {
    Command       string   `json:"command"`
    Args          []string `json:"args"`
    RestartPolicy string   `json:"restart_policy"` // "always", "on_failure", "never"
    Description   string   `json:"description"`
    Env           map[string]string `json:"env"`
    WorkingDir    string   `json:"working_dir"`
}
```

### Sidecar Lifecycle
1. Agent starts → sidecar processes spawn
2. Each sidecar gets `ANTIGRAVITY_EXECUTABLE_DATA_DIR` pointing to its data dir
3. Sidecar can communicate via agent API at `ANTIGRAVITY_SIDECAR_WEB_PORT`
4. On crash, restart based on `restart_policy`
5. On agent stop, all sidecars receive SIGTERM

### Example Sidecar
```json
{
  "command": "python3",
  "args": ["sidecar.py"],
  "restart_policy": "always",
  "description": "Processes background tasks"
}
```

### Scheduled Tasks
```json
{
  "builtin": "schedule",
  "args": ["30 9 * * *", "agentapi", "new-conversation", "check my messages"],
  "restart_policy": "always",
  "description": "Checks morning messages."
}
```
Uses cron expression format. Can invoke `agentapi` commands.

---

## 8. MCP Integration

### MCP Server Config
```json
{
  "mcpServers": {
    "my-server": {
      "command": "python3",
      "args": ["-m", "my_mcp_server"],
      "env": { "KEY": "value" },
      "disabled": false,
      "autoApprove": ["tool1", "tool2"]
    }
  }
}
```

### MCP Types
```go
type McpServerConfig struct {
    Command     string
    Args        []string
    Env         map[string]string
    Disabled    bool
    AutoApprove []string
}

type McpServerStatus int32
const (
    McpStatusUnspecified McpServerStatus = 0
    McpStatusConnecting  McpServerStatus = 1
    McpStatusConnected   McpServerStatus = 2
    McpStatusError       McpServerStatus = 3
    McpStatusDisconnected McpServerStatus = 4
)
```

### MCP Config Locations
1. **Global**: `~/.gemini/config/mcp_config.json`
2. **Project**: `./mcp_config.json` or `.agents/mcp_config.json`
3. **Plugin**: `plugins/<name>/mcp_config.json`

### MCP Tool Routing
```
Agent Tool Call → MCP Manager → Find Server by Tool Name
  → Send via JSON-RPC → Receive Result → Return to Agent
Error: "Error invalid tool call: {{ $step.GetError.GetShortError }}"
```

---

## 9. Sandbox System

### Sandbox Mode
Activated via `--sandbox` flag. Core behavior:
```go
type SandboxConfig struct {
    Enabled         bool
    RestrictNetwork bool
    RestrictFS      bool
    RestrictProcess bool
    AllowList       []string  // Allowed commands/paths
    DenyList        []string  // Denied commands/paths
    TempDir         string
    ProxyPort       int
}
```

### Sandbox Error Handling
```go
type SandboxError struct {
    Errors       []string
    BypassHint   string // "use BypassSandbox: true"
}
```

Error message template:
```
There were sandbox errors that may or may not be related to the failure.
If you think the failure is because of running in the sandbox, you can run
the command again with BypassSandbox set to true to request explicit user
permission.
```

### Sandbox Bypass
- `BypassSandbox: true` in tool call → permission prompt
- `--dangerously-skip-permissions` → auto-approve all bypass requests

---

## 10. Knowledge Items (KI) System

### KI Directory Structure
```
<KnowledgeDirectoryPath>/
  <ki_name>/
    reference.md
    artifacts/
    metadata.json
```

### KI Metadata
```json
{
  "name": "database_schema_design",
  "description": "Database schema design patterns and conventions",
  "created_at": "2025-01-01T00:00:00Z",
  "tags": ["database", "schema", "sql"],
  "related_kis": ["api_authentication", "auth_middleware"],
  "version": 1
}
```

### KI Insertion Hook
```
"KI Insertion Hook: matched %d KIs: %v"
```

KIs are matched against the current conversation context. When a match is found, the KI content is inserted into the system prompt.

---

## 11. Knowledge/Skills/Rules Discovery

### Priority Order
1. Global: `~/.gemini/config/` and `~/.config/agy/`
2. Project: `.agents/`, `.agent/`, `_agents/`, `_agent/` at repo root
3. File: `AGENTS.md`, `GEMINI.md` at repo root
4. Plugin: `plugins/<name>/rules/` and `plugins/<name>/skills/`
5. References: `skills.json` and `plugins.json`

### Discovery Walk
The agent walks from current working directory up to repository root:
```go
func discoverConfigs(cwd string) ConfigSet {
    for dir := cwd; dir != "/"; dir = filepath.Dir(dir) {
        checkDir(filepath.Join(dir, ".agents"))
        checkDir(filepath.Join(dir, ".agent"))
        checkDir(filepath.Join(dir, "_agents"))
        checkDir(filepath.Join(dir, "_agent"))
        checkFile(filepath.Join(dir, "AGENTS.md"))
        checkFile(filepath.Join(dir, "GEMINI.md"))
        if hasGitRoot(dir) { break }
    }
}
```

### Skills Format
```json
// .agents/skills.json
{
  "skills": [
    { "name": "go-best-practices", "path": "./skills/go" },
    { "name": "react-patterns", "path": "/shared/skills/react" }
  ]
}
```

---

## 12. Agent API (HTTP)

### Base URL
`http://localhost:<port>/_agentapi/`

### Endpoints

#### `POST /_agentapi/new-conversation`
```json
Request:  { "projectId": "..." }
Response: { "conversationId": "uuid", "status": "created" }
```

#### `POST /_agentapi/send-message`
```json
Request: {
  "message": "user message text",
  "projectId": "resolvedProjectId",
  "conversationId": "uuid"
}
Response: { "messageId": "uuid", "status": "sent" }
```

#### `POST /_agentapi/resolve-project`
```json
Request:  { "conversationId": "uuid" }
Response: { "projectId": "resolved", "status": "ok" }
```

#### `GET /_agentapi/list-conversations`
```json
Response: {
  "conversations": [
    { "id": "uuid", "title": "...", "lastMessageAt": "..." }
  ]
}
```

#### `GET /_agentapi/get-trajectory`
```json
Response: {
  "steps": [
    {
      "type": "run_command",
      "command": "npm test",
      "status": "DONE",
      "output": "...",
      "duration": "1.2s"
    }
  ]
}
```

### Trajectory Storage
```
<project-dir>/events/<timestamp>.json
```
Each API call creates a timestamped `.json` file with the full request/response.

---

## 13. TUI Architecture

### Framework
- **Bubble Tea v2** (`charm.land/bubbletea/v2`)
- **Lip Gloss** for styling
- **Bubbles** for components
- **Glamour** for markdown rendering

### Rendering Model
**Full redraw** (`rerenderAll`) — not incremental. On every state change, rebuild entire view.

### Program Setup
```go
p := tea.NewProgram(model,
    tea.WithAltScreen(),
    tea.WithMouseAllMotion(),
    tea.WithFPS(30),
    tea.WithoutSignalHandler(),
)
```

### Component Tree
```
AppModel
  ├── HomeScreen
  │   ├── Logo/Header
  │   ├── QuickActions
  │   └── RecentConversations
  ├── ChatScreen (Main Agent Panel)
  │   ├── Viewport (conversation history)
  │   │   ├── Messages (user, assistant, tool, system)
  │   │   ├── ThinkingIndicator
  │   │   ├── ToolCards
  │   │   └── Artifacts
  │   ├── CommandInput
  │   └── StatusBar
  ├── CommandPalette (Ctrl+P)
  ├── ContextPanel (Ctrl+B toggle)
  │   ├── Files Changed
  │   ├── Terminals
  │   ├── Subagents
  │   └── Artifacts
  └── AgentStateOverlay
```

### Panel Definitions

#### Agent Panel (Main)
```
┌────────────────────────────────────────────┐
│ ● deepseek-v4-flash │ General              │ ← StatusBar (model │ agent)
├────────────────────────────────────────────┤
│                                            │
│  ┌─ Conversation Messages ───────────────┐ │
│  │ user: ┃  Hello, write a Python script │ │
│  │                                        │ │
│  │ ● deepseek-v4-flash │ General          │ │
│  │  import os                             │ │
│  │  import sys                            │ │
│  │                                        │ │
│  │ ●  Thinking... 2.3s                    │ │
│  │                                        │ │
│  │ ┌─ Tool Card ──────────────────────┐   │ │
│  │ │ ✓ run_command (1.2s)             │   │ │
│  │ │ Output: npm test passed           │   │ │
│  │ └──────────────────────────────────┘   │ │
│  │                                        │ │
│  │ Tools: 3  Duration: 4.5s              │ │
│  │                                        │ │
│  │ ● deepseek-v4-flash │ General          │ │
│  │  Here's the complete solution:         │ │
│  │  ...typing word by word...             │ │
│  └────────────────────────────────────────┘ │
│                                            │
│ ┌─ Command Input ────────────────────────┐ │
│ │ > _                                    │ │
│ └────────────────────────────────────────┘ │
│                                            │
│ Status: Ready    Files: 3   Git: main     │ ← StatusBar
└────────────────────────────────────────────┘
```

#### Context Panel (Sidebar)
```
┌─ Context Panel ─────────────────────┐
│                                     │
│ Files Changed (3)                   │
│  ┬ src/main.go                      │
│  ├ src/utils.ts                     │
│  └ tests/test_main.go               │
│                                     │
│ Terminals (1)                       │
│  ┬ $ npm run dev                    │
│                                     │
│ Subagents (2)                       │
│  ├ research-agent                   │
│  └ code-reviewer                    │
│                                     │
│ Artifacts (1)                       │
│  ┬ architecture.md                  │
└─────────────────────────────────────┘
```

#### Command Palette
```
┌─────────────────────────────────────────┐
│ > _                                      │
│                                         │
│ Commands:                               │
│  ● /help      Show help                 │
│  ● /sessions  Manage sessions           │
│  ● /models    Select model              │
│  ● /clear     Clear conversation        │
│  ● /exit      Exit CLI                  │
│  ● /feature   Create new feature        │
│  ● /test      Write tests               │
│  ● /docs      Write documentation       │
└─────────────────────────────────────────┘
```

#### Agent State Overlay (When Agent Running)
```
┌─────────────────────────────────────────┐
│  ┌─ Agent Control Toolbar ────────────┐ │
│  │  Agent running, controls disabled  │ │
│  │  [ ■ Stop Agent ] [ ✕ Force Close ] │ │
│  └────────────────────────────────────┘ │
│                                         │
│  (main content dimmed)                  │
│                                         │
│  "Return to Agent" button at bottom     │
└─────────────────────────────────────────┘
```

### Color Scheme
Built-in themes (from embedded XML):
```
catppuccin-frappe
solarized-dark
solarized-light
256-base16-snazzy
gruvbox-light
modus-vivendi
paraiso-light
```

### Keybindings Complete Map

#### Navigation
| Key | Action |
|-----|--------|
| `Up/Down` | Scroll messages / Navigate list |
| `PgUp/PgDn` | Page scroll |
| `Home/End` | Top/Bottom |
| `Ctrl+u/d` | Half page up/down |
| `Ctrl+f/b` | Full page up/down |
| `Tab` | Next focusable element |
| `Shift+Tab` | Previous focusable element |

#### Chat
| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `Shift+Enter` | Newline in input |
| `Ctrl+Enter` | Send (alternative) |
| `Alt+Enter` | Execute command |
| `Ctrl+v` | Paste |
| `Ctrl+c` | Cancel/Stop agent |
| `Ctrl+z` | Undo last edit |
| `Ctrl+y` | Redo |
| `Ctrl+s` | Save |
| `Ctrl+o` | Open file |
| `Ctrl+r` | Recent files |
| `Ctrl+e` | Editor commands |

#### Panels
| Key | Action |
|-----|--------|
| `Ctrl+b` | Toggle sidebar/context panel |
| `Ctrl+j` | Focus panel down |
| `Ctrl+k` | Focus panel up |
| `Ctrl+p` | Command palette |
| `Ctrl+g` | Go to line |
| `Ctrl+h` | Toggle help |

#### Agent Control
| Key | Action |
|-----|--------|
| `Ctrl+c` | Stop agent (when running) |
| `Ctrl+enter` | Force submit |
| `Esc` | Cancel/Exit mode |

#### Search
| Key | Action |
|-----|--------|
| `/` | Start search |
| `n` | Next match |
| `N` / `Shift+n` | Previous match |
| `Ctrl+f` | Find in file |
| `Enter` | Confirm selection |
| `Esc` | Clear search / Exit search mode |

#### Text Editing (Input)
| Key | Action |
|-----|--------|
| `Left/Right` | Move cursor |
| `Ctrl+Left/Right` | Word jump |
| `Alt+Left/Right` | Word jump (alt) |
| `Alt+Backspace` | Delete word backward |
| `Alt+Delete` / `Ctrl+Delete` | Delete word forward |
| `Ctrl+a` | Select all |
| `Ctrl+w` | Delete word backward |
| `Ctrl+u` | Delete to beginning |
| `Ctrl+k` | Delete to end |

#### File Edit (Diff View)
| Key | Action |
|-----|--------|
| `i` | Enter insert mode |
| `Esc` | Exit insert mode |
| `dd` | Delete line |
| `yy` | Yank/copy line |
| `cc` | Change line |
| `u` | Undo |
| `Ctrl+r` | Redo |
| `:w` | Save |
| `:q` | Quit |

---

## 14. Token Counting

### Implementation
Uses `github.com/pkoukk/tiktoken-go` for OpenAI models and custom counters for others.

```go
type TokenCounter interface {
    Count(text string) int
    CountMessages(msgs []Message) int
    Model() string
}

func NewTokenCounter(model string) TokenCounter {
    switch {
    case strings.HasPrefix(model, "gpt"):
        return &GPTTokenizer{model: model}
    case strings.HasPrefix(model, "gemini"):
        return &GeminiTokenizer{}
    case strings.HasPrefix(model, "claude"):
        return &ClaudeTokenizer{}
    default:
        return &ApproxTokenizer{} // 4 chars per token
    }
}
```

### Token Display
```
"Tokens: %d (in: %d, out: %d)"
"AI Credits: %d"
```

---

## 15. Output Templates

### Go Template System
Uses embedded Go templates for all output rendering.

```go
// Template Context
type StepTemplateContext struct {
    Step           *CortexStep
    CombinedOutput string
    StatusStr      string
    SourceStr      string
    IsError        bool
    ExitCode       int
    CommandId      string
}
```

### Template Files
```
{{- /* Return empty string for DONE status */ -}}
{{- if eq $statusStr "CORTEX_STEP_STATUS_CANCELED" }}
  Step was canceled: {{ $step.GetError.GetShortError }}
{{- else if eq $statusStr "CORTEX_STEP_STATUS_ERROR" }}
  Encountered error in step execution: {{ $step.GetError.GetShortError }}
{{- else if eq $statusStr "CORTEX_STEP_STATUS_DONE" }}
  The command completed successfully.
{{- else if eq $statusStr "CORTEX_STEP_STATUS_WAITING" }}
  Step is WAITING for user approval
{{- else }}
  Step is still running
{{- end }}
```

### Output Templates
```
// Default success
"The command completed successfully."

// With exit code
"The command failed with exit code: {{ $runCommand.GetExitCode }}"

// No output
"No output"

// Snapshot (truncated)
"Output snapshot:"

// Background command
"Background command ID: {{ $commandId }}"

// Error
"Error invalid tool call: {{ $step.GetError.GetShortError }}"
```

---

## 16. Database Schema (SQLite)

### Tables

```sql
CREATE TABLE conversations (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL DEFAULT '',
    agent_name TEXT NOT NULL DEFAULT '',
    agent_path TEXT NOT NULL DEFAULT '',
    model_name TEXT NOT NULL DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_message_at DATETIME,
    title TEXT DEFAULT '',
    metadata TEXT DEFAULT '{}',
    sandbox_id TEXT DEFAULT '',
    workspace_id TEXT DEFAULT ''
);
CREATE INDEX idx_conversations_project_id ON conversations(project_id);
CREATE INDEX idx_conversations_last_message_at ON conversations(last_message_at);

CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    token_count INTEGER DEFAULT 0,
    metadata TEXT DEFAULT '{}'
);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);

CREATE TABLE tool_calls (
    id TEXT PRIMARY KEY,
    message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    arguments TEXT DEFAULT '{}',
    result TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    duration_ms INTEGER DEFAULT 0,
    error TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_tool_calls_message_id ON tool_calls(message_id);

CREATE TABLE permission_grants (
    id TEXT PRIMARY KEY,
    tool_name TEXT NOT NULL,
    args_hash TEXT NOT NULL,
    granted BOOLEAN NOT NULL DEFAULT 0,
    expires_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tool_name, args_hash)
);

CREATE TABLE settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plugins (
    name TEXT PRIMARY KEY,
    enabled BOOLEAN NOT NULL DEFAULT 0,
    config TEXT DEFAULT '{}',
    installed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    path TEXT NOT NULL DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 17. Streaming Architecture

### Response Streaming
```
LLM Response Chunks
  → streamContentMsg sent via prog.Send()
  → ChatScreen.AppendResponseText(string)
  → WordTickMsg at 40ms interval
  → 1 word per tick via viewport.AppendContent()
  → On complete: full renderMessages() rebuild
```

### Message Types
```go
type streamContentMsg string      // LLM output chunk
type streamReasoningMsg string    // Reasoning/thinking chunk
type streamDoneMsg struct {       // Stream complete
    content      string
    inputTokens  int
    outputTokens int
    err          error
}
type ToolQueuedMsg struct {
    Name string
    Args string
    Index int
}
type ToolStartedMsg struct {
    Name string
    Index int
}
type ToolOutputMsg struct {
    Index  int
    Output string
    Done   bool
}
type ToolCompletedMsg struct {
    Index    int
    Status   string
    Duration time.Duration
    Error    string
}
```

### Stream Handler
```go
func handleStream(ctx context.Context, llm LLMClient, messages []Message) {
    stream, err := llm.ChatStream(ctx, messages)
    if err != nil { prog.Send(streamDoneMsg{err: err}); return }
    
    var fullContent string
    for {
        chunk, err := stream.Recv()
        if err == io.EOF { break }
        if err != nil { prog.Send(streamDoneMsg{err: err}); return }
        
        if chunk.Content != "" {
            fullContent += chunk.Content
            prog.Send(streamContentMsg(chunk.Content))
        }
        if chunk.Reasoning != "" {
            prog.Send(streamReasoningMsg(chunk.Reasoning))
        }
    }
    prog.Send(streamDoneMsg{
        content:      fullContent,
        inputTokens:  stream.InputTokens(),
        outputTokens: stream.OutputTokens(),
    })
}
```

---

## 18. Artifact System

### Artifact Types
```go
type Artifact struct {
    ID             string
    ConversationID string
    Name           string
    Path           string
    Content        string
    Language       string
    MimeType       string
    Size           int64
    CreatedAt      time.Time
    Metadata       map[string]interface{}
}
```

### Artifact Rendering
- Syntax highlighting via Chroma (embedded language support for 200+ languages)
- Inline display in conversation
- Collapsible sections
- Diff view for edits
- "2. When creating an artifact, always provide an ArtifactMetadata."

### Supported Languages (partial list from embedded XML)
```
abap, abnf, agda, bash, dart, diff, ebnf, fish, glsl, hare, hlsl,
igor, java, json, llvm, mako, mlir, nasm, odin, perl, pony, prql,
rego, rexx, ruby, rust, sass, scss, stas, tasm, tcsh, toml, twig,
vala, vhdl, viml, wdte, xorg, yaml, yang
```

---

## 19. Background Animations

### Thinking Indicator
```
"  ⠋  Working..."
"  ⠋  Working... 2.3s"
```
Uses Braille spinner characters: `⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏`

### Tool Status Icons
```
○  Queued (circle)
●  Started (filled circle)  
✓  Completed (checkmark, green)
✗  Failed (x mark, red)
…  Running (ellipsis)
```

### Metrics Display
```
"  Tools: %d  Duration: %.1fs  Tokens: %d (in: %d, out: %d)"
```

---

## 20. Data Privacy & Classification

### Data Classification System
```go
type DataClassification struct {
    DataType     DataType     // code, config, script
    Intent       DataIntent   // read, persist, transmit, execute, other
    SecurityType SecurityType // any, secrets, infrastructure, code
    ChangeType   ChangeType   // path, env_var, alias
    IsSensitive  bool
    IsUpload     bool
    Domain       string       // URL domain for web data
    IsExfiltration bool       // URI contains sensitive data in query params
    AutoExecutes bool         // Destination auto-executes (crontab, .bashrc, systemd, git hooks)
}
```

### Privacy Controls
- Consent tracking
- Data usage categories: None, Logging, Measurement, Targeting
- Core Content classification
- Privacy impact assessment

---

## 21. Authentication

### OAuth Flow
```go
type AuthProvider string
const (
    AuthGoogle   AuthProvider = "google"
    AuthGitHub   AuthProvider = "github"
    AuthSSO      AuthProvider = "sso"
    AuthDevice   AuthProvider = "device"  // Device code flow
)
```

### Token Management
- Token storage: `~/.agy/auth/`
- Token refresh: automatic via refresh tokens
- `keyringAuth: failed to load token: %v`
- `OAuth setup failed for %s: %v`

### CLI Auth States
```
"Authentication successful!"
"Signed out from server: %s"
"Print mode: auth timed out"
"Print mode: auth error: %v"
```

---

## 22. Internal Cortex Architecture (Google3 Package Map)

The binary reveals the internal Google codename: **"Jetski"** (product name **"Cascade"** / **"Gemini Coder"**).

```
google3/third_party/jetski/          ← Internal codename
  cortex/                            ← Core engine (Cortex)
    accumulator/                     ← Goal/skill accumulation pipeline
    agent_state_component/           ← UI agent state component
    agentapi/                        ← Sidecar HTTP API handler registry
    annotations_manager/             ← Step/tool annotations
    artifacts/                       ← Artifact storage & lifecycle
    battlemode/                      ← Restricted sandbox mode
    cascade_manager/                 ← Cascade agent lifecycle
    cascade_run_state/               ← Run state FSM
    chatconverters/                  ← Chat export format converters
    command/                         ← CLI command definitions
    config/                          ← Configuration loading
    core/                            ← Core orchestration loop
    customization/                   ← User customization
    customizations/                  ← Customization collection
    executors/                       ← Tool/step execution engine
    fastapply/                       ← Fast code edit application
    gamification/                    ← Badges, XP, achievements
    handlers/                        ← Message/event handlers
    helpers_external/                ← External helper functions
    hookutils/                       ← Hook execution utilities
    implicit/                        ← Implicit actions
    messages/                        ← Message construction
    mixins/                          ← Behavioral mixins
    permissions/                     ← Permission system
    policyguardian/                  ← Policy enforcement
    proto_saver/                     ← Protobuf persistence
    providers/                       ← Provider resolution
      mcp/                           ← MCP protocol handler
    rehydration/                     ← State recovery
    revert/                          ← Undo/revert system
    sdk/                             ← Extension SDK
    settings/                        ← Settings management
    shared/                          ← Shared types & utilities
      providers/                     ← Provider registry & resolution
    sharedenv/                       ← Shared environment
    sharedfragment/                  ← Shared prompt fragments
    sidecars/                        ← Sidecar lifecycle management
    slashcommands/                   ← Command palette entries
    snapshot_recorder/               ← State snapshot recording
    state/                           ← Editor/file/grep state tracking
    subagent/                        ← Subagent lifecycle
    summaries_store/                 ← Conversation summary storage
    tokens/                          ← Token counting
    tools/                           ← Tool definitions & converters
      browser/                       ← Browser automation tools
      code/                          ← Code edit/replace tools
      knowledge/                     ← Knowledge item tools
      notebook/                      ← Jupyter notebook tools
      subagent/                      ← Subagent management tools
    traj/                            ← Trajectory helpers
    trajectory/                      ← Step trajectory views
    trajectory_store/                ← Trajectory persistence
    utils/                           ← Utility functions
```

---

## 23. Complete Undocumented Tool Set

### Tools discovered in binary but not in previous documentation:

#### `multi_replace_file_content`
Non-contiguous multi-chunk file replacement. Hinted by `jsonschema_description: "For non-contiguous edits, use the multi_replace_file_content tool instead."`

```json
{
  "name": "multi_replace_file_content",
  "description": "Replace multiple non-contiguous chunks in a file",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": { "type": "string" },
      "chunks": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "oldString": { "type": "string" },
            "newString": { "type": "string" }
          }
        }
      }
    }
  }
}
```

#### `single_replace_file_content`
Single contiguous chunk replacement. Has variants: `ReplacementChunk`, `ReplacementChunkBase`, `ReplacementChunkNoRange`, `replacementChunkNoAllowMultiple`.

#### `tab_code_edit`
Tab-based code editing with `ReplacementChunks []ReplacementChunkForTab`. Used for edits within open editor tabs rather than file paths.

#### `delete_knowledge_file`
Delete knowledge item files or directories.

```json
{
  "name": "delete_knowledge_file",
  "inputSchema": {
    "type": "object",
    "properties": {
      "pathToDelete": {
        "type": "string",
        "description": "Absolute path to the file or directory to delete. Must be either within an artifacts/ subdirectory of a Knowledge Item, or a top-level Knowledge Item directory."
      }
    }
  }
}
```

#### `knowledge_write_to_file`
Write content to a knowledge item file.

#### `knowledge_replace_file_content`
Replace content in a knowledge item file.

#### `ask_permission`
Ask the user for explicit permission interactively. Returns: `decision` (enum: `stop`, `continue`, `block`) + `reason`.

```json
{
  "name": "ask_permission",
  "inputSchema": {
    "type": "object",
    "properties": {
      "message": { "type": "string" }
    },
    "required": ["message"]
  }
}
```

#### `ask_question`
Ask the user a question interactively. Returns user's response text.

```json
{
  "name": "ask_question",
  "inputSchema": {
    "type": "object",
    "properties": {
      "question": { "type": "string" }
    },
    "required": ["question"]
  }
}
```

#### `list_permissions`
List all granted permissions and their expiry.

#### `manage_inbox`
Inbox/notification management tool. Handles notifications, reminders, and alerts.

#### `manage_task`
Task management tool. Manages todo items, task lists, and tracking.

#### `schedule`
Schedule management tool. For creating/managing scheduled events and cron tasks.

#### `sed`
Sed-like text replacement tool. Patterns for find-and-replace operations.

#### `execute_notebook_cells`
Execute Jupyter notebook cells.

```json
{
  "name": "execute_notebook_cells",
  "inputSchema": {
    "type": "object",
    "properties": {
      "notebookPath": {
        "type": "string",
        "description": "Absolute path to the .ipynb notebook file."
      },
      "cellIDs": {
        "type": "array",
        "items": { "type": "string" },
        "description": "The IDs of the cells to execute."
      }
    },
    "required": ["notebookPath", "cellIDs"]
  }
}
```

#### `call_mcp_tool`
Directly call an MCP tool by server + tool name.

```json
{
  "name": "call_mcp_tool",
  "inputSchema": {
    "type": "object",
    "properties": {
      "serverName": { "type": "string", "description": "Name of the MCP server." },
      "toolName": { "type": "string", "description": "Name of the tool to call." },
      "arguments": { "type": "object", "description": "Arguments to pass to the tool." }
    },
    "required": ["serverName", "toolName", "arguments"]
  }
}
```

#### `read_mcp_resource`
Read a resource from an MCP server.

```json
{
  "name": "read_mcp_resource",
  "inputSchema": {
    "type": "object",
    "properties": {
      "serverName": { "type": "string", "description": "Name of the server." },
      "uri": { "type": "string", "description": "Unique identifier for the resource." }
    }
  }
}
```

#### `list_mcp_resources`
List available resources from an MCP server.

```json
{
  "name": "list_mcp_resources",
  "inputSchema": {
    "type": "object",
    "properties": {
      "serverName": { "type": "string", "description": "Name of the server." }
    }
  }
}
```

#### `list_directory`
List contents of a directory.

```json
{
  "name": "list_directory",
  "inputSchema": {
    "type": "object",
    "properties": {
      "directoryPath": {
        "type": "string",
        "description": "Absolute path to a directory."
      }
    },
    "required": ["directoryPath"]
  }
}
```

#### `read_url_content`
Read content from a URL (simpler than web_fetch).

```json
{
  "name": "read_url_content",
  "inputSchema": {
    "type": "object",
    "properties": {
      "url": { "type": "string", "format": "uri", "description": "URL to read content from" }
    }
  }
}
```

#### `view_file` (with pagination)
Read file with byte offset pagination support.

```json
{
  "name": "view_file",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": { "type": "string" },
      "contentOffset": {
        "type": "integer",
        "description": "Byte offset into the content. Use this to view content beyond the initial byte limit."
      }
    },
    "required": ["path"]
  }
}
```

### Subagent Management (Unified)

Rather than separate tools, the subagent management may use a unified `action` field:

```json
{
  "name": "manage_subagents",
  "inputSchema": {
    "type": "object",
    "properties": {
      "action": {
        "type": "string",
        "enum": ["list", "kill", "kill_all"],
        "description": "The action to perform."
      },
      "conversationIDs": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Required for 'kill' action."
      }
    },
    "required": ["action"]
  }
}
```

### Batch Subagent Invocation
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
            "task": { "type": "string" }
          }
        },
        "description": "Array of subagents to invoke concurrently."
      }
    },
    "required": ["subagents"]
  }
}
```

### Complete Browser Tool Set

In addition to the previously documented browser tools, the binary reveals these additional browser automation tools:

| Tool | Description |
|------|-------------|
| `browser_drag_pixel_to_pixel` | Drag operation between pixel coordinates |
| `browser_get_dom` | Get the full DOM tree of the current page |
| `browser_get_network_request` | Get details of a specific network request |
| `browser_input_text` | Input text into a focused element |
| `browser_list_network_requests` | List all network requests made by the page |
| `browser_mouse_down` | Mouse down at current position |
| `browser_mouse_up` | Mouse up at current position |
| `browser_mouse_wheel` | Mouse wheel event |
| `browser_move_mouse` | Move mouse to coordinates |
| `browser_press_key` | Press a keyboard key |
| `browser_refresh_page` | Refresh/reload the current page |
| `browser_resize_window` | Resize the browser window |
| `browser_select_option` | Select an option from a dropdown element |
| `browser_list_pages` | List all open browser pages/tabs |
| `browser_click_pixel` | Click at specific pixel coordinates |
| `browser_subagent` | Spawn a browser-specific subagent |

---

## 24. PostHooks System (Execution Pipeline Extensions)

After every tool execution step, a pipeline of posthooks runs:

```go
// Complete PostHook list:
NewCheckpointHook                        // Save checkpoint after step
NewCommandAssessorPostInvocationHook     // Assess command safety/output
conversation_log_hook                    // Log step to conversation history
empty_output_continuation_check          // Continue if output was empty
force_invocation                         // Force extra LLM invocations
ki_insertion_hook                        // Insert matched Knowledge Items
knowledge_generation_hook                // Generate new Knowledge Items
knowledge_timestamp_hook                 // Update KI access timestamps
max_generator_invocations_check          // Enforce invocation limits
message_continue_check                   // Check if agent should continue
no_op_hook                               // No-op placeholder hook
no_tool_call_check                       // Handle case of no tool calls
```

Execution pipeline order:
```
Step Created
  → Execute
  → PostHook Pipeline (all hooks in order)
    → CheckpointHook (save state)
    → CommandAssessorHook (check command behavior)
    → ConversationLogHook (persist step)
    → EmptyOutputCheck (continue if empty)
    → ForceInvocationCheck
    → KIInsertionHook
    → KnowledgeGenerationHook
    → KnowledgeTimestampHook
    → MaxInvocationsCheck
    → MessageContinueCheck
    → NoToolCallCheck
  → Step Complete (or Error)
```

---

## 25. Gamification System

```
cortex/gamification/
  badges_external.go
```

Features:
- **Badges**: `MomaBadge` — achievement badges earned through usage
- **Experience Points (XP)**: Earned through completing tasks and milestones
- **Levels**: User levels based on XP accumulation
- **Streaks**: Consecutive day usage tracking
- **Leaderboard**: User rankings
- **Achievements**: `Achievement` — unlockable milestones
- **Rewards**: `Reward` — unlockable perks
- **Score/Points**: `Score`, `Points` — point system
- **Unlocks**: `Unlock` — feature/content unlocks tied to achievements

Badge granting is async via `MaybeGrantMomaBadgeAsync`. Badge HTTP endpoint at `/moma_badge_granterhttp`.

---

## 26. BattleMode (Restricted Sandbox)

A stricter sandbox mode with path-level restrictions:

```go
type BattleModeConfig struct {
    AllowedPaths []string   // Only these paths are accessible
    Replacements []string   // Path replacements/rewrites
}

// Wraps model API with path replacer
func WrapModelAPIWithReplacer(api ModelAPI) ModelAPI
```

Key features:
- Restricts tool operations to only `AllowedPaths`
- Applies path `Replacements` to rewrite file paths
- Separate `BattleModePermissionManager` for permission handling
- Activated separately from regular sandbox mode

---

## 27. PolicyGuardian (Policy Enforcement)

```
cortex/policyguardian/
```

Policy enforcement layer that checks:
- Tool usage policies
- Permission boundaries
- Security constraints
- Data classification policies
- Custom user-defined rules

Runs before tool execution as a gate.

---

## 28. State Tracking System

```
cortex/state/
  code_action.go            // Code action state
  editor_state_tracker.go   // Editor open file tracking
  file_view_tracker.go      // File reading history
  user_grep_tracker.go      // User grep search history
  init_state.go             // State initialization
  options.go                // State options
```

Components:
- **EditorStateTracker**: Tracks which files are open in editors, cursor positions, active documents
- **FileViewTracker**: Tracks which files the agent has viewed/read
- **UserGrepTracker**: Tracks user-initiated grep searches for context awareness
- **Code Action State**: Manages pending/active code action states

Initialization:
```go
GetStateInitializationData()  // Load state on startup
UploadStateInitializationData(data)  // Persist state
```

---

## 29. FastApply System

```
cortex/fastapply/
```

Applies code edits without going through full file write cycle:
- `FAST_APPLY` / `UseFastApply` — flag to use fast application path
- Bypasses file-write-then-readback cycle
- Applies edits directly to in-memory buffer
- Used for speed optimization in Cascade

Fields in `CortexStepCodeAction`:
```go
UseFastApply bool
FastApplyFallbackInfo  // Info if fast apply falls back to regular
```

---

## 30. CodeAction System (Detailed)

The `CortexStepCodeAction` protobuf carries rich metadata about each code action step:

```go
type CodeAction struct {
    ActionSpec                 // What action to perform
    ActionResult               // Result of the action
    UseFastApply bool          // Use fast apply optimization
    AcknowledgementType        // How the action was acknowledged (auto/user)
    HeuristicFailure           // Heuristic check failure info
    CodeInstruction            // The LLM's instruction for this action
    LintErrors                 // Lint errors found after application
    PersistentLintErrors       // Lint errors that persist across attempts
    LintErrorIdsAimingToFix    // Which lint errors this action targets
    ReplacementInfos           // Replacement chunk information
    IntroducedErrors           // Errors introduced by this action
    TriggeredMemories          // Knowledge items triggered
    IsArtifactFile bool        // Whether target is an artifact
    ArtifactVersion            // Artifact version tracking
    ArtifactMetadata           // Artifact metadata
    IsKnowledgeFile bool       // Whether target is a KI file
    FilePermissionRequest      // Permission request for file access
    Description                // Human-readable description
    MarkdownValidationError    // Markdown validation errors
    DiffStats                  // Line-level diff statistics
    TargetFileHasCarriageReturns bool
    TargetFileHasAllCarriageReturns bool
}
```

The trajectory view (`CodeActionStepView`) exposes:
```go
type CodeActionStepView struct {
    Source               // Action source identifier
    TargetURI            // File URI being edited
    OriginalContent      // Content before edit
    IsNewCreation bool   // Whether this created a new file
    Diff                 // Unified diff of changes
    HasCreateFileSpec    // Whether file was created
    IsArtifactFile       // Artifact flag
    AcknowledgementType  // How acknowledged
    ActionSpec           // The action specification
    ActionResult         // The action result
    Metadata             // Additional metadata
    Status               // Step status
}
```

---

## 31. CodeEdit / Language Server Integration

```
cortex/chatconverters/  (chat format conversion)
cortex/revert/          (revert/undo system)
  revert.go
  aggregateCodeEditRevertPreviews
  filterCodeEditRevertPreviews

language_server_pb/ (gRPC)
  CodeEditRevertPreview  — Preview of a revert operation
  AcknowledgeCascadeCodeEditRequest
    CascadeId   — Unique edit identifier
    AbsoluteUri — File URI
    Contents    — Current file contents
    Accept      — Whether user accepted or rejected
  AcknowledgeCascadeCodeEditResponse
```

CodeEdit RevertPreview fields:
```go
type CodeEditRevertPreview struct {
    FileUri    string
    Diff       string        // Unified diff
    ActionType ActionType    // What kind of edit
}
```

---

## 32. Knowledge Tools (Detailed)

```
cortex/tools/knowledge/
  DeleteKnowledgeToolConverter       — delete_knowledge_file
  KnowledgeReplaceFileContentToolConverter  — knowledge_replace_file_content
  KnowledgeWriteToFileToolConverter        — knowledge_write_to_file
```

Knowledge reference type (from `knowledge.ReferenceType`):
```go
enum ReferenceType {
    file              // File path reference
    conversation_id   // Conversation ID reference
    url               // URL reference
}
```

---

## 33. PromptSection / PromptBuilder System

```
cortex/shared/section_constants.go  — System prompt section constants
cortex/shared/providers/
  resolve.go                    — Provider resolution
  manager.go                    — Provider manager

cortex/providers/               — Top-level provider implementations
  mcp/                          — MCP protocol
    protocol_handler.go         — JSON-RPC protocol handler
    provider.go                 — MCP provider
    tool_caller.go              — MCP tool invocation
```

The `ResolvePromptSections` system dynamically builds prompts from:
- System prompts (built-in)
- Agent instructions (AGENTS.md, GEMINI.md)
- Rule files (`.agents/rules/*.md`)
- Knowledge Items
- Skills content
- Tool definitions

---

## 34. Sidecar SDK

```
cortex/sidecars/
  sidecar_executor.go     — Execute sidecar process
  sidecar_manager.go      — Lifecycle manager
  sidecar_sdk.go          — SDK for sidecar development
  resolver.go             — Config template resolution
```

Sidecar capabilities:
- **Token generation**: `generateToken()` — auth tokens for sidecar API access
- **Port allocation**: `getUnusedPort()` — find available ports
- **Template resolution**: `ResolveTemplates()` — resolve ${VAR} in configs
- **Node discovery**: `discoverNodePath()` — find Node.js binary
- **Process attributes**: `sysProcAttr` — process setup attributes
- **Cancel management**: `cmdCancelFunc` — per-command cancel functions

---

## 35. Slash Commands System

```
cortex/slashcommands/
  slash_commands.go
```

Commands can come from two sources:
- **System**: Built-in commands (`GetSystemSlashCommands`)
- **Skills**: Skill-defined commands (`GetSkillSlashCommands`)

Format:
```go
type SlashCommand struct {
    Name        string
    Description string
    Handler     func(ctx, args) error
    Category    string
}
```

---

## 36. Settings System

```
cortex/settings/
  settings.go          — Settings types and logic
  settings_store.go    — Settings persistence
```

```go
type Settings struct {
    // Any user-configurable settings
}

func ApplySettingsToConfig(s Settings, cfg *Config)
func MergeGrants(base, override []Grant) []Grant
```

---

## 37. Executors System

```
cortex/executors/
  executors.go
  posthooks/              — Post-execution hooks
  NewRevertExecutor()     — Handle revert/undo steps
  NewSubagentExecutor()   — Execute subagent steps
  cleanUpStepResources()  — Cleanup after step execution
  startSubagentSyncWorker() — Background subagent sync
```

---

## 38. Annotations System

```
cortex/annotations_manager/
```

Manages annotations on steps and tool calls:
- User annotations on code actions
- Metadata annotation on steps
- Review annotations for code review

---

## 39. Rehydration System

```
cortex/rehydration/
```

Recovers agent state from persisted data:
- Reloads conversation history
- Restores editor/file state
- Recovers in-progress steps
- Reconnects MCP servers

---

## 40. SnapshotRecorder

```
cortex/snapshot_recorder/
```

Records periodic state snapshots for:
- Undo/revert support
- Crash recovery
- State comparison across trajectories

---

## 41. Summaries Store

```
cortex/summaries_store/
```

Generates and stores conversation summaries:
- Automatic summarization of long conversations
- Summary retrieval for context rebuilding
- Token optimization via summarization

---

## 42. Trajectory Store

```
cortex/trajectory_store/
```

Persists execution trajectories to disk:
```
<project-dir>/events/<timestamp>.json
```
Trajectories store every step with:
- Step type, status, duration
- Tool calls and results
- File diffs and changes
- Error information

---

## 43. Prompt Caching & RAG

From binary strings:
- `cache_creation_input_tokens` — tokens used to create cache
- `cache_read_input_tokens` — tokens saved from cache read
- `cached_tokens` — total cached tokens
- `caches` — cache management
- `rag_file_source` — file used as RAG source
- `retrieval_source` — source for retrieval
- `retrieval_strategy` — retrieval strategy type
- `vector_db` — vector database backend
- `vector_db_threshold` — similarity threshold for retrieval
- `codebase_search` — semantic codebase search

---

## 44. Additional Capabilities

### WebSocket Connection Pooling
```
websocket_connection_pooling
```
Connection pooling for WebSocket-based LLM providers.

### Audio Processing
```
audio_tokens
```
Audio token counting for multimodal models.

### Certificate Management
```
cert_provider_command     — Command to fetch certificates
certificate_config_location — Certificate file path
cert_configs             — Certificate configurations
```

### Credential Management
```
credential_source        — Source of credentials (env, file, vault)
credential               — Credential storage
```

### Prompt Caching Details
```
cache_creation_input_tokens   — Tokens consumed creating prompt cache
cache_read_input_tokens       — Tokens saved by cache hit
cached_tokens                 — Total tokens in cache
completion_tokens_details     — Detailed token breakdown (reasoning, audio, cached)
```

### Tool Groups Feature
Tool grouping allows enabling/disabling categories:
```
enable_write_tools        — Toggle write tools
enable_subagent_tools     — Toggle subagent tools  
enable_mcp_tools          — Toggle MCP tools
```

### Tool Override Mapper
```
cortex/tools/tooloverrides/
  tool_override_mapper.go
  NewToolOverrideMapper()
  applyArgumentOverridesToSchema()
```
Allows overriding tool arguments at runtime — useful for injecting context or enforcing policies.

### Steps Accumulator
```
cortex/accumulator/
  accumulator.go
  goal_accumulator.go
  background_task_accumulator.go
  skill_accumulator.go
  orchestrator.go
```
Accumulates steps into structured views:
- **ActiveGoalAccumulator**: Shows active goal progress
- **AllGoalsAccumulator**: Shows all goals
- **BackgroundTaskAccumulator**: Shows background tasks
- **SkillAccumulator**: Shows skill-related steps
- **Orchestrator**: Coordinates multiple accumulators
- Features: `getStepIcon`, `isSkillFile`, `removeSkill`, `buildActiveGoalItem`, `buildHistoryItem`

### Editor, File & Grep Tracking
```
cortex/state/editor_state_tracker.go — Active editor documents
cortex/state/file_view_tracker.go    — Files viewed by agent
cortex/state/user_grep_tracker.go    — User-initiated searches
cortex/state/code_action.go          — Code action state
```

---

## 45. Additional CLI Tools & Features

### `generate_image` — Image Generation
```
CORTEX_STEP_TYPE_GENERATE_IMAGE
CortexStepGenerateImage
GenerateImageToolConfig
```
Creates AI-generated images from text prompts with optional reference images.

**Parameters** (from jsonschema descriptions):
- `prompt`: The text prompt to generate an image for
- `name`: Name of the generated image to save (max 3 words, lowercase_with_underscores, e.g. `login_page_mockup`)
- `aspectRatio`: Optional aspect ratio. Supported: `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `9:16`, `16:9` (default: `1:1`)
- `referenceImages`: Optional absolute paths to images for editing/combining/reference (max 3)
- `mask`: Optional image mask for targeted generation (from binary: `ToolImageGenerationInputImageMaskParam`)

**Model**: `GetImageGenerationModelIds` — separate model selection for image gen.
**Client**: `ImageGenerationClient` — dedicated client for image generation API.
**Pipeline**: `GetImageGenerationRequest` → `GetImageGenerationResponse`.

### `notify_user` — Timer & Notification
```
CORTEX_STEP_TYPE_NOTIFY_USER
CortexStepNotifyUser
```
One-shot or recurring timer that delivers a notification message when triggered.

**Parameters**:
- `prompt`: The message content to include in the notification when the timer fires
- `durationSeconds`: Number of seconds to wait (one-shot timer, mutually exclusive with cron)
- `cronExpression`: Standard 5-field cron expression for recurring schedules (e.g. `*/5 * * * *`)
- `maxFirings`: Optional max number of cron firings (default: unlimited)
- `timerCondition`: Controls early termination:
  - `"never"` — timer unconditionally waits until expiry (default)
  - `"any"` — timer cancels if any message is received
  - Specific sender ID — timer cancels if message received from that subagent/task

**Timer states**: `"Timer has expired"`, iteration tracking via `%s (iteration %d)`.

### `wait` — Wait/Delay
```
CORTEX_STEP_TYPE_WAIT
CortexStepWait
```
Pauses execution for a specified duration or condition.
- `durationMs`: Milliseconds to wait (between 500ms—10000ms)
- Used to wait for command completion before checking status
- Related: `CortexStepWait` in trajectory system

### `shell_exec` — Shell Execution
```
CORTEX_STEP_TYPE_SHELL_EXEC
CortexStepShellExec
```
Execute a shell command (distinct from `run_command`). Uses `exec` directly rather than terminal PTY.
- Returns stdout/stderr output
- Used for simple command execution without terminal interaction

### `command_status` — Check Command Status
```
CORTEX_STEP_TYPE_COMMAND_STATUS
CortexStepCommandStatus
```
Check the status of a previously started background command.
- `commandId`: ID of the command to check
- `waitSeconds`: Number of seconds to wait for completion (0=immediate, max=300)
- Returns: running, completed, or error status

### `read_terminal` — Read Terminal Output
```
CORTEX_STEP_TYPE_READ_TERMINAL
CortexStepReadTerminal
```
Read output from a running terminal session.
- Used to capture output from long-running or interactive commands
- Works with background terminal sessions

### `send_command_input` — Send Input to Terminal
```
CortexStepSendCommandInput
```
Send input to a running terminal command.
- Used for interactive command input
- Sends keystrokes/text to a running shell session

### `code_search` — Code Search
```
CORTEX_STEP_TYPE_CODE_SEARCH
CortexStepCodeSearch
```
Semantic code search across the workspace (distinct from regex grep).
- `query`: Natural language search query
- `filePattern`: Optional glob pattern to limit search scope
- Uses embedding-based search for semantic matching

### `lint_diff` — Lint Diff Tool
```
CORTEX_STEP_TYPE_LINT_DIFF
CortexStepLintDiff
```
Analyze code changes for lint errors. Returns lint diagnostics for the current diff.
- `lintIDs`: IDs of lint errors to fix (from IDE feedback)
- Used before and after edits to verify code quality

### `write_blob` — Write Binary File
```
CORTEX_STEP_TYPE_WRITE_BLOB
CortexStepWriteBlob
```
Write binary file content (base64-encoded). Used for images, binaries, and non-text files.
- `path`: Target file path
- `content`: Base64-encoded content
- `mimeType`: Optional MIME type

### `mquery` — Mquery Search
```
CORTEX_STEP_TYPE_MQUERY
CortexStepMquery
```
Specialized query tool for multi-dimensional search. Used for structured data queries.

### Browser Subagent (Detailed)
```
CortexStepBrowserSubagent
CORTEX_STEP_TYPE_BROWSER_INPUT  (step type for browser actions)
```
A dedicated subagent with browser-only tools. Spawned via `browser_subagent` tool.

**Architecture**:
- `BrowserSubagentHandler` — handles browser subagent lifecycle
- `BrowserSubagentContextConfig` — context configuration
- `BrowserSubagentMode` — operation mode
- `BrowserSubagentModel` — separate model for browser subagent
- `BrowserSubagentToolConfig` — tool configuration
- `BrowserSubagentV2` (`EnableBrowserSubagentV2`) — enhanced version toggle

**Parameters** (from jsonschema descriptions):
- `taskName`: Human-readable title (e.g. "Navigating to Example Page"). First argument.
- `task`: Detailed task description/prompt sent to browser subagent. Second argument.
- `recordingName`: Save browser actions as recording (max 3 words, e.g. `login_flow_demo`)
- `resumeFromID`: Resume from a previous browser subagent conversation ID
- `mediaFiles`: Optional absolute paths to media for context (max 3 files)
- `tools`: Boolean flag — equip subagent with file/command tools

**Browser actions recordable**:
- Page navigation, click, input, scroll
- Screenshot capture, DOM inspection
- Network request tracking
- Full session recording for replay

### Subagent Roles
Each subagent can have a named role:
```json
"role": {
  "type": "string",
  "description": "A 2-5 word description of the subagent's role. Should read similar to a job title, e.g. 'Codebase Researcher', 'Database Debugger', etc."
}
```
Roles distinguish between subagents with similar purposes and appear in the UI.

### Subagent System Prompt
```json
"systemPrompt": {
  "type": "string",
  "description": "A detailed system prompt for this subagent."
}
```
Overrides the default system prompt for specialized behavior.

### Subagent Workspace Modes
```json
"workspaceMode": {
  "type": "string",
  "enum": ["inherit", "branch", "share"],
  "description": "Workspace mode for the subagent."
}
```
- `"inherit"` (default) — same workspace as parent
- `"branch"` — new isolated workspace branched/cloned from parent
- `"share"` — new workspace sharing parent's underlying repo directory (like `git worktree`), allowing independent branching without storage duplication

### Subagent Resume from ID
```json
"resumeFromID": {
  "type": "string",
  "description": "ID of a previous subagent to resume from. If provided, the agent will continue from the previous context."
}
```
Allows resuming work from a cancelled subagent, preserving context.

### Subagent with File Tools
```json
"useFileTools": {
  "type": "boolean",
  "description": "Set true to equip the subagent with tools to create and edit files, and run commands."
}
```
When false, subagent has read-only access (browser/web only).

### Edit Classification & Importance
Each file edit carries metadata:
```json
"classification": {
  "type": "string",
  "description": "Classification of the edit. Examples: 'Continuing the user\\'s work', 'Bug fix', 'Documentation'."
}
```
```json
"importance": {
  "type": "string",
  "enum": ["high", "medium", "low"],
  "description": "'high' for edits directly addressing the main request or fixing critical issues, 'medium' for supporting changes, 'low' for minor improvements."
}
```
```json
"explanation": {
  "type": "string",
  "description": "Brief, user-facing explanation of what this change did. Focus on non-obvious rationale, design decisions, or important context."
}
```
```json
"lintIDs": {
  "type": "array",
  "items": { "type": "string" },
  "description": "IDs of lint errors this edit aims to fix (from IDE feedback)."
}
```

### Permissions: 5 Decision Values
The permission system supports 5 decision values:
```json
"decision": {
  "type": "string",
  "enum": ["allow", "deny", "ask", "force_ask", "deny_unless_prior_grant"],
  "description": "Decision for the tool call."
}
```
- `allow` — auto-approve
- `deny` — block execution
- `ask` — request user confirmation (standard)
- `force_ask` — force prompt even if previously granted
- `deny_unless_prior_grant` — block unless already explicitly granted before

**Auto-approve modes**:
- `Accept-edits mode: auto-approving file write %q at step %d` — auto-approves writes
- `--dangerously-skip-permissions` — skips all permission prompts
- `Auto-approve all tool permission requests without prompting` — global bypass

### Artifact Feedback (Proceed Button)
Artifacts can request user feedback with execution capability:
```json
"requestUserFeedback": {
  "type": "boolean",
  "description": "Set to true if you'd like to request user feedback on this artifact and if the contents are executable (e.g., a plan). The user will be provided with a 'Proceed' button to execute it."
}
```
```json
"presentToUser": {
  "type": "boolean",
  "description": "Set to true if this artifact should be presented to the user. Set to false for scratch scripts, temporary data files, or files that the user does not need to see."
}
```

### Knowledge Item Metadata
Each Knowledge Item (KI) has structured metadata:
```json
"title": {
  "type": "string",
  "description": "Human-readable title for the Knowledge Item"
}
```
```json
"summary": {
  "type": "string",
  "description": "One paragraph summary of the Knowledge Item"
}
```
```json
"references": {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "type": { "type": "string", "description": "Type of reference (e.g. file, conversation_id, url)" },
      "value": { "type": "string", "description": "Value of the reference" }
    }
  }
}
```

### Screen Recording
```
SaveScreenRecording — Save browser session as screen recording
```
Captures browser subagent actions as a replayable recording.
- Recording stored as `recordingName` during browser subagent invocation
- Used for demos, bug reproduction, and workflow documentation

### Browser Screenshot Capture Details
Full browser screenshot capabilities:
- **Full viewport**: Default capture of visible area
- **Element-specific**: `captureByElementIndex` + `elementIndex` — capture specific DOM element
- **Extended**: `extendedScreenshot` — captures up to 4000px from current scroll position downward
- **Save to artifact**: `saveAsArtifact` — persists screenshot as an artifact file
- **Name**: `name` — save name (max 3 words, e.g. `login_page_error`)
