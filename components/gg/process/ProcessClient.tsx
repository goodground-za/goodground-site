"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { scrollToAnchor } from "../services/scroll";
import { useMedia } from "../useMedia";
import { NAV, steps, type StepCard } from "./data";

/**
 * Process 02: the sticky step nav with scroll-spy (same behaviour as /services:
 * the last section whose top has passed 35% of the viewport is active, the ink
 * pill slides to it, a click smooth-scrolls 120px below the top). On phones the
 * chips scroll sideways and the active one is brought to the middle.
 */
export function ProcessNav() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = 0;
      NAV.forEach((item, i) => {
        const el = document.getElementById(item.anchor);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  useEffect(() => {
    const ul = list.current;
    const chip = ul?.children[active + 1] as HTMLElement | undefined;
    if (!ul || !chip) return;
    ul.style.setProperty("--pill-x", `${chip.offsetLeft}px`);
    ul.style.setProperty("--pill-w", `${chip.offsetWidth}px`);
    const scroller = ul.parentElement;
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      const reduce =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";
      scroller.scrollTo({ left: chip.offsetLeft - (scroller.clientWidth - chip.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
    }
  }, [active]);

  return (
    <nav className="pc-nav" aria-label="The steps">
      <div className="pc-nav__scroll">
        <ul className="pc-nav__list" ref={list}>
          <li className="pc-nav__pill" aria-hidden="true" />
          {NAV.map((item, i) => (
            <li key={item.anchor} className="pc-nav__item">
              <a
                href={`#${item.anchor}`}
                className={i === active ? "pc-nav__chip is-active" : "pc-nav__chip"}
                aria-current={i === active ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToAnchor(item.anchor);
                }}
              >
                <span className="gg-kicker pc-nav__n">{item.n}</span>
                <Resp long={item.name} short={item.short} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

type Tab = "we" | "you" | "get";
const TABS: { key: Tab; label: string; icon: "users" | "hand" | "star" }[] = [
  { key: "we", label: "What we do", icon: "users" },
  { key: "you", label: "What you do", icon: "hand" },
  { key: "get", label: "What you get", icon: "star" },
];
const TAB_SHORT: Record<Tab, string> = { we: "We do", you: "You do", get: "You get" };

function StepArticle({ step, open, onToggle, accordion }: { step: StepCard; open: boolean; onToggle: () => void; accordion: boolean }) {
  const [tab, setTab] = useState<Tab>("we");
  const id = `pc-step-${step.id}`;
  const lists: Record<Tab, string[]> = { we: step.we, you: step.you, get: step.get };

  return (
    <article id={step.id} className={["pc-step", step.dark && "is-dark", open && "is-open"].filter(Boolean).join(" ")} data-reveal="group">
      <div className="pc-step__left">
        <h3 className="pc-step__title">
          <button
            type="button"
            className="pc-step__head"
            aria-expanded={accordion ? open : undefined}
            aria-controls={accordion ? id : undefined}
            onClick={onToggle}
          >
            <span className="pc-step__n">{step.n}</span>
            <span className="pc-step__chip" aria-hidden="true">
              <Icon name={step.icon} size={22} stroke={2} />
            </span>
            <span className="pc-step__name">{step.name}</span>
            <span className="pc-step__toggle" aria-hidden="true">
              <Icon name={open ? "minus" : "plus"} size={15} stroke={2.4} />
            </span>
          </button>
        </h3>
        <div id={id} className="pc-step__panel" inert={accordion ? !open : undefined}>
          <div className="pc-step__panel-in">
            <p className="pc-step__desc">{step.desc}</p>
            <div className="pc-step__pills">
              <span className="pc-pill">
                <Icon name="clock" size={14} stroke={2.2} />
                <span className="gg-resp-long">{step.timePill ?? `About ${step.pct}% of your timeline`}</span>
                <span className="gg-resp-short">{step.timePill ? "1 month after launch" : `~${step.pct}% of timeline`}</span>
              </span>
              {step.paidPill ? (
                <span className="pc-pill pc-pill--pay">
                  <Icon name="wallet" size={14} stroke={2.2} />
                  {step.paidPill}
                </span>
              ) : null}
            </div>
            {step.payment ? (
              <div className="pc-callout pc-callout--pay">
                <Icon name="wallet" size={18} stroke={2} />
                <p>
                  <span className="gg-kicker">PAYMENT</span>
                  {step.payment}
                </p>
              </div>
            ) : null}
            {step.revisions ? (
              <div className="pc-callout pc-callout--rounds">
                <p>
                  <span className="gg-kicker">REVISION ROUNDS</span>
                  {step.revisions.map((line) => (
                    <span key={line} className="pc-callout__line">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ) : null}

            <div className="pc-seg" role="tablist" aria-label={`${step.name}: what we do, what you do, what you get`}>
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  className={tab === t.key ? "is-on" : undefined}
                  onClick={() => setTab(t.key)}
                >
                  {TAB_SHORT[t.key]}
                </button>
              ))}
            </div>

            <div className="pc-cols" data-tab={tab}>
              {TABS.map((t, i) => (
                <div
                  key={t.key}
                  className={`pc-col pc-col--${t.key}${tab === t.key ? " is-tab" : ""}`}
                  role="group"
                  aria-label={t.label}
                  style={{ "--i": i } as CSSProperties}
                >
                  <p className="gg-kicker pc-col__head">
                    <Icon name={t.icon} size={16} stroke={2} />
                    {t.label.toUpperCase()}
                  </p>
                  <ul>
                    {lists[t.key].map((item) => (
                      <li key={item}>
                        <Icon name="check" size={14} stroke={2.4} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Process 05: the six steps in detail. From 1100px each is a full card (left:
 * number, title, description, time pill and callouts; right: three columns).
 * Below that the steps are an accordion (one open, the first open) and inside
 * an open step a segmented control switches We do / You do / You get.
 */
export function StepCards() {
  const [open, setOpen] = useState(0);
  const accordion = useMedia("(max-width: 1099px)");

  return (
    <div className="pc-steps">
      {steps.map((step, i) => (
        <StepArticle
          key={step.id}
          step={step}
          accordion={accordion}
          open={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
