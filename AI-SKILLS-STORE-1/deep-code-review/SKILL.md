---
name: deep-code-review
description: Matthew Hagrelius's deep code review process — a staff-level review emphasizing maintainability, reliability in distributed flows, observability, side-effect isolation, foreseeable failure scenarios, understandability, and test quality. Calibrates severity to project maturity (sprint-2 vs pre-GA vs mature prod) so the review doesn't over-call. Tags each finding with a disposition (Blocker / Nice-to-fix / Follow-up ticket / Discussion) and uses matching framing language so PR authors know what's a gate vs a future-ticket ask. Can publish selected findings as inline comments on Azure DevOps PRs via the REST API. Trigger this skill whenever Matthew asks for a "deep code review", "deep review", "thorough review", "review this the way I do it", "my code review", "Matthew-style review", or any review where he wants more than a quick security/perf pass — including requests like "look at this PR end-to-end", "what will break in prod", "poke holes in this change", "check the failure modes", "audit observability on this", "is this well tested", "what's the drift risk here", "post these to the PR", or "add these as ADO comments". Prefer this skill over a generic code review whenever Matthew is the one asking, unless he explicitly asks for a quick or security-only review.
---

# Deep Code Review (Matthew's process)

This skill captures the review lens Matthew applies to pull requests, diffs, and repo slices. It is deliberately more thorough than a generic code review: it prioritizes issues that create real product, operational, or technical-debt impact over style nits, and it evaluates code against seven specific lenses rather than a keyword checklist.

Use it when Matthew asks for a deep review, a thorough review, or signals he wants more than a quick pass (e.g. "what will break in prod", "check the failure modes", "audit observability", "is this well tested"). If he just wants a quick security or performance check, defer to the built-in `engineering:code-review` instead.

## Step 1 — Gather the review context

Before running the review, fill in the six context fields the prompt needs. If any are missing from the user's message, ask for them using a single `AskUserQuestion` call with up to four questions. Do not invent values — an unclear review target leads to unreliable findings.

The six fields:

1. **Review target** — the diff, list of files, PR link, or repo slice to review.
2. **Scope limits** — any parts of the target Matthew wants skipped.
3. **Base branch / comparison point** — what to diff against (e.g. `main`, the prior release tag, a specific commit).
4. **Known exclusions or already-known findings** — things already covered elsewhere that don't need to be re-surfaced.
5. **Runtime evidence available** — whether there are tests, logs, traces, metrics, or reproduction steps to ground claims.
6. **Project maturity** — where is this code in its lifecycle? (e.g. "sprint 2, pre-prod", "production, year 3", "prototype", "stabilization / pre-GA"). This calibrates severity — see Step 2.

If any field is not applicable, fill it with `none` — but prefer explicit `none` over silent omission so the reader of the review knows it was considered.

For connector-backed targets (a PR URL in GitHub/Azure DevOps, a file path in a connected folder, etc.), fetch the actual diff before running the review. Reviewing against inferred code is the fastest way to hallucinate findings.

**Do not skip the maturity question.** Reviewing sprint-2 code with a production-hardening lens produces Critical findings that aren't actually critical — it burns reviewer credibility and makes the PR author defensive. If the user doesn't volunteer maturity, ask. "What sprint / phase is this in?" is enough.

## Step 2 — Calibrate severity to project maturity

The same issue can be Critical in a production system and Low in a sprint-2 prototype. Before drafting findings, decide where this code actually lives and calibrate accordingly:

**Sprint-2 / active early implementation.** Catalog sizes are small, traffic is low, contracts are still in flux, teams are velocity-constrained. Downgrade:
- "Does not scale to N" concerns → Medium / Low. Note the ceiling, don't redesign.
- "No integration tests" → Low. Unit tests for pure logic is often enough.
- Response-shape coupling, cache invalidation edge cases, premature-abstraction pushes → Low / discussion.
- Placeholder pages, stubbed endpoints, "empty details view" → Low if the chrome/layout is correct. Confirm the page lives under the right layout before calling it a regression.

**Pre-GA / stabilization.** Treat reliability, observability, and contract stability at full weight. Tests catch up here.

**Mature / production.** Full weight on all lenses. Reviewer credibility costs are higher — a false-positive "Critical" in a mature system erodes trust fast.

**Regardless of maturity, these stay at full severity:**
- Correctness bugs in the current code (wrong result, wrong state, wrong data on disk).
- Migration-file edits after a migration has been applied anywhere beyond a local machine.
- Security: secrets in repo, SSRF, injection, auth-bypass.
- Shipping debug code (`console.log`, unused count queries, `TODO: remove before merge`) into production paths.
- Terraform / infra changes that would silently deploy broken values to prod.

