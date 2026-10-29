import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { load } from "cheerio";
import { expect, test } from "vitest";

const site = new URL("../site/", import.meta.url);
const pages = readdirSync(site, { recursive: true })
  .map(String)
  .filter((file) => file.endsWith(".html"))
  .map((file) => ({
    route:
      "/" +
      file
        .split(path.sep)
        .join("/")
        .replace(/index\.html$/, ""),
    $: load(
      readFileSync(new URL(file.split(path.sep).join("/"), site), "utf8"),
    ),
  }));
const content = pages.filter(
  ({ $ }) => !$('meta[http-equiv="refresh"]').length,
);

test("every content page has one distinct H1 and unique element ids", () => {
  const headings = new Map<string, string>();
  for (const { route, $ } of content) {
    expect($("h1").length, route).toBe(1);
    const heading = $("h1").text().replace(/\s+/g, " ").trim();
    expect(headings.get(heading), `${route}: ${heading}`).toBeUndefined();
    headings.set(heading, route);
    const ids = $("[id]")
      .map((_, element) => $(element).attr("id"))
      .get();
    expect(new Set(ids).size, route).toBe(ids.length);
  }
});

test("every content page has a concise description and title", () => {
  for (const { route, $ } of content) {
    const description = $('meta[name="description"]').attr("content") ?? "";
    expect(
      description.length,
      `${route}: ${description}`,
    ).toBeGreaterThanOrEqual(70);
    expect(description.length, `${route}: ${description}`).toBeLessThanOrEqual(
      160,
    );
    expect($("title").text().length, route).toBeLessThanOrEqual(60);
  }
});

test("every refresh alias has one HTTP 301 per URL form directly to its canonical", () => {
  const config = readFileSync(
    new URL("../packaging/site/seowatcher-redirects.conf", import.meta.url),
    "utf8",
  );
  const rules = [
    ...config.matchAll(/^location = (\S+) \{ return 301 (\S+); \}$/gm),
  ];
  const aliases = pages.filter(
    ({ $ }) => $('meta[http-equiv="refresh"]').length,
  );
  expect(aliases.length).toBeGreaterThan(0);
  expect(rules.length).toBe(aliases.length * 3);
  expect(new Set(rules.map((rule) => rule[1])).size).toBe(rules.length);
  expect(rules.map((rule) => rule[1])).toEqual(
    rules.map((rule) => rule[1]).sort(),
  );
  const oldRoutes = new Set(aliases.map(({ route }) => route));
  for (const { route, $ } of aliases) {
    const target = new URL($('link[rel="canonical"]').attr("href")!).pathname;
    expect(oldRoutes.has(target), route).toBe(false);
    expect(
      content.some((page) => page.route === target),
      target,
    ).toBe(true);
    expect(
      $('meta[http-equiv="refresh"]')
        .attr("content")
        ?.split(/url=/i)[1]
        ?.trim(),
      route,
    ).toBe(target);
    for (const form of [route, route.slice(0, -1), route + "index.html"]) {
      expect(
        rules.filter((rule) => rule[1] === form).map((rule) => rule[2]),
        form,
      ).toEqual([target]);
    }
  }
});
