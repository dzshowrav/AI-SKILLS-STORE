---
name: "php-modernization"
description: "Use when modernizing PHP code: PHP 8.1-8.5 features, PSR/PHP-FIG/PER-CS compliance, PHPStan/Rector/PHP-CS-Fixer/PHPat tooling, DTOs/enums/readonly/property hooks, type safety."
---

# PHP Modernization

## Agent contract

1. **Discover**: `uv run ${CLAUDE_SKILL_DIR}/scripts/introspect.py` (cheap), or `verify_php_project.py --summary` (full).
2. **Drill**: `... --check PM-XX` per finding.
3. **Apply**: `uv run ${CLAUDE_SKILL_DIR}/scripts/modernize_loop.py --mode dry-run`. Review transcript before applying.
4. **References**: load on demand; do not pre-load.

## Reference routing

| Need | Read |
|---|---|
| PHP 8.0-8.3 baseline | `references/php8-features.md` |
| PHP 8.4 | `references/php-8.4.md` |
| PHP 8.5 | `references/php-8.5.md` |
| PSR / PER-CS | `references/psr-per-cs.md` |
| PHPStan / Rector | `references/static-analysis.md` |
| Enums / DTOs | `references/enums-dtos.md` |
| Type system | `references/type-system.md` |
| Property hooks | `references/property-hooks.md` |

## Rule categories (PM-XX)

| Code | Rule | Since | Check |
|---|---|---|---|
| PM-01 | `declare(strict_types=1)` | 8.0 | Static |
| PM-02 | Match expression over switch | 8.0 | Rector |
| PM-03 | Named arguments in config | 8.0 | Manual |
| PM-04 | Constructor property promotion | 8.0 | Rector |
| PM-05 | Union types in signatures | 8.1 | Rector |
| PM-06 | `readonly` on DTO properties | 8.1 | PHPStan |
| PM-07 | `never` return type | 8.1 | PHPStan |
| PM-08 | Enums over class constants | 8.1 | Rector |
| PM-09 | `readonly` classes | 8.2 | Rector |
| PM-10 | `true`/`false`/`null` standalones | 8.2 | PHPStan |
| PM-11 | `json_validate` | 8.3 | Rector |
| PM-12 | `Override` attribute | 8.3 | PHPStan |
| PM-13 | Property hooks | 8.4 | PHPStan |
| PM-14 | Asymmetric visibility | 8.4 | PHPStan |
| PM-15 | Lazy objects | 8.5 | Manual |
