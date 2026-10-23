---
title: Sorun giderme
description: En sık görülen sorunları belirti, sebep ve çözümle anlatır. Dolu adres numarası, Windows uyarısı, Google hataları, kota, takılan denetim, boş grafik ve asistan 401 burada.
kind: sorun-giderme
updated: 2026-10-22
---

Bir şey çalışmıyorsa önce uygulamada **Yardım** ekranındaki "Kurulumunuzun durumu" kartına bakın. Kart giriş ve erişimi, Google girişini, PageSpeed anahtarını ve veritabanını kontrol eder. "N şey dikkat istiyor" diyorsa yanındaki düğme sizi doğru ayara götürür. Aşağıdaki sorunlar en sık görülenden en nadire doğru sıralıdır.

## Sayfa açılmıyor

**Belirti:** Tarayıcı "bağlantı reddedildi" diyor.

**Sebep:** Uygulama çalışmıyor.

**Çözüm:** Windows'ta görev çubuğundaki simgeye bakın. Simge görünmüyorsa görev çubuğundaki ^ okuna tıklayın. Yoksa Başlat menüsünden seowatcher'ı açın. Simgede "Hata" yazıyorsa sağ tıklayıp **Yeniden başlat** deyin. Docker'da `docker compose ps` komutunu çalıştırın. Durum healthy değilse `docker compose up -d` komutunu çalıştırın.

## Adres numarası (port) dolu

**Belirti:** Windows'ta simge "3001 ve sonraki 9 adres numarası (port) dolu" diyor. Docker'da "Bind for 127.0.0.1:3001 failed" yazıyor.

**Sebep:** Başka bir program aynı adres numarasını kullanıyor.

**Çözüm:** Windows paketi normalde 3002 ile 3010 arasında boş bir numara seçer. Hepsi doluysa veri klasöründeki `config.json` dosyasına başka bir numara yazın. Docker'da içinde `PORT=3002` satırı olan bir `.env` dosyası koyun ve `docker compose up -d --force-recreate seotracker` komutunu çalıştırın. Numara değişince Google yönlendirme adreslerini de güncelleyin.

## Simge "Windows bileşeni eksik" diyor

**Belirti:** Uygulama açılmıyor. Simgede "Windows bileşeni eksik" yazıyor ya da kayıtta "Workers runtime failed to start" ve "0xc0000005" geçiyor.

**Sebep:** Uygulamanın motoru Microsoft'un Visual C++ paketini (2015-2022, 64 bit) ister. Temiz bir Windows'ta bu paket yoktur ya da eskidir.

**Çözüm:** Çıkan baloncuğa tıklayın ya da simgeye sağ tıklayıp **Eksik Windows bileşenini kur** deyin. Windows bir kez yönetici izni sorar. Kurulum bitince uygulama kendiliğinden yeniden başlar. Paket elinizde yoksa Microsoft'un sayfasından indirin: `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## Yönetici izni verilmedi

**Belirti:** Kurulum sırasında Visual C++ için izin istendi, **Hayır** dediniz ve uygulama başlamadı.

**Sebep:** Gereken Windows bileşeni kurulamadı.

**Çözüm:** Görev çubuğundaki simgeye sağ tıklayın (simge görünmüyorsa ^ okuna tıklayın). **Eksik Windows bileşenini kur** deyin ve bu kez izin verin. Ya da bileşeni `https://aka.ms/vs/17/release/vc_redist.x64.exe` adresinden indirip kurun.

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

**Sebep:** **Ayarlar → Google** bölümüne istemci kimliği ve gizli anahtar girilmemiş. Ya da Docker'da şifreleme anahtarı 32 karakterden kısa.

**Çözüm:** Google'a bağlanma kılavuzunun 10. ve 11. adımlarını yapın. Docker'da `BETTER_AUTH_SECRET` değerini elle verdiyseniz uzatın. Boş bırakırsanız uygulama kendisi üretir.

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

## Denetim "Engellendik" diyor

**Belirti:** Sarı uyarı çıkıyor: "Denetim bu siteyi tamamen tarayamadı." ya da "N sayfada engellendik."

**Sebep:** Sitenin bot koruması (Cloudflare ya da güvenlik duvarı) uygulamanın site tarayıcısını durdurdu.

**Çözüm:** Güvenlik duvarında `seotracker-audit` adlı kullanıcı aracısına izin verin ya da bilgisayarınızın ağ adresini (IP) izinli listeye alın. Site sizin değilse yapacak bir şey yok. Sonuçlar taranabilen sayfalarla sınırlı kalır.

