import { toast } from "sonner";
import { t } from "@/shared/i18n";

/**
 * Copy plain text and toast the real outcome. `navigator.clipboard` is
 * undefined outside a secure context (http://LAN-IP), and writeText rejects
 * when the page lacks focus, so an unguarded call fails silently. Returns
 * whether the text reached the clipboard.
 */
export async function copyText(
  text: string,
  successMessage: string,
): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    toast.error(t("Pano kullanılamıyor"));
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
    return true;
  } catch {
    toast.error(t("Panoya kopyalanamadı"));
    return false;
  }
}
