# Browser Panel UI

---

## Browser DevTools Panel

```
┌─ Browser ─────────────────────────────────────────┐
│  ● http://localhost:3000/dashboard    [↻] [✕]    │
├──────────────────────────────────────────────────┤
│  ┌─ Page ─────────────────────────────────────┐  │
│  │                                              │  │
│  │  (screenshot/rendered content area)          │  │
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
│  ┌─ Network ──────────────────────────────────┐   │
│  │  GET  /api/users       200  1.2s           │   │
│  │  GET  /api/posts       200  0.8s           │   │
│  │  POST /api/login       401  0.3s  ⚠       │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
│  ┌─ Console ──────────────────────────────────┐   │
│  │  [LOG] App initialized                     │   │
│  │  [WARN] Deprecated API used                │   │
│  │  [ERROR] Failed to load config             │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
│  [ Navigate ] [ Click ] [ JS ] [ Screenshot ]      │
└────────────────────────────────────────────────────┘
```

---

## Browser Tab Management

```
┌─ Browser Pages ───────────────────────────────────┐
│                                                    │
│  1. ● Dashboard         http://localhost:3000/     │
│  2. ○ Settings          http://localhost:3000/set  │
│  3. ○ Profile           http://localhost:3000/pro  │
│                                                    │
│  [ + New Tab ]  [ ✕ Close Tab ]                    │
└────────────────────────────────────────────────────┘
```

- Open tabs shown in sidebar
- Active tab highlighted
- Switch with Up/Down + Enter
- Ctrl+T for new tab
