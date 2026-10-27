import { Minimize2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { ReportDownloadButton } from "./ReportDownloadButton";
import { ReportViewer } from "./ReportViewer";
import { formatDateTime } from "@/client/lib/format";
import { t } from "@/shared/i18n";

/** Native modal isolation also covers focus moving into the opaque frame. */
export function ReportFullscreen({
  report,
  onExit,
  checkAvailability,
}: {
  report: { id: string; title: string; updatedAt: string };
  onExit: () => void;
  checkAvailability?: () => Promise<{ available: boolean }>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      aria-label={report.title}
      onCancel={(event) => {
        event.preventDefault();
        onExit();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-base-100 p-0 text-base-content open:flex open:flex-col"
    >
      <div className="flex shrink-0 flex-col gap-3 border-b border-[var(--hairline)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="break-words text-sm font-medium">{report.title}</p>
          <time dateTime={report.updatedAt} className="text-xs text-muted">
            {t("Kaydedildi: {date}", {
              date: formatDateTime(report.updatedAt),
            })}
          </time>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ReportDownloadButton
            reportId={report.id}
            title={report.title}
            label={t("HTML olarak indir")}
          />
          <button
            type="button"
            autoFocus
            className="btn btn-ghost min-h-11 gap-1.5"
            onClick={onExit}
          >
            <Minimize2 aria-hidden className="size-4" />
            {t("Tam ekrandan çık")}
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 p-2">
        <ReportViewer
          src={"/r/" + report.id + "?v=" + encodeURIComponent(report.updatedAt)}
          title={report.title}
          className="h-full w-full bg-base-100"
          checkAvailability={checkAvailability}
        />
      </div>
      <button
        type="button"
        className="btn btn-ghost min-h-11 shrink-0"
        onClick={onExit}
      >
        {t("Tam ekrandan çık")}
      </button>
    </dialog>
  );
}
