/**
 * Demo mode: answers Google's APIs from `scripts/demo-data.ts` instead of the
 * network.
 *
 * Off unless the worker's environment sets `DEMO_GOOGLE=1`, which only a
 * developer's `.dev.vars` does (`pnpm seed:demo` writes the matching project).
 * It exists so the marketing screenshots and the README can show the real
 * screens with believable numbers, without anyone's Search Console account.
 *
 * Two seams, both deliberately small: the service-account check answers "yes"
 * with a placeholder token (so neither client needs an OAuth grant), and a
 * wrapped `fetch` serves the Google hosts. Every other request goes out as
 * normal.
 */
import { z } from "zod";
import {
  DEMO_GA4_PROPERTY_ID,
  DEMO_DOMAIN,
  DEMO_SITE_URL,
  type GscRequest,
  ga4RunReport,
  gscSearchAnalytics,
} from "../../../scripts/demo-data";

let enabled = false;

export function isDemoGoogle(): boolean {
  return enabled;
}

export const DEMO_GOOGLE_TOKEN = "demo-google-token";

/** Called per request from the worker entry; idempotent. */
export function enableDemoGoogle(on: boolean): void {
  if (!on || enabled) return;
  enabled = true;
  const realFetch = globalThis.fetch.bind(globalThis);
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url,
    );
    if (!url.hostname.endsWith("googleapis.com")) return realFetch(input, init);
    const raw: unknown =
      typeof init?.body === "string" ? JSON.parse(init.body) : {};
    return answer(url, demoRequestBody.parse(raw));
  }) as typeof fetch;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/** Whatever the clients POST: a Search Console or an Analytics query. */
const filterGroups = z.array(
  z.object({
    groupType: z.string().optional(),
    filters: z.array(
      z.object({
        dimension: z.string(),
        operator: z.string().optional(),
        expression: z.string(),
      }),
    ),
  }),
);
const demoRequestBody = z
  .object({
    startDate: z.string(),
    endDate: z.string(),
    dimensions: z.array(z.union([z.string(), z.object({ name: z.string() })])),
    dimensionFilterGroups: filterGroups,
    rowLimit: z.number(),
    startRow: z.number(),
    type: z.string(),
    dataState: z.string(),
    dateRanges: z.array(
      z.object({ startDate: z.string(), endDate: z.string() }),
    ),
    metrics: z.array(z.object({ name: z.string() })),
    dimensionFilter: z.unknown(),
    metricFilter: z.unknown(),
    offset: z.union([z.string(), z.number()]).transform(String),
    limit: z.union([z.string(), z.number()]).transform(String),
    orderBys: z.array(
      z.object({
        metric: z.object({ metricName: z.string() }).optional(),
        dimension: z.object({ dimensionName: z.string() }).optional(),
        desc: z.boolean().optional(),
      }),
    ),
  })
  .partial();
type DemoRequestBody = z.infer<typeof demoRequestBody>;

