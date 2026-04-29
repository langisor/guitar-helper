import WhatIsDrawer from "@/chords/components/what-is-drawer";
import ProgressionContent from "@/chords/components/what-is/progression";
import ProgressionBuilder from "@/chords/components/progression-builder";

export const metadata = {
  title: "Chord Progression Builder | Chord Viewer",
  description:
    "Build chord progressions with Roman numerals, explore secondary dominants, borrowed chords, and get AI-powered chord suggestions.",
};

export default function ProgressionsPage() {
  return (
    <WhatIsDrawer
      drawerTitle="Chord Progressions Explained"
      drawerDescription="Learn about chord progressions, Roman numerals, and common patterns"
      buttonLabel="What's Progression"
      drawerContent={<ProgressionContent />}
    >
      <ProgressionBuilder />
    </WhatIsDrawer>
  );
}
