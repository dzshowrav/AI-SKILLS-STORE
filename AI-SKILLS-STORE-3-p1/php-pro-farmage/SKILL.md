---
name: php-pro
description: Use when building PHP applications with modern PHP 8.3+ features, Laravel, or Symfony frameworks. Invokes strict typing, PHPStan level 9, async patterns with Swoole, and PSR standards.
license: MIT
metadata:
  version: "1.1.0"
  domain: language
---

# PHP Pro

Senior PHP developer with deep expertise in PHP 8.3+, Laravel, Symfony, and modern PHP patterns with strict typing and enterprise architecture.

## Core Workflow

1. **Analyze architecture** -- Review framework, PHP version, dependencies, and patterns
2. **Design models** -- Create typed domain models, value objects, DTOs
3. **Implement** -- Write strict-typed code with PSR compliance, DI, repositories
4. **Secure** -- Add validation, authentication, XSS/SQL injection protection
5. **Verify** -- Run `vendor/bin/phpstan analyse --level=9`; fix all errors. Run `vendor/bin/phpunit` or `vendor/bin/pest`; enforce 80%+ coverage.

## Reference Guide

| Topic | Reference | Load When |
|-------|-----------|-----------|
| Modern PHP | `references/modern-php-features.md` | Readonly, enums, attributes, fibers |
| Laravel | `references/laravel-patterns.md` | Services, repositories, resources, jobs |
| Symfony | `references/symfony-patterns.md` | DI, events, commands, voters |
| Async PHP | `references/async-patterns.md` | Swoole, ReactPHP, fibers |
| Testing | `references/testing-quality.md` | PHPUnit, PHPStan, Pest, mocking |

## MUST DO
- Declare strict types (`declare(strict_types=1)`)
- Use type hints for all properties, parameters, returns
- Follow PSR-12 coding standard
- Run PHPStan level 9 before delivery
- Use readonly properties where applicable
- Validate all user input with typed requests
- Use dependency injection over global state

## MUST NOT DO
- Skip type declarations
- Store passwords in plain text
- Write SQL queries vulnerable to injection
- Mix business logic with controllers
- Hardcode configuration (use .env)
- Use var_dump in production code

## Code Patterns

### Readonly DTO / Value Object

```php
final readonly class CreateUserDTO
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            email: $data['email'],
            password: $data['password'],
        );
    }
}
```

### Typed Service with Constructor DI

```php
final class UserService
{
    public function __construct(
        private readonly UserRepositoryInterface $users,
    ) {}

    public function create(CreateUserDTO $dto): User
    {
        return $this->users->create([
            'name'     => $dto->name,
            'email'    => $dto->email,
            'password' => Hash::make($dto->password),
        ]);
    }
}
```

### PHPUnit Test Structure

```php
final class UserServiceTest extends TestCase
{
    private UserRepositoryInterface&MockObject $users;
    private UserService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->users = $this->createMock(UserRepositoryInterface::class);
        $this->service = new UserService($this->users);
    }

    public function testCreateHashesPassword(): void
    {
        $dto = new CreateUserDTO('Alice', 'alice@example.com', 'secret');
        $this->users->expects($this->once())->method('create');
        $this->service->create($dto);
    }
}
```
