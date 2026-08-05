"use client";

import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { services, type Service } from "@/content/services";
import { CloudDivider } from "@/components/home-test/CloudDivider";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";

export function WhatWeBuild() {
  const [open, setOpen] = useState(0);

  return (
    // z-30 continues the ascending overlap stack (ServiceCarousel z-1 <
    // CreativeProcess z-10 < WhoWeBuildFor z-20) — needed so the scalloped
    // divider below, which pokes up into WhoWeBuildFor's box, paints above
    // that section's orange background instead of behind it.
    <section className="bg-ht-purple relative z-30 px-6 pt-8 pb-20 sm:px-10 sm:pt-10 md:pb-28">
      <CloudDivider
        fill="var(--color-ht-purple)"
        className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full -translate-y-full"
      />

      <RevealSection className="mx-auto max-w-[1600px]">
        <p className="font-ht-display text-ht-pink text-center text-[13px] font-bold tracking-[0.15em] uppercase">
          Our Web Design Services
        </p>
        <h2 className="font-ht-display mt-3 text-center text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white uppercase">
          What We Build
        </h2>
        <p className="font-ht-body mx-auto mt-4 max-w-[46ch] text-center text-[15px] leading-[1.6] text-white/75">
          One team, one connected process. Here&rsquo;s what&rsquo;s actually included.
        </p>

        <RevealStagger className="mt-10 space-y-5" y={16}>
          {services.map((service, i) => (
            <AccordionRow
              key={service.slug}
              service={service}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </RevealStagger>
      </RevealSection>
    </section>
  );
}

function AccordionRow({
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
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const panelId = `ht-wwb-panel-${service.slug}`;

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const icon = iconRef.current;
    if (!panel) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(panel, {
        height: isOpen ? "auto" : 0,
        duration: 0.4,
        ease: "circ.out",
      });
      if (icon) gsap.to(icon, { rotate: isOpen ? 45 : 0, duration: 0.3, ease: "power2.out" });
      return () => {};
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(panel, { height: isOpen ? "auto" : 0 });
      if (icon) gsap.set(icon, { rotate: isOpen ? 45 : 0 });
      return () => {};
    });

    return () => mm.revert();
  }, [isOpen]);

  return (
    <div className="bg-ht-cream ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] rounded-card overflow-hidden ring-2">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="text-ht-purple flex w-full cursor-pointer items-center gap-4 px-6 py-5 text-left transition-colors duration-150 hover:bg-black/[0.02] sm:px-8"
        >
          <span className="font-ht-display text-ht-orange text-[13px] font-bold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-ht-display flex-1 text-[16px] font-bold sm:text-[18px]">
            {service.title}
          </span>
          {service.flagship ? (
            <span className="bg-ht-orange rounded-pill hidden shrink-0 px-3 py-1 text-[12px] font-bold text-white sm:inline-block">
              Flagship
            </span>
          ) : service.includedInEveryBuild ? (
            <span className="bg-ht-purple rounded-pill hidden shrink-0 px-3 py-1 text-[12px] font-bold text-white sm:inline-block">
              Included
            </span>
          ) : service.growth ? (
            <span className="bg-ht-pink text-ht-purple rounded-pill hidden shrink-0 px-3 py-1 text-[12px] font-bold sm:inline-block">
              Growth
            </span>
          ) : null}
          <span
            aria-hidden="true"
            className="text-ht-purple border-ht-purple/30 grid size-8 shrink-0 place-items-center rounded-full border-2"
          >
            <svg
              ref={iconRef}
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M8 2v12M2 8h12" />
            </svg>
          </span>
        </button>
      </h3>

      <div ref={panelRef} id={panelId} className="h-0 overflow-hidden">
        <div className="px-6 pb-7 sm:px-8">
          <p className="font-ht-display text-ht-purple max-w-[52ch] text-[15px] leading-[1.4] font-semibold">
            {service.subheading}
          </p>

          <div className="border-ht-purple/10 mt-6 grid gap-5 border-t pt-5 sm:grid-cols-3">
            <div>
              <p className="text-ht-purple/60 text-[12px] font-bold tracking-[0.1em] uppercase">
                The problem
              </p>
              <p className="text-ht-purple/70 mt-2 text-[14px] leading-[1.55]">{service.problem}</p>
            </div>
            <div>
              <p className="text-ht-orange text-[12px] font-bold tracking-[0.1em] uppercase">
                Our approach
              </p>
              <p className="text-ht-purple/70 mt-2 text-[14px] leading-[1.55]">{service.solution}</p>
            </div>
            <div>
              <p className="text-ht-purple/60 text-[12px] font-bold tracking-[0.1em] uppercase">
                The outcome
              </p>
              <p className="text-ht-purple/70 mt-2 text-[14px] leading-[1.55]">{service.outcome}</p>
            </div>
          </div>

          {service.paymentLine ? (
            <p className="text-ht-purple/60 mt-5 text-[13px] leading-[1.55] italic">
              {service.paymentLine}
            </p>
          ) : null}

          {service.cta ? (
            <div className="mt-6">
              <MagneticButton>
                <Link
                  href={service.cta.href}
                  className="font-ht-display bg-ht-orange rounded-pill inline-block px-6 py-3 text-[13px] font-bold tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.03]"
                >
                  {service.cta.label}
                </Link>
              </MagneticButton>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
