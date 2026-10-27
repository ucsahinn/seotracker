import { expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { gscArchiveState } from "@/db/schema";
import { createTestDb } from "./sqlite-test-db";

it("P1-1: maps a proxy single-row archive cursor and an absent row correctly", async () => {
  const { database, db } = await createTestDb();
  try {
    database.exec(
      "INSERT INTO gsc_archive_state (project_id, last_date, scanned_through) VALUES ('p1', '2026-06-25', '2026-06-27')",
    );
    expect(
      await db.query.gscArchiveState.findFirst({
        where: eq(gscArchiveState.projectId, "p1"),
      }),
    ).toMatchObject({
      projectId: "p1",
      lastDate: "2026-06-25",
      scannedThrough: "2026-06-27",
    });
    expect(
      await db.query.gscArchiveState.findFirst({
        where: eq(gscArchiveState.projectId, "missing"),
      }),
    ).toBeUndefined();
  } finally {
    database.close();
  }
});
