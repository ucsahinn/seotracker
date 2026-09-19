import { Pencil, Trash2 } from "lucide-react";
import { PortalMenu } from "@/client/components/PortalMenu";
import { formatRelativeTime } from "@/client/lib/format";
import type { ReportTemplate } from "@/types/schemas/report-templates";

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
      <p className="rounded-lg border border-dashed border-base-300 px-4 py-6 text-sm text-muted">
        Henüz şablon yok. Şablon, bir rapor türü için yeniden kullanılabilir bir
        tariftir: kime yazıldığı, hangi bölümlerden oluştuğu, nasıl bir dil
        kullandığı.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-base-300">
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
              <td className="max-w-[420px] text-base-content/70">
                {template.description}
              </td>
              <td className="whitespace-nowrap text-base-content/70">
                {formatRelativeTime(template.updatedAt)}
              </td>
              <td className="w-10 text-right">
                <PortalMenu ariaLabel={`${template.name} için işlemler`}>
                  {(close) => (
                    <>
                      <li>
                        <button
                          onClick={() => {
                            close();
                            onEdit(template);
                          }}
                        >
                          <Pencil className="size-3.5" />
                          Düzenle
                        </button>
                      </li>
                      <li>
                        <button
                          className="text-error"
                          onClick={() => {
                            close();
                            onDelete(template);
                          }}
                        >
                          <Trash2 className="size-3.5" />
                          Sil
                        </button>
                      </li>
                    </>
                  )}
                </PortalMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
