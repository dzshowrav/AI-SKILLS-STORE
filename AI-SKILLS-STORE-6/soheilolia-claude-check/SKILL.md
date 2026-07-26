---
name: claude-check
description: >-
  Verify, audit, and review whether Codex work is real, shipped, merge-ready,
  or ticket-close ready. Use for PR, receipt, git, test, CI, and Linear checks.
---

# Claude Check

Use this skill to produce a copy-paste prompt for Claude as an independent checks-and-balances reviewer. The purpose is verification and strategy, not implementation.

## 1. Operating Mode

Default Claude to read-only:

- verify actual repo, PR, diff, tests, receipts, generated artifacts, and ticket state
- for doc-only, comment-only, or trivial PRs, run only Check B plus the PR-body honesty check; skip the heavier checks unless the diff touches workflow, gates, receipts, tests, generated artifacts, or code paths
- do not trust Codex summaries, ticket comments, or receipt claims without source evidence
- do not edit, commit, push, or comment unless Soheil explicitly says `Apples`
- `Apples` means Soheil has explicitly approved taking action; treat it as "yes, proceed and modify code"
- if a critical fix is found, explain the proposed fix first

## 2. Required Inputs

Ask for or infer these fields:

- primary working directory
- actual worktree path, if different
- PR URL or number
- branch and commit range
- base branch, usually `origin/main`
- receipts or files to inspect
- claimed test commands and results
- Codex self-review output, if any
- corresponding Linear ticket, if known
- user concern, such as "is it real?", "is it shipped?", "is this merge-ready?", or "what next?"

If some fields are missing, still produce a prompt with placeholders.

## 3. Truth States

Define these inside the Claude prompt so the verdict is not ambiguous:

- `DONE`: merged to `main` and, if applicable, deployed or externally live
- `REAL BUT LOCAL`: code exists and tests pass locally, but it is not on `main`
- `SHIPPED TO PR`: pushed to remote and visible in a PR, but not merged
- `NOT SHIPPED`: claimed as shipped, but not pushed, merged, deployed, or otherwise externally live
- `NOT TRUE`: receipt or summary claim is not backed by code, tests, artifacts, or external state
- `NOT MERGED`: shipped to a PR or branch, but not merged to the target branch
- `BLOCKER`: must fix before merge or ticket close
- `FOLLOW-UP`: ticket-worthy, but does not block the current PR

## 4. Prompt Template

