---
title: Windows'a kurulum
description: Windows'a tek dosyayla kurarsınız, Docker ya da terminal gerekmez. Güncelleme, kaldırma, yedek alma ve adres numarasını değiştirme de aynı sayfada.
kind: nasil-yapilir
updated: 2026-10-23
---

Bu sayfayı bitirince uygulama bilgisayarınızda kurulu ve tarayıcıda açık olur. Kurulum iki dakika sürer. Yalnızca sizin kullanıcı hesabınıza kurulur, yönetici izni gerekmez.

## Gerekenler

- Windows 10 ya da 11 (64 bit).
- Yaklaşık 350 MB boş yer. Kurulum dosyası 81 MB, kurulu hali 290 MB.
- Edge, Chrome ya da Firefox gibi bir tarayıcı.
- Docker, Node ya da terminal (komut penceresi) gerekmez.
- Microsoft'un Visual C++ paketi. Bilgisayarda yoksa kurulum onu kendisi kurar ve bir kez yönetici izni sorar. Uygulama `%LOCALAPPDATA%\Programs\seowatcher` klasörüne kurulur.

## Adımlar

### İlk kurulum

1. GitHub sürüm sayfasından **seowatcher-setup.exe** dosyasını indirin. Sabit adres: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Dosyaya çift tıklayın.
3. Windows "Windows bilgisayarınızı korudu" derse **Daha fazla bilgi**, sonra **Yine de çalıştır** deyin. Dosya henüz imzalı olmadığı için Windows yayıncıyı tanımıyor. Uyarı normaldir.
4. İsterseniz dosyanın SHA-256 özetini (dosyanın parmak izi) sürüm sayfasındaki `SHA256SUMS.txt` ile karşılaştırın.
5. Hoş geldiniz sayfasında **Sonraki** deyin.
6. "Kim için kurulsun" sorusunda **Yalnızca ben** seçeneğini seçin. Önerilen budur ve yalnızca sizin hesabınıza kurar. **Tüm kullanıcılar** seçeneği yönetici izni ister.
7. Şu iki seçeneğe bakın: **Windows açılınca seowatcher'ı başlat** ve **Masaüstüne kısayol ekle**. İlki işaretli gelir. Uygulamanın arka planda başlamasını istemiyorsanız işareti kaldırın. Sonra **Sonraki** deyin.
8. **Kur** deyin.
9. Son sayfada **seowatcher'ı şimdi başlat** kutusu var. İşaretli bırakın ve **Bitti** deyin. Uygulama açılır.
10. Bekleyin. İlk açılış 20-30 saniye sürer. Bu sürede görev çubuğundaki simgenin yazısı sırayla "Anahtarlar hazırlanıyor", "Veritabanı güncelleniyor", "Sunucu başlatılıyor" olur. Simge görünmüyorsa görev çubuğundaki ^ okuna tıklayın. Hazır olunca tarayıcı kendiliğinden açılır. Uygulama Windows açılışında başlıyorsa tarayıcı açılmaz, "seowatcher hazır" baloncuğu çıkar.
11. Tarayıcıda `http://127.0.0.1:3001` açılır. Adresteki 127.0.0.1 bilgisayarınızın kendisidir, 3001 ise adres numarasıdır (port).

Sonraki adım: Google'a bağlanma kılavuzu.

### Görev çubuğu menüsü

Simgeye sağ tıklayın. Simge görünmüyorsa görev çubuğundaki ^ okuna tıklayın. Menü dört bölümdür. En üstte uygulamayı açma ve durum satırı, sonra güncelleme ile yeniden başlatma, sonra iki ayar, en altta sorun giderme maddeleri durur.

