---
title: Sorun giderme
description: En sık karşılaşılan on beş sorun, belirtisi, sebebi ve çözümüyle. Port dolu, SmartScreen, Google bağlantı hataları, kota, takılan denetim, boş grafikler, MCP 401.
kind: sorun-giderme
updated: 2026-10-22
---

Bir şey çalışmıyorsa önce uygulamanın **Yardım** ekranındaki "Kurulumunuzun durumu" kartına bakın; beş kontrol yapar (giriş ve erişim, Google girişi, PageSpeed anahtarı, çalışma ortamı, veritabanı) ve "N şey dikkat istiyor" diyorsa yanındaki düğme sizi doğru ayara götürür. Aşağıdaki liste en sık görülenden en nadire doğru sıralıdır.

### Sayfa açılmıyor

**Belirti:** Tarayıcı "bağlantı reddedildi" diyor.

**Neden:** Uygulama çalışmıyor.

**Çözüm:** Windows paketinde görev çubuğundaki simgeye bakın; yoksa Başlat menüsünden seowatcher'ı açın. Simge var ama "Hata" yazıyorsa sağ tıklayıp **Yeniden başlat** deyin. Docker'da `docker compose ps` ile durumun healthy olduğunu kontrol edin; değilse `docker compose up -d`.

### Port dolu

**Belirti:** Windows'ta simge "Port 3001 ve sonraki 9 port dolu" diyor; Docker'da "Bind for 127.0.0.1:3001 failed".

**Neden:** Başka bir program aynı portu dinliyor.

**Çözüm:** Windows paketi normalde 3002'den 3010'a kadar boş bir port seçer; hepsi doluysa veri klasöründeki config.json'a başka bir port yazın. Docker'da PORT=3002 satırlı bir .env koyup `docker compose up -d --force-recreate seotracker`. Port değişince Google yönlendirme adreslerini de güncelleyin.

### Windows "bilgisayarınızı korudu" diyor

**Belirti:** Kurulum dosyası açılmıyor, mavi SmartScreen ekranı.

**Neden:** Dosya kod imzalı değil; Windows tanımadığı yayıncılara bunu gösterir.

**Çözüm:** Ekranda **Daha fazla bilgi** yazısına tıklayın, **Yine de çalıştır** düğmesi belirir. Endişeniz varsa dosyanın SHA-256 özetini sürüm sayfasındaki SHA256SUMS.txt ile karşılaştırın.

### Google "redirect_uri_mismatch" diyor

**Belirti:** **Bağlan** deyince Google hata sayfası gösteriyor.

**Neden:** Cloud Console'daki yönlendirme adresi uygulamanınkiyle birebir aynı değil.

**Çözüm:** Ayarlar → Google bölümündeki kopyalama düğmesiyle iki adresi alıp Cloud Console'daki OAuth istemcisine yapıştırın. localhost ile 127.0.0.1, http ile https, sondaki eğik çizgi fark eder.

### "Google istemcisi tanımlı değil"

**Belirti:** Proje ayarlarında Entegrasyonlar sekmesi sarı uyarı gösteriyor.

**Neden:** Ayarlar → Google bölümüne istemci kimliği ve gizli anahtar girilmemiş, ya da Docker'da şifreleme anahtarı 32 karakterden kısa.

**Çözüm:** Google'a bağlanma kılavuzunun 6. adımı. Docker'da BETTER_AUTH_SECRET'ı elle verdiyseniz uzatın ya da boş bırakıp uygulamanın üretmesine izin verin.

### Google "access_denied" diyor

**Belirti:** İzin ekranından sonra "iptal edildi" uyarısı.

**Neden:** Giriş yaptığınız Google hesabı, Cloud Console'daki izin ekranının test kullanıcıları listesinde değil.

**Çözüm:** OAuth izin ekranı → Test kullanıcıları bölümüne hesabı ekleyin, yeniden **Bağlan**.

### Bağlantının süresi doldu

**Belirti:** Entegrasyon kartında "Bağlantının süresi doldu", veriler gelmiyor.

**Neden:** "Test" durumundaki OAuth uygulamalarında Google izni yedi günde düşürebilir; ya da şifreleme anahtarı değişmiş.

**Çözüm:** Kartta **Yeniden bağlan**. Sık tekrarlıyorsa izin ekranını üretime alın ya da hizmet hesabına geçin (Ayarlar → Hizmet hesabı).

### Sorgu verisi yok, grafikler boş

**Belirti:** Panel kartları sıfır, Arama performansı "Bu dönem için henüz veri yok".

**Neden:** Üç olasılık: site yeni ve Google henüz gösterim vermiyor; Search Console üç gün gecikmeli ve seçili dönem çok kısa; yanlış mülk seçilmiş.

**Çözüm:** Dönemi **Son 3 ay** yapın. Proje ayarlarında mülkün doğru site olduğundan emin olun (alan adı mülkü tüm alt alanları kapsar, URL öneki mülkü kapsamaz). Yeni sitede sorgu satırı haftalar sonra gelebilir; sayfa tablosu daha önce dolar.

