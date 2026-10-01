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
        title="Henüz hangi kelimeyle arandığınız bilinmiyor"
        description="Bu ekran, sitenizin hangi aramalarda kaçıncı sırada çıktığını izler. Search Console kelime düzeyinde veri paylaşınca burada kendiliğinden birikir; az ziyaretçisi olan sitelerde bu birkaç hafta sürebilir. Bu sırada toplam tıklama ve gösterim rakamlarına Arama performansı'ndan bakabilirsiniz."
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
