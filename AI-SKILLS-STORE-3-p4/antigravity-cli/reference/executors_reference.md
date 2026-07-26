# Executors System Reference

---

## Overview

```
cortex/executors/
  executors.go              — Core executor logic
  posthooks/                — Post-execution hook pipeline
    checkpoint_hook.go
    command_assessor_hook.go
    conversation_log_hook.go
    empty_output_continuation_check.go
    force_invocation.go
    ki_insertion_hook.go
    knowledge_generation_hook.go
    knowledge_timestamp_hook.go
    max_generator_invocations_check.go
    message_continue_check.go
    no_op_hook.go
    no_tool_call_check.go
```

---

## Executor Types

### RevertExecutor

```go
func NewRevertExecutor() *RevertExecutor
// Handles reverting/undoing previous code actions
// Uses CodeEditRevertPreview to show what will be reverted
// Calls AcknowledgeCascadeCodeEdit to confirm with LS
```

### SubagentExecutor

```go
func NewSubagentExecutor() *SubagentExecutor
// Manages subagent lifecycle for tool calls
// Starts subagent sync worker
// Syncs subagent state back to main conversation
```

---

## Step Resource Cleanup

```go
func cleanUpStepResources(step *Step)
// Cleans up temp files, processes, and state after step completion
```

---

## Subagent Sync Worker

```go
func startSubagentSyncWorker(ctx context.Context, subagentID string)
// Background goroutine that:
//   - Monitors subagent state
//   - Syncs tool results back to main conversation
//   - Updates subagent status in UI
//   - Handles subagent completion/timeout
```
