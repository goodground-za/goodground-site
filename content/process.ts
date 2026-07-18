/** Copy verbatim from the copy deck §1 Section 5. */

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    number: "01",
    title: "Prepare the Ground",
    description: "We start by understanding your business, your customers, and your goals.",
  },
  {
    number: "02",
    title: "Lay the Foundation",
    description: "Strategy, messaging, and site structure — before a single pixel is designed.",
  },
  {
    number: "03",
    title: "Build with Purpose",
    description: "Design, development, UX, and SEO foundations, built as one system.",
  },
  {
    number: "04",
    title: "Cultivate Growth",
    description: "Testing, optimisation, and refinement after launch.",
  },
  {
    number: "05",
    title: "The Harvest",
    description: "A website that keeps working for your business, month after month.",
  },
];
