# GoodGround site — todo

## 2026-09-23 — UX critique, the four P1 fixes

Source: `/impeccable critique` of the live site, 27/40. Snapshot in
`.impeccable/critique/2026-09-23T09-05-16Z__www-goodground-co-za.md`. Pass-1
screenshots are in the workspace `.screenshots/goodground-ux-review/`.

Facts confirmed by Johandre on 2026-09-23:
- Launch Offer: a ONE-page site, no deposit, R845/mo for 12 months (R10 140
  total). After that the site is theirs: move to the care plan, or the domain is
  transferred.
- Full Service: keep "No minimum term, cancel any time" for now. His intended
  12-month settlement term waits on the attorney (CPA s14).
- Leave the homepage stats and the About photo alone.

### 1. Pricing clarity
- [x] "Ways to pay" comparison on /pricing: deposit, 12 instalments, Full
      Service, Launch Offer. Columns: upfront, monthly, how long, total over 12
      months, what's included, what happens at the end. A real `<table>` on
      desktop, stacked on mobile.
- [x] Shorten the pricing hero intro and point it at the comparison.
- [x] Pricing FAQs: "Full Service or instalments?", "Do I own the website?"
      (only what's published: a paid-off build is theirs outright).
- [x] "Package 1 / Package 2" → Micro / Launch in the footnote.
- [x] "Most popular" → a claim the studio can back up.
- [x] Em dashes out of the pricing copy (hero intro, form summary lines).
- [x] Cost article: "hosting sits outside the build price everywhere,
      GoodGround included" contradicts Full Service and the Launch Offer.

### 2. Launch Offer is one page, not five
- [x] `content/websiteLaunch.ts`: pageCount, hero body, facts strip,
      inclusions, summary, route description, FAQ on extra pages. Update the
      header comment: no deposit and the R10 140 total are confirmed now.
- [x] `content/launchIntake.ts`: the "Your pages" step (up to five) becomes
      the sections of one page.
- [x] Launch Offer READMEs (website-launch, launch-offer-intake-form).
- [x] Flag for Johandre: the workspace docs and the Cowork knowledge base,
      if they say five pages. (Neither does. The knowledge base doesn't
      mention the Launch Offer at all, which is flagged instead.)

### 3. Trust
- [x] Homepage Work grid: a kind label on every card, from `caseStudyKindLabel`.

### 4. Configurator
- [x] The whole row is the toggle, 44px or taller, named "<item>, <price>".
- [x] Quantity steppers with 44px hit areas.
- [x] The live configuration is always attached to the quote form, and the
      form says so. A package pick still wins while it is the latest choice.
- [x] Accordion icon: a chevron, not a rotating "+" beside "N added".
- [x] Form: a focus state distinct from the error state.
- [x] Register ScrollTrigger (RevealSection, SplitWords). Nothing mounts
      LenisProvider, so /pricing logs 9 "Missing plugin" warnings.

### 5. Hero contrast
- [x] Inner-page hero overlay: measured at 8.7:1 (mobile) and 9.0:1 (desktop)
      on the worst frame of the clip. The detector's 2.8:1 was a false positive,
      so the overlay is unchanged.
- [x] Homepage hero: the side paragraph passed. The 13px kicker failed at
      3.5:1 (mobile) and 3.66:1 (desktop). Overlay raised from .08/.16/.48 to
      .30/.30/.52, and the kicker now measures 4.92:1 on desktop.

### Verify
- [x] `npm run build` clean, and eslint on the touched files.
- [x] Pass-2 screenshots at 1440 / 820 / 390: home, pricing, website-launch.
- [x] No console warnings on /pricing. Form focus and validation checked.
      The configurator controls are all native buttons.
- [ ] A full keyboard tab-through of /pricing. Not done this session.
- [x] Humanizer on the new copy. No em dashes.
- [x] Commit (no co-author trailer: `.claude/settings.json`).
- [ ] Push. Waiting on Johandre's approval, because a push to `main` deploys.

### Review (2026-09-23)

- Checked in a production build (`next start`, port 3107) at 390, 820 and
  1440. Pass-2 shots are in `.screenshots/goodground-ux-review/pass-2-*`.
  There is no horizontal overflow at any width.
- Configurator: rows measure 326x73 and their accessible name includes the
  item. The steppers are 44x44. The quote form picks up the configuration
  without anyone tapping "Get This Quote". Whatever the visitor touched last
  wins, so a package picked after the last menu edit is never cleared.
- /pricing console: no warnings (there were 9). Scroll reveals fire on
  scroll, and nothing stays hidden once it has been scrolled past.
- Form: focus shows the global ring plus a darker border, and errors use a
  crimson border. A submit with empty fields focuses the first bad field and
  sends nothing.
- Left alone, and why: the eyebrows (a deliberate brand element, see
  AGENTS.md); the homepage stats and the About photo (Johandre's call); the
  `set-state-in-effect` lint error in PricingEnquiryForm, which was already
  there before this work.
- Open, for Johandre:
  - Full Service's term and what happens to the site on cancellation both
    wait on the attorney.
  - "1 slot left for September" goes stale on 1 October.
  - The Cowork knowledge base has no Launch Offer section.
  - Two products are still called "Launch" (the package and the Launch
    Offer).
