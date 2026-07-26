# Gamification UI

---

## Badge Display in StatusBar

```
● Level 12  ★★★  XP: 2,450  Streak: 14d  │ Files: 3  Git: main
```

- Level shown in status bar
- Stars for rare badges
- XP progress (compact)
- Streak counter (daily)

---

## Achievement Notification

```
┌──────────────────────────────────────────────────────┐
│  ╔══════════════════════════════════════════════╗     │
│  ║  🏆 Achievement Unlocked!                    ║     │
│  ║                                              ║     │
│  ║  "Code Artisan"                              ║     │
│  ║  Write 1000 lines of code                    ║     │
│  ║                                              ║     │
│  ║  +150 XP  │  Level Up! (5)                   ║     │
│  ╚══════════════════════════════════════════════╝     │
│                                                      │
│  [ OK ]  [ View All Achievements ]                   │
└──────────────────────────────────────────────────────┘
```

- Appears as overlay at top
- Auto-dismiss after 3s
- XP and level changes shown
- Click to view all achievements

---

## Profile Panel

```
┌─ Profile ─────────────────────────────────────┐
│                                                │
│  Level 12                                      │
│  ████████████████████████░░░░░ 65%             │
│  XP: 2,450 / 5,000                             │
│                                                │
│  Badges (8)                                    │
│  ⭐ Chatterbox     ★ Rare     #1               │
│  ⭐ Code Artisan   ★ Epic     #3               │
│  ⭐ Weekly Warrior ★ Common   #5               │
│  ...                                           │
│                                                │
│  Achievements (5/20)                           │
│  ✓ First Conversation                          │
│  ✓ First Code Edit                             │
│  ✓ 10 Tools Used                               │
│  ✓ 1000 Lines Written                          │
│  ✓ 7-Day Streak                                │
│                                                │
│  Streak: 14 days 🔥                            │
│  Rank: #42 of 1,234                            │
└────────────────────────────────────────────────┘
```

- Toggle with `/profile` or from settings
- Progress bar for next level
- Badges with rarity tag
- Achievement checklist
- Streak indicator
- Leaderboard rank

---

## XP Toast

Small transient notification for minor XP gains:

```
┌────────────────────────────────┐
│ +25 XP  │  "edited main.go"    │
└────────────────────────────────┘
```

- Shows briefly (1.5s)
- Slides up from command input area
- No interaction needed
