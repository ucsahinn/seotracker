---
title: Sorun giderme
description: Windows uyarıları, Google bağlantı hataları, kota ve takılan denetimler için belirti, neden ve çözümü bulun. Boş grafik ve erişim sorunlarını giderin.
kind: sorun-giderme
updated: 2026-10-27
---

Uygulama açılıyorsa önce **Yardım** ekranındaki **Uygulamanın durumu** kartına bakın. Kart giriş ve erişimi, Google kimliğini, PageSpeed anahtarını ve veritabanını kontrol eder. "… kurulum kontrolü dikkat istiyor" yazıyorsa yanındaki düğme sizi doğru ayara götürür. Aşağıdaki sorunlar en sık görülenden en nadire doğru sıralıdır; her biri belirti, sebep ve çözüm olarak yazılmıştır.

## Sayfa açılmıyor

**Belirti:** Tarayıcı "bağlantı reddedildi" diyor.

**Sebep:** Uygulama çalışmıyor.

**Çözüm (Windows paketi):** Görev çubuğundaki simgeye bakın; görünmüyorsa ^ okuna tıklayın. Orada da yoksa Başlat menüsünden seowatcher'ı açın. Simgenin üzerine gelince "Çalışıyor: http://127.0.0.1:3001/" yazmalı; adres numarası farklıysa o adresi açın. "Hata" yazıyorsa sağ tıklayıp **Yeniden başlat** deyin, olmazsa **Kurulumu onar**. Nedeni **Günlükleri aç** ile `launcher.log` ve `server.log` dosyalarının son satırları yazar.

**Çözüm (Docker):** Önce Docker Desktop'ın çalıştığına bakın. Proje klasöründe `docker compose ps` komutunu çalıştırın. Durum healthy değilse `docker compose up -d` komutunu çalıştırın; nedeni `docker compose logs --tail 50` yazar.

## Adres numarası (port) dolu

**Belirti:** Windows'ta uygulamanın her ekranının üstünde sarı bir şerit çıkıyor: "seowatcher bu sefer 3002 numarasında çalışıyor çünkü 3001 başka bir program tarafından kullanılıyor (ör. eski bir Docker kopyası). Google bağlantısı 3001 için ayarlandı; o programı kapatıp seowatcher'ı yeniden başlatın." Google ile bağlanırken hata alıyorsunuz. Ya da simge "3001 ve sonraki 9 adres numarası (port) dolu" diyor. Aynı cümle **Yardım** ekranındaki "Uygulamanın durumu" kartında da yazar. Docker'da "Bind for 127.0.0.1:3001 failed" yazıyor.

**Sebep:** Başka bir program aynı adres numarasını kullanıyor. En sık görülen sebep, bir zamanlar çalıştırdığınız eski bir Docker kopyasıdır. Docker Desktop bilgisayar açılınca onu kendiliğinden yeniden başlatabilir. Google yönlendirme adresleri 3001'i yazdığı için, uygulama 3002'de açıkken Google ile giriş çalışmaz.

**Çözüm:** Windows paketi normalde 3002 ile 3010 arasında boş bir numara seçer, bunu bir baloncukla ve yukarıdaki şeritle söyler ve yalnızca o açılış için kullanır. Önce 3001'i tutan programı kapatın. Eski bir Docker kopyasıysa Docker Desktop'ta seotracker konteynerini durdurun ya da proje klasöründe `docker compose stop` komutunu çalıştırın. Sonra menüden **Yeniden başlat** deyin. Uygulama 3001'e döner ve şerit kaybolur. Şeridi kapatmak onu yalnızca o sekme için gizler, sorunu çözmez. Hepsi doluysa veri klasöründeki `config.json` dosyasına başka bir numara yazın. Docker'da içinde `PORT=3002` satırı olan bir `.env` dosyası koyun ve `docker compose up -d --force-recreate seotracker` komutunu çalıştırın. Numara değişince Google yönlendirme adreslerini de güncelleyin.

