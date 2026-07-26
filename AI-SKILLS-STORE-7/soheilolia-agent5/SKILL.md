---
name: agent5
description: >
  Cash App Trust & Safety copy generator. Produces guardrail-compliant screen
  copy for enforcement, suspension, deactivation, identity verification, compliance,
  and dispute notification screens. Applies 48 guardrail rules in mandated order:
  structural → vocabulary/banned terms → tone → regulatory inclusions → escalation
  check → self-check → elegance check. Use when a user provides a template ID,
  component spec JSON, or PRD text and needs enforcement screen copy that is safe
  to ship. Operates in three modes: PM copy validation (--pm-copy), LLM generation
  from PRD context (--generate-from-prd), and standalone component spec ingestion.
  Outputs FormBlocker JSON + Echo deeplink for Cash App simulator preview. Do NOT
  use for general UX writing, marketing copy, or non-enforcement screens.
metadata:
  author: Soheil Oliaei
  version: 1.1.0
  category: trust-safety
  source_repo: SoheilOlia/Automating_Consent_Orders
---

# Agent 5 — Cash App Trust & Safety Copy Generator

## What This Skill Does

Generates and validates copy for Cash App Trust & Safety enforcement screens. The
agent applies 48 machine-readable guardrail rules derived from the Cash App style
guide, enforcement terminology glossary, Figma Enforcement Platform (read directly
via MCP), and regulatory requirements (FinCEN/BSA/KYC, CFPB/Reg E, state MTL).

This is a guardrail-first, not creative-first, copy generation system. The output
is designed to be safe to ship: no banned terms, no regulatory violations, no
internal team names or agency abbreviations exposed to customers.

## When To Use This Skill

Use when:
- A PM or engineer provides a template ID and needs compliant screen copy
- You receive a PRD or product spec describing an enforcement scenario
- You need to validate existing draft copy against Trust & Safety guardrails
- You need a FormBlocker JSON payload and Echo deeplink for simulator preview

Do NOT use for:
- General UX writing or marketing copy
- Non-enforcement screens (onboarding, payments, investing)
- Situations where a compliance review has not yet been completed for novel regulatory triggers

## Template System

Agent 5 generates copy for 37 template IDs organized across 5 action types and
4 severity levels:

| Prefix | Action type       | Example                        |
|--------|-------------------|--------------------------------|
| BLK    | Block / suspend   | BLK-CRIT-ENFORCEMENT-004       |
| REQ    | Request (verify)  | REQ-HIGH-IDENTITY-001          |
| RES    | Restore access    | RES-MED-IDENTITY-002           |
| INF    | Inform / notice   | INF-MED-COMPLIANCE-003         |
| REV    | Review pending    | REV-HIGH-TRANSACTION-001       |

Severity levels: CRITICAL, HIGH, MEDIUM, LOW

## Three Operating Modes

### Mode 1 — PM Copy Validation (--pm-copy)

Validates draft copy already written by a PM or writer. Checks all 48 guardrail
rules and returns a pass/fail report with specific violations.

```bash
python3 agent5_copy_generator.py \
  --pm-copy BLK-CRIT-ENFORCEMENT-004 \
  --title "Your account has been deactivated" \
  --body "We've reviewed your account and determined it violated our Terms of Service." \
  --cta-primary "Submit an appeal" \
  --cta-secondary "Contact Support"
```

### Mode 2 — LLM Generation from PRD (--generate-from-prd)

Generates copy from scratch using Claude, applying all 48 guardrail rules to the
output. Pass PRD context and adversity variants; the agent writes the copy.

```bash
python3 agent5_copy_generator.py \
  --generate-from-prd \
  --template-id BLK-CRIT-ENFORCEMENT-004 \
  --prd-context "User's account was deactivated due to policy violations after appeal" \
  --adversity-type DEACTIVATED_ACCOUNT_STATE \
  --severity CRITICAL
```

Or pass raw PRD text and let the agent classify the template automatically:

```bash
python3 agent5_copy_generator.py \
  --prd-text "$(cat product_spec.md)" \
  --generate-from-prd
```

### Mode 3 — Component Spec (positional argument)

Accepts a component spec JSON from Agent 3 (Figma Component Puller) with text
slots pre-populated from Figma. Merges Figma-provided slots with static defaults.

```bash
python3 agent5_copy_generator.py component_spec.json
```

## The 48 Guardrail Rules

Rules are applied in this mandatory order. Violations at earlier stages block later
stages.

### 1. Structural rules (8 rules, by severity)

| Severity | Rule |
|----------|------|
| CRITICAL | Outcome in first sentence, no preamble |
| CRITICAL | No dismiss option (no X, skip, not now) |
| CRITICAL | No hedging language (may/might/could/possibly) |
| HIGH     | Lead with risk/consequence, not solution |
| HIGH     | Urgent framing (conveys action needed) |
| MEDIUM   | Explain why before asking to act |
| LOW      | No urgency language |
| LOW      | Passive, informational tone |

### 2. Vocabulary / banned terms (13 terms)

| Banned | Use instead | Source |
|--------|-------------|--------|
| fraud | unauthorized activity | Style guide |
| banned | deactivated | Style guide |
| behavior | activity | Style guide |
| Risk | Support | Team name — internal only |
| Compliance | our team | Team name — internal only |
| Partner | Support | Team name — internal only |
| FinCEN | federal authorities | Regulatory name — internal |
| CFPB | federal regulations | Regulatory name — internal |
| BSA | federal law | Regulatory name — internal |
| restricted | suspended | **Deprecated** — Figma research-backed |
| AUP | our policies | **Internal abbreviation only** |
| Cash Card | Cash App Card | Product name update |
| blacklist | denylist | Inclusive language |

`restricted` and `AUP` were identified as violations directly from the Figma
Enforcement Platform (read via MCP 2026-04-08). `restricted` is explicitly marked
as OLD language; `suspended` matches customer mental models.

### 3. Tone rules (7 rules, by domain)

| Domain | Tone |
|--------|------|
| IDENTITY | Reassuring, procedural — never imply wrongdoing |
| ACCESS | Protective — Cash App is defending the user |
| TRANSACTION | Cautionary, non-accusatory — user as victim |
| ENFORCEMENT | Direct, factual, no hedging, no apology |
| COMPLIANCE | Formal, neutral — regulatory requirements as fact |
| DISPUTES | Empathetic, process-oriented — acknowledge before explaining |
| ALL ENFORCEMENT | Be specific — no generic "flagged by system" reasons |

### 4. Required inclusions (5 rules)

- IDENTITY screens: "Federal law requires us to verify the identity of our customers."
- CTR screens: "Transactions at or above $10,000 are reported to federal authorities..."
- BSA/AML block screens: "This action is unavailable at this time."
- Permanent deactivation: must include appeal availability statement
- Reg E screens: must NOT generate copy — insert `[INSERT: Reg E language]` flag

### 5. Escalation flags (5 triggers)

Copy is never generated for: dollar amounts, specific dates, Reg E language,
state MTL disclosures, novel regulatory triggers with no safe harbor. Flags are
inserted instead:

```
[INSERT: dollar amount — source: product spec]
[INSERT: date — source: compliance or product spec]
[INSERT: Reg E language — source: compliance team]
[INSERT: state disclosure — source: compliance team, state: [STATE]]
[ESCALATE: no safe harbor — compliance must define copy]
```

### 6. Character limits

```
title:         60 characters
body:          200 characters
cta_primary:   40 characters
cta_secondary: 40 characters
```

### 7. Self-check + elegance check

After guardrail application, the agent runs a self-check (rescans for violations)
and an elegance check (would a staff content designer approve this? if bureaucratic,
hedged, or unclear — rewrite it).

## Account State Vocabulary

The agent enforces Cash App's research-backed account status terminology:

