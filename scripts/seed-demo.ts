/**
 * Seed the local D1 database with one fully furnished demo project, "Örnek
 * site" (ornek-site.com), so every screen has something to show without a
 * Google account: Search Console and Analytics connections, sixteen months of
 * daily query history, URL-inspection answers, two finished audits with
 * pages, findings and Lighthouse runs, saved keywords, project context and a
 * saved report. Dev-only; nothing here talks to the network.
 *
 * Usage:
 *   pnpm db:migrate:local         # once — creates the local D1
 *   pnpm seed:demo                # seed (re-running replaces the demo rows)
 *   pnpm seed:demo --clean        # remove the demo project again
 *
 * Then view it:
 *   env AUTH_MODE=local_noauth pnpm dev
 *
 * The connections are marked connected with placeholder identifiers only.
 * The screens that read Search Console and Analytics live (performance,
 * opportunities, analytics, the dashboard cards) still call Google; they
 * render only when the two API clients are stood in for by
 * `scripts/demo-data.ts`, which is what the archive rows here are generated
 * from. Everything else (audit, index coverage, reports, context) reads the
 * database alone.
 *
 * Bootstraps the same local_noauth user/org that `AUTH_MODE=local_noauth`
 * resolves, exactly as seed-projects.ts does.
 */

import process from "node:process";
import { getPlatformProxy } from "wrangler";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { BatchItem } from "drizzle-orm/batch";
import * as appSchema from "../src/db/app.schema";
import * as auditSchema from "../src/db/audit.schema";
import * as ga4Schema from "../src/db/ga4.schema";
import * as gscSchema from "../src/db/gsc.schema";
import * as gscHistorySchema from "../src/db/gsc-history.schema";
import * as gscInspectionSchema from "../src/db/gsc-inspection.schema";
import * as projectContextSchema from "../src/db/project-context.schema";
import * as reportsSchema from "../src/db/reports.schema";
import { organization, user } from "../src/db/better-auth-schema";
import { parseArgs } from "./cli-utils";
import {
  DEMO_DOMAIN,
  DEMO_END_DATE,
  DEMO_GA4_PROPERTY_ID,
  DEMO_ORIGIN,
  DEMO_PAGES,
  DEMO_PROJECT_NAME,
  DEMO_QUERIES,
  DEMO_SITE_URL,
  DEMO_START_DATE,
  eachDay,
  queryDay,
  type DemoPage,
} from "./demo-data";

const schema = {
  ...appSchema,
  ...auditSchema,
  ...ga4Schema,
  ...gscSchema,
  ...gscHistorySchema,
  ...gscInspectionSchema,
  ...projectContextSchema,
  ...reportsSchema,
  organization,
  user,
};

const LOCAL_ADMIN_USER_ID = "local-admin";
const LOCAL_ADMIN_EMAIL = "admin@localhost";
const LOCAL_ORG_ID = `delegated-${LOCAL_ADMIN_USER_ID}`;

/** Fixed ids, so re-running replaces rather than duplicates. */
const PROJECT_ID = "demo-ornek-site";
const AUDIT_LATEST_ID = "demo-audit-latest";
const AUDIT_PREVIOUS_ID = "demo-audit-previous";
const REPORT_ID = "demo-report-ekim-2026";

/** D1 allows 100 bound parameters per statement. */
const D1_MAX_PARAMS = 100;
const BATCH_STATEMENTS = 10; // small batches: the local proxy drops very large request bodies

type SeedDb = ReturnType<typeof drizzle<typeof schema>>;

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log("Setting up local D1 connection...");
  const { env, dispose } = await getPlatformProxy<{ DB: D1Database }>();
  const db = drizzle(env.DB, { schema });
  try {
    await clean(db);
    if (args.clean === "true") return;
    await bootstrapLocalIdentity(db);
    await seedProject(db);
    await seedConnections(db);
    await seedQueryHistory(db);
    await seedInspections(db);
    await seedAudits(db);
    await seedKeywords(db);
    await seedContext(db);
    await seedReport(db);
    await seedActivation(db);
    console.log(`Done. Demo project "${DEMO_PROJECT_NAME}" is ${PROJECT_ID}.`);
    console.log("View it with: env AUTH_MODE=local_noauth pnpm dev");
  } finally {
    await dispose();
  }
}

async function clean(db: SeedDb) {
  // Every demo table hangs off the project by cascade.
  const removed = await db
    .delete(schema.projects)
    .where(eq(schema.projects.id, PROJECT_ID))
    .returning({ id: schema.projects.id });
  await db
    .delete(schema.organizationActivationState)
    .where(eq(schema.organizationActivationState.organizationId, LOCAL_ORG_ID));
  if (removed.length > 0) console.log("Removed the previous demo project.");
}

