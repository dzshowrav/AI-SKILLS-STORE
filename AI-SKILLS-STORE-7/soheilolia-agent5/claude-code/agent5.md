# Agent 5 — Cash App Trust & Safety Copy Generator

## What This Skill Does

Generates and validates copy for Cash App Trust & Safety enforcement screens. Applies
48 guardrail rules in mandatory order: structural → vocabulary/banned terms → tone →
regulatory inclusions → escalation check → self-check → elegance check.

Output includes FormBlocker JSON + Echo deeplink for Cash App simulator preview.

## When To Use

Trigger when the user provides:
- A template ID (e.g. `BLK-CRIT-ENFORCEMENT-004`) and needs compliant copy
- A PRD or product spec for an enforcement scenario
- Draft copy that needs guardrail validation
- A component spec JSON from Figma Agent (Agent 3)

Do NOT use for: general UX writing, marketing copy, or non-enforcement screens.

## Three Modes

### Mode 1 — Validate existing PM copy

```bash
python3 agent5_copy_generator.py \
  --pm-copy BLK-CRIT-ENFORCEMENT-004 \
  --title "Your account has been deactivated" \
  --body "We've reviewed your account and found it violated our Terms of Service." \
  --cta-primary "Submit an appeal" \
  --cta-secondary "Contact Support"
```

### Mode 2 — Generate from PRD context

```bash
# With known template ID:
python3 agent5_copy_generator.py \
  --generate-from-prd \
  --template-id BLK-CRIT-ENFORCEMENT-004 \
  --prd-context "User account deactivated after appeal denied" \
  --adversity-type DEACTIVATED_ACCOUNT_STATE \
  --severity CRITICAL

# Auto-classify from raw PRD text:
python3 agent5_copy_generator.py \
  --prd-text "$(cat product_spec.md)" \
  --generate-from-prd
```

### Mode 3 — Component spec from Figma Agent

```bash
python3 agent5_copy_generator.py component_spec.json
```

Add `--sanitize-output` to any mode to strip internal paths before sharing outside
the engineering team.

## 48 Guardrail Rules (summary)

### Banned terms (13)

| Banned | Use instead |
|--------|-------------|
| fraud | unauthorized activity |
| banned | deactivated |
| behavior | activity |
| restricted | suspended (**deprecated OLD language**) |
| AUP | our policies (**internal abbreviation only**) |
| Risk / Compliance / Partner | Support / our team |
| FinCEN / CFPB / BSA | federal authorities / regulations / law |

### Account state vocabulary

| State | When |
|-------|------|
| Suspended | Temporary — remediation possible |
| Deactivated | Permanent, appeal still open |
| Deactivated and set to close | Appeal exhausted and denied |
| Closed | Terminal |

Never use `restricted` (deprecated). Never mention "set to close" until appeal is denied.

### Escalation flags (never generate copy for these)

```
[INSERT: dollar amount — source: product spec]
[INSERT: date — source: compliance or product spec]
[INSERT: Reg E language — source: compliance team]
[INSERT: state disclosure — source: compliance team, state: [STATE]]
[ESCALATE: no safe harbor — compliance must define copy]
```

### Character limits

```
title: 60  |  body: 200  |  cta_primary: 40  |  cta_secondary: 40
```

### Enforcement reason writing principles (from Figma)

1. **Be direct, clear, and specific** — no jargon, lead with main point, specific enough that the customer understands why
2. **Be professional but plain-spoken** — everyday language, respectful
3. **Be firm but fair** — don't apologize for enforcing rules

```
✅ "The personal info you recently shared doesn't match what you've shared in the past."
✅ "It looks like your account may have been used as part of a scam."
⛔ "We suspended your account due to suspected fraudulent activity." (too generic)
⛔ "Your account was flagged by our system." (no real reason)
```

## Output

```json
{
  "template_id": "BLK-CRIT-ENFORCEMENT-004",
  "status": "READY",
  "copy": {
    "title": "Your account has been deactivated",
    "body": "...",
    "cta_primary": "Submit an appeal",
    "cta_secondary": "Contact Support"
  },
  "violations": [],
  "formblocker_json": { ... },
  "echo_deeplink": "cashme://formblocker?payload=..."
}
```

## Hard Stops

The agent never generates copy for dollar amounts, dates, Reg E language, state MTL
disclosures, or novel regulatory triggers. It inserts placeholder flags instead and
stops the pipeline for human review.
