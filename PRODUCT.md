# PRODUCT.md — GoodGround

register: brand

> Last verified against the live codebase 2026-08-25. Typography updated
> 2026-08-20 (Parkinsans/Instrument Sans, documented below). The Full Service
> monthly package was added 2026-08-25 (see its own section below) — the
> first genuine subscription offer on the site, distinct from the two
> one-time-price payment options. Keep this file in step with the code.

## What this is

GoodGround is a website development studio in George, on the Garden Route (Western Cape), founded in 2026. This is their own marketing site.

Two things make it unusual to build:

**1. The studio has no track record yet.** No clients, no case studies, no testimonials, no logos. Everything a normal agency site leans on for credibility does not exist. The site has to be persuasive without a single borrowed proof point. `/work` says "case studies, coming soon" rather than inventing any.

**2. Pricing is public and fixed.** Four packages from R8,500 to R32,000, plus a build-your-own configurator off a R6,000 base fee. Real numbers, published, no "contact us for a quote". Most competitors hide this, so it is a genuine wedge.

The site itself is also the portfolio. A studio selling custom-coded websites cannot have its own site look templated. If it looks like a template, the pitch dies.

## Who sees it, and where

**The buyer.** An owner of a small-to-medium South African business: a practice, a shop, a trade, a services firm. They've either got no site or one that looked fine and did nothing. They've been quoted R40–80k upfront by an agency and flinched. They are not comparing typography; they are asking two questions:

1. Can these people actually build the thing?
2. Can I afford to start this month?

The site answers the second question far more directly than most agencies dare to. Most arrive on mobile.

## Two payment options (current, since 2026-08-11)

Every project is one fixed price, agreed before work starts. The client picks how to pay it:

- **50% deposit.** Half secures the project, half on completion, before handover.
- **12 monthly instalments.** The first secures the booking; the remaining 11 become payable once the project is **completed**, not spread across the build.

Cancelling under either option makes the outstanding balance of the agreed price payable. This is not a refund policy.

The earlier single "12 equal monthly payments, not a subscription" promise is retired. Do not reintroduce it. Never describe either option as a subscription.

## Full Service (added 2026-08-25) — the one genuine subscription on the site

