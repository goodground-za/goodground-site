# Website Launch promotion — `/website-launch`

A single landing page for the R845/month first-website promotion, built inside
this Next.js app. It reuses the site's build, fonts, colour tokens, portfolio
data and analytics. No new framework, no new build system, no new tracking
provider.

---

## Route

| | |
|---|---|
| Public URL | `https://www.goodground.co.za/website-launch` |
| Source | `app/website-launch/page.tsx` |
| Enquiry endpoint | `POST /api/website-launch` |
| No-JS confirmations | `/website-launch/enquiry-received`, `/website-launch/enquiry-problem` |

The page lives **outside** `app/(site)/` on purpose. That route group renders
the full site chrome with its six-item menu, and this page needs the compact,
offer-focused header the brief asks for. `app/page.tsx` and `app/not-found.tsx`
sit outside it for the same reason. Route groups do not appear in URLs, so the
path is unaffected.

## Run it locally

```bash
npm run build && npm start        # http://localhost:3000/website-launch
```

`next dev` crashes on the studio machine (see `AGENTS.md`), so build and start.

To exercise the form **without emailing anyone**:

```bash
LAUNCH_ENQUIRY_TRANSPORT=mock npm start
```

Every submission then runs the full server path — validation, eligibility,
honeypot, rate limit, duplicate check — and logs instead of delivering. It is
not a fake success: the response still reflects what actually happened.

## Where the owner edits the offer

**`content/websiteLaunch.ts`.** Everything visitors read about the offer lives
there: price, eligibility line, capacity line, the ten inclusions, the summary
points, the four process steps, all nine FAQs, the form copy and the page title
and description.

The price is written **once** (`launchOffer.price`) and rendered in all three
places it appears. The eligibility rule is written once and is used by the page,
the schema and the server-side check. There is no second copy to fall out of
step.

Changing the price means editing one line. Do not hard-code it into the page.

### Rules encoded in that file — please read before editing

- New businesses **without a website** only. A social page or an already
  registered domain does not disqualify anyone. There is no business-age cutoff.
- "Two promotional spaces each month" is **monthly capacity**, not a live count
  of what is free today. There is no counter, no countdown and no date reset,
  and none should be added.
- The 12 months of included fees is **not** a contract length. The deposit,
  commitment, schedule and total payable are not stated anywhere on the page.
  Do not invent any of them, and do not add "cancel anytime", "no deposit" or a
  package total.
  - The paragraph that used to stand in for those terms was removed on
    2026-09-13 on Johandre's instruction. What happens at the **end** of the term
    is now stated instead, in the "What happens after the first 12 months?"
    answer: the domain and website are transferred across, or the client moves to
    the maintenance package.
- Redesigns and replacements are out of scope, as are ongoing SEO campaigns and
  extra features.

## Files added

```
app/website-launch/page.tsx                     the page
app/website-launch/launch.css                   page styles, all .gg-launch scoped
app/website-launch/opengraph-image.tsx          social card, via the shared renderer
app/website-launch/enquiry-received/page.tsx    no-JS success (noindex)
app/website-launch/enquiry-problem/page.tsx     no-JS failure (noindex)
app/api/website-launch/route.ts                 enquiry endpoint
components/launch/LaunchForm.tsx                the form
components/launch/LaunchCta.tsx                 primary CTA + click event
components/launch/LaunchOfferBar.tsx            mobile price bar
components/launch/LaunchMotion.tsx              section reveals
components/launch/LaunchIcon.tsx                inclusion icons
components/launch/LaunchOutcome.tsx             shared no-JS confirmation layout
content/websiteLaunch.ts                        the offer
lib/analytics.ts                                consent-safe event helper
```

## Files changed

```
app/sitemap.ts        adds /website-launch; also repoints the existing static
                      routes at app/(site)/... , which the 2026-09-11 route-group
                      move had left pointing at paths that no longer exist, so
                      every static route was silently falling back to build time
                      for its lastModified date
lib/mailer.ts         SMTP transport shared by both server-side form routes
lib/enquiry.ts        client-side Web3Forms path, used by the site's other forms; the
                      existing client forms share one value. No behaviour change
.env.example          documents the two new optional variables
```

Nothing else on the site was touched. The page's CSS is namespaced `.gg-launch`
and its stylesheet is not loaded on any other route (verified).

## Form backend

The site has no PHP and no cPanel. It runs on Vercel, so the handler is a
**Next.js Route Handler**, which is this project's native server environment.

The browser posts to `/api/website-launch`. That route re-checks everything and
then sends the message over **GoodGround's own SMTP** (`lib/mailer.ts`).

