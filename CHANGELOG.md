# Değişiklik günlüğü

Her sürümün notu burada, en yenisi en üstte.

## [2.4.0] — 2026-10-23

Windows paketi olgunlaştı, site iki dilli oldu, uygulama ekranları baştan sona
elden geçti. Bu sürüm 2.3.0'dan sonra arka arkaya çıkan on beş küçük düzeltme
sürümünü tek sürümde toplar; o ara sürümler yayından kaldırıldı. Docker
kurulumu değişmedi, güncellerken veriniz korunur.

### Windows paketi

- **Temiz bilgisayarda açılış.** Uygulamanın motoru (workerd) Microsoft Visual C++ çalışma zamanını ister; olmayan bilgisayarda "Workers runtime failed to start" hatasıyla kapanıyordu. Kurulum dosyası paketi taşır ve eksikse bir kez yönetici izni isteyip kurar; motorun yanında DLL'lerin kendi kopyası da durur, sistemdeki paket eski ya da bozuk olsa bile açılır.
- **Kendiliğinden güncelleme.** Görev çubuğu uygulaması açılıştan iki dakika sonra ve günde bir kez GitHub'a bakar; yeni sürümü indirir, SHA-256 ile doğrular ve sessizce kurar. Menüde her zaman duran tek **Güncelle** maddesi tıklayınca hemen kontrol eder, yeni sürüm varsa kurar, yoksa "Güncel" der, bağlantı yoksa bunu söyler. **Güncellemeleri kendiliğinden kur** menüden kapatılabilir.
- **Kurulumu onar ve sorunu bildir.** Menüdeki **Kurulumu onar** geçici dosyaları siler, paketi kontrol eder ve uygulamayı yeniden açar. **Sorunu bildir (GitHub)** hazır bir Türkçe sorun kaydı açar; **Tanı bilgisini kopyala** sistem bilgisini ve günlüklerin son satırlarını panoya alır. İkisinde de kullanıcı adı, site adları, e-postalar, Search Console ve Analytics mülk kimlikleri ve anahtar görünümlü değerler maskelenir.
- **Çökme tanısı.** Açılışta motor küçük bir worker ile denenir; çökerse simge sebebi söyler. Windows olay günlüğündeki hatalı modül, CPU özellikleri, çalışma zamanı DLL sürümleri ve PATH üzerindeki eski kopyalar tanı bilgisine eklenir.
- **Kurulum sihirbazı.** Logolu karşılama ve bitiş sayfaları, her sayfada kurulan sürüm, yönetici izninin ne zaman sorulduğu ve kaldırmanın veriyi silmediği notu. Kurulum dosyasının adı ve Özellikler → Ayrıntılar sekmesi sürümü taşır (`seowatcher-setup-2.4.0.exe`); sabit adlı kopya sürüm sayfasında durur.
- **Uyarılar yol gösterir, yol sızdırmaz.** Başlatıcının hata durumları klasör yolu yerine bir sonraki adımı söyler; güncelleme başarısız olunca ne yapılacağı yazar, doğrulanamayan dosya kurulmaz. Tepsi menüsü "Windows açılınca başlat" der, parola her yerde aynı adla anılır.
- **winget.** Windows Paket Yöneticisi bildirimleri hazır (`packaging/winget`); gönderim ayrı bir adımdır.

### Uygulama

