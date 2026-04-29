"use client"

import { useState, Suspense } from "react"
import { cn } from "@/lib/utils"
import { ChordDiagram } from "@/chords/components/chord-diagram"
import { Fretboard3D } from "./fretboard-3d"
import { useChordRQ } from "@/chords/hooks/use-chord"
import { useAudioPlayback } from "@/chords/hooks/use-audio"
import type { ChordKey, ChordSuffix } from "@/chords/types/chords.types"
import type { PlayMode } from "@/chords/types/chords.types"

const FINGER_COLORS: Record<number, string> = {
  1: "#FF6B6B",
  2: "#FFD166",
  3: "#06D6A0",
  4: "#118AB2",
}

const UI_TO_INTERNAL: Record<string, string> = { "C": "C", "C#": "Csharp", "D": "D", "Eb": "Eb", "E": "E", "F": "F", "F#": "Fsharp", "G": "G", "Ab": "Ab", "A": "A", "Bb": "Bb", "B": "B" }
const INTERNAL_TO_UI: Record<string, string> = { "C": "C", "Csharp": "C#", "D": "D", "Eb": "Eb", "E": "E", "F": "F", "Fsharp": "F#", "G": "G", "Ab": "Ab", "A": "A", "Bb": "Bb", "B": "B" }
const KEYS: ChordKey[] = ["C", "Csharp", "D", "Eb", "E", "F", "Fsharp", "G", "Ab", "A", "Bb", "B"]
const COMMON_SUFFIXES: ChordSuffix[] = ["major", "minor", "7", "maj7", "m7", "dim", "dim7", "aug", "sus4", "9"]

function Ornament({
  pos,
  flip,
  flipV,
}: {
  pos: React.CSSProperties
  flip?: boolean
  flipV?: boolean
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="absolute opacity-30"
      style={{
        ...pos,
        transform: `${flip ? "scaleX(-1)" : ""} ${flipV ? "scaleY(-1)" : ""}`,
      }}
    >
      <path d="M2 2 L10 2 L10 4 L4 4 L4 10 L2 10 Z" fill="#8B6914" />
      <circle cx="5" cy="5" r="1.5" fill="#8B6914" />
    </svg>
  )
}

function SymbolRow({ symbol, label, color }: { symbol: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[22px] text-center text-sm font-bold" style={{ color }}>
        {symbol}
      </span>
      <span className="text-[11px] text-amber-700">{label}</span>
    </div>
  )
}