**If your first draft of the review grades most findings Critical/High, recalibrate.** That's a signal you're reviewing at the wrong maturity level. The useful review at sprint-2 is not "this would fail at 10x scale" — it's "this is actually wrong right now, or is a cheap-to-fix-now / expensive-to-fix-later trap."

If the user later pushes back with "we're still early," don't just concede — honestly re-rank. Acknowledge the over-calls, downgrade the affected items with reasoning, and keep the ones that genuinely stand (correctness bugs, migration edits, debug code). Re-ranking mid-review is not a weakness; sticking to an over-graded list is.

## Step 3 — Run the review

Work through the seven priority lenses below one at a time *before* drafting findings. For each lens, form a hypothesis about what could go wrong in this code, then look for it. Once you've been through all seven, consolidate the highest-value concerns into the finding list.

Render the review using the `<review_goal>`, `<priority_lenses>`, `<review_process>`, and `<output_contract>` blocks exactly as written below, with the `<review_context>` block populated from Step 1. These XML tags are intentional — they keep the structure legible when the review is copied into a PR comment, and they prevent the lens list from drifting into generic commentary.

<review_context>
- Review target: {{DIFF_OR_FILES_OR_REPO_SLICE}}
- Scope limits: {{SCOPE_LIMITS_OR_NONE}}
- Base branch / comparison point: {{BASELINE_OR_NONE}}
- Known exclusions or already-known findings: {{EXCLUSIONS_OR_NONE}}
- Runtime evidence available: {{TESTS_LOGS_METRICS_OR_NONE}}
</review_context>

<review_role>
You are acting as a staff-level reviewer on Matthew's team. Your job is to surface the issues most likely to create real operational, correctness, or maintainability pain — the kinds of things a careful senior engineer would flag on a walkthrough, not a linter. You speak plainly, ground every claim in the code, and are willing to say "I can't verify this from what I was shown."
</review_role>

<review_goal>
Surface the highest-value issues that are likely to create correctness, reliability, observability, maintainability, testability, or scaling problems. Prioritize findings with concrete product, operational, or technical-debt impact.

Skip style nits and cosmetic commentary unless they materially affect correctness, maintainability, operability, or test quality — those distract from the issues that actually matter.

If evidence is incomplete, say so explicitly. A false positive erodes trust in the review far more than an honest "I couldn't verify this" does, so prefer the latter whenever you aren't sure.
</review_goal>

<priority_lenses>
1. Maintainability and logic centralization
- Look for core business rules, calculations, or policy decisions that are duplicated or spread across multiple places.
- Don't force abstraction too early for truly one-off logic — premature abstraction is its own cost.
- But if the same meaningful rule now exists in a second or third place, treat that as a real maintainability concern and evaluate whether it should be centralized.
- Call out drift risk explicitly: if multiple paths implement the same concept separately, explain how they could diverge and what inconsistency or defect that could create.

2. Reliability in distributed or dependency-heavy flows
- Inspect network, database, cache, queue, file, and service-boundary interactions carefully.
- For each, ask what happens if the dependency throws, times out, returns partial data, returns stale data, or succeeds only partially.
- Check whether one failed dependency incorrectly takes down the whole request or workflow.
- Check whether retries, cancellation, idempotency, fallback behavior, and partial-failure handling are intentional and consistent — not accidental.
- Treat swallowed failures, broad exception handlers that lose cause/context, and fire-and-forget async work without failure handling as review concerns. These are the failure modes that become production mysteries later.

3. Observability and production-debuggability
- Treat observability as a first-class review dimension, not a nice-to-have. The question is: if this fails in production at 3am, will the on-call engineer be able to reconstruct what happened?
- Check whether logs, traces, metrics, and error paths preserve enough context to identify the request, operation, dependency, entity, and failure point.
- Check whether correlation IDs, request IDs, trace context, or equivalent identifiers survive across boundaries.
- Look for crash or failure paths where useful telemetry is never emitted, is emitted too late, or is emitted without actionable context.
- Treat inadequate traceability on important flows as a reliability defect — not a polish item.

4. Side effects and isolation of non-critical work
- Pay special attention to cache updates, event publication, analytics, notifications, background refreshes, secondary writes, and similar side effects.
- Check whether non-critical side effects are too tightly coupled to the main success path.
- Flag cases where a cache write, event emission, or secondary update can cause the primary user-facing operation to fail when it should degrade gracefully instead.
- Flag side effects that block latency unnecessarily, or that create ordering / consistency risks if only part of the work succeeds.