- **Daha sade ekranlar.** Yan menüdeki sahte hesap satırı gitti; Yardım ve Ayarlar menünün altında. Menü grupları "Arama ve site" ve "Ajan". Panel her işi bir kez ister; her ekranın boş hali tek bir sonraki adımı söyler (Search Console'u bağla, Analytics'i bağla, denetimi başlat).
- **Ajan kurulumu tek kart.** Claude Code / Codex / Diğer seçimi ve tek "Kurulum komutunu kopyala" düğmesi; sıfırdan kurulum ve beceri güncelleme ikincil. Kopyalama düğmeleri bağlantı durumu okunana kadar kapalı.
- **Ayarlar.** Google bağlantısı üç adımlı liste; alanlar ve devre dışı Kaydet okunur; sürüm notları liste olarak. Hakkında, Windows'ta güncellemenin görev çubuğu uygulamasında yapıldığını söyler.
- **Doğal Türkçe.** İki yüzden fazla ekran metni mekanik ifadelerden arındırıldı; terimler tek: Google erişim anahtarı, parola (token), adres numarası (port), filtre, ortanca, Analytics mülkü. "Entegrasyonlar" sekmesi "Bağlantılar" oldu.
- **Her yönerge iki kurulumu da tanır.** Uygulama kurulum türünü (`windows` ya da `docker`) `/api/health` üzerinden bildirir; Yardım, Ajan kurulumu ve ajan istemleri Windows'ta görev çubuğu menüsünü ve `%LOCALAPPDATA%\seowatcher` klasörünü, Docker'da `docker compose` komutlarını anlatır. Tür bilinene kadar nötr metin gösterilir.
- **Siteye bağlantı.** Yardım'daki hızlı işlemlerde ve Ayarlar → Hakkında'da **seowatcher.io** düğmesi; "Kılavuzu aç" ve sık sorunlardaki bağlantılar sitedeki resimli kılavuza gider.

### Site ve kılavuz

- **İki dilli site.** `seowatcher.io/en/` ana sayfası ve `/en/docs/` altında 20 kılavuz sayfası; her sayfa diğer dile `hreflang` ve dil düğmesiyle bağlı, sitemap iki dili birlikte listeler, `llms.txt` iki dilde. Ana sayfanın İngilizcesi tek bir çeviri tablosundan (`scripts/site-home.en.json`) üretilir; karşılığı olmayan Türkçe cümle derlemeyi durdurur. 404 sayfası iki dilli.
- **Sade Türkçe kılavuz.** 20 sayfa son kullanıcı için yeniden yazıldı: kısa cümleler, her teknik terim ilk geçtiği yerde açıklanır, sihirbazın gerçek düğme adları (**Yalnızca ben**, **Bitti**), hizmet hesabı yolu adım adım, "Belirti / Sebep / Çözüm" kutuları. Yeni sayfalar: "Projeler ve proje ayarları", "Yardım ekranı".
- **Kılavuz ekranı.** Gruplu sol menü, seçili sayfada vurgu çizgisi, telefonda katlanan menü, kaydırdıkça izleyen içindekiler, kod bloklarında kopyala düğmesi, önceki/sonraki bağlantıları.
- **Yeni görünüm ve logo.** Siyah zemin, tek turuncu vurgu; logo alev turuncusu bir göz, dikey yarık gözbebeğiyle (her şeyi gören göz), site, sekme simgesi, Windows simgesi, kurulum sihirbazı ve paylaşım görseli aynı işareti kullanır.
- **Ana sayfa.** Canlı indirme sayısı, logo bandının altında "Verinizi Google'dan okur, kimseye göndermez" akışı, hareketi durduran düğme. Kılavuz sayfalarında TechArticle ve BreadcrumbList yapısal verisi, sosyal paylaşım etiketleri.

### Yayın hattı

- Derleme işi yalnızca okur; yayın işi ayrı ve yazma yetkili. Eylemler commit kimliğine sabitlendi. Etiket `x.y.z` biçimi ve package.json ile eşleşme açısından denetlenir; yayın önce taslak oluşturulup dosyalar yüklendikten sonra yayımlanır. Smoke test parolasız `/mcp` çağrısının 401 aldığını ve parolanın günlüklerde geçmediğini doğrular.
- Kod imzalama adımı hazır (SignPath); gizli anahtarlar eklenince devreye girer. `node scripts/bump-version.mjs x.y.z` sürümü paket, README, ana sayfa ve sürüm notu taslağında tek seferde taşır.

### Düzeltmeler

- Sitedeki indirme bağlantıları eski bir sürüm etiketinin altında yeni dosyayı arıyordu; bağlantı artık etiketle birlikte güncellenir.
- Codex kurulum istemindeki satır sonu kaçışı bozuktu; Git Bash yolunda parola sonundaki satır sonu silinmiyordu.
- Sayaç sonundaki sayı ve İngilizce "months" eki doğru biçimlenir; kılavuzda kısa sayfalarda son başlık yanlışlıkla işaretlenmez.
- Site başlıklarındaki yinelenen önbellek kuralları kaldırıldı; README rozeti sürümle birlikte güncellenir.
- Site denetimindeki "Sorunlar ne kadar ciddi?" kartında sayılar kartın dışına taşıyordu.

