; Find all actions with a story/project
; Usage: tree-sitter query queries/actions/with_specific_story.scm examples/with_story.actions
; Note: To filter by specific story name, use additional filtering with grep/jq

(root_action
  name: (name) @action.name
  metadata: (story) @story.name) @action
