/**
 * Everything around an audit that is not in its own rows: the score of the
 * audits before it, what changed since the last one, the search traffic of
 * its pages, the start page's tags and field data, and whether Google was
 * ever asked about its pages.
 *
 * Separate from `getResults` because two of these leave the database
 * (Search Console, the stored PageSpeed payload) and the results screen
 * must not wait on them. Every outside read fails soft: a disconnected
 * Search Console or a missing payload is null, never an error, and the
 * screen says "not measured".
 */
import { reverse, sort } from "remeda";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { AuditSiteFactsRepository } from "@/server/features/audit/repositories/AuditSiteFactsRepository";
import {
  getAnalyticsTagCounts,
  getAuditIdsWithLighthouseScores,
  getIssueTypeSummaries,
  getMobileRuns,
  getSchemaTypeCounts,
  getStartPageDetails,
} from "@/server/features/audit/repositories/auditInsightQueries";
import { GSC_MAX_ROW_LIMIT } from "@/server/features/gsc/searchAnalytics";
import { getIndexCoverage } from "@/server/features/gsc/services/GscIndexCoverageService";
import { GscService } from "@/server/features/gsc/services/GscService";
import { AppError } from "@/server/lib/errors";
import { isPlatformHost } from "@/server/lib/audit/site-probes/rdap";
import { readStoredLighthousePayload } from "@/server/lib/lighthousePayload";
import { getJsonFromR2 } from "@/server/lib/r2";
import {
  AUDIT_ISSUE_TYPES,
  ISSUE_SEVERITY_ORDER,
  resolveIssueSeverity,
  type IssueSeverity,
} from "@/shared/audit-issues";
import {
  buildAuditBreakdown,
  checkMeasured,
  type CheckContext,
} from "@/shared/auditBreakdown";
import type { ScoredFinding } from "@/shared/auditScore";
import { auditStanding } from "@/shared/auditStanding";
import { pageKey, siteKey } from "@/shared/auditTodo";

/** How many audits the score history shows, this one included. */
const HISTORY_SIZE = 5;

type Summary = Awaited<ReturnType<typeof getIssueTypeSummaries>>[number];

function findingsOf(rows: Summary[], pagesCrawled: number): ScoredFinding[] {
  const byType = new Map<string, ScoredFinding>();
  for (const row of rows) {
    const severity = resolveIssueSeverity(row);
    const pages = row.siteRows > 0 ? pagesCrawled : row.pages;
    const known = byType.get(row.issueType);
    byType.set(row.issueType, {
      issueType: row.issueType,
      severity,
      pages: Math.max(known?.pages ?? 0, pages),
    });
  }
  return [...byType.values()];
}

type IssueChange = {
  issueType: string;
  severity: IssueSeverity;
  /** Pages now (0 when fixed). */
  pages: number;
  /** Pages in the previous audit (0 when new). */
  previousPages: number;
};

/**
 * New and fixed findings between two audits, over the checks both of them
 * measured. A check the older audit never ran (it predates the check, or
 * its PageSpeed run failed) is not "new" because it fails now, and one this
 * audit could not measure is not "fixed" because it is silent now.
 */
function compare(
  current: { findings: ScoredFinding[]; ctx: CheckContext },
  previous: { findings: ScoredFinding[]; ctx: CheckContext },
) {
  const before = new Map(previous.findings.map((f) => [f.issueType, f]));
  const now = new Map(current.findings.map((f) => [f.issueType, f]));
  const rank = (change: IssueChange) =>
    ISSUE_SEVERITY_ORDER[change.severity] * 1e6 -
    Math.max(change.pages, change.previousPages);
  const newer = current.findings.filter((f) => !before.has(f.issueType));
  const gone = previous.findings.filter((f) => !now.has(f.issueType));
  const added = newer
    .filter((f) => checkMeasured(f.issueType, previous.ctx))
    .map((f) => ({ ...f, previousPages: 0 }));
  const fixed = gone
    .filter((f) => checkMeasured(f.issueType, current.ctx))
    .map((f) => ({
      issueType: f.issueType,
      severity: f.severity,
      pages: 0,
      previousPages: f.pages,
    }));
  return {
    added: sort(added, (a, b) => rank(a) - rank(b)),
    fixed: sort(fixed, (a, b) => rank(a) - rank(b)),
    /** Differences left out because one of the two audits did not measure them. */
    partial: added.length < newer.length || fixed.length < gone.length,
  };
}

