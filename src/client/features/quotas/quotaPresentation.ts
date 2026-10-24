import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatBytes, formatNumber } from "@/client/lib/format";
import {
  usedFraction,
  type QuotaItem,
  type QuotaState,
  type QuotaUnit,
} from "@/server/features/quotas/quotaTypes";
import { t } from "@/shared/i18n";

/**
 * State is always icon + word + colour, never colour alone. Labels stay
 * Turkish here and go through t() where they render.
 */
export const STATE_META: Record<
  QuotaState,
  { label: string; icon: LucideIcon; inkClass: string; fillClass: string }
> = {
  ok: {
    label: "Yeterli",
    icon: CheckCircle2,
    inkClass: "text-[var(--ink-success)]",
    fillClass: "bg-success",
  },
  warn: {
    label: "Azalıyor",
    icon: AlertTriangle,
    inkClass: "text-[var(--ink-warning)]",
    fillClass: "bg-warning",
  },
  critical: {
    label: "Neredeyse doldu",
    icon: AlertOctagon,
    inkClass: "text-[var(--ink-error)]",
    fillClass: "bg-error",
  },
  unknown: {
    label: "Bilinmiyor",
    icon: HelpCircle,
    inkClass: "text-muted",
    fillClass: "bg-base-300",
  },
};

function amount(item: QuotaItem, value: number): string {
  return item.unit === "bayt" ? formatBytes(value) : formatNumber(value);
}

/*
 * The server sends the unit as a code; it is worded here, with the count, so
 * English can pluralise it ("1 page", "2 pages"). Bytes carry their own unit.
 */
const UNIT_COUNT: Record<Exclude<QuotaUnit, "bayt">, string> = {
  sorgu: "{count} sorgu",
  ölçüm: "{count} ölçüm", // i18n-ignore: a catalog key, translated below
  puan: "{count} puan",
  sayfa: "{count} sayfa",
  rapor: "{count} rapor",
  şablon: "{count} şablon", // i18n-ignore: a catalog key, translated below
};

/** A figure with its unit: "12 ölçüm", "1,2 MB". */
function withUnit(item: QuotaItem, value: number): string {
  return item.unit === "bayt"
    ? formatBytes(value)
    : t(UNIT_COUNT[item.unit], { count: value });
}

/** "1.250 / 2.000 sorgu"; just "12 ölçüm" when there is no ceiling. */
export function usageText(item: QuotaItem): string {
  if (item.used === null && item.remaining !== undefined) {
    return t("Kalan: {amount}", { amount: withUnit(item, item.remaining) });
  }
  if (item.used === null) {
    return item.limit === null
      ? t("Veri yok")
      : t("Sınır: {amount}", { amount: amount(item, item.limit) });
  }
  if (item.limit === null) return withUnit(item, item.used);
  return `${amount(item, item.used)} / ${withUnit(item, item.limit)}`;
}

export function remainingText(item: QuotaItem): string | null {
  if (item.used === null || item.limit === null) return null;
  return t("{amount} kaldı", {
    amount: amount(item, Math.max(item.limit - item.used, 0)),
  });
}

/** aria-valuetext for the meter, in words a screen reader reads well. */
export function meterValueText(item: QuotaItem): string {
  const remaining = remainingText(item);
  const state = t(STATE_META[item.state].label);
  return [usageText(item), remaining, t("Durum: {state}", { state })]
    .filter(Boolean)
    .join(", ");
}

export function percentUsed(item: QuotaItem): number | null {
  const fraction = usedFraction(item.used, item.limit);
  return fraction === null ? null : Math.round(fraction * 100);
}

const SEVERITY: readonly QuotaState[] = ["critical", "warn", "ok"];

/**
 * The state a heading wears for a whole list: the worst known one. Unknown
 * only when nothing in the list has a known state, so a missing GA4 figure
 * does not hide that the other limits are fine.
 */
export function worstQuotaState(items: readonly QuotaItem[]): QuotaState {
  return (
    SEVERITY.find((state) => items.some((item) => item.state === state)) ??
    "unknown"
  );
}
