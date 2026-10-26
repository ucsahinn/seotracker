import type {
  getAuditInsights,
  getAuditResults,
} from "@/serverFunctions/audit";

export type AuditResultsData = Awaited<ReturnType<typeof getAuditResults>>;

export type AuditInsightsData = Awaited<ReturnType<typeof getAuditInsights>>;
