# Tooling templates

Config templates for the code-quality layer. **Verify current versions before use** (`npm view <pkg> version`) — these age. Prefer the tool's own `init` command when one exists, then adapt.

## Version reference points (as of July 2026 — re-verify, these move fast)

These are anchors, not values to hardcode. Always confirm live. What they tell you is mostly *which major to target* and *what minimums to pin*:

| Tool | Current stable | Notes that affect scaffolding |
|------|---------------|-------------------------------|
| Node.js | 24.x = Active LTS; 22.x = Maintenance LTS; 20.x ≈ EOL (Apr 2026) | Pin an **even** LTS in `.nvmrc`/`engines`. Prefer 24 for new projects; 22 if a dependency lags. Never pin an odd/Current line for production. |
| ESLint | 10.x (v10.0 shipped Feb 2026) | **v10 dropped Node <20.19.** v9 hits EOL 2026-08-06 — start new projects on v10. Flat config only; `.eslintrc` is gone. |
| Next.js | 16.x | Turbopack is the **default** bundler; min Node 20+. Webpack-specific plugins need review. Requires React 19. |
| React | 19.x | `useFormState` → `useActionState`; bump `@types/react`/`@types/react-dom` together. |
| Angular | 22.x (GA ~May 2026) | Node range `^20.19 || ^22.12 || ^24`; standalone + signals are the norm. Use the Angular CLI generator. |
| TypeScript | check per-framework peer range | Frameworks pin a supported TS range — match it rather than always taking latest. |

The recurring lesson: majors have turned over since early-2025 training data (ESLint 8→10, Next 14→16, Angular to 22, Node LTS to 24). **Do not scaffold from memory.** Run the registry check in Phase 2 every time.

## Table of contents
- ESLint (flat config, TS)
- Prettier
- EditorConfig
- Path aliases (tsconfig + Vite / Next / Node)
- Husky + lint-staged
- commitlint (Conventional Commits)
- npm scripts
- Non-JS equivalents

---

## ESLint — flat config (`eslint.config.mjs`)

ESLint 10 (current) is flat-config-only; `.eslintrc` is fully removed. Name the file `eslint.config.mjs` (or `.js` with `"type": "module"`). Newer ESLint ships `defineConfig` and `globalIgnores` helpers (from `eslint/config`) that make config composable and ignores explicit. Generic TS example:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores(["dist/", "build/", "coverage/", ".next/", "node_modules/"]),
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier, // turns off rules that conflict with Prettier — keep LAST
]);
```

Notes:
- ESLint 10 requires **Node ≥ 20.19**; if the project pins older Node, either bump Node or stay on ESLint 9 (EOL 2026-08-06 — not advisable for a fresh project).
- To reuse `.gitignore` patterns, use `includeIgnoreFile()` from `@eslint/config-helpers` (the `@eslint/compat` one is deprecated).
- For React/Next/Angular/Vue, add the framework's official ESLint plugin/config and its recommended ruleset. Check the plugin's README for the current flat-config export name (some export arrays you must spread).

## Prettier (`.prettierrc.json`)

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

Add a `.prettierignore` (mirror the build/output dirs). Let the user override style prefs — don't impose.

## EditorConfig (`.editorconfig`)

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

## Path aliases

Aliases must resolve in **two** places: the TS type layer and the runtime/bundler. Setting only one breaks the other — always do both and test an actual import.

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

Then the resolver:

- **Vite** — install `vite-tsconfig-paths` and add it to `plugins`, or set `resolve.alias` manually.
- **Next.js** — reads `tsconfig` paths natively; nothing extra.
- **Node/ts-node/tsx** — use `tsconfig-paths` or the `imports` field in `package.json` (subpath imports like `#app/*`).
- **Jest** — set `moduleNameMapper`; **Vitest** — reuse the Vite alias.

## Husky + lint-staged

```bash
pnpm add -D husky lint-staged
pnpm exec husky init      # creates .husky/ and a prepare script
```

`.husky/pre-commit`:

```sh
pnpm exec lint-staged
```

`package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css,scss,html,yml,yaml}": ["prettier --write"]
  }
}
```

`husky init` adds `"prepare": "husky"` so hooks install on `pnpm install`.

## commitlint (optional, for Conventional Commits)

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

`commitlint.config.js`:

```js
export default { extends: ["@commitlint/config-conventional"] };
```

`.husky/commit-msg`:

```sh
pnpm exec commitlint --edit "$1"
```

## npm scripts (baseline)

```json
{
  "scripts": {
    "dev": "…framework dev…",
    "build": "…framework build…",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "prepare": "husky"
  }
}
```

## Non-JS equivalents

- **Python** — Ruff (lint + format, replaces Black/isort/flake8), `pre-commit` framework for hooks, `mypy`/`pyright` for types, `uv` or Poetry for deps. `pyproject.toml` holds tool config.
- **Java** — Spotless (format) + Checkstyle/PMD, Maven/Gradle plugins bound to the verify phase; Git hooks via a Maven `git-build-hook` plugin or `pre-commit`.
- **Rust** — `rustfmt` + `clippy` (both via `cargo`), `cargo-husky` for hooks. Aliases handled by Cargo workspaces.
- **Go** — `gofmt`/`goimports` + `golangci-lint`, hooks via `pre-commit` or `lefthook`.
