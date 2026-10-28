import { and, inArray, notInArray } from "drizzle-orm";
import { db } from "@/db";
import { savedKeywordTagAssignments } from "@/db/schema";

/** One D1 batch keeps replacements serializable and returns actual deletions. */
export async function replaceTagAssignments(
  savedKeywordIds: string[],
  keepTagIds: string[],
) {
  const assignments = savedKeywordIds.flatMap((savedKeywordId) =>
    keepTagIds.map((tagId) => ({ savedKeywordId, tagId })),
  );
  const inserts = [];
  for (let i = 0; i < assignments.length; i += 40) {
    inserts.push(
      db
        .insert(savedKeywordTagAssignments)
        .values(assignments.slice(i, i + 40))
        .onConflictDoNothing(),
    );
  }
  const deletes = [];
  for (let i = 0; i < savedKeywordIds.length; i += 70) {
    deletes.push(
      db
        .delete(savedKeywordTagAssignments)
        .where(
          and(
            inArray(
              savedKeywordTagAssignments.savedKeywordId,
              savedKeywordIds.slice(i, i + 70),
            ),
            notInArray(savedKeywordTagAssignments.tagId, keepTagIds),
          ),
        )
        .returning({ id: savedKeywordTagAssignments.savedKeywordId }),
    );
  }
  const [first, ...rest] = [...inserts, ...deletes];
  if (!first) return 0;
  const results = await db.batch([first, ...rest]);
  return results
    .slice(inserts.length)
    .reduce(
      (total, rows) => total + (Array.isArray(rows) ? rows.length : 0),
      0,
    );
}
