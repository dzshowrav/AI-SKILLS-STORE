# Agent HTTP API Specification

Base URL: `http://localhost:<port>/_agentapi/`

Port comes from environment variable `ANTIGRAVITY_SIDECAR_WEB_PORT`.

---

## Endpoints

### POST /_agentapi/new-conversation

Create a new conversation programmatically.

**Request:**
```json
{
  "projectId": "my-project"
}
```

**Response:**
```json
{
  "conversationId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "created"
}
```

---

### POST /_agentapi/send-message

Send a user message to a conversation.

**Request:**
```json
{
  "message": "write a Python script for file sorting",
  "projectId": "resolvedProjectId",
  "conversationId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

**Response:**
```json
{
  "messageId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "status": "sent"
}
```

---

### POST /_agentapi/resolve-project

Resolve the project ID for a conversation.

**Request:**
```json
{
  "conversationId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

**Response:**
```json
{
  "projectId": "my-project",
  "status": "ok"
}
```

---

### GET /_agentapi/list-conversations

List all conversations.

**Response:**
```json
{
  "conversations": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Implement file sorting",
      "lastMessageAt": "2025-06-15T10:30:00Z"
    },
    {
      "id": "f2e3d4c5-b6a7-8901-cdef-234567890123",
      "title": "Refactor auth module",
      "lastMessageAt": "2025-06-14T15:45:00Z"
    }
  ]
}
```

---

### GET /_agentapi/get-trajectory

Get the execution trajectory (step history) of the current or last conversation.

**Response:**
```json
{
  "steps": [
    {
      "type": "run_command",
      "command": "npm test",
      "status": "DONE",
      "output": "PASS 1 test passed",
      "duration": "1.2s"
    },
    {
      "type": "edit_file",
      "file": "src/utils.ts",
      "status": "DONE",
      "duration": "0.3s"
    }
  ]
}
```

---

## Trajectory Storage

Each API interaction is stored as a timestamped JSON file:

```
<project-dir>/events/<timestamp>.json
```

Format:
```json
{
  "timestamp": "2025-06-15T10:30:00.123Z",
  "endpoint": "send-message",
  "request": { ... },
  "response": { ... },
  "duration_ms": 450
}
```

---

## Authentication

API endpoints are only accessible from localhost. No additional authentication is required for local access.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTIGRAVITY_SIDECAR_WEB_PORT` | Port the HTTP API listens on |
| `ANTIGRAVITY_CONVERSATION_ID` | Current conversation context |
| `ANTIGRAVITY_EXECUTABLE_DATA_DIR` | Data directory for the current executable |
