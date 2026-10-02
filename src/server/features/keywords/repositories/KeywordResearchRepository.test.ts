import { sortBy } from "remeda";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { normalizeKeyword } from "@/server/features/keywords/services/research/helpers";
import { KeywordResearchRepository } from "./KeywordResearchRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

async function saveAll(...typed: string[]) {
  const keywords = typed.flatMap((text) => normalizeKeyword(text) ?? []);
  await KeywordResearchRepository.saveKeywordsToProject({
    projectId: "p1",
    keywords,
    locationCode: 2792,
    languageCode: "tr",
  });
}

async function list(params: { search?: string; excludeTerms?: string[] }) {
  const { rows } = await KeywordResearchRepository.listSavedKeywordsByProject({
    projectId: "p1",
    ...params,
  });
  return sortBy(
    rows.map(({ row }) => row.keyword),
    (keyword) => keyword,
  );
}

beforeEach(() => {
  testDb.database.exec(
    "DELETE FROM saved_keywords; DELETE FROM keyword_metrics",
  );
});

describe("saved keyword search", () => {
  beforeEach(() => saveAll("ÇAY demlemek", "İstanbul otel", "ISPARTA gül"));

  it("matches Turkish text whatever the case of either side", async () => {
    expect(await list({ search: "çay" })).toEqual(["ÇAY demlemek"]);
    expect(await list({ search: "istanbul" })).toEqual(["İstanbul otel"]);
    expect(await list({ search: "İSTANBUL" })).toEqual(["İstanbul otel"]);
    expect(await list({ search: "ısparta" })).toEqual(["ISPARTA gül"]);
  });

  it("excludes on the same folding", async () => {
    expect(await list({ excludeTerms: ["çay", "istanbul"] })).toEqual([
      "ISPARTA gül",
    ]);
  });
});

describe("saved keyword metrics", () => {
  it("joins on the folded key, so a display form with capitals keeps its metrics", async () => {
    await saveAll("ÇAY demlemek");
    await KeywordResearchRepository.upsertKeywordMetric({
      projectId: "p1",
      keyword: "çay demlemek",
      locationCode: 2792,
      languageCode: "tr",
      searchVolume: 10,
      cpc: null,
      competition: null,
      keywordDifficulty: null,
      intent: "informational",
      monthlySearchesJson: "[]",
    });

    const { rows } = await KeywordResearchRepository.listSavedKeywordsByProject(
      { projectId: "p1" },
    );
    expect(rows[0]?.metric).toMatchObject({ intent: "informational" });
  });
});
