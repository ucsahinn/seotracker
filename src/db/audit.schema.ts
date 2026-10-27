import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { PAGE_FETCH_CLASSES } from "@/shared/audit-fetch-class";
import { projects } from "./app.schema";

// ============================================================================
// Site Audit tables
// ============================================================================

// One row per audit run
export const audits = sqliteTable(
  "audits",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    startedByUserId: text("started_by_user_id").notNull(),
    startUrl: text("start_url").notNull(),
    status: text("status", {
      enum: ["running", "completed", "failed"],
    })
      .notNull()
      .default("running"),
    workflowInstanceId: text("workflow_instance_id"),
    // JSON config: { maxPages, lighthouseStrategy }
    config: text("config").notNull().default("{}"),
    // Progress & summary
    pagesCrawled: integer("pages_crawled").notNull().default(0),
    pagesTotal: integer("pages_total").notNull().default(0),
    lighthouseTotal: integer("lighthouse_total").notNull().default(0),
    lighthouseCompleted: integer("lighthouse_completed").notNull().default(0),
    lighthouseFailed: integer("lighthouse_failed").notNull().default(0),
    currentPhase: text("current_phase").default("discovery"),
    // Failure diagnostics; null unless status = "failed". errorCode is a
    // closed vocabulary (see classifyAuditError) so failures are aggregable;
    // errorDetail is the raw message, truncated. failedPhase records which
    // currentPhase the audit was in when it died.
    errorCode: text("error_code"),
    errorDetail: text("error_detail"),
    failedPhase: text("failed_phase"),
    // Something the audit worked around and still finished (same code
    // vocabulary as errorCode; today only "missing_secret"). Kept apart from
    // the failure columns so error_* always means the audit failed.
    noticeCode: text("notice_code"),
    noticeDetail: text("notice_detail"),
    // URLs the crawl found (sitemap seeds plus links) before the page limit
    // cut it. Null on audits from before it was recorded.
    urlsDiscovered: integer("urls_discovered"),
    startedAt: text("started_at")
      .notNull()
      .default(sql`(current_timestamp)`),
    completedAt: text("completed_at"),
    // Whether the pages' GA4 measurement ids were compared with the
    // connected property's. Null on audits from before this was recorded,
    // false when there was nothing to compare (no property, no G- tag).
    analyticsCompared: integer("analytics_compared", { mode: "boolean" }),
  },
  (table) => [
    index("audits_project_id_idx").on(table.projectId),
    index("audits_started_by_user_id_idx").on(table.startedByUserId),
  ],
);

// One row per crawled page
export const auditPages = sqliteTable(
  "audit_pages",
  {
    id: text("id").primaryKey(),
    auditId: text("audit_id")
      .notNull()
      .references(() => audits.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    statusCode: integer("status_code"),
    redirectUrl: text("redirect_url"),
    // Metadata
    title: text("title"),
    metaDescription: text("meta_description"),
    canonicalUrl: text("canonical_url"),
    robotsMeta: text("robots_meta"),
    /*
     * Google's own directive, which overrides the generic one for Google.
     * Parsed since the analyzer was written and dropped before the write,
     * so every cross-page check was blind to a page noindexed only this way.
     */
    googlebotMeta: text("googlebot_meta"),
    // `<html lang>` as declared; null when absent or blank.
    htmlLang: text("html_lang"),
    // Open Graph
    ogTitle: text("og_title"),
    ogDescription: text("og_description"),
    ogImage: text("og_image"),
    // Headings
    h1Count: integer("h1_count").notNull().default(0),
    // Text of the first non-empty <h1>; the duplicate-h1 check groups on it.
    firstH1: text("first_h1"),
    h2Count: integer("h2_count").notNull().default(0),
    h3Count: integer("h3_count").notNull().default(0),
    h4Count: integer("h4_count").notNull().default(0),
    h5Count: integer("h5_count").notNull().default(0),
    h6Count: integer("h6_count").notNull().default(0),
    headingOrderJson: text("heading_order_json"),
    // Content
    wordCount: integer("word_count").notNull().default(0),
    // Images
    imagesTotal: integer("images_total").notNull().default(0),
    imagesMissingAlt: integer("images_missing_alt").notNull().default(0),
    imagesJson: text("images_json"),
    // Links
    internalLinkCount: integer("internal_link_count").notNull().default(0),
    externalLinkCount: integer("external_link_count").notNull().default(0),
    // Structured data
    hasStructuredData: integer("has_structured_data", { mode: "boolean" })
      .notNull()
      .default(false),
    /**
     * The page's `<link rel="alternate" hreflang>` set, as
     * `[{ hreflang, href }]`. The column name predates the href: it held
     * bare language codes until the return-tag check needed to know which
     * URL each one pointed at. Rows written before that still hold the old
     * shape, which the reader in `issues/multipage.ts` tolerates.
     */
    hreflangTagsJson: text("hreflang_tags_json"),
    // Indexability
    isIndexable: integer("is_indexable", { mode: "boolean" })
      .notNull()
      .default(true),
    // Indexability/canonical signals from response headers
    xRobotsTag: text("x_robots_tag"),
    headerCanonicalUrl: text("header_canonical_url"),
    // Crawl metadata
    // null depth = not reached via links (e.g. sitemap-seeded)
    crawlDepth: integer("crawl_depth"),
    inSitemap: integer("in_sitemap", { mode: "boolean" })
      .notNull()
      .default(false),
    // SHA-256 of the visible body text, for duplicate-content grouping
    contentHash: text("content_hash"),
    fetchClass: text("fetch_class", { enum: PAGE_FETCH_CLASSES })
      .notNull()
      .default("ok"),
    // Performance
    responseTimeMs: integer("response_time_ms"),
    /*
     * Page signals for the full report. Null on rows written before they
     * existed and on pages with no analyzed HTML: not measured, never zero.
     */
    // HTML characters read, capped at the crawler's 1 MiB limit.
    htmlBytes: integer("html_bytes"),
    // Visible text characters over HTML characters, 0..1.
    textRatio: real("text_ratio"),
    domNodeCount: integer("dom_node_count"),
    domMaxDepth: integer("dom_max_depth"),
    twitterCard: text("twitter_card"),
    // og:title, og:description and og:image all present.
    ogComplete: integer("og_complete", { mode: "boolean" }),
    metaKeywordsPresent: integer("meta_keywords_present", { mode: "boolean" }),
    viewportZoomDisabled: integer("viewport_zoom_disabled", {
      mode: "boolean",
    }),
    externalBlankWithoutNoopener: integer("external_blank_without_noopener"),
    javascriptLinks: integer("javascript_links"),
    hashOnlyLinks: integer("hash_only_links"),
    imagesLazyCount: integer("images_lazy_count"),
    imagesModernFormatCount: integer("images_modern_format_count"),
    formInputsWithoutLabel: integer("form_inputs_without_label"),
    duplicateIds: integer("duplicate_ids"),
    // 64-bit SimHash of the visible text as 16 hex characters.
    contentSimhash: text("content_simhash"),
    // Breadcrumb navigation: BreadcrumbList structured data, or markup named
    // as a breadcrumb (aria-label, class, id). Null before migration 0067.
    hasBreadcrumbs: integer("has_breadcrumbs", { mode: "boolean" }),
    // <link rel="alternate"> to an RSS or Atom feed in the head.
    hasFeedLink: integer("has_feed_link", { mode: "boolean" }),
  },
  (table) => [index("audit_pages_audit_url_idx").on(table.auditId, table.url)],
);

// One row per schema.org type a page declares in JSON-LD.
export const auditPageSchemaTypes = sqliteTable(
  "audit_page_schema_types",
  {
    auditId: text("audit_id")
      .notNull()
      .references(() => audits.id, { onDelete: "cascade" }),
    pageId: text("page_id")
      .notNull()
      .references(() => auditPages.id, { onDelete: "cascade" }),
    schemaType: text("schema_type").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.pageId, table.schemaType] }),
    index("audit_page_schema_types_audit_id_idx").on(table.auditId),
  ],
);

