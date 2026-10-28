import { sortBy } from "remeda";
import type { DATA_SERIES } from "@/client/components/Chart";
import {
  numeric,
  type ReportRow,
} from "@/client/features/analytics/reportInsights";
import {
  formatCount,
  formatMoney,
  formatPercent,
  formatDecimal,
} from "@/client/lib/format";
import type { Ga4ReportKindName } from "@/shared/ga4-reports";
import { t } from "@/shared/i18n";

/* --- KPI strip for the small reports ------------------------------- */

export type Kpi = {
  metric?: keyof typeof DATA_SERIES;
  label: string;
  value: string;
  hint?: string;
  animateTo?: { value: number; format: (n: number) => string };
};
function numericKpi(
  value: number | null,
  format: (n: number) => string = formatCount,
) {
  return {
    value: value === null ? "–" : format(value),
    animateTo: value === null ? undefined : { value, format },
  };
}

function sumOf(rows: ReportRow[], field: string): number | null {
  if (rows.some((row) => numeric(row, field) === null)) return null;
  return rows.reduce((sum, row) => sum + numeric(row, field)!, 0);
}
const countOf = (value: number | null) =>
  value === null ? "–" : formatCount(value);

function leader(rows: ReportRow[], dimension: string, field: string) {
  if (rows.some((row) => numeric(row, field) === null)) return null;
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
      {
        metric: "conversions",
        label: t("Anahtar olay"),
        ...numericKpi(total),
        hint: scope,
      },
      { label: t("Olay türü"), ...numericKpi(rows.length) },
      {
        label: t("En çok tetiklenen"),
        value: top?.label ?? "-",
        hint:
          top && total !== null && total > 0
            ? t("{count} kez, {share} pay", {
                count: top.value,
                share: formatPercent(top.value / total),
              })
            : undefined,
      },
      {
        label: t("Tetikleyen kullanıcı"),
        value: countOf(top ? numeric(top.row, "totalUsers") : null),
        hint: t("En çok tetiklenen olayda"),
      },
    ];
  }
  if (kind === "ecommerce_performance") {
    const revenue = sumOf(rows, "itemRevenue");
    const money = (value: number) =>
      currencyCode
        ? formatMoney(value, currencyCode)
        : t("{value} (para birimi bilinmiyor)", {
            value: formatDecimal(value),
          });
    return [
      {
        label: t("Ürün geliri"),
        ...numericKpi(revenue, money),
        hint: scope,
      },
      {
        label: t("Satılan ürün"),
        ...numericKpi(sumOf(rows, "itemsPurchased")),
      },
      {
        label: t("Sepete eklenen"),
        ...numericKpi(sumOf(rows, "itemsAddedToCart")),
      },
      {
        label: t("Görüntülenen ürün"),
        ...numericKpi(sumOf(rows, "itemsViewed")),
      },
    ];
  }
  if (kind === "site_search") {
    const total = sumOf(rows, "eventCount");
    const top = leader(rows, "searchTerm", "eventCount");
    const once =
      total === null
        ? null
        : rows.filter((row) => numeric(row, "eventCount") === 1).length;
    return [
      { label: t("Arama"), ...numericKpi(total), hint: scope },
      { label: t("Farklı terim"), ...numericKpi(rows.length) },
      {
        label: t("En çok aranan"),
        value: top?.label ?? "-",
        hint: top ? t("{count} kez", { count: top.value }) : undefined,
      },
      {
        label: t("Yalnızca bir kez aranan"),
        ...numericKpi(once),
        hint:
          once === null
            ? undefined
            : t("Pay: {share}", { share: formatPercent(once / rows.length) }),
      },
    ];
  }
  return [];
}
