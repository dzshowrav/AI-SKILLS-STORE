# Tool Call Flow Examples

---

## Example 1: File Edit Workflow

```
User: "Add error handling to main.go"
```

### LLM Agent Flow

```
1. search_code (find main.go)
   query: "func main"
   path: "."

2. read_file (understand current code)
   path: "main.go"

3. edit_file (add error handling)
   path: "main.go"
   edits: [
     { oldString: "result := process()", newString: "result, err := process()" },
     { oldString: "func main() {", newString: "func main() {\n    log.SetFlags(log.LstdFlags | log.Lshortfile)" }
   ]

4. run_command (verify compilation)
   command: "go build ./..."
   description: "verified the code compiles without errors"

5. finish
   summary: "Added error handling to main.go: wrapped process() call with err check, added log flags"
```

---

## Example 2: Subagent Delegation

```
User: "Research the API and implement a new endpoint"
```

### Main Agent Flow

```
1. define_subagent (create research agent)
   name: "api-researcher"
   description: "Researches API patterns in the codebase"
   system_prompt: "You are a research subagent..."
   tool_groups: ["read", "search"]

2. invoke_subagent (start research)
   name: "api-researcher"
   task: "Find all existing API endpoint patterns in the handlers/ directory and report the routing style, request/response formats, and middleware used"

   [Subagent works independently]
   ├── search_code "func.*Handler" path: "handlers/"
   ├── read_file "handlers/users.go"
   ├── glob "handlers/*.go"
   ├── grep "router\." path: "handlers/"
   └── send_message (back to main agent)
       message: "Found 3 existing endpoints using chi router..."

3. Agent receives research → determines approach

4. write_file (implement new endpoint)

5. run_command (verify build)
```

---

## Example 3: Web Research + Code Update

```
User: "Update the auth library to the latest version"
```

### Agent Flow

```
1. web_search
   query: "best Go OAuth2 library 2025"

2. web_fetch
   url: "https://github.com/coreos/go-oidc"
   max_length: 5000

3. read_file
   path: "go.mod"

4. run_command
   command: "go get github.com/coreos/go-oidc/v3@latest"

5. read_file
   path: "internal/auth/oidc.go"

6. edit_file (update import paths and API usage)
   [...]

7. run_command
   command: "go build ./..."
   description: "verified the code compiles with the updated library"

8. finish
   summary: "Updated OIDC library from v2 to v3, migrated API calls"
```

---

## Example 4: Multi-Tool Investigation

```
User: "Why is the test failing?"
```

### Agent Flow

```
1. run_command
   command: "go test ./... 2>&1"
   description: "ran tests to see the failure"

   Output: "FAIL: TestUserAuth — expected status 200 got 401"

2. grep
   pattern: "func TestUserAuth"
   include: "*_test.go"

3. read_file
   path: "internal/auth/user_auth_test.go"

4. grep
   pattern: "func.*Authenticate"
   include: "*.go"

5. read_file
   path: "internal/auth/user_auth.go"

6. search_code
   query: "token validation"
   path: "internal/auth/"

7. edit_file (fix token validation logic)

8. run_command
   command: "go test -run TestUserAuth ./internal/auth/"
   description: "verified the test passes after the fix"

9. finish
   summary: "Fixed test failure: token expiry check was comparing against Unix timestamp instead of time.Time"
```

---

## Example 5: Background Command + Status Check

```
User: "Start the dev server and run the tests"
```

### Agent Flow

```
1. background_command
   command: "npm run dev"
   description: "started the dev server in background"

   Returns: "Background command ID: abc-123"

2. run_command
   command: "npm test"
   description: "ran the test suite"

   Output: "Tests passed!"

3. get_command_status
   command_id: "abc-123"

   Output: "Dev server running on port 3000"

4. finish
   summary: "Started dev server (background, ID: abc-123), tests passed"
```

---

## Example 6: Browser-Based Workflow

```
User: "Check if the dashboard page renders correctly"
```

### Agent Flow

```
1. run_command
   command: "npm run build && npm run start"
   description: "built and started the application"

2. browser_navigate
   url: "http://localhost:3000/dashboard"

3. browser_screenshot

4. browser_console_logs

5. browser_javascript
   script: "document.title"

6. browser_scroll
   direction: "down"

7. browser_screenshot

8. finish
   summary: "Verified dashboard renders correctly at localhost:3000/dashboard. Page title: 'Dashboard — My App'. No console errors."
```

---

## Example 7: Permission-Aware Workflow

```
User: "Update the nginx config"
```

### Agent Flow

```
1. read_file
   path: "/etc/nginx/nginx.conf"
   → Permission required (system config)
   → User approves

2. edit_file
   path: "/etc/nginx/nginx.conf"
   → Permission required (system config change)
   → User approves

3. run_command
   command: "nginx -t"
   description: "validated nginx configuration syntax"
   → Permission required (run command)
   → User approves

4. run_command
   command: "systemctl reload nginx"
   description: "reloaded nginx with new configuration"
   → Permission required (system service)
   → User approves

5. finish
   summary: "Updated nginx config and reloaded service"
```

---

## Example 8: Truncated Output Handling

```
User: "List all files in the project"
```

### Agent Flow

```
1. run_command
   command: "find . -type f | head -500"
   description: "listed project files"

   Output (truncated >100KB):
   "Output snapshot:
    ./main.go
    ./go.mod
    ./internal/handler.go
    ... (450 more lines truncated)"
```

The LLM sees the truncated output and knows it was cut. It can make follow-up calls with more specific queries if needed.

---

## Step Lifecycle (in detail)

```
User sends message
  → LLM responds with tool call(s)
  → Each tool call creates a Step:

┌─────────────────────────────────────────────────────────┐
│ Step Created                                             │
│   Status: PENDING                                        │
│   Source: StepSourceLLM                                  │
│   Type: depends on tool                                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ ▼ Permission Check                                        │
│   If scope requires user approval → Status: WAITING       │
│   Cache check: permission_grants table                    │
│   User: approves/denies/always-approve                    │
│                                                          │
│ ▼ Schema Validation                                       │
│   Validates args against InputSchema                      │
│   On error: Status: ERROR                                 │
│   Error: "Error invalid tool call: ..."                   │
│                                                          │
│ ▼ Pre-Tool Hook (plugin)                                  │
│   before_tool_call hook runs if defined                   │
│                                                          │
│ ▼ Execution                                               │
│   Status: RUNNING                                         │
│   Tool-specific logic executes                            │
│   Timeout: default 30s (configurable)                     │
│                                                          │
│ ▼ Post-Tool Hook (plugin)                                 │
│   after_tool_call hook runs if defined                    │
│                                                          │
│ ▼ Result Processing                                       │
│   If >100KB: truncate + set OutputSnapshot flag           │
│   Format via Go template                                  │
│                                                          │
│ ▼ Completion                                              │
│   Status: DONE (success) / ERROR (failure)               │
│   Permission grant cached for future calls               │
│                                                          │
│ ▼ Metrics recorded                                        │
│   Duration, tokens, status logged                         │
└─────────────────────────────────────────────────────────┘
```
