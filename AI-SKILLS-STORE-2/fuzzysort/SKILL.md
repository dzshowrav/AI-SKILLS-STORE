---
name: fuzzysort
description: Fast, tiny, zero-dependency fuzzy search library for JavaScript/TypeScript. TRIGGER when implementing fuzzy search, autocomplete, or filtering logic.
---

# Fuzzysort

Fast SublimeText-like fuzzy search. 5kb, 0 dependencies, <1ms searching 13k items.

## Install

```bash
npm i fuzzysort
```

```js
import fuzzysort from 'fuzzysort'
// or
const fuzzysort = require('fuzzysort')
```

## Core API

### `fuzzysort.go(search, targets, options?)`

```js
const results = fuzzysort.go('a', ['Apple', 'Banana', 'Cherry'])
// [{score: 0.81, target: 'Apple'}, {score: 0.59, target: 'Banana'}]
```

### `fuzzysort.single(search, target)`

```js
const result = fuzzysort.single('query', 'some string that contains my query.')
if (result) {
  result.score    // 0.80 (0-1, 1 is perfect)
  result.target   // 'some string that contains my query.'
  result.indexes  // [29, 30, 31, 32, 33]

  result.highlight('<b>', '</b>')
  // 'some string that contains my <b>query</b>.'

  result.highlight((match, i) => <mark key={i}>{match}</mark>)
  // ['some string that contains my ', <mark>query</mark>, '.']
}
```

### `fuzzysort.prepare(target)`

Pre-process targets for performance when targets don't change often.

```js
const prepared = fuzzysort.prepare('Apple.cpp')
fuzzysort.go('ap', [prepared])
```

### `fuzzysort.cleanup()`

Free internal caches when done.

## Options

```js
fuzzysort.go(search, targets, {
  threshold: 0,    // min score to return (higher is faster)
  limit: 0,        // max results (lower is faster)
  all: false,      // return all results for empty search
  key: null,       // string|function|string[] — extract target from object
  keys: null,      // string[]|function[] — multiple keys per object
  scoreFn: null,   // custom scoring with `keys`
})
```

## Searching Objects

### Single Key (`key`)

```js
const items = [{file: 'Apple.cpp'}, {file: 'Banana.cpp'}]
const results = fuzzysort.go('ap', items, {key: 'file'})
// result.obj — reference to original object
// result.target — the matched string
```

`key` accepts: string (`'file'`), dotted path (`'meta.desc'`), array path (`['meta', 'desc']`), or function (`obj => obj.tags.join()`).

### Multiple Keys (`keys`)

```js
const items = [
  { title: 'Liechi Berry', meta: {desc: 'Raises Attack'}, tags: ['berries'] },
  { title: 'Petaya Berry', meta: {desc: 'Raises Sp. Attack'} },
]

const results = fuzzysort.go('attack berry', items, {
  keys: ['title', 'meta.desc', obj => obj.tags?.join()],
  scoreFn: r => r.score * (r.obj.bookmarked ? 2 : 1),
})

const r = results[0]
r[0].highlight() // 'Liechi <b>Berry</b>'
r[1].highlight() // 'Raises <b>Attack</b> when HP is low.'
r.score          // .84 — combined score
r.obj.title      // 'Liechi Berry'
```

## Performance Tips

```js
// Filter out long targets
targets = targets.filter(t => t.file.length < 1000)

// Prepare targets once, search many times
targets.forEach(t => t._prepared = fuzzysort.prepare(t.file))

// Use prepared targets directly (skip key lookup)
fuzzysort.go('gotta', targets.map(t => t._prepared))

// Set limit + threshold
fuzzysort.go('go', targets, { limit: 100, threshold: 0.5 })
```

## Result

```ts
interface Result {
  readonly score: number           // 0-1, 1 = perfect
  readonly target: string          // original target string
  readonly obj: T                  // original object (when using key/keys)
  indexes: ReadonlyArray<number>   // character indices matching search

  highlight(open?: string, close?: string): string
  highlight<T>(callback: (match: string, index: number) => T): (string | T)[]
}

interface Results extends ReadonlyArray<Result> {
  readonly total: number           // total matches before limit
}
```

## Notes

- Search with spaces splits into sub-searches that all must match (e.g., `"straw berry"` matches `"strawberry"`)
- Automatically handles diacritics/accents/ligatures
- Score is a getter/setter — `r.score = .3` may produce floating point artifacts
- v3.x changed score range from `-Infinity..0` to `0..1`
- `fuzzysort.go` returns results sorted best-first
