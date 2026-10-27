import { and, asc, eq, gte, lte } from "drizzle-orm";
import { db } from "@/db";
import { runBatch } from "@/db/runBatch";
import { gscAnnotations, projectBrandTerms, projects } from "@/db/schema";

/** The project's brand terms, in the order they were added. */
async function listBrandTerms(projectId: string): Promise<string[]> {
  const rows = await db
    .select({ term: projectBrandTerms.term })
    .from(projectBrandTerms)
    .where(eq(projectBrandTerms.projectId, projectId))
    .orderBy(asc(projectBrandTerms.createdAt), asc(projectBrandTerms.term));
  return rows.map((row) => row.term);
}

/** Replace the whole list in one atomic batch. */
async function replaceBrandTerms(
  projectId: string,
  terms: string[],
): Promise<void> {
  await runBatch((tx) => [
    tx
      .delete(projectBrandTerms)
      .where(eq(projectBrandTerms.projectId, projectId)),
    // One row per statement keeps each far below D1's bound-parameter cap.
    ...terms.map((term) =>
      tx
        .insert(projectBrandTerms)
        .values({ projectId, term })
        .onConflictDoNothing(),
    ),
  ]);
}

async function getProjectIdentity(
  projectId: string,
): Promise<{ domain: string | null; name: string | null }> {
  const [row] = await db
    .select({ domain: projects.domain, name: projects.name })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1);
  return { domain: row?.domain ?? null, name: row?.name ?? null };
}

type SearchNote = { id: number; date: string; note: string };

async function listNotes(input: {
  projectId: string;
  since?: string;
  until?: string;
}): Promise<SearchNote[]> {
  return db
    .select({
      id: gscAnnotations.id,
      date: gscAnnotations.date,
      note: gscAnnotations.note,
    })
    .from(gscAnnotations)
    .where(
      and(
        eq(gscAnnotations.projectId, input.projectId),
        input.since ? gte(gscAnnotations.date, input.since) : undefined,
        input.until ? lte(gscAnnotations.date, input.until) : undefined,
      ),
    )
    .orderBy(asc(gscAnnotations.date), asc(gscAnnotations.id));
}

async function addNote(input: {
  projectId: string;
  date: string;
  note: string;
}): Promise<SearchNote> {
  const [row] = await db.insert(gscAnnotations).values(input).returning({
    id: gscAnnotations.id,
    date: gscAnnotations.date,
    note: gscAnnotations.note,
  });
  if (!row) throw new Error("Failed to insert annotation");
  return row;
}

/** Deletes only within the project, so an id from another project is a no-op. */
async function deleteNote(projectId: string, id: number): Promise<void> {
  await db
    .delete(gscAnnotations)
    .where(
      and(eq(gscAnnotations.projectId, projectId), eq(gscAnnotations.id, id)),
    );
}

export const SearchSettingsRepository = {
  listBrandTerms,
  replaceBrandTerms,
  getProjectIdentity,
  listNotes,
  addNote,
  deleteNote,
};
