# Ecosystem reference

Per-stack anchors: the current major to target, the **official generator** to prefer, the runtime/language minimums, and the ecosystem's quality tooling. Organized so you read only the row(s) that match the chosen stack.

**Everything here is dated (July 2026) and ages fast.** These are anchors for *which major and generator to reach for*, not values to hardcode. Always confirm live in Phase 2 (`npm view <pkg> version`, `pip index versions <pkg>`, Maven Central, the registry, or the tool's releases page). The recurring lesson from building this file: nearly every major had turned over versus early-2025 training data.

## How to use this file

1. Identify the stack chosen in the interview.
2. Jump to the matching section(s) — one for frontend, one for backend if fullstack.
3. Use the **official generator** listed; it encodes current conventions better than hand-assembly.
4. Cross-check versions live before writing any manifest.
5. Apply the quality tooling from `tooling.md` (JS) or the per-ecosystem equivalents noted below.

---

## JavaScript / TypeScript runtimes & package managers

- **Node.js** — target an **even** LTS. As of mid-2026: 24.x = Active LTS (prefer for new), 22.x = Maintenance LTS (fallback if a dep lags), 20.x ≈ EOL. Never pin odd/Current lines for production. Pin in `.nvmrc` + `engines`.
- **Package managers** — pnpm (fast, strict, great for monorepos; a sensible default), npm (ubiquitous), yarn (Berry/PnP), bun (all-in-one runtime+PM+bundler, fastest but verify library compat). Let the user choose; default pnpm and say so.
- **Bun as runtime** — viable for greenfield APIs and scripts; double-check native-module and framework support before committing a production backend to it.

## Frontend frameworks (JS/TS)

| Framework | Current major | Official generator | Notes |
|-----------|---------------|--------------------|-------|
| React (SPA) | React 19 | `npm create vite@latest -- --template react-ts` | Vite is the standard SPA toolchain. No CRA — it's deprecated. |
| Next.js | 16 | `npx create-next-app@latest` | Turbopack default; App Router; needs React 19; min Node 20+. Choose SSR/SSG/ISR per page. |
| Angular | 22 | `npx @angular/cli@latest new` | Standalone components + signals are the norm; strict mode on. Node `^20.19 || ^22.12 || ^24`. |
| Vue | 3.5+ | `npm create vue@latest` | Composition API + `<script setup>`; Pinia for state; largest ecosystem of the non-React options. |
| Nuxt (Vue meta) | check latest | `npm create nuxt@latest` | Vue's SSR meta-framework, analogous to Next. |
| Svelte / SvelteKit | Svelte 5 / SvelteKit 2 (v3 in prerelease) | `npx sv create` | Svelte 5 uses runes (`$state`, `$derived`). Smallest bundles. Note SvelteKit config is migrating into `vite.config`. |
| SolidStart, Astro, Remix/React-Router | check latest | framework CLI | Astro for content-heavy/islands; Remix now folded into React Router; Solid for fine-grained reactivity. |

Frontend quality tooling for all of the above → `tooling.md` (ESLint 10 flat config, Prettier, Husky, aliases). Each framework ships an official ESLint config; use it.

## Backend frameworks

### Node/TS backends
| Framework | Notes | Generator |
|-----------|-------|-----------|
| NestJS | Opinionated, DI, great for large/structured APIs; TS-first | `npx @nestjs/cli new` |
| Fastify | Fast, schema-based validation, lighter than Nest | manual / `fastify-cli` |
| Express 5 | Ubiquitous, minimal; v5 is current | manual |
| Hono | Edge-first, tiny, runs on Workers/Bun/Node | `npm create hono@latest` |
| tRPC | Not a server per se — end-to-end typesafe RPC layer for TS monorepos | add to existing |

Tooling: same as frontend (ESLint/Prettier/Husky). Add a validation lib (Zod) and a typed config loader.

### Python
- **Runtime**: Python 3.14 is current stable (3.13 widely fine). Target 3.12+ for new work.
- **Package/project manager**: **uv** (Astral) is the modern default — replaces pip/venv/poetry/pyenv, 10–100× faster. `uv init`, `uv add`, `uv sync`, `uv run`.
- **Lint + format**: **Ruff** (single Rust binary, replaces flake8/black/isort/pyupgrade). `ruff check`, `ruff format`.
- **Type-check**: mypy or pyright (Astral's `ty` is emerging).
- **Hooks**: the `pre-commit` framework, wired to run Ruff.
- **Frameworks**: FastAPI (async APIs, Pydantic v2 — `uv add fastapi "uvicorn[standard]"`), Django 6.0 (batteries-included, `django-admin startproject`), Flask (minimal), Litestar (typed alternative to FastAPI).
- Config lives in `pyproject.toml` (Ruff, mypy, uv all read it).

### Java / Kotlin — Spring Boot
- **Spring Boot 4.1** is current (built on Spring Framework 7). Requires **Java 17 minimum**, supports up to Java 26. Spring does **not** designate LTS — each minor gets ~12 months OSS support.
- **Java version**: target an LTS — **Java 25** (latest LTS, Sept 2025) or **Java 21** (previous LTS, very widely supported). Pick the distribution too (Temurin/Adoptium, Corretto…).
- **Generator**: **Spring Initializr** — `https://start.spring.io` or `spring init` CLI. This is the blessed starting point; select dependencies there.
- **Quality tooling**: Spotless or google-java-format (formatting), Checkstyle/PMD/SpotBugs (static analysis), bound to the Maven/Gradle `verify` phase; hooks via a Git-hook Maven/Gradle plugin or `pre-commit`.
- **Structure**: package-by-feature over package-by-layer for anything non-trivial.

### .NET
- **.NET 10** is the current LTS (Nov 2025 line). Target it for new work. C# 14.
- **Generator**: `dotnet new webapi` / `dotnet new blazor` / `dotnet new web`; solutions via `dotnet new sln`.
- **Tooling**: `dotnet format`, EditorConfig-driven analyzers (Roslyn), `.editorconfig` is first-class in .NET.

### Go
- **Go 1.24+** current. Modules are standard (`go mod init`).
- **Structure**: the community `cmd/ internal/ pkg/` layout for larger services; keep small services flat.
- **Tooling**: `gofmt`/`goimports`, `go vet`, `golangci-lint` (aggregator), hooks via `lefthook`/`pre-commit`.
- **Frameworks**: stdlib `net/http` (now very capable), Gin, Echo, Chi, Fiber.

### Ruby on Rails
- **Rails 8.1** is current (8.1.3, Mar 2026). No formal LTS — each minor gets 1yr bug + 2yr security. Target 8.1.
- **Generator**: `rails new` (add `--api` for API-only, `--css` / `--javascript` flags to pick the frontend path; Rails 8 leans on Hotwire/Turbo and importmaps).
- **Tooling**: RuboCop (lint+format, `rubocop -A`), Brakeman (security), `bundler-audit`; hooks via `overcommit` or `pre-commit`.

### PHP / Laravel
- **Laravel 12** line current — `composer create-project laravel/laravel` or the Laravel installer. Starter kits now include React/Vue/Svelte options.
- **Tooling**: Pint (formatting, Laravel's wrapper over PHP-CS-Fixer), Larastan/PHPStan (static analysis), Pest or PHPUnit (tests).

## Mobile / cross-platform (if the project extends there)

| Stack | Generator | Notes |
|-------|-----------|-------|
| React Native / Expo | `npx create-expo-app` | Expo is the recommended path; shares TS tooling with web. |
| Flutter | `flutter create` | Dart; own linter (`flutter analyze`) + `dart format`. |
| Native iOS / Android | Xcode / Android Studio | SwiftLint / ktlint + detekt respectively. |

## Databases & ORMs (backend projects)

- **TS**: Prisma (mature, great DX), Drizzle (SQL-first, lightweight, typed). Both do migrations.
- **Python**: SQLAlchemy 2.0 + Alembic (migrations), or SQLModel (FastAPI-friendly).
- **Java**: Spring Data JPA / Hibernate + Flyway or Liquibase for migrations.
- **Rails**: Active Record (built in).
- Always scaffold a **migrations** workflow, not just a schema — it's part of "professional".

## Cross-cutting extras worth offering (any stack)

- Containerization: a `Dockerfile` + `docker-compose` (esp. with a DB) for reproducible dev.
- CI: install → lint → typecheck → test → build on PRs (GitHub Actions / GitLab CI).
- Env: `.env.example` + typed/validated env loading.
- Dependency hygiene: Renovate/Dependabot, and lockfile committed.
- Pre-commit hooks in every ecosystem (the tool differs; the practice doesn't).
