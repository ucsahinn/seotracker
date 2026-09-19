# PageSpeed Insights anahtarı

Site denetiminin hız ölçümü Google'ın PageSpeed Insights API'sini kullanır.
API ücretsizdir. Anahtarsız da yanıt verir ama kotası çok düşüktür ve bir
denetimin 20 isteği genellikle 429 ile reddedilir.

Anahtarlı kota: günde 25.000 sorgu, dakikada 240. Bir denetim en çok 20 istek
yapar, yani bu sınırlara kişisel kullanımda yaklaşmazsınız.

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

`.env` dosyanıza ekleyin:

```
PAGESPEED_API_KEY=AIza...
```

Konteyner ortam değişkenini yalnız yeniden oluşturulduğunda okur:

```sh
docker compose up -d --force-recreate seotracker
```

Açılış denetimi anahtarın ayarlı olup olmadığını satır olarak yazar. Anahtarın
biçimi doğrulanmaz: opak bir metindir ve yanlış bir "geçersiz görünüyor" uyarısı
hiç uyarmamaktan kötü olurdu. Anahtar reddedilirse denetim tamamlanır, yalnız
hız satırları anahtarı işaret eden bir hata mesajıyla boş kalır.

## Anahtarsız çalıştırma

Anahtar vermezseniz denetim yine çalışır ve 28 teknik SEO kontrolünün hepsini
üretir. Yalnız Lighthouse aşaması kota nedeniyle başarısız olur. Tek bir sayfayı
denemek için yeterlidir.
