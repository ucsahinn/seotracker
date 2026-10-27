import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, FileDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDoneFlash } from "@/client/lib/useDoneFlash";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { createSearchReport } from "@/serverFunctions/searchReport";
import { reportsQueryKey } from "@/client/features/reports/shared";
import {
  downloadReport,
  reportFilename,
} from "@/client/features/reports/downloadReport";
import type { SearchPerformanceViewFilters } from "@/client/features/dashboard/dashboardGscReport";
import { t } from "@/shared/i18n";

/**
 * Saves the view on screen as a printable report, then hands the file over.
 * Saved first, like the audit report: the stored copy survives a tidied
 * Downloads folder and appears on the Reports screen.
 */
export function SearchReportButton({
  projectId,
  filters,
  window,
  disabled = false,
}: {
  projectId: string;
  filters: SearchPerformanceViewFilters;
  window: { startDate: string; endDate: string };
  disabled?: boolean;
}) {
  const queryClient = useQueryClient();
  const [downloaded, setDownloaded] = useState(false);

  const create = useMutation({
    onMutate: () => setDownloaded(false),
    mutationFn: () =>
      createSearchReport({
        data: {
          projectId,
          ...filters,
          window: { startDate: window.startDate, endDate: window.endDate },
        },
      }),
    onSuccess: async ({ reportId, title }) => {
      await queryClient.invalidateQueries({
        queryKey: reportsQueryKey(projectId),
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
      disabled={disabled || create.isPending}
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
