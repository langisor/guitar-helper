import WhatIsDrawer from "@/chords/components/what-is-drawer";
import MetronomeContent from "@/chords/components/what-is/metronome";
import MetronomeTrainer from "@/chords/components/metronome-trainer";

export const metadata = {
  title: "Metronome Trainer | Chord Viewer",
  description:
    "Practice with a precision metronome featuring subdivision training, mute mode, auto tempo increase, and rhythm exercises.",
};

export default function MetroTrainerPage() {
  return (
    <WhatIsDrawer
      drawerTitle="The Metronome Explained"
      drawerDescription="Learn about tempo, BPM, time signatures, and why metronome practice matters"
      buttonLabel="What's Metronome"
      drawerContent={<MetronomeContent />}
    >
      <MetronomeTrainer />
    </WhatIsDrawer>
  );
}
