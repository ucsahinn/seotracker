import { ClipboardCheck, Sparkles } from "lucide-react";

/** Says in two short cards where the reports on this screen come from. */
export function ReportKindsHelp() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="flex gap-3 rounded-box border border-base-300 bg-base-100 p-4">
        <Sparkles aria-hidden className="mt-0.5 size-5 shrink-0 text-muted" />
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Ajanın yazdığı raporlar</h2>
          <p className="text-sm text-muted">
            Claude Code ya da Codex, Site denetimi, Dönem karşılaştırması gibi
            bir beceriyle projenizi inceler ve sonucu rapor olarak buraya
            kaydeder. &ldquo;Yeni rapor iste&rdquo; düğmesi bunun için ajana
            yapıştıracağınız metni kopyalar.
          </p>
        </div>
      </div>
      <div className="flex gap-3 rounded-box border border-base-300 bg-base-100 p-4">
        <ClipboardCheck
          aria-hidden
          className="mt-0.5 size-5 shrink-0 text-muted"
        />
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">Site denetimi raporu</h2>
          <p className="text-sm text-muted">
            Site denetimi ekranındaki &ldquo;Raporu indir&rdquo; düğmesi,
            denetim sonucunu hem bilgisayarınıza indirir hem de burada saklar.
            Ajan gerekmez.
          </p>
        </div>
      </div>
    </div>
  );
}
