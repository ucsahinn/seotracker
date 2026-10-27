import { sixteenMonthFloor } from "@/server/features/gsc/searchAnalytics";
import { gscToday } from "@/shared/dataFreshness";
import { formatDate } from "@/shared/format";
import { t } from "@/shared/i18n";

/** An archive can outlive Google's retention; refuse parity before navigation. */
export function searchScopeUnavailableReason(
  startDate: string,
  now?: Date,
): string | undefined {
  const floor = sixteenMonthFloor(new Date(`${gscToday(now)}T12:00:00Z`));
  return startDate < floor
    ? t(
        "Search Console yalnızca {start} ve sonrasını okuyabilir. Bu arşiv dönemi bütünüyle açılamaz.",
        { start: formatDate(floor) },
      )
    : undefined;
}
