import { AUDIT_ISSUE_TYPES } from "@/shared/audit-issues";
import type { DashboardAuditSummary } from "@/types/schemas/dashboard";
import type { PanelAction } from "./NextStepsCard";
import { TriangleAlert } from "lucide-react";
import { formatCount } from "@/shared/format";
import { t } from "@/shared/i18n";

export function warningAction(
  audit: Pick<
    DashboardAuditSummary,
    "auditId" | "severityTotals" | "severityCheckTypes"
  > & { topIssues?: DashboardAuditSummary["topIssues"] },
  params: { projectId: string },
): PanelAction {
  const findingTypes = audit.severityCheckTypes ?? audit.severityTotals;
  // The dashboard summary already ranks issues by severity and affected pages.
  const warning = audit.topIssues?.find(
    (issue) => issue.severity === "warning",
  );
  const definitions: Record<string, { title: string } | undefined> =
    AUDIT_ISSUE_TYPES;
  const title = warning ? definitions[warning.issueType]?.title : undefined;
  return {
    key: "warnings",
    icon: TriangleAlert,
    title:
      warning && title
        ? t("{issue} — {scope}", {
            issue: t(title),
            scope: warning.siteLevel
              ? t("Site geneli")
              : t("{count} sayfa", { count: formatCount(warning.count) }),
          })
        : audit.severityCheckTypes
          ? t("{count} uyarı türünü inceleyin", {
              count: formatCount(findingTypes.warning),
            })
          : t("Uyarı bulgularını inceleyin"),
    detail: audit.severityCheckTypes
      ? t(
          "{types} uyarı türü / {findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.",
          {
            types: formatCount(findingTypes.warning),
            findings: formatCount(audit.severityTotals.warning),
          },
        )
      : t("{findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.", {
          findings: formatCount(audit.severityTotals.warning),
        }),
    to: "/p/$projectId/audit",
    params,
    search: {
      auditId: audit.auditId,
      tab: "issues",
      severity: "warning",
      ...(warning ? { issueType: warning.issueType } : {}),
    },
    cta: t("Gör"),
  };
}
