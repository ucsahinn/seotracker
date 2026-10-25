import { vi } from "vitest";
import type { AnnouncementRepository } from "./repository";
import type { Announcement } from "./types";

export const TOKEN = "x".repeat(48);
export const NOW = "2026-10-25T10:00:00.000Z";

export function makeAnnouncement(
  overrides: Partial<Announcement> = {},
): Announcement {
  return {
    id: "f167ffc9-c83d-449d-bb81-9e7b69940a0d",
    title_tr: "Bakım çalışması",
    body_tr: "Kısa bir kesinti olabilir.",
    title_en: "Scheduled maintenance",
    body_en: "A short interruption is possible.",
    title_de: "Geplante Wartung",
    body_de: "Eine kurze Unterbrechung ist möglich.",
    title_fr: "Maintenance programmée",
    body_fr: "Une courte interruption est possible.",
    title_it: "Manutenzione programmata",
    body_it: "È possibile una breve interruzione.",
    title_pt: "Manutenção programada",
    body_pt: "Pode ocorrer uma breve interrupção.",
    interaction_type: "none",
    prompt_tr: "",
    prompt_en: "",
    options: [],
    response_count: 0,
    category: "maintenance",
    status: "published",
    publish_at: "2026-10-25T09:00:00.000Z",
    expires_at: null,
    created_at: NOW,
    updated_at: NOW,
    ...overrides,
  };
}

export function repository(
  overrides: Partial<AnnouncementRepository> = {},
): AnnouncementRepository {
  return {
    listPublished: vi.fn(async () => [makeAnnouncement()]),
    listAll: vi.fn(async () => [makeAnnouncement()]),
    create: vi.fn(async () => undefined),
    createWithOptions: vi.fn(async () => undefined),
    update: vi.fn(async () => undefined),
    updateWithOptions: vi.fn(async () => undefined),
    get: vi.fn(async () => makeAnnouncement()),
    setStatus: vi.fn(async () => undefined),
    saveOptions: vi.fn(async () => undefined),
    submitResponse: vi.fn(async () => undefined),
    listResponses: vi.fn(async () => []),
    getOptions: vi.fn(async () => []),
    deleteResponse: vi.fn(async () => undefined),
    ...overrides,
  };
}

export function request(path: string, init: RequestInit = {}) {
  return new Request(`https://announcements.test${path}`, init);
}
