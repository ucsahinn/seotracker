import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const pages = [
  ["tr", "../site/index.html", "Yol haritamız", "Mobil yardımcı uygulama"],
  ["en", "../site/en/index.html", "Our roadmap", "Mobile companion"],
  ["de", "../site/de/index.html", "Unsere Roadmap", "Mobile Begleit-App"],
  ["fr", "../site/fr/index.html", "Notre feuille de route", "Compagnon mobile"],
  ["it", "../site/it/index.html", "La nostra roadmap", "App mobile companion"],
  [
    "pt",
    "../site/pt/index.html",
    "Nosso roteiro",
    "Aplicativo móvel complementar",
  ],
] as const;

test.each(pages)(
  "%s homepage presents the localized, non-dated roadmap",
  (_language, path, heading, mobile) => {
    const html = readFileSync(new URL(path, import.meta.url), "utf8");
    expect(html).toContain('id="roadmap"');
    expect(html).toContain('data-timeline="undated"');
    expect(html).toContain(heading);
    expect(html).toContain(mobile);
  },
);
