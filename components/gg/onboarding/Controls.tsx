"use client";

import { useCallback, useEffect, useMemo, useRef, type ReactNode } from "react";

import { Field, TextArea } from "../Field";
import { Icon } from "../Icon";
import {
  formatError,
  isShown,
  normalise,
  rowsOf,
  str,
  strs,
  type Answers,
  type Row,
} from "./logic";
import { newId } from "./store";
import type { Field as FieldDef, Opt, Step } from "./steps";

export type Quote = { package: string; price: string; payment: string; addons: string[] } | null;

export type StepContext = {
  a: Answers;
  set: (id: string, value: Answers[string], immediate?: boolean) => void;
  quote: Quote;
  pageAllowance: number | null;
  /** Shows a toast, optionally with an Undo action. */
  toast: (message: string, undo?: () => void) => void;
};

/* ------------------------------------------------------------------ Reveal */

/** Conditional blocks fade and slide in under their trigger (motion/md). */
function Cond({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="ob-cond">
      <p className="ob-cond__why">
        <Icon name="info" size={14} stroke={2} />
        {label ?? "Shown because of your earlier answer"}
      </p>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- controls */

function GroupHead({ label, hint, as: Tag = "h3", id }: { label: string; hint?: string; as?: "h3" | "legend"; id?: string }) {
  return (
    <div className="ob-ghead">
      <Tag className="ob-ghead__title" id={id}>
        {label}
      </Tag>
      {hint ? <p className="ob-ghead__hint">{hint}</p> : null}
    </div>
  );
}

function Select({ id, label, value, options, optional, hint, error, onChange, onBlur }: { id: string; label: string; value: string; options: string[]; optional: boolean; hint?: string; error?: string; onChange: (v: string) => void; onBlur?: () => void }) {
  return (
    <div className="gg-field">
      <label htmlFor={id} className="gg-field__label">
        <span>{label}</span>
        {optional ? <span className="gg-field__opt">Optional</span> : null}
      </label>
      <div className="ob-select">
        <select id={id} className="gg-field__control" value={value} aria-invalid={error ? true : undefined} onChange={(e) => onChange(e.target.value)} onBlur={onBlur}>
          <option value="">Choose…</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <Icon name="down" size={16} stroke={2.2} />
      </div>
      {hint ? <p className="gg-field__hint">{hint}</p> : null}
      {error ? <p className="gg-field__error">{error}</p> : null}
    </div>
  );
}

export function RadioCards({ id, label, hint, options, value, cols = 2, onChange, headingAs = "legend" }: { id: string; label: string; hint?: string; options: Opt[]; value: string; cols?: 2 | 3; onChange: (v: string) => void; headingAs?: "legend" }) {
  return (
    <fieldset className="ob-group">
      <GroupHead label={label} hint={hint} as={headingAs} />
      <div className={`ob-cards ob-cards--${cols}`}>
        {options.map((opt) => (
          <label key={opt.v} className={value === opt.v ? "ob-card is-on" : "ob-card"}>
            <input type="radio" name={id} value={opt.v} checked={value === opt.v} onChange={() => onChange(opt.v)} />
            <span className="ob-card__dot" aria-hidden="true">
              <Icon name="check" size={13} stroke={3} />
            </span>
            <span className="ob-card__text">
              <strong>{opt.title}</strong>
              {opt.desc ? <small>{opt.desc}</small> : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function CheckChips({ id, label, hint, options, value, max, onChange }: { id: string; label: string; hint?: string; options: string[]; value: string[]; max?: number; onChange: (v: string[]) => void }) {
  const full = max !== undefined && value.length >= max;
  return (
    <div className="ob-group" role="group" aria-labelledby={`${id}-label`}>
      <GroupHead label={label} hint={hint} id={`${id}-label`} />
      <div className="ob-chips">
        {options.map((opt) => {
          const on = value.includes(opt);
          const locked = full && !on;
          return (
            <button
              key={opt}
              type="button"
              className={on ? "ob-chip is-on" : "ob-chip"}
              aria-pressed={on}
              aria-disabled={locked || undefined}
              onClick={() => {
                if (locked) return;
                onChange(on ? value.filter((v) => v !== opt) : [...value, opt]);
              }}
            >
              <span className="ob-chip__box" aria-hidden="true">
                <Icon name="check" size={12} stroke={3} />
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** One input of any simple kind, controlled by the caller (a top-level answer or a repeat row). */
function Control({ field, id, value, onChange, error, onCheck }: { field: Extract<FieldDef, { id: string; label: string }>; id: string; value: string; onChange: (v: string, immediate?: boolean) => void; error?: string; onCheck: (v: string) => void }) {
  const optional = !("req" in field && field.req);
  if (field.kind === "textarea") {
    return (
      <TextArea
        label={field.label}
        name={id}
        idPrefix="ob"
        optional={optional}
        hint={field.hint}
        error={error}
        rows={3}
        placeholder={"ph" in field ? field.ph : undefined}
        value={value}
        aria-required={!optional || undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (field.kind === "select") {
    return <Select id={`ob-${id}`} label={field.label} value={value} options={field.options} optional={optional} hint={field.hint} error={error} onChange={(v) => onChange(v, true)} />;
  }
  if (field.kind === "radio") {
    return <RadioCards id={`ob-${id}`} label={field.label} hint={field.hint} options={field.options} value={value} cols={field.cols} onChange={(v) => onChange(v, true)} />;
  }
  if (field.kind === "text" || field.kind === "email" || field.kind === "tel" || field.kind === "url" || field.kind === "date") {
    return (
      <Field
        label={field.label}
        name={id}
        idPrefix="ob"
        optional={optional}
        hint={field.hint}
        error={error}
        type={field.kind === "url" ? "text" : field.kind}
        inputMode={field.kind === "url" ? "url" : field.kind === "tel" ? "tel" : field.kind === "email" ? "email" : undefined}
        autoComplete="off"
        placeholder={field.ph}
        value={value}
        aria-required={!optional || undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onCheck(e.target.value)}
      />
    );
  }
  return null;
}

/* ------------------------------------------------------------- repeat groups */

function Repeat({ field, ctx, errors, onCheck }: { field: Extract<FieldDef, { kind: "repeat" }>; ctx: StepContext; errors: Record<string, string>; onCheck: (key: string, kind: FieldDef["kind"], value: string, write: (v: string) => void) => void }) {
  const stored = rowsOf(ctx.a, field.id);
  const rows: Row[] = stored.length ? stored : [{ _id: "r0" } as Row];
  const focusNext = useRef<string | null>(null);

  useEffect(() => {
    if (!focusNext.current) return;
    const row = focusNext.current;
    focusNext.current = null;
    const first = field.fields[0];
    document.getElementById(`ob-${field.id}-${row}-${first.id}`)?.focus();
  }, [rows.length, field.id, field.fields]);

  const save = (next: Row[], immediate = false) => ctx.set(field.id, next, immediate);

  const change = (row: Row, fieldId: string, value: string, immediate = false) => {
    const exists = stored.some((r) => r._id === row._id);
    const updated = { ...row, [fieldId]: value } as Row;
    save(exists ? stored.map((r) => (r._id === row._id ? updated : r)) : [...stored, updated], immediate);
  };

  const remove = (row: Row) => {
    const before = stored;
    save(stored.filter((r) => r._id !== row._id), true);
    ctx.toast(`${field.item} removed`, () => save(before, true));
  };

  const atMax = field.max !== undefined && rows.length >= field.max;
  return (
    <div className="ob-group" role="group" aria-labelledby={`ob-${field.id}-title`}>
      <GroupHead label={field.label} hint={field.hint} id={`ob-${field.id}-title`} />
      {rows.map((row, index) => (
        <div key={row._id} className="ob-repeat">
          <div className="ob-repeat__head">
            <p className="gg-kicker">
              {field.item.toUpperCase()} {index + 1}
            </p>
            <button type="button" className="ob-repeat__remove" onClick={() => remove(row)} aria-label={`Remove ${field.item.toLowerCase()} ${index + 1}`}>
              <Icon name="trash" size={16} stroke={2} />
              Remove
            </button>
          </div>
          <div className="ob-rows">
            {packRows(field.fields as FieldDef[]).map((r, i) => (
              <div key={i} className="ob-row">
                {r.map((f) => {
                  const key = `${field.id}-${row._id}-${f.id}`;
                  const inner = f as Extract<FieldDef, { id: string; label: string }>;
                  return (
                    <div key={f.id} className={`ob-cell ob-span-${"span" in inner && inner.span ? inner.span : 6}`}>
                      <Control
                        field={inner}
                        id={key}
                        value={row[f.id] ?? ""}
                        error={errors[key]}
                        onChange={(v, immediate) => change(row, f.id, v, immediate)}
                        onCheck={(v) => onCheck(key, inner.kind, v, (n) => change(row, f.id, n))}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
      {atMax ? null : (
        <button
          type="button"
          className="ob-add"
          onClick={() => {
            const id = newId();
            focusNext.current = id;
            save([...(stored.length ? stored : [{ _id: "r0" } as Row]), { _id: id } as Row], true);
          }}
        >
          <Icon name="plus" size={16} stroke={2.2} />
          {field.add}
        </button>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- colours */

const USES = ["Main colour", "Second colour", "Accent", "Background", "Text", "Other"];

function Colors({ field, ctx }: { field: Extract<FieldDef, { kind: "colors" }>; ctx: StepContext }) {
  const stored = rowsOf(ctx.a, field.id);
  const rows: Row[] = stored.length ? stored : [{ _id: "r0" } as Row];
  const save = (next: Row[], immediate = false) => ctx.set(field.id, next, immediate);
  const change = (row: Row, key: string, value: string, immediate = false) => {
    const exists = stored.some((r) => r._id === row._id);
    const updated = { ...row, [key]: value } as Row;
    save(exists ? stored.map((r) => (r._id === row._id ? updated : r)) : [...stored, updated], immediate);
  };
  return (
    <div className="ob-group" role="group" aria-labelledby="ob-colors-title">
      <GroupHead label={field.label} hint={field.hint} id="ob-colors-title" />
      {rows.map((row, i) => {
        const hex = row.hex ?? "";
        const valid = /^#[0-9a-f]{6}$/i.test(hex);
        return (
          <div key={row._id} className="ob-colour">
            <label className="ob-colour__swatch" style={{ background: valid ? hex : "var(--gg-canvas)" }}>
              <span className="gg-sr-only">Pick colour {i + 1}</span>
              <input type="color" value={valid ? hex : "#000000"} onChange={(e) => change(row, "hex", e.target.value.toUpperCase(), true)} />
            </label>
            <label className="ob-colour__hex">
              <span className="gg-sr-only">Hex code {i + 1}</span>
              <input
                type="text"
                value={hex}
                placeholder="#0B4F8A"
                maxLength={7}
                onChange={(e) => change(row, "hex", e.target.value.startsWith("#") || !e.target.value ? e.target.value : `#${e.target.value}`)}
              />
            </label>
            <label className="ob-colour__name">
              <span className="gg-sr-only">Colour name {i + 1}</span>
              <input type="text" value={row.name ?? ""} placeholder="Name, e.g. Brand blue" onChange={(e) => change(row, "name", e.target.value)} />
            </label>
            <label className="ob-colour__use">
              <span className="gg-sr-only">Used for {i + 1}</span>
              <select value={row.use ?? ""} onChange={(e) => change(row, "use", e.target.value, true)}>
                <option value="">Used for…</option>
                {USES.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
              <Icon name="down" size={16} stroke={2.2} />
            </label>
            <button
              type="button"
              className="ob-colour__x"
              aria-label={`Remove colour ${i + 1}`}
              onClick={() => {
                const before = stored;
                save(stored.filter((r) => r._id !== row._id), true);
                ctx.toast("Colour removed", () => save(before, true));
              }}
            >
              <Icon name="trash" size={18} stroke={2} />
            </button>
          </div>
        );
      })}
      <button type="button" className="ob-add" onClick={() => save([...(stored.length ? stored : [{ _id: "r0" } as Row]), { _id: newId() } as Row], true)}>
        <Icon name="plus" size={16} stroke={2.2} />
        Add a colour
      </button>
    </div>
  );
}

/* ---------------------------------------------------------- the step renderer */

type Item = FieldDef;

/** Packs consecutive simple inputs into rows whose spans add up to 6 columns. */
function packRows(fields: Item[]): Item[][] {
  const rows: Item[][] = [];
  let current: Item[] = [];
  let used = 0;
  for (const f of fields) {
    const span = "span" in f && f.span ? f.span : 6;
    if (used + span > 6 && current.length) {
      rows.push(current);
      current = [];
      used = 0;
    }
    current.push(f);
    used += span;
    if (used >= 6) {
      rows.push(current);
      current = [];
      used = 0;
    }
  }
  if (current.length) rows.push(current);
  return rows;
}

const FULL_WIDTH: FieldDef["kind"][] = ["radio", "checks", "repeat", "colors", "group", "note", "quote"];

export function StepFields({ step, ctx, errors, setError }: { step: Step; ctx: StepContext; errors: Record<string, string>; setError: (key: string, message: string) => void }) {
  const { a, set } = ctx;

  const check = useCallback(
    (key: string, kind: FieldDef["kind"], value: string, write: (v: string) => void) => {
      const normalised = normalise(kind, value);
      if (normalised !== value.trim() && value.trim()) write(normalised);
      setError(key, formatError(kind, normalised));
    },
    [setError],
  );

  const visible = useMemo(() => step.fields.filter((f) => ("show" in f ? isShown(f.show, a) : true)), [step.fields, a]);

  // Group consecutive fields that share a condition into one canvas block.
  const sections: { cond: string | null; fields: Item[] }[] = [];
  for (const f of visible) {
    const sig = "show" in f && f.show && f.kind !== "note" ? JSON.stringify(f.show) : null;
    const last = sections[sections.length - 1];
    if (last && last.cond === sig) last.fields.push(f);
    else sections.push({ cond: sig, fields: [f] });
  }

  const renderOne = (f: Item): ReactNode => {
    switch (f.kind) {
      case "group":
        return <GroupHead key={f.id} label={f.label} hint={f.hint} />;
      case "note":
        return (
          <p key={f.id} className={`ob-note ob-note--${f.tone}`}>
            <Icon name={f.icon} size={16} stroke={2} />
            {f.text}
          </p>
        );
      case "quote":
        return ctx.quote ? <QuoteCard key={f.id} quote={ctx.quote} /> : null;
      case "repeat":
        return <Repeat key={f.id} field={f} ctx={ctx} errors={errors} onCheck={check} />;
      case "colors":
        return <Colors key={f.id} field={f} ctx={ctx} />;
      case "checks": {
        let hint = f.helper;
        if (hint === "__PAGES__") {
          const n = strs(a, f.id).length;
          hint = ctx.pageAllowance ? `Your package includes up to ${ctx.pageAllowance} pages. ${n} selected.` : `Tick every page you think you need. ${n} selected.`;
        }
        return <CheckChips key={f.id} id={`ob-${f.id}`} label={f.label} hint={hint} options={f.options} value={strs(a, f.id)} max={f.max} onChange={(v) => set(f.id, v, true)} />;
      }
      case "radio":
        return <RadioCards key={f.id} id={`ob-${f.id}`} label={f.label} hint={f.hint} options={f.options} value={str(a, f.id)} cols={f.cols} onChange={(v) => set(f.id, v, true)} />;
      default:
        return null;
    }
  };

  const renderRows = (fields: Item[]) => {
    const out: ReactNode[] = [];
    let buffer: Item[] = [];
    const flush = () => {
      if (!buffer.length) return;
      packRows(buffer).forEach((r, i) =>
        out.push(
          <div key={`${r[0].id}-${i}`} className="ob-row">
            {r.map((f) => {
              const inner = f as Extract<FieldDef, { id: string; label: string }>;
              return (
                <div key={f.id} className={`ob-cell ob-span-${"span" in f && f.span ? f.span : 6}`}>
                  <Control
                    field={inner}
                    id={f.id as string}
                    value={str(a, f.id as string)}
                    error={errors[f.id as string]}
                    onChange={(v, immediate) => set(f.id as string, v, immediate)}
                    onCheck={(v) => check(f.id as string, inner.kind, v, (n) => set(f.id as string, n))}
                  />
                </div>
              );
            })}
          </div>,
        ),
      );
      buffer = [];
    };
    for (const f of fields) {
      if (FULL_WIDTH.includes(f.kind)) {
        flush();
        const node = renderOne(f);
        if (node) out.push(node);
      } else buffer.push(f);
    }
    flush();
    return out;
  };

  return (
    <div className="ob-fields">
      {sections.map((section, i) =>
        section.cond ? (
          <Cond key={i}>{renderRows(section.fields)}</Cond>
        ) : (
          <div key={i} className="ob-section">
            {renderRows(section.fields)}
          </div>
        ),
      )}
    </div>
  );
}

function QuoteCard({ quote }: { quote: NonNullable<Quote> }) {
  const parts = [quote.package, quote.price, quote.payment, ...quote.addons].filter(Boolean);
  return (
    <div className="ob-quote">
      <span className="ob-quote__icon" aria-hidden="true">
        <Icon name="doc" size={18} stroke={2} />
      </span>
      <p>
        <span className="gg-kicker">FROM YOUR ACCEPTED QUOTE</span>
        <strong>{parts.join(" · ")}</strong>
      </p>
      <a href="/contact?topic=general&ref=onboarding" className="ob-quote__fix">
        Not right? Tell us
      </a>
    </div>
  );
}
