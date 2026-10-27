import { existsSync, readFileSync } from "node:fs";
import { load } from "cheerio";
import { expect, test } from "vitest";

const routes = [
  ["tr", "gizlilik"],
  ["en", "privacy"],
  ["de", "datenschutz"],
  ["fr", "confidentialite"],
  ["it", "privacy"],
  ["pt", "privacidade"],
] as const;
const ogLocales = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
  pt: "pt_BR",
} as const;

test.each(routes)(
  "%s privacy page has a localized canonical route",
  (language, slug) => {
    const prefix = language === "tr" ? "" : `/${language}`;
    const url = `https://seowatcher.io${prefix}/${slug}/`;
    const file = new URL(
      `../site${prefix}/${slug}/index.html`,
      import.meta.url,
    );
    expect(existsSync(file)).toBe(true);
    const $ = load(readFileSync(file, "utf8"));
    expect($('link[rel="canonical"]').attr("href")).toBe(url);
    expect(
      $(`link[rel="alternate"][hreflang="${language}"]`).attr("href"),
    ).toBe(url);
  },
);

test.each(routes)(
  "%s privacy page has localized social preview metadata",
  (language, slug) => {
    const prefix = language === "tr" ? "" : `/${language}`;
    const url = `https://seowatcher.io${prefix}/${slug}/`;
    const file = new URL(
      `../site${prefix}/${slug}/index.html`,
      import.meta.url,
    );
    const imageName = language === "tr" ? "og.png" : `og-${language}.png`;
    const image = `https://seowatcher.io/assets/${imageName}`;
    const $ = load(readFileSync(file, "utf8"));

    expect($('meta[property="og:type"]').attr("content")).toBe("website");
    expect($('meta[property="og:site_name"]').attr("content")).toBe(
      "seowatcher",
    );
    expect($('meta[property="og:title"]').attr("content")).toBe(
      $("title").text(),
    );
    expect($('meta[property="og:description"]').attr("content")).toBe(
      $('meta[name="description"]').attr("content"),
    );
    expect($('meta[property="og:url"]').attr("content")).toBe(url);
    expect($('meta[property="og:locale"]').attr("content")).toBe(
      ogLocales[language],
    );
    expect(
      $('meta[property="og:locale:alternate"]')
        .map((_, element) => $(element).attr("content"))
        .get(),
    ).toEqual(
      Object.values(ogLocales).filter(
        (locale) => locale !== ogLocales[language],
      ),
    );
    expect($('meta[property="og:image"]').attr("content")).toBe(image);
    expect($('meta[property="og:image:type"]').attr("content")).toBe(
      "image/png",
    );
    expect($('meta[property="og:image:width"]').attr("content")).toBe("1200");
    expect($('meta[property="og:image:height"]').attr("content")).toBe("630");
    expect($('meta[name="twitter:card"]').attr("content")).toBe(
      "summary_large_image",
    );
    expect($('meta[name="twitter:title"]').attr("content")).toBe(
      $("title").text(),
    );
    expect($('meta[name="twitter:description"]').attr("content")).toBe(
      $('meta[name="description"]').attr("content"),
    );
    expect($('meta[name="twitter:image"]').attr("content")).toBe(image);
    expect(
      existsSync(new URL(`../site/assets/${imageName}`, import.meta.url)),
    ).toBe(true);
  },
);

test.each(["tr", "de", "fr", "pt"])(
  "%s keeps its former privacy route as a canonicalized redirect",
  (language) => {
    const prefix = language === "tr" ? "" : `/${language}`;
    const slug = routes.find(([code]) => code === language)![1];
    const legacy = readFileSync(
      new URL(`../site${prefix}/privacy/index.html`, import.meta.url),
      "utf8",
    );
    expect(legacy).toContain('name="robots" content="noindex"');
    expect(legacy).toContain(`content="0;url=${prefix}/${slug}/"`);
  },
);
