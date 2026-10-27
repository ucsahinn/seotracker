/**
 * Deterministic demo dataset for the "Örnek site" project.
 *
 * Pure functions, no I/O and no Node-only imports: `seed-demo.ts` writes the
 * archive tables from it, and a screenshot session can import the same
 * module into the worker to stand in for the Search Console and Analytics
 * APIs, so what the archive holds and what the live screens show agree.
 *
 * Nothing here is real: the domain, queries, pages and every number are
 * invented for a Turkish home-textile shop with a blog.
 */

export const DEMO_DOMAIN = "ornek-site.com";
export const DEMO_ORIGIN = `https://${DEMO_DOMAIN}`;
export const DEMO_PROJECT_NAME = "Örnek site";
export const DEMO_SITE_URL = `sc-domain:${DEMO_DOMAIN}`;
export const DEMO_GA4_PROPERTY_ID = "properties/481516234";

/**
 * The newest day of demo data: yesterday, so Analytics (a day behind) has no
 * empty tail. Search Console asks for three days less on its own.
 */
export const DEMO_END_DATE = new Date(Date.now() - 86_400_000)
  .toISOString()
  .slice(0, 10);
/** Sixteen months back, which is all Google ever serves. */
export const DEMO_START_DATE = new Date(Date.now() - 488 * 86_400_000)
  .toISOString()
  .slice(0, 10);

type PageKind = "home" | "category" | "product" | "blog" | "info";
type Season = "neutral" | "winter" | "summer";

export type DemoPage = {
  path: string;
  kind: PageKind;
  title: string;
  description: string | null;
  h1: string | null;
  wordCount: number;
  inSitemap: boolean;
  depth: number;
};

const P = (
  path: string,
  kind: PageKind,
  title: string,
  description: string | null,
  wordCount: number,
  depth: number,
  h1: string | null = title.split(" | ")[0] ?? title,
  inSitemap = true,
): DemoPage => ({
  path,
  kind,
  title,
  description,
  h1,
  wordCount,
  inSitemap,
  depth,
});

export const DEMO_PAGES: DemoPage[] = [
  P(
    "/",
    "home",
    "Örnek Site | Ev Tekstili ve Yatak Odası Ürünleri",
    "Nevresim takımı, yastık, yorgan, battaniye ve perde. Türkiye'nin her yerine ücretsiz kargo.",
    420,
    0,
    "Evinize yakışan tekstil",
  ),
  P(
    "/nevresim-takimi",
    "category",
    "Nevresim Takımı Modelleri ve Fiyatları | Örnek Site",
    "Pamuklu, saten ve ranforce nevresim takımları. Çift kişilik ve tek kişilik seçenekler.",
    610,
    1,
  ),
  P(
    "/nevresim-takimi/cift-kisilik",
    "product",
    "Çift Kişilik Nevresim Takımı | Örnek Site",
    "Çift kişilik nevresim takımı modelleri, %100 pamuk, 200x220 ölçü.",
    540,
    2,
  ),
  P(
    "/nevresim-takimi/tek-kisilik",
    "product",
    "Tek Kişilik Nevresim Takımı | Örnek Site",
    null,
    480,
    2,
  ),
  P(
    "/nevresim-takimi/pamuklu",
    "product",
    "Pamuklu Nevresim Takımı | Örnek Site",
    "%100 pamuklu nevresim takımları; nefes alan kumaş, kolay ütü.",
    520,
    2,
  ),
  P(
    "/nevresim-takimi/saten",
    "product",
    "Saten Nevresim Takımı Modelleri ve Fiyatları, Tüm Renkler ve Ölçüler | Örnek Site",
    "Saten nevresim takımı; parlak doku, düşük tüylenme.",
    500,
    2,
  ),
  P(
    "/yastik",
    "category",
    "Yastık Modelleri | Örnek Site",
    "Visco, kaz tüyü ve elyaf yastık çeşitleri.",
    450,
    1,
  ),
  P(
    "/yastik/visco-yastik",
    "product",
    "Visco Yastık | Örnek Site",
    "Boyun destekli visco yastık modelleri.",
    430,
    2,
  ),
  P(
    "/yastik/kaz-tuyu-yastik",
    "product",
    "Kaz Tüyü Yastık | Örnek Site",
    null,
    410,
    2,
  ),
  P(
    "/yastik-kilifi",
    "product",
    "Yastık Kılıfı | Örnek Site",
    "50x70 ve 60x80 pamuklu yastık kılıfları.",
    320,
    1,
  ),
  P(
    "/battaniye",
    "category",
    "Battaniye Modelleri ve Fiyatları | Örnek Site",
    "Pamuklu, polar ve yün battaniyeler. Tek ve çift kişilik.",
    580,
    1,
  ),
  P(
    "/battaniye/pamuklu-battaniye",
    "product",
    "Pamuklu Battaniye | Örnek Site",
    "Dört mevsim kullanılan pamuklu battaniye modelleri.",
    460,
    2,
  ),
  P(
    "/battaniye/polar-battaniye",
    "product",
    "Polar Battaniye | Örnek Site",
    null,
    440,
    2,
  ),
  P(
    "/pike-takimi",
    "category",
    "Pike Takımı | Örnek Site",
    "Yazlık pike takımları, pamuklu ve ince dokuma.",
    470,
    1,
  ),
  P(
    "/yorgan",
    "category",
    "Yorgan Modelleri ve Fiyatları | Örnek Site",
    "Kaz tüyü, elyaf ve yün yorgan çeşitleri.",
    560,
    1,
  ),
  P(
    "/yorgan/kaz-tuyu-yorgan",
    "product",
    "Kaz Tüyü Yorgan | Örnek Site",
    "Hafif ve sıcak tutan kaz tüyü yorganlar.",
    500,
    2,
  ),
  P(
    "/yorgan/elyaf-yorgan",
    "product",
    "Elyaf Yorgan | Örnek Site",
    "Alerjik olmayan, makinede yıkanabilir elyaf yorgan.",
    430,
    2,
  ),
  P(
    "/havlu",
    "category",
    "Havlu ve Bornoz | Örnek Site",
    "Pamuklu havlu setleri ve bornozlar.",
    440,
    1,
  ),
  P(
    "/havlu/bornoz",
    "product",
    "Bornoz Modelleri | Örnek Site",
    "Erkek ve kadın bornoz modelleri, %100 pamuk.",
    400,
    2,
  ),
  P(
    "/havlu/el-havlusu",
    "product",
    "Havlu ve Bornoz | Örnek Site",
    null,
    290,
    2,
    "El havlusu",
  ),
  P(
    "/perde",
    "category",
    "Perde Modelleri ve Fiyatları | Örnek Site",
    "Tül, fon ve blackout perde modelleri; isteğe göre dikim.",
    620,
    1,
  ),
  P(
    "/perde/tul-perde",
    "product",
    "Tül Perde | Örnek Site",
    "Düz ve desenli tül perde seçenekleri.",
    450,
    2,
  ),
  P(
    "/perde/fon-perde",
    "product",
    "Fon Perde | Örnek Site",
    "Işık geçirmeyen fon perde modelleri.",
    440,
    2,
  ),
  P(
    "/hali",
    "category",
    "Halı Modelleri | Örnek Site",
    "Salon, yatak odası ve çocuk odası halıları.",
    500,
    1,
  ),
  P(
    "/hali/yolluk",
    "product",
    "Halı Modelleri | Örnek Site",
    null,
    330,
    2,
    "Yolluk halı",
  ),
  P(
    "/masa-ortusu",
    "category",
    "Masa Örtüsü | Örnek Site",
    "Leke tutmayan masa örtüsü modelleri.",
    360,
    1,
  ),
  P(
    "/kampanya",
    "category",
    "Kampanyalar | Örnek Site",
    "Bu haftanın indirimleri.",
    180,
    1,
  ),
  P(
    "/yeni-gelenler",
    "category",
    "Yeni Gelenler | Örnek Site",
    "Sezonun yeni ürünleri.",
    150,
    1,
  ),
  P(
    "/blog",
    "blog",
    "Blog | Örnek Site",
    "Ev tekstili bakım ve seçim rehberleri.",
    260,
    1,
  ),
  P(
    "/blog/nevresim-nasil-yikanir",
    "blog",
    "Nevresim Nasıl Yıkanır? Adım Adım Rehber | Örnek Site",
    "Pamuklu ve saten nevresimler kaç derecede yıkanır, nasıl kurutulur.",
    1480,
    2,
  ),
  P(
    "/blog/perde-olcusu-nasil-alinir",
    "blog",
    "Perde Ölçüsü Nasıl Alınır? | Örnek Site",
    "Pencere ve ray ölçüsü alma, pile payı hesabı.",
    1320,
    2,
  ),
  P(
    "/blog/yastik-secimi-rehberi",
    "blog",
    "Doğru Yastık Nasıl Seçilir? | Örnek Site",
    "Uyku pozisyonuna göre yastık yüksekliği ve dolgu seçimi.",
    1650,
    2,
  ),
  P(
    "/blog/yorgan-cesitleri",
    "blog",
    "Yorgan Çeşitleri: Kaz Tüyü mü, Elyaf mı? | Örnek Site",
    null,
    1210,
    2,
  ),
  P(
    "/blog/battaniye-bakimi",
    "blog",
    "Battaniye Bakımı ve Yıkama | Örnek Site",
    "Polar ve yün battaniyeler nasıl yıkanır.",
    980,
    2,
  ),
  P(
    "/blog/bornoz-secerken",
    "blog",
    "Bornoz Seçerken Nelere Dikkat Edilmeli? | Örnek Site",
    "Gramaj, kumaş ve beden rehberi.",
    870,
    2,
  ),
  P(
    "/blog/hali-temizligi",
    "blog",
    "Evde Halı Temizliği | Örnek Site",
    "Leke çıkarma ve düzenli bakım.",
    1120,
    2,
  ),
  P(
    "/blog/yatak-odasi-dekorasyon-fikirleri",
    "blog",
    "Yatak Odası Dekorasyon Fikirleri | Örnek Site",
    "Renk uyumu, tekstil seçimi ve küçük dokunuşlar.",
    1540,
    2,
  ),
  P(
    "/blog/pamuk-saten-farki",
    "blog",
    "Pamuk Saten ile Ranforce Arasındaki Fark | Örnek Site",
    null,
    940,
    2,
  ),
  P(
    "/blog/kis-icin-yatak-tekstili",
    "blog",
    "Kış İçin Yatak Tekstili Önerileri | Örnek Site",
    "Soğuk aylar için yorgan, battaniye ve nevresim seçimi.",
    1030,
    2,
  ),
  P(
    "/blog/Nevresim_Olculeri",
    "blog",
    "Nevresim Ölçüleri Tablosu | Örnek Site",
    "Tek, çift ve king size nevresim ölçüleri.",
    760,
    3,
    "Nevresim ölçüleri",
    false,
  ),
  P(
    "/hakkimizda",
    "info",
    "Hakkımızda | Örnek Site",
    "2016'dan beri ev tekstili.",
    380,
    1,
  ),
  P("/iletisim", "info", "İletişim | Örnek Site", null, 120, 1),
  P(
    "/sikca-sorulan-sorular",
    "info",
    "Sıkça Sorulan Sorular | Örnek Site",
    "Kargo, iade ve ödeme soruları.",
    900,
    1,
  ),
  P(
    "/kargo-ve-iade",
    "info",
    "Kargo ve İade | Örnek Site",
    "Kargo süreleri ve 14 gün iade.",
    640,
    2,
  ),
  P(
    "/gizlilik-politikasi",
    "info",
    "Gizlilik Politikası | Örnek Site",
    null,
    1400,
    3,
    null,
  ),
  P(
    "/magazalar",
    "info",
    "Mağazalar | Örnek Site",
    "Mağaza adresleri ve çalışma saatleri.",
    210,
    2,
  ),
  P("/hesabim", "info", "Hesabım | Örnek Site", null, 60, 2, null, false),
];

