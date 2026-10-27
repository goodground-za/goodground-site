"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { BottomSheet, type BottomSheetHandle } from "../BottomSheet";
import { Icon } from "../Icon";
import { LinkedCard } from "../LinkedCard";
import { formatRand } from "../format";
import { useMedia } from "../useMedia";
import { PLAN_CARDS, type PlanCardData } from "./plans";

const motionOff = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

export type TocItem = { id: string; text: string };

/**
 * Where the reader is: 0 to 1 through the article body (from the lead paragraph to the end of
 * the quick answers) and which section is active (the last heading above 35% of the viewport).
 */
function useArticleProgress(ids: string[]) {
  const [state, setState] = useState({ progress: 0, active: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const start = document.getElementById("article-body");
      const end = document.getElementById("article-body-end");
      if (!start || !end) return;
      const top = start.getBoundingClientRect().top + window.scrollY;
      const bottom = end.getBoundingClientRect().bottom + window.scrollY;
      const progress = Math.min(1, Math.max(0, (window.scrollY + window.innerHeight * 0.3 - top) / (bottom - top)));
      const line = window.innerHeight * 0.35;
      let active = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) active = i;
      });
      setState((prev) => (prev.progress === progress && prev.active === active ? prev : { progress, active }));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [ids]);

  return state;
}

/** A 4px coral bar along the very top: information, not decoration, so it stays with motion off. */
export function ReadingProgress({ ids }: { ids: string[] }) {
  const { progress } = useArticleProgress(ids);
  return <div className="ar-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />;
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: motionOff() ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

/**
 * Table of contents. Desktop: sticky beside the article with scroll-spy and a
 * "{n} of {total} sections · ~{x} min left" line. Phones: a sticky pill showing
 * the current section that opens a bottom sheet with every section.
 */
export function Toc({ items, minutes }: { items: TocItem[]; minutes: number }) {
  const ids = items.map((i) => i.id);
  const { progress, active } = useArticleProgress(ids);
  const sheet = useRef<BottomSheetHandle>(null);
  const left = Math.max(1, Math.ceil(minutes * (1 - progress)));

  return (
    <>
      <nav className="ar-toc" aria-label="On this page">
        <p className="gg-kicker ar-toc__title">ON THIS PAGE</p>
        <ul>
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={i === active ? "is-active" : undefined}
                aria-current={i === active ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToHeading(item.id);
                }}
              >
                <span aria-hidden="true" />
                {item.text}
              </a>
            </li>
          ))}
        </ul>
        <p className="ar-toc__progress">
          {active + 1} of {items.length} sections · ~{left} min left
        </p>
      </nav>

      <div className="ar-tocpill-wrap">
        <button type="button" className="ar-tocpill" onClick={() => sheet.current?.open()} aria-haspopup="dialog">
          <Icon name="layers" size={18} stroke={2} />
          <span className="ar-tocpill__text">
            <small>
              On this page · {active + 1} of {items.length}
            </small>
            <strong>{items[active]?.text}</strong>
          </span>
          <Icon name="chev" size={18} stroke={2.2} />
        </button>
      </div>
      <BottomSheet ref={sheet} title="On this page">
        <ul className="ar-sheet">
          {items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                className={i === active ? "is-active" : undefined}
                onClick={() => {
                  sheet.current?.close();
                  window.setTimeout(() => scrollToHeading(item.id), 80);
                }}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
}

/* ---------------------------------------------------------------- sharing */

type ShareProps = { url: string; title: string };

function useCopy() {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);
  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing more to try */
      }
      input.remove();
    }
    setCopied(true);
    setToast(true);
    timers.current.push(window.setTimeout(() => setCopied(false), 2000));
    timers.current.push(window.setTimeout(() => setToast(false), 2500));
  }, []);
  return { copied, toast, copy };
}

const shareLinks = ({ url, title }: ShareProps) => [
  { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, icon: "chat" as const },
  { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, icon: "link" as const },
  { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, icon: "share" as const },
];

/** Hero share button: the native share sheet on phones; a small menu on desktop. */
export function ShareButton({ url, title }: ShareProps) {
  const [open, setOpen] = useState(false);
  const { copied, toast, copy } = useCopy();
  const touch = useMedia("(pointer: coarse)");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") setOpen(false);
        return;
      }
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const onClick = async () => {
    if (touch && typeof navigator.share === "function") {
      try {
        await navigator.share({ url, title });
      } catch {
        /* dismissed */
      }
      return;
    }
    setOpen((v) => !v);
  };

  return (
    <div className="ar-share" ref={root}>
      <button type="button" className="ar-share__btn" onClick={onClick} aria-haspopup="menu" aria-expanded={open} aria-label="Share">
        <Icon name="share" size={16} stroke={2.2} />
        <span className="ar-share__label">Share</span>
      </button>
      {open ? (
        <ul className="ar-share__menu" role="menu">
          {shareLinks({ url, title }).map((link) => (
            <li key={link.label} role="none">
              <a role="menuitem" href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                {link.label}
                <span className="gg-sr-only"> (opens in new tab)</span>
              </a>
            </li>
          ))}
          <li role="none">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                void copy(url);
                setOpen(false);
              }}
            >
              {copied ? "Link copied" : "Copy link"}
            </button>
          </li>
        </ul>
      ) : null}
      <div className={toast ? "ar-toast is-on" : "ar-toast"} role="status">
        {toast ? (
          <>
            <Icon name="check" size={16} stroke={2.4} />
            Link copied
          </>
        ) : null}
      </div>
    </div>
  );
}

