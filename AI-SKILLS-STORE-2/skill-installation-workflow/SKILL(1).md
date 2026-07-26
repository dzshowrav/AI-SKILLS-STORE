---
name: skill-installation-workflow
description: Structured workflow for finding and installing agent skills from GitHub. Try CLI 3x, then manual clone, then create-from-docs. Always prefer pre-built SKILL.md over creating from scratch.
---

# Skill Installation Workflow

## Step 1: Search for pre-built skill
- Search GitHub for `<library-name> SKILL.md`
- Search skills.sh, SkillsMP, eliteai.tools
- Check if skill already exists in `.agents/skills/`

## Step 2: Try CLI install (up to 3 times)
```bash
npx skills add <owner>/<repo> 2>/dev/null
gh skill install <owner>/<repo> <skill-name> 2>/dev/null
```
If all 3 attempts fail, proceed to manual.

## Step 3: Manual clone and extract
```bash
git clone --depth 1 https://github.com/<owner>/<repo>.git /tmp/repo
```
- Copy skill dirs to `/storage/emulated/0/TERM-CODE/.agents/skills/<prefix>-<name>/`
- If no SKILL.md exists → create from library docs

## Step 4: Create SKILL.md from docs (if missing)
- Fetch latest npm/package docs via Context7 or web search
- Use repo source code as reference/examples
- Cover all APIs, options, types
- Write to `.agents/skills/<name>/SKILL.md`

## Step 5: Verify
```bash
ls /storage/emulated/0/TERM-CODE/.agents/skills/<name>/SKILL.md
```

Skills dir: `/storage/emulated/0/TERM-CODE/.agents/skills/`
