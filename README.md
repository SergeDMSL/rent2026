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

## Lead capture (Firestore, EU)
Each visit gets a code such as `A-ACD-K7P2` (profile · pain points · visit id).
- The iPad shows it next to the QR code; sales adds it as a note to the badge scan.
- Step 1 on the iPad is mandatory: the team enters name, e-mail and agency (dictation via
  the keyboard microphone) with the visitor's consent. The lead is stored at once
  (`leads`, ref = visit id). A visitor who refuses: presenter mode (P) shows a skip link.
- When the visitor sees their answers, their choices are stored in `selections`
  (visit id, code, profile, pain points; no personal data). `/export.html` joins both.
- If the hall Wi-Fi is down, entries wait on the iPad and are sent once it is back online.
- The QR strip at the bottom of the results gives the visitor the summary on their phone.

Forms stay hidden until `config.js` is filled in.

### One-time setup (Firebase console, ~15 min)
1. console.firebase.google.com → Add project `whise-rent-2026` (Analytics: off).
2. Build → Firestore Database → Create database → **Production mode** →
   location **europe-west1 (Belgium)**.
3. Firestore → Rules → paste `firestore.rules` → Publish. Add the sales team's
   e-mails to the admin list first.
4. Build → Authentication → Get started → Sign-in method → **Email/Password** →
   enable **Email link (passwordless sign-in)**. Settings → Authorized domains → add
   `whise-rent-2026.netlify.app`.
5. Project settings → General → Your apps → Web (`</>`) → register `rent-site` →
   copy `apiKey`, `projectId`, `authDomain` into `config.js`, plus the privacy URL.
   These values are public identifiers, not secrets; `firestore.rules` protects the data.
6. Commit, push, and bump `VERSION` in `sw.js`.

### Reading the leads
Open `/export.html`, enter your WHISE e-mail, click the link you receive. You see the
table and can download a CSV for Excel. Only e-mails listed in `firestore.rules` can read.

### After RENT
Delete the leads you no longer need (retention set by legal) and remove the iPad
demo login.
