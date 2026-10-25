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

  return (
    <section id="gorunum" className="scroll-mt-16 space-y-3">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">{t("Görünüm")}</h2>
        <p className="text-sm text-muted">
          {t(
            "Varsayılan koyu tema seowatcher.io ile aynı görünür. Sistem, işletim sisteminizin tercihini izler. Seçim bu tarayıcıda saklanır.",
          )}
        </p>
      </div>
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
      <div className="flex items-center justify-between gap-6">
        <span className="text-sm">{t("Dil")}</span>
        <SegmentedRadio
          label={t("Dil tercihi")}
          value={locale}
          onChange={(next) => {
            if (next !== locale) switchLocale(next);
          }}
          options={LANGUAGE_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
            content: <span className="text-sm">{option.label}</span>,
          }))}
        />
      </div>
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
            className={`flex cursor-pointer items-center justify-center rounded-field px-3 py-1.5 transition-colors ${
              isActive
                ? "bg-base-100 text-base-content shadow-[var(--shadow-raise)] ring-1 ring-[var(--control-border)]"
                : "text-muted hover:text-base-content"
            }`}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
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
