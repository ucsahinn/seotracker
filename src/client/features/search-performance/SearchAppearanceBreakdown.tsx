import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import { appearanceSegments } from "@/client/features/search-performance/searchAppearance";

/**
 * How results showed up in Google: FAQ, video, review snippet and so on.
 *
 * Informational on purpose. Filtering the rest of the page by appearance is
 * possible in Search Console, but it would add a fourth URL filter for a
 * breakdown most sites never get rows for, so the ring has no `onSelect`.
 * Renders nothing when Google returned no rows -- an empty ring would read as
 * "zero" rather than "this site has no rich results".
 */
export function SearchAppearanceBreakdown({
  rows,
}: {
  rows: { key: string; clicks: number; impressions: number }[];
}) {
  const { metric, segments } = appearanceSegments(rows);
  if (segments.length === 0) return null;
  const unit = metric === "clicks" ? "tıklama" : "gösterim";

  return (
    <DonutCard
      title="Arama görünümü"
      description={`Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (${unit} sayısına göre). Google bu kırılımı başka bir ölçüyle birleştirmez.`}
      totalLabel={unit}
      height={144}
      segments={segments}
      summary={donutSummary(segments, unit)}
    />
  );
}
