import { t } from "@/shared/i18n";

/**
 * Says where the reports on this screen come from. Collapsed: it is reference
 * for the first visit, and it used to sit open under the one action that
 * already answers it.
 */
export function ReportKindsHelp() {
  return (
    // A plain disclosure like every other reference note on the screen, not
    // a card of its own at the foot of the page.
    <details className="text-sm">
      <summary className="min-h-11 cursor-pointer py-3">
        {t("Nasıl çalışır?")}
      </summary>
      <div className="grid max-w-4xl gap-4 pb-2 sm:grid-cols-3">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">
            {t("Arama performansı raporu")}
          </h2>
          <p className="text-sm text-muted">
            {t(
              "Arama performansı ekranında dönem ve süzgeçleri seçip Raporu indir düğmesini kullanın. Kaydedilmiş raporlar kaynak bağlantısı kesilse de okunabilir.",
            )}
          </p>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">
            {t("Ajanın yazdığı raporlar")}
          </h2>
          <p className="text-sm text-muted">
            {t(
              "Claude Code ya da Codex projenizi inceler ve raporu buraya kaydeder. “Rapor komutunu kopyala” ajanınıza yapıştıracağınız komutu kopyalar.",
            )}
          </p>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">{t("Site denetimi raporu")}</h2>
          <p className="text-sm text-muted">
            {t(
              "Site denetimi ekranındaki “Raporu indir” hem bilgisayarınıza indirir hem burada saklar. Ajan gerekmez.",
            )}
          </p>
        </div>
      </div>
    </details>
  );
}
