import { beforeEach, expect, it, vi } from "vitest";
import { SavedKeywordTagsRepository as repository } from "./SavedKeywordTagsRepository";

const control = vi.hoisted(() => ({
  beforeDelete: undefined as (() => void) | undefined,
  beforeKeywordRead: undefined as (() => Promise<void>) | undefined,
}));
const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb({
    atomicBatches: true,
    beforeQuery: async (query) => {
      if (query.startsWith("select") && query.includes('from "saved_keywords"'))
        await control.beforeKeywordRead?.();
      if (query.startsWith('delete from "saved_keyword_tags"'))
        control.beforeDelete?.();
    },
  }),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({
  db: Object.assign(testDb.db, { batch: testDb.batch }),
}));
vi.mock("@/db/runBatch", () => testDb.runBatchModule);

beforeEach(() => {
  control.beforeDelete = undefined;
  control.beforeKeywordRead = undefined;
  testDb.database.exec(`
    PRAGMA foreign_keys = ON;
    DELETE FROM organization;
    INSERT INTO organization (id, name, slug, created_at) VALUES ('o', 'Test', 'test', 0);
    INSERT INTO projects (id, organization_id, name) VALUES ('p', 'o', 'Test');
    INSERT INTO saved_keywords (id, project_id, keyword) VALUES ('k', 'p', 'test');
  `);
});

const params = { projectId: "p", savedKeywordIds: ["k"] };

it("P1-1: concurrent replacements keep one complete requested tag set", async () => {
  await repository.addTagsToSavedKeywords({ ...params, tagNames: ["old"] });
  let arrived = 0;
  let release!: () => void;
  const bothReady = new Promise<void>((resolve) => {
    release = resolve;
  });
  control.beforeKeywordRead = async () => {
    arrived += 1;
    if (arrived === 2) {
      control.beforeKeywordRead = undefined;
      release();
    }
    await bothReady;
  };
  const results = await Promise.all([
    repository.replaceTagsForSavedKeywords({
      ...params,
      tagNames: ["A", "AA"],
    }),
    repository.replaceTagsForSavedKeywords({
      ...params,
      tagNames: ["B", "BB"],
    }),
  ]);
  const tags = await repository.listTagsBySavedKeywordIds("p", ["k"]);
  expect([
    ["A", "AA"],
    ["B", "BB"],
  ]).toContainEqual(tags.get("k")?.map((tag) => tag.name));
  expect(
    results.reduce((total, result) => total + result.removedCount, 0),
  ).toBe(3);
  expect(testDb.database.prepare("PRAGMA foreign_key_check").all()).toEqual([]);
});

it("P1-2: an assignment committed before tag deletion is preserved and refused", async () => {
  testDb.database.exec(
    "INSERT INTO saved_keyword_tags (id, project_id, name, normalized_name) VALUES ('t', 'p', 'A', 'a')",
  );
  // Interleave at the real SQL mutation boundary, after any preflight reads.
  control.beforeDelete = () => {
    control.beforeDelete = undefined;
    testDb.database.exec(
      "INSERT INTO saved_keyword_tag_assignments (saved_keyword_id, tag_id) VALUES ('k', 't')",
    );
  };
  expect(
    await repository.deleteSavedKeywordTag({ projectId: "p", tagId: "t" }),
  ).toEqual({ status: "in_use", assignmentCount: 1 });
  expect(
    testDb.database
      .prepare("SELECT tag_id FROM saved_keyword_tag_assignments")
      .all(),
  ).toEqual([{ tag_id: "t" }]);
  expect(testDb.database.prepare("PRAGMA foreign_key_check").all()).toEqual([]);
});

it("P1-1: replacement keeps all chunks within D1's binding limit", async () => {
  const insert = testDb.database.prepare(
    "INSERT INTO saved_keywords (id, project_id, keyword) VALUES (?, 'p', ?)",
  );
  const ids = Array.from({ length: 81 }, (_, index) => `bulk${index}`);
  for (const id of ids) insert.run(id, id);
  const tagNames = Array.from({ length: 20 }, (_, index) => `tag${index}`);
  await repository.addTagsToSavedKeywords({
    projectId: "p",
    savedKeywordIds: ids,
    tagNames: ["old"],
  });
  const result = await repository.replaceTagsForSavedKeywords({
    projectId: "p",
    savedKeywordIds: ids,
    tagNames,
  });
  expect(result.removedCount).toBe(ids.length);
  const tags = await repository.listTagsBySavedKeywordIds("p", ids);
  expect(tags.size).toBe(ids.length);
  for (const assigned of tags.values())
    expect(new Set(assigned.map((tag) => tag.name))).toEqual(new Set(tagNames));
});

it("P1-1: a failed replacement rolls back assignment inserts", async () => {
  await repository.addTagsToSavedKeywords({ ...params, tagNames: ["old"] });
  testDb.database.exec(`CREATE TEMP TRIGGER reject_assignment_delete
    BEFORE DELETE ON saved_keyword_tag_assignments
    BEGIN SELECT RAISE(ABORT, 'injected replacement failure'); END`);
  try {
    await expect(
      repository.replaceTagsForSavedKeywords({ ...params, tagNames: ["new"] }),
    ).rejects.toThrow();
    const tags = await repository.listTagsBySavedKeywordIds("p", ["k"]);
    expect(tags.get("k")?.map((tag) => tag.name)).toEqual(["old"]);
  } finally {
    testDb.database.exec("DROP TRIGGER reject_assignment_delete");
  }
});
