# Browser Tool Call Examples

---

## Navigate & Screenshot

```
User: "Check the homepage"
```

```
→ browser_navigate
  url: "http://localhost:3000"

→ browser_screenshot

→ browser_console_logs

← Page loaded, screenshot captured, no console errors.
```

---

## Click Element & Input Text

```
User: "Fill out the login form"
```

```
→ browser_navigate
  url: "http://localhost:3000/login"

→ browser_input_text
  selector: "#username"
  value: "admin"

→ browser_input_text
  selector: "#password"
  value: "password123"

→ browser_click
  selector: "#submit-btn"

→ browser_wait_for_navigation
  expected_url: "http://localhost:3000/dashboard"

← Successfully logged in, redirected to dashboard.
```

---

## Full Browser Workflow

```
User: "Test the search feature on the docs page"
```

```
→ browser_navigate
  url: "http://localhost:3000/docs"

→ browser_get_dom
  → Returns DOM tree for analysis

→ browser_input_text
  selector: "#search-input"
  value: "authentication"

→ browser_press_key
  key: "Enter"

→ browser_wait_for_navigation

→ browser_screenshot

→ browser_get_network_request
  url_filter: "/api/search"

→ browser_javascript
  script: "document.querySelector('.results-count')?.textContent"

← Search returned 5 results for "authentication".
```

---

## DevTools / Network Inspection

```
User: "Check if there are any failed API calls"
```

```
→ browser_navigate
  url: "http://localhost:3000/app"

→ browser_list_network_requests

→ browser_get_network_request
  url_filter: "/api/"

→ browser_console_logs

← Found 1 failed request to /api/users (404), no console errors.
```

---

## Cross-Page Interaction

```
User: "Open two pages and compare them"
```

```
→ browser_navigate
  url: "http://localhost:3000/page-a"

→ browser_list_pages
  → Returns: [{id: "page-1", url: "..."}]

→ browser_javascript
  script: "window.open('/page-b', '_blank')"

→ browser_list_pages
  → Returns: [{id: "page-1", url: "..."}, {id: "page-2", url: "..."}]

→ browser_navigate
  page_id: "page-2"
  url: "http://localhost:3000/page-b"

→ browser_screenshot
  page_id: "page-2"

→ browser_javascript
  page_id: "page-1"
  script: "document.title"

← Page A title: "Page A", Page B screenshot captured.
```

---

## Drag & Drop

```
→ browser_navigate
  url: "http://localhost:3000/drag-drop-demo"

→ browser_drag_pixel_to_pixel
  start_x: 100
  start_y: 200
  end_x: 300
  end_y: 200
  duration_ms: 500

← Element dragged from (100,200) to (300,200) over 500ms.
```

---

## Resize Window

```
→ browser_resize_window
  width: 375
  height: 812

→ browser_screenshot
  → Mobile view screenshot

→ browser_resize_window
  width: 1024
  height: 768

→ browser_screenshot
  → Desktop view screenshot
```
