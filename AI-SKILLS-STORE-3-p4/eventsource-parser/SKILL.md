---
name: eventsource-parser
description: Streaming parser for Server-Sent Events (SSE/EventSource). Feed chunks, get parsed events. Works in browsers, Node.js, Bun, Deno.
tags:
  - sse
  - eventsource
  - streaming
  - parser
  - javascript
  - typescript
version: '3.0'
author: rexxars
source: https://github.com/rexxars/eventsource-parser
---
# eventsource-parser

A streaming parser for [Server-Sent Events/EventSource](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events), framework-agnostic. Intended as a building block for SSE clients and polyfills.

## Installation

```sh
npm install eventsource-parser
```

## Basic Usage

```ts
import { createParser, type EventSourceMessage } from 'eventsource-parser'

const parser = createParser({
  onEvent(event: EventSourceMessage) {
    console.log('id:', event.id || '<none>')
    console.log('event:', event.event || '<none>')
    console.log('data:', event.data)
  },
})

for await (const chunk of sseStream) {
  parser.feed(chunk)
}

parser.reset()
```

## Stream Usage (TransformStream)

```ts
import { EventSourceParserStream } from 'eventsource-parser/stream'

const eventStream = response.body
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new EventSourceParserStream({
    maxBufferSize: 1024 * 1024,
    onError: 'terminate',
  }))
```

## Callbacks

- `onEvent` — called with `{ id?, event?, data }` on each complete message
- `onRetry(retryInterval)` — called when server sends a `retry` field
- `onError(ParseError)` — called on parse errors
- `onComment(string)` — called on comment lines (lines starting with `:`)
- `maxBufferSize` — cap buffered memory (in characters), emits `max-buffer-size-exceeded` error

## Error Types

| Type | Description |
|------|-------------|
| `invalid-field` | Malformed field line |
| `invalid-retry` | Invalid retry interval value |
| `max-buffer-size-exceeded` | Buffer exceeds `maxBufferSize` |

## Related

- [eventsource-client](https://github.com/rexxars/eventsource-client) — modern SSE client
- [eventsource-encoder](https://github.com/rexxars/eventsource-encoder) — encode messages as SSE format
- [eventsource](https://github.com/eventsource/eventsource) — Node.js EventSource polyfill

## References
- `references/src/` — full source
- `references/test/` — test suite
- `references/bench/` — benchmarks
- `references/CHANGELOG.md`
