"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { ChordDiagram } from "@/chords/components/chord-diagram"
import { useChordRQ } from "@/chords/hooks/use-chord"
import { useAudioPlayback } from "@/chords/hooks/use-audio"
import type { ChordKey, ChordSuffix } from "@/chords/types/chords.types"
import type { PlayMode } from "@/chords/types/chords.types"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Play, Music, Fingerprint } from "lucide-react"

const Fretboard3D = dynamic(
  () => import("./fretboard-3d").then((mod) => mod.Fretboard3D),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[350px] w-full" />,
  }
)

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

function SymbolRow({ symbol, label, color }: { symbol: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[22px] text-center text-sm font-bold" style={{ color }}>
        {symbol}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Chord Studio</h1>
              <p className="text-sm text-muted-foreground">
                Interactive chord atlas with 2D/3D diagrams and audio playback
              </p>
            </div>
          </div>
        </div>

        {/* Controls Card */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Fingerprint className="h-4 w-4" />
              Chord Selection
            </CardTitle>
            <CardDescription>
              Choose a key and chord type to view finger positions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Key Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Key</span>
                <Select
                  value={selectedKey}
                  onValueChange={(value) => {
                    setSelectedKey(value as ChordKey)
                    setPositionIndex(0)
                  }}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KEYS.map((k) => (
                      <SelectItem key={k} value={INTERNAL_TO_UI[k] || k}>
                        {INTERNAL_TO_UI[k] || k}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Suffix Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Type</span>
                <Select
                  value={selectedSuffix}
                  onValueChange={(value) => {
                    setSelectedSuffix(value as ChordSuffix)
                    setPositionIndex(0)
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COMMON_SUFFIXES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Chord Label */}
              <Badge variant="secondary" className="font-mono text-lg px-3 py-1">
                {chordLabel}
              </Badge>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">View</span>
                <Tabs value={view3d ? "3d" : "2d"} onValueChange={(v) => setView3d(v === "3d")}>
                  <TabsList>
                    <TabsTrigger value="2d">2D</TabsTrigger>
                    <TabsTrigger value="3d">3D</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Play Button */}
              {position && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handlePlay}
                  disabled={!audio.isReady || audio.isPlaying}
                >
                  <Play className="h-4 w-4 mr-1" />
                  {audio.isPlaying ? "Playing" : "Play"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Card */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium">
              {chordLabel}
            </CardTitle>
            {position && (
              <CardDescription>
                Position {positionIndex + 1} of {positions.length}
                {position.baseFret > 1 ? ` · Fret ${position.baseFret}` : " · Open"}
                {position.capo ? " · Capo" : ""}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {position ? (
              view3d ? (
                <Fretboard3D position={position} chordName={chordLabel} />
              ) : (
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                  <div className="relative">
                    <ChordDiagram position={position} width={220} height={260} />
                  </div>

                  {/* Finger Legend */}
                  <div className="flex flex-col gap-2">
                    <div className="mb-1 text-sm font-medium text-muted-foreground">Fingers</div>
                    {([1, 2, 3, 4] as const).map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div
                          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{
                            background: FINGER_COLORS[f],
                            boxShadow: `0 2px 8px ${FINGER_COLORS[f]}66`,
                          }}
                        >
                          {f}
                        </div>
                        <span className="text-sm text-muted-foreground">
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
              <div className="flex h-[260px] w-[220px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No chord found
              </div>
            )}
          </CardContent>
        </Card>

        {/* Position Dots */}
        {positions.length > 1 && (
          <div className="flex justify-center gap-2">
            {positions.map((_, i) => (
              <button
                key={i}
                onClick={() => setPositionIndex(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border-none p-0 transition-all",
                  i === positionIndex
                    ? "bg-primary"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        )}

        {/* Position Previews */}
        {positions.length > 1 && (
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">
                All Voicings
              </CardTitle>
              <CardDescription>
                {positions.length} position{positions.length !== 1 ? "s" : ""} available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {positions.map((pos, i) => (
                  <button
                    key={i}
                    onClick={() => setPositionIndex(i)}
                    className={cn(
                      "group relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:bg-accent",
                      positionIndex === i
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card hover:border-primary/30"
                    )}
                  >
                    <ChordDiagram
                      position={pos}
                      width={100}
                      height={120}
                      className={cn(
                        "transition-all",
                        positionIndex === i ? "text-primary" : "text-foreground"
                      )}
                    />
                    <span className={cn(
                      "text-xs font-medium",
                      positionIndex === i ? "text-primary" : "text-muted-foreground"
                    )}>
                      {pos.baseFret > 1 ? `Fret ${pos.baseFret}` : "Open"}
                    </span>
                    {positionIndex === i && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
