import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { account } from "@/db/schema";
import { GoogleServiceAccountRepository } from "@/server/features/google/GoogleServiceAccountRepository";
import { hasServiceAccount } from "@/server/lib/googleServiceAccountToken";
import { GSC_OAUTH_PROVIDER_ID } from "@/shared/gsc";
import { AppError } from "@/server/lib/errors";
import {
  createGscClient,
  type GscSite,
  type UrlInspectionResult,
} from "@/server/lib/gscClient";
import {
  GscApiError,
  GscNotConnectedError,
  GscTokenError,
} from "@/server/lib/gscErrors";
export { GscNotConnectedError } from "@/server/lib/gscErrors";
import {
  buildSearchAnalyticsRequest,
  type GscPerformanceInput,
} from "@/server/features/gsc/searchAnalytics";
import {
  GscConnectionRepository,
  type GscConnection,
} from "@/server/features/gsc/repositories/GscConnectionRepository";
import type {
  GscSearchAnalyticsRequest,
  GscSearchAnalyticsRow,
} from "@/server/lib/gscClient";

const SITE_UNVERIFIED_PERMISSION = "siteUnverifiedUser";

type GscPerformanceResult = {
  siteUrl: string;
  connectedBy: string | null;
  request: GscSearchAnalyticsRequest;
  rows: GscSearchAnalyticsRow[];
};

type GscSiteListResult = {
  accounts: Array<{
    accountId: string;
    email: string | null;
    requiresReconnect: boolean;
    propertiesUnavailable: boolean;
    sites: GscSite[];
  }>;
};

/** Thrown when a project has no connected GSC property. */
async function getConnection(projectId: string): Promise<GscConnection | null> {
  return GscConnectionRepository.getByProjectId(projectId);
}

/** Whether this user has linked a google-search-console grant (regardless of
 *  whether they've picked a property yet). Drives the connect-vs-pick UI. */
async function userHasGrant(userId: string): Promise<boolean> {
  const rows = await db
    .select({ id: account.id })
    .from(account)
    .where(
      and(
        eq(account.userId, userId),
        eq(account.providerId, GSC_OAUTH_PROVIDER_ID),
      ),
    )
    .limit(1);
  return rows.length > 0;
}

async function listGrantsForUser(userId: string) {
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
const SERVICE_ACCOUNT_ID = "service-account";

/** The address the picker shows, and the one stored as the connector. */
async function serviceAccountEmail(): Promise<string | null> {
  return (
    (await GoogleServiceAccountRepository.getStatus())?.clientEmail ?? null
  );
}

/** Expected ways a stored grant fails to reach Search Console: no token could be
 *  minted (refresh token revoked or expired), or Google rejected the call
 *  (401/403). These surface a reconnect prompt without fault logging. */
export function isExpectedGrantFailure(error: unknown): boolean {
  if (error instanceof GscTokenError) return true;
  return (
    error instanceof GscApiError &&
    (error.status === 401 || error.status === 403)
  );
}

async function listSitesForUserWithGrantStatus(
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
    const sites = await client.listSites();
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
        if (!isExpectedGrantFailure(error)) {
          console.error(
            "Failed to list Search Console sites for account",
            grant.accountId,
            error,
          );
        }
        return {
          accountId: grant.accountId,
          email: null,
          requiresReconnect: isExpectedGrantFailure(error),
          propertiesUnavailable: !isExpectedGrantFailure(error),
          sites: [],
        };
      }
    }),
  );
  return { accounts };
}

/** Map a verified property to a project. Rejects unverified properties and
 *  properties not present on the connector's grant. */
async function setSite(input: {
  projectId: string;
  organizationId: string;
  siteUrl: string;
  accountId: string;
  userId: string;
}): Promise<GscConnection> {
  /*
   * A service account has no grant to check against, and the reserved id the
   * picker uses for it will never appear in Better Auth. Listing was taught
   * this and saving was not, so choosing a property came back as "İstenen
   * kayıt bulunamadı" - the connection could be seen and never made.
   */
  const usingServiceAccount =
    input.accountId === SERVICE_ACCOUNT_ID && (await hasServiceAccount());

  if (!usingServiceAccount) {
    const grants = await listGrantsForUser(input.userId);
    if (!grants.some((grant) => grant.accountId === input.accountId)) {
      throw new AppError(
        "NOT_FOUND",
        "Bu Google hesabı seotracker hesabınıza bağlı değil.",
      );
    }
  }

  const client = createGscClient({
    userId: input.userId,
    ...(usingServiceAccount ? {} : { gscAccountId: input.accountId }),
  });
  const sites = await client.listSites();
  const match = sites.find((s) => s.siteUrl === input.siteUrl);
  if (!match) {
    throw new AppError(
      "NOT_FOUND",
      "Bu Search Console mülkü bağlı Google hesabınızda bulunmuyor.",
    );
  }
  if (match.permissionLevel === SITE_UNVERIFIED_PERMISSION) {
    throw new AppError(
      "FORBIDDEN",
      "Bu Search Console mülkü için doğrulanmış erişiminiz yok.",
    );
  }
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
  return GscConnectionRepository.upsert({
    projectId: input.projectId,
    organizationId: input.organizationId,
    siteUrl: input.siteUrl,
    connectedByUserId: input.userId,
    gscAccountId: input.accountId,
    connectedAccountEmail,
  });
}

