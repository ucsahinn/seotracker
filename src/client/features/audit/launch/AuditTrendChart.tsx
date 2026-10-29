import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { sort } from "remeda";
import { Chart, CHART_AXIS, CHART_GRID } from "@/client/components/Chart";
import { ChartTooltip } from "@/client/components/Chart";
import {
  formatCount,
  formatDate,
  formatDateTime,
  formatDecimal,
} from "@/client/lib/format";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { t } from "@/shared/i18n";

/** Density is descriptive; only persisted population and coverage evidence permits a trend. */

const SEVERITY = {
  critical: "var(--color-error)",
  warning: "var(--mark-warning)",
} as const;

/** Under this the density is an average over too little to mean anything. */
const MIN_PAGES = 5;

type HistoryRow = {
  id: string;
  status: string;
  pagesCrawled: number;
  startedAt: string;
  completedAt: string | null;
  comparison?: { previousAuditId: string; compatible: boolean };
  issues: { critical: number; warning: number; info: number };
};

type Point = {
  comparableWithPrevious: boolean;
  key: string;
  date: string;
  pages: number;
  critical: number;
  warning: number;
  criticalTotal: number;
  warningTotal: number;
};

export function AuditTrendChart({ history }: { history: HistoryRow[] }) {
  const reduced = useReducedMotion();
  const points = getPoints(history);

  // Two points make a line; one makes a dot that looks like a verdict.
  if (points.length < 2) return null;

  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return null;

  /*
   * Two flat lines along zero are a shape that looks like an answer. A site
   * whose audits found no critical or warning issues is the good outcome
   * and deserves to be said, not drawn -- the same call the search trend
   * panel makes for a property with no impressions yet.
   */
  const comparable = points
    .slice(1)
    .every((point) => point.comparableWithPrevious);
  const anyFindings = points.some(
    (point) => point.criticalTotal > 0 || point.warningTotal > 0,
  );

  return (
    // No frame of its own: it sits inside the history card, and a bordered
    // box inside a bordered card was a box in a box.
    <section className="space-y-1">
      <div>
        <h3 className="text-sm font-medium">{t("Denetimler arası değişim")}</h3>
        <p className="mt-0.5 text-xs text-muted">
          {t(
            "Yüz sayfa başına sorun sayısı; değişim yalnızca aynı kapsam ve kontrollerde gösterilir.",
          )}
        </p>
      </div>
      {!comparable ? (
        <div className="space-y-3">
          <p className="text-sm text-muted">
            {t(
              "Karşılaştırma yapılamadı: tarama kapsamları farklı veya bilinmiyor.",
            )}
          </p>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <caption className="sr-only">
                {t("Denetim başına sayfa yoğunluğu: yüz sayfa başına sorun")}
              </caption>
              <thead>
                <tr>
                  {[t("Tarih"), t("Sayfa"), t("Kritik"), t("Uyarı")].map(
                    (label, index) => (
                      <th
                        key={label}
                        className={index > 0 ? "text-right" : undefined}
                      >
                        {label}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {points.map((point) => (
                  <tr key={point.key}>
                    <td className="whitespace-nowrap">
                      {formatDateTime(point.date)}
                    </td>
                    <td className="text-right tabular-nums">
                      {formatCount(point.pages)}
                    </td>
                    <td className="text-right tabular-nums">
                      {densityCell(point.critical, point.criticalTotal)}
                    </td>
                    <td className="text-right tabular-nums">
                      {densityCell(point.warning, point.warningTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : !anyFindings ? (
        <p className="pt-2 text-sm text-muted">
          {t(
            "Bu {count} denetimin hiçbirinde kritik sorun ya da uyarı çıkmadı, grafik boş. Bilgi düzeyindeki bulgular denetimlerin kendi sayfalarında.",
            { count: points.length },
          )}
        </p>
      ) : (
        <>
          <div
            role="group"
            aria-label={t("Grafik serileri")}
            className="flex flex-wrap gap-4 py-2 text-xs text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <svg width="24" height="6" aria-hidden>
                <line
                  x1="0"
                  y1="3"
                  x2="24"
                  y2="3"
                  stroke={SEVERITY.critical}
                  strokeWidth="2"
                />
              </svg>
              {t("Kritik")}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg width="24" height="6" aria-hidden>
                <line
                  x1="0"
                  y1="3"
                  x2="24"
                  y2="3"
                  stroke={SEVERITY.warning}
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              </svg>
              {t("Uyarı")}
            </span>
          </div>
          <Chart
            height={180}
            summary={summarise(first, last, points.length)}
            table={{
              caption: t(
                "Denetim başına sayfa yoğunluğu: yüz sayfa başına sorun",
              ),
              columns: [t("Tarih"), t("Sayfa"), t("Kritik"), t("Uyarı")],
              rows: points.map((point) => [
                formatDateTime(point.date),
                formatCount(point.pages),
                densityText(point.critical, point.criticalTotal),
                densityText(point.warning, point.warningTotal),
              ]),
            }}
          >
            <LineChart
              data={points}
              // Room for the last tick label, which centres on the last point.
              margin={{ top: 12, right: 28, bottom: 0, left: 0 }}
            >
              <CartesianGrid {...CHART_GRID} />
              <XAxis
                dataKey="date"
                {...CHART_AXIS}
                // Several audits often share a day, so a date-only label repeats; the
                // time makes each tick one audit, and the gap hides overlaps.
                tickFormatter={formatDateTime}
                minTickGap={36}
              />
              <YAxis
                {...CHART_AXIS}
                width={40}
                tickFormatter={(value: number) => formatCount(value)}
                domain={[0, "auto"]}
              />
              <Tooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
                content={({ active, label }) => {
                  if (!active || typeof label !== "string") return null;
                  const point = points.find((entry) => entry.date === label);
                  if (!point) return null;
                  return (
                    <ChartTooltip
                      title={t("{date} · {count} sayfa", {
                        date: formatDateTime(point.date),
                        count: point.pages,
                      })}
                      rows={[
                        {
                          label: t("Kritik"),
                          value: t("{density} / 100 sayfa ({total} toplam)", {
                            density: formatDensity(point.critical),
                            total: formatCount(point.criticalTotal),
                          }),
                          color: SEVERITY.critical,
                        },
                        {
                          label: t("Uyarı"),
                          value: t("{density} / 100 sayfa ({total} toplam)", {
                            density: formatDensity(point.warning),
                            total: formatCount(point.warningTotal),
                          }),
                          color: SEVERITY.warning,
                        },
                      ]}
                    />
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="critical"
                name={t("Kritik")}
                stroke={SEVERITY.critical}
                strokeWidth={2}
                dot={{ r: 3 }}
                isAnimationActive={!reduced}
              />
              <Line
                type="monotone"
                dataKey="warning"
                name={t("Uyarı")}
                stroke={SEVERITY.warning}
                strokeWidth={2}
                /*
                 * Dashed as well as tinted: `--color-error` and `--color-warning`
                 * sit at nearly the same lightness, so two solid lines are one
                 * line to a reader who cannot separate the hues.
                 */
                strokeDasharray="4 3"
                dot={{ r: 3 }}
                isAnimationActive={!reduced}
              />
            </LineChart>
          </Chart>
        </>
      )}
    </section>
  );
}

/**
 * The finding, not the shape — this is what a screen reader gets instead.
 *
 * It describes whichever series actually moved. Fixed on critical it read
 * "0 iken 0; değişmedi" on the real project here, whose whole story was in
 * the warning line — a sentence that was true and said nothing.
 */
function summarise(first: Point, last: Point, total: number) {
  const movedOnCritical = first.critical !== last.critical;
  const series =
    movedOnCritical || first.warning === last.warning
      ? { label: t("kritik sorun"), from: first.critical, to: last.critical }
      : { label: t("uyarı"), from: first.warning, to: last.warning };

  const delta = series.to - series.from;
  const direction =
    delta === 0 ? t("değişmedi") : delta < 0 ? t("azaldı") : t("arttı");
  return t(
    "{count} denetim. Yüz sayfa başına {series}, {fromDate} tarihinde {from} idi, {toDate} tarihinde {to} oldu ({direction}).",
    {
      count: total,
      series: series.label,
      fromDate: formatDate(first.date),
      from: formatDensity(series.from),
      toDate: formatDate(last.date),
      to: formatDensity(series.to),
      direction,
    },
  );
}

/** A whole density prints as a whole number: "160", not "160,0". */
function formatDensity(value: number): string {
  return Number.isInteger(value) ? formatCount(value) : formatDecimal(value);
}

/**
 * Density with its count under it, so the cell stays narrow enough for a
 * phone; a zero is just "0", not "0,0 / 0 toplam".
 */
function densityCell(density: number, total: number) {
  if (total === 0) return formatCount(0);
  return (
    <>
      <span className="whitespace-nowrap">{formatDensity(density)}</span>
      <span className="block text-xs whitespace-nowrap text-muted">
        {t("{total} toplam", { total: formatCount(total) })}
      </span>
    </>
  );
}

/** The same pair as one string, for the chart's text table. */
function densityText(density: number, total: number): string {
  if (total === 0) return formatCount(0);
  return `${formatDensity(density)} (${t("{total} toplam", { total: formatCount(total) })})`;
}

function roundTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

function getPoints(history: HistoryRow[]): Point[] {
  const usable = history.filter(
    (row): row is HistoryRow & { completedAt: string } =>
      row.status === "completed" &&
      row.completedAt !== null &&
      row.pagesCrawled >= MIN_PAGES,
  );

  // Start time, like the history list below: one audit, one time.
  return sort(usable, (a, b) => a.startedAt.localeCompare(b.startedAt)).map(
    (row, index, rows) => ({
      comparableWithPrevious: Boolean(
        row.comparison?.compatible &&
        row.comparison.previousAuditId === rows[index - 1]?.id,
      ),
      key: row.id,
      date: row.startedAt,
      pages: row.pagesCrawled,
      critical: roundTenth((row.issues.critical / row.pagesCrawled) * 100),
      warning: roundTenth((row.issues.warning / row.pagesCrawled) * 100),
      criticalTotal: row.issues.critical,
      warningTotal: row.issues.warning,
    }),
  );
}
