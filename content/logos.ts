/**
 * The client's real logo files (brief/GoodGround logos/), replacing the interim
 * custom-drawn sprout mark. Each variant is a distinct export from the client,
 * pre-coloured for the specific surface it sits on — verified by sampling the
 * actual pixels, not assumed:
 *   nav / footer  → ink #e8e8e8 on transparent, for the dark pine/bark surfaces
 *   hero          → ink #232323 on transparent, for the light cream surface
 * Do not recolour these; they're final client assets.
 */

export const logos = {
  /** Full "goodground" wordmark, dark ink, for the cream hero background. */
  hero: {
    src: "/images/logo-hero.png",
    width: 2090,
    height: 393,
    // No wrapping labelled link here (it's the H1 itself), so this alt is what
    // announces "GoodGround" to screen readers and search crawlers.
    alt: "GoodGround",
  },
  /** Full wordmark, light ink, for the dark nav bar at desktop width. */
  navDesktop: {
    src: "/images/logo-nav-desktop.png",
    width: 2090,
    height: 393,
    alt: "",
  },
  /** Compact "gg" mark, light ink, for the dark nav bar at mobile width. */
  navMobile: {
    src: "/images/logo-nav-mobile.png",
    width: 457,
    height: 330,
    alt: "",
  },
  /** Stacked two-line lockup, light ink, for the dark footer. */
  footer: {
    src: "/images/logo-footer.png",
    width: 1459,
    height: 612,
    alt: "",
  },
} as const;
