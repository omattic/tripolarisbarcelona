# Tripolaris Barcelona

Static starter copy of the public Tripolaris Barcelona website.

Source scraped for the first pass:

```text
https://tripolarisbarcelona.com/
```

## Local Preview

```bash
python3 -m http.server 4177
```

Open `http://127.0.0.1:4177/`.

## GitHub Pages Deployment

The site deploys from `main` through GitHub Actions using GitHub Pages.

Production URL:

```text
https://tripolarisbarcelona.com/
https://www.tripolarisbarcelona.com/
```

GitHub Pages fallback URL:

```text
https://omattic.github.io/tripolarisbarcelona/
```

The deploy artifact includes:

```text
https://tripolarisbarcelona.com/health.json
https://www.tripolarisbarcelona.com/health.json
https://tripolarisbarcelona.com/carta/es/
https://tripolarisbarcelona.com/carta/ca/
https://tripolarisbarcelona.com/carta/en/
```

That file exposes `branch`, `commitHash`, and `deployedAt` for live verification.

Manual deploy:

```bash
gh workflow run "Deploy to GitHub Pages"
```

## Contents

- `index.html`: static page structure
- `styles.css`: responsive visual styling
- `script.js`: ES, CA, and EN language switcher
- `pdf-viewer.mjs`: full-screen PDF.js carta reader
- `carta/`: direct language-specific carta routes
- `assets/`: public logo, triangle art, favicon, Open Graph image, feature media, extracted carta JPG pages, and downloadable carta PDFs
- `CNAME`: GitHub Pages custom domain for `tripolarisbarcelona.com`
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow

The raw scrape is kept in `.scrape/` locally and ignored by git.
