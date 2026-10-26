import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const packageVersion = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
).version as string;

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
  "%s homepage shows the current 201-rule audit count",
  (_language, path) => {
    const html = readFileSync(new URL(path, import.meta.url), "utf8");
    expect(html).toMatch(/data-count="201">201<\/b>/);
    expect(html).not.toMatch(/data-count="95">95<\/b>/);
  },
);

test("the published quick facts use the current audit rule count", () => {
  const llms = readFileSync(
    new URL("../site/llms.txt", import.meta.url),
    "utf8",
  );
  expect(llms).toContain("201 audit rules");
  expect(llms).not.toContain("95 audit rules");
});

test.each(homepages)(
  "%s homepage has no manual motion-stop control",
  (_language, path) => {
    const html = readFileSync(new URL(path, import.meta.url), "utf8");
    expect(html).not.toMatch(/Hareketi durdur|Pause motion|data-still/i);
  },
);