export const DEMO_PAGE_BY_PATH = new Map(DEMO_PAGES.map((p) => [p.path, p]));

export type DemoQuery = {
  query: string;
  page: string;
  /** Mean daily impressions before seasonality and growth. */
  base: number;
  /** Mean position before drift. */
  position: number;
  season: Season;
  /** The query only exists from this day index on (a new page). */
  fromDay: number;
  /** Index into DEMO_QUERIES, used by the noise hash. */
  index: number;
  /** The query stops being shown after this day index (a lost query). */
  toDay?: number;
  /** Shown but never clicked (a result nobody picks). */
  clickless?: boolean;
};

type Topic = {
  name: string;
  page: string;
  season: Season;
  weight: number;
  position: number;
};

const TOPICS: Topic[] = [
  {
    name: "nevresim takımı",
    page: "/nevresim-takimi",
    season: "neutral",
    weight: 1,
    position: 4.2,
  },
  {
    name: "çift kişilik nevresim takımı",
    page: "/nevresim-takimi/cift-kisilik",
    season: "neutral",
    weight: 0.72,
    position: 5.1,
  },
  {
    name: "battaniye",
    page: "/battaniye",
    season: "winter",
    weight: 0.7,
    position: 6.4,
  },
  {
    name: "yorgan",
    page: "/yorgan",
    season: "winter",
    weight: 0.66,
    position: 7.2,
  },
  {
    name: "perde",
    page: "/perde",
    season: "neutral",
    weight: 0.6,
    position: 9.8,
  },
  {
    name: "yastık",
    page: "/yastik",
    season: "neutral",
    weight: 0.55,
    position: 8.3,
  },
  {
    name: "pamuklu nevresim takımı",
    page: "/nevresim-takimi/pamuklu",
    season: "neutral",
    weight: 0.42,
    position: 3.6,
  },
  {
    name: "saten nevresim",
    page: "/nevresim-takimi/saten",
    season: "neutral",
    weight: 0.38,
    position: 6.9,
  },
  {
    name: "kaz tüyü yorgan",
    page: "/yorgan/kaz-tuyu-yorgan",
    season: "winter",
    weight: 0.4,
    position: 5.4,
  },
  {
    name: "polar battaniye",
    page: "/battaniye/polar-battaniye",
    season: "winter",
    weight: 0.36,
    position: 11.5,
  },
  {
    name: "tül perde",
    page: "/perde/tul-perde",
    season: "neutral",
    weight: 0.34,
    position: 12.1,
  },
  {
    name: "fon perde",
    page: "/perde/fon-perde",
    season: "neutral",
    weight: 0.3,
    position: 14.6,
  },
  {
    name: "visco yastık",
    page: "/yastik/visco-yastik",
    season: "neutral",
    weight: 0.3,
    position: 7.7,
  },
  {
    name: "havlu",
    page: "/havlu",
    season: "neutral",
    weight: 0.32,
    position: 16.2,
  },
  {
    name: "bornoz",
    page: "/havlu/bornoz",
    season: "winter",
    weight: 0.28,
    position: 9.1,
  },
  {
    name: "pike takımı",
    page: "/pike-takimi",
    season: "summer",
    weight: 0.3,
    position: 6.6,
  },
  {
    name: "halı",
    page: "/hali",
    season: "neutral",
    weight: 0.3,
    position: 23.4,
  },
  {
    name: "tek kişilik nevresim",
    page: "/nevresim-takimi/tek-kisilik",
    season: "neutral",
    weight: 0.26,
    position: 8.8,
  },
  {
    name: "kaz tüyü yastık",
    page: "/yastik/kaz-tuyu-yastik",
    season: "neutral",
    weight: 0.22,
    position: 10.4,
  },
  {
    name: "elyaf yorgan",
    page: "/yorgan/elyaf-yorgan",
    season: "winter",
    weight: 0.2,
    position: 6.1,
  },
  {
    name: "pamuklu battaniye",
    page: "/battaniye/pamuklu-battaniye",
    season: "winter",
    weight: 0.2,
    position: 8.9,
  },
  {
    name: "yastık kılıfı",
    page: "/yastik-kilifi",
    season: "neutral",
    weight: 0.18,
    position: 13.3,
  },
  {
    name: "masa örtüsü",
    page: "/masa-ortusu",
    season: "neutral",
    weight: 0.18,
    position: 18.7,
  },
  {
    name: "yolluk halı",
    page: "/hali/yolluk",
    season: "neutral",
    weight: 0.14,
    position: 21.2,
  },
  {
    name: "el havlusu",
    page: "/havlu/el-havlusu",
    season: "neutral",
    weight: 0.1,
    position: 15.5,
  },
];

