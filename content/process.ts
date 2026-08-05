/** Copy verbatim from the copy deck §1 Section 5. */

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    number: "01",
    title: "Research",
    description: "We understand your goals, users, and friction points before shaping the solution.",
  },
  {
    number: "02",
    title: "Direction",
    description: "We turn insights into flows, wireframes, and prototypes that make the direction clear.",
  },
  {
    number: "03",
    title: "Design",
    description: "We design the interface, system, content, and assets with careful production detail.",
  },
  {
    number: "04",
    title: "Revisions",
    description: "We refine the work against your feedback, tightening details until everything holds up.",
  },
  {
    number: "05",
    title: "Handoff",
    description: "We hand off files, guidelines, and support so the work lands cleanly.",
  },
  {
    number: "06",
    title: "Beyond Launch",
    description: "One month of support, included.",
  },
];
