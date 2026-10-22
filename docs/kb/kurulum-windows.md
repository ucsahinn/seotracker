---
title: Windows'a kurulum
description: Tek kurulum dosyasıyla kurma, ilk açılış, güncelleme, kaldırma, yedekleme ve port değiştirme. Docker, Node ya da terminal gerekmez.
kind: nasil-yapilir
updated: 2026-10-22
---

Bu sayfanın sonunda uygulama bilgisayarınızda kurulu, görev çubuğunda simgesi var ve tarayıcıda açık olacak. Kurulum iki dakika sürer; Google bağlantısı ayrı bir kılavuzdur. Kurulum dosyası uygulamayı yalnızca sizin kullanıcı hesabınıza kurar, yönetici şifresi istemez ve bilgisayarınızın geri kalanına dokunmaz.

## Gerekenler

- Windows 10 ya da 11, 64 bit.
- Yaklaşık 300 MB boş disk alanı (kurulum dosyası 61 MB, kurulu hali 266 MB).
- Bir internet tarayıcısı (Edge, Chrome, Firefox fark etmez).
- Docker, Node, terminal ya da yönetici hakkı gerekmez.

## Adımlar

### İlk kurulum

1. GitHub'daki sürüm sayfasından **seowatcher-setup.exe** dosyasını indirin. Sabit adres: github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe
2. Dosyayı çalıştırın. Windows "Windows bilgisayarınızı korudu" uyarısı verirse **Daha fazla bilgi**, sonra **Yine de çalıştır** deyin. Dosya henüz kod imzalı olmadığı için bu uyarı normaldir; isterseniz dosyanın SHA-256 özetini sürüm sayfasındaki SHA256SUMS.txt ile karşılaştırın.
3. Kurulum sihirbazı dil olarak Türkçe'yi seçer. İki seçenek sorar: **Windows açılınca seowatcher'ı başlat** (işaretli gelir; açılışta arka planda başlasın istemiyorsanız kaldırın) ve **Masaüstüne kısayol ekle**.
4. **Kur** deyin. Dosyalar kullanıcı klasörünüze (Programs altına) kopyalanır. Son ekranda **seowatcher'ı şimdi başlat** işaretlidir; **Son** deyince uygulama açılır.
5. İlk açılış 20-30 saniye sürer: görev çubuğunun sağındaki simgenin açıklaması sırayla "Anahtarlar hazırlanıyor", "Veritabanı güncelleniyor", "Sunucu başlatılıyor" olur. Bitince tarayıcınızda **http://127.0.0.1:3001** kendiliğinden açılır.
6. Açılan sayfa uygulamanın kendisidir. Sonraki adım Google bağlantısı: Google bağlantısı kılavuzuna geçin.

### Görev çubuğu menüsü

Simgeye sağ tıklayınca şu menü açılır:

- **seowatcher'ı aç**: tarayıcıda uygulamayı açar. Simgeye çift tıklamak da aynı işi yapar.
- Durum satırı: "Çalışıyor: http://127.0.0.1:3001/" ya da bir hata mesajı.
- **Yeniden başlat**: sunucuyu kapatıp yeniden açar; bir şey takıldığında ilk deneyeceğiniz şey.
- **Günlükleri aç**: günlük klasörünü açar (server.log ve migrate.log).
- **Veri klasörünü aç**: veritabanının ve anahtarların durduğu klasörü açar.
- **Windows ile başlat**: işaretliyse oturum açıldığında uygulama arka planda başlar ve tarayıcı açmaz.
- Sürüm numarası.
- **Çıkış**: sunucuyu ve tüm alt süreçlerini kapatır. Uygulama kapalıyken tarayıcıdaki sayfa çalışmaz.

Uygulamayı ikinci kez başlatırsanız yeni bir kopya açılmaz; yalnızca tarayıcıda sayfa açılır.

### Güncelleme

1. Yeni sürümü aynı adresten indirin. Uygulama içindeki **Ayarlar → Hakkında** bölümü yeni sürüm çıktığında "X yayımlandı." diye haber verir.
2. Kurulum dosyasını çalıştırın. Sihirbaz çalışan uygulamayı kendisi kapatır, dosyaları değiştirir ve yeniden başlatır.
3. Veriniz, Google bağlantınız ve ayarlarınız olduğu gibi kalır; hepsi kurulum klasörünün dışında, veri klasöründe durur.

### Kaldırma

1. Windows **Ayarlar → Uygulamalar → Yüklü uygulamalar** listesinde **seowatcher**'ı bulun ve **Kaldır** deyin.
2. Kaldırıcı önce çalışan uygulamayı kapatır, sonra program dosyalarını, başlat menüsü kısayolunu ve "Windows ile başlat" kaydını siler.
3. Veri klasörüne dokunmaz. Veritabanınızı, Google bağlantınızı ve raporlarınızı silmek istiyorsanız veri klasörünü kendiniz silin (aşağıda).

