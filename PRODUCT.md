# PRODUCT.md — GoodGround

register: brand

> Last verified against the codebase 2026-11-04, on the `v2-funnel` branch (the
> monthly-plan funnel, not yet live). The look is documented in `DESIGN.md`; the
> earlier cream/purple/orange palette and the Parkinsans/Instrument Sans pairing
> are retired. Since v2 the site sells three kinds of thing: monthly Local plans
> and Full Service (recurring services), custom builds (a fixed price paid two
> ways, never a subscription) and a free AI visibility check. Keep this file in
> step with the code.

## What this is

GoodGround is a website development studio in George, on the Garden Route (Western Cape), founded in 2026. This is their own marketing site.

Two things make it unusual to build:

**1. The studio has no track record yet.** No clients, no case studies, no testimonials, no logos. Everything a normal agency site leans on for credibility does not exist. The site has to be persuasive without a single borrowed proof point. `/work` says "case studies, coming soon" rather than inventing any.

**2. Pricing is public.** Monthly Local plans from R950, four custom packages from R12 000 to R45 000 (starting prices, quoted per project), plus Full Service from R1 500 a month. Real numbers, published, no "contact us for a quote" before you see any figure at all. Most competitors hide this, so it is a genuine wedge. The quote itself is still one fixed price agreed before work starts.

The site itself is also the portfolio. A studio selling custom-coded websites cannot have its own site look templated. If it looks like a template, the pitch dies.

## Who sees it, and where

**The buyer.** An owner of a small-to-medium South African business: a practice, a shop, a trade, a services firm. They've either got no site or one that looked fine and did nothing. They've been quoted R40–80k upfront by an agency and flinched. They are not comparing typography; they are asking two questions:

1. Can these people actually build the thing?
2. Can I afford to start this month?

The site answers the second question far more directly than most agencies dare to. Most arrive on mobile.

## The v2 funnel: one ladder, three tracks

One pricing collection (`content/pricing.ts`: `localPlans`, `addOns`, `packages`, `fullServicePackage`; offer in `content/newBusinessOffer.ts`) feeds every page, so no page types a price. The ladder, as shown on the public site:

- **Free:** the AI visibility check (by request, one per business per 30 days) and a website preview before the first debit of a monthly plan.
- **Monthly Local plans:** Local Start R950, Local Plus R1 750, Local Pro R2 750 a month (no VAT added; monthly only). The free preview takes 10 to 15 working days. Month to month, domain always the client's, site files the client's after 6 paid months. The New Business Offer is Local Start with the first month free.
- **Custom builds:** Micro, Launch, Grow, Scale, paid 50/50 or over 12 months. **Full Service** from R1 500 a month and the **Care Plan** (per site, after a build) are the recurring services for custom clients.
- **Add-ons:** AI Visibility Fix Pack, Visibility Watch, business email.

Every page has a `primaryTrack` (`local`, `custom` or `check`, defaults in `content/funnel.ts`) that sets its main button, its gradient CTA and the one text link to the next-best track. The three tracks each have their own form, auto-reply and `/thanks?form=` variant: **local** (`/start-project?plan=local-*`, formType `local-preview`), **custom** (`/start-project`, formType `start-project`) and **check** (`/services/ai-visibility#book`, formType `ai-check`). Parameters are whitelisted in `lib/enquiryShared.ts`; the retired `?plan=launch` maps to the New Business Offer. After a preview is approved a monthly-plan client gets the short onboarding (`/onboarding?track=local`, four steps plus review); custom clients get the full one.

The free check never runs a scan on the site: the form stores a request and emails the team, who run it. Guardrails: one request per business per 30 days (matched server-side), a monthly budget (`freeCheck.monthlyBudget` in `content/site.ts`) after which the form takes waitlist requests, a honeypot, the 3-second rule and Cloudflare Turnstile.

## Two payment options (current, since 2026-08-11)

Every project is one fixed price, agreed before work starts. The client picks how to pay it:

- **50% deposit.** Half secures the project, half on completion, before handover.
- **12 monthly instalments.** The first secures the booking; the remaining 11 become payable once the project is **completed**, not spread across the build.

Cancelling under either option makes the outstanding balance of the agreed price payable. This is not a refund policy.

The earlier single "12 equal monthly payments, not a subscription" promise is retired. Do not reintroduce it. Never describe either option as a subscription.

## Full Service (added 2026-08-25) — the one genuine subscription on the site

