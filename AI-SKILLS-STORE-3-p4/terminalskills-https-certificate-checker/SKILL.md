---
name: terminalskills-https-certificate-checker
description: "Inspect, validate, and diagnose HTTPS certificate issues. Use when checking if a certificate is valid, expired, misconfigured, or has chain problems. Covers OpenSSL debugging, certificate expiry monitoring, chain validation, and common TLS troubleshooting."
license: Apache-2.0
metadata:
  author: terminal-skills
  version: "1.0.0"
  category: infrastructure
  tags: ["https", "certificate", "tls", "ssl", "openssl", "security", "monitoring"]
---

# HTTPS Certificate Checker

Inspect and validate HTTPS certificates. Diagnose expiry, chain issues, hostname mismatches, and protocol problems.

## Check Certificate Details

```bash
# Check certificate expiry dates
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates

# View full certificate details
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -text

# Get certificate subject and issuer
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -subject -issuer

# Check certificate serial number and fingerprint
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -serial -fingerprint -sha256
```

## Chain Validation

```bash
# Verify full certificate chain
openssl s_client -connect example.com:443 -showcerts

# Verify with specific hostname (SNI)
openssl s_client -connect example.com:443 -servername example.com

# Check only that cert is valid (exit 0 = OK, exit 1 = error)
openssl s_client -connect example.com:443 2>/dev/null > /dev/null && echo "VALID" || echo "INVALID"
```

## Certificate Monitoring Script

```bash
#!/bin/bash
# Check if cert expires within N days
DOMAIN="example.com"
WARN_DAYS=30

expiry=$(echo | openssl s_client -connect "$DOMAIN":443 2>/dev/null | \
  openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)

if [ -n "$expiry" ]; then
  expiry_epoch=$(date -d "$expiry" +%s)
  now_epoch=$(date +%s)
  days_left=$(( (expiry_epoch - now_epoch) / 86400 ))
  if [ "$days_left" -lt "$WARN_DAYS" ]; then
    echo "WARNING: $DOMAIN cert expires in $days_left days ($expiry)"
  else
    echo "OK: $DOMAIN cert expires in $days_left days ($expiry)"
  fi
fi
```

## Common Issues

| Issue | Check | Fix |
|-------|-------|-----|
| Expired cert | `openssl x509 -noout -dates` | Renew certificate |
| Wrong hostname | `openssl x509 -noout -subject` | Reissue cert with correct SAN |
| Missing intermediate | `openssl s_client -showcerts` | Install fullchain.pem |
| Weak cipher | `openssl s_client -cipher 'HIGH'` | Update server config |
| Self-signed | `openssl x509 -issuer -subject` | Use trusted CA |
