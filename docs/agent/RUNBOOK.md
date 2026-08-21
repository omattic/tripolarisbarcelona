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
https://omattic.w7s.cloud/tripolarisbarcelona/
```

Live metadata:

```text
https://omattic.w7s.cloud/tripolarisbarcelona/health.json
```