- **seowatcher'ı aç**: uygulamayı tarayıcıda açar. Simgeye çift tıklamak da aynı işi yapar. Uygulama henüz açılıyorsa "seowatcher açılıyor" baloncuğu çıkar, hazır olunca tarayıcı kendiliğinden açılır.
- Durum satırı: "Çalışıyor: http://127.0.0.1:3001/", "Veritabanı güncelleniyor" ya da hata yazısı. Tıklanmaz. Yazı uzunsa fareyi üstünde tutunca tamamı görünür.
- **Eksik Windows bileşenini kur**: yalnızca Visual C++ paketi eksikse görünür. Tıklayınca paketi kurar ve uygulamayı yeniden başlatır.
- **Güncelle**: menüde her zaman durur. Tıklayınca hemen GitHub'a bakar; yeni sürüm varsa indirip kurar, yoksa "Güncel" der. Bakarken madde "Kontrol ediliyor…", indirirken "Güncelleme indiriliyor: X.Y.Z (%45)" yazar ve tıklanmaz. Yeni sürüm daha önce bulunmuşsa madde "Güncelle: X.Y.Z sürümü hazır" yazar (sürüm numaraları örnektir).
- **Yeniden başlat**: uygulamayı kapatıp açar. Bir şey takılırsa ilk bunu deneyin.
- **Windows açılınca başlat**: işaretliyse uygulama bilgisayar açılınca arka planda başlar. Bilgisayardaki herkes için kurulumda bu ayarı yönetici açtıysa madde işaretli ve gri görünür, yalnızca yönetici kapatabilir.
- **Güncellemeleri kendiliğinden kur**: işaretliyse yeni sürüm bulununca kendisi kurar.
- **Kurulumu onar**: geçici dosyaları temizler, paketin eksiksiz olduğunu kontrol eder, uygulamayı yeniden açar. Onarırken madde "Onarılıyor…" yazar.
- **Tanı bilgisini kopyala**: Windows sürümünü, işlemciyi, Visual C++ sürümünü, motor denemesini, Windows olay günlüğündeki hatalı modülü, çökme dökümlerini ve son kayıt satırlarını panoya kopyalar. Bilgi birkaç saniyede hazırlanır, sonra "Kopyalandı" baloncuğu çıkar. Sorun bildirirken işinize yarar.
- **Sorunu bildir (GitHub)**: aynı bilgiyi panoya alır ve GitHub'da hazır doldurulmuş bir sorun kaydı açar. Ne yaparken olduğunu bir cümleyle ekleyip gönderin.
- **Günlükleri aç**: kayıt klasörünü açar. İçinde `launcher.log`, `server.log` ve `migrate.log` var.
- **Veri klasörünü aç**: veritabanının ve anahtarların klasörünü açar.
- Sürüm numarası: kurulu sürüm. Tıklanmaz.
- **Çıkış**: uygulamayı tamamen kapatır. Kapalıyken tarayıcıdaki sayfa çalışmaz.

Uygulamayı ikinci kez başlatırsanız (Başlat menüsünden ya da masaüstü kısayolundan) yeni kopya açılmaz. Açık olan uygulama tarayıcıda sayfayı açar; henüz hazır değilse hazır olunca açar.

Sunucu çalışırken kendiliğinden kapanırsa uygulama onu yeniden açar ve "seowatcher yeniden başlatılıyor" baloncuğunu gösterir. On dakikada üç kez kapanırsa yeniden açmayı bırakır ve durum satırında "Sunucu 10 dakikada üç kez kapandı" yazar. O zaman **Kurulumu onar** deyin.

### Güncelleme

Uygulama güncellemeyi kendisi yapar. Açıldıktan iki dakika sonra ve her gün bir kez GitHub'daki son sürüme bakar. Yeni sürüm varsa indirir, dosyanın parmak izini (SHA-256) sürüm sayfasındaki değerle karşılaştırır, sessizce kurar ve yeniden açılır. Bu sırada simgenin yazısı "Güncelleme indiriliyor" ve "Güncelleme kuruluyor" olur, kısa bir kurulum penceresi görünür. Uygulama yeniden açılınca "seowatcher X.Y.Z sürümüne güncellendi" baloncuğu çıkar; tıklarsanız yeniliklerin listesi açılır. **Ayarlar → Hakkında** bölümü de yeni sürümü haber verir ve sizi simgedeki **Güncelle** maddesine yönlendirir.

- Kendiliğinden kurulmasını istemiyorsanız menüden **Güncellemeleri kendiliğinden kur** işaretini kaldırın. O zaman yeni sürüm çıkınca bir kez baloncuk görürsünüz ve menüdeki madde "Güncelle: X.Y.Z sürümü hazır" olur. Kurmak için baloncuğa ya da maddeye tıklayın.
- İnternet yoksa ya da GitHub o an yanıt vermezse uygulama bir saat sonra yeniden dener. Kendiliğinden yapılan denemelerde aynı sürüm için yalnızca bir kez uyarır.
- İndirilen dosyanın parmak izi tutmazsa güncelleme kurulmaz, kurulu sürüm çalışmaya devam eder.
- Bilgisayardaki herkes için yapılmış kurulumda güncelleme yönetici izni ister. Bu yüzden orada kendiliğinden kurulmaz. Yeni sürüm çıkınca baloncuk görürsünüz; tıklayınca Windows yönetici izni sorar.
- Elle güncellemek için yeni kurulum dosyasını aynı adresten indirip çalıştırın. Sihirbaz açık uygulamayı kendisi kapatır, dosyaları değiştirir ve yeniden başlatır. Sihirbazdaki **Windows açılınca seowatcher'ı başlat** kutusu menüdeki güncel ayarınızı gösterir.

