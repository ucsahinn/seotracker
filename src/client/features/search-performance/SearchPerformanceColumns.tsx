import { copyText } from "@/client/lib/copyText";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { MutableRefObject } from "react";
import { makeSelectionColumn } from "@/client/components/table/AppDataTable";
import { formatCount, formatDecimal, formatPercent } from "@/client/lib/format";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import type { SelectionAnchor } from "@/client/components/table/tableSelection";
import type {
  getSearchPerformanceReport,
  getSearchPerformanceTable,
} from "@/serverFunctions/searchPerformance";
import { UrlCell } from "@/client/components/table/UrlCell";
import { RowActions } from "@/client/components/table/RowActions";
import { getSafeExternalUrl } from "@/client/components/table/url";
import { BookmarkPlus, Copy, ExternalLink } from "lucide-react";

export type Report = Extract<
  Awaited<ReturnType<typeof getSearchPerformanceReport>>,
  { connected: true }
>;
export type SearchPerformanceTableRow = Extract<
  Awaited<ReturnType<typeof getSearchPerformanceTable>>,
  { connected: true }
>["rows"][number];
type DimensionRow = SearchPerformanceTableRow;
type StrikingRow = Report["strikingDistance"][number];

const rightAligned = {
  headerClassName: "text-right",
  cellClassName: "text-right tabular-nums",
} as const;

const dimensionHelper = createColumnHelper<DimensionRow>();

export function buildDimensionColumns(
  keyLabel: string,
  /*
   * Present on the Sorgular tab, absent on Sayfalar. Saving a page as a
   * keyword makes no sense, so the column adapts rather than showing a
   * disabled item -- which reads as "broken" rather than "not applicable".
   */
  onSaveKeyword?: (keyword: string) => void,
): ColumnDef<DimensionRow>[] {
  return [
    dimensionHelper.accessor("key", {
      enableSorting: false,
      header: () => keyLabel,
      /*
       * The same value the striking-distance table linkifies. This column
       * holds a query on the Sorgular tab and a page URL on the Sayfalar
       * tab, so it links only when it is an address -- and the scheme check
       * is the same defense-in-depth the sibling column uses before
       * rendering an href from Search Console data.
       */
      cell: ({ getValue }) =>
        /^https?:\/\//.test(getValue()) ? (
          <UrlCell url={getValue()} className="max-w-xl" />
        ) : (
          <span className="block max-w-xl truncate" title={getValue()}>
            {getValue()}
          </span>
        ),
    }),
    dimensionHelper.accessor("clicks", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Tıklama" align="right" />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: rightAligned,
    }),
    dimensionHelper.accessor("impressions", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Gösterim" align="right" />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: rightAligned,
    }),
    dimensionHelper.accessor("ctr", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Tıklama oranı" align="right" />
      ),
      cell: ({ getValue }) => formatPercent(getValue()),
      meta: rightAligned,
    }),
    dimensionHelper.accessor("position", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Sıra" align="right" />
      ),
      cell: ({ getValue }) => formatDecimal(getValue()),
      meta: rightAligned,
    }),
    /*
     * Row actions, which only the striking-distance tab had. Sorgular is
     * where an operator actually browses queries, and it was the one place
     * a keyword could not be saved -- the round trip only went one way:
     * Kayıtlı Kelimeler could send you here, nothing could send anything
     * back.
     */
    dimensionHelper.display({
      id: "actions",
      header: () => null,
      cell: ({ row }) => {
        const value = row.original.key;
        const isUrl = /^https?:\/\//.test(value);
        return (
          <RowActions
            label={`${value} için işlemler`}
            actions={[
              ...(isUrl
                ? [
                    {
                      label: "Sayfayı yeni sekmede aç",
                      icon: ExternalLink,
                      onSelect: () => {
                        const safe = getSafeExternalUrl(value);
                        if (safe) window.open(safe, "_blank", "noopener");
                      },
                    },
                  ]
                : []),
              {
                label: isUrl ? "Adresi kopyala" : "Kelimeyi kopyala",
                icon: Copy,
                onSelect: () =>
                  void copyText(
                    value,
                    isUrl ? "Adres kopyalandı" : "Kelime kopyalandı",
                  ),
              },
              ...(!isUrl && onSaveKeyword
                ? [
                    {
                      label: "Kelime olarak kaydet",
                      icon: BookmarkPlus,
                      onSelect: () => onSaveKeyword(value),
                    },
                  ]
                : []),
            ]}
          />
        );
      },
      meta: rightAligned,
    }),
  ];
}

const strikingHelper = createColumnHelper<StrikingRow>();

export function buildStrikingColumns(
  anchorRef: MutableRefObject<SelectionAnchor | null>,
): ColumnDef<StrikingRow>[] {
  return [
    makeSelectionColumn<StrikingRow>(anchorRef, (row) => row.original.query),
    strikingHelper.accessor("query", {
      enableSorting: false,
      header: () => "Sorgu",
      cell: ({ getValue }) => (
        <span className="block max-w-xs truncate" title={getValue()}>
          {getValue()}
        </span>
      ),
    }),
    strikingHelper.accessor("page", {
      enableSorting: false,
      header: () => "Sayfa",
      // GSC page keys are canonical http(s) URLs of the verified property;
      // the scheme check is defense-in-depth before rendering an href.
      cell: ({ getValue }) =>
        /^https?:\/\//.test(getValue()) ? (
          <a
            href={getValue()}
            target="_blank"
            rel="noreferrer"
            className="link link-hover block max-w-sm truncate"
            title={getValue()}
          >
            {getValue()}
          </a>
        ) : (
          <span className="block max-w-sm truncate" title={getValue()}>
            {getValue()}
          </span>
        ),
    }),
    strikingHelper.accessor("impressions", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Gösterim" align="right" />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: rightAligned,
    }),
    strikingHelper.accessor("clicks", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Tıklama" align="right" />
      ),
      cell: ({ getValue }) => formatCount(getValue()),
      meta: rightAligned,
    }),
    strikingHelper.accessor("position", {
      header: ({ column }) => (
        <SortableHeader column={column} label="Sıra" align="right" />
      ),
      cell: ({ getValue }) => formatDecimal(getValue()),
      meta: rightAligned,
    }),
  ];
}
