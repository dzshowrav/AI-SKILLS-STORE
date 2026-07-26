# Front/back contract

The contract is the interface both sides build against, agreed before either is written. It's what makes independent (or parallel) development of front and back safe. Pick the mechanism that fits the stack, then make it *load-bearing* — both sides import it, so a mismatch is a compile error, not a runtime surprise.

## Choosing a mechanism

- **Shared TypeScript types / Zod schemas** — best when both sides are TS. One `packages/contracts` exporting types (and optionally Zod schemas that give you runtime validation + inferred types). Simplest, fully type-safe end to end.
- **OpenAPI (Swagger) spec** — best for polyglot stacks (e.g. Spring/FastAPI backend, TS frontend). The `.yaml`/`.json` spec is the source of truth; generate a typed client for the frontend and (optionally) server stubs/validation for the backend.
- **tRPC** — TS-only, collapses the contract into inferred types with no codegen; good for tightly-coupled monorepos.
- **Protobuf/gRPC** — for RPC-style or high-perf/polyglot services; `.proto` is the contract, codegen per language.

## What the contract must specify

1. **Operations** — method + path (or RPC name) + purpose.
2. **Request shape** — params, query, body schema.
3. **Response shape** — success body schema per status.
4. **Error model** — status codes + a consistent error body (e.g. `{ code, message, details? }`).
5. **Auth** — how requests carry identity (bearer token, cookie/session).
6. **Conventions** — base URL, versioning, pagination shape, date format.

## Worked example — shared Zod contract

`packages/contracts/src/user.ts`:

```ts
import { z } from "zod";

export const User = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
});
export type User = z.infer<typeof User>;

export const CreateUserBody = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});
export type CreateUserBody = z.infer<typeof CreateUserBody>;

export const ApiError = z.object({
  code: z.string(),
  message: z.string(),
});
export type ApiError = z.infer<typeof ApiError>;

// Endpoint descriptors both sides can reference
export const endpoints = {
  createUser: { method: "POST", path: "/api/v1/users" },
  getUser: { method: "GET", path: "/api/v1/users/:id" },
} as const;
```

**Backend** validates incoming bodies with `CreateUserBody.parse(req.body)` and types its handlers' return as `User`.
**Frontend** types its fetch wrapper's response as `User` and its payload as `CreateUserBody`.

Because both import the same module, changing `User` (say, adding a required field) immediately produces type errors on whichever side is now non-conformant — that's the contract doing its job.

## Worked example — OpenAPI (polyglot)

Keep `contract/openapi.yaml` as source of truth. Then:

- Frontend: generate a typed client (`openapi-typescript` for types, or `openapi-generator` / `orval` for a full client).
- Backend (Spring): use it to generate DTOs/interfaces or validate against it; (FastAPI): FastAPI *emits* OpenAPI from code — in that case decide whether code or spec is authoritative and generate the other, don't maintain both by hand.

## Enforcement checklist

- [ ] Contract lives in one place both sides consume.
- [ ] Frontend request payloads and response handling are typed from it.
- [ ] Backend validates requests and types responses from it.
- [ ] A breaking change to a contract type surfaces as a build/type error on the mismatched side (test this once during Phase 7).
- [ ] Error body shape is shared, not re-invented per endpoint.
- [ ] Versioning/base-URL constants come from the contract, not hardcoded strings.
