"use client";

import { useState } from "react";
import { ChordDiagram } from "./chord-diagram";
import {
  useChord,
  useAvailableKeys,
  useAvailableSuffixes,
} from "@/chords/hooks/use-chord";
import {
  ChordKey,
  ChordSuffix,
  ChordPosition,
} from "@/chords/types/chords.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SUFFIX_LABELS: Record<string, string> = {
  major: "Major",
  minor: "Minor",
  dim: "Diminished",
};

function PositionDetail({ position }: { position: ChordPosition }) {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Position detail
        </h3>

        <div className="flex gap-2">
          {position.barres.length > 0 && (
            <Badge variant="secondary">Barre {position.barres.join(",")}</Badge>
          )}
          {position.capo && <Badge variant="outline">Capo</Badge>}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs text-muted-foreground">Base fret</p>
          <p className="text-xl font-semibold">{position.baseFret}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Fingers</p>
          <p className="text-sm">{position.fingers.join("-")}</p>
        </div>
      </div>
    </div>
  );
}

export default function ChordExplorer() {
  const keys = useAvailableKeys();
  const suffixes = useAvailableSuffixes();

  const [selectedKey, setSelectedKey] = useState<ChordKey>("C");
  const [selectedSuffix, setSelectedSuffix] = useState<ChordSuffix>("major");
  const [selectedPositionIdx, setSelectedPositionIdx] = useState(0);

  const chord = useChord(selectedKey, selectedSuffix);
  const positions = chord?.positions ?? [];
  const active = positions[selectedPositionIdx] ?? null;

  const chordName = `${selectedKey} ${
    SUFFIX_LABELS[selectedSuffix] ?? selectedSuffix
  }`;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-5xl mx-auto px-4 py-5 flex justify-between">
          <h1 className="text-lg font-semibold">Chord Explorer</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Controls */}
        <section className="flex gap-4 items-end">
          <Select
            value={selectedKey}
            onValueChange={(value) => setSelectedKey(value as ChordKey)}
          >
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {keys.map((k) => (
                <SelectItem key={k} value={k}>
                  {k}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            {suffixes.map((s) => (
              <Button
                key={s}
                size="sm"
                variant={selectedSuffix === s ? "default" : "outline"}
                onClick={() => setSelectedSuffix(s)}
              >
                {SUFFIX_LABELS[s] ?? s}
              </Button>
            ))}
          </div>

          <div className="ml-auto font-semibold text-xl">{chordName}</div>
        </section>

        {/* Positions */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {positions.map((pos, i) => (
            <button
              key={i}
              onClick={() => setSelectedPositionIdx(i)}
              className={cn(
                "border rounded-lg p-3 transition",
                selectedPositionIdx === i
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                  : "bg-card",
              )}
            >
              <ChordDiagram position={pos} />
              <p className="text-xs mt-2">Position {i + 1}</p>
            </button>
          ))}
        </section>

        {/* Detail */}
        {active && <PositionDetail position={active} />}
      </main>
    </div>
  );
}
