"use client";

import { Button } from "../Button";
import { formatRand } from "../format";
import { Tag } from "../Tag";
import { Configurator } from "./Configurator";
import { BASE_FEE, buildGroups } from "./data";
import { usePricing } from "./PricingProvider";

/**
 * Pricing 04 (v2). "Build your own" shown collapsed as one panel: tag, heading,
 * a line of copy, a chip per menu category and an Outline "Open the menu"
 * button. Opening it expands the existing configurator in place (grid rows,
 * 400ms). A ?build= link or the #build-your-own anchor arrives already open
 * (PricingProvider), and so do "Edit" on the quote form and "Compare".
 *
 * The collapsed body is inert, so it takes no tab stops and is skipped by
 * assistive tech until opened. It is clipped, not scrolled (overflow: clip),
 * so the configurator's sticky summary still sticks once it is open.
 */
export function BuildYourOwn() {
  const { buildOpen, setBuildOpen } = usePricing();

  return (
    <div className={buildOpen ? "pr-buildpanel is-open" : "pr-buildpanel"}>
      <div className="pr-buildpanel__head" data-reveal="fade-up">
        <div className="pr-buildpanel__copy">
          <Tag tone="coral">BUILD YOUR OWN</Tag>
          <h2 className="gg-h2 pr-buildpanel__title" id="pr-build-title">
            Know exactly what you need? Price it from the menu.
          </h2>
          <p className="pr-buildpanel__lead">
            Start from the {formatRand(BASE_FEE)} base build and add pages, design, features and integrations. You’ll see the total, and the
            monthly instalment, as you go.
          </p>
          <ul className="pr-buildpanel__chips" aria-label="What the menu covers">
            {buildGroups.map((group) => (
              <li key={group.name}>{group.name}</li>
            ))}
          </ul>
        </div>
        <Button
          variant="outline"
          className="pr-buildpanel__toggle"
          aria-expanded={buildOpen}
          aria-controls="pr-build-body"
          onClick={() => setBuildOpen(!buildOpen)}
        >
          {buildOpen ? "Close the menu" : "Open the menu"}
        </Button>
      </div>

      <div id="pr-build-body" className="pr-buildpanel__body" inert={!buildOpen}>
        <div className="pr-buildpanel__in">
          <Configurator />
        </div>
      </div>
    </div>
  );
}
