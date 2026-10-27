import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import {
  docUrl,
  enSlugs,
  locales,
  privacyUrl,
  rewriteLinks,
  trSlugs,
} from "./site-locales.mjs";

type SiteLocale = {
  lang: string;
  docsSlug: string;
  docsBase: string;
  slugs: Record<string, string>;
  legacySlugs?: Record<string, string[]>;
};
const siteLocales = locales as unknown as Record<string, SiteLocale>;

test("each edition uses its own translated paths for the guide and privacy page", () => {
  const expected = {
    tr: ["/kilavuz/", "/kilavuz/kurulum-windows/", "/gizlilik/"],
    en: ["/en/docs/", "/en/docs/install-windows/", "/en/privacy/"],
    de: [
      "/de/dokumentation/",
      "/de/dokumentation/installation-unter-windows/",
      "/de/datenschutz/",
    ],
    fr: [
      "/fr/guides/",
      "/fr/guides/installation-sous-windows/",
      "/fr/confidentialite/",
    ],
    it: ["/it/guide/", "/it/guide/installazione-su-windows/", "/it/privacy/"],
    pt: ["/pt/guias/", "/pt/guias/instalar-no-windows/", "/pt/privacidade/"],
  } as const;

  for (const language of Object.keys(expected) as Array<
    keyof typeof expected
  >) {
    const [guideIndex, guide, privacy] = expected[language];
    const locale = siteLocales[language];
    expect(docUrl(locale, "")).toBe(guideIndex);
    expect(docUrl(locale, "kurulum-windows")).toBe(guide);
    expect(privacyUrl(locale)).toBe(privacy);
    expect(rewriteLinks('<a href="/privacy/">Privacy</a>', locale)).toContain(
      `href="${privacy}"`,
    );
  }
});

test("source guide links are rewritten to each edition's localized guide prefix and slug", () => {
  const source = '<a href="/docs/kurulum-windows/">Install</a>';
  const expected = {
    tr: "/kilavuz/kurulum-windows/",
    en: "/en/docs/install-windows/",
    de: "/de/dokumentation/installation-unter-windows/",
    fr: "/fr/guides/installation-sous-windows/",
    it: "/it/guide/installazione-su-windows/",
    pt: "/pt/guias/instalar-no-windows/",
  } as const;

  for (const language of Object.keys(expected) as Array<
    keyof typeof expected
  >) {
    expect(rewriteLinks(source, siteLocales[language])).toContain(
      `href="${expected[language]}"`,
    );
  }
});

test("each translated edition explicitly maps every guide to its own path", () => {
  const guideSlugs = Object.keys(enSlugs).sort();
  for (const locale of Object.values(siteLocales)) {
    expect(Object.keys(locale.slugs ?? {}).sort(), locale.lang).toEqual(
      guideSlugs,
    );
    expect(new Set(Object.values(locale.slugs ?? {})).size, locale.lang).toBe(
      guideSlugs.length,
    );
    if (locale.lang !== "en") {
      for (const [sourceSlug, englishSlug] of Object.entries(enSlugs)) {
        expect(
          locale.slugs?.[sourceSlug],
          `${locale.lang} path ${englishSlug}`,
        ).not.toBe(englishSlug);
      }
    }
  }
});

test("the Analytics guide uses localized paths and preserves the old path", () => {
  const expected = {
    tr: "/kilavuz/analitik/",
    en: "/en/docs/analytics/",
    de: "/de/dokumentation/datenanalyse/",
    fr: "/fr/guides/statistiques/",
    it: "/it/guide/analisi/",
    pt: "/pt/guias/analise/",
  } as const;
  for (const [language, route] of Object.entries(expected)) {
    expect(docUrl(siteLocales[language], "analytics")).toBe(route);
    if (language !== "en")
      expect(siteLocales[language].legacySlugs?.analytics).toContain(
        "analytics",
      );
  }
  expect(trSlugs.analytics).toBe("analitik");
});

test("Italian uses its own word for report pages and preserves the former URL", () => {
  expect(docUrl(siteLocales.it, "raporlar")).toBe("/it/guide/rapporti/");
  expect(siteLocales.it.legacySlugs?.raporlar).toContain("report");
});

test("translated guide paths stay unique within each edition", () => {
  for (const locale of Object.values(siteLocales)) {
    const paths = Object.keys(enSlugs).map((slug) => docUrl(locale, slug));
    expect(new Set(paths).size).toBe(paths.length);
  }
});

