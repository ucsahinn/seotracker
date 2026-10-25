import { describe, expect, it, vi } from "vitest";
import { createAnnouncementHandler } from "./handler";
import {
  makeAnnouncement,
  NOW,
  repository,
  request,
  TOKEN,
} from "./handler.test-support";

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
          title_de: makeAnnouncement().title_en,
          body_de: makeAnnouncement().body_en,
          title_fr: makeAnnouncement().title_en,
          body_fr: makeAnnouncement().body_en,
          title_it: makeAnnouncement().title_en,
          body_it: makeAnnouncement().body_en,
          title_pt: makeAnnouncement().title_en,
          body_pt: makeAnnouncement().body_en,
          interaction_type: "none",
          prompt_tr: "",
          prompt_en: "",
          options: [],
          response_count: 0,
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
});
