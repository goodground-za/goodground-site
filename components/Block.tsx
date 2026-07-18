import type { ReactNode } from "react";
import { AuroraGlow } from "@/components/AuroraGlow";

/**
 * The comp's core layout unit: a large-radius block, inset from the page edges,
 * in one of three surfaces. Everything on the Home page is one of these, so the
 * inset and radius live here rather than being retyped per section.
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
