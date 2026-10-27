/**
 * The one definition of "is this project set up".
 *
 * Three screens used to answer it three ways at once: the dashboard ringed
 * "6/6 · 100/100", Proje bilgisi said "4/6 · %67", and each counted different
 * things (the dashboard had no PageSpeed key, Proje bilgisi had no audit or
 * agent, and the dashboard counted an audit of another site as this one's
 * fresh audit). Every screen now reads the same items from the same server
 * call and words the verdict with `setupVerdict`.
 *
 * Install health -- the database, the auth guard, whether a Google credential
 * is stored at all -- is a different question and stays on the help screen.
 *
 * Sibling imports stay relative, like the rest of `shared/`.
 */
import { selectPanelAudits, auditIsStale } from "./panelAudit";

export const SETUP_ITEMS = [
  "searchConsole",
  "analytics",
  "audit",
  "projectInfo",
  "pageSpeed",
  "agent",
] as const;
export type SetupItem = (typeof SETUP_ITEMS)[number];

/** True done, false missing, null not known (a read failed). */
export type SetupSignals = Record<SetupItem, boolean | null>;

type SetupVerdict = {
  done: number;
  total: number;
  complete: boolean;
  missing: SetupItem[];
  unknown: SetupItem[];
};

export function setupVerdict(signals: SetupSignals): SetupVerdict {
  const missing = SETUP_ITEMS.filter((item) => signals[item] === false);
  const unknown = SETUP_ITEMS.filter((item) => signals[item] === null);
  const done = SETUP_ITEMS.length - missing.length - unknown.length;
  return {
    done,
    total: SETUP_ITEMS.length,
    complete: missing.length === 0 && unknown.length === 0,
    missing,
    unknown,
  };
}

/**
 * Whether an audit's start address is this project's site. The host is
 * compared without "www." and the start path is ignored, so a crawl of
 * /blog still belongs to the site; a crawl of another domain does not.
 */
/** A completed audit of the project's own site, started within the fresh window. */
export function hasFreshOwnAudit(
  audits: ReadonlyArray<{
    status: string;
    startUrl: string;
    startedAt: number;
  }>,
  projectDomain: string | null,
  now: number,
): boolean {
  return audits.some(
    (audit) =>
      audit.status === "completed" &&
      selectPanelAudits([audit], projectDomain).snapshot !== null &&
      Number.isFinite(audit.startedAt) &&
      !auditIsStale(audit.startedAt, now),
  );
}