## Simge "Windows bileşeni eksik" diyor

**Belirti:** Uygulama açılmıyor. Simgede "Windows bileşeni eksik" yazıyor ya da kayıtta "Workers runtime failed to start" ve "0xc0000005" geçiyor.

**Sebep:** Uygulamanın motoru Microsoft'un Visual C++ paketini (2015-2022, 64 bit) ister. Temiz bir Windows'ta bu paket yoktur ya da eskidir.

**Çözüm:** Çıkan baloncuğa tıklayın ya da simgeye sağ tıklayıp **Eksik Windows bileşenini kur** deyin. Windows bir kez yönetici izni sorar. Kurulum bitince uygulama kendiliğinden yeniden başlar. Paket elinizde yoksa Microsoft'un sayfasından indirin: `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## Yönetici izni verilmedi

**Belirti:** Kurulum sırasında Visual C++ için izin istendi, **Hayır** dediniz. Kurulum "Microsoft Visual C++ çalışma zamanı kurulamadı" dedi.

**Sebep:** Gereken Windows bileşeni kurulamadı. Uygulama gereken dosyaların bir kopyasını yanında taşıdığı için çoğu bilgisayarda yine de açılır.

**Çözüm:** Uygulama açıldıysa bir şey yapmanız gerekmez. Açılmadıysa görev çubuğundaki simgeye sağ tıklayın (simge görünmüyorsa ^ okuna tıklayın). **Eksik Windows bileşenini kur** deyin ve bu kez izin verin. Ya da bileşeni `https://aka.ms/vs/17/release/vc_redist.x64.exe` adresinden indirip kurun.

## Simge "Uygulamanın motoru çöktü" diyor

**Belirti:** Uygulama açılmıyor. Kayıtta "Workers runtime failed to start" ve "0xc0000005" var ama Visual C++ paketi kurulu.

**Sebep:** Uygulamanın motoru (workerd) bu bilgisayarda bir sistem dosyasına takılıyor. Uygulama açılışta motoru tek başına dener. "Tek başına da başlayamıyor" diyorsa sorun bilgisayardadır. "Tek başına çalışıyor" diyorsa sorun veri klasöründe ya da yapılandırmadadır.

**Çözüm:** Önce **Kurulumu onar** deyin. Düzelmezse simgeye sağ tıklayıp **Sorunu bildir (GitHub)** deyin. Tanı bilgisi (Windows sürümü, işlemci, hatalı modül adı, çökme dökümü) kayda kendiliğinden eklenir, siz yalnızca gönderin. Çökme dökümleri `%LOCALAPPDATA%\seowatcher\logs\dumps` klasöründedir. İsterseniz onları da kayda ekleyin.

## Windows "bilgisayarınızı korudu" diyor

**Belirti:** Kurulum dosyası açılmıyor, mavi bir uyarı ekranı çıkıyor.

**Sebep:** Dosya imzalı değil. Windows tanımadığı yayıncılara bu ekranı gösterir.

**Çözüm:** Ekrandaki **Daha fazla bilgi** yazısına tıklayın. **Yine de çalıştır** düğmesi belirir. Endişeniz varsa dosyanın SHA-256 özetini (parmak izini) sürüm sayfasındaki `SHA256SUMS.txt` ile karşılaştırın.

## Google "redirect_uri_mismatch" diyor

**Belirti:** **Bağlan** deyince Google bir hata sayfası gösteriyor.

**Sebep:** Google Cloud Console'daki yönlendirme adresi uygulamadakiyle bire bir aynı değil.

**Çözüm:** **Ayarlar → Google** bölümündeki kopyalama düğmesiyle iki adresi alın. Cloud Console'da Google erişim anahtarının (OAuth istemcisinin) adres alanına yapıştırın. localhost ile 127.0.0.1, http ile https ya da sondaki eğik çizgi farkı bu hataya yol açar.

