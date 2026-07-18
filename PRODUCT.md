# PRODUCT.md — GoodGround

register: brand

## What this is

GoodGround is a website design and development studio in Brackenfell, Cape Town, founded in 2026. This is their own marketing site.

Two things make it unusual to build:

**1. The studio has no track record yet.** No clients, no case studies, no testimonials, no logos. Everything that a normal agency site leans on for credibility does not exist. The site has to be persuasive without a single borrowed proof point.

**2. The business model is the pitch.** Every project is one fixed price split into **12 equal monthly payments**. Not a subscription — twelve payments, then the site is theirs. That is the whole differentiator, and it earns hero-level treatment, not a pricing footnote.

The site itself is also the portfolio. A studio selling custom-coded websites cannot have its own site look templated. If it looks like a template, the pitch dies.

## Who sees it, and where

**The buyer.** An owner of a small-to-medium South African business — a practice, a shop, a trade, a services firm. They've either got no site or one that looked fine and did nothing. They've been quoted R40–80k upfront by an agency and flinched. They are not comparing typography; they are asking two questions:

1. Can these people actually build the thing?
2. Can I afford to start this month?

The site answers the second question far more directly than most agencies dare to, and that's the wedge. Most arrive on mobile.

## What the design must do

- **Make the payment plan unmissable and unambiguous.** The single most common failure would be a visitor thinking it's a subscription. Say "12 payments, then it's yours — not an ongoing subscription" plainly, near the number.
- **Prove competence through the build itself.** Motion quality, load speed, and detail are the case study. This is the one site where craft *is* evidence.
- **Stay honest.** Founded 2026 with no clients. Where proof doesn't exist, show nothing or say "coming soon" — never invent it.
- **Feel warm, not clinical.** Light and green, growth-symbolising. The client rejected two dark, moody directions before this one.

## Tone of voice

Plain, grounded, quietly confident. The brand story is agricultural — ground, seeds, roots, harvest — but it's never twee about it. The copy deck already nails it: "build it right, and it lasts."

South African English. Rand. Never say "solutions", "leverage", "showcase", "elevate", or "seamless".

## Design direction

Light dominates. Cream `#FBFAF6` is the field; Forest Green `#1F3D2C` grounds (footer, one CTA band) but is never the main background. Growth Green leads. Sunlight Gold is a rare highlight, never body text.

Structure and motion follow the Aeline reference: floating card clusters, kinetic scroll-revealed headlines, soft layered shadows, 16–24px radii. Recoloured warm and organic, not cool and tech.

Type: Sora headings, Inter body. H1 60–72/36px, H2 40/28, H3 26/20, body 18/16.

Motion is buoyant, not architectural: 150–250ms reveals, 4–8px ambient float, transform/opacity only. `prefers-reduced-motion` kills all of it.

## Anti-references (what we must not look like)

- **Aeline's own content.** The reference template ships fabricated authority — "rated 4.9/5 by 4,900+ clients", "20+ continents" (there are 7). Take its structure; never its claims.
- **The generic AI landing page.** Centred purple gradient, rounded-full everything, emoji section headers, three identical feature cards, an abstract blob illustration.
- **Dark moody agency.** Two previous directions were killed for this. Default light when unsure.
- **Subscription SaaS pricing.** The card pattern is fine; the recurring-billing framing is actively wrong for project work.

## Hard constraints

- No CMS, no headless CMS, no page builder. Typed content files in `/content`. This is a client requirement.
- No fabricated stats, quotes, logos, or case studies — including during development.
- The payment calculator is illustrative only. No live billing until the gateway and National Credit Act questions are settled.
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms. The floating cards and kinetic text are the likeliest CLS offenders — reserve their space.
- WCAG 2.1 AA. Growth Green was deepened to `#327D4F` to pass; `#3B8F5C` survives as a graphics-only accent.
