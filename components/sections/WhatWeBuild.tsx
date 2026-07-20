"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { AuroraGlow } from "@/components/AuroraGlow";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";
import { type Service, services } from "@/content/services";

/**
 * Adapted from Grow Brand's "Our web design services / What we build" homepage
 * accordion. Reuses GoodGround's own service content (content/services.ts —
 * the same data the /services page's deep-dives already use) rather than
 * inventing a second, different categorisation, so Home never contradicts the
 * Services page. Replaces the earlier bento-grid Services section: having a
 * static grid and this accordion both covering the same 4 services back to
 * back read as repetitive, and the accordion carries more information anyway.
 */
export function WhatWeBuild() {
  const [open, setOpen] = useState(0);

  return (
    <section className="px-3 py-8 sm:px-5">
      <div className="bg-bark rounded-block grain text-peach mx-auto max-w-[1434px] overflow-hidden">
        <AuroraGlow intensity={0.3} />
        <div className="relative z-[2] px-6 py-14 sm:px-10 md:px-14 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Our web design services</Eyebrow>
              <KineticText
                as="h2"
                tone="light"
                phrases={["What we build."]}
                className="font-heading mt-6 max-w-[10ch] text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]"
              />
            </div>
            <Reveal delay={0.08}>
              <p className="max-w-[38ch] text-[15px] leading-[1.6] text-peach/70 md:pb-2">
                One team, one connected process. Here&rsquo;s what&rsquo;s actually included.
              </p>
            </Reveal>
          </div>

          <ul className="mt-10 space-y-3">
            {services.map((service, i) => (
              <ServiceRow
                key={service.slug}
                service={service}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const panelId = `wwb-panel-${service.slug}`;

  return (
    <li className="bg-cream text-bark overflow-hidden rounded-3xl">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center gap-5 px-6 py-5 text-left sm:px-8"
        >
          <span className="font-heading text-ember text-[13px] font-bold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-heading flex-1 text-[17px] font-bold sm:text-[19px]">
            {service.title}
          </span>
          {service.flagship ? (
            <span className="bg-ember text-peach rounded-pill hidden shrink-0 px-3 py-1 text-[12px] font-bold sm:inline-block">
              Flagship
            </span>
          ) : service.includedInEveryBuild ? (
            <span className="bg-bark text-peach rounded-pill hidden shrink-0 px-3 py-1 text-[12px] font-bold sm:inline-block">
              Included
            </span>
          ) : null}
          <span
            aria-hidden="true"
            className={`text-ember grid size-8 shrink-0 place-items-center rounded-full border-2 border-ember/30 transition-transform duration-200 ease-out ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 2v12M2 8h12" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 sm:px-8">
              <p className="font-heading text-bark max-w-[52ch] text-[17px] leading-[1.4] font-semibold">
                {service.subheading}
              </p>

              <div className="border-bark/10 mt-6 grid gap-5 border-t pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-bark-muted text-[12px] font-bold tracking-[0.1em] uppercase">
                    The problem
                  </p>
                  <p className="text-bark-muted mt-2 text-[14px] leading-[1.55]">{service.problem}</p>
                </div>
                <div>
                  <p className="text-ember text-[12px] font-bold tracking-[0.1em] uppercase">
                    Our approach
                  </p>
                  <p className="text-bark-muted mt-2 text-[14px] leading-[1.55]">{service.solution}</p>
                </div>
                <div>
                  <p className="text-bark-muted text-[12px] font-bold tracking-[0.1em] uppercase">
                    The outcome
                  </p>
                  <p className="text-bark-muted mt-2 text-[14px] leading-[1.55]">{service.outcome}</p>
                </div>
              </div>

              {service.cta ? (
                <div className="mt-6">
                  <ButtonLink href={service.cta.href} size="md">
                    {service.cta.label}
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
