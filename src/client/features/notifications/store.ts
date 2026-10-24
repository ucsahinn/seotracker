import { z } from "zod";
import { useSyncExternalStore } from "react";

const notificationSchema = z.object({
  id: z.string(),
  kind: z.enum([
    "audit-completed",
    "audit-failed",
    "update",
    "google-auth",
    "report",
    "inspection",
    "diagnostics",
    "error",
  ]),
  title: z.string(),
  body: z.string().optional(),
  href: z
    .string()
    .regex(/^\/(?!\/)/)
    .optional(),
  importance: z.enum(["low", "high"]),
  projectId: z.string().optional(),
  dedupeKey: z.string().optional(),
  createdAt: z.string().datetime(),
  read: z.boolean(),
});
export type AppNotification = z.infer<typeof notificationSchema>;

export type NewNotification = Omit<
  AppNotification,
  "id" | "createdAt" | "read"
>;

const STORAGE_KEY = "seowatcher-notifications";
export const NOTIFICATION_CAP = 50;

/*
 * The list lives in localStorage so it survives a reload and is shared by
 * every open tab. Storage can be missing or throw (private windows, blocked
 * site data, the Node test run); then the list lives in memory for this tab.
 */
let memory: AppNotification[] = [];
let snapshot: AppNotification[] | null = null;
const listeners = new Set<() => void>();

function readStorage(): AppNotification[] | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    const result = z.array(notificationSchema).safeParse(parsed);
    return result.success ? result.data.slice(0, NOTIFICATION_CAP) : [];
  } catch {
    return null;
  }
}

function writeStorage(list: AppNotification[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Storage unavailable or full: the in-memory copy still serves this tab.
  }
}

/** The freshest list: storage when it is readable, else this tab's copy. */
function load(): AppNotification[] {
  return readStorage() ?? memory;
}

function commit(list: AppNotification[]): void {
  memory = list;
  snapshot = list;
  writeStorage(list);
  for (const listener of listeners) listener();
}

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Stores an event, newest first, capped. Returns null when an entry with the
 * same dedupe key is already there, so the caller skips the toast and sound.
 */
export function addNotification(
  input: NewNotification,
): AppNotification | null {
  const list = load();
  if (input.dedupeKey && list.some((n) => n.dedupeKey === input.dedupeKey)) {
    return null;
  }
  const item: AppNotification = {
    ...input,
    id: newId(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  commit([item, ...list].slice(0, NOTIFICATION_CAP));
  return item;
}

export function markNotificationRead(id: string): void {
  commit(load().map((n) => (n.id === id ? { ...n, read: true } : n)));
}

export function markAllNotificationsRead(): void {
  commit(load().map((n) => (n.read ? n : { ...n, read: true })));
}

export function clearNotifications(): void {
  commit([]);
}

export function getNotifications(): AppNotification[] {
  snapshot ??= load();
  return snapshot;
}

const EMPTY: AppNotification[] = [];

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  // Another tab wrote the list: re-read it so every tab shows the same bell.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    snapshot = null;
    onChange();
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(onChange);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

export function useNotifications(): AppNotification[] {
  return useSyncExternalStore(subscribe, getNotifications, () => EMPTY);
}
