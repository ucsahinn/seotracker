import { z } from "zod";
import { getAuth } from "@/lib/auth";
import {
  getServiceAccountToken,
  hasServiceAccount,
} from "@/server/lib/googleServiceAccountToken";
import { GSC_OAUTH_PROVIDER_ID, GSC_SERVICE_ACCOUNT_SCOPE } from "@/shared/gsc";
import { GscApiError, GscTokenError } from "./gscErrors";

export { GscApiError, GscTokenError } from "./gscErrors";

const GSC_API_BASE = "https://www.googleapis.com/webmasters/v3";

/**
 * `sitemaps.list`, parsed rather than cast.
 *
 * Three things about this response are easy to get wrong, and all three were
 * confirmed against Google's discovery document rather than its HTML
 * reference page:
 *
 * 1. `errors`, `warnings` and `submitted` are declared `int64`, which the
 *    API serialises as JSON **strings**. The HTML reference renders them as
 *    `long`, which reads as "number" and fails at runtime, never in a test.
 * 2. Nothing is required. The schema declares no `required` array, and
 *    ProtoJSON omits defaults, so a clean sitemap arrives with no `errors`
 *    key at all rather than `"0"`.
 * 3. The `type` enums are documented twice with different casing --
 *    SCREAMING_SNAKE in the discovery doc, camelCase in the reference page,
 *    both from Google. A strict enum would reject live data, so the value
 *    passes through as a string.
 */
const sitemapCountSchema = z
  .string()
  .optional()
  .transform((value) => (value == null ? 0 : Number(value)))
  .pipe(z.number().finite().nonnegative().catch(0));

const sitemapSchema = z.object({
  path: z.string().optional(),
  lastSubmitted: z.string().optional(),
  lastDownloaded: z.string().optional(),
  isPending: z.boolean().optional().default(false),
  isSitemapsIndex: z.boolean().optional().default(false),
  type: z.string().optional(),
  warnings: sitemapCountSchema,
  errors: sitemapCountSchema,
  contents: z
    .array(
      z.object({
        type: z.string().optional(),
        submitted: sitemapCountSchema,
      }),
    )
    .optional()
    .default([]),
});

const sitemapsListSchema = z.object({
  // The wrapper key is singular and holds an array.
  sitemap: z.array(sitemapSchema).optional().default([]),
});

export type GscSitemap = z.infer<typeof sitemapSchema>;
const GOOGLE_USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";

/** A GSC REST call returned a non-2xx status. `status` drives user-facing messaging. */
export type GscSite = {
  siteUrl: string;
  permissionLevel: string;
};

