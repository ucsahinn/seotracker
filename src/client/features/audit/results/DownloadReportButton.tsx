import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { createAuditReport } from "@/serverFunctions/auditReport";
import { reportsQueryKey } from "@/client/features/reports/shared";
import {
  downloadReport,
  reportFilename,
} from "@/client/features/reports/downloadReport";

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

  const create = useMutation({
    mutationFn: () => createAuditReport({ data: { projectId, auditId } }),
    onSuccess: async ({ reportId, title }) => {
      // The report is saved either way, so the list is refreshed first: a
      // failed download must not leave Raporlar showing a pre-save list.
      await queryClient.invalidateQueries({
        queryKey: reportsQueryKey(projectId),
      });
      await downloadReport(reportId, reportFilename(title));
      toast.success("Rapor indirildi ve Raporlar sekmesine kaydedildi.");
    },
    onError: (error) =>
      toast.error(getStandardErrorMessage(error, "Rapor oluşturulamadı")),
  });

  return (
    <button
      type="button"
      className="btn btn-sm gap-1.5"
      disabled={create.isPending}
      onClick={() => create.mutate()}
    >
      {create.isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <FileDown className="size-4" />
      )}
      Raporu indir
    </button>
  );
}
