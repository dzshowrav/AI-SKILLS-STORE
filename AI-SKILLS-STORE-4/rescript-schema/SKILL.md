---
name: rescript-schema
description: The fastest schema validation library in the JavaScript ecosystem. Write schemas in JS/TS/ReScript, get JIT-optimized validators + inferred types + JSON Schema output. ~100x faster than Zod.
tags:
  - schema
  - validation
  - parsing
  - rescript
  - typescript
  - json-schema
version: '1.0'
author: dzakh
source: https://github.com/DZakh/rescript-schema
---
# Sury (ReScript Schema)

The fastest parsing/validation library in JavaScript. ~100x faster than Zod.

## Installation

```sh
npm i rescript-schema
# or npm i sury        (new name, same library)
```

## Basic Usage (JS/TS)

```ts
import * as S from "rescript-schema"

const filmSchema = S.schema({
  id: S.number,
  title: S.string,
  tags: S.array(S.string),
  rating: S.union(["G", "PG", "PG13", "R"])
})

type Film = S.Output<typeof filmSchema>
// { id: number; title: string; tags: string[]; rating: "G" | "PG" | "PG13" | "R" }

S.parseOrThrow(data, filmSchema)       // returns Film or throws
S.safe(() => S.parseOrThrow(data, s))  // wraps in Result type
```

## Advanced: Transform Shape/Field Names

```ts
const filmSchema = S.object((s) => ({
  id: s.field("Id", S.number),
  title: s.nested("Meta").field("Title", S.string),
  tags: s.field("Tags_v2", S.array(S.string)),
  rating: s.field("Rating", S.schema([S.union(["G", "PG", "PG13", "R"])]))[0],
}))

S.parseOrThrow({ Id: 1, Meta: { Title: "Hi" }, Tags_v2: ["A"], Rating: ["G"] }, filmSchema)
// { id: 1, title: "Hi", tags: ["A"], rating: "G" }
```

## Key Features

| Feature | Support |
|---------|---------|
| Parse + validate | `parseOrThrow`, `safe`, `parse`, `validate` |
| Infer TS type | `S.Output<typeof schema>` |
| JSON Schema | `S.toJSONSchema(schema)` |
| Tree-shakeable | Modular, small functions |
| Standard Schema | Implements Standard Schema spec |
| Immutable API | 100+ operations |
| JIT-compiled | `new Function` for max speed |
| ReScript PPX | `@schema` attribute auto-generates schemas |
| Ecosystem | tRPC, TanStack Form, TanStack Router, Hono, 19+ more |

## Performance

- **Parse same schema:** ~94,828 ops/ms (vs Zod 8,437, Valibot 1,721)
- **Create & parse once:** ~166 ops/ms (vs Zod 6, TypeBox 111)
- **Bundle (min+gzip):** 14.1 kB total, 4.27 kB benchmark

## APIs

- `S.schema()`, `S.object()`, `S.union()`, `S.array()`
- `S.string`, `S.number`, `S.boolean`, `S.null`, `S.undefined`
- `S.transform(schema, fn)` — manual transform
- `S.pipe(schema1, schema2)` — chain validators
- `S.toJSONSchema(schema)` — output JSON Schema
- `S.parseOrThrow`, `S.safe`, `S.parse`, `S.validate`

## ReScript PPX

```rescript
@schema
type rating = | @as("G") GeneralAudiences | @as("PG") ParentalGuidance
@schema
type film = { id: float, title: string, tags: array<string>, rating: rating }
```

## References
- `references/src/` — full source code
- `references/test/` — test suite
- `references/docs/` — JS/TS and ReScript usage docs
- `references/sury-ppx/` — PPX codegen package
