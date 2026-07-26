;; ============================================================================
;; State Icons - Replace entire state based on type
;; ============================================================================

; Conceal brackets (hide completely)
((state_open) @conceal (#set! conceal ""))
((state_close) @conceal (#set! conceal ""))

; Conceal state value and replace with icon based on type
((state_not_started) @conceal (#set! conceal "󰄱"))
((state_completed) @conceal (#set! conceal "󰄵"))
((state_in_progress) @conceal (#set! conceal "󰄳"))
((state_blocked) @conceal (#set! conceal "󰅙"))
((state_cancelled) @conceal (#set! conceal "󰪑"))


;; ============================================================================
;; Child Markers - Make completely invisible
;; ============================================================================

; Depth markers: >, >>, >>>, etc. -> invisible
((depth1_marker) @conceal (#set! conceal ""))
((depth2_marker) @conceal (#set! conceal ""))
((depth3_marker) @conceal (#set! conceal ""))
((depth4_marker) @conceal (#set! conceal ""))
((depth5_marker) @conceal (#set! conceal ""))


;; ============================================================================
;; ID - Replace # with icon and hide UUID
;; ============================================================================

; Replace # with icon
((id_hash) @conceal (#set! conceal "🆔"))

; Hide the UUID completely
((uuid_value) @conceal (#set! conceal ""))


;; ============================================================================
;; Created Date - Replace ^ with icon and hide datetime
;; ============================================================================

; Replace ^ with icon (same approach as ID)
(created_date "^" @conceal (#set! conceal "󰜋"))

; Hide the datetime value within created_date completely
(created_date (datetime) @conceal (#set! conceal ""))


;; ============================================================================
;; Other Highlighting
;; ============================================================================

; Action content - make name bold
(name) @markup.strong
(description) @text.note

; Metadata icons - replace markers with icons
(priority "!" @conceal (#set! conceal "󰀦"))
(story "*" @conceal (#set! conceal "󰙨"))
(context "+" @conceal (#set! conceal "󰓹"))
; Description markers: opening $ with icon, closing $ hidden
(description icon: (description_marker) @conceal (#set! conceal "💬"))
(description close: (description_marker) @conceal (#set! conceal ""))
(do_date "@" @conceal (#set! conceal "󰃭"))
(completed_date "%" @conceal (#set! conceal "󰄬"))

; Date/time values and durations read as data, not plain text (they were white)
(do_date datetime: (datetime) @number)
(do_date duration: (duration) @number)
(due_date datetime: (datetime) @number)
(due_date duration: (duration) @number)

;; Links - show title when present, otherwise show the URL
((link "[[" @conceal (#set! conceal "")))
((link "]]" @conceal (#set! conceal "")))
((link text: (link_text) "|" @conceal (#set! conceal "")))
((link text: (link_text) url: (link_url) @conceal (#set! conceal "")))

; Give visible link text link styling plus an underline, even when the destination is concealed
(link text: (link_text) @markup.link.label)
(link text: (link_text) @markup.underline)

; URLs should remain obviously link-like when visible
(link url: (link_url) @markup.link.url)
