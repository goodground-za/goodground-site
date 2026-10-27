"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { Button } from "../Button";
import { BottomSheet, type BottomSheetHandle } from "../BottomSheet";
import { Icon } from "../Icon";
import { ArrowChip, LinkedCard } from "../LinkedCard";
import { Resp } from "../Resp";
import { Tag } from "../Tag";
import { ButtonLink } from "../Button";
import type { WorkProject } from "./data";

type TypeKey = "all" | "concept" | "studio" | "client";
const TYPE_LABEL: Record<Exclude<TypeKey, "all">, string> = {
  concept: "Concept builds",
  studio: "Our own site",
  client: "Client work",
};

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";

/**
 * The /work filter bar and project grid (Work 02 + 03).
 *
 * Type chips are a single-select radiogroup (arrow keys move and select);
 * service chips are multi-select toggle buttons. A project shows when it matches
 * the type AND has at least one selected service (none selected = all). Chips
 * that would give no results stay visible but disabled. The result line is
 * aria-live. Filters sync to the URL (?type=concept&service=design,seo).
 *
 * Filtering animates with a FLIP pass: leavers fade and scale to 0.96 (200ms),
 * stayers slide to their new place (400ms), entrants fade in 60ms apart. With
 * motion off the swap is instant. Every project is the same size; "Your project
 * could be next" is always last and never filtered out.
 */
