import { createPortal } from "react-dom";
import type { KeywordIntent } from "@/types/keywords";
import { FloatingTooltip, useFloatingTooltip } from "./FloatingTooltip";

const COLORS: Record<KeywordIntent, string> = {
  informational: "border-info/30 bg-info/15 text-info",
  commercial: "border-warning/35 bg-warning/20 text-warning",
  transactional: "border-success/30 bg-success/15 text-success",
  navigational: "border-primary/30 bg-primary/15 text-primary",
  unknown: "border-base-300 bg-base-200 text-base-content/60",
};

const SHORT_LABELS: Record<KeywordIntent, string> = {
  informational: "Bilgi",
  commercial: "Ticari",
  transactional: "İşlem",
  navigational: "Yön",
  unknown: "?",
};

const INTENT_LABELS: Record<KeywordIntent, string> = {
  informational: "Bilgi amaçlı",
  commercial: "Ticari araştırma",
  transactional: "İşlem odaklı",
  navigational: "Yönlendirici",
  unknown: "Bilinmiyor",
};

const DESCRIPTIONS: Record<
  KeywordIntent,
  { label: string; description: string }
> = {
  informational: {
    label: INTENT_LABELS.informational,
    description:
      "Arayan kişi bilgi ya da cevap arıyor. Eğitici içerikler, rehberler ve sade açıklayıcı yazılar için uygun.",
  },
  commercial: {
    label: INTENT_LABELS.commercial,
    description:
      "Arayan kişi satın almadan önce seçenekleri inceliyor. Karşılaştırma, alternatif ve ürün odaklı sayfalar için satın alma niyeti sayın.",
  },
  transactional: {
    label: INTENT_LABELS.transactional,
    description:
      "Arayan kişi bir eylemi, çoğunlukla satın almayı tamamlamaya hazır. Net teklifleri, fiyatları, denemeleri ve dönüşüm yollarını öne çıkarın.",
  },
  navigational: {
    label: INTENT_LABELS.navigational,
    description:
      "Arayan kişi belirli bir siteyi, markayı ya da sayfayı arıyor. Bu aramalar genellikle beklenen hedefe birebir karşılık gelmeyi ödüllendirir.",
  },
  unknown: {
    label: INTENT_LABELS.unknown,
    description:
      "Bu kelime için arama amacı bilinmiyor; içerik kararlarınızı yalnızca bu rozete bakarak vermeyin.",
  },
};

export function IntentBadge({ intent }: { intent: KeywordIntent }) {
  const tooltip = useFloatingTooltip<HTMLSpanElement>({ delayMs: 0 });
  const details = DESCRIPTIONS[intent];

  return (
    <span
      ref={tooltip.triggerRef}
      className={`inline-flex h-6 min-w-11 cursor-help items-center justify-center rounded-full border px-2 text-xs font-semibold leading-none ${COLORS[intent]}`}
      tabIndex={0}
      aria-label={`${details.label} arama amacı`}
      aria-describedby={tooltip.isOpen ? tooltip.tooltipId : undefined}
      onMouseEnter={tooltip.open}
      onMouseLeave={tooltip.close}
      onFocus={tooltip.open}
      onBlur={tooltip.close}
      onKeyDown={(e) => {
        if (e.key === "Escape") tooltip.close();
      }}
    >
      {SHORT_LABELS[intent]}
      {tooltip.isOpen && typeof document !== "undefined"
        ? createPortal(
            <FloatingTooltip id={tooltip.tooltipId} position={tooltip.position}>
              <span className="block font-semibold">{details.label}</span>
              <span className="mt-1 block">{details.description}</span>
            </FloatingTooltip>,
            document.body,
          )
        : null}
    </span>
  );
}
