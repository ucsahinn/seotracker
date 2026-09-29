import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Chart,
  ChartTooltip,
  CHART_AXIS,
  CHART_GRID,
  CHART_SERIES,
} from "@/client/components/Chart";
import { DeltaBadge } from "@/client/components/MetricTile";
import { formatCount, formatDay, formatPercent } from "@/client/lib/format";
import { getGa4DashboardReport } from "@/serverFunctions/ga4";

type TrendRow = { date: string; sessions: number };

/**
 * The shape of the window, above the table that lists it.
 *
 * The overview service has produced a daily trend since it was written and
 * the dashboard card was its only reader — so the screen whose entire
 * subject is Analytics drew seven tables and not one line. Same service,
 * same call shape, with the window the operator already picked.
 */
export function OrganicTrendPanel({
  projectId,
  windowDays,
}: {
  projectId: string;
  windowDays: number;
}) {
  const query = useQuery({
    queryKey: ["ga4Overview", projectId, windowDays],
    queryFn: () => getGa4DashboardReport({ data: { projectId, windowDays } }),
  });

  if (query.isPending) return <div className="skeleton h-40" aria-busy />;
  // Not connected, or a report that cannot succeed: the tables below say so
  // in their own words, and a second copy of that message helps nobody.
  if (query.isError || !query.data?.connected) return null;

  const { totals, prevTotals, trend } = query.data;
  const rows: TrendRow[] = trend;
  const hasSessions = rows.some((row) => row.sessions > 0);

  return (
    <section className="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-base-300 px-4 py-3">
        <div>
          <h2 className="text-sm font-medium">Organik oturumlar</h2>
          <p className="mt-0.5 text-xs text-muted">
            Seçtiğiniz aralıkta, günlere dağılmış.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Total
            label="Oturum"
            value={totals.sessions}
            previous={prevTotals.sessions}
            format={formatCount}
          />
          <Total
            label="Etkileşim oranı"
            value={totals.engagementRate}
            previous={prevTotals.engagementRate}
            format={formatPercent}
          />
        </div>
      </div>

      {hasSessions ? (
        <div className="px-2 py-3">
          <TrendChart rows={rows} />
        </div>
      ) : (
        /* A flat line along zero is a shape that looks like an answer. */
        <p className="px-4 py-6 text-sm text-muted">
          Bu aralıkta organik oturum yok, çizilecek bir seyir de yok.
        </p>
      )}
    </section>
  );
}

function Total({
  label,
  value,
  previous,
  format,
}: {
  label: string;
  value: number | null;
  previous: number | null;
  format: (value: number) => string;
}) {
  return (
    <div className="text-right">
      <p className="text-xs text-muted">{label}</p>
      <p className="flex items-center gap-1.5 text-sm font-medium tabular-nums">
        {value === null ? "--" : format(value)}
        {value !== null && previous !== null && previous > 0 ? (
          <DeltaBadge value={(value - previous) / previous} />
        ) : null}
      </p>
    </div>
  );
}

function TrendChart({ rows }: { rows: TrendRow[] }) {
  const total = rows.reduce((sum, row) => sum + row.sessions, 0);
  const peak = rows.reduce((best, row) =>
    row.sessions > best.sessions ? row : best,
  );

  return (
    <Chart
      height={180}
      summary={`${rows.length} günde toplam ${formatCount(total)} organik oturum. En yüksek gün ${formatDay(peak.date)}, ${formatCount(peak.sessions)} oturum.`}
    >
      <AreaChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid {...CHART_GRID} />
        <XAxis
          dataKey="date"
          {...CHART_AXIS}
          tickFormatter={formatDay}
          minTickGap={24}
        />
        <YAxis
          {...CHART_AXIS}
          width={48}
          tickFormatter={formatCount}
          domain={[0, "auto"]}
        />
        <Tooltip
          cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
          content={({ active, label }) => {
            if (!active || typeof label !== "string") return null;
            const row = rows.find((entry) => entry.date === label);
            if (!row) return null;
            return (
              <ChartTooltip
                title={formatDay(label)}
                rows={[
                  {
                    label: "oturum",
                    value: formatCount(row.sessions),
                    color: CHART_SERIES.primary,
                  },
                ]}
              />
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="sessions"
          stroke={CHART_SERIES.primary}
          strokeWidth={2}
          fill={CHART_SERIES.primary}
          fillOpacity={0.08}
        />
      </AreaChart>
    </Chart>
  );
}
