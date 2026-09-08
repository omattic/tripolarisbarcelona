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
- Two square-cropped bar photos and one muted autoplaying MP4 under `assets/` for the "Un bar con tres almas" feature cards.
- Extracted JPG carta pages live under `assets/carta-pages/{es,ca,en}/` and are shown by the full-screen in-page menu viewer to avoid browser PDF rendering issues. Each page is cropped to 870x1238, constrained to fit inside the viewer by default, and native browser pinch zoom remains available.
- The original carta PDFs are not shipped in the deployment artifact, so the published static site stays small.
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

- As of 2026-09-08, Tripolaris is moving from W7S to GitHub Pages because W7S custom-domain provisioning requires Cloudflare SSL for SaaS entitlement that is not needed for this single static site yet. GitHub Pages is enabled with GitHub Actions as the source and `tripolarisbarcelona.com` as the custom domain. GitHub Actions run `34175159426` deployed commit `00e674add84b3392d674f515ee023e6054cef6f8` successfully to GitHub Pages. HTTPS enforcement is not enabled yet because GitHub has not issued the certificate. Hostinger DNS must point the apex and `www` records to GitHub Pages before final live verification.
