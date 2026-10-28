import { Link } from "@tanstack/react-router";
import { FileText, Trash2 } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { RowActions } from "@/client/components/table/RowActions";
import { ReportDownloadButton } from "./ReportDownloadButton";
import { ReportKindChip } from "./ReportKindChip";
import {
  displayReportTitle,
  hasTemplate,
  kindLabel,
  reportKind,
} from "./reportStats";
import { formatCreatedBy } from "./shared";
import { formatBytes, formatCount, formatDateTime } from "@/client/lib/format";
import type {
  ReportInventory,
  ReportListItem,
} from "@/serverFunctions/reports";
import {
  type ReportInventoryInput,
  REPORT_INVENTORY_PAGE_SIZE,
  reportInventorySchema,
} from "@/shared/reportInventory";
import { t } from "@/shared/i18n";

type Filters = Omit<ReportInventoryInput, "projectId">;
export function ReportsList({
  projectId,
  inventory,
  pending = false,
  filters,
  onChange,
  onDelete,
}: {
  projectId: string;
  inventory: ReportInventory;
  pending?: boolean;
  filters: Filters;
  onChange: (filters: Filters) => void;
  onDelete: (report: ReportListItem) => void;
}) {
  const update = (patch: Partial<Filters>) =>
    onChange({ ...filters, ...patch, page: 1 });
  const clear = () =>
    onChange({
      query: "",
      kind: "",
      recent: false,
      sort: "updatedAt",
      page: 1,
    });
  if (inventory.totalProject === 0) {
    return (
      <EmptyState
        icon={FileText}
        title={t("Henüz rapor yok")}
        description={t(
          "Arama performansı veya Site denetimi ekranından rapor hazırlayın ya da rapor komutunu ajanınıza yapıştırın.",
        )}
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              to="/p/$projectId/search-performance"
              params={{ projectId }}
              className="btn btn-primary min-h-11"
            >
              {t("Arama raporu hazırla")}
            </Link>
            <Link
              to="/p/$projectId/audit"
              params={{ projectId }}
              className="btn min-h-11"
            >
              {t("Denetim raporu hazırla")}
            </Link>
          </div>
        }
      />
    );
  }
  return (
    <div className="space-y-4" aria-busy={pending}>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex w-full min-w-0 flex-none flex-col gap-1 text-sm sm:w-auto sm:flex-1">
          {t("Raporlarda ara")}
          <input
            type="search"
            className="input input-bordered min-h-11 w-full"
            maxLength={200}
            value={filters.query}
            onChange={(event) => update({ query: event.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          {t("Sıralama")}
          <select
            className="select select-bordered min-h-11"
            value={filters.sort}
            onChange={(event) =>
              update({
                sort: reportInventorySchema.shape.sort.parse(
                  event.target.value,
                ),
              })
            }
          >
            <option value="updatedAt">{t("Son güncelleme")}</option>
            <option value="createdAt">{t("Oluşturulma zamanı")}</option>
            <option value="title">{t("Başlık")}</option>
          </select>
        </label>
        <button
          type="button"
          className="btn min-h-11"
          aria-pressed={filters.recent}
          onClick={() => update({ recent: !filters.recent })}
        >
          {t("Son 7 gün")}
        </button>
        {filters.query || filters.kind || filters.recent ? (
          <button
            type="button"
            className="btn btn-ghost min-h-11"
            onClick={clear}
          >
            {t("Filtreleri temizle")}
          </button>
        ) : null}
      </div>
      <p className="text-sm text-muted">
        {t("{matching} sonuç / projedeki {total} rapor", {
          matching: formatCount(inventory.totalMatching),
          total: formatCount(inventory.totalProject),
        })}
      </p>
      {filters.recent || filters.query ? (
        <p className="text-xs text-subtle">
          {t(
            "Son 7 gün, bu sürede kaydedilen veya güncellenen ayrı dosyaları süzer; kaynak verinin güncelliğini göstermez. Arama başlık ve kayıtlı özeti tarar.",
          )}
        </p>
      ) : null}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t("Türe göre raporlar")}
      >
        <button
          type="button"
          className="btn btn-sm min-h-11"
          aria-pressed={!filters.kind}
          onClick={() => update({ kind: "" })}
        >
          {t("Tümü")}
        </button>
        {inventory.facets.map((facet) => (
          <button
            key={facet.key}
            type="button"
            aria-pressed={filters.kind === facet.key}
            className={
              "btn btn-sm min-h-11 " +
              (filters.kind === facet.key ? "btn-primary" : "btn-ghost")
            }
            onClick={() =>
              update({ kind: filters.kind === facet.key ? "" : facet.key })
            }
          >
            {facet.name ?? kindLabel(facet.key)} ({formatCount(facet.value)})
          </button>
        ))}
      </div>
      {inventory.facets.length > 1 ? (
        <p className="text-xs text-subtle">
          {t(
            "Tür sayıları arama ve Son 7 gün süzgecine göredir; seçili türden önce hesaplanır.",
          )}
        </p>
      ) : null}
      {inventory.reports.length === 0 ? (
        <EmptyState
          compact
          icon={FileText}
          title={
            inventory.totalProject
              ? t("Aramanıza uyan rapor yok")
              : t("Henüz rapor yok")
          }
          description={
            inventory.totalProject
              ? t("Aramayı veya türü temizleyerek kayıtlı raporları görün.")
              : t(
                  "Arama performansı veya Site denetimi ekranından rapor hazırlayın ya da rapor komutunu ajanınıza yapıştırın.",
                )
          }
          action={
            inventory.totalProject ? (
              <button type="button" className="btn min-h-11" onClick={clear}>
                {t("Filtreleri temizle")}
              </button>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-box border border-[var(--hairline)]">
          <table className="table">
            <thead>
              <tr>
                <th>{t("Rapor")}</th>
                <th className="hidden md:table-cell">{t("Tür")}</th>
                <th
                  className="hidden md:table-cell"
                  aria-sort={
                    filters.sort === "updatedAt" ? "descending" : undefined
                  }
                >
                  {t("Güncellendi")}
                </th>
                <th className="hidden lg:table-cell">{t("Boyut")}</th>
                <th>
                  <span className="sr-only">{t("İşlemler")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {inventory.reports.map((report) => (
                <tr key={report.id}>
                  <td className="max-w-[420px]">
                    <Link
                      to="/p/$projectId/reports/$reportId"
                      params={{ projectId, reportId: report.id }}
                      className="link link-hover break-words font-medium"
                    >
                      {displayReportTitle(report)}
                    </Link>
                    <div className="mt-1 text-xs text-muted">
                      {formatCreatedBy(report)}
                    </div>
                    <div className="mt-1 text-xs text-subtle">
                      {t("Veri dönemi: raporun içinde kontrol edin.")}
                    </div>
                    <div className="mt-1 text-xs text-muted md:hidden">
                      {formatDateTime(report.updatedAt)}
                    </div>
                    {report.templateName ? (
                      <div className="mt-1 text-xs text-muted">
                        {t("Şablon")}: {report.templateName}
                      </div>
                    ) : null}
                  </td>
                  <td className="hidden md:table-cell">
                    <ReportKindChip
                      kind={reportKind(report)}
                      isTemplate={hasTemplate(report)}
                    />
                  </td>
                  <td className="hidden whitespace-nowrap text-muted md:table-cell">
                    {formatDateTime(report.updatedAt)}
                  </td>
                  <td className="hidden text-muted lg:table-cell">
                    {formatBytes(report.sizeBytes)}
                  </td>
                  <td>
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      <ReportDownloadButton
                        reportId={report.id}
                        title={report.title}
                      />
                      <RowActions
                        label={t("{title} için işlemler", {
                          title: report.title,
                        })}
                        actions={[
                          {
                            label: t("Sil"),
                            icon: Trash2,
                            destructive: true,
                            onSelect: () => onDelete(report),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <nav
        aria-label={t("Rapor sayfaları")}
        className="flex flex-wrap items-center justify-between gap-2"
      >
        <button
          type="button"
          className="btn min-h-11"
          disabled={pending || inventory.page <= 1}
          onClick={() => onChange({ ...filters, page: inventory.page - 1 })}
        >
          {t("Önceki sayfa")}
        </button>
        <span className="text-sm text-muted">
          {t("{start}–{end} / {total}", {
            start: formatCount(
              inventory.totalMatching
                ? (inventory.page - 1) * REPORT_INVENTORY_PAGE_SIZE + 1
                : 0,
            ),
            end: formatCount(
              Math.min(
                inventory.page * REPORT_INVENTORY_PAGE_SIZE,
                inventory.totalMatching,
              ),
            ),
            total: formatCount(inventory.totalMatching),
          })}
        </span>
        <button
          type="button"
          className="btn min-h-11"
          disabled={pending || inventory.page >= inventory.pageCount}
          onClick={() => onChange({ ...filters, page: inventory.page + 1 })}
        >
          {t("Sonraki sayfa")}
        </button>
      </nav>
    </div>
  );
}
