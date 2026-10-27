import { t } from "@/shared/i18n";
type Input = {
  /** A summary filter is narrowing the rows. */
  filtered: boolean;
  /** False when Search Console returned no keyword-level rows at all. */
  hasQueryData: boolean;
  /** A country or device filter is on, so zero rows may only mean this segment. */
  segmentFiltered: boolean;
};

export function strikingEmptyCopy({
  filtered,
  hasQueryData,
  segmentFiltered,
}: Input): { title: string; description: string } {
  if (filtered) {
    return {
      title: t("Bu gruba uyan sorgu yok"),
      description: t(
        "Seçimi kaldırarak sıra 4-20 arasındaki tüm sorgulara dönün.",
      ),
    };
  }
  if (hasQueryData) {
    return {
      title: t("Bu dönemde 4-20. sırada kelime yok"),
      description: t(
        "Hiçbir kelimeniz 4-20. sırada değil. Bu aralıktaki kelimeler küçük bir iyileştirmeyle üst sıralara çıkabilir; olunca burada listelenir.",
      ),
    };
  }
  if (segmentFiltered) {
    return {
      title: t("Bu seçimde sorgu verisi yok"),
      description: t(
        "Seçili ülke ya da cihaz için Search Console sorgu verisi paylaşmadı. Filtreyi kaldırarak tüm trafiğe bakın.",
      ),
    };
  }
  return {
    title: t("Kelime düzeyinde veri henüz gelmedi"),
    description: t(
      "Search Console, hangi kelimeyle arandığınızı bu dönem için henüz paylaşmadı. Az trafikli sitelerde bu normaldir. Veri gelince 4-20. sıradaki kelimeler burada listelenir.",
    ),
  };
}
