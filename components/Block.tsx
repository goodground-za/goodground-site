import type { ReactNode } from "react";
import { AuroraGlow } from "@/components/AuroraGlow";

/**
 * An inset layout unit: a large-radius block, held to the centred max-width with
 * a page-edge gutter around it, in one of four surfaces. Used for sections the
 * comp draws as floating rounded cards (the FAQ block, and the About/Insights
 * pages) rather than as full-bleed bands.
 */
export function Block({
  children,
  tone,
  className = "",
  grain = true,
  glow,
  id,
}: {
  children: ReactNode;
  tone: "bark" | "ember" | "cream" | "pine";
  className?: string;
  /** Grain sits on the dark and orange surfaces in the comp, not on cream. */
  grain?: boolean;
  /** Ambient aurora warmth. Defaults on for the dark tones, where it reads. */
  glow?: boolean;
  id?: string;
}) {
  const tones = {
    bark: "bg-bark text-peach",
    pine: "bg-pine text-peach",
    ember: "bg-ember text-peach",
    cream: "bg-cream text-bark",
  };

  const grainy = grain && tone !== "cream" ? "grain" : "";
  const showGlow = glow ?? (tone === "bark" || tone === "pine");

  return (
    <section id={id} className={`px-3 sm:px-5 ${className}`}>
      <div
        className={`rounded-block mx-auto max-w-[1434px] overflow-hidden ${tones[tone]} ${grainy}`}
      >
        {showGlow ? <AuroraGlow intensity={0.32} /> : null}
        <div className="relative z-[2]">{children}</div>
      </div>
    </section>
  );
}

/** Inner gutter shared by block content. */
export function BlockInner({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`px-6 py-14 sm:px-10 md:px-14 md:py-20 ${className}`}>{children}</div>;
}
