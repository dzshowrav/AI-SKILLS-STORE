---
name: shiki
description: Use when syntax highlighting code with Shiki (shikijs/shiki v4+). TRIGGER when code imports from 'shiki', '@shikijs/*', or the user mentions syntax highlighting, code highlighting, or Shiki.
---

# Shiki Skill

A beautiful syntax highlighter based on TextMate grammar. Accurate, powerful, and works in Node.js, browsers, and Cloudflare Workers.

## Installation

```bash
npm install shiki
```

## Bundles

### shiki (bundle-full)
All 200+ languages and 60+ themes bundled. Import from `'shiki'`.

```ts
import { createHighlighter } from 'shiki'
```

### shiki (bundle-web)
165 web-common languages (no desktop-only langs). Import from `'shiki'` — same entry.

### Fine-Grained (`shiki/core`)
No languages or themes bundled. Minimal size. Import from `'shiki/core'`.

```ts
import { createHighlighterCore } from 'shiki/core'
```

Sub-imports:
- `'shiki'` — full bundle
- `'shiki/core'` — fine-grained core
- `'shiki/wasm'` — Oniguruma WASM
- `'shiki/langs'` — dynamic language imports
- `'shiki/themes'` — dynamic theme imports
- `'shiki/types'` — type exports
- `'shiki/engine/javascript'` — JS regex engine
- `'shiki/engine/oniguruma'` — Oniguruma WASM engine
- `'shiki/textmate'` — textmate utilities
- `'shiki/bundle/full'` — full bundle entry
- `'shiki/bundle/web'` — web bundle entry

## Quick Start

```ts
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: ['nord'],
  langs: ['javascript'],
})

const html = highlighter.codeToHtml('const x = 1', { lang: 'js', theme: 'nord' })
```

Or use singleton shorthand (auto-loads on first call):

```ts
import { codeToHtml } from 'shiki'

const html = await codeToHtml('const x = 1', { lang: 'js', theme: 'nord' })
```

## Core API

### `createHighlighter(options)` / `createHighlighterCore(options)`
Async — loads WASM, languages, and themes upfront. Returns a `Highlighter` instance.

```ts
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: ['nord', 'vitesse-dark'],
  langs: ['javascript', 'typescript', 'python'],
  langAlias: { 'js': 'javascript', 'ts': 'typescript' }, // optional
  // engine: createOnigurumaEngine(import('shiki/wasm')), // default
  // engine: createJavaScriptRegexEngine(), // alternative JS engine
  warnings: true, // enable/disable warnings (default true)
})
```

Options interface:
```ts
interface BundledHighlighterOptions<L, T> {
  engine?: RegexEngine
  themes: (ThemeInput | T | SpecialTheme)[]
  langs: (LanguageInput | L | SpecialLanguage)[]
  langAlias?: Record<string, L>
  warnings?: boolean
}
```

Special languages: `'text'`, `'plaintext'`, `'txt'`, `'plain'` (plain text, no highlighting), `'ansi'` (ANSI escape codes).

Special theme: `'none'` (no styling, just plain text).

### `createHighlighterCoreSync(options)`
Synchronous version — requires all themes and languages to be pre-resolved objects (not dynamic imports).

### `getSingletonHighlighter(options)`
Returns a shared highlighter instance. Loads new langs/themes if called again with additions.

```ts
import { getSingletonHighlighter, codeToHtml } from 'shiki'

const highlighter = await getSingletonHighlighter({
  themes: ['nord'],
  langs: ['javascript'],
})
```

### Singleton Shorthands (from `'shiki'` and `'shiki/bundle/*'`)

Top-level functions that manage a singleton internally:

```ts
codeToHtml(code, options)       // highlight to HTML string
codeToHast(code, options)       // highlight to HAST AST
codeToTokens(code, options)     // highlight to tokens (single or multi theme)
codeToTokensBase(code, options) // highlight to 2D token array (single theme)
codeToTokensWithThemes(code, options) // highlight to tokens with multiple theme variants
getSingletonHighlighter(options) // get or create singleton
getLastGrammarState(code, options) // get grammar state for incremental highlighting
```

## Highlighting Methods

### `highlighter.codeToHtml(code, options)`
Returns an HTML string.

