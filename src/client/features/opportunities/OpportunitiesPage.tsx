import { useQuery } from "@tanstack/react-query";
import { useRef, useState, type ReactNode } from "react";
import {
  Intro,
  NoOpportunities,
  NotReady,
} from "@/client/features/opportunities/OpportunityStates";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { refreshState } from "@/client/lib/refreshState";
import { OpportunitiesTable } from "@/client/features/opportunities/OpportunitiesTable";
import type { OpportunityReport } from "@/client/features/opportunities/report";
import { formatDate, formatNumber } from "@/client/lib/format";
import { describeWindow } from "@/shared/dataFreshness";
import { getSearchOpportunities } from "@/serverFunctions/opportunities";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { OpportunityKinds } from "@/client/features/opportunities/OpportunityKinds";
import { OpportunityQuickFilters } from "@/client/features/opportunities/OpportunityQuickFilters";
import { OpportunitySummary } from "@/client/features/opportunities/OpportunitySummary";
import {
  applyFilters,
  pathOf,
  quickCounts,
  topOpportunity,
  type KindId,
  type QuickId,
} from "@/client/features/opportunities/opportunityLogic";
/**
 * Every page Google showed, ranked by what working on it would be worth.
 *
 * This used to keep only positions 4 through 20 and call the rest "not an
 * opportunity", which threw away two real ones: a page ranking second whose
 * snippet nobody clicks is a title-and-description afternoon, and a page at
 * 34 with four thousand impressions is a content decision. An opportunity is
 * an opportunity; the band only ever said which *kind* -- so that is what
 * the tiles above the table now say.
 *
 * Which page to spend a week on is the actual question, and Search Console
 * alone cannot answer it because it does not know which pages earn anything.
 * Joining it with GA4 outcomes does: demand at 50%, business value at 30%,
 * and how close the page already is at 20%.
 */
/*
 * 100 is the ceiling `SearchOpportunityService` enforces, and it threw a
 * validation error rather than clamping -- so the 250 this list used to
 * offer broke the screen every time it was picked. Kept in step with
 * `opportunitiesSchema`, which now caps at the same number.
 */
const LIMITS = [25, 50, 100] as const;

/*
 * The same vocabulary the search-performance and analytics screens use. This
 * screen had no window control at all -- 28 days was a literal inside
 * `SearchOpportunityService` with no path to override it -- so "bu aralıkta
 * fırsat yok" was a verdict on a period the operator never chose and could
 * not widen.
 */
const WINDOWS = [
  { days: 7, label: "Son 7 gün" },
  { days: 28, label: "Son 28 gün" },
  { days: 90, label: "Son 90 gün" },
] as const;

type WindowDays = (typeof WINDOWS)[number]["days"];

/** "Analytics" is a Latin brand word; under lang="tr" the tile's uppercase would print it as "ANALYTİCS". */
function AnalyticsLabel({ suffix }: { suffix: string }) {
  return (
    <>
      <span lang="en">Analytics</span>
      {suffix}
    </>
  );
}

