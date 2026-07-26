# ai-streaming

[![npm version](https://img.shields.io/npm/v/ai-streaming.svg)](https://www.npmjs.com/package/ai-streaming)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

SSE streaming utilities for LLM responses. Server-Sent Events for OpenAI, Anthropic. Next.js, Express support.

## Quick Start

```bash
# Generate streaming utilities
npx ai-streaming init

# For Express
npx ai-streaming init --framework express
```

## Features

- 🌊 **SSE streaming** - Real-time LLM responses
- 🔌 **Multi-provider** - OpenAI and Anthropic support
- ⚡ **Framework support** - Next.js, Express, vanilla
- 📱 **Client consumption** - Easy frontend integration

## Installation

```bash
npx ai-streaming init
npm install ai-streaming
```

## Generated Code

### Next.js App Router

```typescript
// app/api/chat/route.ts
import { streamOpenAI } from '@/lib/streaming';

export async function POST(req: Request) {
  const { messages } = await req.json();
  return streamOpenAI(messages);
}
```

### Express

```typescript
import { expressStreamOpenAI } from 'ai-streaming';

app.post('/api/chat', expressStreamOpenAI());
```

### Client Side

```typescript
import { consumeStream } from 'ai-streaming';

const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages }),
});

await consumeStream(response, (chunk) => {
  console.log(chunk); // Real-time chunks
});
```

## Programmatic Usage

```typescript
import {
  streamOpenAI,
  streamOpenAIGenerator,
  streamAnthropic,
  createSSEStream,
  consumeStream,
} from 'ai-streaming';

// Return streaming Response
const response = await streamOpenAI(messages);

// Use as async generator
for await (const chunk of streamOpenAIGenerator(messages)) {
  process.stdout.write(chunk);
}

// Create custom SSE stream
const { stream, controller } = createSSEStream();
controller.write('Hello');
controller.close();
```

## Part of the LXGIC Dev Toolkit

One of 110+ free developer tools from LXGIC Studios.

- GitHub: https://github.com/lxgicstudios
- Twitter: https://x.com/lxgicstudios
- Website: https://lxgicstudios.com

## License

MIT. Free forever.
