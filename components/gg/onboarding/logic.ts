/**
 * Pure helpers for the onboarding brief: answers, visibility, completion, format checks and the
 * Markdown brief. No React and no browser APIs, so the server route imports the same code the
 * form ran.
 */
import { steps, type Cond, type Field, type Step } from "./steps";

export type Row = { _id: string } & Record<string, string>;
export type Value = string | string[] | Row[];
export type Answers = Record<string, Value>;

export const str = (a: Answers, id: string): string => (typeof a[id] === "string" ? (a[id] as string) : "");
export const strs = (a: Answers, id: string): string[] => (Array.isArray(a[id]) && (a[id] as unknown[]).every((v) => typeof v === "string") ? (a[id] as string[]) : []);
export const rowsOf = (a: Answers, id: string): Row[] => (Array.isArray(a[id]) ? (a[id] as Row[]).filter((r) => r && typeof r === "object" && "_id" in r) : []);

const nonEmpty = (value: Value | undefined): boolean => {
  if (value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return value.length > 0;
};

export function isShown(show: Cond[] | undefined, a: Answers): boolean {
  if (!show) return true;
  return show.every((c) => {
    const v = a[c.id];
    if (c.filled) return nonEmpty(v);
    if (c.eq !== undefined) return str(a, c.id) === c.eq;
    if (c.ne !== undefined) return str(a, c.id) !== c.ne;
    if (c.in) return c.in.includes(str(a, c.id));
    if (c.includes) return strs(a, c.id).includes(c.includes);
    if (c.includesAny) return strs(a, c.id).some((x) => c.includesAny!.includes(x));
    return true;
  });
}

type InputField = Exclude<Field, { kind: "group" | "note" | "quote" }>;
const isInput = (f: Field): f is InputField => f.kind !== "group" && f.kind !== "note" && f.kind !== "quote";

export const visibleFields = (step: Step, a: Answers): Field[] => step.fields.filter((f) => ("show" in f ? isShown(f.show, a) : true));

/** True when the field has an answer. A repeat is answered when a row has a required inner field filled (or any inner field when none is required). */
export function isAnswered(field: InputField, a: Answers): boolean {
  if (field.kind === "repeat") {
    const rows = rowsOf(a, field.id);
    const requiredInner = field.fields.filter((f) => "req" in f && f.req);
    return rows.some((row) => (requiredInner.length ? requiredInner.every((f) => (row[f.id] ?? "").trim()) : field.fields.some((f) => (row[f.id] ?? "").trim())));
  }
  if (field.kind === "colors") return rowsOf(a, field.id).some((r) => (r.hex ?? "").trim());
  return nonEmpty(a[field.id]);
}

export type Missing = { step: number; section: string; label: string; id: string };

export type StepStats = { required: number; answeredRequired: number; missing: Missing[]; optionalSkipped: number };

export function stepStats(step: Step, a: Answers): StepStats {
  const stats: StepStats = { required: 0, answeredRequired: 0, missing: [], optionalSkipped: 0 };
  for (const field of visibleFields(step, a)) {
    if (!isInput(field)) continue;
    const required = "req" in field && field.req;
    const answered = isAnswered(field, a);
    if (required) {
      stats.required += 1;
      if (answered) stats.answeredRequired += 1;
      else stats.missing.push({ step: step.n, section: step.name, label: field.label, id: field.id });
    } else if (!answered && field.kind !== "colors") {
      stats.optionalSkipped += 1;
    }
  }
  return stats;
}

export function overall(a: Answers) {
  let required = 0;
  let answered = 0;
  const missing: Missing[] = [];
  for (const step of steps) {
    const s = stepStats(step, a);
    required += s.required;
    answered += s.answeredRequired;
    missing.push(...s.missing);
  }
  return {
    percent: required === 0 ? 100 : Math.round((answered / required) * 100),
    required,
    answered,
    missing,
  };
}

/* ------------------------------------------------------------ format checks */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalise(kind: Field["kind"], value: string): string {
  const v = value.trim();
  if (kind === "url" && v && !/^[a-z][a-z0-9+.-]*:\/\//i.test(v)) return `https://${v}`;
  return v;
}

/** Format errors only (required answers are listed on Review, never as a blocking error). Empty string = fine. */
export function formatError(kind: Field["kind"], raw: string): string {
  const v = raw.trim();
  if (!v) return "";
  if (kind === "email" && !EMAIL_RE.test(v)) return "That email doesn’t look right. Check for a missing @ or dot.";
  if (kind === "tel") {
    const digits = v.replace(/[\s\-().]/g, "");
    if (!/^(\+27|0)\d{9}$/.test(digits) && !/^\+\d{8,15}$/.test(digits)) return "Use a South African number like 082 555 0142, or +27 82 555 0142.";
  }
  if (kind === "url") {
    try {
      const url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? v : `https://${v}`);
      if (!url.hostname.includes(".")) return "That link doesn’t look right. Paste the full address.";
    } catch {
      return "That link doesn’t look right. Paste the full address.";
    }
  }
  return "";
}

/* ----------------------------------------------------------------- the brief */

export type BriefItem = { label: string; lines: string[]; blank: boolean; bullets?: boolean };
export type BriefSection = { n: number; name: string; items: BriefItem[] };

const clean = (value: string) =>
  value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();

export function briefSections(a: Answers): BriefSection[] {
  return steps.map((step) => {
    const items: BriefItem[] = [];
    for (const field of visibleFields(step, a)) {
      if (!isInput(field)) continue;
      if (field.kind === "repeat") {
        const rows = rowsOf(a, field.id).filter((r) => field.fields.some((f) => (r[f.id] ?? "").trim()));
        const lines = rows.flatMap((row, i) => [
          `${field.item} ${i + 1}`,
          ...field.fields.flatMap((f) => (f.kind === "group" || f.kind === "note" || f.kind === "quote" ? [] : [f])).flatMap((f) => ((row[f.id] ?? "").trim() ? [`  ${f.label}: ${clean(row[f.id])}`] : [])),
        ]);
        items.push({ label: field.label, lines, blank: lines.length === 0 });
        continue;
      }
      if (field.kind === "colors") {
        const rows = rowsOf(a, field.id).filter((r) => (r.hex ?? "").trim());
        const lines = rows.map((r) => `${clean(r.hex)}${r.name ? ` · ${clean(r.name)}` : ""}${r.use ? ` · ${clean(r.use)}` : ""}`);
        items.push({ label: field.label, lines, blank: lines.length === 0, bullets: true });
        continue;
      }
      const value = a[field.id];
      if (Array.isArray(value)) {
        const lines = (value as string[]).map(clean).filter(Boolean);
        items.push({ label: field.label, lines, blank: lines.length === 0, bullets: true });
      } else {
        const text = clean(typeof value === "string" ? value : "");
        items.push({ label: field.label, lines: text ? text.split("\n") : [], blank: !text });
      }
    }
    return { n: step.n, name: step.name, items };
  });
}

export function buildBrief(a: Answers, meta: { who: string; business: string; quote: string; sent: Date }): string {
  const out: string[] = [];
  out.push("# Client onboarding brief");
  out.push("");
  out.push(`Client: ${meta.who}${meta.business ? ` · ${meta.business}` : ""}`);
  if (meta.quote) out.push(`Quote: ${meta.quote}`);
  out.push(`Received ${meta.sent.toISOString().slice(0, 16).replace("T", " ")} UTC`);
  const summary = overall(a);
  out.push(`Required answers: ${summary.answered} of ${summary.required}${summary.missing.length ? ` (${summary.missing.length} missing)` : ""}`);
  out.push("");
  for (const section of briefSections(a)) {
    out.push(`## ${String(section.n).padStart(2, "0")}. ${section.name}`, "");
    for (const item of section.items) {
      out.push(`**${item.label}**`, "");
      if (item.blank) out.push("_Not answered._");
      else for (const line of item.lines) out.push(item.bullets ? `- ${line}` : line);
      out.push("");
    }
  }
  return out.join("\n");
}

/* ------------------------------------------------------------- server intake */

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const text = (value: unknown, max: number) => (typeof value === "string" ? value.replace(CONTROL, "").slice(0, max) : "");

/**
 * Rebuilds the answers from untrusted JSON using the question definitions as the whitelist:
 * unknown keys are dropped, choices must be one of the listed options, and every length is capped.
 */
export function sanitizeAnswers(raw: unknown): Answers {
  const out: Answers = {};
  if (!raw || typeof raw !== "object") return out;
  const src = raw as Record<string, unknown>;

  for (const step of steps) {
    for (const f of step.fields) {
      if (f.kind === "group" || f.kind === "note" || f.kind === "quote") continue;
      const value = src[f.id];
      if (f.kind === "checks") {
        out[f.id] = Array.isArray(value) ? value.filter((x): x is string => typeof x === "string" && f.options.includes(x)).slice(0, 30) : [];
      } else if (f.kind === "radio") {
        const v = text(value, 200);
        out[f.id] = f.options.some((o) => o.v === v) ? v : "";
      } else if (f.kind === "select") {
        const v = text(value, 200);
        out[f.id] = f.options.includes(v) ? v : "";
      } else if (f.kind === "repeat") {
        const rows = Array.isArray(value) ? value.slice(0, 12) : [];
        out[f.id] = rows.flatMap((row, i) => {
          if (!row || typeof row !== "object") return [];
          const r = row as Record<string, unknown>;
          const clean: Row = { _id: text(r._id, 24) || `r${i}` } as Row;
          for (const inner of f.fields) {
            if (inner.kind === "group" || inner.kind === "note" || inner.kind === "quote" || inner.kind === "repeat" || inner.kind === "colors") continue;
            clean[inner.id] = text(r[inner.id], inner.kind === "textarea" ? 2000 : 300);
          }
          return [clean];
        });
      } else if (f.kind === "colors") {
        const rows = Array.isArray(value) ? value.slice(0, 20) : [];
        out[f.id] = rows.flatMap((row, i) => {
          if (!row || typeof row !== "object") return [];
          const r = row as Record<string, unknown>;
          return [{ _id: text(r._id, 24) || `r${i}`, hex: text(r.hex, 9), name: text(r.name, 60), use: text(r.use, 30) } as Row];
        });
      } else {
        out[f.id] = text(value, f.kind === "textarea" ? 4000 : 400);
      }
    }
  }
  return out;
}
