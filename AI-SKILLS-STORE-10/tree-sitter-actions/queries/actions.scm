;; ==============================================================================
;; Topiary formatting query for .actions files
;;
;; Scope: Vertical spacing AND indentation.
;; The format enforces consistent indentation based on action depth.
;;
;; See specifications/formatting.md for details.
;; ==============================================================================

;; ------------------------------------------------------------------------------
;; Vertical Spacing
;; ------------------------------------------------------------------------------

;; Each root action ends with a newline
(root_action) @append_hardline

;; Child actions start on new lines
(depth1_action) @prepend_hardline
(depth2_action) @prepend_hardline
(depth3_action) @prepend_hardline
(depth4_action) @prepend_hardline
(depth5_action) @prepend_hardline

;; ------------------------------------------------------------------------------
;; Indentation - Each depth level indents its children
;; ------------------------------------------------------------------------------

;; Root actions contain depth1 children - indent them
(root_action
  (depth1_action) @prepend_indent_start @append_indent_end
)

;; Depth1 actions contain depth2 children - indent them
(depth1_action
  (depth2_action) @prepend_indent_start @append_indent_end
)

;; Depth2 actions contain depth3 children - indent them
(depth2_action
  (depth3_action) @prepend_indent_start @append_indent_end
)

;; Depth3 actions contain depth4 children - indent them
(depth3_action
  (depth4_action) @prepend_indent_start @append_indent_end
)

;; Depth4 actions contain depth5 children - indent them
(depth4_action
  (depth5_action) @prepend_indent_start @append_indent_end
)

;; Adding Spaces Before and After Metadata
(completed_date) @prepend_space
(created_date) @prepend_space
(predecessor) @prepend_space
