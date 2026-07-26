# FastApply System Reference

---

## Overview

FastApply bypasses the normal file-write-read cycle for speed. Instead of writing to disk and re-reading, it applies edits in memory.

```
cortex/fastapply/
```

---

## When FastApply Is Used

- Small, localized edits (single function, single line)
- Edits within already-open files
- Edits from known tool output formats
- When `UseFastApply: true` is set on the step

---

## When FastApply Falls Back

```go
type FastApplyFallbackInfo struct {
    Reason       string   // Why fast apply fell back
    OriginalContent string // Content before fallback
    FallbackMethod string // What method was used instead
}
```

Fallback reasons:
- `"file_too_large"` — File exceeds size threshold
- `"multiple_chunks"` — Non-contiguous edits
- `"heuristic_failure"` — Heuristic check failed
- `"validation_error"` — Applied result didn't match expected
- `"file_not_cached"` — File wasn't in memory

---

## CodeAction FastApply Fields

```go
UseFastApply bool                    // Request fast apply
FastApplyFallbackInfo *FallbackInfo  // Set if fast apply fails
```

## Flow

```
Step Created with UseFastApply=true
  → Check if file is in memory cache
  → Apply edit in-memory (no disk write)
  → Run linter on result
  → If lint passes: commit to disk
  → If lint fails:
    → Set HeuristicFailure
    → Fall back to normal write_file path
    → Set FastApplyFallbackInfo
```
