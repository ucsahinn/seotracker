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
 * agent. Every button is the same `btn-sm`, so the row reads as one. Nothing here is a shortcut to something that is not built.
 */
export function QuickActions() {
  const { diagnostics, isFetching, refresh } = useSetupSnapshot();

  return (
    <div
      role="toolbar"
      aria-label={t("Hızlı işlemler")}
      className="flex flex-wrap items-center gap-2"
    >
      <RefreshButton
        label={t("Durumu yeniden kontrol et")}
        onRefresh={refresh}
        isFetching={isFetching}
        dataUpdatedAt={diagnostics.dataUpdatedAt}
      />
      <DiagnosticsBundleButton />
      <a
        href={docsIndexUrl()}
        target="_blank"
        rel="noreferrer noopener"
        className="btn btn-sm gap-1.5"
      >
        <BookOpen className="size-4" aria-hidden />
        {t("Kılavuzu aç")}
        <span className="sr-only"> {t("(yeni sekmede açılır)")}</span>
      </a>
      <a
        href={siteUrl()}
        target="_blank"
        rel="noreferrer noopener"
        className="btn btn-sm gap-1.5"
      >
        <Globe className="size-4" aria-hidden />
        seowatcher.io
        <span className="sr-only"> {t("(yeni sekmede açılır)")}</span>
      </a>
      <Link to="/release-notes" className="btn btn-sm gap-1.5">
        <ScrollText className="size-4" aria-hidden />
        {t("Sürüm notları")}
      </Link>
      <Link to="/ai" className="btn btn-sm gap-1.5">
        <Bot className="size-4" aria-hidden />
        {t("Ajan kurulumu")}
      </Link>
    </div>
  );
}
