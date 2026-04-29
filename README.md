# Chord Viewer

An interactive guitar chord and music theory visualization application built with Next.js 16, React 19, and TypeScript. Features chord exploration, progression building, fretboard visualization, a metronome trainer, and a music theory terms glossary.

## Features

- **Chord Explorer** (`/chords-nav`) — Browse chords by musical key and suffix with interactive SVG fretboard diagrams and audio playback
- **Progression Builder** (`/progressions`) — Build chord progressions using Roman numeral analysis with voice leading optimization and common progression presets
- **Fretboard Explorer** (`/fretboard`) — Visualize chord positions across the entire fretboard with voicing analysis
- **Metronome Trainer** (`/metro-trainer`) — Precision timing practice with mute modes, auto tempo ramping, and strumming pattern visualization
- **Terms Glossary** (`/terms`) — Searchable reference for guitar and music theory terminology
- **Left-Handed Mode** — Global toggle that reverses string order across all diagrams
- **Audio Playback** — Browser-based guitar sampler for strumming and arpeggio playback

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.4 (App Router) |
| React | 19.2.4 with React Compiler enabled |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| State (Global) | @hookstate/core |
| State (Server) | @tanstack/react-query |
| UI Components | shadcn/ui (manually maintained in `src/components/ui/`) |
| Audio | Web Audio API with custom guitar sampler |
| 3D | @react-three/fiber + @react-three/drei |
| Charts | recharts |
| Icons | lucide-react |

