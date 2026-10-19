# WHISE · RENT 2026 · Vos priorités

Booth tool for RENT 2026 (Paris, 4–5 Nov). Visitors tick up to three pain points:
- Agencies and networks see how WHISE solves each one, with a link to the demo environment.
- Mandataires get a QR code. Scanned with their own phone, it opens a note for their
  network or agency director (`/#m-ade`). The reference code (M-ADE) goes into the
  badge-scan note in the RENT exhibitor app.

No personal data is collected or stored by this site.

## Edit
Do not edit `index.html` here. The source is
`~/agentic-lab/brochure-rent-2026/demo_painpoints.html`. Run `python3 build_demo.py`
there, then bump `VERSION` in `sw.js`, commit and push. Netlify deploys on push.

Code letters: A relance · B réactivité · C base qui dort · D administratif ·
E terrain · F conformité · G pilotage · H changement de logiciel.

## On the iPad
Open the site in Safari → Share → "Sur l'écran d'accueil". It opens full screen and
keeps working offline after the first visit. Use Guided Access (Settings →
Accessibility) to lock the iPad to the app at the booth.
