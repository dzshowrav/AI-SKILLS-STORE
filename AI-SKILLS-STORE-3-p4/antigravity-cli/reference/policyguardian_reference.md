# PolicyGuardian Reference

---

## Overview

```
cortex/policyguardian/
```

PolicyGuardian is a pre-execution gate that validates every tool operation against defined policies.

---

## Policy Types

```go
type Policy struct {
    Name        string
    Description string
    Severity    PolicySeverity  // "block" or "warn"
    Rules       []PolicyRule
}

type PolicySeverity string
const (
    PolicyBlock PolicySeverity = "block"  // Deny operation
    PolicyWarn  PolicySeverity = "warn"   // Warn but allow
)

type PolicyRule struct {
    ID          string
    Description string
    ApplyTo     []string        // Tool names this applies to
    Conditions  []Condition     // When this rule triggers
    Action      PolicyAction    // What to do when triggered
}

type PolicyAction string
const (
    PolicyActionBlock   PolicyAction = "block"
    PolicyActionWarn    PolicyAction = "warn"
    PolicyActionLog     PolicyAction = "log"
    PolicyActionAsk     PolicyAction = "ask"  // Ask user
)
```

---

## Evaluation Pipeline

```
Tool Called
  → PolicyGuardian evaluates:
    → For each Policy:
      → For each Rule:
        → If tool matches ApplyTo:
          → Evaluate Conditions:
            → ALL must match (AND)
          → If all match: apply Action
    → If any Policy blocks: stop execution
    → If warnings: continue but log
  → Normal permission check
  → Execute
```

---

## Common Policies

- **Dangerous commands**: `rm -rf`, `dd`, `mkfs`, `> /dev/` — block or warn
- **Secret exposure**: Commands with `TOKEN`, `KEY`, `PASSWORD`, `SECRET` — warn
- **Network access**: Restrictions on network commands
- **File system boundaries**: Operations outside workspace
- **Environment modification**: Changes to `.env`, `config`, etc.
- **Auto-execute destinations**: crontab, systemd, .bashrc, .profile, git hooks
