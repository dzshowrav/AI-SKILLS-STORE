---
name: php-migration
description: PHP version migration guide - deprecated/breaking change patterns and fix recipes for PHP 8.2/8.4/8.5 upgrades
license: MIT
---

# PHP Version Migration Guide

Collection of deprecation and breaking change patterns encountered during PHP version upgrades, with fix recipes.

## PHP 8.2

### Dynamic Properties Deprecated
Assigning to undeclared properties is deprecated: `Creation of dynamic property X::$prop is deprecated`.

**Fix A (preferred)**: Declare the property on the class.
**Fix B**: Add `#[\AllowDynamicProperties]` attribute to base class (inherited by subclasses).

## PHP 8.4

### 1. Implicitly Nullable Parameters
`Type $x = null` is deprecated. Use `?Type $x = null` explicitly.

### 2. fgetcsv() $escape Parameter
The `$escape` parameter omission is deprecated. Pass it explicitly:
```php
$head = fgetcsv($fp, 10240, ',', '"', '\\');
```

### 3. ReflectionProperty::setValue() Single Argument
Pass the object explicitly:
```php
$property->setValue($object, $value);
```

## PHP 8.5

### 0. Reserved Class Names (FATAL)
`Array`, `Object`, `Resource`, `Enum`, etc. are reserved. Using them with `use` causes Fatal error.

### 1. Non-Standard Cast Names
`(boolean)` -> `(bool)`, `(integer)` -> `(int)`, `(double)` -> `(float)`, `(unset)` is removed.