function answer(url: URL, body: DemoRequestBody): Response {
  const path = decodeURIComponent(url.pathname);

  // Search Console
  if (path.endsWith("/webmasters/v3/sites")) {
    return json({
      siteEntry: [{ siteUrl: DEMO_SITE_URL, permissionLevel: "siteOwner" }],
    });
  }
  if (path.endsWith("/searchAnalytics/query")) {
    const request: GscRequest = {
      startDate: body.startDate ?? "",
      endDate: body.endDate ?? "",
      dimensions: (body.dimensions ?? []).filter(
        (d): d is string => typeof d === "string",
      ),
      dimensionFilterGroups: body.dimensionFilterGroups,
      rowLimit: body.rowLimit,
      startRow: body.startRow,
      type: body.type,
      dataState: body.dataState,
    };
    const rows = gscSearchAnalytics(request);
    const start = request.startRow ?? 0;
    const limit = request.rowLimit ?? 1000;
    return json({ rows: rows.slice(start, start + limit) });
  }
  if (path.endsWith("/sitemaps")) {
    return json({
      sitemap: [
        {
          path: `https://${DEMO_DOMAIN}/sitemap.xml`,
          lastSubmitted: "2026-10-01T08:00:00Z",
          isPending: false,
          isSitemapsIndex: false,
          lastDownloaded: "2026-10-19T06:12:00Z",
          warnings: "0",
          errors: "0",
        },
      ],
    });
  }
  if (path.endsWith("/urlInspection/index:inspect")) {
    return json({
      inspectionResult: {
        indexStatusResult: {
          verdict: "PASS",
          coverageState: "Submitted and indexed",
        },
      },
    });
  }

  // Analytics
  if (path.endsWith(":runReport")) {
    const { kind: _kind, ...report } = ga4RunReport({
      dateRanges: body.dateRanges ?? [],
      dimensions: (body.dimensions ?? []).filter(
        (d): d is { name: string } => typeof d !== "string",
      ),
      metrics: body.metrics ?? [],
      dimensionFilter: body.dimensionFilter,
      metricFilter: body.metricFilter,
      offset: body.offset,
      limit: body.limit,
      orderBys: body.orderBys,
    });
    return json(report);
  }
  if (path.endsWith("/accountSummaries")) {
    return json({
      accountSummaries: [
        {
          account: "accounts/1000001",
          displayName: "Örnek site",
          propertySummaries: [
            {
              property: DEMO_GA4_PROPERTY_ID,
              displayName: DEMO_DOMAIN,
              propertyType: "PROPERTY_TYPE_ORDINARY",
            },
          ],
        },
      ],
    });
  }
  if (path.endsWith("/keyEvents")) {
    // `countingMethod` is required by the Admin client's schema; without it
    // the measurement-health tab failed to parse the demo answer.
    return json({
      keyEvents: [
        {
          name: `${DEMO_GA4_PROPERTY_ID}/keyEvents/1`,
          eventName: "purchase",
          countingMethod: "ONCE_PER_EVENT",
          createTime: "2026-03-02T09:00:00Z",
          custom: false,
        },
        {
          name: `${DEMO_GA4_PROPERTY_ID}/keyEvents/2`,
          eventName: "generate_lead",
          countingMethod: "ONCE_PER_SESSION",
          createTime: "2026-04-11T09:00:00Z",
          custom: true,
        },
      ],
    });
  }
  if (path.endsWith("/customDimensions")) {
    return json({
      customDimensions: [
        {
          parameterName: "page_type",
          displayName: "Sayfa türü",
          scope: "EVENT",
        },
      ],
    });
  }
  if (path.endsWith("/customMetrics")) return json({ customMetrics: [] });
  if (path.endsWith("/enhancedMeasurementSettings")) {
    // Site search left off on purpose, so the tab shows one issue to act on.
    return json({
      streamEnabled: true,
      scrollsEnabled: true,
      outboundClicksEnabled: true,
      videoEngagementEnabled: true,
      fileDownloadsEnabled: true,
      pageChangesEnabled: true,
      formInteractionsEnabled: true,
    });
  }
  if (path.endsWith("/dataStreams")) {
    return json({
      dataStreams: [
        {
          name: `${DEMO_GA4_PROPERTY_ID}/dataStreams/1`,
          type: "WEB_DATA_STREAM",
          displayName: DEMO_DOMAIN,
          createTime: "2026-01-15T10:00:00Z",
          webStreamData: {
            measurementId: "G-DEMO4815",
            defaultUri: `https://${DEMO_DOMAIN}`,
          },
        },
      ],
    });
  }
  if (path.includes(DEMO_GA4_PROPERTY_ID)) {
    return json({
      name: DEMO_GA4_PROPERTY_ID,
      displayName: DEMO_DOMAIN,
      timeZone: "Europe/Istanbul",
      currencyCode: "TRY",
    });
  }
  if (path.endsWith("/userinfo")) return json({ email: `demo@${DEMO_DOMAIN}` });

  return json({ error: { code: 404, message: "Not in the demo data." } }, 404);
}
