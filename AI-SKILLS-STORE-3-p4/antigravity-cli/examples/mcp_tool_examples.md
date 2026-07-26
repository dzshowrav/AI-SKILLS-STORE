# MCP Tool Examples

---

## Call MCP Tool

```
User: "Query the database using the MCP server"
```

```
→ call_mcp_tool
  serverName: "database"
  toolName: "query"
  arguments: { "sql": "SELECT * FROM users LIMIT 5" }

  ← Query returned 5 rows.
```

---

## List & Read MCP Resources

```
User: "What resources does the MCP server expose?"
```

```
→ list_mcp_resources
  serverName: "filesystem"

  ← Returns: ["file:///workspace/README.md", "file:///workspace/go.mod"]

→ read_mcp_resource
  serverName: "filesystem"
  uri: "file:///workspace/README.md"

  ← Content of README.md
```

---

## Full MCP Workflow

```
User: "Use the git MCP server to check status"
```

```
→ list_mcp_resources
  serverName: "git"

  ← Available resources and tools for the git server

→ call_mcp_tool
  serverName: "git"
  toolName: "status"
  arguments: {}

  ← Git status: 2 modified files

→ call_mcp_tool
  serverName: "git"
  toolName: "diff"
  arguments: { "staged": false }

  ← Diff output of modified files
```
