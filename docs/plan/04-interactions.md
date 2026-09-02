# 04 — Interactive Elements

Each entry: what it does, how it behaves, the a11y contract, and the build note.

---

## 1. Pricing term toggle ★ priority

**What:** a three-way segmented control — `1 MONTH` / `3 MONTHS` / `6 MONTHS` —
that rewrites the per-month price on every tier card.

**Why three-way, not a binary switch:** the standard monthly/yearly switch is a
SaaS convention. Gyms sell commitment blocks, and a 12-week Transformation
programme doesn't map onto "annual" at all. Three terms match how the business
actually sells.

**Behaviour**
- Default: `3 MONTHS` (the tier we want chosen), not `1 MONTH`.
- Switching animates the number with a 180ms cross-fade + 4px rise. Numbers are
  `tabular-nums` so the card never reflows mid-animation.
- A mono `SAVE [N]%` badge fades in on 3 and 6 month terms; the saving is computed
  from the data, never typed by hand.
- Tiers with a single fixed price (Day Pass, Transformation block) show
  `ONE-OFF` and ignore the toggle rather than disappearing — a card vanishing on
  toggle is disorienting.
- Selected term persists to `sessionStorage` so it survives a click into a
  programme page and back.

**A11y:** `role="radiogroup"` with three `role="radio"` buttons, arrow-key
navigation, `aria-checked`. Price region is `aria-live="polite"` so a screen
reader hears the change.

**Build:** Radix `ToggleGroup` (single, required) + a `useState<Term>` in
`PricingTable`. Prices come from `content/pricing.ts` — no prices in JSX.

---

## 2. Mobile navigation ★ priority

**What:** a full-screen overlay panel, not a slide-in drawer.

**Behaviour**
- Trigger: a two-line hamburger that morphs into an X (200ms rotate).
- Panel covers the viewport, `--ink-950` at 98% with the blueprint grid behind.
- Links are **display-face, large (32–40px), left-aligned, stacked**, each with a
  mono index (`01` … `06`) — the same numbering language as the protocol steps,
  so the site has one visual grammar rather than a nav that looks borrowed.
- Links stagger in at 40ms intervals, 200ms each.
- Bottom of the panel: `BOOK YOUR ASSESSMENT` (ember, full width), then WhatsApp,
  phone, Instagram, Facebook as a mono row.
- Closes on: X, link click, `Esc`, browser back.

**A11y:** focus moves to the panel on open and returns to the trigger on close;
focus trapped inside; `aria-expanded` + `aria-controls` on the trigger; page
content `inert` while open; `body` scroll locked (preserving scroll position).

**Build:** Radix `Dialog` in fullscreen mode — gets the trap, the `inert` and the
`Esc` handling for free.

**Companion — sticky mobile CTA bar:** below 768px, a fixed bottom bar
(`WHATSAPP` | `CALL`) that appears after 40% scroll depth and hides while the
mobile nav or a form field is focused. This is the highest-converting element on
a Lebanese local-business site and Fitnix doesn't have one.

---

## 3. Embedded map ★ priority

**What:** the location section, pinned at `33.9194105, 35.6151544`.

**The problem with a plain iframe:** Google's map embed loads ~900 KB and sets
cookies before the user has consented to anything. On a phone on a Lebanese
mobile connection that's the slowest thing on the page, sitting near the bottom.

**The pattern: a map facade.**
- Render a **static, brand-graded map image** (dark style, ember pin) with a
  `LOAD INTERACTIVE MAP` button over it.
- Clicking swaps in the real iframe. Most visitors never click — they want the
  address and the `GET DIRECTIONS` button, both of which are plain HTML beside
  the map and work instantly.
- `GET DIRECTIONS` opens `https://www.google.com/maps/dir/?api=1&destination=33.9194105,35.6151544`
  in a new tab — deep-links straight into the driving directions on mobile.
- Beside the map: address block, a **landmark line** ("opposite the …" — worth
  more than a street name in Lebanon), hours table, and a live `OPEN NOW` /
  `CLOSED` pill computed in Asia/Beirut time.

**A11y:** the facade button is a real `<button>` with a descriptive label
("Load interactive map of The Metal Clinic"); the address is readable text, never
only inside the map.

---

## 4. Dynamic gallery

**What:** the facility and results gallery.

**Behaviour**
- Layout: CSS `columns` masonry, 1 / 2 / 3 columns at sm / md / lg.
- **Filter chips:** `ALL` · `THE FLOOR` · `THE WORK` · `THE RESULTS`. Filtering
  animates with `layout` from Motion (FLIP) — items move rather than pop.
