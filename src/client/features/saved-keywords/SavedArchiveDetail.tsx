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
      <h2
        id="saved-archive-title"
        className="break-words text-lg font-semibold"
      >
        {t("Arşiv ayrıntısı")}: {row.keyword}
      </h2>
      <p className="text-sm text-muted">
        {t("Dönem: {start} – {end}", {
          start: formatDate(data.range.startDate),
          end: formatDate(data.range.endDate),
        })}
      </p>
      <p>
        {t("Ortalama sıra")}:{" "}
        {row.position === null
          ? t("Sıra bilinmiyor")
          : formatDecimal(row.position)}
      </p>
      <p className="text-sm text-muted">
        {t("Önceki dönem: {start} – {end}", {
          start: formatDate(data.previousRange.startDate),
          end: formatDate(data.previousRange.endDate),
        })}
        <br />
        {t("Önceki ortalama sıra")}:{" "}
        {row.previousPosition === null
          ? t("Karşılaştırma yok")
          : formatDecimal(row.previousPosition)}
      </p>
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
      <p className="text-sm text-muted">
        {t("Gözlenen gün")}:{" "}
        {row.positionStatus === "unavailable"
          ? t("Bilinmiyor")
          : formatCount(row.observation?.observedDays ?? 0)}{" "}
        / {formatCount(data.requestedDays)}
        <br />
        {t("Gösterimler")}:{" "}
        {row.impressions === null ? "—" : formatCount(row.impressions)}
      </p>
      {row.observation ? (
        <p className="text-xs text-muted">
          {t("İlk/son kayıtlı gün")}: {formatDate(row.observation.firstDate)} –{" "}
          {formatDate(row.observation.lastDate)}
        </p>
      ) : null}
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
      <div className="text-sm">
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
      <dl className="text-sm text-muted">
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
      <SavedDailyHistory data={data} savedId={row.id} projectId={projectId} />
      <p className="text-xs text-muted">
        {t(
          "Canlı arama son 28 günü ve metni içeren sorguları açar; bu arşiv ortalamasıyla aynı dönem veya tam eşleşme değildir.",
        )}
      </p>
      <Link
        className="btn btn-outline min-h-11"
        to="/p/$projectId/search-performance"
        params={{ projectId }}
        search={{ tab: "queries", q: row.keyword }}
      >
        {t("Arama performansında ara (canlı dönem)")}
      </Link>
      <button className="btn btn-ghost min-h-11" onClick={onClose}>
        {t("Kapat")}
      </button>
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
