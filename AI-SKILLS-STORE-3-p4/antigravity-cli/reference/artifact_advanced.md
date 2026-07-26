# Artifact System — Advanced Reference

## User Feedback (Proceed Button)
Artifacts can request user feedback with execution capability:
```json
"requestUserFeedback": {
  "type": "boolean",
  "description": "Set to true if you'd like to request user feedback on this artifact and if the contents of this artifact are executable (e.g., a plan). The user will be provided with a 'Proceed' button to execute it."
}
```

## Presentation Control
```json
"presentToUser": {
  "type": "boolean",
  "description": "Set to true if this artifact should be presented to the user. Set to false for scratch scripts, temporary data files, or files that the user does not need to see."
}
```

## Summary After Edit
```json
"summary": {
  "type": "string",
  "description": "Detailed multi-line summary of the artifact file, after edits have been made. Summary does not need to mention the artifact name and should focus on the contents and purpose of the artifact."
}
```

## Artifact Metadata
```json
"metadata": {
  "type": "object",
  "description": "Metadata that defines artifact properties. Required when creating an artifact file."
}
```
```json
"metadataUpdates": {
  "type": "object",
  "description": "Metadata updates if updating an artifact file, leave blank if not updating an artifact. Should be updated if the content is changing meaningfully."
}
```

## Artifact Language
```json
"language": {
  "type": "string",
  "description": "Markdown language for the code block, e.g 'python' or 'javascript'."
}
```

## Artifact Image Embedding
Generated images can be embedded in artifacts:
```
"You can embed this image in an artifact if you need the USER to review it."
"You can embed these images in an artifact if you need the USER to review them."
```

## Artifact Rendering
- Syntax highlighting via Chroma (200+ languages)
- Inline display in conversation
- Collapsible sections
- Diff view for edits
- Only `.md` files allowed in `artifacts/` directory

## Artifact Operations
- `artifact renderer dismiss: fileName=%q commentCount=%d commentsLen=%d`
- `cannot create or edit artifact %v, only .md files are allowed in artifacts/`
- Screen recording save as artifact: `SaveScreenRecording`
