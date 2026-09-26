/** Crawl health, HTTP status, robots.txt and the sitemap as an object. */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const CRAWL_ISSUES = {
  "blocked-page": {
    severity: "critical",
    title: "Tarayıcı engellendi",
    explanation:
      "Sayfa yerine bir bot doğrulaması ya da erişim reddi döndü (Cloudflare doğrulaması veya 403 gibi). Bu sayfa denetlenemedi. Arama motorlarının tarayıcıları da benzer bir engelle karşılaşıyor olabilir.",
    howToFix:
      'Site sizinse "seotracker-audit" kullanıcı aracısını güvenlik duvarı veya bot koruması ayarlarınızda izin listesine ekleyin (Cloudflare\'de: kullanıcı aracısı "seotracker-audit" içerdiğinde bot korumasını atlayan bir WAF kuralı). Sonra denetimi yeniden çalıştırın.',
  },
  "rate-limited-page": {
    severity: "warning",
    title: "İstek sınırına takıldı (429)",
    explanation:
      "Sunucu 429 Too Many Requests döndürdü, bu yüzden sayfa denetlenemedi. Sitenin bekleme süresi denetim süresine sığıyorsa tarayıcı bekleyip yeniden dener.",
    howToFix:
      'Tarayıcılar için istek sınırını yükseltin ya da "seotracker-audit" kullanıcı aracısını sınır kurallarınızın dışında bırakın. Sonra denetimi yeniden çalıştırın. Sınır çok katıysa daha az sayfayla çalıştırmak da işe yarar.',
  },
  "crawl-rate-limited": {
    severity: "warning",
    title: "Tarama erken durdu: istek sınırı",
    explanation:
      "Site, tarayıcıdan denetim süresinden daha uzun beklemesini istedi. Sayfa istemeyi bıraktık. Bu rapor eksiktir; çekemediğimiz adresler kırık ya da sınırlanmış olarak kaydedilmedi.",
    howToFix:
      "Sitenin istek sınırı sıfırlandıktan sonra denetimi yeniden çalıştırın, ya da site sahibinden seotracker-audit tarayıcısına izin vermesini isteyin.",
  },
  "server-error": {
    severity: "critical",
    title: "Sunucu hatası (5xx)",
    explanation:
      "Sayfa 5xx sunucu hatası döndürdü. Sürekli sunucu hatası gören arama motorları siteyi daha seyrek tarar ve sayfayı dizinden düşürebilir.",
    howToFix:
      "Bu adres için sunucu günlüklerine bakıp asıl hatayı giderin. Sayfa kaldırıldıysa hata yerine 404/410 döndürün veya ilgili bir sayfaya yönlendirin.",
  },
  "broken-internal-link": {
    severity: "critical",
    title: "Kırık iç bağlantı",
    explanation:
      "Bu sayfa, hata döndüren (4xx/5xx) bir iç adrese bağlantı veriyor. Kırık bağlantılar tarama bütçesini harcar ve ziyaretçiyi çıkmaza sokar.",
    howToFix:
      "Bağlantıyı doğru ve çalışan adrese güncelleyin ya da kaldırın. Hedef taşındıysa yönlendirmeye güvenmek yerine doğrudan yeni adrese bağlanın.",
  },
  "broken-page": {
    severity: "warning",
    title: "Sayfa hata döndürüyor (4xx)",
    explanation:
      "Taranan bu adres bir istemci hatası döndürdü (404 gibi). Site haritanızda veya başka sayfalarda geçiyorsa tarayıcılar boşuna istek yapmaya devam eder.",
    howToFix:
      "Sayfa var olmalıysa geri getirin. Bilerek kaldırıldıysa site haritasından ve iç bağlantılardan çıkarın, en yakın çalışan sayfaya 301 yönlendirmesi düşünün.",
  },
  "redirect-chain": {
    severity: "warning",
    title: "Yönlendirme zinciri",
    explanation:
      "Son sayfaya ulaşmak için arka arkaya iki veya daha fazla yönlendirme gerekiyor. Her adım gecikme ekler ve tarama bütçesi harcar; çok uzun zincirler (10 adımdan fazla) hiç takip edilmez.",
    howToFix:
      "İlk adresi ve ona veren iç bağlantıları doğrudan son hedefe yöneltin; en çok tek yönlendirme kalsın.",
  },
  "redirect-loop": {
    severity: "warning",
    title: "Yönlendirme döngüsü",
    explanation:
      "Bu yönlendirme dönüp dolaşıp kendine geliyor, yani adres hiç açılmıyor. Tarayıcılar ve arama motorları hata vererek vazgeçer.",
    howToFix:
      "Bu adresin yönlendirme kurallarını izleyip döngüyü kırın; zincir gerçek bir 200 sayfada bitmeli.",
  },
  "orphan-page": {
    severity: "warning",
    title: "Yetim sayfa",
    explanation:
      "Taranan hiçbir sayfa bu adrese bağlantı vermiyor. İç bağlantısı olmayan sayfalar daha seyrek taranır ve kullanıcı gezinerek onlara ulaşamaz.",
    howToFix:
      "Bu sayfaya ilgili sayfalardan bağlantı verin (menü, ilgili içerik, kategori sayfaları). Dizine girmemesi gerekiyorsa site haritasından çıkarın.",
  },
  "slow-response": {
    severity: "info",
    title: "Sunucu yanıtı yavaş",
    explanation:
      "HTML yanıtı 600 milisaniyeden uzun sürdü; Lighthouse de bu eşiği kullanır. İlk bayta kadar geçen sürenin yavaşlığı sonraki tüm performans ölçümlerini aşağı çeker ve büyük sitelerde tarama hızını düşürür. Bu süre denetimi çalıştıran makineden ölçülür, ziyaretçinizin bağlantısından değil.",
    howToFix:
      "Bu adres için sunucu ve veritabanı süresine, bir de önbelleğe bakın. Önbelleklenmiş ya da statik üretilmiş HTML sunmak genelde sorunu çözer.",
  },
  "robots-txt-server-error": {
    severity: "critical",
    title: "robots.txt sunucu hatası döndürüyor",
    explanation:
      "robots.txt dosyanız 5xx hatası veriyor. Google'ın kendi belgelerine göre bu durumda Google ilk 12 saat siteyi taramayı tamamen durdurur, sonrasında 30 gün boyunca dosyanın son sağlam kopyasını kullanır. Yani bu tek dosyanın hatası tüm sitenin taranmasını etkiler.",
    howToFix:
      "Sunucu hatasını giderin. robots.txt yoksa 404 döndürmesi sorun değildir; Google bunu 'kısıtlama yok' olarak okur. Hata 5xx olduğunda ise Google dosyayı okuyamadığını değil, okumaya çalışmaması gerektiğini varsayar.",
  },
  "robots-txt-unreachable": {
    severity: "warning",
    title: "robots.txt'ye ulaşılamadı",
    explanation:
      "robots.txt isteği hiç tamamlanmadı: zaman aşımı, DNS ya da TLS hatası. Bu tarama dosyayı okuyamadığı için sitenin tamamını taranabilir kabul etti; gerçek robots.txt farklı kurallar içeriyor olabilir.",
    howToFix:
      "Adresi tarayıcıda açıp gerçekten yanıt verdiğini doğrulayın. Yanıt veriyorsa bu geçici bir ağ hatası olabilir, denetimi tekrar çalıştırın.",
  },
  "robots-txt-truncated": {
    severity: "warning",
    title: "robots.txt 500 KiB sınırını aşıyor",
    explanation:
      "Google robots.txt dosyasının yalnızca ilk 500 KiB'ını okur ve gerisini yok sayar. Dosyanız bu sınırı aştığı için sondaki kurallar Google için hiç var olmamış gibi davranır.",
    howToFix:
      "Dosyayı kısaltın. Çok sayıda tekil adresi engellemek yerine dizin kalıpları kullanın; gerçekten dizine girmemesi gereken sayfalar için robots.txt yerine noindex daha kesin bir yoldur.",
  },
  "robots-txt-blocks-start-url": {
    severity: "critical",
    title: "Başlangıç adresi robots.txt ile engellenmiş",
    explanation:
      "Denetimi başlattığınız adresi sitenizin kendi robots.txt dosyası taramaya kapatıyor. Google da bu kurala uyar, yani bu sayfa taranmaz. Bu denetim de aynı nedenle o sayfadan başlayamadı.",
    howToFix:
      "Sayfanın taranması gerekiyorsa robots.txt'deki ilgili Disallow satırını kaldırın. Engel kasıtlıysa denetimi taranabilir bir adresten başlatın.",
  },
  "sitemap-broken-page": {
    severity: "critical",
    title: "Site haritasındaki sayfa açılmıyor",
    explanation:
      "Adres site haritanızda listelenmiş ama sunucu hata döndürüyor. Site haritası Google'a 'bu sayfaları tara ve dizine al' demenin yoludur; açılmayan bir adresi listelemek Google'ı boşa gönderir ve site haritanızın geri kalanına olan güveni azaltır.",
    howToFix:
      "Sayfa var olmalıysa hatayı giderin. Kaldırıldıysa adresi site haritasından çıkarın; site haritanız otomatik üretiliyorsa üretecin silinmiş sayfaları listelememesi gerekir.",
  },
  "sitemap-redirect-page": {
    severity: "warning",
    title: "Site haritasındaki sayfa yönlendiriyor",
    explanation:
      "Adres site haritanızda listelenmiş ama başka bir adrese yönlendiriyor. Google site haritasındaki adresleri asıl adres önerisi sayar, yani asıl olmadığını kendi söylediğiniz bir adresi öneriyorsunuz. Sayfa taşındıysa bu geçicidir; kalıcıysa harita eskimiş demektir.",
    howToFix:
      "Site haritasında yönlendirmenin hedefini listeleyin, kaynağını değil.",
  },
  "sitemap-disallowed-page": {
    severity: "warning",
    title: "Site haritasındaki adres robots.txt ile engellenmiş",
    explanation:
      "Aynı adres için sitenizin iki sistemi birbiriyle çelişiyor: site haritası Google'a 'bunu tara' derken robots.txt 'tarama' diyor. Google robots.txt'ye uyar ve sayfayı taramaz; başka sitelerden bağlantı alıyorsa içeriğini görmeden yine de dizine alabilir.",
    howToFix:
      "Sayfanın dizine girmesini istiyorsanız robots.txt engelini kaldırın. İstemiyorsanız adresi site haritasından çıkarın.",
  },
  "sitemap-canonicalized-page": {
    severity: "info",
    title: "Site haritasındaki sayfa başka adrese canonical veriyor",
    explanation:
      "Sayfa site haritasında listelenmiş, ama kendi içinde asıl adres olarak başka bir adresi bildiriyor. Google site haritasındaki adresleri asıl adres önerisi sayar, dolayısıyla aynı sayfa için iki farklı öneri göndermiş oluyorsunuz. Google bu iki öneriden birini seçer; bilinçli yaptıysanız sorun değil.",
    howToFix:
      "Site haritası yalnızca asıl adresleri listelemelidir: bu adresi haritadan çıkarın ya da canonical değerini sayfanın kendisine çevirin.",
  },
  "sitemap-noindex-page": {
    severity: "info",
    title: "Site haritasındaki sayfa noindex",
    explanation:
      "Sayfa site haritasında listelenmiş ama noindex işaretli. Site haritası dizine almayı garanti etmez; adres keşfine yarar ve listelediği adresleri asıl adres olarak önerir. Yani burada gösterilmeyecek bir sayfayı öneriyorsunuz. Bu çoğu zaman geçicidir: bir sayfayı yeni noindex yaptıysanız Google yönergeyi görebilmek için sayfayı yine de taramalıdır.",
    howToFix:
      "Sayfa dizine girecekse noindex yönergesini kaldırın. Kalıcı olarak girmeyecekse, Google yönergeyi gördükten sonra sayfayı site haritasından çıkarın.",
  },
  "deep-page": {
    severity: "info",
    title: "Sayfa site yapısında çok derinde",
    explanation:
      "Sayfa, ana sayfadan 5 veya daha fazla tık uzakta. Derin sayfalar daha seyrek taranır ve kullanıcının onları bulması zorlaşır.",
    howToFix:
      "Üst seviyedeki sayfalardan (kategori sayfaları, menü, toplayıcı sayfalar) bu sayfaya bağlantı ekleyerek yolu kısaltın.",
  },
  "sitemap-too-large": {
    severity: "warning",
    title: "Site haritası dosyası okunamayacak kadar büyük",
    explanation:
      "Site haritası parçalarından biri bu aracın okuma sınırını (10 MB) aştı, bu yüzden içindeki adresler bu denetime hiç girmedi. Google'ın kendi sınırı 50 MB, yani dosya Google için geçerli olabilir; ama burada gördüğünüz sayfa listesi eksik.",
    howToFix:
      "Site haritanızı parçalara bölün ve bir site haritası dizini ile birbirine bağlayın. Google zaten her parçanın 50 MB ya da 50.000 adresin altında kalmasını istiyor; daha küçük parçalar her iki tarafın da işine yarar.",
  },
  "sitemap-too-many-urls": {
    severity: "warning",
    title: "Site haritasında 50.000'den fazla adres var",
    explanation:
      "Google tek bir site haritası dosyasının en fazla 50.000 adres içermesine izin verir. Bu parça sınırı aşıyor, yani Google dosyayı reddedebilir ya da bir kısmını yok sayabilir.",
    howToFix:
      "Dosyayı her biri 50.000 adresin altında kalan parçalara bölün ve bir site haritası dizini (sitemapindex) ile hepsini listeleyin. Search Console'a dizin dosyasını gönderirsiniz, parçaları tek tek değil.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
