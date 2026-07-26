---
name: laravel-security
description: Laravel security best practices — authentication, authorization, Eloquent safety, CSRF, XSS prevention, API security, and secure deployment configurations.
metadata:
  origin: ECC
---

# Laravel Security Best Practices

Comprehensive security guidelines for Laravel applications to protect against common vulnerabilities.

## When to Activate

- Setting up Laravel authentication and authorization (Sanctum, Passport, Jetstream, Breeze)
- Implementing user roles, permissions, and policies
- Configuring production security settings and environment variables
- Reviewing Laravel applications for security vulnerabilities
- Deploying Laravel applications to production
- Writing secure Eloquent queries and migrations

## Production Configuration

### Essential Production Settings

```php
// config/app.php
'env' => env('APP_ENV', 'production'),
'debug' => (bool) env('APP_DEBUG', false), // CRITICAL: Never true in production
'key' => env('APP_KEY'), // Must be set: php artisan key:generate

// config/session.php
'secure' => env('SESSION_SECURE_COOKIE', true),
'http_only' => true,
'same_site' => 'lax',

// Verify APP_KEY is set at boot
// bootstrap/app.php or a service provider
if (empty(config('app.key'))) {
    throw new RuntimeException('APP_KEY is not set. Run: php artisan key:generate');
}
```

### Environment File Security

```bash
# NEVER commit .env to version control
# .gitignore already includes .env by default

# Use .env.example with placeholders instead
DB_PASSWORD=
APP_KEY=
SANCTUM_TOKEN_PREFIX=

# Validate required variables at boot
// In AppServiceProvider::boot()
$requiredKeys = ['app.key', 'database.connections.mysql.database', 'database.connections.mysql.username'];
foreach ($requiredKeys as $key) {
    if (empty(config($key))) {
        throw new RuntimeException("Missing required config key: {$key}");
    }
}
```

### HTTPS Enforcement

```php
// AppServiceProvider::boot() or middleware
if (app()->environment('production')) {
    URL::forceScheme('https');
    request()->server->set('HTTPS', 'on');
}

// config/app.php for trusted proxies (load balancers)
// Use specific IP ranges — * trusts all, allowing X-Forwarded-* spoofing
// AWS: '10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'
'trusted_proxies' => ['10.0.0.0/8', '172.16.0.0/12'],

// Force HTTPS in production via middleware
// app/Http/Middleware/ForceHttps.php
public function handle($request, Closure $next)
{
    if (!$request->secure() && app()->environment('production')) {
        return redirect()->secure($request->getRequestUri());
    }
    return $next($request);
}
```

## Authentication

### Sanctum (API Token Authentication)

```php
// config/sanctum.php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s',
    'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
    env('APP_URL') ? ',' . parse_url(env('APP_URL'), PHP_URL_HOST) : ''
)));

'expiration' => 60 * 24, // Token expiration in minutes (null = never)
'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),

// Issuing tokens with abilities
$token = $user->createToken('api-token', ['read', 'write'])->plainTextToken;

// Validate abilities on routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', function () {
        abort_unless(Auth::user()->tokenCan('read'), 403);
    })->middleware('abilities:read');

    Route::post('/orders', function () {
        abort_unless(Auth::user()->tokenCan('write'), 403);
    })->middleware('abilities:write');
});
```

### Password Security

```php
// config/hashing.php
'bcrypt' => [
    'rounds' => env('BCRYPT_ROUNDS', 12),
],
'argon' => [
    'memory' => 65536,
    'threads' => 4,
    'time' => 4,
],

// Password validation
public function rules(): array
{
    return [
        'password' => [
            'required',
            'confirmed',
            Password::min(12)->letters()->mixedCase()->numbers()->symbols()->uncompromised(),
        ],
    ];
}
```

### Session Management

```php
// config/session.php
'driver' => env('SESSION_DRIVER', 'database'),
'lifetime' => env('SESSION_LIFETIME', 120),
'expire_on_close' => env('SESSION_EXPIRE_ON_CLOSE', false),
'encrypt' => env('SESSION_ENCRYPT', false),
```

## Authorization

### Gates vs Policies

| Feature | Gate | Policy |
|---------|------|--------|
| Scope | Action-based | Model-based |
| Use case | Admin actions, feature flags | CRUD on models |
| Organization | `App\Providers\AuthServiceProvider` | `app/Policies/` |

### Defining Policies

```php
final class PostPolicy
{
    public function viewAny(?User $user): bool { return true; }
    public function view(?User $user, Post $post): bool { return true; }
    public function create(User $user): bool { return $user->isSubscribed(); }
    public function update(User $user, Post $post): bool { return $user->id === $post->user_id; }
    public function delete(User $user, Post $post): bool { return $user->id === $post->user_id; }
}
```

## Eloquent Security

### Mass Assignment

```php
// Prefer $fillable over $guarded
protected $fillable = ['name', 'email', 'bio'];

// NEVER do this with user input:
User::create($request->all()); // Vulnerable!
// Use instead:
User::create($request->validated());
```

### SQL Injection Protection

Eloquent parameter binding protects against injection in most cases, but be careful with:

```php
// Safe: Eloquent/Query Builder parameter binding
User::where('email', $userInput)->get();

// Unsafe: raw expressions with user input
DB::raw("SELECT * FROM users WHERE email = '$userInput'"); // Vulnerable!
```

## CSRF Protection

Laravel automatically includes CSRF protection. Key points:

- All `POST/PUT/PATCH/DELETE` routes in `web.php` require CSRF token
- Exclude webhook routes via `VerifyCsrfToken` middleware `$except` array
- SPA authentication: use Sanctum with `stateful` domains and `Accept: application/json` header
- Never disable CSRF globally

## XSS Prevention

```blade
{{-- Escaped output (safe) --}}
{{ $userInput }}

{{-- Unsafe: raw output --}}
{!! $userInput !!}
```

## API Security

### Rate Limiting

```php
// app/Http/Kernel.php or RouteServiceProvider
RateLimiter::for('api', fn (Request $request) => Limit::perMinute(60)->by($request->user()?->id ?: $request->ip()));
RateLimiter::for('auth', fn (Request $request) => Limit::perMinute(5)->by($request->ip()));
```

### Input Validation

```php
final class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', Rule::unique('users')],
            'password' => ['required', 'confirmed', Password::min(12)->uncompromised()],
            'role' => ['required', Rule::in(['admin', 'editor', 'user'])],
        ];
    }
}
```

## Security Checklist

- [ ] APP_DEBUG=false in production
- [ ] HTTPS forced in production
- [ ] APP_KEY is 32-character random string
- [ ] Session driver is database/redis (not file)
- [ ] Cookies set to secure, httpOnly, SameSite=Lax
- [ ] Rate limiting active on auth routes
- [ ] CORS configured for your frontend domain only
- [ ] All user inputs validated/filtered
- [ ] SQL injection prevention via parameter binding
- [ ] Regular `composer audit` runs in CI