async function bootstrapLocalIdentity(db: SeedDb) {
  await db
    .insert(schema.user)
    .values({
      id: LOCAL_ADMIN_USER_ID,
      name: "admin",
      email: LOCAL_ADMIN_EMAIL,
      emailVerified: true,
    })
    .onConflictDoNothing({ target: schema.user.id });
  await db
    .insert(schema.organization)
    .values({
      id: LOCAL_ORG_ID,
      name: "admin workspace",
      slug: `delegated-admin-${toHex(LOCAL_ADMIN_USER_ID)}`,
      createdAt: new Date(),
    })
    .onConflictDoNothing({ target: schema.organization.id });
}

async function seedProject(db: SeedDb) {
  await db.insert(schema.projects).values({
    id: PROJECT_ID,
    organizationId: LOCAL_ORG_ID,
    name: DEMO_PROJECT_NAME,
    domain: DEMO_DOMAIN,
    locationCode: 2792,
    languageCode: "tr",
    createdAt: "2025-06-18 09:12:04",
  });
}

async function seedConnections(db: SeedDb) {
  await db.insert(schema.gscConnections).values({
    id: "demo-gsc-connection",
    projectId: PROJECT_ID,
    organizationId: LOCAL_ORG_ID,
    siteUrl: DEMO_SITE_URL,
    connectedByUserId: LOCAL_ADMIN_USER_ID,
    gscAccountId: "demo-gsc-account",
    connectedAccountEmail: null,
    createdAt: "2025-06-18 09:20:31",
    updatedAt: "2025-06-18 09:20:31",
  });
  await db.insert(schema.ga4Connections).values({
    id: "demo-ga4-connection",
    projectId: PROJECT_ID,
    organizationId: LOCAL_ORG_ID,
    propertyId: DEMO_GA4_PROPERTY_ID,
    propertyDisplayName: "Örnek site - GA4",
    propertyTimeZone: "Europe/Istanbul",
    propertyCurrencyCode: "TRY",
    connectedByUserId: LOCAL_ADMIN_USER_ID,
    ga4AccountId: "demo-ga4-account",
    connectedAccountEmail: null,
    createdAt: "2025-06-18 09:24:10",
    updatedAt: "2025-06-18 09:24:10",
  });
}

/** Insert in statements that stay under D1's parameter limit, batched. */
async function insertRows<T extends Record<string, unknown>>(
  db: SeedDb,
  table: Parameters<SeedDb["insert"]>[0],
  rows: T[],
) {
  if (rows.length === 0) return;
  const columns = Object.keys(rows[0]!).length;
  const perStatement = Math.max(1, Math.floor(D1_MAX_PARAMS / columns));
  const statements: BatchItem<"sqlite">[] = [];
  for (let i = 0; i < rows.length; i += perStatement) {
    statements.push(db.insert(table).values(rows.slice(i, i + perStatement)));
  }
  for (let i = 0; i < statements.length; i += BATCH_STATEMENTS) {
    const chunk = statements.slice(i, i + BATCH_STATEMENTS);
    await db.batch(chunk as [BatchItem<"sqlite">, ...BatchItem<"sqlite">[]]);
  }
}

async function seedQueryHistory(db: SeedDb) {
  const fetchedAt = `${DEMO_END_DATE}T03:10:00.000Z`;
  const rows: Array<typeof schema.gscQueryDaily.$inferInsert> = [];
  for (const q of DEMO_QUERIES) {
    for (const date of eachDay(DEMO_START_DATE, DEMO_END_DATE)) {
      const day = queryDay(q, date);
      if (!day) continue;
      rows.push({
        projectId: PROJECT_ID,
        date,
        query: q.query,
        clicks: day.clicks,
        impressions: day.impressions,
        ctr: day.impressions > 0 ? day.clicks / day.impressions : 0,
        position: day.position,
        fetchedAt,
      });
    }
  }
  console.log(`Writing ${rows.length} query-day rows...`);
  await insertRows(db, schema.gscQueryDaily, rows);
  await db.insert(schema.gscArchiveState).values({
    projectId: PROJECT_ID,
    earliestDate: DEMO_START_DATE,
    lastDate: DEMO_END_DATE,
    lastRunAt: fetchedAt,
    scannedThrough: DEMO_END_DATE,
  });
}

const pageUrl = (path: string) => `${DEMO_ORIGIN}${path}`;

/** Google's answer per URL. Most pages are fine; a handful carry a finding. */
const INSPECTION_OVERRIDES: Record<
  string,
  { verdict: string; coverageState: string }
> = {
  "/hesabim": {
    verdict: "NEUTRAL",
    coverageState: "Excluded by 'noindex' tag",
  },
  "/yeni-gelenler": {
    verdict: "NEUTRAL",
    coverageState: "Crawled - currently not indexed",
  },
  "/havlu/el-havlusu": {
    verdict: "NEUTRAL",
    coverageState: "Crawled - currently not indexed",
  },
  "/blog/Nevresim_Olculeri": {
    verdict: "NEUTRAL",
    coverageState: "Discovered - currently not indexed",
  },
  "/hali/yolluk": {
    verdict: "NEUTRAL",
    coverageState: "Duplicate without user-selected canonical",
  },
  "/magazalar": {
    verdict: "PASS",
    coverageState: "Indexed, not submitted in sitemap",
  },
};

