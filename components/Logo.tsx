/**
 * Placeholder wordmark — the real logo is still with the brand designer
 * (dev brief §3). The sprout mark is decorative and hidden from screen readers;
 * the word "GoodGround" carries the accessible name.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-heading inline-flex items-center gap-2 text-[19px] font-semibold tracking-tight ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 shrink-0"
        fill="none"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21V10" stroke="currentColor" />
        <path
          d="M12 12c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z"
          fill="var(--color-growth-green)"
          stroke="var(--color-growth-green)"
        />
        <path
          d="M12 15c-2.8 0-5-2.2-5-5 2.8 0 5 2.2 5 5Z"
          fill="var(--color-growth-green)"
          opacity="0.55"
          stroke="none"
        />
      </svg>
      GoodGround
    </span>
  );
}
