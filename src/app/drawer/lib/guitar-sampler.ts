const STANDARD_TUNING = ["E2", "A2", "D3", "G3", "B3", "E4"]

const CHROMATIC = ["C", "Cs", "D", "Ds", "E", "F", "Fs", "G", "Gs", "A", "As", "B"]

const NOTE_MAP: Record<string, string> = {
  E2: "E2", F2: "F2", Fs2: "Fs2", G2: "G2", Gs2: "Gs2",
  A2: "A2", As2: "As2", B2: "B2", C3: "C3", Cs3: "Cs3",
  D3: "D3", Ds3: "Ds3", E3: "E3", F3: "F3", Fs3: "Fs3",
  G3: "G3", Gs3: "Gs3", A3: "A3", As3: "As3", B3: "B3",
  C4: "C4", Cs4: "Cs4", D4: "D4", Ds4: "Ds4", E4: "E4",
  F4: "F4", Fs4: "Fs4", G4: "G4", Gs4: "Gs4", A4: "A4",
  As4: "As4", B4: "B4", C5: "C5", Cs5: "Cs5", D5: "D5",
}

function noteNameFromMidi(midi: number): string {
  const noteIdx = midi % 12
  const octave = Math.floor(midi / 12) - 1
  return CHROMATIC[noteIdx] + octave
}

function getAudioFile(noteName: string): string {
  return `/audio/guitar/${noteName}.mp3`
}

function openNoteToMidi(note: string): number {
  const noteMap: Record<string, number> = { E2: 40, A2: 45, D3: 50, G3: 55, B3: 59, E4: 64 }
  return noteMap[note] ?? 40
}

export class GuitarSampler {
  private ctx: AudioContext | null = null
  private buffers: Record<string, AudioBuffer> = {}
  private loading: Record<string, Promise<AudioBuffer | null>> = {}

  private ensureCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume()
    }
    return this.ctx
  }

  private async loadNote(noteName: string): Promise<AudioBuffer | null> {
    if (this.buffers[noteName]) return this.buffers[noteName]
    if (this.loading[noteName]) return this.loading[noteName]

    const ctx = this.ensureCtx()
    this.loading[noteName] = fetch(getAudioFile(noteName))
      .then(r => r.arrayBuffer())
      .then(ab => ctx.decodeAudioData(ab))
      .then(buf => {
        this.buffers[noteName] = buf
        return buf
      })
      .catch(() => null)

    return this.loading[noteName]
  }

  async playNote(noteName: string, time = 0, duration = 1.2): Promise<void> {
    const ctx = this.ensureCtx()
    const buf = await this.loadNote(noteName)
    if (!buf) return

    const src = ctx.createBufferSource()
    src.buffer = buf
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.8, ctx.currentTime + time)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration)
    src.connect(gain).connect(ctx.destination)
    src.start(ctx.currentTime + time)
  }

  async strumChord(frets: number[], baseFret: number): Promise<void> {
    for (let s = 0; s < 6; s++) {
      const fret = frets[s]
      if (fret === -1) continue

      const openNote = STANDARD_TUNING[s]
      const openMidi = openNoteToMidi(openNote)
      const actualMidi = openMidi + (fret === 0 ? 0 : fret + baseFret - 1)
      const noteName = noteNameFromMidi(actualMidi)
      const available = NOTE_MAP[noteName]

      if (available) {
        await this.playNote(available, s * 0.06, 1.5)
      }
    }
  }

  async arpeggiate(frets: number[], baseFret: number): Promise<void> {
    for (let s = 0; s < 6; s++) {
      const fret = frets[s]
      if (fret === -1) continue

      const openNote = STANDARD_TUNING[s]
      const openMidi = openNoteToMidi(openNote)
      const actualMidi = openMidi + (fret === 0 ? 0 : fret + baseFret - 1)
      const noteName = noteNameFromMidi(actualMidi)
      const available = NOTE_MAP[noteName]

      if (available) {
        this.playNote(available, s * 0.18, 2.5)
      }
    }
  }
}

export const sampler = new GuitarSampler()
