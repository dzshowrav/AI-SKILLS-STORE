# MCP Maker

Build MCP (Model Context Protocol) servers from scratch for any API, service, or tool. The user says what they want to connect to, and you figure out the rest.

## When to use

Use when the user says any of:
- "make me an MCP", "build an MCP", "create an MCP server"
- "connect Claude/Goose to X", "I want AI to talk to X"
- "MCP for [service name]", "/mcp-maker"
- Any request to build a bridge between an AI assistant and an external service

## Conversation Flow

### Phase 1: Discovery (ask the user)

Start with:
> **What MCP would you like to make?** Tell me the service/API/tool, or paste an endpoint URL, docs link, or npm package name. I'll figure out the rest.

Get ONE of these from the user:
- A service name (e.g., "Framer", "Notion", "Stripe")
- An API docs URL
- An npm/pip package name
- An endpoint URL
- A description of what they want the AI to be able to do

### Phase 2: Research (you do this, don't ask)

1. **Find the API** — Search for the official SDK/package, REST API docs, or existing MCP servers
2. **Map capabilities** — Identify what operations the API supports (CRUD, publish, query, etc.)
3. **Check for existing MCPs** — Search npm (`@modelcontextprotocol/server-*`), GitHub (`github.com/modelcontextprotocol/servers`), and community repos
4. **Identify auth requirements** — API keys, OAuth, tokens, env vars

### Phase 3: Report back (tell the user what you found)

Present a concise summary:

```
## [Service Name] MCP Plan

**SDK/Package:** [package name] (v[version])
**Auth:** [what's needed — API key, OAuth, etc.]
**What I'll build:** [number] tools:
  • tool_name — what it does
  • tool_name — what it does
  ...

**What I need from you:**
  1. [credential they need to provide]
  2. [any config choices]

Ready to build? Say "go" or adjust the plan.
```

### Phase 4: Build (after user says go)

Create the MCP server following this exact structure:

```
~/[service]-mcp/
├── package.json
├── src/index.js          ← The MCP server
├── .env                  ← Credentials (gitignored)
├── .gitignore
└── README.md             ← Setup + config instructions
```

#### The MCP Server Pattern (index.js)

```javascript
#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// import the service SDK

const server = new McpServer({
  name: "[service]",
  version: "1.0.0",
  description: "[what this MCP does]",
});

// --- Connection/auth management ---
let client = null;
// ... setup auth from env vars or tool call

// --- Tools ---
// Each tool follows this pattern:
server.tool(
  "tool_name",                              // snake_case name
  "Clear description of what this does. "   // AI reads this to decide WHEN to use it
  + "Include context about when/why.",      // Be specific, not generic
  {
    param: z.string().describe("What this param is for"),
  },
  async ({ param }) => {
    try {
      const result = await client.doThing(param);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `❌ ${error.message}` }],
        isError: true,
      };
    }
  }
);

// --- Start ---
const transport = new StdioServerTransport();
await server.connect(transport);
```

#### package.json template

```json
{
  "name": "[service]-mcp",
  "version": "1.0.0",
  "type": "module",
  "bin": { "[service]-mcp": "./src/index.js" },
  "scripts": { "start": "node src/index.js" },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.29.0",
    "zod": "^3.23.0"
  }
}
```

Add the service SDK to dependencies too.

#### README.md must include

1. What the MCP does (one sentence)
2. Available tools table (name + description)
3. Setup instructions (install, credentials)
4. Claude Desktop config JSON snippet
5. Goose config YAML snippet
6. Example conversation showing the tools in action

### Phase 5: Test

1. Verify all dependencies install: `cd ~/[service]-mcp && npm install`
2. Verify the server starts: `node -e "import('./src/index.js')"` or syntax check
3. Test the actual API connection with user's credentials
4. Show the user what worked

### Phase 6: Configure (offer to set up)

Ask: "Want me to add this to your Goose/Claude config so you can use it right now?"

If yes, add to the appropriate config file.

## Key Principles

- **Don't over-ask.** Research first, report back with a plan, then build.
- **Descriptions are everything.** The AI decides which tool to use based on the description string. Write them like you're explaining to a smart coworker.
- **Always use try/catch** in tool handlers. Return `isError: true` on failure.
- **Snake_case tool names.** Consistent, readable.
- **Zod `.describe()` on every param.** The AI sees these as parameter docs.
- **One connection pattern.** Either env var auth or a `connect_*` tool — not both required.
- **Always include disconnect/cleanup.** Handle SIGINT gracefully.
- **Test with real credentials** before declaring done.

## MCP Architecture Reference

```
┌──────────────┐     stdin/stdout      ┌──────────────┐      API calls      ┌──────────┐
│  AI Client   │ ◄──── JSON-RPC ────► │  MCP Server  │ ◄─────────────────► │ Service  │
│ (Claude,     │    (MCP Protocol)     │  (our code)  │    (SDK/REST)       │  API     │
│  Goose, etc) │                       │              │                     │          │
└──────────────┘                       └──────────────┘                     └──────────┘
```

**Transport:** StdioServerTransport (stdin/stdout) — used by Claude Desktop, Goose, etc.
**Protocol:** JSON-RPC 2.0 with MCP extensions
**SDK:** `@modelcontextprotocol/sdk` (TypeScript/Node.js) or `mcp` (Python)

### Python MCP servers (alternative)

If the service only has a Python SDK, use:

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("service-name")

@mcp.tool()
def tool_name(param: str) -> str:
    """Description of what this tool does."""
    result = service_client.do_thing(param)
    return json.dumps(result)

mcp.run()
```

Install: `pip install mcp`

## Previously Built MCPs (reference)

### Framer MCP (~/framer-mcp/)
- **SDK:** `framer-api` (v0.1.7)
- **Auth:** API key from Site Settings + project editor URL
- **Tools:** connect_project, get_project_info, list_collections, get_collection_items, get_changes, publish_preview, deploy_to_production, disconnect
- **Gotcha:** Needs project editor URL (framer.com/projects/Name--ID), NOT published site URL
