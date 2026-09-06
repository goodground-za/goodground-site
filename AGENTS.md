<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# GoodGround site — project rules

## This is the live site

`goodground.co.za`. **Pushing to `main` deploys to production.** There is no
staging step. Never push without explicit approval, and never assume approval to
commit extends to approval to push.

Its own git repo (`goodground-za/goodground-site`), separate from the surrounding
GroundOps workspace repo.

## Where this sits in the process

The workspace `Website Build System/` governs *client* builds. This is
GoodGround's own marketing site, so the SOP's client phases (discovery, client
approvals, handoff) don't apply — but two things from it do:

- **The craft floor** in `Website Master Prompt/00-goodground-component-library/COMPONENT-LIBRARY-MASTER-PROMPT.md` — banned patterns, WCAG AA contrast on every rendered pair.
- **Verify before claiming done.** Run `npm run build` and check the prerendered output in `.next/server/app/*.html`, don't assert from reading source.

The static-HTML build gate (`Website Build System/build-gate/check-build.mjs`)
**does not work on this site** — it parses `.html` files. Audit the prerendered
output in `.next/server/app/` instead.

## Build and run

```bash
npm run build     # use this
```

**`next dev` crashes on this machine.** Use `npm run build` and read the
prerendered HTML, or `npm start` after a build.

## Design decisions that are deliberate — do not "fix" them

- **The eyebrow label above headings is intentional.** There is a dedicated
  `components/Eyebrow.tsx`, and `eyebrow` is a *required* prop on `PageHero`.
  It's part of the promoted home-test design language, applied across ~20 OG
  images and every page hero. The general craft floor bans eyebrows as a lazy
  default; a committed brand identity overrides that, and this is one. Leave it.

- **White on `--color-ht-orange` (3.48:1) is used for icons only**, never body
  text — that clears the 3:1 non-text bar. Text on orange uses `text-ink`
  (5.87:1). Don't "fix" the icon usage, and don't introduce white *text* on
  orange.

- **`app/not-found.tsx` must keep its own `metadata` export.** Without it the
  404 inherits the root layout's default title and shows the homepage title in
  the browser tab. It must NOT set a `robots` field — Next already emits
  `noindex` for not-found, and setting it again produces two competing tags.
