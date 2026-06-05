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
    body: "A quiet C4-style signature becomes the starting point for the full digital layer.",
    id: "signature",
    label: "Signature",
    progress: 0,
    title: "From static site to growth system.",
  },
  {
    accent: "#cfd8e6",
    body: "The camera moves in, shifting the website from a flat destination into a working system.",
    id: "approach",
    label: "Approach",
    progress: 0.12,
    title: "The system comes into focus.",
  },
  {
    accent: "#d9e1ec",
    body: "Panels assemble into a conversion-focused interface with clear hierarchy and structure.",
    id: "assemble",
    label: "Website",
    progress: 0.27,
    title: "The website starts behaving like a product.",
  },
  {
    accent: "#efe4ce",
    body: "Strategy, design, development, automation, and analytics separate into a readable growth stack.",
    id: "layers",
    label: "Layers",
    progress: 0.42,
    title: "The service layer opens up.",
  },
  {
    accent: "#b9c9dd",
    body: "The layers connect into an ecosystem that can launch, follow up, measure, and improve.",
    id: "ecosystem",
    label: "Ecosystem",
    progress: 0.6,
    title: "The parts start working together.",
  },
  {
    accent: "#f4f1e8",
    body: "The story resolves into a commercial promise: build the next version of the business online.",
    id: "cta",
    label: "Resolve",
    progress: 0.8,
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
