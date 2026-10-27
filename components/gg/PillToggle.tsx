"use client";

import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

/**
 * Segmented control with a sliding ink pill (Pricing billing toggle 54:264,
 * configurator payment toggle, Website launch eligibility checker).
 *
 * A radiogroup: arrow keys move and select, Home/End jump, one tab stop. The
 * pill is a single element placed from the selected option's measured box and
 * moved with a transform, so options of different widths still work.
 */
export type PillOption<T extends string> = { value: T; label: string };

export function PillToggle<T extends string>({
  options,
  value,
  onChange,
  label,
  size = "md",
  fill = false,
  className,
}: {
  options: PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  size?: "sm" | "md";
  /** Options share the width equally (full-width controls). */
  fill?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [box, setBox] = useState<{ x: number; w: number } | null>(null);

  const measure = useCallback(() => {
    const index = options.findIndex((o) => o.value === value);
    const el = buttons.current[index];
    // A hidden control (display:none) measures 0; wait for a real box.
    if (el && el.offsetWidth > 0) setBox({ x: el.offsetLeft, w: el.offsetWidth });
    else setBox(null);
  }, [options, value]);

  useLayoutEffect(() => {
    measure();
    const el = root.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    // The root, and every option (a late-loading font changes option widths without changing the root).
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    buttons.current.forEach((button) => button && observer.observe(button));
    void document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [measure]);

  const onKey = (event: KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % options.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + options.length) % options.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    else return;
    event.preventDefault();
    onChange(options[next].value);
    buttons.current[next]?.focus();
  };

  const classes = ["gg-pill-toggle", `gg-pill-toggle--${size}`, fill && "gg-pill-toggle--fill", className].filter(Boolean).join(" ");

  return (
    <div
      ref={root}
      role="radiogroup"
      aria-label={label}
      className={classes}
      data-ready={box ? "" : undefined}
      style={box ? ({ "--pill-x": `${box.x}px`, "--pill-w": `${box.w}px` } as CSSProperties) : undefined}
    >
      <span className="gg-pill-toggle__pill" aria-hidden="true" />
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              buttons.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            className={selected ? "gg-pill-toggle__opt is-on" : "gg-pill-toggle__opt"}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKey(event, index)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
