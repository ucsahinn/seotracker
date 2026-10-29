import { t } from "@/shared/i18n";
import { DATA_SERIES } from "@/client/components/Chart";
import type { ReactNode } from "react";
import { sort } from "remeda";
import { AlertTriangle } from "lucide-react";
import { CannibalizationTable } from "@/client/features/search-performance/CannibalizationTable";
import { useCannibalizationReport } from "@/client/features/search-performance/useCannibalizationReport";
import { formatNumber, formatPercent } from "@/client/lib/format";
import type {
  SearchPerformanceDateRange,
  SearchPerformanceDevice,
  SearchPerformanceType,
} from "@/types/schemas/search-performance";

/**
 * The query losing the most impressions to a page that is not the primary
 * one, by the split the server counted (`splitImpressions`).
 */
function worstCannibalized<R extends { splitImpressions: number }>(
  rows: R[],
): R | undefined {
  return sort(rows, (a, b) => b.splitImpressions - a.splitImpressions)[0];
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="space-y-3 border-b border-[var(--hairline)] px-4 py-3">
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Stat({
  label,
  value,
  detail,
  metric,
}: {
  label: string;
  value: string;
  metric?: keyof typeof DATA_SERIES;
  /** The proportion that makes the number weighable. */
  detail?: string;
}) {
  const style:
    | (React.CSSProperties & { "--metric-color": string })
    | undefined = metric
    ? { "--metric-color": DATA_SERIES[metric] }
    : undefined;
  return (
    <div
      className={metric ? "metric-tile min-w-0 px-4 py-3" : "min-w-0 px-4 py-3"}
      data-metric={metric}
      style={style}
    >
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="metric-value mt-0.5 text-xl font-semibold tabular-nums">
        {value}
      </dd>
      {detail ? (
        <dd className="text-xs tabular-nums text-muted">{detail}</dd>
      ) : null}
    </div>
  );
}

/** The overlaps tab's headline: how many queries split, and the worst one. */
function CannibalizationSummary({
  projectId,
  dateRange,
  device,
  country,
  searchType,
  onPickQuery,
}: {
  projectId: string;
  dateRange: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  searchType: SearchPerformanceType;
  /** Narrows the list below to this query. */
  onPickQuery: (query: string) => void;
}) {
  const report = useCannibalizationReport({
    projectId,
    dateRange,
    device,
    country,
    searchType,
  });
  const title = t("Aynı sorgu, birden çok sayfa");
  if (report.isPending) {
    return (
      <div
        className="space-y-2 border-b border-[var(--hairline)] px-4 py-3"
        aria-busy
      >
        <div className="skeleton h-4 w-48" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-12" />
          ))}
        </div>
      </div>
    );
  }
  // The table below carries the error and its retry.
  const data = report.data;
  if (report.isError || !data) return null;
  if (data.rows.length === 0) {
    return (
      <Card
        title={title}
        description={
          data.queriesAnalyzed === 0
            ? t(
                "Search Console bu dönem için sorgu vermedi, bu yüzden karşılaştırılacak bir şey yok.",
              )
            : t(
                "Hiçbir sorguda iki sayfanız birbiriyle yarışmıyor, bu yüzden özetlenecek bir şey yok.",
              )
        }
      />
    );
  }
  const worst = worstCannibalized(data.rows);
  return (
    <Card
      title={title}
      description={t("{count} sorgu incelendi.", {
        count: data.queriesAnalyzed,
      })}
    >
      <dl
        className="grid divide-y divide-[var(--hairline)] rounded-box border border-[var(--hairline)] bg-base-100 shadow-[var(--shadow-raise)] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        aria-label={t(
          "{queries} sorguda birden fazla sayfanız yarışıyor; {impressions} gösterim risk altında.",
          {
            queries: formatNumber(data.rows.length),
            impressions: formatNumber(data.splitImpressions),
          },
        )}
      >
        <Stat
          label={t("Birden çok sayfanın yarıştığı sorgu")}
          value={t("{count} / {total}", {
            count: formatNumber(data.rows.length),
            total: formatNumber(data.queriesAnalyzed),
          })}
          detail={
            data.queriesAnalyzed > 0
              ? t("incelenen sorguların {share} kadarı", {
                  share: formatPercent(
                    data.rows.length / data.queriesAnalyzed,
                    0,
                  ),
                })
              : undefined
          }
        />
        <Stat
          metric="impressions"
          label={t("Ana sayfa dışına giden gösterim")}
          value={formatNumber(data.splitImpressions)}
          detail={
            data.analyzedImpressions > 0
              ? t("incelenen gösterimlerin {share} kadarı", {
                  share: formatPercent(
                    data.splitImpressions / data.analyzedImpressions,
                    2,
                  ),
                })
              : undefined
          }
        />
        {worst ? (
          <div className="min-w-0 px-4 py-3">
            <dt className="text-xs text-muted">
              {t("En çok kaybettiren sorgu")}
            </dt>
            <dd className="mt-0.5">
              <button
                type="button"
                className="link link-hover flex max-w-full items-center gap-1.5 text-left text-sm font-medium"
                title={t("Listeyi bu sorguya daraltır")}
                onClick={() => onPickQuery(worst.query)}
              >
                <AlertTriangle
                  aria-hidden
                  className="size-3.5 shrink-0 text-[var(--ink-warning)]"
                />
                <span className="truncate" title={worst.query}>
                  {worst.query}
                </span>
              </button>
              <span className="text-xs text-muted tabular-nums">
                {t("{impressions} gösterim bölünüyor · {pages} sayfa", {
                  impressions: formatNumber(worst.splitImpressions),
                  pages: formatNumber(worst.competitors.length + 1),
                })}
              </span>
            </dd>
          </div>
        ) : null}
      </dl>
    </Card>
  );
}

/** The overlaps tab: queries where several of your pages compete. */
export function OverlapsTab({
  projectId,
  range,
  device,
  country,
  searchType,
  search,
  onSearch,
}: {
  projectId: string;
  range: SearchPerformanceDateRange;
  device?: SearchPerformanceDevice;
  country?: string;
  searchType: SearchPerformanceType;
  search: string;
  onSearch: (next: string | undefined) => void;
}) {
  return (
    <>
      <details className="border-b border-[var(--hairline)] px-4 py-2 text-sm text-muted">
        <summary className="min-h-11 cursor-pointer py-3">
          {t("Veri hakkında")}
        </summary>
        <p className="max-w-prose leading-relaxed">
          {t(
            "Aynı sorguda birden çok sayfanızın göründüğü durumlar. Sayfalar birbirinin tıklamasını bölebilir; birini ana sayfa yapıp diğerlerinden ona bağlantı vermek çoğu zaman yeter.",
          )}
          {range === "last_7_days"
            ? ` ${t("Bu analiz için 7 günlük seçim 28 güne çıkarılır. Gerçek tarih aralığı aşağıda yazar.")}`
            : null}
        </p>
      </details>
      <CannibalizationSummary
        projectId={projectId}
        dateRange={range}
        device={device}
        country={country}
        searchType={searchType}
        onPickQuery={(picked) => onSearch(picked)}
      />
      <CannibalizationTable
        projectId={projectId}
        dateRange={range}
        device={device}
        country={country}
        searchType={searchType}
        search={search}
        onClearSearch={() => onSearch(undefined)}
      />
    </>
  );
}
