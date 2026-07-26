---
name: laravel-tdd
description: Test-Driven Development specifically for Laravel applications using Pest PHP. Use when implementing any Laravel feature or bugfix - write the test first, watch it fail, write minimal code to pass.
---

# Test-Driven Development for Laravel

## Overview

Write the test first. Watch it fail. Write minimal code to pass.

## When to Use

**Always for Laravel:**
- New features (controllers, models, services)
- Bug fixes
- API endpoints
- Database migrations and models
- Form validation
- Authorization policies
- Queue jobs
- Artisan commands
- Middleware

## The Laravel TDD Cycle

```
RED -> Verify RED -> GREEN -> Verify GREEN -> REFACTOR -> Repeat
```

### RED - Write Failing Test

```php
test('authenticated user can create post', function () {
    $user = User::factory()->create();
    
    $this->actingAs($user)
        ->post('/posts', ['title' => 'My First Post', 'content' => 'Content'])
        ->assertRedirect('/posts');
    
    expect(Post::where('title', 'My First Post')->exists())->toBeTrue();
});
```

### Verify RED

```bash
php artisan test --filter=authenticated_user_can_create_post
```

### GREEN - Write Minimal Code

```php
// routes/web.php
Route::post('/posts', [PostController::class, 'store'])->middleware('auth');

// PostController
public function store(Request $request)
{
    $post = auth()->user()->posts()->create($request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
    ]));
    
    return redirect('/posts');
}
```

### Verify GREEN

```bash
php artisan test
```

### REFACTOR

After green only: extract services, create policies, add scopes, use events.

## Laravel-Specific Test Patterns

### Database Testing
```php
uses(RefreshDatabase::class);

test('creates post in database', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->post('/posts', ['title' => 'Test', 'content' => 'Content']);
    $this->assertDatabaseHas('posts', ['title' => 'Test']);
});
```

### Authorization Testing
```php
test('user cannot delete others posts', function () {
    $user = User::factory()->create();
    $post = Post::factory()->create();
    $this->actingAs($user)->delete("/posts/{$post->id}")->assertForbidden();
});
```

### API Testing
```php
test('creates post via API', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum')
        ->postJson('/api/posts', ['title' => 'API Post', 'content' => 'Content'])
        ->assertCreated();
});
```

## Verification Checklist

- [ ] Migration test passes
- [ ] Model relationships tested
- [ ] Controller actions tested
- [ ] Validation rules tested
- [ ] Authorization tested
- [ ] All tests passing
- [ ] Used RefreshDatabase
- [ ] Used factories
