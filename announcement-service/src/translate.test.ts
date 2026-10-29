import { describe, expect, it, vi } from "vitest";
import { createAnnouncementHandler } from "./handler";
import { repository, request, TOKEN } from "./handler.test-support";
import { translateFields } from "./translate";

// Stand-in model: tags each sentence so the test sees exactly what it received.
const echo = vi.fn(async (texts: string[]) => texts.map((t) => `EN(${t})`));

describe("translateFields", () => {
  it("translates only the sentences and keeps emoji, list markers and lines", async () => {
    const [body] = await translateFields(
      [
        "🚀 Yeni sürüm yayında!\n\n- 📱 Telefonda daha rahat 🎯 Daha akıllı\n✨",
      ],
      echo,
    );
    expect(body).toBe(
      "🚀 EN(Yeni sürüm yayında!)\n\n- 📱 EN(Telefonda daha rahat) 🎯 EN(Daha akıllı)\n✨",
    );
  });

  it("sends a repeated sentence to the model once", async () => {
    await translateFields(["Merhaba", "Merhaba 👋"], echo);
    expect(echo).toHaveBeenCalledWith(["Merhaba"]);
  });
});

describe("POST /api/admin/translate", () => {
  const handler = createAnnouncementHandler(repository({}), {
    adminToken: TOKEN,
    translator: echo,
  });
  const translate = (body: unknown, auth = true) =>
    handler(
      request("/api/admin/translate", {
        method: "POST",
        headers: auth ? { authorization: `Bearer ${TOKEN}` } : {},
        body: JSON.stringify(body),
      }),
    );

  it("requires the administrator token", async () => {
    expect((await translate({ fields: ["Merhaba"] }, false)).status).toBe(401);
  });

  it("returns the drafted fields in order without saving anything", async () => {
    const response = await translate({ fields: ["Başlık", "Mesaj"] });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      fields: ["EN(Başlık)", "EN(Mesaj)"],
    });
  });

  it("rejects malformed input", async () => {
    expect((await translate({ fields: [] })).status).toBe(400);
    expect((await translate({ fields: [42] })).status).toBe(400);
  });
});
