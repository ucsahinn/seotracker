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
        title="Hangi kelimelerle arandığınız henüz görünmüyor"
        description="Sitenizin hangi aramalarda kaçıncı sırada çıktığını burada izlersiniz. Search Console kelime bazında veri verdikçe birikir. Az ziyaretçisi olan sitelerde birkaç hafta sürebilir. O zamana kadar toplam tıklama ve gösterime Arama performansı'ndan bakın."
        action={
          <Link
            to="/p/$projectId/search-performance"
            params={{ projectId }}
            className="btn btn-sm btn-outline"
          >
            Arama performansını aç
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
        title="Henüz sıralama verisi yok"
        description="Search Console'u bağlayınca geçmiş günler kendiliğinden birikir."
        action={
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-sm btn-primary"
          >
            Search Console&apos;u bağla
          </Link>
        }
      />
    </section>
  );
}
