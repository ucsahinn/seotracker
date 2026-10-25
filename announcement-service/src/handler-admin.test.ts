import { describe, expect, it, vi } from "vitest";
import { createAnnouncementHandler } from "./handler";
import type { Announcement } from "./types";
import {
  makeAnnouncement,
  NOW,
  repository,
  request,
  TOKEN,
} from "./handler.test-support";

describe("announcement service", () => {
  it("stores valid new announcements and allows status changes", async () => {
    const saved: Announcement[] = [];
    const setStatus = vi.fn(async () => undefined);
    const updateWithOptions = vi.fn(async (item: Announcement) => {
      saved[0] = item;
    });
    const repo = repository({
      createWithOptions: async (item) => {
        saved.push(item);
      },
      get: async () => saved[0] ?? null,
      setStatus,
      updateWithOptions,
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
    expect(updateWithOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        id: saved[0].id,
        title_tr: "Yenilenen başlık",
        status: "published",
        created_at: NOW,
      }),
      [],
    );
  });

  it("accepts Turkish and English poll content without requiring other translations", async () => {
    const created: Announcement[] = [];
    const savedOptions: Array<{
      id: string;
      label_tr: string;
      label_en: string;
    }> = [];
    const createWithOptions = vi.fn(
      async (item: Announcement, options: typeof savedOptions) => {
        created.push(item);
        savedOptions.push(...options);
      },
    );
    const repo = repository({
      createWithOptions,
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
          title_tr: "Hangi özellik?",
          body_tr: "Önceliğinizi seçin.",
          title_en: "Which feature?",
          body_en: "Choose your priority.",
          category: "product",
          status: "published",
          publish_at: NOW,
          expires_at: null,
          interaction_type: "poll",
          prompt_tr: "Önce ne gelsin?",
          prompt_en: "What should come first?",
          options: [
            { label_tr: "Raporlar", label_en: "Reports" },
            { label_tr: "Mobil", label_en: "Mobile" },
          ],
        }),
      }),
    );

    expect(response.status).toBe(201);
    expect(created[0]).toMatchObject({
      title_de: "Which feature?",
      interaction_type: "poll",
    });
    expect(savedOptions.map(({ id: _id, ...labels }) => labels)).toEqual([
      { label_tr: "Raporlar", label_en: "Reports" },
      { label_tr: "Mobil", label_en: "Mobile" },
    ]);
    expect(savedOptions.every(({ id }) => /^[0-9a-f-]{36}$/i.test(id))).toBe(
      true,
    );
    expect(created[0]?.id).toBeTruthy();
  });

  it("requires cloning before editing a published poll, including before its first response", async () => {
    const item = makeAnnouncement({
      interaction_type: "poll",
      prompt_tr: "Ne gelsin?",
      prompt_en: "What comes next?",
      options: [
        {
          id: "58d6baaa-f9b2-4f8b-b2ec-f60c93041b4a",
          label_tr: "Rapor",
          label_en: "Reports",
          count: 0,
        },
      ],
    });
    const updateWithOptions = vi.fn(async () => undefined);
    const handler = createAnnouncementHandler(
      repository({ get: async () => item, updateWithOptions }),
      { adminToken: TOKEN, now: () => new Date(NOW) },
    );
    const response = await handler(
      request(`/api/admin/announcements/${item.id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${TOKEN}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title_tr: item.title_tr,
          body_tr: item.body_tr,
          title_en: item.title_en,
          body_en: item.body_en,
          category: "product",
          status: "published",
          publish_at: NOW,
          expires_at: null,
          interaction_type: "poll",
          prompt_tr: "Yeni soru?",
          prompt_en: "New question?",
          options: [
            { label_tr: "Mobil", label_en: "Mobile" },
            { label_tr: "Rapor", label_en: "Reports" },
          ],
        }),
      }),
    );

    expect(response.status).toBe(409);
    expect(updateWithOptions).not.toHaveBeenCalled();
  });

  it("reissues a past announcement as a fresh draft without carrying votes", async () => {
    const source = makeAnnouncement({
      interaction_type: "poll",
      prompt_tr: "Ne gelsin?",
      prompt_en: "What should come next?",
      options: [
        {
          id: "58d6baaa-f9b2-4f8b-b2ec-f60c93041b4a",
          label_tr: "Rapor",
          label_en: "Reports",
          count: 12,
        },
      ],
      response_count: 12,
      publish_at: "2025-01-01T00:00:00.000Z",
      expires_at: "2025-01-02T00:00:00.000Z",
      status: "archived",
    });
    const createdClones: Announcement[] = [];
    const copiedOptions: Array<{
      id: string;
      label_tr: string;
      label_en: string;
    }> = [];
    const createWithOptions = vi.fn(
      async (item: Announcement, options: typeof copiedOptions) => {
        createdClones.push(item);
        copiedOptions.push(...options);
      },
    );
    const handler = createAnnouncementHandler(
      repository({ get: async () => source, createWithOptions }),
      { adminToken: TOKEN, now: () => new Date(NOW) },
    );

    const response = await handler(
      request(`/api/admin/announcements/${source.id}/clone`, {
        method: "POST",
        headers: { authorization: `Bearer ${TOKEN}` },
      }),
    );
    const result = await response.json();

    expect(response.status).toBe(201);
    expect(result).toMatchObject({
      announcement: {
        status: "draft",
        publish_at: NOW,
        expires_at: null,
        response_count: 0,
        title_tr: source.title_tr,
      },
    });
    expect(createdClones[0]?.id).not.toBe(source.id);
    expect(createdClones[0]).toMatchObject({
      status: "draft",
    });
    expect(copiedOptions.map(({ id: _id, ...labels }) => labels)).toEqual([
      { label_tr: "Rapor", label_en: "Reports" },
    ]);
    expect(copiedOptions.every(({ id }) => /^[0-9a-f-]{36}$/i.test(id))).toBe(
      true,
    );
  });
});
