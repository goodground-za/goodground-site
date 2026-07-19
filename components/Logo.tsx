/**
 * The nav previously showed a bare "GG" — two letters with no mark, no visual
 * intent. On every page, always visible, it read as an unfinished placeholder
 * rather than a brand, which undercuts a studio whose entire pitch is "we build
 * things properly." This is a real (if temporary) mark: a minimal geometric
 * sprout glyph, asymmetric leaves for a bit of life rather than a stamped
 * clipart plant, paired with the wordmark. Replace with the client's actual
 * logo file whenever it exists; until then this reads as designed, not skipped.
 */
export function Mark({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 24V13.5" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path
        d="M14 14C14 14 6.5 13 6.5 5.5C13.5 5.5 14 14 14 14Z"
        fill="currentColor"
      />
      <path
        d="M14 17.5C14 17.5 20.5 17 20.5 11C15 11 14 17.5 14 17.5Z"
        fill="currentColor"
        opacity="0.72"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading leading-none font-bold tracking-[-0.03em] ${className}`}>
      GoodGround
    </span>
  );
}

/** Icon + wordmark, for compact contexts (nav) where the bare mark used to sit alone. */
export function LogoLockup({
  className = "",
  markClassName = "size-6",
  textClassName = "text-[19px]",
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark className={markClassName} />
      <Wordmark className={textClassName} />
    </span>
  );
}
