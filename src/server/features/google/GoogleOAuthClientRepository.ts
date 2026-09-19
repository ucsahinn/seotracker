import { eq } from "drizzle-orm";
import { db } from "@/db";
import { googleOAuthClient } from "@/db/schema";
import { openSecret, sealSecret } from "@/server/lib/secretBox";

/** The table holds one row; this is its key. */
const ROW_ID = "default";

type StoredGoogleOAuthClient = {
  clientId: string;
  clientSecret: string;
  updatedAt: string;
};

export const GoogleOAuthClientRepository = {
  /**
   * Null when nothing is stored, and also when the stored secret no longer
   * decrypts — a changed instance key leaves a row that cannot be used, and
   * the honest answer for both is "not configured".
   */
  async get(): Promise<StoredGoogleOAuthClient | null> {
    const [row] = await db
      .select()
      .from(googleOAuthClient)
      .where(eq(googleOAuthClient.id, ROW_ID))
      .limit(1);
    if (!row) return null;

    const clientSecret = await openSecret(row.clientSecretEncrypted);
    if (!clientSecret) return null;

    return { clientId: row.clientId, clientSecret, updatedAt: row.updatedAt };
  },

  async save(input: { clientId: string; clientSecret: string }): Promise<void> {
    const clientSecretEncrypted = await sealSecret(input.clientSecret);
    const updatedAt = new Date().toISOString();

    await db
      .insert(googleOAuthClient)
      .values({
        id: ROW_ID,
        clientId: input.clientId,
        clientSecretEncrypted,
        updatedAt,
      })
      .onConflictDoUpdate({
        target: googleOAuthClient.id,
        set: { clientId: input.clientId, clientSecretEncrypted, updatedAt },
      });
  },

  async clear(): Promise<void> {
    await db.delete(googleOAuthClient).where(eq(googleOAuthClient.id, ROW_ID));
  },
};
