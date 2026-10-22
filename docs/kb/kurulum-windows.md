---
title: Windows'a kurulum
description: Tek dosyayla Windows'a kurun. İlk açılış, güncelleme, kaldırma, yedek alma ve adres numarası değiştirme. Docker ya da terminal gerekmez.
kind: nasil-yapilir
updated: 2026-10-22
---

Bu sayfanın sonunda uygulama bilgisayarınızda kurulu ve tarayıcıda açık olacak. Kurulum iki dakika sürer. Yalnızca sizin kullanıcı hesabınıza kurulur, yönetici şifresi istemez.

## Gerekenler

- Windows 10 ya da 11 (64 bit).
- Yaklaşık 350 MB boş yer. Kurulum dosyası 81 MB, kurulu hali 290 MB.
- Edge, Chrome ya da Firefox gibi bir tarayıcı.
- Docker, Node, terminal (komut penceresi) ya da yönetici hakkı gerekmez.
- Uygulamanın motoru Microsoft'un Visual C++ paketine ihtiyaç duyar. Bilgisayarda yoksa kurulum bunu kendisi kurar ve bir kez yönetici izni sorar.

## Adımlar

### İlk kurulum

1. GitHub sürüm sayfasından **seowatcher-setup.exe** dosyasını indirin. Sabit adres: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Dosyaya çift tıklayın.
3. Windows "Windows bilgisayarınızı korudu" derse **Daha fazla bilgi**, sonra **Yine de çalıştır** deyin. Dosya henüz imzalı değil, Windows yayıncıyı tanımıyor. Bu uyarı normaldir.
4. İsterseniz dosyanın SHA-256 özetini (dosyanın parmak izi) sürüm sayfasındaki `SHA256SUMS.txt` ile karşılaştırın.
5. Sihirbazdaki iki seçeneğe bakın: **Windows açılınca seowatcher'ı başlat** ve **Masaüstüne kısayol ekle**. İlki işaretli gelir. Arka planda başlamasını istemiyorsanız işareti kaldırın.
6. **Kur** deyin, sonra son ekranda **Son** deyin. Uygulama açılır.
7. Bekleyin. İlk açılış 20-30 saniye sürer. Görev çubuğundaki simgenin yazısı sırayla "Anahtarlar hazırlanıyor", "Veritabanı güncelleniyor", "Sunucu başlatılıyor" olur.
8. Tarayıcıda `http://127.0.0.1:3001` kendiliğinden açılır. Bu, bilgisayarınızın kendi adresi (127.0.0.1) ve adres numarasıdır (port: 3001).

Sonraki adım Google bağlantısı kılavuzudur.

### Görev çubuğu menüsü

Simgeye sağ tıklayın. Menüde şunlar var:

- **seowatcher'ı aç**: uygulamayı tarayıcıda açar. Simgeye çift tıklamak da aynı işi yapar.
- **Yeniden başlat**: uygulamayı kapatıp açar. Bir şey takılırsa ilk bunu deneyin.
- **Günlükleri aç**: kayıt klasörünü açar. İçinde `launcher.log`, `server.log` ve `migrate.log` var.
- **Tanı bilgisini kopyala**: Windows sürümü, işlemci ve son kayıt satırlarını panoya kopyalar. Sorun bildirirken yapıştırın.
- **Eksik Windows bileşenini kur**: yalnızca Visual C++ paketi eksikse görünür. Tıklayınca paketi kurar ve uygulamayı yeniden başlatır.
- **Veri klasörünü aç**: veritabanının ve anahtarların klasörünü açar.
- **Windows ile başlat**: işaretliyse uygulama bilgisayar açılınca arka planda başlar.
- **Çıkış**: uygulamayı tamamen kapatır. Kapalıyken tarayıcıdaki sayfa çalışmaz.

Menüde ayrıca bir durum satırı ("Çalışıyor: http://127.0.0.1:3001/" ya da hata yazısı) ve sürüm numarası görünür.

Uygulamayı ikinci kez başlatırsanız yeni kopya açılmaz. Yalnızca tarayıcıda sayfa açılır.

### Güncelleme

1. Yeni sürümü aynı adresten indirin. Yeni sürüm çıkınca **Ayarlar → Hakkında** bölümü "X yayımlandı." diye haber verir.
2. Kurulum dosyasını çalıştırın. Sihirbaz açık uygulamayı kendisi kapatır, dosyaları değiştirir ve yeniden başlatır.

Verileriniz, Google bağlantınız ve ayarlarınız olduğu gibi kalır.

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

- Görev çubuğu simgesinin üzerine gelince "seowatcher: Çalışıyor: http://127.0.0.1:3001/" yazmalı.
- Tarayıcıda `http://127.0.0.1:3001/api/health` adresi "status":"ok" ile başlayan bir yazı göstermeli.
- **Yardım** ekranındaki "Kurulumunuzun durumu" kartı "Her şey yolunda." demeli. Google bağlanmadan önce "Google girişi" satırı dikkat ister. Bu normaldir.

## Sık sorulanlar

**Neden tarayıcıda açılıyor?** Uygulama bilgisayarınızda küçük bir sunucu gibi çalışır. Ekranı tarayıcıdır.

**Bilgisayarı kapatınca ne olur?** Uygulama da kapanır. "Windows ile başlat" işaretliyse bir sonraki açılışta kendiliğinden başlar.

**Başka bilgisayardan açabilir miyim?** Hayır, bilerek böyle. Uygulama yalnızca 127.0.0.1 adresini dinler. İnternete açmak için önüne kendi kimlik doğrulamanızı koymanız gerekir.

**Docker sürümünden geçebilir miyim?** Evet, ama veri kendiliğinden taşınmaz. Projeleri yeniden oluşturur, Google'ı yeniden bağlarsınız. Search Console arşivi ilk açılışta yeniden dolar.

**Antivirüs uyarı verdi.** Dosya imzasız olduğu için bazı antivirüsler uyarır. Dosyayı yalnızca GitHub sürüm sayfasından indirin ve SHA-256 özetini karşılaştırın.

## Sorun çıkarsa

- **Simge "Hata: Port 3001 ve sonraki 9 port dolu" diyor.** Başka program bu numaraları tutuyor. `config.json` dosyasına başka bir numara yazın.
- **Simge "Veritabanı güncellemesi başarısız" diyor.** **Günlükleri aç** deyin, `migrate.log` dosyasının son satırlarına bakın. Çoğu zaman disk doludur ya da klasör salt okunurdur.
- **Simge "Sunucu beklenmedik şekilde kapandı" diyor.** `server.log` dosyasının son satırları sebebi yazar. **Yeniden başlat** deneyin. Düzelmezse günlüğü GitHub'da bir sorun kaydıyla paylaşın.
- **Tarayıcı açılmadı.** Simgeye çift tıklayın ya da adresi elle yazın: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
