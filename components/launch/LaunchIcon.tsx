/**
 * The ten inclusion icons for /website-launch.
 *
 * Inline SVG rather than an icon package: ten single-purpose glyphs do not
 * justify a dependency, and inlining keeps them out of the critical request
 * chain. Every one is decorative — the inclusion's own heading carries the
 * meaning — so they are hidden from assistive technology and the wrapper
 * supplies no alternative text.
 *
 * Drawn on a 24 grid with a 1.6 stroke to sit beside Oswald without shouting.
 */

const PATHS: Record<string, React.ReactNode> = {
  plan: (
    <>
      <path d="M4 5h16v14H4z" />
      <path d="M4 9h16M9 9v10" />
    </>
  ),
  pages: (
    <>
      <path d="M7 3h10l4 4v14H7z" />
      <path d="M17 3v4h4" />
      <path d="M3 7v14h11" />
    </>
  ),
  devices: (
    <>
      <path d="M3 5h13v9H3z" />
      <path d="M7 18h6" />
      <path d="M18 10h3v9h-3z" />
    </>
  ),
  domain: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.5 2.6 2.5 14.4 0 17-2.5-2.6-2.5-14.4 0-17Z" />
    </>
  ),
  mail: (
    <>
      <path d="M3 6h18v12H3z" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  calendar: (
    <>
      <path d="M4 6h16v14H4z" />
      <path d="M4 10h16M9 4v4M15 4v4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  google: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12h8" />
      <path d="m13 8 4 4-4 4" />
    </>
  ),
  enquiry: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M9 10h6" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="m12 17 4-5" />
    </>
  ),
};

export function LaunchIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name] ?? PATHS.plan}
    </svg>
  );
}

/** The tick used in the offer summary. Decorative, same reasoning. */
export function LaunchTick() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}
