import { Instrument_Sans, Parkinsans } from "next/font/google";

/**
 * New fonts for this draft only (2026-08-19 reference brief): Parkinsans for
 * headings, Instrument Sans for body. Scoped to this route rather than
 * touching app/layout.tsx's Syne/DM Sans — the brief calls these "the fonts
 * for the entire website," but per the same test-before-promote pattern
 * this whole home-test-2 route already follows, they land here first and
 * only go global if/when this layout is approved and promoted.
 *
 * Scoping works by redefining the *same* CSS custom properties the rest of
 * the site's components already read (--font-heading, --font-body, and the
 * ht-* aliases in globals.css) on a wrapper class instead of :root. CSS
 * custom properties cascade, so every component under that wrapper — using
 * its normal Tailwind classes, unmodified — picks up these fonts instead of
 * the site-wide ones automatically.
 */
// adjustFontFallback is off because Next has no built-in metric overrides for
// Parkinsans (it warns at build time), so it cannot synthesise a size-matched
// fallback. An explicit fallback stack is declared instead — without one the
// swap falls back to the browser default and shifts layout more, not less.
const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function HomeTest2Layout({ children }: { children: React.ReactNode }) {
  return (
    // bg-ht-cream: the 2026-08-20 layout is cream end to end, and the inset
    // Our Process panel shows this wrapper around its rounded corners.
    <div
      className={`${parkinsans.variable} ${instrumentSans.variable} ht2-fonts bg-ht-cream`}
      style={
        {
          "--font-heading": "var(--font-parkinsans), ui-sans-serif, system-ui, sans-serif",
          "--font-body": "var(--font-instrument-sans), ui-sans-serif, system-ui, sans-serif",
          "--font-ht-display": "var(--font-parkinsans), ui-sans-serif, system-ui, sans-serif",
          "--font-ht-body": "var(--font-instrument-sans), ui-sans-serif, system-ui, sans-serif",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
