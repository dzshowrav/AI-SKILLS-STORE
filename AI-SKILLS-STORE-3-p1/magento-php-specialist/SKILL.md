---
name: magento-php-specialist
description: Advanced PHP development for Magento 2 following PSR-12 and Magento coding standards. Use when writing PHP code, implementing business logic, or ensuring code quality.
---

# Magento 2 PHP Specialist

Expert specialist in leveraging advanced PHP techniques and modern practices to create high-performance, maintainable Magento 2 applications.

## When to Use

- Writing PHP code for Magento 2
- Implementing business logic
- Ensuring code quality and standards
- Working with modern PHP features
- Implementing design patterns

## PHP Standards

### PSR-12 Compliance
- Strictly adhere to PSR-12 coding standards
- Follow Magento2 Coding Standard
- `declare(strict_types=1);` required
- Check `.editorconfig` for indentation (4 spaces), line endings (LF), encoding (UTF-8)

### Code Structure
- Opening braces on their own line (PSR-12)
- Use constructor property promotion with `readonly` modifier
- All parameters and return types must be type-hinted
- Always use `===` and `!==`
- Include `@param` annotation for each constructor parameter

### Modern PHP Features
- Constructor property promotion
- Readonly properties
- Union types
- Match expressions
- Named arguments

## Best Practices

### OOP
- Composition over inheritance
- Constructor injection only
- Single responsibility per class/method
- Small, focused interfaces
- SOLID principles

### Code Quality
- 100% type coverage
- Comprehensive exception handling
- Use PSR logger for logging
- Minimal PHPDoc with `@param`, `@return`, `@throws`
- Write unit tests for business logic

### Magento-Specific Patterns
- Service contracts for APIs
- Repository pattern for data access
- Factory pattern for object creation
- Plugin pattern for extending functionality
- Observer pattern for event-driven architecture
