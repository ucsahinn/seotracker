import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const launch = readFileSync(
  new URL("../docs/LAUNCH.md", import.meta.url),
  "utf8",
);
const llms = readFileSync(new URL("../site/llms.txt", import.meta.url), "utf8");
const mcpServer = readFileSync(
  new URL("../src/server/mcp/server.ts", import.meta.url),
  "utf8",
);
const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
const registeredToolCount = [
  ...mcpServer.matchAll(/^\s+register\(\w+Tool\);$/gm),
].length;

test("the generated AI guide reports the tools the app actually registers", () => {
  expect(registeredToolCount).toBeGreaterThan(0);
  expect(llms).toContain(`${registeredToolCount} MCP aracı`);
  expect(llms).toContain(`${registeredToolCount} MCP tools`);
});

test("the public README lists every MCP tool exposed by the app", () => {
  const section =
    /<summary>\d+ aracın tam listesi<\/summary>[\s\S]*?<\/details>/.exec(
      readme,
    )?.[0] ?? "";
  const names = [...section.matchAll(/`([a-z][a-z0-9_]*)`/g)].map(
    (match) => match[1],
  );

  expect(section).toContain(
    `<summary>${registeredToolCount} aracın tam listesi</summary>`,
  );
  expect(new Set(names).size).toBe(registeredToolCount);
  expect(names).toContain("get_search_summary");
});

test("the launch checklist lists each locale's canonical guide index", () => {
  for (const path of [
    "/kilavuz/",
    "/en/docs/",
    "/de/dokumentation/",
    "/fr/guides/",
    "/it/guide/",
    "/pt/guias/",
  ]) {
    expect(launch).toContain(`https://seowatcher.io${path}`);
  }
});

test("indexing and validation instructions use localized canonical guide URLs", () => {
  for (const path of [
    "/de/docs/",
    "/fr/docs/",
    "/it/docs/",
    "/pt/docs/",
    "/docs/kurulum-windows/",
    "/en/docs/install-windows/ (de, fr, it, pt için de aynı)",
    "/de/dokumentation/installation-windows/",
    "/fr/guides/installation-windows/",
    "/it/guide/installazione-windows/",
    "/it/guide/report/",
    "/pt/guias/instalar-windows/",
  ]) {
    expect(launch).not.toContain(`https://seowatcher.io${path}`);
  }

  for (const path of [
    "/kilavuz/kurulum-windows/",
    "/en/docs/install-windows/",
    "/de/dokumentation/installation-unter-windows/",
    "/fr/guides/installation-sous-windows/",
    "/it/guide/installazione-su-windows/",
    "/pt/guias/instalar-no-windows/",
  ]) {
    expect(launch).toContain(`https://seowatcher.io${path}`);
  }
});

test("index coverage guidance accounts for intentionally excluded legacy aliases", () => {
  expect(launch).toContain(
    "Eski `/docs/` adresleri ve önceki dil kılavuz slug'ları `noindex` yenileme",
  );
  expect(launch).toMatch(
    /URL denetiminde bunları\s+indekslemeye göndermeyin; yeni dile özel\s+canonical adresleri kullanın/,
  );
});

test("Google launch guidance covers generative AI inclusion and reporting", () => {
  const normalized = launch.replace(/\s+/g, " ");
  expect(normalized).toContain("Search generative AI");
  expect(normalized).toContain("Include my site's links and content");
  expect(normalized).toContain("Generative AI performance report");
  expect(normalized).toMatch(
    /`?llms\.txt`? Google Search sıralamasına katkı sağlamaz/,
  );
});
