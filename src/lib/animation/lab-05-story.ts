export type Lab05StoryStep = {
  accent: string;
  body: string;
  id: string;
  label: string;
  progress: number;
  title: string;
};

export type Lab05ProcessCard = {
  accent: string;
  body: string;
  id: string;
  index: string;
  title: string;
};

export const lab05StorySteps: Lab05StoryStep[] = [
  {
    accent: "#efe7d8",
    body: "A static business website sits in frame before C4 turns it into the operating layer behind growth.",
    id: "signature",
    label: "Signature",
    progress: 0,
    title: "From static site to growth system.",
  },
  {
    accent: "#cfd8e6",
    body: "The camera moves in and the flat interface starts behaving like a product.",
    id: "approach",
    label: "Approach",
    progress: 0.1,
    title: "The static site starts to move.",
  },
  {
    accent: "#d9e1ec",
    body: "Website panels assemble into a clearer offer, stronger hierarchy, and a conversion path.",
    id: "assemble",
    label: "Website",
    progress: 0.22,
    title: "The interface becomes intentional.",
  },
  {
    accent: "#efe4ce",
    body: "Strategy, design, development, automation, and analytics separate into a readable system.",
    id: "layers",
    label: "Layers",
    progress: 0.35,
    title: "The growth stack opens.",
  },
  {
    accent: "#b9c9dd",
    body: "The layers connect into an ecosystem for launch, follow-up, measurement, and improvement.",
    id: "ecosystem",
    label: "Ecosystem",
    progress: 0.52,
    title: "Every layer starts working together.",
  },
  {
    accent: "#f4f1e8",
    body: "The final frame resolves into one clear promise: build the next version of the business online.",
    id: "cta",
    label: "Resolve",
    progress: 0.72,
    title: "Build the next version of your business online.",
  },
];

export const lab05ProcessCards: Lab05ProcessCard[] = [
  {
    accent: "#efe7d8",
    body: "Clarify the offer so visitors understand what to do next.",
    id: "strategy",
    index: "01",
    title: "Strategy",
  },
  {
    accent: "#d9e1ec",
    body: "Shape a premium interface around trust, clarity, and conversion.",
    id: "design",
    index: "02",
    title: "Design",
  },
  {
    accent: "#aebccb",
    body: "Build the system with fast, maintainable frontend foundations.",
    id: "development",
    index: "03",
    title: "Development",
  },
  {
    accent: "#c9d6e7",
    body: "Reduce manual work with connected workflows and follow-up.",
    id: "automation",
    index: "04",
    title: "Automation",
  },
  {
    accent: "#f1e4cc",
    body: "Measure what matters and improve the experience over time.",
    id: "growth",
    index: "05",
    title: "Growth",
  },
];
