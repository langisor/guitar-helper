"use client";

import { useState } from "react";
import { ChordDiagram } from "./chord-diagram";
import {
  useChordKeys,
  useChordSuffixes,
  useChordRQ,
} from "@/chords/hooks/use-chord";
import { ChordKey, ChordSuffix } from "@/chords/types/chords.types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChordExplorer() {
  const { data: keys = [] } = useChordKeys();
  const { data: suffixes = [] } = useChordSuffixes();

  const [selectedKey, setSelectedKey] = useState<ChordKey>("C");
  const [selectedSuffix, setSelectedSuffix] = useState<ChordSuffix>("major");

  const [positionIndex, setPositionIndex] = useState(0);

  const { data: chord } = useChordRQ(selectedKey, selectedSuffix);

  const positions = chord?.positions ?? [];
  const active = positions[positionIndex];

  return (
    <div className="p-6 space-y-6">
      {/* Controls */}
      <div className="flex gap-3">
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
              variant={selectedSuffix === s ? "default" : "outline"}
              onClick={() => setSelectedSuffix(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Positions */}
      <div className="grid grid-cols-3 gap-3">
        {positions.map((pos, i) => (
          <Button
            key={i}
            onClick={() => setPositionIndex(i)}
            className="border rounded p-3"
          >
            <ChordDiagram position={pos} />
            <p className="text-xs mt-1">Position {i + 1}</p>
          </Button>
        ))}
      </div>

      {/* Detail */}
      {active && (
        <div className="border rounded p-4">
          <p>Base fret: {active.baseFret}</p>
        </div>
      )}
    </div>
  );
}
