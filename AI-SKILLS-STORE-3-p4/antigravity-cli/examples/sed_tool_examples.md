# Sed Tool Examples

---

## Simple Find & Replace

```
User: "Replace all 'foo' with 'bar' in main.go"
```

```
→ sed
  path: "main.go"
  expression: "s/foo/bar/g"
```

---

## Pattern-Based Replace

```
User: "Update all import paths from old to new"
```

```
→ sed
  path: "src/"
  expression: "s/github.com/old-repo/github.com/new-repo/g"
  recursive: true
  include: "*.go"
```
