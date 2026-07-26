---
name: cakephp-migration
description: CakePHP version migration guide - deprecation and breaking change patterns for 5.0 -> 5.1 -> 5.2 upgrades
license: MIT
---

# CakePHP Version Migration Guide

Collection of breaking changes and deprecations encountered during CakePHP upgrades.

## 5.0 -> 5.1 Changes

### 1-1. Query::order() / group() Deprecated
`order()` -> `orderBy()`, `group()` -> `groupBy()`

### 1-2. find('all', $options) Array Options Deprecated
Use named arguments or query builder instead.

### 1-3. Pagination Returns PaginatedResultSet
Call `->items()` first before using ResultSet methods.

## 5.1 -> 5.2 Changes

### 2-1. Event Listener Return Values Deprecated
Use `$event->setResult()` instead of returning values.

### 2-2. AssociationCollection::add() Throws on Duplicate
Remove existing association before re-adding:
```php
if ($table->associations()->has('CustomLinks')) {
    $table->associations()->remove('CustomLinks');
}
$table->hasMany('CustomLinks')->setFinder('all');
```

### 2-3. Duplicate Validation Rule Names Throw
Merge duplicate rule blocks with the same name.
