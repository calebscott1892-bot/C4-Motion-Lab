import { LabPlaceholder } from "@/components/sections/lab-placeholder";
import { getLab } from "@/lib/labs";

export default function Lab01PinnedHero() {
  return <LabPlaceholder lab={getLab("lab-01-pinned-hero")!} />;
}
