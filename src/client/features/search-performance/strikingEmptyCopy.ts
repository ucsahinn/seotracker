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
      title: "Bu gruba uyan sorgu yok",
      description: "Seçimi kaldırarak tüm eşiğe yakın sorgulara dönün.",
    };
  }
  if (hasQueryData) {
    return {
      title: "Bu dönemde 5-20. sırada kelime yok",
      description:
        "Hiçbir kelimeniz 5-20. sırada değil. Bu aralıktaki kelimeler küçük bir iyileştirmeyle üst sıralara çıkabilir; olunca burada listelenir.",
    };
  }
  if (segmentFiltered) {
    return {
      title: "Bu seçimde sorgu verisi yok",
      description:
        "Seçili ülke ya da cihaz için Search Console sorgu verisi paylaşmadı. Filtreyi kaldırarak tüm trafiğe bakın.",
    };
  }
  return {
    title: "Kelime düzeyinde veri henüz gelmedi",
    description:
      "Search Console, hangi kelimeyle arandığınızı bu dönem için henüz paylaşmadı. Az trafikli sitelerde bu normaldir. Veri gelince 5-20. sıradaki kelimeler burada listelenir.",
  };
}
