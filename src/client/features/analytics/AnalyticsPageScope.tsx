import { FactStrip } from "@/client/components/FactStrip";
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
        <div className="space-y-4" role="status">
          <FactStrip
            label={t("Analytics adres grubu")}
            facts={[
              {
                label: t("Analytics adres grubu"),
                value: <span className="break-all">{pageGroup.key}</span>,
                tone: pageGroup.complete ? undefined : "warning",
              },
            ]}
            detailsLabel={pageGroup.complete ? t("Ayrıntılar") : t("Uyarı")}
            details={
              <>
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
              </>
            }
          />
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
        <div className="space-y-4">
          <FactStrip
            label={t("Giriş sayfası")}
            facts={[
              {
                label: t("Giriş sayfası"),
                value: (
                  <span className="break-all">
                    {exactPage.host}
                    {exactPage.path}
                  </span>
                ),
              },
            ]}
            detailsLabel={t("Ayrıntılar")}
            details={
              <p>
                {t(
                  "Birebir sayfa filtresi yalnızca listelenen satırlara uygulanır; diğer sayfalarda da arayın.",
                )}
              </p>
            }
          />
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
