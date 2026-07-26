# PostHook Pipeline Examples

---

## After File Edit

```
Step: edit_file (main.go)

  → CheckpointHook
    → Saves full state to SQLite

  → CommandAssessorHook
    → Not relevant (not a command)

  → ConversationLogHook
    → Adds tool call + result to conversation

  → EmptyOutputCheck
    → Output not empty ✓

  → KIInsertionHook
    → Matches "code_style" KI → inserts into context

  → KnowledgeGenerationHook
    → No significant pattern detected → skip

  → KnowledgeTimestampHook
    → Updates "code_style" KI timestamp

  → MaxGeneratorInvocationsCheck
    → Invocation 3 of 50 ✓

  → MessageContinueCheck
    → Tool completed, more steps may be needed → continue

  → NoToolCallCheck
    → Not relevant (tool was called)
```

---

## After Shell Command

```
Step: run_command ("rm -rf /tmp/build")

  → CheckpointHook ✓

  → CommandAssessorHook
    → Exit code: 0
    → Command type: cleanup
    → No security concerns
    → Assessment: safe

  → ConversationLogHook ✓

  → EmptyOutputCheck
    → Output empty ("No output")
    → Triggers retry: Agent re-checked command
    → No issue found (expected behavior)

  → Remaining hooks...
```

---

## Knowledge Generation Trigger

```
Step: edit_file (adding a new API endpoint pattern)

  → KIInsertionHook
    → Matches "api_patterns" KI → inserts reference

  → KnowledgeGenerationHook
    → Detects new API endpoint pattern
    → Generates new KI "restful_endpoint_design"
    → Creates: .knowledge/restful_endpoint_design/reference.md

  → KnowledgeTimestampHook
    → Updates "api_patterns" timestamp
    → Sets "restful_endpoint_design" created_at
```
