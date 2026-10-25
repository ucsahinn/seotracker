import { describe, expect, it } from "vitest";
import { getAnnouncementText, publicAnnouncementSchema } from "./announcement";

const announcement = publicAnnouncementSchema.parse({
  id: "f167ffc9-c83d-449d-bb81-9e7b69940a0d",
  title_tr: "Türkçe başlık",
  body_tr: "Türkçe içerik",
  title_en: "English title",
  body_en: "English message",
  category: "release",
  publish_at: "2026-10-25T09:00:00.000Z",
  expires_at: null,
});

describe("getAnnouncementText", () => {
  it.each([
    ["tr", "Türkçe başlık", "Türkçe içerik"],
    ["en", "English title", "English message"],
    ["de", "English title", "English message"],
    ["fr", "English title", "English message"],
    ["it", "English title", "English message"],
    ["pt", "English title", "English message"],
  ] as const)("selects the %s copy", (locale, title, body) => {
    expect(getAnnouncementText(announcement, locale)).toEqual({ title, body });
  });

  it("uses the English announcement for every non-Turkish app locale", () => {
    expect(getAnnouncementText(announcement, "de")).toEqual({
      title: "English title",
      body: "English message",
    });
  });
});
