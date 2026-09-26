# 00 — Strategy & Positioning

**Planning document. Nothing is being built.**

---

## 1. The single most important decision (needs your answer)

Fitnix is a **big-box gym** brand. Its whole copy engine runs on scale numbers:
`16K+ membership`, `2000+ active members`, `160+ trainers`, `92% retention`,
`4.8/5 verified reviews`, `12+ years experience`.

The Metal Clinic, based on the research in `docs/research/business-profile.md`, is a
**coach-led studio** — founded 2020 by Alain Eid, ~910 Instagram followers, one
named coach, and a website that talks about screening clients "on our premises."

If we pour Metal Clinic content into the Fitnix mould, the first thing a visitor
sees is a set of numbers we cannot back. That is the fastest way to lose a local
lead in a market the size of Metn, where the prospect probably knows someone who
trains there. **Every stat in this plan is therefore a `[CONFIRM]` placeholder —
I have not invented a single figure, and I'd advise against inventing any.**

So, which is it:

- **(A) Coaching studio** — the hero product is a coached programme; "membership"
  means a coaching block, not floor access. *This is what the evidence supports.*
- **(B) Open-floor gym** — people pay monthly to use equipment; coaching is an
  upsell.
- **(C) Hybrid** — floor memberships *and* coached programmes.

**This plan is written for (C), leaning (A)** — a "coaching gym" — because it
covers both and degrades gracefully. Tell me which one is real and I'll cut the
plan down accordingly.

---

## 2. Positioning: lean on "Clinic", not "Metal"

Every gym in Lebanon sells intensity. Almost none sell **method**. The name gives
us an angle nobody else on this coastline is using, and it happens to be true:

> **Diagnose → Prescribe → Execute → Review.**

The research already supports every word of it — the site's own copy says clients
are screened for readiness for exercise, get programmes built to their goals,
are supervised and spotted, and have their **progress recorded**. That is a
clinical loop. It's also exactly what a nervous 38-year-old with a desk job and a
doctor's warning wants to hear, which — given the founder's own story — is almost
certainly the highest-value customer.

**Brand line:** *Iron, prescribed.*
**Positioning statement:** The Metal Clinic is a coaching gym in Metn where nobody
trains on a guess. You get assessed, you get a written protocol, and you get
measured every four weeks.

### Why this beats copying Fitnix's angle
Fitnix's promise ("Transform your mind & muscle", "we're a movement") is
interchangeable with a thousand gym sites. "We measure, then we prescribe" is
defensible, ownable, and it turns the founder's ACSM / Pn1 / ACE credentials from
a bio detail into the product.

---

## 3. The founder story is the hero asset

Do not bury it in an About section. Alain Eid: **11 years in banking**, told by
doctors in 2006 that his weight was a health risk, **lost 100 lbs**, left banking
in 2018, trained at AFNA Pasadena, passed the **ACSM Elite Fitness Certification**,
founded The Metal Clinic in **September 2020**.

The target customer *is* pre-2006 Alain. That is the single strongest piece of
copy available and it costs nothing — it's already true.

---

## 4. Target audiences, ranked

1. **The desk-job restart (primary).** 30–50, sedentary, health scare or creeping
   weight, intimidated by commercial gyms. Wants to be told what to do by someone
   qualified. Buys the 12-week Transformation.
2. **The plateaued lifter.** 22–35, trains already, wants programming and form
   correction. Buys 1-on-1 or small-group strength.
3. **The diaspora / remote client.** Lebanese abroad or travelling. Buys online
   coaching. Zero marginal facility cost — this is the margin tier.
4. **Walk-in / day-pass.** Only if (B) or (C) is true.

---

## 5. What we take from Fitnix, and what we deliberately change

| Fitnix does | We do | Why |
|---|---|---|
| Full-bleed hero, athlete photo right, text left | Same skeleton — it works | Proven, scannable, mobile-safe |
| Numbered accordion `01–05` for programmes | Keep the accordion, renumber as a **protocol sequence** | Numbers must mean order; ours genuinely do |
| Big yellow `#F5D40A` on black | **Ember orange `#FF5A1F`** + a restricted clinical cyan | Distinct from Fitnix, and "molten metal" beats "hi-vis vest" |
| Condensed heavy display face | **Archivo Black** — wide, squared, stamped | Reads as machined steel, not sports-poster |
| Body copy in a neutral grotesk | **Barlow** — drawn for signage | Industrial without being a costume |
| Stats in the display face | **Stats in JetBrains Mono** | Numbers read as a chart readout — the clinic idea, made visual |
| Stat band: members / trainers / retention | Stat band: **years coaching / clients / kg lost / sessions** `[CONFIRM]` | Honest at our scale |
| "16K+ Membership enjoy our facilities" | Credential strip: `ACSM-CPT · Pn1 · ACE-FTS · AFNA` | Real proof beats invented scale |
| Testimonials as quote cards | **Case files** — chart-style cards with start/end metrics | On-brand, and far more persuasive |
| Generic gallery grid | Gallery split into **The Floor / The Work / The Results** | Gives the gallery a job |
| No local SEO signal | Town, coordinates, hours, `LocalBusiness` schema everywhere | Fixes finding #1 from the research |

---

## 6. Constraints and realities to design around

- **Language.** English-first is right for this audience, but Lebanese users
  switch constantly. Plan the copy so an Arabic pass can be added later; do not
  hard-code English strings into components. `[CONFIRM: is Arabic needed at launch?]`
- **Currency.** Lebanon quotes coaching in fresh USD. Show `$`. Never publish a
  price I invented — all prices below are `$[XX]`.
- **WhatsApp is the booking channel.** In Lebanon a contact form is the polite
  option; WhatsApp is the one people actually use. The site is a **static build
  with no backend** — enquiries open a prefilled WhatsApp chat or an email, and
  nothing is submitted anywhere. See `06-static-build-decision.md`.
- **Mobile-first is not a slogan here.** Assume the majority of traffic is a
  phone arriving from an Instagram link, on a patchy connection. Performance
  budget in `05-stack-seo-roadmap.md` is written for that.
- **Photography is the bottleneck, not the code.** This design lives or dies on
  real photos of the real room and real clients. A shot list is in `02-copy-deck.md`.

---

## 7. Open decisions for you

1. Studio, gym, or hybrid — question 1 above.
2. Exact address + opening hours (still unknown from research).
3. Real prices and package structure.
4. Do you have permission + photos for before/after client results?
5. Is +961 3 402 413 a WhatsApp number?
6. Arabic at launch, or English-only v1?
7. Any other coaches, or is this Alain solo? (Changes the whole "Team" section.)
8. Domain: keep `themetalclinic.com` and replace the current site?
