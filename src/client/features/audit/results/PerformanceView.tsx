import { Link } from "@tanstack/react-router";
import { ChevronRight, Gauge } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { deviceLabel } from "@/client/features/search-performance/deviceShare";
import { CruxHistoryCard } from "@/client/features/lighthouse/CruxHistoryCard";
import { extractPathname } from "@/client/features/audit/shared";
import { t } from "@/shared/i18n";
import {
  isLighthouseFailure,
  type PerformanceFilters,
} from "./AuditResultsTableFilterLogic";
import { PerformanceSummary } from "./PerformanceSummary";
import { PerformanceTable } from "./ResultsTables";
import { SPEED_FAILURE_TEXT, speedFailureCause } from "./performanceBands";
import { StatusChip } from "./SeverityChip";
import type { AuditResultsData } from "./types";

type LighthouseRow = AuditResultsData["lighthouse"][number];

/**
 * The Hız tab.
 *
 * A run where Google measured nothing (the daily quota, no key) used to draw
 * the whole apparatus anyway: empty averages, an empty distribution, and ten
 * red "başarısız" pills that read as ten broken pages. Now nothing measured
 * is one explanation with the two ways out, and the measurements that failed
 * -- in any run -- fold into one list with a neutral chip, because a failed
 * measurement is a gap in the data, not a verdict on the page.
 */
export function PerformanceView({
  projectId,
  auditId,
  startUrl,
  lighthouse,
  pages,
  plannedChecks,
  filters,
  onFiltersChange,
  onFilteredIdsChange,
  onNewAudit,
}: {
  projectId: string;
  auditId: string;
  startUrl: string;
  lighthouse: AuditResultsData["lighthouse"];
  pages: AuditResultsData["pages"];
  plannedChecks: number;
  filters: PerformanceFilters;
  onFiltersChange: (filters: PerformanceFilters) => void;
  onFilteredIdsChange: (ids: string[]) => void;
  onNewAudit?: () => void;
}) {
  const measured = useMemo(
    () => lighthouse.filter((row) => !isLighthouseFailure(row)),
    [lighthouse],
  );
  const failed = useMemo(
    () => lighthouse.filter((row) => isLighthouseFailure(row)),
    [lighthouse],
  );

  if (measured.length === 0) {
    return (
      <div className="space-y-4">
        <section className="rounded-box border border-[var(--hairline)] bg-base-100">
          <EmptyState
            icon={Gauge}
            title={t("Hız ölçülemedi")}
            description={`${t(SPEED_FAILURE_TEXT[speedFailureCause(failed)])} ${t("Ayarlar'dan ücretsiz bir PageSpeed anahtarı ekleyip denetimi yeniden başlatın.")}`}
            action={
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  to="/settings"
                  hash="hiz-olcumu"
                  className="btn btn-primary btn-sm"
                >
                  {t("PageSpeed anahtarı ekle")}
                </Link>
                {onNewAudit ? (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={onNewAudit}
                  >
                    {t("Yeni denetim başlat")}
                  </button>
                ) : null}
              </div>
            }
          />
        </section>
        <FailedMeasurements rows={failed} pages={pages} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CruxHistoryCard url={startUrl} />
      <PerformanceSummary
        lighthouse={lighthouse}
        plannedChecks={plannedChecks}
        filters={filters}
        onChange={onFiltersChange}
      />
      <PerformanceTable
        auditId={auditId}
        projectId={projectId}
        lighthouse={measured}
        pages={pages}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onFilteredIdsChange={onFilteredIdsChange}
      />
      <FailedMeasurements rows={failed} pages={pages} />
    </div>
  );
}

function FailedMeasurements({
  rows,
  pages,
}: {
  rows: LighthouseRow[];
  pages: AuditResultsData["pages"];
}) {
  const [open, setOpen] = useState(false);
  const urlById = useMemo(
    () => new Map(pages.map((page) => [page.id, page.url])),
    [pages],
  );
  if (rows.length === 0) return null;
  return (
    <section className="rounded-box border border-[var(--hairline)] bg-base-100">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="focus-inset flex w-full items-center gap-2 rounded-box px-4 py-3 text-left text-sm transition-colors hover:bg-base-200/40"
      >
        <ChevronRight
          aria-hidden
          className={`size-4 shrink-0 text-muted transition-transform ${open ? "rotate-90" : ""}`}
        />
        <span className="min-w-0">
          <span className="block font-medium">
            {t("{count} ölçüm yapılamadı", { count: rows.length })}
          </span>
          <span className="block text-xs text-subtle">
            {t("Sayfa başına telefon ve bilgisayar ayrı ölçülür.")}
          </span>
        </span>
      </button>
      <div
        className="reveal-height"
        data-open={open}
        inert={!open}
        aria-hidden={!open}
      >
        <div>
          <ul className="divide-y divide-[var(--hairline)] border-t border-[var(--hairline)]">
            {rows.map((row) => {
              const url = urlById.get(row.pageId);
              return (
                <li
                  key={row.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-sm"
                >
                  <span
                    className="min-w-0 flex-1 truncate"
                    title={url ?? undefined}
                  >
                    {url ? extractPathname(url) : "-"}
                  </span>
                  <span className="text-xs text-muted">
                    {deviceLabel(row.strategy)}
                  </span>
                  <StatusChip
                    tone="unmeasured"
                    title={row.errorMessage ?? undefined}
                  >
                    {t("Ölçülemedi")}
                  </StatusChip>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
