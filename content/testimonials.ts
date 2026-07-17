/**
 * Empty at launch and staying that way until real quotes exist — CLAUDE.md §9.
 * The TestimonialSection component reads this array and renders nothing when it
 * is empty, so populating this file is the only step needed to switch it on.
 * Do not add sample or "temporary" entries.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [];