/** The share row at the end of the article. */
export function ShareRow({ url, title }: ShareProps) {
  const { copied, toast, copy } = useCopy();
  return (
    <div className="ar-sharerow">
      <p>Share this guide</p>
      <div className="ar-sharerow__pills">
        {shareLinks({ url, title }).map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={link.label === "WhatsApp" ? "" : "ar-hide-phone"}>
            <Icon name={link.icon} size={16} stroke={2} />
            {link.label}
            <span className="gg-sr-only"> (opens in new tab)</span>
          </a>
        ))}
        <button type="button" onClick={() => void copy(url)}>
          <Icon name={copied ? "check" : "link"} size={16} stroke={2} />
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <div className={toast ? "ar-toast is-on" : "ar-toast"} role="status">
        {toast ? (
          <>
            <Icon name="check" size={16} stroke={2.4} />
            Link copied
          </>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- checklist */

/**
 * Real checkboxes. Ticking animates the box fill and the check stroke; the state is saved
 * per article on this device only (localStorage), and a "Reset" link appears once anything
 * is ticked. Phones show the first three questions and "+ n more".
 */
export function Checklist({
  storageKey,
  title,
  items,
  shortItems,
}: {
  storageKey: string;
  title: string;
  items: string[];
  shortItems?: string[];
}) {
  const [ticked, setTicked] = useState<boolean[]>(() => items.map(() => false));
  const [more, setMore] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");
      if (Array.isArray(saved) && saved.length === items.length) {
        // Restoring ticks is one setState after mount, by design (hydration matches the empty list).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTicked(saved.map(Boolean));
      }
    } catch {
      /* storage can be blocked; the list still works */
    }
    setReady(true);
  }, [storageKey, items.length]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(ticked));
    } catch {
      /* ignore */
    }
  }, [ticked, storageKey, ready]);

  const any = ticked.some(Boolean);
  const toggle = (i: number) => setTicked((t) => t.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="ar-check">
      <div className="ar-check__head">
        <p className="gg-kicker">{title.toUpperCase()}</p>
        {any ? (
          <button type="button" className="ar-check__reset" onClick={() => setTicked(items.map(() => false))}>
            Reset
          </button>
        ) : null}
      </div>
      <ul>
        {items.map((item, i) => (
          <li key={item} className={!more && i >= 3 ? "ar-check__extra" : undefined}>
            <label>
              <input type="checkbox" checked={ticked[i] ?? false} onChange={() => toggle(i)} />
              <span className="ar-check__box" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3.5 8.5 3 3 6-7" pathLength={1} />
                </svg>
              </span>
              <span>
                <span className="ar-hide-phone">{item}</span>
                <span className="ar-phone-only">{shortItems?.[i] ?? item}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      {!more && items.length > 3 ? (
        <button type="button" className="ar-check__more" onClick={() => setMore(true)}>
          + {items.length - 3} more
        </button>
      ) : null}
      <p className="ar-check__note">Tick them off as you go (interactive, saved on this device only).</p>
    </div>
  );
}

/* ------------------------------------------------------------------- plans */

function PlanCard({ plan }: { plan: PlanCardData }) {
  return (
    <LinkedCard href={`/pricing#package-${plan.slug}`} className={plan.dark ? "ar-plan ar-plan--dark" : "ar-plan"}>
      <span className="ar-plan__name">{plan.name}</span>
      <span className="ar-plan__price">
        <small>from</small>
        <strong className="gg-number">{formatRand(plan.total)}</strong>
      </span>
      <span className="ar-plan__chips">
        {plan.chips.map((chip) => (
          <span key={chip}>{chip}</span>
        ))}
      </span>
      <span className="ar-plan__meta">{plan.meta}</span>
      <span className="ar-plan__ticks">
        {plan.ticks.map((tick) => (
          <span key={tick}>
            <Icon name="check" size={14} stroke={2.4} />
            {tick}
          </span>
        ))}
      </span>
      <span className="ar-plan__suits">Suits: {plan.suits}</span>
    </LinkedCard>
  );
}

/** Plan cards, from the pricing data. A 2 x 2 grid; a swipe row with dots on phones. */
export function PlanCards({ asOf }: { asOf: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const card = el.children[0] as HTMLElement | undefined;
      if (!card) return;
      setActive(Math.max(0, Math.min(PLAN_CARDS.length - 1, Math.round(el.scrollLeft / (card.offsetWidth + 12)))));
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", request, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", request);
    };
  }, []);

  return (
    <div className="ar-plans-wrap">
      <ul ref={track} className="ar-plans" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
        {PLAN_CARDS.map((plan) => (
          <li key={plan.slug}>
            <PlanCard plan={plan} />
          </li>
        ))}
      </ul>
      <div className="ar-dots" role="group" aria-label="Choose a plan card">
        {PLAN_CARDS.map((plan, i) => (
          <button
            key={plan.slug}
            type="button"
            className={i === active ? "is-active" : undefined}
            aria-label={`Show ${plan.name}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => {
              const el = track.current;
              const card = el?.children[i] as HTMLElement | undefined;
              if (el && card) el.scrollTo({ left: i * (card.offsetWidth + 12), behavior: motionOff() ? "auto" : "smooth" });
            }}
          />
        ))}
      </div>
      <p className="ar-plans__asof">Prices correct as of {asOf}.</p>
    </div>
  );
}