## [2.3.0] — 2026-10-22

Windows'a tek kurulum dosyasıyla kurulan ilk sürüm ve ürünün tanıtım sitesi.
Docker kurulumu değişmedi; güncellerken veriniz korunur.

### Yenilikler

- **Windows için tek tık kurulum.** `packaging/windows/`: Node 22, wrangler çalışma zamanı ve derlenmiş uygulama tek `.exe` içinde; tepsi uygulaması anahtarları üretir, migrasyonu çalıştırır, sunucuyu başlatır ve tarayıcıyı açar. Docker gerekmez. Her `v*` etiketinde GitHub Actions paketi üretip sürüme ekler (`seowatcher-setup.exe`).
- **seowatcher.io sitesi.** `site/`: tek sayfa, statik, Cloudflare Pages'ten yayınlanır. Ürünün GitHub adı seotracker olarak kalır; seowatcher sitenin ve Windows paketinin adıdır.
- **README yenilendi.** Afiş, ürün içi ekran görüntüleri (`docs/images/`), özellik tablosu, akış şeması, hazır beceri ve MCP araç listesi, üç adımlı kurulum ve sık sorulanlar.
- Site denetimindeki "Sorunlar ne kadar ciddi?" kartında sayılar kartın dışına taşıyordu; halka ile açıklama artık karta sığar, uzun açıklama kısaltılır.

## [2.2.1] — 2026-10-04

Bu sürüm yalnızca hata temizliği: yeni özellik yok. Kodun tamamı bağımsız
incelemelerden geçti, bulunan hatalar düzeltildi. Güncellerken veriniz
korunur; veritabanı iki küçük adımla kendiliğinden güncellenir.

### Önemli düzeltmeler

- **Ayarlar'dan girdiğiniz Google istemcisi artık yenilemede de kullanılıyor.** Önceden Search Console ya da Analytics'i bağladıktan yaklaşık bir saat sonra bağlantı "yeniden bağlanın" diyordu; yenileme boş istemciyle yapılıyordu. Bu hata yalnızca istemciyi `.env` yerine Ayarlar'a girenleri etkiliyordu.
- **İndirdiğiniz raporların güvenliği.** Raporu dosya olarak indirince, kötü niyetli biçimde yazılmış bir sayfa korumadan önce çalışabilirdi. İndirilen dosya artık her zaman kendi koruması en başta olacak şekilde açılır; rapor kaydetme denetimi de aynı kurallarla yeniden yazıldı.
- **Taramada adres denetimi.** `www` ve çıplak alan adı artık taramadan önce ayrı ayrı doğrulanır. Adresin içine yazılmış kullanıcı adı ve parola reddedilir, kayıtlı eski adreslerde ekranda gizlenir. Büyük harfle yazılmış `HTTPS://` kabul edilir.
- **Docker'da şifreleme anahtarı ve MCP şifresi.** İlk açılışta yarıda kalan bir yazma artık bozuk bir anahtar bırakmaz; var olan anahtarın üzerine hiçbir zaman yazılmaz. MCP şifresi başkalarınca okunamayacak biçimde oluşturulur.

### Veri doğruluğu

- Aynı sayfa için yeniden denenen denetim adımı artık önceki başarılı hız ölçümünü ezmez; yeniden başlatmada ya da yarıda kalan taramada sorun kayıtları yarım kalmaz.
- Denetim silinirken iş hâlâ sürüyorsa ya da durumu öğrenilemiyorsa silme durdurulur; hız ölçümü dosyaları denetimle birlikte temizlenir.
- Sayfaların ana sayfadan kaç tıkla ulaşıldığı artık bağlantı haritasından hesaplanır; bağlantısı kesilen sayfa ve çok bağlantılı sayfalar yanlış "yetim" sayılmaz.
- Site haritasındaki her adres "haritada" olarak işaretlenir (önceden tarama sınırından sonrası işaretlenmiyordu). Çok büyük `robots.txt` artık "her şeye izin ver" sayılmaz.
- Search Console mülkünü değiştirmek ya da Google hesabını kaldırmak artık yarım kalmaz; yalnızca o hesabın projelerinin verisi silinir.
- URL denetim hakkı, önbellek satırı yerine yapılan her çağrıdan sayılır; zorla yeniden denetim ve önbelleği temizleme hakkı geri vermez. Başarısız bir denetim eski sonucun tarihini tazelemez.
- Eksik kalan arşiv günleri işaretlenir ve sonraki çalışmada gün gün yeniden okunur.
- Analytics kotası her yanıttan izlenir ve hesap/mülk değişince sıfırlanır; yönetici listeleri sayfalanır, eksik kalırsa "envanter eksik" yazar.
- Aynı başlıklı iki rapor artık kaydedilemez (eski kopyaların başlığına kısa bir ek getirilir, hiçbir rapor silinmez). Denetim raporu başlığı denetimin tam kimliğini taşır.
- Eşit görünen ama farklı adresler (`http`/`https`, `www`, sondaki eğik çizgi) canonical karşılaştırmasında artık farklı sayılır; bu, daha önce gizlenen gerçek uyuşmazlıkları gösterebilir.

