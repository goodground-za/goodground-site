"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { site } from "@/content/site";

import { BottomSheet, type BottomSheetHandle } from "../BottomSheet";
import { Button, ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { Field } from "../Field";
import { Tag } from "../Tag";
import { StepFields, type Quote, type StepContext } from "./Controls";
import { briefSections, overall, stepStats, str, strs } from "./logic";
import { savedLabel, useBrief } from "./store";
import { REVIEW_STEP, TOTAL_STEPS, steps, type Step } from "./steps";

const PAGE_ALLOWANCE: Record<string, number> = { micro: 1, launch: 5, grow: 10, scale: 15 };
const PACKAGE_NAMES: Record<string, string> = { micro: "Micro", launch: "Launch", grow: "Grow", scale: "Scale" };
const PAYMENTS: Record<string, string> = { deposit: "50% deposit", instalments: "12 monthly instalments" };

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

const clean = (value: string | null, max: number) => (value ?? "").replace(/[\u0000-\u001F\u007F<>]/g, "").trim().slice(0, max);

/** Prefill from the private link (?name=&email=&business=&package=&price=&payment=&addons=). Read-only context only. */
function readPrefill() {
  const q = new URLSearchParams(window.location.search);
  const pkg = clean(q.get("package"), 12).toLowerCase();
  const price = clean(q.get("price"), 24);
  const payment = PAYMENTS[clean(q.get("payment"), 16).toLowerCase()] ?? "";
  const addons = clean(q.get("addons"), 240)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8)
    .map((s) => s.slice(0, 40));
  const quote: Quote = PACKAGE_NAMES[pkg] ? { package: `${PACKAGE_NAMES[pkg]} website`, price, payment, addons } : null;
  return { name: clean(q.get("name"), 80), email: clean(q.get("email"), 120), business: clean(q.get("business"), 120), pkgSlug: PACKAGE_NAMES[pkg] ? pkg : "", quote };
}

/** What the "What are you working with us on?" question pre-ticks from the quote. */
const preticked = (pkgSlug: string): string[] => (pkgSlug ? ["A new website"] : []);

const firstName = (name: string) => name.split(/\s+/)[0] ?? "";

/* -------------------------------------------------------------------- bits */

function StepIndicator({ step, state }: { step: Step | { n: number }; state: "done" | "current" | "upcoming" | "attention" }) {
  return (
    <span className={`ob-ind ob-ind--${state}`} aria-hidden="true">
      {state === "done" ? <Icon name="check" size={13} stroke={3} /> : String(step.n).padStart(2, "0")}
    </span>
  );
}

function Ring({ percent }: { percent: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <span className="ob-ring" role="img" aria-label={`${percent}% of required answers done`}>
      <svg viewBox="0 0 112 112" aria-hidden="true">
        <circle cx="56" cy="56" r={r} />
        <circle cx="56" cy="56" r={r} className="ob-ring__arc" strokeDasharray={c} strokeDashoffset={c * (1 - percent / 100)} transform="rotate(-90 56 56)" />
      </svg>
      <b aria-hidden="true">{percent}%</b>
    </span>
  );
}

/* -------------------------------------------------------------------- main */

