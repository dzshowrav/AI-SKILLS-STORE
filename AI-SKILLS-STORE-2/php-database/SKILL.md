---
name: php-database
version: "2.0.0"
description: PHP database mastery - PDO, Eloquent, Doctrine, query optimization, and migrations
category: data
---

# PHP Database Skill

Comprehensive skill for PHP database interactions covering PDO, ORM patterns, query optimization, schema design, and migrations.

## Learning Modules

### Module 1: PDO Fundamentals
- Connection and DSN, prepared statements, fetching results
- Error handling, transactions, named placeholders
- Connection pooling, stored procedures, batch operations

### Module 2: Query Optimization
- Basic indexing, EXPLAIN, WHERE clause optimization
- Composite indexes, join optimization, query profiling
- Execution plan analysis, partitioning, query caching

### Module 3: ORM Patterns
- Model basics, CRUD, relationships
- Eager loading (N+1 prevention), query scopes
- Custom repositories, result caching, batch processing

## Code Examples

### PDO with Prepared Statements
```php
final class Database
{
    private \PDO $pdo;

    public function __construct(string $dsn, string $user, string $pass)
    {
        $this->pdo = new \PDO($dsn, $user, $pass, [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch() ?: null;
    }
}
```

### N+1 Prevention (Eloquent)
```php
// BAD: N+1 problem
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name; // Query per post!
}

// GOOD: Eager loading
$posts = Post::with('author')->get();
foreach ($posts as $post) {
    echo $post->author->name; // No extra queries
}
```
