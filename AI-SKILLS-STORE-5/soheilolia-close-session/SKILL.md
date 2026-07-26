---
name: close-session
description: Close an active coding session, agent room, worktree, or project lane cleanly. Use when the user says "close session", "close room", "wrap up", "clean up this session", "make sure nothing is left behind", "safe to close", or asks to finish with all git work, receipts, knowledge files, Linear/PR updates, stashes, untracked work, and room/session state reconciled.
---

# Close Session

Use this skill to turn a session from "probably done" into a verified closeout state. The goal is not only a clean `git status`; the goal is no unbacked work, no stale receipts, no duplicate or contradictory room state, and no overclaimed final status.

## Operating Rules

- Act without asking when the user asked to close the session, unless an action is destructive, high-blast-radius, or explicitly forbidden by repo instructions.
- Never force-push, rebase, reset, delete branches/files, drop stashes, run `git clean`, skip hooks, merge PRs, or mutate production/staging systems without explicit approval.
- Respect `no commit`, `no push`, `read-only`, `review-only`, `dry-run`, and repo-local instructions as hard constraints.
- Preserve unrelated dirty work. Stage explicit files only.
- Do not call a session safe because one command is clean. Run the verification loop after every write, commit, push, or external update.

## 1. Identify Scope

Run these first:

```bash
pwd
git rev-parse --show-toplevel
git remote -v
git worktree list --porcelain
git branch --show-current
git fetch --all --prune
git status --short --branch
```

State the repo path, worktree path, branch, upstream, local `HEAD`, and remote/base truth before making claims.

If this is an AgentOps, Claude, Codex, Goose, or room-based workspace, inspect any present room state:

```bash
find .agentops .claude .codex .cursor -maxdepth 3 -type f 2>/dev/null | sort
```

Prioritize `ROOM_STATE.md`, `SESSION_STATE*`, `.agentops/inbox/`, `.agentops/outbox/`, `.agentops/config.json`, `.claude/skills`, `.codex/skills`, and `.cursor/commands`. A clean git tree is not enough if these files still describe old or contradictory state.

## 2. Audit Work

Run:

```bash
git status --short --branch
git stash list
git branch -vv
git log --oneline --decorate --graph --all --max-count=40
git ls-files --others --exclude-standard
git diff --name-only
git diff --cached --name-only
```

If an upstream exists, run:

```bash
git log --oneline @{u}..HEAD
git log --oneline HEAD..@{u}
```

If no upstream exists, identify unique commits with `git branch -vv`, `git log --all --decorate`, and remote branch containment checks.

Classify every finding:

- `committed_and_pushed`
- `committed_unpushed`
- `dirty_tracked_work`
- `staged_work`
- `untracked_work_product`
- `stash`
- `local_only_branch`
- `ephemeral_local_noise`
- `external_update_needed`
- `room_state_stale`

Do not commit local pointer directories, caches, virtualenvs, `node_modules`, logs, or worktree containers such as `.agentops-worktrees/` and `.codex-worktrees/` unless the session explicitly produced them as intended artifacts.

## 3. Audit Receipts And Knowledge

Before writing markdown or receipts, read committed truth first:

```bash
git show HEAD:<path>
git diff -- <path>
git status --short -- <path>
```

Check likely durable files:

- `lessons.md`
- `BUILDERBOT.md`
- `AGENTS.md`
- `CLAUDE.md`, `GEMINI.md`, or repo agent instructions
- `.claude/skills/`, `.codex/skills/`, `.cursor/commands/`
- project status files such as `PIPELINE_STATUS`, `ROOM_STATE`, `SESSION_STATE`, `SESSION_RECEIPT`
- receipts under `docs/receipts/`, `consent_orders/docs/receipts/`, or the project receipt directory
- handoff, inbox, outbox, PR, and Linear note files

Do not duplicate entries. Only append new facts or correct stale claims. If `HEAD` is newer than the session's remembered state, do not overwrite it; report the delta.

For material session work, ensure a closeout receipt exists or is updated with:

- repo path, worktree path, branch, `HEAD`, upstream, and remote SHA
- files changed and commits created
- branches pushed or backup branches created
- commands run and results
- receipts, knowledge files, and room-state files updated
- Linear/PR comments posted or drafted
- stashes, local-only branches, and untracked files resolved or carried forward
- explicit non-claims and unresolved risks
- final confidence basis

If writing a receipt creates a change, commit and push or back it up, then rerun the verification loop.

## 4. External State

Search the session context and repo for referenced tickets, PRs, and handoffs. If tools are available, verify current state before posting. If tools are unavailable, draft the exact comment and classify it as `external_update_needed`, not posted.

Do not claim Linear, PR, CI, or deployment closure unless it was actually verified or updated.

## 5. Safe Actions

For dirty work product:

```bash
git add <explicit-file-list>
git diff --cached --check
git commit -m "<clear closeout or WIP message>"
```

For unpushed commits:

- Push normally only when the current branch has a safe upstream and is not behind it.
- If a normal push is rejected, the branch is behind, the branch is protected, or upstream is ambiguous, push an insurance branch instead:

```bash
git push origin HEAD:refs/heads/session-closeout/<repo-or-room>-<branch>-<yyyymmdd>-<shortsha>
```

For stashes:

- Never drop a stash during closeout.
- If it is work product, convert it to a branch or commit and push/back it up.
- If it is ephemeral or unresolved, report the exact stash ref as a blocker.

For local-only branches:

- If they contain unique work, push the branch or push an insurance branch.
- If they are ephemeral, explain why they were skipped.

## 6. Verification Loop

After every commit, push, receipt write, room-state write, markdown update, Linear update, or PR update, rerun:

```bash
git fetch --all --prune
git status --short --branch
git diff --quiet
git diff --cached --quiet
git stash list
```

Then verify each relevant branch:

```bash
git log --oneline @{u}..HEAD  # when upstream exists
git ls-remote origin refs/heads/<branch>
git rev-parse HEAD
```

Also verify:

- receipts and knowledge files are committed and pushed or explicitly backed up
- room/session files no longer contradict live git state
- no duplicate open room/session claims remain for the same ticket, branch, or task
- no untracked work product remains
- no stash contains unbacked work
- pushed remote SHAs match local intended SHAs

Repeat until no new findings remain.

## Final Verdict

Only say `SAFE TO CLOSE - CONFIDENCE: 100%` when all are true:

- no dirty tracked changes remain
- no staged changes remain
- no untracked work product remains
- no stash contains unbacked work
- no local-only branch contains unpushed unique commits
- every intended branch or backup branch is verified on remote by SHA
- required receipts and knowledge files are committed and pushed or explicitly backed up
- room/session state agrees with git state
- Linear/PR/external updates are posted or explicitly classified as blockers

If any item is unresolved, say `NOT SAFE TO CLOSE` and list exact blockers plus next commands.

Final response format:

- repo/worktree/branch/HEAD
- actions taken
- commits created
- branches pushed with remote SHAs
- receipts or knowledge files updated
- Linear/PR updates posted or drafted
- skipped ephemeral files and why
- unresolved blockers
- final verdict
