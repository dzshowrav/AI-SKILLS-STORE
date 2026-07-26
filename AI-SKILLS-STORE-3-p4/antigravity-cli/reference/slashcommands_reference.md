# Slash Commands Reference

---

## Overview

```
cortex/slashcommands/
  slash_commands.go
```

Slash commands provide quick access to features from the command palette.

---

## Command Sources

### System Commands

```go
func GetSystemSlashCommands() []SlashCommand
func GetSystemSlashCommandsDefinitions() []CommandDefinition
```

Built-in commands:
```
/help       — Show help
/sessions   — Manage conversations
/models     — Select model
/clear      — Clear conversation
/exit       — Exit CLI
/feature    — Create feature
/component  — Create component
/command    — Create command
/mcp        — Create MCP server
/screen     — Create screen
/test       — Write tests
/docs       — Write documentation
/settings   — Open settings
/summarize  — Summarize conversation
```

### Skill Commands

```go
func GetSkillSlashCommands() []SlashCommand
```

Skills can register their own commands via the skills system. These appear alongside system commands.

---

## Command Definition

```go
type SlashCommand struct {
    Name        string           // /name (without /)
    Description string           // Short description
    Handler     func(HandlerContext) error
    Category    string           // Grouping category
}

type HandlerContext struct {
    Args        []string
    Conversation *Conversation
    Service     *ConversationService
    Prog        *tea.Program
}

type CommandDefinition struct {
    Name        string
    Description string
    Usage       string
    Category    string
}
```
