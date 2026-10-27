"use client";

import { useState, type CSSProperties } from "react";

import { FaqAccordion } from "../FaqAccordion";
import { SectionHeader } from "../SectionHeader";
import { launchFaqItems } from "./data";

/**
 * Launch 09. The shared accordion (one open, first open). On phones only four
 * questions show, then "+ 6 more questions" opens the rest. All ten are in the
 * HTML either way (CSS hides, nothing is removed).
 */
export function LaunchFaq() {
  const [all, setAll] = useState(false);
  const extra = launchFaqItems.length - 4;

  return (
    <div id="faq" className={all ? "hm-faq ln-faq is-all" : "hm-faq ln-faq"}>
      <div className="hm-faq__intro">
        <SectionHeader tag="FAQ" heading="Your questions, answered." headingClass="gg-h2-side hm-h2" />
      </div>
      <div className="hm-faq__list" data-reveal="stagger" style={{ "--gg-stagger-step": "50ms" } as CSSProperties}>
        <FaqAccordion items={launchFaqItems} tone="plain" />
        <button type="button" className="ln-faq__more" hidden={all} onClick={() => setAll(true)}>
          + {extra} more questions
        </button>
      </div>
    </div>
  );
}
