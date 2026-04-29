import WhatIsDrawer from "@/chords/components/what-is-drawer";
import StudioContent from "@/chords/components/what-is/studio";
import { FretboardDrawer } from "@/chords/components/studio/fretboard-drawer";

export const metadata = {
  title: "Chord Studio | Chord Viewer",
  description:
    "Interactive chord atlas with 2D/3D diagrams and audio playback.",
};

export default function FretboardDrawerHome() {
  return (
    <WhatIsDrawer
      drawerTitle="Chord Studio Explained"
      drawerDescription="Learn about 2D/3D chord diagrams, audio playback, and how to use the studio"
      buttonLabel="What's Studio"
      drawerContent={<StudioContent />}
    >
      <FretboardDrawer />
    </WhatIsDrawer>
  );
}