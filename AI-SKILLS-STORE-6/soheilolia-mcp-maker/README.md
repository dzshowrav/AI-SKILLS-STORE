# MCP Maker

A skill that builds MCP (Model Context Protocol) servers from scratch for any API, service, or tool.

Say "make me an MCP for [service]" and it handles the rest — research, planning, building, testing, and configuring.

## Works with

| Tool | File | Location |
|------|------|----------|
| **Goose** | `SKILL.md` | `~/.agents/skills/mcp-maker/SKILL.md` |
| **Claude Code** | `SKILL.md` | `~/.claude/skills/mcp-maker/SKILL.md` |
| **Cursor** | `mcp-maker.mdc` | `~/.cursor/rules/mcp-maker.mdc` |

## Install

```bash
# Goose
mkdir -p ~/.agents/skills/mcp-maker
cp SKILL.md ~/.agents/skills/mcp-maker/

# Claude Code
mkdir -p ~/.claude/skills/mcp-maker
cp SKILL.md ~/.claude/skills/mcp-maker/

# Cursor
cp mcp-maker.mdc ~/.cursor/rules/
```

Or use the install script from the repo root:
```bash
./install.sh
```

## Trigger phrases

- "make me an MCP for [service]"
- "build an MCP"
- "connect AI to [service]"
- "/mcp-maker"
