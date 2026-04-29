import WhatIsDrawer from "@/chords/components/what-is-drawer";
import ChordExplorerContent from "@/chords/components/what-is/chord-explorer";
import ChordExplorer from "@/chords/components/chord-explorer";

export const metadata = {
  title: "Chord Explorer | Guitar Learning",
  description:
    "Explore guitar chords across keys, types, and positions with interactive diagrams.",
};

export default function Page() {
  return (
    <WhatIsDrawer
      drawerTitle="Guitar Chords Explained"
      drawerDescription="Learn about chords, types, and how to read chord diagrams"
      buttonLabel="What's Chord"
      drawerContent={<ChordExplorerContent />}
    >
      <ChordExplorer />
    </WhatIsDrawer>
  );
}
