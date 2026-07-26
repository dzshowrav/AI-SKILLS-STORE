---
name: keyvhq
description: Build @keyvhq/core key-value caches with TTL, namespaces, memoization, cache-aside patterns, and storage adapters (Redis, SQLite, etc).
license: MIT
metadata:
  version: "1.0.0"
  category: caching
  tags: ["keyv", "cache", "ttl", "key-value", "redis", "sqlite"]
---

# keyvhq

`@keyvhq/core` (formerly Keyv) provides a simple key-value cache with TTL, namespaces, and pluggable storage adapters.

## Quick Start

```bash
npm install @keyvhq/core
```

```ts
import Keyv from '@keyvhq/core'

const cache = new Keyv({ namespace: 'myapp' })
await cache.set('key', 'value', 1000) // 1 second TTL
const val = await cache.get('key')
```

## Recommended Workflow

1. Start with `@keyvhq/core` in memory for local dev
2. Add a storage adapter when persistence is needed
3. Set `namespace` per module to avoid collisions
4. Use TTL in milliseconds (global or per-set)
5. Keep cache behind one service/module

## Core API

- `new Keyv(options)` — create instance
- `set(key, value, ttl?)` — store with optional TTL (ms)
- `get(key)` — read value
- `has(key)` — check existence
- `delete(key)` — remove one key
- `clear()` — remove all keys in namespace

## Adapters

- `@keyvhq/redis` — Redis-backed
- `@keyvhq/sqlite` — SQLite persistence
- `@keyvhq/mongo` — MongoDB-backed
- `@keyvhq/mysql` — MySQL/MariaDB
- `@keyvhq/postgres` — PostgreSQL
- `@keyvhq/file` — JSON file storage
- `keyv-s3` — S3 object storage

## Decorators

- `@keyvhq/memoize` — memoize function calls
- `@keyvhq/compress` — compress payloads
- `@keyvhq/multi` — combine local + remote stores

## Source

- https://github.com/microlinkhq/keyvhq