async function seedInspections(db: SeedDb) {
  const rows = DEMO_PAGES.map((page, i) => {
    const override = INSPECTION_OVERRIDES[page.path];
    const crawlDaysAgo = 2 + ((i * 7) % 19);
    return {
      projectId: PROJECT_ID,
      url: pageUrl(page.path),
      verdict: override?.verdict ?? "PASS",
      coverageState: override?.coverageState ?? "Submitted and indexed",
      robotsTxtState: "ALLOWED",
      indexingState: override?.coverageState.includes("noindex")
        ? "BLOCKED_BY_META_TAG"
        : "INDEXING_ALLOWED",
      pageFetchState: "SUCCESSFUL",
      lastCrawlTime: override?.coverageState.startsWith("Discovered")
        ? null
        : new Date(Date.UTC(2026, 9, 18 - crawlDaysAgo, 4, 12)).toISOString(),
      googleCanonical:
        page.path === "/hali/yolluk" ? pageUrl("/hali") : pageUrl(page.path),
      userCanonical: pageUrl(page.path),
      richResultsVerdict:
        page.kind === "product" || page.kind === "category"
          ? "PASS"
          : "VERDICT_UNSPECIFIED",
      inspectionLink: null,
      error: null,
      checkedAt: "2026-10-19T06:41:17.000Z",
      lastAttemptAt: "2026-10-19T06:41:17.000Z",
    };
  });
  await insertRows(db, schema.gscUrlInspections, rows);
}

type IssueSeed = {
  type: string;
  severity: "critical" | "warning" | "info";
  pages: string[];
  details?: (path: string) => Record<string, unknown>;
  siteWide?: boolean;
};

/** Crawl-only rows for the two URLs the shop links to but should not. */
const EXTRA_PAGES = [
  {
    path: "/hali/yolluk-modelleri",
    statusCode: 301,
    redirectUrl: pageUrl("/hali/yolluk"),
  },
  { path: "/kampanya/eski-sezon", statusCode: 404, redirectUrl: null },
];

const LIGHTHOUSE_PAGES: Array<
  [string, number, number, number, number, number, number, number]
> = [
  // path, perf, a11y, bp, seo, lcpMs, cls, inpMs
  ["/", 58, 91, 83, 92, 4310, 0.04, 210],
  ["/nevresim-takimi", 49, 88, 83, 85, 4920, 0.27, 260],
  ["/nevresim-takimi/cift-kisilik", 62, 90, 92, 92, 3480, 0.03, 190],
  ["/battaniye", 44, 86, 75, 85, 5260, 0.31, 340],
  ["/yorgan", 55, 89, 83, 92, 4180, 0.06, 230],
  ["/perde", 71, 93, 92, 100, 2460, 0.02, 160],
  ["/blog/nevresim-nasil-yikanir", 83, 96, 100, 100, 1870, 0.01, 110],
  ["/blog/perde-olcusu-nasil-alinir", 79, 95, 100, 92, 2140, 0.02, 120],
];

