# PRODUCT.md — GoodGround

register: brand

> Last verified against the codebase 2026-10-27, after the Figma redesign (local
> branch, not yet live). The look is now documented in `DESIGN.md`; the earlier
> cream/purple/orange palette and the Parkinsans/Instrument Sans pairing are
> retired. The Full Service monthly package (2026-08-25) is the one genuine
> subscription on the site, distinct from the two one-time-price payment
> options. Keep this file in step with the code.

## What this is

GoodGround is a website development studio in George, on the Garden Route (Western Cape), founded in 2026. This is their own marketing site.

Two things make it unusual to build:

**1. The studio has no track record yet.** No clients, no case studies, no testimonials, no logos. Everything a normal agency site leans on for credibility does not exist. The site has to be persuasive without a single borrowed proof point. `/work` says "case studies, coming soon" rather than inventing any.

**2. Pricing is public.** Four packages from R12 000 to R45 000 (starting prices, quoted per project), plus a build-your-own configurator off a R6 000 base fee. Real numbers, published, no "contact us for a quote" before you see any figure at all. Most competitors hide this, so it is a genuine wedge. The quote itself is still one fixed price agreed before work starts.

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

A fifth, structurally different offer on `/pricing`, alongside the four fixed one-time packages: a monthly, all-inclusive plan starting from R1 500/mo (final price depends on the site's requirements), covering the website build itself plus hosting, mailboxes, ongoing SEO work, and ongoing updates and maintenance. Month-to-month, no minimum term.

This **is** a subscription, on purpose, unlike the two payment options above. Keep the two ideas visually and verbally distinct: the four packages' "12 monthly instalments" is a way to pay off a fixed one-time price, not a recurring service; Full Service is a recurring service. Full Service is styled as a dark full-width plum band (`components/gg/pricing/FullServiceBand.tsx`), deliberately not a fifth white card in the same grid as the other four, so it reads as a different kind of purchase at a glance.

## Website Launch Offer (price changed 2026-10-27)

A separate promotion at `/website-launch` for new businesses that do not have a website: R950 per month for 12 months (R11 400 in total), with domain, hosting and email fees included for those 12 months and a custom one-page website (it is one page, confirmed 2026-09-23; it was described as five pages before that). It was R845 a month (R10 140 in total). Capacity is two promotional spots a month and the live month and spots taken are a site setting (`launchSpots` in `content/websiteLaunch.ts`; November 2026 has both spaces open (0 taken), so the page shows "2 slots left for November"; set `taken` to 2 to show the fully booked state and a December waitlist). The price, total and the "no deposit" wording all read from `content/websiteLaunch.ts`; no deposit was confirmed by the owner on 2026-09-23. Redesigns and replacements are out of scope.

Full Service replaced the old "Website Care Plans" service (maintenance only, no stated price, no hosting/mailboxes) entirely on 2026-08-25. The internal slug `care-plans` in `content/services.ts` was kept unchanged to avoid a wider rename across `content/industryPages.ts` and `content/articles.ts`'s cross-reference arrays; only the visible content changed. `/services/website-care-plans` now 301-redirects to `/pricing#full-service` (`next.config.ts`).

## What the design must do

- **Keep both payment options unambiguous.** The common failure would be a visitor reading the instalment plan as a subscription. Say plainly what each option is, near the number.
- **Prove competence through the build itself.** Motion quality, load speed and detail are the case study. This is the one site where craft *is* evidence. Current measured baseline: LCP ~510ms, CLS 0.00, Lighthouse SEO/Best-Practices/Accessibility 100.
- **Stay honest.** Founded 2026, no clients. Where proof doesn't exist, show nothing or say "coming soon". Never invent it. This rule has held through every build so far; keep it.
- **Work on a phone first.** Most of the audience arrives on mobile.

## Tone of voice

Plain, grounded, quietly confident. The brand story is agricultural (ground, seeds, roots, harvest) but never twee about it.

South African English. Rand. Never "solutions", "leverage", "showcase", "elevate", or "seamless". **No em dashes in user-facing copy** (checked in review; they had crept into `content/pricing.ts` and were removed 2026-08-13). No shouty caps or exclamation marks in headings.

## Design direction (as built, October 2026 redesign)

The full system is in `DESIGN.md`; the values live in `components/gg/gg.css` and are shown on the private `/brand-guide` and `/_styleguide` pages. In short: a warm off-white canvas (`#F7F7F4`), ink type (`#111111`), plum (`#2E1848`) for weight and promotion, and coral (`#EF4A23`) for the one action, with white cards, hairline borders, pill buttons with an arrow chip, and soft lilac, blush and mint tints for states. Oswald (display, uppercase) and IBM Plex Sans (everything read as a sentence), self-hosted. Built from the Figma file PI4P3fF9RVIAiTI7ZMxohj; the spec copy is in `docs/redesign/`.

**Contrast rules (load-bearing, WCAG 2.1 AA).** Brand coral is a bright fill and fails as small text (3.1 to 3.7:1):

- Small coral text and links on light surfaces use `--gg-coral-text` (`#C2300E`, 4.7:1 or better on white, canvas, blush, lilac and mint).
- White labels sit only on `--gg-coral-fill` (`#D0340F`, 5.02:1). Ink on plain coral is 5.1:1.
- On plum, accent text is peach (`#F7B48F`); coral is 4.1:1 there.
- Muted text (`#5F5B66`) is 6.2:1 on canvas. Touch targets are at least 44px on phones.
- Targets for every page: Lighthouse mobile Accessibility 100, SEO 100, CLS 0.

**Motion.** Declared with `data-reveal` and run once by `components/gg/motion/GgMotion.tsx` (fade-up, stagger, header, group, line-mask, count-up, fill). No GSAP, Lenis or Framer Motion on the redesigned pages. Eases out, never bounces except tiny pops. `prefers-reduced-motion` and `html[data-motion="off"]` jump to the end state; pages work with no JavaScript.

**Pages.** Home, Services, Service detail, Industry, Work, Case study, Pricing, Website launch, Start project, Contact, Thanks, 404, About, Process, Insights, Article, FAQ, Legal and the private Onboarding form are all on the redesign. The Home hero is the earlier gradient-video hero, kept on purpose and scoped under `.home-2026`.

**Forms and mail.** Start project, Contact and the Pricing quote form post to `/api/enquiry`; the launch enquiry posts to `/api/website-launch`; the project brief posts to `/api/launch-intake`; the client onboarding brief posts to `/api/onboarding`. All use the studio SMTP settings (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, optional `MAIL_TO`, `MAIL_FROM`) in `lib/mailer.ts` and show a "couldn't send" state until they are set. SPF, DKIM and DMARC for goodground.co.za must be set up on the mail host. Onboarding saves in the visitor's browser only until server storage is built.

**Cookie consent.** One module (`lib/consent.ts`) drives the banner, the switch on `/legal` and the footer's "Cookie settings" link. Google Analytics loads only after the visitor accepts.

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
- **Open launch items (2026-10-27).** Server storage, retention and recipients for the onboarding brief; the real Terms wording for ownership, warranties and liability, and disputes (the Terms tab on `/legal` is live since 2026-10-27, `termsLive` in `components/gg/legal/data.ts`, and those three sections only point to the signed contract); SMTP and the mail-domain records; real project screenshots and an About photo. The full list is `tasks/figma-redesign-questions.md`.
