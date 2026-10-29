---
title: Ajan kurulumu
description: Ajanı güvenle bağlayın, yeni araç çağrısını doğrulayın ve SEO becerilerini kullanın.
kind: nasil-yapilir
updated: 2026-10-27
---

Ajan kurulumu, Claude Code, Codex ya da Cursor gibi bir yapay zekâ asistanını MCP (Model Context Protocol) ile seowatcher'a bağlar. Bağlandıktan sonra asistan Search Console, Analytics ve denetim verinizi bilgisayarınızdaki uygulamadan okur, denetimi çalıştırır ve rapor yazar. Asistanın okuduğu veri o asistanın sağlayıcısına gidebilir.

## Ajanı bağlayın

Çalışan uygulamada **Ajan kurulumu** sayfasını açın. Claude Code, Codex veya Diğer seçeneğini seçip **Kurulum komutunu kopyala** deyin. Seçenekler ok tuşları, Home ve End ile kullanılabilir; seçim komutu kendiliğinden kopyalamaz. Metni ajanınıza verin. Metin gerçek parola içermez; ajan parolayı yalnızca yerel kurulumdan kullanır. **Sıfırdan kurulum** ayrı bir seçenektir.

## Yeni çağrıyı doğrulayın

**Bağlantıyı doğrula** deyin ve ajandan bir seowatcher aracı çağırmasını isteyin. Sayfa en fazla 60 saniye boyunca 5 saniyede bir yerel çağrı kaydını okur. Önceden yapılmış bir çağrı yeni kurulumu doğrulamaz. Sekme gizlenince, hata oluşunca veya iptal edince yoklama durur. Yeni çağrı görülmediyse ajanınızın MCP durumuna bakıp yeniden deneyin. Bu sonuç bağlantının kesin olarak bozuk olduğu anlamına gelmez.

**Bağlandı** ve son çağrı tarihi geçmiş kullanımı gösterir; sürekli çevrimiçi oturum değildir. Durum okunamazsa yeniden okuyun. Araç erişimi kurulum kapsamındadır, yalnızca açık projeyle sınırlı değildir.

## Parolayı koruyun

Hazır kurulum metnini tercih edin. Elle kurulumda yalnızca MCP istemcinizin yerel gizli başlık alanını kullanın: `Authorization: Bearer <token>`. Windows PowerShell'de parolayı ekrana yazdırmadan panoya almak için:

`(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker için PowerShell:

`(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Yerel başlık alanına yapıştırınca panoyu temizleyin. Parolayı terminale, sohbete, ekran görüntüsüne veya kaynak koduna koymayın. Windows'ta parola dosyasını tepsi menüsündeki **Veri klasörünü aç** ile bulabilirsiniz.

## Beceriler ve sorun giderme

**Beceriler** sekmesi SEO iş akışlarını listeler. Kurulum metni becerileri yükler; **Güncelleme komutunu kopyala** mevcut kurulumu günceller. Claude Code'da /seo-audit, Codex'te $seo-audit kullanılır. 401 hatasında yerel istemcinin başlığı gönderdiğini kontrol edin. İstek reddedilirse uygulamanın açık olduğunu ve MCP adresini doğrulayın. MCP durumunu istemcinizde yenileyip yeni araç çağrısıyla tekrar doğrulayın.