function latestIssues(): IssueSeed[] {
  const noDescription = DEMO_PAGES.filter((p) => p.description === null).map(
    (p) => p.path,
  );
  const longTitles = DEMO_PAGES.filter((p) => p.title.length > 60).map(
    (p) => p.path,
  );
  return [
    {
      type: "missing-meta-description",
      severity: "warning",
      pages: noDescription,
    },
    {
      type: "images-missing-alt",
      severity: "warning",
      pages: [
        "/nevresim-takimi",
        "/battaniye",
        "/yorgan",
        "/perde",
        "/hali",
        "/kampanya",
        "/yeni-gelenler",
      ],
      details: (path) => ({
        imagesMissingAlt: 2 + (path.length % 5),
        imagesTotal: 12 + (path.length % 9),
      }),
    },
    {
      type: "duplicate-title",
      severity: "warning",
      pages: ["/havlu", "/havlu/el-havlusu", "/hali", "/hali/yolluk"],
      details: (path) => ({
        groupSize: 2,
        otherUrls: [
          pageUrl(
            path.startsWith("/havlu")
              ? path === "/havlu"
                ? "/havlu/el-havlusu"
                : "/havlu"
              : path === "/hali"
                ? "/hali/yolluk"
                : "/hali",
          ),
        ],
      }),
    },
    {
      type: "broken-internal-link",
      severity: "warning",
      pages: ["/", "/kampanya", "/blog/kis-icin-yatak-tekstili"],
      details: () => ({
        targetUrl: pageUrl("/kampanya/eski-sezon"),
        targetStatus: 404,
      }),
    },
    {
      type: "broken-page",
      severity: "warning",
      pages: ["/kampanya/eski-sezon"],
      details: () => ({ statusCode: 404 }),
    },
    {
      type: "orphan-page",
      severity: "warning",
      pages: ["/magazalar", "/blog/Nevresim_Olculeri"],
    },
    {
      type: "redirect-chain",
      severity: "warning",
      pages: ["/hali/yolluk-modelleri"],
      details: () => ({
        hops: [
          pageUrl("/hali/yolluk-modelleri"),
          pageUrl("/hali/yolluk/"),
          pageUrl("/hali/yolluk"),
        ],
        finalUrl: pageUrl("/hali/yolluk"),
      }),
    },
    {
      type: "google-crawled-not-indexed",
      severity: "warning",
      pages: ["/yeni-gelenler", "/havlu/el-havlusu"],
      details: () => ({
        verdict: "NEUTRAL",
        checkedAt: "2026-10-19T06:41:17.000Z",
      }),
    },
    {
      type: "google-discovered-not-indexed",
      severity: "warning",
      pages: ["/blog/Nevresim_Olculeri"],
      details: () => ({
        verdict: "NEUTRAL",
        checkedAt: "2026-10-19T06:41:17.000Z",
      }),
    },
    {
      type: "google-duplicate-no-canonical",
      severity: "warning",
      pages: ["/hali/yolluk"],
      details: () => ({
        chosen: pageUrl("/hali"),
        declared: pageUrl("/hali/yolluk"),
      }),
    },
    {
      type: "cwv-lcp-poor",
      severity: "warning",
      pages: LIGHTHOUSE_PAGES.filter((r) => r[5] > 4000).map((r) => r[0]),
      details: (path) => ({
        lcpMs: LIGHTHOUSE_PAGES.find((r) => r[0] === path)?.[5],
        thresholdMs: 4000,
      }),
    },
    {
      type: "cwv-cls-poor",
      severity: "warning",
      pages: LIGHTHOUSE_PAGES.filter((r) => r[6] > 0.25).map((r) => r[0]),
      details: (path) => ({
        cls: LIGHTHOUSE_PAGES.find((r) => r[0] === path)?.[6],
        threshold: 0.25,
      }),
    },
    {
      type: "title-too-long",
      severity: "info",
      pages: longTitles,
      details: (path) => ({
        length: DEMO_PAGES.find((p) => p.path === path)?.title.length,
      }),
    },
    {
      type: "meta-description-too-short",
      severity: "info",
      pages: [
        "/kampanya",
        "/yeni-gelenler",
        "/hakkimizda",
        "/blog",
        "/sikca-sorulan-sorular",
      ],
      details: (path) => ({
        length:
          DEMO_PAGES.find((p) => p.path === path)?.description?.length ?? 0,
      }),
    },
    {
      type: "thin-content",
      severity: "info",
      pages: ["/hesabim", "/iletisim", "/yeni-gelenler"],
      details: (path) => ({
        wordCount: DEMO_PAGES.find((p) => p.path === path)?.wordCount,
      }),
    },
    {
      type: "missing-h1",
      severity: "info",
      pages: ["/gizlilik-politikasi", "/hesabim"],
    },
    {
      type: "multiple-h1",
      severity: "info",
      pages: ["/", "/kampanya"],
      details: () => ({ count: 2 }),
    },
    {
      type: "heading-order-skip",
      severity: "info",
      pages: ["/hakkimizda", "/blog/hali-temizligi", "/kargo-ve-iade"],
    },
    {
      type: "internal-link-to-redirect",
      severity: "info",
      pages: [
        "/hali",
        "/",
        "/blog/yatak-odasi-dekorasyon-fikirleri",
        "/masa-ortusu",
        "/kampanya",
      ],
      details: () => ({
        targetUrl: pageUrl("/hali/yolluk-modelleri"),
        targetStatus: 301,
        redirectsTo: pageUrl("/hali/yolluk"),
      }),
    },
    {
      type: "slow-response",
      severity: "info",
      pages: [
        "/battaniye",
        "/nevresim-takimi",
        "/hali",
        "/sikca-sorulan-sorular",
      ],
      details: (path) => ({
        responseTimeMs: 1400 + ((path.length * 97) % 900),
      }),
    },
    {
      type: "deep-page",
      severity: "info",
      pages: ["/gizlilik-politikasi", "/magazalar"],
      details: (path) => ({ crawlDepth: path === "/magazalar" ? 4 : 5 }),
    },
    {
      type: "missing-canonical",
      severity: "info",
      pages: [
        "/kampanya",
        "/yeni-gelenler",
        "/hakkimizda",
        "/iletisim",
        "/magazalar",
        "/kargo-ve-iade",
      ],
    },
    {
      type: "images-missing-dimensions",
      severity: "info",
      pages: [
        "/",
        "/nevresim-takimi",
        "/yastik",
        "/battaniye",
        "/havlu",
        "/perde",
        "/blog/yatak-odasi-dekorasyon-fikirleri",
        "/blog/bornoz-secerken",
      ],
      details: (path) => ({ count: 3 + (path.length % 6) }),
    },
    {
      type: "canonicalized-page",
      severity: "info",
      pages: ["/hali/yolluk"],
      details: () => ({ canonicalUrl: pageUrl("/hali") }),
    },
    {
      type: "noindex-page",
      severity: "info",
      pages: ["/hesabim"],
      details: () => ({ robotsMeta: "noindex, nofollow" }),
    },
    {
      type: "url-uppercase-or-underscore",
      severity: "info",
      pages: ["/blog/Nevresim_Olculeri"],
    },
    {
      type: "sitemap-lastmod-missing",
      severity: "info",
      pages: ["/"],
      details: () => ({ urlCount: 44 }),
      siteWide: true,
    },
  ];
}

