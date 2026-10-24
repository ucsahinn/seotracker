import { CircleHelp, Target, Trophy } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { DonutCard, donutSummary } from "@/client/components/DonutChart";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { FilterChips } from "@/client/features/search-performance/FilterChips";
import { BAND_LABELS } from "@/client/features/rankings/positionBands";
import { formatCount } from "@/client/lib/format";
import { fillParts } from "@/client/features/settings/fillParts";
import {
  countPositionGroups,
  toPositionFilter,
  type PositionFilter,
} from "./savedKeywordPositions";
import {
  POSITION_WINDOW_DAYS,
  TRACKED_LIMIT,
} from "./useSavedKeywordPositions";
import { t } from "@/shared/i18n";

type Positions = {
  loading: boolean;
  /** Null while the archive read is healthy. */
  error: Error | null;
  onRetry: () => void;
  /** Rows in the Search Console archive for the window. */
  archiveRows: number;
  map: Map<string, number>;
};

/**
 * What the saved list says about itself: how many keywords, how many Google
 * has actually ranked, and where they sit.
 *
 * Every number is the real filtered list joined to the Search Console
 * archive; nothing is estimated. A keyword the archive has never seen has no
 * position and gets its own group instead of a made-up rank.
 */
export function SavedKeywordsSummary({
  projectId,
  keywords,
  isLoading,
  positions,
  filter,
  onFilter,
}: {
  projectId: string;
  /** The saved keywords matching the current filters; undefined while loading. */
  keywords: { keyword: string }[] | undefined;
  isLoading: boolean;
  positions: Positions;
  filter: PositionFilter | null;
  onFilter: (next: PositionFilter | null) => void;
}) {
  if (isLoading || (keywords && positions.loading && keywords.length > 0)) {
    return <SummarySkeleton />;
  }
  // The empty and error states belong to the table below.
  if (!keywords || keywords.length === 0) return null;

  if (positions.error) {
    return (
      <QueryErrorState
        compact
        error={positions.error}
        onRetry={positions.onRetry}
        title={t("Sıra bilgisi yüklenemedi")}
      />
    );
  }

  const counts = countPositionGroups(keywords, positions.map);
  const ranked = keywords.length - counts.none;
  // The archive read stops at TRACKED_LIMIT rows, so a keyword missing from it
  // may still rank; "no record" would be a claim the data cannot back.
  const truncated = positions.archiveRows >= TRACKED_LIMIT;
  const noneLabel = truncated
    ? t("Bilinmiyor (arşiv kesildi)")
    : t("Verisi yok");
  const noneHint = truncated
    ? t(
        "Okunan arşiv kesildiği için bu kelimelerin sırası bilinmiyor; Search Console'da sırası olabilir.",
      )
    : t("Search Console arşivinde bu kelimeyle eşleşen sorgu olmayanlar.");
  const band = (id: keyof typeof BAND_LABELS) =>
    t("Sıra {band}", { band: BAND_LABELS[id] });
  const segments = [
    { key: "top3", label: band("top3"), value: counts.top3 },
    { key: "top10", label: band("top10"), value: counts.top10 },
    { key: "top20", label: band("top20"), value: counts.top20 },
    {
      key: "beyond",
      label: band("beyond"),
      value: counts.beyond,
    },
    {
      key: "none",
      label: noneLabel,
      value: counts.none,
      hint: noneHint,
    },
  ];
  const selectedKey = filter === null || filter === "firstPage" ? null : filter;

  return (
    <div className="space-y-3">
      <p className="px-1 text-sm text-muted">
        {t(
          "{total} kelimenin {ranked} tanesi Search Console arşivinde var; sıralar son {days} günün ortalaması.",
          {
            total: formatCount(keywords.length),
            ranked: formatCount(ranked),
            days: POSITION_WINDOW_DAYS,
          },
        )}
        {positions.archiveRows >= TRACKED_LIMIT
          ? ` ${t(
              "Arşivden en çok {limit} sorgu okunuyor; bu yüzden bazı kelimelerin sırası eksik görünebilir.",
              { limit: formatCount(TRACKED_LIMIT) },
            )}`
          : null}
      </p>

      {positions.archiveRows === 0 ? (
        <div className="rounded-box border border-base-300 bg-base-200/40 px-4 py-3 text-sm text-muted">
          <p className="font-medium text-base-content">
            {t("Kelimelerinizin sırası henüz yok")}
          </p>
          <p className="mt-1">
            {fillParts(
              t(
                "Sıralar, Search Console'un hangi kelimeyle arandığınızı paylaşmasına bağlı. Az ziyaretçisi olan sitelerde bu normaldir; veri gelince sıralar kendiliğinden dolar. Toplam rakamlara {searchPerformance}'ndan, bağlantı durumuna {integrations} bakabilirsiniz.",
              ),
              {
                searchPerformance: (
                  <Link
                    to="/p/$projectId/search-performance"
                    params={{ projectId }}
                    className="link link-primary"
                  >
                    {t("Arama performansı")}
                  </Link>
                ),
                integrations: (
                  <Link
                    to="/p/$projectId/settings/integrations"
                    params={{ projectId }}
                    className="link link-primary"
                  >
                    {t("Bağlantılar sekmesinden")}
                  </Link>
                ),
              },
            )}
          </p>
        </div>
      ) : null}

      <FilterChips<PositionFilter>
        label={t("Sıraya göre hızlı filtreler")}
        active={filter ?? undefined}
        onChange={(next) => onFilter(next ?? null)}
        chips={[
          {
            id: "firstPage",
            label: t("İlk 10"),
            icon: Trophy,
            count: counts.firstPage,
            hint: t(
              "Ortalama sırası 10 veya daha iyi olan kelimeler; yani Google'ın ilk sayfası.",
            ),
          },
          {
            id: "top20",
            label: band("top20"),
            icon: Target,
            count: counts.top20,
            hint: t(
              "Ortalama sırası 11 ile 20 arasında olanlar, yani ikinci sayfadakiler. Küçük bir iyileştirme ilk sayfaya taşıyabilir.",
            ),
          },
          {
            id: "none",
            label: noneLabel,
            icon: CircleHelp,
            count: counts.none,
            hint: noneHint,
          },
        ]}
      />

      <DonutCard
        title={t("Sıra dağılımı")}
        description={t(
          "Bir gruba tıklayınca tablo yalnızca o gruptaki kelimeleri gösterir.",
        )}
        segments={segments}
        totalLabel={t("kelime")}
        summary={donutSummary(segments, t("kelime"))}
        selectedKey={selectedKey}
        onSelect={(key) =>
          onFilter(key === null ? null : toPositionFilter(key))
        }
      />
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div className="space-y-3" aria-busy>
      <div className="skeleton h-4 w-2/3" />
      <div className="flex gap-2">
        <div className="skeleton h-7 w-24 rounded-full" />
        <div className="skeleton h-7 w-36 rounded-full" />
        <div className="skeleton h-7 w-28 rounded-full" />
      </div>
      <div className="skeleton h-48 rounded-box" />
    </div>
  );
}
