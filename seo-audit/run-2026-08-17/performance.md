# Performance / Core Web Vitals — 2026-08-17 (re-audit)

## Method — read this before the numbers

**No Google API / CrUX credentials are configured on this machine.** Everything below is
**lab data**, not field data. Field data (CrUX) is the 28-day real-user average Google
actually uses for ranking/Core Web Vitals pass-fail; it was unavailable in the 2026-08-16
baseline too (site doesn't have enough Chrome traffic yet to populate CrUX), so this
re-audit has the same blind spot, not a new one.

Tool: **Lighthouse 13.4.1 CLI**, headless Chrome, **mobile form factor, simulated
throttling** (Lighthouse's standard "Slow 4G"-equivalent profile: 150ms RTT, ~1.6Mbps
throughput, **4x CPU slowdown**). This is a deliberate change from the 2026-08-16 baseline,
which used the `chrome-devtools` MCP raw-trace method with **no throttling at all** (1x CPU,
no network throttling). The two methods are not directly comparable — see "Why this run's
numbers look worse than 2026-08-16" below.

INP has no lab equivalent — it can only be measured from real user interactions (field
data), which this machine cannot pull. **Total Blocking Time (TBT)** is used as the lab
proxy Lighthouse recommends for interactivity risk; it correlates with INP but is not INP
itself. Treat every "INP" row below as "TBT-based estimate," not a real INP score.

Pages tested (7, up from 3 in the baseline):

| Page | Type |
|---|---|
| `/` | Homepage |
| `/pricing` | Pricing |
| `/services` | Services hub |
| `/services/seo` | Service page (content roughly doubled since baseline) |
| `/services/trades-and-home-services` | Industry page (content roughly doubled since baseline) |
| `/work/b3tter-bottle` | Case study (same page tested in baseline) |
| `/insights/how-much-does-a-website-cost-in-south-africa` | Article (gained one outbound-link sentence since baseline) |

## Results

| Page | Perf score | LCP | CLS | TBT (INP proxy) | FCP | Speed Index | Verdict |
|---|---|---|---|---|---|---|---|
| `/` (homepage) | 57/100 | **3,013 ms** | **0.156** | **2,290 ms** | 1,871 ms | 3,651 ms | **Fails LCP band-edge (Needs Improvement, just inside), fails CLS (Needs Improvement), TBT very high** |
| `/pricing` | 70/100 | **2,995 ms** | 0.000 | 942 ms | 2,375 ms | 3,067 ms | LCP Needs Improvement, CLS Good, TBT elevated |
| `/services` | 75/100 | **2,436 ms** | 0.000 | 1,021 ms | 1,157 ms | 2,076 ms | LCP Good (just under 2.5s), CLS Good, TBT elevated |
| `/services/seo` | 75/100 | **2,869 ms** | 0.000 | 870 ms | 937 ms | 1,765 ms | LCP Needs Improvement, CLS Good |
| `/services/trades-and-home-services` | 80/100 | **2,972 ms** | 0.000 | 458 ms | 1,485 ms | 4,481 ms | LCP Needs Improvement, CLS Good, Speed Index worst of the set |
| `/work/b3tter-bottle` | 85/100 | **2,567 ms** | 0.000 | 480 ms | 920 ms | 1,769 ms | LCP Needs Improvement (barely, +67ms over threshold), CLS Good |
| `/insights/how-much-does-a-website-cost-in-south-africa` | 87/100 | **2,715 ms** | 0.000 | 375 ms | 1,088 ms | 1,822 ms | LCP Needs Improvement, CLS Good |

Thresholds for reference: LCP Good ≤2,500ms / Needs Improvement 2,500–4,000ms / Poor
>4,000ms. CLS Good ≤0.1 / Needs Improvement 0.1–0.25 / Poor >0.25.

### Pages that fail a "Good" threshold

- **Every page's LCP lands in the "Needs Improvement" band** (2.4–3.0s) except `/services`,
  which is just under the 2.5s Good line. None are in the "Poor" band (>4s).
- **Homepage CLS is 0.156** — "Needs Improvement" band, the only page with any measurable
  shift. All six other pages measured a clean 0.000.
- No page hit "Poor" on any metric under this throttled profile.

## Why this run's numbers look worse than 2026-08-16

The baseline's headline numbers (homepage LCP 630ms, CLS 0.00) were measured with **no
throttling** — 1x CPU, full network speed, one real trace. This run uses Lighthouse's
standard mobile-simulated profile with a **4x CPU slowdown** and throttled network, which is
the closer analogue to what Google's PageSpeed Insights and most real-world mobile users on
South African connections would see. The jump from 630ms → 3,013ms LCP and 0.00 → 0.156 CLS
on the homepage is **method, not regression** — this is what the CPU throttle unmasks, not
new breakage since yesterday. Treat this run as a more realistic (if still lab-only) figure,
and the baseline as a best-case ceiling. A true before/after comparison would require running
both methods on both dates; that wasn't done, so don't read the delta as "performance got 5x
worse overnight."

## Did the new copy (doubled word count on 6 service + 6 industry pages, +1 sentence on 6
articles) measurably affect LCP/CLS/INP?

