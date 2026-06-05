export type Lab01State = {
  id: string;
  label: string;
  title: string;
  body: string;
  color: string;
  transform: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
  };
};

export const lab01States = [
  {
    id: "strategy",
    label: "Strategy",
    title: "Define the motion brief.",
    body: "Clarify the role of the hero, the pacing of the reveal, and the single idea the interaction should protect.",
    color: "#d7dde8",
    transform: {
      position: [-0.24, 0.08, 0],
      rotation: [0.08, -0.34, 0.06],
      scale: 0.96,
    },
  },
  {
    id: "design",
    label: "Design",
    title: "Stage the visual system.",
    body: "Use proportion, negative space, and restrained contrast before reaching for spectacle.",
    color: "#b8c5d8",
    transform: {
      position: [0.12, 0.02, 0],
      rotation: [0.38, 0.3, -0.08],
      scale: 1.03,
    },
  },
  {
    id: "development",
    label: "Development",
    title: "Build the interaction layer.",
    body: "Map scroll progress to a small set of authored transforms, then smooth the transitions in the render loop.",
    color: "#eef1f5",
    transform: {
      position: [0.04, -0.08, 0],
      rotation: [0.62, 0.82, 0.1],
      scale: 0.99,
    },
  },
  {
    id: "automation",
    label: "Automation",
    title: "Turn the pattern into a system.",
    body: "Keep the scroll state, scene assembly, and text rhythm modular enough to reuse without diluting the design.",
    color: "#9eb3d6",
    transform: {
      position: [-0.08, 0.08, 0],
      rotation: [0.24, 1.26, -0.14],
      scale: 1.06,
    },
  },
] as const satisfies readonly Lab01State[];
