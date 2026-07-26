; Find all actions that have children
; Usage: tree-sitter query queries/actions/with-children.scm examples/with_children.actions

(root_action
  name: (name) @parent.name
  child: [(depth1_action) (depth2_action) (depth3_action) (depth4_action) (depth5_action)] @child) @parent
