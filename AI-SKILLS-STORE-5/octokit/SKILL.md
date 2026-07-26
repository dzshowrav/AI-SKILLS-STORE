---
name: octokit
description: All-batteries-included GitHub SDK for Node.js, browsers, and Deno. REST API, GraphQL, GitHub Apps, webhooks, OAuth, pagination, throttling, retry. TRIGGER when interacting with GitHub API, building GitHub Apps, or needing GitHub authentication.
---

# Octokit.js

The all-batteries-included GitHub SDK. Works in Node.js (>=20), browsers, and Deno.

## Install

```bash
npm install octokit
```

```js
import { Octokit, App, OAuthApp, RequestError, createNodeMiddleware } from 'octokit'
```

## `Octokit` API Client

### Constructor

```js
const octokit = new Octokit({ auth: 'github_pat_...' })
```

| Option | Type | Description |
|--------|------|-------------|
| `auth` | `string \| object` | Personal access token or auth strategy options |
| `authStrategy` | `function` | Custom auth strategy (default: `@octokit/auth-token`) |
| `baseUrl` | `string` | GitHub Enterprise: `https://github.acme-inc.com/api/v3` |
| `userAgent` | `string` | Custom user agent (prepended to default) |
| `timeZone` | `string` | `'America/Los_Angeles'` — sets `Time-Zone` header |
| `request` | `object` | `{ signal, fetch, timeout }` |
| `throttle` | `object` | Rate limit handling (enabled by default) |
| `retry` | `object` | Request retry handling (enabled by default) |
| `log` | `object` | Custom logger: `{ debug, info, warn, error }` |

### REST API

```js
// Typed endpoint methods
const { data } = await octokit.rest.issues.create({
  owner: 'octocat',
  repo: 'hello-world',
  title: 'Hello!',
})

// Raw request (matches GitHub docs 1:1)
const { data } = await octokit.request('POST /repos/{owner}/{repo}/issues', {
  owner: 'octocat', repo: 'hello-world',
  title: 'Hello!',
})

// Media type formats
await octokit.rest.repos.getContent({
  mediaType: { format: 'raw' },
  owner: 'octocat', repo: 'hello-world', path: 'package.json',
})
```

### Pagination

```js
// Async iterator (memory efficient)
const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
  owner: 'octocat', repo: 'hello-world', per_page: 100,
})
for await (const { data: issues } of iterator) {
  for (const issue of issues) console.log(issue.number, issue.title)
}

// All at once
const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
  owner: 'octocat', repo: 'hello-world', per_page: 100,
})
```

### GraphQL API

```js
const { viewer: { login } } = await octokit.graphql(`{ viewer { login } }`)

// With variables
const { repository } = await octokit.graphql(`
  query($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) { issues(last: 3) { edges { node { title } } } }
  }