```ts
const html = highlighter.codeToHtml('const x = 1', {
  lang: 'javascript',
  theme: 'nord',
})
```

### `highlighter.codeToHast(code, options)`
Returns a HAST (Abstract Syntax Tree) root node.

```ts
import type { Root } from 'hast'

const hast: Root = highlighter.codeToHast('const x = 1', {
  lang: 'javascript',
  theme: 'nord',
})
```

### `highlighter.codeToTokens(code, options)`
Returns a tokens result — delegates to `codeToTokensWithThemes` or `codeToTokensBase` based on options.

```ts
const result = highlighter.codeToTokens('const x = 1', {
  lang: 'js',
  theme: 'nord',
})
// { tokens: ThemedToken[][], lang, theme, ... }
```

### `highlighter.codeToTokensBase(code, options)`
Returns 2D array of themed tokens (lines × tokens). Single theme.

```ts
const tokens: ThemedToken[][] = highlighter.codeToTokensBase('const x = 1', {
  lang: 'js',
  theme: 'nord',
})
```

### `highlighter.codeToTokensWithThemes(code, options)`
Returns 2D array of tokens with multiple theme variants. Each token has a `variants` property mapping theme names to styles.

```ts
const tokens = highlighter.codeToTokensWithThemes('const x = 1', {
  lang: 'js',
  themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
})
// tokens[0][0].variants = { light: { color: '#xxx' }, dark: { color: '#yyy' } }
```

### `highlighter.getLastGrammarState(code, options)`
Get the grammar state after tokenizing. Pass as `grammarState` to continue highlighting from an intermediate state (for incremental highlighting).

```ts
// First chunk
const state = highlighter.getLastGrammarState('const x =', {
  lang: 'js',
  theme: 'nord',
})

// Continue from state
const html = highlighter.codeToHtml(' 1', {
  lang: 'js',
  theme: 'nord',
  grammarState: state,
})
```

## CodeToHastOptions

```ts
interface CodeToHastOptions<Languages, Themes> {
  lang: Languages | SpecialLanguage
  theme: ThemeRegistrationAny | Themes            // single theme
  themes: Partial<Record<string, ThemeRegistrationAny | Themes>>  // multi-theme
  defaultColor?: 'light' | 'dark' | 'light-dark()' | false       // default 'light'
  colorsRendering?: 'css-vars' | 'none'           // default 'css-vars'
  cssVariablePrefix?: string                       // default '--shiki-'

  transformers?: ShikiTransformer[]                // transformer plugins
  decorations?: DecorationOptions[]                // inline decorations

  meta?: { __raw?: string; [key: string]: any }   // code block meta data

  rootStyle?: string | false                       // custom root <pre> style
  data?: Record<string, unknown>                   // data attributes on <pre>
  tabindex?: number | string | false               // default 0

  mergeWhitespaces?: boolean | 'never'             // default true
  mergeSameStyleTokens?: boolean                   // default false

  structure?: 'classic' | 'inline'                 // default 'classic'

  colorReplacements?: Record<string, string>       // replace colors in output
  tokenizeMaxLineLength?: number                   // truncate long lines
  tokenizeTimeLimit?: number                       // time limit per line (ms)
  grammarState?: GrammarState                      // continue from previous state
  grammarContextCode?: string                      // context code for embedded langs
  includeExplanation?: boolean                     // include token explanations
}
```

### Structure Modes

- `'classic'` (default): `<pre><code><span class="line">...</span></code></pre>`
- `'inline'`: Tokens as `<span>`s, line breaks as `<br>`. No `<pre>`/`<code>`. No default fg/bg.

## Dual / Multiple Themes

```ts
// Light + Dark with CSS variables
const html = highlighter.codeToHtml('const x = 1', {
  lang: 'js',
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  defaultColor: 'light',           // default: 'light'
  // defaultColor: 'dark',         // use dark as inline default
  // defaultColor: 'light-dark()', // use CSS light-dark() function
  // defaultColor: false,           // no inline default — app manages via CSS
})
```

Generated HTML uses `style="color:#{lightColor}; --shiki-dark:#{darkColor};"`.

### CSS Variable Prefix