**No evidence of it in this data**, with one caveat below.

- **CLS: no effect.** `/services/seo` (content roughly doubled) and
  `/services/trades-and-home-services` (content roughly doubled) both measured **CLS
  0.000**, identical to every other content-normal page tested except the homepage. Adding
  paragraphs below the fold doesn't reflow already-painted content if the page isn't
  injecting that copy asynchronously or without reserved space — and it isn't here.
- **LCP: no effect expected, and none seen.** LCP is determined by the largest above-the-fold
  paint target (typically a hero heading or image), not by how much text exists further down
  the page. `/services/seo` and `/services/trades-and-home-services` LCP (2,869ms /
  2,972ms) sit in the same band as `/pricing` (2,995ms) and `/work/b3tter-bottle`
  (2,567ms) — pages with no content changes. The doubled copy did not push these pages into a
  worse LCP band than their unchanged siblings.
- **Article outbound-link sentence: no effect.** The tested article
  (`/insights/how-much-does-a-website-cost-in-south-africa`) has the **best performance score
  of all seven pages tested (87/100)** and the lowest TBT (375ms). One added sentence with an
  outbound link is not a measurable performance event.
- **Caveat — no true baseline exists for these specific page types.** The 2026-08-16 report
  only measured the homepage, `/pricing`, and `/work/b3tter-bottle`. It never captured
  `/services/seo`, `/services/trades-and-home-services`, or any article page, so there is no
  same-method "before" number for the pages that actually received the content growth. The
  comparison above is inference from cross-page consistency (doubled-copy pages perform in
  line with unchanged pages under identical method), not a direct before/after delta. If a
  hard before/after is needed, it would require re-running Lighthouse against the pre-growth
  content (e.g., via git history / a preview deploy of the old copy) — not done here.

## Root causes and diagnostics

### Homepage CLS 0.156 (the one real "Needs Improvement" finding)

Lighthouse's `layout-shifts` audit points to a single shift, scoring the full 0.156, on:

```
body.flex > main#main > section.relative > div.relative
```
— the hero copy block (`"We're a website development studio based in South Africa,
building AI-accelerated..."`). This is consistent with either late web-font swap (FOUT/FOIT)
or a heavy above-the-fold script (see below) delaying paint of already-laid-out text, causing
a visible reflow once it finally renders. This did not show up in the baseline's unthrottled
trace because at 1x CPU/full network speed the same script executes fast enough that the
shift is imperceptible — the throttled run exposes a real latent risk that a slower real
phone will also hit.

### High Total Blocking Time across the board, worst on the homepage (2,290ms)

`bootup-time` and `mainthread-work-breakdown` on the homepage show:

- **Style & Layout: 2,969ms, Script Evaluation: 2,746ms** of main-thread work — both very
  high for a marketing page.
- A single JS chunk, `_next/static/chunks/1e0ce9svltkes.js`, accounts for **2,152ms** of
  bootup time (1,475ms of that is pure script execution). This is almost certainly the
  framer-motion / animation bundle (the site's design system leans on scroll/hero
  animations per project conventions).
