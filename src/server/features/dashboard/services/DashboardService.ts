import type {
  DashboardActivation,
  DashboardAuditSummary,
} from "@/types/schemas/dashboard";
import { reconcileStaleAudits } from "@/server/features/audit/services/auditReconciler";
import { ProjectRepository } from "@/server/features/projects/repositories/ProjectRepository";
import { panelFindingCounts } from "@/shared/panelAudit";
import { sort } from "remeda";
import { ActivationRepository } from "@/server/features/activation/repositories/ActivationRepository";
import { getPanelAuditSelection } from "@/server/features/audit/services/panelAuditSelection";
import { AuditService } from "@/server/features/audit/services/AuditService";
import { buildAuditBreakdown } from "@/shared/auditBreakdown";
import { findingsFromIssues } from "@/shared/auditScore";
import { auditStanding, crawlLimitNote } from "@/shared/auditStanding";
import { getIndexCoverage } from "@/server/features/gsc/services/GscIndexCoverageService";
import {
  getIssueTypePageCountsForAudit,
  getTopAffectedPagesForAudit,
} from "@/server/features/audit/repositories/auditSummaryQueries";

/** Enough to act on without turning the card into a table. */
const TOP_PAGES = 5;
import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import { GscConnectionRepository } from "@/server/features/gsc/repositories/GscConnectionRepository";
import { ProjectContextRepository } from "@/server/features/project-context/repositories/ProjectContextRepository";
import { storedAuditErrorCode } from "@/server/lib/audit/audit-errors";

type DashboardOverview = {
  audit: DashboardAuditSummary | null;
  latestAttempt: {
    auditId: string;
    status: string;
    startUrl: string;
    startedAt: string;
    pagesCrawled: number;
    errorCode: string | null;
    failedPhase: string | null;
  } | null;
  domain: string | null;
};

async function getActivation(input: {
  userId: string;
  projectId: string;
  organizationId: string;
  domain: string | null;
}): Promise<DashboardActivation> {
  const [
    ga4,
    gsc,
    orgActivation,
    projectActivation,
    projectCount,
    dismissed,
    hasProjectContext,
  ] = await Promise.all([
    Ga4ConnectionRepository.getByProjectId(input.projectId),
    GscConnectionRepository.getByProjectId(input.projectId),
    ActivationRepository.getOrganizationActivation(input.organizationId),
    ActivationRepository.getProjectActivation(input.projectId),
    ProjectRepository.countProjects(input.organizationId),
    ActivationRepository.getDismissedSteps(input.userId, input.projectId),
    ProjectContextRepository.hasAnySection(input.projectId),
  ]);

  return {
    domain: input.domain,
    hasMultipleProjects: projectCount > 1,
    hasProjectContext,
    dismissedSteps: dismissed.map((row) => row.step),
    ga4: {
      connected: ga4 !== null,
      propertyDisplayName: ga4?.propertyDisplayName ?? null,
      cardDismissedAt: projectActivation?.ga4CardDismissedAt ?? null,
    },
    gsc: { connected: gsc !== null, siteUrl: gsc?.siteUrl ?? null },
    mcp: {
      firstToolCallAt: orgActivation?.firstMcpToolCallAt ?? null,
    },
  };
}

async function getOverview(input: {
  projectId: string;
}): Promise<DashboardOverview> {
  await reconcileStaleAudits();
  const selection = await getPanelAuditSelection(input.projectId);
  const attempt = selection.latestAttempt;
  return {
    domain: selection.domain,
    audit: await getAuditSummary(
      input.projectId,
      selection.snapshot ?? attempt,
    ),
    latestAttempt: attempt
      ? {
          auditId: attempt.id,
          status: attempt.status,
          startUrl: attempt.startUrl,
          startedAt: attempt.startedAt,
          pagesCrawled: attempt.pagesCrawled,
          errorCode: storedAuditErrorCode(attempt),
          failedPhase: attempt.failedPhase,
        }
      : null,
  };
}

async function getAuditSummary(
  projectId: string,
  audit: Awaited<ReturnType<typeof getPanelAuditSelection>>["snapshot"],
): Promise<DashboardAuditSummary | null> {
  // The dashboard can be the only screen an operator opens, and this card
  // rendered "tarama sürüyor" indefinitely for an audit whose workflow died.
  // See the note in `AuditService.getHistory`: the scheduled sweep does not
  // run under Docker.
  if (!audit) return null;

  const [typeRows, topPages, results, insights] = await Promise.all([
    getIssueTypePageCountsForAudit(audit.id),
    getTopAffectedPagesForAudit(audit.id, TOP_PAGES),
    AuditService.getResults(audit.id, projectId),
    getIndexCoverage({ projectId, auditId: audit.id })
      .then((coverage) => coverage.asked > 0)
      .catch(() => null),
  ]);

  const severityRank = { critical: 0, warning: 1, info: 2 };
  const sorted = sort(
    typeRows.map((row) => ({
      issueType: row.issueType,
      severity: row.severity,
      count: row.pages,
      siteLevel: !results.issues.some(
        (issue) => issue.issueType === row.issueType && issue.pageId !== null,
      ),
    })),
    (a, b) =>
      severityRank[a.severity] - severityRank[b.severity] || b.count - a.count,
  );

  const counts = panelFindingCounts(results.issues);

  const breakdown = buildAuditBreakdown(
    findingsFromIssues(results.issues, audit.pagesCrawled),
    {
      pagesCrawled: audit.pagesCrawled,
      hasLighthouse: results.lighthouse.some(
        (row) => row.performanceScore !== null,
      ),
      siteFacts: results.siteFacts,
      googleInspected: insights,
      analyticsCompared: results.audit.analyticsCompared,
    },
  );
  return {
    startUrl: results.audit.startUrl,
    standing: auditStanding(breakdown, audit.status),
    coverage: {
      measured: breakdown.categories.reduce(
        (n, c) => n + c.passed + c.failed,
        0,
      ),
      total: breakdown.checks.length,
    },
    limitNote: crawlLimitNote({
      pagesCrawled: audit.pagesCrawled,
      maxPages: results.audit.config.maxPages,
      urlsDiscovered: audit.urlsDiscovered,
      sitemapUrls:
        results.siteFacts?.sitemap.onHostUrlCount ??
        results.siteFacts?.sitemap.urlCount,
    }),
    affectedPages: counts.affectedPages,
    siteSeverityTotals: counts.siteSeverityTotals,
    severityCheckTypes: counts.severityCheckTypes,
    auditId: audit.id,
    status: audit.status,
    pagesCrawled: audit.pagesCrawled,
    startedAt: audit.startedAt,
    errorCode: storedAuditErrorCode(audit),
    failedPhase: audit.failedPhase,
    topIssues: sorted.slice(0, 3),
    totalIssueTypes: sorted.length,
    severityTotals: counts.severityTotals,
    topPages: topPages.map((row) => ({
      pageUrl: row.pageUrl,
      issueCount: row.issueCount,
    })),
  };
}

export const DashboardService = {
  setStepDismissed: ActivationRepository.setStepDismissed,
  getActivation,
  getOverview,
};
