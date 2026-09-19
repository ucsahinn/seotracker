import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { MetricRow, MetricTile } from "@/client/components/MetricTile";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { formatNumber, formatPercent } from "@/client/lib/format";
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
export function OpportunitiesPage({ projectId }: { projectId: string }) {
  const query = useQuery({
    queryKey: ["searchOpportunities", projectId],
    queryFn: () => getSearchOpportunities({ data: { projectId } }),
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
        <NotReady projectId={projectId} error={query.error} />
      ) : (
        <Report data={query.data} />
      )}
    </PageShell>
  );
}

/**
 * This screen needs both Search Console and Analytics, so "not connected" is
 * the expected first state rather than a failure. Say which one is missing
 * and link to it instead of printing an API error.
 */
function NotReady({ projectId, error }: { projectId: string; error: unknown }) {
  const message = getStandardErrorMessage(error);
  const needsGa4 = /analytics/i.test(message);

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

function Report({
  data,
}: {
  data: Awaited<ReturnType<typeof getSearchOpportunities>>;
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

  const scored = data.rows.filter((row) => row.score != null).length;

  return (
    <>
      <MetricRow>
        <MetricTile
          label="Fırsat"
          value={formatNumber(data.rowCount)}
          hint={`${formatNumber(data.totalCandidateRows)} aday sayfadan`}
        />
        <MetricTile
          label="Puanlanan"
          value={formatNumber(scored)}
          hint="Analytics verisiyle eşleşenler"
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
                  <td className="text-right">{row.position.toFixed(1)}</td>
                  <td className="text-right">
                    {formatNumber(row.impressions)}
                  </td>
                  <td className="text-right">{formatNumber(row.clicks)}</td>
                  <td className="text-right">{formatPercent(row.ctr)}</td>
                  <td className="text-right text-base-content/60">
                    {row.ga4 ? formatNumber(row.ga4.sessions) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-base-content/45">
        Puan = talep (%50) + iş değeri (%30) + erişilebilirlik (%20).
        Analytics&apos;te eşleşmeyen sayfalar listede kalır ama puanlanmaz.
      </p>
    </>
  );
}

function ScoreBadge({ score }: { score: number | null | undefined }) {
  if (score == null) {
    return <span className="text-base-content/30">-</span>;
  }
  // One threshold, not a rainbow: above 60 is worth planning work around.
  const strong = score >= 60;
  return (
    <span
      className={`badge badge-sm tabular-nums ${
        strong
          ? "border-success/30 bg-success/10 text-success"
          : "border-base-300 bg-base-200 text-base-content/70"
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
