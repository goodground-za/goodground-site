/**
 * A seamless ticker band. Two identical rows sit side by side and the track
 * slides one row-width, so it loops without a seam. Pure CSS (no JS): the global
 * reduced-motion override freezes it for anyone who asks. The second row is
 * aria-hidden so a screen reader reads the words once.
 */
export function Marquee({ items }: { items: string[] }) {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="font-heading text-peach px-6 text-[clamp(1rem,1.8vw,1.5rem)] font-bold tracking-tight whitespace-nowrap">
            {item}
          </span>
          <span aria-hidden="true" className="bg-ember size-2 shrink-0 rotate-45 rounded-[2px]" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="px-3 py-5 sm:px-5" aria-label="What we do">
      <div className="bg-bark grain rounded-block mx-auto max-w-[1434px] overflow-hidden">
        <div className="relative z-[2] overflow-hidden py-5">
          {/* w-max so the two rows lay out at full width; hover pauses the loop. */}
          <div className="flex w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
