import { AppError } from "@/server/lib/errors";
import { getInstallKind } from "@/server/lib/install-kind";
import {
  WindowsSettingsBridgeError,
  WindowsSettingsRepository,
} from "./WindowsSettingsRepository";
import { t } from "@/shared/i18n";
import type {
  WindowsSetting,
  WindowsSettingsStatus,
} from "@/shared/windows-settings";

/** What happened, why, and what to do -- one sentence per bridge failure. */
function bridgeFailureCopy(error: WindowsSettingsBridgeError): string {
  switch (error.failure) {
    case "timeout":
      return t(
        "Tepsi uygulaması 4 saniye içinde yanıt vermedi (zaman aşımı). Bilgisayar uykudan yeni uyandıysa birkaç saniye sonra Tekrar dene'ye basın; sürerse tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.",
      );
    case "connect":
      return t(
        "Tepsi uygulamasının ayar servisine bağlanılamadı. Tepsi uygulaması kapanmış olabilir; seowatcher'ı Başlat menüsünden yeniden açın.",
      );
    case "status":
      // WindowsSettingsBridge.cs: 409 = managed by an administrator,
      // 403 = the capability token does not match this launcher.
      if (error.httpStatus === 409) {
        return t(
          "Bu ayar yönetici tarafından kilitlenmiş (HTTP 409). Yalnızca bilgisayarın yöneticisi değiştirebilir.",
        );
      }
      if (error.httpStatus === 403) {
        return t(
          "Tepsi uygulaması bu isteği tanımadı (HTTP 403); sunucu ile tepsi uygulaması farklı oturumlardan kalmış olabilir. Tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.",
        );
      }
      return t(
        "Tepsi uygulaması ayar isteğini reddetti (HTTP {status}). Uygulamayı tepsi menüsünden yeniden başlatın; sürerse Windows paketini güncelleyin.",
        { status: String(error.httpStatus ?? "?") },
      );
    case "parse":
      return t(
        "Tepsi uygulaması tanınmayan bir yanıt döndürdü; uygulama ile tepsi sürümü uyuşmuyor olabilir. Windows paketini güncelleyin.",
      );
  }
}

export const WindowsSettingsService = {
  async getStatus(): Promise<WindowsSettingsStatus> {
    if ((await getInstallKind()) !== "windows")
      return { status: "unsupported" };
    try {
      const settings = await WindowsSettingsRepository.read();
      return settings
        ? { status: "ready", settings }
        : { status: "unavailable" };
    } catch (error) {
      if (error instanceof WindowsSettingsBridgeError) {
        throw new AppError("CONFLICT", bridgeFailureCopy(error));
      }
      throw error;
    }
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
    let settings;
    try {
      settings = await WindowsSettingsRepository.set(setting, enabled);
    } catch (error) {
      if (error instanceof WindowsSettingsBridgeError) {
        throw new AppError("CONFLICT", bridgeFailureCopy(error));
      }
      throw error;
    }
    if (!settings) {
      throw new AppError(
        "CONFLICT",
        t(
          "Windows ayarı kaydedilemedi. Tepsi uygulamasının açık olduğunu ve ayarın yönetici tarafından kilitlenmediğini kontrol edip tekrar deneyin.",
        ),
      );
    }
    return { status: "ready", settings };
  },
};
