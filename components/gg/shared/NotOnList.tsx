import { ButtonLink } from "../Button";
import { Icon } from "../Icon";

/**
 * The dashed "Not on the list?" card (README 4.12): says the industries shown
 * are only some of the ones GoodGround works with. `onWhite` fills it with
 * canvas for use on a white section. Its button goes to
 * /start-project?ref=industry-other.
 */
export function NotOnList({ onWhite = false }: { onWhite?: boolean }) {
  return (
    <div className={onWhite ? "hm-more hm-more--canvas" : "hm-more"} data-reveal="fade-up">
      <span className="hm-more__icon" aria-hidden="true">
        <Icon name="plus" size={22} stroke={2.2} />
      </span>
      <div className="hm-more__text">
        <p className="gg-kicker hm-more__kicker">NOT ON THE LIST?</p>
        <h3 className="hm-more__title">These are just some of the industries we work with.</h3>
        <p>If your business needs to be found and trusted online, we can build for it, whatever you do.</p>
      </div>
      <ButtonLink href="/start-project?ref=industry-other" full>
        Tell us about your business
      </ButtonLink>
    </div>
  );
}
