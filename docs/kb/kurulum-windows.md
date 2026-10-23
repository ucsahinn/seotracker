---
title: Windows'a kurulum
description: Tek dosyayla Windows'a kurun. İlk açılış, güncelleme, kaldırma, yedek alma ve adres numarası değiştirme. Docker ya da terminal gerekmez.
kind: nasil-yapilir
updated: 2026-10-22
---

Bu sayfanın sonunda uygulama bilgisayarınızda kurulu ve tarayıcıda açık olacak. Kurulum iki dakika sürer. Yalnızca sizin kullanıcı hesabınıza kurulur, yönetici izni gerekmez (yalnızca Visual C++ bileşeni eksikse bir kez sorulur).

## Gerekenler

- Windows 10 ya da 11 (64 bit).
- Yaklaşık 350 MB boş yer. Kurulum dosyası 81 MB, kurulu hali 290 MB.
- Edge, Chrome ya da Firefox gibi bir tarayıcı.
- Docker, Node ya da terminal (komut penceresi) gerekmez. Yönetici hakkı da gerekmez; yalnızca Visual C++ bileşeni eksikse bir kez sorulur.
- Uygulamanın motoru Microsoft'un Visual C++ paketine ihtiyaç duyar. Bilgisayarda yoksa kurulum bunu kendisi kurar ve bu sırada bir kez yönetici izni sorar. Yalnızca sizin hesabınıza kurulan uygulama `%LOCALAPPDATA%\Programs\seowatcher` klasörüne gider.

## Adımlar

### İlk kurulum

1. GitHub sürüm sayfasından **seowatcher-setup.exe** dosyasını indirin. Sabit adres: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Dosyaya çift tıklayın.
3. Windows "Windows bilgisayarınızı korudu" derse **Daha fazla bilgi**, sonra **Yine de çalıştır** deyin. Dosya henüz imzalı değil, Windows yayıncıyı tanımıyor. Bu uyarı normaldir.
4. İsterseniz dosyanın SHA-256 özetini (dosyanın parmak izi) sürüm sayfasındaki `SHA256SUMS.txt` ile karşılaştırın.
5. Hoş geldiniz sayfasında **Sonraki** deyin.
6. "Kim için kurulsun" sorusunda **Yalnızca ben** seçeneğini seçin. Önerilen budur: kurulum yalnızca sizin hesabınıza yapılır. **Tüm kullanıcılar** seçeneği yönetici izni ister.
7. İki seçeneğe bakın: **Windows açılınca seowatcher'ı başlat** ve **Masaüstüne kısayol ekle**. İlki işaretli gelir. Arka planda başlamasını istemiyorsanız işareti kaldırın. Sonra **Sonraki** deyin.
8. **Kur** deyin.
9. Son sayfada **seowatcher'ı şimdi başlat** kutusu var. İşaretli bırakın ve **Bitti** deyin. Uygulama açılır.
10. Bekleyin. İlk açılış 20-30 saniye sürer. Görev çubuğundaki simgenin yazısı sırayla "Anahtarlar hazırlanıyor", "Veritabanı güncelleniyor", "Sunucu başlatılıyor" olur. Simge görünmüyorsa görev çubuğundaki ^ okuna tıklayın. Hazır olunca bir "seowatcher hazır" baloncuğu çıkar (ilk açılışta görürsünüz).
11. Tarayıcıda `http://127.0.0.1:3001` kendiliğinden açılır. Bu, bilgisayarınızın kendi adresi (127.0.0.1) ve adres numarasıdır (port: 3001).

Sonraki adım Google bağlantısı kılavuzudur.

### Görev çubuğu menüsü

Simgeye sağ tıklayın. Simge görünmüyorsa görev çubuğundaki ^ okuna tıklayın. Menüde şunlar var:

