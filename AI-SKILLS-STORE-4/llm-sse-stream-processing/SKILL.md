---
name: llm-sse-stream-processing
description: Stream LLM responses in real-time using Server-Sent Events (SSE). Covers OpenAI, Anthropic, Next.js App Router, Express, async generators, and frontend consumption.
tags:
  - sse
  - streaming
  - llm
  - openai
  - anthropic
  - nextjs
  - express
  - claude
  - gpt
  - real-time
version: '1.0'
author: lxgicstudios
source: https://github.com/lxgicstudios/ai-streaming
---
# LLM & SSE Stream Processing

Production-ready patterns for real-time LLM token streaming via Server-Sent Events.

## Installation

```sh
npm install ai-streaming
# or use directly via npx
npx ai-streaming init
```

## SSE Protocol Basics

```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

data: {"token": "Hello"}

data: {"token": " world"}

data: [DONE]
```

## OpenAI Streaming

```ts
import { streamOpenAI, streamOpenAIGenerator } from 'ai-streaming'

// Return streaming Response (Next.js/Edge compatible)
const response = await streamOpenAI([
  { role: 'user', content: 'Hello' }
])

// Use as async generator
for await (const chunk of streamOpenAIGenerator(messages)) {
  process.stdout.write(chunk)
}
```

## Anthropic Streaming

```ts
import { streamAnthropic, streamAnthropicGenerator } from 'ai-streaming'

// Return streaming Response
const response = await streamAnthropic(messages)

// Use as async generator
for await (const chunk of streamAnthropicGenerator(messages)) {
  process.stdout.write(chunk)
}
```

## Express Middleware

```ts
import { expressStreamOpenAI, expressStreamAnthropic } from 'ai-streaming'

app.post('/api/chat/openai', expressStreamOpenAI({ model: 'gpt-4-turbo' }))
app.post('/api/chat/anthropic', expressStreamAnthropic())
```

## Next.js App Router

```ts
// app/api/chat/route.ts
import { nextStreamResponse, streamOpenAIGenerator } from 'ai-streaming'

export async function POST(req: Request) {
  const { messages } = await req.json()
  return nextStreamResponse(streamOpenAIGenerator(messages))
}
```

## Frontend Consumption

```ts
import { consumeStream, fetchAndConsume } from 'ai-streaming'

const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages }),
})

const fullText = await consumeStream(response, {
  onChunk: (chunk) => console.log('token:', chunk),
  onComplete: (text) => console.log('done:', text),
  onError: (err) => console.error(err),
})

// Or one-liner
const result = await fetchAndConsume('/api/chat', { messages })
```

## Low-Level SSE API

```ts
import { createSSEStream, sseHeaders } from 'ai-streaming'

const { stream, controller } = createSSEStream()
controller.write('Hello')       // SSE data frame
controller.writeJSON({ foo: 1 })// JSON data frame
controller.close()               // [DONE] + close
controller.error(new Error())    // error frame + close

// Use with any Response
return new Response(stream, { headers: sseHeaders() })
```

## Timeout Handling

```ts
import { streamWithTimeout } from 'ai-streaming'

for await (const chunk of streamWithTimeout(streamOpenAIGenerator(messages), 30000)) {
  process.stdout.write(chunk)
}
```

## Options

```ts
interface StreamOptions {
  model?: string           // default: gpt-4-turbo / claude-3-5-sonnet
  temperature?: number     // default: 0.7
  maxTokens?: number       // default: 4096
  systemPrompt?: string
}
```

## References
- `references/src/` — full source
- `references/README.md`
- `references/package.json`
