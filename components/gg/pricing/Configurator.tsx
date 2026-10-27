"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "../Button";
import { BottomSheet, type BottomSheetHandle } from "../BottomSheet";
import { formatRand } from "../format";
import { Icon } from "../Icon";
import { PillToggle } from "../PillToggle";
import {
  balanceOf,
  BASE_FEE,
  BASE_INCLUDES,
  BILLING_OPTIONS_SHORT,
  buildGroups,
  depositOf,
  hintText,
  instalmentFor,
  itemPriceLabel,
  MAX_QTY,
  packageHint,
  type BuildGroup,
  type BuildItem,
  type BuildLine,
} from "./data";
import { usePricing } from "./PricingProvider";

const motionOff = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off");

/** The total rolls from its old value to the new one (500ms), instead of jumping. */
function useRolling(target: number) {
  const [shown, setShown] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (from.current === target) return;
    if (motionOff()) {
      from.current = target;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShown(target);
      return;
    }
    const begin = from.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 500);
      const value = Math.round(begin + (target - begin) * (1 - Math.pow(1 - t, 3)));
      from.current = value;
      setShown(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return shown;
}

/** Lines that were just removed stay a moment so they can collapse (200ms) instead of vanishing. */
type ShownLine = BuildLine & { leaving?: boolean };
function useAnimatedLines(lines: BuildLine[]): ShownLine[] {
  const [leaving, setLeaving] = useState<BuildLine[]>([]);
  const previous = useRef<BuildLine[]>(lines);

  useEffect(() => {
    const gone = previous.current.filter((old) => !lines.some((line) => line.id === old.id));
    previous.current = lines;
    if (!gone.length || motionOff()) return;
    setLeaving((list) => [...list.filter((l) => !gone.some((g) => g.id === l.id)), ...gone]);
    window.setTimeout(() => setLeaving((list) => list.filter((l) => !gone.some((g) => g.id === l.id))), 220);
  }, [lines]);

  const stale = leaving.filter((l) => !lines.some((line) => line.id === l.id)).map((l) => ({ ...l, leaving: true }));
  return [...lines, ...stale].sort((a, b) => a.order - b.order);
}

/* ------------------------------------------------------------ item controls */

function Stepper({ item, n }: { item: BuildItem; n: number }) {
  const { step } = usePricing();
  const timers = useRef<{ wait?: number; repeat?: number }>({});

  const stop = () => {
    window.clearTimeout(timers.current.wait);
    window.clearInterval(timers.current.repeat);
  };
  useEffect(() => stop, []);

  const press = (event: React.PointerEvent, delta: number) => {
    if (event.button !== 0) return;
    step(item.id, delta);
    stop();
    // Holding repeats after 400ms.
    timers.current.wait = window.setTimeout(() => {
      timers.current.repeat = window.setInterval(() => step(item.id, delta), 90);
    }, 400);
  };
  // Keyboard activation arrives as a click with no pointer (detail 0).
  const key = (event: React.MouseEvent, delta: number) => {
    if (event.detail === 0) step(item.id, delta);
  };

  return (
    <div className={n > 0 ? "pr-stepper is-on" : "pr-stepper"}>
      <button type="button" className="pr-stepper__btn" aria-label={`Fewer: ${item.short}`} disabled={n <= 0} onPointerDown={(e) => press(e, -1)} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onClick={(e) => key(e, -1)}>
        <Icon name="minus" size={14} stroke={2.4} />
      </button>
      <input
        type="number"
        className="pr-stepper__value"
        inputMode="numeric"
        min={0}
        max={MAX_QTY}
        value={n}
        aria-label={`${item.short}, quantity`}
        onChange={(event) => {
          const next = Number.parseInt(event.target.value, 10);
          if (Number.isFinite(next)) step(item.id, Math.max(0, Math.min(MAX_QTY, next)) - n);
        }}
      />
      <button type="button" className="pr-stepper__btn" aria-label={`More: ${item.short}`} disabled={n >= MAX_QTY} onPointerDown={(e) => press(e, 1)} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onClick={(e) => key(e, 1)}>
        <Icon name="plus" size={14} stroke={2.4} />
      </button>
    </div>
  );
}

function AddToggle({ item, on }: { item: BuildItem; on: boolean }) {
  const { toggle } = usePricing();
  return (
    <button
      type="button"
      className={on ? "pr-add is-on" : "pr-add"}
      aria-label={on ? `Added ${item.short}, press to remove` : `Add ${item.short}`}
      onClick={() => toggle(item.id)}
    >
      <span className="pr-add__icon" aria-hidden="true">
        <Icon name="plus" size={14} stroke={2.4} />
        <Icon name="check" size={14} stroke={2.6} />
      </span>
      {on ? "Added" : "Add"}
    </button>
  );
}