export type GscSearchAnalyticsRow = {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscDimensionFilter = {
  dimension: string;
  operator: string;
  expression: string;
};

export type GscSearchAnalyticsRequest = {
  startDate: string;
  endDate: string;
  dimensions?: string[];
  dimensionFilterGroups?: Array<{
    groupType: "and" | "or";
    filters: GscDimensionFilter[];
  }>;
  rowLimit?: number;
  startRow?: number;
  type?: string;
  dataState?: string;
  aggregationType?: string;
};

/** Subset of the URL Inspection API `inspectionResult` we surface. The wire
 *  shape is richer; extra fields are ignored. */
export type UrlInspectionResult = {
  indexStatusResult?: {
    verdict?: string;
    coverageState?: string;
    robotsTxtState?: string;
    indexingState?: string;
    lastCrawlTime?: string;
    pageFetchState?: string;
    googleCanonical?: string;
    userCanonical?: string;
    crawledAs?: string;
    sitemap?: string[];
    referringUrls?: string[];
  };
  richResultsResult?: { verdict?: string };
  inspectionResultLink?: string;
};

function messageForStatus(status: number, body: string): string {
  /*
   * A 400 is Google rejecting the request itself, and it will reject the
   * same request forever. Falling through to the generic branch called it
   * "temporarily unavailable" and told the operator to reconnect a
   * connection that is working -- so both suggestions, retry and
   * reconnect, were wrong. The tool's own defaults can produce one:
   * `type: "discover"` with the default `dimensions: ["query"]`, because
   * Discover has no query dimension.
   */
  if (status === 400) {
    return `Search Console rejected the request (400). This is not a connection problem and retrying will not help -- some dimension, filter or search type is not valid for this property. ${body.slice(0, 200)}`;
  }
  if (status === 401 || status === 403) {
    return "Search Console denied access to this property (no verified permission, or the connection was revoked).";
  }
  if (status === 429) {
    return "Search Console rate limit reached. Retry shortly.";
  }
  if (status === 404) {
    return "Search Console property not found. It may have been removed in Search Console.";
  }
  /*
   * Deliberately not the body. Every branch above returns a sentence; this
   * one used to append Google's JSON truncated at 300 characters, which
   * meant an agent received a broken JSON fragment spliced into prose, and
   * the app's own UI showed the same. Google's detail belongs in the
   * container log, where it is diagnosable, not in a message someone reads.
   */
  console.error(`Search Console API error (${status}):`, body.slice(0, 500));
  return `Search Console reporting is temporarily unavailable (${status}).`;
}

/** Free Google Search Console client. Unlike the DataForSEO client it does NOT
 *  meter credits — GSC is first-party data with no per-call cost. Access tokens
 *  are minted (and auto-refreshed) by Better Auth from the connector's stored
 *  google-search-console grant. */
export function createGscClient(opts: {
  userId: string;
  gscAccountId?: string;
}) {
  async function getToken(): Promise<string> {
    /*
     * A service account, when one is stored, is the whole credential: there
     * is no grant to refresh and no user to be signed in as. It wins over a
     * stored OAuth client because an operator who set up both meant to move
     * to the simpler one.
     */
    if (await hasServiceAccount()) {
      try {
        return await getServiceAccountToken(GSC_SERVICE_ACCOUNT_SCOPE);
      } catch (error) {
        throw new GscTokenError(
          "Servis hesabı Search Console için token alamadı.",
          error,
        );
      }
    }

    let result: { accessToken?: string } | undefined;
    try {
      // Headerless call: getAccessToken trusts body.userId when no request
      // session is present, and auto-refreshes via the genericOAuth provider.
      // Works in every auth mode — self-hosted builds the same Better Auth
      // instance once BETTER_AUTH_SECRET is set.
      result = await getAuth().api.getAccessToken({
        body: {
          providerId: GSC_OAUTH_PROVIDER_ID,
          userId: opts.userId,
          ...(opts.gscAccountId ? { accountId: opts.gscAccountId } : {}),
        },
      });
    } catch (error) {
      throw new GscTokenError(
        "Could not mint a Search Console access token (grant revoked or expired).",
        error,
      );
    }
    if (!result?.accessToken) {
      throw new GscTokenError(
        "Search Console returned no access token (grant revoked or expired).",
      );
    }
    return result.accessToken;
  }

  async function request<T>(
    url: string,
    init?: { method?: string; body?: unknown },
  ): Promise<T> {
    const token = await getToken();
    const hasBody = init?.body !== undefined;
    const response = await fetch(url, {
      method: init?.method ?? "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
      },
      body: hasBody ? JSON.stringify(init?.body) : undefined,
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new GscApiError(
        response.status,
        messageForStatus(response.status, body),
        body,
      );
    }
    return (await response.json()) as T;
  }

  return {
    async getUserInfoEmail(): Promise<string | null> {
      const data = await request<{ email?: unknown }>(GOOGLE_USERINFO_URL);
      return typeof data.email === "string" ? data.email : null;
    },

    /** Webmasters API `sites.list` — the verified properties on the grant. */
    async listSites(): Promise<GscSite[]> {
      const data = await request<{ siteEntry?: GscSite[] }>(
        `${GSC_API_BASE}/sites`,
      );
      return data.siteEntry ?? [];
    },

    /** Webmasters API `searchAnalytics.query`. siteUrl is used verbatim. */
    async querySearchAnalytics(
      siteUrl: string,
      body: GscSearchAnalyticsRequest,
    ): Promise<GscSearchAnalyticsRow[]> {
      const data = await request<{ rows?: GscSearchAnalyticsRow[] }>(
        `${GSC_API_BASE}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        { method: "POST", body },
      );
      return data.rows ?? [];
    },

    /**
     * Webmasters API `sitemaps.list` — what the operator told Google, and
     * what Google made of it.
     *
     * Distinct from the crawler's own sitemap parsing: this is Google's
     * side of the conversation, including whether it ever downloaded the
     * file and how many errors it found. Free in the sense that matters
     * here -- unlike URL Inspection there is no per-property daily cap,
     * only a per-user rate limit nothing in this app approaches.
     */
    async listSitemaps(siteUrl: string): Promise<GscSitemap[]> {
      /*
       * Encoded explicitly. `sc-domain:example.com` carries a colon and a
       * URL-prefix property carries `://` and a trailing slash; a colon is
       * legal unencoded in a path segment, so several HTTP clients leave it
       * alone and the path then splits into the wrong resource.
       */
      const data = await request<unknown>(
        `${GSC_API_BASE}/sites/${encodeURIComponent(siteUrl)}/sitemaps`,
      );
      return sitemapsListSchema.parse(data).sitemap;
    },

    /** URL Inspection API `urlInspection.index.inspect`. This lives on a
     *  different host than the Webmasters v3 base, so the full URL is passed to
     *  the request helper. Same `webmasters.readonly` scope. */
    async inspectUrl(
      siteUrl: string,
      inspectionUrl: string,
      languageCode?: string,
    ): Promise<UrlInspectionResult | null> {
      const data = await request<{ inspectionResult?: UrlInspectionResult }>(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        {
          method: "POST",
          body: {
            siteUrl,
            inspectionUrl,
            ...(languageCode ? { languageCode } : {}),
          },
        },
      );
      return data.inspectionResult ?? null;
    },
  };
}
