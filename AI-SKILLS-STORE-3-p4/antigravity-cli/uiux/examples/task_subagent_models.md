# Task & Subagent Models — Multi-Agent Workflow UI

Source: Binary structural analysis of task/subagent state tracking, trajectory building, and alert handling.

## TasksModel

```go
type TasksModel struct {
    tasks      []Task
    activeTask int

    // store.TaskManager reference for dispatching task commands
    taskManager *store.TaskManager

    width, height int
}

type Task struct {
    ID          string
    Description string
    Status      TaskStatus
    Subagents   []SubagentInfo
    CreatedAt   time.Time
    UpdatedAt   time.Time
}

type TaskStatus string
const (
    TaskPending    TaskStatus = "pending"
    TaskInProgress TaskStatus = "in_progress"
    TaskCompleted  TaskStatus = "completed"
    TaskFailed     TaskStatus = "failed"
    TaskBlocked    TaskStatus = "blocked"
)
```

## SubagentDetailModel

```go
type SubagentDetailModel struct {
    subagent   SubagentInfo
    trajectory []StepInfo

    // Functions: buildSubagentTrajectory, handleSubagentAlerts
    alerts     []Alert
    alertIndex int

    width, height int
}

type SubagentInfo struct {
    Name       string
    Role       string
    Status     string          // "idle", "running", "completed", "failed"
    Steps      []StepInfo
    TokenUsage TokenUsage
    Duration   time.Duration
}

type StepInfo struct {
    Index     int
    Action    string           // "think", "tool_call", "tool_result", "message"
    Input     string
    Output    string
    Status    string           // "running", "completed", "failed"
    Duration  time.Duration
    Timestamp time.Time
}

type Alert struct {
    Type    string   // "info", "warning", "error", "success"
    Message string
    Source  string   // subagent name
}

type TokenUsage struct {
    TokensIn  int
    TokensOut int
    Cost      float64
}
```

## Update — TasksModel

```go
func (m *TasksModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.WindowSizeMsg:
        m.width = msg.Width
        m.height = msg.Height
        return m, nil

    case tea.KeyMsg:
        switch msg.String() {
        case "up":
            if m.activeTask > 0 {
                m.activeTask--
            }
        case "down":
            if m.activeTask < len(m.tasks)-1 {
                m.activeTask++
            }
        case "enter":
            // Open task detail / subagent view
            return m, messages.OpenTaskDetail(m.tasks[m.activeTask].ID)
        case "n":
            // New task
            return m, messages.NewTaskMsg{}
        }

    case messages.StoreUpdateMsg:
        m.tasks = m.taskManager.ListTasks()
        return m, nil
    }
}
```

## Update — SubagentDetailModel

```go
func (m *SubagentDetailModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.WindowSizeMsg:
        m.width = msg.Width
        m.height = msg.Height
        return m, nil

    case tea.KeyMsg:
        switch msg.String() {
        case "esc":
            return m, messages.CloseSubagentDetail()
        case "up", "down":
            m.navigateSteps(msg.String())
        }

    case messages.StoreUpdateMsg:
        // Refresh subagent trajectory and alerts from store
        m.trajectory = msg.State.SubagentSteps.SubagentSteps
        m.alerts = m.buildAlerts()
        return m, nil
    }
}
```

## Discovered Functions