### Yedekleme ve geri yükleme

Her şey tek klasördedir: **%LOCALAPPDATA%\seowatcher**. Dosya Gezgini'nin adres çubuğuna bu adresi yazınca açılır; görev çubuğu menüsündeki **Veri klasörünü aç** da oraya gider. İçinde:

- \*\*data\*\*: veritabanı (projeler, Search Console arşivi, denetimler, raporlar) ve diğer uygulama durumu.
- **instance-secret**: Google erişim anahtarlarını şifreleyen anahtar. Bu dosya kaybolursa Google bağlantılarını yeniden kurmanız gerekir.
- **mcp-token**: yapay zekâ asistanınızın uygulamaya bağlanırken kullandığı parola.
- **server.env**, **config.json**, \*\*logs\*\*.

Yedek almak için uygulamayı **Çıkış** ile kapatın ve klasörün tamamını kopyalayın. Geri yüklemek için uygulamayı kapatın, klasörü yerine koyun, uygulamayı başlatın. Başka bir bilgisayara taşırken de aynı yöntem çalışır; "instance-secret" dosyasını birlikte taşıdığınız sürece Google bağlantıları çalışmaya devam eder.

### Portu değiştirme

Uygulama 3001 portunu kullanır. Başka bir program o portu tutuyorsa uygulama kendiliğinden 3002'den 3010'a kadar boş ilk portu seçer ve bunu **config.json** dosyasına yazar; tarayıcıda açılan adres de ona göre değişir. Belirli bir port istiyorsanız uygulamayı kapatın, veri klasöründeki config.json dosyasını Not Defteri ile açın ve şöyle yazın:

```json
{
  "port": 3005
}
```

Kaydedip uygulamayı başlatın. Port değişince Google OAuth yönlendirme adreslerini de (Google bağlantısı kılavuzundaki iki adres) yeni portla güncellemeniz gerekir.

## Kontrol

- Görev çubuğu simgesinin üzerine gelince "seowatcher: Çalışıyor: http://127.0.0.1:3001/" yazmalı.
- Tarayıcıda http://127.0.0.1:3001/api/health adresi "status":"ok" ile başlayan bir metin göstermeli.
- Uygulama içinde **Yardım** ekranındaki "Kurulumunuzun durumu" kartı "Her şey yolunda." demeli; Google bağlanmadan önce "Google girişi" satırı dikkat ister, bu normaldir.

## Sık sorulanlar

**Uygulama neden tarayıcıda açılıyor, kendi penceresi yok mu?** Uygulama bilgisayarınızda küçük bir sunucu olarak çalışır; arayüzü tarayıcıdır. Bu sayede telefonunuzdan değil ama aynı bilgisayardaki her tarayıcıdan açabilirsiniz.

**Bilgisayarı kapatınca ne olur?** Uygulama da kapanır. "Windows ile başlat" işaretliyse bir sonraki açılışta arka planda başlar.

**Başka bilgisayardan erişebilir miyim?** Hayır, bilerek. Uygulama yalnızca 127.0.0.1 adresini dinler; internete ya da ağa açmak için önüne kendi kimlik doğrulamanızı koymanız gerekir ve bu paketin konusu değildir.

**Docker sürümünden bu sürüme geçebilir miyim?** Evet ama veri otomatik taşınmaz. Projelerinizi yeniden oluşturup Google'ı yeniden bağlamanız gerekir; Search Console arşivi ilk açılışta yeniden dolar.

**Antivirüs uyarı verdi.** Dosya imzasız olduğu için bazı antivirüsler tanımadıkları her yeni yürütülebilir dosyaya uyarı verir. Dosyayı yalnızca GitHub sürüm sayfasından indirin ve SHA-256 özetini karşılaştırın.

## Sorun çıkarsa

- **Simge "Hata: Port 3001 ve sonraki 9 port dolu" diyor.** Bir başka program bu portları tutuyor. config.json'a başka bir port yazın.
- **Simge "Veritabanı güncellemesi başarısız" diyor.** **Günlükleri aç** deyip migrate.log dosyasının son satırlarına bakın; çoğu zaman disk dolu ya da klasör salt okunurdur.
- **Simge "Sunucu beklenmedik şekilde kapandı" diyor.** server.log'un son satırları sebebi yazar. **Yeniden başlat** deneyin; düzelmezse günlüğü GitHub'da bir sorun kaydıyla paylaşın.
- **Tarayıcı açılmadı.** Simgeye çift tıklayın ya da adresi elle yazın: http://127.0.0.1:3001
- **"Windows bilgisayarınızı korudu" ekranından geçemiyorum.** Ekranda **Daha fazla bilgi** yazısına tıklayınca **Yine de çalıştır** düğmesi belirir.

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