- **seowatcher'ı aç**: uygulamayı tarayıcıda açar. Simgeye çift tıklamak da aynı işi yapar.
- **Yeniden başlat**: uygulamayı kapatıp açar. Bir şey takılırsa ilk bunu deneyin.
- **Günlükleri aç**: kayıt klasörünü açar. İçinde `launcher.log`, `server.log` ve `migrate.log` var.
- **Tanı bilgisini kopyala**: Windows sürümü, işlemci, Visual C++ sürümü, motor denemesi, Windows olay günlüğündeki hatalı modül, çökme dökümleri ve son kayıt satırlarını panoya kopyalar.
- **Sorunu bildir (GitHub)**: aynı bilgiyi panoya alır ve GitHub'da hazır doldurulmuş bir sorun kaydı açar. Bir cümleyle ne yaptığınızı ekleyip gönderin.
- **Eksik Windows bileşenini kur**: yalnızca Visual C++ paketi eksikse görünür. Tıklayınca paketi kurar ve uygulamayı yeniden başlatır.
- **Kurulumu onar**: geçici dosyaları temizler, paketi kontrol eder, uygulamayı yeniden açar.
- **Güncelle**: yalnızca yeni sürüm varsa görünür. Hazır olduğunda tam yazısı "Güncelle: 2.3.8 sürümü hazır" biçimindedir (sürüm numarası örnektir).
- **Güncellemeleri kendiliğinden kur**: işaretliyse yeni sürüm bulununca kendisi kurar.
- **Veri klasörünü aç**: veritabanının ve anahtarların klasörünü açar.
- **Windows ile başlat**: işaretliyse uygulama bilgisayar açılınca arka planda başlar.
- **Çıkış**: uygulamayı tamamen kapatır. Kapalıyken tarayıcıdaki sayfa çalışmaz.

Menüde ayrıca bir durum satırı ("Çalışıyor: http://127.0.0.1:3001/" ya da hata yazısı) ve sürüm numarası görünür.

Uygulamayı ikinci kez başlatırsanız yeni kopya açılmaz. Yalnızca tarayıcıda sayfa açılır.

### Güncelleme

Uygulama güncellemeyi kendisi yapar. Açılıştan iki dakika sonra ve her gün bir kez GitHub'daki son sürüme bakar. Yeni sürüm varsa indirir, dosyanın parmak izini (SHA-256) sürüm sayfasındaki değerle karşılaştırır, sonra sessizce kurar ve yeniden açılır. Simgenin yazısı bu sırada "Güncelleme indiriliyor" ve "Güncelleme kuruluyor" olur. Uygulama içindeki **Ayarlar → Hakkında** bölümü de yeni sürümü haber verir ve sizi simgedeki **Güncelle**'ye yönlendirir.

- Kendiliğinden kurulmasını istemiyorsanız menüden **Güncellemeleri kendiliğinden kur** işaretini kaldırın. O zaman yeni sürüm çıkınca bir baloncuk görürsünüz ve menüde **Güncelle** maddesi belirir.
- Elle güncellemek için yeni kurulum dosyasını aynı adresten indirip çalıştırın. Sihirbaz açık uygulamayı kendisi kapatır, dosyaları değiştirir ve yeniden başlatır.

Verileriniz, Google bağlantınız ve ayarlarınız olduğu gibi kalır.

### Kurumsal dağıtım

Bir bilgisayardaki tüm kullanıcılar için kurmak ya da bir dağıtım aracıyla (Intune, GPO, PDQ) sessizce yüklemek isteyen BT ekipleri için:

- **Tüm kullanıcılar için**: kurulum dosyasını yönetici olarak çalıştırın ve sihirbazda "tüm kullanıcılar" seçeneğini seçin. Uygulama `C:\Program Files\seowatcher` altına kurulur (tek kullanıcı kurulumunda klasör `%LOCALAPPDATA%\Programs\seowatcher` olur); her kullanıcının verisi yine kendi `%LOCALAPPDATA%\seowatcher` klasöründe durur.
- **Sessiz kurulum**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (tek kullanıcı) ya da `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (yönetici, tüm kullanıcılar). Sessiz kurulum bitince uygulama kendiliğinden açılır.
- **Kurulum günlüğü**: her kurulum `%LOCALAPPDATA%\seowatcher\logs\setup.log` dosyasına yazılır; `/LOG="yol"` ile başka bir yer verebilirsiniz.
- **Sessiz kaldırma**: `unins000.exe /VERYSILENT` (kurulum klasöründe: `%LOCALAPPDATA%\Programs\seowatcher` ya da tüm kullanıcılar kurulumunda `C:\Program Files\seowatcher`).
- **Doğrulama**: her sürüm yayımlanmadan önce temiz bir Windows makinesinde kurulur, açılır, sağlık adresi yanıt verene kadar beklenir ve kaldırılır; bu sınav geçmeden sürüm yayımlanmaz.

### Onarma

Bir şey takılırsa simgeye sağ tıklayıp **Kurulumu onar** deyin (simge görünmüyorsa görev çubuğundaki ^ okuna tıklayın). Uygulama geçici dosyaları temizler, paketin eksiksiz olduğunu kontrol eder, veritabanını yeniden kontrol eder ve açılır. Bir dosya eksikse söyler ve sürüm sayfasını açar; kurulum dosyasını yeniden çalıştırmanız yeter.

### Kaldırma

1. Windows **Ayarlar → Uygulamalar → Yüklü uygulamalar** listesinde **seowatcher**'ı bulun.
2. **Kaldır** deyin.

Kaldırıcı programı, başlat menüsü kısayolunu ve "Windows ile başlat" kaydını siler. Veri klasörüne dokunmaz. Veritabanınızı, Google bağlantınızı ve raporlarınızı da silmek istiyorsanız veri klasörünü kendiniz silin.

### Veriler nerede, nasıl yedeklenir?

Her şey tek klasördedir: `%LOCALAPPDATA%\seowatcher`. Bu yazıyı Dosya Gezgini'nin adres çubuğuna yazın. **Veri klasörünü aç** menüsü de oraya gider. İçinde şunlar var:

- `data`: veritabanı (projeler, Search Console arşivi, denetimler, raporlar).
- `instance-secret`: Google erişim anahtarlarını şifreleyen anahtar. Kaybolursa Google bağlantılarını baştan kurarsınız.
- `mcp-token`: yapay zekâ asistanınızın uygulamaya bağlanırken kullandığı parola.
- `server.env`, `config.json`, `logs`.

Yedek almak için:

1. Uygulamayı **Çıkış** ile kapatın.
2. Klasörün tamamını kopyalayın.

Geri yüklemek için uygulamayı kapatın, klasörü yerine koyun, uygulamayı başlatın. Başka bilgisayara taşımak da aynıdır. `instance-secret` dosyasını da götürürseniz Google bağlantıları çalışmaya devam eder.

### Adres numarasını (portu) değiştirme

Uygulama 3001 numarasını kullanır. Başka program onu tutuyorsa uygulama 3002 ile 3010 arasında boş ilk numarayı seçer. Seçtiğini `config.json` dosyasına yazar.

Belirli bir numara istiyorsanız:

1. Uygulamayı kapatın.
2. Veri klasöründeki `config.json` dosyasını Not Defteri ile açın.
3. İçine şunu yazın:

```json
{
  "port": 3005
}
```

4. Kaydedin ve uygulamayı başlatın.

Numara değişince Google'daki iki yönlendirme adresini de yeni numarayla güncelleyin. Bu adresler Google bağlantısı kılavuzunda anlatılıyor.

## Kontrol

- Görev çubuğu simgesinin üzerine gelince "seowatcher 2.3.7: Çalışıyor: http://127.0.0.1:3001/" yazmalı. Baştaki sürüm numarası sizin kurduğunuz sürümdür, 2.3.7 örnektir.
- Tarayıcıda `http://127.0.0.1:3001/api/health` adresi "status":"ok" ile başlayan bir yazı göstermeli.
- **Yardım** ekranındaki "Kurulumunuzun durumu" kartı "Her şey yolunda." demeli. Google bağlanmadan önce "Google girişi" satırı dikkat ister. Bu normaldir.

## Sık sorulanlar

**Neden tarayıcıda açılıyor?** Uygulama bilgisayarınızda küçük bir sunucu gibi çalışır. Ekranı tarayıcıdır.

**Bilgisayarı kapatınca ne olur?** Uygulama da kapanır. "Windows ile başlat" işaretliyse bir sonraki açılışta kendiliğinden başlar.

**Başka bilgisayardan açabilir miyim?** Hayır, bilerek böyle. Uygulama yalnızca 127.0.0.1 adresini dinler. İnternete açmak için önüne kendi kimlik doğrulamanızı koymanız gerekir.

**Docker sürümünden geçebilir miyim?** Evet, ama veri kendiliğinden taşınmaz. Projeleri yeniden oluşturur, Google'ı yeniden bağlarsınız. Search Console arşivi ilk açılışta yeniden dolar.

**Antivirüs uyarı verdi.** Dosya imzasız olduğu için bazı antivirüsler uyarır. Dosyayı yalnızca GitHub sürüm sayfasından indirin ve SHA-256 özetini karşılaştırın.

## Sorun çıkarsa

Simge görünmüyorsa görev çubuğundaki ^ okuna tıklayın.

- **Simge "Hata: Port 3001 ve sonraki 9 port dolu" diyor.** Başka program bu numaraları tutuyor. `config.json` dosyasına başka bir numara yazın.
- **Simge "Veritabanı güncellemesi başarısız" diyor.** **Günlükleri aç** deyin, `migrate.log` dosyasının son satırlarına bakın. Çoğu zaman disk doludur ya da klasör salt okunurdur.
- **Simge "Sunucu beklenmedik şekilde kapandı" diyor.** `server.log` dosyasının son satırları sebebi yazar. **Yeniden başlat** deneyin. Düzelmezse günlüğü GitHub'da bir sorun kaydıyla paylaşın.
- **Tarayıcı açılmadı.** Simgeye çift tıklayın ya da adresi elle yazın: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
