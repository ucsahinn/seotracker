import { Link } from "@tanstack/react-router";
import { Check, FileText, Search, Trash2 } from "lucide-react";
import { HelpTip } from "@/client/components/HelpTip";
import { EmptyState } from "@/client/components/EmptyState";
import { RowActions } from "@/client/components/table/RowActions";
import { ReportDownloadButton } from "./ReportDownloadButton";
import { ReportKindChip } from "./ReportKindChip";
import {
  displayReportTitle,
  hasTemplate,
  kindLabel,
  reportKind,
  UNKNOWN_APP_KIND,
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
      {/* Search keeps a reading width instead of stretching 1000px; every
          control in the row carries a visible label and one height. */}
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex w-full min-w-0 flex-col gap-1 text-xs text-muted sm:w-80">
          {t("Raporlarda ara")}
          <span className="input input-bordered flex min-h-11 w-full items-center gap-2 text-sm text-base-content">
            <Search aria-hidden className="size-4 shrink-0 text-subtle" />
            <input
              type="search"
              className="min-w-0 grow"
              placeholder={t("Başlık veya özet")}
              maxLength={200}
              value={filters.query}
              onChange={(event) => update({ query: event.target.value })}
            />
          </span>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted">
          {t("Sıralama")}
          <select
            className="select select-bordered min-h-11 text-sm text-base-content"
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
        <div className="flex flex-col gap-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            {t("Dönem")}
            <HelpTip label={t("Son 7 gün")}>
              {t(
                "Son 7 gün, bu sürede kaydedilen veya güncellenen ayrı dosyaları süzer; kaynak verinin güncelliğini göstermez. Arama başlık ve kayıtlı özeti tarar.",
              )}
            </HelpTip>
          </span>
          <button
            type="button"
            className={`btn min-h-11 gap-1.5 ${filters.recent ? "btn-active" : ""}`}
            aria-pressed={filters.recent}
            onClick={() => update({ recent: !filters.recent })}
          >
            {filters.recent ? <Check aria-hidden className="size-4" /> : null}
            {t("Son 7 gün")}
          </button>
        </div>
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
      <KindChips
        facets={inventory.facets}
        selected={filters.kind || ""}
        onSelect={(kind) => update({ kind })}
      />
      {/* Said once for the list, not under every title. */}
      <p className="text-sm text-muted">
        {t("{matching} sonuç / projedeki {total} rapor", {
          matching: formatCount(inventory.totalMatching),
          total: formatCount(inventory.totalProject),
        })}
        <span className="text-subtle">
          {" · "}
          {t("Veri dönemi: raporun içinde kontrol edin.")}
        </span>
      </p>
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
          {/* Below md each record is a stacked row: the title gets the full
              width, then one line with kind, date and actions. */}
          <table className="table max-md:block">
            <thead className="max-md:hidden">
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
                <th className="hidden text-right lg:table-cell">
                  {t("Boyut")}
                </th>
                <th>
                  <span className="sr-only">{t("İşlemler")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {inventory.reports.map((report) => (
                <tr
                  key={report.id}
                  className="max-md:flex max-md:flex-col max-md:gap-2 max-md:py-3"
                >
                  <td className="max-w-[420px] max-md:max-w-none max-md:py-0">
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
                  <td className="hidden text-right tabular-nums text-muted lg:table-cell">
                    {formatBytes(report.sizeBytes)}
                  </td>
                  <td className="max-md:py-0">
                    <div className="flex items-center justify-between gap-2 md:justify-end md:gap-1">
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-xs text-muted md:hidden">
                        <ReportKindChip
                          kind={reportKind(report)}
                          isTemplate={hasTemplate(report)}
                          wrap
                        />
                        <span className="whitespace-nowrap">
                          {formatDateTime(report.updatedAt)}
                        </span>
                      </div>
                      <div className="ml-auto flex shrink-0 items-center gap-1">
                        <ReportDownloadButton
                          reportId={report.id}
                          title={report.title}
                          iconOnPhone
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* One page: the count above already says how many; no dead buttons. */}
      {inventory.pageCount > 1 || inventory.page > 1 ? (
        <nav
          aria-label={t("Rapor sayfaları")}
          className="flex flex-wrap items-center justify-end gap-2"
        >
          <button
            type="button"
            className="btn btn-ghost btn-sm min-h-11 sm:min-h-0"
            disabled={pending || inventory.page <= 1}
            onClick={() => onChange({ ...filters, page: inventory.page - 1 })}
          >
            {t("Önceki sayfa")}
          </button>
          <span className="order-first mr-2 text-xs text-muted">
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
            className="btn btn-sm min-h-11 sm:min-h-0"
            disabled={pending || inventory.page >= inventory.pageCount}
            onClick={() => onChange({ ...filters, page: inventory.page + 1 })}
          >
            {t("Sonraki sayfa")}
          </button>
        </nav>
      ) : null}
    </div>
  );
}

/** One pill per report kind; the pressed one is the active filter. */
function KindChips({
  facets,
  selected,
  onSelect,
}: {
  facets: ReportInventory["facets"];
  selected: string;
  onSelect: (kind: string) => void;
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label={t("Türe göre raporlar")}
    >
      {[
        {
          key: "",
          label: t("Tümü"),
          title: undefined as string | undefined,
          count: null as number | null,
        },
        ...facets.map((facet) => ({
          key: facet.key,
          label:
            facet.key === UNKNOWN_APP_KIND
              ? t("Eski rapor")
              : (facet.name ?? kindLabel(facet.key)),
          title: facet.name ?? kindLabel(facet.key),
          count: facet.value,
        })),
      ].map((chip) => {
        const on = selected === chip.key;
        return (
          <button
            key={chip.key || "all"}
            type="button"
            aria-pressed={on}
            className={`btn btn-sm min-h-11 sm:min-h-0 gap-1.5 rounded-full ${
              on ? "btn-active" : "btn-ghost border-[var(--control-border)]"
            }`}
            onClick={() => onSelect(on || !chip.key ? "" : chip.key)}
          >
            <span title={chip.title}>{chip.label}</span>
            {chip.count === null ? null : (
              <span className="tabular-nums text-muted">
                {formatCount(chip.count)}
              </span>
            )}
          </button>
        );
      })}
      {facets.length > 1 ? (
        <HelpTip label={t("Türe göre raporlar")}>
          {t(
            "Tür sayıları arama ve Son 7 gün süzgecine göredir; seçili türden önce hesaplanır.",
          )}
        </HelpTip>
      ) : null}
    </div>
  );
}
