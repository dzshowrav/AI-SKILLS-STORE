# Steps Accumulator Reference

---

## Overview

The accumulator system transforms raw step execution data into structured, user-friendly views.

```
cortex/accumulator/
  accumulator.go                    — Base accumulator logic
  goal_accumulator.go               — Active goal tracking
  background_task_accumulator.go    — Background task status
  skill_accumulator.go              — Skill execution tracking
  orchestrator.go                   — Coordinates multiple accumulators
```

---

## Accumulator Types

### ActiveGoalAccumulator
Tracks the current active goal:
```go
type ActiveGoalAccumulator struct {
    Goal        string
    Steps       []AccumulatedStep
    Progress    float64
    Status      GoalStatus
}

type GoalStatus string
const (
    GoalActive     GoalStatus = "active"
    GoalCompleted  GoalStatus = "completed"
    GoalFailed     GoalStatus = "failed"
    GoalAbandoned  GoalStatus = "abandoned"
)
```

### AllGoalsAccumulator
Tracks all goals (for multi-step tasks):
```go
type AllGoalsAccumulator struct {
    Goals []ActiveGoalAccumulator
}
```

### BackgroundTaskAccumulator
Tracks background commands and their status:
```go
type BackgroundTaskAccumulator struct {
    Tasks []BackgroundTask
}

type BackgroundTask struct {
    ID        string
    Command   string
    Status    string
    PID       int32
    StartedAt time.Time
    Output    string
}
```

### SkillAccumulator
Tracks skill-related steps:
```go
type SkillAccumulator struct {
    ActiveSkills []SkillInfo
}

type SkillInfo struct {
    Name        string
    Version     string
    Status      string
    Steps       int32
}
```

---

## Key Functions

```go
func AccumulateAll(steps []*Step) *AccumulatedView
func GetAccumulatedState() *AccumulatedState
func GetActiveGoalState() *ActiveGoalAccumulator
func NewActiveGoalAccumulator(goal string) *ActiveGoalAccumulator
func NewAllGoalsAccumulator(goals []string) *AllGoalsAccumulator
func getStepIcon(step *Step) string       // Icon for step type
func buildActiveGoalItem(accum *ActiveGoalAccumulator) string
func buildHistoryItem(step *Step) string
func processGoalSteps(steps []*Step) []AccumulatedStep
func isSkillFile(path string) bool
func removeSkill(path string)
```

---

## Step Icons

```go
func getStepIcon(step *Step) string {
    // Returns emoji/icon based on step type and status
}
```
