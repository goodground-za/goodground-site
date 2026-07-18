/**
 * The comp draws section eyebrows as filled pills, not tracked uppercase labels.
 * That also settles an earlier tension: a repeated tiny uppercase label above
 * every section reads as scaffolding, whereas a pill is a deliberate brand mark.
 */
export function Eyebrow({ children, tone = "peach" }: { children: string; tone?: "peach" | "ember" }) {
  return (
    <p
      className={`rounded-pill font-heading inline-block px-4 py-1.5 text-[14px] font-bold ${
        tone === "ember" ? "bg-ember text-peach" : "bg-peach text-bark"
      }`}
    >
      {children}
    </p>
  );
}
