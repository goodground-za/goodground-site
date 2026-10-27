# Figma redesign: questions for the owner

Collected while building (owner asked: build everything, then ask all questions at the end).
Each is something I could not decide from the Figma file, the live site, or the honesty rules.
Answer in any order; the numbers are for reference.

## Answered by the owner on 27 Oct 2026 (applied)
- Q1: November is 2 of 2 spots taken (sold-out state, December waitlist). Q18: the Launch Offer is now R950 a month for 12 months, R11,400 in total (was R845 and R10,140).
- Q50: Information Officer is Xander Saayman, xander@goodground.co.za. Q51: hosting provider is Afrihost (the email/form provider row is still "to add").
- Q57 (storage and retention) and Q27 (SMTP, SPF, DKIM, DMARC): the owner will build and set these up.
- All wording approved (Q8, Q13, Q14, Q36, Q38, Q45): FAQ answer 06 now says "1 to 6 weeks depending on the package".
- Q5/Q35: images stay as they are for now.
- Old look to new look: /brand-guide rebuilt, the launch enquiry and project-form pages and their result pages restyled, the cookie banner restyled, the old ht-* tokens and 70 unused old components removed.
- Answered later on 27 Oct 2026 (applied): Q52 Terms tab ON; Q2 trust-bar figures KEEP; Q12 number format `R12 000` (no-break space, one function in components/gg/format.ts plus the hand-written copy); Q59 KEEP "within one working day" on the sent screen; Q61 KEEP "Online shop" and "Client login area" as options.
- Answered after that (applied): email/form provider in the `/legal` table set to Afrihost (the forms send through the studio's own cPanel mail host, no third-party form service; owner had no name to give); Care Plans removed from Terms section 11.
- Still open: real wording for Terms sections 09 (ownership), 13 (warranties and liability) and 15 (disputes), which only point to the signed contract. Owner has none; needs an attorney or a standard template when wanted.

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

## Insights / Article
40. Insights cards use the shortened Figma excerpts; titles, topics, dates and read times are the live ones. The cost guide’s body is now rich blocks (option list, factor list, checklist, plan cards from the pricing data, add-on chips, payment options, table, rent-vs-own chart, quick answers) built from the live text, condensed as the Figma example is. The other five articles use the basic blocks (they have no TL;DR card). Say if you want any of them given the rich treatment.
41. "Prices correct as of 17 September 2026" under the plan cards comes from `pricesAsOf` in content/pricing.ts (the date of the last price change). Confirm the date, and update it whenever prices change.
42. The article author stays "GoodGround" (no personal name); the avatar is "gg".
43. Quick-answer accordions show plain text, so links inside those answers are not clickable; the same links remain in the paragraph after them.
44. Share menu: WhatsApp, LinkedIn and Facebook open their share pages in a new tab; phones use the native share sheet.

## FAQ / Legal
45. FAQ: all 13 answers are the live text word for word (answer 07 is longer than the shortened Figma version; say if you want the shorter one). FAQ 06 still says "4 to 6 weeks" while /pricing shows about 1 week for Micro and 2 for Launch. Suggested wording: "1 to 6 weeks depending on the package". Approve and I change content/faq.ts (it feeds the Home FAQ and /process too).
46. FAQ: related links per answer ("See pricing", "How we work", etc.) are my picks since the CMS does not exist; check them. Answer 04 should link to Terms and conditions, which do not exist, so that link is left off until Terms ship.
47. FAQ: "Helpful? Yes / No" sends faq_helpful to GA4 (only for people who accepted cookies). Opening an answer sends faq_open. No text or personal data is sent.
48. FAQ: the Home FAQ and /process FAQ still read content/faq.ts, so they match; the Services, Pricing and article quick answers are separate lists. Want them merged into one collection now?
49. Legal: privacy wording is the shortened Figma text; the Legal notice is the live text. The "Last updated 26 OCT 2026" date is mine (the date of this rebuild). Your attorney should approve the wording before launch.
50. Legal: POPIA Information Officer is still missing. The company card shows "Name and email to be added" in coral with a REQUIRED BY POPIA tag until you give me a name and email (data.ts, company.informationOfficer). That coral text ships if nothing is added.
51. Legal: the providers table has two coral "to add" rows (email/form provider, hosting provider). Give me the real names (for example the mail host and Vercel) or they ship as placeholders.
52. Legal: the Terms and conditions tab is BUILT but switched off (termsLive = false in components/gg/legal/data.ts), because the wording needs your attorney and summaries must not be published as the agreement. Off means: two tabs, #terms still opens the legal notice (as today), no Terms link in the FAQ. Sections 09, 13 and 15 are marked "needs your attorney". The revision numbers in section 07 (Micro and Launch 1, Grow 2, Scale 3, extra R1,500) come from the Figma text; confirm they match the pricing page.
53. Legal: the cookie switch works now (on stores consent and loads Google Analytics, off deletes the _ga cookies and stops sending). A "Cookie settings" link is in the footer bottom row and reopens the banner. The banner itself still has the old look; I restyle it in step 11.
54. Legal: the Figma footer has a LEGAL column (notice, privacy, terms); the README says use the canonical footer, so I kept that and only added "Cookie settings". Say if you want the LEGAL column instead.
55. Legal: with no #hash the page opens on the Privacy tab (the drawn view). #notice, #privacy, #terms and the old #sec-collection, #sec-rights, #sec-cookies anchors all work. On phones the full wording stays (the 390 frame shows shortened intros); I did not shorten legal text for mobile.
56. Legal: "Download as PDF" on the Terms tab uses the browser print dialog (Save as PDF), not a generated file. Only matters once Terms are live.

## Client onboarding (/onboarding)
57. Storage, retention, recipient (README item 8) are still open, so the form is local-first: answers autosave in the visitor's browser (localStorage, 800 ms after typing), uploaded files are kept in the browser (IndexedDB), nothing is stored on a server. Header says "Saved on this device". Send emails the brief as text to the studio inbox (MAIL_TO, or the SMTP mailbox) and a short confirmation to the client. Not built because they need your decisions and a database or bucket: server drafts, the emailed private link with a 6-digit code, the 2 GB resumable uploads, the admin view, the attached PDF. Tell me the storage region, how long briefs and files are kept, and who gets the "brief received" email.
58. Files: because nothing is uploaded yet, the studio email only says how many files the client added, and the Sent screen promises "a separate secure link" for them. The "Download a PDF copy" button opens the browser print dialog (Save as PDF) with the answers laid out as a document, not a generated PDF.
59. The Sent screen says "within one working day" on purpose (as drawn). Our public reply time is 1-2 business days. Confirm you want both.
60. /onboarding opens with no token today (any visitor can open the form and send it). Prefill uses ?name=&email=&business=&package=&price=&payment=&addons= in the link; there is no check that the quote is real. Needs the private-token system from question 57.
61. "Online shop" and "Client login area" are still listed as feature options (as drawn). Your pricing says no e-commerce or member portals. Keep, remove, or keep with a "may change your quote" flag?
62. Welcome and stepper show on phones as a sheet; the "Save & finish later" sheet only says the draft is on this device, because no link can be emailed yet.
63. Date field uses the browser's date picker; South African phone check accepts 0XXXXXXXXX or +27XXXXXXXXX (also other +country numbers). Pages allowance next to the page count comes from the package in the link (Micro 1, Launch 5, Grow 10, Scale 15); without a package it just counts.

## Global
25. Georgia ignore in .impeccable/config.json for an illustration. PRODUCT.md / DESIGN.md are stale; updated at the very end (as you said).
26. README section 10 open items still apply.