```ts
const html = highlighter.codeToHtml(code, {
  lang: 'ts',
  themes: { light: 'github-light', dark: 'github-dark' },
  cssVariablePrefix: '--shiki-',   // default
  colorsRendering: 'css-vars',     // default
})
```

## Languages

### Bundled Languages (~200+)

Full list at `packages/shiki/src/langs-bundle-full.ts`. Key ones:
`abap`, `angular-html`, `angular-ts`, `astro`, `bat`, `c`, `clojure`, `cmake`, `cpp`, `csharp` (`c#`, `cs`), `css`, `csv`, `dart`, `diff`, `docker` (`dockerfile`), `elixir`, `elm`, `erlang` (`erl`), `fish`, `fortran-fixed-form`, `fortran-free-form`, `fsharp` (`f#`, `fs`), `gdscript` (`gd`), `gherkin`, `git-commit`, `git-rebase`, `gleam`, `glsl`, `go`, `graphql` (`gql`), `groovy`, `haskell` (`hs`), `hcl`, `html`, `http`, `hurl`, `ini` (`properties`), `java`, `javascript` (`js`, `cjs`, `mjs`), `jinja`, `json`, `json5`, `jsonc`, `jsonl`, `jsx`, `julia` (`jl`), `kotlin` (`kt`, `kts`), `latex`, `less`, `liquid`, `llvm`, `lua`, `luau`, `make` (`makefile`), `markdown` (`md`), `marko`, `matlab`, `mdx`, `mermaid` (`mmd`), `mojo`, `nextflow` (`nf`), `nginx`, `nim`, `nix`, `nushell` (`nu`), `objective-c` (`objc`), `ocaml`, `odin`, `openscad` (`scad`), `pascal`, `perl`, `php`, `powershell` (`ps`, `ps1`), `prisma`, `prolog`, `proto` (`protobuf`), `pug` (`jade`), `puppet`, `python` (`py`), `r`, `racket`, `razor`, `regexp` (`regex`), `ron`, `ruby` (`rb`), `rust` (`rs`), `sass`, `scala`, `scheme`, `scss`, `shellscript` (`bash`, `sh`, `shell`, `zsh`), `shellsession` (`console`), `solidity`, `sparql`, `sql`, `ssh-config`, `stylus` (`styl`), `svelte`, `swift`, `system-verilog`, `terraform` (`tf`, `tfvars`), `toml`, `ts-tags` (`lit`), `tsx`, `turtle`, `twig`, `typescript` (`ts`, `cts`, `mts`), `typst` (`typ`), `vb`, `verilog`, `vhdl`, `viml` (`vim`, `vimscript`), `vue`, `vue-html`, `vue-vine`, `wasm`, `wgsl`, `wikitext` (`mediawiki`, `wiki`), `wolfram` (`wl`), `xml`, `xsl`, `yaml` (`yml`), `zig`, `zenscript`

### Load Languages

```ts
// In constructor
const highlighter = await createHighlighter({
  themes: ['nord'],
  langs: ['javascript', 'typescript'],
})

// After construction
await highlighter.loadLanguage('python', 'rust')
await highlighter.loadLanguage(...['java', 'kotlin'] as const)
```

### Custom Language Registration

```ts
import type { LanguageRegistration } from 'shiki'

const myLang: LanguageRegistration = {
  name: 'my-lang',
  scopeName: 'source.my-lang',
  // ... TextMate grammar
}

const highlighter = await createHighlighter({
  themes: ['nord'],
  langs: [myLang],
})
```

### Embedded Languages

Some languages embed others (e.g., Markdown embeds JS, HTML embeds CSS). Shiki handles this automatically with lazy loading.

## Themes

### Bundled Themes (60+)

