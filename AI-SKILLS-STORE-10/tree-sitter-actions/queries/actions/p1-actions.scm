; Find all priority 1 actions
; Usage: tree-sitter query queries/actions/p1-actions.scm examples/with_priority.actions

(root_action
  name: (name) @action.name
  metadata: (priority) @priority
  (#eq? @priority "!1")) @action

[(depth1_action) (depth2_action) (depth3_action) (depth4_action) (depth5_action)] @child_action
  (name) @action.name
  (priority) @priority
  (#eq? @priority "!1")
