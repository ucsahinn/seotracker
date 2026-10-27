import { Loader2 } from "lucide-react";
import { t } from "@/shared/i18n";

export function SavedKeywordsStatus({
  totalCount,
  totalBase,
  isFetching,
}: {
  totalCount: number;
  totalBase: number;
  isFetching: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-1 text-xs text-muted">
      <span>
        {t("{shown} / {total} kayıtlı kelime; seçim yalnızca bu sayfada", {
          shown: totalCount,
          total: totalBase,
        })}
      </span>
      {isFetching ? <Loader2 className="size-3 animate-spin" /> : null}
    </div>
  );
}