/** Three weeks earlier: more pages lacked descriptions, no Lighthouse ran. */
function previousIssues(): IssueSeed[] {
  const extraNoDescription = [
    "/nevresim-takimi/cift-kisilik",
    "/yastik",
    "/battaniye/pamuklu-battaniye",
    "/perde/fon-perde",
    "/blog/battaniye-bakimi",
  ];
  return latestIssues()
    .filter(
      (issue) =>
        !issue.type.startsWith("cwv-") &&
        issue.type !== "redirect-chain" &&
        issue.type !== "google-duplicate-no-canonical",
    )
    .map((issue) =>
      issue.type === "missing-meta-description"
        ? { ...issue, pages: [...issue.pages, ...extraNoDescription] }
        : issue.type === "broken-internal-link"
          ? { ...issue, pages: [...issue.pages, "/yorgan", "/hali"] }
          : issue,
    );
}

async function seedAudits(db: SeedDb) {
  await seedAudit(db, {
    id: AUDIT_PREVIOUS_ID,
    startedAt: "2026-09-28 07:30:12",
    completedAt: "2026-09-28 07:41:55",
    issues: previousIssues(),
    lighthouse: false,
  });
  await seedAudit(db, {
    id: AUDIT_LATEST_ID,
    startedAt: "2026-10-19 06:38:02",
    completedAt: "2026-10-19 06:52:40",
    issues: latestIssues(),
    lighthouse: true,
  });
}

async function seedAudit(
  db: SeedDb,
  audit: {
    id: string;
    startedAt: string;
    completedAt: string;
    issues: IssueSeed[];
    lighthouse: boolean;
  },
) {
  const pages = [...DEMO_PAGES.map(pageRow), ...EXTRA_PAGES.map(extraPageRow)];
  const pageIds = new Map(pages.map((p) => [p.path, `${audit.id}-${p.index}`]));
  await db.insert(schema.audits).values({
    id: audit.id,
    projectId: PROJECT_ID,
    startedByUserId: LOCAL_ADMIN_USER_ID,
    startUrl: `${DEMO_ORIGIN}/`,
    status: "completed",
    config: JSON.stringify({
      maxPages: 200,
      lighthouseStrategy: audit.lighthouse ? "auto" : "none",
    }),
    pagesCrawled: pages.length,
    pagesTotal: pages.length,
    lighthouseTotal: audit.lighthouse ? LIGHTHOUSE_PAGES.length : 0,
    lighthouseCompleted: audit.lighthouse ? LIGHTHOUSE_PAGES.length : 0,
    lighthouseFailed: 0,
    currentPhase: "completed",
    startedAt: audit.startedAt,
    completedAt: audit.completedAt,
  });
  await insertRows(
    db,
    schema.auditPages,
    pages.map(({ path, index: _index, ...row }) => ({
      ...row,
      id: pageIds.get(path)!,
      auditId: audit.id,
    })),
  );
  const issueRows: Array<typeof schema.auditIssues.$inferInsert> = [];
  for (const issue of audit.issues) {
    for (const path of issue.pages) {
      issueRows.push({
        id: `${audit.id}-${issue.type}-${issueRows.length}`,
        auditId: audit.id,
        pageId: issue.siteWide ? null : (pageIds.get(path) ?? null),
        pageUrl: pageUrl(path),
        issueType: issue.type,
        severity: issue.severity,
        detailsJson: issue.details ? JSON.stringify(issue.details(path)) : null,
      });
    }
  }
  await insertRows(db, schema.auditIssues, issueRows);
  if (audit.lighthouse) {
    await insertRows(
      db,
      schema.auditLighthouseResults,
      LIGHTHOUSE_PAGES.map(
        ([path, perf, a11y, bp, seo, lcpMs, cls, inpMs], i) => ({
          id: `${audit.id}-lh-${i}`,
          auditId: audit.id,
          pageId: pageIds.get(path)!,
          strategy: "mobile" as const,
          performanceScore: perf,
          accessibilityScore: a11y,
          bestPracticesScore: bp,
          seoScore: seo,
          lcpMs,
          cls,
          inpMs,
          ttfbMs: 420 + i * 60,
          errorMessage: null,
          r2Key: null,
          payloadSizeBytes: null,
        }),
      ),
    );
  }
}

