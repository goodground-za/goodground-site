# Figma redesign: questions for the owner

Collected while building (owner asked: build everything, then ask all questions at the end).
Each is something I could not decide from the Figma file, the live site, or the honesty rules.
Answer in any order; the numbers are for reference.

## Home
1. Launch availability: what is the real month and spots taken? (`launchSpots` in content/websiteLaunch.ts holds Figma's sample: November, 1 of 2 taken.) Everything on Home, /website-launch and the sticky bar reads it.
2. Trust bar figures (20+ years, 10+ projects, 100% satisfied): content/stats.ts forbids unmeasured numbers. Keep them, or replace?
3. "One page" (Figma) vs "up to five pages" (live offer). I used the live wording everywhere (Home, /website-launch, /pricing comparison). OK?
4. Roam Local quote: verbatim from Google, or the shorter Figma wording?
5. Home project cards are gradients; real 16:10 screenshots exist (public/images/case-*-hero.webp). Use them? (goodground-hero.webp shows the older site design.)
6. FAQPage JSON-LD on Home duplicates /faq. I left it off. OK?

## Services / Service detail / Industry
7. Every "Ask us" comparison cell and the growth-report illustrative figures on /services.
8. DRAFT copy I wrote for Redesign, UX, Google Ads, Meta Ads pages (short problem lines, included titles, bolted-vs-built lists, hero visuals) and the five industries' journey/fix/local-search/bento copy and towns. Please read them.
9. Trades H1 uses the live wording, not Figma's.
10. No industry-tagged case studies exist, so industry pages carry an honesty card instead of projects.

## Work / Case study
11. "How it was built" is generic for the three non-B3TTER studies; spec-bento values are labelled illustrative; there is no 8-second preview clip (none exists).

## Pricing
12. Number format: `R12,000` (Figma) or `R12 000` (live). One function (components/gg/format.ts) changes it everywhere.
13. Stepper items: the spec lists extra pages, complex pages, blog posts, copywriting, content upload, animations, illustrations and languages as steppers. I changed content/pricing.ts to match (complex page, illustrations, animations, copywriting, content upload and language are now per-unit). Confirm.
14. Two FAQ answers are new and DRAFT: "Full Service or instalments: which should I choose?" and "Do I own my website?" (built only from facts on the page).
15. "Choose {package}" attaches the package to the on-page quote form (per the Figma notes). The build notes also mention `?package=` links to /start-project; those still work from elsewhere. OK?
16. The quote form sends through the existing Web3Forms path with "Form type: pricing-quote". The Figma note wants an auto-reply ("Your quote request is in"); Web3Forms free cannot do that reliably. Do you want it, and from where (the studio SMTP route)?
17. Package cards use the shorter Figma inclusion wording; the verbatim client-document wording stays in content/pricing.ts (used for schema). OK?

## Website launch
18. DEPOSIT / TOTAL: the Figma page and the /pricing comparison say "No deposit", "R10,140 total over 12 months". content/websiteLaunch.ts (13 Sep) says the deposit, total and schedule were NOT confirmed and must not be stated. They are isolated in `launchTerms`. Are they confirmed? If not I delete them in one place.
19. New FAQ "Is there a deposit?": my draft answer says no deposit, R845 for 12 months. Confirm or reword.
20. Offer JSON-LD now carries price 845 ZAR, 12-month duration, availability from the live data (the Figma note asks for it; the old page deliberately omitted it for the reason in 18).
21. Intake calendar footer: Figma says "Live from the booking calendar". There is no booking calendar (it is a setting), so I wrote "Filled spots shown in coral."
22. Eligibility tick wording kept as live ("…the business does not have a website").
23. The mobile frame leaves out several sections (journey, 12 payments, work, intake, steps, review/FAQ on /pricing). I kept them, stacked. Say if you want them hidden on phones.
24. The eligibility checker shows on tablet and desktop, not on phones (as the frame says).

## Start project / Contact / Thanks / 404
27. Every form now posts to one server route (/api/enquiry) that validates, applies the spam rules (honeypot, under-3-seconds), sends the studio email and the auto-reply. It needs the same SMTP_HOST / SMTP_USER / SMTP_PASS settings the launch form already uses, and SPF, DKIM and DMARC on goodground.co.za (mail-host setup, not code). Until those are set the forms show the "couldn’t send" state. The Pricing quote form moved onto it too (so question 16 is answered: it gets the auto-reply).
28. The auto-reply email is plain branded HTML with a text wordmark (no logo image, no tracking). Want the logo image in it?
29. Step 2 (size) is not drawn in Figma; I built it from the notes (same 2 x 2 cards, live labels, "How big is the project?").
30. ?package=micro|launch|grow|scale and ?intent=seo-audit have no designed banner. I drafted two ("{Name} package", "You’re asking for an SEO audit"). Read the wording.
31. /thanks: the contact and onboarding variants keep the start-project step-3 label and body (only the title changes), as the note says. I also added a "not sent" variant (?status=failed) for no-JS failures, which is not drawn.
32. Contact: the location card is a gradient placeholder; I need the static map image (screenshot of George, no live embed). Topic names are from the note.
33. 404: the "404" gradient text starts very dark on the plum (as drawn). It is decorative, but low contrast. Lighten the start colour?
34. The old /start-project and /contact forms, PricingEnquiryForm and Web3Forms are deleted; the security policy no longer allows api.web3forms.com.

## About / Process
35. About: the hero image is a gradient (no photo exists; the old about-founder.png is not used). The four "On the web" lines are new copy. The stats strip keeps "10+ years founder experience" and "20+ years combined experience": both must be true. The path / rocky ground / thorns cards use general icons (no custom drawings yet). The parable opens in a new native dialog with the same four soils as the old modal.
36. Process is a NEW page. New copy to confirm: every step’s "What we do / What you do / What you get" list, the 15/15/30/20/20 shares, "feedback within 3 working days", a named project lead, the weekly update, the three calls, "fixes for things we got wrong never use up a round", "changing direction after design approval counts as new scope", and three FAQ answers (slow with content, seeing the site while built, who owns the website). Ownership needs your decision (it belongs in the Terms too).
37. Process links I had to guess: "Read the handover guide" goes to /insights (no guide exists yet); "Ask about a Care Plan" goes to /contact?topic=support.
38. The live FAQ answer 06 ("most projects take 4-6 weeks") should match the Process timelines (Micro ~1 week to Scale ~4-6 weeks). I did not change faq.ts.
39. The project tracker on /process is an illustration labelled EXAMPLE, desktop only.

## Global
25. Georgia ignore in .impeccable/config.json for an illustration. PRODUCT.md / DESIGN.md are stale; updated at the very end (as you said).
26. README section 10 open items still apply.