export function WorkListing({ projects }: { projects: WorkProject[] }) {
  const [type, setType] = useState<TypeKey>("all");
  const [services, setServices] = useState<string[]>([]);
  const [rendered, setRendered] = useState<string[]>(projects.map((p) => p.slug));
  const [leaving, setLeaving] = useState<string[]>([]);
  const sheet = useRef<BottomSheetHandle>(null);
  const cards = useRef(new Map<string, HTMLElement>());
  const first = useRef(new Map<string, DOMRect>());
  const entering = useRef<string[]>([]);
  const timer = useRef(0);

  const types = useMemo(() => {
    const kinds = (["concept", "studio", "client"] as const).filter((k) => projects.some((p) => p.kind === k));
    return kinds;
  }, [projects]);

  const serviceList = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => p.services.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  }, [projects]);

  const matches = useCallback(
    (p: WorkProject, t: TypeKey, s: string[]) =>
      (t === "all" || p.kind === t) && (s.length === 0 || p.services.some((x) => s.includes(x))),
    [],
  );

  const target = useMemo(
    () => projects.filter((p) => matches(p, type, services)).map((p) => p.slug),
    [projects, type, services, matches],
  );

  // Counts shown on each chip, given the OTHER filter.
  const typeCount = (t: TypeKey) => projects.filter((p) => matches(p, t, services)).length;
  const serviceCount = (name: string) =>
    projects.filter((p) => matches(p, type, [name])).length;

  // Apply filters: read ?type & ?service on first load (in a frame, so state
  // is not set synchronously inside the effect).
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("type");
      const s = (params.get("service") ?? "").split(",").filter(Boolean);
      const wantedType = (["concept", "studio", "client"] as const).find((k) => k === t);
      const wantedServices = serviceList.filter((x) => s.includes(x.name.toLowerCase().replace(/\s+/g, "-"))).map((x) => x.name);
      if (wantedType || wantedServices.length) {
        if (wantedType) setType(wantedType);
        setServices(wantedServices);
        setRendered(
          projects.filter((p) => matches(p, wantedType ?? "all", wantedServices)).map((p) => p.slug),
        );
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [projects, serviceList, matches]);

  const sync = (t: TypeKey, s: string[]) => {
    const params = new URLSearchParams();
    if (t !== "all") params.set("type", t);
    if (s.length) params.set("service", s.map((x) => x.toLowerCase().replace(/\s+/g, "-")).join(","));
    const qs = params.toString();
    history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };

  const apply = (nextType: TypeKey, nextServices: string[]) => {
    const next = projects.filter((p) => matches(p, nextType, nextServices)).map((p) => p.slug);
    setType(nextType);
    setServices(nextServices);
    sync(nextType, nextServices);

    window.clearTimeout(timer.current);
    if (reduced()) {
      setRendered(next);
      setLeaving([]);
      return;
    }
    // First: where everything is now.
    first.current = new Map();
    cards.current.forEach((el, slug) => first.current.set(slug, el.getBoundingClientRect()));
    const going = rendered.filter((slug) => !next.includes(slug));
    entering.current = next.filter((slug) => !rendered.includes(slug));
    setLeaving(going);
    timer.current = window.setTimeout(
      () => {
        setLeaving([]);
        setRendered(next);
      },
      going.length ? 200 : 0,
    );
  };

  // Last + invert + play, once the DOM has the new set.
  useLayoutEffect(() => {
    if (!first.current.size && !entering.current.length) return;
    cards.current.forEach((el, slug) => {
      if (entering.current.includes(slug)) {
        el.animate(
          [
            { opacity: 0, transform: "scale(0.96)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 300, delay: 60 * entering.current.indexOf(slug) + 200, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "backwards" },
        );
        return;
      }
      const before = first.current.get(slug);
      if (!before) return;
      const after = el.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      if (!dx && !dy) return;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
        duration: 400,
        easing: "cubic-bezier(0.65,0,0.35,1)",
      });
    });
    first.current = new Map();
    entering.current = [];
  }, [rendered]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onTypeKey = (event: React.KeyboardEvent, index: number, keys: TypeKey[]) => {
    const move = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!move) return;
    event.preventDefault();
    const next = keys[(index + move + keys.length) % keys.length];
    apply(next, services);
    (event.currentTarget.parentElement?.querySelectorAll("[role=radio]")[(index + move + keys.length) % keys.length] as HTMLElement | undefined)?.focus();
  };

  const typeKeys: TypeKey[] = ["all", ...types];
  const pillIndex = typeKeys.indexOf(type);
  const shown = projects.filter((p) => rendered.includes(p.slug));

  const toggleService = (name: string) =>
    apply(type, services.includes(name) ? services.filter((x) => x !== name) : [...services, name]);

  const shownCount = target.length;

  return (
    <div className="wk-zone">
      <div className="wk-filter-wrap">
        <div className="gg-wrap">
          <div className="wk-filter">
            <div className="wk-types" role="radiogroup" aria-label="Project type" style={{ "--k": pillIndex, "--n": typeKeys.length } as React.CSSProperties}>
              <span className="wk-types__pill" aria-hidden="true" />
              {typeKeys.map((key, i) => {
                const count = typeCount(key);
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={type === key}
                    aria-disabled={count === 0 && type !== key ? true : undefined}
                    tabIndex={type === key ? 0 : -1}
                    className={count === 0 && type !== key ? "wk-chip is-disabled" : "wk-chip"}
                    onClick={() => (count === 0 && type !== key ? undefined : apply(key, services))}
                    onKeyDown={(event) => onTypeKey(event, i, typeKeys)}
                  >
                    {key === "all" ? "All" : TYPE_LABEL[key]}
                    <span className="wk-chip__count">{count}</span>
                  </button>
                );
              })}
            </div>
            <span className="wk-divider" aria-hidden="true" />
            <div className="wk-services" role="group" aria-label="Services">
              {serviceList.map(({ name }) => {
                const on = services.includes(name);
                const count = serviceCount(name);
                const disabled = !on && count === 0;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={on}
                    aria-disabled={disabled ? true : undefined}
                    className={["wk-svc", on && "is-on", disabled && "is-disabled"].filter(Boolean).join(" ")}
                    onClick={() => (disabled ? undefined : toggleService(name))}
                  >
                    <span className="wk-svc__check" aria-hidden="true">
                      <Icon name="check" size={14} stroke={2.6} />
                    </span>
                    {name}
                  </button>
                );
              })}
              {services.length ? (
                <button type="button" className="wk-clear" onClick={() => apply(type, [])}>
                  Clear filters
                </button>
              ) : null}
            </div>
            <button type="button" className="wk-svc wk-svc--sheet" onClick={() => sheet.current?.open()}>
              <Icon name="layers" size={16} stroke={2} />
              Services
              {services.length ? <span className="wk-chip__count">{services.length}</span> : null}
            </button>
          </div>
          <p className="wk-results" aria-live="polite">
            Showing {shownCount} of {projects.length}
          </p>
        </div>
      </div>

      <div className="gg-wrap wk-gridwrap">
        <div className="wk-grid" data-reveal="stagger" style={{ "--gg-stagger-step": "100ms" } as React.CSSProperties}>
          {shown.map((p) => (
            <div
              key={p.slug}
              ref={(el) => {
                if (el) cards.current.set(p.slug, el);
                else cards.current.delete(p.slug);
              }}
              className={leaving.includes(p.slug) ? "wk-item is-leaving" : "wk-item"}
            >
              <LinkedCard href={`/work/${p.slug}`} className="wk-card">
                <span className="wk-card__img gg-card__cover">
                  <span className="wk-card__imgin">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1200px) 554px, (min-width: 768px) 45vw, 330px" />
                  </span>
                  <Tag tone={p.kind === "studio" ? "dark" : "neutral"} className="wk-card__tag">
                    {p.typeLabel}
                  </Tag>
                </span>
                <span className="wk-card__body">
                  <span className="wk-card__title-row">
                    <span className="wk-card__title">{p.title}</span>
                    <ArrowChip size={48} className="wk-card__chip" />
                  </span>
                  <span className="wk-card__summary">
                    <Resp long={p.summary} short={p.summaryShort} />
                  </span>
                  <span className="wk-card__ticks">
                    {p.services.map((s) => (
                      <span key={s}>
                        <Icon name="check" size={14} stroke={2.4} />
                        {s}
                      </span>
                    ))}
                  </span>
                  <span className="wk-card__services-m">{p.services.join(" · ")}</span>
                  <span className="wk-card__result">
                    <span className="gg-kicker">MEASURED</span>
                    <span>{p.keyResult}</span>
                  </span>
                </span>
              </LinkedCard>
            </div>
          ))}

          {shown.length === 0 ? (
            <div className="wk-empty" data-reveal="fade-up">
              <h2>No projects match these filters</h2>
              <Button variant="outline" onClick={() => apply("all", [])}>
                Clear filters
              </Button>
            </div>
          ) : null}

          <div className="wk-next">
            <div className="wk-next__copy">
              <h2>Your project could be next</h2>
              <p>
                <Resp
                  long="We’re a young studio and we’d rather show you real, testable work than pad this out with stock mock-ups."
                  short="We’d rather show you real, testable work than pad this out with stock mock-ups."
                />
              </p>
            </div>
            <div className="wk-next__slot">
              <span className="hm-hide-phone">Your business here</span>
              <ButtonLink href="/start-project?ref=work" variant="coral" full>
                Start your project
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <BottomSheet
        ref={sheet}
        title="Filter by service"
        footer={
          <div className="wk-sheet__foot">
            <Button variant="primary" full onClick={() => sheet.current?.close()}>
              Show {shownCount} project{shownCount === 1 ? "" : "s"}
            </Button>
          </div>
        }
      >
        <div className="wk-sheet">
          <button type="button" className="wk-sheet__clear" onClick={() => apply(type, [])}>
            Clear
          </button>
          <ul>
            {serviceList.map(({ name }) => {
              const on = services.includes(name);
              return (
                <li key={name}>
                  <button type="button" role="checkbox" aria-checked={on} onClick={() => toggleService(name)}>
                    <span className={on ? "wk-box is-on" : "wk-box"}>
                      <Icon name="check" size={14} stroke={2.6} />
                    </span>
                    <span className="wk-sheet__name">{name}</span>
                    <span className="wk-sheet__count">{serviceCount(name)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </BottomSheet>
    </div>
  );
}
