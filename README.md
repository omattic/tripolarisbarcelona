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

## W7S Deployment

The site deploys from `main` through GitHub Actions using `w7s-io/w7s-cloud@v1`.

Production URL:

```text
https://tripolarisbarcelona.com/
```

W7S mounted URL:

```text
https://omattic.w7s.cloud/tripolarisbarcelona/
```

The deploy artifact includes:

```text
https://tripolarisbarcelona.com/health.json
```

That file exposes `branch`, `commitHash`, and `deployedAt` for live verification.

Manual deploy:

```bash
gh workflow run "Deploy to W7S"
```

## Contents

- `index.html`: static page structure
- `styles.css`: responsive visual styling
- `script.js`: ES, CA, and EN language switcher
- `pdf-viewer.mjs`: full-screen PDF.js carta reader
- `assets/`: public logo, triangle art, favicon, and carta PDFs copied from the source site
- `CNAME`: W7S custom-domain mapping for `tripolarisbarcelona.com`
- `.github/workflows/deploy.yml`: W7S deployment workflow

The raw scrape is kept in `.scrape/` locally and ignored by git.
