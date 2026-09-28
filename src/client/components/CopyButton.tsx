import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CopyButton({
  value,
  successMessage,
  label = "Kopyala",
  iconOnly = false,
  primary = false,
  disabled = false,
  onCopy,
}: {
  value: string;
  successMessage: string;
  label?: string;
  iconOnly?: boolean;
  primary?: boolean;
  /** For a value that is not settled yet -- copying it early would copy the wrong thing. */
  disabled?: boolean;
  onCopy?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      toast.error("Pano kullanılamıyor");
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      toast.success(successMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch {
      toast.error("Panoya kopyalanamadı");
    }
  };

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        disabled={disabled}
        aria-label={label}
        className="flex size-7 items-center justify-center rounded-field text-muted transition-colors hover:bg-base-200 hover:text-base-content"
      >
        {copied ? (
          <Check className="size-3.5 text-success" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled}
      className={
        primary
          ? "btn btn-primary"
          : // `--control-border`, not the panel hairline: this is a control on
            // base-100, so the border is the only thing saying so.
            "inline-flex items-center gap-1.5 rounded-field border border-[var(--control-border)] bg-base-100 px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-base-300/50 hover:text-base-content disabled:opacity-50"
      }
    >
      {copied ? (
        <Check className="size-3 text-success" />
      ) : (
        <Copy className="size-3" />
      )}
      {copied ? "Kopyalandı" : label}
    </button>
  );
}