test("published guides use localized prefixes while legacy paths redirect without indexing", () => {
  const sitemap = readFileSync(
    new URL("../site/sitemap.xml", import.meta.url),
    "utf8",
  );
  const cases = [
    [
      "../site/index.html",
      "/kilavuz/kurulum-windows/",
      "../site/docs/kurulum-windows/index.html",
      "/docs/kurulum-windows/",
      "/kilavuz/kurulum-windows/",
    ],
    [
      "../site/de/index.html",
      "/de/dokumentation/installation-unter-windows/",
      "../site/de/docs/installation-windows/index.html",
      "/de/docs/installation-windows/",
      "/de/dokumentation/installation-unter-windows/",
    ],
    [
      "../site/fr/index.html",
      "/fr/guides/installation-sous-windows/",
      "../site/fr/docs/installation-windows/index.html",
      "/fr/docs/installation-windows/",
      "/fr/guides/installation-sous-windows/",
    ],
    [
      "../site/it/index.html",
      "/it/guide/installazione-su-windows/",
      "../site/it/docs/installazione-windows/index.html",
      "/it/docs/installazione-windows/",
      "/it/guide/installazione-su-windows/",
    ],
    [
      "../site/pt/index.html",
      "/pt/guias/instalar-no-windows/",
      "../site/pt/docs/instalar-windows/index.html",
      "/pt/docs/instalar-windows/",
      "/pt/guias/instalar-no-windows/",
    ],
  ] as const;

  for (const [
    homePath,
    route,
    legacyPath,
    legacyUrl,
    redirectTarget,
  ] of cases) {
    expect(readFileSync(new URL(homePath, import.meta.url), "utf8")).toContain(
      `href="${route}"`,
    );
    expect(sitemap).toContain(`https://seowatcher.io${route}`);
    const legacy = readFileSync(new URL(legacyPath, import.meta.url), "utf8");
    expect(legacy).toContain('name="robots" content="noindex,follow"');
    expect(legacy).toMatch(
      new RegExp(
        `http-equiv="refresh"\\s+content="0; url=${redirectTarget.replaceAll("/", "\\/")}"`,
      ),
    );
    expect(legacy).toMatch(
      new RegExp(
        `rel="canonical"\\s+href="https://seowatcher\\.io${redirectTarget.replaceAll("/", "\\/")}"`,
      ),
    );
    expect(sitemap).not.toContain(`https://seowatcher.io${legacyUrl}`);
  }
});

test("old localized guide slugs redirect to the translated canonical paths", () => {
  const sitemap = readFileSync(
    new URL("../site/sitemap.xml", import.meta.url),
    "utf8",
  );
  for (const locale of Object.values(siteLocales)) {
    for (const [sourceSlug, oldSlugs] of Object.entries(
      locale.legacySlugs ?? {},
    ))
      for (const oldSlug of oldSlugs) {
        const route = docUrl(locale, sourceSlug);
        const oldPaths =
          locale.lang === "tr"
            ? [
                `../site/${locale.docsSlug}/${oldSlug}/index.html`,
                `../site/docs/${oldSlug}/index.html`,
              ]
            : [
                `../site/${locale.lang}/${locale.docsSlug}/${oldSlug}/index.html`,
                `../site/${locale.lang}/docs/${oldSlug}/index.html`,
              ];
        for (const oldPath of oldPaths) {
          const page = readFileSync(new URL(oldPath, import.meta.url), "utf8");
          expect(page).toContain('name="robots" content="noindex,follow"');
          expect(page).toContain(`href="https://seowatcher.io${route}"`);
          expect(page).toContain(`content="0; url=${route}"`);
        }
        const oldUrlPrefix =
          locale.lang === "tr"
            ? `https://seowatcher.io/${locale.docsSlug}/${oldSlug}/`
            : `https://seowatcher.io/${locale.lang}/${locale.docsSlug}/${oldSlug}/`;
        expect(sitemap).not.toContain(oldUrlPrefix);
      }
  }
});

test("every published guide has a localized canonical route and hreflang entry", () => {
  const sitemap = readFileSync(
    new URL("../site/sitemap.xml", import.meta.url),
    "utf8",
  );
  const guideSlugs = Object.keys(enSlugs);

  for (const locale of Object.values(siteLocales)) {
    for (const slug of guideSlugs) {
      const route = docUrl(locale, slug);
      const html = readFileSync(
        new URL(`../site${route}index.html`, import.meta.url),
        "utf8",
      );
      const compactHtml = html.replace(/\s+/g, " ");
      expect(html).toContain(`<html lang="${locale.lang}">`);
      expect(compactHtml).toContain(
        `<link rel="canonical" href="https://seowatcher.io${route}"`,
      );
      expect(compactHtml).toContain(
        `hreflang="${locale.lang}" href="https://seowatcher.io${route}"`,
      );
      expect(sitemap).toContain(`<loc>https://seowatcher.io${route}</loc>`);
    }
  }
});

test("the multilingual not-found page links to each localized guide index", () => {
  const notFound = readFileSync(
    new URL("../site/404.html", import.meta.url),
    "utf8",
  );
  for (const route of [
    "/kilavuz/",
    "/en/docs/",
    "/de/dokumentation/",
    "/fr/guides/",
    "/it/guide/",
    "/pt/guias/",
  ]) {
    expect(notFound).toContain(`href="${route}"`);
  }
  expect(notFound).not.toMatch(/href="\/(?:de|fr|it|pt)\/docs\//);
});
