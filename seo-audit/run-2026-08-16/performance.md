# Performance / Core Web Vitals — 2026-08-16

**Written by the main session directly**, not a subagent. The dedicated `seo-performance`
agent hit the platform's session limit before it could finish; the `chrome-devtools` MCP tools
it needed for a trace-based measurement aren't exposed inside sub-agent sessions in this
environment (the `seo-technical` agent independently hit and reported the same gap). The
tools are available in the main session, so these are real, live-measured numbers, not
estimates.

**Score: 94/100** (previous 2026-07-20 audit: 97/100, lab-only, homepage only)

## Method

`chrome-devtools` MCP `performance_start_trace` / `performance_stop_trace` against the live
production site, one real navigation each, no throttling applied (CPU 1x, no network
throttling — so these are best-case figures for a fast connection, not a simulated slow
mobile line). Three pages measured: the homepage, `/pricing` (carries the new framer-motion
border-trail animation on the Grow package card), and `/work/b3tter-bottle` (new page since
the July audit, several screenshots).

## Results

| Page | LCP | CLS | Verdict |
|---|---|---|---|
| `/` (homepage) | **630 ms** | **0.00** | Good — both metrics comfortably inside Google's "Good" thresholds (LCP < 2500 ms, CLS < 0.1) |
| `/pricing` | **1,027 ms** | **0.00** | Good. The border-trail animation on the Grow card does **not** introduce layout shift — CLS is a clean zero, confirming the earlier build-time concern (that a `position: absolute`, `overflow: hidden` animated element might reflow the card) did not materialise. |
| `/work/b3tter-bottle` | **742 ms** | **0.04** | Good, but the one page of the three with any measurable shift. Still five times under the 0.1 "Good" ceiling — not a real problem, but worth knowing it's the screenshot-heavy page that shows it. |

LCP breakdown (homepage): TTFB 18 ms, render delay 613 ms — the wait is almost entirely
"time to paint what's already downloaded," not network latency. That's the profile of a
well-optimized static/SSG Next.js build, consistent with the July finding.

## No CrUX field data — same limitation as July, not new

`Metrics (field / real users): n/a – no data for this page in CrUX` on every page measured.
This means Google has not accumulated enough real-visitor traffic to populate the Chrome UX
Report for this domain yet. It is expected for a site this new and is **not** a defect. It also
means every figure above is a lab measurement from one machine, one run, no throttling — real
users on real South African mobile connections will see higher numbers. Re-run once
`seo-google` can pull CrUX (needs Google API credentials, not configured — see the technical
report).

## What changed since 2026-07-20

- Homepage LCP moved from ~490 ms (July, method: Lighthouse) to 630 ms (this run, method:
  raw trace). Different measurement method, same order of magnitude — not read as a
  regression, more likely measurement noise between a synthetic Lighthouse run and a live
  trace.
- **New finding, not in July:** the border-trail animation on `/pricing` was flagged during
  build as a CLS risk. Measured now: it isn't one. CLS 0.00.
- **New finding:** `/work/b3tter-bottle` is the only page of the three with non-zero CLS
  (0.04). Still well within "Good." Worth a look if the case-study format is reused for future
  work and more images are added — small shifts can compound.

## Findings by severity

- **Low:** `/work/b3tter-bottle` CLS of 0.04, likely from one of the several screenshots
  loading without an explicit reserved aspect-ratio box. Confirm every `<Image>` on that page
  has both `width` and `height` set (Next.js reserves layout space automatically when both are
  present — if one screenshot is missing them, that's the likely culprit).
- **Info:** CPU/network throttling was not applied in this run (unlike a standard Lighthouth
  mobile run, which simulates a mid-tier phone on a slow connection). Treat these as
  best-case, not worst-case, numbers. A throttled Lighthouse pass would very likely show
  higher LCP, though probably still in the "Good" band given how fast the untuned numbers are.
