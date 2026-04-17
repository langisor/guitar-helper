# Chord Viewer

I'll build this as a well-structured set of files — a reusable `ChordDiagram` component, TypeScript types, and the full Chord Explorer page.Here's what was generated — 5 files with a clean separation of concerns:

**File structure:**

```bash
app/chord-explorer/
  page.tsx          ← Server Component, fetches data (ISR)
  ChordExplorer.tsx ← Client Component, full page UI

components/
  ChordDiagram.tsx  ← Reusable SVG fretboard component

hooks/
  useChord.ts       ← useChord(), useAvailableKeys(), useAvailableSuffixes()

types/
  guitar.ts         ← Full TypeScript interfaces for your JSON shape
```

## General Architecture

> UI → hooks → ChordsService → Repository → JSON

This project follows a clean architecture pattern with clear separation of concerns:

- **Server Components** (`page.tsx`) handle data fetching and initial rendering
- **Client Components** (`ChordExplorer.tsx`) manage interactivity and state
- **Reusable Components** (`ChordDiagram.tsx`) provide isolated functionality
- **Hooks** (`useChord.ts`) encapsulate business logic
- **Type Safety** (`guitar.ts`) ensures data consistency

**Key design decisions:**

- `page.tsx` is a **Server Component** that fetches data — swap the fetch URL for your actual API or import the JSON directly at build time (the comment in the file shows both options)
- `ChordExplorer.tsx` is the **Client Component** with all interactivity (key/suffix selection, position picking)
- `ChordDiagram` renders a pure SVG fretboard — it's fully standalone and reusable anywhere in your app
- The `useChord` hook handles the `C#` → `Csharp` key normalization your JSON uses
- All Shadcn components used: `Badge`, `Button`, `Select`, `Separator` — make sure those are installed via `npx shadcn@latest add badge button select separator`
