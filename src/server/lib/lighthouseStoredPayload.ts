import { z } from "zod";
import {
  LIGHTHOUSE_CATEGORIES,
  LIGHTHOUSE_GOOD_FROM,
} from "@/shared/lighthouse";
import { TRACKED_LIGHTHOUSE_AUDITS } from "@/server/lib/audit/lighthouse-audit-rules";

export type RawLighthouseAudit = {
  title?: string;
  description?: string;
  score?: number | null;
  scoreDisplayMode?: string;
  displayValue?: string;
  numericValue?: number;
  /** Estimated effect on each metric (FCP, LCP, TBT, CLS, INP), in its unit. */
  metricSavings?: Record<string, number | undefined>;
  details?: {
    type?: string;
    overallSavingsMs?: number;
    overallSavingsBytes?: number;
    /** Newer "insight" audits report a single object instead of a list. */
    items?: Array<Record<string, unknown>> | Record<string, unknown>;
    /** Insight audits put their byte savings here (`wastedBytes`). */
    debugData?: Record<string, unknown>;
  };
};

export type RawLighthouseCategory = {
  score?: number | null;
  auditRefs?: Array<{
    id?: string;
  }>;
};

const storedLighthouseMetricSchema = z.object({
  score: z.number().nullable(),
  displayValue: z.string().nullable(),
  numericValue: z.number().nullable(),
});

const storedLighthouseMetricsSchema = z.object({
  firstContentfulPaint: storedLighthouseMetricSchema,
  largestContentfulPaint: storedLighthouseMetricSchema,
  totalBlockingTime: storedLighthouseMetricSchema,
  cumulativeLayoutShift: storedLighthouseMetricSchema,
  speedIndex: storedLighthouseMetricSchema,
  timeToInteractive: storedLighthouseMetricSchema,
  interactionToNextPaint: storedLighthouseMetricSchema,
  serverResponseTime: storedLighthouseMetricSchema,
});

/**
 * One Core Web Vitals metric as real Chrome users experienced it over the last
 * 28 days, not as the lab measured it. `percentile` is the 75th percentile;
 * `category` is Google's own FAST / AVERAGE / SLOW bucket for it.
 */
const storedFieldMetricSchema = z.object({
  percentile: z.number(),
  category: z.string(),
});

const storedFieldDataSchema = z.object({
  /** Google's overall verdict for the URL: FAST, AVERAGE or SLOW. */
  overall: z.string().nullable(),
  largestContentfulPaint: storedFieldMetricSchema.nullable(),
  cumulativeLayoutShift: storedFieldMetricSchema.nullable(),
  interactionToNextPaint: storedFieldMetricSchema.nullable(),
  firstContentfulPaint: storedFieldMetricSchema.nullable(),
  timeToFirstByte: storedFieldMetricSchema.nullable(),
});

const storedLighthouseIssueSchema = z.object({
  category: z.enum(LIGHTHOUSE_CATEGORIES),
  auditKey: z.string(),
  title: z.string(),
  description: z.string(),
  score: z.number().nullable(),
  scoreDisplayMode: z.string().nullable(),
  displayValue: z.string().nullable(),
  impactMs: z.number().nullable(),
  impactBytes: z.number().nullable(),
  severity: z.enum(["critical", "warning", "info"]),
  items: z.array(z.string()),
});

/**
 * One Lighthouse audit's verdict, reduced to what the audit's findings read
 * (see `lighthouse-audit-rules.ts`). Every field is null when Lighthouse did
 * not report it.
 */
