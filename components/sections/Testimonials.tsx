import { testimonials } from "@/content/testimonials";

/**
 * Built and ready, ships hidden (CLAUDE.md §9). Renders nothing until
 * content/testimonials.ts holds real quotes — populating that file is the only
 * step needed to switch this on.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="bg-cream text-bark rounded-card flex flex-col p-7"
            >
              <blockquote className="text-[17px] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div>
                  <p className="font-heading text-[15px] font-bold">{t.name}</p>
                  <p className="text-bark-muted text-[13px]">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