type HistoryAudit = {
  id: string;
  pagesCrawled: number;
  analyticsCompared: boolean | null;
};

/** What each audit measured: the context its own breakdown is built with. */
async function measurementContexts(
  chosen: HistoryAudit[],
  googleInspected: (auditId: string) => Promise<boolean | null>,
): Promise<Map<string, CheckContext>> {
  const ids = chosen.map((audit) => audit.id);
  const [scored, facts, inspected] = await Promise.all([
    getAuditIdsWithLighthouseScores(ids),
    Promise.all(ids.map((id) => AuditSiteFactsRepository.getSiteFacts(id))),
    Promise.all(ids.map(googleInspected)),
  ]);
  return new Map(
    chosen.map((audit, index) => [
      audit.id,
      {
        pagesCrawled: audit.pagesCrawled,
        hasLighthouse: scored.has(audit.id),
        siteFacts: facts[index],
        googleInspected: inspected[index],
        analyticsCompared: audit.analyticsCompared,
      },
    ]),
  );
}

async function scoreHistory(
  projectId: string,
  current: { id: string; startUrl: string; startedAt: string },
  googleInspected: (auditId: string) => Promise<boolean | null>,
) {
  const key = siteKey(current.startUrl);
  const audits = await AuditRepository.getAuditsByProject(projectId);
  const earlier = audits.filter(
    (audit) =>
      audit.id !== current.id &&
      audit.status === "completed" &&
      audit.startedAt <= current.startedAt &&
      siteKey(audit.startUrl) === key,
  );
  const self = audits.find((audit) => audit.id === current.id);
  // Newest first from the repository; the chart reads oldest first.
  const chosen = [
    ...reverse(earlier.slice(0, HISTORY_SIZE - 1)),
    ...(self ? [self] : []),
  ];
  const [summaries, contexts] = await Promise.all([
    getIssueTypeSummaries(chosen.map((a) => a.id)),
    measurementContexts(chosen, googleInspected),
  ]);
  const findingsById = new Map(
    chosen.map((audit) => [
      audit.id,
      findingsOf(
        summaries.filter((row) => row.auditId === audit.id),
        audit.pagesCrawled,
      ),
    ]),
  );
  const unmeasured: CheckContext = {
    pagesCrawled: 0,
    hasLighthouse: false,
    siteFacts: null,
    googleInspected: null,
    analyticsCompared: null,
  };
  const ctxOf = (id: string) => contexts.get(id) ?? unmeasured;

  /*
   * Every point is scored over the same checks: those every audit in the
   * window measured. An audit from before a check existed scored higher
   * only because it could not fail it, and a line drawn across that read
   * as the site getting worse. A point scored on fewer checks than its
   * audit measured is marked partial, and can differ from that audit's
   * own headline score.
   */
  const known = [
    ...new Set([
      ...Object.keys(AUDIT_ISSUE_TYPES),
      ...summaries.map((row) => row.issueType),
    ]),
  ];
  /*
   * Judged on each audit's own checks, not the shared ones: a failed or
   * cut-short audit gets no point on the chart, and one that measured too
   * little is drawn as provisional (see `auditStanding`). A withheld audit
   * also does not narrow the checks the others are compared on.
   */
  const standingById = new Map(
    chosen.map((audit) => [
      audit.id,
      auditStanding(
        buildAuditBreakdown(findingsById.get(audit.id) ?? [], ctxOf(audit.id)),
        audit.status,
      ),
    ]),
  );
  const plotted = chosen.filter(
    (audit) => standingById.get(audit.id)?.kind !== "withheld",
  );
  const shared = new Set(
    known.filter((issueType) =>
      plotted.every((audit) => checkMeasured(issueType, ctxOf(audit.id))),
    ),
  );
  const history = chosen.map((audit) => {
    const ctx = ctxOf(audit.id);
    const findings = findingsById.get(audit.id) ?? [];
    const standing = standingById.get(audit.id);
    const withheld = standing?.kind === "withheld";
    return {
      auditId: audit.id,
      startedAt: audit.startedAt,
      pagesCrawled: audit.pagesCrawled,
      score: withheld
        ? null
        : buildAuditBreakdown(
            findings.filter((f) => shared.has(f.issueType)),
            ctx,
          ).score,
      withheld,
      provisional: standing?.kind === "scored" && standing.provisional,
      /** Scored without some checks this audit ran; see above. */
      partial:
        !withheld &&
        known.some(
          (issueType) =>
            !shared.has(issueType) && checkMeasured(issueType, ctx),
        ),
    };
  });
  const previous = earlier[0];
  const changes = previous
    ? {
        previousAuditId: previous.id,
        previousStartedAt: previous.startedAt,
        ...compare(
          {
            findings: findingsById.get(current.id) ?? [],
            ctx: ctxOf(current.id),
          },
          {
            findings: findingsById.get(previous.id) ?? [],
            ctx: ctxOf(previous.id),
          },
        ),
      }
    : null;
  return { history, changes };
}