`andromeeda`, `aurora-x`, `ayu-dark`, `ayu-light`, `ayu-mirage`, `catppuccin-frappe`, `catppuccin-latte`, `catppuccin-macchiato`, `catppuccin-mocha`, `dark-plus`, `dracula`, `dracula-soft`, `everforest-dark`, `everforest-light`, `github-dark`, `github-dark-default`, `github-dark-dimmed`, `github-dark-high-contrast`, `github-light`, `github-light-default`, `github-light-high-contrast`, `gruvbox-dark-hard`, `gruvbox-dark-medium`, `gruvbox-dark-soft`, `gruvbox-light-hard`, `gruvbox-light-medium`, `gruvbox-light-soft`, `horizon`, `horizon-bright`, `houston`, `kanagawa-dragon`, `kanagawa-lotus`, `kanagawa-wave`, `laserwave`, `light-plus`, `material-theme`, `material-theme-darker`, `material-theme-lighter`, `material-theme-ocean`, `material-theme-palenight`, `min-dark`, `min-light`, `monokai`, `night-owl`, `night-owl-light`, `nord`, `one-dark-pro`, `one-light`, `plastic`, `poimandres`, `red`, `rose-pine`, `rose-pine-dawn`, `rose-pine-moon`, `slack-dark`, `slack-ochin`, `snazzy-light`, `solarized-dark`, `solarized-light`, `synthwave-84`, `tokyo-night`, `vesper`, `vitesse-black`, `vitesse-dark`, `vitesse-light`

### Load Themes

```ts
// In constructor
const highlighter = await createHighlighter({
  themes: ['nord', 'vitesse-dark'],
})

// After construction
await highlighter.loadTheme('github-dark', 'github-light')
```

### Custom Theme

```ts
const myTheme = {
  name: 'my-theme',
  type: 'dark' as const,
  fg: '#ffffff',
  bg: '#1e1e1e',
  settings: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#6a9955', fontStyle: 'italic' },
    },
  ],
}

const highlighter = await createHighlighter({
  themes: [myTheme, 'nord'],
  langs: ['javascript'],
})
```

### Theme Properties

```ts
interface ThemeRegistrationResolved {
  name: string
  displayName?: string
  type: 'light' | 'dark'
  settings: RawThemeSetting[]
  tokenColors?: RawThemeSetting[]    // fallback for settings
  fg: string                          // default foreground
  bg: string                          // default background
  colorReplacements?: Record<string, string>  // color substitution map
  colors?: Record<string, string>    // VS Code color map (for ANSI)
}
```

## Engines

### Oniguruma Engine (default)
Uses `vscode-oniguruma` WASM. Best compatibility — matches VS Code exactly.

```ts
import { createOnigurumaEngine, loadWasm } from 'shiki'

const engine = await createOnigurumaEngine(import('shiki/wasm'))

// Or with custom WASM loading
const engine = await createOnigurumaEngine({
  instantiator: async (importObject) => {
    const wasm = await fetch('/path/to/onig.wasm')
    return WebAssembly.instantiate(wasm, importObject)
  },
})
```

### JavaScript Regex Engine
Smaller bundle, no WASM. May not match all TextMate grammars exactly.

```ts
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

const engine = createJavaScriptRegexEngine()
```

### Custom Engine

```ts
import type { RegexEngine } from 'shiki'

const customEngine: RegexEngine = {
  createScanner(patterns) {
    // return a scanner matching patterns
    return {
      findNextMatchSync(string, startPosition) {
        // ... find next match
      },
      dispose() {},
    }
  },
  createString(s) {
    return {
      // ... string wrapper with TextMate-like API
    } as any
  },
}
```

## Transformers

Transformers hook into the highlighting pipeline to modify output.

```ts
import type { ShikiTransformer } from 'shiki'

const myTransformer: ShikiTransformer = {
  name: 'my-transformer',
  enforce: 'pre', // 'pre' | 'post' — execution order

  // Called before highlighting
  preprocess(code, options) { return code },

  // Called on tokens (before HAST conversion)
  tokens(tokens) { return tokens },

  // Called on HAST root
  root(root) { return root },

  // Called on <pre> element
  pre(element) { return element },

  // Called on <code> element
  code(element) { return element },

  // Called on each line
  line(element, line) { return element },

  // Called on each token span
  span(element, line, col, lineElement, token) { return element },

  // Called on final HTML string
  postprocess(html, options) { return html },
}
```

### Transformer Context

```ts
interface ShikiTransformerContext {
  meta: ShikiTransformerContextMeta
  options: CodeToHastOptions
  source: string                     // original source code
  tokens: ThemedToken[][]            // tokenized result
  root: Root                         // HAST root node
  pre: Element                       // <pre> element
  code: Element                      // <code> element
  lines: Element[]                   // line <span> elements

  codeToHast(code, options)          // re-highlight helper
  codeToTokens(code, options)        // re-tokenize helper
  addClassToHast(hast, className)    // utility to append CSS class
}
```

