import { t } from "@/shared/i18n";
import { formatCount } from "@/client/lib/format";
const LIMITS = [25, 50, 100] as const;

// Labels stay Turkish here and go through t() where they render.
const WINDOWS = [
  { days: 7, label: "Son 7 gün" },
  { days: 28, label: "Son 28 gün" },
  { days: 90, label: "Son 90 gün" },
] as const;

type WindowDays = (typeof WINDOWS)[number]["days"];

export function WindowPicker({
  windowDays,
  onChange,
}: {
  windowDays: WindowDays;
  onChange: (days: WindowDays) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <label htmlFor="opportunity-window">{t("Dönem")}</label>
      <select
        id="opportunity-window"
        className="select select-bordered select-sm w-32"
        value={windowDays}
        onChange={(event) => {
          const next = WINDOWS.find(
            (option) => String(option.days) === event.target.value,
          );
          if (next) onChange(next.days);
        }}
      >
        {WINDOWS.map((option) => (
          <option key={option.days} value={option.days}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </div>
  );
}

export function LimitPicker({
  limit,
  onChange,
}: {
  limit: (typeof LIMITS)[number];
  onChange: (limit: (typeof LIMITS)[number]) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <label htmlFor="opportunity-limit">{t("Satır sayısı")}</label>
      <select
        id="opportunity-limit"
        className="select select-bordered select-sm w-24"
        value={limit}
        onChange={(event) => {
          const next = LIMITS.find(
            (option) => String(option) === event.target.value,
          );
          if (next) onChange(next);
        }}
      >
        {LIMITS.map((option) => (
          <option key={option} value={option}>
            {formatCount(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
