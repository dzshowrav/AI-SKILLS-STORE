---
name: php-fundamentals
version: "2.0.0"
description: Modern PHP programming skill - master PHP 8.x syntax, OOP, type system, and Composer
category: language-core
---

# PHP Fundamentals Skill

Comprehensive skill for mastering modern PHP programming fundamentals, from basic syntax to advanced PHP 8.4 features.

## Learning Modules

### Module 1: PHP Syntax
- Variables, data types, operators, expressions
- Control structures (if, switch, match), loops (for, foreach, while)
- Functions, closures, error handling

### Module 2: OOP
- Classes, objects, properties, methods
- Inheritance, polymorphism, interfaces, abstract classes
- Traits, SOLID principles, design patterns

### Module 3: PHP 8.x Modern Features
- PHP 8.0: Named arguments, constructor property promotion, match, attributes, union types
- PHP 8.1: Enums, readonly properties, fibers, intersection types
- PHP 8.2: Readonly classes, DNF types
- PHP 8.3: Typed class constants, json_validate(), #[Override]
- PHP 8.4: Property hooks, asymmetric visibility

## Code Examples

### Constructor Property Promotion
```php
final readonly class User
{
    public function __construct(
        public int $id,
        public string $email,
        public string $name,
    ) {}
}
```

### Property Hooks (PHP 8.4+)
```php
class Temperature
{
    public float $celsius {
        get => $this->celsius;
        set => $value >= -273.15 ? $value : throw new \InvalidArgumentException();
    }

    public float $fahrenheit {
        get => $this->celsius * 9/5 + 32;
        set => $this->celsius = ($value - 32) * 5/9;
    }
}
```
