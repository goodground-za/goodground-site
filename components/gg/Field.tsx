import type { ComponentProps, ReactNode } from "react";

/**
 * Form/Field (README): a label row (label + "Optional"), the control, and an
 * inline error. Inputs are canvas-filled with a line border, 14px radius and a
 * 50px minimum height (46 on phones); the error ties to the control with
 * aria-describedby and aria-invalid.
 *
 * Uncontrolled by default (forms read FormData on submit).
 */
type Common = {
  label: string;
  name: string;
  /** Prefix for the control id, so two forms on one page never share ids. */
  idPrefix?: string;
  optional?: boolean;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  className?: string;
};

function Label({ htmlFor, label, optional, required }: { htmlFor: string; label: string; optional?: boolean; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="gg-field__label">
      <span>
        {label}
        {required ? <span className="gg-field__req" aria-hidden="true"> *</span> : null}
      </span>
      {optional ? <span className="gg-field__opt">Optional</span> : null}
    </label>
  );
}

export function Field({
  label,
  name,
  idPrefix = "f",
  optional,
  required,
  error,
  hint,
  className,
  type = "text",
  ...rest
}: Common & Omit<ComponentProps<"input">, "name" | "className" | "id">) {
  const id = `${idPrefix}-${name}`;
  const described = [error ? `${id}-error` : "", hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className ? `gg-field ${className}` : "gg-field"}>
      <Label htmlFor={id} label={label} optional={optional} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        data-field={name}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={described}
        className="gg-field__control"
        {...rest}
      />
      {hint ? (
        <p id={`${id}-hint`} className="gg-field__hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="gg-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextArea({
  label,
  name,
  idPrefix = "f",
  optional,
  required,
  error,
  hint,
  className,
  rows = 4,
  ...rest
}: Common & Omit<ComponentProps<"textarea">, "name" | "className" | "id">) {
  const id = `${idPrefix}-${name}`;
  const described = [error ? `${id}-error` : "", hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className ? `gg-field ${className}` : "gg-field"}>
      <Label htmlFor={id} label={label} optional={optional} required={required} />
      <textarea
        id={id}
        name={name}
        rows={rows}
        data-field={name}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={described}
        className="gg-field__control gg-field__control--area"
        {...rest}
      />
      {hint ? (
        <p id={`${id}-hint`} className="gg-field__hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="gg-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** A required confirmation tick (Website launch eligibility). The box is custom, the input is real. */
export function CheckField({
  label,
  name,
  idPrefix = "f",
  required,
  error,
  className,
  value,
}: {
  label: ReactNode;
  name: string;
  idPrefix?: string;
  /** What the box submits when ticked (default "on"). */
  value?: string;
  required?: boolean;
  error?: string;
  className?: string;
}) {
  const id = `${idPrefix}-${name}`;
  return (
    <div className={className ? `gg-check ${className}` : "gg-check"}>
      <label className="gg-check__row" htmlFor={id}>
        <input
          id={id}
          name={name}
          type="checkbox"
          value={value}
          data-field={name}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="gg-check__input"
        />
        <span className="gg-check__box" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3.5 8.5 3 3 6-7" />
          </svg>
        </span>
        <span className="gg-check__text">{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="gg-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
