---
name: php-laravel
version: "2.0.0"
description: Laravel framework mastery - Eloquent, Blade, APIs, queues, and Laravel 11.x ecosystem
category: framework
---

# Laravel Framework Skill

Comprehensive skill for building production-ready Laravel applications. Covers Laravel 10.x-11.x.

## Learning Modules

### Module 1: Eloquent ORM Mastery
- Model basics, CRUD, basic relationships
- Advanced relationships (morphTo, hasManyThrough), eager loading, query scopes
- Custom casts, performance optimization, transactions

### Module 2: API Development
- API routes, controllers, JSON responses, Sanctum auth
- API Resources, pagination, filtering, rate limiting
- OAuth (Passport), API versioning, OpenAPI docs

### Module 3: Queue Processing
- Job basics, queue connections, failed jobs
- Job chaining/batching, Horizon monitoring
- Custom queue drivers, saga patterns

## Code Examples

### Eloquent Model
```php
final class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'content', 'author_id'];

    protected function casts(): array
    {
        return ['published_at' => 'datetime'];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
```

### API Resource Controller
```php
final class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(
            Post::with(['author'])->paginate(15)
        );
    }

    public function store(StorePostRequest $request)
    {
        $post = Post::create($request->validated());
        return (new PostResource($post))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }
}
```