- Hover (desktop): image scales to 1.04 inside a fixed frame, an ember hairline
  draws across the bottom, and a mono caption fades up. No zoom on touch devices.
- Click → **lightbox**: full image, caption, counter (`03 / 18` in mono),
  arrow-key and swipe navigation, `Esc` to close, click-outside to close.
- First 6 images eager, the rest lazy. Every image has fixed `width`/`height` so
  the page never shifts (CLS = 0).

**A11y:** lightbox is a Radix `Dialog` with focus trap and a labelled close
button; filter chips are a `radiogroup`; the grid is a `<ul>` of `<li>`.

**Note:** don't build the gallery until the shoot exists. A gallery of stock
photos actively damages a local business — see `01-design-system.md §5`.

---

## 5. Programs accordion

- Radix `Accordion`, `type="single"`, `collapsible`, **item 01 open on load** so
  the section shows content at rest rather than a stack of closed bars.
- Row: mono index, display-face name, `+` that rotates to `−` (200ms).
- Open panel: `grid-template-rows: 0fr → 1fr` transition (animates to auto height
  without measuring JS), containing image, promise, bullets, "for whom", and a
  `SEE FULL PROGRAM` link.
- **Desktop extra:** hovering a *closed* row previews its image in a small frame
  that eases toward the cursor. This is the one flourish worth spending — it makes
  a static list feel like a live index. Disabled under `prefers-reduced-motion`,
  disabled entirely below `lg`, and purely decorative (`aria-hidden`).

---

## 6. Count-up statistics

- Triggered once by `IntersectionObserver` at 40% visibility.
- 900ms, ease-out, `tabular-nums` so the width never jitters.
- **The final number is rendered server-side in the HTML** — the animation
  overwrites it. No JS, no observer, reduced-motion: the correct number is still
  there. This is the difference between a progressive enhancement and a bug.

---

## 7. Header scroll state

- Transparent over the hero → at 80px scroll, `--ink-950/92` + `backdrop-blur-md`
  + a `1px` `--ink-700` bottom rule. 200ms.
- A 2px ember scroll-progress bar along the header's bottom edge — one honest
  piece of feedback, cheaper and less gimmicky than a scroll-triggered animation
  on every section.
- Hides on scroll-down, reveals on scroll-up (mobile only), so the nav never eats
  a phone screen mid-read.

---

## 8. FAQ accordion

Same Radix primitive as programmes, but `type="multiple"` (people compare answers)
and **all closed by default** — the questions are the content here.
Each item emits `FAQPage` JSON-LD; FAQ rich results are one of the few SERP
features still reliably granted to local businesses.

---

## 9. Contact / assessment form

- Progressive: works as a plain POST to a Next.js **server action**; JS only adds
  inline validation and the success state.
- Validation on blur, not on keystroke. Errors are text + icon + colour, never
  colour alone.
- Submit button enters a `SENDING…` state with the label swapped, `aria-busy`,
  and is disabled to prevent double-submit.
- Success replaces the form with a confirmation panel + a WhatsApp link.
- Failure shows the WhatsApp fallback inline — never a dead end.
- **Spam:** honeypot field + a timing check + Cloudflare Turnstile if it becomes a
  problem. No reCAPTCHA (it's a third-party cookie and a UX tax).
- Sends to `info@themetalclinic.com` via Resend, plus an optional row to a Google
  Sheet so leads are never trapped in one inbox.

---

## 10. WhatsApp floating action button

- Bottom-right on desktop, folded into the sticky bar on mobile.
- `https://wa.me/9613402413?text=Hi%2C%20I%27d%20like%20to%20book%20an%20assessment`
  — prefilled text measurably raises reply rates.
- Appears after 25% scroll; respects reduced-motion (fades, no bounce).
- `[CONFIRM: is +961 3 402 413 actually on WhatsApp?]` — if not, drop this entirely.

---

## 11. Deliberately excluded

| Not doing | Why |
|---|---|
| Hero background video | 3–8 MB before first paint on a mobile connection, for decoration |
| Parallax / scroll-jacking | Fights the reader, hurts CLS, ages badly |
| Cursor trail / custom cursor | Signals "template", breaks touch |
| Preloader animation | An artificial delay on a site whose job is to load fast |
| Live class-booking calendar | Real complexity, real cost; WhatsApp is what people use. Revisit at phase 3 if volume justifies it |
| Instagram feed embed | The official embed is heavy and breaks on API changes. Use 6 hand-picked stills linking to the profile |
| Dark/light toggle | The brand is one world. A light mode here would be a different company |
