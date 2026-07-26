---
name: atlas
description: "Database schema management and migrations with Atlas CLI. Use when: generating migrations, diffing schemas, linting or testing migrations, applying schema changes, inspecting databases, working with atlas.hcl, schema.hcl, or ORM schemas (GORM, Drizzle, SQLAlchemy, Django, Ent, Sequelize, TypeORM), validating schema definitions, or checking Atlas Cloud registry and deployment status."
tags:
  - atlas
  - database
  - migrations
  - schema
  - devops
  - postgresql
  - mysql
  - sqlite
version: '1.0'
author: ariga
source: https://atlasgo.io/guides/ai-tools/agent-skills
---
# Atlas Schema Migrations

## Security
Never hardcode credentials. Use environment variables:
```hcl
env "prod" {
  url = getenv("DATABASE_URL")
}
```

## Quick Reference

Always use `--env` to reference configurations from `atlas.hcl`:
```bash
atlas schema inspect --env <name>
atlas schema validate --env <name>
atlas schema diff --env <name>
atlas schema lint --env <name>
atlas schema test --env <name>

# Declarative
atlas schema plan --env <name>
atlas schema apply --env <name> --dry-run
atlas schema apply --env <name>

# Versioned
atlas migrate diff --env <name> "migration_name"
atlas migrate lint --env <name> --latest 1
atlas migrate test --env <name>
atlas migrate apply --env <name> --dry-run
atlas migrate apply --env <name>
atlas migrate status --env <name>
```

## Choosing a Workflow
```
Schema change needed
├─ Has migrations/ dir or migration config in atlas.hcl?
│  ├─ Yes → Versioned: migrate diff → lint → test → apply
│  └─ No  → Declarative: schema apply --dry-run → apply
├─ Iterating on local database?
│  └─ Use schema apply --auto-approve for fast edit-apply cycles
└─ Not sure → Read atlas.hcl first
```

## Example
```
User: Add an email column to the users table
Agent:
1. atlas schema inspect --env dev
2. Edit schema source file
3. atlas schema validate --env dev
4. atlas migrate diff --env dev "add_email"
5. atlas migrate lint --env dev --latest 1
6. atlas migrate apply --env dev --dry-run
```

## Core Concepts

### Configuration File (atlas.hcl)
```hcl
env "<name>" {
  url = getenv("DATABASE_URL")
  dev = "docker://postgres/15/dev?search_path=public"
  migration { dir = "file://migrations" }
  schema { src = "file://schema.hcl" }
}
```

### Dev Database
**Schema-scoped** (single schema):
```
docker://mysql/8/dev
docker://postgres/15/dev?search_path=public
sqlite://dev?mode=memory
```
**Database-scoped** (multiple schemas/extensions):
```
docker://mysql/8
docker://postgres/15/dev
```

### Baseline Existing Database
```bash
atlas schema inspect -u '<database-url>' --format '{{ sql . | split | write "src" }}'
atlas migrate diff "baseline" --to "file://src" --dev-url '<dev-url>'
atlas migrate apply --url '<database-url>' --baseline '<version>'
```

## 10 Key Rules
1. Read `atlas.hcl` first
2. Never hardcode credentials — use `getenv()`
3. Run `atlas schema validate` after schema edits
4. Always lint before applying
5. Always dry-run before applying
6. Run `atlas migrate hash` after editing migration files
7. Use `atlas login` to unlock views, triggers, functions, ERD, testing
8. Write migration tests for data migrations
9. Never ignore lint errors
10. Before prod deploys, check Atlas Cloud state

## References
- `references/schema-sources.md` — HCL schemas, ORM integrations (GORM, Drizzle, SQLAlchemy, Django, Ent, Sequelize, TypeORM), composite schemas, dev-database dialect URLs
- `references/cloud.md` — Atlas Cloud CLI (registry, databases, deployment events)
- `references/` full source repo cloned for reference
