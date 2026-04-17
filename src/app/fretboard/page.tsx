import FretboardExplorer from "@/chords/components/fretboard-explorer";

export const metadata = {
  title: "Fretboard Explorer | Chord Viewer",
  description:
    "Visualize chord positions across the entire fretboard with voice leading analysis.",
};

export default function FretboardPage() {
  return <FretboardExplorer />;
}
