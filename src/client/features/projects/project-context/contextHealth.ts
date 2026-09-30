import {
  PROJECT_CONTEXT_SECTION_KEYS,
  PROJECT_CONTEXT_SECTION_LABELS,
  type ProjectContextSectionKey,
} from "@/types/schemas/projectContext";

/** What a piece of the setup is doing right now. */
export type HealthState = "done" | "todo" | "loading" | "error";

export type HealthItemId =
  | "sections"
  | "competitors"
  | "keyPages"
  | "searchConsole"
  | "analytics"
  | "pageSpeed";

export type HealthItem = {
  id: HealthItemId;
  label: string;
  state: HealthState;
  /** One plain sentence: what is there, or what is missing and why it matters. */
  detail: string;
  /** Where to fix it. Hash targets on this page start with "#". */
  target:
    | { kind: "anchor"; id: string }
    | { kind: "integrations"; hash: "search-console" | "google-analytics" }
    | { kind: "settings" };
  actionLabel: string;
};

type HealthInput = {
  missingSections: ProjectContextSectionKey[];
  competitorCount: number;
  keyPageCount: number;
  searchConsole: HealthState;
  analytics: HealthState;
  pageSpeed: HealthState;
};

export function buildContextHealth(input: HealthInput): HealthItem[] {
  const total = PROJECT_CONTEXT_SECTION_KEYS.length;
  const filled = total - input.missingSections.length;
  const firstMissing = input.missingSections[0];

  return [
    {
      id: "sections",
      label: "Proje tanımı",
      state: firstMissing === undefined ? "done" : "todo",
      detail:
        firstMissing === undefined
          ? `${total} bölümün hepsi dolu.`
          : `${total} bölümün ${filled} tanesi dolu. Boş olan: ${PROJECT_CONTEXT_SECTION_LABELS[firstMissing]}.`,
      target: {
        kind: "anchor",
        id: `context-${firstMissing ?? PROJECT_CONTEXT_SECTION_KEYS[0]}`,
      },
      actionLabel: firstMissing === undefined ? "Gözden geçir" : "Doldur",
    },
    {
      id: "competitors",
      label: "Rakipler",
      state: input.competitorCount > 0 ? "done" : "todo",
      detail:
        input.competitorCount > 0
          ? `${input.competitorCount} rakip kayıtlı.`
          : "Kayıtlı rakip yok; ajanlar kimle yarıştığınızı bilmeden öneri yapar.",
      target: { kind: "anchor", id: "context-competitors" },
      actionLabel: "Rakip ekle",
    },
    {
      id: "keyPages",
      label: "Önemli sayfalar",
      state: input.keyPageCount > 0 ? "done" : "todo",
      detail:
        input.keyPageCount > 0
          ? `${input.keyPageCount} önemli sayfa kayıtlı.`
          : "Önemli sayfa işaretlenmemiş; hangi sayfaların kazanç getirdiği belli değil.",
      target: { kind: "anchor", id: "context-key-pages" },
      actionLabel: "Sayfa ekle",
    },
    {
      id: "searchConsole",
      label: "Search Console",
      state: input.searchConsole,
      detail:
        input.searchConsole === "done"
          ? "Bağlı. Tıklama, gösterim ve sıra verisi okunuyor."
          : "Bağlı değil. Sıralama, arama performansı ve fırsatlar bu bağlantıya dayanır.",
      target: { kind: "integrations", hash: "search-console" },
      actionLabel: "Bağla",
    },
    {
      id: "analytics",
      label: "Google Analytics",
      state: input.analytics,
      detail:
        input.analytics === "done"
          ? "Bağlı. Organik oturumlar okunuyor."
          : "Bağlı değil. Ziyaret ve dönüşüm verisi olmadan trafik düşüşleri yorumlanamaz.",
      target: { kind: "integrations", hash: "google-analytics" },
      actionLabel: "Bağla",
    },
    {
      id: "pageSpeed",
      label: "PageSpeed anahtarı",
      state: input.pageSpeed,
      detail:
        input.pageSpeed === "done"
          ? "Anahtar tanımlı. Hız ölçümleri kota sorunu olmadan çalışır."
          : "Anahtar yok. Hız ölçümü Google'ın ortak kotasına düşer ve çoğu zaman 429 ile durur.",
      target: { kind: "settings" },
      actionLabel: "Anahtar gir",
    },
  ];
}

/** Items that are finished, out of those that could be judged. */
export function healthProgress(items: HealthItem[]): {
  done: number;
  total: number;
} {
  return {
    done: items.filter((item) => item.state === "done").length,
    total: items.length,
  };
}
