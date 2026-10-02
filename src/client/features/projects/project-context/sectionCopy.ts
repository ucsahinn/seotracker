import type { ProjectContextSectionKey } from "@/types/schemas/projectContext";

export const SECTION_HINTS: Record<ProjectContextSectionKey, string> = {
  business_overview: "Ne satıyorsunuz, kim alıyor, nerede.",
  current_goal: "Şu anda neyin peşindesiniz ve ne zamana kadar.",
  positioning: "Biri neden alternatifler yerine sizi seçsin.",
  writing_preferences:
    "Üslup, kullanılmayacak kelimeler, girilmeyecek konular.",
};

export const SECTION_PLACEHOLDERS: Record<ProjectContextSectionKey, string> = {
  business_overview:
    "örn. Bağımsız restoranlar için rezervasyon yazılımı. Alıcılar pazarlamacı değil, işletme sahipleri.",
  current_goal:
    "örn. Dördüncü çeyreğe kadar organik üyelikleri ikiye katlamak. Karşılaştırma sayfaları şu anki öncelik.",
  positioning:
    "örn. Bir öğleden sonrada kurulan tek rezervasyon aracı. Mevcut rakiplerden ucuz, kendin yap çözümlerden basit.",
  writing_preferences:
    "örn. Sade ve doğrudan, abartı yok. “Kusursuz” ya da “devrim niteliğinde” yazmayın. Rakip fiyatlarına girmeyin.",
};