const MODIFIERS: Array<{
  fmt: (t: string) => string;
  weight: number;
  positionShift: number;
}> = [
  { fmt: (t) => t, weight: 1, positionShift: 0 },
  { fmt: (t) => `${t} fiyatları`, weight: 0.34, positionShift: 2.5 },
  { fmt: (t) => `${t} modelleri`, weight: 0.3, positionShift: 1.5 },
  { fmt: (t) => `ucuz ${t}`, weight: 0.19, positionShift: 6 },
  { fmt: (t) => `${t} çeşitleri`, weight: 0.14, positionShift: 3 },
  { fmt: (t) => `en iyi ${t}`, weight: 0.11, positionShift: 8 },
  { fmt: (t) => `${t} yorumları`, weight: 0.07, positionShift: 12 },
  { fmt: (t) => `${t} indirim`, weight: 0.09, positionShift: 5 },
  { fmt: (t) => `${t} seti`, weight: 0.1, positionShift: 4 },
];

const BLOG_QUERIES: Array<[string, string, number, number]> = [
  ["nevresim nasıl yıkanır", "/blog/nevresim-nasil-yikanir", 0.5, 2.3],
  ["nevresim kaç derecede yıkanır", "/blog/nevresim-nasil-yikanir", 0.3, 3.1],
  ["saten nevresim nasıl yıkanır", "/blog/nevresim-nasil-yikanir", 0.12, 5.8],
  ["perde ölçüsü nasıl alınır", "/blog/perde-olcusu-nasil-alinir", 0.46, 1.9],
  ["perde ölçüsü hesaplama", "/blog/perde-olcusu-nasil-alinir", 0.22, 4.4],
  ["pile payı nasıl hesaplanır", "/blog/perde-olcusu-nasil-alinir", 0.1, 7.3],
  ["yastık nasıl seçilir", "/blog/yastik-secimi-rehberi", 0.34, 3.2],
  ["yan yatanlar için yastık", "/blog/yastik-secimi-rehberi", 0.24, 6.5],
  ["boyun ağrısı için yastık", "/blog/yastik-secimi-rehberi", 0.3, 9.4],
  ["yorgan çeşitleri", "/blog/yorgan-cesitleri", 0.28, 4.1],
  ["kaz tüyü yorgan mu elyaf mı", "/blog/yorgan-cesitleri", 0.16, 2.8],
  ["battaniye nasıl yıkanır", "/blog/battaniye-bakimi", 0.26, 3.9],
  ["polar battaniye yıkama", "/blog/battaniye-bakimi", 0.12, 5.2],
  ["bornoz seçerken", "/blog/bornoz-secerken", 0.08, 6.7],
  ["bornoz gramajı", "/blog/bornoz-secerken", 0.1, 4.9],
  ["halı temizliği evde", "/blog/hali-temizligi", 0.3, 5.6],
  ["halı lekesi nasıl çıkar", "/blog/hali-temizligi", 0.36, 8.1],
  [
    "yatak odası dekorasyon fikirleri",
    "/blog/yatak-odasi-dekorasyon-fikirleri",
    0.44,
    7.9,
  ],
  [
    "küçük yatak odası dekorasyonu",
    "/blog/yatak-odasi-dekorasyon-fikirleri",
    0.26,
    11.2,
  ],
  ["pamuk saten ranforce farkı", "/blog/pamuk-saten-farki", 0.2, 2.6],
  ["ranforce nedir", "/blog/pamuk-saten-farki", 0.34, 6.3],
  ["kışlık nevresim", "/blog/kis-icin-yatak-tekstili", 0.18, 9.7],
  ["kış için yorgan", "/blog/kis-icin-yatak-tekstili", 0.14, 12.4],
  ["nevresim ölçüleri", "/blog/Nevresim_Olculeri", 0.4, 5.5],
  ["çift kişilik nevresim ölçüsü", "/blog/Nevresim_Olculeri", 0.22, 4.2],
  ["king size nevresim ölçüsü", "/blog/Nevresim_Olculeri", 0.12, 6.9],
];

const BRAND_QUERIES: Array<[string, string, number, number]> = [
  ["örnek site", "/", 0.9, 1.0],
  ["örnek site nevresim", "/nevresim-takimi", 0.14, 1.2],
  ["örnek site kampanya", "/kampanya", 0.08, 1.1],
  ["örnek site iletişim", "/iletisim", 0.05, 1.0],
  ["örnek site mağazaları", "/magazalar", 0.04, 1.3],
];

const TOP_BASE = 620;

