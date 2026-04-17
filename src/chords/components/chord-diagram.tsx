"use client";

import { cn } from "@/lib/utils";
import { ChordPosition } from "@/chords/types/chords.types";

interface ChordDiagramProps {
  position: ChordPosition;
  width?: number;
  height?: number;
  className?: string;
}

const STRING_NAMES = ["E", "A", "D", "G", "B", "e"];

export function ChordDiagram({
  position,
  width = 140,
  height = 160,
  className,
}: ChordDiagramProps) {
  const { frets, fingers, baseFret, barres = [] } = position;

  const maxFrets = 5;
  const stringCount = 6;

  // Calculate SVG viewBox dimensions
  const vbWidth = 110;
  const vbHeight = 140;
  const startX = 20;
  const startY = 20;
  const fretHeight = 20;
  const stringSpacing = 12;
  const nutY = startY;
  const endX = startX + (stringCount - 1) * stringSpacing;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      className={cn("text-foreground", className)}
    >
      {/* Nut (thick line at top for fret 0 visualization) */}
      <line
        x1={startX}
        y1={nutY}
        x2={endX}
        y2={nutY}
        stroke="currentColor"
        strokeWidth={baseFret === 1 ? 3 : 1}
        opacity={0.8}
      />

      {/* Vertical strings */}
      {Array.from({ length: stringCount }).map((_, i) => {
        const x = startX + i * stringSpacing;
        return (
          <line
            key={`string-${i}`}
            x1={x}
            y1={nutY}
            x2={x}
            y2={nutY + maxFrets * fretHeight}
            stroke="currentColor"
            strokeWidth={i === 0 || i === 5 ? 1.5 : 1}
            opacity={0.6}
          />
        );
      })}

      {/* Frets */}
      {Array.from({ length: maxFrets + 1 }).map((_, i) => (
        <line
          key={`fret-${i}`}
          x1={startX}
          y1={nutY + i * fretHeight}
          x2={endX}
          y2={nutY + i * fretHeight}
          stroke="currentColor"
          strokeWidth={1}
          opacity={0.4}
        />
      ))}

      {/* Base fret label on left side */}
      {baseFret > 1 && (
        <text
          x={4}
          y={nutY + fretHeight / 2 + 3}
          fontSize="10"
          fontWeight="500"
          fill="currentColor"
          opacity={0.8}
        >
          {baseFret}
        </text>
      )}

      {/* String names at top */}
      {STRING_NAMES.map((name, i) => {
        const x = startX + i * stringSpacing;
        return (
          <text
            key={`name-${i}`}
            x={x}
            y={nutY - 6}
            fontSize="9"
            fontWeight="500"
            fill="currentColor"
            textAnchor="middle"
            opacity={0.6}
          >
            {name}
          </text>
        );
      })}

      {/* Open (O) and Mute (X) indicators */}
      {frets.map((fret, i) => {
        const x = startX + i * stringSpacing;
        if (fret === 0) {
          // Open string - circle
          return (
            <circle
              key={`open-${i}`}
              cx={x}
              cy={nutY - 12}
              r="3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity={0.8}
            />
          );
        }
        if (fret === -1) {
          // Muted string - X
          return (
            <text
              key={`mute-${i}`}
              x={x}
              y={nutY - 8}
              fontSize="10"
              fontWeight="600"
              fill="currentColor"
              textAnchor="middle"
              opacity={0.6}
            >
              ×
            </text>
          );
        }
        return null;
      })}

      {/* Barre indicators */}
      {barres.map((barreFret, i) => {
        // Find strings that have this fret to determine barre width
        const barreStrings = frets
          .map((f, idx) => ({ fret: f, idx }))
          .filter(({ fret }) => fret === barreFret);

        if (barreStrings.length < 2) return null;

        const firstString = Math.min(...barreStrings.map(s => s.idx));
        const lastString = Math.max(...barreStrings.map(s => s.idx));
        const x1 = startX + firstString * stringSpacing;
        const x2 = startX + lastString * stringSpacing;
        const y = nutY + barreFret * fretHeight - fretHeight / 2;

        return (
          <line
            key={`barre-${i}`}
            x1={x1}
            y1={y}
            x2={x2}
            y2={y}
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            opacity={0.9}
          />
        );
      })}

      {/* Fret markers (finger positions) */}
      {frets.map((fret, i) => {
        if (fret <= 0) return null;

        const x = startX + i * stringSpacing;
        const y = nutY + fret * fretHeight - fretHeight / 2;
        const finger = fingers?.[i];

        return (
          <g key={`marker-${i}`}>
            {/* Finger dot */}
            <circle
              cx={x}
              cy={y}
              r="4.5"
              fill="currentColor"
            />
            {/* Finger number (if available) */}
            {finger > 0 && (
              <text
                x={x}
                y={y + 1.5}
                fontSize="7"
                fontWeight="600"
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {finger}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}