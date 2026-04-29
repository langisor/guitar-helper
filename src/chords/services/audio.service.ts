"use client"

import type { Chord, ChordPosition } from "../types/chords.types"

// ---------------------------------------------------------------------------
// Audio file metadata
// ---------------------------------------------------------------------------
const NOTE_FILES: Record<string, number[]> = {
  A: [2, 3, 4],
  "A#": [2, 3, 4],
  Bb: [2, 3, 4],
  B: [2, 3, 4],
  C: [2, 3, 4, 5],
  "C#": [3, 4, 5],
  Db: [3, 4, 5],
  D: [2, 3, 4, 5],
  "D#": [2, 3, 4],
  Eb: [2, 3, 4],
  E: [2, 3, 4],
  F: [2, 3, 4],
  "F#": [2, 3, 4],
  Gb: [2, 3, 4],
  G: [2, 3, 4],
  "G#": [2, 3, 4],
  Ab: [2, 3, 4],
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

function midiToNoteName(midi: number): { note: string; octave: number } {
  const octave = Math.floor(midi / 12) - 1
  const noteIndex = midi % 12
  return { note: NOTE_NAMES[noteIndex], octave }
}

function getAudioFileName(midi: number): string | null {
  const { note, octave } = midiToNoteName(midi)
  // File naming convention: sharps become 's' (e.g. C# → Cs)
  const fileNote = note.replace("#", "s")
  const availableOctaves = NOTE_FILES[note] ?? []
  if (availableOctaves.length === 0) return null

  const targetOctave = availableOctaves.includes(octave)
    ? octave
    : availableOctaves.reduce((closest, oct) =>
        Math.abs(oct - octave) < Math.abs(closest - octave) ? oct : closest,
      )

  return `/audio/guitar/${fileNote}${targetOctave}.mp3`
}

// ---------------------------------------------------------------------------
// AudioEngine
// ---------------------------------------------------------------------------
export class AudioEngine {
  private context: AudioContext | null = null
  private masterGain: GainNode | null = null
  private reverbNode: ConvolverNode | null = null
  private reverbGain: GainNode | null = null
  private audioBuffers = new Map<string, AudioBuffer>()
  private isInitialized = false

  async init(): Promise<void> {
    if (this.isInitialized) return

    this.context = new (
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    )()

    // Master gain → destination
    this.masterGain = this.context.createGain()
    this.masterGain.gain.value = 0.7
    this.masterGain.connect(this.context.destination)

    await this.createReverb()

    this.isInitialized = true
  }

  private async createReverb(): Promise<void> {
    if (!this.context || !this.masterGain) return

    this.reverbNode = this.context.createConvolver()

    const sampleRate = this.context.sampleRate
    const length = sampleRate * 2 // 2-second impulse
    const impulse = this.context.createBuffer(2, length, sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2)
      }
    }

    this.reverbNode.buffer = impulse

    // Reverb send gain → master
    this.reverbGain = this.context.createGain()
    this.reverbGain.gain.value = 0.2
    this.reverbNode.connect(this.reverbGain)
    this.reverbGain.connect(this.masterGain)
  }

  // ── Buffer loading ─────────────────────────────────────────────────────
  async loadNote(midi: number): Promise<AudioBuffer | null> {
    const url = getAudioFileName(midi)
    if (!url || !this.context) return null

    if (this.audioBuffers.has(url)) return this.audioBuffers.get(url)!

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer)
      this.audioBuffers.set(url, audioBuffer)
      return audioBuffer
    } catch (e) {
      console.warn(`Failed to load audio: ${url}`, e)
      return null
    }
  }

  async preloadChord(chord: Chord, positionIndex = 0): Promise<void> {
    const position = chord.positions[positionIndex]
    if (!position) return
    await this.preloadPosition(position)
  }

  async preloadPosition(position: ChordPosition): Promise<void> {
    await Promise.all(position.midi.map((midi) => this.loadNote(midi)))
  }

  // ── Single note ────────────────────────────────────────────────────────
  // Fixed: the duration fade-out path previously disconnected noteGain from
  // the master before the fadeOut node was connected, silencing the note.
  // Now we build the full graph first, then schedule the fade.
  playNote(midi: number, when = 0, duration?: number, gain = 1): void {
    if (!this.context || !this.masterGain) return

    const url = getAudioFileName(midi)
    if (!url) return

    const buffer = this.audioBuffers.get(url)
    if (!buffer) {
      console.warn(`Note not preloaded: midi=${midi}`)
      return
    }

    const source = this.context.createBufferSource()
    source.buffer = buffer

    const noteGain = this.context.createGain()
    noteGain.gain.value = gain

    // Always wire through a fade node so we have a single graph path
    const fadeGain = this.context.createGain()
    fadeGain.gain.value = 1

    source.connect(noteGain)
    noteGain.connect(fadeGain)
    fadeGain.connect(this.masterGain)

    // Reverb send
    if (this.reverbNode) {
      const reverbSend = this.context.createGain()
      reverbSend.gain.value = 0.3
      noteGain.connect(reverbSend)
      reverbSend.connect(this.reverbNode)
    }

    const startTime = this.context.currentTime + when
    source.start(startTime)

    if (duration) {
      // Schedule exponential fade-out at the end of the note duration
      const fadeStart = startTime + duration - 0.1
      fadeGain.gain.setValueAtTime(1, fadeStart)
      fadeGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
      source.stop(startTime + duration)
    }
  }

  // ── Chord (strum) ──────────────────────────────────────────────────────
  playChord(
    position: ChordPosition,
    when = 0,
    duration = 2,
    strumDelay = 0.02,
  ): void {
    if (!this.context) return

    position.midi.forEach((midi, index) => {
      const noteDelay = index * strumDelay
      // Give the root (first) note slightly more presence
      const gain = index === 0 ? 1.0 : 0.8
      this.playNote(midi, when + noteDelay, duration, gain)
    })
  }

  // ── Progression ────────────────────────────────────────────────────────
  async playProgression(
    chords: Array<{ chord: Chord; positionIndex: number }>,
    tempo = 80,
    onBeat?: (index: number) => void,
  ): Promise<void> {
    if (!this.context) return

    const beatDuration = (60 / tempo) * 2 // 2 beats per chord

    for (let i = 0; i < chords.length; i++) {
      const { chord, positionIndex } = chords[i]
      const pos = chord.positions[positionIndex] ?? chord.positions[0]

      if (pos) {
        await this.preloadChord(chord, positionIndex)
        this.playChord(pos, i * beatDuration, beatDuration)
        if (onBeat) setTimeout(() => onBeat(i), i * beatDuration * 1000)
      }
    }
  }

  // ── Transport ──────────────────────────────────────────────────────────
  stop(): void {
    this.context?.suspend()
  }

  resume(): void {
    this.context?.resume()
  }

  setVolume(value: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, value))
    }
  }

  getCurrentTime(): number {
    return this.context?.currentTime ?? 0
  }
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------
let audioEngine: AudioEngine | null = null

export function getAudioEngine(): AudioEngine {
  if (!audioEngine) {
    audioEngine = new AudioEngine()
  }
  return audioEngine
}

export function formatNoteName(midi: number): string {
  const { note, octave } = midiToNoteName(midi)
  return `${note}${octave}`
}