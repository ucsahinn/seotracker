import { PageHeader, PageShell } from "@/client/components/PageShell";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDeleteModal } from "@/client/components/ConfirmDeleteModal";
import { ReportTemplateForm } from "@/client/features/reports/ReportTemplateForm";
import { ReportTemplatesList } from "@/client/features/reports/ReportTemplatesList";
import { reportsQueryKey } from "@/client/features/reports/shared";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/observability";
import {
  deleteReportTemplate,
  listReportTemplates,
} from "@/serverFunctions/reportTemplates";
import type { ReportTemplate } from "@/types/schemas/report-templates";
import { QueryErrorState } from "@/client/components/QueryErrorState";

export const Route = createFileRoute(
  "/_project/p/$projectId/reports/templates",
)({
  component: ReportTemplatesPage,
});

const templatesQueryKey = (projectId: string) =>
  ["report-templates", projectId] as const;

function ReportTemplatesPage() {
  const { projectId } = Route.useParams();
  const queryClient = useQueryClient();
  // `{}` opens the form for a new template; `{ template }` opens it for an edit.
  const [form, setForm] = useState<{ template?: ReportTemplate } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ReportTemplate | null>(
    null,
  );

  const templatesQuery = useQuery({
    queryKey: templatesQueryKey(projectId),
    queryFn: () => listReportTemplates({ data: { projectId } }),
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({
      queryKey: templatesQueryKey(projectId),
    });
    // The reports list renders the template name in its Type column.
    void queryClient.invalidateQueries({
      queryKey: reportsQueryKey(projectId),
    });
  };

  const deleteMutation = useMutation({
    mutationFn: (templateId: string) =>
      deleteReportTemplate({ data: { projectId, templateId } }),
    onSuccess: (_result, templateId) => {
      captureClientEvent("report_template:deleted", {
        project_id: projectId,
        template_id: templateId,
      });
      toast.success("Şablon silindi");
      setPendingDelete(null);
      invalidate();
    },
    onError: (error: Error) => {
      toast.error(getStandardErrorMessage(error, "Şablon silinemedi"));
    },
  });

  return (
    <PageShell>
      <Link
        to="/p/$projectId/reports"
        params={{ projectId }}
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-base-content"
      >
        <ChevronLeft className="size-4" />
        Raporlar
      </Link>

      <PageHeader
        title="Rapor şablonları"
        description="Ajanlarınızın rapor yazarken izlediği yeniden kullanılabilir brifingler: kimin için, hangi bölümlerden oluşuyor ve tonu ne olmalı."
        actions={
          <button
            type="button"
            className="btn btn-primary btn-sm gap-1.5"
            onClick={() => setForm({})}
          >
            <Plus className="size-4" />
            Yeni şablon
          </button>
        }
      />

      {templatesQuery.isPending ? (
        <div className="space-y-2" aria-busy>
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="skeleton h-20" />
          ))}
        </div>
      ) : templatesQuery.isError ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <QueryErrorState
            error={templatesQuery.error}
            onRetry={() => void templatesQuery.refetch()}
            title="Şablonlar yüklenemedi"
          />
        </div>
      ) : (
        <ReportTemplatesList
          templates={templatesQuery.data.templates}
          onEdit={(template) => setForm({ template })}
          onDelete={setPendingDelete}
        />
      )}

      {form ? (
        <ReportTemplateForm
          projectId={projectId}
          template={form.template}
          onClose={() => setForm(null)}
          onSaved={() => {
            setForm(null);
            invalidate();
          }}
        />
      ) : null}

      {pendingDelete ? (
        <ConfirmDeleteModal
          title={`\u201c${pendingDelete.name}\u201d silinsin mi?`}
          detail="Bu şablondan üretilmiş raporlar etkilenmez."
          confirmLabel="Şablonu sil"
          isPending={deleteMutation.isPending}
          onClose={() => setPendingDelete(null)}
          onConfirm={() => deleteMutation.mutate(pendingDelete.id)}
        />
      ) : null}
    </PageShell>
  );
}
