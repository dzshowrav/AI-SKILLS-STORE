# Gamification Examples

---

## Badge Flow

```
User completes 10 conversations:

  → MaybeGrantMomaBadgeAsync("conversation_milestone_10")
    → Check if user has badge
    → No → Grant "Chatterbox" badge
    → Add 50 XP
    → Check level-up
    → Notify user in UI
```

---

## XP & Level Up

```
User writes 1000 lines of code:

  → +100 XP (code_written)
  → Current: 450 XP → Level 4
  → Check achievements
  → "Code Artisan" achievement unlocked at 1000 lines
  → +50 XP bonus
  → Total: 500 XP → Level 5!
  → Notification: "Level Up! You're now Level 5"
```

---

## Streak Tracking

```
User logs in for 7 consecutive days:

  → Streak: 7 days
  → "Weekly Warrior" badge granted
  → +100 XP streak bonus
  → Streak freeze earned (1 free skip)
```

---

## Leaderboard View

```
User checks progress:

  Your Stats:
    XP: 2,450
    Level: 12
    Streak: 14 days
    Badges: 8
    Achievements: 5
    Rank: #42 of 1,234 users
```
