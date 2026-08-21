# Tripolaris Barcelona Decisions

## 2026-08-21

- Use a static HTML, CSS, and JavaScript starter instead of vendoring the scraped Next.js output.
- Keep the raw scrape under `.scrape/` locally and out of git.
- Preserve public business facts and visible page structure from the source site, then iterate from a clean codebase.
- Deploy to W7S as a static artifact served at `https://omattic.w7s.cloud/tripolarisbarcelona/`.
- Generate `health.json` during deployment so the live static site exposes branch, commit hash, and deployment timestamp.
