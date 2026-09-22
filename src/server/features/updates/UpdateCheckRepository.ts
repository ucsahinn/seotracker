import { eq } from "drizzle-orm";
import { db } from "@/db";
import { updateCheck } from "@/db/schema";

const ROW_ID = "default";

type UpdateCheckRow = typeof updateCheck.$inferSelect;

/** The single row, created on first read so callers never handle its absence. */
async function get(): Promise<UpdateCheckRow> {
  const [row] = await db
    .select()
    .from(updateCheck)
    .where(eq(updateCheck.id, ROW_ID))
    .limit(1);
  if (row) return row;

  await db.insert(updateCheck).values({ id: ROW_ID }).onConflictDoNothing();
  const [created] = await db
    .select()
    .from(updateCheck)
    .where(eq(updateCheck.id, ROW_ID))
    .limit(1);
  if (!created) throw new Error("update_check row could not be created");
  return created;
}

async function save(
  values: Partial<Omit<UpdateCheckRow, "id">>,
): Promise<UpdateCheckRow> {
  await get();
  await db
    .update(updateCheck)
    .set({ ...values, updatedAt: new Date().toISOString() })
    .where(eq(updateCheck.id, ROW_ID));
  return get();
}

export const UpdateCheckRepository = { get, save };
