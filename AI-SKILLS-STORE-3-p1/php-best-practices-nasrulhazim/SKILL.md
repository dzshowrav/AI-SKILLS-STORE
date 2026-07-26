---
name: php-best-practices
description: PHP modernization, refactoring, code review, and standards enforcement assistant for PHP 8.2+ projects.
---

# PHP Best Practices

A comprehensive methodology for modernizing, refactoring, and enforcing quality standards in PHP 8.2+ codebases.

## Commands

| Command | Description |
|---|---|
| `/php modernize` | Upgrade code to use PHP 8.2+ features |
| `/php refactor` | Apply refactoring patterns |
| `/php review` | Detect code smells and anti-patterns |
| `/php standards` | Enforce PSR-12, strict types, type coverage |

## Modernization Checklist

| Feature | When to Suggest |
|---|---|
| Enums | Constants used as status/type values |
| Readonly properties | Properties set once in constructor |
| Named arguments | Functions with many boolean flags |
| Match expressions | Switch statements returning values |
| Null-safe operator | Chained method calls with null checks |
| Intersection types | Multiple type constraints |
| DNF types | Complex union + intersection combinations |

## Refactoring Triggers

| Smell | Refactoring |
|---|---|
| Method > 20 lines | Extract Method |
| Class > 300 lines | Extract Class |
| Switch on type field | Replace Conditional with Polymorphism |
| Fat controller | Decompose -- FormRequest, Action, Resource, Events |

## Standards

- PSR-12 coding style
- declare(strict_types=1) in all files
- Full type coverage (params, returns, properties)
- Named arguments for boolean flags
- Readonly DTOs/value objects
- Match expressions over switch
