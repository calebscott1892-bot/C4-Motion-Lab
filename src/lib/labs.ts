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
    description: "A focused starting point for pinned hero composition.",
    status: "Setup placeholder",
  },
  {
    slug: "lab-02-scroll-camera",
    href: "/labs/lab-02-scroll-camera",
    number: "Lab 02",
    title: "Scroll Camera Journey",
    description: "A route reserved for camera movement and scroll timing.",
    status: "Setup placeholder",
  },
  {
    slug: "lab-03-exploded-object",
    href: "/labs/lab-03-exploded-object",
    number: "Lab 03",
    title: "Exploded Object Diagram",
    description: "A route reserved for layered object decomposition.",
    status: "Setup placeholder",
  },
  {
    slug: "lab-04-3d-logo",
    href: "/labs/lab-04-3d-logo",
    number: "Lab 04",
    title: "3D Logo Hero",
    description: "A route reserved for brand-driven 3D motion studies.",
    status: "Setup placeholder",
  },
  {
    slug: "lab-05-c4-story",
    href: "/labs/lab-05-c4-story",
    number: "Lab 05",
    title: "C4 Scroll Story",
    description: "A route reserved for combining the lab patterns.",
    status: "Setup placeholder",
  },
];

export function getLab(slug: string) {
  return labs.find((lab) => lab.slug === slug);
}