function ItemRow({ item }: { item: BuildItem }) {
  const { qty } = usePricing();
  const n = qty[item.id] ?? 0;
  const on = n > 0;

  // The row flashes blush for 600ms whenever its count changes.
  const [seen, setSeen] = useState(n);
  const [flash, setFlash] = useState(0);
  if (seen !== n) {
    setSeen(n);
    setFlash((f) => f + 1);
  }

  return (
    <li className={on ? "pr-item is-on" : "pr-item"} data-flash={flash ? (flash % 2 ? "a" : "b") : undefined}>
      <span className="pr-item__name">{item.label}</span>
      <span className="pr-item__price">{itemPriceLabel(item)}</span>
      <span className="pr-item__control">{item.quantifiable ? <Stepper item={item} n={n} /> : <AddToggle item={item} on={on} />}</span>
    </li>
  );
}

function Group({ group }: { group: BuildGroup }) {
  const { qty } = usePricing();
  const [chosen, setChosen] = useState<boolean | null>(null);
  const added = group.items.filter((i) => (qty[i.id] ?? 0) > 0).length;
  // Groups with something added open by default; the visitor's own choice wins.
  const open = chosen ?? added > 0;
  const id = `pr-group-${group.name.replace(/[^a-z]+/gi, "-").toLowerCase()}`;

  return (
    <div className={open ? "pr-group is-open" : "pr-group"}>
      <h3 className="pr-group__title">
        <button type="button" className="pr-group__head" aria-expanded={open} aria-controls={id} onClick={() => setChosen(!open)}>
          <span className="pr-group__name">{group.name}</span>
          <span className={added > 0 ? "pr-group__count is-added" : "pr-group__count"}>
            {added > 0 ? `${added} added · ` : ""}
            {group.items.length} items
          </span>
          <Icon name="chev" size={18} stroke={2.2} />
        </button>
      </h3>
      <div id={id} className="pr-group__panel" inert={!open}>
        <ul className="pr-group__items">
          {group.items.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- summary */

function BuildSummary({ variant, onSend }: { variant: "aside" | "sheet"; onSend?: () => void }) {
  const { lines, total, monthly, hasFrom, billing, setBilling, reset, comparePackage, step } = usePricing();
  const shown = useAnimatedLines(lines);
  const rolling = useRolling(total);
  const hint = packageHint(total);
  const [kept, setKept] = useState(hint);
  if (hint && (!kept || hint.pkg.slug !== kept.pkg.slug || hint.passed !== kept.passed)) setKept(hint);

  const removeLine = (line: BuildLine) => {
    // Remove = take the whole line out, whatever its count.
    step(line.id, -line.qty);
  };

  return (
    <div className={`pr-summary pr-summary--${variant}`}>
      <div className="pr-summary__head">
        {variant === "aside" ? <h3 className="pr-summary__title">Your build</h3> : <span />}
        <button type="button" className="pr-summary__reset" onClick={reset}>
          Reset
        </button>
      </div>

      <ul className="pr-lines">
        {shown.map((line) => (
          <li key={line.id} className={line.leaving ? "pr-line is-leaving" : "pr-line"}>
            <div className="pr-line__in">
              <span className="pr-line__name">{line.name}</span>
              <span className="pr-line__price">
                {line.from ? "from " : ""}
                {formatRand(line.amount)}
              </span>
              {line.removable ? (
                <button type="button" className="pr-line__remove" aria-label={`Remove ${line.name}`} onClick={() => removeLine(line)}>
                  <Icon name="x" size={11} stroke={2.6} />
                </button>
              ) : (
                <span className="pr-line__remove is-empty" aria-hidden="true" />
              )}
            </div>
          </li>
        ))}
      </ul>

      <hr className="pr-summary__rule" />

      <div className="pr-total">
        <span className="pr-total__label">{hasFrom ? "Total, from" : "Total, fixed"}</span>
        <span className="pr-total__value gg-number">{formatRand(rolling)}</span>
      </div>
      {hasFrom ? <p className="pr-summary__fromnote">Items marked ‘from’ are confirmed in your quote.</p> : null}

      <PillToggle options={BILLING_OPTIONS_SHORT} value={billing} onChange={setBilling} label="How you pay" fill size="sm" />

      {billing === "deposit" ? (
        <div className="pr-split pr-split--deposit">
          <div>
            <strong className="gg-number">{formatRand(depositOf(total))}</strong>
            <span>Deposit, to start</span>
          </div>
          <div>
            <strong className="gg-number">{formatRand(balanceOf(total))}</strong>
            <span>On completion</span>
          </div>
        </div>
      ) : (
        <div className="pr-split pr-split--instalments">
          <p className="pr-split__line">
            <strong className="gg-number">{formatRand(monthly)}</strong>
            <span>/mo × 12</span>
          </p>
          <p className="pr-split__note">
            The first instalment books your slot; the other 11 start once your site is finished. Rounded to the rand; the final
            instalment balances the total.
          </p>
        </div>
      )}

      <div className={hint ? "pr-hint is-on" : "pr-hint"} aria-hidden={!hint}>
        <div className="pr-hint__clip">
          <div className="pr-hint__in" inert={!hint}>
            <Icon name="bulb" size={18} stroke={2} />
            <p>
              {kept ? hintText(kept) : null}{" "}
              {kept ? (
                <button type="button" className="pr-hint__link" onClick={() => comparePackage(kept.pkg.slug)}>
                  Compare →
                </button>
              ) : null}
            </p>
          </div>
        </div>
      </div>

      {variant === "aside" ? (
        <>
          <Button variant="coral" full onClick={onSend}>
            View &amp; send
          </Button>
          <p className="pr-summary__fine">Sends this build with your quote request. Nothing is charged.</p>
        </>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------- configurator */

/**
 * Pricing 05. The menu on the left; the live summary on the right (sticky,
 * desktop). Below 1100px the summary becomes a sticky total bar that opens the
 * "Your build" sheet. The build is saved and mirrored in the URL by the
 * provider.
 */
export function Configurator() {
  const { total, attach, announcement } = usePricing();
  const root = useRef<HTMLDivElement>(null);
  const sheet = useRef<BottomSheetHandle>(null);
  const [past, setPast] = useState(false);
  const [quoteInView, setQuoteInView] = useState(false);

  // The bar shows once the configurator has come into view (and stays while the
  // visitor is below its top), and hides while the quote form is on screen.
  // Measured on scroll (one frame at a time) rather than with observers, which
  // could leave it stale after a long jump.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = root.current;
      const quote = document.getElementById("quote");
      if (el) setPast(el.getBoundingClientRect().top < window.innerHeight);
      if (quote) {
        const r = quote.getBoundingClientRect();
        setQuoteInView(r.top < window.innerHeight * 0.95 && r.bottom > 0);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const send = () => attach({ kind: "build" });
  const sendFromSheet = () => {
    sheet.current?.close();
    window.setTimeout(send, 60);
  };

  return (
    <>
      <div ref={root} className="pr-config">
        <div className="pr-menu">
          <div className="pr-base">
            <span className="pr-base__lock" aria-hidden="true">
              <Icon name="lock" size={18} stroke={2.2} />
            </span>
            <div className="pr-base__text">
              <p className="pr-base__name">
                Base Build Fee<span className="pr-base__incl"> · included</span>
              </p>
              <p className="pr-base__sub">{BASE_INCLUDES}</p>
            </div>
            <p className="pr-base__price gg-number">{formatRand(BASE_FEE)}</p>
          </div>

          {buildGroups.map((group) => (
            <Group key={group.name} group={group} />
          ))}

          <p className="pr-menu__note">
            All à la carte prices are per item unless stated. Your free quote confirms the final total before work begins.
          </p>
        </div>

        <aside className="pr-aside" aria-label="Your build">
          <BuildSummary variant="aside" onSend={send} />
        </aside>
      </div>

      <p className="gg-sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      <button
        type="button"
        className={past && !quoteInView ? "pr-bar is-on" : "pr-bar"}
        aria-hidden={!(past && !quoteInView)}
        tabIndex={past && !quoteInView ? 0 : -1}
        onClick={() => sheet.current?.open()}
      >
        <span className="pr-bar__text">
          <span className="pr-bar__label gg-kicker">YOUR TOTAL</span>
          <span className="pr-bar__amount">
            <strong className="gg-number">{formatRand(total)}</strong>
            <small>or {formatRand(instalmentFor(total))}/mo</small>
          </span>
        </span>
        <span className="pr-bar__go">
          View &amp; send
          <Icon name="chev" size={14} stroke={2.4} />
        </span>
      </button>

      <BottomSheet
        ref={sheet}
        title="Your build"
        footer={
          <div className="pr-sheet__foot">
            <Button variant="coral" full onClick={sendFromSheet}>
              Send this build
            </Button>
          </div>
        }
      >
        <BuildSummary variant="sheet" />
      </BottomSheet>
    </>
  );
}
