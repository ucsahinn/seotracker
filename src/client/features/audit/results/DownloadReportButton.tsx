import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, FileDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDoneFlash } from "@/client/lib/useDoneFlash";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { createAuditReport } from "@/serverFunctions/auditReport";
import { reportsQueryKey } from "@/client/features/reports/shared";
import {
  downloadReport,
  reportFilename,
} from "@/client/features/reports/downloadReport";
import { t } from "@/shared/i18n";
import { notify } from "@/client/features/notifications/notify";

/**
 * Saves the audit as a report, then hands the file over.
 *
 * Saving first, downloading second, on purpose: a file in the Downloads
 * folder is gone the moment it is tidied away, and the audit behind it can be
 * deleted. The stored copy is the one that survives, and it shows up on the
 * Reports screen where the operator already looks for past work.
 */
export function DownloadReportButton({
  projectId,
  auditId,
}: {
  projectId: string;
  auditId: string;
}) {
  const queryClient = useQueryClient();
  // Saving can succeed while the download fails; only a file that reached
  // the browser earns the "İndirildi" moment.
  const [downloaded, setDownloaded] = useState(false);

  const create = useMutation({
    onMutate: () => setDownloaded(false),
    mutationFn: () => createAuditReport({ data: { projectId, auditId } }),
    onSuccess: async ({ reportId, title }) => {
      // The report is saved either way, so the list is refreshed first: a
      // failed download must not leave Raporlar showing a pre-save list.
      await queryClient.invalidateQueries({
        queryKey: reportsQueryKey(projectId),
      });
      notify({
        kind: "report",
        title: t("Rapor hazır"),
        body: title,
        href: `/p/${projectId}/reports/${reportId}`,
        projectId,
        importance: "low",
        dedupeKey: `report:${reportId}`,
      });
      try {
        await downloadReport(reportId, reportFilename(title));
        setDownloaded(true);
      } catch {
        toast.error(
          t(
            "Rapor kaydedildi ancak indirilemedi. Raporlar ekranından tekrar deneyin.",
          ),
        );
      }
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, t("Rapor oluşturulamadı"))),
  });

  const flash = useDoneFlash(create.isPending, downloaded);

  return (
    <button
      type="button"
      className="btn btn-sm gap-1.5"
      disabled={create.isPending}
      onClick={() => create.mutate()}
    >
      {flash === "pending" ? (
        <Loader2 className="size-4 animate-spin" />
      ) : flash === "done" ? (
        <CheckCircle2 className="enter size-4 text-success" />
      ) : (
        <FileDown className="size-4" />
      )}
      {flash === "done" ? t("İndirildi") : t("Raporu indir")}
    </button>
  );
}
