import { LocationSelect } from "@/client/components/LocationSelect";
import {
  getLanguageCode,
  getLanguageOptions,
} from "@/shared/keyword-locations";
import type { ProjectMarket } from "@/client/features/projects/types";
import { getLocale, t } from "@/shared/i18n";

// One per UI language: the locale is set per request, not at import time.
const languageNamesByLocale = new Map<string, Intl.DisplayNames>();

/** "Turkish" in the data, "Türkçe" on a Turkish screen. */
function languageLabel(code: string, fallback: string): string {
  try {
    const locale = getLocale();
    let languageNames = languageNamesByLocale.get(locale);
    if (!languageNames) {
      languageNames = new Intl.DisplayNames([locale], { type: "language" });
      languageNamesByLocale.set(locale, languageNames);
    }
    return languageNames.of(code) ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * The project's default market: country plus the language served for it.
 * Shared by project settings and onboarding so the pair — and the rule that
 * changing the country snaps the language to that country's native one —
 * stays identical in both places.
 */
export function ProjectMarketFields({
  value,
  onChange,
  hideLanguageOnMobile = false,
}: {
  value: ProjectMarket;
  onChange: (market: ProjectMarket) => void;
  hideLanguageOnMobile?: boolean;
}) {
  const languageOptions = getLanguageOptions(value.locationCode);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">{t("Ülke")}</span>
        <LocationSelect
          value={value.locationCode}
          onChange={(locationCode) =>
            onChange({
              locationCode,
              languageCode: getLanguageCode(locationCode),
            })
          }
        />
      </label>
      <label
        className={`${hideLanguageOnMobile ? "hidden sm:flex" : "flex"} flex-col gap-1.5 text-sm`}
      >
        <span className="font-medium">{t("Dil")}</span>
        <select
          value={value.languageCode}
          onChange={(event) =>
            onChange({ ...value, languageCode: event.target.value })
          }
          // Most countries have exactly one language DataForSEO serves, so the
          // select is only a real choice where there's more than one.
          disabled={languageOptions.length <= 1}
          className="select select-bordered w-full"
        >
          {languageOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {languageLabel(option.code, option.label)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
