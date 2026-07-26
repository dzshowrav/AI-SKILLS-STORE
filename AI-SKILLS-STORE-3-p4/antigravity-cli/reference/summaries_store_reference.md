# Summaries Store Reference

---

## Overview

```
cortex/summaries_store/
```

Generates and stores conversation summaries to optimize context usage.

---

## Summary Types

```go
type Summary struct {
    ID              string
    ConversationID  string
    Content         string
    TokenCount      int32
    MessageRange    Range        // Which messages this covers
    CreatedAt       time.Time
    LastAccessedAt  time.Time
}

type ConversationSummary struct {
    Title           string
    Goal            string
    KeyDecisions    []string
    FilesChanged    []string
    ToolsUsed       []string
    TokenUsage      TokenUsage
    MessageCount    int32
    StepCount       int32
    Duration        time.Duration
}
```

---

## When Summaries Are Created

- Conversation exceeds token threshold (e.g., 32K tokens)
- On explicit command (`/summarize`)
- On session end (auto-summary for next session)
- Before context window management

---

## Summary Usage

Summaries are injected as system context when:
- Conversation history exceeds context window
- Resuming a previous session
- The `summaries_store` rehydrates old conversations

```go
func GetSummaryForConversation(convID string) (*Summary, error)
func CreateSummary(convID string, msgs []Message) (*Summary, error)
func UpdateSummary(summaryID string, content string) error
```
