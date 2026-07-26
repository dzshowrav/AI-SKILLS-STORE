---
name: yargs-parser
description: The mighty option parser used by yargs — parse CLI arguments, env vars, config files, booleans, numbers, arrays, aliases, and more. TRIGGER when parsing command-line arguments, building CLI tools, or needing argument/option parsing.
---

# yargs-parser

The mighty option parser used by [yargs](https://github.com/yargs/yargs). Zero-dependency argument parsing for Node.js, Deno, and browsers.

## Install

```bash
npm i yargs-parser
```

## Usage

```js
import parser from 'yargs-parser'

const argv = parser('--foo=33 --bar hello')
// { _: [], foo: 33, bar: 'hello' }

const argv = parser(process.argv.slice(2))
```

## API

### `parser(args, opts={})`

Parses CLI args into a key/value map.

| Option | Type | Description |
|--------|------|-------------|
| `alias` | `Record<string, string[]>` | Aliases for keys: `{foo: ['f']}` |
| `array` | `string[] \| Array<{key, boolean?, number?}>` | Parse as array; optionally coerce items |
| `boolean` | `string[]` | Treat as boolean flags |
| `coerce` | `Record<string, (arg) => any>` | Custom sync coercion function |
| `config` | `string` | Key pointing to a JSON config file path |
| `configObjects` | `object[]` | Config objects to merge as defaults |
| `configuration` | `Configuration` | Parser behavior toggles (see below) |
| `count` | `string[]` | Treat as counter: `-vvv` → `{v: 3}` |
| `default` | `Record<string, any>` | Default values |
| `envPrefix` | `string` | Parse env vars with this prefix |
| `narg` | `Record<string, number>` | Key requires N arguments |
| `normalize` | `string[]` | Apply `path.normalize()` to values |
| `number` | `string[]` | Treat as numbers |
| `string` | `string[]` | Treat as strings (even if numeric-looking) |

### `parser.detailed(args, opts={})`

Returns full parse result including error info:

```js
const result = parser.detailed('--foo=99', opts)
// {
//   argv: { _: [], foo: 99 },
//   error: null,
//   aliases: { foo: ['f'] },
//   newAliases: {},
//   defaulted: {},
//   configuration: { ... }
// }
```

### Utility Exports

```js
parser.camelCase(str)       // 'foo-bar' → 'fooBar'
parser.decamelize(str)      // 'fooBar' → 'foo-bar'
parser.looksLikeNumber(str) // true if string looks numeric
```

## Configuration Options

Pass via `opts.configuration`:

| Key | Default | Description |
|-----|---------|-------------|
| `boolean-negation` | `true` | `--no-foo` sets `foo: false` |
| `camel-case-expansion` | `true` | `--foo-bar` → `fooBar` alias |
| `combine-arrays` | `false` | Merge arrays from CLI + config |
| `dot-notation` | `true` | `--foo.bar` → `{foo: {bar: true}}` |
| `duplicate-arguments-array` | `true` | `-x 1 -x 2` → `x: [1,2]` |
| `flatten-duplicate-arrays` | `true` | `-x 1 2 -x 3 4` → `x: [1,2,3,4]` |
| `greedy-arrays` | `true` | `--arr 1 2` → `arr: [1,2]` |
| `halt-at-non-option` | `false` | Stop parsing at first positional |
| `nargs-eats-options` | `false` | nargs consume dash options too |
| `negation-prefix` | `'no-'` | Prefix for negation |
| `parse-numbers` | `true` | `--foo=99.3` → `foo: 99.3` |
| `parse-positional-numbers` | `true` | `99.3` → `_[0]: 99.3` |
| `populate--` | `false` | Store `--` args in `argv['--']` |
| `set-placeholder-key` | `false` | Add `undefined` for unset keys |
| `short-option-groups` | `true` | `-abc` → `{a:true,b:true,c:true}` |
| `strip-aliased` | `false` | Remove alias keys from output |
| `strip-dashed` | `false` | Remove dashed keys from output |
| `unknown-options-as-args` | `false` | Treat unknown options as positional |

## Return Value

```ts
{
  _: string[]           // positional arguments
  [key: string]: any    // named options
  '--'?: string[]       // args after -- (if populate-- enabled)
}
```

## Examples

### Aliases

```js
parser('-f 33', { alias: { foo: ['f'] } })
// { _: [], foo: 33, f: 33 }
```

### Arrays

```js
parser('--x 1 --x 2', { array: ['x'] })
// { _: [], x: [1, 2] }

parser('--x 1 2', { array: ['x'] })
// { _: [], x: [1, 2] }
```

### Booleans

```js
parser('--verbose', { boolean: ['verbose'] })
// { _: [], verbose: true }

parser('--no-verbose', { boolean: ['verbose'] })
// { _: [], verbose: false }
```

### Counters

```js
parser('-vvv', { count: ['v'] })
// { _: [], v: 3 }
```

### Defaults

```js
parser('--foo=1', { default: { foo: 99, bar: 'hello' } })
// { _: [], foo: 1, bar: 'hello' }
```

### Config Files

```js
parser('--config settings.json', {
  config: 'config',
  default: { port: 8080 }
})
// Loads settings.json, merges with defaults and CLI args
```

### Environment Variables

```js
// With envPrefix: 'MY_APP_', MY_APP_PORT=3000
parser('', { envPrefix: 'MY_APP_' })
// { _: [], port: '3000' }
```

### narg

```js
parser('--foo bar baz', { narg: { foo: 2 } })
// { _: [], foo: ['bar', 'baz'] }
```

## Browser

```html
<script type="module">
  import parser from 'https://unpkg.com/yargs-parser/browser.js'
  const argv = parser('--foo=99')
</script>
```

## Deno

```ts
import parser from 'https://deno.land/x/yargs_parser/deno.ts'
const argv = parser('--foo=99', { string: ['bar'] })
```

## Notes

- Keys are automatically camelCased by default (can disable via `camel-case-expansion: false`)
- Dot-notation creates nested objects by default (can disable via `dot-notation: false`)
- Numbers in values are auto-parsed by default (can disable via `parse-numbers: false`)
- Boolean negation works with `--no-` prefix by default (configurable via `negation-prefix`)
- `parser.detailed()` provides error info without throwing
