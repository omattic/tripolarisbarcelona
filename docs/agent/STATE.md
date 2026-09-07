# Tripolaris Barcelona State

## Current State

`tripolarisbarcelona` is a static starter copy of the public Tripolaris Barcelona website at `https://tripolarisbarcelona.com/`.

It is deployed to W7S with a custom domain at:

```text
https://tripolarisbarcelona.com/
https://www.tripolarisbarcelona.com/
```

The W7S mounted URL remains available at:

```text
https://omattic.w7s.cloud/tripolarisbarcelona/
```

The repo includes:

- Static HTML, CSS, and JavaScript.
- Public logo, triangle artwork, favicon, and 1200x630 Open Graph preview image under `assets/`.
- Three square bar photos under `assets/` for the "Un bar con tres almas" feature cards.
- Extracted JPG carta pages live under `assets/carta-pages/{es,ca,en}/` and are shown by the full-screen in-page menu viewer to avoid browser PDF rendering issues. Each page is cropped to 870x1238, constrained to fit inside the viewer by default, and native browser pinch zoom remains available.
- The original carta PDFs are not shipped in the W7S artifact so the deployment stays under the 25 MB free-tier archive limit.
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

- As of 2026-09-07, the W7S mounted URL is healthy, but `tripolarisbarcelona.com` and `www.tripolarisbarcelona.com` fail TLS before the app is reached. Public DNS authority is Hostinger DNS (`atlas.dns-parking.com`, `hyperion.dns-parking.com`), `_w7s.tripolarisbarcelona.com` TXT is absent, and a manual W7S redeploy failed with `Unable to find a Cloudflare zone for custom domain tripolarisbarcelona.com.` Custom-domain recovery requires restoring W7S/Cloudflare zone access for `tripolarisbarcelona.com`, or otherwise adding the domain to the W7S-managed Cloudflare account, then rerunning the W7S deploy. Add `TXT _w7s.tripolarisbarcelona.com = omattic/tripolarisbarcelona` once DNS is editable so future claims are explicit.
