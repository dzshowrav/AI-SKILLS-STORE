# Settings Model — Tabbed Settings Interface

Source: Binary structural analysis of tab bar rendering, setting field/option types, and change detection.

## SettingsErrorModel

```go
type SettingsErrorModel struct {
    // Tab system (from binary: renderTabBar, handleSettings)
    tabs      []SettingsTab
    activeTab int

    // Setting fields (from binary: model.settingField, model.settingOption)
    fields  []SettingField
    options []SettingOption

    // Change tracking
    dirty    bool // unsaved changes exist
    error    string

    width, height int
}

type SettingField struct {
    Name        string
    Type        FieldType        // "text", "select", "toggle", "number"
    Value       interface{}
    Options     []SettingOption  // for "select" type
    Description string
    Key         string           // config key for persistence
    Validator   func(interface{}) error
}

type FieldType string
const (
    FieldText   FieldType = "text"   // free-text input
    FieldSelect FieldType = "select" // dropdown selection
    FieldToggle FieldType = "toggle" // on/off switch
    FieldNumber FieldType = "number" // numeric input with increment/decrement
)

type SettingOption struct {
    Label    string
    Value    interface{}
    Selected bool
}

type SettingsTab struct {
    Name   string
    Fields []SettingField
}
```

## Update — Tab Navigation

```go
func (m *SettingsErrorModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    switch msg := msg.(type) {
    case tea.WindowSizeMsg:
        m.width = msg.Width
        m.height = msg.Height
        return m, nil

    case tea.KeyMsg:
        switch msg.String() {
        case "tab", "right":
            m.activeTab = (m.activeTab + 1) % len(m.tabs)
            m.fields = m.tabs[m.activeTab].Fields
        case "shift+tab", "left":
            m.activeTab = (m.activeTab - 1 + len(m.tabs)) % len(m.tabs)
            m.fields = m.tabs[m.activeTab].Fields
        case "enter":
            m.handleSettingAction()
        case "esc":
            if m.dirty {
                return m, messages.ConfirmDiscardChanges()
            }
            return m, messages.SwitchToConversation()
        case "up":
            m.focusPreviousField()
        case "down":
            m.focusNextField()
        }

    case messages.StoreUpdateMsg:
        // Re-read settings from store
        m.refreshFromStore(msg.State)
    }
}
```

## Discovered Functions

```go
// renderTabBar — renders the tab bar at the top of the settings screen.
//
//	Active tab is highlighted (bold + accent color).
//	Inactive tabs are dimmed.
func (m *SettingsErrorModel) renderTabBar() string

// handleSettings — main settings update handler.
//
//	Dispatches to individual field-type handlers based on
//	the currently focused field's Type.
func (m *SettingsErrorModel) handleSettings(msg tea.KeyMsg)

// handleSettingsChanges — detects unsaved changes by comparing
//
//	current field values against the persisted config.
//	Sets m.dirty = true if any value differs.
func (m *SettingsErrorModel) handleSettingsChanges()

// openSetting — expands a setting field for editing.
//
//	Toggles between view mode (display value) and edit mode
//	(input widget visible).
func (m *SettingsErrorModel) openSetting(index int)

// refreshFromStore — loads setting values from store.Manager.
//
//	Initializes fields and tabs from the config schema.
func (m *SettingsErrorModel) refreshFromStore(state CombinedState)

// saveSettings — persists changes back to store/config file.
func (m *SettingsErrorModel) saveSettings() error
```

## View

```go
func (m *SettingsErrorModel) View() string {
    // Layout:
    //   1. Title bar
    //   2. Tab bar
    //   3. Setting fields (scrollable)
    //   4. Status line (error messages, save hints)

    title := styles.Title.Render("Settings")
    tabs := m.renderTabBar()
    body := m.renderFields()
    status := m.renderStatusLine()

    return lipgloss.JoinVertical(lipgloss.Top,
        title,
        tabs,
        styles.Separator(m.width),
        body,
        status,
    )
}

func (m *SettingsErrorModel) renderFields() string {
    var b strings.Builder
    for i, field := range m.fields {
        rendered := m.renderField(field, i == m.focusIndex)
        b.WriteString(rendered)
        b.WriteString("\n")
    }
    return b.String()
}

func (m *SettingsErrorModel) renderField(field SettingField, focused bool) string {
    style := styles.FieldNormal
    if focused {
        style = styles.FieldFocused
    }

    label := style.Render(field.Name)
    value := m.renderFieldValue(field)

    desc := ""
    if focused && field.Description != "" {
        desc = "\n" + styles.FieldDesc.Render(field.Description)
    }

    return label + "  " + value + desc
}

func (m *SettingsErrorModel) renderFieldValue(field SettingField) string {
    switch field.Type {
    case FieldToggle:
        if field.Value.(bool) {
            return styles.ToggleOn.Render("[ON]")
        }
        return styles.ToggleOff.Render("[OFF]")
    case FieldSelect:
        return styles.Value.Render(field.Value.(string))
    case FieldText:
        return styles.Value.Render(field.Value.(string))
    case FieldNumber:
        return styles.Value.Render(fmt.Sprintf("%v", field.Value))
    default:
        return ""
    }
}
```

## Example Settings Tabs

```go
// Tab structure discovered from store config schema:
//
// Tab 0: "General"     — theme, language, font size, auto-update
// Tab 1: "AI"          — default model, temperature, max tokens
// Tab 2: "Keys"        — API keys, provider configuration
// Tab 3: "Appearance"  — colors, compact mode, show avatars
// Tab 4: "Advanced"    — custom commands, proxy, experimental features
// Tab 5: "About"       — version, licenses, debug info

func defaultSettingsTabs() []SettingsTab {
    return []SettingsTab{
        {
            Name: "General",
            Fields: []SettingField{
                {Name: "Theme", Type: FieldSelect, Key: "theme", Options: []SettingOption{
                    {Label: "Dark", Value: "dark"},
                    {Label: "Light", Value: "light"},
                    {Label: "System", Value: "system"},
                }},
                {Name: "Auto Update", Type: FieldToggle, Key: "auto_update"},
            },
        },
        {
            Name: "AI",
            Fields: []SettingField{
                {Name: "Default Model", Type: FieldSelect, Key: "default_model"},
                {Name: "Temperature", Type: FieldNumber, Key: "temperature"},
                {Name: "Max Tokens", Type: FieldNumber, Key: "max_tokens"},
            },
        },
        // ... more tabs
    }
}
```

## Key Design Takeaways

1. **Tabbed layout** — the settings screen uses a horizontal tab bar at the top, inspired by terminal TUI conventions (similar to `htop` or `ncdu`).
2. **Four field types** — text, select (dropdown), toggle (on/off switch), and number (with increment/decrement).
3. **Dirty tracking** — `m.dirty` flag tracks unsaved changes; attempting to exit with unsaved changes triggers a confirmation dialog.
4. **Focus navigation** — Up/Down cycles through fields in the current tab; Tab/Shift+Tab cycles through tabs.
5. **Field descriptions** — shown below the focused field, hidden for unfocused fields to save vertical space.
6. **Store-backed persistence** — settings are read from and written to the store's config subsystem.
