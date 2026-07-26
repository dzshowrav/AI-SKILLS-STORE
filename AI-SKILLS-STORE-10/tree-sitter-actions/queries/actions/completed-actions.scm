; Find all completed actions
; Usage: tree-sitter query queries/actions/completed-actions.scm examples/

(root_action
  state: (state
    (state_completed)) @state
  name: (name) @action.name) @action

[(depth1_action) (depth2_action) (depth3_action) (depth4_action) (depth5_action)] @child_action
  (state (state_completed)) @state
  (name) @action.name
