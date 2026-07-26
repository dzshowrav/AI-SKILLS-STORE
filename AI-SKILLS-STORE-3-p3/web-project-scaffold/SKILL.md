---
name: web-project-scaffold
description: Bootstrap a new web or app project professionally, in any stack, from empty folder to a running, lint-clean, well-structured codebase. Use this skill whenever the user wants to start, create, scaffold, bootstrap, or set up a new project, app, frontend, backend, fullstack app, API, service, or website — even if they only name a framework ("crée-moi une app Next", "set up a Spring Boot API", "new FastAPI service", "start a Rails app", "SvelteKit project", "un backend Go"). Stack-agnostic: covers JS/TS (React, Next, Angular, Vue, Svelte, Nest, Fastify), Python (FastAPI, Django, uv/Ruff), Java (Spring Boot), .NET, Go, Ruby on Rails, PHP/Laravel, and mobile (Expo, Flutter). Do NOT assume the stack, versions, or structure: always interview the user first and always check current framework/tool versions before generating anything. Also triggers on requests to add code-quality tooling (ESLint, Prettier, Husky, Ruff, Spotless, path aliases, commit hooks) or to define a front/back contract before building.
---

# Web Project Scaffold

Turn an idea into a professional, production-shaped project skeleton. The goal is a codebase a senior engineer would recognize as clean: sensible structure, current dependency versions, code-quality tooling wired in, and — for fullstack projects — a front/back contract agreed before any code is written.

The cardinal rule: **assume nothing, verify everything.** Stacks, best practices, and especially versions drift constantly. Never generate a `package.json`, `pom.xml`, or config from memory. Interview, then check the real current state, then scaffold, then verify the result actually runs.

Work through the phases below in order. Don't skip the interview even if the user gave you a framework name — a framework is not a spec.

---

## Phase 1 — Interview (never skip)

Gather the information needed to make good decisions. Ask only what you can't already infer from the conversation. When you have several unknowns, batch them into one `ask_user_input_v0` call with tappable options rather than a wall of prose questions.

Essential to establish before proceeding:

- **Project type**: frontend-only, backend-only, or fullstack (front + back)?
- **Scale & intent**: throwaway/prototype, side project, or production app meant to grow? This drives how much structure and tooling to add — don't over-engineer a weekend prototype, don't under-structure something headed for a team.
- **Stack per layer**: framework/language for each side. If the user is unsure, propose 2–3 current, sensible options for their use case and let them pick — don't silently choose.
- **Package manager**: npm / pnpm / yarn / bun (JS), or the relevant build tool (Maven/Gradle, uv/poetry, cargo…). Default to pnpm for JS and note it if they don't care.
- **Language flavor**: TypeScript vs JavaScript (default to TS for anything non-trivial and say why), strictness expectations.
- **Styling / UI** (if frontend): plain CSS, Tailwind, CSS-in-JS, a component library? Check what's current for their framework.
- **Database / ORM** (if backend): which DB, which ORM/query layer, migrations tool.
- **Auth, testing, CI**: whether they want these scaffolded now or later.
- **Monorepo vs separate repos** (if fullstack): single repo with workspaces, or two independent projects?
- **Deployment target** if known (Vercel, Firebase Hosting, a VPS, Docker…) — it affects config (e.g. SSR vs static output).

If the user resists a long interview ("just set it up"), collect the 2–3 blockers you genuinely can't proceed without (type, stack, scale) and state your other assumptions inline as you go so they can correct you.

## Phase 2 — Research current state (mandatory before generating anything)

Your training data is stale on versions and best practices. Before writing a single dependency or config, verify the current reality:

- **Latest stable versions** of every framework and major tool involved — use `web_search` / `web_fetch`, or query the registry directly (`npm view <pkg> version`, `npm view <pkg> dist-tags`, `pip index versions <pkg>`, `cargo search`, Maven Central). Prefer the registry for exact numbers.
- **Current recommended setup path**: many frameworks have an official CLI or `create-*` command that is the blessed way to start (e.g. `create-next-app`, `create-vite`, Angular CLI, Spring Initializr, `create-t3-app`). Use the official generator when one exists rather than hand-assembling files — then layer your improvements on top. Check its current flags; they change.
- **Breaking changes / migration notes** for the major version you'll use, so the structure you produce isn't outdated on day one (e.g. React Server Components conventions, Angular standalone/signals, ESLint flat config, Tailwind v4 config changes).
- **Peer-dependency and Node/runtime version** requirements — pin a Node version (`.nvmrc` / `engines`) that the chosen tools actually support.

