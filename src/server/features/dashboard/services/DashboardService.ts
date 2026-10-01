import type {
  DashboardActivation,
  DashboardAuditSummary,
} from "@/types/schemas/dashboard";
import { reconcileStaleAudits } from "@/server/features/audit/services/auditReconciler";
import { ProjectRepository } from "@/server/features/projects/repositories/ProjectRepository";
import { sort } from "remeda";
import { ActivationRepository } from "@/server/features/activation/repositories/ActivationRepository";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import {
  getIssueTypePageCountsForAudit,
  getTopAffectedPagesForAudit,
} from "@/server/features/audit/repositories/auditSummaryQueries";

/** Enough to act on without turning the card into a table. */
const TOP_PAGES = 5;
import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import { GscConnectionRepository } from "@/server/features/gsc/repositories/GscConnectionRepository";
import { ProjectContextRepository } from "@/server/features/project-context/repositories/ProjectContextRepository";

type DashboardOverview = {
  audit: DashboardAuditSummary | null;
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
  return { audit: await getAuditSummary(input.projectId) };
}

async function getAuditSummary(
  projectId: string,
): Promise<DashboardAuditSummary | null> {
  // The dashboard can be the only screen an operator opens, and this card
  // rendered "tarama sürüyor" indefinitely for an audit whose workflow died.
  // See the note in `AuditService.getHistory`: the scheduled sweep does not
  // run under Docker.
  await reconcileStaleAudits();

  const audit = await AuditRepository.getLatestAuditForProject(projectId);
  if (!audit) return null;

  const [typeRows, topPages] = await Promise.all([
    getIssueTypePageCountsForAudit(audit.id),
    getTopAffectedPagesForAudit(audit.id, TOP_PAGES),
  ]);

  const severityRank = { critical: 0, warning: 1, info: 2 };
  const sorted = sort(
    typeRows.map((row) => ({
      issueType: row.issueType,
      severity: row.severity,
      count: row.pages,
    })),
    (a, b) =>
      severityRank[a.severity] - severityRank[b.severity] || b.count - a.count,
  );

  const severityTotals = { critical: 0, warning: 0, info: 0 };
  for (const row of sorted) severityTotals[row.severity] += row.count;

  return {
    auditId: audit.id,
    status: audit.status,
    pagesCrawled: audit.pagesCrawled,
    startedAt: audit.startedAt,
    topIssues: sorted.slice(0, 3),
    totalIssueTypes: sorted.length,
    severityTotals,
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
