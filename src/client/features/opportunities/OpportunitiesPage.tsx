import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "@/client/components/EmptyState";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { OpportunitiesTable } from "@/client/features/opportunities/OpportunitiesTable";
import type { OpportunityReport } from "@/client/features/opportunities/report";
import { formatDate, formatNumber } from "@/client/lib/format";
import { describeWindow } from "@/shared/dataFreshness";
import { getSearchOpportunities } from "@/serverFunctions/opportunities";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import {
  OpportunityKinds,
  type KindId,
} from "@/client/features/opportunities/OpportunityKinds";
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
  });

  return (
    <PageShell>
      <PageHeader
        title="Fırsatlar"
        description="Arama sonuçlarında görünen sayfalarınız, üzerinde çalışmanın değerine göre sıralanmış."
      />

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
          limit={limit}
          onLimitChange={(next) => onViewChange({ limit: next })}
          windowDays={windowDays}
          onWindowChange={(next) => onViewChange({ windowDays: next })}
          projectId={projectId}
        />
      ) : (
        <NotReady projectId={projectId} missing={query.data.status} />
      )}
    </PageShell>
  );
}

/**
 * This screen needs both Search Console and Analytics, so "not connected" is
 * the expected first state rather than a failure. The server says which one is
 * missing; this used to guess by matching the error text, which never worked
 * because the message reaching the client is a generic one.
 */
function NotReady({
  projectId,
  missing,
}: {
  projectId: string;
  missing: "needs_ga4" | "needs_gsc";
}) {
  const needsGa4 = missing === "needs_ga4";

  return (
    <div className="rounded-box border border-base-300 bg-base-100">
      <EmptyState
        icon={Target}
        title={
          needsGa4
            ? "Google Analytics bağlı değil"
            : "Search Console bağlı değil"
        }
        description="Bu sayfa iki kaynağı birleştirir: sıralarınız Search Console'dan, o sayfaların ne kazandırdığı Analytics'ten gelir. İkisi de bağlı olmadan bir fırsat puanlanamaz."
        action={
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-primary btn-sm"
          >
            Bağlantıları aç
          </Link>
        }
      />
    </div>
  );
}

/**
 * Nothing scored — and which of the two reasons it was decides what to do
 * next, so the screen has to say which.
 *
 * The old copy offered both at once ("ya hepsi ilk üçte, ya da henüz kimse
 * görmüyor") and neither is true when Search Console returned no pages at
 * all for the period, which is exactly the state a fresh property is in.
 * It also never named the period, so "no pages" read as a verdict on the
 * site rather than on twenty-eight days of it.
 */
function NoOpportunities({
  dateRange,
  pagesConsidered,
}: {
  dateRange: { startDate: string; endDate: string };
  pagesConsidered: number;
}) {
  const period = `${formatDate(dateRange.startDate)} – ${formatDate(dateRange.endDate)}`;

  if (pagesConsidered === 0) {
    return (
      <EmptyState
        icon={Target}
        title="Search Console bu dönem için veri döndürmedi"
        description={`${period} aralığında hiçbir sayfanız arama sonuçlarında görünmedi. Mülk yeni bağlandıysa Google'ın veriyi doldurması birkaç gün sürer.`}
      />
    );
  }

  return (
    <EmptyState
      icon={Target}
      title="Bu aralıkta fırsat yok"
      description={`${period} aralığında hiçbir sayfanız arama sonuçlarında gösterilmedi.`}
    />
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
    <div className="flex items-center gap-2">
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

function Report({
  data,
  limit,
  onLimitChange,
  windowDays,
  onWindowChange,
  projectId,
}: {
  data: OpportunityReport;
  limit: number;
  onLimitChange: (limit: (typeof LIMITS)[number]) => void;
  windowDays: WindowDays;
  onWindowChange: (days: WindowDays) => void;
  projectId: string;
}) {
  const [kind, setKind] = useState<KindId | null>(null);

  const shown =
    kind === null ? data.rows : data.rows.filter((row) => row.kind === kind);

  const windowControl = (
    <WindowPicker windowDays={windowDays} onChange={onWindowChange} />
  );

  if (data.rows.length === 0) {
    /*
     * The picker stays on screen. Without it a 7-day window that found
     * nothing left the operator on an empty page whose only control was a
     * row-count selector -- no way to widen the period that produced the
     * emptiness.
     */
    return (
      <>
        <div className="flex justify-end">{windowControl}</div>
        <div className="rounded-box border border-base-300 bg-base-100">
          <NoOpportunities
            dateRange={data.request.dateRange}
            pagesConsidered={data.coverage.gscRowsConsidered}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {data.truncated.gsc ? (
        <p className="text-xs text-muted">
          Search Console tek seferde sınırlı satır döndürür ve bu sınıra
          takıldık, yani aday sayfa sayısı da gerçekte daha yüksek olabilir.
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
          label="Gösterilen"
          value={formatNumber(shown.length)}
          hint={
            kind !== null
              ? `Seçili türde · ${formatNumber(data.rowCount)} satır içinde`
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
          label="Analytics eşleşmesi"
          value={formatNumber(data.coverage.matchedRows)}
          hint={`${formatNumber(data.totalCandidateRows)} aday içinde`}
        />
        <MetricTile
          label="Eşleşmeyen"
          value={formatNumber(data.coverage.unmatchedGscRows)}
          hint="Analytics'te karşılığı bulunamadı"
        />
        <MetricTile
          label="İş değeri ölçütü"
          value={
            data.scoring.businessValueMetric === "engagementRate"
              ? "Etkileşim"
              : "Dönüşüm"
          }
          hint={
            data.scoring.engagementFallback
              ? "Dönüşüm tanımlı değil, etkileşime düşüldü"
              : undefined
          }
        />
      </MetricRow>

      {/* Without this the cut list had no control at all: no pagination, no
          limit, nothing saying more existed. */}
      <div className="flex flex-wrap items-center justify-end gap-3 text-xs text-muted">
        {windowControl}
        <label htmlFor="opportunity-limit">Gösterilecek satır</label>
        <select
          id="opportunity-limit"
          className="select select-bordered select-sm w-24"
          value={limit}
          onChange={(event) => {
            const next = LIMITS.find(
              (option) => String(option) === event.target.value,
            );
            if (next) onLimitChange(next);
          }}
        >
          {LIMITS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <OpportunityKinds rows={data.rows} selected={kind} onSelect={setKind} />

      <OpportunitiesTable projectId={projectId} rows={shown} />

      <p className="text-xs text-muted">
        Puan = talep (%50) + iş değeri (%30) + erişilebilirlik (%20).
        Analytics&apos;te eşleşmeyen sayfalar da puanlanır; iş değeri için hak
        etmedikleri bir sıfır yerine nötr orta değeri alırlar.
      </p>
    </>
  );
}
