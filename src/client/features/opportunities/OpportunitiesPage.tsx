import { WindowPicker, LimitPicker } from "./OpportunityPickers";
import { strikingMethodText } from "@/shared/strikingEstimateCopy";
import { t } from "@/shared/i18n";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  Intro,
  NoOpportunities,
  NotReady,
} from "@/client/features/opportunities/OpportunityStates";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { refreshState } from "@/client/lib/refreshState";
import { OpportunitiesTable } from "@/client/features/opportunities/OpportunitiesTable";
import type { OpportunityReport } from "@/client/features/opportunities/report";
import { formatCount, formatDate, formatPercent } from "@/client/lib/format";
import type { WorkKind } from "@/shared/pageOpportunities";
import { getSearchOpportunities } from "@/serverFunctions/opportunities";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { OpportunityWorkBars } from "@/client/features/opportunities/OpportunityWorkBars";
import { OpportunityMethod } from "@/client/features/opportunities/OpportunityMethod";
import { OpportunityQuickFilters } from "@/client/features/opportunities/OpportunityQuickFilters";
import {
  pathOf,
  usefulChips,
  WORK_COPY,
  type QuickId,
} from "@/client/features/opportunities/opportunityLogic";

/**
 * One question per page: how many more clicks a month could it bring, and
 * what gets them.
 *
 * The screen used to rank every page by a percentile mix of demand, business
 * value and "reachability" -- where a page already at #1 scored highest on
 * reachability. Its tiles counted table rows and Analytics join coverage,
 * and the one number an owner needs was nowhere. The estimate now comes from
 * `src/shared/pageOpportunities.ts`, on the same CTR curve and thresholds as
 * the Search performance insights; Analytics is a label beside it.
 */
/*
 * 100 is the ceiling `SearchOpportunityService` enforces. Kept in step with
 * the server function schema, which caps at the same number.
 */
const LIMITS = [25, 50, 100] as const;

// Labels stay Turkish here and go through t() where they render.
const WINDOWS = [
  { days: 7, label: "Son 7 gün" },
  { days: 28, label: "Son 28 gün" },
  { days: 90, label: "Son 90 gün" },
] as const;

type WindowDays = (typeof WINDOWS)[number]["days"];

const plusCount = (n: number) => `+${formatCount(n)}`;

