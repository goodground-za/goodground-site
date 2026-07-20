import type { Industry } from "@/content/industries";

/** One consistent line-icon set for the industries grid, matching ServiceIcon's weight and style. */
export function IndustryIcon({ name, className = "size-6" }: { name: Industry["icon"]; className?: string }) {
  const common = {
    "aria-hidden": true as const,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  if (name === "trades") {
    return (
      <svg {...common}>
        <path d="M14.5 6.5 18 3l3 3-3.5 3.5" />
        <path d="M16 8 6 18l-3 3 3-3L16 8Z" />
        <path d="m3 21 2.5-2.5" />
      </svg>
    );
  }
  if (name === "health") {
    return (
      <svg {...common}>
        <path d="M19 14c1.5-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }
  if (name === "hospitality") {
    return (
      <svg {...common}>
        <path d="M3 11h18" />
        <path d="M12 11V3" />
        <path d="M5 11v10h14V11" />
        <path d="M8 7s0-2 4-2 4 2 4 2" />
      </svg>
    );
  }
  if (name === "retail") {
    return (
      <svg {...common}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  }
  if (name === "professional") {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