## Hız ölçümü yarım kaldı ya da hiç yok

**Belirti:** Hız sekmesi boş ya da çok az satır var. Kota kartı "Kota doldu", "Dakikalık sınır" ya da "Anahtar yok" diyor.

**Sebep:** PageSpeed anahtarı yok (en fazla 50 sayfa ölçülür). Ya da Google'ın günlük hakkı dolmuş.

**Çözüm:** PageSpeed anahtarı kılavuzuna göre ücretsiz anahtar alın. Günlük hak dolduysa kalanı yarın yapacağınız yeni denetimde ölçülür. Denetim başlarken hız ölçümü kapalıysa o denetim için sonradan ölçülmez.

## URL Denetimi "günlük sınıra ulaşıldı"

**Belirti:** Dizin durumu sekmesinde düğme çalışmıyor. "Google'ın günlük 2.000 adres sınırına ulaşıldı" yazıyor.

**Sebep:** Mülk başına günde 2.000 soru hakkı var. Uygulama, asistanınız ve Search Console'da elle yaptığınız sorgular aynı havuzdan harcar.

**Çözüm:** Yarın devam edin. Uygulama yalnızca eskiyen yanıtları yeniden sorar, hakkınız boşa gitmez.

## Analytics'te localhost trafiği görünüyor

**Belirti:** Giriş sayfaları tablosunda Alan adı sütununda localhost ya da 127.0.0.1 yazıyor.

**Sebep:** Sitenizin deneme kopyası da aynı Analytics etiketini yüklüyor.

**Çözüm:** Etiketi yalnızca gerçek alan adında yüklenecek şekilde ayarlayın. Çoğu araçta "alan adı kontrolü" seçeneği vardır. Uygulama bu satırları kendiliğinden ayıklamaz. O zamana kadar Alan adı sütununa bakarak okuyun.

## Asistan bağlanamıyor (401)

**Belirti:** Claude Code ya da Codex "Unauthorized" diyor.

**Sebep:** Parola gönderilmiyor ya da yanlış.

**Çözüm:** Parolayı yeniden kopyalayın. Windows'ta veri klasöründeki `mcp-token` dosyasındadır. Docker'da `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` komutunu çalıştırın. Değerin sonundaki satır sonu karakterini silin. Terminal kullanmak istemezseniz dosyayı Not Defteri ile açın, satırın tamamını seçip kopyalayın. Satır sonu bırakmayın. Claude Code'da `/mcp` yazıp **Reconnect** deyin.

## Docker ilk açılışta çok uzun sürüyor ya da "unhealthy"

**Belirti:** `docker compose ps` beş dakikadan sonra bile healthy demiyor.

**Sebep:** İlk açılışta uygulama kutunun (konteynerin) içinde derlenir ve yaklaşık 2 GB bellek ister. Bellek yetmezse derleme düşer.

**Çözüm:** `docker compose logs --tail 50` komutunu çalıştırıp son satırlara bakın. Bellek hatası varsa Docker Desktop ayarlarından kutulara daha fazla bellek verin. Sonra `docker compose up -d --build` komutunu çalıştırın.

## Veriler ve günlükler nerede?

Windows'ta her şey `%LOCALAPPDATA%\seowatcher` klasöründedir: `data` (veritabanı), `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. Görev çubuğu menüsündeki **Günlükleri aç** ve **Veri klasörünü aç** oraya götürür.

Docker'da veri `seotracker_data` deposunda (`/app/.wrangler`) durur. Günlükleri `docker compose logs -f` komutuyla görürsünüz.

Sorun bildirirken **Yardım** ekranındaki **Tanılama paketi indir** düğmesine basın. Dosyada sürüm, kurulum kontrolleri ve son 25 denetim var, hiçbir gizli değer yok. Dosyayı GitHub'daki sorun kaydına ekleyin.

## Başlatıcı uyarıları

Görev çubuğu simgesinde çıkan uyarılar ve ne yapacağınız:

- **"Sunucu 120 saniyede yanıt vermedi".** Menüden **Yeniden başlat** deyin. Olmazsa **Günlükleri aç** deyip `server.log` dosyasının son satırlarına bakın.
- **"Kurulum eksik".** Kurulum dosyasını yeniden çalıştırın.
- **"Güncelleme yapılamadı".** İnternet bağlantınızı kontrol edin ve menüden **Güncelle** ile tekrar deneyin. Kurulu sürüm çalışmaya devam eder.
- **"Windows bileşeni kurulamadı".** Menüden **Eksik Windows bileşenini kur** deyin.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