export function OpportunitiesPage({
  projectId,
  windowDays,
  limit,
  work = null,
  quick = null,
  onViewChange,
}: {
  projectId: string;
  /** Held in the URL by the route, so a reload or a shared link keeps it. */
  windowDays: WindowDays;
  limit: (typeof LIMITS)[number];
  work?: WorkKind | null;
  quick?: QuickId | null;
  onViewChange: (next: {
    windowDays?: WindowDays;
    limit?: (typeof LIMITS)[number];
    work?: WorkKind;
    quick?: QuickId;
  }) => void;
}) {
  const query = useQuery({
    queryKey: [
      "searchOpportunities",
      projectId,
      limit,
      windowDays,
      work,
      quick,
    ],
    queryFn: () =>
      getSearchOpportunities({
        data: {
          projectId,
          limit,
          windowDays,
          work: work ?? undefined,
          quick: quick ?? undefined,
        },
      }),
    retry: false,
    // Keep the previous rows (and the pickers mounted) while a new window or
    // limit loads; never across projects.
    placeholderData: (previous, previousQuery) =>
      previousQuery?.queryKey[1] === projectId ? previous : undefined,
  });

  const [previous, setPrevious] = useState<{
    projectId: string;
    data: NonNullable<typeof query.data>;
  } | null>(null);
  useEffect(() => {
    if (query.data && !query.isPlaceholderData)
      setPrevious({ projectId, data: query.data });
  }, [projectId, query.data, query.isPlaceholderData]);
  const data =
    query.data ??
    (query.isError && previous?.projectId === projectId
      ? previous.data
      : undefined);

  return (
    <PageShell>
      <PageHeader
        title={t("Fırsatlar")}
        description={t(
          "Her sayfanın ayda kaç tıklama daha getirebileceği ve bunun için ne yapmanız gerektiği.",
        )}
        actions={
          <PageActions>
            {data?.status === "ok" ? (
              <>
                <WindowPicker
                  windowDays={windowDays}
                  onChange={(next) => onViewChange({ windowDays: next })}
                />
                <LimitPicker
                  limit={limit}
                  onChange={(next) => onViewChange({ limit: next })}
                />
              </>
            ) : null}
            <RefreshButton {...refreshState([query])} shortcut />
          </PageActions>
        }
      />

      {query.isPending ? (
        <div className="space-y-4" aria-busy>
          <div className="skeleton h-[104px]" />
          <div className="skeleton h-48" />
          <div className="skeleton h-96" />
        </div>
      ) : query.isError && !data ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <QueryErrorState
            error={query.error}
            onRetry={() => void query.refetch()}
            title={t("Fırsatlar yüklenemedi")}
          />
        </div>
      ) : data?.status === "ok" ? (
        <>
          {query.isError ? (
            <QueryErrorState
              error={query.error}
              onRetry={() => void query.refetch()}
              title={t("Fırsatlar yüklenemedi")}
            />
          ) : null}
          <Report
            data={data.report}
            projectId={projectId}
            stale={query.isPlaceholderData || query.isError}
            onResetFilters={() =>
              onViewChange({ work: undefined, quick: undefined })
            }
            work={work}
            quick={quick}
            onWorkChange={(next) => onViewChange({ work: next ?? undefined })}
            onQuickChange={(next) => onViewChange({ quick: next ?? undefined })}
          />
        </>
      ) : (
        <>
          <NotReady projectId={projectId} />
          <Intro collapsedByDefault />
        </>
      )}
    </PageShell>
  );
}

