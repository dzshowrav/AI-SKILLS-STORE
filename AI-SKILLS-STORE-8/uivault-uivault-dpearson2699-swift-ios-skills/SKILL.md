---
name: dpearson2699/swift-ios-skills
description: UI Vault resource — Claude Skills for Onboarding & UI Design. https://github.com/dpearson2699/swift-ios-skills
source: https://github.com/dpearson2699/swift-ios-skills
category: Claude Skills for Onboarding & UI Design
type: external-resource
github: dpearson2699/swift-ios-skills
---

# dpearson2699/swift-ios-skills

> Claude Skills for Onboarding & UI Design · [Open source](https://github.com/dpearson2699/swift-ios-skills)

This skill provides comprehensive reference for using **dpearson2699/swift-ios-skills** in your projects.
All examples, components, and patterns described below are from the official documentation.

---

# Swift iOS Skills — Agent Skills for iOS 26+ & SwiftUI Development

[![GitHub stars](https://img.shields.io/github/stars/dpearson2699/swift-ios-skills)](https://github.com/dpearson2699/swift-ios-skills/stargazers)
[![Swift 6.3](https://img.shields.io/badge/Swift-6.3-F05138.svg?logo=swift&logoColor=white)](https://swift.org)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20iPadOS%20%7C%20macOS-000000.svg?logo=apple)](https://developer.apple.com)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-compatible-d97757.svg?logo=anthropic)](https://claude.ai/code)
[![OpenAI Codex](https://img.shields.io/badge/OpenAI%20Codex-compatible-10A37F.svg?logo=data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTIyLjI4MTkgOS44MjExYTUuOTg0NyA1Ljk4NDcgMCAwIDAtLjUxNTctNC45MTA4IDYuMDQ2MiA2LjA0NjIgMCAwIDAtNi41MDk4LTIuOUE2LjA2NTEgNi4wNjUxIDAgMCAwIDQuOTgwNyA0LjE4MThhNS45ODQ3IDUuOTg0NyAwIDAgMC0zLjk5NzcgMi45IDYuMDQ2MiA2LjA0NjIgMCAwIDAgLjc0MjcgNy4wOTY2IDUuOTggNS45OCAwIDAgMCAuNTExIDQuOTEwNyA2LjA1MSA2LjA1MSAwIDAgMCA2LjUxNDYgMi45MDAxQTUuOTg0NyA1Ljk4NDcgMCAwIDAgMTMuMjU5OSAyNGE2LjA1NTcgNi4wNTU3IDAgMCAwIDUuNzcxOC00LjIwNTggNS45ODk0IDUuOTg5NCAwIDAgMCAzLjk5NzctMi45MDAxIDYuMDU1NyA2LjA1NTcgMCAwIDAtLjc0NzUtNy4wNzI5em0tOS4wMjIgMTIuNjA4MWE0LjQ3NTUgNC40NzU1IDAgMCAxLTIuODc2NC0xLjA0MDhsLjE0MTktLjA4MDQgNC43NzgzLTIuNzU4MmEuNzk0OC43OTQ4IDAgMCAwIC4zOTI3LS42ODEzdi02LjczNjlsMi4wMiAxLjE2ODZhLjA3MS4wNzEgMCAwIDEgLjAzOC4wNTJ2NS41ODI2YTQuNTA0IDQuNTA0IDAgMCAxLTQuNDk0NSA0LjQ5NDR6bS05LjY2MDctNC4xMjU0YTQuNDcwOCA0LjQ3MDggMCAwIDEtLjUzNDYtMy4wMTM3bC4xNDIuMDg1MiA0Ljc4MyAyLjc1ODJhLjc3MTIuNzcxMiAwIDAgMCAuNzgwNiAwbDUuODQyOC0zLjM2ODV2Mi4zMzI0YS4wODA0LjA4MDQgMCAwIDEtLjAzMzIuMDYxNUw5Ljc0IDE5Ljk1MDJhNC40OTkyIDQuNDk5MiAwIDAgMS02LjE0MDgtMS42NDY0ek0yLjM0MDggNy44OTU2YTQuNDg1IDQuNDg1IDAgMCAxIDIuMzY1NS0xLjk3MjhWMTEuNmEuNzY2NC43NjY0IDAgMCAwIC4zODc5LjY3NjVsNS44MTQ0IDMuMzU0My0yLjAyMDEgMS4xNjg1YS4wNzU3LjA3NTcgMCAwIDEtLjA3MSAwbC00LjgzMDMtMi43ODY1QTQuNTA0IDQuNTA0IDAgMCAxIDIuMzQwOCA3Ljg3MnptMTYuNTk2MyAzLjg1NThMMTMuMTAzOCA4LjM2NCAxNS4xMTkyIDcuMmEuMDc1Ny4wNzU3IDAgMCAxIC4wNzEgMGw0LjgzMDMgMi43OTEzYTQuNDk0NCA0LjQ5NDQgMCAwIDEtLjY3NjUgOC4xMDQydi01LjY3NzJhLjc5Ljc5IDAgMCAwLS40MDctLjY2N3ptMi4wMTA3LTMuMDIzMWwtLjE0Mi0uMDg1Mi00Ljc3MzUtMi43ODE4YS43NzU5Ljc3NTkgMCAwIDAtLjc4NTQgMEw5LjQwOSA5LjIyOTdWNi44OTc0YS4wNjYyLjA2NjIgMCAwIDEgLjAyODQtLjA2MTVsNC44MzAzLTIuNzg2NmE0LjQ5OTIgNC40OTkyIDAgMCAxIDYuNjgwMiA0LjY2ek04LjMwNjUgMTIuODYzbC0yLjAyLTEuMTYzOGEuMDgwNC4wODA0IDAgMCAxLS4wMzgtLjA1NjdWNi4wNzQyYTQuNDk5MiA0LjQ5OTIgMCAwIDEgNy4zNzU3LTMuNDUzN2wtLjE0Mi4wODA1TDguNzA0IDUuNDU5YS43OTQ4Ljc5NDggMCAwIDAtLjM5MjcuNjgxM3ptMS4wOTc2LTIuMzY1NGwyLjYwMi0xLjQ5OTggMi42MDY5IDEuNDk5OHYyLjk5OTRsLTIuNTk3NCAxLjQ5OTctMi42MDY3LTEuNDk5N1oiLz48L3N2Zz4=)](https://developers.openai.com/codex)
[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-standard-green.svg?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE2IDAuNUwyOS40MjM0IDguMjVWMjMuNzVMMTYgMzEuNUwyLjU3NjYxIDIzLjc1VjguMjVMMTYgMC41WiBNMTYgNUwyNS41MjYzIDEwLjVWMjEuNUwxNiAyN0w2LjQ3MzcyIDIxLjVWMTAuNUwxNiA1WiIgZmlsbD0id2hpdGUiLz48L3N2Zz4K)](https://agentskills.io)
[![tessl](https://img.shields.io/endpoint?url=https%3A%2F%2Fapi.tessl.io%2Fv1%2Fbadges%2Fdpearson2699%2Fswift-ios-skills)](https://tessl.io/registry/dpearson2699/swift-ios-skills)
[![License: PolyForm Perimeter](https://img.shields.io/badge/License-PolyForm%20Perimeter%201.0.0-blue.svg)](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/LICENSE)


86 agent skills optimized for **iOS 26+** development with Swift 6.3 and modern Apple frameworks. All code examples, patterns, and guidance target the latest APIs -- Liquid Glass, approachable concurrency, Foundation Models, StoreKit 2, SwiftData, async/await URLSession, and more. No deprecated patterns.

Compatible with [Claude Code](https://claude.ai/code), [OpenAI Codex](https://developers.openai.com/codex), [Cursor](https://cursor.com), [GitHub Copilot](https://github.com/features/copilot), and [40+ other agents](https://skills.sh). Follows the open [Agent Skills](https://agentskills.io) standard.

Every skill is self-contained. No skill depends on another. Install only what you need.

Release history: [CHANGELOG.md](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/CHANGELOG.md).

## Contents

- [Install](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#install)
  - [Recommended: any agent via skills CLI](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#recommended-any-agent-via-skills-cli)
  - [Claude Code](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#claude-code-via-plugin-marketplace)
  - [OpenAI Codex](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#openai-codex)
  - [Claude Web App / Claude Desktop](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#claude-web-app--claude-desktop)
  - [ChatGPT](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#chatgpt)
- [Plugin Bundles](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#plugin-bundles-claude-code)
- [Skills](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#skills)
  - [SwiftUI](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#swiftui)
  - [Core Swift](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#core-swift)
  - [App Experience Frameworks](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#app-experience-frameworks)
  - [Data & Service Frameworks](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#data--service-frameworks)
  - [AI & Machine Learning](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#ai--machine-learning)
  - [iOS Engineering](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#ios-engineering)
  - [Hardware & Device Integration](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#hardware--device-integration)
  - [Platform Integration](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#platform-integration)
  - [Gaming](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#gaming)
- [Structure](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#structure)
- [Compatibility](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#compatibility)
- [Upgrading from v2.x](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#upgrading-from-v2x)
- [Support](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#support)
- [License](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/#license)

## Install

### Recommended: any agent via [skills CLI](https://github.com/vercel-labs/skills)

The skills CLI is the recommended install method.

Interactive install (recommended):

```sh
npx skills add dpearson2699/swift-ios-skills
```

Running the default command opens the skills CLI UI so you can choose which skills to install and which agent(s) to install them for.

Install everything for any coding agent:

```sh
npx skills add dpearson2699/swift-ios-skills --all
```

Use `--all` when you want the full set of 86 skills installed automatically for any coding agent.

Install specific skills directly:

```sh
npx skills add dpearson2699/swift-ios-skills --skill <skill-name> --skill <skill-name>
```

Check for updates to installed skills:

```sh
npx skills check
```

Update installed skills to the latest versions:

```sh
npx skills update
```

Use these after installing through the skills CLI.

### Claude Code (via plugin marketplace)

Add the marketplace (one-time):

```sh
/plugin marketplace add dpearson2699/swift-ios-skills
```

Install everything:

```sh
/plugin install all-ios-skills@swift-ios-skills
```

Or install a themed bundle (bundles limit how many skills load into the context window — if you want everything, use `all-ios-skills` above instead of installing multiple bundles):

```sh
/plugin install swiftui-skills@swift-ios-skills
/plugin install swift-core-skills@swift-ios-skills
/plugin install ios-app-framework-skills@swift-ios-skills
/plugin install ios-data-framework-skills@swift-ios-skills
/plugin install ios-ai-ml-skills@swift-ios-skills
/plugin install ios-engineering-skills@swift-ios-skills
/plugin install ios-hardware-skills@swift-ios-skills
/plugin install ios-platform-skills@swift-ios-skills
/plugin install ios-gaming-skills@swift-ios-skills
/plugin install apple-kit-skills@swift-ios-skills
```

### OpenAI Codex

```sh
$skill-installer install https://github.com/dpearson2699/swift-ios-skills/tree/main/skills/<skill-name>
```

### Claude Web App / Claude Desktop

1. Download the skill folder(s) you want from this repo
2. Zip each skill folder
3. Go to **Settings > Capabilities** and enable "Code execution and file creation"
4. Go to **Customize > Skills**, click **+**, then **Upload a skill**
5. Upload the zip

### ChatGPT

1. Download the skill folder(s) you want from this repo
2. Zip each skill folder
3. Click your profile icon in ChatGPT and select **Skills**
4. Click **New skill** and select **Upload from your computer**
5. Upload the zip

## Plugin Bundles (Claude Code)

| Plugin | Skills included |
|--------|----------------|
| **all-ios-skills** | All 86 skills |
| **apple-kit-skills** | 39 skills spanning Apple Kit frameworks plus CarPlay |
| **swiftui-skills** | focus-engine, swiftui-animation, swiftui-gestures, swiftui-layout-components, swiftui-liquid-glass, swiftui-navigation, swiftui-patterns, swiftui-performance, swiftui-uikit-interop, swiftui-webkit |
| **swift-core-skills** | core-data, swift-api-design-guidelines, swift-architecture, swift-codable, swift-charts, swift-concurrency, swift-formatstyle, swift-language, swift-testing, swiftdata |
| **ios-app-framework-skills** | activitykit, adattributionkit, alarmkit, app-clips, app-intents, avkit, carplay, mapkit, paperkit, pdfkit, photokit, push-notifications, storekit, tipkit, widgetkit |
| **ios-data-framework-skills** | cloudkit, contacts-framework, eventkit, financekit, healthkit, musickit, passkit, weatherkit |
| **ios-ai-ml-skills** | apple-on-device-ai, coreml, natural-language, speech-recognition, vision-framework |
| **ios-engineering-skills** | app-store-optimization, app-store-review, authentication, background-processing, cryptokit, debugging-instruments, device-integrity, ios-accessibility, ios-ettrace-performance, ios-localization, ios-memgraph-analysis, ios-networking, swift-security, swiftlint, ios-simulator, metrickit |
| **ios-hardware-skills** | accessorysetupkit, core-bluetooth, core-motion, core-nfc, dockkit, pencilkit, realitykit, sensorkit |
| **ios-platform-skills** | appmigrationkit, audioaccessorykit, browserenginekit, callkit, cryptotokenkit, energykit, homekit, permissionkit, relevancekit, shareplay-activities |
| **ios-gaming-skills** | gamekit, scenekit, spritekit, tabletopkit |

## Skills

### SwiftUI

| Skill | What it covers |
|-------|---------------|
| [focus-engine](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/focus-engine/) | @FocusState, defaultFocus, focusSection, focused scene values, focus restoration, UIFocusGuide |
| [swiftui-animation](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftui-animation/) | Spring animations, PhaseAnimator, KeyframeAnimator, matchedGeometryEffect, SF Symbols |
| [swiftui-gestures](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftui-gestures/) | Tap, drag, magnify, rotate, long press, simultaneous and sequential gestures |
| [swiftui-layout-components](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftui-layout-components/) | Grid, LazyVGrid, Layout protocol, ViewThatFits, custom layouts |
| [swiftui-liquid-glass](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftui-liquid-glass/) | iOS 26 Liquid Glass, glassEffect, GlassEffectContainer, morphing transitions |
| [swiftui-navigation](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftui-navigation/) | NavigationStack, NavigationSplitView, programmatic navigation, deep linking |
| [swiftui-patterns](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftui-patterns/) | @Observable, state ownership, environment wiring, view composition, async loading, MV-pattern architecture |
| [swiftui-performance](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftui-performance/) | Rendering performance, view update optimization, layout thrash, Instruments profiling |
| [swiftui-uikit-interop](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftui-uikit-interop/) | UIViewRepresentable, UIHostingController, Coordinator, incremental UIKit-to-SwiftUI migration |
| [swiftui-webkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftui-webkit/) | WebView, WebPage, navigation policies, JavaScript calls, local content, custom URL schemes |

### Core Swift

| Skill | What it covers |
|-------|---------------|
| [swift-api-design-guidelines](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swift-api-design-guidelines/) | Swift API Design Guidelines -- argument labels, mutating/nonmutating pairs, documentation comments, naming conventions |
| [swift-architecture](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swift-architecture/) | Architecture patterns: MV (@Observable), MVVM, MVI, TCA, Clean Architecture, Coordinator, decision framework |
| [swift-codable](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swift-codable/) | Swift Codable, JSONDecoder, JSONEncoder, CodingKeys, custom decoding, nested JSON |
| [swift-charts](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swift-charts/) | Bar, line, area, pie, donut, and 3D charts, scrolling, selection, annotations |
| [swift-concurrency](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swift-concurrency/) | Swift 6.2 concurrency, Sendable, actors, structured concurrency, data-race safety |
| [swift-formatstyle](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swift-formatstyle/) | FormatStyle protocol, number/currency/date/duration/measurement formatting, custom styles |
| [swift-language](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swift-language/) | Swift 6.3 language idioms, result builders, property wrappers, typed throws |
| [swift-testing](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swift-testing/) | Swift Testing framework, @Test, @Suite, #expect, parameterized tests, mocking |
| [core-data](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/core-data/) | Core Data persistence, NSPersistentContainer, NSFetchedResultsController, batch operations, staged migration |
| [swiftdata](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftdata/) | @Model, @Query, #Predicate, ModelContainer, migrations, CloudKit sync, @ModelActor |

### App Experience Frameworks

| Skill | What it covers |
|-------|---------------|
| [activitykit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/activitykit/) | ActivityKit, Dynamic Island, Lock Screen Live Activities, push-to-update |
| [adattributionkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/adattributionkit/) | Privacy-preserving ad attribution, postbacks, conversion values, re-engagement |
| [alarmkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/alarmkit/) | AlarmKit system alarms and countdown timers, Lock Screen, Dynamic Island, Live Activities |
| [app-clips](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/app-clips/) | App Clips, invocation URLs, NFC, QR, App Clip Codes, App Group handoff |
| [app-intents](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/app-intents/) | App Intents for Siri, Shortcuts, Spotlight, widgets, and Apple Intelligence |
| [avkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/avkit/) | AVPlayerViewController, VideoPlayer, Picture-in-Picture, AirPlay, subtitles |
| [carplay](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/carplay/) | CarPlay templates, navigation, audio, communication, EV charging apps |
| [mapkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/mapkit/) | MapKit, CoreLocation, annotations, geocoding, directions, geofencing |
| [paperkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/paperkit/) | PaperMarkupViewController, markup editing, drawing, shapes (iOS 26) |
| [pdfkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/pdfkit/) | PDFView, PDFDocument, annotations, text search, form filling, thumbnails |
| [photokit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/photokit/) | PhotosPicker, AVCaptureSession, photo library, video recording, media permissions |
| [push-notifications](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/push-notifications/) | UNUserNotificationCenter, APNs, rich notifications, silent push, service extensions |
| [storekit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/storekit/) | StoreKit 2 purchases, subscriptions, SubscriptionStoreView, transaction verification |
| [tipkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/tipkit/) | Feature discovery tooltips, contextual tips, tip rules, tip events |
| [widgetkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/widgetkit/) | Home Screen, Lock Screen, and StandBy widgets, Control Center controls, timeline providers |

### Data & Service Frameworks

| Skill | What it covers |
|-------|---------------|
| [cloudkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/cloudkit/) | CKContainer, CKRecord, subscriptions, sharing, CKSyncEngine, SwiftData sync |
| [contacts-framework](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/contacts-framework/) | CNContactStore, fetch requests, key descriptors, CNContactPickerViewController, save requests |
| [eventkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/eventkit/) | EKEventStore, EKEvent, EKReminder, recurrence rules, EventKitUI editors and choosers |
| [financekit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/financekit/) | Apple Card, Apple Cash, Wallet orders, transaction queries, account balances |
| [healthkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/healthkit/) | HKHealthStore, queries, statistics, workout sessions, background delivery |
| [musickit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/musickit/) | MusicKit authorization, catalog search, ApplicationMusicPlayer, MPRemoteCommandCenter |
| [passkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/passkit/) | Apple Pay, PKPaymentRequest, PKPaymentAuthorizationController, Wallet passes |
| [weatherkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/weatherkit/) | WeatherService, current/hourly/daily forecasts, alerts, attribution requirements |

### AI & Machine Learning

| Skill | What it covers |
|-------|---------------|
| [apple-on-device-ai](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/apple-on-device-ai/) | Foundation Models framework, Core ML, MLX Swift, on-device LLM inference |
| [coreml](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/coreml/) | Core ML model loading, prediction, MLTensor, compute unit configuration, VNCoreMLRequest, MLComputePlan |
| [natural-language](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/natural-language/) | NLTokenizer, NLTagger, sentiment analysis, language identification, embeddings, Translation |
| [speech-recognition](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/speech-recognition/) | SpeechAnalyzer, SpeechTranscriber, SFSpeechRecognizer, on-device recognition, audio buffer processing |
| [vision-framework](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/vision-framework/) | Vision text recognition, face/barcode detection, image segmentation, VisionKit DataScannerViewController |

### iOS Engineering

| Skill | What it covers |
|-------|---------------|
| [app-store-optimization](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/app-store-optimization/) | ASO keyword strategy, description writing, screenshot optimization, Custom Product Pages, A/B testing |
| [app-store-review](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/app-store-review/) | App Review guidelines, rejection prevention, privacy manifests, ATT, HIG compliance |
| [authentication](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/authentication/) | Sign in with Apple, ASAuthorizationController, passkeys, biometric auth (LAContext), credential management |
| [background-processing](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/background-processing/) | BGTaskScheduler, background refresh, URLSession background transfers |
| [cryptokit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/cryptokit/) | SHA-2/SHA-3, HMAC, AES-GCM, ChaChaPoly, HPKE, ML-KEM/ML-DSA, P256/Curve25519 signing, ECDH, Secure Enclave |
| [debugging-instruments](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/debugging-instruments/) | Xcode debugger, Instruments, os_signpost, MetricKit, crash symbolication |
| [device-integrity](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/device-integrity/) | DeviceCheck (DCDevice per-device bits), App Attest (DCAppAttestService attestation and assertion flows) |
| [ios-accessibility](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/ios-accessibility/) | VoiceOver, Dynamic Type, custom rotors, accessibility focus, assistive-technology support |
| [ios-ettrace-performance](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/ios-ettrace-performance/) | ETTrace launch/runtime capture, exact-build dSYM matching, processed flamegraph JSON, comparable verification |
| [ios-localization](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/ios-localization/) | String Catalogs, pluralization, FormatStyle, right-to-left layout |
| [ios-memgraph-analysis](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/ios-memgraph-analysis/) | Simulator memgraph capture, leak ownership paths, reachable heap growth, raw evidence preservation |
| [ios-networking](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/ios-networking/) | URLSession async/await, REST APIs, downloads/uploads, WebSockets, pagination, retry, caching |
| [swift-security](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swift-security/) | Keychain Services, CryptoKit symmetric/asymmetric, biometric authentication, Secure Enclave, certificate trust, credential storage, OWASP compliance · *Based on [ivan-magda/swift-security-skill](https://github.com/ivan-magda/swift-security-skill)* |
| [ios-simulator](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/ios-simulator/) | xcrun simctl commands, device lifecycle, push/location/privacy simulation, log streaming, simulator limitations |
| [metrickit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/metrickit/) | MetricManager async reports, hang/crash diagnostics, production performance telemetry |
| [swiftlint](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/swiftlint/) | SwiftLint setup, .swiftlint.yml, build tool plugin, rule selection, baselines, suppressions, CI integration |

### Hardware & Device Integration

| Skill | What it covers |
|-------|---------------|
| [accessorysetupkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/accessorysetupkit/) | Privacy-preserving BLE/Wi-Fi accessory discovery, ASAccessorySession, picker UI |
| [core-bluetooth](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/core-bluetooth/) | CBCentralManager, CBPeripheral, BLE scanning/connecting, services, characteristics, background modes |
| [core-motion](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/core-motion/) | CMMotionManager, CMPedometer, accelerometer, gyroscope, activity recognition, altitude |
| [core-nfc](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/core-nfc/) | NFCNDEFReaderSession, NFCTagReaderSession, NDEF reading/writing, background tag reading |
| [dockkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/dockkit/) | DockAccessoryManager, camera subject tracking, motor control, framing |
| [pencilkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/pencilkit/) | PKCanvasView, PKDrawing, PKToolPicker, Apple Pencil drawing and annotation |
| [realitykit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/realitykit/) | RealityView, entities, anchors, ARKit world tracking, raycasting, scene understanding |
| [sensorkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/sensorkit/) | Research-grade sensor data, ambient light, keyboard metrics, device usage (approved studies) |

### Platform Integration

| Skill | What it covers |
|-------|---------------|
| [appmigrationkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/appmigrationkit/) | Cross-platform data transfer, AppMigrationExtension export/import (iOS 26) |
| [audioaccessorykit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/audioaccessorykit/) | Audio accessory features, automatic switching, device placement (iOS 26.4) |
| [browserenginekit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/browserenginekit/) | Alternative browser engines (EU), process management, web content extensions |
| [callkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/callkit/) | CXProvider, CXCallController, PushKit VoIP registration, call directory extensions |
| [cryptotokenkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/cryptotokenkit/) | TKTokenDriver, TKSmartCard, iOS 26 NFC smart cards, certificate-based auth |
| [energykit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/energykit/) | ElectricityGuidance, EnergyVenue, grid forecasts, load event submission, electricity insights |
| [homekit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/homekit/) | HMHomeManager, accessories, rooms, actions, triggers, MatterSupport commissioning |
| [permissionkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/permissionkit/) | AskCenter, PermissionQuestion, child communication safety, CommunicationLimits |
| [relevancekit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/relevancekit/) | Widget relevance signals, time/location-based relevance providers (watchOS 26) |
| [shareplay-activities](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/shareplay-activities/) | GroupActivity, GroupSession, GroupSessionMessenger, coordinated media playback |

### Gaming

| Skill | What it covers |
|-------|---------------|
| [gamekit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/gamekit/) | Game Center, GKLocalPlayer, leaderboards, achievements, real-time and turn-based multiplayer |
| [scenekit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/scenekit/) | SCNView, SCNScene, 3D geometry, materials, lighting, physics, SceneView |
| [spritekit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/spritekit/) | SKScene, SKSpriteNode, SKAction, physics simulation, particle effects, SpriteView |
| [tabletopkit](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/skills/tabletopkit/) | Multiplayer spatial board games, pieces, cards, dice, Group Activities (visionOS) |

## Structure

Each skill follows the open [Agent Skills](https://agentskills.io) standard:

```
skills/
  skill-name/
    SKILL.md              # Required — instructions and metadata
    references/           # Optional — detailed reference material
      some-topic.md
```

`SKILL.md` contains YAML frontmatter (`name`, `description`) and markdown instructions. The `references/` folder holds longer examples, advanced patterns, and lookup tables that the main file points to.

This repository contains original instructional content and examples for Apple platform development. Where Apple frameworks, APIs, documentation, WWDC sessions, or trademarks are referenced, those materials remain the property of Apple Inc. The license for this repository applies to this project's original content only and does not claim ownership of or relicense Apple's documentation, trademarks, sample code, or other third-party materials.

## Compatibility

These skills work with any agent that supports the [Agent Skills standard](https://agentskills.io), including:

- [Claude Code](https://claude.ai/code) (Anthropic)
- [OpenAI Codex](https://developers.openai.com/codex)
- [Cursor](https://cursor.com)
- [GitHub Copilot](https://github.com/features/copilot)
- [Windsurf](https://codeium.com/windsurf)
- [Roo Code](https://roocode.com)
- And [many more](https://skills.sh)

## Upgrading from v2.x

v3.0 is a major release. If you previously installed v2.x skills, note the following changes:

- **Skill count**: 57 skills in v2.2.0, 76 skills in v3.0.0.
- **Skill renames**: 12 existing skills renamed to use Apple Kit framework names. Old skill paths no longer resolve. Uninstall all skills and reinstall to upgrade.

  | v2.x name | v3.0 name |
  |-----------|-----------|
  | `live-activities` | `activitykit` |
  | `mapkit-location` | `mapkit` |
  | `photos-camera-media` | `photokit` |
  | `homekit-matter` | `homekit` |
  | `callkit-voip` | `callkit` |
  | `metrickit-diagnostics` | `metrickit` |
  | `pencilkit-drawing` | `pencilkit` |
  | `passkit-wallet` | `passkit` |
  | `musickit-audio` | `musickit` |
  | `cloudkit-sync` | `cloudkit` |
  | `eventkit-calendar` | `eventkit` |
  | `realitykit-ar` | `realitykit` |
- **19 new Kit framework skills**: avkit, gamekit, cryptokit, pdfkit, paperkit, spritekit, scenekit, financekit, accessorysetupkit, adattributionkit, carplay, appmigrationkit, browserenginekit, dockkit, sensorkit, tabletopkit, relevancekit, audioaccessorykit, cryptotokenkit.
- **New bundles**: `apple-kit-skills` (all 39 Apple Kit framework skills) and `ios-gaming-skills` (GameKit, SpriteKit, SceneKit, TabletopKit).
- **PaperKit standalone**: PaperKit content removed from `pencilkit` and is now its own `paperkit` skill.
- **Beta frameworks**: `permissionkit`, `energykit`, `paperkit`, `relevancekit`, `appmigrationkit`, and `audioaccessorykit` require iOS/watchOS 26 beta and are subject to API changes before GM.
- **All skills remain self-contained**: No skill references or depends on another.

To upgrade via the skills CLI:

```sh
npx skills add dpearson2699/swift-ios-skills
```

To upgrade Claude Code bundles, reinstall the bundles you use (old skill paths will no longer resolve).

## Support

If these skills save you time or improve your workflow, you can support ongoing maintenance through [GitHub Sponsors](https://github.com/sponsors/dpearson2699).

Support helps keep the collection current with new Apple releases, evolving framework APIs, updated examples, and compatibility work across Claude Code, Codex, Cursor, Copilot, and other agents.

## Sponsors

Thanks to the following people for supporting this project:

<a href="https://github.com/AnthonyJrWTF"><img src="https://github.com/AnthonyJrWTF.png" width="60" alt="Anthony Jr." style="border-radius: 50%;"></a>

## License

[PolyForm Perimeter 1.0.0](https://polyformproject.org/licenses/perimeter/1.0.0/) -- see [LICENSE](https://raw.githubusercontent.com/dpearson2699/swift-ios-skills/main/LICENSE)

**What this means in practice:**

- Using these skills to build your iOS app -- allowed
- Using these skills inside a closed-source commercial workflow -- allowed
- Forking the repo and contributing back -- allowed
- Sharing the skills with a teammate -- allowed
- Taking the skills, rebranding them as "Premium iOS Agent Skills," and selling them -- not allowed (that's a competing product)

This project is not affiliated with, endorsed by, or sponsored by Apple Inc.


---
*This skill was auto-generated from [dpearson2699/swift-ios-skills](https://github.com/dpearson2699/swift-ios-skills) — a UI Vault curated resource.*
