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
- Public logo, triangle artwork, and favicon under `assets/`.
- Three square bar photos under `assets/` for the "Un bar con tres almas" feature cards.
- Extracted JPG carta pages live under `assets/carta-pages/{es,ca,en}/` and are shown by the full-screen in-page menu viewer to avoid browser PDF rendering issues. Each page is constrained to fit inside the viewer by default, while native browser pinch zoom remains available.
- The original carta PDFs are not shipped in the W7S artifact so the deployment stays under the 25 MB free-tier archive limit.
- A stylized dark-purple and gold landing hero inspired by the Tripolaris visual reference, with centered branding and a minimal CTA.
- Google Fonts typography uses Marcellus for headings, Cormorant Garamond for body and italic accents, and Josefin Sans for navigation, buttons, and labels.
- Mobile typography is intentionally larger than the desktop-derived defaults for readability on small screens.
- `/qr` is a static QR display page with a scannable SVG QR code for `https://tripolarisbarcelona.com`.
- ES, CA, and EN language switch controls.
- Contact, hours, phone, WhatsApp, social, and map links from the public page.

## Telegram

- Topic name: `tripolarisbarcelona`
- Topic id: `17576`
- Chat id: `-1003996402615`

## Known Gaps

- None currently tracked.
