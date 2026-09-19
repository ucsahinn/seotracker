import { formatNumber } from "@/client/lib/format";
import { Loader2 } from "lucide-react";

export function SavedKeywordsStatus({
  totalCount,
  isFetching,
}: {
  totalCount: number;
  isFetching: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-1 text-xs text-muted">
      <span>{formatNumber(totalCount)} kayıtlı kelime</span>
      {isFetching ? <Loader2 className="size-3 animate-spin" /> : null}
    </div>
  );
}
