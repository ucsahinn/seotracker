import { t } from "@/shared/i18n";

export type CheckStatus = "ok" | "warn" | "error";

type DescribedCheck = {
  status: CheckStatus;
  /** Plain words in the interface language. Null when there is nothing worth saying. */
  text: string | null;
  /** True when `text` is the server's own English sentence, shown as-is. */
  foreign: boolean;
};

function spoken(text: string, status: CheckStatus): DescribedCheck {
  return { status, text, foreign: false };
}

/**
 * The server's check sentences are English because they double as the Docker
 * boot log; this screen speaks the interface language. Mapped here by check
 * and outcome, so the
 * operator reads what to do rather than a translated log line.
 *
 * `googleReady` is whether an OAuth client or a service account is stored, as
 * the settings screen reads it. The server names the credential in use and
 * warns when there is none; `googleReady` keeps the two screens agreeing
 * while either read is still in flight.
 */
export function describeCheck(
  key: string,
  check: { status: CheckStatus; detail?: string },
  googleReady: boolean | null,
  installKind: "windows" | "docker" = "docker",
): DescribedCheck {
  const detail = check.detail ?? "";
  const logs =
    installKind === "windows"
      ? t(
          "Görev çubuğu menüsünden Günlükleri aç deyip server.log dosyasına bakın; düzelmezse Kurulumu onar.",
        )
      : t("Ayrıntı için docker compose logs --tail 50 çıktısına bakın.");
  const say = (text: string, status: CheckStatus = check.status) =>
    spoken(text, status);

  if (key === "gsc") {
    if (/DISABLED/.test(detail)) {
      return say(
        installKind === "windows"
          ? t(
              "Search Console ve Analytics kapalı. Uygulamanın şifreleme anahtarı (veri klasöründeki instance-secret dosyası) eksik ya da bozuk. Görev çubuğu menüsünden Kurulumu onar deyin.",
            )
          : t(
              "Search Console ve Analytics kapalı. Google bağlantılarını şifreleyen gizli kurulum anahtarı (BETTER_AUTH_SECRET) eksik ya da çok kısa. Uygulama bu anahtarı kendisi üretir; elle kısa bir değer girdiyseniz silin.",
            ),
        "warn",
      );
    }
    if (/Only one of/.test(detail)) {
      return say(
        t(
          "GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET'ten yalnızca biri tanımlı. İkisi de gerekir. Ya da ikisini de boş bırakıp Google erişim anahtarını Ayarlar'dan girin.",
        ),
        "warn",
      );
    }
    if (check.status === "ok" && googleReady !== false) {
      if (googleReady === null)
        return say(
          t(
            "Google bağlantı ayarı henüz doğrulanamadı. Okuma tamamlanmazsa durumu yeniden kontrol edin.",
          ),
          "warn",
        );
      // The server names the credential in use, already in the interface
      // language. Only the env-only preflight sentences are English: one
      // means an environment client, the other could not see the database.
      if (/supplied by the environment/.test(detail)) {
        return say(t("Google erişim anahtarı ortam değişkenlerinden geliyor."));
      }
      return say(
        detail && !/^(Enter your|No Google OAuth client)/.test(detail)
          ? detail
          : t("Google erişimi hazır."),
      );
    }
    // Nothing stored. The server says so with a warning; an older server
    // answered "ok" with a request to enter a client, a green tick on a to-do.
    return say(
      t(
        "Google erişim anahtarı ya da hizmet hesabı henüz girilmedi. Girmeden Search Console ve Analytics bağlanamaz.",
      ),
      "warn",
    );
  }

  if (key === "pagespeed") {
    if (check.status === "error") {
      return say(t("PageSpeed anahtarı kontrol edilemedi. {logs}", { logs }));
    }
    if (check.status === "warn") {
      return say(
        t(
          "Anahtar yok. Hız ölçümü Google'ın anahtarsız kotasıyla çalışır ve çoğu zaman 429 ile yarım kalır. Tarama ve diğer SEO kontrolleri etkilenmez.",
        ),
      );
    }
    return say(
      /environment|PAGESPEED_API_KEY/.test(detail)
        ? t("PageSpeed anahtarı ortam değişkeninden geliyor.")
        : t("PageSpeed anahtarı Ayarlar'da kayıtlı."),
    );
  }

  if (key === "auth") {
    if (check.status === "ok") {
      // i18n-ignore: matches the server's own Turkish sentence, which it shows
      return detail.startsWith("Giriş yok")
        ? say(detail)
        : say(t("Giriş koruması ayarlı."));
    }
    if (/Reachable off localhost/.test(detail)) {
      return say(
        t(
          "Bu kurulum parolasız ama dışarıdan erişime açık görünüyor; açan herkes yönetici olur. Önüne kendi giriş korumanızı koyun ya da uygulamayı yalnızca bu bilgisayara (127.0.0.1) açık tutun.",
        ),
      );
    }
    return say(
      installKind === "windows"
        ? t(
            "Giriş ayarı eksik ya da geçersiz. Görev çubuğu menüsünden Kurulumu onar deyin; düzelmezse Sorunu bildir.",
          )
        : t(
            "Giriş ayarı eksik ya da geçersiz. AUTH_MODE, TEAM_DOMAIN ve POLICY_AUD değerlerini docs/ENVIRONMENT.md'ye göre kontrol edin.",
          ),
    );
  }

  if (key === "database") {
    return check.status === "ok"
      ? say(t("Yerel veritabanı yanıt veriyor."))
      : say(t("Veritabanı yanıt vermiyor. {logs}", { logs }));
  }

  if (key === "runtime") {
    return check.status === "ok"
      ? say(t("Çalışma ortamı hazır."))
      : say(t("Çalışma ortamında bir sorun var. {logs}", { logs }));
  }

  // A check this screen has no sentence for: the server's own words beat
  // silence, and `foreign` lets the caller mark the language.
  return {
    status: check.status,
    text: detail || null,
    foreign: detail !== "",
  };
}
