import { afterEach, expect, it } from "vitest";
import { ga4ValueLabel } from "./ga4ValueLabels";
import { getLocale, setLocale, type Locale } from "@/shared/i18n";
const initialLocale = getLocale();
afterEach(() => setLocale(initialLocale));
it.each<[Locale, string, string]>([
  ["tr", "Organik arama", "Geri dönen"],
  ["en", "Organic Search", "returning"],
  ["de", "Organische Suche", "Wiederkehrend"],
  ["fr", "Recherche organique", "Récurrent"],
  ["it", "Ricerca organica", "Di ritorno"],
  ["pt", "Pesquisa orgânica", "Recorrente"],
])(
  "UX-07 localizes built-in Analytics values in %s and preserves unknown provider values",
  (locale, channel, visitor) => {
    setLocale(locale);
    expect(ga4ValueLabel("sessionDefaultChannelGroup", "Organic Search")).toBe(
      channel,
    );
    expect(ga4ValueLabel("newVsReturning", "returning")).toBe(visitor);
    expect(
      ga4ValueLabel("sessionDefaultChannelGroup", "Custom provider channel"),
    ).toBe("Custom provider channel");
    expect(ga4ValueLabel("newVsReturning", "custom")).toBe("custom");
  },
);