### Tablo toplamı kartla tutmuyor

**Belirti:** Sayfa tablosundaki gösterimleri toplayınca karttaki sayıdan büyük çıkıyor.

**Neden:** Bu bir hata değil. Google aynı aramada çıkan her sayfayı ayrı sayar; kart site toplamıdır.

**Çözüm:** Toplamları karttan okuyun, tabloyu sayfa sayfa yorumlayın.

### Denetim "Sürüyor" diye takıldı

**Belirti:** Yarım saattir ilerleme yok.

**Neden:** Uygulama yeniden başlamış ya da işlem düşmüş olabilir.

**Çözüm:** Bekleyin; uygulama 15 dakikadan uzun "sürüyor" görünen denetimleri kontrol eder ve nabız yoksa "Başarısız" olarak kapatır, sebebini (instance_lost gibi) yazar. Sonra **Aynı ayarlarla yeniden başlat** deyin. İki denetimi aynı anda hız ölçümüyle başlatmayın; birbirini yavaşlatır.

### Denetim "Engellendik" diyor

**Belirti:** Sarı uyarı: "Denetim bu siteyi tamamen tarayamadı." ya da "N sayfada engellendik."

**Neden:** Sitenin bot koruması (Cloudflare, güvenlik duvarı) tarayıcıyı durdurdu.

**Çözüm:** Güvenlik duvarında "seotracker-audit" kullanıcı aracısına izin verin ya da tarayıcının IP'sini beyaz listeye alın. Site sizin değilse yapacak şey yoktur; sonuçlar taranabilen sayfalarla sınırlı kalır.

### Hız ölçümü yarım kaldı ya da hiç yok

**Belirti:** Hız sekmesi boş ya da çok az satır; kota kartı "Kota doldu", "Dakikalık sınır" ya da "Anahtar yok" diyor.

**Neden:** PageSpeed anahtarı yok (en fazla 50 sayfa) ya da Google'ın günlük kotası bitmiş.

**Çözüm:** PageSpeed anahtarı kılavuzuna göre ücretsiz anahtar alın. Günlük kota bittiyse yarın yeni bir denetimde tamamlanır. Hız ölçümü denetim başlatılırken kapalıysa o denetim için geriye dönük yapılmaz.

### URL Denetimi "günlük sınıra ulaşıldı"

**Belirti:** Dizin durumu sekmesinde düğme çalışmıyor, "Google'ın günlük 2.000 adres sınırına ulaşıldı".

**Neden:** Mülk başına günde 2.000 soru hakkı var; uygulama, ajanınız ve Search Console'da elle yaptığınız sorgular aynı havuzdan harcar.

**Çözüm:** Yarın devam edin. Uygulama yalnızca eskiyen cevapları yeniden sorar, kotanız boşa gitmez.

### Analytics'te localhost trafiği görünüyor

**Belirti:** Giriş sayfaları tablosunda Alan adı sütununda localhost ya da 127.0.0.1.

**Neden:** Sitenizin geliştirme kopyası da aynı Analytics etiketini yüklüyor.

**Çözüm:** Etiketi yalnızca gerçek alan adında yükletin (çoğu araçta "alan adı kontrolü" ayarı). Uygulama bu satırları otomatik ayıklamaz; o güne kadar Alan adı sütununa bakarak yorumlayın.

### Asistan MCP'ye bağlanamıyor (401)

**Belirti:** Claude Code ya da Codex "Unauthorized" diyor.

**Neden:** Parola gönderilmiyor ya da yanlış.

**Çözüm:** Parolayı yeniden kopyalayın: Windows'ta veri klasöründeki mcp-token dosyası, Docker'da `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Değerin sonundaki satır sonu karakterini silin. Claude Code'da `/mcp` → Reconnect.

### Docker ilk açılışta çok uzun sürüyor ya da "unhealthy"

**Belirti:** `docker compose ps` beş dakikadan sonra bile healthy demiyor.

**Neden:** İlk açılışta uygulama konteyner içinde derlenir ve yaklaşık 2 GB bellek ister; bellek yetmezse derleme düşer.

**Çözüm:** `docker compose logs --tail 50` son satırlara bakın. Bellek hatası varsa Docker Desktop'ın ayarlarından konteynerlere daha fazla bellek verin ve `docker compose up -d --build`.

### Veri ve günlükler nerede

Windows paketinde her şey **%LOCALAPPDATA%\seowatcher** altında: data (veritabanı), logs\server.log ve logs\migrate.log, instance-secret, mcp-token, config.json. Görev çubuğu menüsündeki **Günlükleri aç** ve **Veri klasörünü aç** oraya gider. Docker'da veri **seotracker_data** biriminde (/app/.wrangler), günlük `docker compose logs -f` komutunda. Bir sorun bildirirken **Yardım** ekranındaki **Tanılama paketi indir** düğmesi sürüm, kurulum kontrolleri ve son 25 denetimi içeren, hiçbir sır içermeyen bir dosya üretir; onu GitHub'daki sorun kaydına ekleyin.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
