# GoodGround Website — Context Handoff

## 1. Task / Goal
Build, launch, and iteratively refine the marketing website for **GoodGround**, a Cape Town web development studio (operating under **The Trail Tribe**, founded 2026). Site is live in production at goodground.co.za. Work has moved from initial build → re-skin → launch → post-launch polish/premium-perception fixes → real asset integration → new homepage content sections. This is ongoing maintenance/iteration work, not a one-shot build.

## 2. Key Decisions (and why)

- **No CMS.** Content lives in typed files under `/content`. Hard client requirement, overrides the original dev brief's headless-CMS recommendation.
- **Design system v4 (final).** Palette sampled directly via pixel-sampling from the client's own `Palette.png` (not eyeballed): bark `#331816`, pine `#1c261d`, ember `#ac4119`, peach `#fde5c1`, cream `#f1e8d7`, surface `#fdfbf6`, stone `#4f5450`, ink `#010602`. Montserrat only, Bold 700 on all headings per explicit client instruction. This replaced two earlier discarded directions (including a green/cream system) after the client sent a real comp.
- **No fabricated content, anywhere.** GoodGround has zero real clients (founded 2026). `testimonials.ts`, `caseStudies.ts`, `stats.ts` are intentionally empty. FAQ entries with `answer: null` render an honest "still working this one out" state instead of an invented answer. Pricing page was removed entirely (was gated behind `PLACEHOLDER_PRICING = true` before removal). This rule overrode Grow Brand's own homepage content when adapting sections (see below).
- **Founder stays unnamed.** At the founder's explicit request, the About page describes him by experience only ("a web developer with more than 10 years' experience across UX and UI design, website design and graphic design") — no name anywhere on the site.
- **Pricing model:** one fixed price per project, split into **12 equal monthly payments** — the single core differentiator, called out sitewide.
- **Forms → Web3Forms**, single shared helper `lib/enquiry.ts` (`sendEnquiry()`), hardcoded public access key `beae6de4-74ed-4868-a4eb-e479e0f43e6c`, delivering to **hello@goodground.co.za**. Do NOT reuse Grow Brand's Web3Forms key (different inbox, info@growbrandagency.com). Verified live with a real successful submission.
- **SEO positioning locked by founder:** development-first wording ("Website Development & Design Studio", kept "studio" not "agency" to match client's own comp), South-Africa-first geography (Cape Town is the local-pack anchor only). Primary keyword: "website development South Africa" / "website design South Africa".
- **Vercel deploy-block root cause (corrected finding — see Errors below):** NOT the AI co-author git trailer (that was my first, wrong diagnosis). Actual cause: GitHub account `jsaayman94-design` (the pushing identity) was not listed as an explicit collaborator on the private repo, which is what Vercel Hobby's private-repo collaboration check keyed off. **Fixed by making the GitHub repo public** (user's explicit choice from 3 options offered), since that restriction only applies to private repos. Full git history was checked for secrets first — none found, the only credential-shaped string is the intentionally-public Web3Forms key.
- **Homepage additions (2026-07-20), adapted from Grow Brand's own site — GoodGround's own layout/voice, not Grow Brand's:**
  - "What We Build" **replaces** (not adds to) the old bento-grid Services section — reuses existing `content/services.ts` as an accordion so Home and /services never contradict each other. Old `Services.tsx` + `ServiceIcon.tsx` deleted as orphaned.
  - "Industries" is new — 6 category cards, no client names (Grow Brand's version names real past clients; GoodGround has none, so this stays category-level per the no-fabrication rule).
  - Process section got only a copy reframe (eyebrow + lead paragraph) adopted from Grow Brand's framing — did NOT duplicate a second "how we work" section since the existing 5-step carousel already covers that ground. Kept GoodGround's own H2 ("From first seed to lasting harvest.") rather than overwriting with Grow Brand's generic one.

## 3. Current State

**Done / Live:**
- Full site built and live: https://goodground.co.za and https://www.goodground.co.za (Vercel, SSL issued, both resolving 200).
- Pages: Home, Services, About, Contact, Work (coming soon), Insights (+1 published article, ~1620 words, "why-small-businesses-in-south-africa-need-a-website", targets "website design in South Africa"), Start-project (multi-step form), Legal pages, 404. No `/pricing` (removed).
- Every page: Lighthouse mobile 100/100/100/100 (Accessibility, Best Practices, SEO, Agentic Browsing) at last check.
- Horizontal-overflow bug fixed (AuroraGlow `overflow:hidden` + `filter:blur` Chrome clipping bug) — verified gone, `overflow-x: clip` on `<html>` added as a global backstop.
- Real client logos integrated (5 files, `content/logos.ts`, `components/Logo.tsx` — `NavLogo`/`FooterLogo`/`HeroLogo`), replacing the earlier interim custom SVG mark. Favicon updated to Next 16 convention (`app/icon.png` + `app/apple-icon.png`).
- Premium-perception pass done: nav logo and About page photo-repetition issues fixed; palette/photography direction explicitly flagged to founder as a client-brand decision, not overridden.
- GitHub repo made public (fixes Vercel Hobby deploy block).
- **Just shipped and pushed (commit `bc0f0dd`, verified landed on `origin/main` via `git ls-remote`):** three new/adapted homepage sections — `WhatWeBuild.tsx`, `Industries.tsx` + `content/industries.ts` + `IndustryIcon.tsx`, and the `Process.tsx` copy reframe. `tsc --noEmit` clean, full `next build` passing all 14 routes, Lighthouse mobile still 100/100/100/100, no horizontal overflow on mobile (verified via live browser check). `GoodGround_memory.md` updated with full reasoning under a new "Three new Home sections, adapted from Grow Brand (2026-07-20)" section.
- Home section order is now: Hero → Marquee → Philosophy → **WhatWeBuild** → **Industries** → PaymentPlan → Process → WhyUs → Testimonials → AboutPreview → FAQ → CTABanner.

**In progress / needs confirmation:**
- Whether Vercel's deploy of commit `bc0f0dd` (and the earlier public-repo fix) actually succeeded — user needs to check the Vercel dashboard directly; not yet confirmed from this side since the last check.
- DNS: Afrihost root A record → Vercel (`216.198.79.1`), `www` CNAME → Vercel — set up, but as of 2026-07-18 only 1 of Afrihost's 4 nameservers (`ns.dns1.co.za`, `ns.dns2.co.za`, `ns.otherdns.com`, `ns.otherdns.net`) had picked up the change. User said "we will return to this later" — not yet re-verified.

**Open punch list (from TodoWrite, live tracker — 11 pending, 1 completed):**
1. Verify domain in Google Search Console, submit sitemap.xml
2. Wire up Google Analytics (GA4) site-wide — **needs a measurement ID from Johandre**
3. Set up Google Business Profile with matching NAP — Johandre to create
4. ~~Swap placeholder 'GG' logo for real GoodGround brand mark~~ — DONE
5. Replace placeholder Unsplash photography with real GoodGround images (only 5 real client images exist total — this is a real content bottleneck, not fixable in code)
6. Add real phone number and Facebook/Instagram URLs to footer (currently `phone: null`, `socials: []` in `content/site.ts` — unconfirmed, don't invent)
7. Write real FAQ answers: cancellation policy, project timeline, service area outside Cape Town (currently `answer: null`, rendering honest placeholder state)
8. Run full pre-launch SEO audit — **explicitly deferred by Johandre, do not run unprompted**
9. Resolve payment gateway + National Credit Act (NCA) legal review before any live billing
10. Write additional blog articles for /insights
11. Add real case studies to /work once first projects complete
12. Verify all 4 Afrihost nameservers have synced (re-check DNS propagation)

## 4. Files, Links, Names, Numbers on File

- **Project root:** `c:\Volumes\growbrand\growbrand-hub\GROW - CLAUDE\PROJECTS\GROW BRAND\GROW-PROSPECT\clients\goodground\site`
- **Master reference doc (read first):** `GoodGround_memory.md` in the site repo root — has full design system, content model, component reference, a numbered list of 13 "traps already hit — don't repeat", business details, and dated audit sections. **Keep this updated as work continues.**
- **Source briefs (outside the repo):** `PROJECTS/GROW BRAND/GROW-PROSPECT/clients/goodground/brief/` — `GoodGround-Development-Brief.md`, `GoodGround-Website-Copy.md`, `reference/` (client's palette/comp artwork).
- **GitHub:** https://github.com/goodground-za/goodground-site.git, `main` branch, now **public** (was private — this was the deploy-block root cause). Pushing GitHub identity: `jsaayman94-design`.
- **Live domains:** https://goodground.co.za, https://www.goodground.co.za
- **Hosting:** Vercel (Hobby plan)
- **DNS registrar:** Afrihost. Root A → `216.198.79.1` (Vercel). `www` CNAME → `8f461b901d171a7f.vercel-dns-017.com`. Old conflicting A record (`197.242.159.147`) was found and deleted.
- **Contact inbox:** hello@goodground.co.za (real, sourced from client's own footer artwork) — all form submissions go here.
- **Web3Forms access key (GoodGround-specific, hardcoded fallback in `lib/enquiry.ts`):** `beae6de4-74ed-4868-a4eb-e479e0f43e6c`
- **Business details on file:** GoodGround | Brackenfell, Cape Town, Western Cape, South Africa | Founded 2026 | trades under The Trail Tribe (no separate company reg. number for "GoodGround" itself).
- **Design tokens:** see decision #2 above; full table also in `GoodGround_memory.md`.
- **Key components:** `components/PageHero.tsx` (standard inner-page hero layout), `components/Block.tsx` (rounded-block layout unit), `components/AuroraGlow.tsx` (ambient glow — has 2 documented Chrome bugs, see memory file traps #4–5), `components/motion/KineticText.tsx` (phrase-reveal headings, colour not opacity), `lib/enquiry.ts` (shared form submit path).
- **`.claude/settings.json`** (site repo root): `{"includeCoAuthoredBy": false}` — stops AI co-author git trailers.
- **Known technical gotcha:** non-interactive `git push` from this environment cannot complete GitHub's browser/device OAuth flow in a foreground call — it hangs and times out (exit 143). Fix: retry with `run_in_background: true`. Has happened at least 3 times in this project; expect it again.
- **Next.js 16 note:** this is NOT the Next.js in most training data — breaking API/convention changes. `AGENTS.md` in the repo root flags this; check `node_modules/next/dist/docs/` before writing code that touches routing, params, or scroll behavior.

## 5. Exact Next Steps

1. Ask Johandre to check the Vercel dashboard and confirm the latest deploy (commit `bc0f0dd`, the three-new-homepage-sections push) succeeded now that the repo is public — this was asked and not yet answered before this handoff.
2. If Vercel is clean, move to the open punch list — highest-leverage items with no blocker are #7 (FAQ answers — just needs Johandre's input) and #9/#10/#11 (content-driven, no external dependency).
3. Items blocked on Johandre providing something: #2 (GA4 measurement ID), #3 (Google Business Profile), #5 (real photography), #6 (phone/socials), #12 (re-check DNS nameserver sync — he said "return to this later").
4. Do NOT run a full SEO audit (#8) unless explicitly asked — deferred by Johandre.
5. Before any risky git operation (push/reset/force), remember: non-interactive push may hang — use `run_in_background: true` on retry rather than assuming failure.
6. Keep `GoodGround_memory.md` updated after any further change — it's the authoritative project doc other sessions rely on.

## 6. Handoff file location
This file is saved at:
`c:\Volumes\growbrand\growbrand-hub\GROW - CLAUDE\PROJECTS\GROW BRAND\GROW-PROSPECT\clients\goodground\site\goodground-handoff.md`
