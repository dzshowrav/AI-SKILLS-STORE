# Shell & Terminal Tools Reference

## Tools

### `shell_exec` — Direct Shell Execution
```
CORTEX_STEP_TYPE_SHELL_EXEC
CortexStepShellExec
```
Execute a shell command directly (distinct from `run_command`). Uses `exec` syscall, no PTY.
- Returns stdout/stderr as string
- Simple execution without terminal interaction

### `command_status` — Check Background Command Status
```
CORTEX_STEP_TYPE_COMMAND_STATUS
CortexStepCommandStatus
```
Check status of a previously started background command.
- `commandId`: ID of the command to check
- `waitSeconds`: Seconds to wait for completion (0=immediate, max=300)
- Returns: running, completed, or error

### `read_terminal` — Read Terminal Output
```
CORTEX_STEP_TYPE_READ_TERMINAL
CortexStepReadTerminal
```
Read output from a running terminal session. Works with background commands.

### `send_command_input` — Send Input to Terminal
```
CortexStepSendCommandInput
```
Send input/keystrokes to a running terminal command for interactive programs.

## Background Command Lifecycle
```
Command Started (background flag)
  -> Command ID returned
  -> Optional: send_command_input for interactive input
  -> command_status to check progress (with wait)
  -> read_terminal to capture output
  -> Command completes or killed
```

## Implementation
- PTY via `github.com/creack/pty`
- Background tasks via `BackgroundTaskAccumulator`
- Signal handling for cleanup on termination
