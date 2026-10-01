# Ortam değişkenleri

seotracker hiçbir yapılandırma olmadan çalışır. Aşağıdakilerin hiçbiri zorunlu
değil; her biri yalnızca bir şeyi açar.

Bu dosya, `compose.yaml`'ın konteynere gerçekten ilettiği değişkenlerin
listesidir. Kurulumun geri kalanı — Google OAuth istemcisi, PageSpeed anahtarı
— uygulamanın **Ayarlar** ekranından giriliyor; dosya düzenlemek gerekmiyor.

Kullanmak için proje kökünde bir `.env` dosyası oluşturup istediğiniz satırları
yazın. Dosya `.gitignore`'da.

## Ağ

| Değişken       | Varsayılan | Ne işe yarar                                                                                                               |
| -------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `PORT`         | `3001`     | Konteynerin yayın yaptığı port. 127.0.0.1'e bağlı.                                                                         |
| `ALLOWED_HOST` | boş        | localhost dışında bir adla eriştiğinizde (Tailscale adı, ters vekil) eklenecek ad. Boşken yalnızca localhost kabul edilir. |

## Kimlik doğrulama

| Değişken             | Varsayılan     | Ne işe yarar                                                                                                                                                                                                     |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTH_MODE`          | `local_noauth` | 127.0.0.1'e bağlı, tek kullanıcılı bir konteyner için doğrusu budur. Yalnızca uygulamayı Cloudflare Access arkasına aldıysanız ve bunun ne demek olduğunu biliyorsanız değiştirin.                               |
| `BETTER_AUTH_SECRET` | otomatik       | Saklanan Google OAuth jetonlarını şifreler. **Konteyner açılışta kendisi üretir** ve veri biriminde saklar; elle ayarlamanız gerekmez. Ayarlarsanız en az 32 karakter olmalı, yoksa Search Console kapalı kalır. |

## Google (isteğe bağlı)

Search Console ve Analytics tek bir OAuth istemcisini paylaşır. **Bu ikisini
Ayarlar ekranından girmek daha kolaydır**; ortam değişkeni yolu yalnızca
kimlik bilgilerini dışarıdan enjekte eden kurulumlar için duruyor.

| Değişken               | Ne işe yarar           |
| ---------------------- | ---------------------- |
| `GOOGLE_CLIENT_ID`     | OAuth istemci kimliği. |
| `GOOGLE_CLIENT_SECRET` | OAuth istemci sırrı.   |

Bunlar olmadan da uygulama çalışır: tarayıcı, Lighthouse ve raporlar Google'a
ihtiyaç duymaz. Kurulum için bkz.
[SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md](./SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md)
ve [SELF_HOSTING_GOOGLE_ANALYTICS.md](./SELF_HOSTING_GOOGLE_ANALYTICS.md).

## Diğer isteğe bağlı

| Değişken            | Ne işe yarar                                                                                                                                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PAGESPEED_API_KEY` | Denetimin Lighthouse aşaması için. **Ayarlar'dan girmek daha kolay.** Anahtarsız da çalışır ama Google'ın anahtarsız kotası birkaç sayfadan sonra 429 döndürür. Bkz. [PAGESPEED_API_KEY.md](./PAGESPEED_API_KEY.md).          |
| `MCP_TOKEN`         | `/mcp` ucu için paylaşılan sır. Boşsa Docker konteyneri ilk açılışta bir tane üretir (`/app/.wrangler/mcp-token`). Kendi değerinizi verebilir ya da `off` yazıp kapatabilirsiniz (yalnızca Docker'da; boş bırakmak kapatmaz). |

## Neden `.env.example` yok

Vardı ve yanlıştı: upstream projeden gelen dosya `DATAFORSEO_API_KEY`,
`AUTUMN_SECRET_KEY`, `LOOPS_*` ve `POSTHOG_*` tanımlıyordu — hiçbiri bu
çatallamada yok. İki doküman insanlara onu kopyalamamalarını söylüyordu, ki
bu bir çözüm değil: yeni gelen birinin ilk refleksi `cp .env.example .env`.
Yanıltıcı şablon kaldırıldı, doğru liste bu dosya oldu.
