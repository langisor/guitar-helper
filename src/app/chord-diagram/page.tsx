import WhatIsDrawer from "@/chords/components/what-is-drawer";
import ChordDiagramContent, { ChordDiagramDemo } from "@/chords/components/what-is/chord-diagram";

export const metadata = {
  title: "Chord Diagram | Guitar Learning",
  description:
    "Learn how to read chord diagrams with an interactive example and comprehensive guide.",
};

export default function Page() {
  return (
    <WhatIsDrawer
      title="Chord Diagram"
      drawerTitle="How to Read Chord Diagrams"
      drawerDescription="A complete guide to understanding chord diagrams and finger positions"
      buttonLabel="What's Chord Diagram"
      drawerContent={<ChordDiagramContent />}
    >
      <ChordDiagramDemo />
    </WhatIsDrawer>
  );
}
