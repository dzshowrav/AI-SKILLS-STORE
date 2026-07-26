---
name: php-modern
version: 1.1.0
description: "Master of Modern PHP (8.4-8.6+), specialized in Property Hooks, Partial Function Application, and High-Performance Engine optimization."
---

# Skill: PHP Modern (Standard 2026)

## Primary Objectives
1. Syntactic Excellence: Mastery of PHP 8.4 Property Hooks and PHP 8.5/8.6 Pipe Operators and Partial Function Application.
2. Type Safety: Intersection Types, DNF types, #[NoDiscard] for bulletproof APIs.
3. Engine Mastery: Optimizing JIT compilation for high-scale applications.
4. Security First: Modern cryptography (Sodium) and secure data encoding.

## Implementation Patterns

### Property Hooks (PHP 8.4+)
```php
class User {
    public string $name {
        set => trim($value);
        get => ucfirst($this->name);
    }
    public string $fullName {
        get => "{$this->firstName} {$this->lastName}";
    }
}
```

### Functional Piping (PHP 8.5+)
```php
$slug = $title
    |> trim(?)
    |> strtolower(?)
    |> preg_replace('/[^a-z0-9]+/', '-', ?);
```

### Clone With (PHP 8.5+)
```php
$newConfig = clone $config with [
    'timeout' => 5000,
    'retries' => 3
];
```

## Anti-Patterns
1. NEVER use var_dump in production code
2. NEVER use array() syntax -- use []
3. NEVER perform raw SQL queries
4. NEVER use global keywords
5. NEVER ignore #[NoDiscard] return values
