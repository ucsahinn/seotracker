export type CheckStatus = "ok" | "warn" | "error";

type DescribedCheck = {
  status: CheckStatus;
  /** Plain Turkish. Null when there is nothing worth saying. */
  text: string | null;
  /** True when `text` is the server's own English sentence, shown as-is. */
  foreign: boolean;
};

function spoken(text: string, status: CheckStatus): DescribedCheck {
  return { status, text, foreign: false };
}

/**
 * The server's check sentences are English because they double as the Docker
 * boot log; this screen is Turkish. Mapped here by check and outcome, so the
 * operator reads what to do rather than a translated log line.
 *
 * `googleReady` is what the server cannot see in its own verdict: whether an
 * OAuth client or a service account is actually stored. The server reports
 * "Search Console: ok" with the sentence "Enter your Google OAuth client in
 * Settings" when nothing is configured, a green tick on a to-do.
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
      ? "Görev çubuğu menüsünden Günlükleri aç deyip server.log dosyasına bakın; düzelmezse Kurulumu onar."
      : "Ayrıntı için docker compose logs --tail 50 çıktısına bakın.";
  const say = (text: string, status: CheckStatus = check.status) =>
    spoken(text, status);

  if (key === "gsc") {
    if (/DISABLED/.test(detail)) {
      return say(
        "Search Console ve Analytics kapalı. Google bağlantılarını şifreleyen gizli kurulum anahtarı (BETTER_AUTH_SECRET) eksik ya da çok kısa. Uygulama bu anahtarı kendisi üretir; elle kısa bir değer girdiyseniz silin.",
        "warn",
      );
    }
    if (/Only one of/.test(detail)) {
      return say(
        "GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET'ten yalnızca biri tanımlı. İkisi birden gerekir; ya da ikisini de boş bırakıp istemciyi Ayarlar'dan girin.",
        "warn",
      );
    }
    if (check.status === "ok" && googleReady === false) {
      return say(
        "Google istemcisi ya da hizmet hesabı henüz girilmedi. Girmeden Search Console ve Analytics bağlanamaz.",
        "warn",
      );
    }
    if (check.status === "ok") {
      return say(
        /ortam|environment/i.test(detail)
          ? "Google OAuth istemcisi ortam değişkenlerinden geliyor."
          : googleReady
            ? "Google erişimi tanımlı."
            : "Google istemcisi Ayarlar'da tanımlı.",
      );
    }
  }

  if (key === "pagespeed") {
    if (check.status === "warn") {
      return say(
        "Anahtar yok. Hız ölçümü Google'ın anahtarsız kotasıyla çalışır ve çoğu zaman 429 ile yarım kalır. Tarama ve diğer SEO kontrolleri etkilenmez.",
      );
    }
    return say(
      /environment|PAGESPEED_API_KEY/.test(detail)
        ? "PageSpeed anahtarı ortam değişkeninden geliyor."
        : "PageSpeed anahtarı Ayarlar'da kayıtlı.",
    );
  }

  if (key === "auth") {
    if (check.status === "ok") {
      return detail.startsWith("Parolasız")
        ? say(detail)
        : say("Kimlik doğrulama ayarlı.");
    }
    if (/Reachable off localhost/.test(detail)) {
      return say(
        "Bu kurulum parolasız ama dışarıdan erişime açık görünüyor; açan herkes yönetici olur. Önüne kendi şifreli girişinizi koyun ya da uygulamayı yalnızca bu bilgisayara (127.0.0.1) açık tutun.",
      );
    }
    return say(
      "Kimlik doğrulama ayarı eksik ya da geçersiz. AUTH_MODE, TEAM_DOMAIN ve POLICY_AUD değerlerini docs/ENVIRONMENT.md'ye göre kontrol edin.",
    );
  }

  if (key === "database") {
    return check.status === "ok"
      ? say("Yerel veritabanı yanıt veriyor.")
      : say("Veritabanı yanıt vermiyor. " + logs);
  }

  if (key === "runtime") {
    return check.status === "ok"
      ? say("Çalışma ortamı hazır.")
      : say("Çalışma ortamında bir sorun var. " + logs);
  }

  // A check this screen has no sentence for: the server's own words beat
  // silence, and `foreign` lets the caller mark the language.
  return {
    status: check.status,
    text: detail || null,
    foreign: detail !== "",
  };
}
