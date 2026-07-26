---
name: php-guide
description: PHP language guardrails, patterns, and best practices for AI-assisted development. Covers type declarations, Composer conventions, PSR standards, and testing guidelines.
license: MIT
metadata:
  version: "1.0"
  category: language
---

# PHP Guide

Applies to: PHP 8.1+, Web Applications, APIs, CLIs, Microservices

## Core Principles

1. Strict Types Always: `declare(strict_types=1)` in every file
2. Type Declarations Everywhere: all params, return types, properties typed
3. PSR Standards: PSR-12, PSR-4 autoloading, PSR-7 HTTP messages
4. Composition Over Inheritance: interfaces, traits, DI over deep hierarchies
5. Modern PHP First: enums, readonly, fibers, named arguments, match

## Code Style

```php
declare(strict_types=1);

namespace App\Domain\User;

final class UserService
{
    public function __construct(
        private readonly UserRepositoryInterface $repository,
        private readonly EventDispatcherInterface $dispatcher,
    ) {}

    public function register(string $name, string $email): User
    {
        $emailVO = Email::fromString($email);
        if ($this->repository->existsByEmail($emailVO)) {
            throw ValidationException::duplicateEmail($email);
        }
        $user = User::create(name: $name, email: $emailVO);
        $this->repository->save($user);
        $this->dispatcher->dispatch(new UserRegistered($user->id));
        return $user;
    }
}
```

## Type Declarations

- All parameters MUST have type declarations
- All methods MUST declare return types
- Use union types (`string|int`) over `mixed`
- Use `Type|null` for nullable parameters
- Use `never` for functions that always throw/exit

## Error Handling

- Never use `@` error suppression
- Convert PHP errors to exceptions at bootstrap
- Specific exception types, never generic `\Exception`
- Chain exceptions with `previous` parameter

## Security

- All SQL via prepared statements (PDO/Doctrine)
- All output escaped: `htmlspecialchars()` for HTML
- Never use `eval()`, `exec()`, `` with user input
- `password_hash()` with PASSWORD_ARGON2ID
