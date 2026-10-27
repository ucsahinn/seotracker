import { useEffect, useState } from "react";
import { REPORT_IFRAME_SANDBOX } from "@/shared/report-sandbox";
import { t } from "@/shared/i18n";

/** The opaque frame never grants scripts or same-origin access. */
export function ReportViewer({
  src,
  title,
  className,
  checkAvailability,
}: {
  src: string;
  title: string;
  className?: string;
  checkAvailability?: () => Promise<{ available: boolean }>;
}) {
  const [attempt, setAttempt] = useState(0);
  return (
    <ViewerFrame
      key={src + ":" + attempt}
      src={src}
      title={title}
      className={
        className ??
        "h-full w-full rounded-box border border-base-300 bg-base-100"
      }
      checkAvailability={checkAvailability}
      onRetry={() => setAttempt((n) => n + 1)}
    />
  );
}
function ViewerFrame({
  src,
  title,
  className,
  checkAvailability,
  onRetry,
}: {
  src: string;
  title: string;
  className: string;
  checkAvailability?: () => Promise<{ available: boolean }>;
  onRetry: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [checked, setChecked] = useState(!checkAvailability);
  const [problem, setProblem] = useState<
    "timeout" | "missing" | "unavailable" | null
  >(null);
  useEffect(() => {
    let current = true;

    if (checkAvailability)
      void checkAvailability()
        .then((result) => {
          if (!current) return;
          if (result.available) setChecked(true);
          else setProblem("missing");
        })
        .catch(() => {
          if (current) setProblem("unavailable");
        });
    return () => {
      current = false;
    };
    // A retry or source version remount is the only recheck trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (loaded && checked) return;
    const timer = window.setTimeout(
      () => setProblem((value) => value ?? "timeout"),
      15000,
    );
    return () => window.clearTimeout(timer);
  }, [loaded, checked]);
  const waiting = !problem && (!loaded || !checked);
  return (
    <div className="relative h-full w-full" aria-busy={waiting}>
      {problem ? (
        <div
          role="alert"
          className="space-y-3 rounded-box border border-[var(--hairline)] bg-base-100 p-5"
        >
          <p className="text-sm">
            {problem === "missing"
              ? t(
                  "Rapor belgesi bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.",
                )
              : problem === "unavailable"
                ? t(
                    "Raporun kullanılabilirliği doğrulanamadı. Sunucuya veya bağlantınıza erişilemiyor; yeniden deneyin.",
                  )
                : t(
                    "Rapor önizlemesi zamanında açılmadı. Bağlantıyı kontrol edin; yeniden deneyin veya yeni sekmede açın.",
                  )}
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn min-h-11" onClick={onRetry}>
              {t("Yeniden dene")}
            </button>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="btn min-h-11"
            >
              {t("Yeni sekmede aç")}
            </a>
          </div>
        </div>
      ) : (
        <>
          {checked ? (
            <iframe
              src={src}
              sandbox={REPORT_IFRAME_SANDBOX}
              referrerPolicy="no-referrer"
              title={t("Rapor önizlemesi: {title}", { title })}
              onLoad={() => setLoaded(true)}
              onError={() => setProblem("unavailable")}
              className={className}
            />
          ) : null}
          {waiting ? (
            <div
              className="skeleton pointer-events-none absolute inset-0 rounded-box"
              aria-hidden
            />
          ) : null}
        </>
      )}
    </div>
  );
}
