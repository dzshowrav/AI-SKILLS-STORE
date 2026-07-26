# CodeAction Protobuf Reference

Full protobuf field listing for `CortexStepCodeAction`.

---

## CortexStepCodeAction Fields

```go
type CortexStepCodeAction struct {
    ActionSpec                 // What action to perform
    ActionResult               // Result of applying the action
    UseFastApply bool          // Whether fast apply was used
    AcknowledgementType        // How user acknowledged (auto/manual)
    HeuristicFailure           // Heuristic validation failure info
    CodeInstruction            // The LLM's original instruction text
    LintErrors                 // Lint errors found post-application
    PersistentLintErrors       // Lint errors persisting across attempts
    LintErrorIdsAimingToFix    // IDs of lint errors this action targets
    ReplacementInfos           // Details of text replacements made
    IntroducedErrors           // Errors introduced by this action
    TriggeredMemories          // Knowledge Items that matched context
    IsArtifactFile bool        // Whether this edits an artifact
    ArtifactVersion            // Version number for artifact
    ArtifactMetadata           // JSON metadata for artifact
    IsKnowledgeFile bool       // Whether this edits a KI file
    FilePermissionRequest      // Permission info for file access
    Description                // Human-readable description
    MarkdownValidationError    // Markdown rendering validation
    DiffStats                  // Line-level diff statistics
    TargetFileHasCarriageReturns bool
    TargetFileHasAllCarriageReturns bool
}
```

---

## CodeActionStepView (Trajectory)

```go
type CodeActionStepView struct {
    Source               string   // Action source identifier
    TargetURI            string   // File URI being edited
    OriginalContent      string   // Content before edit
    IsNewCreation        bool     // Whether file was created
    Diff                 string   // Unified diff of changes
    HasCreateFileSpec    bool     // Whether creation had spec
    IsArtifactFile       bool     // Artifact flag
    AcknowledgementType  int32    // How acknowledged
    ActionSpec           *ActionSpec
    ActionResult         *ActionResult
    Metadata             map[string]string
    Status               string
}
```

---

## ActionSpec

```go
type ActionSpec struct {
    FilePath     string   // Target file path
    EditType     string   // edit_file / write_file / replace
    OldString    string   // Text to replace
    NewString    string   // Replacement text
    LineStart    int32    // Start line number
    LineEnd      int32    // End line number
}
```

---

## ActionResult

```go
type ActionResult struct {
    Success      bool     // Whether action succeeded
    Applied      bool     // Whether changes were applied
    Diff         string   // Resulting diff
    Error        string   // Error message if failed
    LintPassed   bool     // Whether lint passed after
}
```

---

## FastApplyFallbackInfo

```go
type FastApplyFallbackInfo struct {
    Reason       string   // Why fast apply fell back
    OriginalContent string // Content before fallback
    FallbackMethod string // What fallback method was used
}
```

---

## DiffStats

```go
type DiffStats struct {
    LinesAdded    int32
    LinesRemoved  int32
    FilesChanged  int32
    ChunksChanged int32
}
```

---

## Acknowledgement Types

```go
enum AcknowledgementType {
    ACK_UNSPECIFIED  = 0
    ACK_AUTO         = 1   // Automatically acknowledged
    ACK_USER         = 2   // User explicitly acknowledged
    ACK_SKIP         = 3   // Skipped / not needed
    ACK_REVERTED     = 4   // Reverted after acknowledgement
}
```
