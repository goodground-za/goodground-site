"use client";

import { intakeCopy, intakeSections } from "@/content/launchIntake";

/**
 * The progress rail beside the form.
 *
 * WHY A LONG FORM NEEDS THIS. The reason people abandon a form like this is not
 * the number of questions, it is not knowing how many are left. The bar counts
 * only required questions that are currently on screen; the list shows which
 * sections are finished and which still hold an error, and every entry is a
 * plain fragment link so it works before hydration and with the keyboard.
 *
 * On a narrow screen it stops being a sidebar and sits above the form as a
 * compact summary, because a sticky rail on a phone would eat the screen the
 * person is trying to type into.
 */

type SectionState = Record<string, { done: number; total: number; bad: boolean }>;

export function IntakeProgress({
  sectionState,
  progress,
  saved,
  onClear,
}: {
  sectionState: SectionState;
  progress: { done: number; total: number };
  saved: "clean" | "saving" | "saved";
  onClear: () => void;
}) {
  const pct = progress.total === 0 ? 0 : Math.round((progress.done / progress.total) * 100);
  const countText = `${progress.done} of ${progress.total} required questions answered`;

  return (
    <aside className="gg-intake__aside" aria-label={intakeCopy.progressLabel}>
      <div className="gg-intake__aside-inner">
        <p className="gg-intake__aside-title" id="gi-progress-label">
          {intakeCopy.progressLabel}
        </p>

        {/* A progressbar needs an accessible NAME, not only a value text —
            aria-valuetext alone leaves it announced as an unnamed control.
            Pointed at the visible heading so the two cannot drift apart. */}
        <div
          className="gg-intake__bar"
          role="progressbar"
          aria-labelledby="gi-progress-label"
          aria-valuenow={progress.done}
          aria-valuemin={0}
          aria-valuemax={progress.total}
          aria-valuetext={countText}
        >
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="gg-intake__bar-text">{countText}</p>

        <ol className="gg-intake__steps">
          {intakeSections.map((section) => {
            const state = sectionState[section.id];
            const complete = state.total > 0 && state.done === state.total;
            return (
              <li
                key={section.id}
                data-complete={complete || undefined}
                data-bad={state.bad || undefined}
              >
                <a href={`#section-${section.id}`}>
                  <span className="gg-intake__step-mark" aria-hidden="true">
                    {complete ? "✓" : section.number}
                  </span>
                  <span className="gg-intake__step-name">{section.title}</span>
                  {state.bad ? <span className="sr-only"> — needs attention</span> : null}
                  {complete ? <span className="sr-only"> — complete</span> : null}
                </a>
              </li>
            );
          })}
        </ol>

        {/* aria-live so the save state is announced without moving focus. */}
        <p className="gg-intake__saved" data-state={saved} role="status" aria-live="polite">
          {saved === "saving" ? intakeCopy.savingLabel : saved === "saved" ? intakeCopy.savedLabel : ""}
        </p>
        <p className="gg-intake__draft-note">{intakeCopy.draftNote}</p>
        <button type="button" className="gg-intake__clear" onClick={onClear}>
          {intakeCopy.clearDraft}
        </button>
      </div>
    </aside>
  );
}
