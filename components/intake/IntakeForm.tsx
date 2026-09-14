"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { intakeCopy, intakeRoute, intakeSections, intakeFields } from "@/content/launchIntake";
import { isVisible, validateIntake, type IntakeErrors } from "@/lib/intakeValidate";
import { promoEvents } from "@/lib/analytics";
import { IntakeField } from "./IntakeField";
import { IntakeProgress } from "./IntakeProgress";

/**
 * The launch-offer intake form.
 *
 * SUBMISSION IS NEVER SIMULATED. The thank-you panel appears only after
 * /api/launch-intake returns ok, which only happens after the delivery provider
 * accepted the message. No timer, no optimistic state, no client-only success.
 *
 * IT WORKS WITHOUT JAVASCRIPT. This is a real form with an action and a method.
 * Unhydrated, the browser posts it normally and the route answers with a
 * redirect to a confirmation page. Hydrated, the submit is intercepted and the
 * same route answers JSON, which buys per-question errors and keeps the person
 * on the page with everything they typed intact.
 *
 * ANSWERS SAVE AS THEY TYPE. Fifty-three questions is more than one sitting,
 * and losing it to a closed tab would be the end of that lead. The draft lives
 * in this browser's localStorage — their own machine, never sent anywhere until
 * they submit, cleared the moment a submission succeeds. Storage can throw
 * (private mode, blocked site data), so every read and write is guarded and the
 * form works normally when it does.
 *
 * NO PERSONAL DETAIL REACHES ANALYTICS. The events carry a failure reason and
 * nothing else. Never a name, an email address or anything anyone typed.
 */

const STORAGE_KEY = "gg-launch-intake-draft-v1";
const SAVE_DEBOUNCE_MS = 600;

type Status = "idle" | "submitting" | "success" | "error";
type Answers = Record<string, string>;

const emptyAnswers = (): Answers => Object.fromEntries(intakeFields.map((f) => [f.id, ""]));

/**
 * The stored draft, read as an external store rather than in an effect.
 *
 * The obvious version of this — an effect that reads localStorage and calls
 * setState — is a cascading render on every mount, and React now flags it. The
 * store below returns the raw JSON string, so React's identity check is a value
 * check and the snapshot is stable without any caching. The server snapshot is
 * null because the server cannot know what is in someone's browser; the form
 * then remounts once with the draft applied, which is also what keeps the
 * server and client HTML identical on that first render.
 */
const draftStore = {
  subscribe() {
    // Nothing external changes it while the form is open. Another tab writing
    // its own draft should not overwrite what is being typed here.
    return () => {};
  },
  getSnapshot(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  },
  getServerSnapshot(): string | null {
    return null;
  },
};

/** Merge a stored draft over a blank form, keeping only ids the form defines. */
function answersFromDraft(raw: string | null): Answers {
  const answers = emptyAnswers();
  if (!raw) return answers;
  try {
    const parsed = JSON.parse(raw) as Partial<Answers>;
    // A question removed from the form should not come back to life out of
    // somebody's old draft, so this walks the definition rather than the draft.
    for (const field of intakeFields) {
      const value = parsed[field.id];
      if (typeof value === "string") answers[field.id] = value;
    }
  } catch {
    // Unreadable draft. A blank form is the correct fallback.
  }
  return answers;
}

export function IntakeForm() {
  const raw = useSyncExternalStore(
    draftStore.subscribe,
    draftStore.getSnapshot,
    draftStore.getServerSnapshot,
  );
  // Remounting on the key is what lets the inner form take the draft as its
  // initial state instead of being patched into shape after the fact.
  return <IntakeFormInner key={raw ? "draft" : "blank"} initial={answersFromDraft(raw)} />;
}

