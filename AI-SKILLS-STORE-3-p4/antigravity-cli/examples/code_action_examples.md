# CodeAction Lifecycle Examples

---

## Simple CodeAction Flow

```
Step Created (CodeAction)
  Status: PENDING
  ActionSpec: { FilePath: "main.go", OldString: "foo()", NewString: "bar()" }

  → Permission Check (if needed)
  → Validate Schema
  → Pre-Tool Hook

  → Execution
    → FastApply attempt
      → Success: Status = DONE
      → Failure: Fall back to write_file
        → FastApplyFallbackInfo set
        → HeuristicFailure populated

  → Post-Tool Hooks
    → LintErrors check
    → PersistentLintErrors check
    → KnowledgeTimestamp update

  → Complete
    → ActionResult: { Success: true, Diff: "...", LintPassed: true }
    → AcknowledgementType: ACK_AUTO
```

---

## CodeAction with Lint Errors

```
Step Created (CodeAction)
  ActionSpec: { FilePath: "main.go", ... }

  → FastApply succeeds

  → Lint check fails:
    LintErrors: ["main.go:12:2: undefined: bar"]
    LintErrorIdsAimingToFix: ["lint-001"]

  → HeuristicFailure set:
    HeuristicFailure: { Type: "lint_error", Message: "..." }

  → Agent retries with fix:
    ActionSpec: { FilePath: "main.go", OldString: "bar()", NewString: "baz()" }

  → Lint passes
  → Action applied successfully
```

---

## CodeAction with Artifact

```
Step Created (CodeAction)
  ActionSpec: { FilePath: ".artifacts/arch.md" }
  IsArtifactFile: true
  ArtifactVersion: 3
  ArtifactMetadata: { "type": "documentation", "format": "markdown" }

  → Execute (always full write for artifacts)
  → ActionResult: { Success: true }
  → ArtifactVersion incremented to 4
```

---

## CodeAction Trajectory View

```json
{
  "stepView": {
    "source": "LLM",
    "targetURI": "file:///workspace/main.go",
    "originalContent": "func foo() {}",
    "isNewCreation": false,
    "diff": "--- a/main.go\n+++ b/main.go\n@@ -1 +1 @@\n-func foo() {}\n+func bar() {}",
    "hasCreateFileSpec": false,
    "isArtifactFile": false,
    "acknowledgementType": "ACK_AUTO",
    "status": "DONE"
  }
}
```

---

## Heuristic Failure Handling

```
When FastApply heuristics detect a problem:

1. HeuristicFailure is populated with details
2. Action falls back to regular write_file
3. FastApplyFallbackInfo records the reason
4. Agent retries with normal code path
5. Original content preserved for comparison
```
