import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { AnimatedNumber } from "@/client/components/AnimatedNumber";
import { Sparkline } from "@/client/components/Sparkline";
import { useFlashOnChange } from "@/client/components/useFlashOnChange";
import { formatSignedPercent } from "@/client/lib/format";
import { t } from "@/shared/i18n";

/**
 * One number, read at a glance.
 *
 * The tiles used to be plain bordered boxes with a label above a value. Two
 * things were missing and both matter more than the frame: a tile had no way
 * to say "there is no data yet" other than printing a zero, and a change with
 * no direction is just another number. `value` accepts null for the first and
 * `delta` carries the second.
 */
/**
 * A change, either as a fraction to be formatted here or already worded.
 * Search Performance computes its own deltas (a position delta is not a
 * percentage), and before this it cloned the whole tile to say so.
 */
type MetricDelta =
  | number
  | { text: string; improved: boolean; neutral?: true }
  | null
  | undefined;

/** Where a tile leads. Every target takes only the project. */
type MetricTileHref = {
  to:
    | "/p/$projectId/rankings"
    | "/p/$projectId/search-performance"
    | "/p/$projectId/analytics";
  projectId: string;
};

/**
 * With `href` the whole tile is the link, so the hint must be plain text: a
 * link inside a link is invalid HTML. The union makes that a type error.
 */
type TileTarget =
  | { href: MetricTileHref; hint?: string }
  | { href?: undefined; hint?: React.ReactNode };

export function MetricTile({
  label,
  value,
  delta,
  deltaTitle,
  hint,
  href,
  flashKey,
  animateTo,
  trend,
  /** Lower is better, as with an average search position. */
  inverted = false,
}: {
  /** A node so a Latin brand word can carry lang="en". */
  label: React.ReactNode;
  value: string | null;
  delta?: MetricDelta;
  deltaTitle?: string;
  /** What to compare for the change flash when `value` is a rendering of something steadier (a relative time of a timestamp). */
  flashKey?: string | number | null;
  inverted?: boolean;
  /** Opt in to a count-up: the raw number and its formatter. `value` stays the fallback and the null check. Off by default. */
  animateTo?: { value: number; format: (n: number) => string };
  trend?: readonly (number | null)[];
} & TileTarget) {
  const flash = useFlashOnChange(flashKey === undefined ? value : flashKey);
  const body = (
    <>
      <p className="truncate text-xs font-medium text-muted">{label}</p>
      {value === null ? (
        <p className="text-2xl font-semibold text-subtle">–</p>
      ) : (
        /*
         * The change sits under the value on every tile, never beside it:
         * beside, it wrapped on some tiles of a phone-width row and not on
         * others, and the four tiles stopped lining up.
         */
        <div className="flex flex-col gap-0.5">
          {/* Remounted by the key when a refetch changes the number, so the
              tint plays then and not on first paint. */}
          <p
            key={flash.key}
            className={`truncate text-2xl font-semibold tracking-tight ${flash.className}`}
          >
            {animateTo ? (
              <AnimatedNumber
                value={animateTo.value}
                format={animateTo.format}
              />
            ) : (
              value
            )}
          </p>
          <span className="flex min-h-4 items-center">
            <DeltaBadge value={delta} inverted={inverted} title={deltaTitle} />
          </span>
        </div>
      )}
      {/* Not truncated: a hint is usually the one link that makes the tile
          useful, and half a link is worse than a second line. */}
      {hint ? <p className="text-xs text-subtle">{hint}</p> : null}
      {/* Pinned to the bottom so a row of tiles with and without hints
          keeps its sparklines on one line. */}
      {value !== null && trend && (
        <div className="mt-auto pt-1">
          <Sparkline values={trend} inverted={inverted} />
        </div>
      )}
    </>
  );
  const frame = "flex h-full min-w-0 flex-col gap-1.5 px-5 py-4";

  if (!href) return <div className={frame}>{body}</div>;
  return (
    <Link
      to={href.to}
      params={{ projectId: href.projectId }}
      className={`${frame} transition-colors hover:bg-base-200/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary`}
    >
      {body}
    </Link>
  );
}

/**
 * Exported for the dashboard cards, which show a delta beside a `Stat`
 * rather than inside a tile. They had their own copy -- `PercentDelta` --
 * that painted direction with a bare glyph and the fill colours the theme
 * reserves for chips, and announced a percentage with no direction at all.
 */
export function DeltaBadge({
  value,
  inverted = false,
  title,
}: {
  value: MetricDelta;
  inverted?: boolean;
  title?: string;
}) {
  if (value == null) return null;

  // Both periods exist and nothing moved: words, no arrow, no tint.
  if (typeof value !== "number" && value.neutral) {
    return (
      <span
        title={title}
        className="flex items-start gap-0.5 text-xs font-medium text-muted"
      >
        <Minus className="mt-px size-3.5 shrink-0" aria-hidden />
        {value.text}
      </span>
    );
  }

  // An arrow, not just a colour. Success and error sit at almost the same
  // lightness, so under the common colour-vision deficiencies the tint alone
  // says nothing about which direction a number moved.
  const resolved =
    typeof value === "number"
      ? (() => {
          // Null when it rounds to zero at the displayed precision, so no
          // arrow sits beside "%0,0".
          const text = formatSignedPercent(value);
          if (text === null) return null;
          return {
            text,
            improved: inverted ? value < 0 : value > 0,
            up: value > 0,
            spoken: true,
          };
        })()
      : // A worded delta carries its direction in the words or the sign.
        {
          text: value.text,
          improved: value.improved,
          up: value.improved,
          spoken: false,
        };
  if (!resolved) return null;

  const Icon = resolved.up ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      title={title}
      className={`flex items-center gap-0.5 text-xs font-medium ${
        resolved.improved
          ? "text-[var(--ink-success)]"
          : "text-[var(--ink-error)]"
      }`}
    >
      <Icon className="size-3.5" aria-hidden />
      {/* The arrow carries direction for a sighted reader and is
          aria-hidden, so without this the announced value is a bare
          number: no up or down, and good-or-bad only in colour. */}
      {resolved.spoken ? (
        <span className="sr-only">
          {resolved.up ? t("arttı") : t("azaldı")}{" "}
        </span>
      ) : null}
      {resolved.text}
    </span>
  );
}

/**
 * The tiles as a row. Divided by hairlines rather than gapped into separate
 * cards: they are one reading, not four unrelated facts.
 */
export function MetricRow({ children }: { children: React.ReactNode }) {
  return (
    /*
     * `stagger`: the tiles arrive one after another instead of in the same
     * frame, so a row of four numbers reads as data landing rather than a
     * page swap. The index is written onto each child below.
     */
    <div className="metric-grid stagger grid grid-cols-2 divide-x divide-y divide-base-300 overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-[var(--shadow-raise)] lg:grid-cols-4 lg:divide-y-0">
      {React.Children.map(children, (child, index) => (
        /*
         * The delay is written as `animation-delay` itself rather than as a
         * `--i` custom property read back by the stylesheet: a CSS variable
         * is not part of `CSSProperties`, and typing one in costs a cast.
         * Capped at the sixth tile so a long row never waits a second.
         */
        <div
          className="h-full"
          style={{ animationDelay: `${Math.min(index, 5) * 40}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
