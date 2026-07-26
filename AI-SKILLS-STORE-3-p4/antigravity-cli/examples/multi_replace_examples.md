# Multi-Replace Tool Examples

---

## Multi-Replace Non-Contiguous Edits

```
User: "Update multiple function signatures at once"
```

```
→ multi_replace_file_content
  path: "main.go"
  chunks: [
    {
      oldString: "func process(data []byte) error {\n    return nil\n}",
      newString: "func process(ctx context.Context, data []byte) error {\n    return nil\n}"
    },
    {
      oldString: "func validate(input string) bool {\n    return true\n}",
      newString: "func validate(ctx context.Context, input string) bool {\n    return true\n}"
    },
    {
      oldString: "import \"fmt\"",
      newString: "import (\n    \"context\"\n    \"fmt\"\n)"
    }
  ]

  ← 3 chunks applied to main.go
```

---

## Single Replace (Simple)

```
→ single_replace_file_content
  path: "main.go"
  chunk: {
    oldString: "fmt.Println(\"hello\")",
    newString: "log.Println(\"hello\")"
  }

  ← 1 replacement applied.
```