export function Onboarding({ token }: { token: string }) {
  const { state, ready, status, update, setAnswer, flush } = useBrief(token);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prefill, setPrefill] = useState<ReturnType<typeof readPrefill> | null>(null);
  const [now, setNow] = useState(0);
  const [toast, setToast] = useState<{ message: string; undo?: () => void; on: boolean }>({ message: "", on: false });
  const [direction, setDirection] = useState<"next" | "back">("next");
  const [announce, setAnnounce] = useState("");
  const [consents, setConsents] = useState({ accuracy: false, rights: false, use: false });
  const [confirmName, setConfirmName] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const toastTimer = useRef(0);
  const title = useRef<HTMLHeadingElement>(null);
  const stepsSheet = useRef<BottomSheetHandle>(null);
  const laterSheet = useRef<BottomSheetHandle>(null);
  const loadedAt = useRef(0);
  const prefilled = useRef(false);

  const a = state.answers;

  /* ---- prefill from the private link, once, after the saved draft is read */
  useEffect(() => {
    if (!ready || prefilled.current) return;
    prefilled.current = true;
    loadedAt.current = Date.now();
    const p = readPrefill();
    setPrefill(p);
    const patch: Record<string, string | string[]> = {};
    if (p.name && !str(a, "fullName")) patch.fullName = p.name;
    if (p.email && !str(a, "email")) patch.email = p.email;
    if (p.business && !str(a, "businessName")) patch.businessName = p.business;
    if (!strs(a, "workingOn").length && preticked(p.pkgSlug).length) patch.workingOn = preticked(p.pkgSlug);
    if (Object.keys(patch).length) update((s) => ({ answers: { ...s.answers, ...patch } }), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // "Saved 3 min ago" refreshes itself.
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  const showToast = useCallback((message: string, undo?: () => void) => {
    window.clearTimeout(toastTimer.current);
    setToast({ message, undo, on: true });
    toastTimer.current = window.setTimeout(() => setToast((t) => ({ ...t, on: false })), undo ? 5000 : 2500);
  }, []);
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const quote = prefill?.quote ?? null;
  const pageAllowance = prefill?.pkgSlug ? PAGE_ALLOWANCE[prefill.pkgSlug] ?? null : null;
  const who = firstName(str(a, "fullName") || prefill?.name || "");
  const business = str(a, "businessName") || prefill?.business || "";

  const summary = useMemo(() => overall(a), [a]);
  const view: "welcome" | "step" | "sent" = state.sent ? "sent" : state.started ? "step" : "welcome";
  const stepN = Math.min(Math.max(state.step, 1), TOTAL_STEPS);
  const current = steps.find((s) => s.n === stepN);
  const stats = useMemo(() => Object.fromEntries(steps.map((s) => [s.n, stepStats(s, a)])), [a]);

  const stepState = (n: number): "done" | "current" | "upcoming" | "attention" => {
    if (n === stepN && view === "step") return "current";
    if (n === REVIEW_STEP) return "upcoming";
    const missing = stats[n]?.missing.length ?? 0;
    if (state.visited.includes(n) && missing > 0) return "attention";
    if (state.done.includes(n)) return "done";
    return "upcoming";
  };
  const doneCount = steps.filter((s) => stepState(s.n) === "done" || (stepState(s.n) === "current" && state.done.includes(s.n) && (stats[s.n]?.missing.length ?? 0) === 0)).length;

  const setError = useCallback((key: string, message: string) => {
    setErrors((e) => {
      if ((e[key] ?? "") === message) return e;
      const next = { ...e };
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });
  }, []);

  const ctx: StepContext = { a, set: setAnswer, quote, pageAllowance, toast: showToast };

  /* ---- navigation */
  const go = useCallback(
    (n: number, options: { focusId?: string; dir?: "next" | "back"; markDone?: boolean } = {}) => {
      const target = Math.min(Math.max(n, 1), TOTAL_STEPS);
      setDirection(options.dir ?? (target >= stepN ? "next" : "back"));
      update(
        (s) => ({
          step: target,
          started: true,
          visited: Array.from(new Set([...s.visited, s.step, target])),
          done: options.markDone ? Array.from(new Set([...s.done, s.step])) : s.done,
        }),
        true,
      );
      const name = steps.find((x) => x.n === target)?.name ?? "Review and send";
      setAnnounce(`Step ${target} of ${TOTAL_STEPS}: ${name}`);
      window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (options.focusId) {
            const el = document.querySelector<HTMLElement>(`[data-field="ob-${options.focusId}"], #ob-${options.focusId}`) ?? document.querySelector<HTMLElement>(`[name="ob-${options.focusId}"]`);
            if (el) {
              el.scrollIntoView({ block: "center", behavior: reduced() ? "auto" : "smooth" });
              el.focus({ preventScroll: true });
              return;
            }
          }
          title.current?.focus({ preventScroll: true });
        }),
      );
    },
    [stepN, update],
  );

  const saveAndContinue = () => {
    const missing = stats[stepN]?.missing.length ?? 0;
    update((s) => ({ done: missing === 0 ? Array.from(new Set([...s.done, stepN])) : s.done.filter((n) => n !== stepN) }), true);
    go(stepN + 1, { dir: "next" });
  };

  /* ---- send */
  const canSend = consents.accuracy && consents.rights && consents.use && confirmName.trim().length >= 2 && !sending;

  const send = async () => {
    setSending(true);
    setSendError("");
    flush();
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          answers: a,
          confirmName: confirmName.trim(),
          consents,
          quote,
          token,
          website: "",
          loadedAt: loadedAt.current,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setSendError(data.message ?? "We couldn’t send that just now. Your answers are saved on this device, so you can try again.");
        setSending(false);
        return;
      }
      update({ sent: true }, true);
      window.scrollTo({ top: 0, behavior: "auto" });
    } catch {
      setSendError("We couldn’t send that just now. Check your connection and try again. Your answers are saved on this device.");
    }
    setSending(false);
  };

  const printBrief = () => {
    document.body.classList.add("ob-printing");
    const done = () => {
      document.body.classList.remove("ob-printing");
      window.removeEventListener("afterprint", done);
    };
    window.addEventListener("afterprint", done);
    window.print();
  };

  const saveLabel = savedLabel(status, state.savedAt, now || state.savedAt);

  /* ---- chrome */
  const subtitle = [business, quote?.package].filter(Boolean).join(" · ") || "Your project brief";
  const showLater = view === "step" && stepN !== REVIEW_STEP;
  const phoneHead = view === "step";

  const topbar = (
    <header className="ob-top">
      <Link href="/" className="ob-top__logo" aria-label="GoodGround home">
        goodground
      </Link>
      <p className="ob-top__title">
        <strong>Client onboarding</strong>
        <span>{subtitle}</span>
      </p>
      <p className="ob-top__save" role="status">
        <span className="ob-top__tick" aria-hidden="true">
          <Icon name="check" size={10} stroke={3.4} />
        </span>
        <span className="ob-hide-phone">{saveLabel}</span>
        <span className="ob-phone-only">{status === "saving" ? "Saving…" : "Saved"}</span>
      </p>
      {showLater ? (
        <Button variant="outline" className="ob-top__later" onClick={() => { flush(); laterSheet.current?.open(); }}>
          Save &amp; finish later
        </Button>
      ) : null}
    </header>
  );

  const stepper = (
    <nav className="ob-stepper" aria-label="Brief sections">
      <div className="ob-stepper__head">
        <p className="gg-kicker">YOUR BRIEF</p>
        <p className="ob-stepper__count">
          {doneCount} of {steps.length} sections done
        </p>
        <span className="ob-stepper__track" aria-hidden="true">
          <i style={{ transform: `scaleX(${Math.max(doneCount / steps.length, 6 / 246)})` }} />
        </span>
      </div>
      <ol>
        {[...steps, { n: REVIEW_STEP, name: "Review & send" } as Step].map((s) => {
          const st = stepState(s.n);
          return (
            <li key={s.n}>
              <button type="button" className={`ob-stepitem is-${st}`} aria-current={st === "current" ? "step" : undefined} onClick={() => go(s.n)}>
                <StepIndicator step={s} state={st} />
                <span>{s.name}</span>
                {st === "attention" ? <i className="ob-stepitem__dot" aria-label="Required answers missing" /> : null}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );

  const phoneHeader = phoneHead ? (
    <div className="ob-phonehead">
      <button type="button" className="ob-phonehead__pill" onClick={() => stepsSheet.current?.open()} aria-haspopup="dialog">
        <Icon name="list" size={18} stroke={2} />
        <span>
          <small>
            Step {stepN} of {TOTAL_STEPS}
          </small>
          <strong>{stepN === REVIEW_STEP ? "Review & send" : current?.name}</strong>
        </span>
        <Icon name="chev" size={18} stroke={2.2} />
      </button>
      <span className="ob-phonehead__segs" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <i key={i} className={i + 1 < stepN ? "is-done" : i + 1 === stepN ? "is-current" : undefined} />
        ))}
      </span>
    </div>
  ) : null;

  const sheets = (
    <>
      <BottomSheet ref={stepsSheet} title={`Your brief · ${doneCount} of ${steps.length} done`}>
        <ol className="ob-sheetlist">
          {[...steps, { n: REVIEW_STEP, name: "Review & send" } as Step].map((s) => {
            const st = stepState(s.n);
            return (
              <li key={s.n}>
                <button
                  type="button"
                  className={`ob-stepitem is-${st}`}
                  onClick={() => {
                    stepsSheet.current?.close();
                    go(s.n);
                  }}
                >
                  <StepIndicator step={s} state={st} />
                  <span>{s.name}</span>
                  {st === "attention" ? <i className="ob-stepitem__dot" aria-label="Required answers missing" /> : null}
                </button>
              </li>
            );
          })}
        </ol>
      </BottomSheet>
      <BottomSheet ref={laterSheet} title="Saved. Come back any time.">
        <div className="ob-later">
          <p>Your answers are saved on this device. Open this page again in the same browser to carry on where you left off.</p>
          <p>Prefer to carry on from another device? Message your project lead and we’ll sort it out.</p>
          <div className="ob-later__actions">
            <ButtonLink href={site.whatsapp.link} variant="outline">
              WhatsApp us
            </ButtonLink>
            <Button onClick={() => laterSheet.current?.close()}>Got it</Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );

  /* ================================================================ WELCOME */
  const welcome = (
    <div className="ob-welcome">
      <section className="ob-hero" aria-labelledby="ob-welcome-title">
        <Tag tone="on-dark">{who ? `WELCOME, ${who.toUpperCase()}` : "WELCOME"}</Tag>
        <h1 id="ob-welcome-title" className="ob-hero__title">
          LET’S BUILD YOUR BRIEF.
        </h1>
        <p className="ob-hero__lead">
          <span className="ob-hide-phone">
            Everything we need to design and build your website, in one place. Answer in your own words; rough notes are fine. Skip anything you’re unsure of and come back to it later.
          </span>
          <span className="ob-phone-only">Everything we need to build your website, in one place. Rough notes are fine; skip what you’re unsure of.</span>
        </p>
        <ul className="ob-hero__chips">
          {["13 short sections", "Saves as you go", "Finish in more than one sitting"].map((c, i) => (
            <li key={c} className={i === 2 ? "ob-hide-phone" : undefined}>
              <Icon name="check" size={14} stroke={2.6} />
              {c}
            </li>
          ))}
        </ul>
        <div className="ob-hero__quote">
          {quote ? (
            <p>
              <span className="gg-kicker">YOUR ACCEPTED QUOTE</span>
              <strong>{[quote.package, quote.price, quote.payment].filter(Boolean).join(" · ")}</strong>
            </p>
          ) : (
            <p>
              <span className="gg-kicker">ABOUT THIS BRIEF</span>
              <strong>About {estimate()} minutes, in your own time</strong>
            </p>
          )}
          <Button
            variant="coral"
            onClick={() => {
              setAnnounce(`Step 1 of ${TOTAL_STEPS}: ${steps[0].name}`);
              update((s) => ({ started: true, step: s.visited.length ? s.step : 1 }), true);
              requestAnimationFrame(() => title.current?.focus({ preventScroll: true }));
            }}
          >
            {state.visited.length ? "Continue my brief" : "Start my brief"}
          </Button>
        </div>
      </section>

      <div className="ob-welcome__pair">
        <section className="ob-card-plain" aria-labelledby="ob-ready">
          <h2 id="ob-ready">Have these ready</h2>
          <p className="ob-hide-phone">Not essential, but they make it quicker.</p>
          <ul>
            {[
              ["image", "Logos and photos in a Google Drive, Dropbox or OneDrive folder", "Logos and photos in a shared folder"],
              ["layout", "Brand colours and fonts, if you have them", "Brand colours and fonts"],
              ["image", "Photos of your team, premises and work", "Photos of your team and work"],
              ["doc", "Any text, brochures or menus to reuse", "Text, brochures or menus"],
              ["star", "Reviews and testimonials", "Reviews and testimonials"],
              ["compass", "Who manages your domain and email", "Who manages your domain and email"],
              ["shield", "Your POPIA Information Officer’s details", "POPIA Information Officer details"],
            ].map(([icon, long, short]) => (
              <li key={long}>
                <span className="ob-ready__icon ob-hide-phone" aria-hidden="true">
                  <Icon name={icon as "image"} size={16} stroke={2} />
                </span>
                <span className="ob-ready__tick ob-phone-only" aria-hidden="true">
                  <Icon name="check" size={14} stroke={2.6} />
                </span>
                <span className="ob-hide-phone">{long}</span>
                <span className="ob-phone-only">{short}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="ob-card-plain ob-how" aria-labelledby="ob-how">
          <h2 id="ob-how">How it works</h2>
          <ol>
            {[
              ["01", "Answer what you can", "Every answer saves as you type, on this device."],
              ["02", "Share your files", "Put logos, photos and documents in a Google Drive, Dropbox or OneDrive folder and paste the link."],
              ["03", "Review and send", "We check it, then book your kick-off call."],
            ].map(([n, t, d]) => (
              <li key={n}>
                <span className="ob-how__n">{n}</span>
                <p>
                  <strong>{t}</strong>
                  <small>{d}</small>
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <p className="ob-nopass">
        <Icon name="lock" size={16} stroke={2} />
        <span className="ob-hide-phone">Please don’t type passwords anywhere in this form. We’ll send you a secure way to share access.</span>
        <span className="ob-phone-only">Never type passwords in this form.</span>
      </p>
    </div>
  );

  function estimate() {
    return steps.reduce((n, s) => n + s.minutes, 0);
  }

  /* ================================================================== STEP */
  const help = current && stepN !== REVIEW_STEP ? (
    <aside className="ob-help" aria-label="Help for this step">
      <div className="ob-help__why">
        <p>
          <Icon name="bulb" size={18} stroke={2} />
          <strong>Why we ask</strong>
        </p>
        <p>{current.why}</p>
      </div>
      {current.noHelp ? null : (
        <div className="ob-help__need">
          <strong>Stuck on a question?</strong>
          <p>Skip it and keep going, or message your GoodGround project lead.</p>
          <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer" className="ob-help__wa">
            <Icon name="chat" size={16} stroke={2} />
            WhatsApp us
          </a>
        </div>
      )}
      <p className="ob-help__pass">
        <Icon name="lock" size={18} stroke={2} />
        Please don’t type passwords anywhere in this form. We’ll send you a secure way to share access.
      </p>
    </aside>
  ) : null;

  const footer = current ? (
    <div className="ob-foot">
      <Button variant="outline" onClick={() => go(stepN - 1, { dir: "back" })} disabled={stepN === 1}>
        Back
      </Button>
      <span className="ob-foot__spacer" />
      <button type="button" className="ob-foot__skip" onClick={() => go(stepN + 1, { dir: "next" })}>
        Skip for now
      </button>
      <Button variant="coral" onClick={saveAndContinue}>
        {current.primary ?? "Save and continue"}
      </Button>
    </div>
  ) : null;

  const stepView = current ? (
    <div className="ob-main">
      <section key={current.n} className={`ob-stepcard ob-stepcard--${direction}`} aria-labelledby="ob-step-title">
        <header className="ob-stephead">
          <p className="ob-stephead__meta">
            <span className="gg-kicker">
              STEP {current.n} OF {TOTAL_STEPS}
            </span>
            <span>· about {current.minutes} min</span>
          </p>
          <h2 id="ob-step-title" ref={title} tabIndex={-1}>
            {current.title}
          </h2>
          <p>{current.intro}</p>
        </header>
        <StepFields step={current} ctx={ctx} errors={errors} setError={setError} />
      </section>
      {footer}
    </div>
  ) : null;

  /* ================================================================ REVIEW */
  const reviewRows = steps.map((s) => ({ s, st: stats[s.n] }));
  const review = (
    <div className="ob-main ob-main--wide">
      <section key="review" className={`ob-stepcard ob-stepcard--${direction} ob-review`} aria-labelledby="ob-step-title">
        <header className="ob-stephead">
          <p className="ob-stephead__meta">
            <span className="gg-kicker">
              STEP {REVIEW_STEP} OF {TOTAL_STEPS}
            </span>
          </p>
          <h2 id="ob-step-title" ref={title} tabIndex={-1}>
            Review and send
          </h2>
          <p className="ob-hide-phone">Check what’s missing, confirm the details below, then send. You can still send with gaps; we’ll follow up on anything we need.</p>
        </header>

        <div className="ob-complete">
          <Ring percent={summary.percent} />
          <p>
            <strong>{summary.percent === 100 ? (who ? `All set, ${who}` : "All set") : who ? `Almost there, ${who}` : "Almost there"}</strong>
            <span>
              {reviewRows.filter((r) => r.st.missing.length === 0).length} of {steps.length} sections complete · {summary.missing.length} required answer{summary.missing.length === 1 ? "" : "s"} missing
            </span>
          </p>
        </div>

        {summary.missing.length ? (
          <section className="ob-missing" aria-labelledby="ob-missing-title">
            <p id="ob-missing-title">
              <Icon name="alert" size={20} stroke={2} />
              <strong>
                {summary.missing.length} required answer{summary.missing.length === 1 ? "" : "s"} missing
              </strong>
            </p>
            <ul>
              {summary.missing.map((m) => (
                <li key={m.id}>
                  <span>
                    <small className="gg-kicker">{m.section.toUpperCase()}</small>
                    {m.label}
                  </span>
                  <button type="button" onClick={() => go(m.step, { focusId: m.id })}>
                    Answer now →
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <ul className="ob-sections">
          {reviewRows.map(({ s, st }) => (
            <li key={s.n}>
              <span className={st.missing.length ? "ob-sections__chip is-missing" : "ob-sections__chip"} aria-hidden="true">
                <Icon name={st.missing.length ? "alert" : "check"} size={14} stroke={2.6} />
              </span>
              <span className="ob-sections__name">
                <small className="gg-kicker">{String(s.n).padStart(2, "0")}</small> {s.name}
              </span>
              <span className={st.missing.length ? "ob-sections__pill is-missing" : "ob-sections__pill"}>
                {st.missing.length ? `${st.missing.length} required missing` : `Complete${st.optionalSkipped ? ` · ${st.optionalSkipped} optional skipped` : ""}`}
              </span>
              <button type="button" className="ob-sections__edit" onClick={() => go(s.n)}>
                <Icon name="pen" size={14} stroke={2} />
                Edit<span className="gg-sr-only"> {s.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <fieldset className="ob-confirm">
          <legend>Please confirm</legend>
          {(
            [
              ["accuracy", "The information in this brief is accurate to the best of my knowledge.", "The information is accurate."],
              ["rights", "I have the right to use the logos, photos and text I’ve provided, or I’ve noted where I’m unsure.", "I have the right to use what I’ve provided."],
              ["use", "I agree that GoodGround may use this information to deliver my project, as described in the privacy note.", "GoodGround may use it to deliver my project."],
            ] as const
          ).map(([key, long, short]) => (
            <label key={key} className={consents[key] ? "ob-consent is-on" : "ob-consent"}>
              <input type="checkbox" checked={consents[key]} onChange={(e) => setConsents((c) => ({ ...c, [key]: e.target.checked }))} />
              <span className="ob-consent__box" aria-hidden="true">
                <Icon name="check" size={13} stroke={3} />
              </span>
              <span>
                <span className="ob-hide-phone">{long}</span>
                <span className="ob-phone-only">{short}</span>
              </span>
            </label>
          ))}
          <Link href="/legal#privacy" target="_blank" className="ob-confirm__note">
            <Icon name="eye" size={16} stroke={2} />
            Read the privacy note
          </Link>
        </fieldset>

        <Field label="Your name, to confirm" name="confirmName" idPrefix="ob" value={confirmName} autoComplete="name" onChange={(e) => setConfirmName(e.target.value)} placeholder="Type your full name" />

        {sendError ? (
          <p className="ob-senderror" role="alert">
            <Icon name="alert" size={18} stroke={2} />
            {sendError}
          </p>
        ) : null}

        <div className="ob-send">
          <Button variant="outline" onClick={() => go(REVIEW_STEP - 1, { dir: "back" })}>
            Back
          </Button>
          <span className="ob-foot__spacer" />
          <button type="button" className="ob-send__pdf" onClick={printBrief}>
            <Icon name="download" size={16} stroke={2} />
            <span className="ob-hide-phone">Download a PDF copy</span>
            <span className="ob-phone-only">PDF</span>
          </button>
          <Button variant="coral" onClick={() => void send()} disabled={!canSend}>
            {sending ? "Sending…" : "Send my brief"}
          </Button>
        </div>
      </section>
    </div>
  );

  /* ================================================================== SENT */
  const missingCount = summary.missing.length;
  const sent = (
    <div className="ob-sent">
      <section className="ob-sent__card" aria-labelledby="ob-sent-title">
        <span className="ob-sent__tick" aria-hidden="true">
          <Icon name="check" size={34} stroke={2.6} />
        </span>
        <h1 id="ob-sent-title" ref={title} tabIndex={-1}>
          {who ? `BRIEF RECEIVED. THANK YOU, ${who.toUpperCase()}.` : "BRIEF RECEIVED. THANK YOU."}
        </h1>
        <p>
          Your answers are with us. We’ve emailed you a copy. We’ll confirm we’ve read it within one working day.
        </p>
      </section>
      <section className="ob-next" aria-labelledby="ob-next-title">
        <h2 id="ob-next-title">What happens next</h2>
        <ol>
          {[
            ["cal", "We review your brief", missingCount ? `Within one working day we’ll confirm and follow up on the ${missingCount} missing answer${missingCount === 1 ? "" : "s"}.` : "Within one working day we’ll confirm we’ve read it."],
            ["lock", "We ask for access, securely", "A separate secure link for domain, hosting and email access. Never by email."],
            ["cal", "Kick-off call", "We walk through the plan, timeline and first designs."],
          ].map(([icon, t, d], i) => (
            <li key={t}>
              <span className="ob-next__icon" aria-hidden="true">
                <Icon name={icon as "cal"} size={20} stroke={2} />
              </span>
              <p>
                <strong>
                  {String(i + 1).padStart(2, "0")} {t}
                </strong>
                <small>{d}</small>
              </p>
            </li>
          ))}
        </ol>
      </section>
      <div className="ob-sent__actions">
        <Button variant="outline" onClick={printBrief}>
          Download a PDF copy
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            update({ sent: false, step: 1, started: true }, true);
          }}
        >
          Edit my answers
        </Button>
      </div>
      <p className="ob-sent__note">You can keep editing until your kick-off call. After that, changes go through your project lead.</p>
    </div>
  );

  /* ============================================================ the print copy */
  const printView = (
    <div className="ob-print" aria-hidden="true">
      <h1>Client onboarding brief{business ? ` · ${business}` : ""}</h1>
      {quote ? <p>{[quote.package, quote.price, quote.payment].filter(Boolean).join(" · ")}</p> : null}
      {briefSections(a).map((section) => (
        <section key={section.n}>
          <h2>
            {String(section.n).padStart(2, "0")} {section.name}
          </h2>
          {section.items.map((item) => (
            <div key={item.label}>
              <h3>{item.label}</h3>
              {item.blank ? <p><em>Not answered.</em></p> : item.lines.map((line, i) => <p key={i}>{line}</p>)}
            </div>
          ))}
        </section>
      ))}
    </div>
  );

  /* ================================================================ layout */
  const showStepper = view === "step";
  const showHelp = view === "step" && stepN !== REVIEW_STEP;

  if (!ready) {
    return (
      <div className="ob" data-ready="false">
        <header className="ob-top">
          <Link href="/" className="ob-top__logo" aria-label="GoodGround home">
            goodground
          </Link>
          <p className="ob-top__title">
            <strong>Client onboarding</strong>
            <span>Loading your brief…</span>
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className="ob" data-ready="true" data-view={view}>
      <a className="gg-skip-link" href="#ob-content">
        Skip to the form
      </a>
      {topbar}
      {phoneHeader}
      <p className="gg-sr-only" role="status" aria-live="polite">
        {announce}
      </p>
      <div className={`ob-body${showStepper ? " ob-body--steps" : ""}${showHelp ? " ob-body--help" : ""}`}>
        {showStepper ? stepper : null}
        <main id="ob-content" className="ob-content">
          {view === "welcome" ? welcome : view === "sent" ? sent : stepN === REVIEW_STEP ? review : stepView}
        </main>
        {showHelp ? help : null}
      </div>
      {view === "step" ? (
        <div className="ob-phonefoot">
          {stepN === REVIEW_STEP ? (
            <>
              <Button variant="outline" onClick={() => go(REVIEW_STEP - 1, { dir: "back" })}>
                Back
              </Button>
              <Button variant="coral" onClick={() => void send()} disabled={!canSend}>
                {sending ? "Sending…" : "Send my brief"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => go(stepN - 1, { dir: "back" })} disabled={stepN === 1}>
                Back
              </Button>
              <Button variant="coral" onClick={saveAndContinue}>
                {current?.primary ?? "Save and continue"}
              </Button>
            </>
          )}
        </div>
      ) : null}
      {sheets}
      <div className={toast.on ? "ob-toast is-on" : "ob-toast"} role="status">
        {toast.on ? (
          <>
            <Icon name="check" size={16} stroke={2.6} />
            {toast.message}
            {toast.undo ? (
              <button
                type="button"
                onClick={() => {
                  toast.undo?.();
                  setToast((t) => ({ ...t, on: false }));
                }}
              >
                Undo
              </button>
            ) : null}
          </>
        ) : null}
      </div>
      {printView}
    </div>
  );
}
