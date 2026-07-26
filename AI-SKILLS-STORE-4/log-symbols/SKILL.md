---
name: log-symbols
description: Colored symbols for log levels (info, success, warning, error) using the `log-symbols` library. Includes fallbacks for Windows CMD limited charset.
---

# log-symbols

Colored symbols for common log levels with Windows CMD fallbacks.

## Install

```sh
npm install log-symbols
```

## Usage

```typescript
import logSymbols from 'log-symbols';

console.log(logSymbols.success, 'Finished successfully!');
console.log(logSymbols.info, 'Something to know');
console.log(logSymbols.warning, 'Proceed with caution');
console.log(logSymbols.error, 'Something went wrong');
```

## API

| Symbol | Level | Unicode | Fallback |
|--------|-------|---------|----------|
| `logSymbols.info` | Info | ℹ | i |
| `logSymbols.success` | Success | ✔ | √ |
| `logSymbols.warning` | Warning | ⚠ | ‼ |
| `logSymbols.error` | Error | ✖ | × |

## Related

- `figures` — Unicode symbols with Windows CMD fallbacks

## Target Processes

- cli-output-formatting
- logging
