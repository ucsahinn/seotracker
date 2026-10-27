import {
  PROJECT_CONTEXT_SECTION_KEYS,
  PROJECT_CONTEXT_SECTION_LABELS,
  type ProjectContextSectionKey,
} from "@/types/schemas/projectContext";
import { formatCount } from "@/shared/format";
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
  projectInfo?: HealthState;
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
      state:
        input.projectInfo ?? (firstMissing === undefined ? "done" : "todo"),
      detail:
        firstMissing === undefined
          ? t("{count} bölümün hepsi dolu.", { count: total })
          : t("{total} bölümün {filled} tanesi dolu. Boş olan: {missing}.", {
              total: formatCount(total),
              filled: formatCount(filled),
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
          : t(
              "İsteğe bağlı rakip notu eklenmemiş. Bu liste rakip sıralaması ölçmez.",
            ),
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
              "İsteğe bağlı sayfa listesi boş. Sayfa rolleri sizin notlarınızdır; ölçülen dönüşüm değildir.",
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
          ? t(
              "Search Console bağlantısı kayıtlı. Veri durumunu Arama performansında görün.",
            )
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
          ? t(
              "Analytics bağlantısı kayıtlı. Veri durumunu Analytics ekranında görün.",
            )
          : t(
              "Bağlı değil. Oturum ve dönüşüm analizi için Analytics bağlayın; arama tıklamalarını Search Console ile inceleyebilirsiniz.",
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
          ? t(
              "Anahtar kayıtlı. Google kotası veya hizmet hatası hız ölçümünü yine engelleyebilir.",
            )
          : t(
              "Anahtar yok. Ortak Google kotası hız ölçümünü sınırlayabilir; Ayarlar’dan kendi anahtarınızı ekleyin.",
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
          ? t(
              "Son yedi günde başlatılıp tamamlanmış bu siteye ait denetim var.",
            )
          : t(
              "Son yedi günde başlatılıp tamamlanmış bu-site denetimi yok. Site denetiminden yeni bir denetim başlatın.",
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
          ? t("Bu kurulumda bir ajan en az bir araç kullandı.")
          : t(
              "Bu kurulumda kayıtlı araç çağrısı yok. Ajan kurulumu adımlarını izleyin.",
            ),
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
