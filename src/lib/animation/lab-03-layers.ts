export type Lab03Layer = {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  accent: string;
  secondary: string;
  icon: "brand" | "website" | "seo" | "automation" | "analytics" | "crm";
  explodedPosition: [number, number, number];
  explodedRotation: [number, number, number];
};

export const lab03Layers = [
  {
    id: "brand",
    index: "01",
    label: "Brand",
    title: "Brand",
    body: "Identity and positioning",
    accent: "#f2f0e8",
    secondary: "#818997",
    icon: "brand",
    explodedPosition: [-1.05, 1.05, -0.55],
    explodedRotation: [0.02, -0.12, -0.035],
  },
  {
    id: "website",
    index: "02",
    label: "Website",
    title: "Website",
    body: "Conversion-focused interface",
    accent: "#c8d2df",
    secondary: "#5d6b7c",
    icon: "website",
    explodedPosition: [0.1, 0.66, 0.12],
    explodedRotation: [-0.02, 0.08, 0.018],
  },
  {
    id: "seo",
    index: "03",
    label: "SEO",
    title: "SEO",
    body: "Search-ready structure",
    accent: "#aebbd0",
    secondary: "#667389",
    icon: "seo",
    explodedPosition: [1.12, 0.18, 0.72],
    explodedRotation: [-0.035, 0.18, 0.03],
  },
  {
    id: "automation",
    index: "04",
    label: "Automation",
    title: "Automation",
    body: "Time-saving workflows",
    accent: "#dfe5ee",
    secondary: "#748094",
    icon: "automation",
    explodedPosition: [-0.78, -0.34, 1.28],
    explodedRotation: [0.04, -0.16, 0.02],
  },
  {
    id: "analytics",
    index: "05",
    label: "Analytics",
    title: "Analytics",
    body: "Measured performance",
    accent: "#bac6d6",
    secondary: "#566273",
    icon: "analytics",
    explodedPosition: [0.24, -0.82, 1.92],
    explodedRotation: [0.035, 0.1, -0.025],
  },
  {
    id: "crm",
    index: "06",
    label: "CRM",
    title: "CRM",
    body: "Better client follow-up",
    accent: "#ecf0f5",
    secondary: "#6e7888",
    icon: "crm",
    explodedPosition: [1.18, -1.26, 2.52],
    explodedRotation: [-0.025, 0.2, 0.04],
  },
] as const satisfies readonly Lab03Layer[];
