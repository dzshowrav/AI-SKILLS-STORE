# Configuration Reference

---

## Discovery Order

The agent walks from CWD up to repo root, checking each directory:

1. **Global**: `~/.gemini/config/` and `~/.config/agy/`
2. **Project**: `.agents/`, `.agent/`, `_agents/`, `_agent/` at repo root
3. **File**: `AGENTS.md`, `GEMINI.md` at repo root
4. **Plugin**: `plugins/<name>/rules/` and `plugins/<name>/skills/`
5. **References**: `skills.json` and `plugins.json`

---

## Config File Formats

### Agent Instructions (`AGENTS.md` / `GEMINI.md`)

Markdown files at the repository root. Content is appended to the system prompt.

```
# Project Guidelines

This repository follows these conventions:
- Go code is formatted with gofumpt
- Tests use table-driven patterns
- Commits follow conventional commits
```

---

### Rule Files (`.agents/rules/*.md`)

Placed in `.agents/rules/`, `_agents/rules/`, or `plugins/<name>/rules/`.

```markdown
# Naming Conventions

- Use PascalCase for exported types
- Use camelCase for private fields
- Prefix interface names with the suffix "er" where possible
```

Rules are merged into the agent's system prompt in alphabetical order.

---

### Skills Configuration (`skills.json`)

Located at `.agents/skills.json` or referenced by path.

```json
{
  "skills": [
    {
      "name": "go-best-practices",
      "description": "Go development conventions",
      "path": "/shared/skills/go-best-practices",
      "version": "1.0.0"
    },
    {
      "name": "react-patterns",
      "description": "React component patterns",
      "path": "./skills/react",
      "version": "2.1.0"
    }
  ]
}
```

- `path` can be absolute or relative to the config file location
- Skills are loaded and inserted into the system prompt context

---

### Plugin Configuration (`plugins.json`)

```json
{
  "plugins": [
    {
      "name": "code-formatter",
      "enabled": true,
      "config": {
        "formatter": "gofumpt",
        "on_save": true
      }
    },
    {
      "name": "notifications",
      "enabled": false,
      "config": {}
    }
  ]
}
```

---

### MCP Server Configuration (`mcp_config.json`)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
      "env": {},
      "disabled": false,
      "autoApprove": ["read_file", "search_code"]
    },
    "database": {
      "command": "python3",
      "args": ["-m", "db_mcp_server"],
      "env": {
        "DB_URL": "sqlite:///data.db"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

MCP configs are merged from multiple locations:
1. Global: `~/.gemini/config/mcp_config.json`
2. Project: `.agents/mcp_config.json` or `./mcp_config.json`
3. Plugin: `plugins/<name>/mcp_config.json`

`autoApprove` lists tool names that skip user permission prompts.

---

### Plugin Manifest (`plugin.json`)

Located at `plugins/<name>/plugin.json`:

```json
{
  "name": "code-formatter",
  "description": "Automatically formats code on save",
  "version": "1.0.0",
  "author": "Developer Name",
  "dependencies": {
    "base-plugin": ">=1.0.0"
  },
  "min_cli_version": "1.0.0",
  "skills": ["formatting-rules"],
  "rules": ["formatting.md"],
  "mcp_servers": ["formatter-server"]
}
```

---

### Lifecycle Hooks (`hooks.json`)

Located at `plugins/<name>/hooks.json`:

```json
{
  "hooks": [
    {
      "event": "on_activate",
      "command": "echo 'Plugin activated'"
    },
    {
      "event": "on_deactivate",
      "command": "./cleanup.sh"
    },
    {
      "event": "before_conversation",
      "command": "python3 prepare_context.py"
    },
    {
      "event": "after_conversation",
      "command": "python3 summarize.py"
    },
    {
      "event": "before_tool_call",
      "command": "python3 validate_tool.py"
    },
    {
      "event": "after_tool_call",
      "command": "python3 log_tool.py"
    }
  ]
}
```

---

### Sidecar Configuration (embedded in `mcp_config.json` or plugin config)

```json
{
  "sidecars": [
    {
      "command": "node",
      "args": ["watcher.js"],
      "restart_policy": "always",
      "description": "File system watcher",
      "env": {
        "WATCH_DIR": "/data"
      },
      "working_dir": "/app/sidecars"
    },
    {
      "command": "python3",
      "args": ["-m", "http.server", "8080"],
      "restart_policy": "on_failure",
      "description": "Dev HTTP server"
    }
  ]
}
```

Restart policies: `"always"`, `"on_failure"`, `"never"`

---

### Knowledge Item Metadata

Located at `<KnowledgeDirectory>/<ki_name>/metadata.json`:

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

---

### Workspace Directory Structure

```
.agy/
  conversations.db     # SQLite database
  plugins/             # Installed plugins
  logs/                # Agent logs
  events/              # Trajectory/event storage

.agents/
  rules/*.md           # Rule files
  skills.json          # Skills reference
  plugins.json         # Plugin references
  mcp_config.json      # MCP server definitions

plugins/<name>/
  plugin.json          # Manifest
  hooks.json           # Lifecycle hooks
  mcp_config.json      # MCP servers
  rules/               # Rule files
  skills/              # Skill files
  data/                # Persistent data
```
