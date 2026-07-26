---
name: terminalskills-ssl
description: "Set up HTTPS, manage TLS certificates, debug secure connection issues, and configure SSL/TLS for web servers. Use when a user asks to add HTTPS, get an SSL certificate, fix certificate errors, configure TLS, or secure a web server."
license: Apache-2.0
metadata:
  author: terminal-skills
  version: "1.0.0"
  category: infrastructure
  tags: ["ssl", "tls", "https", "certificate", "security", "openssl"]
---

# SSL/TLS Skill

Configure HTTPS, manage TLS certificates, and debug secure connection issues for web servers.

## Core Tasks

| Task | Tool/Method |
|------|-------------|
| Get free cert | `certbot`, acme.sh, Caddy (auto) |
| Check cert status | `openssl s_client -connect host:443` |
| View cert details | `openssl x509 -in cert.pem -text -noout` |
| Test config | ssllabs.com/ssltest or `testssl.sh` |

## Quick Cert Commands

```bash
# Let's Encrypt with certbot
certbot certonly --nginx -d example.com -d www.example.com

# Check expiry
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates

# Verify chain
openssl s_client -connect example.com:443 -servername example.com
# Look for "Verify return code: 0 (ok)"
```

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `certificate has expired` | Cert past valid date | Renew with certbot renew |
| `unable to verify`/`self signed` | Missing intermediate cert | Include full chain in config |
| `hostname mismatch` | Cert doesn't cover domain | Get cert for correct domain or add SAN |
| `mixed content` | HTTP resources on HTTPS page | Change all URLs to HTTPS or use `//` |
| `ERR_CERT_AUTHORITY_INVALID` | Self-signed or untrusted CA | Use Let's Encrypt or install CA cert |

## Renewal

Let's Encrypt certs expire in 90 days. Always automate:

```bash
certbot renew --dry-run
# Cron (certbot usually adds this automatically)
0 0 * * * certbot renew --quiet
```

## Certificate Types

| Type | Use Case |
|------|----------|
| Single domain | One site (example.com) |
| Wildcard (*.domain.com) | All subdomains |
| Multi-domain (SAN) | Multiple domains on one cert |
| Self-signed | Local dev only — browsers will warn |