Briefly tell the user what versions you found and what you're about to use, especially if it differs from what they might expect. If a tool had a recent major release that changes the setup, flag it.

Why this phase is non-negotiable: the JS ecosystem turns majors over roughly twice a year, and several have flipped recently in ways that change setup — e.g. ESLint moved to v10 (flat-config-only, drops old Node), Next.js to v16 (Turbopack default), Angular past v22, and Node's Active LTS to the 24 line. Anything you "remember" about versions is probably a major or two behind. Check, don't recall.

See `references/tooling.md` for a dated version-reference table and concrete JS/TS setup snippets, and `references/ecosystems.md` for per-stack anchors (current major, the **official generator** to prefer, runtime minimums, and quality tooling) across JS/TS, Python, Java, .NET, Go, Rails, PHP, and mobile. Read the section matching the chosen stack. Both files are dated and age — still verify live.

## Phase 3 — Propose structure (scaled to the project)

Present a folder structure sized to the project's scale and needs — not a one-size template. Show it to the user and get a nod before generating.

Guidance:

- **Prototype**: flat and minimal. Don't impose feature-folders, barrels, or layered architecture on something that's 5 files.
- **Side project / growing app**: feature-based or domain-based organization, clear separation of concerns, a `src/` root, a place for shared utilities and types.
- **Production / team**: stronger boundaries — e.g. layered or hexagonal for backends, feature modules for frontends, a dedicated `types`/`contracts` location, config isolated from code.
- **Fullstack monorepo**: a workspace layout (`apps/` + `packages/`) with a **shared package for the API contract / types** consumed by both sides.

Explain *why* the proposed structure fits their scale in a sentence or two. Offer the alternative if there's a reasonable one. `references/structures.md` has example layouts per project type and scale to adapt from.

## Phase 4 — Define the front/back contract (fullstack only, before scaffolding)

For any project with both a frontend and a backend, agree the interface **before** generating either side. This is what lets the two halves be built independently without integration pain.

Produce a contract artifact and get the user's sign-off. It should specify:

- **Endpoints / operations**: method, path, purpose.
- **Request & response shapes**: as typed schemas — TypeScript types, an OpenAPI/Swagger spec, Zod schemas, or `.proto` files, whichever fits the stack.
- **Error model**: status codes and error body shape.
- **Auth**: how requests are authenticated (token in header, cookie/session…).
- **Versioning & base URL** conventions.

Prefer a **single source of truth** both sides import: a shared `packages/contracts` (or `shared/`) package exporting types/schemas, or an OpenAPI file that generates a client. This is the backbone of the multi-side scaffolding — put it in place first, then generate front and back against it so their types line up from commit one.

If you have subagents available, you can scaffold the two sides in parallel once the contract exists; otherwise do them sequentially, contract first. Either way, both sides are generated *from* the agreed contract, not improvised.

## Phase 5 — Scaffold

Generate the project. Order of operations:

1. Run the official generator (from Phase 2) if one exists, non-interactively where possible.
2. Reshape into the agreed structure (Phase 3).
3. Wire the shared contract package (Phase 4) if fullstack.
4. Add code-quality tooling (Phase 6) — this is a required part of "professional", not optional polish.
5. Add path aliases, env handling, and a real README.
6. Commit-hook layer last, so hooks don't fire on the scaffolding commits before the tooling is even installed.

Create files with real, working starter content — a minimal but runnable entrypoint on each side, one example of the contract in use end-to-end if fullstack — not empty stubs.

## Phase 6 — Code-quality tooling (required, not optional)

A professional scaffold ships with these wired and working. Adapt tool choices to the stack — the list below is the JS/TS default; for other ecosystems use the equivalents (Ruff/Black + pre-commit for Python, Spotless/Checkstyle for Java, `rustfmt` + `clippy` for Rust) and say so.