5. Foreseeable scenario coverage
- Don't review only the happy path. Evaluate whether the code covers the reasonably foreseeable paths through the system.
- Focus on realistic adverse scenarios:
  - transient network failures and dependency outages
  - timeouts and partial failures across multiple downstream calls
  - invalid, incomplete, stale, or manually entered data
  - empty results, duplicate requests, retries, and out-of-order events
  - cache misses, stale cache state, or cache update failures
  - partial writes across database, queue, and cache boundaries
  - concurrency and race conditions where multiple actors can update the same state
- For each important flow, ask: what are the plausible non-happy-path scenarios? are they handled intentionally, or only implicitly / by accident? does the system fail safely, degrade gracefully, or recover cleanly? does the user or operator get a useful, diagnosable outcome? does the system preserve consistency when only part of the work succeeds?
- Don't invent improbable edge cases to pad the finding count — noise dilutes the review. Stay focused on failure modes that are realistic for this system.

6. Understandability and cleverness tax
- Evaluate whether this code is reasonably understandable to a competent mid-level or junior developer working in this codebase.
- Treat unnecessary cleverness, compressed logic, hidden coupling, non-obvious invariants, over-generic abstractions, and hard-to-follow control flow as maintainability concerns when a simpler formulation would materially improve clarity.
- If the code is correct but unnecessarily difficult to reason about, call that out — the cost of opacity compounds every time someone has to change the code later.
- Don't flag code merely for being unfamiliar or advanced; only flag it when the understandability cost is not justified by a real benefit.

7. Test strategy and test quality
- Evaluate whether the changed or affected logic has appropriate, valuable, and maintainable automated tests.
- Prefer unit tests for business rules, calculations, branching behavior, error handling, and foreseeable edge cases.
- Treat integration tests as justified only when the behavior meaningfully depends on a real boundary or contract that unit tests cannot cover well.
- Be skeptical of excessive integration tests when they are slow, brittle, hard to set up, or duplicative of lower-level coverage — they add maintenance cost without proportional confidence.
- Check for: coverage of valuable logic rather than superficial execution; coverage of non-happy-path and foreseeable scenarios; tests that validate the public contract or externally visible behavior; tests that survive internal refactoring when behavior doesn't change; tests that are easy for the team to understand and maintain.
- Flag as concerns: tests that assert internal implementation details rather than the contract of the system under test; tests tightly coupled to call counts, private helpers, log wording, internal sequencing, or incidental queries without a strong reason; snapshot-heavy or mock-heavy tests that provide little confidence; integration tests used where a focused unit test would cover the same logic more cheaply; important business logic or failure handling with no focused unit-test coverage; tests whose setup is so complex it obscures the behavior being validated.
- Ask: does this code have unit tests for the logic most likely to regress? are the tests checking the contract and outcomes, or are they testing internals? would these tests survive a reasonable refactor that preserves behavior? is an integration test actually necessary here, or is it compensating for testability problems? is the test suite adding durable confidence, or mostly maintenance cost?
</priority_lenses>

<review_process>
- Read enough surrounding code to understand the full end-to-end flow: callers, callees, shared helpers, async work, persistence boundaries, cache behavior, retries, logging, cleanup, and failure handling. A review of a diff in isolation is almost always wrong.
- Prefer findings with real impact: incorrect results, inconsistent behavior across entry points, cascading failures, poor debuggability, scenario gaps, low-value tests, or technical debt likely to compound quickly.
- Distinguish verified findings from lower-confidence concerns. If you haven't seen the runtime behavior, don't claim you have.
- Work through each lens in order, then draft findings — not the other way around. Drafting findings first tends to anchor on the easy/obvious ones and miss the structural concerns the lenses exist to catch.
</review_process>

<output_contract>
Return findings first, ordered by severity (highest first).

For each finding, include:
- **Title** — short, specific, and actionable.
- **Severity** — one of: Critical / High / Medium / Low.
- **Disposition** — one of: Blocker / Nice-to-fix / Follow-up ticket / Discussion. See the disposition table below. Severity says how bad it is; disposition says what should happen about it in *this* PR. They are not the same axis.
- **Why it matters** — the product, operational, or maintainability impact in plain terms.
- **Location** — exact file path and line number(s).
- **Failure mode** — the concrete failure mode, drift risk, observability gap, scenario gap, test-quality problem, or maintainability risk.
- **Recommendation** — a specific, implementable fix. Not "consider refactoring" — say what to do.

