---
name: mlbonniec/OnBoardingKit
description: UI Vault resource — iOS Onboarding & Liquid Glass. https://github.com/mlbonniec/OnBoardingKit
source: https://github.com/mlbonniec/OnBoardingKit
category: iOS Onboarding & Liquid Glass
type: external-resource
github: mlbonniec/OnBoardingKit
---

# mlbonniec/OnBoardingKit

> iOS Onboarding & Liquid Glass · [Open source](https://github.com/mlbonniec/OnBoardingKit)

This skill provides comprehensive reference for using **mlbonniec/OnBoardingKit** in your projects.
All examples, components, and patterns described below are from the official documentation.

---

![Cover](https://github.com/mlbonniec/OnBoardingKit/assets/29955402/db543528-b91e-4d28-ab30-e7a9e92272de)
*All of these views are original Apple views, recreated using the library.*

# OnBoardingKit

OnBoardingKit is a configurable on boarding screen view for SwiftUI.
It's inspired by on boarding views on Apple native apps, and [UIOnboarding](https://github.com/lascic/uionboarding) Swift Package.

OnBoardingKit behavior is inspired by the new [TipKit](https://developer.apple.com/documentation/tipkit) library from Apple.

> [!NOTE]
> OnBoardingKit is available on iOS 15 and later.

# Quick Start
To create an on boarding view, you simply have to create a struct conforming to the `OnBoarding` protocol.
Then, it's very easy to display it with the `OnBoardingView`.

```swift
struct OnBoardingDemo: OnBoarding {
  // …
}

Text("Hello, World!")
  .presentOnBoarding(OnBoardingDemo(), action: {})
```

# Documentation
You can find the full documentation on the [wiki](https://github.com/mlbonniec/OnBoardingKit/wiki).

# License
This project is licensed under MIT.

> [!IMPORTANT]
> If you're using this project into yours, you **must** incluse the license and copyright notice

See [LICENSE](https://raw.githubusercontent.com/mlbonniec/OnBoardingKit/master/./LICENSE) for more details.


---
*This skill was auto-generated from [mlbonniec/OnBoardingKit](https://github.com/mlbonniec/OnBoardingKit) — a UI Vault curated resource.*