const storedAuditResultSchema = z.object({
  /** 0-1 as Lighthouse reports it; null for unscored modes. */
  score: z.number().nullable(),
  /** binary, numeric, metricSavings, informative, notApplicable, manual, error. */
  mode: z.string().nullable(),
  /** The larger of the LCP/FCP savings or the legacy overallSavingsMs. */
  savingsMs: z.number().nullable(),
  savingsBytes: z.number().nullable(),
  numericValue: z.number().nullable(),
  /** Rows of a table result: failing elements for an accessibility audit. */
  itemCount: z.number().nullable(),
  /** Checklist entries (insight audits), true when that part passes. */
  checklist: z.record(z.string(), z.boolean()).nullable(),
  /** Main-thread time summed over the rows, where rows carry one. */
  mainThreadMs: z.number().nullable(),
  /** Up to three affected URLs or elements, for the finding's detail. */
  examples: z.array(z.string()),
});

export type StoredAuditResult = z.infer<typeof storedAuditResultSchema>;

/** A base64 image data URI and nothing else, so it is safe in an `src`. */
export const SCREENSHOT_DATA_URI =
  /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/;

export const storedLighthousePayloadSchema = z.object({
  version: z.literal(2),
  // "dataforseo-lighthouse" is legacy: rows written before this install moved to
  // Google's PageSpeed Insights. Never written any more, only read — dropping it
  // would make every older audit's issues page render empty.
  source: z.enum(["pagespeed-insights", "dataforseo-lighthouse"]),
  hasIssueDetails: z.boolean(),
  metadata: z.object({
    requestedUrl: z.string(),
    finalUrl: z.string(),
    strategy: z.enum(["mobile", "desktop"]),
    fetchedAt: z.string(),
    lighthouseVersion: z.string().nullable(),
  }),
  scores: z.object({
    performance: z.number().nullable(),
    accessibility: z.number().nullable(),
    "best-practices": z.number().nullable(),
    seo: z.number().nullable(),
  }),
  metrics: storedLighthouseMetricsSchema,
  // Absent on rows written before field data was collected, and on URLs Chrome
  // has too little traffic to report on.
  fieldData: storedFieldDataSchema.nullish(),
  /*
   * The same shape for the whole origin. Nullish because payloads stored
   * before this existed have no such key, and a stored payload is read back
   * exactly as it was written.
   */
  originFieldData: storedFieldDataSchema.nullish(),
  /*
   * Lighthouse's final screenshot of a mobile run, as the base64 JPEG data
   * URI Google returns. Absent on desktop runs, on payloads stored before it
   * was kept, and on screenshots over the size cap.
   */
  screenshot: z.string().regex(SCREENSHOT_DATA_URI).nullish(),
  issues: z.array(storedLighthouseIssueSchema),
  /*
   * The tracked audits' verdicts, keyed by Lighthouse audit id. Absent on
   * payloads stored before the audit read them; an absent key is an audit
   * Lighthouse did not report. Either way: not measured.
   */
  audits: z.record(z.string(), storedAuditResultSchema).nullish(),
});

export type StoredFieldData = z.infer<typeof storedFieldDataSchema>;

type StoredLighthouseMetric = z.infer<typeof storedLighthouseMetricSchema>;
type StoredLighthouseMetrics = z.infer<typeof storedLighthouseMetricsSchema>;
export type StoredLighthouseIssue = z.infer<typeof storedLighthouseIssueSchema>;
export type StoredLighthousePayload = z.infer<
  typeof storedLighthousePayloadSchema
>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function scoreToPercent(
  score: number | null | undefined,
): number | null {
  if (typeof score !== "number" || Number.isNaN(score)) return null;
  return Math.round(score * 100);
}

function buildStoredMetric(
  audit: RawLighthouseAudit | undefined,
): StoredLighthouseMetric {
  return {
    score: scoreToPercent(audit?.score),
    displayValue: audit?.displayValue ?? null,
    numericValue:
      typeof audit?.numericValue === "number" ? audit.numericValue : null,
  };
}

const DIAGNOSTIC_AUDIT_KEYS = new Set([
  "largest-contentful-paint-element",
  "layout-shifts",
  "diagnostics",
  "metrics",
  "network-requests",
  "network-rtt",
  "network-server-latency",
  "main-thread-tasks",
  "screenshot-thumbnails",
  "final-screenshot",
  "script-treemap-data",
  "resource-summary",
]);

