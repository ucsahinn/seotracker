import {
  SERVICE_ACCOUNT_ID,
  listGrantsForUser,
  serviceAccountEmail,
  listSitesForUserWithGrantStatus,
} from "./GscPropertyDiscovery";
import { GoogleAccessRepository } from "@/server/features/google/GoogleAccessRepository";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { account } from "@/db/schema";
import { hasServiceAccount } from "@/server/lib/googleServiceAccountToken";
import { GSC_OAUTH_PROVIDER_ID } from "@/shared/gsc";
import { AppError } from "@/server/lib/errors";
import {
  createGscClient,
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
  GSC_API_MAX_ROW_LIMIT,
  type GscPerformanceInput,
} from "@/server/features/gsc/searchAnalytics";
import { cachedSearchAnalytics } from "@/server/features/gsc/searchAnalyticsCache";
import {
  GscConnectionRepository,
  type GscConnection,
} from "@/server/features/gsc/repositories/GscConnectionRepository";
import type {
  GscSearchAnalyticsRequest,
  GscSearchAnalyticsRow,
} from "@/server/lib/gscClient";
import { t } from "@/shared/i18n";

const SITE_UNVERIFIED_PERMISSION = "siteUnverifiedUser";

type GscPerformanceResult = {
  siteUrl: string;
  connectedBy: string | null;
  request: GscSearchAnalyticsRequest;
  rows: GscSearchAnalyticsRow[];
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
        t("Bu Google hesabı seowatcher hesabınıza bağlı değil."),
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
      t("Bu Search Console mülkü bağlı Google hesabınızda bulunmuyor."),
    );
  }
  if (match.permissionLevel === SITE_UNVERIFIED_PERMISSION) {
    throw new AppError(
      "FORBIDDEN",
      t("Bu Search Console mülkü için doğrulanmış erişiminiz yok."),
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

export type GscAnalyticsResult = {
  siteUrl: string;
  request: GscSearchAnalyticsRequest;
  rows: GscSearchAnalyticsRow[];
  /**
   * True when the page budget ran out while Google still had rows. Google
   * sorts by clicks, so what is missing is the low-click tail -- the rows
   * held are the top of the table, not a sample of it.
   */
  truncated: boolean;
  /** Requests this answer took (0 when it came from the cache). */
  requests: number;
  /** Acquisition start, retained when the answer is served from cache. */
  fetchedAt?: string;
  aggregationType: string | null;
  firstIncompleteDate: string | null;
};

/**
 * `searchAnalytics.query`, paged through `startRow` until Google runs out or
 * an explicitly supplied `maxPages` is spent. Without a budget, consume
 * every page Google exposes for the requested window.
 *
 * Google: rowLimit "Valid range is 1–25,000", startRow "Zero-based index of
 * the first row", and "If startRow exceeds the number of results ... the
 * response will be a successful response with zero rows"; the API exposes at
 * most 50,000 rows per day per search type, sorted by clicks
 * (developers.google.com/webmaster-tools/v1/searchanalytics/query and
 * developers.google.com/webmaster-tools/v1/how-tos/all-your-data). A short
 * page therefore means the end; a full last page means there may be more.
 *
 * Answers are kept for a few minutes per isolate (searchAnalyticsCache.ts),
 * keyed by the property and the exact request.
 */
async function queryAnalytics(
  input: GscPerformanceInput & { maxPages?: number; fresh?: boolean },
): Promise<GscAnalyticsResult> {
  const connection = await GscConnectionRepository.getByProjectId(
    input.projectId,
  );
  if (!connection) {
    throw new GscNotConnectedError(input.projectId);
  }
  const maxPages = Math.max(1, input.maxPages ?? Number.POSITIVE_INFINITY);
  const request = buildSearchAnalyticsRequest(
    {
      ...input,
      rowLimit: input.rowLimit ?? GSC_API_MAX_ROW_LIMIT,
      startRow: undefined,
    },
    new Date(),
    { maxRowLimit: GSC_API_MAX_ROW_LIMIT },
  );
  const pageSize = request.rowLimit ?? GSC_API_MAX_ROW_LIMIT;
  const generation = await GoogleAccessRepository.generation();
  const key = JSON.stringify([
    generation,
    connection.connectedByUserId,
    connection.gscAccountId,
    connection.siteUrl,
    request,
    maxPages,
  ]);
  let loaded = false;

  const result = await cachedSearchAnalytics(
    key,
    (value: GscAnalyticsResult) => value.rows.length,
    async () => {
      loaded = true;
      const fetchedAt = new Date().toISOString();
      const client = createGscClient({
        userId: connection.connectedByUserId,
        gscAccountId: connection.gscAccountId ?? undefined,
      });
      const rows: GscSearchAnalyticsRow[] = [];
      let aggregationType: string | null = null;
      let firstIncompleteDate: string | null = null;
      let requests = 0;
      let truncated = true;
      while (truncated && requests < maxPages) {
        const answer = await client.querySearchAnalyticsPage(
          connection.siteUrl,
          requests === 0
            ? request
            : { ...request, startRow: requests * pageSize },
        );
        requests += 1;
        aggregationType ??= answer.aggregationType;
        firstIncompleteDate ??= answer.firstIncompleteDate;
        rows.push(...answer.rows);
        truncated = answer.rows.length >= pageSize;
      }
      return {
        siteUrl: connection.siteUrl,
        request,
        rows,
        truncated,
        requests,
        fetchedAt,
        aggregationType,
        firstIncompleteDate,
      };
    },
    { fresh: input.fresh },
  );
  return loaded ? result : { ...result, requests: 0 };
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
   * Set when the grant died partway through. `results` still holds every
   * answer received before the batch stopped, including others from the
   * same chunk; the caller persists those and then rethrows this.
   */
  tokenError?: GscTokenError;
  reservationError?: Error;
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
  reserve: (siteUrl: string) => Promise<boolean>;
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
  for (let i = 0; i < input.urls.length; i += INSPECT_CONCURRENCY) {
    const chunk = input.urls.slice(i, i + INSPECT_CONCURRENCY);
    let reservationError: Error | undefined;
    const settled = await Promise.all(
      chunk.map(async (url) => {
        try {
          if (!(await input.reserve(connection.siteUrl))) return null;
        } catch (error) {
          reservationError ??=
            error instanceof Error
              ? error
              : new Error("Quota reservation failed");
          return null;
        }
        return client
          .inspectUrl(connection.siteUrl, url, input.languageCode)
          .then(
            (result) => ({ url, result, failure: null }),
            (failure: unknown) => ({ url, result: null, failure }),
          );
      }),
    );
    let tokenError: GscTokenError | undefined;
    for (const entry of settled) {
      if (!entry) continue;
      const { url, result, failure } = entry;
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
    if (tokenError || reservationError) {
      return {
        siteUrl: connection.siteUrl,
        connectedBy: connection.connectedAccountEmail,
        results,
        tokenError,
        reservationError,
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
  queryAnalytics,
  inspectUrls,
};
