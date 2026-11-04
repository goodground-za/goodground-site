"use client";

import { PillToggle } from "../PillToggle";
import { SectionHeader } from "../SectionHeader";
import { MonthlyPlans, type OfferBox } from "./MonthlyPlans";
import { Packages } from "./Packages";
import { usePricing, type PlansTab } from "./PricingProvider";

const TABS: { value: PlansTab; label: string }[] = [
  { value: "monthly", label: "Monthly plans" },
  { value: "custom", label: "Custom builds" },
];

/**
 * Pricing 02 (v2). ONE section for both ways of working: a segmented switch,
 * "Monthly plans | Custom builds", and two panels under it. The switch is the
 * site's PillToggle (a radiogroup: arrow keys move and select, one tab stop).
 *
 * Both panels are in the server HTML; the one that is off is `hidden`. The
 * section stays white on both tabs, so the switch never moves when it is used.
 *
 * The always-visible zero-size anchors #monthly, #custom and the old #packages
 * sit at the top, so the browser scrolls to the right place on its own; the
 * PricingProvider puts the matching tab on show.
 */
export function Plans({ offer }: { offer: OfferBox }) {
  const { tab, chooseTab } = usePricing();
  const custom = tab === "custom";

  return (
    <section id="plans" className="hm-section hm-section--surface pr-plans" aria-labelledby="pr-plans-title">
      <span id="monthly" className="pr-anchor" aria-hidden="true" />
      <span id="custom" className="pr-anchor" aria-hidden="true" />
      {/* Old links used #packages; it still scrolls here. */}
      <span id="packages" className="pr-anchor" aria-hidden="true" />
      <div className="gg-wrap">
        <SectionHeader
          tag="PLANS"
          heading="Choose how you want to work with us."
          id="pr-plans-title"
          layout="split"
          sub="A monthly plan gets you found online. A custom build is designed around your brief."
          cta={<PillToggle options={TABS} value={tab} onChange={chooseTab} label="Plan type" fill className="pr-switch" />}
        />

        <div id="pr-panel-monthly" className="pr-panel" role="group" aria-label="Monthly plans" hidden={custom}>
          <MonthlyPlans offer={offer} />
        </div>
        <div id="pr-panel-custom" className="pr-panel" role="group" aria-label="Custom builds" hidden={!custom}>
          <Packages />
        </div>
      </div>
    </section>
  );
}
