/**
 * The client's own artwork (brief/reference/goodground-index-page-images).
 * These are final assets, not placeholders.
 *
 * Each PNG ships pre-masked: rounded corners are baked in and the seedling
 * deliberately breaks out above the frame, on a transparent background. So they
 * are placed as-is — no cropping, no object-cover, no rounded-corner utilities,
 * or the composition the designer drew gets clipped.
 */

export type Img = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const images = {
  header: {
    src: "/images/header-image.png",
    width: 1434,
    height: 613,
    alt: "A seedling breaking through dark soil, backlit by low sun",
  },
  philosophy: {
    src: "/images/index-page-image-2.png",
    width: 702,
    height: 700,
    alt: "A young seedling with dew on its leaves, growing in rich soil",
  },
  budget: {
    src: "/images/index-page-image-3.png",
    width: 702,
    height: 837,
    alt: "A seedling in tilled earth, lit from the side",
  },
  about: {
    src: "/images/index-page-image-4.png",
    width: 702,
    height: 870,
    alt: "A seedling rooted in dark soil, reaching toward the light",
  },
  footer: {
    src: "/images/footer-background-image.png",
    width: 1434,
    height: 613,
    alt: "",
  },
  /**
   * Aerial forest road. Used purely as a full-bleed background twice on Home:
   * once fading down into brown (Philosophy) and once with green fading down
   * into it (WhyUs → AboutPreview). Decorative, so alt is empty.
   */
  forest: {
    src: "/images/body-forest-image.webp",
    width: 2688,
    height: 1504,
    alt: "",
  },
  /**
   * Portrait crop of the same aerial forest road, for the tall/narrow forest
   * panels on mobile where the landscape version would be cropped to a thin
   * centre strip. Swapped in below the `sm` breakpoint.
   */
  forestPortrait: {
    src: "/images/body-forest-image-portrait.webp",
    width: 1520,
    height: 2688,
    alt: "",
  },
} satisfies Record<string, Img>;
