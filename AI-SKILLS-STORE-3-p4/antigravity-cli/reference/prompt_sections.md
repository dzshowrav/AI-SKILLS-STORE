# PromptSection / PromptBuilder Reference

---

## Architecture

```
cortex/shared/section_constants.go   — Section key constants
cortex/shared/providers/
  resolve.go                          — Section resolution logic
  manager.go                          — Provider manager

cortex/providers/
  mcp/                                — MCP protocol provider
    protocol_handler.go               — JSON-RPC handler
    provider.go                       — Provider implementation
    tool_caller.go                    — MCP tool invocation
```

---

## Prompt Sections

The system prompt is constructed from multiple sections:

```go
const (
    SectionSystemPrompt     = "system_prompt"
    SectionAgentConfig      = "agent_config"
    SectionRules            = "rules"
    SectionSkills           = "skills"
    SectionKnowledge        = "knowledge_items"
    SectionToolDefinitions  = "tool_definitions"
    SectionUserRequest      = "user_request"
    SectionConversationHistory = "conversation_history"
    SectionToolResults      = "tool_results"
    SectionUserPreferences  = "user_preferences"
)
```

---

## Resolution Pipeline

```go
func ResolvePromptSections(ctx, sections []string, opts ResolveOptions) ([]PromptSection, error)
```

Resolution order:
1. System prompt (built-in template)
2. Agent config (`--agent` flag or `AGENTS.md`)
3. Rule files (`.agents/rules/*.md`)
4. Skills content (from `skills.json`)
5. Knowledge Items (from KI directory)
6. Tool definitions (from registered tools)
7. Conversation history (from DB)

---

## Provider Registry

```go
type ProviderManager struct {
    providers map[string]Provider
}

func NewManager() *ProviderManager
func (m *ProviderManager) ResolveTools(toolNames []string) []ToolDefinition
func (m *ProviderManager) ResolvePromptSections(sections []string) []PromptSection
func (m *ProviderManager) ResolveHooks(hookNames []string) []Hook
```

---

## Tool Definition Resolution

```go
type ToolDefinition struct {
    Name        string
    Description string
    InputSchema *jsonschema.Schema
    Provider    string       // Which provider registered this
    Category    string
    Hidden      bool
}
```

---

## MCP Protocol Handler

```go
type McpProtocolHandler struct {
    servers map[string]*McpServer
}

func NewMcpProtocolHandler() *McpProtocolHandler
func (h *McpProtocolHandler) HandleToolCall(server, tool string, args json.RawMessage) (*ToolResult, error)
```

Handles:
- JSON-RPC message formatting
- Server connection management
- Tool call routing
- Error handling
- Response parsing
