import type { CSSProperties } from "react";

import { faq } from "@/content/faq";

import { ButtonLink } from "../Button";
import { FaqAccordion, type FaqItem } from "../FaqAccordion";
import { Icon } from "../Icon";
import { SectionHeader } from "../SectionHeader";

/**
 * Home 10. Questions and phone wording as drawn; answers come from the live
 * FAQ (content/faq.ts, by position) except the first, which Figma writes out.
 * Only the first question is open on load and only one is ever open.
 *
 * No FAQPage JSON-LD here: /faq already emits it for this same question set,
 * and repeating it put duplicate FAQPage content on two indexed URLs (the
 * reason app/page.tsx has carried that note since the first homepage port).
 * That differs from the README line "FAQPage wherever an accordion is shown" and
 * is flagged for the owner in the tracker.
 */
const QUESTIONS: { question: string; short?: string; liveIndex: number }[] = [
  { question: "How do the two payment options work?", liveIndex: 0 },
  { question: "Is there a deposit before you start?", liveIndex: 1 },
  { question: "What happens if the scope changes partway through?", short: "What if the scope changes partway through?", liveIndex: 2 },
  { question: "What if I need to pause or cancel the project?", short: "Can I pause or cancel the project?", liveIndex: 3 },
  { question: "Do you only build websites, or handle design and SEO too?", short: "Do you handle design and SEO too?", liveIndex: 4 },
  { question: "How long does a typical project take?", liveIndex: 5 },
  { question: "What happens after my website launches?", short: "What happens after launch?", liveIndex: 6 },
  { question: "Do you work with businesses anywhere in South Africa?", short: "Do you work anywhere in South Africa?", liveIndex: 7 },
];

const FIRST_ANSWER = {
  long: "We agree one fixed price up front. Then choose: a 50% deposit and 50% on completion, or 12 equal monthly instalments where the first secures your booking and the other 11 start once the project is complete.",
  short:
    "One fixed price up front. Then choose: 50% deposit and 50% on completion, or 12 equal monthly instalments where the first secures your booking.",
};

const ITEMS: FaqItem[] = QUESTIONS.map(({ question, short, liveIndex }) => {
  const live = faq[liveIndex]?.answer ?? "";
  return liveIndex === 0
    ? { question, answer: [FIRST_ANSWER.long], short: { answer: [FIRST_ANSWER.short] } }
    : { question, answer: [live], short: short ? { question: short } : undefined };
});

export function HomeFaq() {
  return (
    <section id="faq" className="hm-section hm-section--surface" aria-labelledby="faq-title">
      <div className="gg-wrap hm-faq">
        <div className="hm-faq__intro">
          <SectionHeader
            id="faq-title"
            tag="08 / FAQ"
            heading="Questions, answered."
            headingClass="gg-h2 hm-h2"
            sub="Everything you need to know about pricing, timelines and what happens after launch."
            subClassName="hm-hide-phone"
          />
          <div className="hm-contact hm-contact--card" data-reveal="fade-up">
            <span className="hm-contact__icon">
              <Icon name="mail" size={22} stroke={2} />
            </span>
            <h3>Still have a question?</h3>
            <p>
              Email <a className="gg-text-link" href="mailto:hello@goodground.co.za">hello@goodground.co.za</a> and a real person will get back to you.
            </p>
            <ButtonLink href="/faq" variant="outline">
              All questions
            </ButtonLink>
          </div>
        </div>

        <div className="hm-faq__list" data-reveal="stagger" style={{ "--gg-stagger-step": "50ms" } as CSSProperties}>
          <FaqAccordion items={ITEMS} tone="home" />
        </div>

        <a className="hm-contact hm-contact--row" href="mailto:hello@goodground.co.za">
          <span className="hm-contact__icon">
            <Icon name="mail" size={20} stroke={2} />
          </span>
          <span className="hm-contact__text">
            <strong>Still have a question?</strong>
            <span>hello@goodground.co.za</span>
          </span>
        </a>
      </div>
    </section>
  );
}