Verileriniz, Google bağlantınız ve ayarlarınız olduğu gibi kalır. Kendiliğinden yapılan güncelleme **Windows açılınca başlat** ayarına dokunmaz.

### Kurumsal dağıtım

Bir bilgisayardaki tüm kullanıcılar için kurmak ya da bir dağıtım aracıyla (Intune, GPO, PDQ) sessizce yüklemek isteyen BT ekipleri için:

- **Tüm kullanıcılar için**: kurulum dosyasını yönetici olarak çalıştırın ve sihirbazda "tüm kullanıcılar" seçeneğini seçin. Uygulama `C:\Program Files\seowatcher` altına kurulur (tek kullanıcı kurulumunda klasör `%LOCALAPPDATA%\Programs\seowatcher` olur); her kullanıcının verisi yine kendi `%LOCALAPPDATA%\seowatcher` klasöründe durur.
- **Sessiz kurulum**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (tek kullanıcı) ya da `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (yönetici, tüm kullanıcılar). Sessiz kurulum bitince uygulama kendiliğinden açılır.
- **Kurulum günlüğü**: her kurulum `%LOCALAPPDATA%\seowatcher\logs\setup.log` dosyasına yazılır. `/LOG="yol"` ile başka bir yer verebilirsiniz.
- **Sessiz kaldırma**: `unins000.exe /VERYSILENT` (kurulum klasöründe: `%LOCALAPPDATA%\Programs\seowatcher` ya da tüm kullanıcılar kurulumunda `C:\Program Files\seowatcher`).
- **Doğrulama**: her sürüm yayımlanmadan önce temiz bir Windows makinesinde kurulur, açılır, sağlık adresi yanıt verene kadar beklenir ve kaldırılır. Bu sınavı geçemeyen sürüm yayımlanmaz.

### Onarma

Bir şey takılırsa simgeye sağ tıklayıp **Kurulumu onar** deyin (simge görünmüyorsa görev çubuğundaki ^ okuna tıklayın). Uygulama geçici dosyaları temizler ve paketin eksiksiz olduğunu kontrol eder. Sonra açılırken veritabanı güncellemesini yeniden çalıştırır.

Paketten bir dosya silinmişse (örneğin antivirüs programı karantinaya aldıysa) uygulama kurulu sürümün kurulum dosyasını GitHub'dan indirir, parmak izini doğrular ve kendini yeniden kurar. Verilerinize dokunmaz. İnternet yoksa "Kurulum eksik" der ve sürüm sayfasını açar. O durumda kurulum dosyasını indirip çalıştırmanız yeter.

### Kaldırma

1. Windows **Ayarlar → Uygulamalar → Yüklü uygulamalar** listesinde **seowatcher**'ı bulun.
2. **Kaldır** deyin.

Kaldırma işlemi programı, başlat menüsü kısayolunu, **Windows açılınca başlat** kaydını (menüden açtıysanız onu da) ve indirilmiş güncelleme dosyalarını siler. Veri klasörüne dokunmaz; kaldırma penceresi de bunu söyler. Veritabanınızı, Google bağlantınızı ve raporlarınızı da silmek istiyorsanız veri klasörünü kendiniz silin.

### Veriler nerede, nasıl yedeklenir?

Her şey tek klasördedir: `%LOCALAPPDATA%\seowatcher`. Bu yolu Dosya Gezgini'nin adres çubuğuna yazarak açabilirsiniz. **Veri klasörünü aç** menü maddesi de oraya gider. İçinde şunlar var:

- `data`: veritabanı (projeler, Search Console arşivi, denetimler, raporlar).
- `instance-secret`: Google erişim anahtarlarını şifreleyen anahtar. Kaybederseniz Google bağlantılarını baştan kurarsınız.
- `mcp-token`: yapay zekâ asistanınızın uygulamaya bağlanırken kullandığı parola.
- `server.env`, `config.json`, `logs`.

Yedek almak için:

1. Uygulamayı **Çıkış** ile kapatın.
2. Klasörün tamamını kopyalayın.

Geri yüklemek için uygulamayı kapatın, klasörü yerine koyun, uygulamayı başlatın. Başka bilgisayara taşımak da aynı yoldur. `instance-secret` dosyasını da götürürseniz Google bağlantıları çalışmaya devam eder.

### Adres numarasını (portu) değiştirme

Uygulama 3001 numarasını kullanır. Başka bir program o numarayı kullanıyorsa 3002 ile 3010 arasındaki ilk boş numarayı yalnızca o açılış için seçer ve "3001 numarası dolu, 3002 kullanılıyor" baloncuğunu gösterir. Bu numarayı kaydetmez. 3001 boşalınca bir sonraki açılışta yine 3001'i kullanır, çünkü Google'daki yönlendirme adresleri bu numarayı yazar.

Belirli bir numara istiyorsanız:

1. Uygulamayı kapatın.
2. Veri klasöründeki `config.json` dosyasını Not Defteri ile açın.
3. İçine şunu yazın:

```json
{
  "port": 3005
}
```

4. Kaydedin ve uygulamayı başlatın. Dosyada başka satırlar da varsa (`autoUpdate` gibi) onları silmeyin, yalnızca `port` değerini değiştirin.

Numara değişince Google'daki iki yönlendirme adresini de yeni numarayla güncelleyin. Bu adresler Google'a bağlanma kılavuzunda anlatılıyor.

## Kontrol

- Fareyi görev çubuğu simgesinin üzerine getirince "seowatcher X.Y.Z: Çalışıyor: http://127.0.0.1:3001/" yazmalı. Baştaki sürüm numarası kurduğunuz sürümdür. 2.3.7 örnektir.
- Tarayıcıda `http://127.0.0.1:3001/api/health` adresi "status":"ok" ile başlayan bir yazı göstermeli.
- **Yardım** ekranındaki "Kurulumunuzun durumu" kartı "Her şey yolunda." demeli. Google'a bağlanmadan önce "Google girişi" satırı uyarı gösterir. Bu normaldir.