### Ekranlarda

- Hata mesajları artık kendi cümlesiyle gelir: etiket kullanımda, aynı adlı etiket var, geçersiz alan adı gibi durumlarda "Beklenmeyen hata" yerine ne olduğunu söyler.
- Kayıtlı kelimeler en son eklenene göre sıralanır, "Eklenme" sütunu vardır. CSV dosyaları Excel'de Türkçe karakterleri doğru gösterir.
- Arka planda yenileme başarısız olunca açık formlardaki yazdıklarınız kaybolmaz; denetim silme hatası sessizce yutulmaz; Google bağlantısı değişince ilgili ekranlar eski veriyi tutmaz.
- 500'den fazla sorguyu tek seferde kelime olarak kaydetmek çalışır. Küçük erişilebilirlik düzeltmeleri.
- Ajan araçlarının açıklamaları artık sunucunun onay istemediğini açıkça söyler: kelime kaydetme ve proje bağlamı yazma araçları çağrıldığı anda çalışır, kullanıcıdan onay istemek ajanın işidir. "URL denetimi" aracı artık "salt okunur" işaretli değildir, çünkü sonuçları saklar ve günlük hakkınızı harcar.

### Kapsam dışı bırakılanlar

- Kota rezervasyonunun atomik olmaması, çok büyük denetim sonuçlarının sayfalanması ve bağımlılık uyarıları sonraki sürümlere bırakıldı.
- Bağlantı anında adres sabitleme Cloudflare Workers'ta mümkün değil; adres denetimi bağlanmadan önce yapılan bir ön kontroldür.

## [2.2.0] — 2026-10-02

Depoyu yeni indirenler için sıfırdan kurulum istemi geldi; bu sürüm ayrıca
kota göstergelerindeki bir hesap hatasını ve birkaç yanıltıcı metni düzeltiyor.

### Eklendi

- **Kurulum istemi.** Depoyu GitHub'dan yeni indirdiyseniz Ajan kurulumu ekranındaki "Kurulum istemi"ni ajanınıza (Claude Code, Codex, Cursor) yapıştırın: Docker'ın çalıştığını, Google erişimini, PageSpeed anahtarını, projeyi, ajan bağlantısını ve ilk sonuçları sırayla kontrol eder. Elle yapmanız gereken Google Cloud adımlarını işaretler. Gizli bilgileri sohbete yapıştırmanızı istemez; onları yalnızca seotracker'ın Ayarlar ekranına siz girersiniz. Aynı istem Yardım ekranındaki hızlı eylemlerde de var.

### Düzeltildi

- Analytics kota kartı yanlış hesaplıyordu ("1 / 199.769"); artık Google'ın verdiği kalan değerden doğru kullanımı gösterir ("231 / 200.000"). 360 mülklerde bar gösterilmez, yalnızca kalan yazar.
- Rapor boyutları her yerde aynı birimle (1 KB = 1.000 bayt) yazılır; 500 KB sınırı ekranda 488 KB görünmüyor.
- Ayarlar ekranı hizmet hesabı ile OAuth istemcisinden hangisinin kullanıldığını söyler.
- Denetim geçmişindeki sütunların "yüz sayfa başına" olduğu belirtildi.
- MCP şifresini okuma komutu Git Bash'te boş çıkıyordu; tüm ekran ve belgelerde doğru biçimde yazıldı.
- Codex kurulumu, kullanıcı ayarlarındaki `*_TOKEN` süzgecinden etkilenmeyen bir değişken adı kullanır; Windows uygulaması için kalıcı kullanıcı değişkeni yolu açıklandı.
- `get_diagnostics` kota bilgisini `diagnostics` içinde döndürür.

