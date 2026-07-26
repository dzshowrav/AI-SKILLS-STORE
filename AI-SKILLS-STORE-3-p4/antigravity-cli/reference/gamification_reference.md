# Gamification System Reference

---

## Architecture

```
cortex/gamification/
  badges_external.go     — Badge definitions and granting logic
```

Integration with `moma_badge_granterhttp` HTTP endpoint for server-side badge granting.

---

## Badge Types

Badges are granted asynchronously via `MaybeGrantMomaBadgeAsync()`. Each badge represents an achievement.

### Example Badge Categories (from binary strings):
- Achievement badges (first conversation, first code edit, etc.)
- Streak badges (7-day, 30-day streaks)
- Milestone badges (100 tools used, 1000 lines written)
- Skill badges (various skill completions)

---

## XP / Experience Points

Users earn XP through:
- Completing conversations
- Running tools successfully
- Writing code
- Getting tests to pass
- Using the CLI regularly

---

## Level System

```
Level 1: 0 XP (Beginner)
Level 2: 100 XP
Level 3: 300 XP
Level 4: 600 XP
... scaling up
```

Level determines:
- Feature unlocks
- Tool access
- UI theme options

---

## Streaks

Consecutive daily usage tracking:
- Daily streak counter
- Streak freeze items (for missed days)
- Bonus XP for streak milestones

---

## Leaderboard

```
Rankings based on:
- Total XP
- Current streak
- Achievements unlocked
- Tools executed
- Lines of code written
```

---

## Rewards & Unlocks

Unlockable features through the reward system:
- Additional themes
- Custom prompt templates
- Extended context windows
- Priority support access

---

## Data Model

```go
type GamificationState struct {
    UserID       string
    XP           int64
    Level        int32
    StreakDays   int32
    Badges       []Badge
    Achievements []Achievement
    LastActiveAt time.Time
    CreatedAt    time.Time
}

type Badge struct {
    ID          string
    Name        string
    Description string
    Icon        string
    GrantedAt   time.Time
    Rarity      BadgeRarity
}

type BadgeRarity string
const (
    RarityCommon   BadgeRarity = "common"
    RarityUncommon BadgeRarity = "uncommon"
    RarityRare     BadgeRarity = "rare"
    RarityEpic     BadgeRarity = "epic"
    RarityLegendary BadgeRarity = "legendary"
)

type Achievement struct {
    ID          string
    Name        string
    Description string
    XP          int64
    Progress    float64
    Completed   bool
    CompletedAt *time.Time
}
```
