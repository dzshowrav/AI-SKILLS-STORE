# Settings System Reference

---

## Overview

```
cortex/settings/
  settings.go          — Settings struct and logic
  settings_store.go    — Persistence layer
```

---

## Settings Model

```go
type Settings struct {
    // Model Settings
    DefaultModel        string
    Temperature         float64
    MaxTokens           int32

    // UI Settings
    Theme               string
    FontSize            int32
    ShowLineNumbers     bool
    WordWrap            bool

    // Behavior Settings
    AutoApproveTools    []string
    DefaultMode         AgentMode
    SandboxEnabled      bool
    BattleModeEnabled   bool

    // Notification Settings
    Notifications       bool
    NotificationSound   string

    // Privacy Settings
    TelemetryEnabled    bool
    CrashReporting      bool

    // Cache Settings
    CacheEnabled        bool
    CacheTTL            time.Duration

    // Custom
    CustomSettings      map[string]interface{}
}
```

---

## Key Functions

```go
func ApplySettingsToConfig(s Settings, cfg *Config)
// Merges user settings into the running config

func MergeGrants(base, override []Grant) []Grant
// Merges permission grants from settings with existing
```

---

## Settings Persistence

Settings are stored in the `settings` SQLite table:

```sql
CREATE TABLE settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Settings Commands

From the CLI:
- `/settings` — Open settings panel
- Setting changes persist across sessions
- Settings can be exported/imported via JSON
