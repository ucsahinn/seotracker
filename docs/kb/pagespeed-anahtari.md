---
title: PageSpeed anahtarı
description: Site denetiminde sayfa hızı ölçümü için ücretsiz Google PageSpeed Insights anahtarı alma ve uygulamaya girme. Anahtarsız ölçüm 50 sayfayla sınırlı kalır.
kind: nasil-yapilir
updated: 2026-10-22
---

Site denetimindeki "Sayfa hızını da ölç" seçeneği her sayfayı Google'ın PageSpeed Insights servisiyle telefonda ve bilgisayarda ölçer. Google bu servisi anahtarsız da kullandırır ama kotası çok küçüktür; birkaç sayfadan sonra "429, çok fazla istek" döner ve uygulama anahtarsız denetimde ölçümü en fazla 50 sayfayla sınırlar. Ücretsiz bir anahtar bu sınırı kaldırır. Bu sayfanın sonunda anahtarınız alınmış, uygulamaya girilmiş ve test edilmiş olacak; beş dakika sürer.

## Gerekenler

- Bir Google hesabı ve Google Cloud Console'da bir proje. Google bağlantısı için proje açtıysanız aynısı olur.
- Kart ya da ücret gerekmez; PageSpeed Insights API ücretsizdir.

## Adımlar

1. console.cloud.google.com adresinde projenizi seçin.
2. **API'ler ve Hizmetler → Kitaplık** bölümünde **PageSpeed Insights API** araması yapın ve **Etkinleştir** deyin. Bu adım atlanırsa anahtar var ama her istek 403 ile reddedilir.
3. **API'ler ve Hizmetler → Kimlik bilgileri → Kimlik bilgisi oluştur → API anahtarı**. "AIza" ile başlayan anahtar gösterilir, kopyalayın.
4. İsteğe bağlı ama önerilir: **Anahtarı kısıtla** deyip API kısıtlamasında yalnızca **PageSpeed Insights API**'yi seçin. Yapay zekâ ajanınız gerçek kullanıcı verisi (CrUX) geçmişine de bakacaksa **Chrome UX Report API**'yi de ekleyin.
5. Uygulamada **Ayarlar → Hız ölçümü** bölümünü açın, **API anahtarı** alanına yapıştırın, **Kaydet** deyin. "PageSpeed anahtarı kaydedildi" bildirimi gelir; yeniden başlatma gerekmez.
6. Aynı bölümdeki **Anahtarı test et** düğmesine basın. Uygulama example.com için tek bir gerçek ölçüm yapar (1 ölçüm harcar) ve sonucu söyler; beklediğiniz cevap "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti." cümlesidir.

Docker kullanıyorsanız anahtarı .env dosyasına PAGESPEED_API_KEY olarak da verebilirsiniz; ama Ayarlar ekranı daha kolaydır ve oraya girilen değer önceliklidir.

## Kontrol

- **Ayarlar → Hız ölçümü** rozeti **Anahtar kayıtlı** demeli.
- Site denetimi başlatma kartında "Sayfa hızını da ölç" açıkken süre tahmini artık "en çok 50 sayfa" sınırından söz etmemeli.
- **Ayarlar → Sınırlar** bölümündeki "PageSpeed Insights" kartı "Anahtar tanımlı" demeli.

## Sık sorulanlar

**Kota ne kadar?** Google resmi bir sayı vermez ve zamanla değiştirir; gerçek değer Cloud Console'da **API'ler ve Hizmetler → Kotalar** bölümünde yazar. Pratikte dakikalık bir sınır ve günlük bir sınır vardır. Her sayfa iki ölçüm harcar (telefon ve bilgisayar).

**Dakikalık sınıra takılınca ne olur?** Uygulama bekler ve yeniden dener; denetim yavaşlar ama bitmesi için bir şey yapmanız gerekmez. Günlük sınır biterse ölçüm durur, o ana kadarki sonuçlar kalır, sonraki gün yeni denetimde tamamlanır.

**Aynı anda iki denetim hız ölçerse?** Dakikalık sınırı paylaşırlar ve ikisi de iki kat yavaşlar. 212 sayfalık bir site tek başına 24 dakikada, başka bir denetimle birlikte 48 dakikada ölçüldü.

**Anahtar nerede saklanıyor?** Bu bilgisayardaki veritabanında, şifreli. Tarayıcıya geri gönderilmez; Ayarlar ekranı yalnızca "kayıtlı" bilgisini gösterir.

**Anahtar olmadan hiç ölçüm yapılmaz mı?** Yapılır, 50 sayfaya kadar ve çoğu zaman bir kısmı 429 ile başarısız olur. Küçük bir site için yeterli olabilir; 50'den büyük siteler için anahtar gerekir.

## Sorun çıkarsa

- **Test "restricted" ya da 403 diyor.** 2. adım eksik: PageSpeed Insights API etkin değil, ya da anahtar başka bir API'ye kısıtlanmış.
- **Test "invalid_key" diyor.** Anahtar eksik kopyalanmış. Cloud Console'dan yeniden kopyalayın; anahtarın biçimi uygulamada doğrulanmaz, yalnızca Google kabul edip etmediğini söyler.
- **Test "quota_exhausted" diyor.** Bugünkü kota bitmiş. Yarın tekrar deneyin ya da Cloud Console'da kotayı kontrol edin.
- **Denetimde hız sütunu boş.** Denetim başlatılırken "Sayfa hızını da ölç" kapalıydı. Yeni bir denetimde açın; eski denetim geriye dönük ölçülmez.
- **Kota kartı "Anahtar yok" diyor ama anahtar girdim.** Sayfayı yenileyin; kart son 24 saatin denetimlerine bakar, yeni anahtar bir sonraki denetimde devreye girer.

<!-- Kaynaklar: docs/PAGESPEED_API_KEY.md; src/client/features/settings/PageSpeedKeySection.tsx; PageSpeedKeyTest.tsx; src/server/features/lighthouse/pagespeed-config.ts; PageSpeedKeyTestService.ts; src/shared/audit-limits.ts; src/server/features/quotas/QuotaService.ts -->
