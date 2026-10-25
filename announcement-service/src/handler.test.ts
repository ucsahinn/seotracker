import { describe, expect, it, vi } from "vitest";
import { createAnnouncementHandler } from "./handler";
import type { AnnouncementRepository } from "./repository";
import type { Announcement } from "./types";

const TOKEN = "x".repeat(48);
const NOW = "2026-10-25T10:00:00.000Z";

function makeAnnouncement(overrides: Partial<Announcement> = {}): Announcement {
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
    category: "maintenance",
    status: "published",
    publish_at: "2026-10-25T09:00:00.000Z",
    expires_at: null,
    created_at: NOW,
    updated_at: NOW,
    ...overrides,
  };
}

function repository(
  overrides: Partial<AnnouncementRepository> = {},
): AnnouncementRepository {
  return {
    listPublished: vi.fn(async () => [makeAnnouncement()]),
    listAll: vi.fn(async () => [makeAnnouncement()]),
    create: vi.fn(async () => undefined),
    update: vi.fn(async () => undefined),
    get: vi.fn(async () => makeAnnouncement()),
    setStatus: vi.fn(async () => undefined),
    ...overrides,
  };
}

function request(path: string, init: RequestInit = {}) {
  return new Request(`https://announcements.test${path}`, init);
}

describe("announcement service", () => {
  it("serves only the public feed and supports conditional revalidation", async () => {
    const listPublished = vi.fn(async () => [makeAnnouncement()]);
    const repo = repository({ listPublished });
    const handler = createAnnouncementHandler(repo, {
      adminToken: TOKEN,
      now: () => new Date(NOW),
    });
    const first = await handler(request("/api/announcements"));
    expect(first.status).toBe(200);
    expect(await first.json()).toEqual({
      announcements: [
        {
          id: makeAnnouncement().id,
          title_tr: makeAnnouncement().title_tr,
          body_tr: makeAnnouncement().body_tr,
          title_en: makeAnnouncement().title_en,
          body_en: makeAnnouncement().body_en,
          title_de: makeAnnouncement().title_de,
          body_de: makeAnnouncement().body_de,
          title_fr: makeAnnouncement().title_fr,
          body_fr: makeAnnouncement().body_fr,
          title_it: makeAnnouncement().title_it,
          body_it: makeAnnouncement().body_it,
          title_pt: makeAnnouncement().title_pt,
          body_pt: makeAnnouncement().body_pt,
          category: makeAnnouncement().category,
          publish_at: makeAnnouncement().publish_at,
          expires_at: null,
        },
      ],
    });
    expect(first.headers.get("access-control-allow-origin")).toBe("*");
    expect(listPublished).toHaveBeenCalledWith(NOW);

    const etag = first.headers.get("etag");
    const cached = await handler(
      request("/api/announcements", { headers: { "if-none-match": etag! } }),
    );
    expect(cached.status).toBe(304);
  });

  it("limits public feed preflight to read-only feed requests", async () => {
    const handler = createAnnouncementHandler(repository(), {
      adminToken: TOKEN,
    });
    const response = await handler(
      request("/api/announcements", {
        method: "OPTIONS",
        headers: {
          origin: "https://app.example",
          "access-control-request-method": "GET",
          "access-control-request-headers": "if-none-match",
        },
      }),
    );

    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-origin")).toBe("*");
    expect(response.headers.get("access-control-allow-methods")).toBe("GET");
    expect(response.headers.get("access-control-allow-headers")).toBe(
      "if-none-match",
    );
  });

  it("does not allow cross-origin admin preflight", async () => {
    const handler = createAnnouncementHandler(repository(), {
      adminToken: TOKEN,
    });
    const response = await handler(
      request("/api/admin/announcements", {
        method: "OPTIONS",
        headers: {
          origin: "https://attacker.example",
          "access-control-request-method": "POST",
          "access-control-request-headers": "authorization,content-type",
        },
      }),
    );

    expect(response.status).toBe(401);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
  });

  it("requires a high-entropy admin token before exposing drafts or writes", async () => {
    const listAll = vi.fn(async () => [makeAnnouncement()]);
    const create = vi.fn(async () => undefined);
    const repo = repository({ listAll, create });
    const handler = createAnnouncementHandler(repo, { adminToken: TOKEN });
    const response = await handler(request("/api/admin/announcements"));
    expect(response.status).toBe(401);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
    expect(listAll).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });

  it("validates bilingual content and publication dates before saving", async () => {
    const create = vi.fn(async () => undefined);
    const repo = repository({ create });
    const handler = createAnnouncementHandler(repo, { adminToken: TOKEN });
    const response = await handler(
      request("/api/admin/announcements", {
        method: "POST",
        headers: {
          authorization: `Bearer ${TOKEN}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title_tr: "Duyuru",
          body_tr: "Metin",
          title_en: "Announcement",
          body_en: "Text",
          title_de: "Ankündigung",
          body_de: "Text",
          title_fr: "Annonce",
          body_fr: "Texte",
          title_it: "Annuncio",
          body_it: "Testo",
          title_pt: "Aviso",
          body_pt: "Texto",
          category: "product",
          status: "published",
          publish_at: "2026-10-25T10:00:00.000Z",
          expires_at: "2026-10-25T09:00:00.000Z",
        }),
      }),
    );
    expect(response.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it("stores valid new announcements and allows status changes", async () => {
    const saved: Announcement[] = [];
    const setStatus = vi.fn(async () => undefined);
    const update = vi.fn(async (item: Announcement) => {
      saved[0] = item;
    });
    const repo = repository({
      create: async (item) => {
        saved.push(item);
      },
      get: async () => saved[0] ?? null,
      setStatus,
      update,
    });
    const handler = createAnnouncementHandler(repo, {
      adminToken: TOKEN,
      now: () => new Date(NOW),
    });
    const response = await handler(
      request("/api/admin/announcements", {
        method: "POST",
        headers: {
          authorization: `Bearer ${TOKEN}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title_tr: "Ürün yeniliği",
          body_tr: "Yeni raporlar hazır.",
          title_en: "Product update",
          body_en: "New reports are ready.",
          title_de: "Produktneuigkeit",
          body_de: "Neue Berichte sind verfügbar.",
          title_fr: "Nouveauté produit",
          body_fr: "Les nouveaux rapports sont prêts.",
          title_it: "Novità del prodotto",
          body_it: "I nuovi report sono pronti.",
          title_pt: "Novidade do produto",
          body_pt: "Os novos relatórios estão prontos.",
          category: "product",
          status: "published",
          publish_at: NOW,
          expires_at: null,
        }),
      }),
    );
    expect(response.status).toBe(201);
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({
      status: "published",
      title_en: "Product update",
    });

    const updated = await handler(
      request(`/api/admin/announcements/${saved[0].id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${TOKEN}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "archived" }),
      }),
    );
    expect(updated.status).toBe(200);
    expect(updated.headers.get("access-control-allow-origin")).toBeNull();
    expect(setStatus).toHaveBeenCalledWith(saved[0].id, "archived", NOW);

    const edited = await handler(
      request(`/api/admin/announcements/${saved[0].id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${TOKEN}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title_tr: "Yenilenen başlık",
          body_tr: "Güncel metin",
          title_en: "Updated title",
          body_en: "Updated message",
          title_de: "Aktualisierter Titel",
          body_de: "Aktualisierte Nachricht",
          title_fr: "Titre mis à jour",
          body_fr: "Message mis à jour",
          title_it: "Titolo aggiornato",
          body_it: "Messaggio aggiornato",
          title_pt: "Título atualizado",
          body_pt: "Mensagem atualizada",
          category: "product",
          status: "published",
          publish_at: NOW,
          expires_at: null,
        }),
      }),
    );
    expect(edited.status).toBe(200);
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        id: saved[0].id,
        title_tr: "Yenilenen başlık",
        status: "published",
        created_at: NOW,
      }),
    );
  });
});
