import { readFileSync } from "node:fs";
import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type * as ProjectContextRepositoryModule from "./ProjectContextRepository";

// Real in-memory SQLite so the upsert conflict clauses run as generated SQL —
// which stored fields an omitted value preserves is the whole contract, and a
// mocked builder chain can't see it.

vi.mock("cloudflare:workers", () => ({
  env: { DATABASE_PROVIDER: "d1" },
}));

// The executor the service hands these builders inside runBatch.
type Tx = Parameters<
  typeof ProjectContextRepositoryModule.ProjectContextRepository.upsertKeyPages
>[0];

let client: Client;
let tx: Tx;
let ProjectContextRepository: typeof ProjectContextRepositoryModule.ProjectContextRepository;

beforeAll(async () => {
  client = createClient({ url: "file::memory:" });
  const testDb = drizzle(client);
  vi.doMock("@/db", () => ({ db: testDb }));
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- the libsql client is the same Drizzle query surface runBatch passes in
  tx = testDb as unknown as Tx;

  // The tables come from the real migration, so the unique indexes the
  // upserts' ON CONFLICT clauses resolve against can't drift from production
  // DDL. The sam_project_memory DROP is skipped (nothing created it here);
  // a stub projects table satisfies the FKs.
  await client.executeMultiple(
    [
      `CREATE TABLE projects (id text PRIMARY KEY);`,
      readFileSync("drizzle/0074_context_preconditions.sql", "utf8"),
      `INSERT INTO projects (id) VALUES ('proj_1');`,
      ...readFileSync("drizzle/0042_project_memory.sql", "utf8")
        .split("--> statement-breakpoint")
        .filter((statement) => !statement.includes("DROP TABLE")),
    ].join("\n"),
  );

  ({ ProjectContextRepository } = await import("./ProjectContextRepository"));
});

afterAll(() => {
  client.close();
});

beforeEach(async () => {
  vi.useFakeTimers();
  await client.executeMultiple(`
    DELETE FROM project_key_pages;
    DELETE FROM project_competitors;
  `);
});

afterEach(() => {
  vi.useRealTimers();
});

const PROJECT_ID = "proj_1";

describe("section preconditions", () => {
  it("filters expired entries on read without requiring a new append (previously returned expired rows)", async () => {
    await client.executeMultiple(`
      INSERT INTO project_research_log (id, project_id, entry_date, summary, created_by) VALUES
        ('expired', 'proj_1', '2026-07-28', 'old', 'user'),
        ('boundary', 'proj_1', '2026-07-29', 'boundary', 'user'),
        ('newest', 'proj_1', '2026-10-27', 'new', 'user');
    `);
    const rows = await ProjectContextRepository.listResearchLog(
      PROJECT_ID,
      21,
      "2026-07-29",
    );
    expect(rows.map((row) => row.id)).toEqual(["newest", "boundary"]);
  });
  it("rejects stale content inside SQLite and rolls back the batch (previously overwrote newer edits)", async () => {
    await ProjectContextRepository.upsertSection(tx, {
      projectId: PROJECT_ID,
      key: "current_goal",
      title: null,
      content: "agent text",
      updatedBy: "mcp",
    });
    const precedingWrite = ProjectContextRepository.upsertSection(tx, {
      projectId: PROJECT_ID,
      key: "positioning",
      title: null,
      content: "must roll back",
      updatedBy: "user",
    }).toSQL();
    const guard = ProjectContextRepository.assertSectionContent(
      tx,
      PROJECT_ID,
      "current_goal",
      "old text",
    ).toSQL();
    const statements = [precedingWrite, guard].map((query) => ({
      sql: query.sql,
      args: query.params.map((value) => {
        if (value === null || typeof value === "string") return value;
        throw new Error("Unexpected fixture parameter");
      }),
    }));
    await expect(client.batch(statements, "write")).rejects.toThrow(
      /context_edit_conflict/,
    );
    const sections = await ProjectContextRepository.listSections(PROJECT_ID);
    expect(sections.find((row) => row.key === "current_goal")?.content).toBe(
      "agent text",
    );
    expect(sections.find((row) => row.key === "positioning")).toBeUndefined();
    await ProjectContextRepository.assertSectionContent(
      tx,
      PROJECT_ID,
      "current_goal",
      "agent text",
    );
    await ProjectContextRepository.assertSectionContent(
      tx,
      PROJECT_ID,
      "missing",
      null,
    );
    await expect(
      ProjectContextRepository.assertSectionContent(
        tx,
        PROJECT_ID,
        "current_goal",
        null,
      ),
    ).rejects.toHaveProperty(
      "cause.message",
      expect.stringContaining("context_edit_conflict"),
    );
  });
});

async function runStatements(statements: Promise<unknown>[]) {
  for (const statement of statements) await statement;
}

describe("upsertKeyPages", () => {
  it("keeps the stored role when the caller omits it", async () => {
    vi.setSystemTime("2026-08-01T00:00:00.000Z");
    await runStatements(
      ProjectContextRepository.upsertKeyPages(
        tx,
        PROJECT_ID,
        [
          {
            url: "https://acme.com/pricing",
            role: "money",
            topic: null,
            notes: null,
          },
        ],
        "user",
      ),
    );

    vi.setSystemTime("2026-08-02T00:00:00.000Z");
    await runStatements(
      ProjectContextRepository.upsertKeyPages(
        tx,
        PROJECT_ID,
        [
          {
            url: "https://acme.com/pricing",
            role: null,
            topic: "Pricing",
            notes: "Compare against acme.io",
          },
        ],
        "mcp",
      ),
    );

    expect(await ProjectContextRepository.listKeyPages(PROJECT_ID)).toEqual([
      expect.objectContaining({
        url: "https://acme.com/pricing",
        role: "money",
        topic: "Pricing",
        notes: "Compare against acme.io",
        updatedAt: "2026-08-02T00:00:00.000Z",
        updatedBy: "mcp",
      }),
    ]);
  });
});

describe("upsertCompetitors", () => {
  it("keeps stored notes when the caller omits them", async () => {
    await runStatements(
      ProjectContextRepository.upsertCompetitors(
        tx,
        PROJECT_ID,
        [{ domain: "acme.com", name: null, notes: "user note" }],
        "user",
      ),
    );

    await runStatements(
      ProjectContextRepository.upsertCompetitors(
        tx,
        PROJECT_ID,
        [{ domain: "acme.com", name: "Acme", notes: null }],
        "mcp",
      ),
    );

    expect(await ProjectContextRepository.listCompetitors(PROJECT_ID)).toEqual([
      expect.objectContaining({
        domain: "acme.com",
        name: "Acme",
        notes: "user note",
      }),
    ]);
  });
});