/** Last 28 days of Search Console clicks per page; null when unavailable. */
type PageTraffic = {
  startDate: string;
  endDate: string;
  rows: Array<{ url: string; clicks: number; impressions: number }>;
  source?: {
    property: string;
    retrievedAt: string;
    rowLimit: number;
    fetchedRows: number;
    capped: boolean;
    timeZone: "America/Los_Angeles";
  };
};
async function pageTraffic(projectId: string): Promise<PageTraffic | null> {
  try {
    const result = await GscService.getPerformance({
      projectId,
      dimensions: ["page"],
      dateRange: "last_28_days",
      rowLimit: GSC_MAX_ROW_LIMIT,
    });
    /*
     * One row per page as `pageKey` sees it. Search Console keeps
     * http:// and https://, www and bare, and reordered query strings
     * apart; every consumer keys a map by pageKey, and two rows on one key
     * used to overwrite each other instead of adding up.
     */
    const byKey = new Map<
      string,
      { url: string; clicks: number; impressions: number }
    >();
    for (const row of result.rows) {
      const url = row.keys?.[0] ?? "";
      const known = byKey.get(pageKey(url));
      if (known) {
        known.clicks += row.clicks;
        known.impressions += row.impressions;
      } else {
        byKey.set(pageKey(url), {
          url,
          clicks: row.clicks,
          impressions: row.impressions,
        });
      }
    }
    return {
      source: {
        property: result.siteUrl,
        retrievedAt: new Date().toISOString(),
        rowLimit: GSC_MAX_ROW_LIMIT,
        fetchedRows: result.rows.length,
        capped: result.rows.length >= GSC_MAX_ROW_LIMIT,
        timeZone: "America/Los_Angeles",
      },
      startDate: result.request.startDate,
      endDate: result.request.endDate,
      rows: [...byKey.values()],
    };
  } catch {
    return null;
  }
}

/**
 * Field (CrUX) and lab numbers from the start page's stored mobile run.
 *
 * The start page is the crawled row at the start address (or the shallowest
 * page, which is where a redirect from it lands). When its run failed or was
 * never made, the shallowest page that was measured stands in, labelled with
 * its own address so the screen never passes it off as the start page.
 * `speedError` says why the start page itself has no numbers.
 */
