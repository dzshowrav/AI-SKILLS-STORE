; Find all not-started actions
; Usage: tree-sitter query queries/actions/not-started.scm examples/

(root_action
  state: (state
    (state_not_started)) @state
  name: (name) @action.name) @action

[(depth1_action) (depth2_action) (depth3_action) (depth4_action) (depth5_action)] @child_action
  (state (state_not_started)) @state
  (name) @action.name
