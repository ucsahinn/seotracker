import { Monitor, Moon, Sun } from "lucide-react";
import * as React from "react";
import { SettingsHeading } from "@/client/components/HelpTip";
import { type ThemePreference, useThemePreference } from "@/client/lib/theme";

const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}[] = [
  { value: "system", label: "Sistem", icon: Monitor },
  { value: "light", label: "Açık", icon: Sun },
  { value: "dark", label: "Koyu", icon: Moon },
];

/**
 * Light, dark or follow the system.
 *
 * A radio group has one tab stop and moves with the arrow keys; this used to
 * be three separate tab stops with no arrow handling, which is a row of
 * buttons wearing a radio group's roles.
 */
export function ThemeSection() {
  const { themePreference, setThemePreference } = useThemePreference();
  const buttons = React.useRef<(HTMLButtonElement | null)[]>([]);

  const move = (from: number, step: number) => {
    const next = (from + step + THEME_OPTIONS.length) % THEME_OPTIONS.length;
    const option = THEME_OPTIONS[next];
    if (!option) return;
    setThemePreference(option.value);
    buttons.current[next]?.focus();
  };

  return (
    <section id="gorunum" className="scroll-mt-16 space-y-3">
      <SettingsHeading
        title="Görünüm"
        help="Sistem, işletim sisteminizin açık/koyu tercihini izler. Seçim bu tarayıcıda saklanır; başka bir cihazda ayrı seçilir."
      />
      <div className="flex items-center justify-between gap-6">
        <span className="text-sm">Tema</span>
        <div
          role="radiogroup"
          aria-label="Tema tercihi"
          className="flex gap-0.5 rounded-field bg-base-200 p-0.5"
        >
          {THEME_OPTIONS.map((option, index) => {
            const isActive = option.value === themePreference;
            const Icon = option.icon;

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
                onClick={() => setThemePreference(option.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    event.preventDefault();
                    move(index, 1);
                  } else if (
                    event.key === "ArrowLeft" ||
                    event.key === "ArrowUp"
                  ) {
                    event.preventDefault();
                    move(index, -1);
                  }
                }}
              >
                <Icon className="size-4" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
