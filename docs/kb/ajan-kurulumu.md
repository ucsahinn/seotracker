---
title: Ajan kurulumu
description: Ajanı güvenle bağlayın, yeni araç çağrısını doğrulayın ve SEO becerilerini kullanın.
kind: nasil-yapilir
updated: 2026-10-27
---

Claude Code, Codex ya da Cursor gibi bir yapay zekâ asistanı (ajan), MCP (asistan bağlantısı) üzerinden seowatcher'a bağlanır. Bağlanan ajan Search Console, Analytics ve denetim verinizi bilgisayarınızdaki uygulamadan okur, denetim başlatır ve rapor kaydeder. Ajanın okuduğu veri, o ajanın sağlayıcısına gidebilir.

## Ajanı bağlayın

1. Uygulamada sol menüden **Ajan kurulumu** sayfasını açın.
2. **Hangi ajanı kullanıyorsunuz?** sorusuna **Claude Code**, **Codex** ya da **Diğer** ile cevap verin. Seçim ok tuşları, Home ve End ile de yapılır.
3. **Kurulum komutunu kopyala** düğmesine basın. Seçim yapmak komutu kendiliğinden kopyalamaz.
4. Kopyaladığınız metni ajanınıza yapıştırın.

Komut gerçek parolayı içermez; ajan parolayı bilgisayarınızdaki kurulumdan okur. Uygulamayı yeni kurduysanız ya da her şeyi baştan kontrol etmek istiyorsanız **Sıfırdan kurulum komutunu kopyala** düğmesini kullanın.

## Bağlantıyı doğrulayın

**Bağlantıyı doğrula** düğmesine basın ve ajanınızdan herhangi bir seowatcher aracını çağırmasını isteyin. Sayfa 60 saniye boyunca, beş saniyede bir yeni bir çağrı arar. Daha önce yapılmış bir çağrı sayılmaz.

- **Yeni araç çağrısı doğrulandı.** görünürse kurulum tamamdır.
- **Yeni araç çağrısı görülmedi.** görünürse ajanınızda MCP durumunu kontrol edin, bir araç çağrısı yaptırın ve yeniden doğrulayın. Bu sonuç bağlantının kesin bozuk olduğu anlamına gelmez.

Sekmeyi arka plana almak, bir hata ya da **Vazgeç** beklemeyi durdurur.

Sayfanın üstündeki **Araç çağrısı alındı** rozeti ve son çağrı zamanı geçmiş kullanımı gösterir; sürekli açık bir oturumu göstermez. Durum okunamazsa **Durumu yeniden oku** düğmesini kullanın. Bağlanan ajan yalnızca açık projeye değil, bu kurulumdaki tüm projelere erişir.

## Parolayı koruyun

Hazır kurulum komutunu tercih edin. Elle bağlamanız gerekirse parolayı yalnızca MCP istemcinizin gizli başlık alanına yazın: `Authorization: Bearer <parola>`.

Parolayı ekrana yazdırmadan panoya almak için PowerShell'de şu komutu çalıştırın.

Windows kurulumu:

`(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker kurulumu:

`(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Parolayı başlık alanına yapıştırdıktan sonra panoyu temizleyin. Parolayı terminale, sohbete, ekran görüntüsüne ya da kaynak koduna koymayın. Windows'ta parola dosyasının bulunduğu klasörü tepsi menüsündeki **Veri klasörünü aç** açar.

## Beceriler

**Beceriler** sekmesi, kurulum komutunun ajanınıza yüklediği altı hazır SEO iş akışını listeler:

| Beceri              | Ne yapar                                                                           |
| ------------------- | ---------------------------------------------------------------------------------- |
| `seo-coach`         | Nerede durduğunuzu anlatır ve sıradaki adımı seçer.                                |
| `seo-project-setup` | Hedeflerinizi, rakiplerinizi ve önemli sayfalarınızı bir kez kaydeder.             |
| `seo-audit`         | Sitenizi denetler ve bu hafta yapılacak tek bir işi öne çıkarır.                   |
| `seo-check-in`      | Bu dönemi öncekiyle karşılaştırır: ne değişti, ne zaman, önemli mi.                |
| `seo-triage`        | Trafik düştüyse düşüşün gerçek olup olmadığını, nerede ve ne zaman olduğunu bulur. |
| `seo-report`        | Bir becerinin sonucunu Raporlar sayfasına kaydeder.                                |

Claude Code'da beceriyi `/seo-audit`, Codex'te `$seo-audit` biçiminde çağırırsınız. Ajanı daha önce kurduysanız **Güncelleme komutunu kopyala** ile becerileri yenileyin; bağlantı ayarlarınız ve kendi düzenlemeleriniz korunur.

## Bağlantı çalışmıyorsa

- **401 hatası:** MCP istemciniz `Authorization` başlığını göndermiyor. Başlığı ve parolayı kontrol edin.
- **Bağlantı reddedildi:** Uygulamanın açık olduğunu ve ajanın doğru MCP adresini kullandığını kontrol edin. Adres **Bu kurulumun MCP adresi:** satırında yazar.
- Düzelttikten sonra ajanınızda MCP durumunu yenileyin ve yeni bir araç çağrısıyla yeniden doğrulayın.

<!-- Sources: src/routes/_app/ai.tsx; src/client/features/ai-mcp/ -->
