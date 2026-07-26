# Screen Recording Reference

## Overview
The CLI can record browser sessions for replay. Recordings capture all browser interactions during a browser subagent task.

## Save Screen Recording
```
SaveScreenRecording — Save browser session as screen recording
```

## How It Works
1. Browser subagent is spawned with `recordingName` parameter
2. `McpBrowserRecordingStartHook` starts recording automatically
3. All browser actions are captured: navigation, clicks, input, scroll
4. Screenshots taken at key interaction points
5. Network requests logged
6. Recording saved for replay

## Recording Parameters
- `recordingName`: Max 3 words, lowercase_with_underscores. Example: `login_flow_demo`
- Set during `browser_subagent` invocation
- Recording stored in trajectory/artifact system

## Related
- Browser actions that get recorded: all browser tools
- Recording playback in browser recording viewer
- Recording cleanup when subagent killed
