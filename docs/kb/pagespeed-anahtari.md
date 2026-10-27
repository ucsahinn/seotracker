---
title: PageSpeed anahtarı
description: PageSpeed anahtarını kaydedin; test isteğinin ve denetim sayacının kapsamını öğrenin.
kind: nasil-yapilir
updated: 2026-10-27
---

## Anahtarı ekleyin

Google Cloud projenizde PageSpeed Insights API'yi etkinleştirin. Kimlik bilgileri bölümünde bir API anahtarı oluşturun; API kısıtını PageSpeed Insights olarak ayarlayın. **Ayarlar → Hız ölçümü** alanına anahtarı girip **Kaydet** deyin. Anahtar şifreli saklanır, ekranda gösterilmez. Docker'da PAGESPEED_API_KEY ortam değeri de kullanılabilir; Ayarlar'daki kayıt önceliklidir.

## Testin anlamı

**Anahtarı test et**, example.com için bir gerçek mobil istek gönderir. Sitenizin hızını ölçmez ve denetim ölçüm sayacına eklenmez. Sonuç ve test tarihi görünür. Düğme istek boyunca ve tıklamadan itibaren en az 10 saniye kapalıdır. Anahtar değişince önceki test sonucu kaldırılır.

## Sınırlar ve hatalar

Anahtarsız uygulama denetim başına en fazla 50 sayfayı dener. Google daha erken sınır koyabilir; anahtar başarı garantisi vermez. Gerçek kota için Google Cloud kota ekranına bakın. Ayarlar'daki PageSpeed sayacı yalnızca son 24 saatte başlayan denetimlerin kayıtlarını sayar; testleri veya başka programları saymaz.

Geçersiz anahtarda değeri yeniden kopyalayın. 403/kısıtlı anahtarda API'nin etkin olduğunu ve kısıtları kontrol edin. Günlük kota veya istek sınırında bekleyin ve Cloud kota ekranını inceleyin. Ağ hatasında yeniden deneyin. Kaydedilmiş anahtar erişimin doğrulandığı anlamına gelmez; test yalnızca o isteğin sonucudur.
