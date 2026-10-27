"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { formatRand } from "../format";
import { Icon } from "../Icon";
import { PillToggle } from "../PillToggle";
import { SectionHeader } from "../SectionHeader";
import { Tag } from "../Tag";
import { balanceOf, BILLING_OPTIONS, BILLING_OPTIONS_SHORT, depositOf, instalmentFor, packageViews, type PackageView } from "./data";
import { usePricing } from "./PricingProvider";

/** The price block: both views occupy one grid cell, so the card never changes size and numbers crossfade. */
function PriceViews({ pkg }: { pkg: PackageView }) {
  const { billing } = usePricing();
  const deposit = depositOf(pkg.total);
  const balance = balanceOf(pkg.total);
  const monthly = instalmentFor(pkg.total);
  const depositLine = `${formatRand(deposit)} deposit + ${formatRand(balance)} on completion`;

  return (
    <div className="pr-price">
      <div className="pr-price__view" data-on={billing === "deposit" ? "" : undefined} inert={billing !== "deposit"}>
        <p className="pr-price__main">
          <small>from</small>
          <strong className="gg-number">{formatRand(pkg.total)}</strong>
        </p>
        <p className="pr-price__split">{depositLine}</p>
        <p className="pr-price__alt">or {formatRand(monthly)}/mo × 12</p>
      </div>
      <div className="pr-price__view" data-on={billing === "instalments" ? "" : undefined} inert={billing !== "instalments"}>
        <p className="pr-price__main">
          <strong className="gg-number">{formatRand(monthly)}</strong>
          <small>/mo</small>
        </p>
        <p className="pr-price__split">× 12 · total from {formatRand(pkg.total)}</p>
        <p className="pr-price__alt">or {depositLine}</p>
      </div>
    </div>
  );
}

/**
 * Pricing 03. Billing toggle (remembered, and shared with the configurator),
 * four cards that stagger in with Grow last. On phones the cards collapse to a
 * name and a price; tap to open the inclusions (one open, Grow by default).
 */
export function Packages() {
  const { billing, setBilling, attach, compare } = usePricing();
  const [open, setOpen] = useState("grow");
  const [pulse, setPulse] = useState<string | null>(null);
  const timer = useRef(0);

  // "Compare →" in the configurator: open that card on phones and pulse it.
  useEffect(() => {
    if (!compare) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(compare.slug);
    setPulse(compare.slug);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPulse(null), 1600);
    return () => window.clearTimeout(timer.current);
  }, [compare]);

  return (
    <>
      <div className="hm-hide-phone">
        <SectionHeader
          tag="THE PACKAGES"
          heading="Four starting points. Pick the one closest to your brief."
          layout="split"
          cta={<PillToggle options={BILLING_OPTIONS} value={billing} onChange={setBilling} label="How you pay" />}
        />
      </div>
      <div className="hm-phone-only pr-pkg-mobile-head">
        <SectionHeader heading="Four starting points." />
        <PillToggle options={BILLING_OPTIONS_SHORT} value={billing} onChange={setBilling} label="How you pay" fill size="sm" />
      </div>

      <ul className="pr-pkgs" data-reveal="stagger" style={{ "--gg-stagger-step": "100ms" } as CSSProperties}>
        {packageViews.map((pkg) => {
          const isOpen = open === pkg.slug;
          const button = (
            <ButtonLink
              href="#quote"
              variant={pkg.recommended ? "coral" : "primary"}
              full
              className="pr-pkg__cta"
              onClick={(event) => {
                event.preventDefault();
                attach({ kind: "package", slug: pkg.slug });
              }}
            >
              Choose {pkg.name}
            </ButtonLink>
          );
          return (
            <li key={pkg.slug} className={pkg.recommended ? "pr-pkg-slot is-rec" : "pr-pkg-slot"}>
              <article
                id={`package-${pkg.slug}`}
                className={["pr-pkg", pkg.recommended && "is-rec", isOpen && "is-open", pulse === pkg.slug && "is-pulse"].filter(Boolean).join(" ")}
              >
                <div className="pr-pkg__head" onClick={() => setOpen(isOpen ? "" : pkg.slug)}>
                  <h3 className="pr-pkg__name">{pkg.name.toUpperCase()}</h3>
                  {pkg.recommended ? <Tag tone="coral">RECOMMENDED</Tag> : null}
                  <button
                    type="button"
                    className="pr-pkg__toggle"
                    aria-expanded={isOpen}
                    aria-controls={`pr-pkg-body-${pkg.slug}`}
                    aria-label={`${pkg.name} details`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpen(isOpen ? "" : pkg.slug);
                    }}
                  >
                    <Icon name="chev" size={15} stroke={2.2} />
                  </button>
                </div>
                <p className="pr-pkg__tagline">{pkg.tagline}</p>
                <PriceViews pkg={pkg} />
                <div id={`pr-pkg-body-${pkg.slug}`} className="pr-pkg__body">
                  <div className="pr-pkg__body-in">
                    {button}
                    <hr className="pr-pkg__rule" />
                    <ul className="pr-pkg__incl">
                      {pkg.inclusions.map((line) => (
                        <li key={line}>
                          <Icon name="check" size={16} stroke={2.4} />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pr-pkg__best">
                      <p>
                        <span className="pr-pkg__best-label">Best for: </span>
                        {pkg.bestFor}
                      </p>
                      <p className="pr-pkg__time">
                        <Icon name="clock" size={14} stroke={2.2} />
                        {pkg.timeline}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="pr-note" data-reveal="fade-up">
        <div className="pr-note__text">
          <p className="pr-note__title">These are starting prices, not quotes.</p>
          <p>
            A five-page site for a plumber and one for a law firm rarely take the same work. We look at your project first and
            come back with a price, usually within a day or two. Once you accept it, that’s the price: nothing gets added at
            the end. No e-commerce or member-portal builds.
          </p>
        </div>
        <ButtonLink href="#quote">Get my price</ButtonLink>
      </div>
    </>
  );
}
