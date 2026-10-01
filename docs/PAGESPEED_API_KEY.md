# PageSpeed Insights anahtarı

Site denetiminin hız ölçümü Google'ın PageSpeed Insights API'sini kullanır.
API ücretsizdir. Anahtarsız ölçüm ilk 50 sayfayla sınırlıdır ve çoğu zaman
kısmen 429 ile başarısız olur; anahtar önerilir.

Taranan her sayfa telefonda ve bilgisayarda ölçülür, yani sayfa başına 2
istek yapılır (212 sayfa için 424). Dakikalık sınır aşılırsa denetim bekleyip o
ölçümleri yeniden dener; günlük sınır dolarsa ölçülenler korunur ve ölçüm durur.

Kota sayılarını Google resmî belgelerinde bulamadık; kendi projenizin gerçek
kotasını Google Cloud Console'da **APIs & Services → PageSpeed Insights API →
Quotas** bölümünden görebilirsiniz.

## Anahtarı alma

1. [Google Cloud Console](https://console.cloud.google.com/) açın. Search
   Console kurulumunda oluşturduğunuz projeyi kullanabilirsiniz.
2. **APIs & Services → Library** bölümünden **PageSpeed Insights API**'yi bulun
   ve etkinleştirin.
3. **APIs & Services → Credentials → Create credentials → API key**.
4. Oluşan anahtarı **Restrict key** ile yalnız PageSpeed Insights API'ye
   kısıtlayın. Zorunlu değil ama anahtar sızarsa başka bir servis için
   kullanılamaz.

## Anahtarı verme

Uygulamayı açın, **Ayarlar → Hız ölçümü** bölümüne anahtarı yapıştırıp
kaydedin. Yeniden başlatma gerekmez; sonraki denetim anahtarı kullanır.

Gelişmiş alternatif: anahtarı `.env` dosyanıza `PAGESPEED_API_KEY=AIza...`
olarak yazabilirsiniz. Konteyner ortam değişkenini yalnız yeniden
oluşturulduğunda okur:

```sh
docker compose up -d --force-recreate seotracker
```

Açılış denetimi anahtarın ayarlı olup olmadığını satır olarak yazar. Anahtarın
biçimi doğrulanmaz: opak bir metindir ve yanlış bir "geçersiz görünüyor" uyarısı
hiç uyarmamaktan kötü olurdu. Anahtar reddedilirse denetim tamamlanır, yalnız
hız satırları anahtarı işaret eden bir hata mesajıyla boş kalır.

## Anahtarsız çalıştırma

Anahtar vermezseniz denetim yine çalışır ve tüm teknik SEO kontrollerini üretir.
Yalnız Lighthouse aşaması ilk 50 sayfayla sınırlıdır ve kota nedeniyle çoğu
zaman kısmen başarısız olur. Tek bir sayfayı denemek için yeterlidir.
