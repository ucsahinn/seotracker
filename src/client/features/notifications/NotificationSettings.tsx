import { useState } from "react";
import { previewTone } from "@/client/lib/sound";
import { t } from "@/shared/i18n";
import { setNotificationPrefs, useNotificationPrefs } from "./prefs";

export function NotificationSettings() {
  const prefs = useNotificationPrefs();
  const [permission, setPermission] = useState(() =>
    typeof Notification === "undefined"
      ? "unsupported"
      : Notification.permission,
  );
  const [requesting, setRequesting] = useState(false);
  async function enableDesktop(enabled: boolean) {
    if (!enabled) {
      setNotificationPrefs({ desktop: false });
      return;
    }
    if (typeof Notification === "undefined") return;
    setRequesting(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setNotificationPrefs({ desktop: result === "granted" });
    } catch {
      setNotificationPrefs({ desktop: false });
    } finally {
      setRequesting(false);
    }
  }
  return (
    <section id="bildirimler" className="scroll-mt-16 space-y-3">
      <h2 className="text-base font-semibold">{t("Bildirimler")}</h2>
      <p className="text-sm text-muted">
        {t(
          "Denetimler ve güncellemeler için bildirimler zil simgesinde saklanır. Bu tercihler bu tarayıcıda saklanır.",
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
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="toggle toggle-sm"
          checked={prefs.desktop && permission === "granted"}
          disabled={
            requesting ||
            permission === "unsupported" ||
            permission === "denied"
          }
          onChange={(event) => void enableDesktop(event.target.checked)}
        />
        {t("Arka plandayken masaüstü bildirimi")}
      </label>
      {permission === "denied" && (
        <p role="status" className="text-sm text-muted">
          {t(
            "Bildirim izni engellendi. Açmak için tarayıcının site izinlerini kullanın.",
          )}
        </p>
      )}
      {permission === "unsupported" && (
        <p className="text-sm text-muted">
          {t("Bu tarayıcı masaüstü bildirimlerini desteklemiyor.")}
        </p>
      )}
    </section>
  );
}