function buildQueries(): DemoQuery[] {
  const out: DemoQuery[] = [];
  const seen = new Set<string>();
  // A topic plus a modifier can spell a blog query ("yorgan çeşitleri"); the
  // archive keys on the query text, so the first one wins.
  const push = (q: Omit<DemoQuery, "index">) => {
    if (seen.has(q.query)) return;
    seen.add(q.query);
    out.push({ ...q, index: out.length });
  };
  TOPICS.forEach((topic, ti) => {
    const topicBase = TOP_BASE * topic.weight;
    MODIFIERS.forEach((mod, mi) => {
      // Every topic has the bare query; the long tail thins out down the list.
      if (mi > 0 && (ti * 7 + mi * 3) % 5 === 0) return;
      push({
        query: mod.fmt(topic.name),
        page: topic.page,
        base: topicBase * mod.weight,
        position: topic.position + mod.positionShift,
        season: topic.season,
        fromDay: 0,
      });
    });
  });
  for (const [query, page, weight, position] of BLOG_QUERIES) {
    // The winter guide and the size table were published part-way through.
    const fromDay =
      page === "/blog/kis-icin-yatak-tekstili"
        ? 110
        : page === "/blog/Nevresim_Olculeri"
          ? 300
          : 0;
    push({
      query,
      page,
      base: TOP_BASE * weight,
      position,
      season: page.includes("kis") ? "winter" : "neutral",
      fromDay,
    });
  }
  for (const [query, page, weight, position] of BRAND_QUERIES) {
    push({
      query,
      page,
      base: TOP_BASE * 0.25 * weight,
      position,
      season: "neutral",
      fromDay: 0,
    });
  }
  return out;
}

export const DEMO_QUERIES: DemoQuery[] = buildQueries();

/*
 * The long tail: rare queries with a handful of impressions a day, mostly on
 * page two and beyond, a few on the edge of page one. They exist only in the
 * live Search Console stand-in -- not in the GA4 model and not seeded into
 * the archive -- so the Search performance screen meets what a real property
 * looks like: more than a thousand query+page rows, sorted by clicks, where
 * the striking-distance queries have almost no clicks and sit far down the
 * table. Some of them rank with two pages, so query+page outnumbers query.
 */
const TAIL_MODIFIERS: Array<[string, number, number]> = [
  // [pattern ("%" = topic), position shift, weight]
  ["% nasıl temizlenir", 4, 1],
  ["% kaç derecede yıkanır", 9, 0.8],
  ["% ölçüleri", 3, 1.2],
  ["% renkleri", 6, 0.9],
  ["% beyaz", 7, 0.9],
  ["% gri", 10, 0.7],
  ["% lacivert", 14, 0.5],
  ["% pamuk", 5, 1],
  ["% 160x220", 11, 0.6],
  ["% 200x220", 12, 0.6],
  ["% istanbul", 18, 0.5],
  ["% ankara", 22, 0.4],
  ["% izmir", 24, 0.4],
  ["% kampanyalı", 9, 0.6],
  ["% en ucuz", 16, 0.7],
  ["% online satın al", 8, 0.8],
  ["% kapıda ödeme", 20, 0.4],
  ["% hediye", 13, 0.5],
  ["% çocuk", 15, 0.6],
  ["% bebek", 17, 0.5],
  ["% organik", 10, 0.5],
  ["% yazlık", 19, 0.4],
  ["% kışlık", 12, 0.5],
  ["% nedir", 6, 0.7],
  ["% nasıl seçilir", 5, 0.8],
  ["% hangisi daha iyi", 9, 0.6],
  ["% markaları", 21, 0.5],
  ["% tavsiye", 14, 0.5],
  ["% yorumları 2026", 26, 0.3],
  ["% outlet", 23, 0.4],
  ["% toptan", 30, 0.3],
  ["% kombin", 15, 0.4],
  ["% dekorasyon", 18, 0.4],
  ["% modern", 12, 0.5],
  ["% vintage", 25, 0.3],
  ["% desenli", 11, 0.5],
  ["% düz renk", 13, 0.4],
  ["% lüks", 17, 0.4],
  ["% indirimli", 10, 0.6],
  ["% stok", 28, 0.3],
  ["% fiyat listesi", 8, 0.5],
  ["% karşılaştırma", 19, 0.3],
  ["% bakımı", 7, 0.5],
  ["% ne kadar", 9, 0.6],
  ["% kaç tl", 11, 0.6],
  ["% en iyi marka", 20, 0.4],
  ["% doğal", 16, 0.4],
  ["% antialerjik", 14, 0.4],
  ["% yıkama talimatı", 12, 0.3],
  ["% kurutma makinesi", 22, 0.3],
  ["% ütü", 27, 0.3],
  ["% leke çıkarma", 10, 0.4],
];

/** Days from DEMO_START_DATE to DEMO_END_DATE (488 back to 1 back), inclusive. */
const DEMO_DAYS = 488;

export type DemoTailQuery = DemoQuery & {
  /** Rare enough that it only shows up on some days. */
  tail: true;
};

function buildTailQueries(): DemoTailQuery[] {
  const out: DemoTailQuery[] = [];
  const known = new Set(DEMO_QUERIES.map((q) => q.query));
  let index = DEMO_QUERIES.length;
  TOPICS.forEach((topic, ti) => {
    TAIL_MODIFIERS.forEach(([pattern, shift, weight], mi) => {
      const query = pattern.replace("%", topic.name);
      if (known.has(query)) return;
      known.add(query);
      // 0.3 .. 3 impressions a day: a few dozen over 28 days.
      const base =
        (0.3 + 2.7 * hash(ti, mi, 7)) * weight * (0.6 + topic.weight);
      const position = Math.min(
        60,
        topic.position + shift * (0.6 + hash(ti, mi, 8)),
      );
      out.push({
        query,
        page: topic.page,
        base,
        position,
        season: topic.season,
        fromDay: (ti * 31 + mi * 17) % 7 === 0 ? 200 + ((ti + mi) % 150) : 0,
        index: index++,
        tail: true,
      });
      /*
       * A few queries that appeared inside the newest four weeks, and a few
       * that stopped before them: what the new and lost lists are for.
       */
      if ((ti * 31 + mi * 17) % 23 === 1) {
        out.push({
          query: `${query} yeni sezon`,
          page: topic.page,
          base: 4 + 4 * hash(ti, mi, 9),
          position,
          season: topic.season,
          fromDay: DEMO_DAYS - 22 + ((ti + mi) % 8),
          index: index++,
          tail: true,
        });
      }
      if ((ti * 13 + mi * 5) % 29 === 2) {
        out.push({
          query: `${query} eski model`,
          page: topic.page,
          base: 4 + 4 * hash(ti, mi, 10),
          position,
          season: topic.season,
          fromDay: 0,
          toDay: DEMO_DAYS - 40,
          index: index++,
          tail: true,
        });
      }
      // One in six also ranks with a second page: the blog or the parent.
      if ((ti + mi) % 6 === 0) {
        const second = topic.page.split("/").slice(0, 2).join("/");
        out.push({
          query,
          page:
            second !== topic.page
              ? second
              : (BLOG_QUERIES[(ti + mi) % BLOG_QUERIES.length]?.[1] ?? "/blog"),
          base: base * 0.4,
          position: position + 6,
          season: topic.season,
          fromDay: 0,
          index: index++,
          tail: true,
        });
      }
    });
  });
  return out;
}

/** An old campaign page still shown for a few searches nobody clicks. */
const CLICKLESS: DemoTailQuery[] = [
  "kampanya 2024 nevresim",
  "yılbaşı indirimi 2024",
  "eski kampanya kodu",
  "2024 kış kampanyası",
].map((query, i) => ({
  query,
  page: "/blog/kampanya-2024",
  base: 3 + i,
  position: 14 + i * 3,
  season: "neutral",
  fromDay: 0,
  index: 6000 + i,
  clickless: true,
  tail: true,
}));

