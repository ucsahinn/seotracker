import { formatDecimal } from "./format";
import { t } from "./i18n";

/**
 * Change against the previous period as a fraction (0.25 is +25%).
 *
 * Null when there is no usable base: a previous value of zero or below makes
 * the ratio infinite or sign-flipped, and "+Infinity%" is not something to
 * show. Callers render null as "no comparison" rather than as a number.
 */
export function fractionalChange(
  current: number,
  previous: number,
): number | null {
  if (previous <= 0) return null;
  return (current - previous) / previous;
}

/** A change already worded, as `DeltaBadge` takes it. */
type WordedDelta = { text: string; improved: boolean; neutral?: true };

/**
 * The change of a rate (CTR, engagement rate, key-event rate) in percentage
 * points: "+0,3 puan". A rate's change as a percentage of itself ("-%0,4" of
 * a 65% engagement rate) reads as a different, smaller number, and the app
 * printed both side by side. Null when there is no previous value or the
 * change rounds to zero at one decimal.
 */
export function pointsDelta(
  current: number | null | undefined,
  previous: number | null | undefined,
  higherIsBetter = true,
): WordedDelta | null {
  if (current == null || previous == null) return null;
  if (!Number.isFinite(current) || !Number.isFinite(previous)) return null;
  const points = (current - previous) * 100;
  const magnitude = formatDecimal(Math.abs(points));
  if (magnitude === formatDecimal(0))
    return { text: t("Değişmedi"), improved: false, neutral: true };
  return {
    text: t("{value} puan", { value: `${points > 0 ? "+" : "-"}${magnitude}` }),
    improved: higherIsBetter ? points > 0 : points < 0,
  };
}

/**
 * The change of an average search position in places, worded by direction:
 * "1,3 sıra yükseldi". Position falls as a page climbs, so a lower number is
 * the good direction; as a percentage of itself ("-%0,6") the same move read
 * as a loss with a down arrow. Below a twentieth of a place, which is noise
 * in an impression-weighted mean, it is a neutral "no change".
 */
export function placesDelta(
  current: number | null | undefined,
  previous: number | null | undefined,
): WordedDelta | null {
  if (current == null || previous == null) return null;
  if (!(current > 0) || !(previous > 0)) return null;
  const climbed = previous - current;
  const magnitude = formatDecimal(Math.abs(climbed));
  // Both periods exist but nothing moved: say so, rather than leave the
  // tile looking as if its comparison went missing.
  if (Math.abs(climbed) < 0.05 || magnitude === formatDecimal(0)) {
    return {
      text: t("Değişmedi (±{value} sıra)", { value: formatDecimal(0) }),
      improved: false,
      neutral: true,
    };
  }
  return {
    text:
      climbed > 0
        ? t("{value} sıra yükseldi", { value: magnitude })
        : t("{value} sıra geriledi", { value: magnitude }),
    improved: climbed > 0,
  };
}
