# Structure layouts

Adapt these to the real stack and scale — they're starting points, not mandates. Match the framework's own conventions first (Next's `app/`, Angular's schematics, Spring's package-by-feature), then apply the scale guidance.

## Choosing by scale

- **Prototype** → flat, minimal, no premature abstraction.
- **Growing / side project** → feature- or domain-based, a `src/` root, shared utils/types isolated.
- **Production / team** → clear architectural boundaries, config separated, dedicated contract/types location.

---

## Frontend

**Prototype (Vite + React/Vue):**
```
src/
  main.tsx
  App.tsx
  components/
  lib/
index.html
```

**Growing — feature-based:**
```
src/
  features/
    auth/         # components, hooks, api, types co-located per feature
    dashboard/
  components/     # shared/dumb UI
  lib/            # utils, api client
  hooks/
  types/
  routes/ (or app/ for Next)
  styles/
```

**Production:** as above plus `src/config/`, `src/services/`, strict separation of data-fetching from presentation, a `test/` setup, and a `providers/` layer for context/state.

---

## Backend

**Prototype (Express/Fastify/FastAPI):**
```
src/
  index.ts
  routes/
  db.ts
```

**Growing — layered:**
```
src/
  modules/
    users/
      users.controller.ts
      users.service.ts
      users.repository.ts
      users.schema.ts
  middleware/
  config/
  lib/
  app.ts
  server.ts
```

**Production — hexagonal / clean-ish:**
```
src/
  domain/          # entities, business rules, no framework imports
  application/     # use-cases, ports
  infrastructure/  # db, external services, adapters
  interfaces/      # http controllers, dto, validation
  config/
```
For Spring Boot, mirror this as package-by-feature (`com.app.users.{web,service,domain,repository}`) rather than package-by-layer.

---

## Fullstack monorepo (the contract-first layout)

```
repo/
  apps/
    web/           # frontend app
    api/           # backend app
  packages/
    contracts/     # SHARED source of truth: types / zod schemas / OpenAPI
    config/        # shared eslint, tsconfig, prettier presets
    ui/            # (optional) shared component library
  package.json     # workspaces
  pnpm-workspace.yaml (or turbo.json / nx.json)
  tsconfig.base.json
```

Key point: `packages/contracts` is imported by **both** `apps/web` and `apps/api`. The request/response types live there once. A tool like Turborepo or Nx wires task caching and a combined `dev` script.

**Separate repos instead of monorepo:** publish the contract as a private package, or keep a committed OpenAPI file in the backend repo that the frontend consumes via a generated client. State the sync mechanism explicitly so the two repos don't drift.

---

## Shared config packages

In a monorepo, factor `tsconfig`, ESLint, and Prettier into `packages/config` and have each app extend them. This keeps rules consistent across sides and is a hallmark of a professionally-set-up workspace.
