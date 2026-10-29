import { Link } from "@tanstack/react-router";
import { ChartLine } from "lucide-react";
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
      // In a table cell the full sentence ran into the number beside it
      // ("10Analytics…"); the compact form is its own short line, and keeps
      // the full name for assistive technology.
      aria-label={compact ? t("Analytics adres grubunu incele") : undefined}
      className={
        compact
          ? "mt-0.5 inline-flex min-h-6 items-center gap-1 text-xs text-primary hover:underline max-sm:min-h-11"
          : "inline-flex min-h-11 items-center text-xs text-primary underline"
      }
      title={t(
        "Kaynak sınırlıysa Analytics tam eşleşmenin doğrulanamadığını belirtir.",
      )}
    >
      {compact ? (
        <>
          <ChartLine aria-hidden className="size-3" />
          Analytics
        </>
      ) : (
        t("Analytics adres grubunu incele")
      )}
    </Link>
  );
}
