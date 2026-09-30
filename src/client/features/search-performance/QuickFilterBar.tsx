import { CircleSlash, MousePointerClick, Trophy } from "lucide-react";
import { FilterChips } from "@/client/features/search-performance/FilterChips";
import {
  countQuickFilters,
  LOW_CTR_MIN_IMPRESSIONS,
  LOW_CTR_THRESHOLD,
  type QuickFilterId,
} from "@/client/features/search-performance/quickFilters";
import { formatCount, formatPercent } from "@/client/lib/format";

type Row = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/** Quick filters above the queries and pages tables. Counts cover every row
 *  fetched, not the current page or the text search. */
export function QuickFilterBar({
  rows,
  active,
  onChange,
}: {
  rows: Row[];
  active: QuickFilterId | undefined;
  onChange: (next: QuickFilterId | undefined) => void;
}) {
  const counts = countQuickFilters(rows);
  return (
    <FilterChips<QuickFilterId>
      label="Hızlı filtreler"
      active={active}
      onChange={onChange}
      chips={[
        {
          id: "top10",
          label: "İlk 10'da",
          icon: Trophy,
          count: counts.top10,
          hint: "Ortalama sırası 10 veya daha iyi olanlar; yani Google'ın ilk sayfası.",
        },
        {
          id: "noClicks",
          label: "Hiç tıklanmayan",
          icon: CircleSlash,
          count: counts.noClicks,
          hint: "Gösterilmiş ama bir kez bile tıklanmamış satırlar.",
        },
        {
          id: "lowCtr",
          label: "Tıklama oranı düşük",
          icon: MousePointerClick,
          count: counts.lowCtr,
          hint: `İlk sayfada olup ${formatCount(LOW_CTR_MIN_IMPRESSIONS)} veya daha fazla gösterim alan ve tıklama oranı ${formatPercent(LOW_CTR_THRESHOLD, 0)}'nin altında kalan satırlar. Başlığı ve açıklamayı iyileştirmeye değer.`,
        },
      ]}
    />
  );
}
