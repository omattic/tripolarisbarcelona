# Tripolaris Barcelona State

## Current State

`tripolarisbarcelona` is a static starter copy of the public Tripolaris Barcelona website at `https://tripolarisbarcelona.com/`.

It is deployed to GitHub Pages with a custom domain at:

```text
https://tripolarisbarcelona.com/
https://www.tripolarisbarcelona.com/
```

The GitHub Pages fallback URL is:

```text
https://omattic.github.io/tripolarisbarcelona/
```

The repo includes:

- Static HTML, CSS, and JavaScript.
- Public logo, triangle artwork, favicon, and 1200x630 Open Graph preview image under `assets/`.
- The "Un bar con tres almas" feature cards are text-only for now, with the previous photo/video media removed from the deployed assets.
- Extracted JPG carta pages live under `assets/carta-pages/{es,ca,en}/` and are shown by the full-screen in-page menu viewer to avoid browser PDF rendering issues. The viewer uses the 24 non-empty page images per language, omitting blank pages `02`, `23`, and `26`; each page is cropped to 870x1238, constrained to fit inside the viewer by default, and native browser pinch zoom remains available.
- Direct carta routes live at `/carta/es/`, `/carta/ca/`, and `/carta/en/`.
- The original carta PDFs are restored under `assets/` so the carta viewer can offer offline downloads.
- A stylized dark-purple and gold landing hero inspired by the Tripolaris visual reference, with centered branding and a minimal CTA.
- Google Fonts typography uses Marcellus for headings, Cormorant Garamond for body and italic accents, and Josefin Sans for navigation, buttons, and labels.
- Mobile typography is intentionally larger than the desktop-derived defaults for readability on small screens.
- The homepage head includes SEO metadata, canonical URL, Open Graph/Twitter preview tags, local geo metadata, and Schema.org JSON-LD for Tripolaris.
- The about section explains the Tripolaris name and avoids publishing founder names in visible copy or JSON-LD metadata.
- `/qr` is a static QR display page with a scannable SVG QR code for `https://tripolarisbarcelona.com`.
- ES, CA, and EN language switch controls.
- Contact, hours, phone, WhatsApp, social, and map links from the public page.

## Telegram

- Topic name: `tripolarisbarcelona`
- Topic id: `17576`
- Chat id: `-1003996402615`

## Known Gaps

- As of 2026-09-08, Tripolaris is deployed from GitHub Actions to GitHub Pages because W7S custom-domain provisioning requires Cloudflare SSL for SaaS entitlement that is not needed for this single static site yet. GitHub Pages is enabled with `tripolarisbarcelona.com` as the custom domain and HTTPS enforcement enabled. GitHub Actions run `34258531599` deployed commit `bd91dc78439c2646bd1bde4a964a26910d718378` successfully to GitHub Pages, and `https://tripolarisbarcelona.com/` returns HTTP 200 from GitHub Pages.
