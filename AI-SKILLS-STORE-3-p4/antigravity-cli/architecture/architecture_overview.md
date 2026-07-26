# Antigravity CLI Architecture Overview

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      User Terminal                        │
├──────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐  │
│  │                  Bubble Tea TUI                      │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │  │
│  │  │ Chat     │  │ Context  │  │ Command Palette   │  │  │
│  │  │ Screen   │  │ Panel    │  │ (Ctrl+P)         │  │  │
│  │  └────┬─────┘  └──────────┘  └──────────────────┘  │  │
│  └───────┼─────────────────────────────────────────────┘  │
└──────────┼─────────────────────────────────────────────────┘
           │ tea.Cmd / tea.Msg
           ▼
┌──────────────────────────────────────────────────────────┐
│                    Conversation Service                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ LLM     │  │ Tool     │  │ Stream  │  │ Session  │ │
│  │ Client  │  │ Executor │  │ Handler │  │ Manager  │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
└──────────────────────────────────────────────────────────┘
           │
     ┌─────┼─────┬─────┬─────┬─────┐
     ▼     ▼     ▼     ▼     ▼     ▼
  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌──────────┐
  │ MCP │ │Git │ │Web │ │FS  │ │Sub │ │ Agent    │
  │Mgr │ │Svc │ │Svc │ │Svc │ │Agt │ │ API HTTP │
  └────┘ └────┘ └────┘ └────┘ └────┘ └──────────┘
```

---

## Layer Architecture

```
┌──────────────────────────────────────────────────┐
│                  Presentation Layer                │
│  Bubble Tea TUI, Home Screen, Chat Screen,        │
│  Command Palette, Context Panel, Agent Overlay    │
├──────────────────────────────────────────────────┤
│                  Application Layer                 │
│  Conversation Service, Session Manager,           │
│  Config Loader, Plugin Manager, Sidecar Manager   │
├──────────────────────────────────────────────────┤
│                  Domain Layer                      │
│  Tool Interface, Step Pipeline, Token Counter,    │
│  Permission Scope, Data Classification            │
├──────────────────────────────────────────────────┤
│                  Infrastructure Layer              │
│  SQLite (gorm), LLM Provider Clients,             │
│  MCP Transport, HTTP Server, File System          │
└──────────────────────────────────────────────────┘
```

---

## Component Dependency

```
TUI (Bubble Tea)
  │
  ├── Conversation Service ──┬── LLM Client (gRPC/REST)
  │                          ├── Tool Executor ──┬── MCP Manager
  │                          │                   ├── Git Service
  │                          │                   ├── Web Service
  │                          │                   └── File Service
  │                          ├── Stream Handler
  │                          └── Session Manager ── SQLite
  │
  ├── Config Loader ──┬── File Discovery (CWD → repo root)
  │                   ├── Plugin Manager
  │                   └── Sidecar Manager
  │
  ├── Context Panel ──┬── File Watcher (fsnotify)
  │                   ├── Terminal Manager (pty)
  │                   └── Subagent Tracker
  │
  └── Agent Overlay ──┬── Agent State Machine
                      └── Tool Confirmation UI
```

---

## Data Flow: Agent Execution

```
User Message
  │
  ▼
Chat Screen ──> Conversation Service
  │                    │
  │                    ├── Session Manager (load history)
  │                    ├── Build LLM Request (messages + tools)
  │                    │
  │                    ▼
  │              LLM Provider (gRPC/REST)
  │                    │
  │                    ├── If tool call:
  │                    │     ┌──────────────────────┐
  │                    │     │ Tool Executor         │
  │                    │     │  ├── Permission Check  │
  │                    │     │  ├── Validate Schema   │
  │                    │     │  ├── Pre-Tool Hook     │
  │                    │     │  ├── Execute           │
  │                    │     │  ├── Post-Tool Hook    │
  │                    │     │  └── Truncate Result   │
  │                    │     └──────────┬───────────┘
  │                    │                ▼
  │                    │         Tool Result → LLM
  │                    │
  │                    ├── If stream:
  │                    │     Stream Handler → WordTickMsg → Viewport
  │                    │
  │                    └── If complete:
  │                          Persist → Update messages → Ready
  │
  ▼
Chat Screen (re-render)
```

---

## Data Flow: Conversation Management

```
Conversation IDs follow UUID v4 format.
Subagent conversations share the same model.

Startup:
  1. Ensure session exists (or create new)
  2. Show Home Screen
  
Session Dialog (Ctrl+P /sessions):
  1. List all conversations from SQLite
  2. Select → load messages → switch to Chat Screen
  3. New → create session → show Home Screen

Send Message:
  1. Add user message to DB
  2. Build message history
  3. Stream LLM response
  4. On complete: add assistant message to DB
  5. Render full output
```

---

## Stream Architecture

```
LLM Response Stream
  │
  ▼
streamContentMsg ──> ChatScreen (buffer)
  │
  ▼ (every 40ms)
WordTickMsg
  │
  ├── Extract 1 word from buffer
  ├── Append to viewport content
  ├── Scroll to bottom
  └── Re-render message area
  │
  ▼ (on stream done)
streamDoneMsg
  │
  ├── Flush remaining buffer
  ├── Persist to database
  ├── Reset thinking state
  └── Render full message
```
