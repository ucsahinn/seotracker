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
  DATA_SERIES,
} from "@/client/components/Chart";
import { formatCount, formatDay } from "@/client/lib/format";
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { t } from "@/shared/i18n";

type TrendRow = { date: string; sessions: number | null };

export function OrganicTrendChart({ rows }: { rows: TrendRow[] }) {
  const reduced = useReducedMotion();
  const total = rows.reduce((sum, row) => sum + (row.sessions ?? 0), 0);
  const peak = rows.reduce((best, row) =>
    (row.sessions ?? 0) > (best.sessions ?? 0) ? row : best,
  );

  return (
    <Chart
      metric="sessions"
      height={180}
      summary={
        rows.some((row) => row.sessions === null)
          ? t(
              "Analytics verisi sınırlı veya eksik. Bilinmeyen değerler çizilmez; dönem karşılaştırması gösterilmez.",
            )
          : t(
              "{days} günde toplam {total} oturum. En yüksek gün {day}, {peak} oturum.",
              {
                days: formatCount(rows.length),
                total: formatCount(total),
                day: formatDay(peak.date),
                peak: formatCount(peak.sessions ?? 0),
              },
            )
      }
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
          allowDecimals={false}
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
                    label: t("oturum"),
                    value:
                      row.sessions === null ? "–" : formatCount(row.sessions),
                    color: DATA_SERIES.sessions,
                  },
                ]}
              />
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="sessions"
          stroke={DATA_SERIES.sessions}
          strokeWidth={2}
          fill={DATA_SERIES.sessions}
          fillOpacity={0.08}
          isAnimationActive={!reduced}
        />
      </AreaChart>
    </Chart>
  );
}