## Sık sorulanlar

**Neden tarayıcıda açılıyor?** Uygulama bilgisayarınızda küçük bir sunucu gibi çalışır. Ekranı tarayıcı gösterir.

**Bilgisayarı kapatınca ne olur?** Uygulama da kapanır. **Windows açılınca başlat** işaretliyse bir sonraki açılışta kendiliğinden başlar.

**Başka bilgisayardan açabilir miyim?** Hayır, bilerek böyle. Uygulama yalnızca 127.0.0.1 adresini dinler. İnternete açmak için önüne kendi kimlik doğrulamanızı koymanız gerekir.

**Docker sürümünden geçebilir miyim?** Evet, ama veri kendiliğinden taşınmaz. Projeleri yeniden oluşturur, Google'ı yeniden bağlarsınız. Search Console arşivi ilk açılışta yeniden dolar.

**Antivirüs uyarı verdi.** Dosya imzasız olduğu için bazı antivirüs programları uyarır. Dosyayı yalnızca GitHub sürüm sayfasından indirin ve SHA-256 özetini karşılaştırın.

## Sorun çıkarsa

Simge görünmüyorsa görev çubuğundaki ^ okuna tıklayın.

- **Simge "Hata: 3001 ve sonraki 9 adres numarası (port) dolu" diyor.** Başka program bu numaraları tutuyor. `config.json` dosyasına başka bir numara yazın.
- **Simge "Veritabanı güncellemesi başarısız" diyor.** **Günlükleri aç** deyin, `migrate.log` dosyasının son satırlarına bakın. Çoğunlukla disk dolmuştur ya da klasör salt okunurdur.
- **Simge "Sunucu beklenmedik şekilde kapandı" ya da "Sunucu 10 dakikada üç kez kapandı" diyor.** `server.log` dosyasının son satırları sebebi yazar. **Yeniden başlat** deneyin, olmazsa **Kurulumu onar** deyin. Düzelmezse **Sorunu bildir (GitHub)** deyin.
- **Simge "Veritabanı güncellemesi 15 dakikada bitmedi" diyor.** Veritabanı dosyası başka bir program tarafından kilitlenmiş olabilir (yedekleme ya da eşitleme programı). O programı durdurup **Yeniden başlat** deyin.
- **Tarayıcı açılmadı.** Simgeye çift tıklayın ya da adresi elle yazın: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
