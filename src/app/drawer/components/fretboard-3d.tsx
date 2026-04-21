"use client"

import { useRef, useMemo, type ReactElement } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, RoundedBox, Text } from "@react-three/drei"
import * as THREE from "three"
import type { ChordPosition } from "../types/chords"

const FINGER_COLORS: Record<number, string> = {
  1: "#FF6B6B",
  2: "#FFD166",
  3: "#06D6A0",
  4: "#118AB2",
  0: "#aaaaaa",
}

const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"]

interface Fretboard3DProps {
  position: ChordPosition | null
  chordName: string
}

function FretboardMesh({ position, chordName }: Fretboard3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02 - 0.1
    }
  })

  const numStrings = 6
  const numFrets = 4
  const fretboardWidth = 2.5
  const fretboardHeight = 3.5
  const fretboardDepth = 0.15
  const stringSpacing = fretboardWidth / (numStrings + 1)
  const fretSpacing = fretboardHeight / (numFrets + 1)

  const stringMeshes = useMemo(() => {
    const meshes = []
    for (let i = 0; i < numStrings; i++) {
      const x = -fretboardWidth / 2 + stringSpacing * (i + 1)
      const thickness = 0.015 + (numStrings - 1 - i) * 0.005
      meshes.push(
        <mesh key={`string-${i}`} position={[x, 0, fretboardDepth / 2 + 0.01]}>
          <cylinderGeometry args={[thickness, thickness, fretboardHeight, 8]} />
          <meshStandardMaterial color="#c8a96e" metalness={0.8} roughness={0.3} />
        </mesh>
      )
    }
    return meshes
  }, [stringSpacing])

  const fretMeshes = useMemo(() => {
    const meshes = []
    for (let i = 0; i <= numFrets; i++) {
      const y = fretboardHeight / 2 - fretSpacing * i
      const isNut = i === 0 && position?.baseFret === 1
      meshes.push(
        <mesh key={`fret-${i}`} position={[0, y, fretboardDepth / 2 + 0.015]}>
          <boxGeometry args={[fretboardWidth - 0.1, isNut ? 0.12 : 0.04, 0.03]} />
          <meshStandardMaterial
            color={isNut ? "#e8c97a" : "#4a3520"}
            metalness={isNut ? 0.7 : 0.4}
            roughness={0.3}
          />
        </mesh>
      )
    }
    return meshes
  }, [fretSpacing, position?.baseFret])

  const fingerDots = useMemo(() => {
    if (!position) return null

    const { frets, fingers, barres = [] } = position
    const dots: ReactElement[] = []

    for (let s = 0; s < numStrings; s++) {
      const fret = frets[s]
      const finger = fingers[s] ?? 0
      const x = -fretboardWidth / 2 + stringSpacing * (s + 1)

      if (fret === -1) {
        // Muted string - X marker
        dots.push(
          <group key={`mute-${s}`} position={[x, fretboardHeight / 2 + 0.3, fretboardDepth / 2]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.02, 0.02]} />
              <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.5} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.15, 0.02, 0.02]} />
              <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.5} />
            </mesh>
          </group>
        )
      } else if (fret === 0) {
        // Open string - circle
        dots.push(
          <mesh key={`open-${s}`} position={[x, fretboardHeight / 2 + 0.3, fretboardDepth / 2]}>
            <torusGeometry args={[0.08, 0.02, 8, 16]} />
            <meshStandardMaterial color="#06D6A0" emissive="#06D6A0" emissiveIntensity={0.3} />
          </mesh>
        )
      } else {
        // Check if part of barre
        const isBarred = barres.some((b) => {
          const bIdx = frets.findIndex((f) => f === b)
          const eIdx = frets.length - 1 - [...frets].reverse().findIndex((f) => f === b)
          return fret === b && s >= bIdx && s <= eIdx
        })

        if (!isBarred) {
          const y = fretboardHeight / 2 - fretSpacing * fret + fretSpacing / 2
          const color = FINGER_COLORS[finger] || "#aaa"

          dots.push(
            <group key={`dot-${s}`} position={[x, y, fretboardDepth / 2 + 0.08]}>
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
            </group>
          )
        }
      }
    }

    // Barres
    barres.forEach((barreFret, bi) => {
      const startStr = frets.findIndex((f) => f === barreFret)
      const endStr = frets.length - 1 - [...frets].reverse().findIndex((f) => f === barreFret)
      if (startStr < 0) return

      const startX = -fretboardWidth / 2 + stringSpacing * (startStr + 1)
      const endX = -fretboardWidth / 2 + stringSpacing * (endStr + 1)
      const y = fretboardHeight / 2 - fretSpacing * barreFret + fretSpacing / 2
      const width = endX - startX + 0.25

      dots.push(
        <RoundedBox
          key={`barre-${bi}`}
          args={[width, 0.18, 0.12]}
          radius={0.06}
          position={[(startX + endX) / 2, y, fretboardDepth / 2 + 0.06]}
        >
          <meshStandardMaterial
            color="#E63946"
            emissive="#E63946"
            emissiveIntensity={0.3}
            metalness={0.2}
            roughness={0.4}
          />
        </RoundedBox>
      )
    })

    return dots
  }, [position, stringSpacing, fretSpacing])

  // String labels
  const stringLabels = useMemo(() => {
    return STANDARD_TUNING.map((note, i) => {
      const x = -fretboardWidth / 2 + stringSpacing * (i + 1)
      return (
        <Text
          key={`label-${i}`}
          position={[x, -fretboardHeight / 2 - 0.25, fretboardDepth / 2]}
          fontSize={0.12}
          color="#6b5a3a"
          anchorX="center"
          anchorY="middle"
          font="/fonts/GeistMono-Regular.ttf"
        >
          {note}
        </Text>
      )
    })
  }, [stringSpacing])

  // Base fret label
  const baseFretLabel = useMemo(() => {
    if (!position || position.baseFret <= 1) return null
    return (
      <Text
        position={[-fretboardWidth / 2 - 0.3, fretboardHeight / 2 - fretSpacing / 2, fretboardDepth / 2]}
        fontSize={0.15}
        color="#e8c97a"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Bold.ttf"
      >
        {`${position.baseFret}fr`}
      </Text>
    )
  }, [position, fretSpacing])

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Fretboard body */}
      <RoundedBox args={[fretboardWidth, fretboardHeight, fretboardDepth]} radius={0.05}>
        <meshStandardMaterial color="#1a0f00" roughness={0.8} metalness={0.1} />
      </RoundedBox>

      {/* Wood grain overlay */}
      <mesh position={[0, 0, fretboardDepth / 2 + 0.001]}>
        <planeGeometry args={[fretboardWidth - 0.1, fretboardHeight - 0.1]} />
        <meshStandardMaterial color="#2d1b00" roughness={0.9} metalness={0.05} transparent opacity={0.7} />
      </mesh>

      {fretMeshes}
      {stringMeshes}
      {fingerDots}
      {stringLabels}
      {baseFretLabel}

      {/* Chord name */}
      <Text
        position={[0, fretboardHeight / 2 + 0.6, 0]}
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

export function Fretboard3D({ position, chordName }: Fretboard3DProps) {
  return (
    <div className="h-[350px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 3, 5]} intensity={0.5} color="#e8c97a" />
        <spotLight position={[0, 5, 3]} angle={0.3} penumbra={1} intensity={0.8} />
        <Environment preset="studio" />
        <FretboardMesh position={position} chordName={chordName} />
      </Canvas>
    </div>
  )
}
