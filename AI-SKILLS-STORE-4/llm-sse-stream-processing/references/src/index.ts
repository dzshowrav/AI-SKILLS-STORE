/**
 * ai-streaming
 * SSE streaming utilities for LLM responses
 * 
 * @packageDocumentation
 */

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

// ============================================================================
// Types
// ============================================================================

export interface StreamController {
  write(data: string): void;
  writeJSON(data: any): void;
  close(): void;
  error(err: Error): void;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

// ============================================================================
// SSE Stream Utilities
// ============================================================================

/**
 * Create an SSE stream with controller
 */
export function createSSEStream(): {
  stream: ReadableStream<Uint8Array>;
  controller: StreamController;
} {
  const encoder = new TextEncoder();
  let streamController: ReadableStreamDefaultController<Uint8Array>;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
    },
  });

  const controller: StreamController = {
    write(data: string) {
      streamController.enqueue(encoder.encode(`data: ${data}\n\n`));
    },
    writeJSON(data: any) {
      streamController.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    },
    close() {
      streamController.enqueue(encoder.encode('data: [DONE]\n\n'));
      streamController.close();
    },
    error(err: Error) {
      streamController.enqueue(encoder.encode(`data: ${JSON.stringify({ error: err.message })}\n\n`));
      streamController.close();
    },
  };

  return { stream, controller };
}

/**
 * Get SSE response headers
 */
export function sseHeaders(): Record<string, string> {
  return {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  };
}

// ============================================================================
// OpenAI Streaming
// ============================================================================

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Stream OpenAI chat completion
 */
export async function streamOpenAI(
  messages: Message[],
  options: StreamOptions = {}
): Promise<Response> {
  const {
    model = 'gpt-4-turbo',
    temperature = 0.7,
    maxTokens = 4096,
    systemPrompt,
  } = options;

  const { stream, controller } = createSSEStream();

  const apiMessages: OpenAI.ChatCompletionMessageParam[] = [];
  if (systemPrompt) {
    apiMessages.push({ role: 'system', content: systemPrompt });
  }
  apiMessages.push(...messages.map(m => ({ role: m.role, content: m.content })));

  (async () => {
    try {
      const response = await openai.chat.completions.create({
        model,
        messages: apiMessages,
        temperature,
        max_tokens: maxTokens,
        stream: true,
      });

      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.write(content);
        }
      }
      controller.close();
    } catch (error) {
      controller.error(error instanceof Error ? error : new Error('Stream failed'));
    }
  })();

  return new Response(stream, { headers: sseHeaders() });
}

/**
 * Stream OpenAI as async generator
 */
export async function* streamOpenAIGenerator(
  messages: Message[],
  options: StreamOptions = {}
): AsyncGenerator<string> {
  const {
    model = 'gpt-4-turbo',
    temperature = 0.7,
    maxTokens = 4096,
    systemPrompt,
  } = options;

  const apiMessages: OpenAI.ChatCompletionMessageParam[] = [];
  if (systemPrompt) {
    apiMessages.push({ role: 'system', content: systemPrompt });
  }
  apiMessages.push(...messages.map(m => ({ role: m.role, content: m.content })));

  const response = await openai.chat.completions.create({
    model,
    messages: apiMessages,
    temperature,
    max_tokens: maxTokens,
    stream: true,
  });

  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) yield content;
  }
}

// ============================================================================
// Anthropic Streaming
// ============================================================================

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Stream Anthropic chat completion
 */
export async function streamAnthropic(
  messages: Message[],
  options: StreamOptions = {}
): Promise<Response> {
  const {
    model = 'claude-3-5-sonnet-20241022',
    maxTokens = 4096,
    systemPrompt,
  } = options;

  const { stream, controller } = createSSEStream();

  const apiMessages = messages
    .filter(m => m.role !== 'system')
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

  (async () => {
    try {
      const response = anthropic.messages.stream({
        model,
        max_tokens: maxTokens,
        ...(systemPrompt && { system: systemPrompt }),
        messages: apiMessages,
      });

      for await (const event of response) {
        if (event.type === 'content_block_delta') {
          const delta = event.delta;
          if ('text' in delta) {
            controller.write(delta.text);
          }
        }
      }
      controller.close();
    } catch (error) {
      controller.error(error instanceof Error ? error : new Error('Stream failed'));
    }
  })();

  return new Response(stream, { headers: sseHeaders() });
}

