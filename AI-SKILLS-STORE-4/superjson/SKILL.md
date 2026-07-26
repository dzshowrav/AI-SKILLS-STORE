---
name: superjson
description: Safely serialize JavaScript expressions to a superset of JSON — supports Dates, BigInts, Maps, Sets, RegExps, undefined, URLs, and Errors.
tags:
  - json
  - serialization
  - nextjs
  - typescript
  - javascript
version: '2.0'
author: flightcontrolhq
source: https://github.com/flightcontrolhq/superjson
---
# SuperJSON

Safely serialize JavaScript expressions to a superset of JSON.

Supports all standard JSON types plus: `Date`, `BigInt`, `Map`, `Set`, `RegExp`, `undefined`, `URL`, `Error`.

## Installation

```sh
npm install superjson
# or yarn add superjson
```

## Basic Usage

```ts
import superjson from 'superjson'

// Stringify
const jsonString = superjson.stringify({ date: new Date(0) })
// '{"json":{"date":"1970-01-01T00:00:00.000Z"},"meta":{"values":{date:"Date"}}}'

// Parse
const object = superjson.parse<{ date: Date }>(jsonString)
// { date: new Date(0) }
```

## Serialize / Deserialize (low-level)

```ts
const { json, meta } = superjson.serialize({
  normal: 'string',
  timestamp: new Date(),
  test: /superjson/,
})
// json: JSON-compatible object
// meta: contains type info for non-standard types

const original = superjson.deserialize({ json, meta })
```

## With Next.js

### SWC Plugin (experimental, v13+)

```sh
npm install next-superjson-plugin
```

```js
// next.config.js
module.exports = {
  experimental: {
    swcPlugins: [['next-superjson-plugin', { excluded: [] }]],
  },
}
```

### Babel Plugin

```sh
npm install babel-plugin-superjson-next
```

```json
{
  "presets": ["next/babel"],
  "plugins": ["superjson-next"]
}
```

## Supported Types

| Type | JSON | SuperJSON |
|------|------|-----------|
| string, number, boolean, null | ✅ | ✅ |
| Array, Object | ✅ | ✅ |
| undefined | ❌ | ✅ |
| bigint | ❌ | ✅ |
| Date | ❌ | ✅ |
| RegExp | ❌ | ✅ |
| Set | ❌ | ✅ |
| Map | ❌ | ✅ |
| Error | ❌ | ✅ |
| URL | ❌ | ✅ |

## Custom Types

```ts
import { Decimal } from 'decimal.js'

SuperJSON.registerCustom(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: v => v.toJSON(),
    deserialize: v => new Decimal(v),
  },
  'decimal.js'
)
```

## API

- `superjson.stringify(value)` → `string`
- `superjson.parse(string)` → original value
- `superjson.serialize(value)` → `{ json, meta }`
- `superjson.deserialize({ json, meta }, options?)` → original value
- `superjson.registerCustom(transformer, id)` — register custom type
- `superjson.registerClass(Class)` — register a class for serialization

## References
- `references/src/` — full source
- `references/README.md`
- `references/package.json`
- `references/tsconfig.json`
- `references/benchmark.js`
