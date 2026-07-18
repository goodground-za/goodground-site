/**
 * The comp uses two marks: a "GG" monogram in the nav, and the full wordmark set
 * huge in the hero and footer. Both are Montserrat Bold type, no symbol.
 */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading text-[26px] leading-none font-bold tracking-tight ${className}`}>
      GG
    </span>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading leading-none font-bold tracking-[-0.03em] ${className}`}>
      GoodGround
    </span>
  );
}