function pageRow(page: DemoPage, index: number) {
  const words = page.wordCount;
  const imagesTotal =
    page.kind === "blog"
      ? 4 + (index % 3)
      : page.kind === "info"
        ? 1
        : 12 + (index % 9);
  const noindex = page.path === "/hesabim";
  return {
    index,
    path: page.path,
    url: pageUrl(page.path),
    statusCode: 200,
    redirectUrl: null,
    title: page.title,
    metaDescription: page.description,
    canonicalUrl: [
      "/kampanya",
      "/yeni-gelenler",
      "/hakkimizda",
      "/iletisim",
      "/magazalar",
      "/kargo-ve-iade",
    ].includes(page.path)
      ? null
      : page.path === "/hali/yolluk"
        ? pageUrl("/hali")
        : pageUrl(page.path),
    robotsMeta: noindex ? "noindex, nofollow" : null,
    googlebotMeta: null,
    htmlLang: "tr",
    ogTitle: page.title,
    ogDescription: page.description,
    ogImage: `${DEMO_ORIGIN}/static/og${page.kind === "home" ? "" : "-" + page.kind}.jpg`,
    h1Count:
      page.h1 === null
        ? 0
        : page.path === "/" || page.path === "/kampanya"
          ? 2
          : 1,
    firstH1: page.h1,
    h2Count: page.kind === "blog" ? 5 + (index % 4) : 2 + (index % 3),
    h3Count: page.kind === "blog" ? 4 : 1,
    h4Count: 0,
    h5Count: 0,
    h6Count: 0,
    headingOrderJson: null,
    wordCount: words,
    imagesTotal,
    imagesMissingAlt: [
      "/nevresim-takimi",
      "/battaniye",
      "/yorgan",
      "/perde",
      "/hali",
      "/kampanya",
      "/yeni-gelenler",
    ].includes(page.path)
      ? 2 + (page.path.length % 5)
      : 0,
    imagesJson: null,
    internalLinkCount:
      page.kind === "home"
        ? 96
        : page.kind === "category"
          ? 54 + (index % 10)
          : 32 + (index % 12),
    externalLinkCount: page.kind === "blog" ? 2 : 0,
    hasStructuredData:
      page.kind === "product" ||
      page.kind === "category" ||
      page.kind === "blog",
    hreflangTagsJson: null,
    isIndexable: !noindex,
    xRobotsTag: null,
    headerCanonicalUrl: null,
    crawlDepth:
      page.path === "/magazalar"
        ? 4
        : page.path === "/gizlilik-politikasi"
          ? 5
          : page.depth,
    inSitemap: page.inSitemap,
    contentHash: `demo-${index}`,
    fetchClass: "ok" as const,
    responseTimeMs: [
      "/battaniye",
      "/nevresim-takimi",
      "/hali",
      "/sikca-sorulan-sorular",
    ].includes(page.path)
      ? 1400 + ((page.path.length * 97) % 900)
      : 180 + ((index * 53) % 420),
  };
}

function extraPageRow(extra: (typeof EXTRA_PAGES)[number], i: number) {
  const index = DEMO_PAGES.length + i;
  return {
    ...pageRow(
      {
        path: extra.path,
        kind: "info",
        title: extra.statusCode === 404 ? "Sayfa bulunamadı | Örnek Site" : "",
        description: null,
        h1: null,
        wordCount: 40,
        inSitemap: false,
        depth: 2,
      },
      index,
    ),
    statusCode: extra.statusCode,
    redirectUrl: extra.redirectUrl,
    canonicalUrl: null,
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    hasStructuredData: false,
    isIndexable: extra.statusCode === 200,
    h1Count: 0,
  };
}

async function seedKeywords(db: SeedDb) {
  const keywords = [
    "nevresim takımı",
    "kaz tüyü yorgan",
    "perde ölçüsü nasıl alınır",
  ];
  await insertRows(
    db,
    schema.savedKeywords,
    keywords.map((keyword, i) => ({
      id: `demo-keyword-${i}`,
      projectId: PROJECT_ID,
      keyword,
      keywordKey: keyword.trim().toLocaleLowerCase("tr"),
      locationCode: 2792,
      languageCode: "tr",
      createdAt: `2026-0${7 + i}-0${3 + i} 10:0${i}:00`,
    })),
  );
}

