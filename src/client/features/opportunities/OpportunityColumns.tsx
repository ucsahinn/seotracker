import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Copy, ExternalLink } from "lucide-react";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { getSafeExternalUrl } from "@/client/components/table/url";
import { nullableNumberSort } from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import {
  KIND_COPY,
  pathOf,
  type OpportunityRow,
} from "@/client/features/opportunities/opportunityLogic";
import {
  formatDecimal,
  formatNumber,
  formatPercent,
} from "@/client/lib/format";

/*
 * The three parts a score is made of, at the weights that make it.
 *
 * The page already explains in prose that the score is 50% demand, 30%
 * business value and 20% reachability. It never showed which of the three a
 * given row's number came from -- and "67, all of it demand" and "67, the
 * page already earns" argue for different weeks of work. The widths are the
 * weighted contributions, so the filled part of the bar is literally the
 * score out of 100.
 */
const SCORE_PARTS = [
  { key: "demand", label: "Talep", weight: 0.5, opacity: 1 },
  { key: "businessValue", label: "İş değeri", weight: 0.3, opacity: 0.62 },
  {
    key: "reachability",
    label: "Yükselme kolaylığı",
    weight: 0.2,
    opacity: 0.34,
  },
] as const;

function ScoreBadge({
  score,
  components,
}: {
  score: number | null | undefined;
  components?: OpportunityRow["scoreComponents"];
}) {
  if (score == null) {
    return <span className="text-subtle">-</span>;
  }
  // One threshold, not a rainbow: above 60 is worth planning work around.
  const strong = score >= 60;

  const parts = components
    ? SCORE_PARTS.map((part) => ({
        ...part,
        // Already 0-1 from the service; the weight turns it into points.
        points: (components[part.key] ?? 0) * part.weight * 100,
      }))
    : null;

  return (
    <div className="flex flex-col items-end gap-1">
      <span
        className={`badge badge-sm tabular-nums ${
          strong
            ? "border-success/30 bg-success/10 text-[var(--ink-success)]"
            : "border-base-300 bg-base-200 text-muted"
        }`}
      >
        {score}
      </span>
      {parts ? (
        <>
          {/*
           * The breakdown was a `title` on an `aria-hidden` element, so it
           * reached neither keyboard nor screen reader -- the split this
           * component exists to expose ("67, all of it demand" and "67, the
           * page already earns" argue for different weeks) was available on
           * mouse hover only. The bar stays hidden; the sentence gets a
           * reachable home beside it.
           */}
          <span className="sr-only">
            {parts
              .map(
                (part) =>
                  `${part.label}: ${formatDecimal(part.points)} / ${part.weight * 100}`,
              )
              .join(", ")}
          </span>
          <span
            className="flex h-1 w-16 overflow-hidden rounded-full bg-base-200"
            title={parts
              .map(
                (part) =>
                  `${part.label}: ${formatDecimal(part.points)} / ${part.weight * 100}`,
              )
              .join(" · ")}
            aria-hidden
          >
            {parts.map((part) => (
              <span
                key={part.key}
                className="h-full bg-primary"
                style={{ width: `${part.points}%`, opacity: part.opacity }}
              />
            ))}
          </span>
        </>
      ) : null}
    </div>
  );
}

const opportunityHelper = createColumnHelper<OpportunityRow>();

export function buildOpportunityColumns(
  onOpen: (row: OpportunityRow) => void,
): ColumnDef<OpportunityRow>[] {
  const right = {
    headerClassName: "text-right",
    cellClassName: "text-right tabular-nums",
  } as const;
  return [
    opportunityHelper.accessor("score", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Puan" align="right" />
      ),
      cell: ({ getValue, row }) => (
        <ScoreBadge
          score={getValue()}
          components={row.original.scoreComponents}
        />
      ),
      meta: right,
    }),
    opportunityHelper.accessor("page", {
      header: ({ column }) => <SortableHeader column={column} label="Sayfa" />,
      cell: ({ getValue, row }) => {
        const url = getValue();
        const safe = getSafeExternalUrl(url);
        return (
          <span className="flex min-w-0 items-center gap-2">
            <span className="min-w-0">
              {/* The way in for keyboard and screen readers; clicking
                  anywhere else on the row does the same for a mouse. */}
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => onOpen(row.original)}
                className="link link-hover block max-w-full truncate text-left"
                title={url}
              >
                {pathOf(url)}
              </button>
              <span className="text-xs text-muted">
                {KIND_COPY[row.original.kind].label}
              </span>
            </span>
            <button
              type="button"
              className="shrink-0 text-muted hover:text-base-content"
              aria-label="Adresi kopyala"
              title="Adresi kopyala"
              onClick={() => void navigator.clipboard.writeText(url)}
            >
              <Copy className="size-3.5" />
            </button>
            {safe ? (
              <a
                href={safe}
                target="_blank"
                rel="noreferrer noopener"
                className="shrink-0 text-muted hover:text-base-content"
                aria-label="Sayfayı yeni sekmede aç"
                title="Sayfayı yeni sekmede aç"
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
          label="Sıra"
          align="right"
          helpText="Google'da kaçıncı sırada çıktığınız; küçük olan iyidir. 1, sonuçların en üstü demek."
        />
      ),
      cell: ({ getValue }) => formatDecimal(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("impressions", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label="Gösterim"
          align="right"
          helpText="Sayfanızın arama sonuçlarında kaç kez göründüğü."
        />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("clicks", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label="Tıklama"
          align="right"
          helpText="Aramalardan sayfanıza kaç kez tıklandığı."
        />
      ),
      cell: ({ getValue }) => formatNumber(getValue()),
      meta: right,
    }),
    opportunityHelper.accessor("ctr", {
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label="Tıklama oranı"
          align="right"
          helpText="Gösterilenlerin yüzde kaçı tıklandı. Altındaki ok, sayfanın sitenizde aynı sıradaki sayfalara göre farkını gösterir."
        />
      ),
      /*
       * The gap under the rate, which is the number that makes "Tıklanmıyor"
       * a finding rather than a label. Measured against this site's own
       * median for the position band, not a published CTR curve: a brand
       * term at position 3 behaves nothing like a comparison term at
       * position 3, so somebody else's average is not a bar.
       */
      cell: ({ getValue, row }) => {
        const gap = row.original.ctrGap;
        return (
          <span className="block">
            {formatPercent(getValue())}
            {gap !== null && Math.abs(gap) >= 0.005 ? (
              <span
                className={`block text-xs ${
                  gap < 0
                    ? "text-[var(--ink-error)]"
                    : "text-[var(--ink-success)]"
                }`}
              >
                {gap < 0 ? "▼" : "▲"} {formatPercent(Math.abs(gap))}
              </span>
            ) : null}
          </span>
        );
      },
      meta: right,
    }),
    opportunityHelper.accessor((row) => row.ga4?.sessions ?? null, {
      id: "sessions",
      header: ({ column }) => (
        <SortableHeader
          column={column}
          label="Oturum"
          align="right"
          helpText="Analytics'ten, Search Console ile aynı tarih aralığı için alınır; Analytics ekranındaki aralıktan farklı olabilir."
        />
      ),
      cell: ({ getValue }) => {
        const value = getValue();
        return value === null ? (
          <span className="text-subtle">-</span>
        ) : (
          formatNumber(value)
        );
      },
      sortingFn: nullableNumberSort,
      meta: right,
    }),
  ];
}
