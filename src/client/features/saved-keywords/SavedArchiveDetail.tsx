import { IntentBadge } from "./components";
import type { KeywordIntent } from "@/types/keywords";
import { formatSavedKeywordDate } from "./savedKeywordsUtils";
import { SavedDailyHistory } from "./SavedDailyHistory";
import { Modal } from "@/client/components/Modal";
import { Link } from "@tanstack/react-router";
import type { SavedWatchlist } from "@/server/features/keywords/services/SavedWatchlistService";
import { formatDate, formatDecimal, formatCount } from "@/shared/format";
import { placesDelta } from "@/shared/delta";
import { t } from "@/shared/i18n";
import { FactStrip } from "@/client/components/FactStrip";
export function SavedArchiveDetail({
  row,
  data,
  projectId,
  onClose,
}: {
  row: SavedWatchlist["rows"][number];
  data: SavedWatchlist;
  projectId: string;
  onClose: () => void;
}) {
  const change = placesDelta(row.position, row.previousPosition);
  return (
    <Modal
      maxWidth="max-w-xl"
      labelledBy="saved-archive-title"
      onClose={onClose}
    >
      <div className="space-y-4">
        <h2
          id="saved-archive-title"
          className="break-words text-lg font-semibold"
        >
          {t("Arşiv ayrıntısı")}: {row.keyword}
        </h2>
        <FactStrip
          label={t("Arşiv ayrıntısı")}
          facts={[
            {
              label: t("Kaynak"),
              value: "Google Web",
              hint: (
                <>
                  {data.siteUrl ?? t("Bilinmiyor")}
                  <br />
                  {data.timeZone}
                </>
              ),
            },
            {
              label: t("Ortalama sıra"),
              value:
                row.position === null
                  ? t("Sıra bilinmiyor")
                  : formatDecimal(row.position),
            },
            {
              label: t("Önceki ortalama sıra"),
              value:
                row.previousPosition === null
                  ? t("Karşılaştırma yok")
                  : formatDecimal(row.previousPosition),
            },
            {
              label: t("Gözlenen gün"),
              value: `${row.positionStatus === "unavailable" ? t("Bilinmiyor") : formatCount(row.observation?.observedDays ?? 0)} / ${formatCount(data.requestedDays)}`,
            },
            {
              label: t("Gösterimler"),
              value:
                row.impressions === null ? "—" : formatCount(row.impressions),
            },
            {
              label: t("Dönem"),
              value: `${formatDate(data.range.startDate)} – ${formatDate(data.range.endDate)}`,
            },
            {
              label: t("Karşılaştırma"),
              value: `${formatDate(data.previousRange.startDate)} – ${formatDate(data.previousRange.endDate)}`,
            },
            ...(row.observation
              ? [
                  {
                    label: t("İlk/son kayıtlı gün"),
                    value: `${formatDate(row.observation.firstDate)} – ${formatDate(row.observation.lastDate)}`,
                  },
                ]
              : []),
          ]}
        />
        <p
          className={
            change && !change.neutral
              ? change.improved
                ? "text-[var(--ink-success)]"
                : "text-[var(--ink-error)]"
              : "text-muted"
          }
        >
          {change
            ? (!change.neutral ? (change.improved ? "↑ " : "↓ ") : "") +
              change.text
            : t("Karşılaştırma yok")}
        </p>
        <details className="max-w-prose space-y-1.5 text-sm text-muted">
          <summary className="min-h-11 cursor-pointer">
            {t("Veri kapsamı ve hesaplama")}
          </summary>
          {row.positionStatus !== "observed" ? (
            <p className="text-xs text-muted">
              {row.positionStatus === "unavailable"
                ? t(
                    "Sıra arşivi okunamadı. Liste kayıtlı; sıra bilgisi için yeniden deneyin.",
                  )
                : row.positionStatus === "unknownDueToCoverage"
                  ? t("Eksik arşiv nedeniyle gözlem yokluğu doğrulanamaz")
                  : t("Okunan arşivde eşleşen gözlem yok")}
            </p>
          ) : null}
          <div className="space-y-1.5 text-sm">
            <p className="font-medium">
              {t("Eşleşen ham sorgular; gösterimle ağırlıklandırılır")}
            </p>
            <ul className="list-inside list-disc break-words">
              {row.observation?.variants.map((query) => (
                <li key={query}>{query}</li>
              ))}
            </ul>
            <p className="mt-2 text-muted">
              {t("Önceki dönemin ham sorguları")}:{" "}
              {row.previousObservation?.variants.join(" · ") ?? t("Gözlem yok")}
            </p>
          </div>
          <p className="text-xs text-muted">
            {t(
              "Konum ve dil kayıt bilgisi olarak korunur. Arşiv tüm ülkeleri ve cihazları kapsar. Türkçe büyük/küçük harf ve birden fazla boşluk eşleştirilir; ham sorgular gösterimle ağırlıklandırılır. Google bazı nadir sorguları döndürmeyebilir.",
            )}
          </p>
          <dl className="space-y-1.5 text-sm text-muted">
            <dt>{t("Kayıtlı pazar (arşiv filtresi değil)")}</dt>
            <dd>
              {formatCount(row.locationCode)} · {row.languageCode}
            </dd>
            <dt>{t("Eklenme")}</dt>
            <dd>{formatSavedKeywordDate(row.createdAt)}</dd>
            <dt>{t("Amaç")}</dt>
            <dd>
              {row.intent ? (
                <IntentBadge intent={legacyIntent(row.intent)} />
              ) : null}
              {row.intent
                ? t("Eski kayıt bilgisi: {intent}; tarih: {date}", {
                    intent: row.intent,
                    date: row.fetchedAt
                      ? formatDate(row.fetchedAt)
                      : t("Bilinmiyor"),
                  })
                : t("Arama amacı ölçülmedi")}
            </dd>
          </dl>
        </details>
        <SavedDailyHistory data={data} savedId={row.id} projectId={projectId} />
        <details className="max-w-prose text-sm text-muted">
          <summary className="min-h-11 cursor-pointer">
            {t("Arama performansı")}
          </summary>
          <p>
            {t(
              "Canlı arama son 28 günü ve metni içeren sorguları açar; bu arşiv ortalamasıyla aynı dönem veya tam eşleşme değildir.",
            )}
          </p>
        </details>
        <Link
          className="btn btn-outline min-h-11 h-auto max-w-full rounded-full whitespace-normal"
          to="/p/$projectId/search-performance"
          params={{ projectId }}
          search={{ tab: "queries", q: row.keyword }}
        >
          <span title={t("Arama performansında ara (canlı dönem)")}>
            {t("Arama performansını aç")}
          </span>
        </Link>
        <button className="btn btn-ghost min-h-11" onClick={onClose}>
          {t("Kapat")}
        </button>
      </div>
    </Modal>
  );
}

function legacyIntent(value: string): KeywordIntent {
  switch (value) {
    case "informational":
    case "commercial":
    case "transactional":
    case "navigational":
      return value;
    default:
      return "unknown";
  }
}
