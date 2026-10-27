import { existsSync, readFileSync } from "node:fs";
import { afterEach, expect, it } from "vitest";
import { setLocale } from "@/shared/i18n";
import { pageGuideUrl } from "./pageGuide";
import { DOCS, docsUrl, docsIndexUrl, siteUrl } from "./links";
import { GUIDE_LOCALES } from "./guideLocales";
import { z } from "zod";

afterEach(() => setLocale("tr"));
it("opens each screen's guide in the interface language at a published path", () => {
  for (const locale of ["tr", "en", "de", "fr", "it", "pt"] as const) {
    setLocale(locale);
    if (locale !== "tr" && locale !== "en") {
      const catalog = z
        .object({
          docsSlug: z.string(),
          slugs: z.record(z.string(), z.string()),
        })
        .parse(
          JSON.parse(readFileSync(`scripts/site-i18n.${locale}.json`, "utf8")),
        );
      expect(GUIDE_LOCALES[locale]).toEqual({
        base: `/${locale}/${catalog.docsSlug}/`,
        slugs: catalog.slugs,
      });
    }
    for (const path of [
      "/",
      "/settings",
      "/release-notes",
      "/support",
      "/announcements",
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
      "/p/id/settings/context",
    ]) {
      const url = new URL(pageGuideUrl(path));
      expect(url.pathname.startsWith(GUIDE_LOCALES[locale].base)).toBe(true);
      expect(existsSync(`site${url.pathname}index.html`), url.pathname).toBe(
        true,
      );
    }
  }
  setLocale("en");
  expect(pageGuideUrl("/p/id/audit")).toBe(
    "https://seowatcher.io/en/docs/site-audit/",
  );
  expect(pageGuideUrl("/p/id/settings/context")).toBe(
    "https://seowatcher.io/en/docs/project-context/",
  );
});

it("resolves every guide to its locale's source and published page", () => {
  for (const locale of ["tr", "en", "de", "fr", "it", "pt"] as const) {
    setLocale(locale);
    expect(new URL(siteUrl()).pathname).toBe(
      locale === "tr" ? "/" : `/${locale}/`,
    );
    expect(new URL(docsIndexUrl()).pathname).toBe(GUIDE_LOCALES[locale].base);
    for (const [source, slug] of Object.entries(GUIDE_LOCALES[locale].slugs)) {
      expect(
        existsSync(
          `docs/kb/${locale === "tr" ? "" : `${locale}/`}${source}.md`,
        ),
      ).toBe(true);
      expect(
        existsSync(`site${GUIDE_LOCALES[locale].base}${slug}/index.html`),
      ).toBe(true);
    }
    for (const file of Object.values(DOCS)) {
      const url = new URL(docsUrl(file));
      expect(existsSync(`site${url.pathname}index.html`), url.pathname).toBe(
        true,
      );
    }
  }
});
