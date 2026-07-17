/**
 * Honest figures only — CLAUDE.md §9. Every value here must be verifiable for a
 * studio founded in 2026. No client counts, no ratings, no "500+ projects".
 * Wording is verbatim from the copy deck §1 (Proof / Stat Strip).
 */

export type Stat = {
  value: string;
  /** Numeric target for the count-up; null means the value isn't countable (e.g. "1:1"). */
  countTo: number | null;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "12", countTo: 12, label: "Equal monthly payments, no surprises" },
  { value: "0", countTo: 0, label: "Large upfront invoices" },
  { value: "1:1", countTo: null, label: "Dedicated designer per project, not a queue" },
  { value: "100%", countTo: 100, suffix: "%", label: "Cape Town based, no outsourcing" },
];
