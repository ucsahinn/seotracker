import { formatCount, formatDay } from "@/shared/format";
import { t } from "@/shared/i18n";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import { escapeHtml } from "@/server/features/audit/report/reportFormat";

const W = 860;
const H = 220;
const PAD = { top: 16, right: 12, bottom: 26, left: 48 };

/** The smallest 1, 2, 2.5 or 5 times a power of ten at or above `raw`. */
function niceStep(raw: number): number {
  const power = 10 ** Math.floor(Math.log10(Math.max(raw, 1)));
  const scaled = raw / power;
  const factor =
    scaled <= 1
      ? 1
      : scaled <= 2
        ? 2
        : scaled <= 2.5 && power >= 10
          ? 2.5
          : scaled <= 5
            ? 5
            : 10;
  return Math.max(1, factor * power);
}

/**
 * Daily clicks as inline SVG: the window solid, the comparison period dashed
 * in grey, the days Google is still counting dashed and hatched. No script
 * and no library, so it prints the same on paper years later. The figcaption under it says the
 * same thing in words.
 */
export function trendSvg(
  view: SearchPerformanceView,
  compare: "previous" | "yoy",
): string {
  const daily = view.series.daily;
  const other =
    compare === "previous" ? view.series.previousDaily : view.series.yoyDaily;
  if (daily.length < 2) return "";
  const values = daily.map((d) => (d.state === "pending" ? null : d.clicks));
  const others = (other ?? []).map((d) =>
    d.state === "pending" ? null : d.clicks,
  );
  const peak = Math.max(
    1,
    ...values.filter((v): v is number => v !== null),
    ...others.filter((v): v is number => v !== null),
  );
  // Round gridlines (0, 500, 1.000, ...), not thirds of the peak: a printed
  // axis reading "1.687" asks the reader to do arithmetic.
  const step = niceStep(peak / 4);
  const max = Math.ceil(peak / step) * step;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (i / (daily.length - 1)) * innerW;
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const path = (series: Array<number | null>) => {
    let open = false;
    return series
      .map((v, i) => {
        if (v === null) {
          open = false;
          return "";
        }
        const cmd = open ? "L" : "M";
        open = true;
        return `${cmd}${x(i).toFixed(1)},${y(v).toFixed(1)}`;
      })
      .join("");
  };
  const firstUnsettled = daily.findIndex(
    (d) => d.state === "provisional" || d.state === "pending",
  );
  /*
   * The days Google is still counting are drawn dashed, as on the screen:
   * a solid line there would print a number that may still change as if it
   * were final. The dashed part starts at the last settled day so the line
   * stays joined.
   */
  const split = firstUnsettled === -1 ? daily.length : firstUnsettled;
  const settled = values.map((v, i) => (i < split ? v : null));
  const unsettled = values.map((v, i) => (i >= split - 1 ? v : null));
  const hatch =
    firstUnsettled > 0
      ? `<rect x="${x(firstUnsettled).toFixed(1)}" y="${PAD.top}" width="${(x(daily.length - 1) - x(firstUnsettled)).toFixed(1)}" height="${innerH}" fill="url(#sr-hatch)"/>`
      : "";
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => {
    const v = i * step;
    return `<g><line x1="${PAD.left}" x2="${W - PAD.right}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="#e3e6ea"/><text class="ax" x="${PAD.left - 6}" y="${(y(v) + 3).toFixed(1)}" text-anchor="end">${escapeHtml(formatCount(v))}</text></g>`;
  });
  const labelEvery = Math.max(1, Math.ceil(daily.length / 7));
  const xLabels = daily
    .map((d, i) =>
      i % labelEvery === 0 || i === daily.length - 1
        ? `<text class="ax" x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="middle">${escapeHtml(formatDay(d.date))}</text>`
        : "",
    )
    .join("");
  return `<svg class="cols-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHtml(t("Günlük tıklama"))}">
  <defs><pattern id="sr-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#c9ced6" stroke-width="2"/></pattern></defs>
  ${ticks.join("")}
  ${hatch}
  ${others.length > 1 ? `<path d="${path(others)}" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5 4"/>` : ""}
  <path d="${path(settled)}" fill="none" stroke="#b4440c" stroke-width="2"/>
  ${split < daily.length ? `<path d="${path(unsettled)}" fill="none" stroke="#b4440c" stroke-width="2" stroke-dasharray="4 3"/>` : ""}
  ${xLabels}
</svg>`;
}
