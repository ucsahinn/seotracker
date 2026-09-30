import { formatCount } from "@/client/lib/format";
import { escapeHtml, percent, truncate } from "./reportFormat";

/*
 * Inline-SVG chart builders. No script, no library, no external reference:
 * a chart is a string of shapes computed from the numbers, so it prints the
 * same on paper as on screen.
 *
 * Every chart carries its numbers as text -- value labels drawn in the SVG,
 * and a figcaption that spells the data out -- so nothing depends on telling
 * two colours apart, and a screen reader gets the same facts as the picture.
 */

export const COLORS = {
  critical: "#b4232a",
  warning: "#9a6200",
  info: "#5b6472",
  good: "#1c7a4a",
  accent: "#1d3b6e",
  muted: "#94a3b8",
} as const;

export type ChartDatum = { label: string; value: number; color?: string };

function fmt(value: number): string {
  return String(Math.round(value * 100) / 100);
}

/** What a chart says in words: "2xx: 40; 3xx: 2". Also its figcaption. */
export function chartSummary(data: ChartDatum[], unit = ""): string {
  return data
    .map((d) => `${d.label}: ${formatCount(d.value)}${unit}`)
    .join("; ");
}

export function figure(
  title: string,
  body: string,
  caption: string,
  label: string,
): string {
  return `<figure class="chart" role="group" aria-label="${escapeHtml(label)}">
  <p class="chart-title">${escapeHtml(title)}</p>
  ${body}
  <figcaption>${escapeHtml(caption)}</figcaption>
</figure>`;
}

/**
 * Ring with one arc per datum, starting at twelve o'clock. The legend beside
 * it (label, count, share) is the non-colour reading of the same data.
 */
export function donutChart(
  data: ChartDatum[],
  centerValue: string,
  centerLabel: string,
): string {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let offset = 25;
  const arcs = data
    .filter((d) => d.value > 0)
    .map((d) => {
      const share = (d.value / total) * 100;
      // A hairline gap between arcs, unless one arc is the whole ring.
      const gap = share >= 100 ? 0 : Math.min(0.8, share / 2);
      const arc = `<circle cx="21" cy="21" r="15.9155" fill="none" stroke="${d.color ?? COLORS.muted}" stroke-width="6" pathLength="100" stroke-dasharray="${fmt(share - gap)} ${fmt(100 - share + gap)}" stroke-dashoffset="${fmt(offset)}"/>`;
      offset -= share;
      return arc;
    })
    .join("");
  const svg = `<svg viewBox="0 0 42 42" class="donut" aria-hidden="true" focusable="false">
    <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#eef0f3" stroke-width="6"/>
    ${arcs}
    <text x="21" y="21.5" text-anchor="middle" class="donut-num">${escapeHtml(centerValue)}</text>
    <text x="21" y="26.5" text-anchor="middle" class="donut-sub">${escapeHtml(centerLabel)}</text>
  </svg>`;
  const legend = data
    .map(
      (d) => `<tr>
      <td><span class="swatch" style="background:${d.color ?? COLORS.muted}"></span></td>
      <th scope="row">${escapeHtml(d.label)}</th>
      <td class="num">${formatCount(d.value)}</td>
      <td class="num">%${formatCount(percent(d.value, total))}</td>
    </tr>`,
    )
    .join("");
  return `<div class="donut-wrap">${svg}<table class="legend"><tbody>${legend}</tbody></table></div>`;
}

