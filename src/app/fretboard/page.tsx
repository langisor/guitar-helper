import WhatIsDrawer from "@/chords/components/what-is-drawer";
import FretboardContent from "@/chords/components/what-is/fretboard";
import FretboardExplorer from "@/chords/components/fretboard-explorer";

export const metadata = {
  title: "Fretboard Explorer | Chord Viewer",
  description:
    "Visualize chord positions across the entire fretboard with voice leading analysis.",
};

export default function FretboardPage() {
  return (
    <WhatIsDrawer
      drawerTitle="The Guitar Fretboard Explained"
      drawerDescription="Learn about the fretboard, string tuning, fret numbering, and chord voicings"
      buttonLabel="What's Fretboard"
      drawerContent={<FretboardContent />}
    >
      <FretboardExplorer />
    </WhatIsDrawer>
  );
}
