# Knowledge Tool Examples

---

## Write Knowledge Item

```
User: "Save the project's database schema as a knowledge item"
```

```
→ knowledge_write_to_file
  path: "/workspace/.knowledge/database_schema/reference.md"
  content: "## Database Schema\n\n### Tables\n\n#### users\n- id: UUID (PK)\n- email: VARCHAR(255) UNIQUE\n- created_at: TIMESTAMP\n..."

← Knowledge item "database_schema" created.
```

---

## Replace Knowledge File Content

```
User: "Update the database schema knowledge item"
```

```
→ knowledge_replace_file_content
  path: "/workspace/.knowledge/database_schema/reference.md"
  oldString: "- email: VARCHAR(255) UNIQUE"
  newString: "- email: VARCHAR(320) UNIQUE\n- username: VARCHAR(50) UNIQUE"

← Knowledge item updated.
```

---

## Delete Knowledge Item

```
User: "Remove the outdated schema knowledge item"
```

```
→ delete_knowledge_file
  pathToDelete: "/workspace/.knowledge/database_schema"

← Knowledge item "database_schema" deleted.
```
