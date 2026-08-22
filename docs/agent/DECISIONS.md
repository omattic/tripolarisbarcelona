# Tripolaris Barcelona Decisions

## 2026-08-21

- Use a static HTML, CSS, and JavaScript starter instead of vendoring the scraped Next.js output.
- Keep the raw scrape under `.scrape/` locally and out of git.
- Preserve public business facts and visible page structure from the source site, then iterate from a clean codebase.
- Deploy to W7S as a static artifact served at `https://omattic.w7s.cloud/tripolarisbarcelona/`.
- Use `CNAME` to map W7S production to `https://tripolarisbarcelona.com/` and `https://www.tripolarisbarcelona.com/`, while keeping the W7S mounted URL available for fallback verification.
- Generate `health.json` during deployment so the live static site exposes branch, commit hash, and deployment timestamp.
- Use the dark-purple and gold Tripolaris reference direction for the landing hero: fixed minimal navigation, centered wordmark, restrained CTA, and subtle triangle artwork behind the copy.
- Render carta PDFs with a vendored PDF.js full-screen canvas viewer instead of relying on browser iframe PDF handling, because static PDF MIME behavior may vary by host.
