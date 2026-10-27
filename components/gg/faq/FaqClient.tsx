"use client";

import Link from "next/link";
import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { trackEvent } from "@/lib/analytics";

import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { useMedia } from "../useMedia";
import { entries, topicCount, topics, type FaqEntry, type TopicKey } from "./data";

/* ------------------------------------------------------------------ helpers */

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

const OFFSET = 120;

function scrollToEl(el: HTMLElement | null) {
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - OFFSET, behavior: reduced() ? "auto" : "smooth" });
}

/** Scrolls to an item, then again once the previously open one has finished collapsing (height animates over ~400ms). */
function settleScroll(slug: string) {
  scrollToEl(document.getElementById(slug));
  window.setTimeout(() => scrollToEl(document.getElementById(slug)), 460);
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const termsOf = (query: string) =>
  query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

/** Splits text on the search terms so matches can be wrapped in <mark>. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map(escapeRe).join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="fq-mark">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** A short run of the answer around the first match (or its opening if only the question matched). */
function snippetOf(answer: string, terms: string[]) {
  const lower = answer.toLowerCase();
  let at = -1;
  for (const term of terms) {
    const found = lower.indexOf(term);
    if (found >= 0 && (at < 0 || found < at)) at = found;
  }
  if (at < 0) at = 0;
  const start = Math.max(0, at - 50);
  const end = Math.min(answer.length, start + 170);
  return `${start > 0 ? "…" : ""}${answer.slice(start, end).trim()}${end < answer.length ? "…" : ""}`;
}

/* ---------------------------------------------------------------- context */

type Ctx = {
  query: string;
  setQuery: (value: string) => void;
  /** Debounced (150ms) term the results use. */
  term: string;
  clear: () => void;
  open: string | null;
  openEntry: (slug: string, options?: { scroll?: boolean; focus?: boolean }) => void;
  toggle: (slug: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  scrollToTopic: (key: TopicKey | "all") => void;
};

const FaqContext = createContext<Ctx | null>(null);

function useFaq() {
  const ctx = useContext(FaqContext);
  if (!ctx) throw new Error("FaqProvider is missing");
  return ctx;
}

export function FaqProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState<string | null>(entries[0].slug);
  const searchRef = useRef<HTMLInputElement | null>(null);

  // Debounce the term the results read from (the field itself stays instant).
  useEffect(() => {
    const id = window.setTimeout(() => setTerm(query.trim()), 150);
    return () => window.clearTimeout(id);
  }, [query]);

  const clear = useCallback(() => {
    setQuery("");
    setTerm("");
  }, []);

  const writeHash = useCallback((slug: string | null) => {
    const url = new URL(window.location.href);
    url.hash = slug ? slug : "";
    history.replaceState(null, "", url);
  }, []);

  const openEntry = useCallback(
    (slug: string, options: { scroll?: boolean; focus?: boolean } = {}) => {
      setOpen(slug);
      writeHash(slug);
      trackEvent("faq_open", { question: slug });
      if (!options.scroll && !options.focus) return;
      // Wait for the groups to be back in the DOM after a search, then for the previous item to start closing.
      window.setTimeout(() => {
        const button = document.getElementById(`faq-q-${slug}`);
        if (options.scroll) settleScroll(slug);
        if (options.focus) (button as HTMLElement | null)?.focus({ preventScroll: true });
      }, 60);
    },
    [writeHash],
  );

  const toggle = useCallback(
    (slug: string) => {
      if (open === slug) {
        setOpen(null);
        writeHash(null);
        return;
      }
      setOpen(slug);
      writeHash(slug);
      trackEvent("faq_open", { question: slug });
      // If the item above collapses and pushes this question off the top, bring it back (120px offset).
      window.setTimeout(() => {
        const el = document.getElementById(`faq-q-${slug}`);
        if (el && el.getBoundingClientRect().top < 0) scrollToEl(el);
      }, 420);
    },
    [open, writeHash],
  );

  // Arriving with /faq#deposit (or #faq-deposit) opens that answer and scrolls to it.
  useEffect(() => {
    const apply = () => {
      const raw = window.location.hash.slice(1).replace(/^faq-/, "");
      if (!entries.some((e) => e.slug === raw)) return;
      setOpen(raw);
      requestAnimationFrame(() => {
        settleScroll(raw);
        document.getElementById(`faq-q-${raw}`)?.focus({ preventScroll: true });
      });
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  // "/" focuses the field on desktop (never while typing somewhere else).
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      if (!window.matchMedia("(min-width: 768px) and (hover: hover)").matches) return;
      event.preventDefault();
      searchRef.current?.focus();
      searchRef.current?.select();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToTopic = useCallback(
    (key: TopicKey | "all") => {
      const go = () => {
        if (key === "all") {
          scrollToEl(document.getElementById("fq-groups"));
        } else {
          scrollToEl(document.getElementById(`topic-${key}`));
        }
      };
      if (term) {
        clear();
        window.setTimeout(go, 80);
      } else go();
    },
    [term, clear],
  );

  const value = useMemo<Ctx>(
    () => ({ query, setQuery, term, clear, open, openEntry, toggle, searchRef, scrollToTopic }),
    [query, term, clear, open, openEntry, toggle, scrollToTopic],
  );

  return <FaqContext.Provider value={value}>{children}</FaqContext.Provider>;
}

/* ----------------------------------------------------------------- search */

function useResults() {
  const { term } = useFaq();
  return useMemo(() => {
    const terms = termsOf(term);
    if (!terms.length) return { terms, results: null as FaqEntry[] | null };
    const results = entries
      .filter((e) => {
        const hay = `${e.question} ${e.answer}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
      // Question matches first, then the rest, each in page order.
      .sort((a, b) => {
        const qa = terms.every((t) => a.question.toLowerCase().includes(t)) ? 0 : 1;
        const qb = terms.every((t) => b.question.toLowerCase().includes(t)) ? 0 : 1;
        return qa - qb;
      });
    return { terms, results };
  }, [term]);
}

export function FaqSearch() {
  const { query, setQuery, clear, searchRef } = useFaq();
  const wide = useMedia("(min-width: 768px)");
  const active = query.length > 0;

  return (
    <form
      role="search"
      aria-label="Search the FAQ"
      className={active ? "fq-search is-active" : "fq-search"}
      onSubmit={(event) => {
        event.preventDefault();
        document.getElementById("fq-groups")?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
      }}
    >
      <Icon name="search" size={22} stroke={2} className="fq-search__icon" />
      <label htmlFor="fq-search-input" className="gg-sr-only">
        Search {entries.length} questions
      </label>
      <input
        id="fq-search-input"
        ref={searchRef}
        type="search"
        autoComplete="off"
        spellCheck={false}
        value={query}
        placeholder={wide ? `Search ${entries.length} questions, e.g. “deposit” or “contract”` : `Search ${entries.length} questions`}
        className="fq-search__input"
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && query) {
            event.preventDefault();
            clear();
          }
        }}
      />
      {active ? (
        <button type="button" className="fq-search__clear" aria-label="Clear search" onClick={() => { clear(); searchRef.current?.focus(); }}>
          <Icon name="x" size={18} stroke={2.2} />
        </button>
      ) : (
        <kbd className="fq-search__key" aria-hidden="true">
          /
        </kbd>
      )}
      <button type="submit" className="fq-search__go">
        Search
      </button>
    </form>
  );
}

/* ------------------------------------------------------------ topic cards */

export function TopicCards() {
  const { scrollToTopic } = useFaq();
  return (
    <ul className="fq-topics" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
      {topics.map((topic) => (
        <li key={topic.key}>
          <a
            href={`#topic-${topic.key}`}
            className="fq-topic"
            onClick={(event) => {
              event.preventDefault();
              scrollToTopic(topic.key);
            }}
          >
            <span className={`fq-chip fq-chip--${topic.tint}`} aria-hidden="true">
              <Icon name={topic.icon} size={20} stroke={2} />
            </span>
            <span className="fq-topic__text">
              <strong>{topic.title}</strong>
              <small>{topicCount(topic.key)} questions</small>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------------------------------------- the questions */

function useScrollSpy() {
  const [active, setActive] = useState<TopicKey | "all">("all");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: TopicKey | "all" = "all";
      for (const topic of topics) {
        const el = document.getElementById(`topic-${topic.key}`);
        if (el && el.getBoundingClientRect().top <= line) current = topic.key;
      }
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
  return active;
}

function TopicNav({ active }: { active: TopicKey | "all" }) {
  const { scrollToTopic } = useFaq();
  const items: { key: TopicKey | "all"; label: string; count: number }[] = [
    { key: "all", label: "All questions", count: entries.length },
    ...topics.map((t) => ({ key: t.key, label: t.title, count: topicCount(t.key) })),
  ];
  return (
    <nav className="fq-nav" aria-label="Topics">
      <p className="gg-kicker fq-nav__title">TOPICS</p>
      <ul>
        {items.map((item) => (
          <li key={item.key}>
            <a
              href={item.key === "all" ? "#fq-groups" : `#topic-${item.key}`}
              className={active === item.key ? "fq-nav__item is-active" : "fq-nav__item"}
              aria-current={active === item.key ? "true" : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollToTopic(item.key);
              }}
            >
              <span>{item.label}</span>
              <small>{item.count}</small>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileChips({ active }: { active: TopicKey | "all" }) {
  const { scrollToTopic } = useFaq();
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = list.current;
    const chip = ul?.querySelector<HTMLElement>(".is-active");
    const scroller = ul?.parentElement;
    if (!chip || !scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    scroller.scrollTo({ left: chip.offsetLeft - (scroller.clientWidth - chip.offsetWidth) / 2, behavior: reduced() ? "auto" : "smooth" });
  }, [active]);

  const chips: { key: TopicKey | "all"; label: string; count: number }[] = [
    { key: "all", label: "All", count: entries.length },
    ...topics.map((t) => ({ key: t.key, label: t.short, count: topicCount(t.key) })),
  ];
  return (
    <nav className="fq-chips" aria-label="Topics">
      <div className="fq-chips__scroll">
        <ul ref={list}>
          {chips.map((chip) => (
            <li key={chip.key}>
              <a
                href={chip.key === "all" ? "#fq-groups" : `#topic-${chip.key}`}
                className={active === chip.key ? "fq-chips__chip is-active" : "fq-chips__chip"}
                aria-current={active === chip.key ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTopic(chip.key);
                }}
              >
                {chip.label} <span>{chip.count}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function StillStuck({ className }: { className?: string }) {
  return (
    <aside className={className ? `fq-stuck ${className}` : "fq-stuck"}>
      <h2 className="fq-stuck__title">Didn’t find your question?</h2>
      <p className="fq-stuck__copy">Ask us. A real person replies within <span className="fq-nowrap">1–2 business days</span>.</p>
      <ButtonLink href="/contact?topic=general&ref=faq" variant="coral">
        Ask a question
      </ButtonLink>
    </aside>
  );
}

function useCopyLink() {
  const [toast, setToast] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = useCallback(async (slug: string) => {
    const value = `${window.location.origin}/faq#${slug}`;
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
    setToast(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(false), 2500);
  }, []);
  return { toast, copy };
}

function Item({ entry, copy }: { entry: FaqEntry; copy: (slug: string) => void }) {
  const { open, toggle } = useFaq();
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const isOpen = open === entry.slug;
  const panelId = `faq-a-${entry.slug}`;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".fq-list .gg-faq__button"));
    const index = buttons.indexOf(event.currentTarget);
    const last = buttons.length - 1;
    const target =
      event.key === "ArrowDown" ? (index === last ? 0 : index + 1) : event.key === "ArrowUp" ? (index === 0 ? last : index - 1) : event.key === "Home" ? 0 : last;
    event.preventDefault();
    buttons[target]?.focus();
  };

  return (
    <div id={entry.slug} className={isOpen ? "gg-faq__item is-open" : "gg-faq__item"}>
      <h3 className="gg-faq__heading">
        <button
          type="button"
          id={`faq-q-${entry.slug}`}
          className="gg-faq__button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(entry.slug)}
          onKeyDown={onKeyDown}
        >
          <span className="gg-faq__num" aria-hidden="true">
            {entry.number}
          </span>
          <span className="gg-faq__q">{entry.question}</span>
          <span className="gg-faq__chip" aria-hidden="true" />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={`faq-q-${entry.slug}`} className="gg-faq__panel" inert={!isOpen}>
        <div className="gg-faq__panel-inner">
          <div className="gg-faq__answer fq-answer">
            <p>{entry.answer}</p>
            <div className="fq-tools">
              <button type="button" className="fq-tool" onClick={() => copy(entry.slug)}>
                <Icon name="link" size={14} stroke={2.2} />
                Copy link
              </button>
              <div className="fq-vote" role="group" aria-label="Was this helpful?">
                {vote ? (
                  <span className="fq-vote__thanks" role="status">
                    Thanks for letting us know
                  </span>
                ) : (
                  <>
                    <span>Helpful?</span>
                    {(["yes", "no"] as const).map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        className="fq-vote__btn"
                        onClick={() => {
                          setVote(choice);
                          trackEvent("faq_helpful", { question: entry.slug, helpful: choice === "yes" });
                        }}
                      >
                        {choice === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </>
                )}
              </div>
              {entry.related ? (
                <Link href={entry.related.href} className="fq-related">
                  {entry.related.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Results({ results, terms, term }: { results: FaqEntry[]; terms: string[]; term: string }) {
  const { clear, openEntry } = useFaq();

  if (!results.length) {
    return (
      <div className="fq-none">
        <span className="fq-none__icon" aria-hidden="true">
          <Icon name="chat" size={18} stroke={2} />
        </span>
        <p>
          <strong>No questions match “{term}”. Ask us instead.</strong>
        </p>
        <ButtonLink href={`/contact?topic=general&ref=faq`} variant="primary">
          Ask a question
        </ButtonLink>
      </div>
    );
  }

  return (
    <ul className="fq-results">
      {results.map((entry) => (
        <li key={entry.slug}>
          <button
            type="button"
            className="fq-result"
            onClick={() => {
              clear();
              openEntry(entry.slug, { scroll: true, focus: true });
            }}
          >
            <span className="fq-result__q">
              <Highlight text={entry.question} terms={terms} />
            </span>
            <span className="fq-result__a">
              <Highlight text={snippetOf(entry.answer, terms)} terms={terms} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function FaqBody() {
  const { term } = useFaq();
  const { terms, results } = useResults();
  const active = useScrollSpy();
  const { toast, copy } = useCopyLink();

  return (
    <div className="fq-body gg-wrap">
      <MobileChips active={active} />
      <div className="fq-side">
        <TopicNav active={active} />
        <StillStuck />
      </div>

      <div className="fq-main" id="fq-groups">
        <p className="fq-status" role="status" aria-live="polite">
          {results ? `${results.length} result${results.length === 1 ? "" : "s"} for “${term}”` : ""}
        </p>

        {results ? (
          <Results results={results} terms={terms} term={term} />
        ) : (
          <div className="fq-list">
            {topics.map((topic) => (
              <section key={topic.key} id={`topic-${topic.key}`} className="fq-group" aria-labelledby={`fq-h-${topic.key}`} data-reveal="fade-up">
                <div className="fq-group__head">
                  <span className={`fq-chip fq-chip--${topic.tint} fq-chip--sm`} aria-hidden="true">
                    <Icon name={topic.icon} size={18} stroke={2} />
                  </span>
                  <h2 id={`fq-h-${topic.key}`}>{topic.title}</h2>
                </div>
                <div className="gg-faq gg-faq--plain">
                  {entries
                    .filter((e) => e.topic === topic.key)
                    .map((entry) => (
                      <Item key={entry.slug} entry={entry} copy={copy} />
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <StillStuck className="fq-stuck--inline" />
      </div>

      <div className={toast ? "fq-toast is-on" : "fq-toast"} role="status">
        {toast ? (
          <>
            <Icon name="check" size={16} stroke={2.6} />
            Link copied
          </>
        ) : null}
      </div>
    </div>
  );
}
