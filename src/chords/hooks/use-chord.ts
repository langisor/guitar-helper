"use client";

import { useQuery } from "@tanstack/react-query";
import { ChordsService } from "../services/chords.service";
import { ChordKey, ChordSuffix } from "../types/chords.types";

const service = ChordsService.getInstance();

const QUERY_KEYS = {
  keys: ["chords", "keys"],
  suffixes: ["chords", "suffixes"],
  chord: (key: ChordKey, suffix: ChordSuffix) => ["chords", key, suffix],
  byKey: (key: ChordKey) => ["chords", "key", key],
};

/**
 * Available keys
 */
export function useChordKeys() {
  return useQuery({
    queryKey: QUERY_KEYS.keys,
    queryFn: () => service.getAvailableKeys(),
  });
}

/**
 * Available suffixes
 */
export function useChordSuffixes() {
  return useQuery({
    queryKey: QUERY_KEYS.suffixes,
    queryFn: () => service.getAvailableSuffixes(),
  });
}

/**
 * Single chord
 */
export function useChordRQ(key: ChordKey | null, suffix: ChordSuffix | null) {
  return useQuery({
    queryKey: key && suffix ? QUERY_KEYS.chord(key, suffix) : [],
    queryFn: () => service.getChordDetail(key!, suffix!),
    enabled: !!key && !!suffix,
  });
}

/**
 * All chords for key
 */
export function useChordsByKeyRQ(key: ChordKey | null) {
  return useQuery({
    queryKey: key ? QUERY_KEYS.byKey(key) : [],
    queryFn: () => service.getChordsForKey(key!),
    enabled: !!key,
  });
}
