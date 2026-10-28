import { t } from "@/shared/i18n";
import { formatCount } from "@/client/lib/format";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  CircleSlash,
  LogOut,
  Trophy,
} from "lucide-react";
import { FilterChips } from "@/client/features/search-performance/FilterChips";
import { RankingMovementChips } from "./RankingMovementChips";
import type { BandId } from "@/shared/positionBands";
import type { ChipId } from "./positionBands";
import type { MoveId } from "./rankingMoves";
import type { RankingArchiveData } from "./RankingSourceEvidence";

export function RankingsFilters({
  data,
  search,
  band,
  chip,
  move,
  setSearch,
  setChip,
  setMove,
  setPage,
  reset,
}: {
  data:
    | Pick<
        RankingArchiveData,
        | "comparableCount"
        | "moveCounts"
        | "chipCounts"
        | "highImpressions"
        | "totalMatching"
        | "totalObserved"
      >
    | undefined;
  search: string;
  band?: BandId;
  chip?: ChipId;
  move?: MoveId;
  setSearch: (value: string) => void;
  setChip: (value: ChipId | undefined) => void;
  setMove: (value: MoveId | undefined) => void;
  setPage: (page: number) => void;
  reset: () => void;
}) {
  return (
    <div className="space-y-3 border-b border-base-300 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          id="rankings-query-search"
          type="search"
          maxLength={500}
          className="input input-bordered w-full sm:max-w-xs"
          placeholder={t("Arşivde sorgu ara")}
          aria-label={t("Arşivde sorgu ara")}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
        />
        {search || band || chip || move ? (
          <button className="btn btn-ghost min-h-11" onClick={reset}>
            {t("Tüm filtreleri kaldır")}
          </button>
        ) : null}
      </div>
      {data ? (
        <>
          <RankingMovementChips
            comparable={data.comparableCount > 0}
            label={t("Değişim filtreleri")}
            active={move}
            onChange={(next) => {
              setMove(next);
              setPage(1);
            }}
            chips={[
              {
                id: "risers",
                label: t("Yükselenler"),
                icon: ArrowUp,
                count: data.moveCounts.risers,
                hint: t(
                  "Önceki döneme göre en az yarım sıra yükselen sorgular.",
                ),
              },
              {
                id: "fallers",
                label: t("Düşenler"),
                icon: ArrowDown,
                count: data.moveCounts.fallers,
                hint: t("Önceki döneme göre en az yarım sıra düşen sorgular."),
              },
              {
                id: "top10",
                label: t("Dönem ortalaması ilk 10"),
                icon: Trophy,
                count: data.moveCounts.top10,
                hint: t("Dönem ortalaması ilk 10"),
              },
              {
                id: "lost",
                label: t("İlk 10'dan çıkanlar"),
                icon: LogOut,
                count: data.moveCounts.lost,
                hint: t("Yalnızca iki dönemde de gözlenen sorgular."),
              },
            ]}
          />
          <FilterChips<ChipId>
            label={t("Hızlı filtreler")}
            active={chip}
            onChange={(next) => {
              setChip(next);
              setPage(1);
            }}
            chips={[
              {
                id: "highImpressions",
                label: t("Arşivde en çok gösterim"),
                icon: Eye,
                count: data.chipCounts.highImpressions,
                hint: t(
                  "Gösterime göre üst çeyrek eşiği; eşitlikler dahil: {count}",
                  { count: formatCount(data.highImpressions) },
                ),
              },
              {
                id: "noClicks",
                label: t("Hiç tıklanmayan"),
                icon: CircleSlash,
                count: data.chipCounts.noClicks,
                hint: t("Gösterilmiş ama hiç tıklanmamış sorgular."),
              },
            ]}
          />
          <p className="text-xs text-muted">
            {t("Filtreyle eşleşen sorgular: {matching} / {total}", {
              matching: formatCount(data.totalMatching),
              total: formatCount(data.totalObserved),
            })}
          </p>
        </>
      ) : null}
    </div>
  );
}
