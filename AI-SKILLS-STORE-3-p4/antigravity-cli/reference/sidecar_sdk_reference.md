# Sidecar SDK Reference

---

## Overview

```
cortex/sidecars/
  sidecar_executor.go     — Sidecar process execution
  sidecar_manager.go      — Lifecycle management
  sidecar_sdk.go          — SDK helper functions
  resolver.go             — Template resolution
```

---

## SidecarManager

```go
type SidecarManager struct {
    sidecars map[string]*ManagedSidecar
}

func NewSidecarManager(configs []SidecarConfig) *SidecarManager
```

### Methods
```go
func (m *SidecarManager) StartAll() error
func (m *SidecarManager) StopAll() error
func (m *SidecarManager) Restart(name string) error
func (m *SidecarManager) GetStatus(name string) SidecarStatus
func (m *SidecarManager) List() []ManagedSidecar
```

---

## SDK Functions

```go
func generateToken() (string, error)
// Generates an auth token for sidecar→agent API communication

func getUnusedPort() (int, error)
// Finds an available TCP port for sidecar HTTP server

func ResolveTemplates(config *SidecarConfig) (*SidecarConfig, error)
// Resolves ${VAR} and ${ENV} template variables in config

func discoverNodePath() (string, error)
// Locates the Node.js binary

func buildCommand(config *SidecarConfig) (*exec.Cmd, error)
// Builds the exec.Cmd from SidecarConfig

func fileExists(path string) bool
func sysProcAttr() *syscall.SysProcAttr
```

---

## Sidecar Lifecycle

```
Manager created with configs
  → StartAll()
    → For each sidecar:
      → ResolveTemplates(config)
      → buildCommand(config)
      → Generate auth token
      → Find unused port
      → Set ANTIGRAVITY_SIDECAR_WEB_PORT env
      → Start process
      → Track PID and status
  → Monitor (crash detection)
    → On crash: check restart_policy
      → "always" → restart immediately
      → "on_failure" → restart if non-zero exit
      → "never" → mark as stopped
  → StopAll()
    → Send SIGTERM to each sidecar
    → Wait for graceful shutdown
    → Force kill after timeout
```

---

## Environment Variables

```
ANTIGRAVITY_EXECUTABLE_DATA_DIR=<path>    — Sidecar data directory
ANTIGRAVITY_SIDECAR_WEB_PORT=<port>        — Agent API port
ANTIGRAVITY_CONVERSATION_ID=<uuid>         — Current conversation
AGY_BROWSER_ACTIVE_PORT_FILE=<path>        — Browser port file
JETSKI_BROWSER_USER_DATA_DIR=<path>        — Browser data dir
```