- **Formatter** — Prettier (JS/TS) with a committed config, or the ecosystem equivalent (Ruff format for Python, Spotless/google-java-format for Java, `gofmt` for Go, RuboCop for Ruby, Pint for PHP, `dotnet format` for .NET). Add a `format` script/task.
- **Linter** — ESLint using **flat config** (`eslint.config.mjs`) on current versions (ESLint 10) with the framework's recommended ruleset and TS support; or the ecosystem equivalent (Ruff for Python, Checkstyle/PMD for Java, `golangci-lint` for Go, RuboCop for Ruby, PHPStan/Larastan for PHP, Roslyn analyzers for .NET). Wire it to not fight the formatter. Add a `lint` / `lint:fix` task.
- **Path aliases** (JS/TS) — set up `@/…` (or a scheme the user prefers) in both `tsconfig.json` (`paths`) **and** the bundler/runtime resolver (Vite, Next, ts-node, Jest…) so they resolve at build and at type-check. Aliases that only exist in `tsconfig` and break at runtime are a classic trap — verify both. Other ecosystems have their own module-path mechanisms (Python `src/` layout, Java packages, Go modules) — set them up idiomatically.
- **Git hooks** — Husky (or `simple-git-hooks` / `lefthook`) + **lint-staged** for JS/TS; the **pre-commit** framework or `lefthook` for Python/Go/Ruby/etc. A pre-commit hook formats and lints only staged files. Optionally **commitlint** with Conventional Commits on `commit-msg` if the user wants commit discipline.
- **EditorConfig** — a `.editorconfig` for cross-editor consistency (first-class in .NET, useful everywhere).
- **Type-check task** — where applicable: `tsc --noEmit` (TS), mypy/pyright (Python), the compiler itself (Java/Go/.NET). Keep it separate from build, useful in CI.

The list above is the JS/TS default; **for other stacks use the equivalents from `references/ecosystems.md`** and say which you're using and why. Put everything behind clear, discoverable scripts/tasks (`lint`, `format`, `typecheck`, `prepare`). `references/tooling.md` has JS config templates and a non-JS equivalents table.

## Phase 7 — Verify integrity (don't hand over something broken)

"Professional" means it actually works. Before declaring done, verify — don't assume:

- **Install** dependencies cleanly (`pnpm install` / `mvn -q compile` …) and confirm no unmet peer-deps or resolution errors.
- **Lint & format** run clean on the generated code (`pnpm lint`, `pnpm format --check`).
- **Type-check** passes (`pnpm typecheck`).
- **Build** succeeds (`pnpm build` / equivalent).
- **Dev server / entrypoint** starts without immediately crashing.
- **Path aliases resolve** at both type-check and runtime — import something via the alias in the starter code so this is actually exercised.
- **Hooks fire**: make a throwaway staged change and confirm the pre-commit hook runs (or at least that Husky is installed and the hook file exists and is executable).
- **Fullstack**: confirm the shared contract types are imported and compile on **both** sides — a change to a contract type should surface as a type error on the side that's now wrong. That's the proof the contract is load-bearing.

If something fails, fix it and re-verify rather than reporting it as a caveat. Report what you ran and its result so the user can trust the skeleton.

## Phase 8 — Suggest relevant additions

After the core is solid, proactively offer high-value extras that fit *this* project's scale and stack (don't dump all of them; pick what's pertinent):

- `.env.example` + typed env validation (e.g. Zod/envsafe, Spring `@ConfigurationProperties`).
- A minimal **CI pipeline** (GitHub Actions / GitLab CI) running install → lint → typecheck → test → build on PRs.
- **Testing** scaffold with one example test (Vitest/Jest, Pytest, JUnit) so the harness is proven.
- **Dockerfile** / `docker-compose` for reproducible dev, especially with a DB.
- **Pre-configured `.gitignore`**, `LICENSE`, and a README that documents scripts, structure, and how to run each part.
- **Dependency hygiene**: `.nvmrc`/`engines`, a renovate/dependabot config, `npm audit` note.
- For fullstack: a typed API client generated from the contract, and a `dev` script that runs both sides together (e.g. `turbo`/`concurrently`).
- Observability/logging stub, error boundary / global error handler.

Frame these as options with a one-line rationale each, and offer to wire in the ones the user wants.

---

## Reference files

- `references/ecosystems.md` — per-stack anchors across JS/TS, Python, Java, .NET, Go, Rails, PHP, and mobile: current major to target, the official generator to use, runtime/language minimums, and the ecosystem's quality tooling. Read the section(s) matching the chosen stack during Phase 2. Dated — verify live.
- `references/tooling.md` — a dated version-reference table plus config templates for ESLint flat config, Prettier, Husky + lint-staged, commitlint, path aliases (tsconfig + Vite/Next), EditorConfig, and a non-JS equivalents table. Verify versions live before using.
- `references/structures.md` — example folder layouts per project type (frontend / backend / fullstack) and per scale (prototype / growing / production), including a monorepo contract layout.
- `references/contract.md` — how to write and enforce a front/back contract (OpenAPI vs shared TS types vs Zod vs tRPC), with a worked example and the shared-package pattern.

Read the relevant reference file when you reach its phase; don't preload all of them.