## [2.1.0] — 2026-10-02

Bu sürüm Codex'i ilk sınıf istemci yapıyor, Google sınırlarınızı ekranda
gösteriyor, her ekrana hızlı eylemler ekliyor ve bulunan hataları temizliyor.

### Eklendi

- **Codex desteği.** Ajan kurulumu ekranında Codex için ayrı bir kurulum istemi var: tek komutla bağlanır, altı SEO becerisini Codex'in beceri klasörüne kurar ve gerçek bir çağrıyla doğrular. Depodaki `AGENTS.md` Codex ajanlarının kurallarını tek başına anlatır.
- **Google ve sistem sınırları.** Günlük URL denetimi hakkınız, Analytics API kotanız, bugünkü hız ölçümü sayınız ve rapor limitleriniz Site denetimi, Dizin durumu, Analytics, Raporlar, Yardım ve Ayarlar ekranlarında görünür. Yalnızca gerçekten bildiğimiz sayılar gösterilir; her sayının kaynağı ve zamanı yazar.
- **Hızlı eylemler.** Panel, Fırsatlar, Arama performansı, Sıralama takibi, Kayıtlı kelimeler, Site denetimi, Analytics, Raporlar, Proje bilgisi ve Yardım ekranlarında "Yenile" düğmesi ve son güncelleme saati var; `r` tuşu da aynı işi yapar.
- **Canlı görünüm.** Denetim ilerlemesi taramayı ve hız ölçümünü ayrı çubuklarla, kalan süre tahminiyle gösterir. Sayılar ilk açılışta sayarak gelir, kartlar sırayla belirir. Hareketi azaltma ayarı açıksa hiçbiri oynamaz.
- **Yardım ekranı.** Durumu yeniden kontrol et, tanılama paketi, belgeler ve sürüm notları tek çubukta. "Sık sorunlar" bölümü Docker, dolu port, MCP şifresi, PageSpeed sınırı ve sorgu verisi yok durumlarını anlatır.
- **Ayarlar ekranı.** Bölümler arasında hızlı geçiş, her bölümde durum rozeti, PageSpeed anahtarı için "Anahtarı test et" düğmesi.

### Düzeltildi

- Yeniden başlatma sırasında yarıda kalan denetimler artık ilk kontrolde "yarım kaldı" olarak işaretlenir; üç tanesi yeni denetim başlatmayı kalıcı engelleyemez.
- Search Console mülkünü değiştirince ya da bağlantıyı kesince eski sorgu arşivi ve URL denetimi kaydı temizlenir. Önceden iki mülkün geçmişi karışıyordu.
- Projeler arasında geçince önceki projenin verisi ve filtreleri ekranda kalmaz.
- Google bağlantısını değiştirince Fırsatlar, Sıralama takibi ve Analytics beş dakika eski kalmaz.
- Tamamlanmış denetimler artık yeni denetim kapasitesini doldurmaz; yalnızca çalışanlar sayılır.
- Türkçe karakterli kelime araması çalışıyor ("çay", "istanbul"); kayıtlı kelimelerin niyet bilgisi kaybolmuyor.
- Denetim silinince hız ölçümü dosyaları da silinir.
- Kalan süre tahmini saat dilimi yüzünden saatlerce şişiyordu, düzeldi.
- Arama kutusu her tuşta geçmişe yeni kayıt eklemiyor, harf kaybı yok. Dışa aktarma ekrandaki filtreyi izliyor. Pano kopyalama güvenli olmayan adreslerde de hata vermiyor.
- Sayfa derinliği, tekrar denenen tarama parçaları ve boş URL denetimi sonuçlarında veri kaybı düzeltildi.
- Çalışan bir denetimin sonuçlarını okuyan ajan artık "sorun yok" yerine "denetim sürüyor" görür.
- Ayarlar: Google istemcisi ortam değişkeninden gelirken form gizleniyordu; kimlik bilgisi silmeler artık onay istiyor; Google istemci kimliği biçimi kontrol ediliyor; güncelleme denetimi başarısız olunca "en güncel" demiyor.