async function disconnect(input: { projectId: string }): Promise<void> {
  await GscConnectionRepository.deleteByProjectId(input.projectId);
}

/** Pass-through of GSC `searchAnalytics.query` for a project's connected property. */
async function getPerformance(
  input: GscPerformanceInput,
): Promise<GscPerformanceResult> {
  const connection = await GscConnectionRepository.getByProjectId(
    input.projectId,
  );
  if (!connection) {
    throw new GscNotConnectedError(input.projectId);
  }
  const request = buildSearchAnalyticsRequest(input);
  const client = createGscClient({
    userId: connection.connectedByUserId,
    gscAccountId: connection.gscAccountId ?? undefined,
  });
  const rows = await client.querySearchAnalytics(connection.siteUrl, request);
  return {
    siteUrl: connection.siteUrl,
    connectedBy: connection.connectedAccountEmail,
    request,
    rows,
  };
}

type GscUrlInspection = {
  url: string;
  result: UrlInspectionResult | null;
  error?: string;
};

type GscInspectUrlsResult = {
  siteUrl: string;
  connectedBy: string | null;
  results: GscUrlInspection[];
  /**
   * Set when the grant died partway through, with the URLs before it still
   * in `results`. The caller persists those and then rethrows this.
   */
  tokenError?: GscTokenError;
};

/** Inspect 1–N URLs against a project's connected property. Resolves the
 *  connection once, then inspects each URL; per-URL failures are captured
 *  inline so one bad URL doesn't fail the batch.
 *
 *  A token failure stops the loop but does not throw from here. It used to,
 *  which discarded every inspection Google had already served -- and
 *  charged for -- earlier in the batch. Nothing was written, so those URLs
 *  stayed `checkedAt: null`, sorted to the front of the next batch, and were
 *  bought a second time after the operator reconnected.
 *
 *  URLs are asked INSPECT_CONCURRENCY at a time. One inspection takes about
 *  seven seconds, so asking ten in sequence ran past the MCP client's
 *  request timeout and the agent saw "The operation timed out" for a call
 *  that was still spending quota. */
const INSPECT_CONCURRENCY = 5;

async function inspectUrls(input: {
  projectId: string;
  urls: string[];
  languageCode?: string;
}): Promise<GscInspectUrlsResult> {
  const connection = await GscConnectionRepository.getByProjectId(
    input.projectId,
  );
  if (!connection) {
    throw new GscNotConnectedError(input.projectId);
  }
  const client = createGscClient({
    userId: connection.connectedByUserId,
    gscAccountId: connection.gscAccountId ?? undefined,
  });
  const results: GscUrlInspection[] = [];
  // Each inspection is one of the property's 2000 a day; a URL listed twice
  // would be bought twice.
  const urls = [...new Set(input.urls)];
  for (let i = 0; i < urls.length; i += INSPECT_CONCURRENCY) {
    const chunk = urls.slice(i, i + INSPECT_CONCURRENCY);
    const settled = await Promise.all(
      chunk.map((url) =>
        client.inspectUrl(connection.siteUrl, url, input.languageCode).then(
          (result) => ({ url, result, failure: null }),
          (failure: unknown) => ({ url, result: null, failure }),
        ),
      ),
    );
    let tokenError: GscTokenError | undefined;
    for (const { url, result, failure } of settled) {
      if (failure === null) {
        results.push({ url, result });
      } else if (failure instanceof GscTokenError) {
        tokenError ??= failure;
      } else {
        results.push({
          url,
          result: null,
          error:
            failure instanceof Error ? failure.message : "Inspection failed",
        });
      }
    }
    if (tokenError) {
      return {
        siteUrl: connection.siteUrl,
        connectedBy: connection.connectedAccountEmail,
        results,
        tokenError,
      };
    }
  }
  return {
    siteUrl: connection.siteUrl,
    connectedBy: connection.connectedAccountEmail,
    results,
  };
}

export const GscService = {
  getConnection,
  userHasGrant,
  listSitesForUserWithGrantStatus,
  setSite,
  disconnect,
  getPerformance,
  inspectUrls,
};
