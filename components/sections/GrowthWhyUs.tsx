/** Ads copy deck §6 ("Why GoodGround"). */
const reasons = [
  {
    title: "Foundation first, then growth",
    body: "We don’t run ads to a weak website, it’s pouring water on dry ground. Because we build the foundation, we make sure the traffic we send actually converts.",
  },
  {
    title: "Your budget, treated like ours",
    body: "We’d rather spend less and get you more. No inflated budgets, no clicks for the sake of clicks, just leads that turn into work.",
  },
  {
    title: "A partner, not a vendor",
    body: "The same team behind your site runs your ads. We think in seasons and years, not one-off campaigns, and we’re in it with you after launch.",
  },
];

/**
 * Rebuilt 2026-09-11 onto the homepage's `.reason-grid` — hairline-ruled
 * columns on paper, exactly the "Reasons to work with us" pattern.
 *
 * It was three solid orange cards with white text, which failed WCAG AA three
 * times over (the numbers at 1.64:1, the titles at 3.86:1, the body at 3.14:1)
 * and put two orange blocks back to back with the CTA below it. AGENTS.md is
 * explicit that white text never goes on this orange.
 */
export function GrowthWhyUs() {
  return (
    <div className="home-2026">
      <section className="reasons section-light section-pad" aria-labelledby="growth-why-title">
        <div className="wrap">
          <div className="section-meta">
            <span className="eyebrow">Why GoodGround</span>
            <span className="eyebrow">One team, one connected process</span>
          </div>

          <div className="section-heading-row">
            <h2 className="display-heading reveal" id="growth-why-title">
              Why grow with GoodGround<span className="accent-text">.</span>
            </h2>
            <p className="section-description reveal">
              The team that built your foundation is the team that brings people to it. Nothing gets
              handed over to a third party halfway through.
            </p>
          </div>

          <div className="reason-grid">
            {reasons.map((reason, i) => (
              <article className="reveal" key={reason.title}>
                <span className="reason-number">{String(i + 1).padStart(2, "0")}</span>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