- No third-party scripts appear in `third-party-summary` — this is **first-party JS**, not
  ad tech or embeds. That's good news: it's fully within the team's control to fix.
- TBT decreases page-by-page roughly in proportion to how animation-heavy the page is:
  homepage (2,290ms, heaviest hero animation) > `/services` (1,021ms) > `/pricing` (942ms)
  > `/services/seo` (870ms) > `/work/b3tter-bottle` (480ms) > `/services/trades-and-home-services`
  (458ms) > the article (375ms, least animated page type). This pattern points at
  animation/interaction JS as the shared cost driver, not content volume — the two
  content-doubled pages (`/services/seo`, `/services/trades-and-home-services`) are mid-pack
  or best-in-class on TBT, not worst.

### LCP sitting just inside "Needs Improvement" almost everywhere

FCP is fast on most pages (920ms–1,485ms outside the homepage/pricing), meaning first paint
isn't the bottleneck — the gap between FCP and LCP (render delay) is where the time goes.
Combined with the heavy script evaluation above, the likely mechanism is: hero content is
visually ready shortly after FCP, but the LCP element itself (heading/image, often
animated-in via framer-motion) doesn't register as "painted" until the animation script has
parsed, compiled, and run. This is a common framer-motion-on-hero pattern: content that fades
or slides in on load delays its own LCP timestamp.

## Prioritized recommendations

1. **[High impact] Reduce or defer the homepage hero animation script.** The 2,152ms bootup
   cost on `1e0ce9svltkes.js` and its correlation with the homepage's uniquely bad TBT (2,290ms)
   and CLS (0.156) make it the single highest-leverage fix. Options: code-split so the hero's
   critical text renders and is LCP-eligible before the animation library loads; use CSS-only
   entrance animation for the hero heading instead of a JS-driven one; or lazy-load
   framer-motion behind `requestIdleCallback` for below-the-fold sections only.
2. **[High impact] Fix homepage CLS at the source.** Reserve the hero text block's box before
   web fonts finish swapping — use `font-display: optional` or preload the exact font weights
   used in the hero, and/or set an explicit `min-height` on the hero copy container sized for
   the fallback font metrics. This should take CLS from 0.156 back to ~0.00, matching every
   other page.
3. **[Medium impact] Trim main-thread script evaluation site-wide.** TBT is elevated (>800ms)
   on 5 of 7 pages under simulated mobile CPU throttling. Audit the shared JS bundle for
   unused code (Lighthouse's `unused-javascript` flagged savings on the homepage) and confirm
   route-level code splitting is actually isolating per-page animation code rather than
   shipping the full framer-motion bundle on every route.
4. **[Low impact, informational] LCP is consistently 2.4–3.0s, never in the "Poor" band.**
   Once items 1–3 land, re-test — the animation-driven render delay is the most likely lever
   to pull LCP back under the 2.5s Good line across the board, not image optimization (no
   oversized/unoptimized hero images were flagged in this pass).
5. **[Confirm before next audit] Get CrUX field data flowing.** Both this run and the baseline
   are lab-only. Once Google API credentials are configured (see the technical.md gap noted
   in the 2026-08-16 report), re-run with `scripts/crux_history.py` to see whether real South
   African mobile users are experiencing the throttled-lab numbers above or something closer
   to the baseline's best-case trace.

## Score summary

| Page | 2026-08-17 Performance score (mobile, simulated throttle) |
|---|---|
| `/` | 57/100 |
| `/pricing` | 70/100 |
| `/services` | 75/100 |
| `/services/seo` | 75/100 |
| `/services/trades-and-home-services` | 80/100 |
| `/work/b3tter-bottle` | 85/100 |
| `/insights/how-much-does-a-website-cost-in-south-africa` | 87/100 |

Not directly comparable to the baseline's 94/100 (different method/throttling, see above).
Read these as this run's own internal ranking: the homepage is clearly the weakest page and
the one that needs the fixes above before the next audit.
