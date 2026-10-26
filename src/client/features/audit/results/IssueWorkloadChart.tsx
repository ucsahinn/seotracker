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
import { useReducedMotion } from "@/client/lib/useReducedMotion";
import { formatCount } from "@/client/lib/format";
import type { IssueSeverity } from "@/shared/audit-issues";
import { t } from "@/shared/i18n";
import { SeverityIcon } from "./SeverityChip";

/** How many bars before the chart stops being readable and starts being a list. */
const MAX_BARS = 8;

/*
 * Severity decides the bar's colour, and the bar also carries its count and
 * its name — because `--color-error` and `--color-warning` sit at nearly the
 * same lightness, so a reader who cannot separate them must still be able to
 * read the chart. Direction is never colour alone. Info uses the same blue
 * as the severity ring beside it; a grey bar on the dark surface all but
 * disappeared.
 */
const SEVERITY_FILL: Record<IssueSeverity, string> = {
  critical: "var(--mark-error)",
  warning: "var(--mark-warning)",
  info: "var(--color-info)",
};

// Turkish source labels; t() runs where they render.
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
  const reduced = useReducedMotion();
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
  const legend = (["critical", "warning", "info"] as const).filter((level) =>
    rows.some((row) => row.severity === level),
  );
  const top = rows[0];

  return (
    <div className="rounded-box border border-base-300 bg-base-100 px-2 py-3">
      <p className="px-2 text-sm font-medium">
        {t("En çok sayfayı hangi sorun etkiliyor?")}
      </p>
      <p className="mb-1 px-2 text-xs text-muted">
        {hidden > 0
          ? t(
              "En çok sayfayı etkileyen {count} sorun türü; kalan {hidden} tür aşağıdaki listede.",
              { count: rows.length, hidden: formatCount(hidden) },
            )
          : t("En çok sayfayı etkileyen {count} sorun türü.", {
              count: rows.length,
            })}
        {onSelect ? ` ${t("Bir çubuğa tıklayıp listeyi daraltın.")}` : ""}
      </p>
      <Chart
        height={Math.max(140, rows.length * 40)}
        summary={t(
          "En çok sayfayı etkileyen sorun: {title}, {pages} sayfa. Grafikte {count} tür var.",
          {
            title: top.title,
            pages: formatCount(top.pageCount),
            count: rows.length,
          },
        )}
        table={{
          caption: t("Sorun türüne göre etkilenen sayfa sayısı"),
          columns: [t("Sorun"), t("Önem"), t("Etkilenen sayfa")],
          rows: rows.map((row) => [
            row.title,
            t(SEVERITY_LABEL[row.severity]),
            formatCount(row.pageCount),
          ]),
        }}
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
            // 12px floor for chart text: the shared 11px axis was the
            // smallest text on the screen, on its longest labels.
            tick={{ ...CHART_AXIS.tick, fontSize: 12 }}
            width={210}
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
                      label: t(SEVERITY_LABEL[row.severity]),
                      value: t("{count} sayfa", { count: row.pageCount }),
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
            isAnimationActive={!reduced}
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
              className="fill-current text-xs tabular-nums"
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
      <ul
        aria-label={t("Renklerin anlamı")}
        className="mt-1 flex flex-wrap gap-x-4 gap-y-1 px-2 text-xs text-muted"
      >
        {legend.map((severity) => (
          <li key={severity} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden
              className="size-2.5 rounded-[2px]"
              style={{ background: SEVERITY_FILL[severity] }}
            />
            <SeverityIcon severity={severity} className="size-3" />
            {t(SEVERITY_LABEL[severity])}
          </li>
        ))}
      </ul>
      {/*
       * The bars are a pointer shortcut. This is the same choice for the
       * keyboard: invisible until a button is focused, then shown, so focus
       * is never lost on an element the reader cannot see.
       */}
      {onSelect ? (
        <ul
          aria-label={t("Sorun türüne göre filtre")}
          className="sr-only focus-within:not-sr-only focus-within:mt-2 focus-within:flex focus-within:flex-wrap focus-within:gap-1 focus-within:px-2"
        >
          {rows.map((row) => (
            <li key={row.issueType}>
              <button
                type="button"
                aria-pressed={selectedType === row.issueType}
                className="btn btn-xs btn-ghost border-base-300"
                onClick={() =>
                  onSelect(
                    row.issueType === selectedType ? null : row.issueType,
                  )
                }
              >
                {row.title} · {formatCount(row.pageCount)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
