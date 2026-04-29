"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Chord, ChordPosition } from "../types/chords.types"
import { type AudioEngine, getAudioEngine } from "../services/audio.service"

export interface PlaybackState {
  isPlaying: boolean
  currentStep: number
  totalSteps: number
  tempo: number
  volume: number
  isReady: boolean
}

export function useAudioPlayback() {
  const [state, setState] = useState<PlaybackState>({
    isPlaying: false,
    currentStep: 0,
    totalSteps: 0,
    tempo: 80,
    volume: 0.7,
    isReady: false,
  })

  const engineRef = useRef<AudioEngine | null>(null)
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Tracks the timeout that resets isPlaying after a single chord decays
  const singlePlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    const init = async () => {
      engineRef.current = getAudioEngine()
      await engineRef.current.init()
      if (!cancelled) setState((prev) => ({ ...prev, isReady: true }))
    }
    init()
    return () => {
      cancelled = true
    }
  }, [])

  // ── Sync volume to engine ─────────────────────────────────────────────────
  useEffect(() => {
    engineRef.current?.setVolume(state.volume)
  }, [state.volume])

  // ── Preload helpers ───────────────────────────────────────────────────────
  const preloadChord = useCallback(async (chord: Chord, positionIndex = 0) => {
    if (!engineRef.current) return
    await engineRef.current.preloadChord(chord, positionIndex)
  }, [])

  const preloadPosition = useCallback(async (position: ChordPosition) => {
    if (!engineRef.current) return
    await engineRef.current.preloadPosition(position)
  }, [])

  // ── Single-chord playback ─────────────────────────────────────────────────
  // duration is in seconds, matching AudioEngine.playChord signature
  const playChord = useCallback(
    (position: ChordPosition, duration = 2) => {
      if (!engineRef.current || !state.isReady) return

      // Cancel any previous single-play decay timer
      if (singlePlayTimerRef.current) {
        clearTimeout(singlePlayTimerRef.current)
        singlePlayTimerRef.current = null
      }

      // AudioContext may be suspended after user gesture restrictions
      engineRef.current.resume()
      engineRef.current.playChord(position, /* when */ 0, duration)

      setState((prev) => ({ ...prev, isPlaying: true }))

      // Reset flag once the note has decayed (duration + small buffer)
      singlePlayTimerRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, isPlaying: false }))
        singlePlayTimerRef.current = null
      }, (duration + 0.2) * 1000)
    },
    [state.isReady],
  )

  // ── Single note ───────────────────────────────────────────────────────────
  const playNote = useCallback(
    (midi: number, duration?: number) => {
      if (!engineRef.current || !state.isReady) return
      engineRef.current.resume()
      engineRef.current.playNote(midi, 0, duration)
    },
    [state.isReady],
  )

  // ── Progression playback ──────────────────────────────────────────────────
  const playProgression = useCallback(
    async (
      chords: Array<{ chord: Chord; positionIndex: number }>,
      onStepChange?: (index: number) => void,
    ) => {
      if (!engineRef.current || !state.isReady || chords.length === 0) return

      engineRef.current.resume()

      setState((prev) => ({
        ...prev,
        isPlaying: true,
        totalSteps: chords.length,
        currentStep: 0,
      }))

      // Preload all chords
      await Promise.all(
        chords.map(({ chord, positionIndex }) =>
          engineRef.current?.preloadChord(chord, positionIndex),
        ),
      )

      const beatDuration = (60 / state.tempo) * 1000 * 2 // 2 beats per chord
      let currentIndex = 0

      // Play first chord immediately
      const first = chords[0]
      const firstPos =
        first.chord.positions[first.positionIndex] ?? first.chord.positions[0]
      if (firstPos) {
        engineRef.current.playChord(firstPos, 0, beatDuration / 1000)
      }
      onStepChange?.(0)

      playIntervalRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % chords.length

        const { chord, positionIndex } = chords[currentIndex]
        const pos = chord.positions[positionIndex] ?? chord.positions[0]

        if (pos && engineRef.current) {
          engineRef.current.playChord(pos, 0, beatDuration / 1000)
        }

        setState((prev) => ({ ...prev, currentStep: currentIndex }))
        onStepChange?.(currentIndex)
      }, beatDuration)
    },
    [state.isReady, state.tempo],
  )

  // ── Stop ──────────────────────────────────────────────────────────────────
  const stopPlayback = useCallback(() => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current)
      playIntervalRef.current = null
    }
    if (singlePlayTimerRef.current) {
      clearTimeout(singlePlayTimerRef.current)
      singlePlayTimerRef.current = null
    }
    // stop() suspends the context; resume() brings it back so future plays work
    engineRef.current?.stop()
    engineRef.current?.resume()
    setState((prev) => ({ ...prev, isPlaying: false, currentStep: 0 }))
  }, [])

  const pausePlayback = useCallback(() => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current)
      playIntervalRef.current = null
    }
    engineRef.current?.stop()
    setState((prev) => ({ ...prev, isPlaying: false }))
  }, [])

  const resumePlayback = useCallback(() => {
    engineRef.current?.resume()
    setState((prev) => ({ ...prev, isPlaying: true }))
  }, [])

  // ── Tempo / volume setters ────────────────────────────────────────────────
  const setTempo = useCallback((tempo: number) => {
    setState((prev) => ({ ...prev, tempo: Math.max(40, Math.min(200, tempo)) }))
  }, [])

  const setVolume = useCallback((volume: number) => {
    setState((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }))
  }, [])

  // ── Cleanup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current)
      if (singlePlayTimerRef.current) clearTimeout(singlePlayTimerRef.current)
    }
  }, [])

  return {
    ...state,
    preloadChord,
    preloadPosition,
    playChord,
    playNote,
    playProgression,
    stopPlayback,
    pausePlayback,
    resumePlayback,
    setTempo,
    setVolume,
  }
}