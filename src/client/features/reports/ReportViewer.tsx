import { useState } from "react";
import { REPORT_IFRAME_SANDBOX } from "@/shared/report-sandbox";

/**
 * The only place the app renders model-written HTML, in the app and on the
 * public share page. Everything that keeps it safe is the `sandbox` attribute
 * plus the CSP the document response sets; the token list is shared with that
 * header so a link behaves the same framed and top-level, and
 * `allow-same-origin` is never added.
 *
 * Framed, the document is served byte for byte — the app injects nothing here.
 * The only injection is the print script on `?print=1`, which this viewer
 * never requests.
 */
export function ReportViewer({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  // Keyed by `src`, so a different report starts unloaded.
  // The frame is sandboxed without `allow-same-origin`, so its
  // `contentDocument` is unreadable and `onLoad` is the only load signal.
  const framed = className === undefined;
  return (
    <ViewerFrame
      key={src}
      src={src}
      title={title}
      className={
        className ??
        "h-full w-full rounded-box border border-base-300 bg-base-100"
      }
      skeletonClassName={framed ? "rounded-box" : ""}
    />
  );
}

function ViewerFrame({
  src,
  title,
  className,
  skeletonClassName,
}: {
  src: string;
  title: string;
  className: string;
  skeletonClassName: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-full w-full" aria-busy={!loaded}>
      <iframe
        src={src}
        sandbox={REPORT_IFRAME_SANDBOX}
        referrerPolicy="no-referrer"
        title={`Rapor önizlemesi: ${title}`}
        onLoad={() => setLoaded(true)}
        className={className}
      />
      {loaded ? null : (
        <div
          className={`skeleton pointer-events-none absolute inset-0 ${skeletonClassName}`}
          aria-hidden
        />
      )}
    </div>
  );
}
