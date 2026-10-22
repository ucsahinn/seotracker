---
title: PageSpeed anahtarı
description: Sayfa hızını ölçmek için ücretsiz Google PageSpeed anahtarı alın ve uygulamaya girin. Anahtarsız ölçüm 50 sayfayla sınırlı kalır.
kind: nasil-yapilir
updated: 2026-10-22
---

Bu sayfanın sonunda ücretsiz PageSpeed anahtarınız alınmış, uygulamaya girilmiş ve denenmiş olacak. Beş dakika sürer. Site denetimindeki "Sayfa hızını da ölç" seçeneği her sayfayı Google'ın PageSpeed Insights servisiyle telefonda ve bilgisayarda ölçer. Google bu servisi anahtarsız da verir, ama hakkı çok azdır. Birkaç sayfadan sonra "429, çok fazla istek" döner. Uygulama anahtarsız denetimde ölçümü en fazla 50 sayfayla sınırlar. Ücretsiz anahtar bu sınırı kaldırır.

## Gerekenler

- Bir Google hesabı ve Google Cloud Console'da (Google'ın geliştirici sayfası) bir proje. Google bağlantısı için proje açtıysanız aynısı olur.
- Kart ya da ücret gerekmez. PageSpeed Insights API (servise erişim kapısı) ücretsizdir.

## Adımlar

1. `console.cloud.google.com` adresinde projenizi seçin.
2. **API'ler ve Hizmetler → Kitaplık** sayfasını açın. **PageSpeed Insights API** diye aratın ve **Etkinleştir** deyin. Bu adımı atlarsanız anahtar olur ama her istek 403 ile reddedilir.
3. **API'ler ve Hizmetler → Kimlik bilgileri → Kimlik bilgisi oluştur → API anahtarı** deyin. "AIza" ile başlayan anahtar görünür. Kopyalayın.
4. İsteğe bağlı ama önerilir: **Anahtarı kısıtla** deyin. API kısıtlamasında yalnızca **PageSpeed Insights API**'yi seçin. Yapay zekâ asistanınız gerçek kullanıcı verisinin (CrUX) geçmişine de bakacaksa **Chrome UX Report API**'yi de ekleyin.
5. Uygulamada **Ayarlar → Hız ölçümü** bölümünü açın. **API anahtarı** alanına anahtarı yapıştırın. **Kaydet** deyin. "PageSpeed anahtarı kaydedildi" bildirimi gelir. Yeniden başlatmak gerekmez.
6. Aynı bölümde **Anahtarı test et** düğmesine basın. Uygulama example.com için tek bir gerçek ölçüm yapar (1 ölçüm harcar). Beklediğiniz cevap: "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti."

Docker kullanıyorsanız anahtarı `.env` dosyasında `PAGESPEED_API_KEY` olarak da verebilirsiniz. Ayarlar ekranı daha kolaydır ve oraya girilen değer önceliklidir.

## Kontrol

- **Ayarlar → Hız ölçümü** rozeti **Anahtar kayıtlı** demeli.
- Site denetimi başlatma kartında "Sayfa hızını da ölç" açıkken süre tahmini artık "en çok 50 sayfa" sınırından söz etmemeli.
- **Ayarlar → Sınırlar** bölümündeki "PageSpeed Insights" kartı "Anahtar tanımlı" demeli.

## Sık sorulanlar

**Hak (kota) ne kadar?** Google resmi bir sayı vermez, zamanla da değiştirir. Gerçek değeri Cloud Console'da **API'ler ve Hizmetler → Kotalar** bölümünde görürsünüz. Pratikte dakikalık bir sınır ve günlük bir sınır vardır. Her sayfa iki ölçüm harcar: telefon ve bilgisayar.

**Dakikalık sınıra takılırsam ne olur?** Uygulama bekler ve yeniden dener. Denetim yavaşlar ama sizin bir şey yapmanız gerekmez. Günlük sınır biterse ölçüm durur. O ana kadarki sonuçlar kalır. Ertesi gün yeni denetimde tamamlanır.

**İki denetim aynı anda hız ölçerse?** Dakikalık sınırı paylaşırlar ve ikisi de iki kat yavaşlar. 212 sayfalık bir sitenin hız ölçümü tek başına yaklaşık 24 dakika, başka bir denetimle birlikte 48 dakika sürer; taramayla birlikte denetimin tamamı 35 dakikayı bulur.

**Anahtar nerede saklanıyor?** Bu bilgisayardaki veritabanında, şifreli. Tarayıcıya geri gönderilmez. Ayarlar ekranı yalnızca "kayıtlı" bilgisini gösterir.

**Anahtar olmadan hiç ölçüm yapılmaz mı?** Yapılır, 50 sayfaya kadar. Çoğu zaman bir kısmı 429 ile başarısız olur. Küçük site için yeterli olabilir. 50 sayfadan büyük siteler için anahtar gerekir.

## Sorun çıkarsa

- **Test "restricted" ya da 403 diyor.** 2. adım eksik: PageSpeed Insights API açık değil ya da anahtar başka bir API'ye kısıtlanmış.
- **Test "invalid_key" diyor.** Anahtar eksik kopyalanmış. Cloud Console'dan yeniden kopyalayın. Uygulama anahtarın biçimine bakmaz, yalnızca Google'ın kabul edip etmediğini söyler.
- **Test "quota_exhausted" diyor.** Bugünkü hak bitmiş. Yarın tekrar deneyin ya da Cloud Console'da kotaya bakın.
- **Denetimde hız sütunu boş.** Denetim başlarken "Sayfa hızını da ölç" kapalıydı. Yeni denetimde açın. Eski denetim sonradan ölçülmez.
- **Kota kartı "Anahtar yok" diyor ama anahtar girdim.** Sayfayı yenileyin. Kart son 24 saatin denetimlerine bakar. Yeni anahtar bir sonraki denetimde devreye girer.

<!-- Kaynaklar: docs/PAGESPEED_API_KEY.md; src/client/features/settings/PageSpeedKeySection.tsx; PageSpeedKeyTest.tsx; src/server/features/lighthouse/pagespeed-config.ts; PageSpeedKeyTestService.ts; src/shared/audit-limits.ts; src/server/features/quotas/QuotaService.ts -->
