import { describe, expect, it, vi } from "vitest";
import { createAnnouncementHandler } from "./handler";
import type { AnnouncementRepository } from "./repository";
import {
  makeAnnouncement,
  NOW,
  repository,
  request,
  TOKEN,
} from "./handler.test-support";

describe("announcement service", () => {
  it("stores only validated poll responses for active published announcements", async () => {
    const optionId = "58d6baaa-f9b2-4f8b-b2ec-f60c93041b4a";
    const respondentId = "f66ab1a3-b0d3-498d-bc8d-d0bf46332aef";
    const submitResponse = vi.fn(
      async (_input: Parameters<AnnouncementRepository["submitResponse"]>[0]) =>
        undefined,
    );
    const item = makeAnnouncement({
      interaction_type: "poll",
      options: [
        { id: optionId, label_tr: "Rapor", label_en: "Reports", count: 0 },
      ],
    });
    const handler = createAnnouncementHandler(
      repository({ get: async () => item, submitResponse }),
      { adminToken: TOKEN, now: () => new Date(NOW) },
    );

    const response = await handler(
      request(`/api/announcements/${item.id}/responses`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "cf-connecting-ip": "192.0.2.1",
        },
        body: JSON.stringify({
          respondent_id: respondentId,
          option_id: optionId,
        }),
      }),
    );

    expect(response.status).toBe(201);
    const savedResponse = submitResponse.mock.calls[0]?.[0];
    expect(savedResponse).toMatchObject({
      announcementId: item.id,
      optionId,
      answer: null,
    });
    expect(savedResponse?.respondentHash).not.toBe(respondentId);
    expect(savedResponse?.respondentHash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("limits public response attempts before they write to D1", async () => {
    const submitResponse = vi.fn(async () => undefined);
    const rateLimit = vi.fn(async () => ({ success: false }));
    const handler = createAnnouncementHandler(repository({ submitResponse }), {
      adminToken: TOKEN,
      responseLimiter: { limit: rateLimit },
      now: () => new Date(NOW),
    });
    const response = await handler(
      request(
        "/api/announcements/f167ffc9-c83d-449d-bb81-9e7b69940a0d/responses",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "cf-connecting-ip": "192.0.2.10",
          },
          body: JSON.stringify({
            respondent_id: "f66ab1a3-b0d3-498d-bc8d-d0bf46332aef",
            option_id: "58d6baaa-f9b2-4f8b-b2ec-f60c93041b4a",
          }),
        },
      ),
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("60");
    expect(rateLimit).toHaveBeenCalledWith({ key: "responses:192.0.2.10" });
    expect(submitResponse).not.toHaveBeenCalled();
  });

  it("filters and pages the protected announcement history", async () => {
    const listAll = vi.fn(async () => []);
    const handler = createAnnouncementHandler(repository({ listAll }), {
      adminToken: TOKEN,
    });
    const response = await handler(
      request(
        "/api/admin/announcements?status=archived&q=maintenance&page=3&limit=10",
        { headers: { authorization: `Bearer ${TOKEN}` } },
      ),
    );

    expect(response.status).toBe(200);
    expect(listAll).toHaveBeenCalledWith({
      status: "archived",
      search: "maintenance",
      limit: 11,
      offset: 20,
    });
    expect(await response.json()).toMatchObject({
      page: 3,
      limit: 10,
      hasMore: false,
    });
  });

  it("keeps written question responses behind admin authentication and allows deletion", async () => {
    const deleteResponse = vi.fn(async () => undefined);
    const listResponses = vi.fn(async () => [
      {
        id: "ec030f51-80bc-4679-841b-a1d9b79ab42e",
        option_id: null,
        answer: "Please add exports",
        created_at: NOW,
      },
    ]);
    const handler = createAnnouncementHandler(
      repository({ listResponses, deleteResponse }),
      { adminToken: TOKEN },
    );
    const denied = await handler(
      request(
        "/api/admin/announcements/f167ffc9-c83d-449d-bb81-9e7b69940a0d/responses",
      ),
    );
    expect(denied.status).toBe(401);
    expect(listResponses).not.toHaveBeenCalled();

    const allowed = await handler(
      request(
        "/api/admin/announcements/f167ffc9-c83d-449d-bb81-9e7b69940a0d/responses",
        { headers: { authorization: `Bearer ${TOKEN}` } },
      ),
    );
    expect(allowed.status).toBe(200);
    expect(await allowed.json()).toMatchObject({
      responses: [{ answer: "Please add exports" }],
    });

    const deleted = await handler(
      request("/api/admin/responses/ec030f51-80bc-4679-841b-a1d9b79ab42e", {
        method: "DELETE",
        headers: { authorization: `Bearer ${TOKEN}` },
      }),
    );
    expect(deleted.status).toBe(204);
    expect(deleteResponse).toHaveBeenCalledWith(
      "ec030f51-80bc-4679-841b-a1d9b79ab42e",
    );
  });

  it("paginates response history so older answers remain reviewable", async () => {
    const listResponses = vi.fn(async () => [
      {
        id: "ec030f51-80bc-4679-841b-a1d9b79ab42e",
        option_id: null,
        answer: "Second page answer",
        created_at: NOW,
      },
    ]);
    const handler = createAnnouncementHandler(repository({ listResponses }), {
      adminToken: TOKEN,
    });
    const response = await handler(
      request(
        "/api/admin/announcements/f167ffc9-c83d-449d-bb81-9e7b69940a0d/responses?page=3&limit=20",
        { headers: { authorization: `Bearer ${TOKEN}` } },
      ),
    );

    expect(listResponses).toHaveBeenCalledWith(
      "f167ffc9-c83d-449d-bb81-9e7b69940a0d",
      { limit: 21, offset: 40 },
    );
    expect(await response.json()).toMatchObject({
      page: 3,
      limit: 20,
      hasMore: false,
      responses: [{ answer: "Second page answer" }],
    });
  });
});
