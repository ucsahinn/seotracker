import { describe, expect, it } from "vitest";
import { getAnnouncementText, publicAnnouncementSchema } from "./announcement";

const announcement = publicAnnouncementSchema.parse({
  id: "f167ffc9-c83d-449d-bb81-9e7b69940a0d",
  title_tr: "Türkçe başlık",
  body_tr: "Türkçe içerik",
  title_en: "English title",
  body_en: "English message",
  title_de: "Deutscher Titel",
  body_de: "Deutsche Nachricht",
  title_fr: "Titre français",
  body_fr: "Message français",
  title_it: "Titolo italiano",
  body_it: "Messaggio italiano",
  title_pt: "Título em português",
  body_pt: "Mensagem em português",
  category: "release",
  publish_at: "2026-10-25T09:00:00.000Z",
  expires_at: null,
});

describe("getAnnouncementText", () => {
  it.each([
    ["tr", "Türkçe başlık", "Türkçe içerik"],
    ["en", "English title", "English message"],
    ["de", "Deutscher Titel", "Deutsche Nachricht"],
    ["fr", "Titre français", "Message français"],
    ["it", "Titolo italiano", "Messaggio italiano"],
    ["pt", "Título em português", "Mensagem em português"],
  ] as const)("selects the %s copy", (locale, title, body) => {
    expect(getAnnouncementText(announcement, locale)).toEqual({ title, body });
  });

  it("falls back to English for a legacy blank translation", () => {
    const legacy = { ...announcement, title_de: " ", body_de: "" };
    expect(getAnnouncementText(legacy, "de")).toEqual({
      title: "English title",
      body: "English message",
    });
  });
});
