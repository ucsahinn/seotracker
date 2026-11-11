# seowatcher için Windows paketi

Son kullanıcının Docker, Node ya da terminal görmeden tek `.exe` ile kurduğu
sürüm. Mevcut Docker kurulumu (`compose.yaml`) ve geliştirici kurulumu
olduğu gibi kalır; bu paket onların yanına eklenir.

## Nasıl çalışır

Derlenmiş worker (`vite build` çıktısı) Docker'da olduğu gibi workerd içinde
çalışır; farkı, konteyner yerine `wrangler dev` ile başlatılmasıdır. Paket
dört parçadan oluşur:

| Parça                      | Ne                                                                                         | Boyut   |
| -------------------------- | ------------------------------------------------------------------------------------------ | ------- |
| `node\node.exe`            | Node.js 22 çalışma zamanı (nodejs.org'dan, SHA-256 doğrulamalı)                            | ~83 MB  |
| `redist\VC_redist.x64.exe` | Microsoft Visual C++ 2015-2022 çalışma zamanı (workerd bunu ister; yoksa kurulum kurar)    | ~25 MB  |
| `app\node_modules\`        | yalnızca `wrangler` ve bağımlılıkları (miniflare, workerd)                                 | ~160 MB |
| `app\dist\`                | derlenmiş ana worker, istemci ve denetim worker'ı + migrasyonlar                           | ~15 MB  |
| `seowatcher.exe`           | tepsi uygulaması: anahtar üretir, migrasyon çalıştırır, sunucuyu başlatır, tarayıcıyı açar | 25 KB   |

Paket iki kanaldan dağıtılır ve ikisi de aynı dosyalardan üretilir: Microsoft
Store paketi (`seowatcher-<sürüm>.msix`, birincil; Store imzalar) ve Inno Setup
kurulum dosyası (`seowatcher-setup-<sürüm>.exe`, Store'un kapalı olduğu
bilgisayarlar için). Neden ve nasıl: `specs/0014-windows-store-package.md`,
`docs/CODE_SIGNING.md`.

Veri `%LOCALAPPDATA%\seowatcher` altında durur: `data\` (D1, KV, R2, Durable
Object durumu), `instance-secret` (Google token'larını şifreleyen anahtar; bir
kez üretilir, asla değiştirilmez), `mcp-token`, `server.env`, `config.json`
(`port`, `autoUpdate`, `lastVersion`), `updates\` (indirilen kurulum
dosyaları) ve `logs\`. Kaldırma bu klasöre dokunmaz (yalnızca `updates\`
silinir).

Store paketinde `seowatcher.exe` aynı dosyadır; farkları `launcher\StorePackage.cs`
tutar. Veri `%LOCALAPPDATA%\Packages\<paket ailesi adı>\LocalCache\seowatcher`
altındadır (paket kaldırılınca Windows bu klasörü siler; kurulum dosyasından
gelen veri ilk açılışta buraya kopyalanır). Başlatıcı kendini güncellemez ve
onarmaz (Güncelle, Güncellemeleri kendiliğinden kur ve Kurulumu onar menüde
görünmez), "Windows açılınca başlat" Run değeri yerine Windows başlangıç
görevidir ve `redist\VC_redist.x64.exe` pakete girmez.

Tepsi menüsü dört bölümdür: aç ve durum; Güncelle, Yeniden başlat; iki ayar
(Windows açılınca başlat, Güncellemeleri kendiliğinden kur); sorun giderme
(Kurulumu onar, Tanı bilgisini kopyala, Sorunu bildir, Günlükleri aç, Veri
klasörünü aç); sürüm ve Çıkış. Etiketler uygulamanın kendi metinlerinde
(`src/client/features/support`, `UpdateSection.tsx`) birebir geçer; birini
değiştirirseniz orayı da değiştirin.

Ayarlar → Windows ekranındaki başlangıç ve otomatik güncelleme anahtarları
tepsiyle aynı kalıcı tercihleri değiştirir. Yönetici tarafından etkinleştirilen
başlangıç kaydı ve tüm kullanıcılar için güncelleme kısıtlaması ekranda açıklanır.
Eski başlatıcılarda seçenekler devre dışıdır ve paket güncelleme yönergesi görünür.
Docker ve geliştirici kurulumu Windows tercihi kaydetmez.

Worker, `WindowsSettingsBridge.cs` üzerinden yalnızca IPv4 loopback'e bağlanır.
Rastgele port ve her başlatmada üretilen yetki değeri `server.env` içinde sunucuya
aktarılır; tarayıcıya dönmez. Köprü browser origin'lerini ve tanımlanmamış
işlemleri reddeder. Başlatıcı kapandığında köprü de kapanır.

Bu bağlantıyı kullanıcı ayarlarına veya kayıt defterine dokunmadan doğrulamak için
`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/test-windows-settings.ps1`
çalıştırın. Test, geçici bir native bileşende bellek içi tercihler kullanır;
TypeScript tüketicisinin okuma ve aç/kapat işlemlerini de kontrol eder.

Davranış özeti:

- Sunucu ve alt süreçleri bir Windows job object içinde çalışır (migrasyon
  dahil): tepsi uygulaması nasıl kapanırsa kapansın node ve workerd onunla
  birlikte kapanır. Durdurma, süreçler gerçekten bitene kadar bekler; `--quit`
  döndüğünde port ve dosyalar boştur.
- Her başlatmanın bir nesil numarası vardır: başlarken Yeniden başlat ya da
  Kurulumu onar ikinci bir sunucu açamaz, eski başlatma hata bildiremez.
- Hazır olduktan sonra kendiliğinden kapanan sunucu 10 dakikada en çok üç kez
  yeniden başlatılır.
- Port doluysa +9'a kadar ilk boş port yalnızca o çalıştırma için seçilir,
  `config.json`'a yazılmaz.
- İkinci başlatma çalışan kopyaya `Local\seowatcher-open` olayıyla haber verir;
  `--silent` ile ikinci başlatma hiçbir şey yapmaz.
- Güncelleyici yalnızca `github.com/ucsahinn/seotracker` adreslerini kendisi
  kurar, yönlendirmeyi yalnızca GitHub sunucularına (HTTPS) kabul eder, dosyayı
  `.part` olarak indirip SHA256SUMS.txt ile doğrulamadan kurulum adını vermez.
  Tüm kullanıcılar kurulumunda kendiliğinden kurmaz (UAC sorardı), yalnızca
  haber verir.
- Günlükler: `server.log` 5 MB, `launcher.log` ve `migrate.log` 1 MB'ta
  `*.old.log` adına döner. wrangler'ın kendi kayıtları `logs\wrangler\`.
- Kurulum sessiz güncellemede "Windows açılınca başlat" ayarına dokunmaz;
  Run değeri `[Code]` içinde yazılır ve kaldırmada (menüden açılmış olsa da)
  silinir.

## Derleme

Gerekenler: Windows 10/11, pnpm (depo kökündeki sürüm), npm, Visual Studio
Build Tools (Roslyn `csc.exe`; `winget install Microsoft.VisualStudio.2022.BuildTools`),
kurulum dosyası için [Inno Setup 6](https://jrsoftware.org/isinfo.php)
(`winget install JRSoftware.InnoSetup`), Store paketi için Windows SDK
(`makeappx.exe`).

Başlatıcı `/deterministic` ile derlenir: aynı kaynak ve aynı derleyici aynı
dosyayı, dolayısıyla aynı SHA-256'yı verir. Windows'un içindeki .NET Framework
`csc.exe` bu anahtarı tanımadığı için kullanılmaz; komut `launcher\compiler.ps1`
içindedir ve testlerle ortaktır.

```powershell
# Depo kökünden. Uygulamayı derler, paketi hazırlar, kurulum dosyasını üretir.
./packaging/windows/build.ps1

# Inno Setup ve Windows SDK olmadan yalnızca klasörü hazırla:
./packaging/windows/build.ps1 -NoInstaller -NoMsix

# Store'a yüklenecek paket: kimlik Partner Center'daki "Product identity" sayfasından
./packaging/windows/build.ps1 -MsixIdentityName "<Name>" -MsixPublisher "CN=<...>" -MsixPublisherDisplayName "<ad>"

# Node'u indirmek yerine eldeki bir node.exe'yi göm:
./packaging/windows/build.ps1 -NodeExe C:\path\to\node.exe
```

Çıktı: `packaging/windows/out/stage/` (çalışır klasör; `seowatcher.exe` buradan
da çalıştırılabilir), `packaging/windows/out/seowatcher-setup-<sürüm>.exe` ve
`packaging/windows/out/seowatcher-<sürüm>.msix`. Kimlik verilmezse Store paketi
yer tutucu bir kimlikle üretilir; yalnızca incelemeye yarar, Store kabul etmez.
Store paketi imzasızdır (Store imzalar), bu yüzden çift tıklayarak kurulamaz.

`out\` altında eski derlemelerin `seowatcher.exe` kopyalarını biriktirmeyin:
antivirüsler her birini ayrı, tanınmayan bir dosya olarak değerlendirir.

GitHub Actions (`.github/workflows/release-windows.yml`) her `v*` etiketinde
aynı betiği çalıştırır, kurulum dosyasını sürüme ekler ve Store paketini iş
akışı çıktısı (artifact) olarak bırakır; Store'a yükleme elle yapılır.

## Store simgeleri

`msix/assets/` altındaki üç PNG (`Square44x44Logo`, `Square150x150Logo`,
`StoreLogo`) `icon/seowatcher-256.png` dosyasının küçültülmüş kopyalarıdır.
Simge değişirse onları da yeniden üretin.

## Simge

`icon/seowatcher.svg` kaynaktır; `icon/seowatcher.ico` ve
`icon/seowatcher-256.png` ondan üretilip depoya konur:

```sh
node packaging/windows/icon/make-icon.mjs <playwright-kurulu-klasör>
```

## Bilinen sınırlar

- Kurulum dosyası imzasız; SmartScreen ilk çalıştırmada "Daha fazla bilgi →
  Yine de çalıştır" ister ve bazı antivirüsler tanınmayan dosya olarak
  engelleyebilir. Çözüm yolları `docs/CODE_SIGNING.md` içindedir.
- Store paketinin paket içi davranışı (veri klasörü, başlangıç görevi, veri
  devri) henüz kurulu bir pakette denenmedi: `specs/0014-windows-store-package.md`.
- `wrangler dev` zamanlanmış tetikleyicileri (cron) çalıştırmaz; Docker
  kurulumuyla aynı durum, uygulama bunu ekran açılışında kendisi telafi eder.
- Yalnızca 64-bit Windows 10/11.
