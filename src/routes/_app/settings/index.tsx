import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";
import { GoogleOAuthClientSection } from "@/client/features/settings/GoogleOAuthClientSection";
import { type ThemePreference, useThemePreference } from "@/client/lib/theme";
import { version } from "../../../../package.json";

export const Route = createFileRoute("/_app/settings/")({
  component: PersonalSettings,
});

const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}[] = [
  { value: "system", label: "Sistem", icon: Monitor },
  { value: "light", label: "Açık", icon: Sun },
  { value: "dark", label: "Koyu", icon: Moon },
];

function PersonalSettings() {
  const { themePreference, setThemePreference } = useThemePreference();

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted">Görünüm</h2>
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm">Tema</span>
          <div
            role="radiogroup"
            aria-label="Tema tercihi"
            className="flex gap-0.5 rounded-lg bg-base-200 p-0.5"
          >
            {THEME_OPTIONS.map((option) => {
              const isActive = option.value === themePreference;
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  aria-label={option.label}
                  className={`flex cursor-pointer items-center justify-center rounded-md px-3 py-1.5 transition-colors ${
                    isActive
                      ? "bg-base-100 text-base-content shadow-[var(--shadow-raise)] ring-1 ring-[var(--control-border)]"
                      : "text-muted hover:text-base-content/80"
                  }`}
                  onClick={() => setThemePreference(option.value)}
                >
                  <Icon className="size-4" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <GoogleOAuthClientSection />

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted">Hakkında</h2>
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm">Sürüm</span>
          <span className="font-mono text-sm text-muted">v{version}</span>
        </div>
      </section>
    </div>
  );
}
