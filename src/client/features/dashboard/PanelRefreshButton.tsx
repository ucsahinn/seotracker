import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { formatDateTime } from "@/shared/format";
import { t } from "@/shared/i18n";
import { HelpTip } from "@/client/components/HelpTip";
import type { useDashboardRefresh } from "./useDashboardRefresh";
function sourceLabel(source: string) {
  if (source === "searchPerformanceView") return "Search Console";
  if (source === "ga4Overview") return "Google Analytics";
  if (source === "projectSetup") return t("Proje bilgisi");
  if (source.startsWith("google")) return "Google";
  if (source === "dashboardActivation") return t("Ayarlar");
  return t("Site denetimi");
}
type Refresh = ReturnType<typeof useDashboardRefresh>;

/**
 * When the panel's data was fetched, for the header's meta line beside the
 * domain. It used to sit in the action row ahead of Yenile, which pushed
 * Denetimler onto its own line on a phone. Phrasing content only (it renders
 * inside the header's paragraph): the per-source times are a tip, not a
 * disclosure, for the same reason.
 */
export function PanelRefreshStatus({ refresh }: { refresh: Refresh }) {
  const sources = refresh.sources
    .map(
      (source) =>
        `${sourceLabel(source.source)} · ${
          source.updatedAt
            ? formatDateTime(new Date(source.updatedAt).toISOString())
            : "–"
        }${
          source.failed
            ? ` (${t("Son yenileme başarısız; önbellekteki veriler gösteriliyor.")})`
            : ""
        }`,
    )
    .join("; ");
  return (
    <span className="inline-flex items-center gap-1.5">
      <span role="status">
        {refresh.isFetching
          ? t("Güncelleniyor")
          : refresh.outcome === "partial"
            ? t(
                "Bazı veriler yenilenemedi; önbellekteki tarihleri kontrol edin.",
              )
            : refresh.outcome === "success"
              ? t("Yenilendi")
              : refresh.dataUpdatedAt
                ? t("Veri alındı: {time}", {
                    time: formatDateTime(
                      new Date(refresh.dataUpdatedAt).toISOString(),
                    ),
                  })
                : null}
      </span>
      {sources ? <HelpTip label={t("Veri hakkında")}>{sources}</HelpTip> : null}
    </span>
  );
}

export function PanelRefreshButton({ refresh }: { refresh: Refresh }) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const el = e.target instanceof HTMLElement ? e.target : null;
      if (
        e.key.toLowerCase() !== "r" ||
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        e.defaultPrevented ||
        el?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(el?.tagName ?? "") ||
        refresh.isFetching
      )
        return;
      void refresh.onRefresh();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [refresh]);
  return (
    <button
      type="button"
      className="btn btn-sm min-h-11"
      disabled={refresh.isFetching}
      aria-busy={refresh.isFetching}
      aria-keyshortcuts="r"
      onClick={() => void refresh.onRefresh()}
    >
      <RefreshCw className="size-4" aria-hidden />
      {t("Yenile")}
    </button>
  );
}
