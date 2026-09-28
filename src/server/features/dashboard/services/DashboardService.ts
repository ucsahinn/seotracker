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

export type DashboardActivation = {
  domain: string | null;
  ga4: {
    connected: boolean;
    propertyDisplayName: string | null;
    cardDismissedAt: string | null;
  };
  gsc: { connected: boolean; siteUrl: string | null };
  mcp: {
    firstToolCallAt: string | null;
  };
  hasMultipleProjects: boolean;
  /**
   * Whether the project has any stored context.
   *
   * Empty context is the quietest of the setup gaps: every screen renders,
   * nothing errors, and the audit runs -- but an agent asking "which of
   * these pages earns money" has nothing to read, and the report templates
   * fill in generic prose. Nothing on the dashboard said so.
   */
  hasProjectContext: boolean;
  dismissedSteps: string[];
};

export type DashboardAuditSummary = {
  /**
   * The audit this card is describing.
   *
   * Without it "Ayrıntılar" linked to `/audit` with no id, which renders the
   * launch form and the history table -- so an operator who read "474 sayfa
   * tarandı · 3 kritik" and clicked through landed on a form asking them to
   * start a new crawl.
   */
  auditId: string;
  status: "running" | "completed" | "failed";
  pagesCrawled: number;
  startedAt: string;
  // Top issue types by severity then affected-page count, for the card's list.
  topIssues: {
    issueType: string;
    severity: "critical" | "warning" | "info";
    count: number;
  }[];
  totalIssueTypes: number;
  /**
   * Severity totals across every finding, not only the three shown.
   *
   * "+ N sorun daha" hid whether the rest contained criticals, so the card
   * could look calm while the worst of it was one line below the fold.
   */
  severityTotals: { critical: number; warning: number; info: number };
  /**
   * The pages with the most wrong with them.
   *
   * The card named issue types and never pages, and opening a page is
   * always the operator's next move.
   */
  topPages: { pageUrl: string; issueCount: number }[];
};

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
