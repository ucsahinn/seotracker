import { useId } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { t } from "@/shared/i18n";
import {
  getWindowsSettings,
  setWindowsSetting,
} from "@/serverFunctions/windowsSettings";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import type { WindowsSetting } from "@/shared/windows-settings";

const KEY = ["windowsSettings"] as const;

/** Preferences come from the tray process and are confirmed before rendering. */
export function WindowsSection() {
  const queryClient = useQueryClient();
  const status = useQuery({
    queryKey: KEY,
    queryFn: () => getWindowsSettings(),
    retry: false,
  });
  const save = useMutation({
    mutationFn: (data: { setting: WindowsSetting; enabled: boolean }) =>
      setWindowsSetting({ data }),
    onSuccess: (result) => {
      queryClient.setQueryData(KEY, result);
      toast.success(t("Windows ayarı kaydedildi"));
    },
  });
  const state = status.data?.status === "ready" ? status.data.settings : null;
  const disabled =
    !state ||
    status.isFetching ||
    save.isPending ||
    status.isError ||
    save.isError;
  return (
    <section
      id="windows"
      className="scroll-mt-16 space-y-3"
      aria-busy={status.isFetching || save.isPending}
    >
      <h2 className="text-base font-semibold">Windows</h2>
      <p className="max-w-prose text-sm text-muted">
        {t(
          "Bu tercihler Windows uygulamasına kaydedilir ve tepsi menüsüyle aynı ayarları kullanır.",
        )}
      </p>
      {status.isPending ? (
        <div
          role="status"
          aria-label={t("Windows ayarları okunuyor…")}
          className="space-y-3"
        >
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
      ) : null}
      {status.data?.status === "unsupported" ? (
        <p className="text-sm text-muted">
          {t(
            "Bu seçenekler Windows paketinde kullanılabilir. Docker veya geliştirici kurulumunda başlangıç davranışını işletim sisteminizden yönetin.",
          )}
        </p>
      ) : null}
      {status.data?.status === "unavailable" ? (
        <p role="status" className="text-sm text-[var(--ink-warning)]">
          {t(
            "Bu Windows başlatıcısı uygulama içinden ayar değiştirmeyi desteklemiyor. Windows paketini güncelleyin; bu sırada tepsi menüsündeki seçenekleri kullanabilirsiniz.",
          )}
        </p>
      ) : null}
      {status.isError || save.isError ? (
        <p role="alert" className="text-sm text-[var(--ink-error)]">
          {getStandardErrorMessage(
            save.error ?? status.error,
            t(
              "Windows ayarlarına ulaşılamadı. Tepsi uygulamasının açık olduğunu kontrol edip yeniden deneyin.",
            ),
          )}
        </p>
      ) : null}
      {state ? (
        <div className="divide-y divide-[var(--hairline)]">
          <WindowsToggle
            label={t("Windows açılınca başlat")}
            description={t(
              "Windows oturumu açıldığında arka planda başlar. Kapalıyken uygulamayı kendiniz açarsınız.",
            )}
            checked={state?.autostart ?? false}
            disabled={disabled || Boolean(state?.autostartManaged)}
            note={
              state?.autostartManaged
                ? t(
                    "Bu ayar yönetici tarafından tüm kullanıcılar için açılmış. Yalnızca yönetici kapatabilir.",
                  )
                : undefined
            }
            onChange={(enabled) =>
              save.mutate({ setting: "autostart", enabled })
            }
          />
          <WindowsToggle
            label={t("Otomatik güncelleme kurulumu")}
            description={t(
              "Yeni sürümü indirir, doğrular ve kurar. Kapalıyken tepsi menüsünden Güncelle seçeneğiyle kurabilirsiniz.",
            )}
            checked={state?.autoUpdate ?? false}
            disabled={disabled || Boolean(state?.autoUpdateManaged)}
            note={
              state?.autoUpdateManaged
                ? t(
                    "Tüm kullanıcılar için kurulumda güncellemeyi yönetici kurar. Uygulama yeni sürümü haber verir.",
                  )
                : undefined
            }
            onChange={(enabled) =>
              save.mutate({ setting: "auto-update", enabled })
            }
          />
        </div>
      ) : null}
      {state && (status.isError || status.isFetching) ? (
        <p className="text-sm text-muted">
          {t(
            "Son doğrulanan Windows ayarları gösteriliyor; yeniden okunana kadar değiştirilemez.",
          )}
        </p>
      ) : null}
      {save.isPending ? (
        <p role="status" className="text-sm text-muted">
          {t("Kaydediliyor…")}
        </p>
      ) : null}
      {status.isError ||
      save.isError ||
      status.data?.status === "unavailable" ? (
        <button
          type="button"
          className="btn btn-sm"
          disabled={status.isFetching || save.isPending}
          onClick={() => {
            save.reset();
            void status.refetch();
          }}
        >
          {t("Tekrar dene")}
        </button>
      ) : null}
      <p className="max-w-prose text-sm text-subtle">
        {t(
          "Tarayıcı sekmesini kapatmak uygulamayı durdurmaz. Tamamen kapatmak için tepsi menüsünden Çıkış deyin. Bilgisayar uyurken denetimler çalışmaz.",
        )}
      </p>
    </section>
  );
}

function WindowsToggle({
  label,
  description,
  checked,
  disabled,
  note,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  note?: string;
  onChange: (enabled: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0 space-y-1">
        <label htmlFor={id} className="cursor-pointer text-sm font-medium">
          {label}
        </label>
        <p id={`${id}-help`} className="max-w-prose text-sm text-muted">
          {description}
        </p>
        {note ? (
          <p id={`${id}-note`} className="text-sm text-[var(--ink-warning)]">
            {note}
          </p>
        ) : null}
      </div>
      <label
        htmlFor={id}
        className="flex size-11 shrink-0 cursor-pointer items-start justify-end pt-0.5"
      >
        <input
          id={id}
          aria-describedby={`${id}-help${note ? ` ${id}-note` : ""}`}
          type="checkbox"
          className="toggle toggle-sm"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
        />
      </label>
    </div>
  );
}
