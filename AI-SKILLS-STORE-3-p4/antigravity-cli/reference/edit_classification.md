# Edit Classification & Metadata Reference

## Overview
Each file edit operation carries structured metadata for provenance, review, and lint integration.

## Fields

### Classification
```json
"classification": {
  "type": "string",
  "description": "Classification of the edit. Examples include 'Continuing the user\\'s work', 'Bug fix', and 'Documentation'."
}
```

### Importance
```json
"importance": {
  "type": "string",
  "enum": ["high", "medium", "low"],
  "description": "A measure of how important and relevant the edit is to the user's task. Use 'high' for edits directly addressing the main request or fixing critical issues, 'medium' for supporting changes, 'low' for minor improvements."
}
```

### Explanation
```json
"explanation": {
  "type": "string",
  "description": "Brief, user-facing explanation of what this change did. Focus on non-obvious rationale, design decisions, or important context. Don't just restate what the code does."
}
```

### Description of Changes
```json
"description": {
  "type": "string",
  "description": "A description of the changes that you are making to the file."
}
```

### Lint IDs
```json
"lintIDs": {
  "type": "array",
  "items": { "type": "string" },
  "description": "If applicable, IDs of lint errors this edit aims to fix (they'll have been given in recent IDE feedback). If you believe the edit could fix lints, do specify lint IDs; if the edit is wholly unrelated, do not. A rule of thumb is, if your edit was influenced by lint feedback, include lint IDs."
}
```

## Multi-Replace Chunk Edits
Non-contiguous edits use `multi_replace_file_content`:
```json
{
  "name": "multi_replace_file_content",
  "inputSchema": {
    "type": "object",
    "properties": {
      "path": { "type": "string", "description": "The target file to modify. Must be an absolute path." },
      "chunks": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "oldString": { "type": "string" },
            "newString": { "type": "string" }
          }
        },
        "description": "A list of chunks to replace. It is best to provide multiple chunks for non-contiguous edits if possible. This must be a JSON array, not a string."
      }
    },
    "required": ["path", "chunks"]
  }
}
```

### Replace Multiple Flag
```json
"replaceAll": {
  "type": "boolean",
  "description": "If true, multiple occurrences of 'targetContent' will be replaced by 'replacementContent'. Otherwise if multiple occurrences are found, an error will be returned."
}
```

## Related Tools
- `lint_diff` — analyzes code changes for lint diagnostics
- `single_replace_file_content` — single contiguous chunk replacement
- `tab_code_edit` — tab-based code editing with `ReplacementChunks`
