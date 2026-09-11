# The Metal Clinic — website

Static site for **The Metal Clinic**, an assessment-led coaching gym in Rabieh,
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
| **Phone number** | `index.html` — search `03 402 413` and `tel:+9613402413`. Note `03 402 413` and `+961 3 402 413` are the **same number**: `03` is the local form, `+961 3` the international one. |
| **WhatsApp** | `index.html` — search `wa.me/9613402413` |
| **Instagram** | `index.html` — search `instagram.com/themetalclinic` |
| **Opening hours** | `index.html`, the `.hours` block **and** the `openingHoursSpecification` in the JSON-LD at the top |
| **Street address** | `index.html` — search `Starbucks building` |
| **All page text** | `index.html` — it reads top to bottom in the order it appears on screen |
| **Colours, type, spacing** | `assets/css/main.css` — section 2, `:root` |
| **Photos** | see `assets/img/README.md` |

### A note on WhatsApp

Every "WhatsApp" button opens `wa.me/9613402413` with a prefilled message.
**Test one on a real phone** — if that number isn't registered on WhatsApp the
link opens a dead chat. If it turns out not to be, delete the WhatsApp buttons
and the `Call` links beside them already cover it.

There is **no email address on the site** — none was confirmed. To add one
later, put it in the contact rows and the footer, and add `"email"` back to the
JSON-LD block in `index.html`.

---

## What's on the page

Hero · About Alain · How it works (assess → prescribe → execute → review) ·
Programs accordion (Transformation, One-to-one, Nutrition, Online) · Why people
stay · Three stat cards · Pricing (no figures — each card opens WhatsApp with a
question about that package) · Contact with map and live open/closed status ·
Closing call to action · Footer.

**Interactive bits:** sticky header, mobile menu, programme accordion, sticky
call/email bar on phones, and an open/closed pill computed against Beirut time
from the hours in the markup. That's all of it.

### Still to do
- Real photographs (`assets/img/README.md` lists the shots)
- `assets/img/og.jpg` — 1200×630 social share image
- Check the WhatsApp link opens a real chat
- Terms of Service and Privacy pages
- Google Business Profile and the Lebanese directory listings — see
  `docs/plan/05-stack-seo-roadmap.md`; this matters more for being found than
  the site itself does

---

## Research and planning

- [`docs/research/`](docs/research) — business profile and digital-presence audit
- [`docs/plan/`](docs/plan) — strategy, design system, copy deck, architecture,
  interactions, static-build decision, and the open-questions tracker
- [`docs/mockups/`](docs/mockups) — the original design mockup and rendered screenshots
