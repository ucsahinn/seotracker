import { t } from "@/shared/i18n";
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
import { formatCount, formatDate, formatPercent } from "@/client/lib/format";
import { GSC_DATA_LAG_DAYS } from "@/shared/dataFreshness";
import type { WorkKind } from "@/shared/pageOpportunities";
import { getSearchOpportunities } from "@/serverFunctions/opportunities";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { OpportunityWorkBars } from "@/client/features/opportunities/OpportunityWorkBars";
import { OpportunityMethod } from "@/client/features/opportunities/OpportunityMethod";
import { OpportunityQuickFilters } from "@/client/features/opportunities/OpportunityQuickFilters";
import {
  applyFilters,
  extraConversions,
  pathOf,
  quickCounts,
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
    // limit loads; never across projects.
    placeholderData: (previous, previousQuery) =>
      previousQuery?.queryKey[1] === projectId ? previous : undefined,
  });

  return (
    <PageShell>
      <PageHeader
        title={t("Fırsatlar")}
        description={t(
          "Her sayfanın ayda kaç tıklama daha getirebileceği ve bunun için ne yapmanız gerektiği.",
        )}
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

      <Intro
        collapsedByDefault={
          query.data !== undefined && query.data.status !== "ok"
        }
      />

      {query.isPending ? (
        <div className="space-y-4" aria-busy>
          <div className="skeleton h-[104px]" />
          <div className="skeleton h-48" />
          <div className="skeleton h-96" />
        </div>
      ) : query.isError ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <QueryErrorState
            error={query.error}
            onRetry={() => void query.refetch()}
            title={t("Fırsatlar yüklenemedi")}
          />
        </div>
      ) : query.data.status === "ok" ? (
        <Report
          data={query.data.report}
          projectId={projectId}
          stale={query.isPlaceholderData}
        />
      ) : (
        <NotReady projectId={projectId} />
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
      <label htmlFor="opportunity-window">{t("Dönem")}</label>
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
            {t(option.label)}
          </option>
        ))}
      </select>
    </div>
  );
}

function LimitPicker({
  limit,
  onChange,
}: {
  limit: (typeof LIMITS)[number];
  onChange: (limit: (typeof LIMITS)[number]) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <label htmlFor="opportunity-limit">{t("Satır sayısı")}</label>
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
  const [work, setWork] = useState<WorkKind | null>(null);
  const [quick, setQuick] = useState<QuickId | null>(null);
  const [openPage, setOpenPage] = useState<string | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const shown = applyFilters(data.rows, work, quick);
  const filtered = work !== null || quick !== null;
  const counts = quickCounts(data.rows);
  const chips = usefulChips(counts, data.rows.length);
  const top = data.rows[0] ?? null;
  const { totals } = data;
  const range = data.request.dateRange;
  const period = t("{start} – {end}", {
    start: formatDate(range.startDate),
    end: formatDate(range.endDate),
  });
  const analyticsOn = data.analytics.state === "connected";
  const converting = data.rows.filter((row) => row.value === "converts");
  const conversions = converting.reduce(
    (sum, row) => sum + (extraConversions(row) ?? 0),
    0,
  );

  if (data.rows.length === 0) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)]">
        <NoOpportunities
          dateRange={range}
          pagesConsidered={totals.pagesConsidered}
          curveInsufficient={data.method.curveInsufficient}
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
      {/* The window, once, above everything it covers. */}
      <p className="text-xs text-muted">
        {t(
          "Son {days} gün · {period}. Search Console {lag} gün geriden gelir; Analytics oturumları da aynı günlerden okunur. Tahminler 30 güne ölçeklenir.",
          { days: data.request.days, period, lag: GSC_DATA_LAG_DAYS },
        )}
      </p>

      <MetricRow>
        <MetricTile
          label={t("En fazla kazanılabilecek tıklama / ay (üst sınır)")}
          value={plusCount(totals.gainPerMonth)}
          animateTo={{ value: totals.gainPerMonth, format: plusCount }}
          hint={
            totals.clicksPerMonth > 0
              ? t(
                  "{count} sayfada · bu sayfalar bugün ayda {clicks} tıklama alıyor, kazanç bunun {share} kadarı",
                  {
                    count: data.totalCandidateRows,
                    clicks: formatCount(totals.clicksPerMonth),
                    share: formatPercent(
                      totals.gainPerMonth / totals.clicksPerMonth,
                      0,
                    ),
                  },
                )
              : t("{count} sayfada", { count: data.totalCandidateRows })
          }
        />
        <TileButton
          disabled={top === null}
          onClick={() => {
            if (top === null) return;
            setWork(null);
            setQuick(null);
            setOpenPage(top.page);
          }}
        >
          <MetricTile
            label={t("Önce şuna bakın")}
            value={top ? pathOf(top.page) : null}
            hint={
              top
                ? t("+{gain} tıklama/ay · {action}", {
                    gain: formatCount(top.gainPerMonth),
                    action: t(WORK_COPY[top.work].action),
                  })
                : undefined
            }
          />
        </TileButton>
        <TileButton
          disabled={!analyticsOn || counts.converts === 0}
          onClick={() => {
            setWork(null);
            setQuick("converts");
          }}
        >
          <MetricTile
            label={t("Dönüşüm getiren sayfalar")}
            value={analyticsOn ? formatCount(counts.converts) : null}
            animateTo={
              analyticsOn
                ? { value: counts.converts, format: formatCount }
                : undefined
            }
            hint={
              !analyticsOn
                ? t("Analytics bağlanınca görünür")
                : counts.converts === 0
                  ? t("Listedeki sayfalardan dönüşüm gelmiyor")
                  : t(
                      "Kazanç gelirse ayda yaklaşık +{count} anahtar olay (tahmin) · listele",
                      { count: Math.round(conversions) },
                    )
            }
          />
        </TileButton>
        <MetricTile
          label={t("Kazanç beklenmeyen sayfalar")}
          value={formatCount(totals.noGainPages)}
          animateTo={{ value: totals.noGainPages, format: formatCount }}
          hint={t(
            "Zaten iyi sıradalar ve normal tıklanıyorlar ya da çok az gösterim aldılar; listede yoklar.",
          )}
        />
      </MetricRow>

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
          ref={filtersRef}
        />
      ) : null}

      <OpportunitiesTable
        projectId={projectId}
        days={data.request.days}
        rows={shown}
        openPage={openPage}
        onOpenPageChange={setOpenPage}
        onReset={
          filtered
            ? () => {
                // The button being clicked is about to unmount.
                filtersRef.current?.focus();
                setWork(null);
                setQuick(null);
              }
            : undefined
        }
      />

      {data.truncated.candidates ? (
        <p className="text-xs text-muted">
          {t(
            "Kazanç beklenen {total} sayfanın en büyük {count} tanesi listeleniyor; üstteki toplamlar hepsini kapsar.",
            { total: data.totalCandidateRows, count: data.rowCount },
          )}
        </p>
      ) : null}

      <OpportunityMethod data={data} projectId={projectId} />
    </div>
  );
}
