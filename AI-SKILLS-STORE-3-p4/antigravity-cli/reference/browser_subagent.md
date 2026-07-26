# Browser Subagent Reference

## Overview
A dedicated subagent with browser-only tools. Spawned via `browser_subagent` tool.

## Step Type
```
CortexStepBrowserSubagent
CORTEX_STEP_TYPE_BROWSER_INPUT
```

## Architecture
- `BrowserSubagentHandler` — lifecycle and message routing
- `BrowserSubagentContextConfig` — context configuration
- `BrowserSubagentMode` — operation mode
- `BrowserSubagentModel` — browser-optimized LLM model
- `BrowserSubagentToolConfig` — tool availability configuration
- `BrowserSubagentV2` (`EnableBrowserSubagentV2`) — enhanced version toggle
- `SkipBrowserSubagent` gRPC API for skip control

## Parameters
- `taskName` (string, required): Human-readable title. Example: "Navigating to Example Page".
- `task` (string, required): Detailed task description. Must be highly detailed, specific, one-shot execution.
- `recordingName` (string, optional): Save browser actions as recording. Max 3 words, lowercase. Example: `login_flow_demo`.
- `resumeFromID` (string, optional): Resume from previous browser subagent conversation ID.
- `mediaFiles` (array of strings, optional): Media for context. Max 3 files.
- `useFileTools` (boolean, optional): Equip with file/command tools. Default: false.

## Recording
Browser actions recorded via `McpBrowserRecordingStartHook`:
- Navigation, click, input, scroll
- Screenshots at key interaction points
- Network requests
- DOM interactions
