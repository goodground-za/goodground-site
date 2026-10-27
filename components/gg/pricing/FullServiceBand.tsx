import type { CSSProperties } from "react";

import { ButtonLink } from "../Button";
import { CountUp } from "../CountUp";
import { Icon } from "../Icon";
import { Resp } from "../Resp";
import { Tag } from "../Tag";
import { fullService } from "./data";

/**
 * Pricing 04. A plum band with the monthly price card beside it (stacked on
 * phones). FADE-UP; the chips STAGGER 50ms; "R1 500" counts up. The button goes
 * to /start-project with the service and where the visitor came from.
 */
export function FullServiceBand() {
  return (
    <div className="pr-fs" data-reveal="fade-up">
      <div className="pr-fs__copy">
        <div className="pr-fs__tag">
          <Tag tone="on-dark">
            <Resp long="MONTHLY · CANCEL ANY TIME" short="MONTHLY" />
          </Tag>
        </div>
        <h2 className="pr-fs__title">FULL SERVICE</h2>
        <p className="pr-fs__lead">{fullService.pitch}</p>
        <ul className="pr-fs__chips" data-reveal="stagger" style={{ "--gg-stagger-step": "50ms" } as CSSProperties}>
          {fullService.chips.map((chip) => (
            <li key={chip}>
              <Icon name="check" size={14} stroke={2.4} />
              {chip}
            </li>
          ))}
        </ul>
        <p className="pr-fs__short">Build, hosting, mailboxes, ongoing SEO, updates and maintenance.</p>
      </div>
      <div className="pr-fs__card">
        <p className="pr-fs__price">
          <small>from</small>
          <CountUp to={fullService.monthlyFrom} prefix="R" className="gg-number pr-fs__amount" />
          <small>
            <Resp long="/mo" short="/mo · cancel any time" />
          </small>
        </p>
        <p className="pr-fs__note">{fullService.note} No minimum term.</p>
        <ButtonLink href="/start-project?service=full-service&ref=pricing" variant="coral" full>
          Get a Full Service quote
        </ButtonLink>
      </div>
    </div>
  );
}