| State | When to use | Color signal |
|-------|-------------|--------------|
| Active | Account fully functional | Green |
| Suspended | Temporary permission loss — remediation possible | Orange |
| Deactivated | Permanent, appeal still possible | Red |
| Deactivated and set to close | Appeal exhausted and denied — no return | Red |
| Closed | Terminal — can't log in, $Cashtag disabled, $0 | Dark |

**Never use `suspended` for permanent actions. Never use `deactivated` for temporary
actions. Never use `restricted` (deprecated). Never mention "set to close" until the
appeal is exhausted and denied.**

## Enforcement Reason Writing Principles

These principles are from the Cash App Enforcement Platform Figma file (Suspension
Reasons page), read via MCP. Apply them when generating or validating enforcement
reason copy:

1. **Be direct, clear, and specific** — State what happened without jargon. Lead with
   the main point. Avoid vague or abstract language. Specificity is critical for trust.

2. **Be professional but plain-spoken** — Write like explaining to a friend. Use
   everyday language. Maintain a respectful tone.

3. **Be firm but fair** — Don't obscure the issue unless necessary. Show understanding
   while being clear. Do NOT apologize for enforcing rules.

Writing checklist:
- Clarity: Could a high school student understand this? Are technical terms explained?
  Is the reason specific enough?
- Tone: Is it respectful? Does it avoid accusatory language? Is it firm without
  threatening?

Examples:
```
✅ "The personal info you recently shared doesn't match what you've shared in the past."
✅ "It looks like your account may have been used as part of a scam."
✅ "We detected activity that's unusual for you."

⛔ "We suspended your account due to suspected fraudulent activity." (too generic)
⛔ "Your account was flagged by our system." (no real reason given)
```

## Output Format

Agent 5 returns a handoff JSON with:

```json
{
  "template_id": "BLK-CRIT-ENFORCEMENT-004",
  "mode": "pm_review | llm_generated | component_spec",
  "severity": "CRITICAL",
  "status": "READY | NEEDS_REVIEW | ESCALATED",
  "copy": {
    "title": "Your account has been deactivated",
    "body": "We've reviewed your account and found it violated our Terms of Service. You can still withdraw your balance.",
    "cta_primary": "Submit an appeal",
    "cta_secondary": "Contact Support"
  },
  "violations": [],
  "guardrails_applied": ["BT-001", "TR-004", "SR-001", "RI-004"],
  "formblocker_json": { ... },
  "echo_deeplink": "cashme://formblocker?payload=..."
}
```

Use `--sanitize-output` to strip internal paths (kotlin_builder, string_resource_file)
before sharing outside the engineering team.

## Hard Stops

The agent will never generate copy for:
- Permanent deactivation without both PM and Compliance approval stamps
- Dollar amounts, dates, Reg E language, state MTL disclosures
- Novel regulatory triggers with no established safe harbor
- Any screen flagged as `[ESCALATE: ...]`

## Special Templates

**BLK-CRIT-ENFORCEMENT-004** (Account Deactivated Permanent) always triggers an
extra compliance gate before Milestone 2, regardless of confidence score.

## Figma Knowledge Source

48 guardrail rules as of 2026-04-08. Rules BT-012, BT-013, TR-007, ST-003 were
read directly from the Figma Enforcement Platform via MCP:
- Enforcement Terminology — Descriptions (node 3094:34881)
- Enforcement Terminology — Then & Now (node 3094:34989)
- Suspension Reasons (node 3094:34794)
- Other Key Terminology (node 3094:34944)

## Error Handling

**Missing ANTHROPIC_API_KEY** — agent prints a clear error and exits before any
LLM call. Set `export ANTHROPIC_API_KEY=sk-ant-...` first.

**Unknown adversity type** — agent emits a `UserWarning` and skips tone adjustment
rather than crashing. Add the type to `ADVERSITY_TONE` to fix.

**No template match** — agent falls back to `TEMPLATE_COPY` static defaults and
logs the fallback in `guardrails_applied`.

**Figma slots empty** — Figma-provided text slots override static defaults when
non-empty. Empty slots fall back to static defaults silently (logged in output).
