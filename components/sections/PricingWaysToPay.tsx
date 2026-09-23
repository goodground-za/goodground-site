"use client";

import Link from "next/link";
import { formatRand } from "@/components/AnimatedNumber";
import { RevealSection } from "@/components/motion-gsap/RevealSection";
import { waysToPay, waysToPayColumns } from "@/content/pricing";
import { launchOffer } from "@/content/websiteLaunch";

/**
 * Every way to pay for a site, lined up on the same six questions: what you
 * pay now, what you pay monthly, for how long, what it comes to over a year,
 * what you get, and where you stand at the end. Added 2026-09-23 — before
 * this, R845/mo, R1 000/mo × 12 and R1 500/mo sat on different pages with
 * nothing comparing them.
 *
 * A real <table> from `lg` up, so the columns can be scanned down. Below that
 * each option becomes its own labelled group: a seven-column table can't be
 * read at 390px, and a horizontally scrolling one hides the very column the
 * visitor is looking for. Only one of the two is ever displayed, so a screen
 * reader meets the content once.
 */
export function PricingWaysToPay() {
  const rows = waysToPay(formatRand, launchOffer);

  return (
    <section id="ways-to-pay" className="bg-ht-cream scroll-mt-24 px-gutter pt-16 md:pt-24">
      <div className="mx-auto max-w-[1434px]">
        <RevealSection>
          <p className="font-ht-display text-ht-purple text-[13px] font-bold tracking-[0.15em] uppercase">
            Ways to pay
          </p>
          <h2 className="font-ht-display text-ht-purple mt-6 max-w-[22ch] text-[clamp(1.75rem,4vw,3rem)] leading-[1.08] font-bold uppercase">
            Four ways to pay, side by side.
          </h2>
          <p className="text-ht-purple/70 mt-5 max-w-[60ch] text-[16px] leading-[1.65]">
            Package and Full Service figures are starting prices. Your quote confirms the real
            number before any work begins, and it doesn’t change once you accept it.
          </p>
        </RevealSection>

        <RevealSection delay={0.06}>
          {/* Desktop: one table, options down the side, questions across the top. */}
          <div className="rounded-block ring-ht-purple/12 mt-10 hidden overflow-hidden bg-white ring-1 lg:block">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">Four ways to pay for a GoodGround website, compared</caption>
              <colgroup>
                <col className="w-[19%]" />
                <col className="w-[13%]" />
                <col className="w-[14%]" />
                <col className="w-[11%]" />
                <col className="w-[12%]" />
                <col className="w-[17%]" />
                <col className="w-[14%]" />
              </colgroup>
              <thead>
                <tr className="border-ht-purple/12 border-b">
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Way to pay</span>
                  </th>
                  {waysToPayColumns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="font-ht-display text-ht-purple/70 px-4 py-4 align-bottom text-[12px] font-bold tracking-[0.1em] uppercase"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-ht-purple/10 divide-y">
                {rows.map((row) => (
                  <tr key={row.id} className="align-top">
                    <th scope="row" className="px-6 py-6 font-normal">
                      <span className="font-ht-display text-ht-purple block text-[17px] leading-[1.2] font-bold uppercase">
                        {row.name}
                      </span>
                      <span className="text-ht-purple/70 mt-2 block text-[13px] leading-[1.5]">{row.note}</span>
                      <Link
                        href={row.href}
                        className="text-ht-crimson mt-3 inline-block text-[13px] font-bold underline underline-offset-4"
                      >
                        {row.linkLabel}
                      </Link>
                    </th>
                    {waysToPayColumns.map((column) => (
                      <td
                        key={column.key}
                        className={`text-ht-purple/85 px-4 py-6 text-[14px] leading-[1.55] ${
                          column.key === "monthly" || column.key === "total"
                            ? "text-ht-purple font-semibold tabular-nums"
                            : ""
                        }`}
                      >
                        {row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phone and tablet: the same rows, each its own labelled group. */}
          <ul className="rounded-block ring-ht-purple/12 divide-ht-purple/10 mt-10 divide-y bg-white ring-1 lg:hidden">
            {rows.map((row) => (
              <li key={row.id} className="px-5 py-7 sm:px-8">
                <h3 className="font-ht-display text-ht-purple text-[18px] leading-[1.2] font-bold uppercase">
                  {row.name}
                </h3>
                <p className="text-ht-purple/70 mt-1.5 text-[13.5px] leading-[1.5]">{row.note}</p>
                <dl className="mt-5 grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]">
                  {waysToPayColumns.map((column) => (
                    <div key={column.key} className="contents">
                      <dt className="font-ht-display text-ht-purple/70 pt-0.5 text-[11.5px] font-bold tracking-[0.08em] uppercase">
                        {column.label}
                      </dt>
                      <dd
                        className={`text-ht-purple/85 text-[14.5px] leading-[1.5] ${
                          column.key === "monthly" || column.key === "total"
                            ? "text-ht-purple font-semibold tabular-nums"
                            : ""
                        }`}
                      >
                        {row[column.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href={row.href}
                  className="text-ht-crimson mt-5 inline-flex min-h-11 items-center text-[14px] font-bold underline underline-offset-4"
                >
                  {row.linkLabel}
                </Link>
              </li>
            ))}
          </ul>
        </RevealSection>
      </div>
    </section>
  );
}
