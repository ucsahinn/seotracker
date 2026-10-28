import { deviceLabel } from "@/client/features/search-performance/deviceShare";
import { formatRegionName } from "@/client/lib/format";
import { getLocale, t } from "@/shared/i18n";

/**
 * GA4 dimension values, in the UI's language.
 *
 * GA4 answers in English whatever the property's locale: "Organic Search",
 * "mobile", "Germany". The Search performance screen already said "Mobil"
 * for the same device a tab over said "mobile". Only the display changes;
 * the raw value stays the row's key, so filters and exports still match
 * what Google sent. Anything not listed passes through unchanged.
 *
 * In English the raw value is already Google's own name, so it is shown
 * as is. Other locales translate the source labels at render time.
 */

/** GA4's default channel groups. */
const CHANNEL_LABELS: Record<string, string> = {
  "Organic Search": "Organik arama",
  Direct: "Doğrudan",
  Referral: "Yönlendirme trafiği",
  "Organic Social": "Organik sosyal",
  "Paid Search": "Ücretli arama",
  "Paid Social": "Ücretli sosyal",
  Email: "E-posta",
  Display: "Görüntülü reklam",
  Affiliates: "Satış ortakları",
  "Organic Video": "Organik video",
  "Paid Video": "Ücretli video",
  "Organic Shopping": "Organik alışveriş",
  "Paid Shopping": "Ücretli alışveriş",
  "Paid Other": "Diğer ücretli",
  "Cross-network": "Ağlar arası",
  Audio: "Ses",
  SMS: "SMS",
  "Mobile Push Notifications": "Mobil anlık bildirim",
  Unassigned: "Atanmamış",
};

const VISITOR_LABELS: Record<string, string> = {
  new: "Yeni",
  returning: "Geri dönen",
};

/*
 * GA4's `country` dimension is an English name, not a code. The English
 * names Intl knows are mapped back to their region code once, and the code
 * read out in the UI's language (in English, the name GA4 sent). GA4 already says "Türkiye", which is not an English
 * Intl name, so it falls through unchanged -- and is already right.
 */
let englishToRegion: Map<string, string> | null = null;

function countryLabel(value: string): string {
  if (!englishToRegion) {
    englishToRegion = new Map();
    const english = new Intl.DisplayNames(["en"], { type: "region" });
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (const first of letters) {
      for (const second of letters) {
        const code = first + second;
        let name: string | undefined;
        try {
          name = english.of(code);
        } catch {
          continue;
        }
        // `of` echoes an unknown code back; only real names are useful.
        if (name && name !== code) englishToRegion.set(name, code);
      }
    }
  }
  const code = englishToRegion.get(value);
  return code ? formatRegionName(code, value) : value;
}

function fromMap(labels: Record<string, string>, value: string): string {
  if (getLocale() === "en") return value;
  return labels[value] ? t(labels[value]) : value;
}

export function ga4ValueLabel(field: string, value: string): string {
  switch (field) {
    case "sessionDefaultChannelGroup":
      return fromMap(CHANNEL_LABELS, value);
    case "deviceCategory":
      return deviceLabel(value);
    case "newVsReturning":
      return fromMap(VISITOR_LABELS, value);
    case "country":
      return countryLabel(value);
    default:
      return value;
  }
}
