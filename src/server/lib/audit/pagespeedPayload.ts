import { z } from "zod";
import {
  buildStoredLighthouseIssues,
  buildStoredLighthouseMetrics,
  type RawLighthouseAudit,
  type RawLighthouseCategory,
  scoreToPercent,
  type StoredLighthousePayload,
  storedLighthousePayloadSchema,
} from "@/server/lib/lighthouseStoredPayload";
import type { LighthouseStrategy } from "./types";

/**
 * Request-side category names. PageSpeed Insights takes them SCREAMING_CASE and
 * returns them kebab-case, so these are deliberately not the response keys.
 */
export const PAGESPEED_CATEGORIES = [
  "PERFORMANCE",
  "ACCESSIBILITY",
  "BEST_PRACTICES",
  "SEO",
] as const;

const lighthouseResultSchema = z.object({
  requestedUrl: z.string().optional(),
  finalUrl: z.string().optional(),
  finalDisplayedUrl: z.string().optional(),
  mainDocumentUrl: z.string().optional(),
  lighthouseVersion: z.string().optional(),
  runtimeError: z
    .object({ code: z.string().optional(), message: z.string().optional() })
    .optional(),
  // Only the key map is copied here, so the multi-MB category/audit bodies stay
  // as the provider's own objects. Deep-parsing them cloned the whole report a
  // second time and pushed the audit worker over its memory limit.
  categories: z
    .record(z.string(), z.custom<RawLighthouseCategory>())
    .optional(),
  audits: z.record(z.string(), z.custom<RawLighthouseAudit>()).optional(),
});

const fieldMetricSchema = z.object({
  percentile: z.number().optional(),
});

const pagespeedResponseSchema = z.object({
  analysisUTCTimestamp: z.string().optional(),
  lighthouseResult: lighthouseResultSchema.optional(),
  loadingExperience: z
    .object({
      // Set when the URL itself has no field data and Google substituted
      // origin-wide numbers. Those describe the whole site, not this page.
      origin_fallback: z.boolean().optional(),
      metrics: z
        .record(z.string(), fieldMetricSchema.optional())
        .optional(),
    })
    .optional(),
});

const apiErrorSchema = z.object({
  error: z
    .object({
      message: z.string().optional(),
      status: z.string().optional(),
    })
    .optional(),
});

function summarizeZodIssues(error: z.ZodError, maxIssues = 3): string {
  return error.issues
    .slice(0, maxIssues)
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "<root>";
      return `${path}: ${issue.message}`;
    })
    .join("; ");
}

/** Pulls a readable message out of a PageSpeed Insights error body. */
export function readPageSpeedApiError(status: number, body: unknown): string {
  const parsed = apiErrorSchema.safeParse(body);
  const message = parsed.success ? parsed.data.error?.message : undefined;
  return message
    ? `PageSpeed Insights ${status}: ${message}`
    : `PageSpeed Insights request failed with HTTP ${status}`;
}

/**
 * Lighthouse runtime errors (NO_FCP, ERRORED_DOCUMENT_REQUEST, NOT_HTML) are
 * properties of the page being measured, so they fail identically on a retry.
 * PageSpeed reports them across several HTTP statuses, which is why this reads
 * the message rather than the status.
 */
export function isLighthouseRuntimeError(message: string): boolean {
  return /Lighthouse returned error|ERRORED_DOCUMENT_REQUEST|NO_FCP|NOT_HTML|INVALID_URL|DNS_FAILURE|FAILED_DOCUMENT_REQUEST/i.test(
    message,
  );
}

/**
 * Interaction to Next Paint is not part of the lab run: Lighthouse cannot
 * simulate a real interaction. PageSpeed returns it as field data collected
 * from real Chrome users, which is what the audit table's INP column shows.
 */
function readFieldInp(
  loadingExperience:
    | z.infer<typeof pagespeedResponseSchema>["loadingExperience"]
    | undefined,
) {
  if (!loadingExperience || loadingExperience.origin_fallback) return null;
  const percentile =
    loadingExperience.metrics?.INTERACTION_TO_NEXT_PAINT?.percentile;
  if (typeof percentile !== "number") return null;
  return {
    score: null,
    displayValue: `${percentile} ms`,
    numericValue: percentile,
  };
}

export function parsePageSpeedPayload(
  payload: unknown,
  input: { url: string; strategy: LighthouseStrategy },
): StoredLighthousePayload {
  // Only the envelope scalars are validated up front. The report is reduced
  // straight into the compact stored payload, which is then validated in full
  // below — the same fields the whole-report schema would check, at kilobyte
  // size instead of multi-megabyte.
  const parsed = pagespeedResponseSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(
      `PageSpeed Insights returned an invalid response: ${summarizeZodIssues(parsed.error)}`,
    );
  }

  const result = parsed.data.lighthouseResult;
  if (!result) {
    throw new Error("PageSpeed Insights response missing lighthouseResult");
  }

  const runtimeError = result.runtimeError;
  if (runtimeError?.code && runtimeError.code !== "NO_ERROR") {
    throw new Error(
      `Lighthouse returned error: ${runtimeError.code}${
        runtimeError.message ? ` — ${runtimeError.message}` : ""
      }`,
    );
  }

  const categories = result.categories ?? {};
  const audits = result.audits ?? {};
  const issueReport = buildStoredLighthouseIssues({ audits, categories });
  const metrics = buildStoredLighthouseMetrics({ audits });
  const fieldInp = readFieldInp(parsed.data.loadingExperience);

  const storedPayload: StoredLighthousePayload = {
    version: 2,
    source: "pagespeed-insights",
    hasIssueDetails: issueReport.hasIssueDetails,
    metadata: {
      requestedUrl: result.requestedUrl ?? input.url,
      finalUrl:
        result.finalUrl ??
        result.finalDisplayedUrl ??
        result.mainDocumentUrl ??
        input.url,
      strategy: input.strategy,
      // PageSpeed serves a cached analysis for a recently-checked URL, so its
      // own timestamp is truthful where a local clock read would not be.
      fetchedAt: parsed.data.analysisUTCTimestamp ?? new Date().toISOString(),
      lighthouseVersion: result.lighthouseVersion ?? null,
    },
    scores: {
      performance: scoreToPercent(categories.performance?.score),
      accessibility: scoreToPercent(categories.accessibility?.score),
      "best-practices": scoreToPercent(categories["best-practices"]?.score),
      seo: scoreToPercent(categories.seo?.score),
    },
    metrics: {
      ...metrics,
      interactionToNextPaint:
        metrics.interactionToNextPaint.numericValue == null && fieldInp
          ? fieldInp
          : metrics.interactionToNextPaint,
    },
    issues: issueReport.issues,
  };

  const allScoresMissing = Object.values(storedPayload.scores).every(
    (score) => score == null,
  );
  if (allScoresMissing) {
    throw new Error(
      `PageSpeed Insights returned no category scores for ${storedPayload.metadata.finalUrl}`,
    );
  }

  // Without this, an off-spec provider field (a numeric audit title, say) would
  // be stored and then fail to parse on read, silently blanking the page's
  // whole Lighthouse view instead of failing the check.
  const validated = storedLighthousePayloadSchema.safeParse(storedPayload);
  if (!validated.success) {
    throw new Error(
      `PageSpeed Insights returned an invalid report: ${summarizeZodIssues(validated.error)}`,
    );
  }

  return storedPayload;
}
