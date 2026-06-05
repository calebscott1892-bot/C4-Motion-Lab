export type Lab02Stage = {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  accent: string;
  shape: "sphere" | "torus" | "box" | "octahedron" | "cone";
  position: [number, number, number];
  scale: number;
  align: "left" | "right";
};

export const lab02Stages = [
  {
    id: "discover",
    index: "01",
    label: "Discover",
    title: "Enter the brief.",
    body: "Map the opportunity, the audience, and the first signal the experience needs to send.",
    accent: "#d8dee9",
    shape: "sphere",
    position: [-1.3, 0.1, 0],
    scale: 1,
    align: "left",
  },
  {
    id: "design",
    index: "02",
    label: "Design",
    title: "Shape the spatial language.",
    body: "Turn intent into composition, hierarchy, timing, and a restrained visual system.",
    accent: "#aebbd0",
    shape: "torus",
    position: [1.1, -0.18, -6.2],
    scale: 1.08,
    align: "right",
  },
  {
    id: "build",
    index: "03",
    label: "Build",
    title: "Make the journey tangible.",
    body: "Translate the designed path into camera movement, primitives, lighting, and scroll rhythm.",
    accent: "#eef1f5",
    shape: "box",
    position: [-0.45, 0.36, -12.4],
    scale: 1.04,
    align: "left",
  },
  {
    id: "automate",
    index: "04",
    label: "Automate",
    title: "Connect the system.",
    body: "Use reusable state and predictable motion logic so the scene can support richer workflows later.",
    accent: "#9eb3d6",
    shape: "octahedron",
    position: [1.28, 0.08, -18.6],
    scale: 1,
    align: "right",
  },
  {
    id: "grow",
    index: "05",
    label: "Grow",
    title: "Expand without losing focus.",
    body: "Keep the pattern legible as it evolves into larger stories, campaigns, and product systems.",
    accent: "#c9d2df",
    shape: "cone",
    position: [-0.18, -0.12, -24.8],
    scale: 1.1,
    align: "left",
  },
] as const satisfies readonly Lab02Stage[];
