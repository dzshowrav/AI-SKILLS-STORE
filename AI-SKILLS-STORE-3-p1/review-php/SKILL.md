---
name: review-php
description: Review PHP code for language and runtime conventions: strict types, error handling, resource management, PSR standards, namespaces, null safety, generators, and testability.
tags: [code-review, language]
version: 1.0.0
license: MIT
---

# Skill: Review PHP

## Purpose

Review PHP code for language and runtime conventions. Focus on strict types, error handling, resource management, PSR standards, namespaces, null safety, generators, PHP version compatibility, and testability.

## Review Checklist

1. **Strict Types**: `declare(strict_types=1)`, typed properties/parameters, return types
2. **Error Handling**: Exception hierarchy, try-catch-finally, no empty catch
3. **Resource Management**: fopen/fclose, DB connections, try-finally pattern
4. **PSR Standards**: PSR-4 autoloading, PSR-12 coding style
5. **Namespaces**: Correct use statements, composer autoload alignment
6. **Null Safety**: Null coalescing (`??`), nullsafe operator (`?->`), no `@` suppression
7. **Generators & Iterables**: Correct `yield` usage, memory-efficient iteration
8. **PHP Version Compatibility**: Features match composer.json constraint
9. **Testability**: DI, avoid static/singleton, constructor injection

## Scope

**Does**: PHP language and runtime conventions only.
**Does not**: Security analysis, architecture analysis, SQL analysis, scope selection.

## Output Format

Zero or more findings with location (file:line), category (`language-php`), severity, title, description, and optional suggestion.
