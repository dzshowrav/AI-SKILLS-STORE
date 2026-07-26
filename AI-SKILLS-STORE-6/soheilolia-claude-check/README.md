# claude-check

Independent checks-and-balances review prompt for Codex, Claude, Cursor, and other
agent work. Use it when you need to verify whether a PR, receipt, or shipped claim
is real, pushed, merged, tested, CI-enforced, and ticket-close ready.

## Install

### All local agents

```bash
curl -sL https://raw.githubusercontent.com/SoheilOlia/skills/main/install.sh | bash -s claude-check
```

This installs the skill into:

- `~/.agents/skills/claude-check`
- `~/.codex/skills/claude-check`
- `~/.claude/skills/claude-check`
- `~/.cursor/skills/claude-check`

It also installs command shims when available:

- Claude Code: `~/.claude/commands/claude-check.md`
- Cursor: `~/.cursor/commands/claude-check.md`

### Claude Code command only

```bash
curl -sL https://raw.githubusercontent.com/SoheilOlia/skills/main/claude-check/claude-code/claude-check.md \
  -o ~/.claude/commands/claude-check.md
```

Then use `/claude-check` in Claude Code.

### Cursor command only

```bash
mkdir -p ~/.cursor/commands
curl -sL https://raw.githubusercontent.com/SoheilOlia/skills/main/claude-check/cursor/claude-check.md \
  -o ~/.cursor/commands/claude-check.md
```

Restart or reload Cursor if the command does not appear immediately.

## Usage

Ask for a Claude-check prompt when reviewing agent work:

```text
Use claude-check on PR #9. Receipt:
consent_orders/docs/receipts/TRUAUTO-216-agent5-pcm-buddy-reconcile-receipt.md.
Concern: is it real, shipped, merged, and ticket-close ready?
```

The skill produces a copy-paste prompt for Claude that verifies:

- worktree and git truth
- PR diff and PR-body honesty
- receipt evidence and non-claims
- targeted, full-suite, negative-test, and deterministic-fixture truth
- CI enforcement and current CI status
- canonical wiring versus helper-file presence
- secret/safety and prohibited automation claims
- Linear/ticket reconciliation
- what is done, not true, not merged, or follow-up

## Source

Created from the Agent 5 / PCM Buddy reconciliation workflow in
`SoheilOlia/trust_automation`.
