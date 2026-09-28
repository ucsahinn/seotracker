import { StackedShare } from "@/client/components/StackedShare";
import { formatCount } from "@/client/lib/format";

/*
 * Lighthouse's own bands. Not thresholds this app invented: the report
 * colours scores by these, so an operator who opens PageSpeed Insights sees
 * the same three groups.
 */
const GOOD_FROM = 90;
const FAIR_FROM = 50;

/**
 * How the speed scores are spread, beside the average that hides it.
 *
 * An average of 62 across two hundred pages reads identically whether every
 * page is mediocre or half are perfect and half are unusable — and those
 * are different weeks of work. Three bands answer which one it is.
 */
export function ScoreHistogram({ scores }: { scores: Array<number | null> }) {
  const measured = scores.filter((score): score is number => score !== null);
  if (measured.length === 0) return null;

  const good = measured.filter((score) => score >= GOOD_FROM).length;
  const fair = measured.filter(
    (score) => score >= FAIR_FROM && score < GOOD_FROM,
  ).length;
  const poor = measured.length - good - fair;

  return (
    <StackedShare
      summary={`${formatCount(measured.length)} ölçümden ${formatCount(good)} iyi, ${formatCount(fair)} orta, ${formatCount(poor)} zayıf.`}
      segments={[
        { label: "İyi (90+)", value: good, color: "var(--color-success)" },
        { label: "Orta (50-89)", value: fair, color: "var(--color-warning)" },
        { label: "Zayıf (0-49)", value: poor, color: "var(--color-error)" },
      ]}
    />
  );
}
