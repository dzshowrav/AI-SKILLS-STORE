---
name: cli-truncate
description: Truncate a string to a specific width in the terminal, handling ANSI escapes and Unicode.
license: MIT
metadata:
  version: "1.0.0"
  category: terminal
  tags: ["truncate", "ansi", "terminal", "width", "string"]
---

# cli-truncate

Truncate a string to a specific width in the terminal. Handles ANSI escapes, Unicode surrogate pairs, and fullwidth characters.

```typescript
import cliTruncate from 'cli-truncate'

cliTruncate('Hello World', 8)                          // 'Hello W…'
cliTruncate('Hello World', 8, { position: 'start' })  // '…o World'
cliTruncate('Hello World', 8, { position: 'middle' }) // 'Hell…rld'

// With styled text (ANSI escapes preserved)
import chalk from 'chalk'
cliTruncate(chalk.red('Hello World'), 8)

// Options
cliTruncate(text, columns, {
  position: 'end',                // 'start' | 'middle' | 'end'
  space: false,                   // add space before ellipsis
  preferTruncationOnSpace: false, // break at whitespace
  truncationCharacter: '…'       // custom ellipsis
})
```
