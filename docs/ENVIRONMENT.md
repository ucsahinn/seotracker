# Ortam değişkenleri

> **Windows paketi kullanıyorsanız:** bu dosyadaki değişkenler yalnızca Docker kurulumu içindir. Windows paketinde `.env` yoktur; karşılıkları aşağıdaki [Windows paketinde](#windows-paketinde) bölümünde.

seotracker hiçbir yapılandırma olmadan çalışır. Aşağıdakilerin hiçbiri zorunlu
değil; her biri yalnızca bir şeyi açar.

Bu dosya, `compose.yaml`'ın konteynere gerçekten ilettiği değişkenlerin
listesidir. Kurulumun geri kalanı — Google OAuth istemcisi, PageSpeed anahtarı
— uygulamanın **Ayarlar** ekranından giriliyor; dosya düzenlemek gerekmiyor.

Kullanmak için proje kökünde bir `.env` dosyası oluşturup istediğiniz satırları
yazın. Dosya `.gitignore`'da.

`.env` dosyasını değiştirdikten sonra konteyneri yeniden oluşturun; düz
`docker compose up -d` değişikliği uygulamaz:

```sh
docker compose up -d --force-recreate seotracker
```

Windows'ta Not Defteri dosyayı `.env.txt` diye kaydedebilir; PowerShell ile
oluşturmak güvenlidir, örneğin `Set-Content -Encoding ascii .env 'PORT=3002'`.

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

| Değişken            | Ne işe yarar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PAGESPEED_API_KEY` | Denetimin Lighthouse aşaması için. **Ayarlar'dan girmek daha kolay.** Anahtarsız ölçüm ilk 50 sayfayla sınırlıdır ve çoğu zaman kısmen 429 ile başarısız olur; anahtar önerilir. Bkz. [PAGESPEED_API_KEY.md](./PAGESPEED_API_KEY.md).                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOKEN`         | `/mcp` ucu için paylaşılan sır. Boşsa Docker konteyneri ilk açılışta bir tane üretir (`/app/.wrangler/mcp-token`; okumak için `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`, Windows'ta Git Bash'te başına `MSYS_NO_PATHCONV=1` ekleyin, yoksa token boş çıkar). Kendi değerinizi verebilir ya da `off` yazıp kapatabilirsiniz (yalnızca Docker'da; boş bırakmak kapatmaz). Rastgele değer üretmek için: `openssl rand -hex 32` (Git Bash/Linux/macOS) ya da PowerShell'de `-join ((1..32) \| % { '{0:x2}' -f (Get-Random -Max 256) })`. |

## Windows paketinde

Windows paketi (seowatcher-setup.exe) `.env` okumaz ve yukarıdaki değişkenlerin hiçbirini sizden beklemez. Her şey `%LOCALAPPDATA%\seowatcher` klasöründedir (görev çubuğu menüsünde **Veri klasörünü aç**):

| Dosya             | Kim yazar           | Ne tutar                                                                                                                                                                                                                                         |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `config.json`     | siz ve başlatıcı    | `"port"` (varsayılan `3001`), `"autoUpdate"` ve son çalışan sürüm. Elle düzenlenebilen tek dosya; değiştirdikten sonra menüden **Yeniden başlat**. 3001 doluysa başlatıcı o açılış için 3002-3010 arasından boş birini seçer ama dosyaya yazmaz. |
| `server.env`      | başlatıcı           | Docker'daki `.env` ya da `.dev.vars` karşılığı: `AUTH_MODE=local_noauth`, `BETTER_AUTH_SECRET`, `MCP_TOKEN`, `INSTALL_KIND=windows` ve Ayarlar'daki Windows bölümünün yerel bağlantısı. Her açılışta baştan yazılır; düzenlemeyin.               |
| `instance-secret` | başlatıcı (bir kez) | `BETTER_AUTH_SECRET` karşılığı: kayıtlı Google bilgilerini şifreleyen anahtar. Silinirse kayıtlı Google bağlantıları açılamaz.                                                                                                                   |
| `mcp-token`       | başlatıcı (bir kez) | `MCP_TOKEN` karşılığı: ajan bağlantısının parolası. Windows paketinde kapatılamaz; boş ya da kısa bir dosya yeniden üretilir.                                                                                                                    |

Değişkenlerin Windows karşılığı:

| Değişken                                   | Windows paketinde                                            |
| ------------------------------------------ | ------------------------------------------------------------ |
| `PORT`                                     | `config.json` içindeki `"port"`.                             |
| `ALLOWED_HOST`                             | Yok. Uygulama yalnızca `127.0.0.1` adresinden açılır.        |
| `AUTH_MODE`, `TEAM_DOMAIN`, `POLICY_AUD`   | Yok. Her zaman `local_noauth`.                               |
| `BETTER_AUTH_SECRET`                       | `instance-secret` dosyası.                                   |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Yok. **Ayarlar → Google** ya da **Ayarlar → Hizmet hesabı**. |
| `PAGESPEED_API_KEY`                        | Yok. **Ayarlar → Hız ölçümü**.                               |
| `MCP_TOKEN`                                | `mcp-token` dosyası.                                         |

Uygulama hangi kurulumda çalıştığını `INSTALL_KIND` ile bilir: başlatıcı `windows` yazar, Docker'da tanımsızdır ve `docker` sayılır. `/api/health` yanıtındaki `installKind` alanı bunu gösterir; elle ayarlamayın.

## Neden `.env.example` yok

Vardı ve yanlıştı: upstream projeden gelen dosya `DATAFORSEO_API_KEY`,
`AUTUMN_SECRET_KEY`, `LOOPS_*` ve `POSTHOG_*` tanımlıyordu — hiçbiri bu
çatallamada yok. İki doküman insanlara onu kopyalamamalarını söylüyordu, ki
bu bir çözüm değil: yeni gelen birinin ilk refleksi `cp .env.example .env`.
Yanıltıcı şablon kaldırıldı, doğru liste bu dosya oldu.
