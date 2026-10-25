import { expect, test } from "vitest";
import { docUrl, locales, privacyUrl, rewriteLinks } from "./site-locales.mjs";

test("each edition uses its own translated paths for the guide and privacy page", () => {
  const expected = {
    tr: ["/docs/kurulum-windows/", "/gizlilik/"],
    en: ["/en/docs/install-windows/", "/en/privacy/"],
    de: ["/de/docs/installation-windows/", "/de/datenschutz/"],
    fr: ["/fr/docs/installation-windows/", "/fr/confidentialite/"],
    it: ["/it/docs/installazione-windows/", "/it/privacy/"],
    pt: ["/pt/docs/instalar-windows/", "/pt/privacidade/"],
  } as const;

  for (const language of Object.keys(expected) as Array<keyof typeof locales>) {
    const [guide, privacy] = expected[language];
    const locale = locales[language];
    expect(docUrl(locale, "kurulum-windows")).toBe(guide);
    expect(privacyUrl(locale)).toBe(privacy);
    expect(rewriteLinks('<a href="/privacy/">Privacy</a>', locale)).toContain(
      `href="${privacy}"`,
    );
  }
});

test("translated guide paths stay unique within each edition", () => {
  for (const locale of Object.values(locales)) {
    const paths = Object.keys(locales.tr.slugs ?? {}).map((slug) =>
      docUrl(locale, slug),
    );
    expect(new Set(paths).size).toBe(paths.length);
  }
});
