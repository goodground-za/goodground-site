# Figma redesign (Oct 2026) — build tracker

Spec: `docs/redesign/README.md` + `docs/redesign/pages/*.md`. Figma file
`PI4P3fF9RVIAiTI7ZMxohj`. Goal: 1:1 with the 1440 and 390 frames.

**Nothing is pushed until the whole site is signed off** (owner, 26 Oct 2026).
Work on `main`, local commits only. Review each step before the next.

## Build order

- [x] 1. Foundations + `/_styleguide` (built 26 Oct 2026, awaiting review)
- [ ] 2. Home (hero untouched)
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

- Commit step 1 locally? Start step 2 (Home)?
- The open items in docs/redesign/README.md section 10.
