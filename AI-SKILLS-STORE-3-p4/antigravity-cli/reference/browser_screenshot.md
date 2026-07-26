# Browser Screenshot Reference

## Screenshot Capture Modes

### Full Viewport
Default capture of the visible browser viewport area.

### Element-Specific
```json
"captureByElementIndex": true,
"elementIndex": 5
```
Captures a screenshot of a specific DOM element by its annotated index instead of the full viewport.

### Extended Screenshot
```json
"extendedScreenshot": true
```
Captures an extended screenshot starting from the current scroll position downward, up to 4000px or the end of page content, whichever is less. To capture content above or below this range, scroll first and then capture.

## Screenshot Storage

### Save to Artifact
```json
"saveAsArtifact": true
```
Persists the screenshot as an artifact file in the conversation.

### Save Name
```json
"name": "login_page_error"
```
Name of the screenshot to save. Max 3 words, lowercase_with_underscores. Example: `login_page_error`.

## Image Generation Reference
Images generated via `generate_image` tool can also be embedded in artifacts:
```
"You can embed this image in an artifact if you need the USER to review it."
```

## Screenshot Pipeline
```
CDP (Chrome DevTools Protocol)
  -> CaptureScreenshot (via LSP or CDP)
  -> Optional: saveAsArtifact
  -> Optional: extendedScreenshot
  -> Image returned/stored
```
