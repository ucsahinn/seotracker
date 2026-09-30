import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Chart, ChartTooltip, CHART_AXIS } from "@/client/components/Chart";
import { sort } from "remeda";
import { formatCount } from "@/client/lib/format";
import type { IssueSeverity } from "@/shared/audit-issues";

/** How many bars before the chart stops being readable and starts being a list. */
const MAX_BARS = 8;

/*
 * Severity decides the bar's colour, and the bar also carries its count and
 * its name — because `--color-error` and `--color-warning` sit at nearly the
 * same lightness, so a reader who cannot separate them must still be able to
 * read the chart. Direction is never colour alone.
 */
const SEVERITY_FILL: Record<IssueSeverity, string> = {
  critical: "var(--color-error)",
  warning: "var(--color-warning)",
  info: "var(--color-base-300)",
};

const SEVERITY_LABEL: Record<IssueSeverity, string> = {
  critical: "Kritik",
  warning: "Uyarı",
  info: "Bilgi",
};

type WorkloadRow = {
  issueType: string;
  title: string;
  severity: IssueSeverity;
  pageCount: number;
};

/**
 * Where the work actually is, above the list of what the work is.
 *
 * The sections below are ordered by severity first, so a critical issue on
 * one page sits above a warning on ninety. Both orderings are right for
 * different questions; this answers "what would fixing one thing change".
 */
export function IssueWorkloadChart({
  groups,
  selectedType = null,
  onSelect,
}: {
  groups: WorkloadRow[];
  /** The issue type the list below is narrowed to, if any. */
  selectedType?: string | null;
  /** A bar was clicked: narrow the list to that type, or release it. */
  onSelect?: (issueType: string | null) => void;
}) {
  // Two bars is a comparison the list already makes; below that it is noise.
  if (groups.length < 3) return null;

  /*
   * Sorted here, not taken as given. `groupIssues` orders by severity first,
   * which is right for the list below -- but a chart that claims to show
   * where the work is, drawn in severity order, put a two-page critical
   * above a fifty-three-page warning and called the two-page one the
   * biggest. The list answers "what is most serious"; this answers "what
   * touches the most pages", and it has to be sorted by that to say it.
   */
  const rows = sort(groups, (a, b) => b.pageCount - a.pageCount).slice(
    0,
    MAX_BARS,
  );
  const hidden = groups.length - rows.length;
  const top = rows[0];

  return (
    <div className="rounded-box border border-base-300 bg-base-100 px-2 py-3">
      <p className="px-2 text-sm font-medium">
        En çok sayfayı hangi sorun etkiliyor?
      </p>
      <p className="mb-1 px-2 text-xs text-muted">
        En çok sayfayı etkileyen {rows.length} tür
        {hidden > 0 ? `, kalan ${formatCount(hidden)} tür aşağıda` : ""}.
        {onSelect ? " Bir çubuğa tıklayıp listeyi daraltın." : ""}
      </p>
      <Chart
        height={Math.max(120, rows.length * 34)}
        summary={`En çok sayfayı etkileyen sorun: ${top.title}, ${formatCount(top.pageCount)} sayfa. Grafikte ${rows.length} tür var.`}
      >
        <BarChart
          layout="vertical"
          data={rows}
          margin={{ top: 0, right: 16, bottom: 0, left: 8 }}
          barCategoryGap={6}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="title"
            {...CHART_AXIS}
            width={150}
            interval={0}
          />
          <Tooltip
            cursor={{ fill: "currentColor", fillOpacity: 0.06 }}
            content={({ active, label }) => {
              if (!active || typeof label !== "string") return null;
              const row = rows.find((entry) => entry.title === label);
              if (!row) return null;
              return (
                <ChartTooltip
                  title={row.title}
                  rows={[
                    {
                      label: SEVERITY_LABEL[row.severity],
                      value: `${formatCount(row.pageCount)} sayfa`,
                      color: SEVERITY_FILL[row.severity],
                    },
                  ]}
                />
              );
            }}
          />
          <Bar
            dataKey="pageCount"
            radius={[0, 4, 4, 0]}
            animationDuration={700}
            className={onSelect ? "cursor-pointer" : undefined}
            onClick={(_, index: number) => {
              const row = rows[index];
              if (!onSelect || !row) return;
              onSelect(row.issueType === selectedType ? null : row.issueType);
            }}
          >
            {/*
             * The count sits at the end of its own bar. Without it the chart
             * is a set of lengths and the reader has to go to the list below
             * to learn any number -- which is the list they were trying to
             * avoid reading.
             */}
            <LabelList
              dataKey="pageCount"
              position="right"
              className="fill-current text-[11px] tabular-nums"
              formatter={(value: unknown) =>
                typeof value === "number" ? formatCount(value) : ""
              }
            />
            {rows.map((row) => (
              <Cell
                key={row.issueType}
                fill={SEVERITY_FILL[row.severity]}
                fillOpacity={
                  selectedType === null || selectedType === row.issueType
                    ? 1
                    : 0.3
                }
              />
            ))}
          </Bar>
        </BarChart>
      </Chart>
    </div>
  );
}
