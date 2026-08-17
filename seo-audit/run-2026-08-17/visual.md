# Visual / Mobile Rendering Audit — goodground.co.za
Run date: 2026-08-17
Scope: re-audit after the content-expansion pass (more copy on service/industry pages, new "honest placeholder" block, new local-anchor sentence, new second CTA on insight articles).

## Method
- Captured with Playwright/Chromium at 1440x900 (desktop) and 390x844 (mobile).
- For each page: an above-the-fold screenshot, a naive `full_page=True` screenshot, and a proper incremental scroll-capture (scroll + wait for ScrollTrigger reveals + screenshot per viewport-height step). The scroll-capture method is the one actually trusted for findings — `full_page=True` on this site renders scroll-triggered sections as flat solid-color blocks because GSAP ScrollTrigger content hasn't fired yet at capture time; that is a known screenshot-tooling artifact, not a site bug, and is excluded from findings below.
- Checked `document.documentElement.scrollWidth` vs `clientWidth` on every page/viewport combo to catch horizontal overflow programmatically.

Screenshots saved to:
`C:\Users\Johandre\Desktop\GoodGround\GroundOps-Work\website-and-ops\goodground-sites\site\seo-audit\run-2026-08-17\screenshots\`
(fold/full shots in the root of that folder, incremental scroll captures in `scroll\`)

## Pages tested
1. Homepage — `/`
2. Service page — `/services/seo` (recently expanded with a lot more copy)
3. Industry page — `/services/trades-and-home-services` (new "honest placeholder" block + local-anchor sentence)
4. Insight article — `/insights/biggest-website-mistakes-south-african-smes-make` (new second CTA next to "Start your project")

## Horizontal overflow check (all pages, both viewports)
No overflow anywhere. `scrollWidth == clientWidth` on every page at both 1440px and 390px. No horizontal scroll risk.

## Findings by page

### Homepage
- Desktop and mobile above-the-fold both look correct: H1 visible, "Let's chat" CTA visible, nav accessible (hamburger on mobile).
- No regressions, not part of the content-expansion pass — included as a control/baseline only.

### /services/seo (expanded copy)
- **Above the fold**: heading + new longer intro paragraph render fully within the hero, no clipping, no overflow, on both desktop and mobile. The paragraph is noticeably longer than a typical hero blurb but wraps cleanly at both widths.
- **"What's included" card**: bullet list holds up fine with more items; text wraps normally, no card overflow. On desktop, one screenshot caught a bullet mid-fade-in (a scroll-reveal animation frame, not a layout bug — the item is present, just at partial opacity, and settles to full opacity a moment later).
- **FAQ accordion**: 5 rows, headings wrap to two lines on mobile without breaking the row height or overlapping the "+" icon.
- **Related reading card + footer**: normal, no cramping.
- **Verdict: no visual defects from the copy expansion on this page.**

### /services/trades-and-home-services (new placeholder block + local-anchor sentence)
- **New local-anchor sentence** ("We build for tradespeople across South Africa, city electricians, coastal builders, rural contractors. Every site is built with local search in mind, so 'plumber in [your town]' has something real to find.") renders as a centered paragraph between the pain-point cards and the "What's included" section — reads cleanly at both breakpoints, no overflow, no orphaned words.
- **New "honest placeholder" block** ("We haven't published a live trades & home services project yet. Get in touch and we'll tell you honestly what we're currently working on.") — dashed-border card renders correctly on both desktop and mobile: text wraps to 2–3 lines, the inline link is underlined and doesn't break out of the box, comfortable padding on both sides.
- **Service cards with badges** ("Flagship" / "Growth" pill tags next to card titles): badges stay inline with the title on mobile, no wrapping onto their own line, no overlap with the title text.
- **Verdict: no visual defects from the new copy blocks.**

### /insights/biggest-website-mistakes-south-african-smes-make (new second CTA)
- **New CTA pairing**: the closing CTA card now shows a primary button ("START YOUR PROJECT →") plus a secondary text link ("Not ready yet? See how pricing works").
  - Desktop: both render side by side inside the orange CTA card with clear visual hierarchy (filled button vs. underlined link) and no crowding.
  - Mobile: they stack vertically with clean spacing between them — button first, link below at a comfortable tap distance, both individually large enough to tap without mis-hits.
- Long-form body copy (numbered list sections, bulleted "short version" recap) reads well at both widths with no overflow.
- **Verdict: no visual defects from the new CTA.**

## Cross-page note (not related to the content expansion, informational only)
The cookie-consent banner is a fixed-position bar pinned near the bottom of the viewport on every page/viewport tested. It overlaps the lower portion of whatever section is in view until dismissed (Accept/Decline). This is pre-existing site behavior, unrelated to this round of copy changes, and not a defect — flagging only because it appears in nearly every screenshot and could be mistaken for a layout bug at a glance.

## Overall conclusion
No text overflow, no cramped mobile layout, no broken card/grid layout was found on any of the four pages tested, across desktop (1440x900) and mobile (390x844). The new copy (longer service-page intro, local-anchor sentence, honest-placeholder block, second CTA on insight articles) all reheat and reflow correctly within the existing design system components. This round of content changes is visually clean and does not require follow-up fixes.
