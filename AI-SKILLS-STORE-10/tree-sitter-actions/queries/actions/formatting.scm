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
;;
;; Two rules, covering every horizontal boundary: state -> name, and
;; name/field -> field. This only works because the grammar's text-bearing
;; tokens (name, description text, story, tags, predecessor names) are defined
;; to never absorb leading/trailing whitespace into their own byte range (see
;; patterns.js notCharsTrimmed) -- otherwise these directives, and topiary's
;; own single-space gap reconstruction around links inside a description, would
;; double up with whitespace already baked into the neighboring leaf.
(_ name: (_) @prepend_space)
(_ metadata: (_) @prepend_space)

;; Spaces Around Links
;;
;; Links ([[...]]) live inside name/description content, interleaved with text
;; chunks. Because those chunks are trimmed (notCharsTrimmed), the space that
;; separated a link from its neighbor is stored in no leaf and would be dropped
;; on format. Re-add exactly one space at each boundary a link participates in
;; -- but only toward an *existing* sibling, so we never emit a leading space
;; (owned by the name: rule), a trailing space at end-of-line, or a doubled
;; space before following metadata (owned by the metadata: rule).
(_ (_) @append_space . (link))
(_ (link) @append_space . (_))

;; A link hugging the opening or closing $ of a description has no text sibling
;; to anchor against (the $ marker lives one level up, on the description). So a
;; link that is the first/last child of the content still floats with a space,
;; while plain-text descriptions stay compact against their markers.
(description_content . (link) @prepend_space)
(description_content (link) @append_space .)
