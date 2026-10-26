/**
 * Per-page and site-wide checks read off the HTML the crawler already
 * fetched: mixed content beyond scripts and styles, redirects and canonicals
 * written into the markup, robots directives that contradict each other,
 * pages that say they do not exist, leftover placeholder text, and a few
 * structural signals.
 *
 * Every one is decided from what the page itself says, and the copy says
 * where a judgement is a heuristic.
 */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const HTML_CHECK_ISSUES = {
  "mixed-content-media": {
    severity: "warning",
    title: "Güvenli sayfada güvensiz görsel, video ya da çerçeve",
    explanation:
      'Güvenli (https) sayfa bir görseli, videoyu, sesi ya da gömülü çerçeveyi (iframe) şifresiz http adresinden yüklüyor. Tarayıcılar böyle görsel ve medyayı https\'e çevirmeyi dener, olmazsa göstermez; http çerçeveleri ise doğrudan engeller. Ziyaretçi boş bir alan ya da "Güvenli değil" uyarısı görebilir.',
    howToFix:
      "Ayrıntıdaki adresleri https:// ile başlayacak şekilde değiştirin. Dosya kendi sitenizdeyse adresi göreli (/resimler/...) yazmak da yeter.",
  },
  "form-action-http": {
    severity: "warning",
    title: "Form bilgileri şifresiz gönderiliyor",
    explanation:
      "Güvenli (https) sayfadaki bir form, doldurulan bilgileri şifresiz bir http adresine gönderiyor. Tarayıcılar gönderimden önce ziyaretçiyi uyarır ve bilgiler yolda okunabilir.",
    howToFix:
      "Formun action adresini https:// ile başlayacak şekilde değiştirin ya da formu aynı sitedeki göreli bir adrese gönderin.",
  },
  "meta-refresh-redirect": {
    severity: "info",
    title: "Sayfa meta refresh ile yönlendiriyor",
    explanation:
      'Sayfa, sunucu yönlendirmesi yerine HTML içindeki <meta http-equiv="refresh"> etiketiyle başka bir adrese gönderiyor. Google bunu anlar, ama sunucu tarafında bir 301 yönlendirmesini tercih eder; ziyaretçi de yönlendirmeden önce boş bir sayfa görebilir.',
    howToFix:
      "Mümkünse yönlendirmeyi sunucuda (301 ya da 308) yapın ve meta refresh etiketini kaldırın.",
  },
  "canonical-relative": {
    severity: "info",
    title: "canonical adresi göreli yazılmış",
    explanation:
      "Sayfanın canonical etiketi tam adres yerine göreli bir yol (örneğin /urun) gösteriyor. Google göreli adresi çözebilir, ama tam adres kullanılmasını önerir; göreli yol, sayfa farklı bir adresten açıldığında yanlış yere işaret edebilir.",
    howToFix:
      "canonical adresini https:// ile başlayan tam adres olarak yazın.",
  },
  "canonical-with-fragment": {
    severity: "info",
    title: "canonical adresinde # parçası var",
    explanation:
      "Sayfanın canonical adresi # ile başlayan bir parça içeriyor. Google adresin # sonrasını dikkate almaz, bu yüzden bu parça bir işe yaramaz ve genelde bir şablon hatasının işaretidir.",
    howToFix: "canonical adresinden # ve sonrasını kaldırın.",
  },
  "canonical-outside-head": {
    severity: "warning",
    title: "canonical etiketi sayfanın gövdesinde",
    explanation:
      "Sayfanın tek canonical etiketi <head> bölümünde değil, <body> içinde. Google canonical etiketini yalnızca <head> içinde okur; gövdedeki etiket yok sayılır, yani sayfanın aslında canonical'ı yok.",
    howToFix:
      "canonical etiketini sayfanın <head> bölümüne taşıyın. Genelde bir eklentinin ya da şablonun etiketi yanlış yere yazmasından olur.",
  },
  "robots-meta-conflict": {
    severity: "warning",
    title: "robots etiketleri birbiriyle çelişiyor",
    explanation:
      "Sayfada birden fazla robots etiketi var ve biri izin verirken diğeri yasaklıyor (örneğin biri index, diğeri noindex). Google böyle bir çelişkide daha kısıtlayıcı olan kuralı uygular; yani sayfa büyük olasılıkla istediğinizden farklı işlenir.",
    howToFix:
      "Sayfada tek bir robots etiketi bırakın. Genelde bir SEO eklentisi ile temanın aynı etiketi ayrı ayrı yazmasından olur.",
  },
  "snippet-blocked": {
    severity: "info",
    title: "Aramada sayfanın özeti gösterilmiyor",
    explanation:
      "Sayfa dizine alınabilir, ama nosnippet ya da max-snippet:0 kuralı Google'ın arama sonucunda sayfanın metninden özet göstermesini engelliyor. Özetsiz bir sonuç daha az tıklanır. Bilerek yapılmış olabilir.",
    howToFix:
      "Bilerek değilse robots etiketinden ya da X-Robots-Tag başlığından nosnippet ve max-snippet:0 kuralını kaldırın.",
  },
  "page-says-not-found": {
    severity: "warning",
    title: 'Sayfa "bulunamadı" diyor ama başarılı yanıt veriyor',
    explanation:
      'Sayfanın başlığı ya da ana başlığı "404" ya da "sayfa bulunamadı" diyor, ama sunucu 200 (başarılı) kodu döndürüyor. Google böyle sayfaları "soft 404" sayar ve dizine almaz; ama taramaya zaman harcar ve gerçek bir hata sayfası olduğunu anlamakta gecikebilir.',
    howToFix:
      "Sayfa gerçekten yoksa sunucunun 404 ya da 410 kodu döndürmesini sağlayın. Varsa başlığını ve içeriğini düzeltin.",
  },
  "lorem-ipsum-text": {
    severity: "warning",
    title: "Sayfada yer tutucu metin (lorem ipsum) kalmış",
    explanation:
      'Sayfanın görünen metninde "lorem ipsum" yer tutucu metni var. Tasarım aşamasından kalmış ve yayına unutulmuş içerik, ziyaretçiye ve Google\'a sayfanın bitmediğini söyler.',
    howToFix:
      "Yer tutucu metni gerçek içerikle değiştirin ya da o bölümü kaldırın.",
  },
  "exposed-email-address": {
    severity: "info",
    title: "E-posta adresi düz metin olarak açıkta",
    explanation:
      "Sayfada düz metin ya da mailto bağlantısı olarak bir e-posta adresi var. Spam gönderenlerin botları sayfaları bu adresler için tarar. Ziyaretçinin size ulaşması için gerekliyse sorun değildir.",
    howToFix:
      "İletişim için bir form kullanmayı düşünün ya da adresi spam filtresi güçlü bir kutuya yönlendirin.",
  },
  "title-content-mismatch": {
    severity: "info",
    title: "Başlıktaki kelimeler sayfa içeriğinde geçmiyor",
    explanation:
      "Sayfa başlığındaki (title) anlamlı kelimelerin hiçbiri ana başlıkta ya da sayfa metninde geçmiyor. Google başlığın sayfayı anlatıp anlatmadığına bakar; içerikle ilgisi olmayan bir başlığı arama sonucunda başka bir metinle değiştirebilir. Bu bir tahmindir: eş anlamlı kelimeler sayılmaz.",
    howToFix:
      "Başlığı sayfanın gerçekten anlattığı konuya göre yazın ya da başlıktaki ana kelimeyi ana başlıkta ve ilk paragrafta kullanın.",
  },
  "organization-missing-sameas": {
    severity: "info",
    title: "Kuruluş yapısal verisinde sosyal profiller yok",
    explanation:
      "Sayfadaki Organization yapısal verisinde sameAs özelliği yok. sameAs, kuruluşunuzun resmi sosyal medya ve kayıt profillerini (LinkedIn, Wikipedia gibi) gösterir; Google kuruluşu tanırken bu bağlantıları kullanır. Google bunu önerir, zorunlu tutmaz.",
    howToFix:
      'Organization yapısal verisine sameAs ekleyin ve içine resmi profil adreslerinizi liste olarak yazın, örneğin "sameAs": ["https://www.linkedin.com/company/..."].',
  },
  "missing-breadcrumbs": {
    severity: "info",
    title: "Derindeki sayfada içerik yolu (breadcrumb) yok",
    explanation:
      "Ana sayfadan en az üç tıklama uzaktaki bu sayfada ne bir içerik yolu (breadcrumb) gezinmesi ne de BreadcrumbList yapısal verisi var. İçerik yolu ziyaretçiye nerede olduğunu gösterir; Google da arama sonucunda adres yerine bu yolu gösterebilir.",
    howToFix:
      "Sayfanın üstüne Ana sayfa > Kategori > Sayfa biçiminde bir içerik yolu ekleyin ve BreadcrumbList yapısal verisiyle işaretleyin. Çoğu SEO eklentisi ikisini birlikte ekler.",
  },
  "paginated-page-noindex": {
    severity: "warning",
    title: "Sayfalamanın devam sayfası aramadan gizlenmiş",
    explanation:
      "Bir listenin 2. ya da sonraki sayfası noindex ile aramadan gizlenmiş. Google'ın sayfalama rehberi her sayfanın kendi adresiyle dizine girebilmesini önerir. Uzun süre noindex kalan bir sayfadaki bağlantıları Google zamanla izlemeyi bırakabilir; o zaman yalnızca bu sayfalardan bağlantı alan ürün ya da yazılar bulunmaz olur.",
    howToFix:
      "Sayfalama sayfalarından noindex'i kaldırın ve her birine kendi adresini canonical olarak verin.",
  },
  "internal-http-links": {
    severity: "warning",
    title: "Güvenli sitede iç bağlantılar http adresine gidiyor",
    explanation:
      "Site https ile çalışıyor, ama bu sayfadaki bazı bağlantılar sitenin kendi sayfalarına http:// ile veriliyor. Her tıklama önce bir yönlendirmeden geçer ya da ziyaretçi güvensiz sürüme düşer; Google da aynı sayfanın iki adresini görür.",
    howToFix:
      "Şablondaki ve içerikteki iç bağlantıları https:// ile ya da göreli (/sayfa) olarak yazın. Veritabanında eski http adreslerini toplu değiştirmek genelde en hızlı yoldur.",
  },
  "large-inline-code": {
    severity: "info",
    title: "Sayfanın içine gömülü kod çok büyük",
    explanation:
      "Sayfanın HTML'ine doğrudan gömülmüş betik ve stil kodu 100 KB'ı geçiyor. Gömülü kod tarayıcı önbelleğinde saklanmaz ve her sayfa açılışında yeniden indirilir; sayfa da ilk içeriği göstermeden önce bu kodu okumak zorunda kalır.",
    howToFix:
      "Büyük gömülü betik ve stilleri ayrı dosyalara taşıyın; yalnızca ilk ekran için gereken küçük CSS'i gömülü bırakın.",
  },
  "missing-feed": {
    severity: "info",
    title: "Blog var ama RSS/Atom akışı bildirilmemiş",
    explanation:
      "Sitede yazı (Article, BlogPosting) olarak işaretlenmiş sayfalar var, ama taranan hiçbir sayfa bir RSS ya da Atom akışı bildirmiyor. Akış, okuyucuların ve haber toplayıcıların yeni yazılarınızı izlemesini sağlar; Google da yeni içeriği daha çabuk keşfedebilir.",
    howToFix:
      'Bir RSS ya da Atom akışı yayınlayın ve sayfaların <head> bölümüne <link rel="alternate" type="application/rss+xml" href="/feed"> ile bildirin. Çoğu blog altyapısında akış hazırdır, yalnızca etiketin eklenmesi gerekir.',
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
