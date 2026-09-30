import { X } from "lucide-react";
import * as React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { Chart, ChartTooltip } from "@/client/components/Chart";
import { formatCount, formatPercent } from "@/client/lib/format";

/**
 * A share of a whole, as a ring — and, when the caller passes `onSelect`, as
 * a filter.
 *
 * There were four of these. This one, a clickable one in the analytics
 * screen, another in the audit results, and a hand-drawn SVG in the country
 * panel — each with its own idea of animation, of what a selected arc looks
 * like, and of whether the keyboard could reach it. This is the union of what
 * they did, so a screen picks the behaviour it needs instead of writing a
 * fifth.
 *
 * A donut rather than a pie: the hole carries the total (or the selected
 * segment's value), which is the number a reader wants next to the split. It
 * also keeps thin segments as arcs rather than wedges meeting at a point.
 *
 * Limited to a handful of segments on purpose. Past five or six, arc lengths
 * stop being comparable by eye and a sorted bar list is the better chart —
 * which is why the country bars and the position bands stayed bars. Use this
 * for "how is one total divided".
 *
 * The legend is a list of real buttons with names and numbers, so the colours
 * are a second encoding rather than the only one, and the ring is the quick
 * path to the same choices rather than the only path.
 */

type DonutSegment = {
  key: string;
  label: string;
  value: number;
  /** A CSS colour. Omitted, the segments are tints of the one accent. */
  color?: string;
  /** What the group means, in plain words, under its name. */
  hint?: string;
  /**
   * A segment that is part of the whole but not something to filter to —
   * "Diğer ülkeler" is many countries pooled, so there is no one to choose.
   */
  disabled?: boolean;
};

/*
 * One accent, then tints of it: the house chart rule. Six steps is the most a
 * ring should ever carry.
 */
const TINTS = [100, 78, 60, 46, 34, 24];

