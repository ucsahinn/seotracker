import { CheckCircle2, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  downloadReport,
  reportFilename,
} from "@/client/features/reports/downloadReport";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { useDoneFlash } from "@/client/lib/useDoneFlash";
import { t } from "@/shared/i18n";

/**
 * The always-visible "İndir" button, in the list row and in the viewer
 * header. One component so the busy state, the file name and the error toast
 * are the same in both places.
 *
 * Busy is `aria-disabled`, not `disabled`: a disabled button drops keyboard
 * focus mid-download, so the reader would be sent back to the top of the page.
 */
export function ReportDownloadButton({
  reportId,
  title,
  primary = false,
  label = t("İndir"),
}: {
  reportId: string;
  title: string;
  primary?: boolean;
  /** The visible text; the accessible name always starts with it. */
  label?: string;
}) {
  const [ok, setOk] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const flash = useDoneFlash(pending, ok);
  const visible = flash === "done" ? t("İndirildi") : label;

  const download = () => {
    if (pending) return;
    setPending(true);
    setOk(false);
    setErrorMessage(null);
    downloadReport(reportId, reportFilename(title))
      .then(() => {
        setOk(true);
        toast.success(t("Rapor indirildi"));
      })
      .catch((error: unknown) => {
        const message = getStandardErrorMessage(
          error,
          t("Rapor indirilemedi."),
        );
        setErrorMessage(message);
        toast.error(message);
      })
      .finally(() => setPending(false));
  };

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        className={`btn btn-sm min-h-11 gap-1.5 ${primary ? "btn-primary" : ""} ${pending ? "opacity-70" : ""}`}
        aria-disabled={pending}
        aria-busy={pending}
        aria-label={`${visible}: ${title}`}
        title={t("HTML olarak indir")}
        onClick={download}
      >
        {pending ? (
          <Loader2 aria-hidden className="size-4 animate-spin" />
        ) : flash === "done" ? (
          <CheckCircle2
            aria-hidden
            className="enter size-4 text-[var(--ink-success)]"
          />
        ) : (
          <Download aria-hidden className="size-4" />
        )}
        {visible}
      </button>
      {errorMessage ? (
        <span
          role="alert"
          className="max-w-prose text-xs text-[var(--ink-error)]"
        >
          {errorMessage}
        </span>
      ) : null}
    </span>
  );
}
