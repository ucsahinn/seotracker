import {
  CircleSlash,
  MousePointerClick,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { FilterChips } from "@/client/features/search-performance/FilterChips";
import {
  countQuickFilter,
  LOW_CTR_MIN_IMPRESSIONS,
  LOW_CTR_THRESHOLD,
  type QuickFilterId,
} from "@/client/features/search-performance/quickFilters";
import { formatCount, formatPercent } from "@/client/lib/format";

type Row = {
  clicks: number;
  impressions: number;
  ctr?: number;
  position: number;
};

type ChipDef = { label: string; icon: LucideIcon; hint: string };

/** Only the ids a tab offers need an entry; the rest are bar-only filters. */
const CHIPS: Partial<Record<QuickFilterId, ChipDef>> = {
  top10: {
    label: "İlk 10'da",
    icon: Trophy,
    hint: "Ortalama sırası 10 veya daha iyi olanlar; yani Google'ın ilk sayfası.",
  },
  noClicks: {
    label: "Hiç tıklanmayan",
    icon: CircleSlash,
    hint: "Gösterilmiş ama bir kez bile tıklanmamış satırlar.",
  },
  lowCtr: {
    label: "Tıklama oranı düşük",
    icon: MousePointerClick,
    hint: `İlk sayfada olup ${formatCount(LOW_CTR_MIN_IMPRESSIONS)} veya daha fazla gösterim alan ve tıklama oranı ${formatPercent(LOW_CTR_THRESHOLD, 0)}'nin altında kalan satırlar. Başlığı ve açıklamayı iyileştirmeye değer.`,
  },
  hasClicks: {
    label: "Tıklama alanlar",
    icon: MousePointerClick,
    hint: "En az bir tıklama almış satırlar.",
  },
  pos5to10: {
    label: "Sıra 5-10",
    icon: Trophy,
    hint: "İlk sayfanın alt yarısı. Küçük bir iyileştirme ilk üçe taşıyabilir.",
  },
  pos11to20: {
    label: "Sıra 11-20",
    icon: CircleSlash,
    hint: "İkinci sayfa. İlk sayfaya girmek tıklamayı en çok artıran adımdır.",
  },
};

const DEFAULT_IDS: QuickFilterId[] = ["top10", "noClicks", "lowCtr"];

/** Quick filters for one tab's rows. Counts cover every row fetched, not the
 *  current page or the text search. */
export function QuickFilterBar({
  rows,
  active,
  onChange,
  ids = DEFAULT_IDS,
}: {
  rows: Row[];
  active: QuickFilterId | undefined;
  onChange: (next: QuickFilterId | undefined) => void;
  /** Which chips this tab offers, in order. */
  ids?: QuickFilterId[];
}) {
  const chips = ids.flatMap((id) => {
    const def = CHIPS[id];
    return def ? [{ id, ...def, count: countQuickFilter(rows, id) }] : [];
  });
  return (
    <FilterChips<QuickFilterId>
      label="Hızlı filtreler"
      active={active}
      onChange={onChange}
      chips={chips}
    />
  );
}