After the main findings, include two trailing sections:
- **Lower-confidence concerns** — things worth flagging but not fully verified from the code shown.
- **Residual risk / missing verification** — a brief summary of what wasn't verified, what runtime evidence would have helped, and any blind spots the review couldn't close.

Close the review with a **Net-net** section that lists, by disposition: what would block merge, what's nice-to-fix in this PR, and what should become follow-up tickets. This gives the PR author a clear one-screen triage.

If there are no findings, say so explicitly — and still call out any important testing gaps, runtime blind spots, or residual risks that were not fully verifiable.

### Disposition framing — language templates

The framing language matters. A wall of blocker-tone comments makes every reviewer note feel like a gate, which makes authors defensive and slows merges. Use the table below to match tone to disposition. When authoring an inline PR comment (see Step 4), lead with the disposition phrase verbatim or paraphrased — it sets expectation immediately.

| Disposition | When | Lead phrase | Follow with |
|---|---|---|---|
| **Blocker** | Correctness bug, security issue, migration-file edit, debug code in prod path, Terraform defaults that ship broken, anything that's actually wrong in the current code. | "Please fix before merge (Critical / High)." | Concrete explanation and recommended fix. |
| **Nice-to-fix** | High-value improvement that's cheap to do now, but not wrong. If the author can't get to it this sprint, a ticket is fine. | "Nice to fix, not blocking." | Suggested fix, then: "Happy to take a follow-up ticket if you'd rather — just reply with the issue # so I can track it." |
| **Follow-up ticket** | Real concern, but clearly out of scope for this PR (architectural, scales-poorly, design refactor). | "Not critical, but worth considering / filing a ticket." or "Follow-up, not blocking." | Short explanation of the concern. Then: "Could you file a follow-up ticket and drop the issue # here? Happy to track it." |
| **Discussion** | Low-confidence, alternative opinion, or genuinely "thinking out loud". | "Thinking out loud — not blocking." or "Small thing I'm not sure about." | State the concern as a question, not a demand. No "please fix" language. |

**Tone rules, regardless of disposition:**
- Name the concrete risk or mechanism. "This breaks X because Y." Not "this feels wrong."
- Offer a fix or an escape hatch. Every non-blocker should give the author an explicit way out ("ticket is fine").
- Don't stack rhetorical questions. One crisp explanation beats five hedged ones.
- Avoid "consider", "might want to", "maybe" for blockers — those land as suggestions and get skipped.
- Avoid "you must", "this is wrong", imperative stacking for non-blockers — those land as gates.
- One finding per thread. Don't bundle "also while I'm here" asides into a blocker comment — the author will conflate the two and either fix both or argue both.

Format example for a single finding:

> **Cache write can fail the primary request**
> Severity: High
> Disposition: Blocker
> Why it matters: A transient Redis failure will surface as a 5xx to the user even though the DB write already succeeded — the user sees a failure that didn't actually happen, and any idempotent retry double-writes the DB.
> Location: `services/order/create.py:142-168`
> Failure mode: The `cache.set(...)` call is inside the main try block and its exception propagates out of the request handler. There's no fallback, no logged context, and no metric for cache-write failures, so on-call can't tell this apart from a real create failure.
> Recommendation: Move the cache write to a best-effort block that logs + emits a `cache_write_failed` metric on exception but returns the successful create response. Consider moving the write fully out-of-band (task queue) if cache freshness isn't on the critical path.
</output_contract>

## Step 4 — Optionally publish findings to the PR (Azure DevOps)

If the user asks to post the review (or subset of findings) as PR comments — "add these to the PR", "post this as comments in ADO", etc. — use the REST API via `az rest`. The `az repos pr` CLI does not support creating comment threads, so don't go looking for a flag.

