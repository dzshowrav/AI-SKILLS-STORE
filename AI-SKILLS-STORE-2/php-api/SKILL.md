---
name: php-api
version: "2.0.0"
description: PHP API development mastery - REST, GraphQL, JWT/OAuth, OpenAPI documentation
category: integration
---

# PHP API Development Skill

Comprehensive skill for PHP API development covering REST design, GraphQL, authentication strategies, and API documentation.

## Learning Modules

### Module 1: REST API Design
- Resource naming, HTTP methods, status codes
- Pagination, filtering, sorting, HATEOAS
- Hypermedia APIs, conditional requests, bulk operations

### Module 2: Authentication
- API keys, basic auth, JWT, refresh tokens
- OAuth 2.0 flows, PKCE, scopes and permissions

### Module 3: API Security
- Input validation, output encoding, CORS
- Rate limiting, request throttling, API versioning
- Security headers, request signing, audit logging

## Code Examples

### REST Controller (Laravel)
```php
final class UserController extends Controller
{
    public function index()
    {
        $users = User::query()
            ->with(['profile'])
            ->filter(request(['search', 'status']))
            ->paginate(request('per_page', 15));

        return UserResource::collection($users);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = User::create($request->validated());
        return (new UserResource($user))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }
}
```

### JWT Authentication
```php
final class JwtService
{
    public function __construct(
        private readonly string $secret,
        private readonly string $algorithm = 'HS256',
        private readonly int $ttl = 3600,
    ) {}

    public function generate(array $payload): string
    {
        return JWT::encode([
            ...$payload,
            'iat' => time(),
            'exp' => time() + $this->ttl,
        ], $this->secret, $this->algorithm);
    }
}
```
