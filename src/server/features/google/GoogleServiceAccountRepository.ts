import { eq } from "drizzle-orm";
import { db } from "@/db";
import { googleServiceAccount } from "@/db/schema";
import { openSecret, sealSecret } from "@/server/lib/secretBox";

/** The table holds one row; this is its key. */
const ROW_ID = "default";

type StoredServiceAccount = {
  clientEmail: string;
  projectId: string | null;
  privateKey: string;
  updatedAt: string;
};

export const GoogleServiceAccountRepository = {
  /**
   * Null when nothing is stored, and also when the stored key no longer
   * decrypts — a changed instance key leaves a row that cannot be used, and
   * the honest answer for both is "not configured".
   */
  async get(): Promise<StoredServiceAccount | null> {
    const [row] = await db
      .select()
      .from(googleServiceAccount)
      .where(eq(googleServiceAccount.id, ROW_ID))
      .limit(1);
    if (!row) return null;

    const privateKey = await openSecret(row.privateKeyEncrypted);
    if (!privateKey) return null;

    return {
      clientEmail: row.clientEmail,
      projectId: row.projectId,
      privateKey,
      updatedAt: row.updatedAt,
    };
  },

  /** What the settings page may show: everything except the key. */
  async getStatus(): Promise<{
    clientEmail: string;
    projectId: string | null;
    updatedAt: string;
  } | null> {
    const [row] = await db
      .select({
        clientEmail: googleServiceAccount.clientEmail,
        projectId: googleServiceAccount.projectId,
        updatedAt: googleServiceAccount.updatedAt,
      })
      .from(googleServiceAccount)
      .where(eq(googleServiceAccount.id, ROW_ID))
      .limit(1);
    return row ?? null;
  },

  async save(input: {
    clientEmail: string;
    projectId: string | null;
    privateKey: string;
  }): Promise<void> {
    const privateKeyEncrypted = await sealSecret(input.privateKey);
    const updatedAt = new Date().toISOString();

    await db
      .insert(googleServiceAccount)
      .values({
        id: ROW_ID,
        clientEmail: input.clientEmail,
        projectId: input.projectId,
        privateKeyEncrypted,
        updatedAt,
      })
      .onConflictDoUpdate({
        target: googleServiceAccount.id,
        set: {
          clientEmail: input.clientEmail,
          projectId: input.projectId,
          privateKeyEncrypted,
          updatedAt,
        },
      });
  },

  async clear(): Promise<void> {
    await db
      .delete(googleServiceAccount)
      .where(eq(googleServiceAccount.id, ROW_ID));
  },
};
