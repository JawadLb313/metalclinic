# 03 — Component Architecture

Stack: **Next.js 15 (App Router, static export) · TypeScript · Tailwind CSS v4 · Motion**

> **Static build.** Per `06-static-build-decision.md` this site has no server
> runtime: no API routes, no server actions, no database. Contact is a WhatsApp
> or `mailto:` redirect. Everything else below is unchanged.

---

## 1. Why this stack

- **Next.js App Router with `output: 'export'`** — every page pre-rendered to
  static HTML at build time. No runtime to pay for, patch or debug. Deployable
  to any static host.
- **Tailwind v4** — CSS-first config. The design tokens from `01-design-system.md`
  live in one `@theme` block and become utilities automatically. No `tailwind.config.js` to drift.
- **Motion** — `<3kb` for what we need. Only imported in the two components that animate.
- **No CMS at v1.** Content is typed TS in `/content`. A gym's copy changes four
  times a year; a CMS is a subscription and an attack surface for no benefit.
  If Alain wants to edit himself later, add Sanity or Payload in phase 2 —
  the `/content` files are already shaped like a schema, so it's a lift, not a rewrite.

---

## 2. Route tree

```
app/
├── layout.tsx                 # fonts, <Header/>, <Footer/>, <WhatsAppFab/>, JSON-LD
├── page.tsx                   # Homepage
├── about/page.tsx
├── programs/
│   ├── page.tsx               # all five
│   └── [slug]/page.tsx        # generateStaticParams from content/programs.ts
├── pricing/page.tsx
├── results/page.tsx           # case files
├── contact/page.tsx
├── blog/                      # phase 2 — MDX
│   ├── page.tsx
│   └── [slug]/page.tsx
├── terms/page.tsx
├── privacy/page.tsx
├── not-found.tsx
├── sitemap.ts
├── robots.ts
└── opengraph-image.tsx
```

```
components/
├── layout/    Header, MobileNav, Footer, Container, Section, WhatsAppFab, StickyMobileCta
├── ui/        Button, Badge, Eyebrow, SectionHeading, Card, Accordion, Toggle,
│              Input, Select, Textarea, Checkbox, Rule, Chip, Stat
├── sections/  Hero, CredentialStrip, StatBand, AboutCoach, ProtocolSteps,
│              ProgramAccordion, WhyUs, Gallery, CaseFiles, PricingTable,
│              FaqAccordion, LocationMap, ClosingCta
└── forms/     EnquiryComposer   # builds a WhatsApp / mailto link — no submission
content/       site.ts, programs.ts, pricing.ts, faq.ts, caseFiles.ts, gallery.ts, hours.ts
lib/           schema.ts (JSON-LD), hours.ts (open-now logic), analytics.ts, cn.ts
```

**Server/client split:** everything renders at build time. Only these carry
`'use client'` — `MobileNav`, `Accordion`, `Toggle`(pricing), `Gallery`(lightbox),
`EnquiryComposer`, `Stat`(count-up), `LocationMap`(facade), `Header`(scroll state),
`StickyMobileCta`. Nine client components on the whole site, and none of them
talks to a server.

```js
// next.config.mjs
export default {
  output: 'export',
  images: { unoptimized: true },   // AVIF/WebP pre-optimised and committed
  trailingSlash: true,
};
```

---

## 3. Tailwind v4 theme block

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-ink-950: #08090B;
  --color-ink-900: #0E1013;
  --color-ink-850: #14171B;
  --color-ink-800: #1A1E23;
  --color-ink-700: #262B32;
  --color-chalk:   #F4F5F7;
  --color-steel-300: #AEB5BF;
  --color-steel-500: #79808C;
  --color-ember-400: #FF7A45;
  --color-ember-500: #FF5A1F;
  --color-ember-600: #D9430F;
  --color-vitals-400: #5CD6E8;

  --font-display: 'Archivo Black', 'Arial Black', system-ui, sans-serif;
  --font-body:    'Barlow', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;

  --radius-card: 4px;
}

@layer base {
  body { @apply bg-ink-950 text-steel-300 font-body antialiased; }
  h1,h2,h3 { @apply font-display uppercase text-chalk tracking-tight leading-[0.92] text-balance; }
  ::selection { @apply bg-ember-500 text-ink-950; }
  :focus-visible { @apply outline-2 outline-offset-2 outline-ember-500; }
}
```

---

## 4. Class recipes (the ones worth standardising)

```
Section shell      py-[clamp(4.5rem,10vw,9rem)] relative
Container          mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,5vw,4rem)]
Eyebrow            font-mono text-xs uppercase tracking-[0.18em] text-ember-500
                   flex items-center gap-3 before:h-px before:w-8 before:bg-ember-500
