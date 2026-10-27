import { ChevronDown } from "lucide-react";
import { t } from "@/shared/i18n";

/**
 * Says where the reports on this screen come from. Collapsed: it is reference
 * for the first visit, and it used to sit open under the one action that
 * already answers it.
 */
export function ReportKindsHelp() {
  return (
    <details className="group rounded-box border border-[var(--hairline)] bg-base-100 px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium">
        {t("Nasıl çalışır?")}
        <ChevronDown
          aria-hidden
          className="size-4 text-muted transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
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