function compactItem(item: Record<string, unknown>): string {
  const preferredKeys = [
    "url",
    "source",
    "nodeLabel",
    "snippet",
    "totalBytes",
    "wastedBytes",
    "wastedMs",
    "label",
    "value",
  ];

  const output: Record<string, unknown> = {};
  for (const key of preferredKeys) {
    if (item[key] != null) {
      output[key] = item[key];
    }
  }

  if (Object.keys(output).length === 0) {
    for (const [key, value] of Object.entries(item).slice(0, 6)) {
      output[key] = value;
    }
  }

  return JSON.stringify(output);
}

function getSeverity(input: {
  score: number | null;
  impactMs: number | null;
  impactBytes: number | null;
}): "critical" | "warning" | "info" {
  if ((input.impactMs ?? 0) >= 300 || (input.impactBytes ?? 0) >= 150_000) {
    return "critical";
  }

  if (input.score != null && input.score < 50) {
    return "critical";
  }

  if ((input.impactMs ?? 0) >= 100 || (input.impactBytes ?? 0) >= 50_000) {
    return "warning";
  }

  if (input.score != null && input.score < 90) {
    return "warning";
  }

  return "info";
}

export function buildStoredLighthouseIssues(input: {
  audits: Record<string, RawLighthouseAudit>;
  categories: Record<string, RawLighthouseCategory>;
}) {
  const hasIssueDetails = LIGHTHOUSE_CATEGORIES.some(
    (category) => (input.categories[category]?.auditRefs?.length ?? 0) > 0,
  );

  const issues: StoredLighthouseIssue[] = [];

  for (const category of LIGHTHOUSE_CATEGORIES) {
    const rawRefs = input.categories[category]?.auditRefs;
    const refs = Array.isArray(rawRefs) ? rawRefs : [];
    for (const ref of refs) {
      const auditKey = ref?.id;
      if (!auditKey) continue;

      const audit = input.audits[auditKey];
      if (!audit) continue;

      const score = scoreToPercent(audit.score);
      const scoreDisplayMode = audit.scoreDisplayMode ?? null;

      if (scoreDisplayMode === "numeric") continue;
      if (DIAGNOSTIC_AUDIT_KEYS.has(auditKey)) continue;

      const isPass =
        score == null ||
        score >= LIGHTHOUSE_GOOD_FROM ||
        scoreDisplayMode === "notApplicable" ||
        scoreDisplayMode === "informative" ||
        scoreDisplayMode === "manual" ||
        scoreDisplayMode === "error";

      if (isPass) continue;

      const impactMs =
        typeof audit.details?.overallSavingsMs === "number"
          ? audit.details.overallSavingsMs
          : null;
      const impactBytes =
        typeof audit.details?.overallSavingsBytes === "number"
          ? audit.details.overallSavingsBytes
          : null;
      const rawItems = audit.details?.items;
      const itemList = Array.isArray(rawItems)
        ? rawItems
        : isRecord(rawItems)
          ? [rawItems]
          : [];
      const items = itemList.filter(isRecord).slice(0, 10).map(compactItem);

      issues.push({
        category,
        auditKey,
        title: audit.title ?? auditKey,
        description: audit.description ?? "",
        score,
        scoreDisplayMode,
        displayValue: audit.displayValue ?? null,
        impactMs,
        impactBytes,
        severity: getSeverity({ score, impactMs, impactBytes }),
        items,
      });
    }
  }

  return {
    hasIssueDetails,
    issues,
  };
}

