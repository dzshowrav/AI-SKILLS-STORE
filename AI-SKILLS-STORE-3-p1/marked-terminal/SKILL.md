---
name: marked-terminal
description: Render Markdown to ANSI-formatted terminal output using marked and marked-terminal.
license: MIT
metadata:
  version: "1.0.0"
  category: rendering
  tags: ["markdown", "terminal", "ansi", "marked", "renderer"]
---

# Marked Terminal

`marked-terminal` is a custom renderer for `marked` that outputs Markdown as styled ANSI terminal text with syntax highlighting, tables, and configurable colors.

## Usage

```typescript
import { marked } from 'marked'
import { markedTerminal } from 'marked-terminal'

marked.use(markedTerminal({
  code: chalk.yellow,
  blockquote: chalk.gray.italic,
  heading: chalk.green.bold,
  firstHeading: chalk.magenta.underline.bold,
  link: chalk.blue,
  href: chalk.blue.underline,
  width: 80,
  reflowText: false,
  emoji: true,
  unescape: true,
  tableOptions: {}
}))

const html = await marked.parse('# Hello\n**markdown** in terminal')
```

## Options

- `code` / `codespan` — inline code style
- `blockquote` — blockquote style
- `heading` / `firstHeading` — heading styles
- `link` / `href` — link styles
- `width` — reflow width (default: 80)
- `reflowText` — enable text reflow
- `emoji` — show emoji (default: true)
- `tableOptions` — passed to cli-table3
- `unescape` — undo HTML escaping
