import { existsSync } from "node:fs";
import { afterEach, expect, it } from "vitest";
import { setLocale } from "@/shared/i18n";
import { pageGuideUrl } from "./pageGuide";

afterEach(() => setLocale("tr"));
it("opens each screen's guide in the interface language at a published path", () => {
  for (const locale of ["tr", "en"] as const) {
    setLocale(locale);
    for (const path of [
      "/",
      "/settings",
      "/release-notes",
      "/support",
      "/ai",
      "/projects",
      "/p/id",
      "/p/id/audit",
      "/p/id/search-performance",
      "/p/id/rankings",
      "/p/id/opportunities",
      "/p/id/saved",
      "/p/id/analytics",
      "/p/id/reports/one",
      "/p/id/context",
      "/p/id/settings/integrations",
    ]) {
      const url = new URL(pageGuideUrl(path));
      expect(
        url.pathname.startsWith(locale === "en" ? "/en/docs/" : "/docs/"),
      ).toBe(true);
      expect(existsSync(`site${url.pathname}index.html`), url.pathname).toBe(
        true,
      );
    }
  }
  setLocale("en");
  expect(pageGuideUrl("/p/id/audit")).toBe(
    "https://seowatcher.io/en/docs/site-audit/",
  );
});
