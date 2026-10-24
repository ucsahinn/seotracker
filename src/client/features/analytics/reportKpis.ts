import { sortBy } from "remeda";
import {
  numeric,
  type ReportRow,
} from "@/client/features/analytics/reportInsights";
import { formatCount, formatMoney, formatPercent } from "@/client/lib/format";
import type { Ga4ReportKindName } from "@/shared/ga4-reports";
import { t } from "@/shared/i18n";

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
  currencyCode: string | null,
): Kpi[] {
  if (rows.length === 0) return [];
  if (kind === "key_events") {
    const total = sumOf(rows, "keyEvents");
    const top = leader(rows, "eventName", "keyEvents");
    return [
      { label: t("Anahtar olay"), value: formatCount(total), hint: scope },
      { label: t("Olay türü"), value: formatCount(rows.length) },
      {
        label: t("En çok tetiklenen"),
        value: top?.label ?? "-",
        hint:
          top && total > 0
            ? t("{count} kez, {share} pay", {
                count: top.value,
                share: formatPercent(top.value / total),
              })
            : undefined,
      },
      {
        label: t("Tetikleyen kullanıcı"),
        value: formatCount(top ? (numeric(top.row, "totalUsers") ?? 0) : 0),
        hint: t("En çok tetiklenen olayda"),
      },
    ];
  }
  if (kind === "ecommerce_performance") {
    return [
      {
        label: t("Ürün geliri"),
        value: formatMoney(sumOf(rows, "itemRevenue"), currencyCode),
        hint: scope,
      },
      {
        label: t("Satılan ürün"),
        value: formatCount(sumOf(rows, "itemsPurchased")),
      },
      {
        label: t("Sepete eklenen"),
        value: formatCount(sumOf(rows, "itemsAddedToCart")),
      },
      {
        label: t("Görüntülenen ürün"),
        value: formatCount(sumOf(rows, "itemsViewed")),
      },
    ];
  }
  if (kind === "site_search") {
    const total = sumOf(rows, "eventCount");
    const top = leader(rows, "searchTerm", "eventCount");
    const once = rows.filter((row) => numeric(row, "eventCount") === 1).length;
    return [
      { label: t("Arama"), value: formatCount(total), hint: scope },
      { label: t("Farklı terim"), value: formatCount(rows.length) },
      {
        label: t("En çok aranan"),
        value: top?.label ?? "-",
        hint: top ? t("{count} kez", { count: top.value }) : undefined,
      },
      {
        label: t("Yalnızca bir kez aranan"),
        value: formatCount(once),
        hint: t("Pay: {share}", { share: formatPercent(once / rows.length) }),
      },
    ];
  }
  return [];
}
