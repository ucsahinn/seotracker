import { ExternalLink } from "lucide-react";
import { CopyButton } from "@/client/components/CopyButton";
import { getSafeExternalUrl } from "@/client/components/table/url";

/**
 * A URL in a table cell: shortened to read, openable, and copyable whole.
 *
 * Every table that lists addresses shortens them — to a path, or with a
 * truncating class — and until this existed none of them let you get the
 * full address back out. The one thing an operator does with a row is take
 * its URL somewhere else: a terminal, a CMS, a ticket. `title` does not
 * survive a copy, and reading it off the screen is not a workflow.
 */
export function UrlCell({
  url,
  label,
  className,
}: {
  url: string;
  /** What to show, when the full address is too long to be one. */
  label?: string;
  className?: string;
}) {
  /*
   * Every address here was read off somebody else's site or handed over by
   * Google, so it is checked rather than trusted. `getSafeExternalUrl` is
   * the helper the sibling columns already use; React blocks `javascript:`
   * on its own, but relying on that means the guarantee lives in a
   * dependency's behaviour instead of in this file. A value that is not
   * http(s) renders as text: still readable, still copyable, not a link.
   */
  const safeUrl = getSafeExternalUrl(url);

  return (
    <span className={`flex min-w-0 items-center gap-1 ${className ?? ""}`}>
      {safeUrl ? (
        <a
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={url}
          className="link link-primary inline-flex min-w-0 items-center gap-1"
        >
          <span className="truncate">{label ?? url}</span>
          <ExternalLink className="size-3 shrink-0" aria-hidden />
        </a>
      ) : (
        <span className="truncate" title={url}>
          {label ?? url}
        </span>
      )}
      {/*
       * Icon-only and hover-revealed on pointer devices: one of these per
       * row is a column of buttons competing with the data. It stays in the
       * tab order, and shows on focus, so the keyboard path is unaffected.
       */}
      <span className="shrink-0 transition-opacity md:opacity-0 md:group-hover/row:opacity-100 md:focus-within:opacity-100">
        <CopyButton
          iconOnly
          value={url}
          label="Adresi kopyala"
          successMessage="Adres kopyalandı"
        />
      </span>
    </span>
  );
}
