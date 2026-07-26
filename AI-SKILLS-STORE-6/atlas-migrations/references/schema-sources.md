# Schema Sources Reference

## HCL Schema
```hcl
data "hcl_schema" "<name>" {
  path = "schema.hcl"
}
env "<name>" {
  schema {
    src = data.hcl_schema.<name>.url
  }
}
```

## External Schema (ORM Integration)

### GORM (Go)
```hcl
data "external_schema" "gorm" {
  program = ["go", "run", "-mod=mod", "ariga.io/atlas-provider-gorm", "load", "--path", "./models", "--dialect", "postgres"]
}
```

### Drizzle (TypeScript)
```hcl
data "external_schema" "drizzle" {
  program = ["npx", "drizzle-kit", "export"]
}
```

### SQLAlchemy (Python)
```hcl
data "external_schema" "sqlalchemy" {
  program = ["python", "-m", "atlas_provider_sqlalchemy", "--path", "./models", "--dialect", "postgresql"]
}
```

### Django (Python)
```hcl
data "external_schema" "django" {
  program = ["python", "manage.py", "atlas-provider-django", "--dialect", "postgresql"]
}
```

### Ent (Go)
```hcl
env "<name>" {
  schema {
    src = "ent://ent/schema"
  }
}
```

### Sequelize (Node.js)
```hcl
data "external_schema" "sequelize" {
  program = ["npx", "@ariga/atlas-provider-sequelize", "load", "--path", "./models", "--dialect", "postgres"]
}
```

### TypeORM (TypeScript)
```hcl
data "external_schema" "typeorm" {
  program = ["npx", "@ariga/atlas-provider-typeorm", "load", "--path", "./entities", "--dialect", "postgres"]
}
```

Wire any ORM into an environment:
```hcl
env "<name>" {
  schema {
    src = data.external_schema.<orm>.url
  }
}
```

## Composite Schema (Pro)
```hcl
data "composite_schema" "app" {
  schema "users"  { url = data.external_schema.auth_service.url }
  schema "graph"  { url = "ent://ent/schema" }
  schema "shared" { url = "file://schema/shared.hcl" }
}
```

## Dev-Database Dialects

### Schema-scoped (single schema)
| Dialect    | Dev URL |
|------------|---------|
| MySQL      | `docker://mysql/8/dev` |
| MariaDB    | `docker://maria/latest/dev` |
| PostgreSQL | `docker://postgres/17/dev?search_path=public` |
| SQLite     | `sqlite://dev?mode=memory` |
| SQL Server | `docker://sqlserver/2022-latest/dev?mode=schema` |
| ClickHouse | `docker://clickhouse/23.11/dev` |

### Database-scoped (multiple schemas/extensions)
| Dialect    | Dev URL |
|------------|---------|
| MySQL      | `docker://mysql/8` |
| MariaDB    | `docker://maria/latest` |
| PostgreSQL | `docker://postgres/17/dev` |
| SQL Server | `docker://sqlserver/2022-latest/dev?mode=database` |
| ClickHouse | `docker://clickhouse/23.11` |

### PostgreSQL with extensions
```
docker://postgis/latest/dev?search_path=public
docker://pgvector/pg17/dev?search_path=public
```
