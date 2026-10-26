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
  const [pending, setPending] = useState(false);
  const flash = useDoneFlash(pending, ok);
  const visible = flash === "done" ? t("İndirildi") : label;

  const download = () => {
    if (pending) return;
    setPending(true);
    setOk(false);
    downloadReport(reportId, reportFilename(title))
      .then(() => {
        setOk(true);
        toast.success(t("Rapor indirildi"));
      })
      .catch((error: unknown) =>
        toast.error(
          error instanceof TypeError
            ? t("Rapor indirilemedi.")
            : getStandardErrorMessage(error, t("Rapor indirilemedi.")),
        ),
      )
      .finally(() => setPending(false));
  };

  return (
    <button
      type="button"
      className={`btn btn-sm min-h-10 gap-1.5 sm:min-h-8 ${primary ? "btn-primary" : ""} ${pending ? "opacity-70" : ""}`}
      aria-disabled={pending}
      aria-busy={pending}
      aria-label={`${visible}: ${title}`}
      title={t("HTML olarak indir")}
      onClick={download}
    >
      {pending ? (
        <Loader2 aria-hidden className="size-4 animate-spin" />
      ) : flash === "done" ? (
        <CheckCircle2 aria-hidden className="enter size-4 text-success" />
      ) : (
        <Download aria-hidden className="size-4" />
      )}
      {visible}
    </button>
  );
}
