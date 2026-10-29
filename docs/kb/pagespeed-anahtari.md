---
title: PageSpeed anahtarı
description: PageSpeed anahtarını kaydedin; test isteğinin ve denetim sayacının kapsamını öğrenin.
kind: nasil-yapilir
updated: 2026-10-27
---

Site denetimi sayfalarınızın hızını Google PageSpeed Insights ile ölçer. Anahtar isteğe bağlıdır ve Google Cloud'da ücretsiz oluşturulur. Anahtar yoksa uygulama her denetimde en fazla 50 sayfayı ölçmeyi dener.

## Anahtarı ekleyin

1. Google Cloud projenizde PageSpeed Insights API'yi etkinleştirin.
2. **Kimlik bilgileri** bölümünde bir API anahtarı oluşturun ve API kısıtını PageSpeed Insights olarak ayarlayın.
3. seowatcher'da **Ayarlar → Hız ölçümü** bölümünde anahtarı **API anahtarı** alanına yapıştırın ve **Kaydet** düğmesine basın.

Anahtar şifreli saklanır ve ekranda gösterilmez. Docker kurulumunda `PAGESPEED_API_KEY` ortam değişkeni de kullanılabilir; Ayarlar'a kaydedilen anahtar ondan önce gelir.

## Anahtarı test edin

**Anahtarı test et**, example.com için gerçek bir mobil ölçüm isteği gönderir. Sitenizin hızını ölçmez ve denetim sayacına eklenmez. Sonuç ve **Test tarihi** bölümde görünür. Düğme istek sürerken ve tıklamadan sonra en az 10 saniye kapalı kalır. Anahtarı değiştirdiğinizde eski test sonucu silinir.

Test yalnızca o tek isteğin sonucudur. Kaydedilmiş ya da test edilmiş bir anahtar, denetimdeki her ölçümün başarılı olacağını garanti etmez; Google kotaya göre daha erken durdurabilir.

## Kota

Gerçek kota ve kullanım Google Cloud'un kota ekranındadır. **Ayarlar → Google ve sistem sınırları** altındaki PageSpeed sayacı yalnızca son 24 saatte başlayan denetimlerin isteklerini sayar; testleri ve başka programların isteklerini saymaz.

## Hatalar

- **Geçersiz anahtar:** Anahtarı Google Cloud'dan yeniden kopyalayın.
- **403 ya da kısıtlı anahtar:** API'nin etkin olduğunu ve anahtar kısıtlarının PageSpeed Insights'a izin verdiğini kontrol edin.
- **Günlük kota ya da istek sınırı:** Bekleyin ve Cloud kota ekranına bakın.
- **Ağ hatası:** Yeniden deneyin.