// One row per analytics tag id (G-, GTM-, UA-) found in a page's scripts.
export const auditPageAnalyticsIds = sqliteTable(
  "audit_page_analytics_ids",
  {
    auditId: text("audit_id")
      .notNull()
      .references(() => audits.id, { onDelete: "cascade" }),
    pageId: text("page_id")
      .notNull()
      .references(() => auditPages.id, { onDelete: "cascade" }),
    tagId: text("tag_id").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.pageId, table.tagId] }),
    index("audit_page_analytics_ids_audit_id_idx").on(table.auditId),
  ],
);

// One row per recorded check (shared/audit-issues/recorded-checks.ts) the
// audit measured, found or not. A recorded check without a row is unknown.
export const auditMeasuredChecks = sqliteTable(
  "audit_measured_checks",
  {
    auditId: text("audit_id")
      .notNull()
      .references(() => audits.id, { onDelete: "cascade" }),
    checkId: text("check_id").notNull(),
  },
  (table) => [primaryKey({ columns: [table.auditId, table.checkId] })],
);

// Link edges live in the per-audit AuditScratchpad Durable Object for the
// duration of the crawl; they are never persisted to the app DB.

// One row per (issue type, affected page)
export const auditIssues = sqliteTable(
  "audit_issues",
  {
    id: text("id").primaryKey(),
    auditId: text("audit_id")
      .notNull()
      .references(() => audits.id, { onDelete: "cascade" }),
    pageId: text("page_id").references(() => auditPages.id, {
      onDelete: "cascade",
    }),
    pageUrl: text("page_url").notNull(),
    issueType: text("issue_type").notNull(),
    severity: text("severity", { enum: ["critical", "warning", "info"] })
      .notNull()
      .default("info"),
    // JSON details specific to the issue type (e.g. broken link target)
    detailsJson: text("details_json"),
  },
  (table) => [
    index("audit_issues_audit_type_idx").on(table.auditId, table.issueType),
    index("audit_issues_page_id_idx").on(table.pageId),
  ],
);

// One row per Lighthouse test (mobile + desktop per page).
export const auditLighthouseResults = sqliteTable(
  "audit_lighthouse_results",
  {
    id: text("id").primaryKey(),
    auditId: text("audit_id")
      .notNull()
      .references(() => audits.id, { onDelete: "cascade" }),
    pageId: text("page_id")
      .notNull()
      .references(() => auditPages.id, { onDelete: "cascade" }),
    strategy: text("strategy", { enum: ["mobile", "desktop"] }).notNull(),
    performanceScore: integer("performance_score"),
    accessibilityScore: integer("accessibility_score"),
    bestPracticesScore: integer("best_practices_score"),
    seoScore: integer("seo_score"),
    lcpMs: real("lcp_ms"),
    cls: real("cls"),
    inpMs: real("inp_ms"),
    ttfbMs: real("ttfb_ms"),
    errorMessage: text("error_message"),
    r2Key: text("r2_key"),
    payloadSizeBytes: integer("payload_size_bytes"),
  },
  (table) => [
    index("audit_lighthouse_results_audit_id_idx").on(table.auditId),
    index("audit_lighthouse_results_page_id_idx").on(table.pageId),
  ],
);
