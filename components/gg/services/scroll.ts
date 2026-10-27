/** Smooth-scrolls to an element 120px below the top and updates the hash (Services S 02 / S 03 notes). */
export function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const root = document.documentElement;
  const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches || root.dataset.motion === "off";
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: instant ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}
