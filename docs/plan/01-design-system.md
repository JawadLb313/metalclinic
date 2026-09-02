# 01 — Design System

Dark-committed, industrial, high-contrast. Deliberately **not** Fitnix yellow.

---

## 1. Colour

The concept is **Heat & Steel**: cold machined greys, one molten accent, and a
single cool "vitals" signal reserved for data. Two accents, strictly zoned — the
warm one sells, the cool one measures. That zoning is what keeps a two-accent
palette from looking like a template.

### Tokens

```css
/* Ground — cool-biased near-blacks, never pure #000 */
--ink-950:  #08090B;   /* page base */
--ink-900:  #0E1013;   /* section alt */
--ink-850:  #14171B;   /* card */
--ink-800:  #1A1E23;   /* raised card / input */
--ink-700:  #262B32;   /* hairline / border */

/* Text */
--chalk:    #F4F5F7;   /* headings */
--steel-300:#AEB5BF;   /* body */
--steel-500:#79808C;   /* muted, captions */

/* Ember — primary accent, molten steel */
--ember-400:#FF7A45;   /* small text on dark, links */
--ember-500:#FF5A1F;   /* buttons, rules, active states */
--ember-600:#D9430F;   /* hover / pressed */
--ember-050:#2A130A;   /* 8% tint ground for badges */

/* Vitals — cool signal. DATA ONLY. */
--vitals-400:#5CD6E8;

/* Semantic — UI states only, never marketing */
--ok:   #4ADE80;
--warn: #FBBF24;
--bad:  #F05252;
```

### Rules that keep it disciplined

- **One accent per viewport.** Ember carries the CTA. If a section has two ember
  elements competing, one becomes chalk or steel.
- **Vitals cyan is never decorative.** It appears on: stat numbers, progress bars,
  before→after deltas, the "measured" badges. Nowhere else. This is the single
  rule that makes the palette feel designed rather than picked.
- **Ember text on ink is fine at ≥18px** (`--ember-500` on `--ink-950` ≈ 5.4:1).
  For body-size ember text use `--ember-400`. **Ember buttons take `--ink-950`
  text**, not white — dark-on-orange is both more legible and more industrial.
- **No pure black, no pure white.** The greys carry a slight blue bias so ember
  reads warm against them.

### Theme
This is a **single-theme, dark-committed** brand — a gym floor at night. No light
mode. That is a choice, not an omission: every surface, border and text colour is
painted explicitly so the page never borrows the host's ground.

---

## 2. Typography

Three roles, three faces. All on Google Fonts.

| Role | Face | Usage |
|---|---|---|
| **Display** | **Archivo Black** (400) | H1–H3, section titles, buttons. `text-transform: uppercase`, `letter-spacing: -0.02em`, `line-height: 0.92` |
| **Body** | **Barlow** (400/500/600) | Paragraphs, nav, form labels. `line-height: 1.6`, max 65ch |
| **Data** | **JetBrains Mono** (500/700) | Stats, prices, eyebrows, tags, table figures. `uppercase`, `letter-spacing: 0.12em` |

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap">
```

Always declare fallbacks: `'Archivo Black', 'Arial Black', system-ui, sans-serif`.

**Why not Fitnix's condensed face:** condensed heavy display is the default gym
look. Archivo Black is *wide* — it reads as a stamped steel plate rather than a
sports poster, and it gives us a shape Fitnix doesn't have.

**Why mono for numbers:** it makes every figure look like a readout from a chart.
It is the cheapest possible way to make "clinic" visible in the design, and it
gives us `font-variant-numeric: tabular-nums` for free in the pricing table.

### Scale (clamp-based, mobile-first)

```css
--fs-display: clamp(2.75rem, 9vw, 7rem);    /* hero H1 */
--fs-h2:      clamp(2rem, 5.5vw, 3.75rem);
--fs-h3:      clamp(1.375rem, 3vw, 1.875rem);
--fs-lead:    clamp(1.0625rem, 1.6vw, 1.25rem);
--fs-body:    1rem;
--fs-small:   0.875rem;
--fs-mono:    0.75rem;   /* eyebrows, tags */
--fs-stat:    clamp(2.5rem, 7vw, 5rem);
```

---

## 3. Layout, spacing, shape

- **Grid:** 12-col, `max-width: 1280px`, gutters `clamp(1.25rem, 5vw, 4rem)`.
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- **Section rhythm:** `padding-block: clamp(4.5rem, 10vw, 9rem)`. Consistent
  everywhere — this alone separates a considered site from a template.
- **Radius:** `2px` default, `4px` on cards, **`0` on buttons**. Sharp corners
  are the industrial signal; Fitnix's yellow button is also square, so this is a
  shared-genre convention rather than a copy.
- **Borders over shadows.** `1px solid var(--ink-700)` is the default separator.
  Shadows barely register on near-black anyway; use a `2px` ember top-rule to lift
  the one card that matters (the featured pricing tier) instead of shadowing all of them.
- **Blueprint texture:** a very faint 1px grid (`--ink-700` at 4% over 64px) on
  dark sections. One texture, used sparingly. Not on every section.

---

## 4. Motion

Restrained. Three behaviours only, or it starts to feel generated.

1. **Scroll reveal** — 16px rise + fade, 400ms, `cubic-bezier(.22,1,.36,1)`,
   staggered 60ms across siblings. Elements start **visible** in the static render
   and animate from a visible resting state, never parked at `opacity:0`.
2. **Hover** — 150ms. Buttons shift `--ember-500 → --ember-600`. Cards lift their
   border to `--ember-500` (colour change, not transform).
3. **Count-up on stats** — once, on first view, 900ms, ease-out. Static number is
   in the DOM as the fallback.

Everything wrapped in `@media (prefers-reduced-motion: reduce) { animation: none; transition: none; }`.

**Explicitly not doing:** parallax, cursor trails, scroll-jacking, marquee text,
looping background video in the hero (it costs 3–8 MB on a Lebanese mobile
connection and buys nothing a still photo doesn't).

---

## 5. Iconography & photography

- **Icons:** Lucide, `1.5px` stroke, `20px`/`24px`, `currentColor`. Never filled.
  No emoji anywhere in the UI.
- **Photography direction:** low-key, hard side light, high contrast, desaturated
  except for skin and the ember accent. Real room, real clients, real plates.
  Grade everything through one preset so the gallery reads as one shoot.
- **Never use stock gym photography.** Fitnix can — it's a template. A local
  business cannot: the prospect will recognise that the photos aren't the room
  they'd be walking into, and that's the exact trust the "clinic" angle needs.
- **Image handling:** AVIF + WebP, `<Image>` with `sizes`, LQIP blur placeholder,
  hero image `priority`, everything else lazy.