`, { owner: 'octokit', repo: 'rest.js' })

// Pagination
const { allIssues } = await octokit.graphql.paginate(`
  query($owner: String!, $repo: String!, $cursor: String) {
    repository(owner: $owner, name: $repo) {
      issues(first: 100, after: $cursor) {
        edges { node { title } }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`, { owner: 'octocat', repo: 'hello-world' })
```

### Authentication Strategies

```js
// Personal access token (default)
new Octokit({ auth: 'ghp_...' })

// GitHub App installation
import { createAppAuth } from '@octokit/auth-app'
new Octokit({
  authStrategy: createAppAuth,
  auth: { appId: 1, privateKey: '-----BEGIN PRIVATE KEY-----\n...', installationId: 123 },
})
```

### Error Handling

```js
import { RequestError } from 'octokit'

try {
  await octokit.request('GET /')
} catch (error) {
  if (error instanceof RequestError) {
    error.status   // HTTP status code
    error.message  // Error message
    error.request  // { method, url, headers, body }
    error.response // { url, status, headers, data }
  }
}
```

### Proxy Support (Node.js)

```js
import { fetch as undiciFetch, ProxyAgent } from 'undici'

const octokit = new Octokit({
  request: { fetch: (url, opts) => undiciFetch(url, { ...opts, dispatcher: new ProxyAgent(proxyUrl) }) },
})
```

## `App` (GitHub App Client)

```js
const app = new App({
  appId: 123,
  privateKey: `-----BEGIN PRIVATE KEY-----\n...`,
  webhooks: { secret: 'mysecret' },
  oauth: { clientId: 'Iv1...', clientSecret: '...' },
})
```

### App Authentication

```js
const { data: slug } = await app.octokit.rest.apps.getAuthenticated()
const octokit = await app.getInstallationOctokit(installationId)
```

### Iterate Installations

```js
for await (const { octokit, repository } of app.eachRepository.iterator()) {
  await octokit.rest.repos.createDispatchEvent({
    owner: repository.owner.login, repo: repository.name, event_type: 'my_event',
  })
}
```

### Webhooks

```js
app.webhooks.on('issues.opened', ({ octokit, payload }) => {
  return octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    body: 'Thanks!',
  })
})

// Serverless: verify and receive
await app.webhooks.verifyAndReceive({
  id: request.headers['x-github-delivery'],
  name: request.headers['x-github-event'],
  signature: request.headers['x-hub-signature-256'],
  payload: request.body,
})
```

### OAuth

```js
app.oauth.on('token.created', async ({ token, octokit }) => {
  await octokit.rest.activity.setRepoSubscription({
    owner: 'octocat', repo: 'hello-world', subscribed: true,
  })
})

// Device flow
const { token } = await app.oauth.createToken({
  async onVerification(verification) {
    console.log(`Enter ${verification.user_code} at ${verification.verification_uri}`)
  },
})
```

## `OAuthApp` (OAuth App Client)

```js
const app = new OAuthApp({
  clientId: 'Iv1...',
  clientSecret: '...',
  defaultScopes: ['repo', 'gist'],
})
```

## Node.js Middleware

```js
import { createServer } from 'node:http'
import { App, createNodeMiddleware } from 'octokit'

const app = new App({ appId, privateKey, webhooks: { secret }, oauth: { clientId, clientSecret } })
createServer(createNodeMiddleware(app)).listen(3000)
```

| Route | Purpose |
|-------|---------|
| `POST /api/github/webhooks` | Receive webhook events |
| `GET /api/github/oauth/login` | Redirect to GitHub auth |
| `GET /api/github/oauth/callback` | OAuth redirect endpoint |
| `POST /api/github/oauth/token` | Exchange code for token |
| `GET /api/github/oauth/token` | Check token validity |
| `PATCH /api/github/oauth/token` | Reset token |
| `DELETE /api/github/oauth/token` | Logout |
| `DELETE /api/github/oauth/grant` | Revoke grant |

## Throttling & Retry

Built-in (opt-out by setting `{ throttle: { enabled: false } }` or `{ retry: { enabled: false } }`).

```js
new Octokit({
  throttle: {
    onRateLimit: (retryAfter, options, octokit) => {
      octokit.log.warn(`Rate limited: ${options.method} ${options.url}`)
      return options.request.retryCount === 0 // retry once
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      octokit.log.warn(`Secondary rate limit: ${options.method} ${options.url}`)
      return options.request.retryCount === 0
    },
  },
})
```

## Exports

```js
import {
  Octokit,       // API client (REST + GraphQL + auth + throttling + retry)
  App,           // GitHub App (auth + webhooks + OAuth)
  OAuthApp,      // OAuth App
  RequestError,  // Error type for failed requests
  createNodeMiddleware, // Express/Node middleware for webhooks + OAuth
} from 'octokit'
```

## Architecture

The `octokit` package bundles:
- `@octokit/core` — core request client
- `@octokit/app` — GitHub App SDK
- `@octokit/oauth-app` — OAuth App SDK
- `@octokit/plugin-paginate-rest` — REST pagination
- `@octokit/plugin-paginate-graphql` — GraphQL pagination
- `@octokit/plugin-rest-endpoint-methods` — typed REST methods
- `@octokit/plugin-retry` — retry on failure
- `@octokit/plugin-throttling` — rate limit handling
- `@octokit/request-error` — error types
- `@octokit/types` — TypeScript types
- `@octokit/webhooks` — webhook verification and handling
