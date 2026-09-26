import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  formatDecimal,
  formatNumber,
  formatPercent,
} from "@/client/lib/format";
import { getSearchOpportunities } from "@/serverFunctions/opportunities";

/**
 * Pages sitting between positions 4 and 20, ranked by what moving them up
 * would be worth.
 *
 * Position 4 to 20 is the band where effort pays: the page already ranks, so
 * Google has accepted it, and the clicks above it are real. Which of them to
 * spend a week on is the actual question, and Search Console alone cannot
 * answer it because it does not know which pages earn anything. Joining the
 * band with GA4 outcomes does, and the scoring weighs demand at 50%,
 * business value at 30% and how close the page already is at 20%.
 */
const LIMITS = [50, 100, 250] as const;

export function OpportunitiesPage({ projectId }: { projectId: string }) {
  const [limit, setLimit] = useState<(typeof LIMITS)[number]>(50);
  const query = useQuery({
    queryKey: ["searchOpportunities", projectId, limit],
    queryFn: () => getSearchOpportunities({ data: { projectId, limit } }),
    retry: false,
  });

  return (
    <PageShell>
      <PageHeader
        title="Fırsatlar"
        description="4. ile 20. sıra arasındaki sayfalarınız, yukarı taşımanın değerine göre sıralanmış."
      />

      {query.isPending ? (
        <div className="space-y-4" aria-busy>
          <div className="skeleton h-[104px]" />
          <div className="skeleton h-96" />
        </div>
      ) : query.isError ? (
        <div className="alert alert-error">
          <span className="text-sm">
            {getStandardErrorMessage(query.error)}
          </span>
        </div>
      ) : query.data.status === "ok" ? (
        <Report
          data={query.data.report}
          limit={limit}
          onLimitChange={setLimit}
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

type OpportunityReport = Extract<
  Awaited<ReturnType<typeof getSearchOpportunities>>,
  { status: "ok" }
>["report"];

function Report({
  data,
  limit,
  onLimitChange,
}: {
  data: OpportunityReport;
  limit: number;
  onLimitChange: (limit: (typeof LIMITS)[number]) => void;
}) {
  if (data.rows.length === 0) {
    return (
      <div className="rounded-box border border-base-300 bg-base-100">
        <EmptyState
          icon={Target}
          title="Bu aralıkta sayfa yok"
          description="Hiçbir sayfanız 4. ile 20. sıra arasında değil. Bu iyi ya da kötü olabilir: ya hepsi ilk üçte, ya da henüz kimse görmüyor."
        />
      </div>
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

      <MetricRow>
        {/* `rowCount` is the slice, not a verdict: every candidate is
            scored, so "Fırsat 50" beside "300 aday sayfadan" used to read as
            "50 of your 300 qualified" when it meant "you are looking at the
            top 50 of 300". The hint says which, and the selector below lets
            the operator actually reach the rest. */}
        <MetricTile
          label="Gösterilen"
          value={formatNumber(data.rowCount)}
          hint={
            data.truncated.candidates
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
      <div className="flex items-center justify-end gap-2 text-xs text-muted">
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

      <div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th className="w-16 text-right">Puan</th>
                <th>Sayfa</th>
                <th className="text-right">Sıra</th>
                <th className="text-right">Gösterim</th>
                <th className="text-right">Tıklama</th>
                <th className="text-right">TO</th>
                <th className="text-right">Oturum</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.page}>
                  <td className="text-right">
                    <ScoreBadge score={row.score} />
                  </td>
                  <td className="max-w-md">
                    <span className="block truncate" title={row.page}>
                      {pathOf(row.page)}
                    </span>
                  </td>
                  <td className="text-right">{formatDecimal(row.position)}</td>
                  <td className="text-right">
                    {formatNumber(row.impressions)}
                  </td>
                  <td className="text-right">{formatNumber(row.clicks)}</td>
                  <td className="text-right">{formatPercent(row.ctr)}</td>
                  <td className="text-right text-muted">
                    {row.ga4 ? formatNumber(row.ga4.sessions) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted">
        Puan = talep (%50) + iş değeri (%30) + erişilebilirlik (%20).
        Analytics&apos;te eşleşmeyen sayfalar da puanlanır; iş değeri için hak
        etmedikleri bir sıfır yerine nötr orta değeri alırlar.
      </p>
    </>
  );
}

function ScoreBadge({ score }: { score: number | null | undefined }) {
  if (score == null) {
    return <span className="text-subtle">-</span>;
  }
  // One threshold, not a rainbow: above 60 is worth planning work around.
  const strong = score >= 60;
  return (
    <span
      className={`badge badge-sm tabular-nums ${
        strong
          ? "border-success/30 bg-success/10 text-[var(--ink-success)]"
          : "border-base-300 bg-base-200 text-muted"
      }`}
    >
      {score}
    </span>
  );
}

function pathOf(url: string): string {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}
