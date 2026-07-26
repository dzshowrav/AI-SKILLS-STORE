---
name: typebox
description: JSON Schema Type Builder with Static Type Resolution for TypeScript. Create runtime JSON Schema objects that infer as TypeScript types. Includes a Script engine for transforming TS definitions into JSON Schema.
tags:
  - typebox
  - json-schema
  - typescript
  - validation
  - runtime-types
version: '1.0'
author: sinclairzx81
source: https://github.com/sinclairzx81/typebox
---
# TypeBox

JSON Schema Type Builder with Static Type Resolution for TypeScript.

## Installation

```sh
npm install typebox
```

## Basic Usage

```ts
import Type from 'typebox'

const T = Type.Object({
  x: Type.Number(),
  y: Type.Number(),
  z: Type.Number()
})

type T = Type.Static<typeof T>
// { x: number, y: number, z: number }
```

## Type Builder

Construct JSON Schema fragments that compose into complex types:

```ts
const User = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String({ format: 'email' })
})

type User = Type.Static<typeof User>
// { id: string, name: string, email: string }
```

Available types: `String`, `Number`, `Boolean`, `Integer`, `Array`, `Object`, `Tuple`, `Union`, `Intersect`, `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `Promise`, `Function`, `Constructor`, `Ref`, `Rec`, `KeyOf`, `Index`, `Enum`, `Literal`, `Unknown`, `Any`, `Never`, `Null`, `Optional`, `Readonly`, `ReadonlyOptional`, `Intrinsic`, `TemplateLiteral`, `Uint8Array`, `Date`, `BigInt`, `Symbol`, `Void`, `Undefined`

## Script Engine

Transform TypeScript definitions into JSON Schema at runtime:

```ts
const Math = Type.Script(`
  type Vector2 = { x: number, y: number }
  type Vector3 = { x: number, y: number, z: number }
  type Vector4 = { x: number, y: number, z: number, w: number }
`)

const { Mesh } = Type.Script(Math, `
  type Vertex = {
    position: Vector4, normal: Vector3, uv: Vector2
  }
  type Geometry = { vertices: Vertex[], indices: number[] }
  type Material = { ambient: Vector4, diffuse: Vector4, specular: Vector4 }
  type Mesh = { geometry: Geometry, material: Material }
`)

// Runtime reflection
Mesh.properties.geometry.properties.vertices.items.properties.position.properties.x

// Static inference
function render(mesh: Type.Static<typeof Mesh>) {
  mesh.geometry.vertices[0].position.x
}
```

Supports: Conditional, Mapped, Indexed, Generic, Distributive Conditional types. Syntax highlighting available via [VS Code extension](https://marketplace.visualstudio.com/items?itemName=sinclairzx81.typebox-script).

## Key Features

- JSON Schema compliant output (pass to Ajv, Joi, any JSON Schema validator)
- Full TypeScript static type inference via `Type.Static<typeof T>`
- Runtime Script engine (TS definitions → JSON Schema)
- Supports TypeScript 5+ and TypeScript 7
- Zero dependencies
- MIT License

## References

- `references/src/` — full source code
- `references/test/` — test suite
- `references/example/` — usage examples
- `references/docs/` — documentation site source
- `references/design/` — design notes
- [Full documentation](https://sinclairzx81.github.io/typebox/)
