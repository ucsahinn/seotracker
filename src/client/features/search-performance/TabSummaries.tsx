import { t } from "@/shared/i18n";
import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import {
  DistributionBars,
  type DistributionRow,
} from "@/client/features/audit/results/DistributionBars";
import { QuickFilterBar } from "@/client/features/search-performance/QuickFilterBar";
import type { QuickFilterId } from "@/client/features/search-performance/quickFilters";
import type { Tab } from "@/client/features/search-performance/SearchPerformanceParts";
import {
  clickTierBuckets,
  hasEnoughGroups,
  positionBuckets,
  splitImpressionsOf,
  strikingBuckets,
  topShareOfClicks,
  worstCannibalized,
  type TabBucket,
} from "@/client/features/search-performance/tabBuckets";
import { useCannibalizationReport } from "@/client/features/search-performance/useCannibalizationReport";
import { formatCount, formatNumber, formatPercent } from "@/client/lib/format";
import type {
  SearchPerformanceDateRange,
  SearchPerformanceDevice,
  SearchPerformanceType,
} from "@/types/schemas/search-performance";

/**
 * One summary card per tab, fed by the rows that tab's table already holds.
 *
 * The page-level block above the tabs (daily trend, devices, countries) is
 * about the whole page. These say something only the open tab can: how its own
 * rows are spread. Each bar writes the same `f` URL filter the chips do, so
 * bar, chip and table share one source of truth.
 */

const QUERY_CHIPS: QuickFilterId[] = ["top10", "noClicks", "lowCtr"];
const PAGE_CHIPS: QuickFilterId[] = ["hasClicks", "noClicks"];
const STRIKING_CHIPS: QuickFilterId[] = ["pos5to10", "pos11to20"];

/**
 * The one list of `f` values each tab understands: its chips plus its bar
 * ids. A link carrying a value from another tab (`?tab=pages&f=pos5to10`)
 * must not narrow a table whose own chips and bars cannot show or clear it.
 */
const TAB_QUICK_FILTERS: Partial<Record<Tab, QuickFilterId[]>> = {
  striking: STRIKING_CHIPS,
  queries: [...QUERY_CHIPS, "pos1to3", "pos4to10", "pos11to20", "pos21plus"],
  pages: [...PAGE_CHIPS, "clicks1to9", "clicks10to99", "clicks100plus"],
};

/** The quick filter if this tab offers it, otherwise none. */
export function quickFilterForTab(
  tab: Tab,
  id: QuickFilterId | undefined,
): QuickFilterId | undefined {
  return id && TAB_QUICK_FILTERS[tab]?.includes(id) ? id : undefined;
}

type Selection = {
  active: QuickFilterId | undefined;
  onChange: (next: QuickFilterId | undefined) => void;
};

type Row = {
  clicks: number;
  impressions: number;
  position: number;
  ctr?: number;
};

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
    <section className="space-y-3 border-b border-base-300 px-4 py-3">
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function TabSummarySkeleton() {
  return (
    <div className="space-y-2 border-b border-base-300 px-4 py-3" aria-busy>
      <div className="skeleton h-4 w-48" />
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="skeleton h-7" />
      ))}
    </div>
  );
}

function Bars({
  buckets,
  selection,
  summary,
}: {
  buckets: TabBucket[];
  selection: Selection;
  summary: string;
}) {
  // One group is a rectangle that looks like a finding; the chips still work.
  if (!hasEnoughGroups(buckets)) return null;
  const rows = buckets.map(
    (bucket): DistributionRow => ({
      key: bucket.id,
      label: bucket.label,
      hint: bucket.hint || undefined,
      count: bucket.size,
      color: "var(--color-primary)",
      active: selection.active === bucket.id,
    }),
  );
  return (
    <DistributionBars
      rows={rows}
      summary={summary}
      onSelect={(key) => {
        // The bar hands back a plain string; the bucket knows the typed id.
        const id = buckets.find((bucket) => bucket.id === key)?.id;
        if (id) selection.onChange(selection.active === id ? undefined : id);
      }}
    />
  );
}

function Chips({
  rows,
  ids,
  selection,
}: {
  rows: Row[];
  ids: QuickFilterId[];
  selection: Selection;
}) {
  return (
    <QuickFilterBar
      rows={rows}
      ids={ids}
      active={selection.active}
      onChange={selection.onChange}
    />
  );
}