export function FretboardDrawer() {
  const [selectedKey, setSelectedKey] = useState<ChordKey>("C")
  const [selectedSuffix, setSelectedSuffix] = useState<ChordSuffix>("major")
  const [positionIndex, setPositionIndex] = useState(0)
  const [playMode, setPlayMode] = useState<PlayMode>("strum")
  const [view3d, setView3d] = useState(false)

  const actualKey = (UI_TO_INTERNAL[selectedKey] || selectedKey) as ChordKey
  const { data: chord } = useChordRQ(actualKey, selectedSuffix)
  const positions = chord?.positions ?? []
  const position = positions[positionIndex] ?? null
  const audio = useAudioPlayback()

  const handlePlay = () => {
    if (!position || audio.isPlaying) return
    if (playMode === "strum") {
      audio.playChord(position, 2)
    } else {
      audio.playChord(position, 1)
    }
  }

  const displayKey = INTERNAL_TO_UI[selectedKey] || selectedKey
  const chordLabel = `${displayKey} ${selectedSuffix}`

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#0a0600] via-[#1a0e02] to-[#0d0800] px-4 py-5 font-serif">
      {/* Header */}
      <div className="mb-7 text-center">
        <div className="mb-1.5 text-[11px] uppercase tracking-[6px] text-amber-700">Classical Guitar</div>
        <h1 className="m-0 text-[clamp(28px,5vw,48px)] font-normal tracking-wider text-amber-200 [text-shadow:0_0_40px_rgba(232,201,122,0.3)]">
          Chord Atlas
        </h1>
        <div className="mx-auto mt-2.5 h-0.5 w-[60px] bg-gradient-to-r from-transparent via-amber-700 to-transparent" />
      </div>

      {/* Controls Row */}
      <div className="mb-5 flex w-full max-w-[800px] flex-wrap justify-center gap-3">
        {/* Key Selector */}
        <div className="min-w-[140px] flex-1">
          <label className="mb-1.5 block text-[10px] uppercase tracking-[2px] text-amber-800">Key</label>
          <select
            value={selectedKey}
            onChange={(e) => {
              setSelectedKey(e.target.value as ChordKey)
              setPositionIndex(0)
            }}
            className="w-full cursor-pointer appearance-none rounded-lg border border-amber-900/50 bg-[#120a02] px-3 py-2 font-serif text-sm text-amber-200 outline-none [background-image:url('data:image/svg+xml,%3Csvg_xmlns=%27http://www.w3.org/2000/svg%27_width=%2712%27_height=%278%27%3E%3Cpath_d=%27M0_0l6_8_6-8z%27_fill=%27%238B6914%27/%3E%3C/svg%3E')] [background-position:right_10px_center] [background-repeat:no-repeat]"
          >
            {KEYS.map((k) => (
              <option key={k} value={INTERNAL_TO_UI[k] || k}>
                {INTERNAL_TO_UI[k] || k}
              </option>
            ))}
          </select>
        </div>

        {/* Suffix Selector */}
        <div className="min-w-[200px] flex-[2]">
          <label className="mb-1.5 block text-[10px] uppercase tracking-[2px] text-amber-800">Chord Type</label>
          <select
            value={selectedSuffix}
            onChange={(e) => {
              setSelectedSuffix(e.target.value as ChordSuffix)
              setPositionIndex(0)
            }}
            className="w-full cursor-pointer appearance-none rounded-lg border border-amber-900/50 bg-[#120a02] px-3 py-2 font-serif text-sm text-amber-200 outline-none [background-image:url('data:image/svg+xml,%3Csvg_xmlns=%27http://www.w3.org/2000/svg%27_width=%2712%27_height=%278%27%3E%3Cpath_d=%27M0_0l6_8_6-8z%27_fill=%27%238B6914%27/%3E%3C/svg%3E')] [background-position:right_10px_center] [background-repeat:no-repeat]"
          >
            {COMMON_SUFFIXES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex flex-col">
          <label className="mb-1.5 block text-[10px] uppercase tracking-[2px] text-amber-800">View</label>
          <div className="flex gap-1.5">
            <button
              onClick={() => setView3d(false)}
              className={cn(
                "rounded-lg border px-4 py-2 font-serif text-xs tracking-wider transition-all",
                !view3d
                  ? "border-amber-700 bg-amber-900/50 text-amber-200"
                  : "border-amber-900/30 bg-transparent text-amber-900"
              )}
            >
              2D
            </button>
            <button
              onClick={() => setView3d(true)}
              className={cn(
                "rounded-lg border px-4 py-2 font-serif text-xs tracking-wider transition-all",
                view3d
                  ? "border-amber-700 bg-amber-900/50 text-amber-200"
                  : "border-amber-900/30 bg-transparent text-amber-900"
              )}
            >
              3D
            </button>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-[720px] overflow-hidden rounded-[20px] border border-amber-900/30 bg-gradient-to-br from-[#1c1005] to-[#120a02] px-8 py-7 shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(232,201,122,0.1)]">
        {/* Decorative corner ornaments */}
        <Ornament pos={{ top: 12, left: 12 }} />
        <Ornament pos={{ top: 12, right: 12 }} flip />
        <Ornament pos={{ bottom: 12, left: 12 }} flipV />
        <Ornament pos={{ bottom: 12, right: 12 }} flip flipV />

        {/* Chord Name */}
        <div className="mb-5 text-center">
          <div className="text-[clamp(26px,4vw,40px)] font-normal tracking-wider text-amber-200 [text-shadow:0_0_20px_rgba(232,201,122,0.4)]">
            {chordLabel}
          </div>
          {position && (
            <div className="mt-1 text-xs tracking-wider text-amber-800">
              Position {positionIndex + 1} of {positions.length}
              {position.baseFret > 1 ? ` · Fret ${position.baseFret}` : " · Open"}
              {position.capo ? " · Capo" : ""}
            </div>
          )}
        </div>

        {/* Diagram Area */}
        <div className="mb-5 flex justify-center">
          {position ? (
            view3d ? (
              <Suspense
                fallback={
                  <div className="flex h-[350px] w-full items-center justify-center text-amber-800">
                    Loading 3D view...
                  </div>
                }
              >
                <Fretboard3D position={position} chordName={chordLabel} />
              </Suspense>
            ) : (
              <div className="flex gap-6">
                <div
                  className="relative transition-transform duration-500"
                  style={{
                    filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.7))",
                  }}
                >
                  <ChordDiagram position={position} width={220} height={260} />
                </div>

                {/* Finger Legend */}
                <div className="flex flex-col justify-center gap-2">
                  <div className="mb-1 text-[10px] uppercase tracking-[2px] text-amber-800">Fingers</div>
                  {([1, 2, 3, 4] as const).map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div
                        className="flex h-[22px] w-[22px] items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{
                          background: FINGER_COLORS[f],
                          boxShadow: `0 2px 8px ${FINGER_COLORS[f]}66`,
                        }}
                      >
                        {f}
                      </div>
                      <span className="text-[11px] text-amber-700">
                        {["Index", "Middle", "Ring", "Pinky"][f - 1]}
                      </span>
                    </div>
                  ))}
                  <div className="mt-2 flex flex-col gap-1">
                    <SymbolRow symbol="×" label="Muted" color="#ff4444" />
                    <SymbolRow symbol="○" label="Open" color="#06D6A0" />
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="flex h-[260px] w-[220px] items-center justify-center rounded-lg border border-dashed border-amber-900/30 text-sm text-amber-900">
              No chord found
            </div>
          )}
        </div>

        {/* Position Dots */}
        {positions.length > 1 && (
          <div className="mb-5 flex justify-center gap-2">
            {positions.map((_, i) => (
              <button
                key={i}
                onClick={() => setPositionIndex(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border-none p-0 transition-all",
                  i === positionIndex
                    ? "bg-amber-200 shadow-[0_0_10px_rgba(232,201,122,0.6)]"
                    : "bg-amber-900/50"
                )}
              />
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3">
          {/* Play mode */}
          <div className="flex overflow-hidden rounded-lg border border-amber-900/30">
            {(["strum", "arpeggio"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPlayMode(mode)}
                className={cn(
                  "border-none px-4 py-2 font-serif text-xs capitalize tracking-wider transition-all",
                  playMode === mode ? "bg-amber-900/50 text-amber-200" : "bg-transparent text-amber-800"
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Play button */}
          <button
            onClick={handlePlay}
            disabled={!position || audio.isPlaying}
            className={cn(
              "rounded-lg border-none px-7 py-2 font-serif text-[13px] font-bold tracking-[2px] text-[#0a0600] transition-all",
              audio.isPlaying
                ? "scale-[0.97] bg-gradient-to-br from-amber-700 to-amber-800 shadow-none"
                : "bg-gradient-to-br from-amber-400 to-amber-700 shadow-[0_4px_20px_rgba(201,162,39,0.4)]",
              !position && "cursor-default opacity-50"
            )}
          >
            {audio.isPlaying ? "♩ Playing…" : "▶ Play"}
          </button>
        </div>
      </div>

      {/* Position Previews */}
      {positions.length > 1 && (
        <div className="mt-6 w-full max-w-[720px]">
          <div className="mb-3 text-center text-[10px] uppercase tracking-[3px] text-amber-800">All Voicings</div>
          <div className="flex flex-wrap justify-center gap-4">
            {positions.map((pos, i) => (
              <button
                key={i}
                onClick={() => setPositionIndex(i)}
                className={cn(
                  "cursor-pointer rounded-xl border p-3 pb-2 transition-all duration-300",
                  i === positionIndex
                    ? "translate-y-[-4px] border-amber-700 bg-gradient-to-br from-[#2a1a04] to-[#1c1005] shadow-[0_0_20px_rgba(139,105,20,0.3),0_8px_30px_rgba(0,0,0,0.6)]"
                    : "border-amber-900/20 bg-gradient-to-br from-[#140c02] to-[#0d0800] shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                )}
              >
                <ChordDiagram position={pos} width={100} height={120} />
                <div className="mt-1 text-center text-[9px] tracking-wider text-amber-800">
                  {pos.baseFret > 1 ? `Fret ${pos.baseFret}` : "Open"}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-[10px] uppercase tracking-[2px] text-amber-900/50">
        Standard Tuning · E A D G B E
      </div>
    </div>
  )
}
