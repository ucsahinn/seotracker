import { Pencil, Trash2 } from "lucide-react";
import { RowActions } from "@/client/components/table/RowActions";
import { formatRelativeTime } from "@/client/lib/format";
import type { ReportTemplate } from "@/types/schemas/report-templates";
import { FileText } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";

export function ReportTemplatesList({
  templates,
  onEdit,
  onDelete,
}: {
  templates: ReportTemplate[];
  onEdit: (template: ReportTemplate) => void;
  onDelete: (template: ReportTemplate) => void;
}) {
  if (templates.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Henüz şablon yok"
        description="Şablon, bir rapor türü için yeniden kullanılabilir bir tariftir: kime yazıldığı, hangi bölümlerden oluştuğu, nasıl bir dil kullandığı."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-300">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Açıklama</th>
            <th>Güncellenme</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td className="font-medium">{template.name}</td>
              <td className="max-w-[420px] text-muted">
                {template.description}
              </td>
              <td className="whitespace-nowrap text-muted">
                {formatRelativeTime(template.updatedAt)}
              </td>
              <td className="w-10 text-right">
                <RowActions
                  label={`${template.name} için işlemler`}
                  actions={[
                    {
                      label: "Düzenle",
                      icon: Pencil,
                      onSelect: () => onEdit(template),
                    },
                    {
                      label: "Sil",
                      icon: Trash2,
                      destructive: true,
                      onSelect: () => onDelete(template),
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
