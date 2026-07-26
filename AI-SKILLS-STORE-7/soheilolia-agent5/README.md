# agent5

Cash App Trust & Safety copy generator. Produces guardrail-compliant screen copy for
enforcement, suspension, deactivation, identity verification, and compliance screens.
Applies 48 machine-readable guardrail rules derived from the Cash App style guide and
Figma Enforcement Platform.

## Install

### Amp

```bash
curl -sL https://raw.githubusercontent.com/SoheilOlia/skills/main/install.sh | bash -s agent5
```

### Claude Code

```bash
curl -sL https://raw.githubusercontent.com/SoheilOlia/skills/main/agent5/claude-code/agent5.md \
  -o ~/.claude/skills/agent5.md
```

## Quick start

```bash
# Validate existing copy
python3 agent5_copy_generator.py \
  --pm-copy BLK-CRIT-ENFORCEMENT-004 \
  --title "Your account has been deactivated" \
  --body "We've reviewed your account and found it violated our Terms of Service." \
  --cta-primary "Submit an appeal"

# Generate from PRD
python3 agent5_copy_generator.py \
  --generate-from-prd \
  --template-id BLK-CRIT-ENFORCEMENT-004 \
  --prd-context "Account deactivated after terms violation" \
  --adversity-type DEACTIVATED_ACCOUNT_STATE \
  --severity CRITICAL

# Auto-classify from raw PRD text
python3 agent5_copy_generator.py \
  --prd-text "$(cat your_product_spec.md)" \
  --generate-from-prd
```

## Source

[SoheilOlia/Automating_Consent_Orders](https://github.com/SoheilOlia/Automating_Consent_Orders) — `agent5_copy_generator.py`
