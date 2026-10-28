import { formatCount } from "@/client/lib/format";
import { t } from "@/shared/i18n";

export function ReportListScope({
  scope,
  shown,
  total,
}: {
  scope: string;
  shown: number;
  total: number;
}) {
  return (
    <p role="status" className="text-xs text-muted">
      {scope} ·{" "}
      {t("Filtreleme, sıralama ve dışa aktarma bu sayfadaki satırları kapsar.")}{" "}
      {t("{shown} / {count} satır", {
        shown: formatCount(shown),
        count: total,
      })}
    </p>
  );
}
