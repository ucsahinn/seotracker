import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { setupVerdict, type SetupSignals } from "@/shared/projectSetup";
import { formatCount } from "@/shared/format";
import { projectSetupOptions } from "@/client/features/projects/projectSetupQuery";
import {
  buildContextHealth,
  type HealthItem,
  type HealthState,
} from "./contextHealth";
import type { ProjectContextData } from "./shared";
import { t } from "@/shared/i18n";

function stateOf(
  query: { isPending: boolean; isError: boolean },
  value: boolean | null | undefined,
): HealthState {
  if (query.isPending) return "loading";
  if (value === null || value === undefined) return "error";
  return value ? "done" : "todo";
}

/**
 * How complete this project's setup is, item by item, with the fix one click
 * away. The counted items and their states come from the same server call
 * the dashboard's verdict uses (`shared/projectSetup`), so the two screens
 * always give the same "x / y"; competitors and key pages are listed as
 * advice and not counted.
 */
export function ContextHealthCard({
  projectId,
  context,
}: {
  projectId: string;
  context: ProjectContextData;
}) {
  const setup = useQuery(projectSetupOptions(projectId));

  const items = buildContextHealth({
    missingSections: context.missingSections,
    projectInfo: stateOf(setup, setup.data?.projectInfo),
    competitorCount: context.competitors.length,
    keyPageCount: context.keyPages.length,
    searchConsole: stateOf(setup, setup.data?.searchConsole),
    analytics: stateOf(setup, setup.data?.analytics),
    pageSpeed: stateOf(setup, setup.data?.pageSpeed),
    audit: stateOf(setup, setup.data?.audit),
    agent: stateOf(setup, setup.data?.agent),
  });
  const signals: SetupSignals = setup.data ?? {
    searchConsole: null,
    analytics: null,
    audit: null,
    projectInfo: null,
    pageSpeed: null,
    agent: null,
  };
  const verdict = setupVerdict(signals);
  const mixed =
    setup.data && setup.data.missingSections !== context.missingSections.length;
  const retry = () => void setup.refetch();

  return (
    <section
      aria-labelledby="context-health-title"
      className="rounded-box border border-[var(--hairline)] bg-base-100 p-4"
    >
      <h2 id="context-health-title" className="text-sm font-semibold">
        {t("Kurulum durumu")}
      </h2>
      <p className="mt-0.5 text-xs text-muted">
        {t(
          "Kayıtlı bağlantılar ve proje notları. Bu liste bir SEO başarı puanı veya canlı bağlantı testi değildir.",
        )}
      </p>
      <p className="mt-3 text-sm" role="status">
        {setup.isPending || mixed
          ? t(
              "Kurulum ve proje notları farklı anlarda okundu. Tutarlı durum için bilgiyi yenileyin.",
            )
          : t(
              "{done}/{total} kayıtlı · {missing} eksik · {unknown} okunamadı",
              {
                done: formatCount(verdict.done),
                total: formatCount(verdict.total),
                missing: formatCount(verdict.missing.length),
                unknown: formatCount(verdict.unknown.length),
              },
            )}
      </p>
      {setup.isError && setup.data ? (
        <p role="status" className="text-xs text-muted">
          {t(
            "Kurulum yenilenemedi; son alınan durum gösteriliyor. Yeniden deneyin.",
          )}
        </p>
      ) : null}
      <ul className="mt-3 divide-y divide-[var(--hairline)]">
        {items.map((item) => (
          <HealthRow
            key={item.id}
            item={item}
            projectId={projectId}
            onRetry={item.target.kind === "anchor" ? undefined : retry}
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

// Turkish source text, translated where it renders.
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
      ? t("Durum okunuyor…")
      : item.state === "error"
        ? t("Durum okunamadı. Yeniden deneyin.")
        : item.detail;

  return (
    <li className="flex items-center gap-3 py-2.5">
      <span aria-hidden className="shrink-0">
        <StateIcon state={item.state} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {item.label}
          {item.optional ? (
            <span className="ml-1.5 text-xs font-normal text-muted">
              {t("öneri, sayılmaz")}
            </span>
          ) : null}
          <span className="sr-only">, {t(STATE_WORD[item.state])}</span>
        </p>
        <p className="text-xs text-muted">{detail}</p>
      </div>
      {item.state === "error" && onRetry ? (
        <button
          type="button"
          className="btn btn-ghost btn-xs min-h-11 min-w-11 sm:min-h-8 sm:min-w-8"
          onClick={onRetry}
        >
          {t("Yeniden dene")}
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
  const className = `btn btn-xs min-h-11 min-w-11 sm:min-h-8 sm:min-w-8 ${item.state === "done" ? "btn-ghost" : ""}`;
  const { target } = item;
  if (target.kind === "anchor") {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          const node = document.getElementById(target.id);
          node?.scrollIntoView({
            block: "center",
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          });
          node?.focus({ preventScroll: true });
        }}
      >
        {item.actionLabel}
      </button>
    );
  }
  const label = item.state === "done" ? t("Ayarlar") : item.actionLabel;
  if (target.kind === "audit") {
    return (
      <Link
        to="/p/$projectId/audit"
        params={{ projectId }}
        className={className}
      >
        {label}
      </Link>
    );
  }
  if (target.kind === "agent") {
    return (
      <Link to="/ai" className={className}>
        {label}
      </Link>
    );
  }
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
