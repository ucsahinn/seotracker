# Kod imzalama (SignPath)

Windows kurulum dosyası şu an imzasızdır; SmartScreen ilk indirmelerde
"Windows bilgisayarınızı korudu" der ve kullanıcı "Daha fazla bilgi → Yine de
çalıştır" demek zorunda kalır. İmza bu uyarıyı hemen kaldırmaz (Microsoft
itibarı indirme sayısıyla biriktirir) ama kaldırılmasının tek yoludur ve
kurumsal ortamlarda zorunludur.

Açık kaynak projeler için ücretsiz yol **SignPath Foundation**'dır. Şartlar
bizde var: MIT lisansı, kodun tamamı açık, derleme GitHub Actions'ta tam
otomatik (SignPath "kaynak doğrulaması" için bunu ister).

## Sizin yapacaklarınız (bir kez)

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

## Doğrulama

Yayındaki `seowatcher-setup-X.Y.Z.exe` dosyasına sağ tıklayıp
**Özellikler → Dijital İmzalar** sekmesinde "SignPath Foundation" ile
"seowatcher" görünmeli. PowerShell'de:
`Get-AuthenticodeSignature .\seowatcher-setup-X.Y.Z.exe` → `Valid`.

## Alternatifler

- **Azure Trusted Signing**: Microsoft'un servisi; bireysel geliştiriciler
  için şimdilik yalnızca ABD ve Kanada, şirketler için 3+ yıl ticari geçmiş.
- **Microsoft Store**: uygulamayı Microsoft imzalar, SmartScreen uyarısı hiç
  çıkmaz; MSIX paketi ve tek seferlik geliştirici hesabı gerekir, ayrı bir iş.
- **winget**: `packaging/winget` altındaki bildirimler hazırdır;
  `winget install seowatcher` ile kurulum SmartScreen tıklamalarını büyük
  ölçüde atlar. Gönderim microsoft/winget-pkgs deposuna PR'dır
  (`packaging/winget/README.md`).
