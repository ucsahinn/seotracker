import {
  Activity,
  BarChart3,
  Search,
  ShoppingCart,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import type { Ga4ReportKindName } from "@/shared/ga4-reports";

type Copy = {
  icon: LucideIcon;
  title: string;
  /** Why this report can be empty, when the property itself is the cause. */
  because: string;
  help: { label: string; url: string };
};

const COPY: Partial<Record<Ga4ReportKindName, Copy>> = {
  key_events: {
    icon: Target,
    title: "Bu dönemde anahtar olay kaydı yok",
    because:
      "Mülkte hiçbir olay anahtar olay olarak işaretlenmemiş olabilir ya da işaretlenen olaylar bu aralıkta hiç gerçekleşmemiş olabilir.",
    help: {
      label: "Anahtar olay nasıl tanımlanır",
      url: "https://support.google.com/analytics/answer/9267568",
    },
  },
  ecommerce_performance: {
    icon: ShoppingCart,
    title: "Bu dönemde ürün verisi yok",
    because:
      "Mülk e-ticaret olayı (ürün görüntüleme, sepete ekleme, satın alma) göndermiyor olabilir. Mağazası olmayan bir site için bu beklenen bir durumdur.",
    help: {
      label: "GA4 e-ticaret ölçümü",
      url: "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce",
    },
  },
  site_search: {
    icon: Search,
    title: "Bu dönemde site içi arama kaydı yok",
    because:
      "Sitede arama kutusu yoksa ya da site içi arama ölçümü kapalıysa bu rapor boş kalır. Açık olsa bile aranan terimler henüz yoksa da boş görünür.",
    help: {
      label: "Gelişmiş ölçüm ve site içi arama",
      url: "https://support.google.com/analytics/answer/9216061",
    },
  },
};

/** Reports whose query ignores the organic-only switch. */
const IGNORES_CHANNEL = new Set<Ga4ReportKindName>(["site_search"]);

/**
 * An empty report, said in the report's own terms.
 *
 * "No rows" means different things per tab, and some of the causes are one
 * click away (the organic-only switch is on) while others live in the GA4
 * property (no key events, no shop, site search off). Name the likely ones and
 * put the matching action next to them; the setup tab reads the property and
 * can tell which it is.
 */
export function ReportEmptyState({
  kind,
  organicOnly,
  emptyReason,
  onShowAllTraffic,
  onOpenHealth,
}: {
  kind: Ga4ReportKindName;
  organicOnly: boolean;
  emptyReason: string | null;
  onShowAllTraffic: () => void;
  onOpenHealth?: () => void;
}) {
  const copy = COPY[kind];
  const narrowedByChannel = organicOnly && !IGNORES_CHANNEL.has(kind);

  if (!copy) {
    return (
      <EmptyState
        icon={BarChart3}
        title="Bu dönemde veri yok"
        description={
          emptyReason
            ? `Google bir satır döndürmedi (${emptyReason}).`
            : "Google bu aralık için satır döndürmedi. Mülk yeni bağlandıysa veriler birkaç gün sonra görünür."
        }
      />
    );
  }

  return (
    <EmptyState
      icon={copy.icon}
      title={copy.title}
      description={
        <>
          {narrowedByChannel
            ? "Şu an yalnızca Google organik aramadan gelen ziyaretler sayılıyor; tüm trafiğe bakmak sonucu değiştirebilir. "
            : null}
          {copy.because}
          {emptyReason ? ` Google'ın verdiği not: ${emptyReason}.` : ""}
        </>
      }
      action={
        <div className="flex flex-wrap items-center justify-center gap-2">
          {narrowedByChannel ? (
            <button
              type="button"
              className="btn btn-sm"
              onClick={onShowAllTraffic}
            >
              Tüm trafiğe bak
            </button>
          ) : null}
          {onOpenHealth ? (
            <button
              type="button"
              className="btn btn-sm btn-ghost gap-1"
              onClick={onOpenHealth}
            >
              <Activity aria-hidden className="size-3.5" />
              Ölçüm durumunu kontrol et
            </button>
          ) : null}
          <SafeExternalLink
            url={copy.help.url}
            label={copy.help.label}
            className="link inline-flex items-center gap-1 text-sm"
          />
        </div>
      }
    />
  );
}