export function buildStoredLighthouseMetrics(input: {
  audits: Record<string, RawLighthouseAudit>;
}): StoredLighthouseMetrics {
  return {
    firstContentfulPaint: buildStoredMetric(
      input.audits["first-contentful-paint"],
    ),
    largestContentfulPaint: buildStoredMetric(
      input.audits["largest-contentful-paint"],
    ),
    totalBlockingTime: buildStoredMetric(input.audits["total-blocking-time"]),
    cumulativeLayoutShift: buildStoredMetric(
      input.audits["cumulative-layout-shift"],
    ),
    speedIndex: buildStoredMetric(input.audits["speed-index"]),
    timeToInteractive: buildStoredMetric(input.audits.interactive),
    interactionToNextPaint: buildStoredMetric(
      input.audits["interaction-to-next-paint"],
    ),
    serverResponseTime: buildStoredMetric(input.audits["server-response-time"]),
  };
}

const MAX_EXAMPLES = 3;
const MAX_EXAMPLE_CHARS = 200;

function finite(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function exampleOf(item: Record<string, unknown>): string | null {
  const node = isRecord(item["node"]) ? item["node"] : null;
  const location = isRecord(item["sourceLocation"])
    ? item["sourceLocation"]
    : null;
  const candidates = [
    item["url"],
    location?.["url"],
    node?.["snippet"],
    node?.["nodeLabel"],
    item["entity"],
    item["description"],
  ];
  const found = candidates.find(
    (value): value is string =>
      typeof value === "string" && value.trim() !== "",
  );
  return found ? found.trim().slice(0, MAX_EXAMPLE_CHARS) : null;
}

/** A checklist detail, directly or as one entry of a list detail. */
function readChecklist(
  details: RawLighthouseAudit["details"],
): Record<string, boolean> | null {
  const checklists =
    details?.type === "checklist"
      ? [details]
      : details?.type === "list" && Array.isArray(details.items)
        ? details.items.filter(
            (entry) => isRecord(entry) && entry["type"] === "checklist",
          )
        : [];
  const items = checklists[0]?.["items"];
  if (!isRecord(items)) return null;
  const out: Record<string, boolean> = {};
  for (const [key, entry] of Object.entries(items)) {
    if (isRecord(entry) && typeof entry["value"] === "boolean") {
      out[key] = entry["value"];
    }
  }
  return Object.keys(out).length > 0 ? out : null;
}

function readAuditResult(audit: RawLighthouseAudit): StoredAuditResult {
  const details = audit.details;
  const rows =
    details?.type === "table" || details?.type === "opportunity"
      ? Array.isArray(details.items)
        ? details.items.filter(isRecord)
        : []
      : null;
  const savings = [
    finite(details?.overallSavingsMs),
    finite(audit.metricSavings?.["LCP"]),
    finite(audit.metricSavings?.["FCP"]),
  ].filter((value): value is number => value !== null);
  const mainThread = rows
    ?.map((row) => finite(row["mainThreadTime"]))
    .filter((value): value is number => value !== null);
  return {
    score: finite(audit.score),
    mode: audit.scoreDisplayMode ?? null,
    savingsMs: savings.length > 0 ? Math.max(...savings) : null,
    savingsBytes:
      finite(details?.overallSavingsBytes) ??
      finite(details?.debugData?.["wastedBytes"]),
    numericValue: finite(audit.numericValue),
    itemCount: rows ? rows.length : null,
    checklist: readChecklist(details),
    mainThreadMs:
      mainThread && mainThread.length > 0
        ? Math.round(mainThread.reduce((sum, ms) => sum + ms, 0))
        : null,
    examples: (rows ?? [])
      .map(exampleOf)
      .filter((example): example is string => example !== null)
      .slice(0, MAX_EXAMPLES),
  };
}

/**
 * The verdicts of the Lighthouse audits the findings read, and nothing
 * else: a full report is megabytes, this is a few kilobytes.
 */
export function buildStoredLighthouseAudits(input: {
  audits: Record<string, RawLighthouseAudit>;
}): Record<string, StoredAuditResult> {
  const out: Record<string, StoredAuditResult> = {};
  for (const id of TRACKED_LIGHTHOUSE_AUDITS) {
    const audit = input.audits[id];
    if (isRecord(audit)) out[id] = readAuditResult(audit);
  }
  return out;
}
