import { previewTone } from "@/client/lib/sound";
import { t } from "@/shared/i18n";
import { setNotificationPrefs, useNotificationPrefs } from "./prefs";
import { notify } from "./notify";

export function NotificationSettings() {
  const prefs = useNotificationPrefs();
  function sendTestNotification() {
    notify({
      kind: "report",
      title: t("Uygulama bildirimi testi"),
      body: t("Bu, uygulama içi bildirim ve ses denemesidir."),
      href: "/settings#bildirimler",
      importance: "high",
      dedupeKey: `app-notification-test:${Date.now()}`,
    });
  }

  return (
    <section id="bildirimler" className="scroll-mt-16 space-y-3">
      <h2 className="text-base font-semibold">{t("Bildirimler")}</h2>
      <p className="text-sm text-muted">
        {t(
          "Uygulama açıkken bildirimler ekranda görünür; sekme arka plandayken bildirim geçmişinde saklanır. Önemli bildirimlerin sesini buradan açıp kapatabilirsiniz.",
        )}{" "}
        {t(
          "Geri döndüğünüzde kaçırdığınız bir veya iki bildirim ayrı ayrı, üç veya daha fazlası özet olarak gösterilir.",
        )}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={prefs.sound}
            onChange={(event) =>
              setNotificationPrefs({ sound: event.target.checked })
            }
          />
          {t("Bildirim sesi")}
        </label>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => void previewTone()}
        >
          {t("Sesi dinle")}
        </button>
      </div>
      <button
        type="button"
        className="btn btn-outline btn-sm"
        onClick={sendTestNotification}
      >
        {t("Uygulama bildirimini dene")}
      </button>
    </section>
  );
}
