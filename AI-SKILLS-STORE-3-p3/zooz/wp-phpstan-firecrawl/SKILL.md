---
name: wp-phpstan
description: "Use when configuring, running, or fixing PHPStan static analysis in WordPress projects (plugins/themes/sites): phpstan.neon setup, baselines, WordPress-specific typing, and handling third-party plugin classes."
compatibility: "Targets WordPress 6.9+ (PHP 7.2.24+). Requires Composer-based PHPStan."
---

# WP PHPStan

## When to use

Use this skill when working on PHPStan in a WordPress codebase, for example:

- setting up or updating `phpstan.neon` / `phpstan.neon.dist`
- generating or updating `phpstan-baseline.neon`
- fixing PHPStan errors via WordPress-friendly PHPDoc
- handling third-party plugin/theme classes safely

## Procedure

### 0) Discover PHPStan entrypoints
Inspect PHPStan setup (config, baseline, scripts).

### 1) Ensure WordPress core stubs are loaded
`szepeviktor/phpstan-wordpress` or `php-stubs/wordpress-stubs` are required.

### 2) Ensure a sane phpstan.neon
Keep paths focused on first-party code, exclude vendor/node_modules.

### 3) Fix errors with WordPress-specific typing
- REST endpoints: type request parameters using `WP_REST_Request<...>`
- Hook callbacks: add accurate @param types
- Database results: use array shapes or object shapes

### 4) Handle third-party classes
Prefer plugin-specific stubs. Add targeted ignoreErrors patterns if needed.

### 5) Baseline management
Generate a baseline for legacy code, reduce it over time. Don't baseline new errors.