### Çıkarıldı

- Yardım ekranındaki kaynak depo satırı kaldırıldı.

## [2.0.0] — 2026-10-01

seotracker, kendi bilgisayarınızda çalışan, tek kişilik ve ücretsiz bir SEO
aracıdır. Google Search Console, Google Analytics, kendi site tarayıcısı ve
Google PageSpeed verisini tek yerde toplar; hiçbir ücretli veri kaynağına
bağlanmaz. Bu, her ekranın gerçek veriyle çalıştığı ilk ana sürümdür.

### Neler sunuyor

- **Site denetimi.** Sitenizi tarar, geniş bir kontrol listesiyle sorunları bulur ve 0 ile 100 arası bir puan verir. Her sorunun hangi sayfaları etkilediği adresleriyle görünür; adresleri kopyalayabilir, sorunları CSV olarak indirebilirsiniz.
- **Hız ölçümü.** Taranan her sayfa telefonda ve bilgisayarda ölçülür. Gerçek ziyaretçilerin son haftalardaki hız gidişatı da görünür.
- **Dizin durumu.** Google'ın hangi sayfaları dizine aldığını, almadıysa nedenini gösterir.
- **Denetim raporu.** Kapak ve puan, "Bu hafta yapılacak 3 şey", grafikler, her sorun için etkilenen adresler, hız, dizin durumu ve ölçüm sınırları; tek dosya olarak indirilir ve A4 yazdırılabilir.
- **Raporlar.** Hem ajanların yazdığı hem denetimden indirilen raporlar tek listede: her satırda görünür İndir düğmesi, arama, tür filtresi, PDF olarak kaydetme ve tam ekran görüntüleme. Ajana rapor yazdırmak için hazır, ayrıntılı bir istem var.
- **Denetim geçmişi.** Eski denetimlere dönebilir, önceki denetime göre neyin düzeldiğini ya da kötüleştiğini görebilirsiniz.
- **Fırsatlar.** Google'da görünen ama daha çok tıklanabilecek sayfaları puanla sıralar. Bir satıra tıklayınca neden listede olduğunu ve ne yapacağınızı yazar.
- **Arama performansı.** Tıklama, gösterim ve sıra; ülke, cihaz ve arama türüne göre. Grafiklere tıklayarak tabloyu süzersiniz.
- **Sıralama takibi ve kayıtlı kelimeler.** Kelimelerinizin sırasını izler, yükselenleri ve düşenleri ayrı gösterir.
- **Analytics.** Ziyaretçi, kaynak, cihaz ve ülke dağılımı; Fırsatlar'da Search Console verisiyle eşleştirilir.
- **Panel.** Sıradaki adımları, tıklama eğilimini ve birinci sayfaya yakın kelimeleri tek bakışta verir.
- **Ajan bağlantısı.** Yapay zekâ ajanlarınız aynı verileri okuyabilir. Bağlantı bir şifreyle korunur.
- **Sade kullanım.** Her ekranda ne işe yaradığı yazar, tablo başlıklarının yanında açıklama vardır, hızlı filtre düğmeleri ve tıklanabilir grafikler listeyi süzer. Açık ve koyu tema, klavye ve ekran okuyucu desteği vardır.

### Başlamadan önce

- Ajanları bağlamak için şifreyi şu komutla görün ve ajan ayarlarınıza `Authorization: Bearer <şifre>` olarak ekleyin:

```
docker compose exec -T seotracker cat /app/.wrangler/mcp-token
```

Windows'ta Git Bash kullanıyorsanız komutun başına `MSYS_NO_PATHCONV=1` ekleyin; yoksa şifre boş çıkar. PowerShell ve cmd'de önek gerekmez (PowerShell'de hata verir).

- Şifre istemiyorsanız `.env` dosyanıza `MCP_TOKEN=off` yazıp `docker compose up -d --force-recreate seotracker` çalıştırın.
- Ayarlar'a bir PageSpeed anahtarı girin; anahtar yokken hız ölçümü en çok 50 sayfayla sınırlıdır. Gerçek ziyaretçi hız gidişatı için Google Cloud projenizde "Chrome UX Report API" açık olmalı; değilse ekran bunu söyler.
