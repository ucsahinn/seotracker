import { sortBy } from "remeda";
import {
  numeric,
  type ReportRow,
} from "@/client/features/analytics/reportInsights";
import { formatCount, formatPercent } from "@/client/lib/format";
import type { Ga4ReportKindName } from "@/shared/ga4-reports";

/* --- KPI strip for the small reports ------------------------------- */

export type Kpi = { label: string; value: string; hint?: string };

function sumOf(rows: ReportRow[], field: string): number {
  return rows.reduce((sum, row) => sum + (numeric(row, field) ?? 0), 0);
}

function leader(rows: ReportRow[], dimension: string, field: string) {
  const top = sortBy(rows, [(row) => numeric(row, field) ?? 0, "desc"])[0];
  const label = top?.[dimension];
  return top && typeof label === "string"
    ? { row: top, label, value: numeric(top, field) ?? 0 }
    : null;
}

/** Four figures over the listed rows; empty for reports with their own chart. */
export function buildKpis(
  kind: Ga4ReportKindName,
  rows: ReportRow[],
  scope: string,
): Kpi[] {
  if (rows.length === 0) return [];
  if (kind === "key_events") {
    const total = sumOf(rows, "keyEvents");
    const top = leader(rows, "eventName", "keyEvents");
    return [
      { label: "Anahtar olay", value: formatCount(total), hint: scope },
      { label: "Olay türü", value: formatCount(rows.length) },
      {
        label: "En çok tetiklenen",
        value: top?.label ?? "-",
        hint:
          top && total > 0
            ? `${formatCount(top.value)} kez, ${formatPercent(top.value / total)} pay`
            : undefined,
      },
      {
        label: "Tetikleyen kullanıcı",
        value: formatCount(top ? (numeric(top.row, "totalUsers") ?? 0) : 0),
        hint: "En çok tetiklenen olayda",
      },
    ];
  }
  if (kind === "ecommerce_performance") {
    return [
      {
        label: "Ürün geliri",
        value: formatCount(sumOf(rows, "itemRevenue")),
        hint: scope,
      },
      {
        label: "Satılan ürün",
        value: formatCount(sumOf(rows, "itemsPurchased")),
      },
      {
        label: "Sepete eklenen",
        value: formatCount(sumOf(rows, "itemsAddedToCart")),
      },
      {
        label: "Görüntülenen ürün",
        value: formatCount(sumOf(rows, "itemsViewed")),
      },
    ];
  }
  if (kind === "site_search") {
    const total = sumOf(rows, "eventCount");
    const top = leader(rows, "searchTerm", "eventCount");
    const once = rows.filter((row) => numeric(row, "eventCount") === 1).length;
    return [
      { label: "Arama", value: formatCount(total), hint: scope },
      { label: "Farklı terim", value: formatCount(rows.length) },
      {
        label: "En çok aranan",
        value: top?.label ?? "-",
        hint: top ? `${formatCount(top.value)} kez` : undefined,
      },
      {
        label: "Yalnızca bir kez aranan",
        value: formatCount(once),
        hint: `Terimlerin ${formatPercent(once / rows.length)}'i`,
      },
    ];
  }
  return [];
}
