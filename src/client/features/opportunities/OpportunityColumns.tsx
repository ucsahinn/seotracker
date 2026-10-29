import { t } from "@/shared/i18n";
import { OpportunityAnalyticsLink } from "./OpportunityAnalyticsLink";
import { copyText } from "@/client/lib/copyText";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, Copy, ExternalLink } from "lucide-react";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { getSafeExternalUrl } from "@/client/components/table/url";
import { nullableNumberSort } from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import {
  pathOf,
  rowAction,
  splitUrl,
  workColor,
  type OpportunityRow,
} from "@/client/features/opportunities/opportunityLogic";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";
import { BAND_LABELS } from "@/shared/positionBands";
import { Fragment } from "react";

/** The host dimmed, the path in full ink: every row repeats the host. */
export function UrlText({ url }: { url: string }) {
  const { host, rest } = splitUrl(url);
  return (
    <>
      <span className="text-muted">{host}</span>
      <PathBreaks path={rest} />
    </>
  );
}

/**
 * A path that wraps only after a "/": on a phone a long address broke in the
 * middle of a word. Pair it with `break-words`, which still splits a segment
 * that is wider than the line on its own.
 */
export function PathBreaks({ path }: { path: string }) {
  return path.split(/(?<=\/)/).map((part, index) => (
    <Fragment key={index}>
      {index > 0 ? <wbr /> : null}
      {part}
    </Fragment>
  ));
}

/** The page's non-brand click-through against the site's at that position, in points. */
function CtrGap({ row }: { row: OpportunityRow }) {
  if (row.nonBrandCtr === null || row.siteCtr === null) return null;
  const points = (row.nonBrandCtr - row.siteCtr) * 100;
  const magnitude = formatDecimal(Math.abs(points));
  if (magnitude === formatDecimal(0)) return null;
  const below = points < 0;
  const Icon = below ? ArrowDown : ArrowUp;
  return (
    <span
      className={`flex items-center justify-end gap-0.5 text-xs ${
        below ? "text-[var(--ink-error)]" : "text-[var(--ink-success)]"
      }`}
      title={t("Sitenizin aynı sıradaki marka dışı aramaları: {ctr}", {
        ctr: formatPercent(row.siteCtr),
      })}
    >
      <Icon aria-hidden className="size-3" />
      {t("site {ctr} · {value} puan", {
        ctr: formatPercent(row.siteCtr),
        value: `${below ? "-" : "+"}${magnitude}`,
      })}
    </span>
  );
}

// Turkish, translated with t() where it renders.
const VALUE_SHORT = {
  converts: "dönüşüyor",
  no_conversions: "dönüşüm yok",
  too_little_traffic: "az trafik",
} as const;

const opportunityHelper = createColumnHelper<OpportunityRow>();

