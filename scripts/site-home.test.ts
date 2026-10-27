import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const packageVersion = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
).version as string;
const registeredToolCount = [
  ...readFileSync(
    new URL("../src/server/mcp/server.ts", import.meta.url),
    "utf8",
  ).matchAll(/^\s+register\(\w+Tool\);$/gm),
].length;

const homepages = [
  ["Turkish source", "./site-home.tr.html"],
  ["Turkish", "../site/index.html"],
  ["English", "../site/en/index.html"],
  ["German", "../site/de/index.html"],
  ["French", "../site/fr/index.html"],
  ["Italian", "../site/it/index.html"],
  ["Portuguese", "../site/pt/index.html"],
] as const;

test.each(homepages)(
  "%s homepage JSON-LD exposes only the current app as a SoftwareApplication",
  (_language, path) => {
    const html = readFileSync(new URL(path, import.meta.url), "utf8");
    const jsonLdMatch = html.match(
      /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
    );
    if (!jsonLdMatch) throw new Error("Homepage JSON-LD not found");
    const data = JSON.parse(jsonLdMatch[1]) as {
      "@graph": Array<Record<string, unknown>>;
    };
    const graph = data["@graph"];
    const applications = graph.filter(
      (item) => item["@type"] === "SoftwareApplication",
    );
    expect(applications).toHaveLength(1);
    const app = applications[0];
    expect(app).toMatchObject({
      name: "seowatcher",
      softwareVersion: `${packageVersion} Alpha`,
      applicationCategory: expect.any(String),
      operatingSystem:
        "Windows 10, Windows 11 (64-bit), macOS and Linux (Docker)",
      offers: expect.any(Object),
      isBasedOn: { "@type": "CreativeWork" },
    });
  },
);

test.each(homepages)(
  "%s homepage shows the current 202-rule audit count",
  (_language, path) => {
    const html = readFileSync(new URL(path, import.meta.url), "utf8");
    expect(html).toMatch(/data-count="202">202<\/b>/);
    expect(html).not.toMatch(/data-count="95">95<\/b>/);
  },
);

test.each([
  ["Turkish", "../site/index.html", "MCP aracı"],
  ["English", "../site/en/index.html", "MCP tools"],
  ["German", "../site/de/index.html", "MCP-Werkzeuge"],
  ["French", "../site/fr/index.html", "outils MCP"],
  ["Italian", "../site/it/index.html", "strumenti MCP"],
  ["Portuguese", "../site/pt/index.html", "ferramentas MCP"],
] as const)(
  "%s homepage advertises the current MCP tool count",
  (_language, path, label) => {
    const html = readFileSync(new URL(path, import.meta.url), "utf8");
    const counters = [
      ...html.matchAll(/<b data-count="(\d+)">(\d+)<\/b>/g),
    ].map((match) => [match[1], match[2]]);
    expect(registeredToolCount).toBeGreaterThan(0);
    expect(counters).toContainEqual([
      String(registeredToolCount),
      String(registeredToolCount),
    ]);
    expect(html.includes(`${registeredToolCount} ${label}`)).toBe(true);
  },
);

test("the published quick facts use the current audit rule count", () => {
  const llms = readFileSync(
    new URL("../site/llms.txt", import.meta.url),
    "utf8",
  );
  expect(llms).toContain("202 audit rules");
  expect(llms).not.toContain("95 audit rules");
});

test.each(homepages)(
  "%s homepage has no manual motion-stop control",
  (_language, path) => {
    const html = readFileSync(new URL(path, import.meta.url), "utf8");
    expect(html).not.toMatch(/Hareketi durdur|Pause motion|data-still/i);
  },
);

test("docs motion follows the system preference without a saved manual override", () => {
  const docsScript = readFileSync(
    new URL("../site/assets/docs.js", import.meta.url),
    "utf8",
  );
  const docsShell = readFileSync(
    new URL("./site-docs-shell.html", import.meta.url),
    "utf8",
  );
  expect(docsScript).not.toMatch(/seowatcher-still|data-still|\bstill\b/i);
  expect(docsShell).not.toContain("data-still");
});
