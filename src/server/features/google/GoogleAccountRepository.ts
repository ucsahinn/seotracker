import { and, count, eq, inArray, isNull, or } from "drizzle-orm";
import { db } from "@/db";
import { runBatch } from "@/db/runBatch";
import { account, ga4Connections, gscConnections } from "@/db/schema";
import { clearGa4Quota } from "@/server/features/quotas/ga4QuotaSnapshot";
import { GscConnectionRepository } from "@/server/features/gsc/repositories/GscConnectionRepository";
import { GA4_OAUTH_PROVIDER_ID } from "@/shared/ga4";
import { GSC_OAUTH_PROVIDER_ID } from "@/shared/gsc";

type AccountInput = {
  userId: string;
  provider: "gsc" | "ga4";
  accountId: string;
};

/**
 * Legacy GSC mappings (no gsc_account_id) authenticate through any of the
 * user's grants, so they can only be attributed to this account when it is the
 * user's last one. With another grant left they may well belong to it.
 */
async function includesLegacyMappings(input: AccountInput) {
  if (input.provider !== "gsc") return false;
  const [grants] = await db
    .select({ total: count() })
    .from(account)
    .where(
      and(
        eq(account.userId, input.userId),
        eq(account.providerId, GSC_OAUTH_PROVIDER_ID),
      ),
    );
  return (grants?.total ?? 0) <= 1;
}

function scope(input: AccountInput, includeLegacy: boolean) {
  const gsc = input.provider === "gsc";
  const connections = gsc ? gscConnections : ga4Connections;
  return {
    connections,
    grant: and(
      eq(account.userId, input.userId),
      eq(
        account.providerId,
        gsc ? GSC_OAUTH_PROVIDER_ID : GA4_OAUTH_PROVIDER_ID,
      ),
      eq(account.accountId, input.accountId),
    ),
    usage: and(
      eq(connections.connectedByUserId, input.userId),
      gsc
        ? includeLegacy
          ? or(
              eq(gscConnections.gscAccountId, input.accountId),
              isNull(gscConnections.gscAccountId),
            )
          : eq(gscConnections.gscAccountId, input.accountId)
        : eq(ga4Connections.ga4AccountId, input.accountId),
    ),
  };
}

async function getRemovalImpact(input: AccountInput) {
  const { connections, usage } = scope(
    input,
    await includesLegacyMappings(input),
  );
  const [result] = await db
    .select({ projectCount: count() })
    .from(connections)
    .where(usage);
  return { projectCount: result?.projectCount ?? 0 };
}

async function remove(input: AccountInput) {
  const { connections, grant, usage } = scope(
    input,
    await includesLegacyMappings(input),
  );
  // Read before the delete: GA4 quota snapshots live in memory per project.
  const ga4Projects =
    input.provider === "ga4"
      ? await db
          .select({ projectId: ga4Connections.projectId })
          .from(ga4Connections)
          .where(usage)
      : [];
  // Atomic on D1 and Postgres: never leave a partial account removal.
  // Both deletes are scoped to the authenticated owner, including on retries
  // after this Google identity has been linked to a different seotracker user.
  //
  // A GSC account's projects also lose their property data, through the same
  // statements as a single disconnect. The affected projects are selected by
  // the database inside the batch, so only this account's projects are touched.
  await runBatch((tx) => {
    const removeConnections =
      input.provider === "gsc"
        ? GscConnectionRepository.disconnectStatements(tx, (projectId) =>
            inArray(
              projectId,
              tx
                .select({ projectId: gscConnections.projectId })
                .from(gscConnections)
                .where(usage),
            ),
          )
        : [tx.delete(connections).where(usage)];
    return [...removeConnections, tx.delete(account).where(grant)];
  });
  for (const { projectId } of ga4Projects) clearGa4Quota(projectId);
}

export const GoogleAccountRepository = { getRemovalImpact, remove };
