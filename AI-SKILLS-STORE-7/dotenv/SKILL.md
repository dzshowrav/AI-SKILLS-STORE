---
name: dotenv
description: Zero-dependency module that loads environment variables from .env files into process.env. Covers config, parse, CLI run, variable expansion, encryption, and multi-environment workflows.
tags:
  - dotenv
  - environment-variables
  - configuration
  - nodejs
  - secrets
version: '1.0'
author: motdotla
source: https://github.com/motdotla/dotenv
---
# dotenv

Dotenv loads environment variables from a `.env` file into `process.env`. Based on [The Twelve-Factor App](https://12factor.net/config) methodology.

## Installation

```sh
npm install dotenv --save
# bun add dotenv | yarn add dotenv | pnpm add dotenv | deno add dotenv
```

## Basic Usage

Create `.env` in project root:
```ini
HELLO="Dotenv"
OPENAI_API_KEY="your-api-key"
```

Load in your app (early as possible):
```js
require('dotenv').config()
// or import 'dotenv/config'  // ESM
console.log(`Hello ${process.env.HELLO}`)
```

## config() Options

| Option | Default | Description |
|--------|---------|-------------|
| `path` | `.env` | Custom path to .env file |
| `encoding` | `utf8` | File encoding |
| `debug` | `false` | Enable debug output |
| `override` | `false` | Override existing env vars |
| `processEnv` | `process.env` | Target object for parsed vars |

```js
require('dotenv').config({ path: '/custom/path/.env', debug: true, override: true })
```

## CLI

```bash
dotenv run -- node index.js
dotenv run -f .env.local -f .env -- node index.js
dotenv run --quiet -- node index.js
```

## parse()

Parses a String or Buffer into an object:
```js
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // { BASIC: 'basic' }
```

## dotenvx (Advanced)

The [dotenvx](https://github.com/dotenvx/dotenvx) CLI extends dotenv with:

- **Variable Expansion** — `${VAR_NAME}` references in .env files
- **Command Substitution** — `$(whoami)` in values
- **Encryption** — `dotenvx encrypt -f .env.production`, commit safely
- **Multiple Environments** — `.env`, `.env.production`, `.env.staging`
- **Syncing** — Encrypted .env files in git
- **Pre-commit Hook** — `dotenvx precommit --install`
- **Docker Prebuild** — `dotenvx prebuild`

```bash
dotenvx run -- node index.js
dotenvx encrypt -f .env.production
DOTENV_PRIVATE_KEY_PRODUCTION="<key>" dotenvx run -- node index.js
```

## Parsing Rules

- `BASIC=basic` → `{BASIC: 'basic'}`
- Empty lines skipped
- `#` comments (except inside quotes)
- Empty values become `''`
- Inner quotes maintained (JSON)
- Whitespace trimmed from unquoted values
- Single/double quoted values preserved
- Double quotes expand `\n` newlines
- Backticks supported

## FAQ

- **Commit .env?** No, unless encrypted with dotenvx
- **Multiple .env files?** One per environment (`.env`, `.env.production`)
- **Override existing vars?** Use `{ override: true }`
- **React?** Prefix with `REACT_APP_` or consult framework docs
- **Docker?** Use dotenvx prebuild hook
