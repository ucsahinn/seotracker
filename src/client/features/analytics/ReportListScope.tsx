import { formatCount } from "@/client/lib/format";
import { t } from "@/shared/i18n";

/**
 * The evidence strip below the table already states the row count, so this line only
 * speaks when a quick filter narrows the list.
 */
export function ReportListScope({
  scope,
  shown,
  total,
}: {
  scope: string;
  shown: number;
  total: number;
}) {
  if (shown === total) return null;
  return (
    <p role="status" className="text-sm text-muted">
      {t("{shown} / {count} satır", {
        shown: formatCount(shown),
        count: formatCount(total),
      })}{" "}
      · {scope}.{" "}
      {t("Filtreleme, sıralama ve dışa aktarma bu sayfadaki satırları kapsar.")}
    </p>
  );
}
