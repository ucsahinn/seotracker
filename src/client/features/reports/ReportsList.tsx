import { Link } from "@tanstack/react-router";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { RowActions } from "@/client/components/table/RowActions";
import {
  downloadReport,
  reportFilename,
} from "@/client/features/reports/downloadReport";
import { formatCreatedBy } from "@/client/features/reports/shared";
import { formatRelativeTime } from "@/client/lib/format";
import type { ReportListItem } from "@/serverFunctions/reports";
import { REPORT_APP_LIST_LIMIT } from "@/types/schemas/reports";

export function ReportsList({
  projectId,
  reports,
  onDelete,
}: {
  projectId: string;
  reports: ReportListItem[];
  onDelete: (report: ReportListItem) => void;
}) {
  if (reports.length === 0) {
    return (
      <p className="rounded-box border border-dashed border-base-300 px-4 py-6 text-sm text-muted">
        Henüz rapor yok. Claude Code ya da Codex üzerinden seo-audit gibi bir
        seotracker becerisi çalıştırın; rapor burada görünecek.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Oluşturan</th>
              <th>Tür</th>
              <th>Güncellenme</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-base-200">
                <td className="max-w-[420px]">
                  <Link
                    to="/p/$projectId/reports/$reportId"
                    params={{ projectId, reportId: report.id }}
                    className="link link-hover font-medium"
                  >
                    {report.title}
                  </Link>
                </td>
                <td className="text-muted">{formatCreatedBy(report)}</td>
                {/* The template the report was written from, else the skill
                    that produced it: what a reader needs to tell two reports
                    on the same site apart. */}
                <td className="text-muted">
                  {report.templateName ?? report.skill ?? "—"}
                </td>
                <td className="whitespace-nowrap text-muted">
                  {formatRelativeTime(report.updatedAt)}
                </td>
                <td className="w-10 text-right">
                  <RowActions
                    label={`${report.title} için işlemler`}
                    actions={[
                      {
                        label: "İndir",
                        icon: Download,
                        onSelect: () => {
                          void downloadReport(
                            report.id,
                            reportFilename(report.title),
                          ).catch(() => toast.error("Rapor indirilemedi."));
                        },
                      },
                      {
                        label: "Sil",
                        icon: Trash2,
                        destructive: true,
                        onSelect: () => onDelete(report),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {reports.length === REPORT_APP_LIST_LIMIT ? (
        <p className="text-xs text-muted">
          En son {REPORT_APP_LIST_LIMIT} rapor gösteriliyor.
        </p>
      ) : null}
    </div>
  );
}