### Built-in Transformers (`@shikijs/transformers`)

```ts
import {
  transformerNotationDiff,          // // [!code ++] / [!code --]
  transformerNotationHighlight,     // // [!code highlight]
  transformerNotationFocus,         // // [!code focus]
  transformerNotationErrorLevel,    // // [!code error] / [!code warning]
  transformerNotationHighlightWord, // // [!code word:xxx]
  transformerMetaHighlight,         // {1,3-5} in code block header
  transformerMetaHighlightWord,     // /word/ in code block header
  transformerMetaMap,              // custom meta mapping
  transformerCompactLineOptions,    // compact line option format
  transformerRemoveLineBreak,       // remove line breaks
  transformerRemoveNotationEscape,  // remove escape markers
  transformerRenderWhitespace,      // render spaces/tabs (tab/space/␣)
  transformerStyleToClass,          // convert inline styles to CSS classes
  transformerRemoveComments,        // strip comments from code
  renderIndentGuides,              // render indent guide lines
} from '@shikijs/transformers'
```

Usage:

```ts
const html = highlighter.codeToHtml(code, {
  lang: 'ts',
  theme: 'nord',
  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerMetaHighlight(),
  ],
})
```

### transformerDecorations

Built-in to core — adds decoration elements (visible markers like inline highlights) to the HAST output.

```ts
import { transformerDecorations } from '@shikijs/core'

const html = highlighter.codeToHtml(code, {
  lang: 'ts',
  theme: 'nord',
  transformers: [transformerDecorations()],
})
```

## Decoration Options

Add inline decorations to specific ranges in code:

```ts
const html = highlighter.codeToHtml('const x = 1', {
  lang: 'ts',
  theme: 'nord',
  decorations: [
    {
      start: { line: 0, character: 0 },
      end: { line: 0, character: 5 },
      properties: { class: 'highlighted', style: 'background: yellow' },
      // or: hover, tag, etc.
    },
  ],
})
```

## Integrations

### rehype (`@shikijs/rehype`)

```ts
import rehypeShiki from '@shikijs/rehype'

const result = await unified()
  .use(rehypeShiki, {
    theme: 'nord',
    // themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
    langs: ['javascript', 'typescript'],  // default: all
    langAlias: { 'ts': 'typescript' },
    // transformers: [transformerNotationDiff()],
  })
  .process(markdown)
```

### markdown-it (`@shikijs/markdown-it`)

```ts
import MarkdownIt from 'markdown-it'
import markdownItShiki from '@shikijs/markdown-it'

const md = MarkdownIt()
md.use(await markdownItShiki({
  theme: 'nord',
  // themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
  langs: ['javascript', 'typescript'],
  langAlias: { 'ts': 'typescript' },
}))
```

### Twoslash (`@shikijs/twoslash`)
TypeScript type queries in code examples (shows types as hover-like annotations).

```ts
import { createHighlighter } from 'shiki'
import { twoslash } from '@shikijs/twoslash'

const highlighter = await createHighlighter({
  themes: ['nord'],
  langs: ['ts', 'twoslash'],
})

const html = highlighter.codeToHtml('const x: number = 1', {
  lang: 'ts',
  theme: 'nord',
  transformers: [
    twoslash({
      /* options */
    }),
  ],
})
```

### Monaco (`@shikijs/monaco`)
Use Shiki tokenization in Monaco Editor.

```ts
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor'

// After creating highlighter
shikiToMonaco(highlighter, monaco)
```

### VitePress (`@shikijs/vitepress-twoslash`)
Used in VitePress documentation sites.

### CLI (`@shikijs/cli`)
Command-line syntax highlighting to ANSI output.

```ts
import { codeToAnsi } from '@shikijs/cli'
console.log(await codeToAnsi('const x = 1', { lang: 'ts', theme: 'nord' }))
```

### Magic Move (`@shikijs/magic-move`)
Animated transitions between code snippets. Supports React, Solid, Svelte, Vue, and Web Components.

