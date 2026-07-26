# Atlas Cloud CLI

`atlas cloud` commands read and manage resources in Atlas Cloud.

## Prerequisites
```bash
atlas whoami                    # verify current org
atlas login [org]               # interactive login
atlas login --token "$TOKEN"    # CI / non-interactive
```

## Command Reference
```
atlas cloud
├── repo
│   ├── list                    # List all repos with database counts
│   ├── describe                # Details for one repo (--id, --slug, --name)
│   ├── create                  # Create empty repo (--type, --name, --driver)
│   └── lingraph                # Migration lineage graph
├── database
│   ├── list                    # List cloud-tracked databases
│   └── describe                # Details for one database
└── migration
    ├── list                    # List deployment events (--status FAILED)
    └── describe                # Details for one event
```

## Pagination
List commands return max 20 records per page. Use `--page <n>` to paginate.
Check `Total` in footer to see if more pages exist.

## Pre-deployment Readiness
```bash
atlas whoami
atlas cloud database list --env-name <env>
atlas cloud migration list --status FAILED
atlas cloud repo describe --slug <slug>
```
Any database with `Status=FAILED` → investigate before applying.
