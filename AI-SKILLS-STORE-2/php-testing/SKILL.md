---
name: php-testing
version: "2.0.0"
description: PHP testing mastery - PHPUnit 11, Pest 3, TDD, mocking, and CI/CD integration
category: quality
---

# PHP Testing Skill

Comprehensive skill for PHP testing covering PHPUnit 11, Pest 3, TDD methodology, mocking strategies, and CI/CD integration.

## Learning Modules

### Module 1: PHPUnit Fundamentals
- Test case structure, basic assertions, running tests
- Data providers, fixtures, test doubles
- Attributes (#[Test], #[DataProvider]), code coverage, parallel execution

### Module 2: Pest Framework
- Expectations syntax, test organization, groups
- Higher-order tests, datasets, hooks
- Mutation testing, architecture testing, custom expectations

### Module 3: Mocking Strategies
- Stubs vs mocks, simple expectations
- Partial mocks, spies, argument matching
- Mock chains, return callbacks, exception testing

## Code Examples

### PHPUnit Test
```php
final class CalculatorTest extends TestCase
{
    private Calculator $calculator;

    protected function setUp(): void
    {
        $this->calculator = new Calculator();
    }

    #[Test]
    public function it_adds_two_numbers(): void
    {
        $result = $this->calculator->add(2, 3);
        $this->assertSame(5, $result);
    }

    #[Test]
    #[DataProvider('divisionProvider')]
    public function it_divides_correctly(int $a, int $b, float $expected): void
    {
        $result = $this->calculator->divide($a, $b);
        $this->assertEqualsWithDelta($expected, $result, 0.0001);
    }

    public static function divisionProvider(): array
    {
        return [
            'whole' => [10, 2, 5.0],
            'decimal' => [7, 2, 3.5],
        ];
    }
}
```

### Pest Test
```php
it('allows new user registration', function () {
    post('/register', [
        'name' => 'John',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertRedirect('/dashboard');

    assertDatabaseHas('users', ['email' => 'john@example.com']);
})->group('auth');
```
