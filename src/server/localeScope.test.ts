import { describe, expect, it } from "vitest";
import { getLocale } from "@/shared/i18n";
import { runWithLocale } from "@/server/localeScope";

describe("runWithLocale", () => {
  it("keeps each request's locale through concurrent async work", async () => {
    const seen = await Promise.all(
      (["en", "tr"] as const).map((locale) =>
        runWithLocale(locale, async () => {
          await new Promise((resolve) => setTimeout(resolve, 5));
          return getLocale();
        }),
      ),
    );
    expect(seen).toEqual(["en", "tr"]);
    expect(getLocale()).toBe("tr");
  });
});
