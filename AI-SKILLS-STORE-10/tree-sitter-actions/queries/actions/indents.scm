; Indent child actions relative to their parent
; This matches the Topiary formatting behavior

; Root actions contain depth1 children
(root_action
  (depth1_action) @indent.begin @indent.end
)

; Depth1 actions contain depth2 children
(depth1_action
  (depth2_action) @indent.begin @indent.end
)

; Depth2 actions contain depth3 children
(depth2_action
  (depth3_action) @indent.begin @indent.end
)

; Depth3 actions contain depth4 children
(depth3_action
  (depth4_action) @indent.begin @indent.end
)

; Depth4 actions contain depth5 children
(depth4_action
  (depth5_action) @indent.begin @indent.end
)
