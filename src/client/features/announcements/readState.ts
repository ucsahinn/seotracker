import { useSyncExternalStore } from "react";
import { z } from "zod";

const STORAGE_KEY = "seowatcher-announcement-reads";
const readsSchema = z.array(z.string().uuid());
let memory: string[] = [];
let snapshot: string[] | null = null;
const listeners = new Set<() => void>();
const EMPTY: string[] = [];

function load(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    const result = readsSchema.safeParse(parsed);
    return result.success ? result.data : [];
  } catch {
    return memory;
  }
}

function commit(ids: string[]) {
  memory = [...new Set(ids)];
  snapshot = memory;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch {
    // The in-memory state remains usable when browser storage is blocked.
  }
  for (const listener of listeners) listener();
}

export function markAnnouncementsRead(ids: string[]): void {
  const existing = load();
  const merged = [...new Set([...existing, ...ids])];
  if (merged.length !== existing.length) commit(merged);
}

function getReadAnnouncementIds(): string[] {
  snapshot ??= load();
  return snapshot;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    snapshot = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useReadAnnouncementIds(): string[] {
  return useSyncExternalStore(subscribe, getReadAnnouncementIds, () => EMPTY);
}
