"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

import { addOns, fullServicePackage, localPlans, localPromises, planDepositFor, PLAN_TERM_LABEL, type LocalPlan } from "@/content/pricing";
import { newBusinessOffer } from "@/content/newBusinessOffer";
import { funnelEvents } from "@/lib/analytics";
import type { OfferSpots } from "@/lib/liveCounters";

import { ButtonLink } from "../Button";
import { formatRand } from "../format";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { PlanTermButton } from "../shared/PlanTermModal";
import { Tag } from "../Tag";
import { useLiveCounters } from "../useLiveCounters";

/** What the offer box needs from the offer count (lib/liveCounters.ts). */
export type OfferBox = Pick<OfferSpots, "left" | "total" | "soldOut" | "month" | "nextMonth">;

/** The price block: the monthly fee, the deposit that starts the build, and the 12-month plan dialog. */
function PlanPrice({ plan }: { plan: LocalPlan }) {
  return (
    <div className="pr-price">
      <div className="pr-price__view" data-on="">
        <p className="pr-price__main">
          <strong className="gg-number">{formatRand(plan.monthly)}</strong>
          <small>/mo</small>
        </p>
        <p className="pr-price__split">{formatRand(planDepositFor(plan))} deposit starts your build</p>
        <p className="pr-price__alt">
          No VAT added · <PlanTermButton placement={`pricing-${plan.slug}`}>{PLAN_TERM_LABEL}</PlanTermButton>
        </p>
      </div>
    </div>
  );
}

/** The Local Start offer box: live spaces left, linking to the New Business Offer page. */
export function OfferBoxView({ offer }: { offer: OfferBox }) {
  return (
    <div className="pr-promo">
      <p className="pr-promo__head">New business? {newBusinessOffer.summary}</p>
      <p className="pr-promo__line">
        {offer.soldOut ? (
          <>
            {offer.month} is fully booked ·{" "}
            <Link href={`${newBusinessOffer.path}#check-availability`}>Join the {offer.nextMonth} waitlist</Link>
          </>
        ) : (
          <>
            {offer.left} {offer.left === 1 ? "space" : "spaces"} left in {offer.month} · <Link href={newBusinessOffer.path}>How it works</Link>
          </>
        )}
      </p>
    </div>
  );
}

/**
 * Pricing 02 (v2), the "Monthly plans" panel of the Plans section. The three
 * monthly Local plans in the package-card styling, a promise row, the add-ons
 * row and the plum Full Service strip. Monthly only, 12-month plans.
 * On phones the cards collapse to a name and a price except Local Plus
 * (accordion, one open), like the custom builds.
 */
export function MonthlyPlans({ offer: typed }: { offer: OfferBox }) {
  // The page is static: it renders the typed count and the live one replaces it after load.
  const offer = useLiveCounters()?.offer ?? typed;
  const [open, setOpen] = useState<string>("local-plus");

  return (
    <>
      <p className="pr-panel__title">Get found online. One monthly fee, on a 12-month plan.</p>

      <ul className="pr-pkgs pr-pkgs--three" data-reveal="stagger" style={{ "--gg-stagger-step": "100ms" } as CSSProperties}>
        {localPlans.map((plan) => {
          const isOpen = open === plan.slug;
          const feature = plan.slug === "local-plus";
          const isOffer = plan.slug === newBusinessOffer.planSlug;
          return (
            <li key={plan.slug} className="pr-pkg-slot">
              <article
                id={`plan-${plan.slug}`}
                className={["pr-pkg", feature && "is-rec", isOpen && "is-open"].filter(Boolean).join(" ")}
              >
                <div className="pr-pkg__head" onClick={() => setOpen(isOpen ? "" : plan.slug)}>
                  <h3 className="pr-pkg__name">{plan.name.toUpperCase()}</h3>
                  {isOffer ? (
                    <Tag tone="coral">
                      <Resp long="NEW BUSINESS OFFER" short="NEW OFFER" />
                    </Tag>
                  ) : plan.badge ? (
                    <Tag tone="coral">{plan.badge.toUpperCase()}</Tag>
                  ) : null}
                  <button
                    type="button"
                    className="pr-pkg__toggle"
                    aria-expanded={isOpen}
                    aria-controls={`pr-plan-body-${plan.slug}`}
                    aria-label={`${plan.name} details`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpen(isOpen ? "" : plan.slug);
                    }}
                  >
                    <Icon name="chev" size={15} stroke={2.2} />
                  </button>
                </div>
                <p className="pr-pkg__tagline">{plan.tagline}</p>
                <PlanPrice plan={plan} />
                <div id={`pr-plan-body-${plan.slug}`} className="pr-pkg__body">
                  <div className="pr-pkg__body-in">
                    <ButtonLink
                      href={`/start-project?plan=${plan.slug}&ref=pricing-monthly`}
                      variant={feature ? "coral" : "primary"}
                      full
                      className="pr-pkg__cta"
                      onClick={() => funnelEvents.planCardClick({ plan: plan.slug, ref: "pricing-monthly" })}
                    >
                      Start my plan
                    </ButtonLink>
                    <hr className="pr-pkg__rule" />
                    <ul className="pr-pkg__incl">
                      {plan.inclusions.map((line, i) => (
                        <li key={line} className={plan.extendsPrevious && i === 0 ? "is-lead" : undefined}>
                          <Icon name="check" size={16} stroke={2.4} />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    {isOffer ? <OfferBoxView offer={offer} /> : null}
                    <div className="pr-pkg__best">
                      <p>
                        <span className="pr-pkg__best-label">Best for: </span>
                        {plan.bestFor}
                      </p>
                      <p className="pr-pkg__time">
                        <Icon name="clock" size={14} stroke={2.2} />
                        {plan.liveIn}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <ul className="pr-promises" aria-label="Every monthly plan" data-reveal="fade-up">
        {localPromises.map((line) => (
          <li key={line}>
            <Icon name="check" size={16} stroke={2.4} />
            {line === PLAN_TERM_LABEL ? <PlanTermButton placement="pricing-promises">{PLAN_TERM_LABEL}</PlanTermButton> : line}
          </li>
        ))}
      </ul>

      <div className="pr-addons" data-reveal="fade-up">
        <h3 className="pr-addons__title">Add when you need them</h3>
        <ul className="pr-addons__grid">
          {addOns.map((addOn) => (
            <li key={addOn.id} className="pr-addon">
              <p className="pr-addon__row">
                <strong>{addOn.name}</strong>
                <span className="pr-addon__amt gg-number">
                  {formatRand(addOn.price)} <small>{addOn.unit}</small>
                </span>
              </p>
              <p className="pr-addon__text">{addOn.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div id="full-service" className="pr-strip" data-reveal="fade-up">
        <div className="pr-strip__text">
          <h3>Want a fully custom design and managed mailboxes too?</h3>
          <p>
            Full Service: we build a custom-coded site, host it, run the mailboxes and keep it working. From{" "}
            {formatRand(fullServicePackage.monthlyFrom)}/mo, confirmed in your quote.
          </p>
        </div>
        <ButtonLink href="/start-project?service=full-service&ref=pricing" variant="coral">
          Get a Full Service quote
        </ButtonLink>
      </div>
    </>
  );
}