async function startPageSpeed(
  startUrl: string,
  auditId: string,
  startPageId: string | null,
) {
  try {
    const runs = await getMobileRuns(auditId);
    const startKey = pageKey(startUrl);
    const isStart = (run: (typeof runs)[number]) =>
      run.pageId === startPageId || pageKey(run.url) === startKey;
    const startRun = runs.find(isStart);
    const run = startRun?.r2Key
      ? startRun
      : runs.find((candidate) => candidate.r2Key !== null);
    const speedError = startRun?.r2Key
      ? null
      : (startRun?.errorMessage ??
        runs.find((candidate) => candidate.errorMessage)?.errorMessage ??
        null);
    if (!run?.r2Key) return { speed: null, speedError };
    const { storedPayload } = readStoredLighthousePayload(
      await getJsonFromR2(run.r2Key),
    );
    if (!storedPayload) return { speed: null, speedError };
    const metric = (name: keyof typeof storedPayload.metrics) =>
      storedPayload.metrics[name].numericValue;
    return {
      speedError,
      speed: {
        /** The measured page; not the start page when `isStartPage` is false. */
        url: run.url,
        isStartPage: isStart(run),
        fetchedAt: storedPayload.metadata.fetchedAt,
        page: storedPayload.fieldData ?? null,
        origin: storedPayload.originFieldData ?? null,
        /** The mobile run's final screenshot as a data URI, when kept. */
        screenshot: storedPayload.screenshot ?? null,
        lab: {
          lcpMs: metric("largestContentfulPaint"),
          cls: metric("cumulativeLayoutShift"),
          inpMs: metric("interactionToNextPaint"),
          fcpMs: metric("firstContentfulPaint"),
          ttfbMs: metric("serverResponseTime"),
          tbtMs: metric("totalBlockingTime"),
        },
      },
    };
  } catch {
    return { speed: null, speedError: null };
  }
}

export async function getAuditInsights(input: {
  projectId: string;
  auditId: string;
}) {
  const audit = await AuditRepository.getAuditForProject(
    input.auditId,
    input.projectId,
  );
  if (!audit) throw new AppError("NOT_FOUND");

  const startPage = await getStartPageDetails(audit.id, audit.startUrl);
  // At most HISTORY_SIZE audit populations; reuse the selected audit's read.
  const inspections = new Map<string, Promise<boolean | null>>();
  const googleInspected = (auditId: string) => {
    let pending = inspections.get(auditId);
    if (!pending) {
      pending = getIndexCoverage({ projectId: input.projectId, auditId })
        .then((coverage) => coverage.asked > 0)
        .catch(() => null);
      inspections.set(auditId, pending);
    }
    return pending;
  };
  const [scores, traffic, measured, analyticsTags, schemaTypes, inspected] =
    await Promise.all([
      scoreHistory(input.projectId, audit, googleInspected),
      pageTraffic(input.projectId),
      startPageSpeed(audit.startUrl, audit.id, startPage?.id ?? null),
      getAnalyticsTagCounts(audit.id),
      getSchemaTypeCounts(audit.id),
      googleInspected(audit.id),
    ]);

  return {
    history: scores.history,
    changes: scores.changes,
    traffic,
    startPage,
    speed: measured.speed,
    speedError: measured.speedError,
    analyticsTags: sort(analyticsTags, (a, b) => b.pages - a.pages),
    schemaTypes: sort(schemaTypes, (a, b) => b.pages - a.pages),
    googleInspected: inspected,
    /*
     * A host under a platform's suffix (*.pages.dev, *.github.io): its
     * registration and DNS belong to the platform, so the domain checks say
     * nothing about the site.
     */
    platformHost: isPlatformHost(new URL(audit.startUrl).hostname),
  };
}

export type AuditInsights = Awaited<ReturnType<typeof getAuditInsights>>;
