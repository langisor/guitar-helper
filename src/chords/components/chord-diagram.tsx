"use client";

import { cn } from "@/lib/utils";
import { ChordPosition } from "@/chords/types/chords.types";

interface ChordDiagramProps {
  position: ChordPosition;
  width?: number;
  height?: number;
  className?: string;
}

const STRING_NAMES = ["E", "A", "D", "G", "B", "E"];

export function ChordDiagram({
  position,
  width = 140,
  height = 160,
  className,
}: ChordDiagramProps) {
  const { frets, baseFret } = position;

  const maxFrets = 5;
  const stringCount = 6;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 120"
      className={cn("text-foreground", className)}
    >
      {/* vertical strings */}
      {Array.from({ length: stringCount }).map((_, i) => (
        <line
          key={i}
          x1={(i + 1) * 14}
          y1={10}
          x2={(i + 1) * 14}
          y2={110}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}

      {/* frets */}
      {Array.from({ length: maxFrets }).map((_, i) => (
        <line
          key={i}
          x1={14}
          y1={(i + 1) * 20}
          x2={84}
          y2={(i + 1) * 20}
          stroke="currentColor"
          strokeWidth={i === 0 ? 2 : 1}
        />
      ))}

      {/* fret markers */}
      {frets.map((fret, i) => {
        if (fret <= 0) return null;

        return (
          <circle
            key={i}
            cx={(i + 1) * 14}
            cy={fret * 20 - 10}
            r="3"
            fill="currentColor"
          />
        );
      })}

      {/* base fret label */}
      {baseFret > 1 && (
        <text x="2" y="20" fontSize="8" fill="currentColor">
          {baseFret}fr
        </text>
      )}
    </svg>
  );
}