> **2026-09-14 — this used to be Web3Forms and it never worked.**
> Web3Forms refuses server-side calls on the free plan ("Use our API in
> client side or contact support with server IP address"), so every enquiry
> from this page failed at delivery from launch until the switch to SMTP.
> It went unnoticed because the route was only ever exercised with the mock
> transport, which returns success without contacting the provider at all.
> The browser-side forms in `lib/enquiry.ts` were never affected.
>
> Fixed and confirmed delivering on 2026-09-14. Enquiries submitted between
> 13 and 14 September were never delivered anywhere and are unrecoverable.

The recipient comes from the environment, not from anything in the
request, so the endpoint cannot be used as an open relay.

Why a server route at all, when the other forms post direct from the browser:
this promotion has an eligibility rule, and a rule enforced only by a checkbox
in the DOM is not enforced.

Server-side, every submission is checked for:

- all required fields present, with length limits
- a valid email address
- **eligibility confirmed** — rejected with 422 otherwise
- honeypot (`company_website`)
- same-origin (`Origin` compared to the deployment's own host, plus
  `Sec-Fetch-Site`), which is this project's CSRF posture for a route handler
- request size, before parsing
- rate limit, 5 per IP per 10 minutes
- duplicate suppression, same email and business inside 10 minutes
- CR/LF stripped from anything that becomes a mail header, and control
  characters stripped from the body

Both a JSON `fetch` and an ordinary form POST are accepted. Without JavaScript
the browser posts normally and the route answers with a 303 to one of the two
confirmation pages.

## Configuration

Copy from `.env.example`. **Both new variables are optional.**

| Variable | Needed? | What it does |
|---|---|---|
| `SMTP_HOST` | **Yes** | The cPanel SMTP host. Unset, the route fails honestly rather than pretending a message was sent. Real values are in the Vercel project settings — this repo is public. |
| `SMTP_PORT` | No | Defaults to `465` (implicit TLS). `587` also works and uses STARTTLS. Port 25 is blocked. |
| `SMTP_USER` | **Yes** | The dedicated web-form mailbox, so automated traffic stays out of the inbox a person reads. |
| `SMTP_PASS` | **Yes** | That mailbox's password. Vercel only — never in the repo. |
| `MAIL_TO` | No | Defaults to `SMTP_USER`, which is what we want. Set it only to deliver somewhere other than the sending mailbox. |
| `MAIL_FROM` | No | Defaults to `SMTP_USER`. Keep it equal to `SMTP_USER`: Exim will relay a different address on the same domain in most configurations, but authenticating and sending as the same mailbox is the case that always works. |
| `LAUNCH_ENQUIRY_TRANSPORT` | No | `mock` accepts and logs without delivering. **Development only.** Never set in production. |
| `NEXT_PUBLIC_GA_ID` | Existing | Already configured. The promotion's events use it. |

## Analytics

Uses the existing GA4 integration and its consent gate. `components/Analytics.tsx`
only mounts GA after the visitor accepts cookies, so `window.gtag` exists only
for a consented visitor — which makes the helper in `lib/analytics.ts`
consent-safe by construction. No new provider.

| Event | When |
|---|---|
| `promo_cta_click` | A primary CTA is clicked. Carries `placement` only. |
| `promo_form_start` | First interaction with the form, once. |
| `promo_lead_success` | **After the server confirms acceptance**, once per page view. |
| `promo_form_error` | Submission failed. Carries `reason` only. |

`promo_lead_success` is the conversion. A CTA click is not a lead. No name,
email, business name or free text is ever put in an event payload.

## Deployment file list

Everything is source in this repo. Deployment is the site's normal one: merge to
`main`, Vercel builds. `AGENTS.md` governs that — **pushing to `main` deploys to
production, so never push without explicit approval.**

No DNS change, no payment service and no new hosting is required.

## Remaining production configuration

1. **Live delivery has not been exercised.** Doing so would send a real email to
   the studio inbox, which was not authorised. Everything up to the delivery
   call is verified; the delivery call itself is the same code path the site's
   existing forms already use in production. **Owner action:** submit the live
   form once after deploy and confirm the enquiry arrives.
2. **Confirm `LAUNCH_ENQUIRY_TRANSPORT` is unset in Vercel.** If it is ever set
   to `mock` in production, real enquiries are accepted and discarded. It logs at
   error level on every call so this would be visible in the deployment logs.
3. **Rate limiting is per serverless instance** and resets on a cold start. It
   raises the cost of casual abuse; it is not a hard ceiling. If the page attracts
   spam, move `hits` and `recent` in the route to Vercel KV or Upstash.
4. **Search Console.** The page is indexable and is in the sitemap. Submitting it
   for indexing needs the Search Console account and is the owner's to do. Nothing
   in this work submitted anything to Google.

## What is deliberately not here

- **No FAQPage schema.** The FAQs are real `<details>` elements. Rich results are
  Google's decision and were not promised.
- **No `Offer` node in the Service schema.** The monthly figure is confirmed but
  the total payable is not, and a schema `price` states a price for the service
  as a whole. Publishing a number nobody has agreed to, in a format aggregators
  read literally, would be worse than omitting it.
- **No current-website field** in the form, and no redesign eligibility anywhere.
- **No availability counter or countdown.** The banner across the top states an
  availability figure, but it is a fixed string a person wrote, not a count
  derived from anything. See below.

## The availability banner

`launchMarquee` in `content/websiteLaunch.ts` drives the scrolling banner at the
top of the page. It currently reads **"1 slot left for October"**, set by Johandre
on 2026-09-23. From 2026-09-13 it said September.

**It is a dated claim and it goes stale.** Nothing updates it: no counter, no
date arithmetic, no automatic month, deliberately, so the page cannot keep
making a claim nobody has checked. A page still saying "September" in October is
telling visitors something false.

- To change the wording, edit `message`.
- To take it down, set `enabled` to `false`.

It scrolls, so it carries a pause button (WCAG 2.2.2 requires a way to stop
content that moves on its own for more than five seconds). It also pauses when
you hover the text, and it renders completely static, with no button, under
`prefers-reduced-motion`. The message is announced once to a screen reader; the
repeated copies that fill the width are `aria-hidden`.
