import { Link } from "@tanstack/react-router";
import { normalizePageKey } from "@/shared/normalizePageKey";
import { t } from "@/shared/i18n";
import type { OpportunityRow } from "./opportunityLogic";

/** Opens the shared address cohort, never a substring or a single raw variant. */
export function OpportunityAnalyticsLink({
  row,
  projectId,
  dateRange,
  compact = false,
}: {
  row: OpportunityRow;
  projectId: string;
  compact?: boolean;
  dateRange?: { startDate: string; endDate: string };
}) {
  if (!row.ga4 && !row.joinPrecision && row.joinStatus === "gsc_only") {
    return compact ? null : (
      <span className="text-xs text-muted">
        {t("Bu sayfa için eşleşen Analytics verisi dönmedi.")}
      </span>
    );
  }
  if (
    !dateRange ||
    !row.joinPrecision ||
    !row.normalizedPage ||
    normalizePageKey(row.page) !== row.normalizedPage
  ) {
    return compact ? null : (
      <span className="text-xs text-muted">
        {t(
          !dateRange
            ? "Analytics bağlantısı için rapor tarihleri eksik."
            : !row.normalizedPage ||
                normalizePageKey(row.page) !== row.normalizedPage
              ? "Sayfa adresi Analytics bağlantısı için doğrulanamadı."
              : "Analytics eşleşmesi doğrulanamadı; nedeni bilinmiyor.",
        )}
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
