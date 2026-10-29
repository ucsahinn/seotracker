import { WindowPicker, LimitPicker } from "./OpportunityPickers";
import { FactStrip } from "@/client/components/FactStrip";
import { t } from "@/shared/i18n";
import { Link } from "@tanstack/react-router";
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
import { formatCount, formatDate } from "@/client/lib/format";
import type { WorkKind } from "@/shared/pageOpportunities";
import { getSearchOpportunities } from "@/serverFunctions/opportunities";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { OpportunityWorkBars } from "@/client/features/opportunities/OpportunityWorkBars";
import { OpportunityMethod } from "@/client/features/opportunities/OpportunityMethod";
import { OpportunityQuickFilters } from "@/client/features/opportunities/OpportunityQuickFilters";
import {
  pathOf,
  usefulChips,
  rowAction,
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
          data?.status === "ok" && data.report.totals.gainPerMonth === null
            ? "Gözlenen sayfalar ve olası işler; kazanç henüz hesaplanamıyor."
            : "Gözlenen sayfalar, olası işler ve hesaplanabilen ek tıklamalar.",
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

  if (totals.pagesConsidered === 0) {
    return (
      <div className="space-y-4" aria-busy={stale}>
        {stale ? (
          <p role="status" className="text-sm text-muted">
            {t("Önceki sonuç gösteriliyor; seçili dönem henüz yüklenmedi.")}
          </p>
        ) : null}
        <div className="rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
          <NoOpportunities
            dateRange={range}
            pagesConsidered={totals.pagesConsidered}
            curveInsufficient={data.method.curveInsufficient}
            unknownPages={totals.unknownPages}
            hiddenQueryPages={totals.reasons.missingQueryPairs}
            days={data.request.days}
          />
          <div className="flex justify-center px-4 pb-6">
            <Link
              to="/p/$projectId/search-performance"
              params={{ projectId }}
              className="btn btn-primary min-h-11"
            >
              {t("Arama performansını aç")}
            </Link>
          </div>
        </div>
        <OpportunityMethod data={data} projectId={projectId} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6" aria-busy={stale}>
      <FactStrip
        label={t("Fırsatların kaynağı")}
        facts={[
          {
            label: t("Kaynak"),
            value: "Search Console",
            hint: data.source.searchConsoleSiteUrl,
          },
          {
            label: t("Dönem"),
            value: period,
            hint: data.request.searchConsoleTimeZone,
          },
          {
            label: t("Veri durumu"),
            value: t(
              data.request.completeness.incompleteSource === "google"
                ? "Tam günler Google tarafından doğrulandı"
                : "Tam gün sınırı veri gecikmesine göre varsayıldı",
            ),
          },
        ]}
      />
      {stale ? (
        <p role="status" className="text-sm text-muted">
          {t("Önceki sonuç gösteriliyor; seçili dönem henüz yüklenmedi.")}
        </p>
      ) : null}

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
            {t(rowAction(top))} ·{" "}
            {top.gainPerMonth === null
              ? t("Sıraya dayalı öneri; kazanç bilinmiyor (yetersiz veri).")
              : t("En fazla +{gain} tıklama / 30 gün (üst sınır)", {
                  gain: formatCount(top.gainPerMonth),
                })}
          </p>
        ) : null}
        <p className="text-sm font-semibold">
          {t("En fazla kazanılabilecek tıklama / ay (üst sınır)")}:{" "}
          {totals.gainPerMonth === null ? "–" : plusCount(totals.gainPerMonth)}
        </p>
        <p className="text-sm">
          {t(
            !analyticsOn || data.coverage.matchedRows === 0
              ? "Dönüşüm bilgisi bilinmiyor."
              : counts.converts > 0
                ? "Doğrulanmış dönüşüm: {count} sayfa"
                : "Eşleşen veride doğrulanmış dönüşüm yok.",
            { count: formatCount(counts.converts) },
          )}
        </p>
        <p className="text-xs text-muted">
          {t("Eşleşen: {matched} / {total} sayfa", {
            matched: formatCount(data.coverage.matchedRows),
            total: formatCount(data.totalCandidateRows),
          })}{" "}
          ·{" "}
          {t("Dönüşüm durumu bilinmeyen: {count} sayfa", {
            count: formatCount(
              Math.max(
                0,
                data.totalCandidateRows -
                  counts.converts -
                  counts.no_conversions,
              ),
            ),
          })}
        </p>
        {analyticsOn && counts.converts > 0 ? (
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setQuick(quick === "converts" ? null : "converts")}
          >
            {t("Dönüşüm getirenleri göster")}
          </button>
        ) : null}
        {totals.unknownPages > 0 ? (
          <p className="text-sm text-[var(--ink-warning)]">
            {t(
              "Bazı sayfalarda kazanç bilinmiyor; bu, sıfır kazanç demek değildir.",
            )}
          </p>
        ) : null}
      </section>

      <OpportunityWorkBars
        byWork={totals.byWork}
        gainKnown={totals.gainPerMonth !== null}
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
