import { formatCount } from "@/client/lib/format";
import { Tabs } from "@/client/components/Tabs";
import {
  ChevronDown,
  Copy,
  Download,
  FileWarning,
  Info,
  Sheet,
  TriangleAlert,
} from "lucide-react";
import { PortalMenu } from "@/client/components/PortalMenu";
import { formatDateTime } from "@/client/lib/format";
import type {
  CategoryTab,
  ExportPayload,
  LighthouseFieldData,
  LighthouseIssue,
  LighthouseMetrics,
  LighthouseScores,
} from "./types";
import { LighthouseIssuesSummary } from "./LighthouseIssuesSummary";
import { categoryLabel } from "./utils";
import { categoryTabs } from "./types";
import { t } from "@/shared/i18n";

export function LighthouseIssuesHeader({
  backLabel,
  onBack,
  scannedAt,
  finalUrl,
  scores,
  metrics,
  fieldData,
  originFieldData,
  severityCounts,
  loading = false,
}: {
  backLabel: string;
  onBack: () => void;
  scannedAt?: string;
  finalUrl?: string;
  scores?: LighthouseScores | null;
  metrics?: LighthouseMetrics | null;
  fieldData?: LighthouseFieldData | null;
  originFieldData?: LighthouseFieldData | null;
  severityCounts: { critical: number; warning: number; info: number };
  /** Only while the read is in flight; a failed read shows no placeholder. */
  loading?: boolean;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <button className="btn btn-ghost btn-sm px-2" onClick={onBack}>
          &larr; {t("{label} sayfasına dön", { label: backLabel })}
        </button>
        <span className="text-xs text-muted">
          {scannedAt ? (
            t("{date} tarihinde tarandı", { date: formatDateTime(scannedAt) })
          ) : loading ? (
            <span className="skeleton inline-block h-3 w-36 align-middle" />
          ) : null}
        </span>
      </div>

      <div className="card bg-base-100 border border-base-300">
        <div className="card-body py-5 gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">
              {t("Sayfa hızı sorunları (Lighthouse)")}
            </h1>
            {finalUrl ? (
              <p className="text-sm text-muted break-all">{finalUrl}</p>
            ) : loading ? (
              <div className="skeleton h-4 w-64 max-w-full" />
            ) : null}
          </div>
          <LighthouseIssuesSummary
            scores={scores}
            metrics={metrics}
            fieldData={fieldData}
            originFieldData={originFieldData}
          />
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="badge border border-error/30 bg-error/10 text-[var(--ink-error)] gap-1">
              <FileWarning className="size-3" />
              {t("Kritik")} {severityCounts.critical}
            </span>
            <span className="badge border border-warning/30 bg-warning/10 text-[var(--ink-warning)] gap-1">
              <TriangleAlert className="size-3" />
              {t("Uyarı")} {severityCounts.warning}
            </span>
            <span className="badge border border-info/30 bg-info/10 text-[var(--ink-info)] gap-1">
              <Info className="size-3" />
              {t("Bilgi")} {severityCounts.info}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export function LighthouseIssuesToolbar({
  category,
  categoryCounts,
  categoryPhrase,
  isBusy,
  visibleIssues,
  allIssues,
  onCategoryChange,
  onCopy,
  onExport,
  onExportCsv,
  onExportSheets,
}: {
  category: CategoryTab;
  categoryCounts: Record<CategoryTab, number>;
  categoryPhrase: { subject: string; object: string };
  isBusy: boolean;
  visibleIssues: LighthouseIssue[];
  allIssues: LighthouseIssue[];
  onCategoryChange: (next: CategoryTab) => void;
  onCopy: (data: ExportPayload, toastMessage: string) => void;
  onExport: (data: ExportPayload) => void;
  onExportCsv: (issues: LighthouseIssue[], variant: "all" | "current") => void;
  onExportSheets: (
    issues: LighthouseIssue[],
    variant: "all" | "current",
  ) => void;
}) {
  const exportCurrentCategory: ExportPayload =
    category === "all" ? { mode: "issues" } : { mode: "category", category };

  return (
    <div className="sticky top-0 z-[2] -mx-2 px-2 py-2 bg-base-100/95 backdrop-blur-sm border-b border-base-300/60">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CategoryTabs
          category={category}
          categoryCounts={categoryCounts}
          onCategoryChange={onCategoryChange}
        />
        <ExportMenu
          allIssues={allIssues}
          categoryPhrase={categoryPhrase}
          exportCurrentCategory={exportCurrentCategory}
          isBusy={isBusy}
          onCopy={onCopy}
          onExport={onExport}
          onExportCsv={onExportCsv}
          onExportSheets={onExportSheets}
          visibleIssues={visibleIssues}
        />
      </div>
    </div>
  );
}

/**
 * The house tab strip, not a seventh hand-rolled one.
 *
 * This was a row of plain buttons: no `role="tablist"`, no `aria-selected`,
 * no arrow keys, and no `aria-controls` pointing at the list it filters. The
 * shared component is the same widget everywhere else on the screen already
 * uses, and it carries the whole ARIA pattern.
 */
function CategoryTabs({
  category,
  categoryCounts,
  onCategoryChange,
}: {
  category: CategoryTab;
  categoryCounts: Record<CategoryTab, number>;
  onCategoryChange: (next: CategoryTab) => void;
}) {
  return (
    <Tabs
      group="lighthouse-category"
      value={category}
      onChange={onCategoryChange}
      items={categoryTabs.map((tab) => ({
        id: tab,
        label: t("{category} ({count})", {
          category: categoryLabel(tab),
          count: formatCount(categoryCounts[tab]),
        }),
      }))}
    />
  );
}

function ExportMenu({
  allIssues,
  categoryPhrase,
  exportCurrentCategory,
  isBusy,
  onCopy,
  onExport,
  onExportCsv,
  onExportSheets,
  visibleIssues,
}: {
  allIssues: LighthouseIssue[];
  categoryPhrase: { subject: string; object: string };
  exportCurrentCategory: ExportPayload;
  isBusy: boolean;
  onCopy: (data: ExportPayload, toastMessage: string) => void;
  onExport: (data: ExportPayload) => void;
  onExportCsv: (issues: LighthouseIssue[], variant: "all" | "current") => void;
  onExportSheets: (
    issues: LighthouseIssue[],
    variant: "all" | "current",
  ) => void;
  visibleIssues: LighthouseIssue[];
}) {
  return (
    <PortalMenu
      ariaLabel={t("Lighthouse sorunlarını dışa aktar")}
      triggerClassName="btn btn-sm gap-1"
      triggerContent={
        <>
          <Download className="size-4" />
          {t("Dışa aktar")}
          <ChevronDown className="size-3 opacity-60" />
        </>
      }
      menuClassName="w-72 max-h-[min(30rem,70vh)] flex-nowrap overflow-y-auto"
    >
      {(close) => (
        <>
          <li className="menu-title">
            <span>{t("E-Tablolar'a aktar")}</span>
          </li>
          <li>
            <button
              disabled={!visibleIssues.length}
              onClick={() => {
                close();
                onExportSheets(visibleIssues, "current");
              }}
            >
              <Sheet className="size-4" />
              {t("{issues} E-Tablolar'da aç", {
                issues: categoryPhrase.subject,
              })}
            </button>
          </li>
          <li>
            <button
              disabled={!allIssues.length}
              onClick={() => {
                close();
                onExportSheets(allIssues, "all");
              }}
            >
              <Sheet className="size-4" />
              {t("İşlem gerektiren tüm sorunları E-Tablolar'da aç")}
            </button>
          </li>
          <li className="menu-title">
            <span>{t("Kopyala")}</span>
          </li>
          <li>
            <button
              disabled={isBusy}
              onClick={() => {
                close();
                onCopy(
                  exportCurrentCategory,
                  t("{issues} kopyalandı", { issues: categoryPhrase.subject }),
                );
              }}
            >
              <Copy className="size-4" />
              {t("{issues} kopyala", { issues: categoryPhrase.object })}
            </button>
          </li>
          <li>
            <button
              disabled={isBusy}
              onClick={() => {
                close();
                onCopy(
                  { mode: "issues" },
                  t("İşlem gerektiren tüm sorunlar kopyalandı"),
                );
              }}
            >
              <Copy className="size-4" />
              {t("İşlem gerektiren tüm sorunları kopyala")}
            </button>
          </li>
          <li>
            <button
              disabled={isBusy}
              onClick={() => {
                close();
                onCopy(
                  { mode: "full" },
                  t("Kayıtlı Lighthouse verisi kopyalandı"),
                );
              }}
            >
              <Copy className="size-4" />
              {t("Kayıtlı Lighthouse verisini kopyala")}
            </button>
          </li>
          <li className="menu-title">
            <span>{t("JSON indir")}</span>
          </li>
          <li>
            <button
              disabled={isBusy}
              onClick={() => {
                close();
                onExport(exportCurrentCategory);
              }}
            >
              {t("{issues} indir", { issues: categoryPhrase.object })}
            </button>
          </li>
          <li>
            <button
              disabled={isBusy}
              onClick={() => {
                close();
                onExport({ mode: "issues" });
              }}
            >
              {t("İşlem gerektiren tüm sorunları indir")}
            </button>
          </li>
          <li>
            <button
              disabled={isBusy}
              onClick={() => {
                close();
                onExport({ mode: "full" });
              }}
            >
              {t("Kayıtlı Lighthouse verisini indir")}
            </button>
          </li>
          <li className="menu-title">
            <span>{t("CSV indir")}</span>
          </li>
          <li>
            <button
              disabled={!visibleIssues.length}
              onClick={() => {
                close();
                onExportCsv(visibleIssues, "current");
              }}
            >
              {t("{issues} indir", { issues: categoryPhrase.object })}
            </button>
          </li>
          <li>
            <button
              disabled={!allIssues.length}
              onClick={() => {
                close();
                onExportCsv(allIssues, "all");
              }}
            >
              {t("İşlem gerektiren tüm sorunları indir")}
            </button>
          </li>
        </>
      )}
    </PortalMenu>
  );
}
