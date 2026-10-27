import { Link } from "@tanstack/react-router";
import { normalizePageKey } from "@/shared/normalizePageKey";
import { t } from "@/shared/i18n";
import type { OpportunityRow } from "./opportunityLogic";

/** Opens the shared address cohort, never a substring or a single raw variant. */
export function OpportunityAnalyticsLink({
  row,
  projectId,
  dateRange,
}: {
  row: OpportunityRow;
  projectId: string;
  dateRange?: { startDate: string; endDate: string };
}) {
  if (
    !dateRange ||
    !row.joinPrecision ||
    !row.normalizedPage ||
    normalizePageKey(row.page) !== row.normalizedPage
  ) {
    return (
      <span className="text-xs text-muted">
        {t("Analytics adres grubu birebir eşleştirilemiyor.")}
      </span>
    );
  }
  return (
    <Link
      to="/p/$projectId/analytics"
      params={{ projectId }}
      search={{
        view: "landing_pages",
        channel: "organic_search",
        offset: 0,
        limit: 50,
        audience: "device",
        acquisition: "channel_group",
        windowDays: 28,
        pageGroup: row.normalizedPage,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }}
      className="inline-flex min-h-11 items-center text-xs text-primary underline"
      title={t(
        "Kaynak sınırlıysa Analytics tam eşleşmenin doğrulanamadığını belirtir.",
      )}
    >
      {t("Analytics adres grubunu incele")}
    </Link>
  );
}
