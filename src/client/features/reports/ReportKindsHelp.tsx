import { ChevronDown } from "lucide-react";

/**
 * Says where the reports on this screen come from. Collapsed: it is reference
 * for the first visit, and it used to sit open under the one action that
 * already answers it.
 */
export function ReportKindsHelp() {
  return (
    <details className="group rounded-box border border-[var(--hairline)] bg-base-100 px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium">
        Nasıl çalışır?
        <ChevronDown
          aria-hidden
          className="size-4 text-muted transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Ajanın yazdığı raporlar</h2>
          <p className="text-sm text-muted">
            Claude Code ya da Codex projenizi inceler ve raporu buraya kaydeder.
            &ldquo;Rapor komutunu kopyala&rdquo; ajanınıza yapıştıracağınız
            komutu kopyalar.
          </p>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Site denetimi raporu</h2>
          <p className="text-sm text-muted">
            Site denetimi ekranındaki &ldquo;Raporu indir&rdquo; hem
            bilgisayarınıza indirir hem burada saklar. Ajan gerekmez.
          </p>
        </div>
      </div>
    </details>
  );
}
