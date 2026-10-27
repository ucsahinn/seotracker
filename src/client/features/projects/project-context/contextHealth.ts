import {
  PROJECT_CONTEXT_SECTION_KEYS,
  PROJECT_CONTEXT_SECTION_LABELS,
  type ProjectContextSectionKey,
} from "@/types/schemas/projectContext";
import { t } from "@/shared/i18n";

/** What a piece of the setup is doing right now. */
export type HealthState = "done" | "todo" | "loading" | "error";

export type HealthItemId =
  | "sections"
  | "competitors"
  | "keyPages"
  | "searchConsole"
  | "analytics"
  | "pageSpeed"
  | "audit"
  | "agent";

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
    | { kind: "settings" }
    | { kind: "audit" }
    | { kind: "agent" };
  actionLabel: string;
  /**
   * Recommended but not part of the shared setup checklist
   * (`shared/projectSetup`), so not counted: the dashboard and this card
   * have to give the same "x / y".
   */
  optional?: boolean;
};

type HealthInput = {
  missingSections: ProjectContextSectionKey[];
  competitorCount: number;
  keyPageCount: number;
  searchConsole: HealthState;
  analytics: HealthState;
  pageSpeed: HealthState;
  audit: HealthState;
  agent: HealthState;
};

export function buildContextHealth(input: HealthInput): HealthItem[] {
  const total = PROJECT_CONTEXT_SECTION_KEYS.length;
  const filled = total - input.missingSections.length;
  const firstMissing = input.missingSections[0];

  return [
    {
      id: "sections",
      label: t("Proje tanımı"),
      state: firstMissing === undefined ? "done" : "todo",
      detail:
        firstMissing === undefined
          ? t("{count} bölümün hepsi dolu.", { count: total })
          : t("{total} bölümün {filled} tanesi dolu. Boş olan: {missing}.", {
              total,
              filled,
              missing: t(PROJECT_CONTEXT_SECTION_LABELS[firstMissing]),
            }),
      target: {
        kind: "anchor",
        id: `context-${firstMissing ?? PROJECT_CONTEXT_SECTION_KEYS[0]}`,
      },
      actionLabel: firstMissing === undefined ? t("Gözden geçir") : t("Doldur"),
    },
    {
      id: "competitors",
      label: t("Rakipler"),
      state: input.competitorCount > 0 ? "done" : "todo",
      detail:
        input.competitorCount > 0
          ? t("{count} rakip kayıtlı.", { count: input.competitorCount })
          : t("Rakip yok. Ajan, kimle yarıştığınızı bilmeden öneri yapar."),
      target: { kind: "anchor", id: "context-competitors" },
      actionLabel: t("Rakip ekle"),
      optional: true,
    },
    {
      id: "keyPages",
      label: t("Önemli sayfalar"),
      state: input.keyPageCount > 0 ? "done" : "todo",
      detail:
        input.keyPageCount > 0
          ? t("{count} önemli sayfa kayıtlı.", { count: input.keyPageCount })
          : t(
              "Önemli sayfa işaretlenmemiş. Hangi sayfaların kazanç getirdiği belli değil.",
            ),
      target: { kind: "anchor", id: "context-key-pages" },
      actionLabel: t("Sayfa ekle"),
      optional: true,
    },
    {
      id: "searchConsole",
      label: "Search Console",
      state: input.searchConsole,
      detail:
        input.searchConsole === "done"
          ? t("Bağlı. Tıklama, gösterim ve sıra verisi okunuyor.")
          : t(
              "Bağlı değil. Sıralama, arama performansı ve fırsatlar bu bağlantıya dayanır.",
            ),
      target: { kind: "integrations", hash: "search-console" },
      actionLabel: t("Bağla"),
    },
    {
      id: "analytics",
      label: "Analytics",
      state: input.analytics,
      detail:
        input.analytics === "done"
          ? t("Bağlı. Organik oturumlar okunuyor.")
          : t(
              "Bağlı değil. Ziyaret ve dönüşüm verisi olmadan trafik düşüşleri yorumlanamaz.",
            ),
      target: { kind: "integrations", hash: "google-analytics" },
      actionLabel: t("Bağla"),
    },
    {
      id: "pageSpeed",
      label: t("PageSpeed anahtarı"),
      state: input.pageSpeed,
      detail:
        input.pageSpeed === "done"
          ? t("Anahtar tanımlı. Hız ölçümleri kota sorunu olmadan çalışır.")
          : t(
              "Anahtar yok. Hız ölçümü Google'ın ortak kotasına takılıyor ve çoğu zaman yarıda kalır.",
            ),
      target: { kind: "settings" },
      actionLabel: t("Anahtar gir"),
    },
    {
      id: "audit",
      label: t("Güncel denetim"),
      state: input.audit,
      detail:
        input.audit === "done"
          ? t("Sitenizin son 7 gün içinde tamamlanmış bir denetimi var.")
          : t(
              "Son 7 günde bu sitenin tamamlanmış denetimi yok. Başka bir adresin denetimi sayılmaz.",
            ),
      target: { kind: "audit" },
      actionLabel: t("Denetle"),
    },
    {
      id: "agent",
      label: t("Yapay zeka ajanı"),
      state: input.agent,
      detail:
        input.agent === "done"
          ? t("Bir ajan bağlandı ve en az bir araç çağırdı.")
          : t("Henüz hiçbir ajan bağlanmadı."),
      target: { kind: "agent" },
      actionLabel: t("Bağla"),
    },
  ];
}

/** Checklist items finished, out of the checklist (optional rows are not counted). */
export function healthProgress(items: HealthItem[]): {
  done: number;
  total: number;
} {
  const counted = items.filter((item) => !item.optional);
  return {
    done: counted.filter((item) => item.state === "done").length,
    total: counted.length,
  };
}
