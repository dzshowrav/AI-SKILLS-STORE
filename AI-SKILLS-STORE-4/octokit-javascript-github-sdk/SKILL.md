---
name: "Octokit JavaScript GitHub SDK for REST GraphQL and App Automation"
slug: "octokit-javascript-github-sdk-rest-graphql-app-automation"
description: "Octokit is GitHub's JavaScript SDK family for REST API requests, GraphQL queries, authentication, webhooks, and GitHub App workflows. It gives agents and automation systems a typed, maintained client for working with GitHub from Node.js, browsers, and Deno."
github_stars: 7736
verification: "security_reviewed"
source: "https://github.com/octokit/octokit.js"
category: "Library & API Reference"
framework: "Multi-Framework"
tool_ecosystem:
github_repo: "octokit/octokit.js"
github_stars: 7736
npm_package: "octokit"
npm_weekly_downloads: 7006664
---

# Octokit JavaScript GitHub SDK for REST GraphQL and App Automation

Octokit is GitHub's JavaScript SDK family for REST API requests, GraphQL queries, authentication, webhooks, and GitHub App workflows. It gives agents and automation systems a typed, maintained client for working with GitHub from Node.js, browsers, and Deno.

## Installation

```bash
npm install octokit
```

Requirements and caveats from upstream:
- The all-batteries-included GitHub SDK for Browsers, Node.js, and Deno.
- Works in all modern browsers, Node.js, and Deno.

## Usage

```javascript
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "YOUR-TOKEN"
});

const { data } = await octokit.request("/");
```

### Proxy Servers (Node.js only)

```javascript
import { Octokit } from "octokit";
import { createProxyAgent } from "@octokit/plugin-create-proxy-agent";

const MyOctokit = Octokit.plugin(createProxyAgent);
const octokit = new MyOctokit({
  auth: "YOUR-TOKEN",
  proxy: {
    host: "proxy.example.com",
    port: 8080,
  },
});
```

## Source

- https://github.com/octokit/octokit.js
- https://agentskillexchange.com/skills/octokit-javascript-github-sdk-rest-graphql-app-automation/
