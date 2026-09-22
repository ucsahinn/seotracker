import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { account } from "@/db/schema";
import { AppError } from "@/server/lib/errors";
import { createGa4AdminClient } from "@/server/lib/ga4Client";
import { Ga4AdminApiError, Ga4TokenError } from "@/server/lib/ga4Errors";
import { GoogleServiceAccountRepository } from "@/server/features/google/GoogleServiceAccountRepository";
import { hasServiceAccount } from "@/server/lib/googleServiceAccountToken";
import { GA4_OAUTH_PROVIDER_ID } from "@/shared/ga4";
import {
  Ga4ConnectionRepository,
  type Ga4Connection,
} from "@/server/features/ga4/repositories/Ga4ConnectionRepository";

async function getConnection(projectId: string): Promise<Ga4Connection | null> {
  return Ga4ConnectionRepository.getByProjectId(projectId);
}

async function listGrantsForUser(userId: string) {
  return db
    .select({ id: account.id, accountId: account.accountId })
    .from(account)
    .where(
      and(
        eq(account.userId, userId),
        eq(account.providerId, GA4_OAUTH_PROVIDER_ID),
      ),
    );
}

async function userHasGrant(userId: string): Promise<boolean> {
  const grants = await listGrantsForUser(userId);
  return grants.length > 0;
}

function requiresReconnect(error: unknown): boolean {
  return (
    error instanceof Ga4TokenError ||
    (error instanceof Ga4AdminApiError && error.status === 401)
  );
}

/**
 * The pseudo account id a service account is listed under; see the note on
 * the Search Console side. It never reaches Better Auth.
 */
const GA4_SERVICE_ACCOUNT_ID = "service-account";

/** The address the picker shows, and the one stored as the connector. */
async function serviceAccountEmail(): Promise<string | null> {
  return (
    (await GoogleServiceAccountRepository.getStatus())?.clientEmail ?? null
  );
}

async function listPropertiesForUserWithGrantStatus(userId: string) {
  // One credential, no grants to enumerate, and no signed-in person whose
  // email could be looked up. Same shape as a grant so the picker is unchanged.
  if (await hasServiceAccount()) {
    const client = createGa4AdminClient({ userId });
    const email = await serviceAccountEmail();

    /*
     * A 403 here is the ordinary next step, not a fault: a service account
     * reaches Analytics only once two things are true, and neither of them
     * happens by creating the key. Thrown, it arrived in the picker as
     * "Kaynaklar yüklenemedi" with nothing to act on; returned, the operator
     * is told which two.
     */
    let properties: Awaited<ReturnType<typeof client.listProperties>>;
    try {
      properties = await client.listProperties();
    } catch (error) {
      if (error instanceof Ga4AdminApiError && error.status === 403) {
        return {
          accounts: [
            {
              accountId: GA4_SERVICE_ACCOUNT_ID,
              email,
              requiresReconnect: false,
              propertiesUnavailable: true,
              unavailableReason: email
                ? `Google Analytics bu servis hesabına izin vermedi. İki şey gerekiyor: Google Cloud projenizde Google Analytics Admin API etkin olmalı, ve GA4 mülkünüzde Yönetici → Erişim yönetimi altında ${email} adresi Görüntüleyen olarak ekli olmalı.`
                : "Google Analytics bu servis hesabına izin vermedi. Google Analytics Admin API'yi etkinleştirin ve hesabın adresini GA4 mülkünüze Görüntüleyen olarak ekleyin.",
              properties: [],
            },
          ],
        };
      }
      throw error;
    }

    return {
      accounts: [
        {
          accountId: GA4_SERVICE_ACCOUNT_ID,
          email,
          requiresReconnect: false,
          propertiesUnavailable: false,
          unavailableReason: null,
          properties,
        },
      ],
    };
  }

  const grants = await listGrantsForUser(userId);
  const accounts = await Promise.all(
    grants.map(async (grant) => {
      const client = createGa4AdminClient({
        userId,
        ga4AccountId: grant.accountId,
      });
      try {
        const properties = await client.listProperties();
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
          unavailableReason: null,
          properties,
        };
      } catch (error) {
        const reconnect = requiresReconnect(error);
        if (!reconnect) {
          console.error("ga4.property_discovery_failed", {
            errorName: error instanceof Error ? error.name : "UnknownError",
            status:
              error instanceof Ga4AdminApiError ? error.status : undefined,
          });
        }
        return {
          accountId: grant.accountId,
          email: null,
          requiresReconnect: reconnect,
          propertiesUnavailable: !reconnect,
          unavailableReason: null,
          properties: [],
        };
      }
    }),
  );
  return { accounts };
}

async function setProperty(input: {
  projectId: string;
  organizationId: string;
  propertyId: string;
  accountId: string;
  userId: string;
}): Promise<Ga4Connection> {
  // Same as `GscService.setSite`: the reserved service-account id is not a
  // Better Auth grant and never will be, so the grant check has to be skipped
  // rather than failed.
  const usingServiceAccount =
    input.accountId === GA4_SERVICE_ACCOUNT_ID && (await hasServiceAccount());

  if (!usingServiceAccount) {
    const grants = await listGrantsForUser(input.userId);
    if (!grants.some((grant) => grant.accountId === input.accountId)) {
      throw new AppError(
        "NOT_FOUND",
        "That Google account isn't connected to your seotracker account.",
      );
    }
  }

  const client = createGa4AdminClient({
    userId: input.userId,
    ...(usingServiceAccount ? {} : { ga4AccountId: input.accountId }),
  });
  const properties = await client.listProperties();
  if (
    !properties.some((property) => property.propertyId === input.propertyId)
  ) {
    throw new AppError(
      "NOT_FOUND",
      "That Google Analytics property isn't available on your connected Google account.",
    );
  }

  const property = await client.getProperty(input.propertyId);
  let connectedAccountEmail: string | null = null;
  if (usingServiceAccount) {
    connectedAccountEmail = await serviceAccountEmail();
  } else {
    try {
      connectedAccountEmail = await client.getUserInfoEmail();
    } catch {
      connectedAccountEmail = null;
    }
  }

  return Ga4ConnectionRepository.upsert({
    projectId: input.projectId,
    organizationId: input.organizationId,
    propertyId: property.name,
    propertyDisplayName: property.displayName,
    propertyTimeZone: property.timeZone,
    propertyCurrencyCode: property.currencyCode,
    connectedByUserId: input.userId,
    ga4AccountId: input.accountId,
    connectedAccountEmail,
  });
}

async function disconnect(input: { projectId: string }): Promise<void> {
  await Ga4ConnectionRepository.deleteByProjectId(input.projectId);
}

export const Ga4Service = {
  getConnection,
  userHasGrant,
  listPropertiesForUserWithGrantStatus,
  setProperty,
  disconnect,
};
