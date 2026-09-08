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

## GitHub Pages Deploy

Deployment runs from GitHub Actions on pushes to `main`.

```bash
gh workflow run "Deploy to GitHub Pages"
gh run list --workflow "Deploy to GitHub Pages" --limit 5
```

Live URL:

```text
https://tripolarisbarcelona.com/
https://www.tripolarisbarcelona.com/
```

GitHub Pages fallback URL:

```text
https://omattic.github.io/tripolarisbarcelona/
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

Fallback metadata:

```text
https://omattic.github.io/tripolarisbarcelona/health.json
```

## GitHub Pages Settings

The repository must have Pages enabled with GitHub Actions as the publishing source:

```text
Repository Settings > Pages > Build and deployment > Source > GitHub Actions
Repository Settings > Pages > Custom domain > tripolarisbarcelona.com
```

Current GitHub Pages state as of 2026-09-08:

```text
build_type: workflow
cname: tripolarisbarcelona.com
https_enforced: false
latest green Pages run: 34175159426 at commit 00e674add84b3392d674f515ee023e6054cef6f8
```

Enable HTTPS enforcement after Hostinger DNS points to GitHub Pages and GitHub has issued the certificate.

`CNAME` contains only the apex domain because GitHub Pages supports one custom domain in that file. When the apex and `www` DNS records are configured correctly, GitHub Pages redirects between the apex and `www` variant automatically.

## GitHub Pages DNS

Hostinger DNS should point the apex domain to GitHub Pages:

```text
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
AAAA  @    2606:50c0:8000::153
AAAA  @    2606:50c0:8001::153
AAAA  @    2606:50c0:8002::153
AAAA  @    2606:50c0:8003::153
CNAME www  omattic.github.io
```

Remove old W7S records for the same names, including `www -> w7s.cloud`, `_w7s` TXT records, and any apex ALIAS/ANAME/CNAME flattening that points to `w7s.cloud`.

## Live Verification

```bash
gh workflow run "Deploy to GitHub Pages" --ref main
gh run list --workflow "Deploy to GitHub Pages" --limit 5
gh run view <run-id> --log-failed
curl -fsS https://omattic.github.io/tripolarisbarcelona/health.json
curl -fsS https://tripolarisbarcelona.com/health.json
curl -fsS https://www.tripolarisbarcelona.com/health.json
```