export function OpportunitiesPage({
  projectId,
  windowDays,
  limit,
  onViewChange,
}: {
  projectId: string;
  /** Held in the URL by the route, so a reload or a shared link keeps it. */
  windowDays: WindowDays;
  limit: (typeof LIMITS)[number];
  onViewChange: (next: {
    windowDays?: WindowDays;
    limit?: (typeof LIMITS)[number];
  }) => void;
}) {
  const query = useQuery({
    queryKey: ["searchOpportunities", projectId, limit, windowDays],
    queryFn: () =>
      getSearchOpportunities({ data: { projectId, limit, windowDays } }),
    retry: false,
    // Keep the previous rows (and the pickers mounted) while a new window or
    // limit loads, so focus and the report state survive a change; never
    // across projects, where they would be the wrong site's pages.
    placeholderData: (previous, previousQuery) =>
      previousQuery?.queryKey[1] === projectId ? previous : undefined,
  });

  return (
    <PageShell>
      <PageHeader
        title="Fırsatlar"
        description="Google'da görünen sayfalarınız, emek harcamaya değer olma sırasına göre."
        /* Beside the title because they re-query everything below, the same
           place Rankings puts its window. Shown whenever the data came back
           ok, so the empty state keeps its way to widen the period. */
        actions={
          <PageActions>
            {query.data?.status === "ok" ? (
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

      <Intro />

      {query.isPending ? (
        <div className="space-y-4" aria-busy>
          <div className="skeleton h-[104px]" />
          <div className="skeleton h-96" />
        </div>
      ) : query.isError ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <QueryErrorState
            error={query.error}
            onRetry={() => void query.refetch()}
            title="Fırsatlar yüklenemedi"
          />
        </div>
      ) : query.data.status === "ok" ? (
        <Report
          data={query.data.report}
          projectId={projectId}
          stale={query.isPlaceholderData}
        />
      ) : (
        <NotReady projectId={projectId} missing={query.data.status} />
      )}
    </PageShell>
  );
}

function WindowPicker({
  windowDays,
  onChange,
}: {
  windowDays: WindowDays;
  onChange: (days: WindowDays) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <label htmlFor="opportunity-window">Dönem</label>
      <select
        id="opportunity-window"
        className="select select-bordered select-sm w-32"
        value={windowDays}
        onChange={(event) => {
          const next = WINDOWS.find(
            (option) => String(option.days) === event.target.value,
          );
          if (next) onChange(next.days);
        }}
      >
        {WINDOWS.map((option) => (
          <option key={option.days} value={option.days}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* Without this the cut list had no control at all: no pagination, no
   limit, nothing saying more existed. */
function LimitPicker({
  limit,
  onChange,
}: {
  limit: (typeof LIMITS)[number];
  onChange: (limit: (typeof LIMITS)[number]) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <label htmlFor="opportunity-limit">Satır sayısı</label>
      <select
        id="opportunity-limit"
        className="select select-bordered select-sm w-24"
        value={limit}
        onChange={(event) => {
          const next = LIMITS.find(
            (option) => String(option) === event.target.value,
          );
          if (next) onChange(next);
        }}
      >
        {LIMITS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/** A tile that does something: a button, so keyboard and touch reach it. */
function TileButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="block h-full w-full text-left transition-colors enabled:hover:bg-base-200/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary disabled:cursor-default"
    >
      {children}
    </button>
  );
}

function Report({
  data,
  projectId,
  stale,
}: {
  data: OpportunityReport;
  projectId: string;
  /** A new window or row count is loading behind these rows. */
  stale: boolean;
}) {
  const [kind, setKind] = useState<KindId | null>(null);
  const [quick, setQuick] = useState<QuickId | null>(null);
  const [openPage, setOpenPage] = useState<string | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const shown = applyFilters(data.rows, kind, quick);
  const filtered = kind !== null || quick !== null;

  const counts = quickCounts(data.rows);
  const top = topOpportunity(data.rows);

  if (data.rows.length === 0) {
    /*
     * The window picker lives in the page header and stays there for this
     * branch. Without it a 7-day window that found nothing left the operator
     * on an empty page with no way to widen the period.
     */
    return (
      <div className="rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
        <NoOpportunities
          dateRange={data.request.dateRange}
          pagesConsidered={data.coverage.gscRowsConsidered}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-6 transition-opacity ${
        stale ? "opacity-60" : ""
      }`}
      aria-busy={stale}
    >
      {/* One block: three one-line notes read as one note, not three sections. */}
      <div className="space-y-1">
        {data.truncated.gsc ? (
          <p className="text-xs text-muted">
            Search Console tek seferde sınırlı sayıda satır verir ve bu sınıra
            ulaşıldı; gerçekte daha fazla aday sayfa olabilir.
          </p>
        ) : null}

        {data.warnings.includes("source_time_zones_differ") ? (
          <p className="text-xs text-muted">
            Search Console ve Analytics farklı saat dilimlerinde raporluyor;
            günlük eşleşmeler bir gün kayabilir.
          </p>
        ) : null}

        {/*
         * The window the numbers below actually cover. It used to appear only
         * in the empty state, so an operator reading a populated screen was
         * never told which days it was about -- or that Search Console's
         * newest finalised day is three days behind, which is why "bugün"
         * is never the end of it.
         */}
        <p className="text-xs text-muted">
          {describeWindow(
            data.request.dateRange.startDate,
            data.request.dateRange.endDate,
            formatDate,
          )}
        </p>
      </div>

      <MetricRow>
        {/* `rowCount` is the slice, not a verdict: every candidate is
            scored, so "Fırsat 50" beside "300 aday sayfadan" used to read as
            "50 of your 300 qualified" when it meant "you are looking at the
            top 50 of 300". The hint says which, and the selector below lets
            the operator actually reach the rest. */}
        {/*
         * Counts what is on screen. With a kind selected the tile
         * kept reporting the unfiltered total -- "50" above nine visible
         * rows -- while the export menu beside it already labelled itself
         * from the filtered array.
         */}
        <MetricTile
          label="Listelenen"
          value={formatNumber(shown.length)}
          hint={
            filtered
              ? `Süzgece uyan · ${formatNumber(data.rowCount)} satır içinde`
              : data.truncated.candidates
                ? `${formatNumber(data.totalCandidateRows)} aday sayfanın en iyileri`
                : `Tüm aday sayfalar (${formatNumber(data.totalCandidateRows)})`
          }
        />
        {/* Was "Puanlanan", counted over the returned page, and every row
            carries a score since unmatched pages started being scored too -
            so it always equalled the row count while its hint described the
            Analytics match. This is the number the hint meant. */}
        <MetricTile
          label={<AnalyticsLabel suffix="'te karşılığı var" />}
          value={formatNumber(data.coverage.matchedRows)}
          hint={`${formatNumber(data.totalCandidateRows)} aday içinde`}
        />
        {/* A count with no way to see those pages is a complaint, not a
            tool, so it applies the same filter the chip below does. The tile
            counts every candidate, the chip only the rows returned. */}
        <TileButton
          disabled={counts.no_analytics === 0}
          onClick={() => {
            setKind(null);
            setQuick("no_analytics");
          }}
        >
          <MetricTile
            label={<AnalyticsLabel suffix="'te karşılığı yok" />}
            value={formatNumber(data.coverage.unmatchedGscRows)}
            hint={
              counts.no_analytics === 0
                ? "Listedeki her sayfanın Analytics karşılığı var"
                : `Listelenen ${formatNumber(data.rowCount)} sayfanın ${formatNumber(counts.no_analytics)} tanesi · listele`
            }
          />
        </TileButton>
        {/* Was a tile naming the business-value setting, which is a label
            rather than a number; the footnote says how it is chosen. */}
        <TileButton
          disabled={top === null}
          onClick={() => {
            if (top === null) return;
            setKind(null);
            setQuick(null);
            setOpenPage(top.page);
          }}
        >
          <MetricTile
            label="En yüksek puan"
            value={top?.score == null ? null : formatNumber(top.score)}
            hint={top === null ? undefined : `${pathOf(top.page)} · ayrıntı`}
          />
        </TileButton>
      </MetricRow>

      <OpportunitySummary
        rows={data.rows}
        selectedKind={kind}
        onSelectKind={setKind}
      />

      <OpportunityKinds rows={data.rows} selected={kind} onSelect={setKind} />

      <OpportunityQuickFilters
        counts={counts}
        selected={quick}
        onSelect={setQuick}
        ref={filtersRef}
      />

      <OpportunitiesTable
        projectId={projectId}
        rows={shown}
        openPage={openPage}
        onOpenPageChange={setOpenPage}
        onReset={
          filtered
            ? () => {
                // The button being clicked is about to unmount.
                filtersRef.current?.focus();
                setKind(null);
                setQuick(null);
              }
            : undefined
        }
      />

      <div className="space-y-1 text-xs text-muted">
        <p>
          <span className="font-medium text-base-content">
            Puan nasıl hesaplanır?
          </span>{" "}
          Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri{" "}
          {data.scoring.businessValueMetric === "engagementRate"
            ? data.scoring.engagementFallback
              ? "dönüşüm tanımlı olmadığı için etkileşim oranına"
              : "etkileşim oranına"
            : "dönüşümlere"}{" "}
          göre hesaplandı.
        </p>
        <p>
          <span className="font-medium text-base-content">
            Analytics&apos;te karşılığı yok ne demek?
          </span>{" "}
          Analytics o sayfaya hiç ziyaret görmemiş ya da adresi farklı yazılmış
          olabilir. Bu sayfalar da puanlanır; iş değerinde haksız yere sıfır
          almamaları için nötr bir orta değer verilir.
        </p>
      </div>
    </div>
  );
}
