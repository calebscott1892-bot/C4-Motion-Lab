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
    title: "Find the shape of the idea.",
    body: "Start with positioning, intent, and the one interaction the page needs to make memorable.",
    color: "#d9e6ff",
    transform: {
      position: [-0.38, 0.12, 0],
      rotation: [0.18, -0.42, 0.08],
      scale: 1,
    },
  },
  {
    id: "design",
    label: "Design",
    title: "Compose the visual system.",
    body: "Let typography, spacing, and object staging carry the premium feeling before adding complexity.",
    color: "#a9c8ff",
    transform: {
      position: [0.28, 0.04, 0],
      rotation: [0.76, 0.52, -0.18],
      scale: 1.12,
    },
  },
  {
    id: "development",
    label: "Development",
    title: "Translate motion into code.",
    body: "Wire scroll progress into simple transforms so the browser work remains readable and debuggable.",
    color: "#eef2f8",
    transform: {
      position: [0.16, -0.18, 0],
      rotation: [1.14, 1.24, 0.2],
      scale: 0.92,
    },
  },
  {
    id: "automation",
    label: "Automation",
    title: "Prepare the pattern to scale.",
    body: "Keep the scene modular enough to reuse the scroll state, canvas setup, and staged text system.",
    color: "#7ea8ff",
    transform: {
      position: [-0.16, 0.18, 0],
      rotation: [0.36, 2.15, -0.28],
      scale: 1.18,
    },
  },
] as const satisfies readonly Lab01State[];
