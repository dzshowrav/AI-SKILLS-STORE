---
name: cli-spinners
description: 70+ spinner frame definitions for terminal CLIs. Provides frame arrays and recommended intervals for use with `ora` or custom spinner renderers. Includes `randomSpinner()` utility.
---

# cli-spinners

70+ terminal spinners with frame arrays and recommended intervals. Used by `ora` and other spinner libraries.

## Install

```sh
npm install cli-spinners
```

## Usage

```typescript
import cliSpinners from 'cli-spinners';

console.log(cliSpinners.dots);
// { interval: 80, frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'] }

import { randomSpinner } from 'cli-spinners';
console.log(randomSpinner());
// Random spinner from the full collection
```

## API

- `cliSpinners[name]` — `{ interval: number, frames: string[] }`
- `randomSpinner()` — returns a random spinner object

## Notable Spinners

`dots`, `dots2`–`dots12`, `line`, `pipe`, `simpleDots`, `star`, `flip`, `hamburger`, `growVertical`, `growHorizontal`, `balloon`, `noise`, `bounce`, `boxBounce`, `triangle`, `arc`, `circle`, `squareCorners`, `circleQuarters`, `circleHalves`, `squish`, `toggle`–`toggle13`, `arrow`, `bouncingBar`, `bouncingBall`, `smiley`, `monkey`, `hearts`, `clock`, `earth`, `moon`, `runner`, `pong`, `shark`, `weather`, `christmas`, `grenade`, `point`, `layer`, `betaWave`, `fingerDance`, `fistBump`, `soccerHeader`

## Target Processes

- cli-spinner-definitions
- terminal-animation-frames
