# Tripolaris Barcelona Runbook

## Local Preview

```bash
cd /home/gnu/tripolarisbarcelona
python3 -m http.server 4177
```

Open:

```text
http://127.0.0.1:4177/
```

## Source Refresh

The first pass was scraped from:

```bash
curl -L --fail --show-error --silent https://tripolarisbarcelona.com/ -o .scrape/index.html
```

Public assets were copied from:

```text
https://tripolarisbarcelona.com/images/tripolaris-logo.png
https://tripolarisbarcelona.com/images/tripolaris-triangle.png
https://tripolarisbarcelona.com/favicon.svg
https://tripolarisbarcelona.com/carta-ca.pdf
https://tripolarisbarcelona.com/carta-es.pdf
https://tripolarisbarcelona.com/carta-en.pdf
```

The in-page carta reader vendors PDF.js under `assets/pdfjs/`. Refresh from npm when needed:

```bash
npm view pdfjs-dist version
curl -L --fail --show-error --silent https://unpkg.com/pdfjs-dist@<version>/build/pdf.mjs -o assets/pdfjs/pdf.mjs
curl -L --fail --show-error --silent https://unpkg.com/pdfjs-dist@<version>/build/pdf.worker.mjs -o assets/pdfjs/pdf.worker.mjs
```

Keep `.scrape/` out of git.

## Verification

```bash
python3 -m http.server 4177
curl -I http://127.0.0.1:4177/
node scripts/verify-static.mjs
```

## W7S Deploy

Deployment runs from GitHub Actions on pushes to `main`.

```bash
gh workflow run "Deploy to W7S"
gh run list --workflow "Deploy to W7S" --limit 5
```

Live URL:

```text
https://tripolarisbarcelona.com/
https://www.tripolarisbarcelona.com/
```

W7S mounted URL:

```text
https://omattic.w7s.cloud/tripolarisbarcelona/
```

Live metadata:

```text
https://tripolarisbarcelona.com/health.json
https://www.tripolarisbarcelona.com/health.json
```

The public QR page is available at:

```text
https://tripolarisbarcelona.com/qr
```

Mounted metadata:

```text
https://omattic.w7s.cloud/tripolarisbarcelona/health.json
```

## Custom Domain Recovery

Use the mounted route first to separate app health from custom-domain health:

```bash
curl -fsS https://omattic.w7s.cloud/tripolarisbarcelona/health.json
curl -fsS -L https://omattic.w7s.cloud/tripolarisbarcelona/ -o /tmp/tripolaris-mounted.html
```

Check custom-domain TLS:

```bash
curl -I https://tripolarisbarcelona.com/
curl -I https://www.tripolarisbarcelona.com/
openssl s_client -connect tripolarisbarcelona.com:443 -servername tripolarisbarcelona.com -brief
```

Check DNS authority and W7S claim state:

```bash
curl -fsS 'https://cloudflare-dns.com/dns-query?name=tripolarisbarcelona.com&type=NS' -H 'accept: application/dns-json'
curl -fsS 'https://cloudflare-dns.com/dns-query?name=_w7s.tripolarisbarcelona.com&type=TXT' -H 'accept: application/dns-json'
curl -fsS 'https://cloudflare-dns.com/dns-query?name=www.tripolarisbarcelona.com&type=CNAME' -H 'accept: application/dns-json'
```

If `tripolarisbarcelona.com` and `www.tripolarisbarcelona.com` fail TLS while the mounted URL is healthy, fix the custom-domain attachment, not the static app. W7S attaches custom domains by finding a Cloudflare zone for the hostname and creating Worker routes. DNS must resolve to Cloudflare, and the zone must be visible to the W7S Cloudflare API token.

Required DNS records:

```text
TXT   _w7s.tripolarisbarcelona.com  omattic/tripolarisbarcelona
CNAME www.tripolarisbarcelona.com   w7s.cloud
```

For the apex domain, use the DNS provider's CNAME flattening, ALIAS, or ANAME support to point `tripolarisbarcelona.com` at `w7s.cloud`. If the provider only supports A/AAAA at the apex, keep the records aligned with W7S/Cloudflare guidance because raw IPs can drift.

After DNS and W7S zone access are corrected, rerun and verify:

```bash
gh workflow run "Deploy to W7S" --ref main
gh run list --workflow "Deploy to W7S" --limit 5
gh run view <run-id> --log-failed
curl -fsS https://tripolarisbarcelona.com/health.json
curl -fsS https://www.tripolarisbarcelona.com/health.json
```

Known 2026-09-07 failure signature:

```text
W7S deploy: error (HTTP 500)
Error: Unable to find a Cloudflare zone for custom domain tripolarisbarcelona.com.
```

After W7S Core gained Cloudflare for SaaS custom-hostname fallback support, the failure signature changed to:

```text
W7S deploy: error (HTTP 500)
Error: Unable to provision Cloudflare for SaaS custom hostname tripolarisbarcelona.com: Authentication error
```

That means the request reached the new SaaS provisioning path, but the live W7S Cloudflare token or SaaS zone entitlement still needs Custom Hostnames/SSL access.

After the 2026-09-08 token update, GitHub Actions run `34174157320` reached Cloudflare Custom Hostname provisioning and failed with the entitlement-specific error:

```text
W7S deploy: error (HTTP 500)
Error: Unable to provision Cloudflare for SaaS custom hostname tripolarisbarcelona.com: No custom metadata access has been allocated for this zone or account.
```

That means token authentication and the W7S SaaS fallback path are working, but the `w7s.cloud` Cloudflare account or zone needs SSL for SaaS / Custom Hostnames custom metadata access enabled before Tripolaris custom domains can be provisioned.
