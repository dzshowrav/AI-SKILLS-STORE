# Tab Code Edit Examples

---

## Edit via Tab

Used when editing files through editor tabs rather than file paths directly.

```
→ tab_code_edit
  tabId: "tab-main.go"
  replacementChunks: [
    {
      oldString: "func oldFunc()",
      newString: "func newFunc()"
    }
  ]

  ← Tab edit applied to main.go
```

---

## Multiple Chunks in Tab

```
→ tab_code_edit
  tabId: "tab-main.go"
  replacementChunks: [
    {
      oldString: "func oldFunc()",
      newString: "func newFunc()"
    },
    {
      oldString: "// TODO: implement",
      newString: "// Implemented in newFunc"
    }
  ]

  ← 2 chunks applied to tab.
```
