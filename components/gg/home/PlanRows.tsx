"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

import { localPlans } from "@/content/pricing";
import { funnelEvents } from "@/lib/analytics";

import { formatRand } from "../format";
import { SplitHeading } from "../SplitHeading";
import { Tag } from "../Tag";

/**
 * Home 03: the three monthly plans as rows in the pricing card. Every figure
 * and line reads content/pricing.ts `localPlans`. Each row is one link into the
 * short plan form with that plan chosen and fires plan_card_click. The price
 * is a LINE MASK (never a count-up).
 */
export function PlanRows() {
  return (
    <ul className="hm-plans" aria-label="Monthly plans" data-reveal="stagger" style={{ "--gg-stagger-step": "80ms" } as CSSProperties}>
      {localPlans.map((plan) => {
        const feature = plan.slug === "local-plus";
        return (
          <li key={plan.slug}>
            <Link
              href={`/start-project?plan=${plan.slug}&ref=home`}
              className={feature ? "hm-plan is-rec" : "hm-plan"}
              onClick={() => funnelEvents.planCardClick({ plan: plan.slug, ref: "home" })}
            >
              <span className="hm-plan__text">
                <span className="hm-plan__name">
                  {plan.name}
                  {feature ? <Tag tone="coral">MOST POPULAR</Tag> : null}
                </span>
                <span className="hm-plan__line">{plan.oneLine}</span>
              </span>
              <div className="hm-plan__price" data-reveal="line-mask">
                <SplitHeading as="p" className="gg-number hm-plan__amount" text={formatRand(plan.monthly)} />
                <small>/mo</small>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