export function QueriesSummary({
  rows,
  ...selection
}: { rows: Row[] } & Selection) {
  const title = t("Sorgular kaç sırada?");
  if (rows.length === 0) {
    return (
      <Card
        title={title}
        description={t(
          "Bu filtrelerle Search Console sorgu vermedi, bu yüzden dağılım çizilemiyor.",
        )}
      />
    );
  }
  const buckets = positionBuckets(rows);
  const firstPage = (buckets[0]?.count ?? 0) + (buckets[1]?.count ?? 0);
  return (
    <Card
      title={title}
      description={t(
        "{total} sorgunun {firstPage} tanesi ilk sayfada (sıra 1-10). Bir çubuğa tıklayarak tabloyu daraltın.",
        { total: formatCount(rows.length), firstPage: formatCount(firstPage) },
      )}
    >
      <Bars
        buckets={buckets}
        selection={selection}
        summary={t(
          "{total} sorgunun ortalama sıraya göre dağılımı; {firstPage} tanesi ilk sayfada.",
          {
            total: formatCount(rows.length),
            firstPage: formatCount(firstPage),
          },
        )}
      />
      <Chips rows={rows} ids={QUERY_CHIPS} selection={selection} />
    </Card>
  );
}

export function PagesSummary({
  rows,
  ...selection
}: { rows: Row[] } & Selection) {
  const title = t("Tıklamalar sayfalara nasıl dağılıyor?");
  if (rows.length === 0) {
    return (
      <Card
        title={title}
        description={t(
          "Bu filtrelerle Search Console sayfa vermedi, bu yüzden dağılım çizilemiyor.",
        )}
      />
    );
  }
  const buckets = clickTierBuckets(rows);
  const share = topShareOfClicks(rows, 5);
  const clicked = rows.filter((row) => row.clicks > 0).length;
  const lead =
    share === null
      ? t("{total} sayfanın {clicked} tanesi tıklama aldı.", {
          total: formatCount(rows.length),
          clicked: formatCount(clicked),
        })
      : t("En çok tıklanan 5 sayfanın tıklamalardaki payı: {share}.", {
          share: formatPercent(share, 0),
        });
  return (
    <Card
      title={title}
      description={t("{lead} Bir çubuğa tıklayarak tabloyu daraltın.", {
        lead,
      })}
    >
      <Bars
        buckets={buckets}
        selection={selection}
        summary={t("{total} sayfanın aldığı tıklamaya göre dağılımı. {lead}", {
          total: formatCount(rows.length),
          lead,
        })}
      />
      <Chips rows={rows} ids={PAGE_CHIPS} selection={selection} />
    </Card>
  );
}

export function StrikingSummary({
  rows,
  ...selection
}: { rows: Row[] } & Selection) {
  const title = t("Sıra 5-20 fırsatı");
  if (rows.length === 0) {
    return (
      <Card
        title={title}
        description={t(
          "Sıralaması 5 ile 20 arasında kalan sorgu olmadığı için pay hesaplanamıyor.",
        )}
      />
    );
  }
  const buckets = strikingBuckets(rows);
  const impressions = buckets.reduce((sum, bucket) => sum + bucket.size, 0);
  return (
    <Card
      title={title}
      description={t(
        "{queries} sorgu toplam {impressions} gösterim alıyor ama ilk üçün dışında kalıyor. Çubuklar gösterim payını gösterir; birine tıklayarak tabloyu daraltın.",
        {
          queries: formatCount(rows.length),
          impressions: formatCount(impressions),
        },
      )}
    >
      <Bars
        buckets={buckets}
        selection={selection}
        summary={t(
          "Sıra 5-20 arasındaki {queries} sorgunun {impressions} gösterimi, sıra 5-10 ve 11-20 olarak bölünmüş.",
          {
            queries: formatCount(rows.length),
            impressions: formatCount(impressions),
          },
        )}
      />
      <Chips rows={rows} ids={STRIKING_CHIPS} selection={selection} />
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 text-xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

export function CannibalizationSummary({
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
  const title = t("Çakışma özeti");
  if (report.isPending) return <TabSummarySkeleton />;
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
        className="grid gap-3 sm:grid-cols-3"
        aria-label={t(
          "{queries} sorguda birden fazla sayfanız yarışıyor; {impressions} gösterim risk altında.",
          {
            queries: formatNumber(data.rows.length),
            impressions: formatNumber(data.splitImpressions),
          },
        )}
      >
        <Stat
          label={t("Çakışan sorgu")}
          value={formatNumber(data.rows.length)}
        />
        <Stat
          label={t("Risk altındaki gösterim")}
          value={formatNumber(data.splitImpressions)}
        />
        {worst ? (
          <div className="min-w-0">
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
                  className="size-3.5 shrink-0 text-warning"
                />
                <span className="truncate" title={worst.query}>
                  {worst.query}
                </span>
              </button>
              <span className="text-xs text-muted tabular-nums">
                {t("{impressions} gösterim bölünüyor · {pages} sayfa", {
                  impressions: formatNumber(splitImpressionsOf(worst)),
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
