# Certificate & Credential Management

---

## Certificate Management

```go
const cert_provider_command         = "cert_provider_command"
const certificate_config_location   = "certificate_config_location"
const cert_configs                  = "cert_configs"
```

Supports:
- Custom certificate provider commands (e.g., `cert_provider_command`)
- Configurable certificate locations
- Multiple certificate configs for different providers

---

## Credential Management

```go
const credential_source = "credential_source"
const credential        = "credential"
```

Credential sources:
- `env` — Environment variables
- `file` — File-based credentials
- `vault` — HashiCorp Vault integration
- `keyring` — OS keychain

### OAuth Details

```go
const access_token         = "access_token"
const id_token             = "id_token"
const client_secret        = "client_secret"
const auth_uri             = "auth_uri"
const authorization_endpoint = "authorization_endpoint"
const token_endpoint       = "token_endpoint"
const authenticator        = "authenticator"
```

Standard OAuth 2.0 flow with:
- Authorization code flow
- Device code flow
- Implicit flow (for local CLI)
- PKCE support
- Token refresh
