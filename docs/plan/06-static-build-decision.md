# 06 — Decision: Static Site, No Backend

**Status:** decided by client, 2 September 2026. Supersedes anything in
`03`–`05` that assumed a server. Those files have been updated to match.

---

## 1. The decision

The site ships as a **fully static build**. No server runtime, no database, no
API routes, no server actions, no third-party form service. Every page is HTML,
CSS and a small amount of client-side JavaScript, deployable to any static host.

**Contact is handled by redirect, not by submission.** The two channels are:

- **WhatsApp** — `https://wa.me/9613402413?text=<prefilled message>`
- **Email** — `mailto:info@themetalclinic.com?subject=…&body=…`

Nothing is posted anywhere. The visitor's own app sends the message, which means
their name is already attached, the thread lives in a place Alain already checks,
and he can reply from his phone in one tap.

---

## 2. Why this is the right call here, not just the cheap one

1. **WhatsApp is where this business already converts.** A contact form in
   Lebanon is the polite option; WhatsApp is the one people actually use. A form
   that emails an inbox is a *slower* path to the same conversation.
2. **No form means no spam, no honeypot, no CAPTCHA, no consent banner, no
   GDPR-shaped data handling, no deliverability problem, and no silent failure.**
   A contact form that quietly stops sending is one of the most common ways a
   small business loses leads for months without noticing. This removes the
   entire failure class.
3. **Nothing to maintain, nothing to pay for, nothing to be breached.** No API
   keys in the repo, no service that changes its pricing, no runtime to patch.
4. **It is faster.** Removing the form runtime, validation library and mail SDK
   takes the JavaScript budget down substantially (see §5).
5. **Hosting becomes free and portable.** Netlify, Cloudflare Pages, GitHub
   Pages, Vercel — all equivalent. No lock-in.

**What we give up, stated honestly:** no lead database, no server-side analytics,
no automated follow-up, and no record of an enquiry unless Alain keeps the chat.
For a coaching studio at this scale, that is the correct trade. If lead volume
ever justifies a CRM, the enquiry composer described below already collects the
exact fields a form would have collected — it just hands them to WhatsApp instead
of a database, so adding a backend later is an addition, not a rewrite.

---

## 3. The enquiry composer (replaces the contact form)

Not a raw "message us" link — a short guided form that **builds a prefilled
message and hands it to WhatsApp or email**. Same fields as a real form, same
sense of being taken seriously, zero backend.

**Fields**
1. Your name
2. What are you after? *(Transformation / One-to-one / Small group / Nutrition / Online / Just looking)*
3. How often could you train? *(1–2 / 3–4 / 5+ days a week)*
4. Anything we should know? *(injuries, schedule, history — optional)*

**Composed message**
```
Hi Alain — I'd like to book an assessment.

Name: Karim
Interested in: Transformation Protocol
Availability: 3–4 days a week
Notes: Lower back issue from 2019, desk job.

(Sent from themetalclinic.com)
```

**Two buttons, equal weight:** `SEND ON WHATSAPP` (primary, ember) and
`SEND BY EMAIL` (ghost). Both are real `<a href>` elements whose `href` is
rebuilt on every keystroke — so **the form works with JavaScript disabled**, it
just sends the generic version of the message.

**Rules**
- Every field optional except the name. A required field is a reason to abandon.
- Nothing validates, nothing errors, nothing blocks. The worst case is a slightly
  emptier message.
- `encodeURIComponent` on every value.
- Keep the composed `mailto:` body under ~1,800 characters — some mail clients
  truncate beyond ~2,000.
- Below the two buttons, always show the raw phone number and email as
  selectable text. Some people will copy rather than click, and on desktop a
  `mailto:` can open nothing at all.

---

## 4. What comes out of the plan

| Removed | Replaced by |
|---|---|
| Next.js server actions | Client-side `href` composition |
| `resend` (transactional email) | The visitor's own mail client |
| `zod` (server input validation) | Nothing — no input crosses a boundary |
| Spam protection (honeypot, Turnstile) | Not needed; no endpoint exists |
| Form success/error/loading states | Not needed; no request is made |
| Google Sheets lead capture | The WhatsApp thread itself |
| Cookie/consent banner | Cookieless analytics, or none |
| `AssessmentForm` component | Folded into `EnquiryComposer` |

**Kept, because none of it needs a server:** the pricing term toggle, the
full-screen mobile nav, the sticky WhatsApp/call bar, the programmes and FAQ
accordions, the filtered gallery with lightbox, the map facade, the count-up
stats, and the scroll-state header. All of these are client-side by nature and
survive the change untouched.

---

## 5. Revised budget

| Metric | Was | Now |
|---|---|---|
| First-load JS (home) | < 110 kB | **< 85 kB** |
| Runtime | Node on Vercel | **None** |
| Monthly cost | Hosting + email service | **Hosting only (free tier is enough)** |
| Failure modes in the contact path | 6+ | **0** |

---

## 6. Two viable builds — pick either

**(A) Next.js 15 with `output: 'export'`** — keeps everything in
`03-component-architecture.md` exactly as written (App Router, components,
Tailwind v4 theme block, typed `/content` files), and emits a folder of static
HTML. `next/image` needs `unoptimized: true` with pre-optimised AVIF/WebP
committed to the repo, which is fine for a fixed photo set.
*Recommended* — the architecture already written works unchanged, and adding a
blog or CMS later needs no migration.

**(B) Astro** — less JavaScript still, islands only where the interactions live.
Genuinely the leaner tool for a brochure site. Costs a rewrite of the component
layer, though the design system, copy deck and interaction specs port as-is.

Either way the deliverable is a static folder. **(A) unless you'd rather I redo
the component layer.**

---

## 7. Staying distinctive on a static build

The constraint changes nothing about the direction. Every idea that makes this
site *not* a Fitnix clone is presentational, and all of it survives:

- "Clinic" positioning — assess, prescribe, execute, review
- Ember `#FF5A1F` with the cool `#5CD6E8` zoned strictly to data
- Archivo Black / Barlow / **every number in monospace**
- Founder story at homepage position 4
- Case files as chart cards rather than quote cards
- Location on the homepage, not buried in the footer
- Mono-indexed mobile nav matching the protocol numbering
- Map facade instead of a raw Google embed

None of that needed a server. The only thing the backend was ever doing was
sending an email — and WhatsApp does that better for this business.
