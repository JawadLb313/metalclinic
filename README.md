# The Metal Clinic — website

Static site for **The Metal Clinic**, an assessment-led coaching gym in Metn,
Mount Lebanon (Alain Eid — ACSM-CPT, Pn1, ACE-FTS).

No build step, no framework, no backend, no database. Plain HTML, CSS and about
120 lines of JavaScript. Every enquiry is a `tel:` or `mailto:` link.

---

## Run it locally

```bash
python3 -m http.server 8899      # then open http://localhost:8899
```

Any static server works. Don't open `index.html` straight off the disk —
the asset paths are absolute (`/assets/...`), so it needs to be served.

## Deploy

Drag the repository into **Netlify**, **Cloudflare Pages**, **Vercel** or
**GitHub Pages**. There is nothing to configure: no build command, no output
directory, no environment variables. Point the domain at it and it's live.

---

## Editing it

| What | Where |
|---|---|
| **Phone number** | `index.html` — search `+961 3 402 413` and `tel:+9613402413` |
| **Email** | `index.html` — search `train@themetalclinic.com` |
| **Opening hours** | `index.html`, the `.hours` block **and** the `openingHoursSpecification` in the JSON-LD at the top |
| **Street address** | `index.html` — search `TODO-ADDRESS` |
| **All page text** | `index.html` — it reads top to bottom in the order it appears on screen |
| **Colours, type, spacing** | `assets/css/main.css` — section 2, `:root` |
| **Photos** | see `assets/img/README.md` |

### Turning WhatsApp on

The number hasn't been confirmed as a WhatsApp line, so every button currently
dials it. When confirmed, open `assets/js/main.js` and set:

```js
var WHATSAPP = true;
```

Every "Call" link becomes a WhatsApp chat with a prefilled message. Nothing else
needs touching.

---

## What's on the page

Hero · About Alain · How it works (assess → prescribe → execute → review) ·
Programs accordion (Transformation, One-to-one, Nutrition, Online) · Why people
stay · Three stat cards · Pricing (no figures — each card asks you to get in
touch) · Contact with map and live open/closed status · Closing call to action ·
Footer.

**Interactive bits:** sticky header, mobile menu, programme accordion, sticky
call/email bar on phones, and an open/closed pill computed against Beirut time
from the hours in the markup. That's all of it.

### Still to do
- Real photographs (`assets/img/README.md` lists the twelve shots)
- Confirm hours, address and whether the number takes WhatsApp
- `assets/img/og.jpg` for social sharing
- Google Business Profile and the Lebanese directory listings — see
  `docs/plan/05-stack-seo-roadmap.md`; this matters more for being found than
  the site itself does

---

## Research and planning

- [`docs/research/`](docs/research) — business profile and digital-presence audit
- [`docs/plan/`](docs/plan) — strategy, design system, copy deck, architecture,
  interactions, static-build decision, and the open-questions tracker
- [`docs/mockups/`](docs/mockups) — the original design mockup and rendered screenshots
