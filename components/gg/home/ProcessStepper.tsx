"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { Resp } from "../Resp";
import { SectionHeader } from "../SectionHeader";

const STEPS = [
  {
    title: "Research",
    long: "We learn your goals, customers and friction points before shaping anything.",
    short: "We learn your goals, customers and friction points first.",
  },
  {
    title: "Direction",
    long: "Insights become flows, wireframes and prototypes that make the direction clear.",
    short: "Insights become flows, wireframes and prototypes.",
  },
  {
    title: "Design",
    long: "Interface, content and assets designed with careful production detail.",
    short: "Interface, content and assets with careful detail.",
  },
  {
    title: "Revisions",
    long: "We refine against your feedback until every detail holds up.",
    short: "We refine against your feedback until it all holds up.",
  },
  {
    title: "Handoff",
    long: "Files, guidelines and support so the work lands cleanly.",
    short: "Files, guidelines and support so it lands cleanly.",
  },
  {
    title: "Beyond launch",
    long: "One month of support, included with every project.",
  },
];

/**
 * Home 06. A scroll-scrubbed stepper: a grey track with an ink progress line on
 * top that fills as the section crosses the viewport, each dot filling ink as
 * the line reaches it and its card appearing then (and staying). Desktop and
 * tablet lay it out as a row; phones as a vertical timeline.
 *
 * Progress is one number, `--p` (0–1), set on the list; CSS turns it into each
 * segment's fill. With no JS, reduced motion or "Pause motion" nothing is
 * scrubbed and every step shows in its final, filled state.
 */
export function ProcessStepper() {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phone = window.matchMedia("(max-width: 767px)");
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".hm-step"));
    const last = steps.length - 1;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (reduce.matches || html.dataset.motion === "off") {
        root.classList.remove("is-scrub");
        return;
      }
      root.classList.add("is-scrub");
      const vh = window.innerHeight;
      const rect = root.getBoundingClientRect();
      // Row: starts when the top reaches 75% of the viewport, done at 35%.
      // Timeline: starts at 80%, done when the bottom reaches 50%.
      const t = phone.matches
        ? (0.8 * vh - rect.top) / (0.3 * vh + rect.height)
        : (0.75 * vh - rect.top) / (0.4 * vh);
      const p = Math.min(1, Math.max(0, t));
      root.style.setProperty("--p", p.toFixed(4));
      steps.forEach((step, i) => {
        const reached = p > 0 && p * last >= i - 0.001;
        step.classList.toggle("is-lit", reached);
        // Cards stay once shown, even when scrolling back up.
        if (reached) step.classList.add("is-seen");
      });
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    const flag = new MutationObserver(request);
    flag.observe(html, { attributes: true, attributeFilter: ["data-motion"] });
    reduce.addEventListener("change", request);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      flag.disconnect();
      reduce.removeEventListener("change", request);
    };
  }, []);

  return (
    <section id="process" className="hm-section hm-section--canvas" aria-labelledby="process-title">
      <div className="gg-wrap hm-stack">
        <SectionHeader
          id="process-title"
          layout="split"
          tag="04 / HOW WE WORK"
          heading="From first brief to launch, you always know what’s next."
          headingClass="gg-h2 hm-h2"
          sub="Six clear steps, one team the whole way through, and a month of support included after launch."
          subClassName="hm-hide-phone"
          cta={<ButtonLink href="/start-project">Start your project</ButtonLink>}
          ctaClassName="hm-hide-phone"
        />

        <ol className="hm-steps" ref={list} data-loop="">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className={i === STEPS.length - 1 ? "hm-step hm-step--last" : "hm-step"}
              style={{ "--i": i } as CSSProperties}
            >
              <div className="hm-step__rail" aria-hidden="true">
                <span className="hm-step__dot">
                  {i === STEPS.length - 1 ? <span className="hm-step__pulse" /> : null}
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="hm-step__seg">
                  <span className="hm-step__fill" />
                </span>
              </div>
              <div className="hm-step__card">
                <h3>{step.title}</h3>
                <p>
                  <Resp long={step.long} short={step.short} />
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="hm-phone-only">
          <ButtonLink href="/start-project" full>
            Start your project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