/** Horizontal bars with the label left and the value printed at the bar's end. */
export function barChart(
  data: Array<ChartDatum & { display?: string }>,
  labelChars = 38,
): string {
  if (data.length === 0) return "";
  const max = Math.max(...data.map((d) => d.value), 1);
  const rowH = 24;
  const labelW = 230;
  const barW = 250;
  const rows = data
    .map((d, i) => {
      const y = i * rowH;
      const w = d.value > 0 ? Math.max(2, (d.value / max) * barW) : 0;
      return `<text x="${labelW - 8}" y="${y + 15}" text-anchor="end" class="ax">${escapeHtml(truncate(d.label, labelChars))}</text>
      <rect x="${labelW}" y="${y + 4}" width="${fmt(w)}" height="14" rx="2" fill="${d.color ?? COLORS.accent}"/>
      <text x="${fmt(labelW + w + 6)}" y="${y + 15}" class="val">${escapeHtml(d.display ?? formatCount(d.value))}</text>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${labelW + barW + 70} ${data.length * rowH}" class="bars-svg" aria-hidden="true" focusable="false">${rows}</svg>`;
}

/** Vertical columns for a distribution; the count sits above each column. */
export function columnChart(data: ChartDatum[], color: string = COLORS.accent) {
  if (data.length === 0) return "";
  const max = Math.max(...data.map((d) => d.value), 1);
  const colW = 560 / data.length;
  const plotH = 110;
  const cols = data
    .map((d, i) => {
      const h = d.value > 0 ? Math.max(2, (d.value / max) * plotH) : 0;
      const x = i * colW + colW * 0.15;
      return `<rect x="${fmt(x)}" y="${fmt(20 + plotH - h)}" width="${fmt(colW * 0.7)}" height="${fmt(h)}" rx="2" fill="${d.color ?? color}"/>
      <text x="${fmt(x + colW * 0.35)}" y="${fmt(16 + plotH - h)}" text-anchor="middle" class="val">${formatCount(d.value)}</text>
      <text x="${fmt(x + colW * 0.35)}" y="${plotH + 36}" text-anchor="middle" class="ax">${escapeHtml(d.label)}</text>`;
    })
    .join("");
  return `<svg viewBox="0 0 560 ${plotH + 44}" class="cols-svg" aria-hidden="true" focusable="false">
    <line x1="0" x2="560" y1="${20 + plotH}" y2="${20 + plotH}" stroke="#c9ced6" stroke-width="1"/>${cols}</svg>`;
}

type StackedRow = {
  label: string;
  parts: Array<{ value: number; color: string; tag: string }>;
};

/**
 * One stacked bar per row. Each segment prints its own count, and the tag
 * (K / U / B) next to it, so the severity is readable without the colour.
 */
export function stackedBars(rows: StackedRow[]): string {
  if (rows.length === 0) return "";
  const totals = rows.map((r) => r.parts.reduce((s, p) => s + p.value, 0));
  const max = Math.max(...totals, 1);
  const rowH = 30;
  const labelW = 110;
  const barW = 380;
  const body = rows
    .map((row, i) => {
      const y = i * rowH;
      let x = labelW;
      const segs = row.parts
        .filter((p) => p.value > 0)
        .map((p) => {
          const w = Math.max(14, (p.value / max) * barW);
          const seg = `<rect x="${fmt(x)}" y="${y + 4}" width="${fmt(w)}" height="20" fill="${p.color}" stroke="#fff" stroke-width="1"/>
          <text x="${fmt(x + w / 2)}" y="${y + 18}" text-anchor="middle" class="seg">${formatCount(p.value)}${escapeHtml(p.tag)}</text>`;
          x += w;
          return seg;
        })
        .join("");
      return `<text x="${labelW - 8}" y="${y + 18}" text-anchor="end" class="ax">${escapeHtml(row.label)}</text>${segs}
      <text x="${fmt(x + 8)}" y="${y + 18}" class="val">${formatCount(totals[i])}</text>`;
    })
    .join("");
  return `<svg viewBox="0 0 ${labelW + barW + 60} ${rows.length * rowH}" class="bars-svg" aria-hidden="true" focusable="false">${body}</svg>`;
}

/** The score ring of the cover page: the number is text inside the ring. */
export function gauge(score: number | null): string {
  const value = score ?? 0;
  const color =
    score === null
      ? COLORS.muted
      : score >= 90
        ? COLORS.good
        : score >= 50
          ? COLORS.warning
          : COLORS.critical;
  const c = 2 * Math.PI * 52;
  return `<svg viewBox="0 0 120 120" class="gauge" role="img" aria-label="${score === null ? "Puan yok" : `Site puanı 100 üzerinden ${score}`}">
    <circle cx="60" cy="60" r="52" fill="none" stroke="#eef0f3" stroke-width="10"/>
    <circle cx="60" cy="60" r="52" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${fmt(c)}" stroke-dashoffset="${fmt(c * (1 - value / 100))}" transform="rotate(-90 60 60)"/>
    <text x="60" y="64" text-anchor="middle" class="gauge-num">${score === null ? "--" : formatCount(score)}</text>
    <text x="60" y="82" text-anchor="middle" class="gauge-sub">/ 100</text>
  </svg>`;
}
