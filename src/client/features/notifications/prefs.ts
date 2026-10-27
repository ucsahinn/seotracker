import { z } from "zod";
import { useSyncExternalStore } from "react";

interface NotificationPrefs {
  /** Short tones for important events. On unless turned off. */
  sound: boolean;
  /** Legacy preference retained for stored settings; system popups are disabled. */
  desktop: boolean;
}

const STORAGE_KEY = "seowatcher-notification-prefs";
const DEFAULTS: NotificationPrefs = { sound: true, desktop: false };

let snapshot: NotificationPrefs | null = null;
const listeners = new Set<() => void>();

function read(): NotificationPrefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed: unknown = JSON.parse(raw);
    const result = z
      .object({
        sound: z.boolean().catch(DEFAULTS.sound),
        desktop: z.boolean().catch(DEFAULTS.desktop),
      })
      .safeParse(parsed);
    return result.success ? result.data : DEFAULTS;
  } catch {
    return snapshot ?? DEFAULTS;
  }
}

export function getNotificationPrefs(): NotificationPrefs {
  snapshot ??= read();
  return snapshot;
}

export function setNotificationPrefs(patch: Partial<NotificationPrefs>): void {
  snapshot = { ...getNotificationPrefs(), ...patch };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Unavailable storage: the choice holds for this tab only.
  }
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    snapshot = null;
    onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useNotificationPrefs(): NotificationPrefs {
  return useSyncExternalStore(subscribe, getNotificationPrefs, () => DEFAULTS);
}
