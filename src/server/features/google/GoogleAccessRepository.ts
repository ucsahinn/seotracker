import { and, eq, lte, sql } from "drizzle-orm";
import { db } from "@/db";
import { googleAccessEvidence, googleCredentialGeneration } from "@/db/schema";
import type { GoogleFailureReason } from "./googleFailureReason";

export type GoogleAccessScope = {
  provider: "ga4" | "gsc";
  propertyId: string;
  userId: string;
  accountId: string;
  generation: number;
};

function scopeWhere(scope: GoogleAccessScope) {
  return and(
    eq(googleAccessEvidence.provider, scope.provider),
    eq(googleAccessEvidence.propertyId, scope.propertyId),
    eq(googleAccessEvidence.userId, scope.userId),
    eq(googleAccessEvidence.accountId, scope.accountId),
    eq(googleAccessEvidence.generation, scope.generation),
  );
}

export const GoogleAccessRepository = {
  async generation(): Promise<number> {
    const [row] = await db
      .select()
      .from(googleCredentialGeneration)
      .where(eq(googleCredentialGeneration.id, "default"));
    if (!row)
      throw new Error("Google credential generation migration is missing.");
    return row.generation;
  },
  async advance(): Promise<void> {
    await db
      .update(googleCredentialGeneration)
      .set({ generation: sql`${googleCredentialGeneration.generation} + 1` })
      .where(eq(googleCredentialGeneration.id, "default"));
  },
  async record(
    scope: GoogleAccessScope,
    reason: GoogleFailureReason | null,
    startedAt = new Date().toISOString(),
  ): Promise<void> {
    const observedAt = new Date().toISOString();
    await db
      .insert(googleAccessEvidence)
      .values({
        ...scope,
        reason,
        startedAt,
        observedAt,
        lastSuccessAt: reason === null ? observedAt : null,
      })
      .onConflictDoUpdate({
        target: [
          googleAccessEvidence.provider,
          googleAccessEvidence.propertyId,
          googleAccessEvidence.userId,
          googleAccessEvidence.accountId,
          googleAccessEvidence.generation,
        ],
        set: {
          reason,
          observedAt,
          startedAt,
          lastSuccessAt:
            reason === null ? observedAt : googleAccessEvidence.lastSuccessAt,
        },
        setWhere: lte(googleAccessEvidence.startedAt, startedAt),
      });
  },
  async read(scope: GoogleAccessScope) {
    const [row] = await db
      .select({
        observedAt: googleAccessEvidence.observedAt,
        reason: googleAccessEvidence.reason,
        lastSuccessAt: googleAccessEvidence.lastSuccessAt,
      })
      .from(googleAccessEvidence)
      .where(scopeWhere(scope));
    return row ?? null;
  },
};
