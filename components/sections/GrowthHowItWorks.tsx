import { Eyebrow } from "@/components/Eyebrow";
import { KineticText, Reveal } from "@/components/motion/KineticText";

const steps = [
  {
    number: "1",
    title: "We learn your business",
    rest: ". Your goals, your best customers, and what a good lead is actually worth to you.",
  },
  {
    number: "2",
    title: "We build the campaigns",
    rest: ". Accounts, tracking, audiences, and creative, set up properly from the ground up.",
  },
  {
    number: "3",
    title: "We launch and manage",
    rest: ". We watch the numbers, cut what doesn't work, and put more behind what does.",
  },
  {
    number: "4",
    title: "You see the harvest",
    rest: ". A simple monthly report in plain language: spend, leads, and cost per result. No jargon.",
  },
];

/**
 * Ads copy deck §5 ("How it works"), deliberately mirroring PaymentPlan.tsx's
 * numbered-steps pattern so the build and growth services feel like one
 * family, per the deck's own note.
 */
export function GrowthHowItWorks() {
  return (
    <section id="growth-how-it-works" className="scroll-mt-24 px-3 py-16 sm:px-5 md:py-24">
      <div className="mx-auto max-w-[1434px]">
        <Eyebrow tone="ember">How it works</Eyebrow>

        <KineticText
          as="h2"
          phrases={["Growth you can", "actually budget for."]}
          className="font-heading text-pine mt-6 max-w-[16ch] text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] font-bold tracking-[-0.03em]"
        />

        <Reveal delay={0.08}>
          <p className="text-bark mt-6 max-w-[56ch] text-[clamp(0.95rem,1.25vw,1.1rem)] leading-[1.6]">
            No lock-in contracts and no surprise invoices. Just a clear monthly management fee and
            an ad budget you control, agreed upfront.
          </p>
        </Reveal>

        <ol className="border-bark/10 mt-10 grid gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number}>
              <span
                aria-hidden="true"
                className="font-heading bg-ember text-peach grid size-8 place-items-center rounded-full text-[13px] font-bold"
              >
                {step.number}
              </span>
              <p className="text-bark mt-5 max-w-[26ch] text-[15px] leading-[1.6]">
                <strong className="font-heading font-bold">{step.title}</strong>
                {step.rest}
              </p>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="text-bark-muted mt-8 text-[13px] leading-relaxed">
            Clear monthly fee. Budget you control. Cancel with 30 days&rsquo; notice.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
