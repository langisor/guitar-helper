import { useEffect, useMemo, useState } from "react";
import { ChordsService } from "../services/chords.service";
import { Chord, ChordKey, ChordSuffix } from "../types/chords.types";

const service = ChordsService.getInstance();

/**
 * Get available chord keys from service
 */
export function useAvailableKeys(): ChordKey[] {
  const [keys, setKeys] = useState<ChordKey[]>([]);

  useEffect(() => {
    service.getAvailableKeys().then(setKeys);
  }, []);

  return keys;
}

/**
 * Get available suffixes from service
 */
export function useAvailableSuffixes(): ChordSuffix[] {
  const [suffixes, setSuffixes] = useState<ChordSuffix[]>([]);

  useEffect(() => {
    service.getAvailableSuffixes().then(setSuffixes);
  }, []);

  return suffixes;
}

/**
 * Get all chords for a key
 */
export function useChords(key: ChordKey | null): Chord[] {
  const [chords, setChords] = useState<Chord[]>([]);

  useEffect(() => {
    if (!key) {
      setChords([]);
      return;
    }

    service.getChordsForKey(key).then(setChords);
  }, [key]);

  return chords;
}

/**
 * Get single chord (key + suffix)
 */
export function useChord(
  key: ChordKey | null,
  suffix: ChordSuffix | null
): Chord | null {
  const [chord, setChord] = useState<Chord | null>(null);

  useEffect(() => {
    if (!key || !suffix) {
      setChord(null);
      return;
    }

    service.getChordDetail(key, suffix).then(setChord);
  }, [key, suffix]);

  return chord;
}

/**
 * Optional: pre-render optimized chord shape (for fretboard UI)
 */
export function useChordShape(
  key: ChordKey | null,
  suffix: ChordSuffix | null
) {
  const [shape, setShape] = useState<any>(null);

  useEffect(() => {
    if (!key || !suffix) {
      setShape(null);
      return;
    }

    service.getRenderableChord(key, suffix).then(setShape);
  }, [key, suffix]);

  return shape;
}

/**
 * Search hook (autocomplete UI)
 */
export function useChordSearch(query: string) {
  const [results, setResults] = useState<
    Array<{ key: string; suffix: string }>
  >([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      service.searchChords(query).then(setResults);
    }, 150); // basic debounce

    return () => clearTimeout(timeout);
  }, [query]);

  return results;
}