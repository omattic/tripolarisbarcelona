# Tripolaris Barcelona Decisions

## 2026-08-21

- Use a static HTML, CSS, and JavaScript starter instead of vendoring the scraped Next.js output.
- Keep the raw scrape under `.scrape/` locally and out of git.
- Preserve public business facts and visible page structure from the source site, then iterate from a clean codebase.
- Generate `health.json` during deployment so the live static site exposes branch, commit hash, and deployment timestamp.
- Use the dark-purple and gold Tripolaris reference direction for the landing hero: fixed minimal navigation, centered wordmark, restrained CTA, and subtle triangle artwork behind the copy.
- Render carta PDFs with a vendored PDF.js full-screen canvas viewer instead of relying on browser iframe PDF handling, because static PDF MIME behavior may vary by host.

## 2026-09-08

- Move Tripolaris from W7S to GitHub Pages for now, because W7S custom-domain support for external DNS currently requires Cloudflare SSL for SaaS entitlement and this site does not need the W7S customer-domain platform path yet.
- Use GitHub Actions as the GitHub Pages publishing source, publish the assembled static artifact, and keep `tripolarisbarcelona.com` as the canonical GitHub Pages custom domain.
- Keep `www.tripolarisbarcelona.com` as a DNS-level alias that redirects to the apex domain when GitHub Pages DNS is configured correctly.
