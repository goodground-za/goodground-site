"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatedNumber, formatRand } from "@/components/AnimatedNumber";
import { MagneticButton } from "@/components/motion-gsap/MagneticButton";
import { RevealSection, RevealStagger } from "@/components/motion-gsap/RevealSection";
import type { SelectedConfig } from "@/components/PricingEnquiryForm";
import { alaCarteCategories, alaCarteFootnote, balanceFor, baseBuildFee, depositFor, monthlyInstalmentFor, packages, type AlaCarteItem } from "@/content/pricing";

type Nudge = { type: "near"; pkg: (typeof packages)[number] } | { type: "exceeds" };

/** Closest package at or above the current total if within ~15% of it, or a
 * flag once the total has passed every package outright — the "bridge back
 * to a fixed package" nudge from the brief, in both directions. */
function findNudge(total: number): Nudge | null {
  for (const pkg of packages) {
    if (total <= pkg.total && total >= pkg.total * 0.85) return { type: "near", pkg };
  }
  if (total > packages[packages.length - 1].total) return { type: "exceeds" };
  return null;
}

export function PricingConfigurator({ onQuoteRequest }: { onQuoteRequest: (config: SelectedConfig) => void }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile bottom bar only makes sense while this section is actually on
  // screen — without this it stays pinned over the enquiry form and footer
  // for the rest of the scroll, which reads as a stuck/broken element.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setBarVisible(entry.isIntersecting), {
      rootMargin: "-10% 0px -10% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const allItems = useMemo(() => alaCarteCategories.flatMap((c) => c.items), []);
  const selectedItems = useMemo(
    () =>
      allItems
        .map((item) => ({ item, quantity: quantities[item.id] ?? 0 }))
        .filter(({ quantity }) => quantity > 0),
    [allItems, quantities],
  );
  const total = baseBuildFee.total + selectedItems.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);
  const nudge = findNudge(total);

  // Plain toggle items go 0 -> 1 -> 0. Quantifiable items (extra pages, blog
  // posts) get real +/- steppers instead, since "how many" is the point.
  const toggleItem = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) > 0 ? 0 : 1 }));
  };
  const incrementItem = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };
  const decrementItem = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) }));
  };

  const handleQuote = () => {
    onQuoteRequest({
      kind: "custom",
      items: [
        { label: baseBuildFee.label, price: baseBuildFee.total },
        ...selectedItems.map(({ item, quantity }) => ({
          label: quantity > 1 ? `${item.label} × ${quantity}` : item.label,
          price: item.price * quantity,
        })),
      ],
      total,
    });
  };

  return (
    <section ref={sectionRef} id="build-your-own" className="bg-ht-cream scroll-mt-24 px-6 pt-16 pb-28 sm:px-10 md:pt-20 lg:pb-16">
      <div className="mx-auto max-w-[1434px]">
        <RevealSection className="text-center">
          <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">
            Build your own
          </p>
          <h2 className="font-ht-display text-ht-purple mx-auto mt-6 max-w-[24ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold uppercase">
            Prefer full control? Pick a starting point and add exactly what you need.
          </h2>
          <p className="text-ht-purple/70 mx-auto mt-5 max-w-[56ch] text-[16px] leading-[1.65]">
            Every build starts from the same base and grows from there. Add what your business needs,
            watch the total update live, and send it through when you're ready.
          </p>
        </RevealSection>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <div className="rounded-card ring-ht-purple/15 mb-5 bg-white p-5 ring-2 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-ht-display text-ht-purple text-[15px] font-bold">{baseBuildFee.label}</p>
                  <p className="text-ht-purple/60 mt-1 text-[13px] leading-[1.5]">{baseBuildFee.includes}</p>
                </div>
                <span className="font-ht-display text-ht-purple shrink-0 text-[16px] font-bold tabular-nums">
                  {formatRand(baseBuildFee.total)}
                </span>
              </div>
            </div>

            <RevealStagger className="space-y-4" y={12}>
              {alaCarteCategories.map((category, i) => (
                <CategoryAccordion
                  key={category.name}
                  name={category.name}
                  items={category.items}
                  isOpen={openCategory === i}
                  onToggle={() => setOpenCategory(openCategory === i ? null : i)}
                  quantities={quantities}
                  onToggleItem={toggleItem}
                  onIncrement={incrementItem}
                  onDecrement={decrementItem}
                />
              ))}
            </RevealStagger>

            <p className="text-ht-purple/60 mt-6 text-[13px] leading-[1.6]">{alaCarteFootnote}</p>
          </div>

          {/* Desktop summary panel — sticky, offset below the fixed nav pill. */}
          <div className="hidden min-w-0 lg:col-span-5 lg:sticky lg:top-28 lg:block">
            <SummaryPanel
              selectedItems={selectedItems}
              total={total}
              nudge={nudge}
              onQuote={handleQuote}
            />
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar — compact total, tap to expand the same summary.
          Only shown while this section is actually in view (see barVisible above). */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 lg:hidden ${
          barVisible ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
      >
        {mobileSummaryOpen ? (
          <div className="bg-ht-cream max-h-[70vh] overflow-y-auto border-t border-ht-purple/10 px-4 pt-4 shadow-[0_-8px_24px_-8px_rgba(46,24,72,0.2)]">
            <SummaryPanel
              selectedItems={selectedItems}
              total={total}
              nudge={nudge}
              onQuote={handleQuote}
              compact
            />
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setMobileSummaryOpen((v) => !v)}
          aria-expanded={mobileSummaryOpen}
          className="bg-ht-purple flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <span className="text-white">
            <span className="block text-[11px] font-medium tracking-wide uppercase text-white/70">
              Your total {mobileSummaryOpen ? "▾" : "▴"}
            </span>
            <AnimatedNumber value={total} className="font-ht-display block text-[20px] font-bold tabular-nums" />
          </span>
          <span className="font-ht-display bg-ht-orange rounded-pill px-5 py-2.5 text-[13px] font-bold tracking-wide text-white uppercase">
            {mobileSummaryOpen ? "Close" : "View & Send"}
          </span>
        </button>
      </div>
    </section>
  );
}

function CategoryAccordion({
  name,
  items,
  isOpen,
  onToggle,
  quantities,
  onToggleItem,
  onIncrement,
  onDecrement,
}: {
  name: string;
  items: AlaCarteItem[];
  isOpen: boolean;
  onToggle: () => void;
  quantities: Record<string, number>;
  onToggleItem: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const panelId = `category-panel-${name.replace(/\W/g, "")}`;
  const addedCount = items.reduce((sum, item) => sum + (quantities[item.id] ?? 0), 0);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const icon = iconRef.current;
    if (!panel) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(panel, { height: isOpen ? "auto" : 0, duration: 0.4, ease: "circ.out" });
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
    <div className="rounded-card ring-ht-pink shadow-[0_10px_0_0_var(--color-ht-pink)] overflow-hidden bg-white ring-2">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="text-ht-purple flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-black/[0.02] sm:px-6"
        >
          <span className="font-ht-display flex-1 text-[15px] font-bold sm:text-[16px]">{name}</span>
          {addedCount > 0 ? (
            <span className="bg-ht-orange rounded-pill shrink-0 px-2.5 py-1 text-[11px] font-bold text-white">
              {addedCount} added
            </span>
          ) : null}
          <span aria-hidden="true" className="text-ht-purple border-ht-purple/30 grid size-7 shrink-0 place-items-center rounded-full border-2">
            <svg ref={iconRef} viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 2v12M2 8h12" />
            </svg>
          </span>
        </button>
      </h3>

      <div ref={panelRef} id={panelId} className="h-0 overflow-hidden">
        <ul className="divide-ht-purple/10 divide-y px-5 pb-2 sm:px-6">
          {items.map((item) => {
            const qty = quantities[item.id] ?? 0;
            const priceLabel = `${item.startingAt ? "from " : ""}${formatRand(item.price)}`;
            return (
              <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                <span className="text-ht-purple/85 flex-1 text-[13.5px] leading-[1.4]">{item.label}</span>

                {item.quantifiable ? (
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-ht-purple/70 w-20 shrink-0 text-right text-[13.5px] font-medium tabular-nums">
                      {priceLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onDecrement(item.id)}
                        disabled={qty === 0}
                        aria-label={`Remove one — ${item.label}`}
                        className="text-ht-purple border-ht-purple/25 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-opacity duration-150 disabled:opacity-30"
                      >
                        <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                          <path d="M2 6h8" />
                        </svg>
                      </button>
                      <span className="text-ht-purple w-4 shrink-0 text-center text-[13px] font-bold tabular-nums">{qty}</span>
                      <button
                        type="button"
                        onClick={() => onIncrement(item.id)}
                        aria-label={`Add one — ${item.label}`}
                        className="text-ht-purple border-ht-purple/25 grid size-6 shrink-0 place-items-center rounded-full border-2"
                      >
                        <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                          <path d="M6 2v8M2 6h8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onToggleItem(item.id)}
                    aria-pressed={qty > 0}
                    className="flex shrink-0 items-center gap-3"
                  >
                    <span className="text-ht-purple/70 text-[13.5px] font-medium tabular-nums">{priceLabel}</span>
                    <span
                      aria-hidden="true"
                      className={`grid size-5 shrink-0 place-items-center rounded-md border-2 transition-colors duration-150 ${
                        qty > 0 ? "bg-ht-orange border-ht-orange" : "border-ht-purple/25"
                      }`}
                    >
                      {qty > 0 ? (
                        <svg viewBox="0 0 16 16" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 8 3.5 3.5L13 5" />
                        </svg>
                      ) : null}
                    </span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function SummaryPanel({
  selectedItems,
  total,
  nudge,
  onQuote,
  compact = false,
}: {
  selectedItems: { item: AlaCarteItem; quantity: number }[];
  total: number;
  nudge: Nudge | null;
  onQuote: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-block ring-ht-purple shadow-[0_14px_0_0_var(--color-ht-purple)] bg-white p-6 ring-2 sm:p-7 ${compact ? "shadow-none ring-0 p-0" : ""}`}>
      <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.1em] uppercase">
        Your configuration
      </p>

      <div className="mt-4">
        <p className="text-ht-purple/70 flex justify-between text-[13.5px]">
          <span>{baseBuildFee.label}</span>
          <span className="tabular-nums">{formatRand(baseBuildFee.total)}</span>
        </p>
        {selectedItems.length === 0 ? (
          <p className="text-ht-purple/50 mt-3 text-[13px] italic">
            Add items from the menu to build your quote.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {selectedItems.map(({ item, quantity }) => (
              <li key={item.id} className="text-ht-purple/70 flex justify-between gap-4 text-[13.5px]">
                <span>
                  {item.label}
                  {quantity > 1 ? ` × ${quantity}` : ""}
                </span>
                <span className="shrink-0 tabular-nums">{formatRand(item.price * quantity)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-ht-purple/10 mt-5 border-t pt-5">
        <div className="flex items-baseline justify-between">
          <span className="font-ht-display text-ht-purple text-[14px] font-bold uppercase">Total</span>
          <AnimatedNumber value={total} className="font-ht-display text-ht-purple text-[clamp(1.5rem,2.6vw,2rem)] font-bold tabular-nums" />
        </div>
        <div className="text-ht-purple/60 mt-2 space-y-1 text-right text-[12.5px] leading-[1.4] font-medium">
          <p>
            <span className="text-ht-purple/80 font-semibold">{formatRand(depositFor(total))}</span> deposit
            + <span className="text-ht-purple/80 font-semibold">{formatRand(balanceFor(total))}</span> on completion
          </p>
          <p>
            or <span className="text-ht-purple/80 font-semibold">{formatRand(monthlyInstalmentFor(total))}</span>/mo × 12
          </p>
        </div>
      </div>

      {nudge?.type === "near" ? (
        <p className="bg-ht-cream text-ht-purple/80 rounded-card mt-5 p-3.5 text-[13px] leading-[1.5]">
          This is close to our <span className="font-bold">{nudge.pkg.name}</span> package (
          {formatRand(nudge.pkg.total)}) — might be simpler to start there and add on from here.{" "}
          <Link href="#packages" className="text-ht-orange font-bold underline underline-offset-4">
            Compare packages
          </Link>
        </p>
      ) : null}

      {nudge?.type === "exceeds" ? (
        <p className="bg-ht-cream text-ht-purple/80 rounded-card mt-5 p-3.5 text-[13px] leading-[1.5]">
          This is now a bigger scope than our largest package. Send it through and we'll talk you
          through it directly.
        </p>
      ) : null}

      <div className="mt-6">
        <MagneticButton>
          <button
            type="button"
            onClick={onQuote}
            className="font-ht-display bg-ht-orange rounded-pill inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 px-7 text-[14px] font-bold tracking-wide text-white uppercase transition-transform duration-200 hover:scale-[1.01]"
          >
            Get This Quote →
          </button>
        </MagneticButton>
      </div>
    </div>
  );
}
