"use client";

import { intakeCopy, type IntakeField as Field } from "@/content/launchIntake";
import { MULTI_SEPARATOR, splitMulti } from "@/lib/intakeValidate";

/**
 * One question.
 *
 * Rendered from the definition in content/launchIntake.ts rather than written
 * out by hand, so all fifty-three questions get the same label association,
 * the same error wiring and the same describedby plumbing without any of it
 * being retyped fifty-three times.
 *
 * The help text is a real element referenced by aria-describedby, not a
 * placeholder. Placeholder text disappears the moment someone starts typing,
 * which is exactly when a person filling in an unfamiliar form wants to
 * re-read it.
 */

type Props = {
  field: Field;
  value: string;
  error?: string;
  onChange: (id: string, value: string) => void;
};

export function IntakeField({ field, value, error, onChange }: Props) {
  const inputId = `gi-${field.id}`;
  const helpId = field.help ? `${inputId}-help` : null;
  const errorId = error ? `${inputId}-error` : null;
  const describedBy = [errorId, helpId].filter(Boolean).join(" ") || undefined;

  const label = (
    <>
      {field.label}{" "}
      {field.required ? (
        <span className="gg-intake__req" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="gg-intake__opt">({intakeCopy.optionalNote})</span>
      )}
    </>
  );

  const shared = {
    id: inputId,
    name: field.id,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy,
    "aria-required": field.required || undefined,
  };

  /* Radios and checkboxes are grouped in a fieldset so a screen reader reads
     the question before the options, instead of announcing nine bare labels. */
  if (field.type === "radio" || field.type === "checkboxes") {
    const chosen = field.type === "checkboxes" ? splitMulti(value) : [value];

    const toggle = (option: string, on: boolean) => {
      if (field.type === "radio") return onChange(field.id, option);
      const next = on ? [...chosen, option] : chosen.filter((c) => c !== option);
      // Kept in the definition's own order so the emailed brief always reads
      // the same way regardless of the order someone happened to tick them.
      const ordered = (field.options ?? []).filter((o) => next.includes(o));
      onChange(field.id, ordered.join(MULTI_SEPARATOR));
    };

    return (
      <fieldset
        className={`gg-intake__field gg-intake__field--group${error ? " is-invalid" : ""}`}
        aria-describedby={describedBy}
      >
        <legend className="gg-intake__label">{label}</legend>
        {field.help ? (
          <p className="gg-intake__help" id={helpId ?? undefined}>
            {field.help}
          </p>
        ) : null}
        {error ? (
          <p className="gg-intake__error" id={errorId ?? undefined}>
            {error}
          </p>
        ) : null}

        {/* Short options in a long list go into columns. Fifteen one-word
            choices stacked full width is a wall of scrolling for no reason;
            a long-sentence option still gets its own full-width row, because
            two of those side by side is genuinely harder to read. */}
        <div
          className={`gg-intake__options${
            field.swatches
              ? " gg-intake__options--swatch"
              : (field.options ?? []).length >= 7 &&
                  (field.options ?? []).every((o) => o.length <= 30)
                ? " gg-intake__options--grid"
                : ""
          }`}
        >
          {(field.options ?? []).map((option) => {
            const id = `${inputId}-${option.replace(/\W+/g, "-").toLowerCase()}`;
            const on = chosen.includes(option);
            return (
              <label className="gg-intake__option" key={option} htmlFor={id}>
                <input
                  id={id}
                  type={field.type === "radio" ? "radio" : "checkbox"}
                  name={field.id}
                  /* Native required on every radio in a group is how the
                     browser enforces "pick one" without JavaScript. Checkbox
                     groups get none: there it would mean "tick them all". */
                  required={field.type === "radio" ? field.required : undefined}
                  value={option}
                  checked={on}
                  onChange={(e) => toggle(option, e.target.checked)}
                />
                {field.swatches ? (
                  <span
                    className="gg-intake__swatch"
                    style={{ background: field.swatches[option] }}
                    aria-hidden="true"
                  />
                ) : null}
                <span>{option}</span>
              </label>
            );
          })}
        </div>
        {field.type === "checkboxes" && !field.help ? (
          <p className="gg-intake__help">{intakeCopy.chooseUpTo(field.max)}</p>
        ) : null}
      </fieldset>
    );
  }

  return (
    <div className={`gg-intake__field${error ? " is-invalid" : ""}`}>
      <label className="gg-intake__label" htmlFor={inputId}>
        {label}
      </label>
      {field.help ? (
        <p className="gg-intake__help" id={helpId ?? undefined}>
          {field.help}
        </p>
      ) : null}
      {error ? (
        <p className="gg-intake__error" id={errorId ?? undefined}>
          {error}
        </p>
      ) : null}

      {field.type === "textarea" ? (
        <textarea
          {...shared}
          required={field.required}
          rows={field.rows ?? 4}
          maxLength={field.max}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      ) : (
        <input
          {...shared}
          required={field.required}
          type={field.type}
          inputMode={field.type === "tel" ? "tel" : field.type === "email" ? "email" : undefined}
          autoComplete={autoCompleteFor(field.id)}
          maxLength={field.max}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}
    </div>
  );
}

/**
 * Browser autofill for the handful of fields it can genuinely help with.
 * Everything else gets nothing rather than a guess, because a wrong autofill
 * on a business question is worse than no autofill at all.
 */
function autoCompleteFor(id: string): string | undefined {
  switch (id) {
    case "your_name":
      return "name";
    case "email":
      return "email";
    case "phone":
      return "tel";
    case "business_name":
      return "organization";
    default:
      return "off";
  }
}
