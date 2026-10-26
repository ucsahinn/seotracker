/**
 * Findings read from the Lighthouse report PageSpeed Insights already sends
 * back for every measured page (the mobile run decides, as for Core Web
 * Vitals).
 *
 * Each one is Lighthouse's own verdict on one of its audits, with the
 * savings Lighthouse estimated, and nothing is inferred beyond it: an audit
 * Lighthouse did not run, skipped or could not finish is not a finding and
 * not a pass. Lighthouse's ids and titles are data; the prose here is ours.
 *
 * The ids PageSpeed Insights reports since Lighthouse 13 are the "insight"
 * audits ("render-blocking-insight", "image-delivery-insight", ...), which
 * replaced the older opportunity audits ("render-blocking-resources",
 * "modern-image-formats", ...). The checks read the current ids.
 */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const LIGHTHOUSE_AUDIT_ISSUES = {
  // ---- Performance opportunities ----
  "lh-render-blocking": {
    severity: "warning",
    title: "Sayfanın ilk görünümünü engelleyen dosyalar var",
    explanation:
      "Tarayıcı bazı CSS ve JavaScript dosyalarını indirip işlemeden sayfada hiçbir şey göstermiyor. Lighthouse, bunlar ertelenirse ilk içeriğin daha erken görüneceğini hesapladı; tahmini kazanç bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Sayfanın ilk ekranı için gerekmeyen betiklere defer ya da async ekleyin, ilk ekran için gereken küçük CSS'i sayfaya gömün, kalan CSS'i sonradan yükleyin. WordPress'te bir önbellek eklentisinin \"JavaScript'i ertele\" ve \"kritik CSS\" ayarları bu işi yapar.",
  },
  "lh-unused-javascript": {
    severity: "warning",
    title: "Sayfada kullanılmayan JavaScript yükleniyor",
    explanation:
      "Sayfa, açılışta hiç çalışmayan JavaScript kodunu da indiriyor. Telefonda bu hem veri hem işlemci harcar ve sayfayı yavaşlatır. Lighthouse'un tahmin ettiği tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Kullanılmayan eklentileri ve etiketleri kaldırın, büyük betik paketlerini sayfaya göre bölün ve yalnızca gereken sayfada yükleyin. Hangi dosyanın ne kadar boşa indiğini PageSpeed Insights raporunda görürsünüz.",
  },
  "lh-unused-css": {
    severity: "info",
    title: "Sayfada kullanılmayan CSS yükleniyor",
    explanation:
      "Sayfa, bu sayfada hiçbir öğeye uygulanmayan stil kurallarını da indiriyor. Genelde tüm siteye tek bir büyük tema dosyası yüklendiğinde olur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Tema ya da eklentilerin kullanılmayan stil dosyalarını kapatın; bir derleme aracı kullanıyorsanız kullanılmayan CSS'i temizleyen adımı açın.",
  },
  "lh-unminified-javascript": {
    severity: "info",
    title: "JavaScript dosyaları sıkıştırılmamış (küçültülmemiş)",
    explanation:
      "Bazı JavaScript dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Küçültme dosyayı anlamını değiştirmeden küçültür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Derleme aracınızda küçültmeyi (minify) açın ya da önbellek/CDN ayarlarından JavaScript küçültmeyi etkinleştirin.",
  },
  "lh-unminified-css": {
    severity: "info",
    title: "CSS dosyaları sıkıştırılmamış (küçültülmemiş)",
    explanation:
      "Bazı CSS dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Derleme aracınızda CSS küçültmeyi açın ya da önbellek/CDN ayarlarından CSS küçültmeyi etkinleştirin.",
  },
  "lh-image-delivery": {
    severity: "warning",
    title: "Görseller gereğinden büyük indiriliyor",
    explanation:
      "Lighthouse sayfadaki bazı görsellerin daha küçük indirilebileceğini hesapladı: eski bir biçimde (JPEG, PNG) sunuluyorlar, sıkıştırılmamışlar ya da ekranda gösterildiklerinden çok daha büyük boyutta indiriliyorlar. Tahmini tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Görselleri WebP ya da AVIF'e çevirin, sıkıştırın ve ekrandaki boyutlarına göre küçültün; farklı ekranlar için srcset ile birden çok boyut sunun. Çoğu CMS'te bir görsel optimizasyon eklentisi bunu otomatik yapar.",
  },
  "lh-cache-policy": {
    severity: "info",
    title: "Dosyalar tarayıcıda yeterince uzun saklanmıyor",
    explanation:
      "Görsel, betik ve stil dosyaları kısa bir önbellek süresiyle ya da hiç önbellek bilgisi olmadan sunuluyor. Ziyaretçi siteye dönünce aynı dosyaları yeniden indirir. Lighthouse'un tahmin ettiği tekrar ziyaret tasarrufu bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      'Değişmeyen dosyalara uzun bir Cache-Control süresi verin (örneğin max-age=31536000) ve dosya değiştiğinde adını değiştirin. Barındırma panelinde ya da CDN\'de "tarayıcı önbelleği" ayarı genelde bunu yapar.',
  },
  "lh-total-byte-weight": {
    severity: "info",
    title: "Sayfanın toplam indirme boyutu çok büyük",
    explanation:
      "Sayfayı açmak için indirilen her şeyin toplamı 2,5 MB'ı geçiyor. Mobil bağlantıda bu uzun bir yükleme ve ziyaretçinin veri paketinden harcama demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "PageSpeed Insights raporunda en büyük dosyalara bakın. Genelde görseller, videolar ve büyük betik paketleridir: görselleri küçültün, videoyu tıklanınca yükleyin, gereksiz betikleri kaldırın.",
  },
  "lh-dom-size": {
    severity: "info",
    title: "Tarayıcıda oluşan sayfa yapısı çok büyük",
    explanation:
      "Lighthouse, sayfa tarayıcıda çalıştıktan sonra oluşan HTML yapısının çok büyük olduğunu buldu. Bu, sayfanın kaynak kodunu sayan kontrolden farklıdır: JavaScript'in sonradan eklediği öğeleri de içerir. Büyük bir yapı stil hesaplamayı ve tıklamalara yanıtı yavaşlatır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Görünmeyen içeriği (kapalı menüler, sekmeler, uzun listeler) gerektiğinde oluşturun ve sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.",
  },
  "lh-document-redirects": {
    severity: "warning",
    title: "Sayfa açılmadan önce yönlendirme yapılıyor",
    explanation:
      "Lighthouse sayfanın ana belgesine ulaşmadan önce bir ya da daha fazla yönlendirmeden geçti. Her yönlendirme, içerik görünmeden önce fazladan bir istek demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Bu sayfaya giden bağlantıları ve site haritasını doğrudan son adrese çevirin; yönlendirme gerekiyorsa tek adımda bitsin.",
  },
  "lh-slow-server-response": {
    severity: "info",
    title: "Sunucu ilk yanıtı geç veriyor (Lighthouse)",
    explanation:
      "Lighthouse'un ölçümünde sunucunun sayfanın ilk baytını göndermesi 600 milisaniyeden uzun sürdü. Sunucu yanıt vermeden tarayıcı hiçbir şey yapamaz; bu süre sayfanın tüm açılışına eklenir. Tarayıcımızın kendi ölçtüğü yanıt süresinden ayrı, Google'ın sunucularından yapılan bir ölçümdür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Sayfa önbelleğini (tam sayfa önbellek) açın, yavaş veritabanı sorgularını ve eklentileri bulun, gerekirse daha güçlü bir sunucuya ya da bir CDN'e geçin.",
  },
  "lh-text-compression": {
    severity: "warning",
    title: "Sayfa sıkıştırılmadan gönderiliyor",
    explanation:
      "Lighthouse, sayfanın HTML belgesinin gzip ya da Brotli ile sıkıştırılmadan gönderildiğini gördü. Sıkıştırma metin dosyalarını genelde üçte bire indirir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Sunucunuzda ya da CDN'de gzip veya Brotli sıkıştırmayı açın. Çoğu barındırma panelinde tek bir ayardır.",
  },
  "lh-font-display": {
    severity: "info",
    title: "Yazı tipleri yüklenirken metin görünmüyor",
    explanation:
      "Özel yazı tipleri yüklenene kadar metin görünmez kalıyor. Lighthouse, metnin yedek yazı tipiyle hemen gösterilmesinin ilk görünümü hızlandıracağını hesapladı. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "@font-face kurallarına font-display: swap ekleyin. Google Fonts kullanıyorsanız adresin sonuna &display=swap ekleyin.",
  },
  "lh-lcp-lazy-loaded": {
    severity: "warning",
    title: "Sayfanın ana görseli geç yüklenecek şekilde işaretlenmiş",
    explanation:
      'Sayfanın en büyük öğesi (LCP) olan görselde loading="lazy" var. Tarayıcı bu görseli sayfa yerleşimi bitene kadar istemez, bu yüzden ana içerik geç görünür. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.',
    howToFix:
      'Sayfanın ilk ekranındaki ana görselden loading="lazy" özniteliğini kaldırın. Geç yükleme yalnızca ilk ekranın altındaki görsellere uygulanmalı.',
  },
  "lh-lcp-not-prioritized": {
    severity: "info",
    title: "Sayfanın ana görseli öncelikli istenmiyor",
    explanation:
      "Sayfanın en büyük öğesi (LCP) olan görsel ya sayfanın ilk HTML'inde yer almıyor (tarayıcı onu geç keşfediyor) ya da fetchpriority=\"high\" ile öncelikli istenmiyor. Ayrıntıda hangisinin eksik olduğu yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      'Ana görseli sayfanın HTML\'inde doğrudan bir <img> olarak verin (yalnızca JavaScript ya da CSS arka planı ile değil) ve ona fetchpriority="high" ekleyin. Gerekirse <link rel="preload"> ile önceden yükleyin.',
  },
  "lh-modern-http": {
    severity: "info",
    title: "Dosyalar eski HTTP/1.1 ile sunuluyor",
    explanation:
      "Sayfanın dosyalarının bir kısmı HTTP/2 ya da HTTP/3 yerine HTTP/1.1 ile geliyor. Eski protokolde tarayıcı aynı anda az sayıda dosya indirebilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Sunucunuzda ya da CDN'de HTTP/2'yi (tercihen HTTP/3'ü) açın. Çoğu modern barındırma ve CDN bunu varsayılan olarak destekler.",
  },
  "lh-legacy-javascript": {
    severity: "info",
    title: "Eski tarayıcılar için gereksiz JavaScript gönderiliyor",
    explanation:
      "Sayfadaki betikler, güncel tarayıcıların zaten bildiği özellikler için eski tarayıcılara yönelik ek kod (polyfill, dönüştürme) içeriyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Derleme aracınızın hedef tarayıcı ayarını (browserslist) güncel tarayıcılara çekin ve artık gerekmeyen polyfill'leri kaldırın.",
  },
  "lh-third-parties": {
    severity: "info",
    title: "Üçüncü taraf kodlar tarayıcıyı uzun süre meşgul ediyor",
    explanation:
      "Reklam, sohbet, analiz ya da sosyal medya gibi başka sitelerden gelen betikler telefonda tarayıcının ana iş parçacığını toplam yarım saniyeden uzun meşgul etti. Bu sürede sayfa tıklamalara geç yanıt verir. Hangi hizmetin ne kadar sürdüğü bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Kullanmadığınız etiketleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin; sohbet ya da video gibi ağır gömülü öğeleri tıklanınca yüklenen bir önizlemeyle değiştirin.",
  },

  // ---- Core Web Vitals, the band before "poor" ----
  "cwv-lcp-needs-improvement": {
    severity: "info",
    title: "Ana içeriğin yüklenmesi iyileştirilebilir (LCP)",
    explanation:
      "Sayfanın en büyük öğesi 2,5 ile 4 saniye arasında göründü. Google bu aralığı 'iyileştirilmeli' sayar; 2,5 saniye ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa PageSpeed Insights'ın laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.",
    howToFix:
      "En büyük öğe genelde kapak görseli ya da ana başlıktır: görseli küçültüp WebP gibi hafif bir biçime çevirin, geç yüklenmesini kapatın ve onu engelleyen betik ve yazı tiplerini erteleyin.",
  },
  "cwv-cls-needs-improvement": {
    severity: "info",
    title: "Yüklenirken içerik biraz kayıyor (CLS)",
    explanation:
      "Sayfa yüklenirken içerik 0,1 ile 0,25 arasında kaydı. Google bu aralığı 'iyileştirilmeli' sayar; 0,1 ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.",
    howToFix:
      "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, sonradan yüklenen afiş ve reklamlar için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek tanımlayın.",
  },
  "cwv-inp-needs-improvement": {
    severity: "info",
    title: "Tıklamalara yanıt iyileştirilebilir (INP)",
    explanation:
      "Sayfa tıklama ve dokunuşlara 200 ile 500 milisaniye arasında yanıt verdi. Google bu aralığı 'iyileştirilmeli' sayar; 200 milisaniye ve altı 'iyi'dir. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarının gerçek (alan) verisidir.",
    howToFix:
      "Tıklamada çalışan uzun betikleri bölün, üçüncü taraf etiketleri sayfa açıldıktan sonra yükleyin ve gereksiz olanları kaldırın.",
  },

  // ---- Accessibility (one finding per Lighthouse audit) ----
  "lh-a11y-color-contrast": {
    severity: "warning",
    title: "Bazı metinlerin renk karşıtlığı yetersiz",
    explanation:
      "Bazı metinler arka planlarıyla yeterince ayrışmıyor; az gören ziyaretçiler ve güneş altında telefon kullananlar onları zor okur. Kaç öğenin etkilendiği ayrıntıda yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Normal metin için en az 4,5:1, büyük metin için 3:1 karşıtlık oranı sağlayın. Hangi öğelerin yetersiz kaldığını PageSpeed Insights'ın Erişilebilirlik bölümünde görürsünüz.",
  },
  "lh-a11y-image-alt": {
    severity: "warning",
    title: "Görsellerde alternatif metin eksik (Lighthouse)",
    explanation:
      "Lighthouse, sayfa tarayıcıda çalıştıktan sonra alternatif metni (alt) olmayan görseller buldu. Bu, JavaScript'in sonradan eklediği görselleri de kapsar. Ekran okuyucular bu görselleri anlatamaz, Google da ne gösterdiklerini metinden öğrenemez. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      'Her anlamlı görsele ne gösterdiğini anlatan kısa bir alt metni ekleyin; süs amaçlı görsellere boş alt="" verin.',
  },
  "lh-a11y-label": {
    severity: "warning",
    title: "Form alanlarının etiketi yok (Lighthouse)",
    explanation:
      "Bazı form alanlarına bağlı bir etiket yok. Ekran okuyucu kullanan ziyaretçi alana ne yazması gerektiğini duyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Her alana for özniteliğiyle bağlı bir <label> ekleyin; görünür etiket istenmiyorsa aria-label kullanın.",
  },
  "lh-a11y-link-name": {
    severity: "warning",
    title: "Bazı bağlantıların okunabilir adı yok",
    explanation:
      'Bazı bağlantılarda ne metin ne de erişilebilir bir ad var (örneğin yalnızca bir simge). Ekran okuyucu bunları yalnızca "bağlantı" diye okur; Google da bağlantının neye gittiğini metinden anlayamaz. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.',
    howToFix:
      "Bağlantıya görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.",
  },
  "lh-a11y-button-name": {
    severity: "warning",
    title: "Bazı düğmelerin okunabilir adı yok",
    explanation:
      'Bazı düğmelerde ne metin ne de erişilebilir bir ad var. Ekran okuyucu bunları yalnızca "düğme" diye okur. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.',
    howToFix:
      "Düğmeye görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.",
  },
  "lh-a11y-document-title": {
    severity: "warning",
    title: "Sayfanın tarayıcıda başlığı yok (Lighthouse)",
    explanation:
      "Lighthouse, sayfa tarayıcıda çalıştıktan sonra bir <title> bulamadı. Sekmede ve arama sonucunda başlık olarak gösterilecek bir şey yok. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Sayfanın <head> bölümüne sayfayı anlatan benzersiz bir <title> ekleyin; başlığı JavaScript ile sonradan yazıyorsanız sunucunun gönderdiği HTML'e taşıyın.",
  },
  "lh-a11y-html-has-lang": {
    severity: "info",
    title: "Sayfanın dili tarayıcıda belirtilmemiş (Lighthouse)",
    explanation:
      "Lighthouse, <html> öğesinde lang özniteliği bulamadı. Ekran okuyucular metni yanlış dilin kurallarıyla okuyabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      'Sayfanın <html> etiketine dilini ekleyin, örneğin <html lang="tr">.',
  },
  "lh-a11y-meta-viewport": {
    severity: "warning",
    title: "Telefonda yakınlaştırma engellenmiş (Lighthouse)",
    explanation:
      "Sayfanın viewport ayarı ziyaretçinin metni büyütmesini engelliyor (user-scalable=no ya da düşük bir maximum-scale). Az gören ziyaretçiler sayfayı okuyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      'Viewport etiketinden user-scalable=no ve maximum-scale değerini kaldırın; content="width=device-width, initial-scale=1" yeterlidir.',
  },
  "lh-a11y-target-size": {
    severity: "info",
    title: "Dokunma hedefleri çok küçük ya da çok sık",
    explanation:
      "Bazı düğme ve bağlantılar telefonda parmakla rahat dokunulamayacak kadar küçük ya da birbirine çok yakın. Ziyaretçi yanlış yere dokunur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Dokunulan öğelere en az 24×24 piksel alan verin ve aralarında boşluk bırakın; menü ve altbilgi bağlantıları genelde bunun için büyütülmelidir.",
  },
  "lh-a11y-heading-order": {
    severity: "info",
    title: "Başlık sırası tarayıcıda atlıyor (Lighthouse)",
    explanation:
      "Lighthouse, sayfa tarayıcıda çalıştıktan sonra başlık düzeylerinin sırayla gitmediğini gördü (örneğin H2'den H4'e atlama). Ekran okuyucu kullananlar sayfada başlıklarla gezinir ve atlanan düzey yapıyı bozar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Başlıkları sırayla kullanın (H1, H2, H3); bir başlığı yalnızca küçük görünsün diye alt düzeyden seçmeyin, boyutu CSS ile ayarlayın.",
  },

  // ---- Best practices ----
  "lh-is-on-https": {
    severity: "warning",
    title: "Sayfa güvensiz (http) istekler yapıyor",
    explanation:
      'Lighthouse, sayfanın kendisinin ya da yüklediği bazı dosyaların şifresiz http ile geldiğini gördü. Tarayıcı bu istekleri engelleyebilir ya da "Güvenli değil" uyarısı gösterebilir. Hangi adreslerin güvensiz olduğu ayrıntıda yazar. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.',
    howToFix:
      "Sayfayı ve yüklediği tüm dosyaları https adresinden sunun; sayfadaki http:// ile başlayan dosya adreslerini https:// yapın.",
  },
  "lh-errors-in-console": {
    severity: "info",
    title: "Sayfa açılırken tarayıcı hata kaydediyor",
    explanation:
      "Sayfa açılırken tarayıcının konsoluna hata düştü: yüklenemeyen bir dosya, çalışırken çöken bir betik ya da engellenen bir istek. Bazıları ziyaretçiye görünmez, bazıları bir özelliğin çalışmadığını gösterir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Sayfayı Chrome'da açıp geliştirici araçlarının Konsol sekmesine bakın; ayrıntıdaki adreslerden başlayarak hataları giderin.",
  },
  "lh-deprecations": {
    severity: "info",
    title: "Sayfa tarayıcıların kaldıracağı özellikler kullanıyor",
    explanation:
      "Sayfa, Chrome'un kullanımdan kaldırdığı ya da kaldıracağı özellikleri kullanıyor. Şimdi çalışıyor olabilir ama bir tarayıcı güncellemesinden sonra bozulabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "PageSpeed Insights raporundaki listeye bakın; genelde eski bir eklenti ya da kütüphanedir ve güncellemek yeterlidir.",
  },
  "lh-inspector-issues": {
    severity: "info",
    title: "Tarayıcı sayfada sorunlar bildiriyor",
    explanation:
      "Chrome'un geliştirici araçlarındaki \"Sorunlar\" bölümü bu sayfa için kayıt tuttu: örneğin engellenen çerezler, güvenlik başlığı sorunları ya da hatalı kaynak istekleri. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      'Sayfayı Chrome\'da açıp geliştirici araçlarının "Issues" (Sorunlar) sekmesine bakın ve listelenen sorunları giderin.',
  },
  "lh-image-aspect-ratio": {
    severity: "info",
    title: "Bazı görseller yanlış oranla gösteriliyor",
    explanation:
      "Bazı görseller, kendi en-boy oranlarından farklı bir oranda gösterildiği için basık ya da uzamış görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Görselin width ve height değerlerini kendi oranına uygun verin ya da CSS'te object-fit kullanın.",
  },
  "lh-image-size-responsive": {
    severity: "info",
    title: "Bazı görseller ekran için düşük çözünürlüklü",
    explanation:
      "Bazı görseller, telefonun ekran yoğunluğuna göre gereğinden küçük çözünürlükte sunuluyor ve bulanık görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Görsellerin daha büyük sürümlerini srcset ile sunun, böylece tarayıcı ekrana uygun olanı seçer.",
  },

  // ---- Lighthouse's own SEO audits ----
  "lh-crawlable-anchors": {
    severity: "warning",
    title: "Bazı bağlantılar taranamıyor (Lighthouse)",
    explanation:
      "Lighthouse, sayfa tarayıcıda çalıştıktan sonra Google'ın izleyemeyeceği bağlantılar buldu: geçerli bir href'i olmayan ya da yalnızca JavaScript ile çalışan bağlantılar. Google yalnızca href'i gerçek bir adres olan <a> bağlantılarını izler. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Her bağlantıyı href özniteliği gerçek bir adres olan bir <a> etiketi yapın; javascript: ya da yalnızca onclick ile çalışan bağlantıları değiştirin.",
  },
  "lh-link-text": {
    severity: "info",
    title: "Bağlantı metinleri açıklayıcı değil (Lighthouse)",
    explanation:
      'Bazı bağlantıların metni "buraya tıklayın" ya da "devamı" gibi gittiği yeri anlatmayan sözlerden oluşuyor. Google bağlantı metninden hedef sayfanın konusunu öğrenir. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.',
    howToFix:
      'Bağlantı metnini gittiği sayfanın konusunu anlatacak şekilde yazın, örneğin "devamı" yerine "kargo ücretleri".',
  },
  "lh-is-crawlable": {
    severity: "warning",
    title: "Google sayfayı dizine alamıyor (Lighthouse)",
    explanation:
      "Tarayıcımız bu sayfayı dizine alınabilir gördü, ama Lighthouse'un ölçümünde Google'ın sayfayı dizine almasını engelleyen bir kural vardı (robots.txt, noindex etiketi ya da X-Robots-Tag başlığı). Kural yalnızca Google'a ya da yalnızca bazı ziyaretçilere gösteriliyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Sayfanın aramada görünmesi gerekiyorsa robots.txt'teki ilgili Disallow satırını ve sayfadaki noindex kuralını kaldırın; sunucunun Googlebot'a farklı bir yanıt vermediğini kontrol edin.",
  },
  "lh-robots-txt": {
    severity: "warning",
    title: "robots.txt dosyasında geçersiz satırlar var",
    explanation:
      "Lighthouse sitenin robots.txt dosyasında kurallara uymayan satırlar buldu. Google geçersiz satırları yok sayar, yani yazdığınız bir kural uygulanmıyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      'robots.txt\'i açın ve PageSpeed Insights raporunda gösterilen satırları düzeltin; her satır "Alan: değer" biçiminde olmalı (User-agent, Disallow, Allow, Sitemap).',
  },
  "lh-hreflang": {
    severity: "warning",
    title: "hreflang etiketleri geçersiz (Lighthouse)",
    explanation:
      "Lighthouse, sayfadaki dil sürümü (hreflang) etiketlerinde geçersiz bir dil kodu ya da göreli bir adres buldu. Google geçersiz hreflang etiketlerini yok sayar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Her hreflang değerinin geçerli bir dil kodu (tr, en-GB gibi) ve adresin tam adres (https:// ile başlayan) olduğundan emin olun.",
  },
  "lh-canonical": {
    severity: "warning",
    title: "canonical etiketi geçersiz (Lighthouse)",
    explanation:
      "Lighthouse sayfanın canonical etiketini geçersiz buldu: birbiriyle çelişen birden çok adres, geçersiz bir adres, başka bir alan adına ya da sitenin ana sayfasına işaret eden bir adres olabilir. Google böyle bir canonical'ı yok sayabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.",
    howToFix:
      "Sayfada tek bir canonical etiketi bırakın ve onu sayfanın kendi tam adresine (ya da gerçekten asıl olan sayfaya) yönlendirin.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
