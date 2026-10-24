import * as React from "react";
import { useRouter } from "@tanstack/react-router";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateStatusOptions } from "@/client/features/settings/settingsQueries";
import { formatNumber } from "@/client/lib/format";
import { unlockSoundOnFirstGesture } from "@/client/lib/sound";
import { getAuditHistory } from "@/serverFunctions/audit";
import { getProjects } from "@/serverFunctions/projects";
import { t } from "@/shared/i18n";
import {
  type AuditStatus,
  auditStatuses,
  detectAuditTransitions,
} from "./auditTransitions";
import { notify, setNotificationNavigator } from "./notify";

const RUNNING_POLL_MS = 5_000;
const IDLE_POLL_MS = 60_000;
const UPDATE_POLL_MS = 6 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const NO_PROJECTS: Awaited<ReturnType<typeof getProjects>> = [];
const UPDATE_NOTIFIED_KEY = "seowatcher-update-notified";

/**
 * Says "a newer version is out" once per version, whichever screen saw it
 * first: this background check or the Settings button.
 */
export function notifyUpdateAvailable(version: string): void {
  try {
    if (window.localStorage.getItem(UPDATE_NOTIFIED_KEY) === version) return;
    window.localStorage.setItem(UPDATE_NOTIFIED_KEY, version);
  } catch {
    // Without storage the dedupe key below still holds within the list.
  }
  notify({
    kind: "update",
    title: t("Yeni sürüm yayımlandı: {version}", { version }),
    body: t("Ayarlar'daki Hakkında bölümü nasıl güncelleyeceğinizi söyler."),
    href: "/settings#guncelleme",
    importance: "high",
    dedupeKey: `update:${version}`,
  });
}

/** True when a Google account list in this query's data needs reconnecting. */
function needsReconnect(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;
  const values = Array.isArray(data) ? [data] : Object.values(data);
  return values.some(
    (value) =>
      Array.isArray(value) &&
      value.some(
        (entry: unknown) =>
          typeof entry === "object" &&
          entry !== null &&
          "requiresReconnect" in entry &&
          entry.requiresReconnect === true,
      ),
  );
}

function reportGoogleAuthFailure(data: unknown, key: unknown): void {
  if (!needsReconnect(data) || !Array.isArray(key)) return;
  const name: unknown = key[0];
  const projectId: unknown = key[1];
  const service =
    typeof name === "string" && name.toLowerCase().includes("ga4")
      ? "Google Analytics"
      : "Search Console";
  const project = typeof projectId === "string" ? projectId : undefined;
  notify({
    kind: "google-auth",
    title: t("{service} bağlantısı yenilenmeli", { service }),
    body: t(
      "Google erişim izni geçersiz ya da geri alınmış. Hesabı yeniden bağlayın.",
    ),
    href: project ? `/p/${project}/settings/integrations` : "/settings#google",
    importance: "high",
    projectId: project,
    // Once an hour at most, however many screens read the same account list.
    dedupeKey: `google-auth:${service}:${project ?? ""}:${Math.floor(Date.now() / HOUR_MS)}`,
  });
}

/**
 * Watches for events that happen while the operator is elsewhere: audits
 * finishing in any project, a new release, a Google grant going bad.
 * Mounted once, in the root.
 */
export function useBackgroundNotifications(): void {
  const router = useRouter();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setNotificationNavigator((href) => void router.navigate({ href }));
    unlockSoundOnFirstGesture();
  }, [router]);

  // Same key as every other projects read, so this is a cache read in practice.
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const projects = projectsQuery.data ?? NO_PROJECTS;

  /*
   * The same query the audit screen uses, so starting an audit there (which
   * invalidates this key) is noticed at once. Polls fast only while
   * something runs, and keeps polling in a background tab: that is when a
   * desktop notification is worth having.
   */
  const histories = useQueries({
    queries: projects.map((project) => ({
      queryKey: ["audit-history", project.id],
      queryFn: () => getAuditHistory({ data: { projectId: project.id } }),
      refetchInterval: (query: {
        state: { data?: { status: AuditStatus }[] };
      }) =>
        query.state.data?.some((audit) => audit.status === "running")
          ? RUNNING_POLL_MS
          : IDLE_POLL_MS,
      refetchIntervalInBackground: true,
    })),
  });

  const baseline = React.useRef(new Map<string, Map<string, AuditStatus>>());
  React.useEffect(() => {
    projects.forEach((project, index) => {
      const audits = histories[index]?.data;
      if (!audits) return;
      const transitions = detectAuditTransitions(
        baseline.current.get(project.id),
        audits,
      );
      baseline.current.set(project.id, auditStatuses(audits));
      for (const { audit, outcome } of transitions) {
        const issues =
          audit.issues.critical + audit.issues.warning + audit.issues.info;
        notify({
          kind: outcome === "completed" ? "audit-completed" : "audit-failed",
          title:
            outcome === "completed"
              ? t("Denetim bitti: {pages} sayfa, {issues} bulgu", {
                  pages: formatNumber(audit.pagesCrawled),
                  issues: formatNumber(issues),
                })
              : t("Denetim tamamlanamadı"),
          body: project.name,
          href: `/p/${project.id}/audit?auditId=${encodeURIComponent(audit.id)}`,
          importance: "high",
          projectId: project.id,
          dedupeKey: `audit:${audit.id}:${outcome}`,
        });
      }
    });
  }, [projects, histories]);

  const updateQuery = useQuery({
    ...updateStatusOptions(),
    refetchInterval: UPDATE_POLL_MS,
  });
  const latest = updateQuery.data?.updateAvailable
    ? updateQuery.data.latestVersion
    : null;
  React.useEffect(() => {
    if (latest) notifyUpdateAvailable(latest);
  }, [latest]);

  React.useEffect(() => {
    // Every Google account list the app reads anywhere passes through here.
    return queryClient.getQueryCache().subscribe((event) => {
      if (event.type === "updated" && event.action.type === "success") {
        reportGoogleAuthFailure(event.query.state.data, event.query.queryKey);
      }
    });
  }, [queryClient]);
}