```text
You are reviewing Codex/agent work as an independent checks-and-balances reviewer for Soheil.

Primary working directory:
- <primary_working_dir>

Actual worktree path, if different:
- <worktree_path_or_none>

Branch/commit/PR:
- Branch: <branch_if_known>
- Commits: <commit_or_range_if_known>
- PR: <pr_url_or_number_if_known>
- Base: <base_branch>

Receipts/files to inspect:
- <receipt_or_file_1>
- <receipt_or_file_2>
- <add_more_as_needed>

Claimed verification:
- <claimed_command_and_result>

Codex self-review, if any:
- <codex_self_review_or_none>

Ticket:
- <linear_ticket_or_placeholder>

Primary concern:
- <what Soheil wants verified>

Your job is read-only unless Soheil explicitly says Apples. Apples means Soheil's explicit approval keyword; treat it as "yes, proceed and modify code." Do not edit files. Do not commit. Do not push. Do not create comments. Do not trust summaries. Check actual git state, PR diff, code, tests, receipts, generated artifacts, CI state, and ticket state. If you find a critical issue, explain the proposed fix first instead of changing anything.

Truth-state definitions:
- DONE = merged to main and, if applicable, deployed or externally live.
- REAL BUT LOCAL = code exists and tests pass locally, but it is not on main.
- SHIPPED TO PR = pushed to remote and visible in a PR, but not merged.
- NOT SHIPPED = claimed as shipped, but not pushed, merged, deployed, or otherwise externally live.
- NOT TRUE = receipt or summary claim is not backed by code, tests, artifacts, or external state.
- NOT MERGED = shipped to a PR or branch, but not merged to the target branch.
- BLOCKER = must fix before merge or ticket close.
- FOLLOW-UP = ticket-worthy, but does not block the current PR.

Do this first:
1. Run `git worktree list` and verify which tree you are reading before quoting line numbers.
2. If PR is unspecified, run `gh pr list --head $(git branch --show-current)` before substituting placeholders.
3. Run `gh pr view <N> --json mergeable,statusCheckRollup,reviews,commits,additions,deletions,changedFiles,isDraft,state,baseRefName,headRefName,headRefOid,mergeCommit,mergedAt,url`.
4. Run `gh pr diff <N> --name-only` to learn PR shape.
5. Read any Codex self-review output, then read each named receipt fully before trusting any status claim.
6. Resolve the worktree path before quoting line numbers.
7. Verify line refs by reading code; +/-5 lines is acceptable, wrong file or stale section is not.
8. Run claimed targeted tests, then the broadest practical suite.
9. Cross-reference the receipt's Side Effects section against `gh pr diff <N> --name-only`.

Command palette:
- `git status --short --branch`
- `git remote -v`
- `git worktree list`
- `git branch --show-current`
- `git log --oneline <base>..HEAD`
- `git log -1 --format=%H -- <file>`
- `git show --stat <commit_or_head>`
- `git show --name-status <commit_or_head>`
- `git diff <base>...HEAD`
- `gh pr view <N> --json mergeable,statusCheckRollup,reviews,commits,additions,deletions,changedFiles,isDraft,state,baseRefName,headRefName,headRefOid,mergeCommit,mergedAt,url`
- `gh pr diff <N> --name-only`
- `gh pr diff <N> --patch`
- `gt ls` or `gt log` when Graphite is available and the PR is stacked
- `rg -n "<symbol_or_claim>" <dir>`
- `md5sum <fixture>; <test_command>; md5sum <fixture>` when deterministic fixture claims exist

Specific checks:

Check A - Worktree and git truth
- Confirm the intended repo remote and whether this is the intended repo.
- Confirm primary working dir versus actual worktree path.
- Confirm branch, commit range, PR, base branch, draft state, pushed/not-pushed state, merge state, and mergeability.
- If `baseRefName` is not `main` or `master`, treat this as a stacked PR. Judge currency against the stack base, not `origin/main`; use `gt ls`, `gt log`, or `gh pr view <baseRefName>` to inspect the stack.
- Confirm whether the branch is current with the correct base.
- Confirm no unrelated or prohibited files landed, including generated handoffs, deliverables, renders, diagnostics, `.codex`, `.agentops`, secrets, bot output, or local-only files unless explicitly intended.
- Do not quote a line number until you have confirmed which worktree/file produced it.
- For each important quoted file, run `git log -1 --format=%H -- <file>` and confirm the last-touch commit is `HEAD` or within the PR commit range, not a stale local edit outside the review.

Check B - Diff truth
- Classify what actually changed by area.
- Identify over-broad files, unrelated migration history, generated artifacts, stale changes, or files that contradict the receipt.
- Compare `gh pr diff <N> --name-only` with the receipt's claimed file list and Side Effects section.
- Compare the PR body's Summary and Not Claimed sections against the actual diff; PR descriptions are claims, not context.

Check C - Receipt truth
- Confirm the receipt has, or explicitly lacks:
  - Evidence Classification, such as fixture-level proof versus system wiring versus broad corpus readiness
  - explicit non-claims, such as `platform_completion_claimed=false`
  - Side Effects, including generated or regenerated files
  - exact commands run and results
  - blockers, residual risks, and next recommended action
- Confirm receipt claims match code, tests, line references, PR state, CI state, and artifacts.
- Call out stale receipts, missing formal receipts, incorrect line references, missing git diff evidence, ticket-close gaps, and claims that are only narrative.
- If the receipt says "removed from commit" or "not landed", verify that file is absent from `gh pr diff <N> --name-only`.
- If the receipt names side-effect files, those files should not land in the PR unless they are explicitly deterministic fixtures.

Check D - Test and negative-test truth
- Rerun the claimed targeted tests if practical.
- Run the broadest practical suite, or explain exactly why not.
- Separate focused-suite truth from full-suite truth.
- Identify failures introduced by the branch versus pre-existing failures. If a suite fails, compare against the base in a separate worktree when practical: `git worktree add /tmp/<review-base> <base>`, run the same suite there, and diff the failure sets. Pre-existing failures stay nonblocking; net-new failures are findings.
- For every new gate, validator, or blocker, confirm tests prove it fails on the bad inputs it claims to reject. Absence of negative tests means the gate's value is unverified.
- If deterministic fixture artifacts are claimed, run `md5sum`, rerun the generating test, and run `md5sum` again. Drift is a finding.

Check E - CI and enforcement truth
- Confirm whether the new gate or validator runs in CI on every PR.
- If `statusCheckRollup` contains failing checks, do not approve regardless of code quality; verdict should be request changes pending CI green.
- If the gate only runs manually or on demand, mark that as FOLLOW-UP and explain how it changes confidence.
- Inspect `statusCheckRollup`, workflow config, or project docs as needed.

Check F - Wiring truth
- Confirm features are wired on the canonical path, not just present as helper files.
- Cite actual call sites and line numbers.
- Confirm whether named examples are tests, fixtures, golden fixtures, or broad platform readiness.
- For honesty-enforcement claims, confirm the code path rejects the dishonest case, not only that it accepts the honest case. Examples: `NOT_COMPILED`, `generator_run=false`, `broad_corpus_readiness=false`, fixture-only claims.

Check G - Secret and safety truth
- Search for real tokens, API keys, credentials, and local-only paths that should not ship.
- Confirm kill switches, approval gates, and prohibited automations are honestly represented.
- Confirm AI output does not replace required human PCM, Legal, Compliance, or review approval.

Check H - Linear and external truth
- Confirm whether the corresponding TRUAUTO/Linear ticket has been updated with the PR outcome.
- If Linear is inaccessible, say so and provide the exact comment that should be posted.
- Do not call a ticket close-ready unless repo truth, receipt truth, test truth, and ticket truth all agree.

Check I - Strategy
- Answer:
  - Is this real locally?
  - Is it shipped to PR?
  - Is it merged?
  - Is it deployed or externally live, if applicable?
  - Is it PR-ready?
  - Is it merge-ready?
  - What blocks ticket close?
  - What should happen next?
- If `state=MERGED`, "merge-ready" and approve/request-changes are moot. Switch the verdict lens to: did it land correctly, are follow-ups ticketed, did CI/test/receipt truth survive post-merge, and is the receipt accurate after merge?

Anti-patterns to flag:
- receipt says a generated file was removed, but it appears in the PR diff
- wiring exists only in a helper file and is not called from the canonical entry point
- honesty markers exist in code or receipts, but no test proves they fire
- generated artifacts landed without explicit deterministic-fixture intent
- line references drift by more than about 10 lines or point to the wrong file
- "will fix in follow-up" appears without a linked ticket or owner
- CI is not enforcing a newly added gate that the receipt describes as blocking

Expected output:
- Verdict: approve / approve with caveats / request changes / block.
- Findings ordered by severity, with file and line references. Keep verdict plus findings to one screen when possible; expand only for a proposed fix or evidence that cannot be captured by a file:line citation.
- Truth table using DONE, REAL BUT LOCAL, SHIPPED TO PR, NOT SHIPPED, NOT TRUE, NOT MERGED, BLOCKER, FOLLOW-UP.
- What is now true if this lands.
- What is still not true.
- Recommended next 3 actions.
- Draft Linear or PR comment summarizing the verified state.
- If findings warrant a durable artifact, recommend `consent_orders/docs/receipts/<TICKET>-claude-check-receipt.md`; do not write it without Apples.
```

## 5. Output Style

Return only:

1. A one-sentence setup note.
2. The copy-paste Claude prompt.
3. A short note naming any placeholders the user should fill in.

Keep the prompt strict, specific, and evidence-driven. Avoid generic advisory language unless it maps to a concrete check.

## 6. Tiny Example

Input: `PR #8`, receipt `consent_orders/docs/receipts/TRUAUTO-216-...md`, concern `merge-ready?`

Output: a pasted Claude prompt. Claude runs the review and returns verdict, findings, truth table, next actions, and a Linear or PR comment draft.
