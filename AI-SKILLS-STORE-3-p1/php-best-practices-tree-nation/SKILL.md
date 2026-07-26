---
name: php-best-practices
description: Use this skill when creating, reviewing, refactoring, or migrating PHP backend components following TreeNation's Domain-Driven Design architecture.
---

# PHP Best Practices

Use this skill as a rulebook for building and migrating PHP backend components following TreeNation's DDD architecture.

## Workflow

1. Open AGENTS.md
2. Identify which components need to be created or changed
3. Load only the relevant rule files from rules/
4. Implement the smallest correct change
5. Run PHP CS Fixer and PHPStan before finishing

## Guardrails

- New PHP files go inside src/ except controllers (stay in app/Http/Controllers/)
- Controllers must not contain business logic; delegate to a service
- Services must be unit-tested; mock all dependencies
- Always register new repository interfaces in TreeNationProvider.php
- Use strict typing (declare(strict_types=1)) in all new files
- Do not add comments unless explicitly asked
- Follow the Criteria pattern for all repository queries
- Access model data via getter methods, not direct property access
