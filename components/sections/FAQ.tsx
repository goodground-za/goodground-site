"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Block, BlockInner } from "@/components/Block";
import { Eyebrow } from "@/components/Eyebrow";
import { faq } from "@/content/faq";

/**
 * Copy deck §1 Section 8, drawn as cream pill rows on the bark block.
 *
 * Questions GoodGround hasn't confirmed answers to still appear, with an honest
 * "still working it out" state. They're the questions buyers actually ask, and a
 * guessed cancellation policy is worse than an admitted gap.
 */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Block tone="bark">
      <BlockInner>
        <Eyebrow>Have questions?</Eyebrow>

        <h2 className="font-heading mt-6 max-w-[20ch] text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
          Everything you need to know before you start.
        </h2>
        <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.6] text-peach/75">
          Fill in the form and we&rsquo;ll get back to you directly — no chatbot, no call centre.
        </p>

        {/* The comp insets the rows into a centred column rather than running
            them the full width of the block. */}
        <ul className="mx-auto mt-12 max-w-[1090px] space-y-3">
          {faq.map((item, i) => (
            <FAQRow
              key={item.question}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>
      </BlockInner>
    </Block>
  );
}

function FAQRow({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faq)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const panelId = `faq-panel-${item.question.slice(0, 12).replace(/\W/g, "")}`;

  return (
    // rounded-pill closed, easing to the card radius when open so a multi-line
    // answer doesn't sit in a lozenge.
    <li
      className={`bg-cream overflow-hidden transition-[border-radius] duration-200 ${
        isOpen ? "rounded-card" : "rounded-pill"
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="text-bark relative flex w-full cursor-pointer items-center justify-center gap-6 px-14 py-5 text-center sm:px-16"
        >
          {/* Centred to match the comp; the control is pinned right so the
              question stays optically centred whatever its length. */}
          <span className="font-heading text-[15px] leading-snug font-bold sm:text-[16px]">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={`text-ember absolute right-6 grid size-6 shrink-0 place-items-center transition-transform duration-200 ease-out sm:right-8 ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 2v12M2 8h12" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {/* The answer stays left-aligned: centred body copy is hard to read
                once it wraps, whatever the question does. */}
            <p
              className={`text-bark-muted mx-auto max-w-[80ch] px-8 pb-6 text-left text-[15px] leading-[1.7] sm:px-16 ${
                item.answer ? "" : "italic"
              }`}
            >
              {item.answer ??
                "We're still working this one out. Ask us directly and we'll tell you straight."}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
