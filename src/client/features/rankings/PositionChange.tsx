import { t } from "@/shared/i18n";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { formatDecimal } from "@/client/lib/format";
import { directionOf } from "@/shared/rankingChange";

/**
 * Change in average position. Arrow, word and size all say the direction, so
 * it survives without colour. `delta` is positive when the query moved up.
 */
export function PositionChange({ delta }: { delta: number | null }) {
  if (delta === null) {
    return (
      <span
        className="text-subtle"
        title={t("Önceki dönemde bu sorgu için veri yok.")}
      >
        <span aria-hidden>-</span>
        <span className="sr-only">{t("Önceki dönemde veri yok")}</span>
      </span>
    );
  }
  const direction = directionOf(delta);
  if (direction === "flat") {
    return (
      <span className="inline-flex items-center justify-end gap-1 text-muted">
        <Minus className="size-3.5" aria-hidden />
        {t("Değişmedi")}
      </span>
    );
  }
  const up = direction === "up";
  const Icon = up ? ArrowUp : ArrowDown;
  return (
    <span
      className={`inline-flex items-center justify-end gap-1 ${
        up ? "text-[var(--ink-success)]" : "text-[var(--ink-error)]"
      }`}
    >
      <Icon className="size-3.5" aria-hidden />
      {t(up ? "{value} sıra yükseldi" : "{value} sıra geriledi", {
        value: formatDecimal(Math.abs(delta)),
      })}
    </span>
  );
}
