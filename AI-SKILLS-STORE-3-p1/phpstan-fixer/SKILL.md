---
name: phpstan-fixer
description: |
  Fix PHPStan static analysis errors by adding type annotations and PHPDocs.
  Use when encountering PHPStan errors, type mismatches, missing type hints,
  or static analysis failures. Never ignores errors without user approval.
license: MIT
compatibility: Requires PHPStan installed in project
metadata:
  version: "1.0.0"
---

# PHPStan Error Fixer
Fix PHPStan static analysis errors through proper type annotations, PHPDocs, and
code improvements.

## Core Principles

1. **Never suppress errors as first resort** -- fix root cause with proper types
2. **Respect user configuration** -- never modify `phpstan.neon` settings
3. **No silent ignoring** -- never add `ignoreErrors` without explicit approval
4. **Context-aware fixes** -- understand the project type

## Error Resolution Strategy

### 1. Unknown/Missing Type Hints

```php
// Instead of:
public function getConfig($key)
{
    return $this->config[$key] ?? null;
}

// Use:
public function getConfig(string $key): mixed
{
    return $this->config[$key] ?? null;
}
```

### 2. Generic Type Missing

```php
// Instead of:
private array $items;

// Use:
/** @var array<string, Item> */
private array $items;
```

### 3. Never-Happening Conditions

```php
// Instead of suppressing:
if ($result === false) { /** @phpstan-ignore */ }

// Use proper type narrowing:
if ($result === false) {
    throw new \RuntimeException('Operation failed');
}
```

## Project Configuration Awareness

- Read `phpstan.neon` / `phpstan.neon.dist` before making changes
- Respect the project's configured level (--level)
- Follow existing patterns in nearby files
- Check for baseline files before generating new errors

## Escalation

- If fixing requires changing phpstan.neon, ask for user approval
- If a third-party package lacks types, suggest stubs or baseline
- If the error is in generated code (`vendor/`, `storage/framework/`), add to excludePaths
