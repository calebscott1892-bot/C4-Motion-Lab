export type Lab = {
  slug: string;
  href: string;
  number: string;
  title: string;
  description: string;
  status: string;
};

export const labs: Lab[] = [
  {
    slug: "lab-01-pinned-hero",
    href: "/labs/lab-01-pinned-hero",
    number: "Lab 01",
    title: "Pinned 3D Hero",
    description: "A scroll-responsive primitive hero with staged text panels.",
    status: "Interactive prototype",
  },
  {
    slug: "lab-02-scroll-camera",
    href: "/labs/lab-02-scroll-camera",
    number: "Lab 02",
    title: "Scroll Camera Journey",
    description: "A depth-based camera path through the C4 process stages.",
    status: "Interactive prototype",
  },
  {
    slug: "lab-03-exploded-object",
    href: "/labs/lab-03-exploded-object",
    number: "Lab 03",
    title: "Exploded Object Diagram",
    description: "A scroll-separated service-system diagram for C4 growth layers.",
    status: "Interactive prototype",
  },
  {
    slug: "lab-04-3d-logo",
    href: "/labs/lab-04-3d-logo",
    number: "Lab 04",
    title: "3D Logo Hero",
    description: "A premium C4-style mark intro driven by scroll and light.",
    status: "Interactive prototype",
  },
  {
    slug: "lab-05-c4-story",
    href: "/labs/lab-05-c4-story",
    number: "Lab 05",
    title: "C4 Scroll Story",
    description: "A signature scroll-story turning a website into a growth system.",
    status: "Portfolio prototype",
  },
];

export function getLab(slug: string) {
  return labs.find((lab) => lab.slug === slug);
}