/**
 * Stream Anthropic as async generator
 */
export async function* streamAnthropicGenerator(
  messages: Message[],
  options: StreamOptions = {}
): AsyncGenerator<string> {
  const {
    model = 'claude-3-5-sonnet-20241022',
    maxTokens = 4096,
    systemPrompt,
  } = options;

  const apiMessages = messages
    .filter(m => m.role !== 'system')
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

  const response = anthropic.messages.stream({
    model,
    max_tokens: maxTokens,
    ...(systemPrompt && { system: systemPrompt }),
    messages: apiMessages,
  });

  for await (const event of response) {
    if (event.type === 'content_block_delta') {
      const delta = event.delta;
      if ('text' in delta) {
        yield delta.text;
      }
    }
  }
}

// ============================================================================
// Client-Side Consumption
// ============================================================================

export interface ConsumeOptions {
  onChunk?: (chunk: string) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: Error) => void;
}

/**
 * Consume SSE stream from fetch response
 */
export async function consumeStream(
  response: Response,
  options: ConsumeOptions = {}
): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let fullText = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              options.onError?.(new Error(parsed.error));
              return fullText;
            }
          } catch {
            fullText += data;
            options.onChunk?.(data);
          }
        }
      }
    }

    options.onComplete?.(fullText);
    return fullText;
  } catch (error) {
    options.onError?.(error instanceof Error ? error : new Error('Stream failed'));
    throw error;
  }
}

/**
 * Fetch and consume stream in one call
 */
export async function fetchAndConsume(
  url: string,
  body: any,
  options: ConsumeOptions = {}
): Promise<string> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return consumeStream(response, options);
}

// ============================================================================
// Express Middleware
// ============================================================================

/**
 * Express middleware for streaming OpenAI
 */
export function expressStreamOpenAI(options: StreamOptions = {}) {
  return async (req: any, res: any) => {
    const { messages } = req.body;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      for await (const chunk of streamOpenAIGenerator(messages, options)) {
        res.write(`data: ${chunk}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error) {
      res.write(`data: ${JSON.stringify({ error: 'Stream failed' })}\n\n`);
      res.end();
    }
  };
}

/**
 * Express middleware for streaming Anthropic
 */
export function expressStreamAnthropic(options: StreamOptions = {}) {
  return async (req: any, res: any) => {
    const { messages } = req.body;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      for await (const chunk of streamAnthropicGenerator(messages, options)) {
        res.write(`data: ${chunk}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error) {
      res.write(`data: ${JSON.stringify({ error: 'Stream failed' })}\n\n`);
      res.end();
    }
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a streaming response for Next.js App Router
 */
export function nextStreamResponse(
  generator: AsyncGenerator<string>,
  headers?: Record<string, string>
): Response {
  const { stream, controller } = createSSEStream();

  (async () => {
    try {
      for await (const chunk of generator) {
        controller.write(chunk);
      }
      controller.close();
    } catch (error) {
      controller.error(error instanceof Error ? error : new Error('Stream failed'));
    }
  })();

  return new Response(stream, {
    headers: { ...sseHeaders(), ...headers },
  });
}

/**
 * Stream with timeout
 */
export async function* streamWithTimeout<T>(
  generator: AsyncGenerator<T>,
  timeoutMs: number
): AsyncGenerator<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Stream timeout')), timeoutMs);
  });

  const iterator = generator[Symbol.asyncIterator]();

  while (true) {
    const result = await Promise.race([
      iterator.next(),
      timeoutPromise,
    ]);

    if (result.done) break;
    yield result.value;
  }
}
