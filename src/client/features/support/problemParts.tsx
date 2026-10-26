import { ChevronRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { CopyButton } from "@/client/components/CopyButton";
import { t } from "@/shared/i18n";
import { type DOCS, docsUrl } from "./links";

/* The building blocks of the Sık sorunlar list (CommonProblems.tsx). */

export const linkClass = "link link-primary";

/*
 * The Windows tray menu is Turkish only, so its items are named as the menu
 * shows them in every language; the English sentences around them add the
 * meaning in parentheses.
 */
export const TRAY = {
  restart: "Yeniden başlat", // i18n-ignore: tray menu item
  repair: "Kurulumu onar",
  logs: "Günlükleri aç", // i18n-ignore: tray menu item
  report: "Sorunu bildir (GitHub)",
  dataFolder: "Veri klasörünü aç", // i18n-ignore: tray menu item
  running: '"Çalışıyor: http://127.0.0.1:3001/"', // i18n-ignore: tray tooltip
  error: '"Hata"',
} as const;

export function TrayItem({ name }: { name: keyof typeof TRAY }) {
  return <strong lang="tr">{TRAY[name]}</strong>;
}

export function Command({ value }: { value: string }) {
  return (
    // One unit, so the copy button never lands on a line of its own.
    <span className="inline-flex items-center gap-1 whitespace-nowrap align-middle">
      <code className="text-xs">{value}</code>
      <CopyButton
        iconOnly
        value={value}
        label={t("Komutu kopyala")}
        successMessage={t("Komut kopyalandı")}
      />
    </span>
  );
}

export function DocLink({
  file,
  children,
}: {
  file: (typeof DOCS)[keyof typeof DOCS];
  children: ReactNode;
}) {
  return (
    <a
      href={docsUrl(file)}
      target="_blank"
      rel="noreferrer noopener"
      className={`${linkClass} inline-flex items-center gap-1`}
    >
      {children}
      <ExternalLink className="size-3" aria-hidden />
    </a>
  );
}

export function Problem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-b border-base-300 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center gap-2 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
        <ChevronRight
          className="size-4 shrink-0 text-muted transition-transform group-open:rotate-90"
          aria-hidden
        />
        {title}
      </summary>
      <div className="max-w-prose space-y-2 pb-4 pl-6 text-sm text-muted">
        {children}
      </div>
    </details>
  );
}

export const code = (value: string) => <code className="text-xs">{value}</code>;
