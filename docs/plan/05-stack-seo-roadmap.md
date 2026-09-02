# 05 — Stack, Performance, SEO & Roadmap

---

## 1. Dependencies (deliberately short)

| Package | Why |
|---|---|
| `next` 15 | App Router, static export of every marketing page |
| `react` 19 / `typescript` | — |
| `tailwindcss` v4 | CSS-first tokens |
| `motion` | Scroll reveal, gallery FLIP, accordion. ~3 kB used |
| `@radix-ui/react-{dialog,accordion,toggle-group}` | Correct ARIA for the four interactive patterns |
| `lucide-react` | Icons, tree-shaken |
| `resend` | Form email |
| `zod` | Server-action input validation |

No UI kit, no animation library beyond Motion, no CMS at v1, no analytics SDK
that ships 40 kB. Total JS budget below.

---

## 2. Performance budget (written for a phone on a Lebanese mobile network)

| Metric | Target |
|---|---|
| LCP | < 2.0 s on 4G |
| CLS | < 0.02 |
| INP | < 150 ms |
| First-load JS (homepage) | **< 110 kB gzipped** |
| Hero image | < 180 kB AVIF |
| Total page weight (home) | < 900 kB including images |
| Lighthouse | 95+ across all four categories |

**How we hold it:** static generation everywhere; ~9 client components total;
`next/font` self-hosting the three faces with `display: swap` and subset to latin;
AVIF/WebP with explicit dimensions; the map facade (§3 of `04-interactions.md`);
no video; no embedded Instagram feed.

---

## 3. SEO — this is where the actual money is

The research finding worth repeating: **the business is invisible in Lebanese
local search.** Competitors rank; The Metal Clinic appears in none of the
directories that own those SERPs. A beautiful website does not fix that on its
own. Do these in parallel with the build, not after it.

### On-site
- `LocalBusiness` / `HealthAndBeautyBusiness` **JSON-LD** in the root layout:
  name, image, `@id`, url, telephone, `address` (full `PostalAddress` with the
  town), `geo` (33.9194105 / 35.6151544), `openingHoursSpecification`,
  `priceRange`, `sameAs` (Instagram, Facebook).
- `FAQPage` schema on the FAQ. `Person` schema for Alain with his certifications.
  `Service` schema per programme.
- **Every title and H1 carries a Lebanese locality** — town, Metn, Mount Lebanon.
  Never "Lebanon" alone: the research showed those queries get taken by Lebanon
  TN / PA / OH / OR / MO / NH.
- A genuine local page: "Personal training in [Town] and the Metn" — the room, the
  drive from Antelias/Dbayeh/Bsalim, parking. One honest page beats ten thin ones.
- `sitemap.ts`, `robots.ts`, canonical URLs, OG + Twitter cards.

### Off-site (cheap, high yield, do first)
1. **Google Business Profile** — claim it, complete it, add the shot list photos,
   set hours, add services and products, and start asking every client for a
   review. This is worth more than the entire website for local intent.
2. Free Lebanese directory listings: **whereleb.com, yelleb.com, lebanondaleel.com,
   fitlynk.com, onlifelebanon.com** — all currently ranking, all currently missing
   this business.
3. **NAP consistency** — identical name, address and phone string on the site,
   Google, Facebook, Instagram bio and every directory. Inconsistent NAP is the
   most common reason a real local business ranks below a worse one.
4. Rewrite the Instagram bio into an offer with a link (it's currently a
   credentials list with no call to action) and point it at the new site.

---

## 4. Analytics & measurement

- **Vercel Analytics** + **Speed Insights** — cookieless, no consent banner needed,
  ~1 kB. GA4 only if Alain specifically wants it (it costs a cookie banner).
- Track four events, no more: `assessment_form_submit`, `whatsapp_click`,
  `phone_click`, `directions_click`. Those four tell you whether the site works.
- Add a "How did you hear about us?" field to the form — in a market this size,
  the honest answer beats attribution modelling.

---

## 5. Hosting & operations

- **Vercel**, production on `themetalclinic.com`, previews per branch.
- DNS: keep the registrar, point A/CNAME at Vercel. `[CONFIRM: who controls the domain?]`
- **The existing site must be preserved before cutover** — take a full copy of the
  current pages, especially the Terms of Service, which is the only legal text
  the business has published. Do not lose it.
- Redirects from any existing URLs to the new ones (301) so the little link equity
  there is survives.
- Uptime check + a form-submission alert so a broken contact form doesn't fail silently.

---

## 6. Roadmap

**Phase 0 — Answers & assets (blocks everything; ~1 week, mostly Alain's time)**
Address, hours, prices, package structure, WhatsApp confirmation, client consents,
and the photo shoot. *Nothing should be coded before the shoot is booked* — the
design depends on real photography.

**Phase 1 — Build (the website itself)**
Design tokens → layout shell → homepage sections → programmes → pricing → contact
→ schema/SEO → QA on real devices. Static content in `/content`.

**Phase 2 — Launch & local SEO**
Cutover, redirects, GBP completion, directory submissions, review-collection flow
(a QR card at the desk that deep-links to the Google review form), Instagram bio rewrite.

**Phase 3 — Only if the numbers justify it**
Blog/MDX for local fitness content, CMS so Alain edits copy himself, Arabic
localisation, online-coaching payments (Stripe), a real booking calendar.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Copy ships with invented stats or testimonials | Every figure is a `[CONFIRM]`; `consent: true` is a required literal in the CaseFile type |
| No professional photos → stock creeps in | Phase 0 gate: no build starts before the shoot is booked |
| Prices published, then reality changes | Prices live in one file; a "from $X" pattern plus an on-request tier keeps it flexible |
| Site launches, nothing changes in search | Local SEO tasks in Phase 2 are the actual lever; the site alone is not |
| Scope creep into booking/payments | Explicitly deferred to Phase 3 with a volume trigger |
| The business is (A) not (C) and half the plan is wasted | Answer question 1 in `00-strategy.md` before Phase 1 |
