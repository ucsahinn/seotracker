import { t } from "@/shared/i18n";
import { Link } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { EmptyState } from "@/client/components/EmptyState";

/**
 * Shown in place of the search box, the band bars and an empty table when the
 * archive holds no keyword rows at all. Every one of those controls filters
 * rows that do not exist, so on a new or low-traffic property the screen was
 * a column of inert chrome above a grey sentence.
 */
export function EmptyArchivePanel({ projectId }: { projectId: string }) {
  return (
    <section className="rounded-box border border-base-300 bg-base-100">
      <EmptyState
        icon={TrendingUp}
        title={t("Hangi kelimelerle arandığınız henüz görünmüyor")}
        description={t(
          "Google taranan tarihler için sorgu satırı döndürmedi. Bu, arama yapılmadığını kanıtlamaz. Kalan tarihler varsa arşivi doldurmaya devam edin; toplam trafik için Arama performansını açın.",
        )}
        action={
          <Link
            to="/p/$projectId/search-performance"
            params={{ projectId }}
            className="btn btn-sm btn-outline"
          >
            {t("Arama performansını aç")}
          </Link>
        }
      />
    </section>
  );
}

/**
 * Search Console is not connected, so "pick a wider range" would be wrong
 * advice. One sentence and the one action that fills the screen.
 */
export function NotConnectedPanel({ projectId }: { projectId: string }) {
  return (
    <section className="rounded-box border border-base-300 bg-base-100">
      <EmptyState
        icon={TrendingUp}
        title={t("Henüz sıralama verisi yok")}
        description={t(
          "Search Console'u bağlayınca geçmiş günler kendiliğinden birikir.",
        )}
        action={
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-sm btn-primary"
          >
            {t("Search Console'u bağla")}
          </Link>
        }
      />
    </section>
  );
}
