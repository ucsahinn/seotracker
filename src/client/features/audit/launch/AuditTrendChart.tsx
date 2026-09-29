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
import { formatCount, formatDate, formatDateTime } from "@/client/lib/format";

/**
 * Whether the site is getting better, which the table under it cannot say.
 *
 * The history list has always held every completed audit with its date, and
 * the only way to answer "did last month's work help?" was to open two of
 * them in two tabs and subtract by eye. The counts were already in the
 * database; nothing here costs an extra crawl.
 *
 * Plotted per hundred pages rather than raw. A 20-page spot check and a
 * 212-page full crawl produce counts an order of magnitude apart for the
 * same site, so raw totals draw a mountain range out of the crawl settings
 * and hide the trend underneath. Density is the number that survives a
 * change of scope.
 */

const SEVERITY = {
  critical: "var(--color-error)",
  warning: "var(--color-warning)",
} as const;

/** Under this the density is an average over too little to mean anything. */
const MIN_PAGES = 5;

type HistoryRow = {
  id: string;
  status: string;
  pagesCrawled: number;
  completedAt: string | null;
  issues: { critical: number; warning: number; info: number };
};

type Point = {
  key: string;
  date: string;
  pages: number;
  critical: number;
  warning: number;
  criticalTotal: number;
  warningTotal: number;
};

export function AuditTrendChart({ history }: { history: HistoryRow[] }) {
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
  const anyFindings = points.some(
    (point) => point.critical > 0 || point.warning > 0,
  );

  return (
    <section className="rounded-box border border-base-300 bg-base-200/25 px-2 py-3">
      <div className="px-2">
        <h3 className="text-sm font-medium">Denetimler arası seyir</h3>
        <p className="mt-0.5 text-xs text-muted">
          Yüz sayfa başına sorun sayısı. Farklı büyüklükteki taramalar bu
          ölçüyle karşılaştırılabilir.
        </p>
      </div>
      {!anyFindings ? (
        <p className="px-2 pt-3 text-sm text-muted">
          Bu {formatCount(points.length)} denetimin hiçbirinde kritik sorun ya
          da uyarı çıkmadı. Çizilecek bir seyir yok; bilgi düzeyindeki bulgular
          aşağıdaki denetimlerin kendi sayfalarında.
        </p>
      ) : (
        <Chart height={180} summary={summarise(first, last, points.length)}>
          <LineChart
            data={points}
            margin={{ top: 12, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid {...CHART_GRID} />
            <XAxis
              dataKey="date"
              {...CHART_AXIS}
              tickFormatter={formatDate}
              minTickGap={24}
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
                    title={`${formatDateTime(point.date)} · ${formatCount(point.pages)} sayfa`}
                    rows={[
                      {
                        label: "Kritik",
                        value: `${formatCount(point.critical)} / 100 sayfa (${formatCount(point.criticalTotal)} toplam)`,
                        color: SEVERITY.critical,
                      },
                      {
                        label: "Uyarı",
                        value: `${formatCount(point.warning)} / 100 sayfa (${formatCount(point.warningTotal)} toplam)`,
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
              name="Kritik"
              stroke={SEVERITY.critical}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="warning"
              name="Uyarı"
              stroke={SEVERITY.warning}
              strokeWidth={2}
              /*
               * Dashed as well as tinted: `--color-error` and `--color-warning`
               * sit at nearly the same lightness, so two solid lines are one
               * line to a reader who cannot separate the hues.
               */
              strokeDasharray="4 3"
              dot={{ r: 3 }}
            />
          </LineChart>
        </Chart>
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
      ? { label: "kritik sorun", from: first.critical, to: last.critical }
      : { label: "uyarı", from: first.warning, to: last.warning };

  const delta = series.to - series.from;
  const direction = delta === 0 ? "değişmedi" : delta < 0 ? "azaldı" : "arttı";
  return `${formatCount(total)} denetim. Yüz sayfa başına ${series.label} ${formatDate(first.date)} tarihinde ${formatCount(series.from)} iken ${formatDate(last.date)} tarihinde ${formatCount(series.to)}; ${direction}.`;
}

function getPoints(history: HistoryRow[]): Point[] {
  const usable = history.filter(
    (row): row is HistoryRow & { completedAt: string } =>
      row.status === "completed" &&
      row.completedAt !== null &&
      row.pagesCrawled >= MIN_PAGES,
  );

  return sort(usable, (a, b) => a.completedAt.localeCompare(b.completedAt)).map(
    (row) => ({
      key: row.id,
      date: row.completedAt,
      pages: row.pagesCrawled,
      critical: Math.round((row.issues.critical / row.pagesCrawled) * 100),
      warning: Math.round((row.issues.warning / row.pagesCrawled) * 100),
      criticalTotal: row.issues.critical,
      warningTotal: row.issues.warning,
    }),
  );
}
