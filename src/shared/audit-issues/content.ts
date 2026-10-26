/** Titles, descriptions, headings, images and body content. */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const CONTENT_ISSUES = {
  "missing-title": {
    severity: "warning",
    title: "Başlık etiketi yok",
    explanation:
      "Sayfanın başlık etiketi (<title>) yok. Başlık, arama sonucunda mavi bağlantı olarak görünen yazıdır. Yoksa Google başlığı sayfadaki başlıklardan ya da başka bağlantı metinlerinden türetir; bu, sizin seçmeyeceğiniz bir metin olabilir.",
    howToFix:
      "Sayfaya konusunu anlatan, sayfaya özgü bir <title> ekleyin (yaklaşık 50-60 karakter bir ölçüttür, kural değil). SEO eklentisi ya da site oluşturucunuz varsa başlık alanını doldurmanız yeter.",
  },
  "missing-meta-description": {
    severity: "warning",
    title: "Meta açıklama yok",
    explanation:
      "Sayfanın meta açıklaması yok. Bu, arama sonucunda başlığın altında görünen kısa özet yazısıdır. Yoksa Google özeti sayfa metninden kendisi seçer; bu özet sizin vermek istediğiniz mesaj olmayabilir.",
    howToFix:
      "Sayfayı özetleyen ve tıklamak için bir neden veren bir meta açıklama yazın. Yaklaşık 70-160 karakter bir ölçüttür, kural değil; Google sınır koymaz, kesilme ekran genişliğine göre değişir.",
  },
  "missing-h1": {
    severity: "info",
    title: "H1 başlığı yok",
    explanation:
      "Sayfada H1 (ana başlık) yok. Google H1'i zorunlu tutmaz, ama başlıklar ziyaretçinin sayfanın konusunu ilk bakışta anlamasını ve ekran okuyucuyla gezinmeyi kolaylaştırır; Google da başlıkları sayfanın yapısını anlamak için kullanabilir.",
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
      "Başlık yaklaşık 60 karakteri aşıyor. Bu bir ölçüt, kural değil: Google karakter sınırı koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun başlıkta en önemli kısım görünmeyebilir.",
    howToFix:
      "Başlığı yaklaşık 50-60 karaktere indirin ve en önemli kelimeleri başa koyun.",
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
      "Meta açıklama yaklaşık 160 karakteri aşıyor. Bu bir ölçüt, kural değil: Google sınır koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun açıklamada sondaki mesaj görünmeyebilir.",
    howToFix:
      "Ana mesajı başta tutarak açıklamayı yaklaşık 70-160 karaktere indirin.",
  },
  "meta-description-too-short": {
    severity: "info",
    title: "Meta açıklama çok kısa",
    explanation:
      "Meta açıklama yaklaşık 70 karakterden kısa. Bu bir ölçüt, kural değil; ama bu kadar kısa yazı arama sonucundaki alanı boşa harcar ve Google bunun yerine sayfadan kendi seçtiği bir metni gösterebilir.",
    howToFix:
      "Açıklamayı, sayfayı özetleyen ve tıklamak için bir neden veren yaklaşık 70-160 karaktere genişletin.",
  },
  "heading-order-skip": {
    severity: "info",
    title: "Başlık seviyeleri atlanmış",
    explanation:
      "Başlık seviyeleri atlanmış, örneğin H2'den sonra doğrudan H4 gelmiş. Bu, ekran okuyucuyla gezinen ziyaretçiler için sayfa yapısını karıştırır; Google için sıralama kuralı yoktur. Menü ve altbilgi başlıkları da bu sıralamaya dahil olduğundan bazen yanlış alarm olabilir.",
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
      'Sayfanın başlığı "Untitled", "Başlıksız" ya da "New Page" gibi kimsenin yazmadığı bir yer tutucu. Arama sonucunda mavi bağlantı olarak bu çıkabilir; kimse tıklamak istemez. Google da bazen bu başlığı kullanmayıp başka bir metinle değiştirir.',
    howToFix:
      "Sayfanın konusunu anlatan kendi başlığını yazın (yaklaşık 50-60 karakter bir ölçüttür). Sayfa sonradan doldurulacaksa dolana kadar noindex ile dizin dışında tutun.",
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
  /*
   * Page signals: social cards, page weight, markup hygiene and the
   * accessibility basics a crawler can read without a browser.
   */
  "og-incomplete": {
    severity: "info",
    title: "Open Graph etiketleri eksik",
    explanation:
      "Sayfada Open Graph etiketleri var ama başlık, açıklama ve görselden biri ya da birkaçı eksik. Bu etiketler sayfa Facebook, LinkedIn, WhatsApp gibi yerlerde paylaşıldığında görünen kartı belirler. Eksik olanı paylaşılan platform kendisi tahmin eder; çoğu zaman yanlış görsel ya da kesik bir metin çıkar. Google sıralamasını etkilemez.",
    howToFix:
      "Eksik etiketi ekleyin: og:title, og:description ve og:image üçü birlikte olmalı. Görsel en az 1200x630 piksel olsun. SEO eklentiniz varsa sosyal paylaşım bölümünü doldurmanız yeter.",
  },
  "twitter-card-missing": {
    severity: "info",
    title: "X (Twitter) kart etiketi yok",
    explanation:
      "Sayfada Open Graph etiketleri var ama twitter:card etiketi yok. X başlık, açıklama ve görseli Open Graph'tan alabilir, ama kart türünü söyleyen bu etiket olmadan bağlantı kartsız, düz bir adres olarak görünebilir. Google sıralamasını etkilemez.",
    howToFix:
      'Sayfanın head bölümüne <meta name="twitter:card" content="summary_large_image"> ekleyin. Diğer twitter: etiketlerine gerek yok; X eksikleri Open Graph etiketlerinden tamamlar.',
  },
  "title-equals-h1": {
    severity: "info",
    title: "Başlık etiketi ile H1 aynı",
    explanation:
      "Sayfanın başlık etiketi (<title>) ile H1 başlığı birebir aynı. Bu bir hata değil ve Google bunu cezalandırmaz. Ama iki farklı yer, iki farklı fırsat demek: başlık arama sonucunda tıklatmak için, H1 sayfaya gelen ziyaretçiye konuyu söylemek için yazılır. Aynı metin ikisinden birini boşa harcar.",
    howToFix:
      "Başlığı arama sonucu için yazın (ana kelime başta, marka sonda), H1'i sayfadaki okur için yazın. Konu aynı kalsın, ifade farklı olsun.",
  },
  "title-pixel-too-wide": {
    severity: "info",
    title: "Başlık arama sonucunda kesilebilir",
    explanation:
      "Başlık 60 karakterin altında ama geniş harfler yüzünden yaklaşık 580 pikseli aşıyor. Google başlığı karakter sayısına göre değil, genişliğe göre keser; geniş büyük harfler (W, M) ve sayılar başlığı daha erken taşırır. Ölçüm, Google'ın masaüstünde kullandığı 20 piksellik Arial yazı tipine göre yapılan bir tahmindir.",
    howToFix:
      "Başlığı kısaltın ya da büyük harfle yazılmış sözcükleri normal yazıma çevirin. En önemli kelimeleri başa alın; kesilme olursa sondaki marka adı gitsin.",
  },
  "meta-keywords-present": {
    severity: "info",
    title: "Gereksiz meta keywords etiketi",
    explanation:
      "Sayfada meta keywords etiketi var. Google bu etiketi yıllardır hiç kullanmıyor; sıralamaya ne katkısı ne zararı var. Tek etkisi, hedeflediğiniz kelimeleri rakiplerin kaynak koduna bakarak görebilmesi.",
    howToFix:
      "Etiketi şablondan ya da SEO eklentisinin ayarlarından kaldırın. Acil değil; zamanınız olduğunda temizleyin.",
  },
  "viewport-zoom-disabled": {
    severity: "warning",
    title: "Sayfa yakınlaştırmayı engelliyor",
    explanation:
      "Sayfanın viewport etiketi kullanıcının yakınlaştırmasını kapatıyor (user-scalable=no ya da 2'den küçük maximum-scale). Az gören ziyaretçiler telefonda metni büyütemez. Erişilebilirlik standardı (WCAG) metnin %200'e kadar büyütülebilmesini ister; Lighthouse da bunu hata sayar.",
    howToFix:
      'Viewport etiketinden user-scalable=no ve maximum-scale değerlerini kaldırın: <meta name="viewport" content="width=device-width, initial-scale=1"> yeterlidir.',
  },
  "blank-target-without-noopener": {
    severity: "info",
    title:
      "En iyi uygulama: yeni sekmede açılan dış bağlantılarda noopener yok",
    explanation:
      'Sayfada target="_blank" ile yeni sekmede açılan ama rel="noopener" ya da rel="noreferrer" taşımayan dış bağlantılar var. Güncel tarayıcılar (Chrome 88, Firefox 79 ve Safari 12.1\'den beri) target="_blank" bağlantılara noopener\'ı kendiliğinden uygular; yani bu bir güvenlik açığı değil, eski tarayıcılar için bir en iyi uygulama notudur. Sıralamayı etkilemez.',
    howToFix:
      'Bu bağlantılara rel="noopener" ekleyin. Çoğu zaman tek bir şablon ya da editör ayarıdır.',
  },
  "javascript-href-links": {
    severity: "warning",
    title: 'Adresi "javascript:" olan bağlantılar',
    explanation:
      'Sayfada href değeri "javascript:" ile başlayan bağlantılar var. Google yalnızca gerçek bir adrese giden <a href> bağlantılarını izler; bunları izleyemez, yani gittikleri sayfaları bu yoldan bulamaz. Klavye ve ekran okuyucu kullananlar için de bunlar çoğu zaman çalışmaz.',
    howToFix:
      "Bir sayfaya gidiyorsa href'e o sayfanın adresini yazın. Bir işlem yapıyorsa (menü açmak gibi) <a> yerine <button> kullanın.",
  },
  "images-not-lazy": {
    severity: "info",
    title: "Aşağıdaki görseller hemen yükleniyor",
    explanation:
      'Sayfada ilk ekranın altında kalan altıdan fazla görsel loading="lazy" olmadan, sayfa açılır açılmaz yükleniyor. Ziyaretçi o kısma inmeden bant genişliği harcanır ve sayfa yavaşlar. Tahmin, ilk üç içerik görselinin ilk ekranda olduğunu varsayar ve yalnızca ana içerikteki (<main>, <article>) ya da büyük boyutlu görselleri sayar; logolar ve simgeler sayılmaz. Gerçek ekran düzeni farklı olabilir.',
    howToFix:
      'İlk ekranın altındaki görsellere loading="lazy" ekleyin. İlk ekrandaki ana görsele eklemeyin; o görsel hemen yüklenmeli.',
  },
  "images-legacy-format": {
    severity: "info",
    title: "Görseller eski biçimde",
    explanation:
      "Sayfadaki üç ya da daha fazla görsel JPEG, PNG ya da GIF biçiminde ve WebP ya da AVIF alternatifi yok (logolar, simgeler ve SVG'ler sayılmaz). Yeni biçimler aynı kalitede genelde %25-50 daha küçüktür; sayfa daha hızlı açılır. Tüm güncel tarayıcılar bu biçimleri destekler.",
    howToFix:
      "Görselleri WebP ya da AVIF'e çevirin, ya da <picture> içinde bu biçimlerde bir <source> ekleyin. Çoğu CMS ve görsel eklentisi bunu otomatik yapabilir.",
  },
  "form-input-without-label": {
    severity: "warning",
    title: "Etiketi olmayan form alanları",
    explanation:
      'Sayfadaki bazı form alanlarının (metin kutusu, seçim listesi) etiketi yok: ne <label>, ne aria-label, ne title, ne de yer tutucu metin. Ekran okuyucu kullanan ziyaretçi alana gelince yalnızca "düzenleme alanı" duyar, ne yazacağını bilemez. Lighthouse\'un erişilebilirlik denetimi de bunu hata sayar.',
    howToFix:
      'Her alana görünür bir <label for="alan-id"> ekleyin. Tasarım görünür etikete izin vermiyorsa aria-label="E-posta adresi" gibi bir etiket verin.',
  },
  "duplicate-ids": {
    severity: "info",
    title: "Aynı id birden çok öğede",
    explanation:
      "Sayfada aynı id değerini taşıyan birden fazla öğe var. id sayfada tek olmalı; tekrar ettiğinde form etiketleri, sayfa içi bağlantılar ve erişilebilirlik bağlantıları yanlış öğeye gider. Sıralamayı etkilemez, ama genelde bir bileşenin aynı sayfada iki kez kullanılmasından kaynaklanan bir şablon hatasıdır.",
    howToFix:
      "Tekrar eden id'leri bulun (tarayıcının geliştirici araçlarında document.querySelectorAll('[id]') ile) ve her birini benzersiz yapın; yalnızca stil için kullanılıyorsa class'a çevirin.",
  },
  "dom-too-large": {
    severity: "warning",
    title: "Sayfanın HTML yapısı çok büyük",
    explanation:
      "Sayfada 1.500'den fazla HTML öğesi var. Lighthouse bu sınırdan sonra uyarı verir: büyük bir sayfa yapısı daha çok bellek harcar, stil hesaplamayı ve etkileşimi yavaşlatır, özellikle telefonda. Genelde her sayfada tekrarlanan dev menülerden, gizli ama yüklenen içerikten ya da iç içe geçmiş sayfa oluşturucu katmanlarından olur.",
    howToFix:
      "Görünmeyen içeriği (kapalı menüler, sekmeler) gerektiğinde yükleyin, uzun listeleri sayfalara bölün, sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.",
  },
  "dom-too-deep": {
    severity: "info",
    title: "HTML öğeleri çok iç içe",
    explanation:
      "Sayfada 32 kattan derin iç içe geçmiş HTML öğeleri var. Çok derin yapı stil hesaplamayı yavaşlatır ve genelde sayfa oluşturucuların her bölümü birkaç gereksiz kutuya sarmasından kaynaklanır.",
    howToFix:
      "Şablonda gereksiz sarmalayıcı <div> katmanlarını kaldırın; sayfa oluşturucu kullanıyorsanız iç içe bölüm ve sütunları azaltın.",
  },
  "low-text-ratio": {
    severity: "info",
    title: "Görünür metin, koda göre çok az",
    explanation:
      "Sayfanın görünür metni, HTML'nin onda birinden az. Bu tek başına bir sıralama sorunu değil; Google böyle bir oran ölçmez. Ama çoğu zaman sayfanın satır içi betik ve stil kodlarıyla şiştiğini ya da içeriğin ilk gelen HTML'de olmadığını gösterir.",
    howToFix:
      "Satır içi büyük betik ve stilleri ayrı dosyalara taşıyın, kullanılmayan kodu kaldırın. İçerik JavaScript ile yükleniyorsa sayfa kaynağında da göründüğünden emin olun.",
  },
  "near-duplicate-content": {
    severity: "warning",
    title: "Neredeyse aynı içerik",
    explanation:
      "Bu sayfaların ana içeriği neredeyse aynı; yalnızca birkaç kelime (şehir adı, renk, fiyat gibi) farklı. Menü, üst ve alt bilgi gibi her sayfada tekrar eden kısımlar karşılaştırmaya katılmaz. Google bu sayfalardan birini seçip diğerlerini arama sonucunda göstermeyebilir ve hangisini seçeceğine o karar verir. Genelde aynı şablonla çoğaltılmış konum, ürün çeşidi ya da etiket sayfalarında olur.",
    howToFix:
      "Her sayfaya kendine özgü, işe yarar içerik ekleyin. Gerçekten aynı şeyi anlatıyorlarsa tek sayfada birleştirin ya da diğerlerine asıl sayfayı gösteren bir canonical ekleyin.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
