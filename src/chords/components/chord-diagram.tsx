"use client"

import { cn } from "@/lib/utils"
import type { ChordPosition } from "@/chords/types/chords.types"

interface ChordDiagramProps {
  position: ChordPosition
  width?: number
  height?: number
  className?: string
}

// Standard guitar tuning low→high
const STRING_NAMES_STANDARD = ["E", "A", "D", "G", "B", "e"]

// fretsOnChord in chords.json is 4 — match it so the grid isn't taller than
// the chord data and dots don't appear in phantom fret rows.
const FRETS_ON_CHORD = 4
const STRING_COUNT = 6

export function ChordDiagram({
  position,
  width = 140,
  height = 160,
  className,
}: ChordDiagramProps) {
  const { frets, fingers = [], baseFret, barres = [] } = position

  // ── SVG layout ──────────────────────────────────────────────────────────
  const vbWidth = 110
  const vbHeight = 140
  const startX = 20
  const startY = 20
  const fretHeight = 20
  const stringSpacing = 12
  const endX = startX + (STRING_COUNT - 1) * stringSpacing

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      className={cn("text-foreground", className)}
    >
      {/* Nut — thick when at the first fret */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={startY}
        stroke="currentColor"
        strokeWidth={baseFret === 1 ? 3 : 1}
        opacity={0.8}
      />

      {/* Vertical strings */}
      {Array.from({ length: STRING_COUNT }).map((_, i) => (
        <line
          key={`string-${i}`}
          x1={startX + i * stringSpacing}
          y1={startY}
          x2={startX + i * stringSpacing}
          y2={startY + FRETS_ON_CHORD * fretHeight}
          stroke="currentColor"
          strokeWidth={i === 0 || i === STRING_COUNT - 1 ? 1.5 : 1}
          opacity={0.6}
        />
      ))}

      {/* Horizontal fret lines */}
      {Array.from({ length: FRETS_ON_CHORD + 1 }).map((_, i) => (
        <line
          key={`fret-${i}`}
          x1={startX}
          y1={startY + i * fretHeight}
          x2={endX}
          y2={startY + i * fretHeight}
          stroke="currentColor"
          strokeWidth={1}
          opacity={0.4}
        />
      ))}

      {/* Base-fret label (shown when not starting at fret 1) */}
      {baseFret > 1 && (
        <text
          x={4}
          y={startY + fretHeight / 2 + 3}
          fontSize="10"
          fontWeight="500"
          fill="currentColor"
          opacity={0.8}
        >
          {baseFret}
        </text>
      )}

      {/* String name labels */}
      {STRING_NAMES_STANDARD.map((name, i) => (
        <text
          key={`name-${i}`}
          x={startX + i * stringSpacing}
          y={startY - 6}
          fontSize="9"
          fontWeight="500"
          fill="currentColor"
          textAnchor="middle"
          opacity={0.6}
        >
          {name}
        </text>
      ))}

      {/* Open (○) and Mute (×) indicators above the nut */}
      {frets.map((fret, stringIdx) => {
        const x = startX + stringIdx * stringSpacing
        if (fret === 0) {
          return (
            <circle
              key={`open-${stringIdx}`}
              cx={x}
              cy={startY - 12}
              r="3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity={0.8}
            />
          )
        }
        if (fret === -1) {
          return (
            <text
              key={`mute-${stringIdx}`}
              x={x}
              y={startY - 8}
              fontSize="10"
              fontWeight="600"
              fill="currentColor"
              textAnchor="middle"
              opacity={0.6}
            >
              ×
            </text>
          )
        }
        return null
      })}

      {/* Barre bars */}
      {barres.map((barreFret, i) => {
        const barreStringIndices = frets
          .map((f, idx) => ({ fret: f, idx }))
          .filter(({ fret }) => fret === barreFret)

        if (barreStringIndices.length < 2) return null

        const firstString = Math.min(...barreStringIndices.map((s) => s.idx))
        const lastString = Math.max(...barreStringIndices.map((s) => s.idx))
        const x1 = startX + firstString * stringSpacing
        const x2 = startX + lastString * stringSpacing
        const y = startY + barreFret * fretHeight - fretHeight / 2

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
        )
      })}

      {/* Finger dots */}
      {frets.map((fret, stringIdx) => {
        if (fret <= 0) return null

        const x = startX + stringIdx * stringSpacing
        const y = startY + fret * fretHeight - fretHeight / 2
        // Guard: fingers array may be shorter than frets array
        const finger = fingers[stringIdx] ?? 0

        return (
          <g key={`marker-${stringIdx}`}>
            <circle cx={x} cy={y} r="4.5" fill="currentColor" />
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
        )
      })}
    </svg>
  )
}