## Developer Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint (no typecheck or test scripts)
```

## Project Structure

All source code lives under `src/`. The `@/*` path alias maps to `./src/*`.

```text
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page with feature cards
│   ├── layout.tsx                # Root layout (fonts, providers, header)
│   ├── chords-nav/               # Chord Explorer page
│   ├── progressions/             # Progression Builder page
│   ├── fretboard/                # Fretboard Explorer page
│   ├── metro-trainer/            # Metronome Trainer page
│   ├── terms/                    # Terms Glossary page
│   └── globals.css               # Tailwind CSS entry + theme tokens
│
├── chords/                       # Core domain: chords & music theory
│   ├── actions/                  # Server Actions ("use server")
│   │   ├── chords.actions.ts
│   │   ├── fretboard.actions.ts
│   │   ├── progressions.actions.ts
│   │   └── terms.actions.ts
│   ├── components/               # Domain-specific components
│   │   ├── chord-diagram.tsx       # SVG fretboard renderer
│   │   ├── chord-explorer.tsx      # Chord search & selection UI
│   │   ├── fretboard-explorer.tsx  # Fretboard visualization UI
│   │   ├── progression-builder.tsx # Progression composer UI
│   │   ├── metronome-trainer.tsx   # Metronome UI
│   │   ├── guitar-hero-mode.tsx    # Game/training overlay
│   │   ├── term-search.tsx         # Glossary search UI
│   │   └── term-tooltip.tsx        # Inline term definitions
│   ├── data/                     # Static JSON datasets
│   │   ├── chords.json             # Full chord database (~1MB)
│   │   ├── songs.json              # Song references
│   │   ├── strumming.json          # Strumming patterns
│   │   └── terms.json              # Music theory terms
│   ├── hooks/                    # Domain-specific React hooks
│   │   ├── use-chord.ts            # React Query wrappers for chords
│   │   ├── use-fretboard.ts        # Fretboard data hooks
│   │   ├── use-progression.ts      # Progression state hooks
│   │   ├── use-audio.ts            # Audio playback hooks
│   │   └── use-terms.ts            # Terms glossary hooks
│   ├── lib/                      # Domain utilities
│   ├── providers/                # Context providers
│   │   └── left-handed-provider.tsx # Global left-handed toggle state
│   ├── providers.tsx             # QueryClientProvider setup
│   ├── repositories/             # Data access layer
│   │   ├── chords.repository.ts    # JSON loading + in-memory index
│   │   └── terms.repository.ts
│   ├── services/                 # Business logic layer
│   │   ├── chords.service.ts
│   │   ├── fretboard.service.ts
│   │   ├── progressions.service.ts
│   │   ├── audio.service.ts
│   │   ├── guitar-sampler.service.ts
│   │   └── terms.service.ts
│   └── types/                    # TypeScript domain types
│       ├── chords.types.ts
│       ├── fretboard.types.ts
│       ├── progression.types.ts
│       └── terms.types.ts
│
├── components/                   # Shared UI components
│   ├── ui/                       # shadcn/ui components (manual)
│   └── header.tsx                # App header with nav + left-hand toggle
│
├── hooks/                        # Generic hooks
│   └── use-mobile.ts
│
└── lib/                          # Shared utilities
    └── utils.ts                  # cn() helper, etc.
```

## Architecture

### Data Flow

```text
UI Components (Client)
        ↓
   React Query Hooks
        ↓
   Server Actions ("use server")
        ↓
   Services (singleton business logic)
        ↓
   Repositories (data access + caching)
        ↓
   JSON Files / Static Data
```

### Component Split

- **Server Components** (`src/app/*/page.tsx`) — Fetch initial data, render static shell
- **Client Components** (`src/chords/components/*.tsx`) — Handle interactivity, state, and user events
- **Reusable Components** (`src/chords/components/chord-diagram.tsx`) — Pure rendering units (SVG, etc.)

### Key Conventions

- **Chord key normalization**: The JSON data uses `Csharp` instead of `C#`. The `useChord` hook and services handle conversion automatically.
- **Path alias**: Use `@/chords/...`, `@/components/ui/...`, etc. Never use relative imports crossing domain boundaries.
- **shadcn/ui**: All components are manually maintained in `src/components/ui/`. Do not run `npx shadcn` commands.
- **Tailwind v4**: No `postcss.config.js` — CSS is bundled by Next.js. Theme tokens are in `src/app/globals.css`.
- **React Compiler**: Enabled in `next.config.ts`. Follow compiler-specific syntax requirements for memoization.

## State Management

### Global State — @hookstate/core

Used for lightweight global flags that many components need synchronously.

```tsx
// src/chords/providers/left-handed-provider.tsx
import { hookstate, useHookstate } from "@hookstate/core";

const leftHandedState = hookstate(false);

export function useLeftHanded() {
  const state = useHookstate(leftHandedState);
  return {
    isLeftHanded: state.value,
    setLeftHanded: (value: boolean) => state.set(value),
    toggleLeftHanded: () => state.set((prev) => !prev),
  };
}
```

**Usage in any client component:**

```tsx
import { useLeftHanded } from "@/chords/providers/left-handed-provider";

function MyComponent() {
  const { isLeftHanded, toggleLeftHanded } = useLeftHanded();
  // ...
}
```

### Server-State — @tanstack/react-query

All async data fetching goes through React Query hooks in `src/chords/hooks/`.

**QueryClient defaults** (from `src/chords/providers.tsx`):

```ts
staleTime: 1000 * 60 * 10,   // 10 minutes
gcTime: 1000 * 60 * 30,      // 30 minutes
refetchOnWindowFocus: false,
retry: 1,
```

## Usage Examples

### Fetching Chord Data

```tsx
import { useChordKeys, useChordSuffixes, useChordRQ } from "@/chords/hooks/use-chord";
import { ChordDiagram } from "@/chords/components/chord-diagram";

function ChordPage() {
  const { data: keys } = useChordKeys();
  const { data: suffixes } = useChordSuffixes();
  const { data: chord } = useChordRQ("G", "major");

  return (
    <div>
      {chord?.positions.map((pos, i) => (
        <ChordDiagram
          key={i}
          position={pos}
          chordName={`${chord.key} ${chord.suffix}`}
        />
      ))}
    </div>
  );
}
```

### Accessing the Service Layer Directly

Server Actions are the preferred entry point, but services can be used directly in server contexts:

```ts
import { ChordsService } from "@/chords/services/chords.service";

const service = ChordsService.getInstance();
const chord = await service.getChordDetail("C", "major");
const keys = await service.getAvailableKeys();
```

### Using the Fretboard Hook

```tsx
import { useAllVoicings, useFretboardConfig } from "@/chords/hooks/use-fretboard";

function FretboardPage() {
  const { data: config } = useFretboardConfig(6, 24);
  const { data: voicings } = useAllVoicings("C", "major");

  // voicings contains fingering analysis, voice leading, difficulty ratings
}
```

### Audio Playback

```tsx
import { useAudio } from "@/chords/hooks/use-audio";

function PlaybackButton({ chord }) {
  const { playChord, isPlaying, stop } = useAudio();

  return (
    <button
      onClick={() =>
        isPlaying ? stop() : playChord(chord.positions[0], "strum")
      }
    >
      {isPlaying ? "Stop" : "Play"}
    </button>
  );
}
```

## Type System

### Core Types (`src/chords/types/chords.types.ts`)

```ts
export interface Chord {
  key: ChordKey;           // "C" | "Csharp" | "D" | ...
  suffix: ChordSuffix;     // "major" | "minor" | "dim" | ...
  positions: ChordPosition[];
}

export interface ChordPosition {
  frets: number[];         // -1 = mute, 0 = open, 1+ = fret
  fingers: number[];         // 0–4
  baseFret: number;
  barres: number[];
  midi: number[];
}
```

### Progression Types (`src/chords/types/progression.types.ts`)

```ts
export interface ChordProgression {
  id: string;
  name: string;
  key: ChordKey;
  mode: ScaleMode;         // "major" | "minor" | "dorian" | ...
  steps: ProgressionStep[];
  tags: string[];
}

export interface ProgressionStep {
  id: string;
  roman: ParsedRoman;
  chord?: Chord;
  positionIndex: number;
  optional: boolean;
}
```

## Left-Handed Mode

Toggle via the hand icon in the app header. When enabled:

- `ChordDiagram` renders strings in reversed order (low-E on the right)
- All fretboard visualizations mirror horizontally
- State is managed globally via `@hookstate/core` so every diagram updates instantly

## Audio Architecture

The `AudioService` and `GuitarSamplerService` use the Web Audio API to synthesize guitar-like tones:

- **Sampler** — Loads/decodes audio buffers for plucked string sounds
- **Playback modes** — `strum` (all notes with slight delays) and `arpeggio` (sequential)
- **Mute detection** — Respects `-1` (muted string) values in `ChordPosition.frets`

## JSON Data Sources

| File | Description |
|------|-------------|
| `src/chords/data/chords.json` | 1MB+ chord database with positions, fingerings, MIDI notes |
| `src/chords/data/terms.json` | Music theory glossary with definitions and categories |
| `src/chords/data/songs.json` | Song references for progression examples |
| `src/chords/data/strumming.json` | Strumming pattern definitions |

The `ChordsRepository` loads `chords.json` once at runtime, builds an in-memory index (`Map<string, Chord[]>`), and serves all subsequent lookups from cache.

## Adding a New Page

1. Create `src/app/my-feature/page.tsx` as a Server Component
2. Create `src/chords/components/my-feature.tsx` as the interactive Client Component
3. Add server actions in `src/chords/actions/my-feature.actions.ts` if needed
4. Add types in `src/chords/types/my-feature.types.ts`
5. Add the route to `navItems` in `src/components/header.tsx`

## Notes for AI Agents

- This is **Next.js 16** — read guides in `node_modules/next/dist/docs/` before writing code; APIs may differ from older versions.
- The **React Compiler** is enabled. Avoid manual `useMemo`/`useCallback` unless the compiler fails.
- **Do not** run `npx shadcn` commands. Components are manually maintained.
- Keep Server Components in `src/app/` and interactive Client Components in `src/chords/components/`.