Before posting, confirm the scope: which findings go up, and whether the user wants Matthew-style dispositions in the comment body (default: yes — it's what makes the review useful to the author).

### Gather the four IDs you need

Run `az repos pr show --id <PR#> --org https://dev.azure.com/<Org> --output json` and extract:

- **Organization** — e.g. `CyclotronInc` (from the URL)
- **Project ID** — `repository.project.id` (GUID)
- **Repository ID** — `repository.id` (GUID)
- **Pull request ID** — the PR number
- **Resource ID for az rest** — always `499b84ac-1321-427f-aa17-267ca6975798` (Azure DevOps service principal). Required for `az rest` auth. Does not change per tenant.

### Pin exact line numbers on the *new file side*

ADO threads attach to either the right (new) or left (old) file. Deep reviews always target `rightFileStart` / `rightFileEnd` — the post-change state. To get a reliable line number for a finding:

```bash
git show <pr-head-sha>:<path-in-repo> | grep -n "<needle>"
```

Don't use the diff's hunk line numbers — they're relative to the hunk, not the new file. Always verify against `git show <sha>:<file>`.

### Write the comment body to a JSON file, not inline

`az rest --body '<json>'` requires heavy escaping and corrupts newlines. Always write the body to a temp file and pass `--body @/tmp/pr-comment-N.json`.

Body shape for a new thread with one comment:

```json
{
  "comments": [
    {
      "parentCommentId": 0,
      "commentType": 1,
      "content": "**[disposition phrase].** [explanation]\n\n[suggestion or fix]\n\n[escape hatch if applicable]"
    }
  ],
  "status": 1,
  "threadContext": {
    "filePath": "/path/from/repo/root",
    "rightFileStart": { "line": 42, "offset": 1 },
    "rightFileEnd":   { "line": 47, "offset": 1 }
  }
}
```

Field notes:
- `filePath` **must start with `/`** and is the path from the repo root (no leading repo name). `/deere-agent-catalog/src/lib/x.ts`, not `deere-agent-catalog/src/lib/x.ts`.
- `offset` is 1-based column. For point annotations, `offset: 1` on both start and end is fine. For range annotations, use an end-offset that covers the line.
- `status: 1` = Active (blocks auto-completion if the repo policy says so). `commentType: 1` = Text.
- To highlight a block of related lines, set `rightFileStart.line` to the first line and `rightFileEnd.line` to the last — inclusive.

### POST the thread

```bash
az rest --method POST \
  --uri "https://dev.azure.com/<Org>/<ProjectId>/_apis/git/repositories/<RepoId>/pullRequests/<PR#>/threads?api-version=7.1" \
  --resource 499b84ac-1321-427f-aa17-267ca6975798 \
  --headers "Content-Type=application/json" \
  --body @/tmp/pr-comment-1.json \
  --query "id" -o tsv
```

`--query "id" -o tsv` gives you just the thread ID. That's reliable — much more so than piping through `python3 -c json.load` which silently swallows stderr on failure.

### Post threads sequentially, one Bash call per thread

Do **not** try to be clever with nested bash loops or parallel jobs. Common failure modes I've hit:

- `ls | head -1 | sed` chains can silently produce empty output when a file is missing and the loop just skips the post without error.
- Piping `az rest` output to `python3 -c 'json.load(sys.stdin)'` without `set -o pipefail` swallows auth errors — you get "thread created: None" and no clue why.
- Running multiple POSTs concurrently against the same PR occasionally confuses ADO's thread-ordering.

The reliable pattern is one call per thread with `--query "id" -o tsv`:

```bash
tid=$(az rest --method POST --uri "..." --resource ... --headers "Content-Type=application/json" --body @/tmp/pr-comment-1.json --query "id" -o tsv)
echo "Thread ${tid} — <title of finding>"
```

Repeat per finding. If the output is empty, run the command without `--query` to see the raw error.

### Verify what actually landed

After posting, always confirm by listing threads:

```bash
az rest --method GET \
  --uri "https://dev.azure.com/<Org>/<ProjectId>/_apis/git/repositories/<RepoId>/pullRequests/<PR#>/threads?api-version=7.1" \
  --resource 499b84ac-1321-427f-aa17-267ca6975798 \
  --query "value[].{id:id, file:threadContext.filePath, line:threadContext.rightFileStart.line, preview:comments[0].content}" -o table
```

Trust-but-verify: "thread 42 created" without a list-check has bit me when earlier posts failed silently.

### Update an existing thread instead of creating a new one

For replies or status changes (Active → Closed, "Won't fix", etc.), post to `/threads/<threadId>/comments` or PATCH the thread `status`. Rarely needed during an initial review; common for follow-ups.

### Comment-body style matches the disposition

When composing each thread's `content`, use the framing language from the disposition table above. A quick mental model:

- Blocker body: one paragraph explaining the mechanism, one paragraph with the fix, no hedging.
- Nice-to-fix body: one paragraph + suggested fix + explicit "happy to take a ticket if you'd rather — drop the issue # here".
- Follow-up body: short context + "could you file a follow-up ticket and drop the issue # here? Happy to track it."
- Discussion body: phrased as a question, no fix imperative.

Keep each comment to a single finding. Don't bundle "also while I'm here" asides — they get conflated with the main point and make the thread hard to resolve.

### Don't post until the user asks

This step is opt-in. The default output of the skill is a written review (Step 3). Publishing to ADO happens only when the user explicitly requests it, and then only for the findings they specify. Never post every finding automatically — some are "file a ticket later" by design.
