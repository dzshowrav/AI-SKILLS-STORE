---
name: awesome-agent-skills
description: A curated collection of official Agent Skills from leading development teams and the community. Hand-picked, not AI-slop generated.
author: VoltAgent
source: https://github.com/VoltAgent/awesome-agent-skills
platforms: [claude-code, cursor, codex, gemini]
---

# Awesome Agent Skills — Curated Skill Directory

<a href="https://github.com/VoltAgent/voltagent">
     <img width="1500" alt="claude-skills" src="https://github.com/user-attachments/assets/0db54cfc-f3dd-4683-abbb-e4c01d9dfb5d" />
</a>


<br/>
<br/>

<div align="center">
    <strong>A collection of official Agent Skills from leading development teams and the community.
    <br />
    Hand-picked, not AI-slop generated.
    </strong>
    <br />
    <br />

</div>

<div align="center">

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
![Skills Count](https://img.shields.io/badge/Skills-1497+-blue?style=flat-square)
![Last Update](https://img.shields.io/github/last-commit/VoltAgent/awesome-agent-skills?label=Last%20update&style=flat-square)
<a href="https://github.com/VoltAgent/voltagent">
  <img alt="VoltAgent" src="https://cdn.voltagent.dev/website/logo/logo-2-svg.svg" height="20" />
</a>
[![Discord](https://img.shields.io/discord/1361559153780195478.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://s.voltagent.dev/discord)


</div>

</div>

# Awesome Agent Skills

Unlike many bulk-generated skill repositories, this collection focuses on real-world Agent Skills created and used by actual engineering teams, not mass AI‑generated stuff.

This collection features official skills published by leading development teams, including Anthropic, Google Labs, Vercel, Stripe, Cloudflare, Netlify, Trail of Bits, Sentry, Expo, Hugging Face, Figma, and more, alongside community-built skills.

Compatible with Claude Code, Codex, Antigravity, Gemini CLI, Cursor, GitHub Copilot, OpenCode, Windsurf, and more. See the table below for paths and documentation.

The most contributed Agent Skills repository, built and maintained together with the community.


## 💛 Sponsors

|  |  |
| :-: | :-- |
| <a href="https://www.testmuai.com"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.voltagent.dev/awesome-repo/testmui/testmuai-white.png"><img alt="TestMu AI" src="https://cdn.voltagent.dev/awesome-repo/testmui/testmuai-black.png" width="425"></picture></a> | [TestMu AI (formerly LambdaTest)](https://www.testmuai.com) is an AI-native testing cloud platform built for modern engineering teams. Covering everything from autonomous test creation and fast execution to testing AI agents, chatbots and voice assistants. |
| <a href="https://zero.xyz"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.voltagent.dev/awesome-repo/zero-xyz/zero-dark.png"><img alt="Zero" src="https://cdn.voltagent.dev/awesome-repo/zero-xyz/zero-light.png" width="425"></picture></a> | [Zero](https://zero.xyz) gives your AI access to thousands of tools, APIs, and services, letting it go from prompt to project with no configuration. Instead of asking you to sign up or grab an API key, your AI discovers and uses whatever real service solves the problem right from chat. |
| <a href="https://lite.ego.app/?utm_source=officialskills&utm_medium=sponsor&utm_campaign=github-sponsor"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.voltagent.dev/awesome-repo/ego-lite/logo_wordmark_lite_white.svg"><img alt="Ego Lite" src="https://cdn.voltagent.dev/awesome-repo/ego-lite/logo_wordmark_lite_dark.svg" width="425"></picture></a> | [Ego Lite](https://lite.ego.app/?utm_source=officialskills&utm_medium=sponsor&utm_campaign=github-sponsor) is the fastest browser for your AI agents to run browser automation tasks, 3.45x faster than agent-browser (Vercel), always free, no setup, and lets your agents run 100+ browser tasks at the same time in their Spaces. |

<br />

<a href="https://sponsors.voltagent.dev/#awesome-agent-skills"><img src="https://img.shields.io/badge/📩_Become_a_Sponsor-Contact_Us-blue?style=for-the-badge&logoColor=white" alt="Become a Sponsor" /></a>


## Table of Contents

### Official Skills by

| | | | | 
|---|---|---|---|
| [Claude](#official-claude-skills) | [VoltAgent](#skills-by-voltagent) | [TestMu AI](#skills-by-testmu-ai) | [Zero](#skills-by-zero) |
| [Angular](#skills-by-angular) | [Composio](#skills-by-composio-team) | [Supabase](#skills-by-supabase-team) | [Google Gemini](#skills-by-google-gemini) |
| [Stripe](#skills-by-stripe-team) | [Courier](#skills-by-courier) | [CallStack](#skills-by-callstack) | [Expo](#skills-by-expo-team) |
| [Better Auth](#skills-by-better-auth-team) | [Tinybird](#skills-by-tinybird-team) | [HashiCorp](#skills-by-hashicorp-team-for-terraform) | [Sanity](#skills-by-sanity-team) |
| [Firecrawl](#skills-by-firecrawl-team) | [Neon](#skills-by-neon-team) | [ClickHouse](#skill-by-clickhouse) | [Remotion](#skills-by-remotion) |
| [Replicate](#skills-by-replicate) | [Typefully](#skills-by-typefully) | [Vercel](#skills-by-vercel-engineering-team) | [Cloudflare](#skills-by-cloudflare-team) |
| [Netlify](#skills-by-netlify-team) | [Google Labs (Stitch)](#skills-by-google-labs-stitch) | [Google Workspace CLI](#skills-by-google-workspace-cli) | [Hugging Face](#skills-by-hugging-face-team) |
| [Trail of Bits](#security-skills-by-trail-of-bits-team) | [Sentry](#skills-by-sentry-team-for-their-dev-team) | [Microsoft](#skills-by-microsoft) | [fal.ai](#skills-by-falai-team) |
| [WordPress](#skills-by-wordpress-development-team) | [OpenAI](#skills-by-openai) | [Figma](#skills-by-figma) | [Corey Haines](#marketing-skills-by-corey-haines) |
| [Binance](#skills-by-binance) | [Dean Peters](#product-manager-skills-by-dean-peters) | [Paweł Huryn](#product-management-skills-by-pawel-huryn) | [MiniMax](#skills-by-minimax-team) |
| [DuckDB](#skills-by-duckdb) | [GSAP](#skills-by-gsap-greensock) | [Garry Tan (gstack)](#skills-by-garry-tan-gstack) | [Notion](#skills-by-notion) |
| [Resend](#skills-by-resend) | [Addy Osmani (Web Quality)](#skills-by-addy-osmani-web-quality) | [MongoDB](#skills-by-mongodb) | [Kim Barrett (Advertising)](#advertising-skills-by-kim-barrett) |
| [Apollo GraphQL](#skills-by-apollo-graphql) | [Auth0](#skills-by-auth0) | [Brave](#skills-by-brave) | [Browserbase](#skills-by-browserbase) |
| [CodeRabbit](#skills-by-coderabbit) | [Coinbase](#skills-by-coinbase) | [Datadog Labs](#skills-by-datadog-labs) | [Firebase](#skills-by-firebase) |
| [Flutter](#skills-by-flutter) | [Venice.ai](#skills-by-veniceai) | [Red Hat](#skills-by-redhat) | [Community](#community-skills) |
| [Redis](#skills-by-redis) | [NVIDIA](#skills-by-nvidia) | [Google Cloud](#skills-by-google-cloud) | [Quality Standards](#skill-quality-standards) |


<br/>

<br/>

<a href="https://launchkit.getdesign.md/">
<img src="https://cdn.voltagent.dev/awesome-repo/launchkit-banner-3.png" alt="launchkit"  /><br/>
</a>

<br/>


<br/>

<details open>
<summary><h3 style="display:inline">Official Claude Skills</h3></summary>

- **[anthropics/docx](https://officialskills.sh/anthropics/skills/docx)** - Create, edit, and analyze Word documents
- **[anthropics/doc-coauthoring](https://officialskills.sh/anthropics/skills/doc-coauthoring)** - Collaborative document editing and co-authoring
- **[anthropics/pptx](https://officialskills.sh/anthropics/skills/pptx)** - Create, edit, and analyze PowerPoint presentations
