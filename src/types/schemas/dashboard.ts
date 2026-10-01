import { z } from "zod";

export const dashboardProjectInputSchema = z.object({
  projectId: z.string().min(1),
});

export const dashboardSetupStepSchema = z.enum([
  "domain",
  "project",
  "mcp",
  "gsc",
  "context",
]);
export type DashboardSetupStep = z.infer<typeof dashboardSetupStepSchema>;
export const dashboardStepDismissalSchema = dashboardProjectInputSchema.extend({
  step: dashboardSetupStepSchema,
  dismissed: z.boolean(),
});

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