## "Google erişim anahtarı eksik"

**Belirti:** Proje ayarlarında Bağlantılar sekmesi sarı uyarı gösteriyor.

**Sebep:** Ne **Ayarlar → Hizmet hesabı** bölümüne bir hizmet hesabı, ne de **Ayarlar → Google** bölümüne istemci kimliği ve gizli anahtar girilmiş. Ya da şifreleme anahtarı bozuk ve kayıtlı Google bilgileri açılamıyor.

**Çözüm:** Bir hizmet hesabı ya da Google erişim anahtarı girin ([Google'a bağlanma](/docs/google-baglantisi/)). İkisinden biri yeter; ikisi de kayıtlıysa hizmet hesabı kullanılır. **Yardım** ekranındaki "Google girişi" satırı hangisinin kullanıldığını yazar.

- **Windows paketi:** şifreleme anahtarı veri klasöründeki `instance-secret` dosyasıdır ve başlatıcı onu bir kez üretir. Simge bu dosyanın bozuk olduğunu söylüyorsa yedekten geri koyun; Google hiç bağlanmadıysa dosyayı silip **Yeniden başlat** deyin.
- **Docker:** `BETTER_AUTH_SECRET` değerini elle verdiyseniz en az 32 karakter olmalı. Boş bırakırsanız konteyner kendisi üretir.

## Google "access_denied" diyor

**Belirti:** İzin ekranından sonra "iptal edildi" uyarısı çıkıyor.

**Sebep:** Giriş yaptığınız Google hesabı, izin ekranındaki test kullanıcıları listesinde yok.

**Çözüm:** Cloud Console'da **OAuth izin ekranı → Test kullanıcıları** bölümüne hesabı ekleyin. Sonra yeniden **Bağlan** deyin.

## Bağlantının süresi doldu

**Belirti:** Bağlantılar kartında "Bağlantının süresi doldu" yazıyor, veri gelmiyor.

**Sebep:** Google, "Test" durumundaki uygulamalarda izni yedi gün sonra düşürebilir. Şifreleme anahtarı değişmiş de olabilir.

**Çözüm:** Kartta **Yeniden bağlan** deyin. Sık tekrarlıyorsa izin ekranını üretime alın ya da hizmet hesabına geçin (**Ayarlar → Hizmet hesabı**).

## Sorgu verisi yok, grafikler boş

**Belirti:** Panel kartları sıfır. Arama performansı "Bu dönem için henüz veri yok" diyor.

**Sebep:** Üç ihtimal var. Site yenidir ve Google henüz gösterim vermiyor. Ya da Search Console üç gün gecikmelidir ve seçili dönem çok kısadır. Ya da yanlış mülk seçilmiştir.

**Çözüm:** Dönemi **Son 3 ay** yapın. Proje ayarlarında mülkün doğru site olduğuna bakın. Alan adı mülkü tüm alt alan adlarını kapsar, URL öneki mülkü kapsamaz. Yeni sitede sorgu satırları haftalar sonra gelebilir. Sayfa tablosu daha önce dolar.

## Tablo toplamı kartla tutmuyor

**Belirti:** Sayfa tablosundaki gösterimleri toplayınca karttaki sayıdan büyük çıkıyor.

**Sebep:** Bu bir hata değil. Google aynı aramada çıkan her sayfayı ayrı sayar. Kart site toplamıdır.

**Çözüm:** Toplamı karttan okuyun. Tabloyu sayfa sayfa yorumlayın.

## Denetim "Sürüyor" diye takıldı

**Belirti:** Yarım saattir ilerleme yok.

**Sebep:** Uygulama yeniden başlamış ya da işlem düşmüş olabilir.

**Çözüm:** Bekleyin. Uygulama 15 dakikadan uzun "sürüyor" görünen denetimi kontrol eder. Yaşam belirtisi yoksa "Başarısız" diye kapatır ve sebebini yazar. Sonra **Aynı ayarlarla yeniden başlat** deyin. İki denetimi aynı anda hız ölçümüyle başlatmayın, birbirini yavaşlatır.

## Denetim "tamamlanamadan durdu" diyor

**Belirti:** Denetim ekranında "Denetim tarama aşamasında durdu." ya da "Denetim tamamlanamadan durdu." yazıyor. Puanın yerinde "Eksik denetim, puan verilmedi" görünüyor.

**Sebep:** Denetim bir aşamada hata verdi. Başlık hangi aşamada durduğunu yazar: adres keşfi, tarama, hız ölçümü ya da sonuçların hazırlanması. Altındaki cümle sorunun sitede mi uygulamada mı olduğunu söyler.

**Çözüm:** Ekrandaki cümleye göre ilerleyin.

- **Bir adım zamanında bitmedi.** Genelde site çok yavaş yanıt veriyordur. Birkaç dakika sonra yeniden deneyin, yine olursa daha az sayfayla başlatın.
- **Denetim belleğe sığmadı** ya da **işlemci süresini aştı** ya da **bir adımın sonucu saklanabilecek boyutu aştı.** Çok büyük ya da çok karmaşık sayfalar buna yol açar. Daha az sayfayla yeniden başlatın.
- **Sonuçlar veritabanına yazılırken hata oluştu.** Disk dolu ya da veri dosyası başka bir programda kilitli olabilir. Diskte boş yer olduğunu kontrol edin, uygulamayı yeniden başlatın, sonra denetimi yeniden başlatın.
- **Denetimi yürüten iç düzen hata verdi.** Tepsi menüsünden **Yeniden başlat** deyin, sonra denetimi yeniden başlatın.
- **Denetim yarıda kaldı.** Uygulama denetimin ortasında kapanmış ya da yeniden başlamış olabilir. Uygulamanın açık kaldığından emin olun ve denetimi yeniden başlatın.
- **Kurulum anahtarı denetimi yürüten bölüme ulaşmamış.** Kayıtlı Google ve PageSpeed anahtarlarınız silinmedi. Uygulamayı güncelleyin ya da yeniden başlatın, sonra denetimi yeniden başlatın.
- **Beklenmedik bir hata.** Denetimi yeniden başlatın. Tekrarlarsa **Yardım** ekranından tanılama paketini indirip sorunu bildirin.

Ham hata metni ekrana gelmez. Tanılama paketinde durur.

## Denetimde "Kısmi puan" yazıyor

**Belirti:** Puanın yanında derece kelimesi yok. "Kısmi puan, ölçüm kapsamı %62" gibi bir satır var.

**Sebep:** Kontrollerin önemli bir kısmı ölçülemedi (ölçülen kontrollerin payı yüzde 70'in altında ya da Tarama, Dizine alma, İçerik ya da Hız kategorilerinden birinde yarıdan azı ölçüldü). Nedenleri kartın altındaki satırlar yazar: PageSpeed kotası doldu, PageSpeed anahtarı yok, hız ölçümü kapalıydı ya da Search Console'dan dizin verisi alınamadı.

**Çözüm:** Hız ölçümünü açın, PageSpeed anahtarı ekleyin ya da Search Console'u bağlayın, sonra denetimi yeniden başlatın. Puan o ana kadar ölçülenlere göredir. İyi ya da kötü bir karar verilmemiştir.

## Denetim "Eksik denetim, puan verilmedi" diyor

**Belirti:** Puan kartının yerinde bu cümle var, bulgular altta durmaya devam ediyor.

**Sebep:** Denetim hata verip durdu, hâlâ çalışıyor ya da tarama sitenin istek sınırı yüzünden erken durdu. Sorun listesi tam olmadığı için puan hesaplanmadı. Hiç sayfa taranamadıysa puan kartı hiç çıkmaz.

**Çözüm:** Nedeni yukarıdaki bölümden okuyun. İstek sınırı sıfırlandıktan sonra ya da sorun giderilince denetimi yeniden çalıştırın. Bulgular taranan sayfalar için geçerlidir.

## Denetim bitti ama "hız ölçümü anahtarsız yapıldı" diyor

**Belirti:** Denetim tamamlandı. Bir uyarı "Kayıtlı PageSpeed anahtarı okunamadı; hız ölçümü anahtarsız yapıldı." diyor. Hız sekmesinde en fazla 50 sayfa var.

**Sebep:** Denetimi yürüten bölüm kayıtlı anahtarı açacak kurulum anahtarını alamadı, bu yüzden hız ölçümü anahtarsız yapıldı. Tarama sonuçları etkilenmedi.

**Çözüm:** Uygulamayı güncelleyin ya da yeniden başlatın, sonra yeni bir denetim başlatın. Sürerse **Ayarlar** ekranından PageSpeed anahtarını yeniden kaydedin.

## Denetim "Engellendik" diyor

**Belirti:** Sarı uyarı çıkıyor: "Denetim bu siteyi tamamen tarayamadı." ya da "N sayfada engellendik."

**Sebep:** Sitenin bot koruması (Cloudflare ya da güvenlik duvarı) uygulamanın site tarayıcısını durdurdu.

**Çözüm:** Güvenlik duvarında `seotracker-audit` adlı kullanıcı aracısına izin verin ya da bilgisayarınızın ağ adresini (IP) izinli listeye alın. Site sizin değilse yapacak bir şey yok. Sonuçlar taranabilen sayfalarla sınırlı kalır.

## Hız ölçümü yarım kaldı ya da hiç yok

**Belirti:** Hız sekmesi boş ya da çok az satır var. Kota kartı "Kota doldu", "Dakikalık sınır" ya da "Anahtar yok" diyor.

**Sebep:** PageSpeed anahtarı yok (en fazla 50 sayfa ölçülür). Ya da Google'ın günlük hakkı dolmuş.

**Çözüm:** [PageSpeed anahtarı](/docs/pagespeed-anahtari/) sayfasındaki adımlarla ücretsiz bir anahtar alın. Günlük hak dolduysa kalanı yarın yapacağınız yeni denetimde ölçülür. Denetim başlarken hız ölçümü kapalıysa o denetim için sonradan ölçülmez.

## URL Denetimi "günlük sınıra ulaşıldı"

**Belirti:** Dizin durumu sekmesinde düğme çalışmıyor. "Google'ın günlük 2.000 adres sınırı doldu" uyarısı çıkıyor.

**Sebep:** Mülk başına günde 2.000 soru hakkı var. Uygulama, asistanınız ve Search Console'da elle yaptığınız sorgular aynı havuzdan harcar.

**Çözüm:** Sınır son 24 saate göre hesaplanır ve birkaç saat içinde açılmaya başlar; sonra devam edin. Uygulama yalnızca eskiyen yanıtları yeniden sorar, hakkınız boşa gitmez.

## Analytics kartı ya da raporu hata veriyor

**Belirti:** Panel'deki Organik trafik kartı ya da Analytics ekranı veri yerine bir cümle gösteriyor ve **Bağlantıyı düzelt** ile **Tekrar dene** düğmeleri çıkıyor.

**Sebep:** Cümle nedeni ve çözümü yazar. Başlıca durumlar şunlardır.

- **Bağlantının süresi dolmuş ya da iptal edilmiş.** **Ayarlar**'dan yeniden bağlayın.
- **Bu mülke erişim reddedildi (HTTP 403).** Bağlı hesaba ya da hizmet hesabına mülkte en az Görüntüleyici yetkisi verin.
- **Mülk bulunamadı (HTTP 404).** Mülk silinmiş ya da taşınmış olabilir. **Ayarlar**'dan yeniden seçin.
- **Bu projeye bağlı bir mülk yok.** **Ayarlar**'dan bir mülk seçin.
- **Raporlama kotası doldu (HTTP 429).** Kota saatlik ve günlük yenilenir. Daha sonra tekrar deneyin.
- **Google Analytics Data API Google Cloud projesinde kapalı.** Google Cloud Console'da "Google Analytics Data API"yi etkinleştirip tekrar deneyin.
- **Rapor seçili mülkle uyumlu değil (HTTP 400).** Mülkü kontrol edin ya da başka bir mülk seçin.
- **Google geçersiz bir yanıt döndürdü ya da geçici olarak yanıt vermiyor.** Birazdan tekrar deneyin.
- **Google'a bağlanılamadı.** Bu bilgisayarın internet bağlantısını kontrol edin.

**Çözüm:** Listeden size uyan adımı uygulayın. Çoğu zaman **Bağlantıyı düzelt** sizi doğru ayara götürür.

## Search Console isteği hata veriyor

**Belirti:** Arama performansı, Fırsatlar ya da Sıralama takibi veri yerine bir Search Console hatası gösteriyor.

**Sebep:** Hata cümlesi nedeni yazar.

- **İstek geçersiz bulundu (HTTP 400).** Bu bir bağlantı sorunu değil. Seçili boyut, filtre ya da arama türü bu mülkte kullanılamıyor. Filtreleri kaldırın.
- **Mülke erişim reddedildi (HTTP 401 ya da 403).** Hesabın mülkte doğrulanmış yetkisi olduğunu kontrol edin ya da **Ayarlar**'dan bağlantıyı yenileyin.
- **Mülk bulunamadı (HTTP 404).** Mülk Search Console'dan kaldırılmış olabilir. **Ayarlar**'dan yeniden seçin.
- **İstek sınırı doldu (HTTP 429).** Birkaç dakika sonra tekrar deneyin.
- **Zamanında yanıt vermedi.** Birazdan tekrar deneyin.
- **Geçici olarak yanıt vermiyor (başka bir HTTP kodu).** Birazdan tekrar deneyin. Sürerse Google'ın durum sayfasına bakın.
- **Google'a bağlanılamadı.** Cümle "Neden" satırında bir ayrıntı yazar. Sürerse bu bilgisayarın internet bağlantısını kontrol edin.

**Çözüm:** Hata cümlesindeki adımı izleyin. Hesap ve mülk sorunlarında **Ayarlar**'da bağlantıyı yenilemek çoğu zaman yeter.

## Analytics'te localhost trafiği görünüyor

**Belirti:** Giriş sayfaları tablosunda Alan adı sütununda localhost ya da 127.0.0.1 yazıyor.

**Sebep:** Sitenizin deneme kopyası da aynı Analytics etiketini yüklüyor.

**Çözüm:** Etiketi yalnızca gerçek alan adında yüklenecek şekilde ayarlayın. Çoğu araçta "alan adı kontrolü" seçeneği vardır. Uygulama bu satırları kendiliğinden ayıklamaz. O zamana kadar Alan adı sütununa bakarak okuyun.

## Asistan bağlanamıyor (401)

**Belirti:** Claude Code ya da Codex "Unauthorized" diyor.

**Sebep:** Parola gönderilmiyor ya da yanlış.

**Çözüm:** En kolayı **Ajan kurulumu** ekranındaki hazır komuttur: kurulum türünü bilir ve parolayı ekrana yazdırmadan aracınızın ayarına koyar. Elle yapacaksanız parolayı yeniden alın; sohbete yapıştırmayın, ekran görüntüsüne düşürmeyin.

- **Windows paketi:** parola `%LOCALAPPDATA%\seowatcher\mcp-token` dosyasındadır (menüde **Veri klasörünü aç**). Başlatıcı onu ilk açılışta üretir ve her açılışta uygulamaya verir. Ekrana yazdırmadan panoya almak için PowerShell: `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`. Yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle). Bu kurulumda `docker` komutu yoktur.
- **Docker:** parola konteynerin içindedir: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Git Bash'te başına `MSYS_NO_PATHCONV=1` ekleyin, yoksa çıktı boş gelir. Değerin sonundaki satır sonunu almayın. Kendi parolanızı `.env` içindeki `MCP_TOKEN` ile verebilirsiniz; değiştirince `docker compose up -d --force-recreate seotracker` gerekir.

Sonra Claude Code'da `/mcp` yazıp **Reconnect** deyin.

## Bir ayarı değiştirdim, uygulama görmüyor

**Belirti:** Yeni adres numarası, `.env` değeri ya da parola uygulamaya yansımadı.

**Sebep:** Ayarlar ekranına girilenler (Google, hizmet hesabı, PageSpeed anahtarı, dil) hemen geçerli olur. Dosyadaki ayarlar ise yalnızca yeniden açılışta okunur ve iki kurulumda farklı dosyalardadır.

**Çözüm (Windows paketi):** `.env` ve ortam değişkeni yoktur. Elle değiştirilen tek dosya veri klasöründeki `config.json`'dır: `"port"` ve `"autoUpdate"`. Değiştirdikten sonra menüden **Yeniden başlat** deyin. Yanındaki `server.env` dosyasını düzenlemeyin; başlatıcı onu her açılışta yeniden yazar.

**Çözüm (Docker):** Değişkenler proje klasöründeki `.env` dosyasındadır (liste: `docs/ENVIRONMENT.md`). Değiştirince konteyneri yeniden oluşturun: `docker compose up -d --force-recreate seotracker`. Düz `docker compose restart seotracker` yalnızca yeniden başlatır, `.env` değişikliğini uygulamaz.

## Docker ilk açılışta çok uzun sürüyor ya da "unhealthy"

**Belirti:** `docker compose ps` beş dakikadan sonra bile healthy demiyor.

**Sebep:** İlk açılışta uygulama kutunun (konteynerin) içinde derlenir ve yaklaşık 2 GB bellek ister. Bellek yetmezse derleme düşer.

**Çözüm:** `docker compose logs --tail 50` komutunu çalıştırıp son satırlara bakın. Bellek hatası varsa Docker Desktop ayarlarından kutulara daha fazla bellek verin. Sonra `docker compose up -d --build` komutunu çalıştırın.

## Veriler ve günlükler nerede?

Windows'ta her şey `%LOCALAPPDATA%\seowatcher` klasöründedir: `data` (veritabanı), `logs\launcher.log`, `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. Günlük dosyası büyüyünce (`server.log` 5 MB, diğerleri 1 MB) eskisi `server.old.log` gibi bir adla yanında kalır, yenisi baştan başlar. `logs\wrangler` klasöründe motorun kendi ayrıntılı kayıtları durur; 30 günden eskileri kendiliğinden silinir. Görev çubuğu menüsündeki **Günlükleri aç** ve **Veri klasörünü aç** oraya götürür.

Docker'da veri `seotracker_data` deposunda (`/app/.wrangler`) durur. Günlükleri `docker compose logs -f` komutuyla görürsünüz.

Sorun bildirirken **Yardım** ekranındaki **Tanılama paketi indir** düğmesine basın. Paket son 25 denetimin aşama ve hata özetlerini de içerir; PageSpeed hata metinlerinden sayfa URL'leri çıkarılır. Proje adı ve alan adı gibi tanıtıcı bilgiler bulunabilir; dosyayı göndermeden önce inceleyin.

## Windows ayarı kaydedilemiyor

**Belirti:** **Ayarlar** ekranındaki Windows bölümünde bir seçeneği değiştirince hata çıkıyor ya da bölüm "Windows ayarlarına ulaşılamadı" diyor.

**Sebep:** Bu bölüm görev çubuğundaki uygulamayla konuşur. Hata cümlesi hangisinin olduğunu yazar.

- **Tepsi uygulaması 4 saniye içinde yanıt vermedi.** Bilgisayar uykudan yeni uyandıysa birkaç saniye sonra **Tekrar dene**'ye basın. Sürerse tepsi menüsünden **Çıkış** deyip uygulamayı yeniden açın.
- **Tepsi uygulamasının ayar servisine bağlanılamadı.** Tepsi uygulaması kapanmış olabilir. seowatcher'ı Başlat menüsünden yeniden açın.
- **Bu ayar yönetici tarafından kilitlenmiş.** Yalnızca bilgisayarın yöneticisi değiştirebilir.
- **Tepsi uygulaması bu isteği tanımadı.** Sunucu ile tepsi uygulaması farklı oturumlardan kalmış olabilir. Tepsi menüsünden **Çıkış** deyip uygulamayı yeniden açın.
- **Tepsi uygulaması ayar isteğini reddetti.** Uygulamayı tepsi menüsünden yeniden başlatın. Sürerse Windows paketini güncelleyin.
- **Tepsi uygulaması tanınmayan bir yanıt döndürdü.** Uygulama ile tepsi sürümü uyuşmuyor olabilir. Windows paketini güncelleyin.

**Çözüm:** Yukarıdaki listeden hata cümlenize uyan adımı uygulayın. Bu seçenekler yalnızca Windows paketinde kullanılabilir. Docker'da başlangıç davranışını işletim sisteminizden yönetirsiniz.

## Başlatıcı uyarıları

Görev çubuğu simgesinde çıkan uyarılar ve ne yapacağınız:

- **"Sunucu 120 saniyede yanıt vermedi".** Menüden **Yeniden başlat** deyin. Olmazsa **Günlükleri aç** deyip `server.log` dosyasının son satırlarına bakın.
- **"seowatcher yeniden başlatılıyor".** Sunucu kendiliğinden kapandı, uygulama onu yeniden açıyor. Açık sayfayı birkaç saniye sonra yenileyin.
- **"Sunucu 10 dakikada üç kez kapandı".** Uygulama yeniden açmayı bıraktı. **Kurulumu onar** deyin, düzelmezse **Sorunu bildir (GitHub)**.
- **"Kurulum eksik".** **Kurulumu onar** eksik dosyaları kurulum dosyasını indirerek geri koyar. İnternet yoksa sürüm sayfası açılır; kurulum dosyasını indirip çalıştırın.
- **"3001 numarası dolu, 3002 kullanılıyor".** Başka bir program 3001'i tutuyor (çoğu zaman eski bir Docker kopyası). Uygulamanın her ekranında aynı uyarı sarı bir şeritle de çıkar. Google'a bağlanırken hata alırsanız o programı kapatıp **Yeniden başlat** deyin. Ayrıntı için yukarıdaki "Adres numarası (port) dolu" bölümüne bakın.
- **"Güncelleme denetlenemedi" ya da "Güncelleme yapılamadı".** Baloncuk sebebini söyler. "GitHub'a ulaşılamadı" diyorsa internet bağlantınızı kontrol edin. "GitHub şu an çok fazla istek alıyor" diyorsa bir saat sonra tekrar deneyin. Parmak izi tutmadı diyorsa kurulum dosyasını sürüm sayfasından indirin. Her durumda kurulu sürüm çalışmaya devam eder.
- **"Güncelleme kurulmadı".** Kurulum penceresi kapatıldı ya da yönetici izni verilmedi. Menüden **Güncelle** ile tekrar deneyin.
- **"Windows bileşeni kurulamadı".** Menüden **Eksik Windows bileşenini kur** deyin.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; PortFallbackBanner.tsx; portFallbackCopy.ts; src/server/lib/port-fallback.ts; src/server/lib/errors.ts; src/server/features/windows/WindowsSettingsService.ts; src/client/features/audit/results/auditFailureCopy.ts; WithheldScore.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
