import { Loader2, RefreshCw } from "lucide-react";
import * as React from "react";

/**
 * Quick "Yenile" action for a screen header, driven by a TanStack Query.
 *
 * Props
 *   onRefresh       called on click (and on the optional `r` shortcut)
 *   isFetching      spinner + disabled while true (`query.isFetching`)
 *   dataUpdatedAt   ms epoch (`query.dataUpdatedAt`); shows "Güncellendi: HH:mm"
 *   disabled        extra disabled state
 *   label           visible text, default "Yenile"
 *   shortcut        opt-in: bare `r` triggers a refresh. Off by default so two
 *                   buttons on one screen never fight; ignored while typing in
 *                   an input, textarea, select or contenteditable, and with
 *                   modifier keys held.
 *
 * Example
 *   <PageActions>
 *     <RefreshButton
 *       onRefresh={() => void query.refetch()}
 *       isFetching={query.isFetching}
 *       dataUpdatedAt={query.dataUpdatedAt}
 *       shortcut
 *     />
 *   </PageActions>
 */
const TIME = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
});

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

export function RefreshButton({
  onRefresh,
  isFetching = false,
  dataUpdatedAt,
  disabled = false,
  label = "Yenile",
  shortcut = false,
}: {
  onRefresh: () => void;
  isFetching?: boolean;
  dataUpdatedAt?: number;
  disabled?: boolean;
  label?: string;
  shortcut?: boolean;
}) {
  const blocked = disabled || isFetching;
  const onRefreshRef = React.useRef(onRefresh);
  React.useEffect(() => {
    onRefreshRef.current = onRefresh;
  });

  React.useEffect(() => {
    if (!shortcut || blocked) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key !== "r" && event.key !== "R") return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.defaultPrevented || isTypingTarget(event.target)) return;
      onRefreshRef.current();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [shortcut, blocked]);

  // "Güncellendi" is announced once a fetch that started here finishes.
  const wasFetching = React.useRef(false);
  const [announce, setAnnounce] = React.useState("");
  React.useEffect(() => {
    if (isFetching) {
      wasFetching.current = true;
      setAnnounce("");
    } else if (wasFetching.current) {
      wasFetching.current = false;
      setAnnounce("Güncellendi");
    }
  }, [isFetching]);

  const updated =
    dataUpdatedAt !== undefined && dataUpdatedAt > 0
      ? TIME.format(new Date(dataUpdatedAt))
      : null;

  return (
    <div className="flex items-center gap-2">
      {updated ? (
        <span className="hidden text-xs text-subtle tabular-nums sm:inline">
          Güncellendi: {updated}
        </span>
      ) : null}
      <button
        type="button"
        className="btn btn-sm min-h-8 min-w-8 gap-1.5"
        onClick={onRefresh}
        disabled={blocked}
        aria-busy={isFetching}
        title={shortcut ? `${label} (r)` : undefined}
        aria-keyshortcuts={shortcut ? "r" : undefined}
      >
        {isFetching ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <RefreshCw className="size-4" aria-hidden />
        )}
        <span>{label}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {isFetching ? "Güncelleniyor" : announce}
      </span>
    </div>
  );
}

/**
 * Right-aligned cluster of quick actions for `PageHeader`'s `actions` slot, so
 * refresh, export and help always sit in the same order and spacing.
 *
 * Example: <PageHeader title="…" actions={<PageActions>…</PageActions>} />
 */
export function PageActions({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {children}
    </div>
  );
}