function Report({
  data,
  projectId,
  stale,
  work,
  quick,
  onResetFilters,
  onWorkChange: setWork,
  onQuickChange: setQuick,
}: {
  data: OpportunityReport;
  projectId: string;
  /** A new window or row count is loading behind these rows. */
  stale: boolean;
  work: WorkKind | null;
  quick: QuickId | null;
  onResetFilters: () => void;
  onWorkChange: (work: WorkKind | null) => void;
  onQuickChange: (quick: QuickId | null) => void;
}) {
  const [openPage, setOpenPage] = useState<string | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const shown = data.rows;
  const filtered = work !== null || quick !== null;
  const counts = data.valueCounts;
  const chips = usefulChips(counts, data.totalCandidateRows);
  const top = data.topRecommendation;
  const { totals } = data;
  const range = data.request.dateRange;
  const period = t("{start} – {end}", {
    start: formatDate(range.startDate),
    end: formatDate(range.endDate),
  });
  const analyticsOn = data.analytics.state === "connected";

  if (data.totalCandidateRows === 0) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
        <NoOpportunities
          dateRange={range}
          pagesConsidered={totals.pagesConsidered}
          curveInsufficient={data.method.curveInsufficient}
          unknownPages={totals.unknownPages}
          hiddenQueryPages={totals.reasons.missingQueryPairs}
          days={data.request.days}
        />
        <OpportunityMethod data={data} projectId={projectId} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6" aria-busy={stale}>
      {/* The window, once, above everything it covers. */}
      <p className="text-xs text-muted">
        {period} · {data.request.searchConsoleTimeZone} ·{" "}
        {t(
          data.request.completeness.incompleteSource === "google"
            ? "Tam günler Google tarafından doğrulandı"
            : "Tam gün sınırı veri gecikmesine göre varsayıldı",
        )}
        {stale ? (
          <span role="status">
            {" "}
            · {t("Önceki sonuç gösteriliyor; seçili dönem henüz yüklenmedi.")}
          </span>
        ) : null}
      </p>

      <section className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4">
        <h2 className="text-sm font-medium">{t("Önce şuna bakın")}</h2>
        {top ? (
          <button
            type="button"
            aria-label={t("Önce şuna bakın")}
            className="block min-h-11 w-full break-all text-left text-lg font-semibold underline decoration-primary underline-offset-4"
            onClick={() => {
              onResetFilters();
              setOpenPage(top.page);
            }}
          >
            {pathOf(top.page)}
          </button>
        ) : null}
        {top ? (
          <p className="text-sm">
            {t(WORK_COPY[top.work].action)} ·{" "}
            {t("En fazla +{gain} tıklama / 30 gün (üst sınır)", {
              gain: formatCount(top.gainPerMonth),
            })}
          </p>
        ) : null}
        <p className="text-sm font-semibold">
          {t("En fazla kazanılabilecek tıklama / ay (üst sınır)")}:{" "}
          {totals.gainPerMonth === null ? "–" : plusCount(totals.gainPerMonth)}
        </p>
        <p className="text-xs text-muted">
          {t(
            "{count} sayfada · bu sayfaların tüm tıklamaları 30 güne ölçekli: {clicks}; üst sınırın bu tabana oranı {share}",
            {
              count: data.totalCandidateRows,
              clicks: formatCount(totals.clicksPerMonth),
              share:
                totals.clicksPerMonth > 0 && totals.gainPerMonth !== null
                  ? formatPercent(
                      totals.gainPerMonth / totals.clicksPerMonth,
                      0,
                    )
                  : "–",
            },
          )}
        </p>
        <p className="text-xs text-muted">
          {strikingMethodText(data.method.brandSource, data.truncated.gsc)}
        </p>
        <p className="text-xs text-muted">
          {t("Hesaplanamayan kapsam")}: {formatCount(totals.unknownPages)}.{" "}
          {t(
            "Eksik sorgu, yetersiz gösterim veya eksik hedef oranı; kazanç yok anlamına gelmez.",
          )}
        </p>
        <p className="text-xs text-muted">
          {t("Dönüşüm getiren sayfalar")}:{" "}
          {analyticsOn ? formatCount(counts.converts) : "–"} ·{" "}
          {t(
            !analyticsOn
              ? data.analytics.state === "not_connected"
                ? "Analytics bağlanınca görünür"
                : "Analytics bu kez okunamadı; aşağıdaki kaynak notunu kontrol edin."
              : data.reportMetadata?.hasLimitedData
                ? "Analytics verisi sınırlı; eksik ölçümler sıfır değildir ve dönüşüm yorumu yapılamayabilir."
                : "Hesaplanabilen tüm sayfalardaki ölçülmüş dönüşüm sinyali · listele",
          )}
        </p>
      </section>

      <p className="text-xs text-muted">
        {t(
          "Hesaplanan kazanç yalnızca alınan ve tanımlanabilen aramaları kapsar; gizli sorguların payı bilinmiyor. Panelin sorgu tahminiyle toplanmaz.",
        )}
      </p>
      <OpportunityWorkBars
        byWork={totals.byWork}
        selected={work}
        onSelect={setWork}
      />

      {chips.length > 0 ? (
        <OpportunityQuickFilters
          chips={chips}
          counts={counts}
          selected={quick}
          onSelect={setQuick}
        />
      ) : null}

      <h2
        ref={filtersRef}
        tabIndex={-1}
        className="text-sm font-semibold"
        aria-live="polite"
      >
        {t("İş listesi: {shown} / {total} eşleşen sayfa", {
          shown: formatCount(data.rowCount),
          total: formatCount(data.filteredCount),
        })}
      </h2>

      <OpportunitiesTable
        projectId={projectId}
        days={data.request.days}
        rows={shown}
        report={data}
        recommendation={top}
        openPage={openPage}
        onOpenPageChange={setOpenPage}
        onReset={
          filtered
            ? () => {
                // The button being clicked is about to unmount.
                filtersRef.current?.focus();
                onResetFilters();
              }
            : undefined
        }
      />

      <OpportunityMethod data={data} projectId={projectId} />
      <Intro collapsedByDefault />
    </div>
  );
}
