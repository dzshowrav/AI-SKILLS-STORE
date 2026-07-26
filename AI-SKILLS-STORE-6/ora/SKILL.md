---
name: ora
description: Elegant terminal spinner library by sindresorhus. Create loading spinners with text, colors, custom frames, prefix/suffix text. Supports `oraPromise` for async operations, status methods (succeed/fail/warn/info), and custom spinner animations.
---

# ora

Elegant terminal spinner for CLI tools. Uses `log-update` internally for rendering.

## Install

```sh
npm install ora
```

## Usage

```typescript
import ora from 'ora';

const spinner = ora('Loading unicorns').start();
setTimeout(() => {
  spinner.color = 'yellow';
  spinner.text = 'Loading rainbows';
}, 1000);
```

## API

### ora(text | options)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | string | — | Text displayed next to spinner |
| `prefixText` | string\|() => string | — | Text before spinner |
| `suffixText` | string\|() => string | — | Text after spinner text |
| `spinner` | string\|object | `'dots'` | Spinner name (see below) or `{ frames: string[], interval?: number }` |
| `color` | string\|false | `'cyan'` | `'black'\|'red'\|'green'\|'yellow'\|'blue'\|'magenta'\|'cyan'\|'white'\|'gray'` or `false` |
| `hideCursor` | boolean | true | Show/hide cursor while spinning |
| `indent` | number | 0 | Spaces to indent |
| `interval` | number | spinner default | Frame interval in ms |
| `stream` | stream.Writable | `process.stderr` | Output stream |
| `isEnabled` | boolean | auto | Force enable/disable spinner |
| `isSilent` | boolean | false | Suppress all output |
| `discardStdin` | boolean | true | Discard stdin while spinning |

### Instance Methods

| Method | Description |
|--------|-------------|
| `.start(text?)` | Start spinner. Returns instance |
| `.stop()` | Stop and clear spinner |
| `.succeed(text?)` | Stop with green ✔ |
| `.fail(text?)` | Stop with red ✖ |
| `.warn(text?)` | Stop with yellow ⚠ |
| `.info(text?)` | Stop with blue ℹ |
| `.stopAndPersist(options?)` | Stop with custom symbol/text |
| `.clear()` | Clear spinner |
| `.render()` | Manually render a new frame |
| `.frame()` | Get the next frame string |

### Instance Properties (get/set)

`.text`, `.prefixText`, `.suffixText`, `.color`, `.spinner`, `.indent`, `.isEnabled`, `.isSilent`

### Read-only

`.isSpinning`, `.interval`

### stopAndPersist Options

```typescript
{
  symbol?: string;     // default ' '
  text?: string;       // default current text
  prefixText?: string | (() => string);
  suffixText?: string | (() => string);
}
```

### oraPromise(action, text | options)

Start a spinner for a promise/async function. Auto-succeed/fail.

```typescript
import { oraPromise } from 'ora';

await oraPromise(somePromise, { text: 'Processing...' });

// With callbacks for dynamic text
await oraPromise(somePromise, {
  text: 'Loading...',
  successText: (result) => `Got ${result.length} items`,
  failText: (error) => `Failed: ${error.message}`,
  successSymbol: '✅',
  failSymbol: '❌',
});
```

## Provided Spinners

All spinners from `cli-spinners`. Common names:

`dots`, `dots2`, `dots3`, `dots4`, `dots5`, `dots6`, `dots7`, `dots8`, `dots9`, `dots10`, `dots11`, `dots12`, `line`, `line2`, `pipe`, `simpleDots`, `simpleDotsScrolling`, `star`, `star2`, `flip`, `hamburger`, `growVertical`, `growHorizontal`, `balloon`, `balloon2`, `noise`, `bounce`, `boxBounce`, `boxBounce2`, `triangle`, `arc`, `circle`, `squareCorners`, `circleQuarters`, `circleHalves`, `squish`, `toggle`, `toggle2`, `toggle3`, `toggle4`, `toggle5`, `toggle6`, `toggle7`, `toggle8`, `toggle9`, `toggle10`, `toggle11`, `toggle12`, `toggle13`, `arrow`, `arrow2`, `arrow3`, `bouncingBar`, `bouncingBall`, `smiley`, `monkey`, `hearts`, `clock`, `earth`, `moon`, `runner`, `pong`, `shark`, `dqpb`, `weather`, `christmas`, `grenade`, `point`, `layer`, `betaWave`, `fingerDance`, `fistBump`, `soccerHeader`

## Custom Spinner

```typescript
const spinner = ora({
  text: 'Thinking...',
  spinner: {
    frames: ['🧠', '💭', '✨'],
    interval: 200,
  },
}).start();
```

## FAQ

- **Change text color?** Use `chalk`/`yoctocolors` in the text string
- **Spinner freezes?** JavaScript is single-threaded — move sync work to worker threads or async APIs
- **CI/no-TTY?** Falls back to static text automatically; use `isEnabled` to override
- **Pin to bottom of terminal?** Use a separate `log-update` instance with `createLogUpdate` below the spinner

## Related

- `cli-spinners` — all available spinner frame definitions
- `yocto-spinner` — smaller alternative
- `log-update` — lower-level overwrite rendering

## Dependencies

```json
{
  "dependencies": {
    "ora": "^8.0.0",
    "cli-spinners": "^3.0.0",
    "stdin-discarder": "^0.2.0"
  }
}
```

## Target Processes

- cli-progress-rendering
- async-operation-feedback
- loading-indicators
