# PostHooks Pipeline Reference

Every tool execution step runs through a pipeline of posthooks after completion.

---

## Hook Order

```
Step Executed
  → CheckpointHook
  → CommandAssessorPostInvocationHook
  → ConversationLogHook
  → EmptyOutputContinuationCheck
  → ForceInvocationHook
  → KIInsertionHook
  → KnowledgeGenerationHook
  → KnowledgeTimestampHook
  → MaxGeneratorInvocationsCheck
  → MessageContinueCheck
  → NoToolCallCheck
  → Step Complete / Error
```

---

## Hook Definitions

### CheckpointHook
- **File**: `posthooks/checkpoint_hook.go`
- **Purpose**: Persists a checkpoint of current state after each step
- **Behavior**: Saves conversation, steps, and state to SQLite
- **When**: Always runs after every step

### CommandAssessorPostInvocationHook
- **File**: `posthooks/command_assessor_hook.go`
- **Purpose**: Assesses command output for security/safety
- **Behavior**: Analyzes exit codes, output patterns, sandbox violations
- **When**: Only for `run_command` steps

### ConversationLogHook
- **File**: `posthooks/conversation_log_hook.go`
- **Purpose**: Logs step as a message in the conversation history
- **Behavior**: Adds tool message to messages table with results
- **When**: Always runs

### EmptyOutputContinuationCheck
- **File**: `posthooks/empty_output_continuation_check.go`
- **Purpose**: Detects commands that produced no output
- **Behavior**: If a tool returns empty result, agent may need to retry
- **When**: If output is empty

### ForceInvocationHook
- **File**: `posthooks/force_invocation.go`
- **Purpose**: Forces additional LLM invocations when needed
- **Behavior**: `CountForcedInvocations` tracks how many forced calls were made
- **When**: Configurable, used in specific execution modes

### KIInsertionHook
- **File**: `posthooks/ki_insertion_hook.go`
- **Purpose**: Inserts matched Knowledge Items into context
- **Behavior**: Matches current context against KI directory; inserts matched KIs into system prompt
- **When**: After every step if KIs match

### KnowledgeGenerationHook
- **File**: `posthooks/knowledge_generation_hook.go`
- **Purpose**: Automatically generates new Knowledge Items from step results
- **Behavior**: Creates KIs from code patterns, architecture decisions, and conventions
- **When**: If knowledge generation is enabled

### KnowledgeTimestampHook
- **File**: `posthooks/knowledge_timestamp_hook.go`
- **Purpose**: Updates access timestamps on KIs
- **Behavior**: Updates `last_accessed_at` on matched KIs
- **When**: After KI insertion

### MaxGeneratorInvocationsCheck
- **File**: `posthooks/max_generator_invocations_check.go`
- **Purpose**: Enforces maximum LLM invocation limits
- **Behavior**: Stops execution if max invocations exceeded
- **When**: After every step

### MessageContinueCheck
- **File**: `posthooks/message_continue_check.go`
- **Purpose**: Determines if agent should continue generating
- **Behavior**: Checks if more LLM calls are needed for the current task
- **When**: After every step

### NoOpHook
- **File**: `posthooks/no_op_hook.go`
- **Purpose**: Placeholder no-op hook
- **Behavior**: Does nothing, used as default

### NoToolCallCheck
- **File**: `posthooks/no_tool_call_check.go`
- **Purpose**: Handles case where LLM didn't make any tool calls
- **Behavior**: Determines if that's acceptable or if we need to retry
- **When**: If step has no tool calls
