import { describe, expect, it } from "vitest";
import {
  getAnnouncementText,
  getPollOptionPercentages,
  publicAnnouncementSchema,
} from "./announcement";

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

describe("getPollOptionPercentages", () => {
  it("distributes rounding points deterministically so displayed votes total 100%", () => {
    const options = Array.from({ length: 6 }, (_, index) => ({
      id: String(index),
      count: 1,
    }));
    const percentages = getPollOptionPercentages(options);

    expect(Object.values(percentages)).toEqual([17, 17, 17, 17, 16, 16]);
    expect(
      Object.values(percentages).reduce((sum, value) => sum + value, 0),
    ).toBe(100);
  });

  it("shows zero for every option before the first vote", () => {
    expect(
      getPollOptionPercentages([
        { id: "a", count: 0 },
        { id: "b", count: 0 },
      ]),
    ).toEqual({ a: 0, b: 0 });
  });
});
