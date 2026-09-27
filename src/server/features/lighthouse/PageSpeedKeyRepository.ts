import { eq } from "drizzle-orm";
import { db } from "@/db";
import { pagespeedApiKey } from "@/db/schema";
import { openSecret, sealSecret } from "@/server/lib/secretBox";

/** The table holds one row; this is its key. */
const ROW_ID = "default";

type StoredPageSpeedKey = {
  key: string;
  updatedAt: string;
};

export const PageSpeedKeyRepository = {
  /**
   * Null when nothing is stored, and also when the stored key no longer
   * decrypts — a changed instance key leaves a row that cannot be used, and
   * the honest answer for both is "not configured".
   */
  async get(): Promise<StoredPageSpeedKey | null> {
    const [row] = await db
      .select()
      .from(pagespeedApiKey)
      .where(eq(pagespeedApiKey.id, ROW_ID))
      .limit(1);
    if (!row) return null;

    const key = await openSecret(row.keyEncrypted);
    if (!key) return null;

    return { key, updatedAt: row.updatedAt };
  },

  async save(key: string): Promise<void> {
    const keyEncrypted = await sealSecret(key);
    const updatedAt = new Date().toISOString();

    await db
      .insert(pagespeedApiKey)
      .values({ id: ROW_ID, keyEncrypted, updatedAt })
      .onConflictDoUpdate({
        target: pagespeedApiKey.id,
        set: { keyEncrypted, updatedAt },
      });
  },

  async clear(): Promise<void> {
    await db.delete(pagespeedApiKey).where(eq(pagespeedApiKey.id, ROW_ID));
  },
};
