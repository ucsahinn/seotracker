import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { account } from "@/db/schema";
import { GoogleServiceAccountRepository } from "@/server/features/google/GoogleServiceAccountRepository";
import { hasServiceAccount } from "@/server/lib/googleServiceAccountToken";
import { GSC_OAUTH_PROVIDER_ID } from "@/shared/gsc";
import { createGscClient, type GscSite } from "@/server/lib/gscClient";
import { GscApiError, GscTokenError } from "@/server/lib/gscErrors";
import {
  googleFailureReason,
  type GoogleFailureReason,
} from "@/server/features/google/googleFailureReason";
type GscSiteListResult = {
  accounts: Array<{
    accountId: string;
    email: string | null;
    requiresReconnect: boolean;
    propertiesUnavailable: boolean;
    failureReason?: GoogleFailureReason | null;
    sites: GscSite[];
  }>;
};

export async function listGrantsForUser(userId: string) {
  return db
    .select({ id: account.id, accountId: account.accountId })
    .from(account)
    .where(
      and(
        eq(account.userId, userId),
        eq(account.providerId, GSC_OAUTH_PROVIDER_ID),
      ),
    );
}

/**
 * The pseudo account id a service account is listed under.
 *
 * The picker keys rows by account id and a service account has none, so it
 * gets a reserved one. It never reaches Better Auth: `createGscClient` only
 * passes `gscAccountId` through when it is minting from a grant.
 */
export const SERVICE_ACCOUNT_ID = "service-account";

/** The address the picker shows, and the one stored as the connector. */
export async function serviceAccountEmail(): Promise<string | null> {
  return (
    (await GoogleServiceAccountRepository.getStatus())?.clientEmail ?? null
  );
}

export async function listSitesForUserWithGrantStatus(
  userId: string,
): Promise<GscSiteListResult> {
  /*
   * A service account has no grants to enumerate: it is one credential, and
   * the properties it can see are the ones its address was added to in
   * Search Console. Presented as a single account so the picker below needs
   * no second shape, with no email lookup -- `userinfo` describes a signed-in
   * person and there is not one.
   */
  if (await hasServiceAccount()) {
    const client = createGscClient({ userId });
    let sites: GscSite[];
    try {
      sites = await client.listSites();
    } catch (error) {
      const failureReason = googleFailureReason(error);
      return {
        accounts: [
          {
            accountId: SERVICE_ACCOUNT_ID,
            email: await serviceAccountEmail(),
            requiresReconnect: false,
            propertiesUnavailable: true,
            failureReason,
            sites: [],
          },
        ],
      };
    }
    return {
      accounts: [
        {
          accountId: SERVICE_ACCOUNT_ID,
          email: await serviceAccountEmail(),
          requiresReconnect: false,
          propertiesUnavailable: false,
          sites,
        },
      ],
    };
  }

  const grants = await listGrantsForUser(userId);
  const accounts = await Promise.all(
    grants.map(async (grant) => {
      const client = createGscClient({
        userId,
        gscAccountId: grant.accountId,
      });

      try {
        const sites = await client.listSites();
        let email: string | null = null;
        try {
          email = await client.getUserInfoEmail();
        } catch {
          email = null;
        }
        return {
          accountId: grant.accountId,
          email,
          requiresReconnect: false,
          propertiesUnavailable: false,
          sites,
        };
      } catch (error) {
        if (
          !(
            error instanceof GscTokenError ||
            (error instanceof GscApiError &&
              (error.status === 401 || error.status === 403))
          )
        ) {
          console.error(
            "Failed to list Search Console sites for account",
            grant.accountId,
            error,
          );
        }
        return {
          accountId: grant.accountId,
          email: null,
          requiresReconnect: googleFailureReason(error) === "invalid_grant",
          propertiesUnavailable: googleFailureReason(error) !== "invalid_grant",
          failureReason: googleFailureReason(error),
          sites: [],
        };
      }
    }),
  );
  return { accounts };
}
