import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { AUDIT_ISSUE_TYPES } from "../src/shared/audit-issue-table";

const languages = ["tr", "en", "de", "fr", "it", "pt"] as const;
const ruleIds = Object.keys(AUDIT_ISSUE_TYPES).sort();
const ruleCount = ruleIds.length;
const severitySummaries = {
  tr: "202 kuralla bakar: 13 kritik, 93 uyarı ve 96 bilgi",
  en: "202 rules: 13 critical, 93 warnings and 96 info",
  de: "202 Regeln: 13 kritischen, 93 Warnungen und 96 Hinweisen",
  fr: "202 règles : 13 critiques, 93 avertissements et 96 informations",
  it: "202 regole: 13 critiche, 93 avvisi e 96 informative",
  pt: "202 regras: 13 críticas, 93 avisos e 96 informativas",
} as const;

function guidePath(language: (typeof languages)[number]): URL {
  const suffix = language === "tr" ? "" : `${language}/`;
  return new URL(`../docs/kb/${suffix}denetim-kurallari.md`, import.meta.url);
}

function releaseNotesPath(language: (typeof languages)[number]): URL {
  const suffix = language === "tr" ? "" : `${language}/`;
  return new URL(`../docs/kb/${suffix}surum-notlari.md`, import.meta.url);
}

test("every translated audit guide lists each rule registered by the app", () => {
  for (const language of languages) {
    const source = readFileSync(guidePath(language), "utf8");
    const listedIds = [
      ...source.matchAll(/^\|[^\r\n]*\|\s*([a-z][a-z0-9-]+)\s*\|\s*$/gm),
    ]
      .map((match) => match[1])
      .sort();

    expect(listedIds, language).toEqual(ruleIds);

    const introduction = source.split(/^## /m, 1)[0];
    expect(introduction, `${language} severity summary`).toContain(
      severitySummaries[language].replace("202", String(ruleCount)),
    );
  }
});

test("every 0.8.3 release note uses the current audit rule count", () => {
  for (const language of languages) {
    const source = readFileSync(releaseNotesPath(language), "utf8");
    const latest = source.split(/^## 0\.8\.3 Alpha/m)[1]?.split(/^## /m)[0];

    expect(latest, `${language} 0.8.3 notes`).toBeDefined();
    expect(latest, `${language} 0.8.3 notes`).toContain(String(ruleCount));
    expect(latest, `${language} 0.8.3 notes`).not.toContain("201");
  }
});
