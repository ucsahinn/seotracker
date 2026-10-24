import { AppError } from "@/server/lib/errors";
import { getInstallKind } from "@/server/lib/install-kind";
import { WindowsSettingsRepository } from "./WindowsSettingsRepository";
import { t } from "@/shared/i18n";
import type {
  WindowsSetting,
  WindowsSettingsStatus,
} from "@/shared/windows-settings";

export const WindowsSettingsService = {
  async getStatus(): Promise<WindowsSettingsStatus> {
    if ((await getInstallKind()) !== "windows")
      return { status: "unsupported" };
    const settings = await WindowsSettingsRepository.read();
    return settings ? { status: "ready", settings } : { status: "unavailable" };
  },
  async set(
    setting: WindowsSetting,
    enabled: boolean,
  ): Promise<WindowsSettingsStatus> {
    if ((await getInstallKind()) !== "windows")
      throw new AppError(
        "VALIDATION_ERROR",
        t("Bu seçenek yalnızca Windows paketinde kullanılabilir."),
      );
    try {
      const settings = await WindowsSettingsRepository.set(setting, enabled);
      if (!settings) throw new Error("Bridge missing");
      return { status: "ready", settings };
    } catch {
      throw new AppError(
        "CONFLICT",
        t(
          "Windows ayarı kaydedilemedi. Tepsi uygulamasının açık olduğunu ve ayarın yönetici tarafından kilitlenmediğini kontrol edip tekrar deneyin.",
        ),
      );
    }
  },
};