function tint(index: number): string {
  const share = TINTS[index] ?? TINTS[TINTS.length - 1];
  return `color-mix(in oklab, var(--color-primary) ${share}%, var(--color-base-100))`;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function DonutChart({
  segments,
  totalLabel,
  summary,
  height = 184,
  selectedKey = null,
  onSelect,
}: {
  segments: DonutSegment[];
  /** What the number in the hole counts, e.g. "sayfa". */
  totalLabel: string;
  /** The finding, for readers who cannot see the ring. */
  summary: string;
  height?: number;
  /** The chosen segment. The parent owns it so ring and table cannot differ. */
  selectedKey?: string | null;
  /** Passing this makes the ring and its legend clickable. */
  onSelect?: (key: string | null) => void;
}) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const shown = segments.filter((segment) => segment.value > 0);
  const total = shown.reduce((sum, segment) => sum + segment.value, 0);

  // A ring of nothing is a shape that looks like an answer.
  if (total === 0 || shown.length === 0) return null;

  // By position in the full list, so an arc and its legend dot always agree
  // -- an empty group ahead of it would otherwise shift every tint by one.
  const colorOf = (segment: DonutSegment) =>
    segment.color ??
    tint(segments.findIndex((candidate) => candidate.key === segment.key));
  const toggle = (key: string) => {
    if (shown.find((segment) => segment.key === key)?.disabled) return;
    onSelect?.(key === selectedKey ? null : key);
  };
  const selected = shown.find((segment) => segment.key === selectedKey);
  // A chosen group with no value has no arc; dimming every arc for it would
  // leave a ring with nothing lit, so it counts as no choice for the ring.
  const activeKey = selected ? selected.key : null;
  const interactive = onSelect !== undefined;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative shrink-0" style={{ width: height }}>
        <Chart height={height} summary={summary}>
          <PieChart>
            <Pie
              data={shown}
              dataKey="value"
              nameKey="label"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="none"
              isAnimationActive={!prefersReducedMotion()}
              animationDuration={700}
              cursor={interactive ? "pointer" : "default"}
              onMouseEnter={(_, index: number) => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={(_, index: number) => {
                const segment = shown[index];
                if (segment) toggle(segment.key);
              }}
            >
              {shown.map((segment) => (
                <Cell
                  key={segment.key}
                  fill={colorOf(segment)}
                  // The ones not chosen fade back while a choice is active.
                  opacity={
                    activeKey === null || activeKey === segment.key ? 1 : 0.35
                  }
                />
              ))}
            </Pie>
            <Tooltip
              /*
               * The hovered segment comes from the arc's own mouse events,
               * not from recharts' `payload`, which is typed `any` -- so
               * reading a label off it would put the tooltip's correctness
               * outside the type checker.
               */
              content={({ active }) => {
                const segment =
                  active && hovered !== null ? shown[hovered] : null;
                if (!segment) return null;
                return (
                  <ChartTooltip
                    title={segment.label}
                    rows={[
                      {
                        label: totalLabel,
                        value: `${formatCount(segment.value)} · ${formatPercent(segment.value / total)}`,
                      },
                    ]}
                  />
                );
              }}
            />
          </PieChart>
        </Chart>
        {/* `pointer-events-none` so the hole never steals a hover from an arc. */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums">
            {formatCount(selected ? selected.value : total)}
          </span>
          <span className="text-xs text-muted">{totalLabel}</span>
        </div>
      </div>

      {/*
       * The legend lists every group, including the empty ones. A ring cannot
       * draw a zero-width arc, but "0 pages waiting for an answer" is itself
       * a finding, and a group that vanishes when it empties reads as if it
       * had never existed. An empty group cannot be chosen: there is nothing
       * to filter down to.
       */}
      <ul className="w-full space-y-1">
        {segments.map((segment) => {
          const isSelected = segment.key === selectedKey;
          const empty = segment.value <= 0;
          const row = (
            <>
              <span className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorOf(segment) }}
                />
                <span className="min-w-0">
                  <span className="block truncate">{segment.label}</span>
                  {segment.hint ? (
                    <span className="block truncate text-xs text-muted">
                      {segment.hint}
                    </span>
                  ) : null}
                </span>
              </span>
              <span className="shrink-0 tabular-nums">
                {formatCount(segment.value)}
                <span className="ml-2 text-muted">
                  {formatPercent(segment.value / total)}
                </span>
              </span>
            </>
          );
          return (
            <li key={segment.key}>
              {interactive ? (
                <button
                  type="button"
                  disabled={segment.disabled || empty}
                  aria-pressed={
                    segment.disabled || empty ? undefined : isSelected
                  }
                  onClick={() => toggle(segment.key)}
                  className={`flex w-full items-baseline justify-between gap-3 rounded-field px-2 py-1 text-left text-sm transition-colors enabled:hover:bg-base-200 ${
                    isSelected ? "bg-base-200" : ""
                  }`}
                >
                  {row}
                </button>
              ) : (
                <div
                  className={`flex items-baseline justify-between gap-3 px-2 py-1 text-sm ${
                    empty ? "opacity-60" : ""
                  }`}
                >
                  {row}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The ring in a framed panel with a title, one line of instruction, and a
 * button to let go of the current choice.
 *
 * Every screen that used a filtering ring wrote this same header around it.
 */
export function DonutCard({
  title,
  description,
  selectedKey = null,
  onSelect,
  ...ring
}: {
  title: string;
  description?: string;
  segments: DonutSegment[];
  totalLabel: string;
  summary: string;
  height?: number;
  selectedKey?: string | null;
  onSelect?: (key: string | null) => void;
}) {
  const selected = ring.segments.find((segment) => segment.key === selectedKey);

  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-medium">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-xs text-muted">{description}</p>
          ) : null}
        </div>
        {selected && onSelect ? (
          <button
            type="button"
            className="btn btn-ghost btn-xs gap-1"
            onClick={() => onSelect(null)}
          >
            <X aria-hidden className="size-3.5" />
            Seçimi kaldır
          </button>
        ) : null}
      </div>
      <div className="mt-3">
        <DonutChart {...ring} selectedKey={selectedKey} onSelect={onSelect} />
      </div>
    </section>
  );
}

/**
 * The one-sentence reading of a ring, for readers who cannot see it.
 *
 * Every caller was about to write the same thing: the total, then the biggest
 * share. It states the finding rather than describing the shape — "62 sayfa;
 * en büyük pay Google'da, %71" rather than "halka grafik".
 */
export function donutSummary(
  segments: DonutSegment[],
  totalLabel: string,
): string {
  const shown = segments.filter((segment) => segment.value > 0);
  const total = shown.reduce((sum, segment) => sum + segment.value, 0);
  const lead = shown.reduce<DonutSegment | null>(
    (best, segment) =>
      best === null || segment.value > best.value ? segment : best,
    null,
  );
  return lead
    ? `${formatCount(total)} ${totalLabel}; en büyük pay ${lead.label}, ${formatPercent(lead.value / total)}.`
    : `${formatCount(total)} ${totalLabel}.`;
}