A fifth, structurally different offer on `/pricing`, alongside the four fixed one-time packages: a monthly, all-inclusive plan starting from R1,500/mo (final price depends on the site's requirements), covering the website build itself plus hosting, mailboxes, ongoing SEO work, and ongoing updates and maintenance. Month-to-month, no minimum term.

This **is** a subscription, on purpose, unlike the two payment options above. Keep the two ideas visually and verbally distinct: the four packages' "12 monthly instalments" is a way to pay off a fixed one-time price, not a recurring service; Full Service is a recurring service. Full Service is styled as a dark full-width band (`components/sections/PricingFullService.tsx`), deliberately not a fifth white ring-card in the same grid as the other four, so it reads as a different kind of purchase at a glance.

Full Service replaced the old "Website Care Plans" service (maintenance only, no stated price, no hosting/mailboxes) entirely on 2026-08-25. The internal slug `care-plans` in `content/services.ts` was kept unchanged to avoid a wider rename across `content/industryPages.ts` and `content/articles.ts`'s cross-reference arrays; only the visible content changed. `/services/website-care-plans` now 301-redirects to `/pricing#full-service` (`next.config.ts`).

## What the design must do

- **Keep both payment options unambiguous.** The common failure would be a visitor reading the instalment plan as a subscription. Say plainly what each option is, near the number.
- **Prove competence through the build itself.** Motion quality, load speed and detail are the case study. This is the one site where craft *is* evidence. Current measured baseline: LCP ~510ms, CLS 0.00, Lighthouse SEO/Best-Practices/Accessibility 100.
- **Stay honest.** Founded 2026, no clients. Where proof doesn't exist, show nothing or say "coming soon". Never invent it. This rule has held through every build so far; keep it.
- **Work on a phone first.** Most of the audience arrives on mobile.

## Tone of voice

Plain, grounded, quietly confident. The brand story is agricultural (ground, seeds, roots, harvest) but never twee about it.

South African English. Rand. Never "solutions", "leverage", "showcase", "elevate", or "seamless". **No em dashes in user-facing copy** (checked in review; they had crept into `content/pricing.ts` and were removed 2026-08-13). No shouty caps or exclamation marks in headings.

## Design direction (as built)

**Palette** (`app/globals.css`, client-supplied hex, used exactly as given):

| Token | Hex | Role |
|---|---|---|
| `ht-cream` | `#fbf7ec` | base page background |
| `ht-purple` | `#2e1848` | dark sections, footer, headings on cream |
| `ht-orange` | `#fe431a` | primary action colour, section fills |
| `ht-pink` | `#fe9dd2` | accents, card rings |
| `ht-crimson` | `#ac3026` | accent text on light surfaces, hover depth |
| `ink` | `#010602` | text on orange surfaces |

**Contrast rules (load-bearing, WCAG 2.1 AA).** `ht-orange` is a bright fill and fails easily. The rules established in the 2026-08-13 audit:

- Text on an orange fill uses `text-ink` (5.86:1), not white (3.48:1, fails). Display text at 18.66px+ bold may stay white, since WCAG's large-text bar is 3:1.
- Accent text on cream or white uses `text-ht-crimson` (6.08:1), not `text-ht-orange` (3.25:1, fails).
- On the dark purple panel the reverse holds: `ht-orange` passes at 4.50:1 and crimson would fail at 2.41:1. Surface decides the token.
- Muted body text bottoms out at `text-ht-purple/70` (5.78:1). `/60` fails at 4.22:1.

**Typography** (2026-08-20, client-supplied choice, replacing the Syne/DM Sans pairing that shipped 2026-08-12). Parkinsans for every heading (`font-ht-display`), Instrument Sans for body (`font-ht-body`), both via `next/font/google` in `app/layout.tsx`. Headings use 600 and 700.

The Satori OG-image renderer needs its own repo-local TTF, separate from the browser font loading, at `app/_og/Parkinsans-Bold.ttf`. That file is a **static instance pinned at wght 700**, generated from the variable font with fontTools. Google publishes Parkinsans only as a variable font whose default axis position is 300 (Light), and Satori renders a variable font at its default instance, so dropping the variable file in directly renders every social card in Light. Regenerate the same way if the font is ever updated.

Parkinsans has no built-in Next metric overrides, so `adjustFontFallback` is off and an explicit fallback stack is declared instead; without one the swap falls back to the browser default and shifts layout more, not less.

**Structure and motion.** GSAP plus Lenis smooth scroll (`components/motion-gsap/*`): `RevealSection`/`RevealStagger` for scroll reveals, `SplitWords` for headline word-reveals, `MagneticButton`, `HoverCard`. Framer Motion survives only in `ParableModal` and `components/motion/BorderTrail.tsx`. Sections overlap via an ascending z-index stack with rounded/scalloped edges (`CloudDivider`).

Motion eases out and never overshoots. No bounce or elastic curves. Every animation is gated on `prefers-reduced-motion`, both globally in `globals.css` and per-component via `gsap.matchMedia`. Route changes fade via `app/template.tsx` (opacity only, deliberately no transform, see the `route-in` keyframe comment).

## Anti-references (what we must not look like)

- **The generic AI landing page.** Centred purple gradient, rounded-full everything, emoji section headers, three identical feature cards, an abstract blob illustration.
- **Fabricated authority.** The original reference template shipped invented review counts and client numbers. Never that.
- **Subscription SaaS pricing.** The card pattern is fine; recurring-billing framing is actively wrong for project work.

## Hard constraints

- No CMS, no headless CMS, no page builder. Typed content files in `/content`. Client requirement.
- No fabricated stats, quotes, logos or case studies, including during development.
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms. The overlapping sections and kinetic text are the likeliest CLS offenders; reserve their space.
- WCAG 2.1 AA. See the contrast rules above; they are not suggestions, they were failing in production until 2026-08-13.

## Known gaps (not bugs, missing inputs)

- **`site.phone` is `null`.** No phone number appears anywhere, and `telephone`/`geo`/`streetAddress` are therefore absent from the `LocalBusiness` schema. This is the largest remaining local-SEO gap for a George-based business. It stays absent rather than guessed, per the rule in `content/site.ts`.
- **No `DESIGN.md`.** The design system is documented here and in `app/globals.css` plus the internal `/brand-guide` page (noindex). Running `/impeccable document` would generate one.