A fifth, structurally different offer on `/pricing`, alongside the four fixed one-time packages: a monthly, all-inclusive plan starting from R1 500/mo (final price depends on the site's requirements), covering the website build itself plus hosting, mailboxes, ongoing SEO work, and ongoing updates and maintenance. Month-to-month, no minimum term.

This **is** a subscription, on purpose, unlike the two payment options above. Keep the two ideas visually and verbally distinct: the four packages' "12 monthly instalments" is a way to pay off a fixed one-time price, not a recurring service; Full Service is a recurring service. Since v2 it is a plum strip under the monthly Local plans on `/pricing` (`#full-service`), not a section of its own, so it still reads as a different kind of purchase at a glance.

## New Business Offer (v2, replaces the retired Website Launch Offer)

`/website-launch` is the New Business Offer: Local Start (the monthly Local plan in `content/pricing.ts`) with the first month free, plus a business mailbox free for 12 months, for businesses going online for the first time. Two businesses a month. After the free month it is normal Local Start: month to month, cancel any month, the domain is always the client's, and the site files are the client's after 6 months. The earlier fixed-term Website Launch Offer (a monthly price for 12 months, with a total) is retired and no figure from it may appear anywhere. Capacity is two spaces a month. The month and the spaces taken are settings in `content/newBusinessOffer.ts`; when Upstash Redis is connected the live count (`lib/liveCounters.ts`) wins, so the owner can move it without a deploy. The pages that show it (Home, Pricing, Start your project, Website launch, AI visibility) stay static: they render the typed values and swap in the live ones after load from the read-only `GET /api/offer-spots` (`components/gg/useLiveCounters.ts`). At 2 of 2 taken the page shows the fully booked state and a waitlist for the next month. The form posts to `/api/enquiry` as formType `new-business-offer` (the old separate launch-enquiry route and its result pages are gone). Redesigns and replacements are out of scope.

Care Plans ARE still sold (owner, 2026-10-27/11-03): GoodGround maintains the site while the client pays off the 12-month plan; when the contract ends the client buys a Care Plan on a monthly retainer. Priced per project, no published figure; Terms section 11 lists it. Full Service is a separate monthly package added 2026-08-25 (it does not replace Care Plans; the earlier note here saying it did was wrong). The internal slug `care-plans` in `content/services.ts` was kept unchanged to avoid a wider rename across `content/industryPages.ts` and `content/articles.ts`'s cross-reference arrays; only the visible content changed. `/services/website-care-plans` now 301-redirects to `/pricing#full-service` (`next.config.ts`).

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

**Pages.** Home, Services, Service detail, Industry, AI visibility (`/services/ai-visibility`), Work, Case study, Pricing, Website launch (the New Business Offer), Start project, Contact, Thanks, 404, About, Process, Insights, Article, FAQ, Legal and the private Onboarding form are all on the redesign. The Home hero is the earlier gradient-video hero, kept on purpose and scoped under `.home-2026`.

**Forms and mail.** Every public form posts to `/api/enquiry` with a formType: `contact`, `start-project`, `pricing-quote`, `local-preview`, `new-business-offer` or `ai-check` (the free check is never accepted as a contact topic); the client onboarding brief posts to `/api/onboarding`, with `track: "local"` and an optional `plan` for the short brief. All use the studio SMTP settings (live since 2026-10-27: mail.goodground.co.za:465 as webinquiry@goodground.co.za, which is also where enquiries land; SPF, DKIM and DMARC already published at Afrihost; a live test of /api/enquiry delivered both the studio email and the auto-reply) (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, optional `MAIL_TO`, `MAIL_FROM`) in `lib/mailer.ts` and show a "couldn't send" state until they are set. DMARC is still `p=none` (monitor only). **Environment variables** beyond SMTP, all optional: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (or the `KV_REST_API_*` names the Vercel Marketplace injects) hold the 30-day free-check record, the monthly counter and the offer spaces taken; `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` switch Turnstile on (the CSP opens challenges.cloudflare.com only then). With none set the forms still work: requests are emailed, there is no 30-day rule or cap, and the typed values in `content/` are used. Names are in `.env.example`. Onboarding saves in the visitor's browser only (one draft per track) until server storage is built. It takes no file uploads: the client pastes one Google Drive, Dropbox or OneDrive share-folder link, so GoodGround stores none of their files (owner decision, 2026-10-27).

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
- **Not built yet.** Server storage for the onboarding brief; Upstash and Turnstile keys in Vercel (until then the free-check 30-day rule and cap are off); real project screenshots and an About photo.
