import { formatRelativeTime } from "@/client/lib/relative-time";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDeleteModal } from "@/client/components/ConfirmDeleteModal";
import { Modal } from "@/client/components/Modal";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import {
  deleteReport,
  type ReportListItem,
} from "@/serverFunctions/reports";

// Query keys for both reports pages. staleTime is 0 wherever these are used:
// the pages exist to inspect what an agent just wrote, so the app-wide
// five-minute staleTime would show a pre-save list as current.
export const reportsQueryKey = (projectId: string) =>
  ["reports", projectId] as const;

export const reportQueryKey = (projectId: string, reportId: string) =>
  ["report", projectId, reportId] as const;

/**
 * "Ben · Claude Code". The person is the half that means something (it comes
 * from the session); the client half is a self-reported hint, so it stands
 * alone when the user cannot be resolved.
 */
export function formatCreatedBy(report: ReportListItem): string {
  return report.createdByName
    ? `${report.createdByName} · ${report.createdBy}`
    : report.createdBy;
}

/**
 * One delete flow for both the list row and the detail page, so the toast, the
 * event and the invalidation cannot drift apart.
 */
export function useDeleteReport(projectId: string, onDeleted?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reportId: string) =>
      deleteReport({ data: { projectId, reportId } }),
    onSuccess: (_result, reportId) => {
      captureClientEvent("report:deleted", {
        project_id: projectId,
        report_id: reportId,
      });
      toast.success("Report deleted");
      void queryClient.invalidateQueries({
        queryKey: reportsQueryKey(projectId),
      });
      // Drop the detail entry too, or a later visit to that URL renders the
      // deleted report from cache before the refetch turns it into a 404.
      queryClient.removeQueries({
        queryKey: reportQueryKey(projectId, reportId),
      });
      onDeleted?.();
    },
    onError: (error: Error) => {
      toast.error(
        getStandardErrorMessage(error, "Failed to delete the report"),
      );
    },
  });
}

/** Reports have no version history and no undo, so deletes are confirmed by name. */
export function DeleteReportModal({
  title,
  isPending,
  onClose,
  onConfirm,
}: {
  title: string;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ConfirmDeleteModal
      title={`Delete \u201c${title}\u201d?`}
      detail="This cannot be undone."
      confirmLabel="Delete report"
      isPending={isPending}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

