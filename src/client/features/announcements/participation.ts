type StorageLike = Pick<Storage, "getItem" | "setItem">;

const PARTICIPANT_KEY = "seowatcher-announcement-participant-v1";
const RESPONSES_KEY = "seowatcher-announcement-responses-v1";
const fallbackValues = new Map<string, string>();
const fallbackStorage: StorageLike = {
  getItem: (key) => fallbackValues.get(key) ?? null,
  setItem: (key, value) => {
    fallbackValues.set(key, value);
  },
};
function defaultStorage(): StorageLike {
  try {
    return typeof window === "undefined"
      ? fallbackStorage
      : window.localStorage;
  } catch {
    return fallbackStorage;
  }
}
let memoryParticipantId: string | null = null;
const memoryResponses = new Set<string>();

export function getParticipantId(
  storage: StorageLike = defaultStorage(),
): string {
  try {
    const existing = storage.getItem(PARTICIPANT_KEY);
    if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
  } catch {
    if (memoryParticipantId) return memoryParticipantId;
  }
  const participantId = crypto.randomUUID();
  memoryParticipantId = participantId;
  try {
    storage.setItem(PARTICIPANT_KEY, participantId);
  } catch {
    // Keep the same id for this tab when browser storage is unavailable.
  }
  return participantId;
}

export function hasResponded(
  announcementId: string,
  storage: StorageLike = defaultStorage(),
): boolean {
  try {
    const ids = JSON.parse(storage.getItem(RESPONSES_KEY) ?? "[]") as unknown;
    return Array.isArray(ids) && ids.includes(announcementId);
  } catch {
    return memoryResponses.has(announcementId);
  }
}

export function markResponded(
  announcementId: string,
  storage: StorageLike = defaultStorage(),
): void {
  memoryResponses.add(announcementId);
  try {
    const parsed = JSON.parse(
      storage.getItem(RESPONSES_KEY) ?? "[]",
    ) as unknown;
    const ids = Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
    if (!ids.includes(announcementId)) ids.push(announcementId);
    storage.setItem(RESPONSES_KEY, JSON.stringify(ids));
  } catch {
    // The worker still enforces its installation-level uniqueness constraint.
  }
}
