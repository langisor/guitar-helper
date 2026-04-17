import ProgressionBuilder from "@/chords/components/progression-builder";

export const metadata = {
  title: "Chord Progression Builder | Chord Viewer",
  description:
    "Build chord progressions with Roman numerals, explore secondary dominants, borrowed chords, and get AI-powered chord suggestions.",
};

export default function ProgressionsPage() {
  return <ProgressionBuilder />;
}
