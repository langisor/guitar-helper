"use client";

import type { ChordPosition } from "@/chords/types/chords.types";

const FINGER_COLORS: Record<number, string> = {
  1: "#FF6B6B",
  2: "#FFD166",
  3: "#06D6A0",
  4: "#118AB2",
  0: "#aaaaaa",
};

const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"];

interface ChordDiagramProps {
  position: ChordPosition | null;
  chordName: string;
  width?: number;
  height?: number;
  perspective?: boolean;
}

export function ChordDiagram({
  position,
  chordName,
  width = 180,
  height = 220,
  perspective = false,
}: ChordDiagramProps) {
  if (!position) return null;

  const { frets, fingers, baseFret, barres = [] } = position;
  const numStrings = 6;
  const numFrets = 4;

  const padL = 30;
  const padR = 18;
  const padT = 44;
  const padB = 24;
  const gridW = width - padL - padR;
  const gridH = height - padT - padB;
  const stringSpacing = gridW / (numStrings - 1);
  const fretSpacing = gridH / numFrets;

  const sx = (i: number) => padL + i * stringSpacing;
  const fy = (f: number) => padT + f * fretSpacing;

  const skew = perspective ? 8 : 0;
  const depth = perspective ? 6 : 0;

  const elements: React.ReactNode[] = [];

  // Defs
  elements.push(
    <defs key="defs">
      <linearGradient id={`wood-${chordName}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2d1b00" />
        <stop offset="100%" stopColor="#1a0f00" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="dot-shadow">
        <feDropShadow
          dx="1"
          dy="2"
          stdDeviation="1.5"
          floodColor="#000"
          floodOpacity="0.5"
        />
      </filter>
    </defs>,
  );

  // Board fill
  elements.push(
    <rect
      key="board"
      x={padL - 4}
      y={padT - 2}
      width={gridW + 8}
      height={gridH + 4}
      rx="3"
      fill={`url(#wood-${chordName})`}
      opacity="0.95"
    />,
  );

  // Fret lines
  for (let f = 0; f <= numFrets; f++) {
    const y = fy(f);
    const isNut = f === 0 && baseFret === 1;
    elements.push(
      <line
        key={`fret-${f}`}
        x1={padL - 4}
        y1={y}
        x2={padL + gridW + 4}
        y2={y + skew * (f / numFrets)}
        stroke={isNut ? "#e8c97a" : "#4a3520"}
        strokeWidth={isNut ? 5 : 1.5}
        strokeLinecap="round"
      />,
    );
    if (depth > 0 && f > 0) {
      elements.push(
        <line
          key={`fret-d-${f}`}
          x1={padL - 4}
          y1={y + 2}
          x2={padL + gridW + 4}
          y2={y + skew * (f / numFrets) + 2}
          stroke="#000"
          strokeWidth={1}
          opacity={0.3}
        />,
      );
    }
  }

  // String lines
  for (let s = 0; s < numStrings; s++) {
    const x = sx(s);
    const thickness = 0.8 + (numStrings - 1 - s) * 0.35;
    elements.push(
      <line
        key={`string-${s}`}
        x1={x}
        y1={padT}
        x2={x + skew * 0.5}
        y2={padT + gridH}
        stroke="#c8a96e"
        strokeWidth={thickness}
        opacity={0.85}
      />,
    );
  }

  // Barre lines
  barres.forEach((barreFret, bi) => {
    const startStr = frets.findIndex((f) => f === barreFret);
    const endStr =
      frets.length - 1 - [...frets].reverse().findIndex((f) => f === barreFret);
    if (startStr < 0) return;
    const y = fy(barreFret - 0.5);
    elements.push(
      <rect
        key={`barre-${bi}`}
        x={sx(startStr) - 8}
        y={y - 9}
        width={sx(endStr) - sx(startStr) + 16}
        height={18}
        rx={9}
        fill="#E63946"
        filter="url(#dot-shadow)"
        opacity={0.92}
      />,
    );
    elements.push(
      <text
        key={`barre-lbl-${bi}`}
        x={(sx(startStr) + sx(endStr)) / 2}
        y={y + 5}
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="700"
        fontFamily="'Georgia', serif"
      >
        {barreFret}
      </text>,
    );
  });

  // Finger dots
  for (let s = 0; s < numStrings; s++) {
    const fret = frets[s];
    const finger = fingers[s] ?? 0;
    const x = sx(s);

    if (fret === -1) {
      // Muted string
      elements.push(
        <g key={`mute-${s}`}>
          <line
            x1={x - 6}
            y1={padT - 20}
            x2={x + 6}
            y2={padT - 8}
            stroke="#ff4444"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1={x + 6}
            y1={padT - 20}
            x2={x - 6}
            y2={padT - 8}
            stroke="#ff4444"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>,
      );
    } else if (fret === 0) {
      // Open string
      elements.push(
        <circle
          key={`open-${s}`}
          cx={x}
          cy={padT - 14}
          r={7}
          fill="none"
          stroke="#06D6A0"
          strokeWidth={2}
        />,
      );
    } else {
      // Check if part of barre
      const isBarred = barres.some((b) => {
        const bIdx = frets.findIndex((f) => f === b);
        const eIdx =
          frets.length - 1 - [...frets].reverse().findIndex((f) => f === b);
        return fret === b && s >= bIdx && s <= eIdx;
      });
      if (isBarred) continue;

      const y = fy(fret - 0.5);
      const color = FINGER_COLORS[finger] || "#aaa";
      elements.push(
        <g key={`dot-${s}`} filter="url(#dot-shadow)">
          <circle cx={x} cy={y} r={10} fill={color} />
          <circle cx={x - 2} cy={y - 3} r={3} fill="white" opacity={0.3} />
          {finger > 0 && (
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="800"
              fontFamily="'Georgia', serif"
            >
              {finger}
            </text>
          )}
        </g>,
      );
    }
  }

  // Base fret label
  if (baseFret > 1) {
    elements.push(
      <text
        key="basefret"
        x={padL - 8}
        y={fy(0.5) + 5}
        textAnchor="end"
        fill="#e8c97a"
        fontSize="11"
        fontWeight="600"
        fontFamily="monospace"
      >
        {baseFret}fr
      </text>,
    );
  }

  // String names at bottom
  STANDARD_TUNING.forEach((note, i) => {
    elements.push(
      <text
        key={`str-name-${i}`}
        x={sx(i)}
        y={padT + gridH + 16}
        textAnchor="middle"
        fill="#6b5a3a"
        fontSize="9"
        fontFamily="monospace"
      >
        {note}
      </text>,
    );
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "visible" }}
    >
      {elements}
    </svg>
  );
}
