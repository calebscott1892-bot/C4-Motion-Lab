export type Lab02Stage = {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  accent: string;
  secondary: string;
  shape: "sphere" | "torus" | "box" | "octahedron" | "cone";
  position: [number, number, number];
  camera: {
    position: [number, number, number];
    lookAt: [number, number, number];
  };
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
    secondary: "#778394",
    shape: "sphere",
    position: [-1.35, 0.08, 0],
    camera: {
      position: [-0.6, 0.24, 6.4],
      lookAt: [-0.9, 0.04, -0.8],
    },
    scale: 0.98,
    align: "left",
  },
  {
    id: "design",
    index: "02",
    label: "Design",
    title: "Shape the spatial language.",
    body: "Turn intent into composition, hierarchy, timing, and a restrained visual system.",
    accent: "#aebbd0",
    secondary: "#586578",
    shape: "torus",
    position: [1.28, -0.2, -7.25],
    camera: {
      position: [0.5, 0.08, -2.8],
      lookAt: [0.96, -0.18, -7.95],
    },
    scale: 1.03,
    align: "right",
  },
  {
    id: "build",
    index: "03",
    label: "Build",
    title: "Make the journey tangible.",
    body: "Translate the designed path into camera movement, primitives, lighting, and scroll rhythm.",
    accent: "#eef1f5",
    secondary: "#8f98a6",
    shape: "box",
    position: [0.58, 0.22, -14.65],
    camera: {
      position: [0.9, 0.34, -8.75],
      lookAt: [0.52, 0.16, -15.4],
    },
    scale: 0.84,
    align: "left",
  },
  {
    id: "automate",
    index: "04",
    label: "Automate",
    title: "Connect the system.",
    body: "Use reusable state and predictable motion logic so the scene can support richer workflows later.",
    accent: "#9eb3d6",
    secondary: "#4f6078",
    shape: "octahedron",
    position: [1.44, 0.12, -22.15],
    camera: {
      position: [0.62, 0.22, -17.75],
      lookAt: [1.08, 0.02, -22.86],
    },
    scale: 0.98,
    align: "right",
  },
  {
    id: "grow",
    index: "05",
    label: "Grow",
    title: "Expand without losing focus.",
    body: "Keep the pattern legible as it evolves into larger stories, campaigns, and product systems.",
    accent: "#c9d2df",
    secondary: "#6e7888",
    shape: "cone",
    position: [-0.22, -0.14, -30.2],
    camera: {
      position: [-0.12, 0.08, -25.65],
      lookAt: [-0.16, -0.1, -30.9],
    },
    scale: 1.08,
    align: "left",
  },
] as const satisfies readonly Lab02Stage[];
