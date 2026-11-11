# Windows dağıtımı ve kod imzalama

Windows paketi imzasız bir `.exe` olarak dağıtıldığında iki sorun çıkar:
SmartScreen ilk indirmelerde "Windows bilgisayarınızı korudu" der, ve bazı
antivirüsler dosyayı içeriğine bakmadan, yalnızca tanınmadığı için engeller.
10 Kasım 2026'da ESET kurulu `seowatcher.exe` dosyasını bu yüzden
`@Object.Suspicious` diye sildi. Kodda bir sorun yoktu: dosya imzasızdı, yeniydi
ve her derlemede farklı bir özet (hash) alıyordu.

Kod imzalama sertifikası için bütçe yok. Bu yüzden dağıtım iki kanala ayrıldı;
tasarım kaydı `specs/0014-windows-store-package.md` dosyasındadır.

| Kanal                                | Kim imzalar                            | Kime                                        |
| ------------------------------------ | -------------------------------------- | ------------------------------------------- |
| Microsoft Store (MSIX), birincil     | Microsoft                              | Herkes; uyarı çıkmaz, Store günceller       |
| Kurulum dosyası (Inno Setup), ikinci | Kimse (SignPath onaylanırsa o imzalar) | Store'un kapalı olduğu kurum bilgisayarları |

Her iki kanalda başlatıcı `/deterministic` ile derlenir: bir sürümün
`seowatcher.exe` dosyası kaç kez derlenirse derlensin aynı SHA-256'yı taşır.

## Microsoft Store: sizin yapacaklarınız

1. `https://partner.microsoft.com/dashboard` üzerinden bireysel geliştirici
   hesabı açın (bireysel hesap ücretsizdir).
2. **Apps and games → New product → MSIX or PWA app** ile `seowatcher` adını
   ayırın.
3. **Product management → Product identity** sayfasındaki üç değeri GitHub
   deposunda **Settings → Secrets and variables → Actions → Variables** altına
   ekleyin (bunlar gizli değildir, paketin içinde zaten yazar):
   `MSIX_IDENTITY_NAME` (Package/Identity/Name), `MSIX_PUBLISHER`
   (Package/Identity/Publisher, `CN=...`) ve `MSIX_PUBLISHER_DISPLAY_NAME`.
4. Bir sonraki `v*` etiketinde iş akışı `seowatcher-<sürüm>-store` adlı bir
   çıktı (artifact) üretir. İçindeki `.msix` dosyasını gönderimin **Packages**
   adımına yükleyin.
5. Gönderimde `runFullTrust` için gerekçe istenir. Yazılacak metin: "seowatcher
   is a tray application that runs a bundled Node.js runtime and the workerd
   engine as ordinary child processes to serve a local web app on 127.0.0.1.
   These are full-trust Win32 processes and cannot run in an AppContainer."

Store paketi yerelde imzalanmaz, bu yüzden çift tıklayarak kurulamaz. İlk
kabul edilen gönderimden sonra paket içi davranışın (veri klasörü, başlangıç
görevi, kurulum dosyasından veri devri) gerçek bir kurulumda denenmesi gerekir.

## Kurulum dosyası: SignPath (açık kaynak için ücretsiz)

Şartlar bizde var: MIT lisansı, kodun tamamı açık, derleme GitHub Actions'ta tam
otomatik (SignPath "kaynak doğrulaması" için bunu ister). İmza SmartScreen
uyarısını hemen kaldırmaz (Microsoft itibarı indirme sayısıyla biriktirir) ama
antivirüslerin "imzasız, tanınmayan dosya" gerekçesini ortadan kaldırır.

1. `https://signpath.org` üzerinden açık kaynak başvurusu açın; depo
   `github.com/ucsahinn/seotracker`, ürün adı seowatcher. Onay birkaç gün
   sürebilir; e-postayla gelir.