```go
// buildSubagentTrajectory — builds the full step trajectory for a subagent.
//
//	Transforms raw step data into a display-friendly format with
//	timestamps, durations, and status indicators.
//	Used by SubagentDetailModel.View() to render the step list.
func buildSubagentTrajectory(steps []StepInfo) []StepInfo

// buildTaskDetailLines — builds display lines for a task detail view.
//
//	Shows task status, subagent list, and overall progress.
//	Returns a slice of strings, one per line.
func buildTaskDetailLines(task Task, width int) []string

// renderTaskCheckBox — renders a task status as a checkbox.
//
//	Patterns:
//	  "[ ]" — pending
//	  "[~]" — in progress
//	  "[✓]" — completed
//	  "[✗]" — failed
//	  "[-]" — blocked
func renderTaskCheckBox(status TaskStatus) string

// handleSubagentAlerts — manages subagent alert notifications.
//
//	Processes new alerts from store updates and manages the alert queue.
//	Alerts are shown as a rotating banner or notification popup.
func (m *SubagentDetailModel) handleSubagentAlerts()

// handleTaskMode — handles switching between task management modes.
//
//	Modes: "list" (all tasks), "detail" (single task), "subagent" (step view)
func (m *TasksModel) handleTaskMode(mode string)

// updateStepInTrajectory — updates a single step's state in the trajectory.
//
//	Called when a subagent step completes or fails.
//	Updates the step status in-place without rebuilding the entire list.
func updateStepInTrajectory(trajectory []StepInfo, stepIndex int, status string, output string) []StepInfo
```

## View — TasksModel

```go
func (m *TasksModel) View() string {
    // Layout:
    //   1. Header "Tasks (N)"
    //   2. Task list (scrollable)
    //   3. Status bar (keybinding hints)

    header := styles.Title.Render(fmt.Sprintf("Tasks (%d)", len(m.tasks)))
    list := m.renderTaskList()
    hints := m.renderHints()

    return lipgloss.JoinVertical(lipgloss.Top, header, list, hints)
}

func (m *TasksModel) renderTaskList() string {
    var b strings.Builder
    for i, task := range m.tasks {
        checkbox := renderTaskCheckBox(task.Status)
        selected := i == m.activeTask

        if selected {
            b.WriteString(styles.TaskActive.Render)
        }
        b.WriteString(fmt.Sprintf(" %s %s\n", checkbox, task.Description))
    }
    return b.String()
}
```

## View — SubagentDetailModel

```go
func (m *SubagentDetailModel) View() string {
    // Layout:
    //   1. Header (subagent name + role)
    //   2. Stats bar (steps, tokens, duration)
    //   3. Step trajectory (scrollable)
    //   4. Alerts section (if any)
    //   5. Status bar

    header := m.renderHeader()
    stats := m.renderStats()
    steps := m.renderSteps()
    alerts := m.renderAlerts()
    status := m.renderStatus()

    return lipgloss.JoinVertical(lipgloss.Top,
        header, stats, steps, alerts, status,
    )
}

func (m *SubagentDetailModel) renderSteps() string {
    var b strings.Builder
    for _, step := range m.trajectory {
        statusIcon := m.stepIcon(step.Status)
        line := fmt.Sprintf("  %s Step %d: %s (%.1fs)",
            statusIcon, step.Index, step.Action,
            step.Duration.Seconds())
        b.WriteString(line + "\n")
    }
    return b.String()
}

func (m *SubagentDetailModel) stepIcon(status string) string {
    switch status {
    case "running":
        return "[~]"  // yellow, animated
    case "completed":
        return "[✓]"  // green
    case "failed":
        return "[✗]"  // red
    default:
        return "[ ]"  // dim
    }
}
```

## Key Design Takeaways

1. **Two-level navigation** — TasksModel shows the task list; pressing Enter on a task opens SubagentDetailModel for per-step detail.
2. **Status checkbox pattern** — consistent `[ ], [~], [✓], [✗], [-]` notation across all task/subagent rendering.
3. **Alert system** — subagents generate alerts (warnings, errors, info) that SubagentDetailModel collects and displays as rotating banners.
4. **Trajectory immutability** — `updateStepInTrajectory` creates a new slice when updating a step rather than mutating in place.
5. **Store-driven refresh** — both models read from `StoreUpdateMsg`; there is no direct RPC between models and the backend.
6. **Token tracking** — each subagent tracks its own token usage, displayed in the stats bar alongside step counts and wall-clock duration.
