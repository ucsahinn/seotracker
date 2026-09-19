import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";
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
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

function PersonalSettings() {
  const { themePreference, setThemePreference } = useThemePreference();

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-base-content/50">Appearance</h2>
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm">Theme</span>
          <div
            role="radiogroup"
            aria-label="Theme preference"
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
                      ? "bg-base-100 text-base-content shadow-sm"
                      : "text-base-content/50 hover:text-base-content/80"
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

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-base-content/50">About</h2>
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm">Version</span>
          <span className="font-mono text-sm text-base-content/60">
            v{version}
          </span>
        </div>
      </section>
    </div>
  );
}
