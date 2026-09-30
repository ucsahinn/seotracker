/** Titles, descriptions, headings, images and body content. */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const CONTENT_ISSUES = {
  "missing-title": {
    severity: "critical",
    title: "Başlık etiketi yok",
    explanation:
      "Sayfanın başlık etiketi (<title>) yok. Başlık, arama sonucunda mavi bağlantı olarak görünen yazıdır ve Google sayfanın konusunu en çok buradan anlar. Yoksa Google kendisi bir başlık üretir, genelde de kötü olur.",
    howToFix:
      "Sayfaya konusunu anlatan, sayfaya özgü bir <title> ekleyin (yaklaşık 50-60 karakter). SEO eklentisi ya da site oluşturucunuz varsa başlık alanını doldurmanız yeter.",
  },
  "missing-meta-description": {
    severity: "warning",
    title: "Meta açıklama yok",
    explanation:
      "Sayfanın meta açıklaması yok. Bu, arama sonucunda başlığın altında görünen kısa özet yazısıdır. Yoksa Google özeti sayfa metninden kendisi seçer; çoğu zaman daha az çekici olur ve tıklama oranını düşürür.",
    howToFix:
      "Sayfayı özetleyen ve tıklamak için bir neden veren 70-160 karakterlik bir meta açıklama yazın.",
  },
  "missing-h1": {
    severity: "warning",
    title: "H1 başlığı yok",
    explanation:
      "Sayfada H1 (sayfanın ana başlığı) yok. H1, hem ziyaretçiye hem Google'a sayfanın ne hakkında olduğunu ilk bakışta söyler.",
    howToFix:
      "Sayfaya konusunu anlatan tek bir H1 ekleyin; başlık etiketiyle uyumlu olsun.",
  },
  "multiple-h1": {
    severity: "info",
    title: "Birden çok H1 başlığı",
    explanation:
      "Sayfada birden fazla H1 var. Google bunu sorun etmez, yani ceza yok. Ama çoğu zaman şablon hatasının işaretidir; örneğin logo ile sayfa başlığının ikisi de H1 olmuştur.",
    howToFix:
      "Ana başlık için tek H1 bırakın, diğerlerini H2 ya da H3 yapın. Logo gibi başlık olmayan öğelerden H1 etiketini kaldırın.",
  },
  "thin-content": {
    severity: "info",
    title: "Sayfada neredeyse hiç metin yok",
    explanation:
      "Bu sayfada neredeyse hiç görünür metin bulunamadı. Genelde içeriğin JavaScript ile sonradan yüklenmesi ve ilk gelen HTML'de yer almaması yüzünden olur. Metnin kısa olması sorun değil; sorun sayfanın boş görünmesi, çünkü Google boş sayfayı dizine almak istemez.",
    howToFix:
      "Sayfayı açıp metnin göründüğünü, sonra sağ tık > Sayfa kaynağını görüntüle ile aynı metnin orada da olduğunu kontrol edin. Yoksa içeriği sunucu tarafında üretin. Sayfa gerçekten boşsa noindex ekleyin ya da daha dolu bir sayfayla birleştirin.",
  },
  "images-missing-alt": {
    severity: "warning",
    title: "Alt metni olmayan görseller",
    explanation:
      "Sayfadaki bazı görsellerin alt metni (görseli anlatan kısa yazı) yok. Alt metin, görmeyen kullanıcılar için gereklidir ve Google'ın görselin ne olduğunu anlamasının başlıca yoludur.",
    howToFix:
      'Anlam taşıyan her görsele ne gösterdiğini anlatan kısa bir alt metin yazın. Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").',
  },
  "no-outgoing-links": {
    severity: "info",
    title: "Sayfadan başka hiçbir yere bağlantı yok",
    explanation:
      "Bu sayfadan başka hiçbir sayfaya bağlantı verilmiyor, yani ziyaretçi ve Google için çıkmaz sokak. Google siteyi bağlantıları izleyerek gezer; buradan yeni bir yere gidemez.",
    howToFix:
      "İlgili sayfalara, üst kategoriye ya da ana sayfaya bağlantı ekleyin. Menü JavaScript ile oluşuyorsa, bağlantıların ilk gelen HTML'de de bulunduğundan emin olun.",
  },
  "title-too-long": {
    severity: "info",
    title: "Başlık çok uzun",
    explanation:
      "Başlık yaklaşık 60 karakteri aşıyor. Google sonucu gösterirken sonunu keser, yani en önemli kısım görünmeyebilir.",
    howToFix:
      "Başlığı 50-60 karaktere indirin ve en önemli kelimeleri başa koyun.",
  },
  "title-too-short": {
    severity: "info",
    title: "Başlık çok kısa",
    explanation:
      "Başlık 10 karakterden kısa. Bu kadar kısa bir başlık sayfanın ne sunduğunu anlatmaya ve tıklatmaya yetmez.",
    howToFix:
      "Başlığı, sayfanın ne sunduğunu söyleyen bir ifadeye genişletin (yaklaşık 30-60 karakter).",
  },
  "meta-description-too-long": {
    severity: "info",
    title: "Meta açıklama çok uzun",
    explanation:
      "Meta açıklama yaklaşık 160 karakteri aşıyor. Google arama sonucunda özeti kesecek, sonundaki mesaj görünmeyecek.",
    howToFix: "Ana mesajı başta tutarak açıklamayı 70-160 karaktere indirin.",
  },
  "meta-description-too-short": {
    severity: "info",
    title: "Meta açıklama çok kısa",
    explanation:
      "Meta açıklama 70 karakterden kısa. Bu kadar kısa yazılar arama sonucundaki alanı boşa harcar ve Google çoğu zaman bunun yerine sayfadan kendi seçtiği bir metni gösterir.",
    howToFix:
      "Açıklamayı, sayfayı özetleyen ve tıklamak için bir neden veren 70-160 karaktere genişletin.",
  },
  "heading-order-skip": {
    severity: "info",
    title: "Başlık seviyeleri atlanmış",
    explanation:
      "Başlık seviyeleri atlanmış, örneğin H2'den sonra doğrudan H4 gelmiş. Bu, sayfanın bölüm yapısını ekran okuyucular ve arama motorları için karıştırır. Menü ve altbilgi başlıkları da bu sıralamaya dahil olduğundan bazen yanlış alarm olabilir.",
    howToFix:
      "Başlıkları sırayla kullanın: H1, sonra H2, sonra H3. Seviye atlayan başlığı bir kademe yukarı çekin. Atlamanın menü ya da altbilgiden geldiğini görürseniz orada başlık etiketi yerine düz metin kullanın.",
  },
  "missing-viewport": {
    severity: "info",
    title: "Mobil görünüm etiketi (viewport) yok",
    explanation:
      'Sayfada mobil görünüm etiketi (`<meta name="viewport">`) yok. Google siteleri telefon sürümü üzerinden değerlendirir; bu etiket yoksa sayfa telefonda masaüstü genişliğinde açılır ve okumak için yakınlaştırmak gerekir. Bu denetim taranan her sayfaya bakar, bu yüzden bozuk bir şablon gözden kaçmaz.',
    howToFix:
      'Sayfanın `<head>` bölümüne `<meta name="viewport" content="width=device-width, initial-scale=1">` satırını ekleyin. Hemen her site için doğru değer budur.',
  },
  "missing-lang": {
    severity: "info",
    title: "Sayfa dili belirtilmemiş",
    explanation:
      "Sayfanın `<html>` etiketinde `lang` (sayfa dili) yok. Ekran okuyucular doğru telaffuz için, tarayıcılar çeviri önerisi için buna bakar. Google dili içerikten de anlar, ama açıkça yazmak belirsizliği ortadan kaldırır.",
    howToFix:
      'Sayfanın başındaki `<html>` etiketine dilinizi ekleyin; Türkçe bir sayfa için `<html lang="tr">`. Sayfalar tek şablondan üretiliyorsa şablonda bir kez düzeltmek hepsine yeter.',
  },
  "images-missing-dimensions": {
    severity: "info",
    title: "Görsellerde genişlik ve yükseklik yok",
    explanation:
      "Sayfada genişlik (width) ve yükseklik (height) belirtilmemiş üç ya da daha fazla görsel var. Tarayıcı görsel inmeden ona ne kadar yer ayıracağını bilemez; görsel gelince yazılar aşağı kayar ve okuyan kişi yerini kaybeder.",
    howToFix:
      'Her `<img>` etiketine görselin gerçek boyutunu yazın: `<img src="..." width="800" height="600">`. CSS ile küçültüyorsanız bu değerler oranı korur, yine de yazın. SVG görsellerde gerek yok.',
  },
  "no-subheadings": {
    severity: "info",
    title: "Uzun metinde alt başlık yok",
    explanation:
      "Sayfada epey uzun metin var ama H1 dışında hiç başlık yok. Alt başlıklar uzun metni taranabilir yapar ve Google'ın sayfanın hangi konuları kapsadığını anlamasına yardım eder.",
    howToFix:
      "Metni konularına göre bölün ve her bölüme bir H2 başlığı verin. Başlıklar bölümün ne anlattığını söylesin; anahtar kelime doldurmayın.",
  },
  "alt-is-filename": {
    severity: "info",
    title: "Görselin alt metni bir dosya adı",
    explanation:
      "Bir görselin alt metni dosya adı ya da kamera çıktısı gibi duruyor (IMG_2231.jpg, DSC0043, ekran-goruntusu-1.png). Alt metin, görseli göremeyen birine ne olduğunu anlatmalıdır; dosya adı bunu yapmaz. Google'ın görselin konusunu anlamasına da yardım etmez.",
    howToFix:
      'Alt metne görselde ne olduğunu yazın, örneğin "kırmızı koltukta oturan kadın". Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").',
  },
  "alt-too-long": {
    severity: "info",
    title: "Görsel alt metni çok uzun",
    explanation:
      "Bir görselin alt metni 250 karakteri aşıyor. Ekran okuyucular alt metni sonuna kadar okur; bu kadar uzun olunca görsel anlatımı paragrafa döner ve dinleyen sayfanın akışını kaybeder.",
    howToFix:
      "Görselin ne olduğunu bir cümleyle anlatın (yaklaşık 125 karakter). Daha fazla anlatılacak şey varsa onu sayfanın metnine ya da görselin açıklama yazısına taşıyın.",
  },
  "multiple-titles": {
    severity: "warning",
    title: "Sayfada birden fazla başlık etiketi (<title>)",
    explanation:
      "Sayfada birden fazla <title> etiketi var. Bir sayfanın tek başlığı olur; Google hangisini alacağını kendisi seçer ve seçtiği, arama sonucunda görmek istediğiniz olmayabilir. Genelde şablon ile SEO eklentisinin ikisi birden başlık yazınca olur.",
    howToFix:
      "Sayfa kaynağında <title> araması yapın ve yalnızca birini bırakın. İkisi farklı yerden geliyorsa (şablon ve eklenti) birini kapatın.",
  },
  "multiple-meta-descriptions": {
    severity: "warning",
    title: "Sayfada birbirinden farklı birden fazla meta açıklama",
    explanation:
      "Sayfada içeriği farklı iki ya da daha fazla meta açıklama var. Google hangisini özet olarak göstereceğini kendisi seçer, yani arama sonucunda çıkan yazı sizin yazdığınız olmayabilir. Şablon ile SEO eklentisinin ikisi birden yazınca olur.",
    howToFix:
      'Sayfa kaynağında name="description" araması yapın ve yalnızca birini bırakın. İki kaynak varsa (şablon ve eklenti) birini kapatın.',
  },
  "placeholder-title": {
    severity: "warning",
    title: "Başlık etiketi yer tutucu bir yazı",
    explanation:
      'Sayfanın başlığı "Untitled", "Başlıksız" ya da "New Page" gibi kimsenin yazmadığı bir yer tutucu. Arama sonucunda mavi bağlantı olarak bu çıkar; kimse tıklamak istemez ve Google çoğu zaman bu başlığı kullanmayıp başka bir metinle değiştirir.',
    howToFix:
      "Sayfanın konusunu anlatan kendi başlığını yazın (yaklaşık 50-60 karakter). Sayfa sonradan doldurulacaksa dolana kadar noindex ile dizin dışında tutun.",
  },
  "h1-too-long": {
    severity: "info",
    title: "Ana başlık (H1) çok uzun",
    explanation:
      "Sayfanın ana başlığı (H1) 70 karakterden uzun. Google için bir sınır yok ve sıralamayı etkilemez; ama uzun başlık bir bakışta okunmaz, genelde de başlığa metin paragrafı yazılmıştır.",
    howToFix:
      "H1'i bir cümlelik, sayfanın konusunu söyleyen kısa bir başlığa indirin. Geri kalan açıklamayı başlığın altındaki paragrafa taşıyın.",
  },
  "empty-anchor-text": {
    severity: "info",
    title: "Metni olmayan iç bağlantılar",
    explanation:
      'Sayfada içinde yazı, görsel ya da erişilebilirlik etiketi (aria-label) olmayan iç bağlantılar var. Google bir bağlantının nereye gittiğini bağlantı metninden anlar; boş bağlantı hiçbir şey söylemez. Ekran okuyucu kullanan ziyaretçi için de bağlantı sadece "bağlantı" diye okunur.',
    howToFix:
      'Bağlantıya görünür bir yazı ekleyin ya da yalnızca simge ise `aria-label="Sepet"` gibi ne yaptığını söyleyen bir etiket ekleyin. Kullanılmayan boş `<a>` etiketlerini silin.',
  },
  "generic-anchor-text": {
    severity: "info",
    title: '"Buraya tıklayın" gibi anlamsız bağlantı metinleri',
    explanation:
      'Sayfada "buraya tıklayın", "devamı", "daha fazla", "click here" gibi hedefi anlatmayan iç bağlantı metinleri var (üç ya da daha fazla). Google, bağlantı metnini hedef sayfanın konusunu anlamak için kullanır; bu metinler o bilgiyi vermez. Ekran okuyucu kullanan biri bağlantı listesini açtığında hepsini aynı duyar.',
    howToFix:
      'Bağlantı metnini hedefin konusuyla değiştirin: "buraya tıklayın" yerine "2026 fiyat listesini indirin". Kart şablonlarında "Devamı" yazısına yazı başlığını ekleyin ya da görünmeyen bir aria-label ile tamamlayın.',
  },
  "too-many-links": {
    severity: "info",
    title: "Sayfada çok fazla bağlantı",
    explanation:
      "Sayfada 300'den fazla farklı adrese bağlantı var. Google'ın sabit bir sınırı yok ve bu tek başına sıralamayı düşürmez; ama bu kadar bağlantı ziyaretçinin seçim yapmasını zorlaştırır ve Google'ın önemli bağlantıyı ayırt etmesini güçleştirir. Genelde büyük bir menü ya da kategori listesinin her sayfada tekrarlanması yüzünden olur.",
    howToFix:
      "Menüyü ve alt bilgiyi (footer) en önemli sayfalarla sınırlayın. Uzun listeleri sayfalara bölün ya da kategori sayfalarına indirin.",
  },
  "internal-nofollow-links": {
    severity: "info",
    title: "Kendi sitenizin sayfalarına nofollow bağlantılar",
    explanation:
      'Sayfada kendi sitenizin sayfalarına giden üç ya da daha fazla bağlantıda rel="nofollow" var. nofollow, Google\'a "bu bağlantıya güvenme" demek içindir ve iç bağlantıda genelde gerek yoktur. Google bu bağlantıları takip etmeyebilir; yani sayfaya başka yolla ulaşılamıyorsa hedef sayfa dizine geç girer ya da hiç girmez.',
    howToFix:
      'Kendi sayfalarınıza verdiğiniz bağlantılardan rel="nofollow" özelliğini kaldırın. Sayfanın dizine girmesini istemiyorsanız bağlantıyı değil sayfayı noindex ile işaretleyin.',
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
