---
name: slice-ansi
description: Slice a string containing ANSI escape codes by visible column index using the `slice-ansi` library. Preserves ANSI styling in the extracted substring.
---

# slice-ansi

Slice a string with ANSI escape codes by visible column index. Grapheme clusters (emoji, combining marks) are kept intact.

## Install

```sh
npm install slice-ansi
```

## Usage

```typescript
import chalk from 'chalk';
import sliceAnsi from 'slice-ansi';

const string = 'The quick brown ' + chalk.red('fox jumped over ') + 'the lazy ' + chalk.green('dog and then ran away with the unicorn.');
console.log(sliceAnsi(string, 20, 30));
```

## API

### sliceAnsi(string, startSlice, endSlice?)

- `startSlice` — zero-based visible column index
- `endSlice` — zero-based visible column index (excluded if crossing a grapheme cluster)

## Related

- `wrap-ansi` — wordwrap ANSI strings
- `cli-truncate` — truncate string to terminal width

## Target Processes

- cli-output-formatting
- text-substring
