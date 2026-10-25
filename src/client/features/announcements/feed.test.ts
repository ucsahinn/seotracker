import { afterEach, expect, it, vi } from "vitest";
import {
  getLiveAnnouncements,
  parseAnnouncementsFeed,
  submitAnnouncementResponse,
} from "./feed";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("reads live notices from the configured workers.dev endpoint", async () => {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ announcements: [] }), {
      headers: { "Content-Type": "application/json" },
    }),
  );
  vi.stubGlobal("fetch", fetchMock);

  await getLiveAnnouncements();

  expect(fetchMock).toHaveBeenCalledWith(
    "https://seowatcher-announcements.vitalikai07.workers.dev/api/announcements",
    expect.objectContaining({ headers: { Accept: "application/json" } }),
  );
});

it("accepts a bilingual public notice while dropping private service fields", () => {
  const feed = parseAnnouncementsFeed({
    announcements: [
      {
        id: "f167ffc9-c83d-449d-bb81-9e7b69940a0d",
        title_tr: "Bakım",
        body_tr: "Saat 22.00'de bakım var.",
        title_en: "Maintenance",
        body_en: "Maintenance at 22:00.",
        title_de: "Wartung",
        body_de: "Wartung um 22:00 Uhr.",
        title_fr: "Maintenance",
        body_fr: "Maintenance à 22 h.",
        title_it: "Manutenzione",
        body_it: "Manutenzione alle 22:00.",
        title_pt: "Manutenção",
        body_pt: "Manutenção às 22:00.",
        category: "maintenance",
        status: "published",
        publish_at: "2026-10-25T09:00:00.000Z",
        expires_at: null,
        created_at: "2026-10-25T08:00:00.000Z",
        updated_at: "2026-10-25T08:00:00.000Z",
      },
    ],
  });

  expect(feed[0]).not.toHaveProperty("status");
  expect(feed[0]?.title_en).toBe("Maintenance");
});

it("rejects unexpected shapes at the public feed boundary", () => {
  expect(() =>
    parseAnnouncementsFeed({ announcements: [{ title_tr: "Hi" }] }),
  ).toThrow();
});

it("submits an anonymous response to the matching announcement endpoint", async () => {
  const fetchMock = vi
    .fn<typeof fetch>()
    .mockResolvedValue(new Response("{}", { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);

  await submitAnnouncementResponse({
    announcementId: "f167ffc9-c83d-449d-bb81-9e7b69940a0d",
    optionId: "58d6baaa-f9b2-4f8b-b2ec-f60c93041b4a",
  });

  const [url, init] = fetchMock.mock.calls[0] ?? [];
  expect(url).toBe(
    "https://seowatcher-announcements.vitalikai07.workers.dev/api/announcements/f167ffc9-c83d-449d-bb81-9e7b69940a0d/responses",
  );
  expect(init?.method).toBe("POST");
  expect(new Headers(init?.headers).get("content-type")).toBe(
    "application/json",
  );
  const body = init?.body;
  expect(typeof body).toBe("string");
  if (typeof body !== "string") throw new Error("Request body must be text");
  expect(JSON.parse(body)).toMatchObject({
    option_id: "58d6baaa-f9b2-4f8b-b2ec-f60c93041b4a",
  });
});

it("falls back to the HTTP status when the error response is not an object", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(new Response("null", { status: 500 })),
  );

  await expect(
    submitAnnouncementResponse({
      announcementId: "f167ffc9-c83d-449d-bb81-9e7b69940a0d",
      optionId: "58d6baaa-f9b2-4f8b-b2ec-f60c93041b4a",
    }),
  ).rejects.toThrow(/500/);
});
