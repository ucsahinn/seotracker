import { t } from "@/shared/i18n";

type PortFallback = { configured: number; actual: number };

/**
 * Port numbers are addresses, not quantities: no thousands separator, so
 * they are not passed through formatCount.
 */
export function portFallbackMessage(port: PortFallback): string {
  return t(
    "seowatcher bu sefer {actual} numarasında çalışıyor çünkü {configured} başka bir program tarafından kullanılıyor (ör. eski bir Docker kopyası). Google bağlantısı {configured} için ayarlandı; o programı kapatıp seowatcher'ı yeniden başlatın.",
    { actual: String(port.actual), configured: String(port.configured) },
  );
}
