# Figma redesign (Oct 2026) — build tracker

Spec: `docs/redesign/README.md` + `docs/redesign/pages/*.md`. Figma file
`PI4P3fF9RVIAiTI7ZMxohj`. Goal: 1:1 with the 1440 and 390 frames.

**Nothing is pushed until the whole site is signed off** (owner, 26 Oct 2026).
Work on `main`, local commits only. Review each step before the next.

## Build order

- [x] 1. Foundations + `/_styleguide` (built 26 Oct 2026, reviewed 27 Oct, committed locally dbd1813)
- [x] 2. Home, hero untouched (built 27 Oct 2026, awaiting review; not yet committed)
- [ ] 3. Services → Service detail (SEO first) → Industry (Trades first)
- [ ] 4. Work listing + Case study
- [ ] 5. Pricing (configurator) + Website launch
- [ ] 6. Start project + Contact + /thanks
- [ ] 7. About + Process
- [ ] 8. Insights + Article
- [ ] 9. FAQ (search) + Legal + 404
- [ ] 10. Client onboarding (needs open item 8 first)
- [ ] 11. QA (README section 12)
- [ ] Remove the old ht-* tokens, home2026.css and SiteShell once every page is on `components/gg`
- [ ] Update PRODUCT.md / DESIGN.md to the new palette and fonts (owner: at the end)
- [ ] Check the root layout's preloads (old logo SVGs, Oswald 700) are gone once SiteShell is removed: they warn on every gg page

## Step 1 notes

- New system lives in `components/gg/` (`gg.css`, tokens `--gg-*`, classes `.gg-*`), beside the old one.
- Pages move over by rendering inside `<GgShell>` instead of the (site) layout's SiteShell.
- Reveal helper: `components/gg/motion/GgMotion.tsx` (`data-reveal`, `data-split`, `data-loop`).
- "Pause motion" now writes `html[data-motion="off|on"]` + localStorage `gg-motion`; the head script in `app/layout.tsx` applies it before paint on every page.
- Numbers go through `components/gg/format.ts` (open item 4).

## Step 2 notes (Home, built 27 Oct 2026)

- `app/page.tsx` composes it: the hero and its header/menu stay on the old system (`.home-2026`, HomeChrome, Hero), everything after is `.gg` (`components/gg/home/`, styles in `home.css`). The two scopes sit side by side, never nested. Only hook changes to the hero: "Scroll to explore" now goes to `#trust`.
- Section heights vs Figma at 1440: trust 144/143, why 1037/1005, launch 860/854, services 1370/1369, work 1480/1483, story 880/880; process and pay were short before the 700px header column and the 520px option cards (fixed after). Phone heights are within about 50px on every section.
- Known deviation: Figma's "Why" cards are 480 tall but their content is 508, so the content overflows the frame; built at natural height (+32px) rather than copying the overflow.
- Lighthouse on `/`: desktop 100/100/100 (a11y/best practices/SEO), mobile a11y 96 until the carousel dots were made 24px+ targets.
- Verified: no console errors; JS-off HTML has every section, the FAQ answers and one h1; `html[data-motion="off"]` gives final counts, finished stepper, plain search mock, paused videos, and the meter/score bars keep their values.
- Carousel dots are 24px-wide targets, so they sit 16px apart instead of the drawn 6px (Lighthouse counts overlapping targets as obscured).

## Home: needs the owner's answer before it ships

- **Launch availability is a placeholder.** The card shows "November availability, 1 of 2 spots left", the Figma sample, kept in `launchSpots` in `content/websiteLaunch.ts`. Give the real month and spots taken. (The older `launchAvailability` message still says September and is not used by the new card.)
- **Trust bar numbers** (`content/trustBar.ts`): "5.0 on Google", "20+ years combined experience", "10+ live, testable projects", "100% satisfied clients". `content/stats.ts` has a standing rule of honest figures only for a studio founded in 2026. Confirm each is true.
- **Launch card says "Up to five custom website pages"**, matching the live offer; the Figma sample says "Custom one-page website".
- **Roam Local quote** uses the verbatim review ("...ongoing support throughout that period."); Figma shortens it, which would edit the review. It wraps to two lines on desktop.
- **Project images** are the spec's gradients (the repo's old project images are portrait mock-ups and an old site design). Need real 16:10 screenshots (README open item 6).
- **FAQPage JSON-LD** is not emitted on Home because /faq already emits it for the same questions (duplicate FAQPage content was removed from Home earlier). The README says "wherever an accordion is shown"; say if you want it back.
- The closing CTA and footer are the step 1 components, unchanged.

