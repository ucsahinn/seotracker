import { PageShell } from "@/client/components/PageShell";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import {
  exportAuditLighthouseIssues,
  getAuditLighthouseIssues,
} from "@/serverFunctions/lighthouse";
import { downloadFile } from "@/client/lib/download";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { exportTableToSheets } from "@/client/lib/exportToSheets";
import type { CategoryTab, ExportPayload, LighthouseIssue } from "./types";
import { categoryIssuePhrase, issuesToCsv, issuesToTable } from "./utils";
import {
  LighthouseIssueList,
  LighthouseIssuesHeader,
  LighthouseIssuesToolbar,
} from "./LighthouseIssuesParts";
import { categoryTabs } from "./types";

type LighthouseIssuesScreenProps = {
  projectId: string;
  resultId: string;
  category: CategoryTab;
  backLabel: string;
  onBack: () => void;
  onCategoryChange: (next: CategoryTab) => void;
};

export function LighthouseIssuesScreen(props: LighthouseIssuesScreenProps) {
  const { projectId, resultId, category, backLabel, onBack, onCategoryChange } =
    props;

  const issuesQuery = useQuery({
    queryKey: ["auditLighthouseIssues", projectId, resultId],
    queryFn: () =>
      getAuditLighthouseIssues({
        data: {
          projectId,
          resultId,
        },
      }),
  });

  const exportMutation = useMutation({
    mutationFn: (
      data: ExportPayload,
    ): Promise<{ filename: string; content: string }> =>
      exportAuditLighthouseIssues({
        data: {
          projectId,
          resultId,
          ...data,
        },
      }),
  });

  const {
    allIssues,
    categoryCounts,
    categoryPhrase,
    runCopy,
    runExport,
    runExportCsv,
    runExportSheets,
    severityCounts,
    visibleIssues,
  } = useLighthouseIssuesActions({
    category,
    exportMutation,
    allIssues: issuesQuery.data?.issues ?? [],
  });

  const issuesErrorMessage = getStandardErrorMessage(
    issuesQuery.error,
    "Lighthouse sorunları yüklenemedi.",
  );
  const showsLegacyPayloadNotice =
    issuesQuery.data != null && !issuesQuery.data.hasIssueDetails;
  const emptyMessage = showsLegacyPayloadNotice
    ? "Bu denetim, Lighthouse sorun ayrıntıları olmadan kaydedilmiş. Bu ekranı doldurmak için denetimi yeniden çalıştırın."
    : undefined;

  return (
    <PageShell>
      <LighthouseIssuesHeader
        backLabel={backLabel}
        onBack={onBack}
        scannedAt={issuesQuery.data?.createdAt}
        finalUrl={issuesQuery.data?.finalUrl}
        scores={issuesQuery.data?.scores}
        metrics={issuesQuery.data?.metrics}
        fieldData={issuesQuery.data?.fieldData}
        severityCounts={severityCounts}
      />

      <div className="card bg-base-100 border border-base-300">
        <div className="card-body gap-4">
          {issuesQuery.isError ? (
            <div className="alert alert-error">
              <AlertCircle className="size-4" />
              <span>{issuesErrorMessage}</span>
            </div>
          ) : null}

          {showsLegacyPayloadNotice ? (
            <div className="alert alert-warning">
              <TriangleAlert className="size-4" />
              <span>
                Bu Lighthouse çalışması, sorun ayrıntıları saklanmaya başlamadan
                önce kaydedilmiş. Kategori sayılarını ve sorun kartlarını görmek
                için denetimi yeniden çalıştırın.
              </span>
            </div>
          ) : null}

          {/* Everything below reads from `issuesQuery.data`, so on a failure
              the toolbar showed zero counts and the list said "bu kategoride
              sorun yok" -- a verdict -- directly under the error that
              explains why there is nothing. The alert above is the whole
              answer in that case. */}
          {issuesQuery.isError ? null : (
            <>
              <LighthouseIssuesToolbar
                category={category}
                categoryCounts={categoryCounts}
                categoryPhrase={categoryPhrase}
                isBusy={exportMutation.isPending}
                visibleIssues={visibleIssues}
                allIssues={allIssues}
                onCategoryChange={onCategoryChange}
                onCopy={(data, message) => {
                  void runCopy(data, message);
                }}
                onExport={(data) => {
                  void runExport(data);
                }}
                onExportCsv={runExportCsv}
                onExportSheets={runExportSheets}
              />
              <LighthouseIssueList
                issues={visibleIssues}
                isLoading={issuesQuery.isLoading}
                emptyMessage={emptyMessage}
              />
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function useLighthouseIssuesActions({
  allIssues,
  category,
  exportMutation,
}: {
  allIssues: LighthouseIssue[];
  category: CategoryTab;
  exportMutation: {
    mutateAsync: (
      data: ExportPayload,
    ) => Promise<{ filename: string; content: string }>;
  };
}) {
  const visibleIssues =
    category === "all"
      ? allIssues
      : allIssues.filter((issue) => issue.category === category);
  const categoryPhrase = categoryIssuePhrase(category);
  const categoryCounts = getCategoryCounts(allIssues);
  const severityCounts = getSeverityCounts(visibleIssues);

  const runExport = async (data: ExportPayload) => {
    try {
      const exported = await exportMutation.mutateAsync(data);
      downloadFile(exported.content, exported.filename, "application/json");
      toast.success("İndirme başladı");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Veri dışa aktarılamadı";
      toast.error(message);
    }
  };

  const runExportCsv = (
    rows: LighthouseIssue[],
    variant: "all" | "current",
  ) => {
    const filename = `lighthouse-${variant}-${category}-issues.csv`;
    downloadFile(issuesToCsv(rows), filename, "text/csv");
    toast.success("CSV indirmesi başladı");
  };

  const runExportSheets = (
    rows: LighthouseIssue[],
    variant: "all" | "current",
  ) => {
    const table = issuesToTable(rows);
    void exportTableToSheets({
      headers: table.headers,
      rows: table.rows,
      feature: `lighthouse_issues_${variant}`,
    });
  };

  const runCopy = async (data: ExportPayload, toastMessage: string) => {
    try {
      const exported = await exportMutation.mutateAsync(data);
      await navigator.clipboard.writeText(exported.content);
      toast.success(toastMessage);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Veri kopyalanamadı";
      toast.error(message);
    }
  };

  return {
    allIssues,
    categoryCounts,
    categoryPhrase,
    runCopy,
    runExport,
    runExportCsv,
    runExportSheets,
    severityCounts,
    visibleIssues,
  };
}

function getCategoryCounts(
  allIssues: LighthouseIssue[],
): Record<CategoryTab, number> {
  return categoryTabs.reduce<Record<CategoryTab, number>>(
    (acc, tab) => {
      if (tab === "all") {
        acc[tab] = allIssues.length;
        return acc;
      }
      acc[tab] = allIssues.filter((issue) => issue.category === tab).length;
      return acc;
    },
    {
      all: allIssues.length,
      performance: 0,
      accessibility: 0,
      "best-practices": 0,
      seo: 0,
    },
  );
}

function getSeverityCounts(issues: LighthouseIssue[]) {
  return {
    critical: issues.filter((issue) => issue.severity === "critical").length,
    warning: issues.filter((issue) => issue.severity === "warning").length,
    info: issues.filter((issue) => issue.severity === "info").length,
  };
}
