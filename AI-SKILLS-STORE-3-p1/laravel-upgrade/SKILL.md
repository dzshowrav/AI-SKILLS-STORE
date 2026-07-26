---
name: laravel-upgrade
description: Upgrade Laravel applications one major version at a time (9->10, 10->11, 11->12). Auto-detects current version from composer.json, identifies breaking changes, and applies fixes.
---

# Laravel Upgrade

Upgrade Laravel applications one major version at a time. Supports: 9->10, 10->11, 11->12.

## Workflow

### 1. Detect Current Version
Read `composer.json` for `laravel/framework` version constraint.

### 2. Load Upgrade Guide
Based on detected versions, read appropriate reference.

### 3. Scan and Fix

**High Impact:**
- composer.json dependency versions
- PHP version requirements
- Database migrations using deprecated methods

**Medium Impact:**
- Model `$dates` property -> `$casts` (9->10)
- Database expressions with `(string)` casting (9->10)
- Column modification migrations missing attributes (10->11)
- `HasUuids` trait behavior change (11->12)

### 4. Update Dependencies
```bash
composer update
```

### 5. Post-Upgrade Verification
- Run `php artisan` to verify framework boots
- Run test suite
- Check for deprecation warnings

## Common Patterns

### Model $dates to $casts (9->10)
```php
// Before
protected $dates = ['deployed_at'];
// After
protected $casts = ['deployed_at' => 'datetime'];
```

### HasUuids Trait (11->12)
```php
// Before
use Illuminate\Database\Eloquent\Concerns\HasUuids;
// After (if you need UUIDv4 behavior)
use Illuminate\Database\Eloquent\Concerns\HasVersion4Uuids as HasUuids;
```
