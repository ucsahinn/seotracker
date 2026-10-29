import { Monitor, Moon, Sun } from "lucide-react";
import * as React from "react";
import { type ThemePreference, useThemePreference } from "@/client/lib/theme";
import { LOCALE_COOKIE, type Locale, t, useLocale } from "@/shared/i18n";

// Labels stay Turkish here and go through t() where they render.
const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}[] = [
  { value: "system", label: "Sistem", icon: Monitor },
  { value: "light", label: "Açık", icon: Sun },
  { value: "dark", label: "Koyu", icon: Moon },
];

/*
 * Each language is named in itself, so someone who cannot read the current
 * one can still find their own. Not translated for the same reason.
 */
const LANGUAGE_OPTIONS: { value: Locale; label: string }[] = [
  { value: "tr", label: "Türkçe" }, // i18n-ignore
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" }, // i18n-ignore
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" }, // i18n-ignore
];

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

/*
 * The cookie is what the server reads on every request, and a reload is the
 * whole re-render story: nothing in the tree subscribes to the locale.
 */
function switchLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax`;
  window.location.reload();
}

/**
 * Light, dark or follow the system; and the interface language.
 */
export function ThemeSection() {
  const { themePreference, setThemePreference } = useThemePreference();
  const locale = useLocale();
  const [selectedLocale, setSelectedLocale] = React.useState(locale);

  return (
    <section id="gorunum" className="scroll-mt-16 space-y-3">
      <h2 className="text-base font-semibold">{t("Görünüm")}</h2>
      <div className="flex items-center justify-between gap-6">
        <span className="text-sm">{t("Tema")}</span>
        <SegmentedRadio
          label={t("Tema tercihi")}
          value={themePreference}
          onChange={setThemePreference}
          options={THEME_OPTIONS.map((option) => {
            const Icon = option.icon;
            const label = t(option.label);
            return {
              value: option.value,
              label,
              content: <Icon className="size-4" />,
            };
          })}
        />
      </div>
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        onSubmit={(event) => {
          event.preventDefault();
          if (selectedLocale !== locale) switchLocale(selectedLocale);
        }}
      >
        <label htmlFor="settings-language" className="text-sm">
          {t("Dil")}
        </label>
        <div className="flex flex-wrap gap-2">
          <select
            id="settings-language"
            className="select min-h-11 w-full sm:w-auto"
            value={selectedLocale}
            onChange={(event) =>
              setSelectedLocale(
                LANGUAGE_OPTIONS.find(
                  (option) => option.value === event.target.value,
                )?.value ?? locale,
              )
            }
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="btn min-h-11"
            disabled={selectedLocale === locale}
          >
            {t("Dili uygula")}
          </button>
        </div>
      </form>
      <details className="text-xs text-muted">
        <summary className="cursor-pointer py-1">{t("Tema kaydı")}</summary>
        <p className="max-w-prose pb-1 text-sm">
          {t(
            "Varsayılan koyu tema seowatcher.io ile aynı görünür. Sistem, işletim sisteminizin tercihini izler. Seçim bu tarayıcıda saklanır.",
          )}
        </p>
      </details>
      <details className="text-xs text-muted">
        <summary className="cursor-pointer py-1">{t("Dil kapsamı")}</summary>
        <p className="max-w-prose pb-1 text-sm">
          {t(
            "Arayüz dili bu tarayıcıda saklanır; projenin varsayılan pazar dilini değiştirmez.",
          )}
        </p>
      </details>
    </section>
  );
}

/**
 * A radio group drawn as a segmented control.
 *
 * A radio group has one tab stop and moves with the arrow keys; the theme row
 * used to be three separate tab stops with no arrow handling, which is a row
 * of buttons wearing a radio group's roles.
 */
function SegmentedRadio<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; content: React.ReactNode }[];
}) {
  const buttons = React.useRef<(HTMLButtonElement | null)[]>([]);

  const move = (from: number, step: number) => {
    const next = (from + step + options.length) % options.length;
    const option = options[next];
    if (!option) return;
    onChange(option.value);
    buttons.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex gap-0.5 rounded-field bg-base-200 p-0.5"
    >
      {options.map((option, index) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={option.label}
            title={option.label}
            tabIndex={isActive ? 0 : -1}
            className={`flex cursor-pointer items-center justify-center min-h-11 min-w-11 rounded-field px-3 py-1.5 transition-colors ${
              isActive
                ? "bg-base-100 text-base-content shadow-[var(--shadow-raise)] ring-1 ring-[var(--control-border)]"
                : "text-muted hover:text-base-content"
            }`}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              if (event.key === "Home" || event.key === "End") {
                event.preventDefault();
                const next = event.key === "Home" ? 0 : options.length - 1;
                onChange(options[next].value);
                buttons.current[next]?.focus();
              } else if (
                event.key === "ArrowRight" ||
                event.key === "ArrowDown"
              ) {
                event.preventDefault();
                move(index, 1);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                move(index, -1);
              }
            }}
          >
            {option.content}
          </button>
        );
      })}
    </div>
  );
}
