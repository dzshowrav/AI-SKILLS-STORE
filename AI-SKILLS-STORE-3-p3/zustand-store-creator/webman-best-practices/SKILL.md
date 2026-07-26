---
name: webman-best-practices
description: Must be used for Webman framework projects. Covers DDD architecture with controller/service/domain/infrastructure layers, strict dependency rules, lowercase directory naming, PER Coding Style with declare(strict_types=1) and final classes.
license: MIT
metadata:
  author: webman-design
  version: "1.0.0"
---

# Webman Best Practices

Webman framework best practices following DDD architecture, dependency rules, and PER Coding Style.

## Architecture & Dependencies

- Controller directly depends on Model, skipping Service layer
- Domain layer depends on framework classes (Request, DB, etc.)
- Service layer has circular dependencies with another Service
- Infrastructure layer not implementing Contract interface
- Using Model directly in Service instead of Repository

## Naming Conventions

- Directories: lowercase
- Interfaces: Interface suffix
- Services: VerbNounService pattern
- Repository implementations: descriptive prefix

## Code Style (PER Coding Style)

- `declare(strict_types=1)` at file start
- `final class` by default
- `readonly` for immutable properties
- Complete type declarations for parameters and return types
- Constructor property promotion

## Domain Patterns

- Entity with unique identity
- Immutable value objects
- Business logic in Domain (not Service)
- Domain events for side effects
- Rich domain model (not anemic)
