---
title: Docker ile kurulum
description: Mac, Linux ve Windows'ta Docker ile kurun. Tek komut yeter, .env dosyası gerekmez. Verileriniz Docker'ın veri deposunda durur.
kind: nasil-yapilir
updated: 2026-10-22
---

Bu sayfanın sonunda uygulama Docker'da (uygulamaları kapalı kutu içinde çalıştıran program) çalışıyor ve `http://localhost:3001` adresinde açık olacak. Windows kullanıyorsanız tek dosyalık Windows kurulumu çok daha kolaydır. Bu sayfa Mac, Linux ve zaten Docker kullananlar içindir. İlk açılış birkaç dakika sürer, çünkü uygulama kutunun (konteynerin) içinde derlenir. Sonrakiler saniyeler sürer.

## Gerekenler

- Docker Desktop (Mac, Windows) ya da Docker Engine ile Docker Compose (Linux).
- Git. Yoksa GitHub sayfasındaki **Code → Download ZIP** de olur.
- Yaklaşık 2 GB boş disk ve ilk derleme sırasında 2 GB boş bellek.

## Adımlar

1. Depoyu (proje dosyalarını) indirin ve klasörüne girin:

```sh
git clone https://github.com/ucsahinn/seotracker.git
cd seotracker
```

2. Uygulamayı başlatın:

```sh
docker compose up -d
```

Hepsi bu kadar. `.env` dosyası gerekmez. Şifreleme anahtarı ve asistan parolası ilk açılışta kendiliğinden üretilir ve Docker'ın veri deposunda (birim) saklanır.

3. İlerlemeyi görmek isterseniz şunu yazın:

```sh
docker compose logs -f
```

4. Bekleyin. Günlükte "Building client + server" satırı ilk derlemedir. "Ready" ya da sağlık kontrolünün geçtiğini gösteren satırı görünce tarayıcıda `http://localhost:3001` adresini açın.

Sonraki adım Google bağlantısı kılavuzudur. Docker'da Google'a vereceğiniz iki yönlendirme adresi şunlardır:

- `http://localhost:3001/api/gsc/oauth/callback`
- `http://localhost:3001/api/ga4/oauth/callback`

### Güncelleme

Şu iki komutu yazın:

```sh
git pull
docker compose up -d --build
```

**Ayarlar → Hakkında** yeni sürümü haber verir ve bu iki komutu gösterir. Veriniz `seotracker_data` adlı veri deposunda kaldığı için güncelleme onu silmez.

### Durdurma ve kaldırma

- Durdurmak: `docker compose stop`
- Yeniden başlatmak: `docker compose up -d`
- Kutuyu kaldırıp veriyi tutmak: `docker compose down`
- Veriyi de silmek: `docker compose down -v`. Bu komut veritabanını, Google bağlantılarını ve raporları kalıcı olarak siler.

### Yedekleme

Veriniz `seotracker_data` deposunda, kutunun içindeki `/app/.wrangler` yolundadır. Yedek almak için üç komutu sırayla yazın:

```sh
docker compose stop
docker run --rm -v seotracker_data:/data -v "$PWD":/backup alpine tar czf /backup/seotracker-yedek.tgz -C /data .
docker compose up -d
```

Geri yüklerken aynı komutta `tar czf` yerine `tar xzf` kullanın. Veri deposundaki `instance-secret` dosyası Google bağlantılarını şifreleyen anahtardır. O olmayan yedek, Google bağlantıları olmadan açılır.

### Ayarlar (isteğe bağlı)

Hiçbir ayar zorunlu değildir. Değiştirmek isterseniz proje klasörüne bir `.env` dosyası koyun. Sonra `docker compose up -d --force-recreate seotracker` yazın.

| Ayar adı                               | Ne işe yarar                                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| PORT                                   | Adres numarası, varsayılan 3001. Değişince Google yönlendirme adresleri de değişir                             |
| ALLOWED_HOST                           | Başka bir sunucunun arkasındaysanız dışarıdan görünen ad. Boşsa yalnızca localhost                             |
| AUTH_MODE                              | `local_noauth` (varsayılan) ya da `cloudflare_access`                                                          |
| BETTER_AUTH_SECRET                     | Şifreleme anahtarı. Boş bırakın, uygulama üretir. Elle verirseniz en az 32 karakter olsun, sonra değiştirmeyin |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Ayarlar ekranına girmenin alternatifi. Ekrana girilen değer önceliklidir                                       |
| PAGESPEED_API_KEY                      | Ayarlar ekranına girmenin alternatifi                                                                          |
| MCP_TOKEN                              | Boşsa ilk açılışta üretilir. `off` yazarsanız parola istenmez. Başka değer olduğu gibi kullanılır              |

## Kontrol

- `docker compose ps` çıktısında durum **healthy** olmalı. İlk açılışta buna ulaşmak beş dakikaya kadar sürebilir.
- `curl http://127.0.0.1:3001/api/health` çıktısı "status":"ok" ile başlamalı.
- Tarayıcıda `http://localhost:3001` açılmalı. **Yardım** ekranındaki durum kartı "Her şey yolunda." demeli. Google bağlanmadan önce "Google girişi" satırı dikkat ister. Bu normaldir.

## Sık sorulanlar

**İlk açılış neden uzun?** Uygulama kutunun içinde derlenir, yaklaşık 7.400 parça. Sonraki açılışlarda derleme atlanır.

**`.env.example` dosyası nerede?** Yok. Üst projeden gelen o dosya bu sürümde olmayan şeyleri anlatıyordu. Tam liste yukarıdaki tabloda ve `docs/ENVIRONMENT.md` dosyasında.

**İnternete açabilir miyim?** Uygulama kimlik sormaz. Önüne kendi kimlik doğrulamanızı koymadan açmayın. `ALLOWED_HOST` ayarlarsanız uygulama sağlık kontrolünde sizi uyarır.

**Asistanımın parolasını nereden alırım?** Uygulamadaki **Ajan kurulumu** ekranı komutu gösterir: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Git Bash kullanıyorsanız başına `MSYS_NO_PATHCONV=1` ekleyin.

## Sorun çıkarsa

- **"Bind for 127.0.0.1:3001 failed" yazıyor.** Adres numarası dolu. Proje klasörüne `PORT=3002` satırlı bir `.env` koyun ve kutuyu yeniden oluşturun. Windows'ta Not Defteri dosyayı `.env.txt` diye kaydedebilir. PowerShell'de `Set-Content -Encoding ascii .env 'PORT=3002'` güvenlidir.
- **Durum "unhealthy".** `docker compose logs --tail 50` son satırları gösterir. Derleme sırasında bellek bittiyse Docker Desktop'a daha fazla bellek verin.
- **Google bağlantısı "yapılandırılmamış" diyor.** `BETTER_AUTH_SECRET` 32 karakterden kısaysa Google kapalı kalır. Elle verdiyseniz uzatın. Vermediyseniz veri deposundaki `instance-secret` dosyası bozulmuş olabilir.
- **Güncellemeden sonra Google bağlantısı koptu.** `BETTER_AUTH_SECRET` değişmiş ya da veri deposu yeniden oluşturulmuştur. Proje ayarlarında **Yeniden bağlan** deyin.

<!-- Kaynaklar: docs/SELF_HOSTING_DOCKER.md; docs/ENVIRONMENT.md; compose.yaml; docker-entrypoint.sh; src/lib/selfhost-preflight.ts; src/routes/_app/ai.tsx -->
