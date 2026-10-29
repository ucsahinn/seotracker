import { readdirSync, readFileSync } from "node:fs";
import { expect, test } from "vitest";

const root = new URL("../docs/kb/", import.meta.url);
const locales = ["", "en/", "de/", "fr/", "it/", "pt/"];

function guides(): Array<{ file: string; description: string; body: string }> {
  return locales.flatMap((dir) =>
    readdirSync(new URL(dir, root))
      .filter((name) => name.endsWith(".md") && name !== "README.md")
      .map((name) => {
        const file = `${dir}${name}`;
        const text = readFileSync(new URL(file, root), "utf8");
        const [, front = "", body = ""] =
          /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(
            text.replace(/\r\n/g, "\n"),
          ) ?? [];
        const description =
          /^description:\s*(.*)$/m
            .exec(front)?.[1]
            ?.replace(/^["']|["']$/g, "") ?? "";
        return { file, description: description.trim(), body };
      }),
  );
}

const normal = (text: string) => text.replace(/\s+/g, " ").trim();

// The builder prints the description as the lead paragraph under the H1, so
// a body that opens with it shows the same sentences twice.
test("no guide body opens by repeating its description", () => {
  const repeats = guides()
    .filter(({ description, body }) => {
      const first = normal(body.trim().split(/\n\s*\n/)[0] ?? "");
      return description !== "" && first.startsWith(normal(description));
    })
    .map(({ file }) => file);
  expect(repeats).toEqual([]);
});

test("no guide repeats a paragraph", () => {
  const repeats = guides().flatMap(({ file, body }) => {
    const seen = new Set<string>();
    return body
      .split(/\n\s*\n/)
      .map(normal)
      .filter(
        (p) => p.length > 60 && !p.startsWith("|") && !p.startsWith("```"),
      )
      .filter((p) => (seen.has(p) ? true : (seen.add(p), false)))
      .map((p) => `${file}: ${p.slice(0, 60)}`);
  });
  expect(repeats).toEqual([]);
});
