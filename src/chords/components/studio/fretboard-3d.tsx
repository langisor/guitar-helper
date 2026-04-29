"use client"

import { useRef, useMemo, type ReactElement } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, RoundedBox, Text } from "@react-three/drei"
import * as THREE from "three"
import type { ChordPosition } from "@/chords/types/chords.types"

// ---------------------------------------------------------------------------
// Module-level constants — never recreated, so useMemo deps stay stable
// ---------------------------------------------------------------------------
const FINGER_COLORS: Record<number, string> = {
  1: "#FF6B6B",
  2: "#FFD166",
  3: "#06D6A0",
  4: "#118AB2",
  0: "#aaaaaa",
}

const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"]

const NUM_STRINGS = 6
const NUM_FRETS = 4
const FRETBOARD_WIDTH = 2.5
const FRETBOARD_HEIGHT = 3.5
const FRETBOARD_DEPTH = 0.15
// Pre-compute spacing as module-level constants — no longer derived inside component
const STRING_SPACING = FRETBOARD_WIDTH / (NUM_STRINGS + 1)
const FRET_SPACING = FRETBOARD_HEIGHT / (NUM_FRETS + 1)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Fretboard3DProps {
  position: ChordPosition | null
  chordName: string
}

// ---------------------------------------------------------------------------
// FretboardMesh — rendered inside <Canvas>
// ---------------------------------------------------------------------------
function FretboardMesh({ position, chordName }: Fretboard3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.3) * 0.05
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.2) * 0.02 - 0.1
    }
  })

  // ── Strings ──────────────────────────────────────────────────────────────
  const stringMeshes = useMemo(() => {
    const meshes: ReactElement[] = []
    for (let i = 0; i < NUM_STRINGS; i++) {
      const x = -FRETBOARD_WIDTH / 2 + STRING_SPACING * (i + 1)
      const thickness = 0.015 + (NUM_STRINGS - 1 - i) * 0.005
      meshes.push(
        <mesh key={`string-${i}`} position={[x, 0, FRETBOARD_DEPTH / 2 + 0.01]}>
          <cylinderGeometry args={[thickness, thickness, FRETBOARD_HEIGHT, 8]} />
          <meshStandardMaterial color="#c8a96e" metalness={0.8} roughness={0.3} />
        </mesh>,
      )
    }
    return meshes
  }, []) // all constants — no deps needed

  // ── Frets & nut ───────────────────────────────────────────────────────────
  const fretMeshes = useMemo(() => {
    const meshes: ReactElement[] = []
    for (let i = 0; i <= NUM_FRETS; i++) {
      const y = FRETBOARD_HEIGHT / 2 - FRET_SPACING * i
      const isNut = i === 0 && position?.baseFret === 1
      meshes.push(
        <mesh key={`fret-${i}`} position={[0, y, FRETBOARD_DEPTH / 2 + 0.015]}>
          <boxGeometry args={[FRETBOARD_WIDTH - 0.1, isNut ? 0.12 : 0.04, 0.03]} />
          <meshStandardMaterial
            color={isNut ? "#e8c97a" : "#4a3520"}
            metalness={isNut ? 0.7 : 0.4}
            roughness={0.3}
          />
        </mesh>,
      )
    }
    return meshes
  }, [position?.baseFret])

  // ── Finger dots & barre bars ──────────────────────────────────────────────
  const fingerDots = useMemo(() => {
    if (!position) return null

    const { frets, fingers = [], barres = [] } = position
    const dots: ReactElement[] = []

    // Build a set of "stringIndex:fretValue" keys covered by barres.
    // A barre spans from the lowest to the highest string index that share
    // that fret value — every string in between is also barred.
    const barredKeys = new Set<string>()
    for (const barreFret of barres) {
      const indices = frets.reduce<number[]>((acc, f, i) => {
        if (f === barreFret) acc.push(i)
        return acc
      }, [])
      if (indices.length < 2) continue
      const lo = Math.min(...indices)
      const hi = Math.max(...indices)
      for (let s = lo; s <= hi; s++) {
        barredKeys.add(`${s}:${barreFret}`)
      }
    }

    // Per-string markers
    for (let s = 0; s < NUM_STRINGS; s++) {
      const fret = frets[s]
      const finger = fingers[s] ?? 0
      const x = -FRETBOARD_WIDTH / 2 + STRING_SPACING * (s + 1)

      if (fret === -1) {
        // Muted string — X marker above nut
        dots.push(
          <group
            key={`mute-${s}`}
            position={[x, FRETBOARD_HEIGHT / 2 + 0.3, FRETBOARD_DEPTH / 2]}
          >
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.02, 0.02]} />
              <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.5} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.02, 0.02]} />
              <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.5} />
            </mesh>
          </group>,
        )
      } else if (fret === 0) {
        // Open string — ring above nut
        dots.push(
          <mesh
            key={`open-${s}`}
            position={[x, FRETBOARD_HEIGHT / 2 + 0.3, FRETBOARD_DEPTH / 2]}
          >
            <torusGeometry args={[0.08, 0.02, 8, 16]} />
            <meshStandardMaterial color="#06D6A0" emissive="#06D6A0" emissiveIntensity={0.3} />
          </mesh>,
        )
      } else if (!barredKeys.has(`${s}:${fret}`)) {
        // Regular fretted note (not inside a barre)
        const y = FRETBOARD_HEIGHT / 2 - FRET_SPACING * fret + FRET_SPACING / 2
        const color = FINGER_COLORS[finger] ?? FINGER_COLORS[0]

        dots.push(
          <group key={`dot-${s}`} position={[x, y, FRETBOARD_DEPTH / 2 + 0.08]}>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                metalness={0.2}
                roughness={0.4}
              />
            </mesh>
            {finger > 0 && (
              <Text
                position={[0, 0, 0.13]}
                fontSize={0.1}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Geist-Bold.ttf"
              >
                {finger.toString()}
              </Text>
            )}
          </group>,
        )
      }
    }

    // Barre bars
    for (const [bi, barreFret] of barres.entries()) {
      const indices = frets.reduce<number[]>((acc, f, i) => {
        if (f === barreFret) acc.push(i)
        return acc
      }, [])
      if (indices.length < 2) continue

      const lo = Math.min(...indices)
      const hi = Math.max(...indices)
      const startX = -FRETBOARD_WIDTH / 2 + STRING_SPACING * (lo + 1)
      const endX = -FRETBOARD_WIDTH / 2 + STRING_SPACING * (hi + 1)
      const y = FRETBOARD_HEIGHT / 2 - FRET_SPACING * barreFret + FRET_SPACING / 2
      const width = endX - startX + 0.25

      dots.push(
        <RoundedBox
          key={`barre-${bi}`}
          args={[width, 0.18, 0.12]}
          radius={0.06}
          position={[(startX + endX) / 2, y, FRETBOARD_DEPTH / 2 + 0.06]}
        >
          <meshStandardMaterial
            color="#E63946"
            emissive="#E63946"
            emissiveIntensity={0.3}
            metalness={0.2}
            roughness={0.4}
          />
        </RoundedBox>,
      )
    }

    return dots
  }, [position])

  // ── String name labels ────────────────────────────────────────────────────
  const stringLabels = useMemo(
    () =>
      STANDARD_TUNING.map((note, i) => {
        const x = -FRETBOARD_WIDTH / 2 + STRING_SPACING * (i + 1)
        return (
          <Text
            key={`label-${i}`}
            position={[x, -FRETBOARD_HEIGHT / 2 - 0.25, FRETBOARD_DEPTH / 2]}
            fontSize={0.12}
            color="#6b5a3a"
            anchorX="center"
            anchorY="middle"
            font="/fonts/GeistMono-Regular.ttf"
          >
            {note}
          </Text>
        )
      }),
    [],
  )

  // ── Base-fret label ───────────────────────────────────────────────────────
  const baseFretLabel = useMemo(() => {
    if (!position || position.baseFret <= 1) return null
    return (
      <Text
        position={[
          -FRETBOARD_WIDTH / 2 - 0.3,
          FRETBOARD_HEIGHT / 2 - FRET_SPACING / 2,
          FRETBOARD_DEPTH / 2,
        ]}
        fontSize={0.15}
        color="#e8c97a"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Bold.ttf"
      >
        {`${position.baseFret}fr`}
      </Text>
    )
  }, [position?.baseFret])

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Fretboard body */}
      <RoundedBox args={[FRETBOARD_WIDTH, FRETBOARD_HEIGHT, FRETBOARD_DEPTH]} radius={0.05}>
        <meshStandardMaterial color="#1a0f00" roughness={0.8} metalness={0.1} />
      </RoundedBox>

      {/* Wood-grain overlay */}
      <mesh position={[0, 0, FRETBOARD_DEPTH / 2 + 0.001]}>
        <planeGeometry args={[FRETBOARD_WIDTH - 0.1, FRETBOARD_HEIGHT - 0.1]} />
        <meshStandardMaterial
          color="#2d1b00"
          roughness={0.9}
          metalness={0.05}
          transparent
          opacity={0.7}
        />
      </mesh>

      {fretMeshes}
      {stringMeshes}
      {fingerDots}
      {stringLabels}
      {baseFretLabel}

      {/* Chord name — font prop added to avoid drei fallback warning */}
      <Text
        position={[0, FRETBOARD_HEIGHT / 2 + 0.6, 0]}
        fontSize={0.25}
        color="#e8c97a"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist-Bold.ttf"
      >
        {chordName}
      </Text>
    </group>
  )
}

// ---------------------------------------------------------------------------
// Public export — Canvas wrapper
// ---------------------------------------------------------------------------
export function Fretboard3D({ position, chordName }: Fretboard3DProps) {
  return (
    <div className="h-[350px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, 3, 5]} intensity={0.8} color="#e8c97a" />
        <spotLight position={[0, 5, 3]} angle={0.3} penumbra={1} intensity={1} />
        <Environment preset="sunset" />
        <FretboardMesh position={position} chordName={chordName} />
      </Canvas>
    </div>
  )
}