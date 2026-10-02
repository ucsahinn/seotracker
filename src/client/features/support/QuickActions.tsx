import { Link } from "@tanstack/react-router";
import { BookOpen, Bot, ScrollText } from "lucide-react";
import { RefreshButton } from "@/client/components/RefreshButton";
import { DiagnosticsBundleButton } from "./DiagnosticsBundleButton";
import { DOCS_INDEX_URL } from "./links";
import { useSetupSnapshot } from "./useSetupSnapshot";

/**
 * The few things people come to this page to do, in one row.
 *
 * Every entry is a real destination or action that already exists: recheck,
 * download the archive, open the docs, read the release notes, set up an
 * agent. Nothing here is a shortcut to something that is not built.
 */
export function QuickActions() {
  const { diagnostics, isFetching, refresh } = useSetupSnapshot();

  return (
    <div
      role="toolbar"
      aria-label="Hızlı işlemler"
      className="flex flex-wrap items-center gap-2"
    >
      <RefreshButton
        label="Durumu yeniden kontrol et"
        onRefresh={refresh}
        isFetching={isFetching}
        dataUpdatedAt={diagnostics.dataUpdatedAt}
      />
      <DiagnosticsBundleButton />
      <a
        href={DOCS_INDEX_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="btn btn-sm gap-1.5"
      >
        <BookOpen className="size-4" aria-hidden />
        Belgeleri aç
        <span className="sr-only"> (yeni sekmede açılır)</span>
      </a>
      <Link to="/settings" hash="surum-notlari" className="btn btn-sm gap-1.5">
        <ScrollText className="size-4" aria-hidden />
        Sürüm notları
      </Link>
      <Link to="/ai" className="btn btn-sm gap-1.5">
        <Bot className="size-4" aria-hidden />
        Ajan kurulumu
      </Link>
    </div>
  );
}
