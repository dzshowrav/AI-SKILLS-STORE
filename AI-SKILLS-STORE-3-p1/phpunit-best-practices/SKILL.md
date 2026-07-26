---
name: phpunit-best-practices
description: PHPUnit testing best practices and conventions guide. Use when writing, reviewing, or refactoring PHPUnit tests.
license: MIT
metadata:
  author: pentiminax
  version: "1.0.0"
---

# PHPUnit Best Practices

Comprehensive testing best practices guide for PHPUnit applications.

## When to Apply

- Writing new PHPUnit test classes or test methods
- Reviewing test code for quality and consistency
- Refactoring existing test suites
- Configuring PHPUnit XML settings
- Setting up code coverage and test organization

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Principles & Patterns | CRITICAL | `principle-` |
| 2 | Coding Standards | CRITICAL | `standard-` |
| 3 | Test Attributes | HIGH | `attr-` |
| 4 | Data Management | HIGH | `data-` |
| 5 | Test Documentation | MEDIUM | `doc-` |
| 6 | Mocking | MEDIUM | `mock-` |
| 7 | Integration Testing | MEDIUM | `integration-` |
| 8 | Configuration | LOW-MEDIUM | `config-` |

## Quick Reference

### 1. Principles & Patterns (CRITICAL)
- Structure tests with Arrange-Act-Assert
- Keep tests fast
- Ensure tests are independent
- Make tests deterministic
- Tests must have clear pass/fail
- Write tests alongside production code
- Balance DRY and readability in tests

### 2. Coding Standards (CRITICAL)
- Declare strict_types=1 in test files
- Make test classes final
- Use snake_case for test method names
- Follow PSR-4 naming and namespace conventions
- Apply PSR-12 code formatting
- Use $this over self:: for assertions
- Explicit visibility and type hints

### 3. Test Attributes (HIGH)
- Use #[Test] attribute with it_ prefix
- Use #[CoversClass] for coverage boundaries
- Use #[UsesClass] for dependency documentation
- Categorize tests by size
- Use #[Group] for arbitrary categorization
- Prefer PHP 8 attributes over PHPDoc annotations

### 4. Data Management (HIGH)
- Use #[DataProvider] for multiple scenarios
- Use #[DataProviderExternal] for shared data
- Use #[TestWith] for inline datasets
- Factory methods for SUT instantiation
- Direct instantiation for simple constructors

### 5. Test Documentation (MEDIUM)
- Use TestDox for executable specifications
- #[TestDox] attribute for custom display
- Readable test names as specifications

### 6. Mocking (MEDIUM)
- Chicago vs London TDD schools
- Prophecy for expressive test doubles
- Avoid over-mocking internal dependencies

### 7. Integration Testing (MEDIUM)
- Use DatabaseTransactions or RefreshDatabase
- Seed only required data
- Test against real implementations where practical
