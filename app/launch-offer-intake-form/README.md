# Launch-offer intake form

`/launch-offer-intake-form` — the project form sent to a client after they
enquire about the R845 website launch offer.

## What it is for

The 34-page `GoodGround Website Project Brief.docx` is the right instrument for
a full custom build and the wrong one for this offer: someone starting their
first business will not complete 34 pages, and the package only covers five
pages. This is the short form for that funnel. Fifty-three questions across
eleven sections, all in plain language.

It is **not a landing page**. It carries no price, no availability claim and no
sales argument — that work happens on `/website-launch`. It is `noindex,
nofollow` and absent from the sitemap, because it is a private working document
sent by link.

## Running it

```bash
npm run build     # next dev crashes on this machine
npx next start -p 3000
```

To exercise the whole submit path without emailing anyone:

```bash
LAUNCH_ENQUIRY_TRANSPORT=mock npx next start -p 3000
```

The route then runs every guard and the full validation, logs the brief's size
and delivers nothing. It is **not a fake success** — the response reflects what
actually happened to the message. It logs at error level on every call so a
misconfiguration is loud. **Never set it in production.**

## Files

| File | What it holds |
|---|---|
| `content/launchIntake.ts` | All 53 questions, the copy, the section structure |
| `lib/intakeValidate.ts` | The validator — imported by **both** the browser and the route |
| `lib/intakeBrief.ts` | Turns answers into the Markdown brief that gets emailed |
| `components/intake/IntakeForm.tsx` | Form state, draft autosave, submission |
| `components/intake/IntakeField.tsx` | Renders one question from its definition |
| `components/intake/IntakeProgress.tsx` | The progress rail |
| `app/api/launch-intake/route.ts` | Guards, delivery |
| `app/launch-offer-intake-form/` | Page, styles, and the two no-JS outcome pages |

## Adding or changing a question

Edit `content/launchIntake.ts` only. The page, the validation and the emailed
brief all derive from it. There is no second list to keep in step — which is
the point: with 53 questions, a hand-maintained copy on the server would
eventually disagree with the browser about what is required.

A question can be made conditional with `showIf`. A hidden question is never
required and never appears in the brief, because "not asked" and "not answered"
are different facts and running them together would mislead whoever builds the
site.

## What arrives in the inbox

A Markdown brief, section by section, in the form's own order, with unanswered
optional questions marked `_Not answered._` rather than dropped, so a gap is
visible. It is meant to be saved straight into the project folder.

## Delivery

Over GoodGround's own SMTP (`lib/mailer.ts`), as `hello@goodground.co.za`, with
`Reply-To` set to the person who filled the form in. The recipient comes from
the environment and never from the request, so the route cannot be turned into
an open relay.

It does **not** use Web3Forms. That was the original design and it never worked:
the free plan refuses server-side calls, so both this route and
`/api/website-launch` failed at delivery until 2026-09-14. Requires `SMTP_HOST`,
`SMTP_USER` and `SMTP_PASS`; with any unset the route fails honestly instead of
reporting a success.

## Guards

Same shape as `/api/website-launch`:

- same-origin (`Origin` + `Sec-Fetch-Site`), 403
- honeypot `company_website` — acknowledged like a success, delivers nothing
- body cap 128 KB, 413
- rate limit 12 per IP per 30 minutes, 429
- duplicate suppression on `sha256(email|business)` for 15 minutes
- success reported only after the delivery provider accepted the message

The rate limit and duplicate check are **in-process**. On Vercel that is per
serverless instance and resets on a cold start, so they raise the cost of casual
abuse without being a hard ceiling. A durable limiter (Vercel KV, Upstash) is
the production upgrade.

## Known limits

- **Without JavaScript, the three conditional follow-ups never render.** They
  are `brand_colours`, `photos_of` and `address`, all optional, so a no-JS
  submission still produces a complete brief for every required question. The
  detail is simply not captured and has to be asked for separately.
- **The draft is per browser.** It lives in `localStorage`, so a different
  device or cleared history starts a blank form. The page says so.
- **Live delivery has not been exercised against the real mailbox.** The send
  path is proven end to end against a local SMTP server — envelope, Reply-To,
  subject and the full brief all verified — but no message has yet gone through
  `mail.goodground.co.za` with the real credentials. Submit the live form once
  and confirm it arrives before sending the link to a client.

## Still to configure

- `intakeAssets.driveUrl` in `content/launchIntake.ts` is empty. While it is,
  the page says we email a private Google Drive folder, which is what happens.
  Set it only if a single standing upload folder is ever used for everyone —
  otherwise leave it empty rather than publishing a link that is wrong for most
  clients.
- Confirm `LAUNCH_ENQUIRY_TRANSPORT` is **unset** in Vercel.
- Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` in Vercel. Without
  them both forms fail on every submission. See `.env.example`.
