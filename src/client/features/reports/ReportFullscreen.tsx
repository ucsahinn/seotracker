import { Minimize2 } from "lucide-react";
import { useEffect, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { ReportDownloadButton } from "@/client/features/reports/ReportDownloadButton";
import { ReportViewer } from "@/client/features/reports/ReportViewer";
import { formatDateTime, formatRelativeTime } from "@/client/lib/format";

/**
 * The expanded report: a modal dialog over the whole app.
 *
 * Esc leaves it, the same key Modal.tsx uses to close. The listener is on the
 * parent window, and the body is almost entirely the sandboxed iframe: one
 * click inside moves focus into the frame, which has no scripts and so cannot
 * forward the key. Focusing the exit button on entry keeps Esc working until
 * the reader clicks into the report; the button is the guaranteed path.
 */
export function ReportFullscreen({
  report,
  onExit,
}: {
  report: { id: string; title: string; updatedAt: string };
  onExit: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    exitRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      onExit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

  // Tab stays inside the dialog: the app behind it is still in the tab order.
  const trapTab = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const items = [
      ...(dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled), a[href], iframe",
      ) ?? []),
    ];
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={report.title}
      onKeyDown={trapTab}
      className="fixed inset-0 z-50 flex flex-col bg-base-100"
    >
      <div className="flex items-center justify-between gap-3 border-b border-base-300 px-4 py-2">
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="truncate text-sm font-medium">{report.title}</span>
          {/*
           * The age, which the normal view shows and this one dropped.
           * `?full=true` is a shareable link, and the report body is
           * agent-written HTML with no timestamp of its own -- so without
           * this a reader landing on that link sees a rendered SEO report
           * with no date anywhere and no way to tell it is a month old.
           */}
          <time
            dateTime={report.updatedAt}
            title={formatDateTime(report.updatedAt)}
            className="shrink-0 text-xs text-muted"
          >
            {formatRelativeTime(report.updatedAt)}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <ReportDownloadButton
            reportId={report.id}
            title={report.title}
            label="HTML olarak indir"
          />
          <button
            type="button"
            ref={exitRef}
            className="btn btn-ghost btn-sm gap-1.5"
            onClick={onExit}
          >
            <Minimize2 aria-hidden className="size-4" />
            Tam ekrandan çık
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 p-2">
        <ReportViewer
          src={`/r/${report.id}`}
          title={report.title}
          className="h-full w-full bg-base-100"
        />
      </div>
    </div>
  );
}
