import { t } from "@/shared/i18n";
import type { ReportResult } from "./ReportView";

export function AnalyticsPageScope({
  pageGroup,
  exactPage,
  onClearPageGroup,
  onClearExactPage,
}: {
  pageGroup: ReportResult["pageGroup"];
  exactPage?: { host: string; path: string };
  onClearPageGroup?: () => void;
  onClearExactPage?: () => void;
}) {
  return (
    <>
      {pageGroup ? (
        <div className="space-y-1 text-xs text-muted" role="status">
          <p className="break-all">
            {t("Analytics adres grubu")} · {pageGroup.key}
          </p>
          <p>
            {t(
              "Adres varyantları sunucuda, sayfalamadan önce eşleştirilir. Tarihler Analytics mülkünün saat dilimindedir; Search Console Pasifik takvimini kullanır.",
            )}
          </p>
          {!pageGroup.complete ? (
            <p>
              {t(
                "Kaynak sınırlı; adres grubunun tamamı birebir doğrulanamıyor. Yalnızca alınan varyantlar gösteriliyor.",
              )}
            </p>
          ) : null}
          {onClearPageGroup ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm min-h-11"
              onClick={onClearPageGroup}
            >
              {t("Adres grubu filtresini kaldır")}
            </button>
          ) : null}
        </div>
      ) : null}
      {exactPage ? (
        <div>
          <p className="break-all text-xs text-muted">
            {exactPage.host}
            {exactPage.path} ·{" "}
            {t(
              "Birebir sayfa filtresi yalnızca listelenen satırlara uygulanır; diğer sayfalarda da arayın.",
            )}
          </p>
          {onClearExactPage ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm min-h-11"
              onClick={onClearExactPage}
            >
              {t("Sayfa filtresini kaldır")}
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
