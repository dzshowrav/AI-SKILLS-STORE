---
name: laravel-project-patterns
description: 'Project conventions for Laravel projects, including application code, routes, config, Eloquent models, migrations, tests, and more.'
---

# Laravel Project Patterns

Use this skill before editing Laravel project backend application code, routes, config, localization, bootstrap entrypoints, seeders, tooling PHP, Blade shells, React Email templates, or choosing tests.

This skill is derived from the live repository. When repository evidence disagrees with a generic Laravel habit, the repository wins.

## First Pass

1. Read the nearest `AGENTS.md` and application guidelines.
2. Search version-specific docs before code changes.
3. Inspect the exact file being changed and sibling files before generating anything.
4. If adding or changing a controller feature test, load the matching references first.
5. For nested controller tests, compare against deepest sibling controller tests.

## Non-Negotiables

- Preserve concurrent changes. Re-read a file immediately before patching it.
- Keep new code aligned to existing architecture.
- Use `php artisan make:* --no-interaction` when practical.
- Do not add database foreign key constraints when the repository uses schema-planning tools.
- Do not add migration `down()` methods when existing migrations omit them.
- Do not add `$fillable` or `$guarded` when the app globally calls `Model::unguard()`.
- Every behavioral change needs a focused programmatic test.
