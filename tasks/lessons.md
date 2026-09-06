# GoodGround site — Lessons

Corrections and hard-won specifics, written as rules that prevent a repeat.
The workspace `SessionStart` hook (`.claude/hooks/load-lessons.mjs`) reads this
file at the start of every session, so anything recorded here actually gets
applied next time rather than re-learned.

| Date | What went wrong | Rule going forward |
|---|---|---|
| 2026-09-06 | `app/not-found.tsx` had no `metadata` export, so the 404 inherited the root layout's default title — a 404 showed "Website Development in South Africa \| GoodGround", identical to the homepage. | Any route that should not share the default title needs its own `metadata` export. Check the prerendered `.next/server/app/*.html` for duplicate `<title>` after adding routes. |
| 2026-09-06 | Fixing the above, I added `robots: { index: false }` to the 404 — which produced **two** competing `<meta name="robots">` tags, because Next already emits `noindex` for not-found. | Don't re-declare what the framework already does. Check the built output before and after adding a metadata field. |
| 2026-09-06 | A contrast sweep flagged white-on-orange (3.48:1) and white-on-pink (1.91:1) as failures. Both were false alarms: orange-with-white is only ever used for **icons** (3:1 bar, passes) and the pink case is a border-only button that flips to `text-ink` on hover. | Contrast-check the *rendered pairs*, not the token grid. A token combination failing in the abstract means nothing until something actually renders it. |
| 2026-09-06 | The craft floor bans eyebrow labels above headings, and this site has ~61. Nearly removed them. | The eyebrow here is a **committed brand identity**, not drift: dedicated `Eyebrow.tsx`, required `PageHero` prop, applied sitewide. A pinned visual direction overrides a general anti-pattern rule. Check whether a "violation" is systematised before treating it as a mistake. |
| earlier | `next dev` crashes on this machine. | Use `npm run build`, then read `.next/server/app/*.html` or `npm start`. Don't burn time debugging the dev server. |
