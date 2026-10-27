"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

import { site } from "@/content/site";
import { setConsent, useConsent } from "@/lib/consent";

import { BottomSheet, type BottomSheetHandle } from "../BottomSheet";
import { ButtonLink } from "../Button";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";
import {
  company,
  docOf,
  docs,
  lastUpdated,
  noticeSections,
  privacySections,
  providers,
  rights,
  shortVersion,
  termsLive,
  termsSections,
  type Block,
  type DocKey,
  type Section,
} from "./data";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

type TocItem = { id: string; n: string; label: string };

const tocOf = (key: DocKey): TocItem[] => {
  if (key === "notice") {
    return [
      { id: "sec-notice", n: "01", label: "Legal notice" },
      { id: "sec-company", n: "—", label: "Company details" },
    ];
  }
  if (key === "privacy") return privacySections.map((s) => ({ id: s.id, n: s.n, label: s.label ?? s.title }));
  return termsSections.map((s) => ({ id: s.id, n: s.n, label: s.title }));
};

async function copyText(value: string) {
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
}

/* ------------------------------------------------------------- the document pieces */

function CompanyCard({ id, onCopied }: { id: string; onCopied: () => void }) {
  const officer = company.informationOfficer;
  return (
    <section id={id} className="lg-block" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="lg-lead-title">
        Who’s responsible for your data
      </h2>
      <dl className="lg-company">
        {company.rows.map((row) => (
          <div key={row.label} className="lg-company__row">
            <dt className="gg-kicker">{row.label}</dt>
            <dd>
              <span>{row.value}</span>
              {row.copy ? (
                <button
                  type="button"
                  className="lg-copy"
                  onClick={async () => {
                    await copyText(row.value);
                    onCopied();
                  }}
                >
                  <Icon name="copy" size={14} stroke={2.2} />
                  Copy<span className="gg-sr-only"> registration number</span>
                </button>
              ) : null}
            </dd>
          </div>
        ))}
        <div className="lg-company__row">
          <dt className="gg-kicker">INFORMATION OFFICER (POPIA)</dt>
          <dd>
            {officer ? (
              <span>
                {officer.name} · <a href={`mailto:${officer.email}`}>{officer.email}</a>
              </span>
            ) : (
              <>
                <span className="lg-todo">Name and email to be added</span>
                <Tag tone="coral">REQUIRED BY POPIA</Tag>
              </>
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}

function ShortVersion() {
  return (
    <section className="lg-short" aria-label="The short version">
      <Tag tone="on-dark">THE SHORT VERSION</Tag>
      <ul>
        {shortVersion.map((tile) => (
          <li key={tile.title}>
            <span className="lg-short__icon" aria-hidden="true">
              <Icon name={tile.icon} size={18} stroke={2.2} />
            </span>
            <span>
              <strong>{tile.title}</strong>
              <small>{tile.copy}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProviderTable() {
  return (
    <div className="lg-table-wrap">
      <table className="lg-table">
        <thead>
          <tr>
            <th scope="col">PROVIDER</th>
            <th scope="col">PURPOSE</th>
            <th scope="col">WHEN</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((row) => (
            <tr key={row.name}>
              <th scope="row" className={row.todo ? "lg-todo" : undefined}>
                {row.name}
              </th>
              <td>{row.purpose}</td>
              <td>{row.when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Rights() {
  const [picked, setPicked] = useState<string | null>(null);
  const type = picked ?? "General";
  const href = `mailto:${site.email}?subject=${encodeURIComponent(`Privacy request: ${type}`)}`;
  return (
    <div className="lg-rights">
      <ul>
        {rights.map((right) => (
          <li key={right.key}>
            <button
              type="button"
              className={picked === right.key ? "lg-right is-picked" : "lg-right"}
              aria-pressed={picked === right.key}
              onClick={() => setPicked(picked === right.key ? null : right.key)}
            >
              <span className="lg-right__icon" aria-hidden="true">
                <Icon name={right.icon} size={18} stroke={2} />
              </span>
              <span>
                <strong>{right.title}</strong>
                <small>{right.copy}</small>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="lg-rights__cta">
        <ButtonLink href={href}>Make a privacy request</ButtonLink>
        <p>
          Opens an email to {site.email} with the request type filled in
          {picked ? `: “${picked}”` : ""}.
        </p>
      </div>
    </div>
  );
}

function CookieCard({ onToast }: { onToast: (message: string) => void }) {
  const consent = useConsent();
  const on = consent === "granted";
  return (
    <div className="lg-cookie">
      <div className="lg-cookie__row">
        <span className="lg-cookie__icon" aria-hidden="true">
          <Icon name="cookie" size={20} stroke={2} />
        </span>
        <p>
          <span id="lg-cookie-label" className="lg-cookie__small">
            Your current choice
          </span>
          <strong>Analytics cookies: {on ? "On" : "Off"}</strong>
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-labelledby="lg-cookie-label"
          aria-describedby="lg-cookie-help"
          className={on ? "lg-switch is-on" : "lg-switch"}
          onClick={() => {
            const next = !on;
            setConsent(next ? "granted" : "denied");
            onToast(next ? "Analytics cookies turned on" : "Analytics cookies turned off");
          }}
        >
          <span aria-hidden="true" />
        </button>
      </div>
      <p id="lg-cookie-help" className="lg-note">
        Change your choice here at any time; it takes effect immediately.
      </p>
    </div>
  );
}

function BlockView({ block, onToast }: { block: Block; onToast: (message: string) => void }) {
  switch (block.t) {
    case "p":
      return <p className="lg-p">{block.text}</p>;
    case "note":
      return <p className="lg-note">{block.text}</p>;
    case "banner":
      return <p className="lg-banner">{block.text}</p>;
    case "chips":
      return (
        <div className="lg-chips">
          <p>{block.lead}</p>
          <ul>
            {block.items.map((item) => (
              <li key={item}>
                <Icon name="check" size={13} stroke={2.8} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "callout":
      return (
        <p className="lg-callout">
          <span aria-hidden="true">
            <Icon name="check" size={16} stroke={2.6} />
          </span>
          {block.text}
        </p>
      );
    case "providers":
      return <ProviderTable />;
    case "rights":
      return <Rights />;
    case "cookies":
      return <CookieCard onToast={onToast} />;
  }
}

function SectionView({ section, onToast }: { section: Section; onToast: (message: string) => void }) {
  if (section.id === "sec-contact") {
    return (
      <section id={section.id} className="lg-block lg-section" aria-labelledby={`${section.id}-t`}>
        <h2 id={`${section.id}-t`} className="lg-h2">
          <span className="gg-kicker lg-n">{section.n}</span>
          {section.title}
        </h2>
        <div className="lg-contact">
          <span className="lg-contact__icon" aria-hidden="true">
            <Icon name="mail" size={22} stroke={2} />
          </span>
          <p>
            <strong>Questions about this policy or your data?</strong>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <ButtonLink href="/contact" variant="light">
            Get in touch
          </ButtonLink>
        </div>
      </section>
    );
  }
  return (
    <section id={section.id} className="lg-block lg-section" aria-labelledby={`${section.id}-t`}>
      <h2 id={`${section.id}-t`} className="lg-h2">
        <span className="gg-kicker lg-n">{section.n}</span>
        {section.title}
      </h2>
      {section.blocks.map((block, i) => (
        <BlockView key={i} block={block} onToast={onToast} />
      ))}
    </section>
  );
}

function TermsView() {
  return (
    <>
      {termsSections.map((term) => (
        <section key={term.id} id={term.id} className="lg-block lg-section" aria-labelledby={`${term.id}-t`}>
          <h2 id={`${term.id}-t`} className="lg-h2 lg-h2--term">
            <span className="gg-kicker lg-n">{term.n}</span>
            {term.title}
          </h2>
          <div className={term.attorney ? "lg-plain lg-plain--attorney" : "lg-plain"}>
            <Icon name="info" size={18} stroke={2} />
            <p>
              <span className="gg-kicker">{term.attorney ? "NEEDS YOUR ATTORNEY" : "IN PLAIN LANGUAGE"}</span>
              {term.summary}
            </p>
          </div>
          {term.wording?.map((paragraph, i) => (
            <p key={i} className="lg-p">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <div className="lg-contact lg-contact--terms">
        <p>
          <strong>Questions about these terms?</strong>
          <span>Ask before you sign. We’ll explain anything in plain language.</span>
        </p>
        <ButtonLink href="/contact" variant="light">
          Get in touch
        </ButtonLink>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ the page */

export function Legal() {
  const [tab, setTab] = useState<DocKey>("privacy");
  const [active, setActive] = useState<Record<DocKey, string>>({
    notice: "sec-notice",
    privacy: "sec-privacy",
    terms: "terms-about",
  });
  const [toast, setToast] = useState<{ message: string; on: boolean }>({ message: "", on: false });
  const toastTimer = useRef(0);
  const pending = useRef<string | null>(null);
  const sheet = useRef<BottomSheetHandle>(null);
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([]);

  const showToast = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ message, on: true });
    toastTimer.current = window.setTimeout(() => setToast((t) => ({ ...t, on: false })), 2500);
  }, []);
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const toc = useMemo(() => tocOf(tab), [tab]);

  // Resolve a hash to a document (and a section to scroll to).
  const resolve = useCallback((raw: string) => {
    const hash = raw.replace(/^#/, "");
    if (!hash) return false;
    if (hash === "notice" || hash === "privacy") {
      pending.current = `doc-${hash}`;
      setTab(hash);
      return true;
    }
    if (hash === "terms") {
      // Old links pointed #terms at the legal notice; until Terms are approved they still do.
      const key: DocKey = termsLive ? "terms" : "notice";
      pending.current = `doc-${key}`;
      setTab(key);
      return true;
    }
    const doc = docOf(hash) ?? (hash === "sec-company" ? "notice" : null);
    if (!doc) return false;
    pending.current = hash;
    setTab(doc);
    return true;
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => resolve(window.location.hash));
    const onHash = () => resolve(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHash);
    };
  }, [resolve]);

  // Scroll to whatever the last navigation asked for, once its document is showing.
  useEffect(() => {
    const target = pending.current;
    if (!target) return;
    pending.current = null;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" })),
    );
  }, [tab]);

  const choose = (key: DocKey) => {
    const url = new URL(window.location.href);
    url.hash = key;
    history.replaceState(null, "", url);
    if (key === tab) return;
    setTab(key);
    // Land at the top of the new document if the reader had scrolled into the old one.
    const top = document.getElementById("lg-docs");
    if (top && top.getBoundingClientRect().top < 0) {
      requestAnimationFrame(() => top.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" }));
    }
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const move = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : event.key === "Home" ? -index : event.key === "End" ? docs.length - 1 - index : 0;
    if (!move) return;
    event.preventDefault();
    const next = (index + move + docs.length) % docs.length;
    tabButtons.current[next]?.focus();
    choose(docs[next].key);
  };

  // Scroll-spy for the visible document.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = toc[0]?.id;
      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      if (current) setActive((a) => (a[tab] === current ? a : { ...a, [tab]: current }));
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
  }, [tab, toc]);

  const goSection = (id: string) => {
    const url = new URL(window.location.href);
    url.hash = id;
    history.replaceState(null, "", url);
    document.getElementById(id)?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  };

  const activeId = active[tab];
  const activeIndex = Math.max(0, toc.findIndex((t) => t.id === activeId));

  return (
    <>
      {/* 01 · Hero ------------------------------------------------------------------------- */}
      <section className="hm-section hm-section--canvas lg-hero" aria-labelledby="lg-title">
        <div className="gg-wrap">
          <div className="lg-hero__col" data-reveal="header">
            <p className="lg-hero__tags" data-part="tag">
              <Tag tone="coral">LEGAL</Tag>
              <Tag tone="neutral">
                <span className="gg-resp-long">LAST UPDATED {lastUpdated[tab]}</span>
                <span className="gg-resp-short">UPDATED {lastUpdated[tab]}</span>
              </Tag>
            </p>
            <SplitHeading as="h1" id="lg-title" className="gg-display-l lg-h1" text="LEGAL NOTICE, PRIVACY & TERMS." />
            <p className="gg-lead lg-hero__lead" data-part="sub">
              GoodGround is committed to transparency, data protection and responsible use of information. Here’s exactly how we work, in plain language first and full detail below.
            </p>
          </div>
        </div>
      </section>

      <div className="lg-zone">
        {/* Sticky document tabs */}
        <div className="lg-tabsbar gg-wrap">
          <div className="lg-tabs" role="tablist" aria-label="Legal documents">
            {docs.map((doc, i) => (
              <button
                key={doc.key}
                ref={(el) => {
                  tabButtons.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`lg-tab-${doc.key}`}
                aria-selected={tab === doc.key}
                aria-controls={`doc-${doc.key}`}
                tabIndex={tab === doc.key ? 0 : -1}
                className={tab === doc.key ? "lg-tab is-active" : "lg-tab"}
                onClick={() => choose(doc.key)}
                onKeyDown={(event) => onTabKey(event, i)}
              >
                <Resp long={doc.label} short={doc.short} />
              </button>
            ))}
          </div>
        </div>

        <div id="lg-docs" className="lg-body gg-wrap">
          {/* Mobile: "On this page" pill + bottom sheet */}
          <div className="lg-pill">
            <button type="button" className="lg-pill__btn" onClick={() => sheet.current?.open()} aria-haspopup="dialog">
              <Icon name="list" size={18} stroke={2} />
              <span>
                <small>
                  On this page · {activeIndex + 1} of {toc.length}
                </small>
                <strong>{toc[activeIndex]?.label}</strong>
              </span>
              <Icon name="chev" size={18} stroke={2.2} />
            </button>
          </div>
          <BottomSheet ref={sheet} title="On this page">
            <ul className="lg-sheet">
              {toc.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={item.id === activeId ? "is-active" : undefined}
                    onClick={() => {
                      sheet.current?.close();
                      window.setTimeout(() => goSection(item.id), 120);
                    }}
                  >
                    <span className="gg-kicker">{item.n}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </BottomSheet>

          {/* Desktop: sticky contents */}
          <nav className="lg-toc" aria-label="On this page">
            <p className="gg-kicker lg-toc__title">ON THIS PAGE</p>
            <ul>
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={item.id === activeId ? "lg-toc__item is-active" : "lg-toc__item"}
                    aria-current={item.id === activeId ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      goSection(item.id);
                    }}
                  >
                    <i aria-hidden="true" />
                    <span className="gg-kicker">{item.n}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {tab === "terms" ? (
              <button type="button" className="lg-download" onClick={() => window.print()}>
                <Icon name="download" size={16} stroke={2} />
                Download as PDF
              </button>
            ) : null}
          </nav>

          <div className="lg-docwrap">
            {/* Legal notice */}
            <div id="doc-notice" role="tabpanel" aria-labelledby="lg-tab-notice" hidden={tab !== "notice"} className="lg-doc">
              {noticeSections.map((section) => (
                <SectionView key={section.id} section={section} onToast={showToast} />
              ))}
              <CompanyCard id="sec-company" onCopied={() => showToast("Copied")} />
            </div>

            {/* Privacy policy */}
            <div id="doc-privacy" role="tabpanel" aria-labelledby="lg-tab-privacy" hidden={tab !== "privacy"} className="lg-doc">
              <CompanyCard id="sec-company-privacy" onCopied={() => showToast("Copied")} />
              <ShortVersion />
              {privacySections.map((section) => (
                <SectionView key={section.id} section={section} onToast={showToast} />
              ))}
            </div>

            {/* Terms & conditions (hidden until approved) */}
            {termsLive ? (
              <div id="doc-terms" role="tabpanel" aria-labelledby="lg-tab-terms" hidden={tab !== "terms"} className="lg-doc">
                <TermsView />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={toast.on ? "lg-toast is-on" : "lg-toast"} role="status">
        {toast.on ? (
          <>
            <Icon name="check" size={16} stroke={2.6} />
            {toast.message}
          </>
        ) : null}
      </div>
    </>
  );
}

