# PRODUCT.md — GoodGround

register: brand

> Last verified against the live codebase 2026-08-13. The palette, typography
> and payment-model sections below were rewritten then: the previous version of
> this file still described the pre-2026-08-06 cream/forest-green direction,
> Sora + Inter typography, and a single "12 monthly payments" pitch, none of
> which had been true for months. Keep this file in step with the code.

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

**Typography.** Syne Bold for every heading (`font-ht-display`), DM Sans for body (`font-ht-body`), both via `next/font/google` in `app/layout.tsx`. Headings are bold-only, one weight. The Satori OG-image renderer needs its own repo-local TTF at `app/_og/Syne-Bold.ttf`, separate from the browser font loading.

**Structure and motion.** GSAP plus Lenis smooth scroll (`components/motion-gsap/*`): `RevealSection`/`RevealStagger` for scroll reveals, `SplitWords` for headline word-reveals, `MagneticButton`, `HoverCard`. Framer Motion survives only in `components/motion/RotatingWords.tsx` and `ParableModal`. Sections overlap via an ascending z-index stack with rounded/scalloped edges (`CloudDivider`).

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