export function buildOpportunityColumns(
  onOpen: (row: OpportunityRow) => void,
  maxGain: number,
  analyticsScope?: {
    projectId: string;
    dateRange?: { startDate: string; endDate: string };
  },
): ColumnDef<OpportunityRow>[] {
  const right = {
    headerClassName: "text-right",
    cellClassName: "text-right tabular-nums",
  } as const;
  return [
    opportunityHelper.accessor("gainPerMonth", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Ek tıklama tahmini")}
          align="right"
          helpText={t(
            "Bu sayfanın aramaları sitenizin kendi tıklama oranlarına ulaşırsa ayda gelebilecek ek tıklama.",
          )}
        />
      ),
      cell: ({ getValue, row }) => {
        const gain = getValue();
        if (gain === null)
          return <span className="text-muted">{t("Kazanç bilinmiyor")}</span>;
        return (
          <span className="flex flex-col items-end gap-1">
            <span className="font-semibold">
              {t("En fazla")} +{formatCount(gain)}
              <span className="ml-1 text-xs font-normal text-muted">
                {t("/ay")}
              </span>
            </span>
            <span
              aria-hidden
              className="block h-1.5 w-16 overflow-hidden rounded-full bg-base-200"
            >
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${Math.max(4, (gain / Math.max(maxGain, 1)) * 100)}%`,
                  backgroundColor: workColor(row.original.work),
                }}
              />
            </span>
          </span>
        );
      },
      meta: right,
      sortingFn: (a, b) =>
        (a.original.gainPerMonth ?? -1) - (b.original.gainPerMonth ?? -1) ||
        a.original.impressions - b.original.impressions,
    }),
    opportunityHelper.accessor("page", {
      header: ({ column }) => (
        <SortableHeader column={column} label={t("Sayfa")} />
      ),
      cell: ({ getValue, row }) => {
        const url = getValue();
        const safe = getSafeExternalUrl(url);
        const work = row.original.work;
        return (
          <span className="flex min-w-0 items-center gap-1">
            <span className="min-w-0">
              {/* The way in for keyboard and screen readers; clicking
                  anywhere else on the row does the same for a mouse. */}
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => onOpen(row.original)}
                aria-label={pathOf(url)}
                className="link link-hover block max-w-full truncate text-left"
                title={url}
              >
                <UrlText url={url} />
              </button>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <span
                  aria-hidden
                  className="inline-block size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: workColor(work) }}
                />
                <span className="truncate">
                  {t(rowAction(row.original))}
                  {row.original.brandOnly
                    ? ` · ${t("Yalnızca marka aramaları")}`
                    : null}
                </span>
              </span>
            </span>
            <button
              type="button"
              className="flex size-8 shrink-0 items-center justify-center rounded-field text-muted hover:bg-base-200 hover:text-base-content"
              aria-label={t("Adresi kopyala")}
              title={t("Adresi kopyala")}
              onClick={() => void copyText(url, t("Adres kopyalandı"))}
            >
              <Copy className="size-3.5" />
            </button>
            {safe ? (
              <a
                href={safe}
                target="_blank"
                rel="noreferrer noopener"
                className="flex size-8 shrink-0 items-center justify-center rounded-field text-muted hover:bg-base-200 hover:text-base-content"
                aria-label={t("Sayfayı yeni sekmede aç")}
                title={t("Sayfayı yeni sekmede aç")}
              >
                <ExternalLink className="size-3.5" />
              </a>
            ) : null}
          </span>
        );
      },
      meta: { cellClassName: "max-w-md" },
    }),
    opportunityHelper.accessor("position", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Sıra")}
          align="right"
          helpText={t(
            "Google'da kaçıncı sırada çıktığınız; küçük olan iyidir. 1, sonuçların en üstü demek.",
          )}
        />
      ),
      cell: ({ getValue, row }) => (
        <span className="whitespace-nowrap">
          {formatDecimal(getValue())}
          <span className="ml-1.5 text-xs text-muted">
            {BAND_LABELS[row.original.band]}
          </span>
        </span>
      ),
      meta: right,
    }),
    opportunityHelper.accessor("impressions", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Gösterim")}
          align="right"
          helpText={t("Sayfanızın arama sonuçlarında kaç kez göründüğü.")}
        />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("clicks", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Tıklama")}
          align="right"
          helpText={t("Aramalardan sayfanıza kaç kez tıklandığı.")}
        />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("ctr", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Tıklama oranı")}
          align="right"
          helpText={t(
            "Gösterilenlerin yüzde kaçı tıklandı. Altındaki satır, sayfanın marka dışı aramalarını sitenizin aynı sıradaki aramalarıyla yüzde puan olarak karşılaştırır.",
          )}
        />
      ),
      cell: ({ getValue, row }) => (
        <span className="block">
          {formatPercent(getValue())}
          <CtrGap row={row.original} />
        </span>
      ),
      meta: right,
    }),
    opportunityHelper.accessor((row) => row.ga4?.sessions ?? null, {
      id: "sessions",
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label={t("Oturum")}
          align="right"
          helpText={t(
            "Analytics'teki organik oturumlar, Search Console ile aynı günler için. Analytics ekranı dünü de saydığı için sayı orada biraz farklı olabilir.",
          )}
        />
      ),
      cell: ({ getValue, row }) => {
        const value = getValue();
        if (value === null)
          return (
            <span
              className="text-subtle"
              title={t(
                "Analytics değeri bilinmiyor; bağlantı, eşleşme ve kaynak kısıtlarını kontrol edin.",
              )}
            >
              –
            </span>
          );
        const signal = row.original.value;
        return (
          <span className="flex flex-col items-end">
            <span className="whitespace-nowrap">
              {signal ? (
                <span
                  className={`mr-1.5 text-xs ${
                    signal === "converts"
                      ? "text-[var(--ink-success)]"
                      : "text-muted"
                  }`}
                >
                  {t(VALUE_SHORT[signal])}
                </span>
              ) : null}
              {formatCount(value)}
            </span>
            {analyticsScope ? (
              <OpportunityAnalyticsLink
                row={row.original}
                {...analyticsScope}
                compact
              />
            ) : null}
          </span>
        );
      },
      sortingFn: nullableNumberSort,
      meta: right,
    }),
  ];
}
