"use client";

import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { type Service } from "@/content/services";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealStagger } from "@/components/motion-gsap/RevealSection";

/**
 * The full-detail service row (title, flagship/included/growth badge,
 * subheading, problem/approach/outcome, optional payment line + CTA) used
 * by both the homepage's WhatWeBuild section (which wraps this in its own
 * heading/CloudDivider chrome) and the /services page's deep-dive section
 * (which wraps it in the page's own chrome instead). Each row carries
 * `id={service.slug}` so PageHero's jump-index links on /services can
 * deep-link straight to a row.
 *
 * `variant="compact"` (SEO audit 2026-08-16, item 5): the six industry pages
 * were rendering this same problem/approach/outcome text in full, making it
 * byte-identical to /services and 35-55% of each industry page's word count.
 * Compact keeps each service's own `subheading` (unique per service, not
 * duplicated) and links to the full row on /services instead of repeating
 * it, so the deep copy lives in one canonical place.
 */
export function ServiceAccordion({
  services,
  className = "",
  variant = "full",
}: {
  services: Service[];
  className?: string;
  variant?: "full" | "compact";
}) {
  const [open, setOpen] = useState(0);

  if (variant === "compact") {
    return (
      <RevealStagger className={`space-y-4 ${className}`} y={16}>
        {services.map((service, i) => (
          <CompactRow key={service.slug} service={service} index={i} />
        ))}
      </RevealStagger>
    );
  }

  return (
    <RevealStagger className={`space-y-8 ${className}`} y={16}>
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
  );
}

function CompactRow({ service, index }: { service: Service; index: number }) {
  return (
    <div className="bg-ht-cream ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] rounded-card flex flex-col gap-4 p-6 ring-2 sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div className="flex items-start gap-4">
        <span className="font-ht-display text-ht-crimson text-[13px] font-bold tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-ht-display text-ht-purple text-[16px] font-bold sm:text-[18px]">{service.title}</h3>
            {service.flagship ? (
              <span className="bg-ht-orange text-ink rounded-pill px-3 py-1 text-[11px] font-bold">Flagship</span>
            ) : service.includedInEveryBuild ? (
              <span className="bg-ht-purple rounded-pill px-3 py-1 text-[11px] font-bold text-white">Included</span>
            ) : service.monthly ? (
              <span className="bg-ht-crimson rounded-pill px-3 py-1 text-[11px] font-bold text-white">Monthly</span>
            ) : service.growth ? (
              <span className="bg-ht-pink text-ht-purple rounded-pill px-3 py-1 text-[11px] font-bold">Growth</span>
            ) : null}
          </div>
          <p className="text-ht-purple/70 mt-1.5 max-w-[48ch] text-[14px] leading-[1.5]">{service.subheading}</p>
        </div>
      </div>
      <Link
        href={`/services#${service.slug}`}
        className="text-ht-crimson shrink-0 text-[14px] font-bold whitespace-nowrap underline underline-offset-4 hover:no-underline"
      >
        See full details →
      </Link>
    </div>
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
  const panelId = `service-panel-${service.slug}`;

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
    <div id={service.slug} className="bg-ht-cream ring-ht-pink shadow-[0_14px_0_0_var(--color-ht-pink)] rounded-card scroll-mt-28 overflow-hidden ring-2">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="text-ht-purple flex w-full cursor-pointer items-center gap-4 px-6 py-5 text-left transition-colors duration-150 hover:bg-black/[0.02] sm:px-8"
        >
          <span className="font-ht-display text-ht-crimson text-[13px] font-bold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-ht-display flex-1 text-[16px] font-bold sm:text-[18px]">
            {service.title}
          </span>
          {service.flagship ? (
            <span className="bg-ht-orange text-ink rounded-pill hidden shrink-0 px-3 py-1 text-[12px] font-bold sm:inline-block">
              Flagship
            </span>
          ) : service.includedInEveryBuild ? (
            <span className="bg-ht-purple rounded-pill hidden shrink-0 px-3 py-1 text-[12px] font-bold text-white sm:inline-block">
              Included
            </span>
          ) : service.monthly ? (
            <span className="bg-ht-crimson rounded-pill hidden shrink-0 px-3 py-1 text-[12px] font-bold text-white sm:inline-block">
              Monthly
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
              <p className="text-ht-purple/70 text-[12px] font-bold tracking-[0.1em] uppercase">
                The problem
              </p>
              <p className="text-ht-purple/70 mt-2 text-[14px] leading-[1.55]">{service.problem}</p>
            </div>
            <div>
              <p className="text-ht-crimson text-[12px] font-bold tracking-[0.1em] uppercase">
                Our approach
              </p>
              <p className="text-ht-purple/70 mt-2 text-[14px] leading-[1.55]">{service.solution}</p>
            </div>
            <div>
              <p className="text-ht-purple/70 text-[12px] font-bold tracking-[0.1em] uppercase">
                The outcome
              </p>
              <p className="text-ht-purple/70 mt-2 text-[14px] leading-[1.55]">{service.outcome}</p>
            </div>
          </div>

          {service.paymentLine ? (
            <p className="text-ht-purple/70 mt-5 text-[13px] leading-[1.55] italic">
              {service.paymentLine}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-5">
            {service.cta ? (
              <MagneticButton>
                <Link
                  href={service.cta.href}
                  className="font-ht-display bg-ht-orange text-ink rounded-pill inline-block px-6 py-3 text-[13px] font-bold tracking-wide uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
                >
                  {service.cta.label}
                </Link>
              </MagneticButton>
            ) : null}
            {service.relatedLink ? (
              <Link
                href={service.relatedLink.href}
                className="text-ht-crimson text-[14px] font-bold underline underline-offset-4 hover:no-underline"
              >
                {service.relatedLink.label} →
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