2. SignPath'te projeyi `seowatcher`, imzalama ilkesini `release-signing`
   adıyla oluşturun (bu iki ad iş akışında yazılıdır; farklı seçerseniz
   `.github/workflows/release-windows.yml` içindeki `project-slug` ve
   `signing-policy-slug` değerlerini değiştirin). Yapıt yapılandırması:
   tek bir `.exe` (Inno Setup kurulum dosyası), "Authenticode" imzası.
3. GitHub deposunda **Settings → Secrets and variables → Actions** altına iki
   gizli değer ekleyin: `SIGNPATH_API_TOKEN` (SignPath'te oluşturduğunuz
   CI kullanıcısının API anahtarı) ve `SIGNPATH_ORGANIZATION_ID`.
4. Bir sonraki `v*` etiketinde iş akışı kurulum dosyasını imzaya gönderir,
   imzalı dosyayı bekler, smoke testi ve yayını onunla yapar. Gizli değerler
   yokken adım atlanır ve her şey eskisi gibi imzasız çıkar.

Doğrulama: yayındaki `seowatcher-setup-X.Y.Z.exe` dosyasına sağ tıklayıp
**Özellikler → Dijital İmzalar** sekmesinde "SignPath Foundation" ile
"seowatcher" görünmeli. PowerShell'de:
`Get-AuthenticodeSignature .\seowatcher-setup-X.Y.Z.exe` → `Valid`.

## İmzasız kurulum dosyasını kullananlar için

Dosyanın bozulmadığını indirdikten sonra doğrulayın. Her sürümün yanında
`SHA256SUMS.txt` yayımlanır:

```powershell
(Get-FileHash .\seowatcher-setup-X.Y.Z.exe -Algorithm SHA256).Hash.ToLower()
```

Çıkan değer `SHA256SUMS.txt` içindeki satırla aynı olmalıdır.

**Kurum BT'si için istisna notu.** seowatcher açık kaynaklıdır
(`github.com/ucsahinn/seotracker`, MIT) ve yalnızca `127.0.0.1` üzerinde
dinler. Antivirüs dosyayı tanınmadığı için engelliyorsa şu iki klasöre istisna
tanımlayın (özet istisnası her sürümde yenilenmek zorunda kalır, klasör
istisnası kalmaz):

- `%LOCALAPPDATA%\Programs\seowatcher` (program; tüm kullanıcılar kurulumunda
  `%ProgramFiles%\seowatcher`)
- `%LOCALAPPDATA%\seowatcher` (veri ve indirilen güncellemeler)

Antivirüs kurulu `seowatcher.exe` dosyasını sildiyse: önce istisnayı ekleyin,
sonra dosyayı karantinadan geri yükleyin ya da aynı sürümün kurulum dosyasını
yeniden çalıştırın. Veriler silinmez.

## Yanlış alarm bildirimi

İkisi de ücretsizdir ve dosyayı siz gönderirsiniz:

- ESET: `https://support.eset.com/en/kb141` (dosyayı "false positive" olarak
  `samples@eset.com` adresine gönderme adımları).
- Microsoft Defender: `https://www.microsoft.com/wdsi/filesubmission`
  ("Software developer" seçeneği).

Gönderim metni: "seowatcher is an open-source (MIT) self-hosted SEO tool:
github.com/ucsahinn/seotracker. The attached file is the tray launcher from
release vX.Y.Z, built by GitHub Actions from the tagged source; its SHA-256 is
in SHA256SUMS.txt on the release page. It was detected as a suspicious object
on reputation only. Please review and remove the detection."

## Diğer yollar

- **Azure Trusted Signing**: Microsoft'un servisi; bireysel geliştiriciler
  için Türkiye'de açık değil.
- **Certum Open Source**: açık kaynak için düşük ücretli sertifika; gelir
  başlayınca değerlendirilebilir.
- **winget**: `packaging/winget` altındaki bildirimler hazırdır;
  `winget install seowatcher` ile kurulum SmartScreen tıklamalarını büyük
  ölçüde atlar, antivirüs değerlendirmesini değiştirmez. Gönderim
  microsoft/winget-pkgs deposuna PR'dır (`packaging/winget/README.md`).