### Stream (`@shikijs/stream`)
Stream syntax highlighting — tokens are pushed as they're parsed. Supports React, Solid, Svelte, Vue.

### Markdown Exit (`@shikijs/markdown-exit`)
Shiki syntax highlighting for markdown-it with async support.

## ANSI Highlighting

Special lang `'ansi'`:

```ts
const html = highlighter.codeToHtml('\x1b[31mRed text\x1b[0m', {
  lang: 'ansi',
  theme: 'nord',
})
```

Also available as standalone:
```ts
import { codeToAnsi } from '@shikijs/cli'
```

## Incremental Highlighting

Use `getLastGrammarState` to continue highlighting from where you left off:

```ts
const state = highlighter.getLastGrammarState('function foo() {', {
  lang: 'js',
  theme: 'nord',
})
// ... later ...
const html = highlighter.codeToHtml('\n  return 42\n}', {
  lang: 'js',
  theme: 'nord',
  grammarState: state,
})
```

## Color Replacements

Replace specific colors in the output (useful for theme customization):

```ts
const html = highlighter.codeToHtml(code, {
  lang: 'js',
  theme: {
    ...nord,
    colorReplacements: {
      '#81a1c1': '#ff0000', // replace nord blue with red
    },
  },
})
```

Or via options:
```ts
const html = highlighter.codeToHtml(code, {
  lang: 'js',
  theme: 'nord',
  colorReplacements: {
    '#81a1c1': '#ff0000',
  },
})
```

## Performance Tips

- Use `getSingletonHighlighter` / singleton shorthands to reuse instances
- Pre-load all necessary langs/themes upfront to avoid lazy-loading overhead
- Use `shiki/core` with fine-grained imports for minimal bundle size
- Set `tokenizeMaxLineLength` and `tokenizeTimeLimit` for untrusted input
- Use `mergeWhitespaces: true` (default) to reduce DOM nodes
- Use `mergeSameStyleTokens: true` to merge consecutive identical tokens

## Package Architecture

| Package | Purpose |
|---------|---------|
| `shiki` | Main entry (bundle-full) |
| `@shikijs/core` | Core highlighting engine |
| `@shikijs/primitive` | Primitive textmate operations |
| `@shikijs/types` | TypeScript types |
| `@shikijs/engine-oniguruma` | Oniguruma WASM engine |
| `@shikijs/engine-javascript` | JS regex engine (no WASM) |
| `@shikijs/langs` | Language grammars |
| `@shikijs/langs-precompiled` | Pre-compiled language grammars |
| `@shikijs/themes` | Theme definitions |
| `@shikijs/transformers` | Built-in transformer plugins |
| `@shikijs/rehype` | rehype plugin |
| `@shikijs/markdown-it` | markdown-it plugin |
| `@shikijs/twoslash` | TypeScript twoslash integration |
| `@shikijs/monaco` | Monaco Editor integration |
| `@shikijs/cli` | CLI syntax highlighting |
| `@shikijs/magic-move` | Animated code transitions |
| `@shikijs/stream` | Streaming syntax highlighting |
| `@shikijs/markdown-exit` | Async markdown highlighting |
| `@shikijs/vitepress-twoslash` | VitePress twoslash plugin |
| `@shikijs/colorized-brackets` | Colorized bracket matching |
| `@shikijs/compat` | Deprecated v3/v2 compat |

## Important Notes

- Shiki v4 (main branch) uses the `@shikijs/vscode-textmate` package (not the deprecated `vscode-textmate`)
- v3.x is on the `v3` branch, v2.x on `v2`, v1.x on `v1`, v0.x (legacy) on `v0`
- Default engine is Oniguruma WASM via `createOnigurumaEngine(import('shiki/wasm'))`
- JS regex engine is lightweight but may not match all grammars perfectly
- All theme and language inputs accept lazy getters: `() => import(...)` or factory functions
- `lang: 'text'` / `'plaintext'` / `'txt'` renders plain text without highlighting
- `theme: 'none'` renders with no styling
- Use `highlighter.getBundledLanguages()` and `highlighter.getBundledThemes()` to inspect available resources
- Use `highlighter.getLoadedLanguages()` and `highlighter.getLoadedThemes()` to inspect loaded resources
- Call `highlighter.dispose()` to release resources when done
