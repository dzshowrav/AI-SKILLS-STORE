# close-session

Close Session is Soheil's reusable closeout checklist for repo sessions, agent rooms, worktrees, and project lanes.

Use it when a session should finish with no dangling local work, duplicate room state, unpushed commits, unbacked stashes, stale receipts, or overclaimed status.

## Install

```bash
curl -sL https://raw.githubusercontent.com/SoheilOlia/skills/main/install.sh | bash -s close-session
```

## Skill name

Invoke as:

```text
$close-session
```

Natural trigger:

```text
Close session
```

## Local files

- `SKILL.md`: canonical skill instructions
- `agents/openai.yaml`: OpenAI/Codex metadata
- `claude-code/close-session.md`: Claude Code command shim
- `cursor/close-session.md`: Cursor command shim