async function seedContext(db: SeedDb) {
  const updatedAt = "2026-10-12 14:20:00";
  await insertRows(db, schema.projectContextSections, [
    {
      projectId: PROJECT_ID,
      key: "business_overview",
      title: null,
      content:
        "Ev tekstili satan bir çevrimiçi mağaza: nevresim takımı, yorgan, yastık, battaniye, perde ve havlu. 2016'dan beri aktif, Türkiye geneline kargo. Gelirin büyük kısmı nevresim ve yorgan kategorilerinden geliyor; blog, bakım ve ölçü rehberleriyle üst huni trafiği taşıyor.",
      updatedAt,
      updatedBy: "user",
    },
    {
      projectId: PROJECT_ID,
      key: "current_goal",
      title: null,
      content:
        "Kış sezonuna girerken yorgan ve battaniye kategorilerinin organik tıklamasını %30 artırmak. Blog yazılarından kategori sayfalarına geçişi güçlendirmek; LCP sorunlu kategori sayfalarını Kasım'dan önce düzeltmek.",
      updatedAt,
      updatedBy: "user",
    },
    {
      projectId: PROJECT_ID,
      key: "positioning",
      title: null,
      content:
        "Pazar yerlerinden farkı: ürünlerin kumaş ve gramaj bilgisi açık, iade 14 gün, perde isteğe göre dikiliyor. Fiyat odaklı değil, 'doğru ürünü seçtiren' mağaza.",
      updatedAt,
      updatedBy: "mcp",
    },
    {
      projectId: PROJECT_ID,
      key: "writing_preferences",
      title: null,
      content:
        "Türkçe, 'siz' hitabı, kısa cümleler. Fiyat vaadi yok, 'en ucuz' demiyoruz. Başlıklarda soru formu serbest. Marka adı 'Örnek Site' olarak yazılır.",
      updatedAt,
      updatedBy: "user",
    },
  ]);
  const keyPages: Array<
    [string, "hub" | "spoke" | "money", string, string | null]
  > = [
    ["/nevresim-takimi", "money", "Nevresim", "En çok gelir getiren kategori."],
    ["/yorgan", "money", "Yorgan", "Kış sezonu hedefi."],
    [
      "/battaniye",
      "money",
      "Battaniye",
      "LCP ve CLS sorunlu; önce bu düzelsin.",
    ],
    ["/blog", "hub", "Rehberler", null],
    [
      "/blog/nevresim-nasil-yikanir",
      "spoke",
      "Nevresim bakımı",
      "En çok trafik alan yazı; kategoriye bağlantı ekle.",
    ],
    ["/blog/perde-olcusu-nasil-alinir", "spoke", "Perde ölçüsü", null],
  ];
  await insertRows(
    db,
    schema.projectKeyPages,
    keyPages.map(([path, role, topic, notes], i) => ({
      id: `demo-key-page-${i}`,
      projectId: PROJECT_ID,
      url: pageUrl(path),
      role,
      topic,
      notes,
      updatedAt,
      updatedBy: "user" as const,
    })),
  );
  await insertRows(db, schema.projectResearchLog, [
    {
      id: "demo-research-0",
      projectId: PROJECT_ID,
      entryDate: "2026-10-19",
      summary:
        "Site denetimi: 49 sayfa tarandı. Yeni çıkan: kategori sayfalarında LCP 4 saniyenin üzerinde (5 sayfa). Eylül'e göre meta açıklaması eksik sayfa 15'ten 10'a indi.",
      createdBy: "mcp" as const,
      createdAt: "2026-10-19T07:02:11.000Z",
    },
    {
      id: "demo-research-1",
      projectId: PROJECT_ID,
      entryDate: "2026-10-05",
      summary:
        "Fırsat taraması: 'polar battaniye' 11. sırada, 28 günde 9.400 gösterim; sayfa başlığı ve ilk ekran görseli yenilenecek.",
      createdBy: "mcp" as const,
      createdAt: "2026-10-05T09:15:40.000Z",
    },
    {
      id: "demo-research-2",
      projectId: PROJECT_ID,
      entryDate: "2026-09-21",
      summary:
        "Blog yazılarının kategori sayfalarına iç bağlantısı yok; 11 yazıya ilgili kategori kutusu eklenmesi önerildi.",
      createdBy: "user" as const,
      createdAt: "2026-09-21T16:48:03.000Z",
    },
  ]);
}

const REPORT_TITLE = "Örnek site SEO denetimi, Ekim 2026";