export const DEMO_TAIL_QUERIES: DemoTailQuery[] = [
  ...buildTailQueries(),
  ...CLICKLESS,
];

/*
 * Anonymized queries: searches Google counts in the site total but never
 * names, "to protect the privacy of the user making the query". They reach
 * every table without a query dimension (date, page, country, device) and no
 * query table, which is why query rows never add up to the total.
 */
const HIDDEN_QUERIES: DemoQuery[] = DEMO_PAGES.filter(
  (p) => p.kind !== "info",
).map((p, i) => ({
  query: `\u0000hidden-${i}`,
  page: p.path,
  base: 45 + 70 * hash(i, 3, 11),
  position: 4 + 9 * hash(i, 4, 11),
  season: "neutral",
  fromDay: 0,
  index: 5000 + i,
}));

// ---------------------------------------------------------------------------
// Dates
// ---------------------------------------------------------------------------

const DAY_MS = 86_400_000;

export function toDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  return toIso(new Date(toDate(iso).getTime() + days * DAY_MS));
}

/** Day index since DEMO_START_DATE; negative before it. */
export function dayIndex(iso: string): number {
  return Math.round(
    (toDate(iso).getTime() - toDate(DEMO_START_DATE).getTime()) / DAY_MS,
  );
}

export const DEMO_TOTAL_DAYS = dayIndex(DEMO_END_DATE) + 1;

export function* eachDay(startIso: string, endIso: string): Generator<string> {
  for (let d = startIso; d <= endIso; d = addDays(d, 1)) yield d;
}

// ---------------------------------------------------------------------------
// Noise
// ---------------------------------------------------------------------------