function IntakeFormInner({ initial }: { initial: Answers }) {
  const [answers, setAnswers] = useState<Answers>(initial);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<IntakeErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [saved, setSaved] = useState<"clean" | "saving" | "saved">("clean");
  const started = useRef(false);
  const converted = useRef(false);
  /** Nothing is written, and nothing claims to be saved, until a real edit. */
  const dirty = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  /*
   * Debounced autosave. "saving" is set by the change handler, where the change
   * actually happens, so this effect body calls no setter — it only schedules
   * the write and reports the result from inside the callback.
   */
  useEffect(() => {
    // Without the dirty guard this fires on mount and the rail says "Saved"
    // over a form nobody has touched, which is a claim about their answers
    // that is not yet true.
    if (status === "success" || !dirty.current) return;
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
        setSaved("saved");
      } catch {
        // Storage full or blocked. The form still works; it just will not
        // survive a closed tab, so we stop claiming that it saved.
        setSaved("clean");
      }
    }, SAVE_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [answers, status]);

  /*
   * noValidate is set HERE rather than in the markup, so it only applies once
   * JavaScript is running. Unhydrated, the attribute is absent and the browser
   * enforces the required questions itself — which matters, because without JS
   * a rejected submission is a redirect that loses everything typed. Hydrated,
   * this turns the native bubbles off and the inline per-question errors take
   * over. Mutating a DOM property is exactly what an effect is for.
   */
  useEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
  }, []);

  const clearDraft = () => {
    if (!window.confirm(intakeCopy.clearConfirm)) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clear.
    }
    dirty.current = false;
    setAnswers(emptyAnswers());
    setConfirmed(false);
    setErrors({});
    setSaved("clean");
  };

  const read = useCallback(
    (id: string) => (id === "confirm" ? (confirmed ? "confirmed" : "") : answers[id] ?? ""),
    [answers, confirmed],
  );

  /** Questions whose controlling answer currently shows them. */
  const visible = useMemo(() => {
    const set = new Set<string>();
    for (const field of intakeFields) if (isVisible(field, read)) set.add(field.id);
    return set;
  }, [read]);

  /**
   * Progress counts only required questions that are actually on screen, so
   * revealing a conditional question cannot make the bar jump backwards.
   */
  const progress = useMemo(() => {
    const required = intakeFields.filter((f) => f.required && visible.has(f.id));
    return {
      done: required.filter((f) => read(f.id).trim().length > 0).length,
      total: required.length,
    };
  }, [visible, read]);

  const sectionState = useMemo(() => {
    const map: Record<string, { done: number; total: number; bad: boolean }> = {};
    for (const section of intakeSections) {
      const required = section.fields.filter((f) => f.required && visible.has(f.id));
      map[section.id] = {
        done: required.filter((f) => read(f.id).trim().length > 0).length,
        total: required.length,
        bad: section.fields.some((f) => errors[f.id]),
      };
    }
    return map;
  }, [visible, read, errors]);

  const onChange = (id: string, value: string) => {
    if (!started.current) {
      started.current = true;
      promoEvents.formStart();
    }
    dirty.current = true;
    setSaved("saving");
    setAnswers((current) => ({ ...current, [id]: value }));
    // Clear this question's error the moment it is touched. A stale message
    // under a field someone is actively fixing reads as broken.
    setErrors((current) => {
      if (!current[id]) return current;
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const focusFirstError = (found: IntakeErrors) => {
    const first = Object.keys(found)[0];
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"], #gi-${first}`);
    el?.focus();
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validateIntake(read);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      promoEvents.formError("validation");
      focusFirstError(found);
      return;
    }

    setStatus("submitting");

    // Built from state rather than FormData, so the multi-select joining is
    // exactly what the shared validator and the server expect, whatever order
    // the DOM happens to be in.
    const payload: Record<string, string> = { confirm: "confirmed" };
    for (const field of intakeFields) {
      if (visible.has(field.id)) payload[field.id] = answers[field.id] ?? "";
    }

    let response: Response;
    try {
      response = await fetch(intakeRoute.api, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      setStatus("error");
      promoEvents.formError("network");
      return;
    }

    let body: { ok?: boolean; errors?: IntakeErrors } = {};
    try {
      body = await response.json();
    } catch {
      // A non-JSON body is a failure like any other.
    }

    if (response.ok && body.ok) {
      if (!converted.current) {
        converted.current = true;
        promoEvents.leadSuccess();
      }
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Nothing to clear.
      }
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (body.errors && Object.keys(body.errors).length > 0) {
      setErrors(body.errors);
      setStatus("idle");
      promoEvents.formError("validation");
      focusFirstError(body.errors);
      return;
    }

    setStatus("error");
    promoEvents.formError("server");
  }

  if (status === "success") {
    return (
      <div className="gg-intake__done" role="status">
        <h2>Thank you.</h2>
        <p>{intakeCopy.success}</p>
        <Link className="gg-intake__btn" href="/">
          Back to the GoodGround home page
        </Link>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <div className="gg-intake__layout">
      <IntakeProgress
        sectionState={sectionState}
        progress={progress}
        saved={saved}
        onClear={clearDraft}
      />

      <form
        ref={formRef}
        className="gg-intake__form"
        action={intakeRoute.api}
        method="post"
        onSubmit={onSubmit}
      >
        {/* Honeypot. Off-screen rather than hidden, and never announced. */}
        <div className="gg-intake__hp" aria-hidden="true">
          <label htmlFor="gi-company-website">Do not fill this in</label>
          <input
            id="gi-company-website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {intakeSections.map((section) => (
          <section
            className="gg-intake__section"
            id={`section-${section.id}`}
            key={section.id}
            aria-labelledby={`title-${section.id}`}
          >
            <header className="gg-intake__section-head">
              <p className="gg-intake__section-num">
                Section {section.number} of {intakeSections.length}
              </p>
              <h2 className="gg-intake__section-title" id={`title-${section.id}`}>
                {section.title}
              </h2>
              <p className="gg-intake__section-intro">{section.intro}</p>
            </header>

            <div className="gg-intake__fields">
              {section.fields.map((field) =>
                visible.has(field.id) ? (
                  <div
                    className={`gg-intake__cell${field.half ? " gg-intake__cell--half" : ""}`}
                    key={field.id}
                  >
                    <IntakeField
                      field={field}
                      value={answers[field.id] ?? ""}
                      error={errors[field.id]}
                      onChange={onChange}
                    />
                  </div>
                ) : null,
              )}
            </div>
          </section>
        ))}

        <section
          className="gg-intake__section gg-intake__section--send"
          aria-labelledby="title-send"
        >
          <h2 className="gg-intake__section-title" id="title-send">
            Send it to us
          </h2>

          <div className={`gg-intake__check${errors.confirm ? " is-invalid" : ""}`}>
            <input
              id="gi-confirm"
              name="confirm"
              type="checkbox"
              value="confirmed"
              checked={confirmed}
              onChange={(e) => {
                setConfirmed(e.target.checked);
                setErrors((c) => {
                  if (!c.confirm) return c;
                  const next = { ...c };
                  delete next.confirm;
                  return next;
                });
              }}
              aria-invalid={errors.confirm ? true : undefined}
              aria-describedby={errors.confirm ? "gi-confirm-error" : undefined}
            />
            <div>
              <label htmlFor="gi-confirm">{intakeCopy.confirmLabel}</label>
              {errors.confirm ? (
                <p className="gg-intake__error" id="gi-confirm-error">
                  {errors.confirm}
                </p>
              ) : null}
            </div>
          </div>

          <p className="gg-intake__privacy">
            We use these answers to build your website and to talk to you about it. See our{" "}
            <Link href="/legal#privacy">privacy policy</Link>.
          </p>

          <button
            type="submit"
            className="gg-intake__btn gg-intake__submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? intakeCopy.submitting : intakeCopy.submit}
          </button>

          <p className="gg-intake__support">{intakeCopy.submitSupport}</p>

          {/* Always present, so a screen reader hears a change of state rather
              than the arrival of a whole new region. */}
          <div role="status" aria-live="polite">
            {errorCount > 0 ? (
              <div className="gg-intake__status gg-intake__status--bad">
                <p>{intakeCopy.incomplete}</p>
              </div>
            ) : null}
            {status === "error" ? (
              <div className="gg-intake__status gg-intake__status--bad">
                <p>{intakeCopy.failure}</p>
              </div>
            ) : null}
            {status === "submitting" ? (
              <span className="gg-intake__hp">Sending your form.</span>
            ) : null}
          </div>
        </section>
      </form>
    </div>
  );
}
