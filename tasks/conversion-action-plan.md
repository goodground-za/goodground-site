# GoodGround site — conversion action plan

Created 2026-07-26 from a full live-site audit (home, services, work, about, contact,
start-project, footer; desktop + mobile). Goal: make the site convert and drive
contact. GoodGround is a website-development agency first, with other services too.

**Status: parked for later, by the founder's request.** Nothing here is started yet.
When picked up, do Tier 1 first (highest impact on contact rate).

Verdict from the audit: the craft is strong (distinctive brand, human copy, clean
forms, 100/100 Lighthouse, a real "12 monthly payments" differentiator). This is NOT
a redesign. The gaps that suppress contact are about proof and friction, not design:
a visitor likes the look, then finds no work, no proof anyone hired them, and no fast
way to reach a human.

---

## Tier 1 — conversion-critical

- [ ] **Fill the empty `/work` page with real case studies.** It's in the primary nav
      and currently says "Case studies, coming soon" — the biggest credibility drain on
      the site for a dev-first agency. Write 2–3 "build stories" from work that already
      exists: **this website itself** and **Ground Ops** (the internal tool). Real
      problem/approach/outcome + real screenshots. Buildable now, no founder input.
      **Do this one first.**
- [ ] **Surface founder credibility as a trust signal.** "Led by a developer with 10+
      years across UX, UI, web and graphic design" is real proof currently buried in
      About body text. Surface it on home + services. Stays unnamed, per the founder's
      standing preference (see GoodGround_memory.md). Buildable now.
- [ ] **[BLOCKED ON FOUNDER] Add WhatsApp / phone contact.** The site has only email +
      a form, yet the studio's own blog article preaches "a phone number you can tap, a
      WhatsApp link." For a SA SMB audience, WhatsApp is *the* business channel — its
      absence is the highest-friction gap and likely the single best-ROI add. Needs a
      number from the founder, then add a `wa.me` click-to-chat (footer + contact page +
      floating button). `content/site.ts` `phone` is currently `null`; `Footer.tsx`
      already has a `tel:` block gated on it.
- [ ] **[BLOCKED ON FOUNDER] Add one or two real testimonials.** No social proof exists
      anywhere (genuinely blocked — founded 2026). Source from any prior relationship
      (Trail Tribe, Grow Brand, a beta client). `content/testimonials.ts` is empty and
      the `Testimonials` section auto-renders once populated — do NOT fabricate entries.

## Tier 2 — friction & clarity

- [ ] **Fix the desktop hero fold.** On desktop (1440×900) the giant "goodground"
      wordmark + subtitle fills the entire first screen; the pitch and both CTAs are
      below the fold. (Mobile is fine.) Tighten the desktop hero so a one-line value prop
      and the "Start your project" CTA clear the fold — reduce wordmark scale at `lg`+
      and/or lift the orange pitch band higher. Leave mobile as-is. `components/sections/Hero.tsx`.
- [ ] **Fix the "View our work" secondary hero CTA** pointing at the empty Work page.
      Resolves itself once Tier 1 #1 lands; if case studies slip, temporarily repoint to
      `/services`.
- [ ] **[BLOCKED ON FOUNDER — legal/NCA call] Show an indicative cost signal.** The whole
      pitch is "12 equal monthly payments, no big upfront" but there's no number anywhere,
      so a visitor can't answer "can I afford this?" Placeholder tiers exist (~R2.5k/R5k/
      R10k per month) but are fully gated behind `PLACEHOLDER_PRICING` in `content/pricing.ts`.
      Even a "from R2,500/month" would cut wasted enquiries. Founder's decision (National
      Credit Act), not an automatic change.

## Tier 3 — polish

- [ ] **Harden the scroll-reveals.** Many sections ship at `opacity:0` until scrolled into
      view (trap #1 in GoodGround_memory.md). Works for most users but is fragile and
      leaves large empty gaps on desktop/fast-scroll. Make reveals visible-by-default and
      animate as enhancement.
- [ ] **Tighten desktop section padding** on Services and About — currently reads as
      sparse on desktop (partly the reveal issue, partly generous padding).

## Leave as-is (verified good — do not touch)

- Brand / design system (warm, distinctive, not generic-AI aesthetic)
- Copy voice (human, specific, no fabrication)
- Contact form UX + the 4-step `/start-project` wizard (strong lead-gen flow)
- Mobile hero (surfaces pitch + CTA well)
- Lighthouse 100s, a11y, schema, SEO foundations
- Two contact paths (`/contact` quick + `/start-project` qualified) — fine as differentiated

---

## When resumed: the founder owes three inputs to unblock the biggest wins

1. A WhatsApp / phone number (Tier 1 #3)
2. Yes/no on showing indicative pricing (Tier 2 #6)
3. Any real testimonial (Tier 1 #2)

Case studies (Tier 1 #1) can start immediately without any of the above.
