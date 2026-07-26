---
name: eslint-for-ai
description: Custom ESLint rules targeting bad patterns commonly written by LLMs/AI coding assistants. Setup, rule reference, and flat config usage. Trigger when: Setting up ESLint for an AI-assisted project, configuring ESLint to catch LLM-generated code patterns, or user mentions "eslint-for-ai" or "AI ESLint rules".
---

# eslint-for-ai

npm package by eli0shin providing custom ESLint rules that catch patterns AI assistants frequently generate.

## Install

```bash
npm install --save-dev eslint-for-ai
```

## Usage (ESLint 9+ Flat Config)

```js
// eslint.config.mjs
import ai from 'eslint-for-ai';

export default [
  ai.configs.recommended,
  // your other configs...
];
```

## Rules

| Rule | Description | Fix |
|------|-------------|-----|
| `for-ai/no-bare-wrapper` | Disallow functions that only delegate to another function | — |
| `for-ai/no-code-after-try-catch` | Disallow dead code after try/catch block in a function | — |
| `for-ai/no-constant-assertion` | Disallow useless `as SomeType` type assertions | ✅ |
| `for-ai/no-interface` | Disallow `interface` declarations (prefer `type` aliases) | ✅ |
| `for-ai/no-mock-only-test` | Disallow test files with mocks but no real assertions | — |
| `for-ai/no-standalone-class` | Disallow classes that don't extend another class | — |

### for-ai/no-bare-wrapper

Functions that do nothing but call another function. AI often generates delegation wrappers unnecessarily.

```ts
// Bad
const myFn = (x: number) => otherFn(x);

// Better — alias or use directly
const myFn = otherFn;
```

### for-ai/no-code-after-try-catch

Code placed after try/catch at the end of a function body is unreachable.

```ts
// Bad
function load() {
  try {
    return parse(raw);
  } catch {
    return null;
  }
  cleanup(); // never reached
}
```

### for-ai/no-constant-assertion

Type assertions that don't change the type. Often added by AI "just in case".

```ts
// Bad
const x = fn() as SomeType;

// Good
const x = fn();
```

### for-ai/no-interface

AI often defaults to `interface` over `type`. This rule enforces `type` aliases.

```ts
// Bad
interface Props {
  name: string;
}

// Good
type Props = {
  name: string;
};
```

### for-ai/no-mock-only-test

Test files where mocks/vitest.mock are declared but no assertions exist.

```ts
// Bad — mocks but no test
vi.mock('../db');
vi.mock('../queue');

// Good
vi.mock('../db');
it('works', () => { expect(true).toBe(true); });
```

### for-ai/no-standalone-class

Classes that don't extend anything. AI often creates classes when plain functions or objects would suffice.

```ts
// Bad
class Calculator {
  add(a: number, b: number) { return a + b; }
}

// Good
function add(a: number, b: number) { return a + b; }
```

## Bundled Config

The `recommended` config includes:

- ESLint 9+ flat config
- `@typescript-eslint/strict`
- `eslint-plugin-import-x`
- `eslint-plugin-react-hooks`
- `@eslint-react`
- `no-console` ban
- Dynamic import ban
