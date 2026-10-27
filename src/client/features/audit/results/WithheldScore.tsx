import { CircleDashed } from "lucide-react";
import type { WithheldReason } from "@/shared/auditStanding";
import { t } from "@/shared/i18n";
import { describeAuditFailure } from "./auditFailureCopy";

/**
 * Where the score would be, on an audit that does not get one: it failed, or
 * its crawl was cut short. Its issue list is incomplete, so any number would
 * be praise for what nobody looked at. The findings below still stand.
 */
export function WithheldScore({
  reason,
  errorCode,
  failedPhase,
}: {
  reason: Exclude<WithheldReason, "empty">;
  errorCode?: string | null;
  failedPhase?: string | null;
}) {
  const failure =
    reason === "failed"
      ? describeAuditFailure({ errorCode, failedPhase })
      : null;
  return (
    <section
      aria-labelledby="audit-withheld-heading"
      className="flex items-start gap-3 rounded-box border border-[var(--hairline)] bg-base-100 p-5 shadow-[var(--shadow-raise)]"
    >
      <CircleDashed
        aria-hidden
        className="mt-0.5 size-5 shrink-0 text-subtle"
      />
      <div className="min-w-0 space-y-1">
        <h2 id="audit-withheld-heading" className="text-base font-semibold">
          {t("Eksik denetim — puan verilmedi")}
        </h2>
        <p className="max-w-prose text-sm text-muted">
          {failure
            ? `${t(failure.title, { phase: failure.phase ? t(failure.phase) : "" })} ${t(failure.cause)}`
            : reason === "cut-short"
              ? t("Tarama, sitenin istek sınırı yüzünden erken durdu.")
              : t("Denetim hâlâ çalışıyor.")}
        </p>
        <p className="max-w-prose text-sm text-muted">
          {t(
            "Sorun listesi tam olmadığı için puan hesaplanmadı. Aşağıdaki bulgular taranan sayfalar için geçerli; tam bir puan için denetimi yeniden çalıştırın.",
          )}
        </p>
      </div>
    </section>
  );
}
