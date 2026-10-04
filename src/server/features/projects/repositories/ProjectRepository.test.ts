import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectRepository } from "./ProjectRepository";

const testDb = await vi.hoisted(async () =>
  (await import("@/server/test-support/sqlite-test-db")).createTestDb(),
);
vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/db", () => ({ db: testDb.db }));

beforeEach(() => {
  testDb.database.exec(`
    DELETE FROM projects;
    INSERT INTO projects (id, organization_id, name) VALUES
      ('a', 'org_1', 'A'), ('b', 'org_1', 'B'), ('other', 'org_2', 'Other');
  `);
});

describe("archiveProject", () => {
  it("never archives an organization's last active project", async () => {
    await ProjectRepository.archiveProject("a", "org_1");

    await expect(
      ProjectRepository.archiveProject("b", "org_1"),
    ).rejects.toMatchObject({ code: "CONFLICT" });
    // Another organization's project does not count towards the minimum.
    expect(await ProjectRepository.countProjects("org_1")).toBe(1);
  });

  it("reports an unknown project as not found, not as the last one", async () => {
    await expect(
      ProjectRepository.archiveProject("missing", "org_1"),
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
