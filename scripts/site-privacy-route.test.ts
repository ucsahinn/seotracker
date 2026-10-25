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
