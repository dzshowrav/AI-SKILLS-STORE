; Find all in-progress actions
; Usage: tree-sitter query queries/actions/in-progress.scm examples/

(root_action
  state: (state
    (state_in_progress)) @state
  name: (name) @action.name) @action

[(depth1_action) (depth2_action) (depth3_action) (depth4_action) (depth5_action)] @child_action
  (state (state_in_progress)) @state
  (name) @action.name
