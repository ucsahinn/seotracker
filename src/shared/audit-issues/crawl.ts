/** Crawl health, HTTP status, robots.txt and the sitemap as an object. */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const CRAWL_ISSUES = {
  "blocked-page": {
    severity: "critical",
    title: "Tarama robotu engellendi",
    explanation:
      "Sayfa yerine bir bot doğrulaması ya da erişim engeli döndü (Cloudflare doğrulaması ya da 403 gibi), bu yüzden sayfa denetlenemedi. Google'ın tarayıcısı da benzer bir engele takılıyor olabilir; takılırsa sayfa aramada çıkmaz.",
    howToFix:
      'Site sizinse güvenlik duvarınızda ya da bot korumanızda "seotracker-audit" kullanıcı aracısına izin verin (Cloudflare\'de: kullanıcı aracısı "seotracker-audit" içerdiğinde bot korumasını atlayan bir WAF kuralı). Sonra denetimi yeniden başlatın.',
  },
  "rate-limited-page": {
    severity: "warning",
    title: "İstek sınırına takıldı (429)",
    explanation:
      "Sunucu 429 (çok fazla istek) yanıtı verdi, bu yüzden sayfa denetlenemedi. Sitenin istediği bekleme süresi denetimin süresine sığıyorsa tarayıcı bekleyip yeniden dener.",
    howToFix:
      'Sunucunuzda ya da güvenlik duvarınızda istek sınırını yükseltin veya "seotracker-audit" kullanıcı aracısını sınırın dışında tutun. Sonra denetimi yeniden başlatın. Sınır çok katıysa denetimi daha az sayfayla başlatmak da işe yarar.',
  },
  "crawl-rate-limited": {
    severity: "warning",
    title: "Tarama erken durdu: istek sınırı",
    explanation:
      "Site, tarayıcıdan denetimin süresinden uzun beklemesini istedi, biz de sayfa istemeyi bıraktık. Bu rapor eksik; çekemediğimiz adresler kırık ya da sınırlanmış diye kaydedilmedi.",
    howToFix:
      "Sitenin istek sınırı sıfırlandıktan sonra denetimi yeniden başlatın. Sorun sürerse site yöneticisinden seotracker-audit tarayıcısına izin vermesini isteyin.",
  },
  "server-error": {
    severity: "critical",
    title: "Sunucu hatası (5xx)",
    explanation:
      "Sayfa 5xx sunucu hatası verdi. Google sürekli hata veren siteyi daha seyrek tarar ve sayfayı dizinden çıkarabilir.",
    howToFix:
      "Sunucu günlüklerinde bu adrese ait hatayı bulup giderin. Sayfa bilerek kaldırıldıysa hata yerine 404 ya da 410 döndürün veya ilgili bir sayfaya yönlendirin.",
  },
  "broken-internal-link": {
    severity: "warning",
    title: "Kırık iç bağlantı",
    explanation:
      "Bu sayfa, hata veren (4xx ya da 5xx) başka bir sayfaya bağlantı veriyor. Kırık bağlantı ziyaretçiyi çıkmaza sokar ve Google'ın sayfaya ulaşmasını engeller; çok büyük sitelerde taramayı da boşa harcar.",
    howToFix:
      "Bağlantıyı çalışan doğru adrese çevirin ya da kaldırın. Hedef taşındıysa yönlendirmeye güvenmeyin, doğrudan yeni adrese bağlanın.",
  },
  "broken-page": {
    severity: "warning",
    title: "Sayfa açılırken hata veriyor (4xx)",
    explanation:
      "Bu adres hata döndürdü (404 gibi). Site haritanızda ya da başka sayfalarda geçiyorsa Google boşuna istek yapmaya devam eder; bu, esas olarak çok büyük sitelerde tarama bütçesi açısından önemlidir.",
    howToFix:
      "Sayfa var olmalıysa geri yayınlayın. Bilerek kaldırıldıysa site haritasından ve iç bağlantılardan çıkarın; yerine geçecek bir sayfa varsa oraya 301 (kalıcı) yönlendirme verin.",
  },
  "redirect-chain": {
    severity: "warning",
    title: "Yönlendirme zinciri",
    explanation:
      "Son sayfaya ulaşmak için art arda iki ya da daha fazla yönlendirme gerekiyor. Her adım sayfayı yavaşlatır ve tarama bütçesinden (Google'ın siteniz için ayırdığı tarama zamanından) harcar; bu, esas olarak çok büyük siteler için önemlidir. Çok uzun zincirler (10 adımdan fazla) Google'ın takip ettiği kadarıyla hiç izlenmez.",
    howToFix:
      "İlk adresi ve ona bağlantı veren sayfaları doğrudan son hedefe yönlendirin; en fazla tek yönlendirme kalsın.",
  },
  "redirect-loop": {
    severity: "warning",
    title: "Yönlendirme döngüsü",
    explanation:
      "Bu adresin yönlendirmesi dönüp dolaşıp kendine geliyor, yani sayfa hiç açılmıyor. Tarayıcılar ve Google hata verip vazgeçer.",
    howToFix:
      "Bu adresin yönlendirme kurallarını izleyip döngüyü kırın; zincir gerçekten açılan bir sayfada (200) bitmeli.",
  },
  "orphan-page": {
    severity: "warning",
    title: "Hiçbir sayfadan bağlantı almayan sayfa",
    explanation:
      "Taranan hiçbir sayfa bu adrese bağlantı vermiyor. Google sayfaları bağlantıları izleyerek bulur, bu yüzden böyle bir sayfa daha seyrek taranır ve ziyaretçi gezinerek ona ulaşamaz.",
    howToFix:
      "İlgili sayfalardan buraya bağlantı verin (menü, ilgili yazılar, kategori sayfası). Sayfanın aramada çıkması gerekmiyorsa site haritasından da çıkarın.",
  },
  "slow-response": {
    severity: "info",
    title: "Sunucu yanıtı yavaş",
    explanation:
      "Sunucu sayfanın HTML'ini 600 milisaniyeden geç verdi; Lighthouse de aynı eşiği kullanır. Bu gecikme sayfanın geri kalan tüm hız ölçümlerini de aşağı çeker. Süre, denetimi çalıştıran bilgisayardan ölçülür, ziyaretçilerinizin bağlantısından değil.",
    howToFix:
      "Bu sayfa için sunucu ve veritabanı süresine bakın, önbelleği açın. Önbelleğe alınmış ya da önceden üretilmiş (statik) HTML sunmak genelde sorunu çözer.",
  },
  "robots-txt-server-error": {
    severity: "critical",
    title: "robots.txt dosyası sunucu hatası veriyor",
    explanation:
      "robots.txt dosyanız 5xx sunucu hatası veriyor. Google'ın belgelerine göre bu durumda ilk 12 saat siteyi hiç taramaz, sonra 30 gün boyunca dosyanın son çalışan kopyasını kullanır. Yani bu tek dosyanın hatası tüm sitenin taranmasını etkiler.",
    howToFix:
      "Sunucu hatasını giderin ve robots.txt adresinin normal açıldığını doğrulayın. Dosya hiç yoksa 404 döndürmesi sorun değildir; Google bunu 'kısıtlama yok' diye okur.",
  },
  "robots-txt-unreachable": {
    severity: "warning",
    title: "robots.txt'ye ulaşılamadı",
    explanation:
      "robots.txt isteği tamamlanmadı (zaman aşımı, DNS ya da TLS hatası). Bu denetim dosyayı okuyamadığı için siteyi tamamen taranabilir saydı; gerçek robots.txt farklı kurallar içeriyor olabilir.",
    howToFix:
      "robots.txt adresini tarayıcıda açıp yanıt verdiğini kontrol edin. Yanıt veriyorsa hata geçici bir ağ sorunuydu, denetimi yeniden başlatın.",
  },
  "robots-txt-truncated": {
    severity: "warning",
    title: "robots.txt 500 KiB sınırını aşıyor",
    explanation:
      "Google robots.txt dosyasının yalnızca ilk 500 KiB'ını okur, gerisini yok sayar. Dosyanız bu sınırı aştığı için sondaki kurallar Google için yokmuş gibi davranır.",
    howToFix:
      "Dosyayı kısaltın. Tek tek adresleri engellemek yerine klasör kalıpları kullanın. Aramada çıkmaması gereken sayfalar için robots.txt yerine noindex daha kesin bir yoldur. Ama noindex'in çalışması için sayfanın robots.txt ile engellenmemiş olması gerekir; Google engellenmiş sayfadaki noindex'i göremez.",
  },
  "robots-txt-blocks-start-url": {
    severity: "critical",
    title: "Başlangıç adresi robots.txt ile engellenmiş",
    explanation:
      "Denetimi başlattığınız adresi sitenizin kendi robots.txt dosyası taramaya kapatıyor. Google da bu kurala uyar, yani bu sayfayı taramaz. Bu denetim de aynı nedenle o sayfadan başlayamadı.",
    howToFix:
      "Sayfanın taranması gerekiyorsa robots.txt'teki ilgili Disallow satırını kaldırın. Engel bilerek konduysa denetimi taranabilir bir adresten başlatın.",
  },
  "sitemap-broken-page": {
    severity: "critical",
    title: "Site haritasındaki sayfa açılmıyor",
    explanation:
      "Bu adres site haritanızda listelenmiş ama hata veriyor. Site haritası Google'a 'şu sayfaları tara' demenin yoludur; açılmayan adres listelemek Google'ı boşa gönderir ve haritanıza güveni azaltır.",
    howToFix:
      "Sayfa var olmalıysa hatayı giderin. Kaldırıldıysa adresi site haritasından çıkarın. Harita otomatik üretiliyorsa, silinen sayfaları listelememesi için üreticinin ayarını kontrol edin.",
  },
  "sitemap-redirect-page": {
    severity: "warning",
    title: "Site haritasındaki sayfa yönlendiriyor",
    explanation:
      "Bu adres site haritanızda listelenmiş ama başka bir adrese yönlendiriyor. Google site haritasındaki adresleri 'asıl adres' önerisi sayar (asıl adres: aynı sayfanın aramada gösterilmesini istediğiniz tek adres). Yani asıl olmadığını kendiniz söylediğiniz bir adresi öneriyorsunuz.",
    howToFix:
      "Site haritasında yönlendirmenin kaynağını değil, vardığı hedef adresi listeleyin.",
  },
  "sitemap-disallowed-page": {
    severity: "warning",
    title: "Site haritasındaki adres robots.txt ile engellenmiş",
    explanation:
      "Bu adres için iki kural çelişiyor: site haritası Google'a 'bunu tara' derken robots.txt 'tarama' diyor. Google robots.txt'ye uyar ve sayfayı taramaz; başka sitelerden bağlantı alıyorsa içeriğini görmeden yine de dizine alabilir.",
    howToFix:
      "Sayfanın aramada çıkmasını istiyorsanız robots.txt engelini kaldırın. İstemiyorsanız adresi site haritasından çıkarın.",
  },
  "sitemap-canonicalized-page": {
    severity: "info",
    title:
      "Site haritasındaki sayfa, asıl adres olarak başka sayfayı gösteriyor",
    explanation:
      "Bu sayfa site haritasında listelenmiş ama kendi içinde asıl adres olarak başka bir adresi gösteriyor. Aynı sayfa için iki farklı öneri göndermiş oluyorsunuz; Google birini seçer. Bilerek yaptıysanız sorun yok.",
    howToFix:
      "Site haritasında yalnızca asıl adresler olmalı: bu adresi haritadan çıkarın ya da sayfanın canonical (asıl adres) etiketini sayfanın kendi adresine çevirin.",
  },
  "sitemap-noindex-page": {
    severity: "info",
    title: "Site haritasındaki sayfa arama sonuçlarından gizlenmiş",
    explanation:
      "Bu sayfa site haritasında listelenmiş ama noindex ile aramadan gizlenmiş. Yani hem 'bunu tara' hem 'bunu gösterme' diyorsunuz. Sayfayı yeni gizlediyseniz bu geçici olabilir: Google noindex'i görmek için sayfayı bir kez daha taramalı.",
    howToFix:
      "Sayfa aramada çıkacaksa noindex'i kaldırın. Kalıcı olarak gizli kalacaksa, Google noindex'i gördükten sonra adresi site haritasından çıkarın.",
  },
  "deep-page": {
    severity: "info",
    title: "Sayfa site yapısında çok derinde",
    explanation:
      "Bu sayfa ana sayfadan 5 ya da daha fazla tık uzakta. Derin sayfalar Google tarafından daha seyrek taranabilir ve ziyaretçinin bulması zorlaşır.",
    howToFix:
      "Kategori sayfaları, menü ya da öne çıkan listeler gibi üst sayfalardan buraya bağlantı vererek yolu kısaltın.",
  },
  "sitemap-too-large": {
    severity: "warning",
    title: "Site haritası dosyası okunamayacak kadar büyük",
    explanation:
      "Site haritası parçalarından biri bu aracın okuma sınırını (10 MB) aştı, bu yüzden içindeki adresler bu denetime girmedi. Google'ın sınırı 50 MB olduğundan dosya Google için geçerli olabilir; ama buradaki sayfa listesi eksik.",
    howToFix:
      "Site haritanızı daha küçük parçalara bölün ve bir site haritası dizini (sitemapindex) ile birbirine bağlayın. Her parça 50 MB ve 50.000 adresin altında kalmalı; daha küçük parçalar iki tarafın da işine yarar.",
  },
  "sitemap-too-many-urls": {
    severity: "warning",
    title: "Site haritasında 50.000'den fazla adres var",
    explanation:
      "Google bir site haritası dosyasında en fazla 50.000 adrese izin verir. Bu parça sınırı aşıyor; Google dosyayı reddedebilir ya da bir kısmını yok sayabilir.",
    howToFix:
      "Dosyayı her biri 50.000 adresin altında kalan parçalara bölün ve hepsini bir site haritası dizini (sitemapindex) dosyasında listeleyin. Search Console'a parçaları tek tek değil, yalnızca dizin dosyasını gönderin.",
  },
  "sitemap-lastmod-missing": {
    severity: "info",
    title: "Site haritasında hiç lastmod tarihi yok",
    explanation:
      "Site haritasındaki adreslerin hiçbirinde <lastmod> (son değişiklik tarihi) yok. Google bu alan doğru olduğu sürece hangi sayfayı ne zaman yeniden tarayacağını buna göre seçer. Yoksa yeniden tarama Google'ın kendi takvimine kalır; güncellediğiniz sayfanın fark edilmesi günler sürebilir.",
    howToFix:
      "Site haritasını üreten ayarda ya da eklentide her adres için <lastmod> açın ve içeriğin gerçekten değiştiği tarihi yazdırın. Yayın tarihini ya da her derlemedeki anı yazmayın; bu alanı değersiz kılar.",
  },
  "sitemap-lastmod-future": {
    severity: "warning",
    title: "Site haritasında gelecek tarihli lastmod var",
    explanation:
      "En az bir adresin <lastmod> (son değişiklik tarihi) değeri gelecekte. Bu doğru olamaz; Google bir sitenin tarihlerini tutarsız bulursa alanı o site için tümden yok sayar, yani doğru tarihleriniz de işe yaramaz.",
    howToFix:
      "Tarihleri üreten yeri kontrol edin. Genelde sunucu saatinin ileri olmasından ya da tarih alanına içerik tarihi yerine yayın planı tarihinin yazılmasından olur; düzeltip site haritasını yeniden üretin.",
  },
  "blocked-resource": {
    severity: "critical",
    title: "Sayfanın ihtiyaç duyduğu dosya robots.txt ile engellenmiş",
    explanation:
      "Sayfa taranabiliyor ama içindeki bir JavaScript ya da CSS dosyası robots.txt ile kapatılmış. Google engellenen dosyadaki JavaScript'i çalıştırmaz ve CSS'i okuyamaz; içerik JavaScript ile geliyorsa Google boş bir sayfa görür. Klasik örnek `Disallow: /wp-includes/` kuralıdır.",
    howToFix:
      "robots.txt'den bu dosyaları kapsayan kuralı kaldırın. Sayfayı gizlemek istiyorsanız sayfanın kendisini engelleyin; onu oluşturan dosyaları engellemek sayfayı gizlemez, yalnızca Google'ın yanlış görmesine yol açar.",
  },
  "internal-link-to-redirect": {
    severity: "info",
    title: "İç bağlantı yönlendirmeye gidiyor",
    explanation:
      "Bu sayfa sitenizdeki bir adrese bağlantı veriyor ama o adres başka bir yere yönlendiriyor. Bağlantı çalışır ama fazladan bir adım atılır: ziyaretçi bekler ve Google yönlendirmeyi de izlemek zorunda kalır (tarama bütçesi esas olarak çok büyük sitelerde önemlidir). Genelde adresler değişip iç bağlantılar eskisinde kalınca olur.",
    howToFix:
      "Bağlantıyı yönlendirmenin vardığı yeni adresle değiştirin. Yönlendirmenin kendisi kalsın; dışarıdan gelen bağlantılar için gerekli. Düzeltilecek olan kendi sitenizin içinden verdiğiniz adrestir.",
  },
  "not-https": {
    severity: "warning",
    title: "Sayfa güvenli olmayan http ile açılıyor",
    explanation:
      'Sayfa şifreli (https) yerine düz http ile sunuluyor. Tarayıcılar adres çubuğunda "Güvenli değil" uyarısı gösterir, formlara girilen bilgiler başkalarınca görülebilir ve Google https\'i hafif bir sıralama işareti sayar. Aynı içeriğin iki sürümü varsa https olanı tercih eder.',
    howToFix:
      'Barındırma firmanızdan ya da site oluşturucunuzun ayarlarından ücretsiz bir SSL sertifikası açın. Sonra tüm http adreslerini kalıcı yönlendirmeyle (301) https karşılığına gönderin; "http://siteniz.com/hakkimizda" açılınca "https://siteniz.com/hakkimizda" adresine geçilsin.',
  },
  "mixed-content-resource": {
    severity: "critical",
    title: "Güvenli sayfada güvensiz kaynak",
    explanation:
      "Bu https sayfa, http ile yüklenen bir betik ya da stil dosyası istiyor. Tarayıcılar bunu engeller: betik çalışmaz, stil uygulanmaz. Google'ın sayfayı işlerken bu dosyayı yükleyememesi de mümkündür; bu yüzden sayfa sizin gördüğünüzden farklı işlenebilir. Adres çubuğundaki kilit de bozulur.",
    howToFix:
      "Dosyanın adresini https'e çevirin. Dosya https sunmuyorsa kendi sunucunuza alın ya da https sunan bir alternatifle değiştirin.",
  },
  "missing-charset": {
    severity: "info",
    title: "Karakter kodlaması belirtilmemiş",
    explanation:
      "Ne sunucu yanıtında ne de sayfanın ilk 1024 baytında karakter kodlaması (charset) belirtilmiş. Bu durumda tarayıcı ve Google kodlamayı tahmin eder; yanlış tahmin ettiğinde Türkçe karakterler (ş, ğ, ı) bozuk görünür.",
    howToFix:
      'Sayfanın <head> bölümünün en başına `<meta charset="utf-8">` ekleyin. Şablondan üretiliyorsa şablonda bir kez eklemeniz yeter.',
  },
  "url-too-long": {
    severity: "info",
    title: "Sayfa adresi çok uzun",
    explanation:
      "Sayfanın adresi 115 karakterden uzun. Google için katı bir sınır yok ve sıralamayı etkilemez; ama uzun adres paylaşırken kırılır, arama sonucunda kısalarak görünür ve yazarken hata yapılmasına yol açar. Çoğu zaman adrese sorgu parametreleri ya da gereksiz klasörler eklenmiştir.",
    howToFix:
      "Adresi kısa ve anlamlı tutun: klasör derinliğini azaltın, gereksiz kelimeleri ve parametreleri çıkarın. Adresi değiştirirseniz eskisinden yenisine 301 yönlendirme verin.",
  },
  "url-uppercase-or-underscore": {
    severity: "info",
    title: "Adreste büyük harf ya da alt çizgi var",
    explanation:
      "Sayfa adresinin yol kısmında büyük harf ya da alt çizgi (_) var. Adresler büyük/küçük harfe duyarlıdır: /Hakkimizda ile /hakkimizda Google'a iki ayrı sayfa gibi görünebilir ve içerik çift dizine girer. Google ayrıca kelimeleri ayırmak için tire (-) kullanılmasını önerir.",
    howToFix:
      "Adresleri küçük harf ve tireyle yazın. Büyük harfli adrese gelenleri küçük harfli adrese 301 ile yönlendirin ve asıl adresi (canonical) küçük harfli olarak belirtin.",
  },
  "www-and-apex-both-serve": {
    severity: "warning",
    title: "Site hem www ile hem www'siz açılıyor",
    explanation:
      "Sitenizin www'li ve www'siz adresi ikisi de sayfayı açıyor; biri ötekine yönlendirmiyor. Google bunları aynı içeriğin iki kopyası olarak görür, hangisini göstereceğini kendisi seçer ve bağlantıların değeri iki adres arasında bölünebilir.",
    howToFix:
      'Bir adresi asıl seçin (genelde zaten kullandığınız) ve ötekinden ona kalıcı (301) yönlendirme verin. Barındırma panellerinde bu genelde "www\'ye yönlendir" ya da "www\'siz adrese yönlendir" ayarıdır.',
  },
  "soft-404-on-missing-page": {
    severity: "warning",
    title: "Var olmayan sayfa 404 yerine 200 dönüyor",
    explanation:
      'Sitede olmayan rastgele bir adres istedik, sunucu "bulunamadı" (404) yerine "tamam" (200) yanıtı verdi. Google bunu yumuşak 404 sayar: silinen ya da yanlış yazılan adresler gerçek sayfa gibi görünür, tarama boşa gider ve boş sayfalar dizine girebilir.',
    howToFix:
      'Sitenizin hata sayfası ayarını kontrol edin: olmayan adresler için 404 durum kodu dönmeli. İçerik yönetim sisteminizde "özel 404 sayfası" varsa sayfanın içeriği aynı kalabilir, yalnızca durum kodu 404 olmalı.',
  },
  "not-found-redirects-home": {
    severity: "info",
    title: "Var olmayan sayfalar ana sayfaya yönlendiriliyor",
    explanation:
      "Sitede olmayan rastgele bir adres istedik, sunucu bizi ana sayfaya yönlendirdi. Google bunu genelde yumuşak 404 sayar ve yönlendirmeyi yok sayar; ziyaretçi de aradığını bulamadığını anlamadan ana sayfaya düşer.",
    howToFix:
      "Olmayan adreslerde 404 dönen, arama kutusu ya da önemli bağlantılar içeren bir hata sayfası gösterin. Yalnızca taşınan sayfaları yeni adreslerine yönlendirin.",
  },
  "missing-favicon": {
    severity: "info",
    title: "Site simgesi (favicon) bulunamadı",
    explanation:
      "Sayfada bir site simgesi tanımlanmamış ve /favicon.ico adresi de bir simge döndürmüyor (ya da tanımlanan simge açılmıyor). Google mobil arama sonuçlarında sitenizin adının yanında bu simgeyi gösterir; yoksa genel bir simge çıkar ve sonuç daha az fark edilir.",
    howToFix:
      'En az 48x48 piksellik kare bir simge hazırlayın, sitenize yükleyin ve sayfaların <head> bölümüne `<link rel="icon" href="/favicon.ico">` ekleyin. Site oluşturucularda bu genelde "site simgesi" ayarıdır.',
  },
  "robots-disallow-all": {
    severity: "critical",
    title: "robots.txt tüm siteyi Google'a kapatıyor",
    explanation:
      "robots.txt dosyanız Googlebot'un ana sayfayı taramasını yasaklıyor (genelde `Disallow: /` satırı). Google sitenizi taramaz; sayfalar arama sonuçlarından zamanla düşer ya da açıklamasız görünür. Çoğu zaman geliştirme sırasında konup unutulmuş bir kuraldır.",
    howToFix:
      "robots.txt'teki `Disallow: /` satırını kaldırın ya da yalnızca gizli kalması gereken klasörlerle sınırlayın. Sonra Search Console'daki robots.txt raporundan Google'ın yeni dosyayı okuduğunu kontrol edin.",
  },
  "robots-missing-sitemap-line": {
    severity: "info",
    title: "robots.txt site haritasını göstermiyor",
    explanation:
      "robots.txt dosyanızda `Sitemap:` satırı yok. Arama motorları site haritasını bu satırdan da bulur; Search Console'a gönderdiyseniz Google için sorun değildir, ama Bing ve diğer tarayıcılar için en kolay yoldur.",
    howToFix:
      "robots.txt'in sonuna site haritanızın tam adresiyle bir satır ekleyin, örneğin `Sitemap: https://alanadiniz.com/sitemap.xml`.",
  },
  "ai-crawlers-blocked": {
    severity: "info",
    title: "Bazı yapay zekâ tarayıcıları robots.txt ile engellenmiş",
    explanation:
      "robots.txt dosyanız bazı yapay zekâ tarayıcılarının (örneğin GPTBot, ClaudeBot, PerplexityBot) sitenizi taramasını yasaklıyor. Bu bir tercih: içeriğinizin yapay zekâ eğitiminde kullanılmasını istemiyorsanız doğrudur. Ama bu asistanların arama ve yanıt özelliklerinde sitenizin görünmesini de azaltabilir. Google araması etkilenmez.",
    howToFix:
      "Bilerek engellediyseniz bir şey yapmanıza gerek yok. Yapay zekâ yanıtlarında görünmek istiyorsanız arama amaçlı tarayıcılara (OAI-SearchBot, Claude-SearchBot, PerplexityBot gibi) izin verip yalnızca eğitim tarayıcılarını (GPTBot, ClaudeBot, Google-Extended gibi) engelleyebilirsiniz.",
  },
  "missing-llms-txt": {
    severity: "info",
    title: "llms.txt dosyası yok (isteğe bağlı)",
    explanation:
      "Sitenizin kökünde llms.txt dosyası yok. Bu dosya yapay zekâ asistanlarına sitenin önemli sayfalarını kısa bir listeyle anlatmak için önerilen yeni bir biçimdir. Henüz bir standart değildir ve Google bunu kullanmaz; yoksa bir sorun yoktur.",
    howToFix:
      "İsterseniz sitenizin kökünde /llms.txt adresine, sitenin ne olduğunu bir paragrafta anlatan ve önemli sayfalarınızı bağlantılarıyla listeleyen düz metin (Markdown) bir dosya koyun.",
  },
  "html-too-large": {
    severity: "warning",
    title: "Başlangıç sayfasının HTML'i 2 MB'tan büyük",
    explanation:
      "Başlangıç sayfasının HTML'i 2 MB'ı aşıyor. Google bir HTML dosyasının yalnızca ilk 2 MB'ını işler; sonrasındaki içerik ve bağlantılar Google için yok sayılır. Büyük HTML ayrıca yavaş mobil bağlantılarda sayfayı geciktirir.",
    howToFix:
      "HTML'in içine gömülü büyük verileri (satır içi görseller, büyük JSON, tekrar eden menüler) ayrı dosyalara taşıyın. Uzun listeleri sayfalara bölün.",
  },
  "no-compression": {
    severity: "info",
    title: "Başlangıç sayfası sıkıştırılmadan geldi",
    explanation:
      "Denetim başlangıç sayfasını gzip ve brotli kabul ettiğini söyleyerek istedi, ama yanıtta Content-Encoding başlığı yoktu: sayfa sıkıştırılmadan geldi. Sıkıştırma HTML'i genelde 4-5 kat küçültür ve sayfayı hızlandırır. Bazı ara sunucular ve CDN'ler sıkıştırmayı yalnızca tarayıcılara uyguladığı için tarayıcıda da doğrulayın.",
    howToFix:
      "Sunucunuzda ya da CDN'de gzip veya brotli sıkıştırmayı açın. Sonucu tarayıcının geliştirici araçlarında, yanıt başlıklarında `content-encoding` satırına bakarak doğrulayın.",
  },
  "slow-ttfb": {
    severity: "warning",
    title: "Sunucu ilk yanıtı geç veriyor (TTFB)",
    explanation:
      "Başlangıç sayfasının ilk baytı 800 milisaniyeden geç geldi; web.dev bu sınırın altını önerir. Sunucu yanıtı geç başlarsa sayfadaki her şey o kadar geç başlar. Süre, denetimi çalıştıran bilgisayardan iki ayrı istekle ölçülür ve hızlı olanı esas alınır; yine de ağa göre değişebilir.",
    howToFix:
      "Sayfa önbelleğini açın, yavaş veritabanı sorgularını ve eklentileri bulun, ziyaretçilerinize yakın bir CDN kullanın. Sorun sürerse barındırma paketinizi gözden geçirin.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