const REPORT_HTML = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>${REPORT_TITLE}</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 760px; margin: 2rem auto; padding: 0 1rem; color: #1c1917; line-height: 1.55; }
  h1 { font-size: 1.7rem; margin-bottom: .25rem; }
  .muted { color: #6b6761; font-size: .9rem; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
  th, td { text-align: left; padding: .45rem .6rem; border-bottom: 1px solid #e5e1dc; font-size: .92rem; }
  th { font-weight: 600; }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }
  .pill { display: inline-block; padding: .1rem .5rem; border-radius: 999px; font-size: .78rem; background: #fde9d2; color: #8a3b00; }
  .action { border-left: 4px solid #d97706; padding: .75rem 1rem; background: #fff7ed; margin: 1.25rem 0; }
</style>
</head>
<body>
<h1>${REPORT_TITLE}</h1>
<p class="muted">ornek-site.com · Denetim 19 Ekim 2026 · Search Console son 28 gün (22 Eyl – 19 Eki)</p>

<div class="action">
<strong>Bu hafta yapılacak tek şey:</strong> Battaniye, nevresim ve yorgan kategori sayfalarındaki ilk ekran görsellerini küçültüp genişlik/yükseklik verin. Beş kategori sayfasında LCP 4 saniyenin üzerinde; kış trafiği bu sayfalara geliyor.
</div>

<h2>Özet</h2>
<table>
<tr><th>Ölçüt</th><th class="num">Değer</th><th class="num">Önceki dönem</th></tr>
<tr><td>Tıklama (28 gün)</td><td class="num">19.840</td><td class="num">17.260</td></tr>
<tr><td>Gösterim (28 gün)</td><td class="num">612.400</td><td class="num">548.900</td></tr>
<tr><td>Ortalama konum</td><td class="num">9,4</td><td class="num">10,1</td></tr>
<tr><td>Denetimde taranan sayfa</td><td class="num">49</td><td class="num">49</td></tr>
<tr><td>Uyarı</td><td class="num">38</td><td class="num">39</td></tr>
</table>

<h2>Öne çıkan bulgular</h2>
<ol>
<li><span class="pill">Hız</span> Beş kategori sayfasında LCP zayıf (4,2–5,3 sn); ikisinde CLS de eşiğin üzerinde.</li>
<li><span class="pill">İçerik</span> On sayfada meta açıklaması yok; Eylül'de bu sayı 15'ti.</li>
<li><span class="pill">Dizin</span> "Yeni gelenler" ve "El havlusu" tarandı ama dizine alınmadı; "Nevresim ölçüleri" yazısı keşfedildi ama henüz taranmadı.</li>
<li><span class="pill">Bağlantı</span> Üç sayfa kaldırılmış kampanya sayfasına bağlantı veriyor (404).</li>
</ol>

<h2>Fırsatlar</h2>
<p>"polar battaniye" 11. sırada 9.400 gösterim alıyor; "fon perde" 14. sırada. İkisi de ilk sayfanın alt yarısında ve birer başlık düzenlemesiyle 5–8 aralığına çekilebilir. Blog yazılarından ilgili kategoriye bağlantı eklemek, en çok trafik alan rehberlerin ("nevresim nasıl yıkanır", "perde ölçüsü nasıl alınır") ziyaretçisini ürüne taşır.</p>

<h2>Sonraki kontrol</h2>
<p>Kasım'ın ilk haftasında aynı denetimi yineleyin; LCP bulgusu sıfırlanmış, meta açıklaması eksik sayfa beşin altına inmiş olmalı.</p>
</body>
</html>
`;

async function seedReport(db: SeedDb) {
  await db.insert(schema.reports).values({
    id: REPORT_ID,
    projectId: PROJECT_ID,
    title: REPORT_TITLE,
    summary:
      "**Bu hafta:** beş kategori sayfasında LCP 4 sn üzerinde; ilk ekran görsellerini küçültün.\n\n- Tıklama 28 günde 19.840 (+15 %)\n- Meta açıklaması eksik sayfa 15 → 10\n- Üç sayfa kaldırılmış kampanya sayfasına bağlantı veriyor",
    html: REPORT_HTML,
    skill: "seo-audit",
    templateId: null,
    createdBy: "Claude Code",
    createdByUserId: LOCAL_ADMIN_USER_ID,
    sizeBytes: new TextEncoder().encode(REPORT_HTML).byteLength,
    createdAt: "2026-10-19T07:05:52.000Z",
    updatedAt: "2026-10-19T07:05:52.000Z",
  });
}

async function seedActivation(db: SeedDb) {
  const lastCall = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
  await db.insert(schema.organizationActivationState).values({
    organizationId: LOCAL_ORG_ID,
    firstMcpAuthorizedAt: "2025-06-18T09:31:00.000Z",
    firstMcpToolCallAt: "2025-06-18T09:33:12.000Z",
    lastMcpToolCallAt: lastCall,
    lastMcpClientLabel: "Claude Code",
    updatedAt: lastCall,
  });
  await db.insert(schema.projectActivationState).values({
    projectId: PROJECT_ID,
    mcpCardDismissedAt: null,
    ga4CardDismissedAt: null,
    updatedAt: lastCall,
  });
}

function toHex(value: string) {
  return Array.from(new TextEncoder().encode(value))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
