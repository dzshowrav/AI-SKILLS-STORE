---
name: craft-php-guidelines
description: "Craft CMS 5 PHP coding standards and conventions for Craft plugin and module development."
---

# Craft CMS 5 PHP Guidelines

Complete PHP coding standards and conventions for Craft CMS 5 plugin and module development.

**Core principles:** PHPDocs on everything — classes, methods, and properties. No `declare(strict_types=1)` in plugin source files.

## Common Pitfalls

- `addSelect()` is the convention in `beforePrepare()`
- Records use same class name as models (namespace distinguishes)
- Queue jobs have no "Job" suffix — `ResaveElements`, not `ResaveElementsJob`
- No `declare(strict_types=1)` in plugin source files
- Use `?string` not `string|null` (short nullable notation)
- `DateTimeHelper` in elements/queries, `Carbon` in services
- Always use explicit getters for Yii2 components, not magic property access
- Declare permission handles as `public const` on owning service

## Documentation

- https://craftcms.com/docs/5.x/extend/coding-guidelines.html
- https://docs.craftcms.com/api/v5/