## Owner decisions, 27 Oct 2026

- **Coral contrast: fix it to pass AA.** Brand coral #EF4A23 stays for fills, icons,
  focus rings and display type (3:1 is enough there). Small coral text uses
  `--gg-coral-text` #C2300E (≥ 4.70:1 on every light surface); the coral button
  uses `--gg-coral-fill` #D0340F (white label 5.02:1), hover #B82E0D. Focus
  rings inside the CTA card are white (coral drops to 1.2:1 on its mid tones).
- **Home CTA uses the live site's animated gradient**, i.e. the hero video
  `goodground-motion.mp4` (`components/gg/CtaVideo.tsx`), not Figma's static
  fill. Lazy (fetched within 400px), plays only on screen, tab visible and
  motion allowed; poster otherwise. 30→50% dark scrim; worst frame across the
  clip: sub-copy 7.6:1, headline 6.1:1.
- **Inner CTA padding: my call.** Kept 56px sides. The frame's one-line
  headline (1079 wide in a 1200 card) does not fit inside the README's 80px.
- **Footer touch targets: fix.** On `pointer: coarse` every footer link is
  ≥ 44×44 (rows, legal row padded 8px each side). Mouse keeps the drawn rhythm.
- **PRODUCT.md / DESIGN.md: update at the end** (task above).

Verified 27 Oct: /_styleguide Lighthouse Accessibility 100 (desktop and
mobile, was 96), Best Practices 100. SEO 69 is only `is-crawlable`, which is
the intended noindex on the styleguide.

## Waiting on the owner

- Review Home (step 2), then say go for step 3 (Services, Service detail, Industry).
- The open items in docs/redesign/README.md section 10.

## Steps 3 to 5 (27 Oct 2026, local commits, nothing pushed)
- Step 3: Services (327f37f), Service detail (64c703f), Industry (274fcd5).
- Step 4: Work listing + Case study (32c3781).
- Step 5: Pricing (configurator, shareable ?build= code, quote form with attached build) and Website launch (availability data, sold-out state, eligibility checker, form with plan tag). Lighthouse mobile: /website-launch 100/100/100/100; /pricing 96 a11y before two fixes (pill-toggle measuring, "Added" accessible name), re-run pending.
- Questions are collected in tasks/figma-redesign-questions.md.
- Step 6: Start project (4 steps, URL parameters, sessionStorage, no-JS form), Contact (routes, form, channels, quick answers), /thanks, 404, and the shared /api/enquiry route (validation, spam rules, auto-reply, redirect to /thanks). Lighthouse mobile: /contact 100 across; /start-project 100/96/100 (the 96 is the menu prefetching /process, which step 7 builds).
- Step 7: About and the new Process page. Lighthouse mobile: /process 100 across; /about 92 a11y before two fixes (dots target size, last step dot contrast), re-run pending.
- Step 8: Insights listing and the Article template (reading progress, TOC with scroll-spy and phone sheet, TL;DR range chart, rich blocks). Lighthouse mobile article 92 a11y before two fixes (share button name, range bar role), re-run pending.
- Step 9: FAQ (13 live answers, instant search with highlight, topic nav with scroll-spy, permanent anchors, copy link, helpful vote, FAQPage JSON-LD) and Legal (three-tab page, sticky contents with scroll-spy, company card, short version, provider table, rights + mailto, working cookie switch, footer Cookie settings link; Terms built but off). Shared lib/consent.ts now drives the banner and the switch. Lighthouse pending.
- Step 11 (QA + cleanup, in progress): removed 62 unreferenced old components (Footer, Nav, hometest2, launch, sections, most of home2026, motion-gsap, ...); build, tsc and eslint clean. Lighthouse mobile 27 Oct: /faq, /legal, /pricing, /about, article all 100 across; /insights a11y 96 until the growth cover word was moved to coral-text (re-run pending). Tablet 820: no horizontal overflow on faq, legal, onboarding, process, article. Still left for after the owner's answers: remove old ht-* tokens (still used by brand-guide, website-launch enquiry pages, launch-offer-intake-form, the Home hero), PRODUCT.md/DESIGN.md.
- Step 10: Client onboarding (/onboarding/[token], noindex): welcome, 12 steps from the full field inventory, review with completion ring and missing list, consents, sent screen, /api/onboarding. Local-first (browser storage) until open item 8 is decided. Lighthouse mobile: a11y 98 before adding <main>, SEO 66 = intended noindex.
