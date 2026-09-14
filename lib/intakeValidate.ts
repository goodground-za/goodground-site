import { intakeFields, type IntakeField } from "@/content/launchIntake";

/**
 * Validation for the launch-offer intake form.
 *
 * ONE COPY, IMPORTED BY BOTH SIDES. The browser runs this for fast feedback and
 * the route handler runs the same function on the submitted body. The server
 * result is the one that decides anything; the client call only saves someone a
 * round trip. Because it is literally the same function, the two cannot drift
 * into disagreeing about which questions are required — which is the failure a
 * fifty-three field form invites when each side keeps its own list.
 */

/** Checkbox groups arrive as one string. Options contain commas, this cannot. */
export const MULTI_SEPARATOR = " | ";

export const splitMulti = (value: string): string[] =>
  value.split(MULTI_SEPARATOR).map((v) => v.trim()).filter(Boolean);

export type IntakeErrors = Record<string, string>;
/** Reads one submitted answer. Checkbox groups come back already joined. */
export type Reader = (id: string) => string;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Deliberately loose: people write numbers in every imaginable shape. */
const PHONE = /^[0-9+()\s.\-]{6,}$/;

/**
 * Whether a conditional question currently applies.
 *
 * A hidden question is never required and its value is never validated. Both
 * the renderer and the validator call this, so a question cannot be hidden on
 * screen while still blocking submission — a bug that is invisible to the
 * person filling the form and impossible for them to fix.
 */
export function isVisible(field: IntakeField, read: Reader): boolean {
  if (!field.showIf) return true;
  return field.showIf.equals.includes(read(field.showIf.field).trim());
}

function checkOne(field: IntakeField, read: Reader): string | null {
  const raw = read(field.id).trim();

  if (field.type === "checkboxes") {
    const chosen = splitMulti(raw);
    if (field.required && chosen.length === 0) return "Please choose at least one.";
    if (chosen.length > field.max) return `Please choose no more than ${field.max}.`;
    // An option we never offered means a tampered payload, not a typo.
    const unknown = chosen.filter((c) => !(field.options ?? []).includes(c));
    if (unknown.length > 0) return "That choice is not one of the options.";
    return null;
  }

  if (field.type === "radio") {
    if (!raw) return field.required ? "Please choose one." : null;
    if (!(field.options ?? []).includes(raw)) return "That choice is not one of the options.";
    return null;
  }

  if (!raw) return field.required ? "Please answer this one." : null;
  if (raw.length > field.max) return "That is a bit too long — please shorten it.";
  if (field.type === "email" && !EMAIL.test(raw)) return "That email address does not look right.";
  if (field.type === "tel" && !PHONE.test(raw)) return "That phone number does not look right.";
  return null;
}

/**
 * Validate every visible question.
 *
 * Returns a map of field id to message. An empty map means the submission is
 * structurally sound — it says nothing about whether the answers are true,
 * which is not something a form can check.
 */
export function validateIntake(read: Reader): IntakeErrors {
  const errors: IntakeErrors = {};
  for (const field of intakeFields) {
    if (!isVisible(field, read)) continue;
    const problem = checkOne(field, read);
    if (problem) errors[field.id] = problem;
  }
  if (read("confirm") !== "confirmed") {
    errors.confirm = "Please confirm your answers before sending.";
  }
  return errors;
}

/** Section ids whose questions currently hold an error. Drives the progress list. */
export function sectionsWithErrors(
  errors: IntakeErrors,
  sections: readonly { id: string; fields: readonly IntakeField[] }[],
): Set<string> {
  const bad = new Set<string>();
  for (const section of sections) {
    if (section.fields.some((f) => errors[f.id])) bad.add(section.id);
  }
  return bad;
}
