import { Pencil, Trash2 } from "lucide-react";
import { RowActions } from "@/client/components/table/RowActions";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import {
  compareText,
  useLocalSort,
} from "@/client/components/table/useLocalSort";
import { latestUpdate } from "@/client/features/reports/reportStats";
import {
  formatCount,
  formatDateTime,
  formatRelativeTime,
} from "@/client/lib/format";
import type { ReportTemplate } from "@/types/schemas/report-templates";
import { FileText } from "lucide-react";
import { useState } from "react";
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
  const sorting = useLocalSort<"name" | "updatedAt">({
    key: "updatedAt",
    desc: true,
  });
  const [query, setQuery] = useState("");

  if (templates.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Henüz şablon yok"
        description="Şablon, bir rapor türü için yeniden kullanılabilir yönergedir: rapor kime yazılır, hangi bölümlerden oluşur, nasıl bir dille yazılır. Sağ üstteki düğmeyle ilkini oluşturun."
      />
    );
  }

  const needle = query.trim().toLocaleLowerCase("tr");
  const visible = sorting.apply(
    templates.filter(
      (template) =>
        needle === "" ||
        `${template.name} ${template.description}`
          .toLocaleLowerCase("tr")
          .includes(needle),
    ),
    (a, b, key) =>
      key === "name"
        ? compareText(a.name, b.name)
        : Date.parse(a.updatedAt) - Date.parse(b.updatedAt),
  );
  const latest = latestUpdate(templates)?.updatedAt ?? null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          <span className="font-medium text-base-content tabular-nums">
            {formatCount(templates.length)}
          </span>{" "}
          şablon
          {latest ? (
            <>
              {" · son güncelleme "}
              <time dateTime={latest} title={formatDateTime(latest)}>
                {formatRelativeTime(latest)}
              </time>
            </>
          ) : null}
        </p>
        {templates.length > 5 ? (
          <input
            type="search"
            className="input input-bordered input-sm w-full sm:w-64"
            placeholder="Şablonlarda ara"
            aria-label="Şablonlarda ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        ) : null}
      </div>
      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table table-sm">
          <thead>
            <tr>
              <th aria-sort={sorting.ariaSort("name")}>
                <SortableHeader
                  column={sorting.column("name", false)}
                  label="Ad"
                />
              </th>
              <th>Açıklama</th>
              <th aria-sort={sorting.ariaSort("updatedAt")}>
                <SortableHeader
                  column={sorting.column("updatedAt")}
                  label="Güncellenme"
                />
              </th>
              <th>
                <span className="sr-only">İşlemler</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((template) => (
              <tr key={template.id}>
                <td className="font-medium">
                  <button
                    type="button"
                    className="link link-hover text-left font-medium"
                    onClick={() => onEdit(template)}
                  >
                    {template.name}
                  </button>
                </td>
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
        {visible.length === 0 ? (
          <EmptyState
            compact
            icon={FileText}
            title="Aramanıza uyan şablon yok"
            description="Başka bir sözcükle deneyin."
          />
        ) : null}
      </div>
    </div>
  );
}
