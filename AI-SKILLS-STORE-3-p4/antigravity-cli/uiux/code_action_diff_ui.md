# CodeAction Diff View UI

---

## Diff Display in Conversation

```
● Code Action: main.go (FastApply ✓)
  ┌─ Diff ──────────────────────────────────────────┐
  │  --- a/main.go                                  │
  │  +++ b/main.go                                  │
  │  @@ -12,5 +12,7 @@                              │
  │   func process(data []byte) error {              │
  │  -  result := doSomething(data)                  │
  │  -  return result                                │
  │  +  result, err := doSomething(data)             │
  │  +  if err != nil {                              │
  │  +    return fmt.Errorf("process: %w", err)      │
  │  +  }                                            │
  │  +  return result, nil                           │
  └──────────────────────────────────────────────────┘
  [ Accept ] [ Revert ] [ Acknowledge ]
```

---

## Artifact Diff View

```
● Code Action: .artifacts/design.md (v3 → v4)
  ┌─ Diff ──────────────────────────────────────────┐
  │  ## Architecture Overview                        │
  │  - Uses REST API                                 │
  │  + Uses gRPC for inter-service communication     │
  └──────────────────────────────────────────────────┘
  [ Accept ] [ Revert ]
```

- Shows version changes for artifacts
- Clear version transition labeling

---

## Lint Error Display

```
● Code Action: main.go (⚠ Lint errors)
  ┌─ Lint Results ────────────────────────────────────┐
  │  ✗ main.go:12:2: undefined: doSomething            │
  │  ⚠ main.go:15:9: ineffectual assignment to result  │
  │                                                    │
  │  Attempting to fix...                              │
  └────────────────────────────────────────────────────┘
```

---

## Heuristic Failure Display

```
● Code Action: main.go (⚠ Heuristic check)
  ┌─ Fallback Notice ─────────────────────────────────┐
  │  FastApply couldn't verify the edit:              │
  │  Reason: Lint check failed                        │
  │                                                    │
  │  Falling back to regular file write...             │
  └────────────────────────────────────────────────────┘
```
