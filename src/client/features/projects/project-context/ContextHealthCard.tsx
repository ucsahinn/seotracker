import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Circle, Loader2 } from "lucide-react";
import {
  ga4ConnectionOptions,
  gscConnectionOptions,
} from "@/client/features/integrations/googleConnectionQueries";
import { getPageSpeedKeyStatus } from "@/serverFunctions/pagespeedKey";
import {
  buildContextHealth,
  healthProgress,
  type HealthItem,
  type HealthState,
} from "./contextHealth";
import type { ProjectContextData } from "./shared";

function stateOf(
  query: { isPending: boolean; isError: boolean },
  done: boolean,
): HealthState {
  if (query.isPending) return "loading";
  if (query.isError) return "error";
  return done ? "done" : "todo";
}

/**
 * How complete this project's setup is, item by item, with the fix one click
 * away.
 *
 * Everything here is read, not guessed: the written sections and lists come
 * from the context the page already loaded, the connections from the same
 * queries the integrations screen uses, and the PageSpeed key from its
 * status call (which never returns the key itself).
 */
export function ContextHealthCard({
  projectId,
  context,
}: {
  projectId: string;
  context: ProjectContextData;
}) {
  const gsc = useQuery(gscConnectionOptions(projectId));
  const ga4 = useQuery(ga4ConnectionOptions(projectId));
  const pageSpeed = useQuery({
    queryKey: ["pageSpeedKeyStatus"],
    queryFn: () => getPageSpeedKeyStatus(),
  });

  const items = buildContextHealth({
    missingSections: context.missingSections,
    competitorCount: context.competitors.length,
    keyPageCount: context.keyPages.length,
    searchConsole: stateOf(gsc, gsc.data?.connected === true),
    analytics: stateOf(ga4, ga4.data?.connected === true),
    pageSpeed: stateOf(
      pageSpeed,
      pageSpeed.data !== undefined && pageSpeed.data.source !== null,
    ),
  });
  const { done, total } = healthProgress(items);
  const retry = {
    searchConsole: () => void gsc.refetch(),
    analytics: () => void ga4.refetch(),
    pageSpeed: () => void pageSpeed.refetch(),
  };

  return (
    <section
      aria-labelledby="context-health-title"
      className="rounded-box border border-base-300 bg-base-100 p-4"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="context-health-title" className="text-sm font-medium">
          Kurulum durumu
        </h2>
        <span className="text-xs tabular-nums text-muted">
          {done} / {total} tamam
        </span>
      </div>
      <p className="mt-0.5 text-xs text-muted">
        Ajanların ve bu aracın sağlıklı çalışması için gerekenler. Eksik olan
        her satırın yanındaki düğme sizi düzelteceğiniz yere götürür.
      </p>
      <div
        role="progressbar"
        aria-label="Kurulum ilerlemesi"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-valuetext={`${total} adımın ${done} tanesi tamam`}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-base-200"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>
      <ul className="mt-3 divide-y divide-base-300">
        {items.map((item) => (
          <HealthRow
            key={item.id}
            item={item}
            projectId={projectId}
            onRetry={
              item.id === "searchConsole" ||
              item.id === "analytics" ||
              item.id === "pageSpeed"
                ? retry[item.id]
                : undefined
            }
          />
        ))}
      </ul>
    </section>
  );
}

function StateIcon({ state }: { state: HealthState }) {
  if (state === "done") {
    return <CheckCircle2 className="size-4 text-[var(--ink-success)]" />;
  }
  if (state === "loading") {
    return <Loader2 className="size-4 animate-spin text-muted" />;
  }
  if (state === "error") {
    return <AlertCircle className="size-4 text-[var(--ink-warning)]" />;
  }
  return <Circle className="size-4 text-subtle" />;
}

const STATE_WORD: Record<HealthState, string> = {
  done: "Tamam",
  todo: "Eksik",
  loading: "Kontrol ediliyor",
  error: "Denetlenemedi",
};

function HealthRow({
  item,
  projectId,
  onRetry,
}: {
  item: HealthItem;
  projectId: string;
  onRetry: (() => void) | undefined;
}) {
  const detail =
    item.state === "loading"
      ? "Durum okunuyor…"
      : item.state === "error"
        ? "Durum okunamadı. Yeniden deneyin."
        : item.detail;

  return (
    <li className="flex items-center gap-3 py-2.5">
      <span aria-hidden className="shrink-0">
        <StateIcon state={item.state} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {item.label}
          <span className="sr-only"> — {STATE_WORD[item.state]}</span>
        </p>
        <p className="text-xs text-muted">{detail}</p>
      </div>
      {item.state === "error" && onRetry ? (
        <button
          type="button"
          className="btn btn-ghost btn-xs"
          onClick={onRetry}
        >
          Yeniden dene
        </button>
      ) : item.state === "loading" ? null : (
        <HealthAction item={item} projectId={projectId} />
      )}
    </li>
  );
}

function HealthAction({
  item,
  projectId,
}: {
  item: HealthItem;
  projectId: string;
}) {
  const className = `btn btn-xs ${item.state === "done" ? "btn-ghost" : ""}`;
  const { target } = item;
  if (target.kind === "anchor") {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          const node = document.getElementById(target.id);
          node?.scrollIntoView({ block: "center", behavior: "smooth" });
          node?.focus({ preventScroll: true });
        }}
      >
        {item.actionLabel}
      </button>
    );
  }
  const label = item.state === "done" ? "Ayarlar" : item.actionLabel;
  if (target.kind === "integrations") {
    return (
      <Link
        to="/p/$projectId/settings/integrations"
        params={{ projectId }}
        hash={target.hash}
        className={className}
      >
        {label}
      </Link>
    );
  }
  return (
    <Link to="/settings" className={className}>
      {label}
    </Link>
  );
}
