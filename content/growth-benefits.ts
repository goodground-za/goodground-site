/**
 * Copy verbatim from the Ads copy deck §4 ("Why it works for small
 * businesses"). Paired with GrowthBenefits.tsx on the Services page.
 */

export type GrowthBenefit = {
  title: string;
  body: string;
};

export const growthBenefits: GrowthBenefit[] = [
  {
    title: "Results you can see.",
    body: "Every rand is tracked to a click, a call, or an enquiry. No mystery, no 'brand awareness' hand-waving.",
  },
  {
    title: "You're found first.",
    body: "Show up at the top when customers are searching, above competitors relying on luck.",
  },
  {
    title: "Start small, scale sensibly.",
    body: "Begin with a budget that suits you and grow it only as the results earn it.",
  },
  {
    title: "Beat bigger budgets with a better plan.",
    body: "Smart targeting means you don't need to outspend the big players, just out-think them.",
  },
  {
    title: "Turn the tap up or down.",
    body: "Busy season, quiet month, a new offer, we adjust in days, not quarters.",
  },
  {
    title: "Ads that match your website.",
    body: "Because we built the foundation, your ads and your site tell one consistent story, and convert better for it.",
  },
  {
    title: "One team, one relationship.",
    body: "The people who built your site run your ads. No handovers, no finger-pointing, no call centre.",
  },
];