H1                 font-display uppercase text-[clamp(2.75rem,9vw,7rem)] leading-[0.88] tracking-[-0.02em] text-chalk
H2                 font-display uppercase text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] text-chalk
Lead               text-[clamp(1.0625rem,1.6vw,1.25rem)] leading-relaxed text-steel-300 max-w-[58ch]
Btn primary        inline-flex items-center gap-2 bg-ember-500 px-8 py-4 font-display text-sm uppercase
                   tracking-wide text-ink-950 transition-colors duration-150 hover:bg-ember-600
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-400
Btn ghost          … border border-ink-700 bg-transparent text-chalk hover:border-ember-500 hover:text-ember-400
Card               border border-ink-700 bg-ink-850 rounded-[4px] p-8
                   transition-colors duration-200 hover:border-ember-500/60
Card featured      … border-ink-700 bg-ink-800 relative before:absolute before:inset-x-0 before:top-0
                   before:h-0.5 before:bg-ember-500
Stat number        font-mono font-bold tabular-nums text-[clamp(2.5rem,7vw,5rem)] text-vitals-400 leading-none
Stat label         font-mono text-xs uppercase tracking-[0.14em] text-steel-500
Hairline           h-px w-full bg-ink-700
Blueprint bg       bg-[linear-gradient(var(--color-ink-700)_1px,transparent_1px),linear-gradient(90deg,var(--color-ink-700)_1px,transparent_1px)]
                   bg-[size:64px_64px] opacity-[0.04]
```

---

## 5. Key component contracts

```ts
// ui/Button.tsx  (Server Component; renders <a> or <button>)
type ButtonProps = {
  variant?: 'primary' | 'ghost' | 'link';
  size?: 'md' | 'lg';
  href?: string;            // renders <Link> when present
  icon?: LucideIcon;
  children: React.ReactNode;
};

// ui/SectionHeading.tsx
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
};

// sections/ProgramAccordion.tsx  ('use client')
type Program = {
  slug: string; index: string;      // "01"
  name: string; promise: string;
  bullets: string[]; forWho: string;
  image: { src: string; alt: string };
  priceFrom?: number;
};
// One item open by default (index 0) so the section is never a wall of closed rows.
// Radix Accordion (type="single", collapsible) — keyboard + ARIA solved.

// sections/PricingTable.tsx  ('use client')
type Term = 1 | 3 | 6;   // months
type Tier = {
  id: string; name: string; positioning: string;
  price: Record<Term, number | null>;   // null = "on request"
  unit: 'per month' | 'one-off' | 'per session';
  features: string[];
  featured?: boolean;
  cta: { label: string; href: string };
  availableIf?: 'gym' | 'studio' | 'both';   // ties to the open decision in 00-strategy
};

// sections/CaseFiles.tsx
type CaseFile = {
  name: string; age?: number; occupation?: string;
  program: string; weeks: number;
  metrics: { label: string; from: string; to: string }[];  // rendered mono, from→to
  quote: string;
  photo?: { before: string; after: string } | null;        // null → typographic card
  consent: true;    // typed as literal `true` so a case file cannot ship without it
};
```

That last line is deliberate: making `consent: true` a required literal means
TypeScript refuses to build a testimonial that hasn't been cleared. Cheap
guardrail, real legal value.

---

## 6. Homepage section order (final)

1. `Header` (transparent → solid on scroll)
2. `Hero` + `CredentialStrip`
3. `StatBand`
4. `AboutCoach` — the founder story
5. `ProtocolSteps` — 01–04
6. `ProgramAccordion` — 01–05
7. `WhyUs` + 4 chips
8. `Gallery` — filtered
9. `CaseFiles`
10. `PricingPreview` — 3 tiers + "see all pricing"
11. `FaqAccordion`
12. `LocationMap` + hours + contact rail
13. `ClosingCta`
14. `Footer`

Rationale for the two changes vs Fitnix's order: the **founder story moves up to
position 4** (it's our strongest asset and Fitnix has no equivalent), and
**location moves onto the homepage** rather than living only in the footer,
because the research showed local discoverability is this business's biggest gap.

---

## 7. Accessibility contract

- Semantic landmarks: one `<h1>` per page, `<nav>`, `<main>`, `<footer>`.
- All interactive elements reachable by keyboard, visible `:focus-visible` ring in ember.
- Mobile nav: focus trap, `Esc` to close, `aria-expanded`, background `inert`.
- Accordion + toggle via Radix primitives — correct ARIA without hand-rolling it.
- Colour contrast: body text `--steel-300` on `--ink-950` ≈ 11:1. Never drop body
  copy to `--steel-500` (that token is captions only).
- Every image has a real `alt`; decorative textures are `aria-hidden`.
- Form: `<label>` on every field, `aria-describedby` for errors, errors announced
  in a `role="status"` region — not colour alone.
- Target size ≥ 44×44px on all mobile controls.
