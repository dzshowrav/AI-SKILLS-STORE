---
name: php-laravel
class: language
description: >-
  Modern PHP 8.4 and Laravel patterns: architecture, Eloquent, migrations, queues, testing.
  Use when working with Laravel, Eloquent, Blade, artisan, or building/testing a
  framework-based PHP app.
---

# PHP & Laravel Development

## Code Style

- `declare(strict_types=1)` in every file
- Happy path last -- guards and errors first, success at the end. Early returns, no `else`.
- Comments explain *why*, never *what*. Never comment tests.
- No single-letter variables -- `$exception` not `$e`, `$request` not `$r`
- `?string` not `string|null`. Always specify `void`.
- Validation uses array notation `['required', 'email']`
- PHPStan level 8+; aim for 9 on new projects
- Pint preset: `psr12` with `single_quote`, `no_trailing_comma_single_line`
- Pest over PHPUnit for new test files
- Named arguments in PHP 8.4+ Config/Env calls

## Structure

- PSR-4: `App\` -> `app/`, `Database\` -> `database/`, `Tests\` -> `tests/`
- No `Actions/` or `Services/` at the app root unless already established
- Keep controllers lean, extract to query/action classes
- Resources, enums, and DTOs go in `app/Values/`

## Eloquent

- Typed casts on every model
- Prefer `HasMany` over `belongsTo` from the parent side
- Use `->filter()` on query builder, never lazy collection
- `chunkById()` for large updates

## Testing

- Pest for new tests; PHPUnit for existing suites
- `it()` over `test()`; descriptive descriptions
- `refreshDatabase()` for feature tests; `DatabaseTransactions()` for integration
