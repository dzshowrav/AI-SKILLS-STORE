---
name: emoji-regex
description: Regular expression to match all emoji symbols, sequences, and skin tone variations.
license: MIT
metadata:
  version: "1.0.0"
  category: terminal
  tags: ["emoji", "regex", "unicode", "terminal"]
---

# emoji-regex

Regular expression to match all emoji symbols, modifiers, sequences, and skin tone variations.

```typescript
import emojiRegex from 'emoji-regex'

const regex = emojiRegex()
const text = 'Hello 👋 World 🌍'
const matches = text.match(regex)
// ['👋', '🌍']

// Remove emoji
const clean = text.replace(regex, '').trim()
// 'Hello World'
```
