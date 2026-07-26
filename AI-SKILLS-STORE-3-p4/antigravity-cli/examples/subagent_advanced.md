# Subagent Advanced Examples

## Subagent with Role and Workspace Mode
```json
{
  "name": "invoke_subagent",
  "arguments": {
    "name": "security-audit",
    "role": "Security Auditor",
    "task": "Audit the authentication module for OWASP Top 10 vulnerabilities. Check for SQL injection, XSS, CSRF, and insecure direct object references. Return a table of findings with severity levels.",
    "workspaceMode": "inherit",
    "useFileTools": true
  }
}
```

## Browser Subagent with Recording
```json
{
  "name": "browser_subagent",
  "arguments": {
    "taskName": "Test Login Flow",
    "task": "Navigate to localhost:3000/login, enter test credentials, submit the form, verify the redirect to dashboard, capture a screenshot of the dashboard. Return the screenshot paths and any errors encountered.",
    "recordingName": "login_flow_demo",
    "mediaFiles": ["/home/user/test_credentials.png"],
    "useFileTools": false
  }
}
```

## Resume from Previous Subagent
```json
{
  "name": "invoke_subagent",
  "arguments": {
    "name": "debug-session",
    "role": "Database Debugger",
    "task": "Continue investigating the query performance issue. The query plan was already extracted. Now optimize the slow JOIN operations.",
    "workspaceMode": "branch",
    "resumeFromID": "subagent-conversation-abc-123"
  }
}
```

## Batch Subagents with Roles
```json
{
  "name": "invoke_subagents",
  "arguments": {
    "subagents": [
      {
        "name": "frontend-review",
        "role": "UI Reviewer",
        "task": "Review the React components for accessibility issues. Check for proper ARIA labels, keyboard navigation, and color contrast.",
        "workspaceMode": "inherit",
        "useFileTools": true
      },
      {
        "name": "backend-review",
        "role": "API Reviewer",
        "task": "Review the REST API endpoints for proper error handling, input validation, and response format consistency.",
        "workspaceMode": "inherit",
        "useFileTools": true
      }
    ]
  }
}
```

## Subagent with System Prompt Override
```json
{
  "name": "define_subagent",
  "arguments": {
    "name": "expert-reviewer",
    "role": "Code Reviewer",
    "systemPrompt": "You are an expert code reviewer with 15 years of experience. Focus on security, performance, and maintainability. Be thorough but constructive. Always provide specific code examples for improvements.",
    "description": "Senior code reviewer for critical code paths"
  }
}
```
