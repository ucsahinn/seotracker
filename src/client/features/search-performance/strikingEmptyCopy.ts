import { t } from "@/shared/i18n";
import { formatCount } from "@/shared/format";
type Input = {
  /** A summary filter is narrowing the rows. */
  filtered: boolean;
  /** False when Search Console returned no keyword-level rows at all. */
  hasQueryData: boolean;
  /** A country or device filter is on, so zero rows may only mean this segment. */
  segmentFiltered: boolean;
  minImpressions: number;
  brandExcluded: boolean;
};

export function strikingEmptyCopy({
  filtered,
  hasQueryData,
  segmentFiltered,
  minImpressions,
  brandExcluded,
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
      title: t("Bu kapsamda uygun sorgu bulunmadı."),
      description: [
        t(
          "Bu liste, ortalama sırası yuvarlanarak 4–20 aralığında olan ve bu dönemde en az {count} gösterim alan sorguları kapsar. Eşiğin altındaki sorgular Sorgular sekmesinde incelenebilir.",
          { count: formatCount(minImpressions) },
        ),
        brandExcluded ? t("Marka sorguları bu listeden çıkarılır.") : null,
      ]
        .filter(Boolean)
        .join(" "),
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
    title: t("Bu seçimde sorgu verisi yok"),
    description: t(
      "Google az aranan sorguları gizlilik için gizleyebilir. Sorgu listesi boşken de site toplamında gösterim olabilir. Toplamları ve Sayfalar sekmesini inceleyin.",
    ),
  };
}