/** Small integer hash, so every number is the same on every run. */
function hash(a: number, b: number, c = 0): number {
  let h = (a * 374761393 + b * 668265263 + c * 2246822519) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function noise(a: number, b: number, c = 0, spread = 0.25): number {
  return 1 + (hash(a, b, c) * 2 - 1) * spread;
}

// ---------------------------------------------------------------------------
// Search Console model
// ---------------------------------------------------------------------------

function seasonFactor(season: Season, iso: string): number {
  const d = toDate(iso);
  const start = Date.UTC(d.getUTCFullYear(), 0, 1);
  const doy = Math.floor((d.getTime() - start) / DAY_MS);
  const cos = (peakDoy: number) =>
    Math.cos(((doy - peakDoy) / 365) * Math.PI * 2);
  if (season === "winter") return 1 + 0.55 * cos(15);
  if (season === "summer") return 1 + 0.45 * cos(200);
  return 1 + 0.12 * cos(330);
}

function weekdayFactor(iso: string): number {
  const dow = toDate(iso).getUTCDay();
  return dow === 0 ? 0.86 : dow === 6 ? 0.91 : 1;
}

function growthFactor(day: number): number {
  return 1 + 0.38 * (day / DEMO_TOTAL_DAYS);
}

function ctrForPosition(position: number): number {
  if (position <= 1) return 0.31;
  return 0.31 * Math.exp(-0.42 * (position - 1)) + 0.006;
}

export type QueryDay = {
  impressions: number;
  clicks: number;
  position: number;
};

type DayInfo = {
  day: number;
  /** weekday x growth, shared by every query that day. */
  common: number;
  season: Record<Season, number>;
};
const dayInfoCache = new Map<string, DayInfo>();

function dayInfo(iso: string): DayInfo {
  let info = dayInfoCache.get(iso);
  if (!info) {
    const day = dayIndex(iso);
    info = {
      day,
      common: weekdayFactor(iso) * growthFactor(day),
      season: {
        neutral: seasonFactor("neutral", iso),
        winter: seasonFactor("winter", iso),
        summer: seasonFactor("summer", iso),
      },
    };
    dayInfoCache.set(iso, info);
  }
  return info;
}

/**
 * One guide that has been losing ground for half a year -- outranked, never
 * refreshed -- so the content-decay list has a real case, not a season.
 */
const DEMO_DECAYING_PAGE = "/blog/yatak-odasi-dekorasyon-fikirleri";

function decayFactor(page: string, day: number): number {
  if (page !== DEMO_DECAYING_PAGE || day < 300) return 1;
  return Math.max(0.3, 1 - (day - 300) / 220);
}

/** One query's Search Console numbers on one day. Null when it did not exist yet. */
export function queryDay(q: DemoQuery, iso: string): QueryDay | null {
  const { day, common, season } = dayInfo(iso);
  if (day < q.fromDay || day >= DEMO_TOTAL_DAYS || day < 0) return null;
  if (q.toDay !== undefined && day > q.toDay) return null;
  const expected =
    q.base *
    season[q.season] *
    common *
    decayFactor(q.page, day) *
    noise(q.index, day, 1, 0.3);
  const impressions = Math.max(0, Math.round(expected));
  if (impressions === 0) return null;
  // Slow improvement over the period plus a wobble, so the history has shape.
  const drift = -0.14 * q.position * (day / DEMO_TOTAL_DAYS);
  const wobble =
    1.6 * Math.sin(day / 37 + q.index * 1.3) * Math.min(1, q.position / 6);
  const position = Math.max(
    1,
    q.position + drift + wobble + (noise(q.index, day, 2, 0.6) - 1),
  );
  const brand = q.query.startsWith("örnek site");
  const ctr =
    (brand ? 0.52 : ctrForPosition(position)) * noise(q.index, day, 3, 0.35);
  const clicks = q.clickless
    ? 0
    : Math.min(impressions, Math.round(impressions * ctr));
  return { impressions, clicks, position: Math.round(position * 100) / 100 };
}

type Split = Array<[string, number]>;

const COUNTRIES: Split = [
  ["tur", 0.85],
  ["deu", 0.048],
  ["nld", 0.021],
  ["gbr", 0.017],
  ["fra", 0.014],
  ["aze", 0.012],
  ["usa", 0.011],
  ["aut", 0.008],
  ["bel", 0.004],
  ["che", 0.003],
  // The long list Search Console really returns: a dozen with a sliver each.
  ["swe", 0.0015],
  ["dnk", 0.0012],
  ["nor", 0.0011],
  ["ita", 0.0011],
  ["esp", 0.001],
  ["rus", 0.001],
  ["ukr", 0.001],
  ["geo", 0.001],
  ["cyp", 0.001],
  ["grc", 0.0009],
  ["bgr", 0.0009],
  ["can", 0.0008],
];
const DEVICES: Split = [
  ["MOBILE", 0.64],
  ["DESKTOP", 0.33],
  ["TABLET", 0.03],
];
/** Most impressions carry no special appearance, so this only sums to a part. */
const APPEARANCES: Split = [
  ["PRODUCT_SNIPPETS", 0.17],
  ["REVIEW_SNIPPET", 0.05],
  ["MERCHANT_LISTINGS", 0.03],
];

export type GscRequest = {
  startDate: string;
  endDate: string;
  dimensions?: string[];
  dimensionFilterGroups?: Array<{
    groupType?: string;
    filters: Array<{
      dimension: string;
      operator?: string;
      expression: string;
    }>;
  }>;
  rowLimit?: number;
  startRow?: number;
  type?: string;
  dataState?: string;
};

/**
 * Google's "fresh" days: from here on the numbers are still being counted.
 * dataState=final stops the day before; dataState=all includes them, partly
 * counted, and says where they begin in `metadata.first_incomplete_date`.
 */
export const DEMO_FIRST_INCOMPLETE_DATE = addDays(DEMO_END_DATE, -1);

/** How much of a provisional day Google has counted so far. */
/** A day the site half-vanished (a deploy that served errors), for the anomaly check. */
const DEMO_OUTAGE_DATE = addDays(DEMO_END_DATE, -12);

function provisionalShare(iso: string): number {
  if (iso === DEMO_OUTAGE_DATE) return 0.48;
  if (iso < DEMO_FIRST_INCOMPLETE_DATE) return 1;
  return iso === DEMO_FIRST_INCOMPLETE_DATE ? 0.74 : 0.41;
}

export type GscRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

function matchesFilter(
  value: string,
  operator: string | undefined,
  expression: string,
): boolean {
  const op = (operator ?? "equals").toLowerCase();
  const v = value.toLowerCase();
  const e = expression.toLowerCase();
  switch (op) {
    case "equals":
      return v === e;
    case "notequals":
      return v !== e;
    case "contains":
      return v.includes(e);
    case "notcontains":
      return !v.includes(e);
    case "includingregex":
      return new RegExp(expression, "i").test(value);
    case "excludingregex":
      return !new RegExp(expression, "i").test(value);
    default:
      return v === e;
  }
}

/**
 * A stand-in for `searchAnalytics.query`.
 *
 * Only the web search type has data, like a shop without Discover or News
 * traffic. Every dimension Google offers is honoured, including the splits
 * by country, device and search appearance, which are fixed shares of each
 * query-day rather than modelled on their own.
 */
export function gscSearchAnalytics(request: GscRequest): GscRow[] {
  if ((request.type ?? "web") !== "web") return [];
  const dims =
    request.dimensions && request.dimensions.length > 0
      ? request.dimensions
      : ["query"];
  const filters = (request.dimensionFilterGroups ?? []).flatMap(
    (group) => group.filters,
  );
  const start =
    request.startDate < DEMO_START_DATE ? DEMO_START_DATE : request.startDate;
  const newest =
    (request.dataState ?? "final").toLowerCase() === "all"
      ? DEMO_END_DATE
      : addDays(DEMO_FIRST_INCOMPLETE_DATE, -1);
  const end = request.endDate > newest ? newest : request.endDate;
  if (start > end) return [];
  // Anonymized queries are in every table without a query in it.
  const hidden =
    !dims.includes("query") && !filters.some((f) => f.dimension === "query");
  const sources: DemoQuery[] = hidden
    ? [...DEMO_QUERIES, ...DEMO_TAIL_QUERIES, ...HIDDEN_QUERIES]
    : [...DEMO_QUERIES, ...DEMO_TAIL_QUERIES];

  const wantsAppearance = dims.includes("searchAppearance");
  const splits: Array<{ dim: string; values: Split }> = [];
  for (const dim of dims) {
    if (dim === "country") splits.push({ dim, values: COUNTRIES });
    if (dim === "device") splits.push({ dim, values: DEVICES });
    if (dim === "searchAppearance") splits.push({ dim, values: APPEARANCES });
  }
  // Filters on split dimensions scale the row instead of expanding it.
  const filterShare = (dim: string, values: Split) => {
    let share = 1;
    for (const f of filters) {
      if (f.dimension !== dim) continue;
      share *= values
        .filter(([v]) => matchesFilter(v, f.operator, f.expression))
        .reduce((s, [, w]) => s + w, 0);
    }
    return share;
  };
  const baseShare =
    (splits.some((s) => s.dim === "country")
      ? 1
      : filterShare("country", COUNTRIES)) *
    (splits.some((s) => s.dim === "device")
      ? 1
      : filterShare("device", DEVICES)) *
    (wantsAppearance ? 1 : filterShare("searchAppearance", APPEARANCES));

  const groups = new Map<
    string,
    { keys: string[]; clicks: number; impressions: number; posWeight: number }
  >();
  const add = (
    keys: string[],
    clicks: number,
    impressions: number,
    position: number,
  ) => {
    const imps = Math.round(impressions);
    if (imps <= 0) return;
    const key = keys.join("\u0000");
    const g = groups.get(key) ?? {
      keys,
      clicks: 0,
      impressions: 0,
      posWeight: 0,
    };
    g.clicks += Math.min(imps, Math.round(clicks));
    g.impressions += imps;
    g.posWeight += position * imps;
    groups.set(key, g);
  };

  for (const q of sources) {
    const pageUrl = `${DEMO_ORIGIN}${q.page}`;
    let keep = true;
    for (const f of filters) {
      if (
        f.dimension === "query" &&
        !matchesFilter(q.query, f.operator, f.expression)
      )
        keep = false;
      if (
        f.dimension === "page" &&
        !matchesFilter(pageUrl, f.operator, f.expression)
      )
        keep = false;
    }
    if (!keep) continue;
    for (const iso of eachDay(start, end)) {
      const day = queryDay(q, iso);
      if (!day) continue;
      const counted = provisionalShare(iso);
      const base: Array<{ keys: string[]; share: number }> = [
        { keys: [], share: baseShare },
      ];
      let combos = base;
      for (const dim of dims) {
        const split = splits.find((s) => s.dim === dim);
        combos = combos.flatMap((c) => {
          if (split) {
            return split.values
              .filter(([v]) =>
                filters
                  .filter((f) => f.dimension === dim)
                  .every((f) => matchesFilter(v, f.operator, f.expression)),
              )
              .map(([v, w]) => ({ keys: [...c.keys, v], share: c.share * w }));
          }
          const value =
            dim === "date"
              ? iso
              : dim === "query"
                ? q.query
                : dim === "page"
                  ? pageUrl
                  : "(not set)";
          return [{ keys: [...c.keys, value], share: c.share }];
        });
      }
      for (const c of combos) {
        add(
          c.keys,
          day.clicks * c.share * counted,
          day.impressions * c.share * counted,
          day.position,
        );
      }
    }
  }

  const rows: GscRow[] = [...groups.values()].map((g) => ({
    keys: g.keys,
    clicks: g.clicks,
    impressions: g.impressions,
    ctr: g.impressions > 0 ? g.clicks / g.impressions : 0,
    position: g.impressions > 0 ? g.posWeight / g.impressions : 0,
  }));
  if (dims[0] === "date")
    rows.sort((a, b) => (a.keys[0]! < b.keys[0]! ? -1 : 1));
  else
    rows.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
  const startRow = request.startRow ?? 0;
  const limit = Math.min(Math.max(request.rowLimit ?? 1000, 1), 25_000);
  return rows.slice(startRow, startRow + limit);
}

/**
 * The whole `searchAnalytics.query` response: the rows plus what Google says
 * about them -- the aggregation (by page for page and search-appearance
 * tables) and, for a date-grouped dataState=all request that reaches them,
 * where the still-changing days begin.
 */
export function gscSearchAnalyticsResponse(request: GscRequest): {
  rows: GscRow[];
  responseAggregationType: string;
  metadata?: { first_incomplete_date: string };
} {
  const dims = request.dimensions ?? [];
  const byPage =
    dims.includes("page") ||
    dims.includes("searchAppearance") ||
    (request.dimensionFilterGroups ?? []).some((g) =>
      g.filters.some((f) => f.dimension === "page"),
    );
  const fresh =
    (request.dataState ?? "").toLowerCase() === "all" &&
    dims.includes("date") &&
    request.endDate >= DEMO_FIRST_INCOMPLETE_DATE;
  return {
    rows: gscSearchAnalytics(request),
    responseAggregationType: byPage ? "byPage" : "byProperty",
    ...(fresh
      ? { metadata: { first_incomplete_date: DEMO_FIRST_INCOMPLETE_DATE } }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// Analytics model
// ---------------------------------------------------------------------------

type PageRates = {
  organicShare: number;
  engaged: number;
  keyEvent: number;
  tx: number;
  order: number;
  views: number;
  duration: number;
};

const RATES: Record<PageKind, PageRates> = {
  home: {
    organicShare: 0.41,
    engaged: 0.62,
    keyEvent: 0.031,
    tx: 0.016,
    order: 1620,
    views: 2.4,
    duration: 86,
  },
  category: {
    organicShare: 0.6,
    engaged: 0.56,
    keyEvent: 0.036,
    tx: 0.019,
    order: 1480,
    views: 2.1,
    duration: 71,
  },
  product: {
    organicShare: 0.64,
    engaged: 0.6,
    keyEvent: 0.047,
    tx: 0.025,
    order: 1390,
    views: 1.9,
    duration: 77,
  },
  blog: {
    organicShare: 0.78,
    engaged: 0.74,
    keyEvent: 0.007,
    tx: 0.0016,
    order: 1210,
    views: 1.3,
    duration: 142,
  },
  info: {
    organicShare: 0.35,
    engaged: 0.5,
    keyEvent: 0.011,
    tx: 0.002,
    order: 1300,
    views: 1.6,
    duration: 48,
  },
};

/** Organic landing sessions per page per day, derived from the clicks that land there. */
function organicSessions(path: string, iso: string): number {
  let clicks = 0;
  for (const q of DEMO_QUERIES) {
    if (q.page !== path) continue;
    const d = queryDay(q, iso);
    if (d) clicks += d.clicks;
  }
  const page = DEMO_PAGE_BY_PATH.get(path);
  const floor = page?.kind === "info" || page?.kind === "home" ? 2 : 0;
  return Math.round(clicks * 1.06 + floor);
}

const CHANNELS: Split = [
  ["Organic Search", 0.58],
  ["Direct", 0.19],
  ["Paid Search", 0.09],
  ["Organic Social", 0.06],
  ["Referral", 0.04],
  ["Email", 0.03],
  ["Unassigned", 0.01],
];
const SOURCE_MEDIUM: Split = [
  ["google / organic", 0.55],
  ["(direct) / (none)", 0.19],
  ["google / cpc", 0.09],
  ["instagram / social", 0.04],
  ["bing / organic", 0.02],
  ["newsletter / email", 0.03],
  ["facebook / social", 0.02],
  ["yandex / organic", 0.01],
  ["(not set)", 0.05],
];
const CAMPAIGNS: Split = [
  ["(not set)", 0.8],
  ["kis-indirimi-2026", 0.09],
  ["yeni-sezon", 0.06],
  ["bulten-ekim", 0.05],
];
const GA_DEVICES: Split = [
  ["mobile", 0.63],
  ["desktop", 0.34],
  ["tablet", 0.03],
];
const GA_COUNTRIES: Split = [
  ["Türkiye", 0.89],
  ["Germany", 0.04],
  ["Netherlands", 0.02],
  ["United Kingdom", 0.015],
  ["France", 0.012],
  ["Azerbaijan", 0.011],
  ["United States", 0.012],
];
const NEW_RETURNING: Split = [
  ["new", 0.67],
  ["returning", 0.33],
];
const EVENTS: Split = [
  ["purchase", 0.42],
  ["begin_checkout", 0.31],
  ["generate_lead", 0.15],
  ["sign_up", 0.12],
];
const ITEMS: Array<[string, string, number, number]> = [
  ["Pamuklu Çift Kişilik Nevresim Takımı - Gri", "NV-2001", 0.16, 1290],
  ["Saten Nevresim Takımı - Antrasit", "NV-2107", 0.11, 1890],
  ["Kaz Tüyü Yorgan 195x215", "YG-3010", 0.1, 3490],
  ["Polar Battaniye - Bej", "BT-4102", 0.09, 590],
  ["Visco Boyun Destekli Yastık", "YS-5001", 0.09, 740],
  ["Tül Perde - Düz Beyaz (metre)", "PR-6001", 0.08, 240],
  ["Fon Perde - Blackout Taş", "PR-6210", 0.07, 1150],
  ["Pamuklu Battaniye - Tek Kişilik", "BT-4001", 0.06, 690],
  ["Bornoz - Unisex Kemerli", "HV-7002", 0.06, 980],
  ["Elyaf Yorgan 155x215", "YG-3100", 0.05, 890],
  ["Yastık Kılıfı 50x70 2'li", "YK-5201", 0.05, 260],
  ["Masa Örtüsü Leke Tutmaz 140x200", "MO-8001", 0.04, 520],
  ["Yolluk Halı 80x200", "HL-9001", 0.04, 1340],
];
const SEARCH_TERMS: Split = [
  ["nevresim", 0.2],
  ["yorgan", 0.14],
  ["battaniye", 0.12],
  ["perde", 0.1],
  ["yastık", 0.09],
  ["bornoz", 0.06],
  ["pike", 0.05],
  ["havlu", 0.05],
  ["halı", 0.04],
  ["çift kişilik", 0.04],
  ["saten", 0.03],
  ["kaz tüyü", 0.03],
  ["masa örtüsü", 0.02],
  ["king size", 0.02],
  ["bebek battaniye", 0.01],
];

export type Ga4Request = {
  dateRanges: Array<{ startDate: string; endDate: string }>;
  dimensions: Array<{ name: string }>;
  metrics: Array<{ name: string }>;
  dimensionFilter?: unknown;
  metricFilter?: unknown;
  offset?: string;
  limit?: string;
  orderBys?: Array<{
    metric?: { metricName: string };
    dimension?: { dimensionName: string };
    desc?: boolean;
  }>;
};

function yearWeek(iso: string): string {
  const d = toDate(iso);
  const start = Date.UTC(d.getUTCFullYear(), 0, 1);
  const week = Math.floor((d.getTime() - start) / DAY_MS / 7);
  return `${d.getUTCFullYear()}${String(week).padStart(2, "0")}`;
}

function hasOrganicFilter(filter: unknown): boolean {
  return JSON.stringify(filter ?? null).includes("Organic Search");
}

function hasSiteSearchFilter(filter: unknown): boolean {
  return JSON.stringify(filter ?? null).includes("view_search_results");
}

/**
 * A stand-in for `properties.runReport`. Every metric derives from sessions
 * through the page kind's rates, so a blog post engages well and converts
 * poorly, and a product page the other way round.
 */
export function ga4RunReport(request: Ga4Request): {
  dimensionHeaders: Array<{ name: string }>;
  metricHeaders: Array<{ name: string; type: string }>;
  rows: Array<{
    dimensionValues: Array<{ value: string }>;
    metricValues: Array<{ value: string }>;
  }>;
  rowCount: number;
  kind: string;
} {
  const dims = request.dimensions.map((d) => d.name);
  const metrics = request.metrics.map((m) => m.name);
  const range = request.dateRanges[0] ?? {
    startDate: DEMO_START_DATE,
    endDate: DEMO_END_DATE,
  };
  const start =
    range.startDate < DEMO_START_DATE ? DEMO_START_DATE : range.startDate;
  const end = range.endDate > DEMO_END_DATE ? DEMO_END_DATE : range.endDate;
  const organicOnly = hasOrganicFilter(request.dimensionFilter);
  const siteSearch = hasSiteSearchFilter(request.dimensionFilter);

  type Agg = Record<string, number>;
  const groups = new Map<string, { keys: string[]; agg: Agg }>();
  const bump = (keys: string[], agg: Agg) => {
    const key = keys.join("\u0000");
    const g = groups.get(key) ?? { keys, agg: {} };
    for (const [k, v] of Object.entries(agg)) g.agg[k] = (g.agg[k] ?? 0) + v;
    groups.set(key, g);
  };

  const splitFor = (dim: string): Split | null => {
    switch (dim) {
      case "sessionDefaultChannelGroup":
        return organicOnly ? [["Organic Search", 1]] : CHANNELS;
      case "sessionSourceMedium":
        return organicOnly
          ? [
              ["google / organic", 0.95],
              ["bing / organic", 0.03],
              ["yandex / organic", 0.02],
            ]
          : SOURCE_MEDIUM;
      case "sessionCampaignName":
        return organicOnly ? [["(not set)", 1]] : CAMPAIGNS;
      case "deviceCategory":
        return GA_DEVICES;
      case "country":
        return GA_COUNTRIES;
      case "newVsReturning":
        return NEW_RETURNING;
      case "eventName":
        return EVENTS;
      case "searchTerm":
        return SEARCH_TERMS;
      case "itemName":
        return ITEMS.map(([name, , w]) => [name, w]);
      case "itemId":
        return ITEMS.map(([, id, w]) => [id, w]);
      default:
        return null;
    }
  };

  if (start <= end) {
    for (const page of DEMO_PAGES) {
      const rates = RATES[page.kind];
      for (const iso of eachDay(start, end)) {
        const organic = organicSessions(page.path, iso);
        const sessions = organicOnly
          ? organic
          : Math.round(organic / rates.organicShare);
        if (sessions <= 0) continue;
        let combos: Array<{ keys: string[]; share: number }> = [
          { keys: [], share: 1 },
        ];
        for (const dim of dims) {
          const split = splitFor(dim);
          combos = combos.flatMap((c) => {
            if (split)
              return split.map(([v, w]) => ({
                keys: [...c.keys, v],
                share: c.share * w,
              }));
            const value =
              dim === "hostName"
                ? DEMO_DOMAIN
                : dim === "landingPage" || dim === "pagePath"
                  ? page.path
                  : dim === "date"
                    ? iso.replace(/-/g, "")
                    : dim === "yearWeek"
                      ? yearWeek(iso)
                      : "(not set)";
            return [{ keys: [...c.keys, value], share: c.share }];
          });
        }
        for (const c of combos) {
          const s =
            sessions *
            c.share *
            noise(page.path.length, dayIndex(iso), 7, 0.08);
          const keyEventSessions = s * rates.keyEvent;
          const transactions = s * rates.tx;
          const itemRow = dims.includes("itemName") || dims.includes("itemId");
          const itemsViewed = s * 0.9;
          const itemsAdded = itemsViewed * 0.13;
          const itemsPurchased = itemsAdded * 0.28;
          const price = itemRow
            ? (ITEMS.find(
                ([n, id]) => c.keys.includes(n) || c.keys.includes(id),
              )?.[3] ?? rates.order)
            : rates.order;
          bump(c.keys, {
            sessions: s,
            activeUsers: s * 0.87,
            totalUsers: s * 0.91,
            engagedSessions: s * rates.engaged,
            keyEvents:
              keyEventSessions * 1.12 * (dims.includes("eventName") ? 1 : 1),
            keyEventSessions,
            transactions,
            purchaseRevenue:
              transactions *
              rates.order *
              noise(page.path.length, dayIndex(iso), 8, 0.1),
            screenPageViews: s * rates.views,
            userEngagementDuration: s * rates.duration,
            eventCount: siteSearch ? s * 0.07 : s * 6.4,
            itemsViewed,
            itemsAddedToCart: itemsAdded,
            itemsPurchased,
            itemRevenue: itemsPurchased * price,
          });
        }
      }
    }
  }

  const metricValue = (agg: Agg, name: string): number => {
    const sessions = agg.sessions ?? 0;
    switch (name) {
      case "engagementRate":
        return sessions > 0 ? (agg.engagedSessions ?? 0) / sessions : 0;
      case "sessionKeyEventRate":
        return sessions > 0 ? (agg.keyEventSessions ?? 0) / sessions : 0;
      case "purchaseRevenue":
      case "itemRevenue":
        return Math.round((agg[name] ?? 0) * 100) / 100;
      default:
        return Math.round(agg[name] ?? 0);
    }
  };

  let rows = [...groups.values()].map((g) => ({
    keys: g.keys,
    values: metrics.map((m) => metricValue(g.agg, m)),
  }));
  // The one metric filter the app sends is "keyEvents > 0".
  if (JSON.stringify(request.metricFilter ?? null).includes("GREATER_THAN")) {
    const field = /"fieldName":"([a-zA-Z]+)"/.exec(
      JSON.stringify(request.metricFilter),
    )?.[1];
    const idx = field ? metrics.indexOf(field) : -1;
    if (idx >= 0) rows = rows.filter((r) => (r.values[idx] ?? 0) > 0);
  }
  const order = request.orderBys?.[0];
  if (order?.metric) {
    const idx = metrics.indexOf(order.metric.metricName);
    const desc = order.desc !== false;
    rows.sort(
      (a, b) => ((b.values[idx] ?? 0) - (a.values[idx] ?? 0)) * (desc ? 1 : -1),
    );
  } else if (order?.dimension) {
    const idx = dims.indexOf(order.dimension.dimensionName);
    rows.sort(
      (a, b) => (a.keys[idx]! < b.keys[idx]! ? -1 : 1) * (order.desc ? -1 : 1),
    );
  } else {
    rows.sort((a, b) => (b.values[0] ?? 0) - (a.values[0] ?? 0));
  }
  const offset = Number(request.offset ?? "0") || 0;
  const limit = Number(request.limit ?? "10000") || 10000;
  const page = rows.slice(offset, offset + limit);
  const type = (name: string) =>
    name.endsWith("Rate")
      ? "TYPE_FLOAT"
      : name.endsWith("Revenue")
        ? "TYPE_CURRENCY"
        : name === "userEngagementDuration"
          ? "TYPE_SECONDS"
          : "TYPE_INTEGER";
  return {
    dimensionHeaders: dims.map((name) => ({ name })),
    metricHeaders: metrics.map((name) => ({ name, type: type(name) })),
    rows: page.map((r) => ({
      dimensionValues: r.keys.map((value) => ({ value })),
      metricValues: r.values.map((v) => ({ value: String(v) })),
    })),
    rowCount: rows.length,
    kind: "analyticsData#runReport",
  };
}
