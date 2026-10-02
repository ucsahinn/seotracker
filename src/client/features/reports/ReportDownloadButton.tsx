import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  downloadReport,
  reportFilename,
} from "@/client/features/reports/downloadReport";
import { getStandardErrorMessage } from "@/client/lib/error-messages";

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
  label = "İndir",
}: {
  reportId: string;
  title: string;
  primary?: boolean;
  /** The visible text; the accessible name always starts with it. */
  label?: string;
}) {
  const [pending, setPending] = useState(false);

  const download = () => {
    if (pending) return;
    setPending(true);
    downloadReport(reportId, reportFilename(title))
      .then(() => toast.success("Rapor indirildi"))
      .catch((error: unknown) =>
        toast.error(
          error instanceof TypeError
            ? "Rapor indirilemedi."
            : getStandardErrorMessage(error, "Rapor indirilemedi."),
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
      aria-label={`${label}: ${title}`}
      title="HTML olarak indir"
      onClick={download}
    >
      {pending ? (
        <Loader2 aria-hidden className="size-4 animate-spin" />
      ) : (
        <Download aria-hidden className="size-4" />
      )}
      {label}
    </button>
  );
}
