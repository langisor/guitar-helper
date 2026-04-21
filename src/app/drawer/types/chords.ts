export interface ChordPosition {
  frets: number[]
  fingers: number[]
  baseFret: number
  barres: number[]
  midi?: number[]
  capo?: boolean
}

export interface Chord {
  key: string
  suffix: string
  positions: ChordPosition[]
}

export interface ChordsData {
  main: {
    strings: number
    fretsOnChord: number
    name: string
  }
  tunings: {
    standard: string[]
  }
  keys: string[]
  suffixes: string[]
  chords: Record<string, Chord[]>
}

export type PlayMode = "strum" | "arpeggio"
