---
name: turborepo-starter-kit
description: Full-stack multi-platform monorepo starter — Next.js (web) + Nest.js (API) + React Native Expo (mobile). TRIGGER when working with this specific starter kit or building cross-platform Turborepo monorepos with shared logic.
---

# Turborepo Starter Kit

Production-grade multi-platform monorepo: Next.js App Router web app + Nest.js API + React Native Expo mobile app. Shared `@repo/store` (Zustand), `@repo/i18n`, `@repo/ui` (Shadcn), `@repo/tsconfig` packages.

## Structure

```
apps/
├── web/         Next.js App Router + Tailwind + next-intl
├── api/         Nest.js + Express + MongoDB (Rspack bundler)
├── mobile/      Expo Router + NativeWind + i18next
packages/
├── store/       Zustand stores, domain types, StorageAdapter pattern
├── i18n/        Shared EN/DE translations
├── ui/          Shadcn UI + Storybook
├── tsconfig/    Base TypeScript configs
```

## Stack

| Layer | Tech |
|-------|------|
| Web | Next.js (App Router), Tailwind CSS, Shadcn/ui, dnd-kit, next-intl |
| API | Nest.js, MongoDB + Mongoose, Passport + JWT, EventEmitter2, Rspack |
| Mobile | Expo (latest), Expo Router, NativeWind, TanStack Query, Gesture Handler |
| Shared | Zustand, TypeScript strict, PNPM catalog, Vitest, Oxlint/Oxfmt |

## Commands

```bash
pnpm dev                    # All apps
pnpm test                   # All tests
pnpm build                  # Production build
pnpm lint                   # Oxlint (50-100x faster than ESLint)
pnpm format                 # Oxfmt (30x faster than Prettier)
pnpm check-types            # TypeScript checks across all packages

# App-specific
pnpm web                    # Next.js dev only
pnpm api                    # Nest.js dev only
pnpm mobile                 # Expo dev only
pnpm mobile:android         # Expo Android build
pnpm storybook              # Shadcn UI component library
pnpm test:e2e               # Playwright E2E tests
pnpm init-db                # Seed MongoDB
```

## Key Architecture Decisions

- **Storage Adapter Pattern**: `@repo/store` exports `createAuthStore()` factory with injectable `StorageAdapter` — web uses `localStorage`, mobile uses `expo-secure-store`
- **i18n**: Shared JSON translations in `@repo/i18n`, consumed by `next-intl` (web) and `i18next` (mobile)
- **Optimistic Locking**: `updatedAt` field on PATCH — returns 409 Conflict on concurrent edits
- **Polling (5s)**: Instead of WebSocket/SSE (Vercel Serverless limitation)
- **Platform-appropriate interactions**: Web uses drag-and-drop (dnd-kit), mobile uses swipe gestures + ActionSheet

## AI Guidelines (AGENTS.md)

The repo ships with `AGENTS.md` providing:

- **Required skills**: `caveman`, `karpathy-guidelines`, `session-handoff` (universal)
- **API skills**: `nestjs-best-practices`
- **Mobile skills**: `building-native-ui`, `expo-api-routes`, `expo-tailwind-setup`, `native-data-fetching`, `upgrading-expo`, `use-dom`
- **Web skills**: `next-best-practices`, `next-cache-components`, `vercel-composition-patterns`, `vercel-react-best-practices`, `web-design-guidelines`, `turborepo`
- **Project context**: `AGENTS.md` must be loaded before any work
- **MCP servers**: `context7`, `next-devtools`, `chrome-devtools`
- **Conventional commits**: `feat(scope): desc` / `fix(scope): desc`
- **Pre-commit**: `pnpm lint-staged && pnpm build --filter=@repo/web`

## Tooling

| Tool | Purpose |
|------|---------|
| Turborepo | Task pipeline + remote cache (Vercel) |
| Rspack | Rust bundler for Nest.js (5-10x faster) |
| Oxlint | Rust linter instead of ESLint |
| Oxfmt | Rust formatter instead of Prettier |
| Husky + lint-staged | Pre-commit quality gate |
| Commitizen | Conventional commits |
| Vitest + Playwright | Testing |
| Storybook | UI component docs + visual testing |
