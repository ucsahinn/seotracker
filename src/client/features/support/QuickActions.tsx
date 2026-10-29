import { Link } from "@tanstack/react-router";
import { BookOpen, Bot, Globe, ScrollText } from "lucide-react";
import { RefreshButton } from "@/client/components/RefreshButton";
import { DiagnosticsBundleButton } from "./DiagnosticsBundleButton";
import { t } from "@/shared/i18n";
import { docsIndexUrl, siteUrl } from "./links";
import { useSetupSnapshot } from "./useSetupSnapshot";

/**
 * The few things people come to this page to do, in one row.
 *
 * Every entry is a real destination or action that already exists: recheck,
 * download the archive, open the docs, read the release notes, set up an
 * agent. The two actions are buttons; the four destinations are quieter
 * ghost links beside them. Nothing here is a shortcut to something that is
 * not built.
 */
const LINK =
  "btn btn-ghost btn-sm min-h-11 w-full justify-start gap-1.5 sm:w-auto";

export function QuickActions() {
  const { diagnostics, isFetching, refresh } = useSetupSnapshot();

  return (
    <div
      role="group"
      aria-label={t("Hızlı işlemler")}
      className="flex flex-wrap items-center gap-x-3 gap-y-2"
    >
      <div className="flex flex-wrap items-center gap-2">
        <RefreshButton
          label={t("Durumu yeniden kontrol et")}
          onRefresh={refresh}
          isFetching={isFetching}
          dataUpdatedAt={diagnostics.dataUpdatedAt}
        />
        <DiagnosticsBundleButton />
      </div>
      {/* Destinations, not actions: quieter, and a 2x2 grid on a phone so
          the row does not wrap ragged. */}
      <nav
        aria-label={t("Kaynaklar")}
        className="grid w-full grid-cols-2 gap-x-2 gap-y-1 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:border-l sm:border-[var(--hairline)] sm:pl-3"
      >
        <a
          href={docsIndexUrl()}
          target="_blank"
          rel="noreferrer noopener"
          className={LINK}
        >
          <BookOpen className="size-4" aria-hidden />
          {t("Kılavuzu aç")}
          <span className="sr-only"> {t("(yeni sekmede açılır)")}</span>
        </a>
        <a
          href={siteUrl()}
          target="_blank"
          rel="noreferrer noopener"
          className={LINK}
        >
          <Globe className="size-4" aria-hidden />
          seowatcher.io
          <span className="sr-only"> {t("(yeni sekmede açılır)")}</span>
        </a>
        <Link to="/release-notes" className={LINK}>
          <ScrollText className="size-4" aria-hidden />
          {t("Sürüm notları")}
        </Link>
        <Link to="/ai" className={LINK}>
          <Bot className="size-4" aria-hidden />
          {t("Ajan kurulumu")}
        </Link>
      </nav>
    </div>
  );
}
