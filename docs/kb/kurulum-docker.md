---
title: Docker ile kurulum
description: Mac, Linux ve Windows'ta Docker Compose ile kurma. Tek komut, .env gerekmez; veri bir Docker biriminde durur.
kind: nasil-yapilir
updated: 2026-10-22
---

Bu sayfanın sonunda uygulama bir Docker konteynerinde çalışıyor ve tarayıcıda http://localhost:3001 adresinde açık olacak. Windows kullanıyorsanız ve Docker kurulu değilse tek dosyalık Windows kurulumu çok daha kolaydır; bu sayfa Mac, Linux ve zaten Docker kullananlar içindir. İlk açılış, uygulama konteyner içinde derlendiği için birkaç dakika sürer; sonrakiler saniyeler.

## Gerekenler

- Docker Desktop (Mac, Windows) ya da Docker Engine ile Docker Compose (Linux).
- Depoyu indirmek için Git; yoksa GitHub sayfasındaki **Code → Download ZIP** de olur.
- Yaklaşık 2 GB boş disk (imaj ve bağımlılıklar için) ve ilk derleme sırasında 2 GB boş bellek.

## Adımlar

1. Depoyu alın ve klasöre girin:

```sh
git clone https://github.com/ucsahinn/seotracker.git
cd seotracker
```

2. Başlatın:

```sh
docker compose up -d
```

Hepsi bu. .env dosyası gerekmez; şifreleme anahtarı ve yapay zekâ bağlantı parolası ilk açılışta kendiliğinden üretilir ve Docker biriminde saklanır.

3. İlerlemeyi izlemek isterseniz:

```sh
docker compose logs -f
```

Günlükte "Building client + server" satırını görürsünüz; bu ilk derlemedir. "Ready" ya da sağlık kontrolünün geçtiğini gösteren satırdan sonra tarayıcıda **http://localhost:3001** adresini açın.

4. Sonraki adım Google bağlantısı: Google bağlantısı kılavuzuna geçin. Docker'da Google yönlendirme adresleri **http://localhost:3001/api/gsc/oauth/callback** ve **http://localhost:3001/api/ga4/oauth/callback** olur.

### Güncelleme

```sh
git pull
docker compose up -d --build
```

Uygulama içindeki **Ayarlar → Hakkında** yeni sürümü haber verir ve bu iki komutu kopyalamanız için gösterir. Veriniz **seotracker_data** adlı Docker biriminde kaldığı için güncelleme silmez.

### Durdurma ve kaldırma

Durdurmak: `docker compose stop`. Yeniden başlatmak: `docker compose up -d`. Konteyneri kaldırıp veriyi tutmak: `docker compose down`. Veriyi de silmek: `docker compose down -v` (bu, veritabanını, Google bağlantılarını ve raporları kalıcı olarak siler).

### Yedekleme

Veri **seotracker_data** biriminde, konteyner içindeki **/app/.wrangler** yolundadır. Yedek almak için konteyneri durdurup birimi bir arşive kopyalayın:

```sh
docker compose stop
docker run --rm -v seotracker_data:/data -v "$PWD":/backup alpine tar czf /backup/seotracker-yedek.tgz -C /data .
docker compose up -d
```

Geri yüklerken aynı komutun tar xzf halini kullanın. Birimdeki **instance-secret** dosyası Google token'larını şifreleyen anahtardır; onsuz yedek, Google bağlantıları olmadan açılır.

### Ayarlar (isteğe bağlı)

Hiçbir ortam değişkeni zorunlu değildir. Değiştirmek isterseniz proje klasörüne bir .env dosyası koyun ve `docker compose up -d --force-recreate seotracker` deyin.

| Değişken                               | Ne için                                                                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| PORT                                   | Varsayılan 3001. Değiştirince Google yönlendirme adresleri de değişir                                                            |
| ALLOWED_HOST                           | Ters vekil sunucu arkasındaysanız dışarıdan görünen konak adı; boşsa yalnızca localhost                                          |
| AUTH_MODE                              | local_noauth (varsayılan) ya da cloudflare_access                                                                                |
| BETTER_AUTH_SECRET                     | Token şifreleme anahtarı; boş bırakın, uygulama üretir. Elle verirseniz en az 32 karakter olmalı ve bir daha değiştirmemelisiniz |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Ayarlar ekranından girmenin alternatifi; ekrana girilen değer önceliklidir                                                       |
| PAGESPEED_API_KEY                      | Ayarlar ekranından girmenin alternatifi                                                                                          |
| MCP_TOKEN                              | Boş: ilk açılışta üretilir. "off": parola istenmez. Başka bir değer: olduğu gibi kullanılır                                      |

## Kontrol

- `docker compose ps` çıktısında durum **healthy** olmalı; ilk açılışta buna ulaşmak beş dakikaya kadar sürebilir.
- `curl http://127.0.0.1:3001/api/health` çıktısı "status":"ok" ile başlamalı.
- Tarayıcıda http://localhost:3001 açılmalı ve **Yardım** ekranındaki durum kartı "Her şey yolunda." demeli (Google bağlanmadan önce "Google girişi" satırı dikkat ister, normaldir).

## Sık sorulanlar

**Neden ilk açılış bu kadar uzun?** Uygulama konteyner içinde derleniyor; yaklaşık 7.400 modül. Sonraki açılışlarda derleme atlanır.

**.env.example nerede?** Yok. Üst projeden gelen o dosya bu sürümde olmayan şeyleri anlatıyordu; tam liste yukarıdaki tabloda ve docs/ENVIRONMENT.md dosyasında.

**İnternete açabilir miyim?** Uygulama kimlik doğrulaması yapmaz; önüne kendi kimlik doğrulamanızı, bir ters vekil ya da tünel koymadan açmayın. ALLOWED_HOST'u ayarlayınca uygulama bunu sağlık kontrolünde uyarır.

**Yapay zekâ asistanımın parolasını nereden alırım?** Uygulamanın **Ajan kurulumu** ekranı komutu gösterir: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Git Bash kullanıyorsanız başına MSYS_NO_PATHCONV=1 ekleyin.

## Sorun çıkarsa

- **"Bind for 127.0.0.1:3001 failed"**: port dolu. Proje klasörüne PORT=3002 satırlı bir .env koyun ve konteyneri yeniden oluşturun. Windows'ta Not Defteri dosyayı .env.txt diye kaydedebilir; PowerShell ile `Set-Content -Encoding ascii .env 'PORT=3002'` güvenlidir.
- **Durum "unhealthy"**: `docker compose logs --tail 50` son satırları gösterir. Derleme sırasında bellek bittiyse Docker Desktop'a daha fazla bellek verin.
- **Google bağlantısı "yapılandırılmamış" diyor**: BETTER_AUTH_SECRET 32 karakterden kısaysa Google kapalı kalır. Elle verdiyseniz uzatın; vermediyseniz birimdeki instance-secret dosyasının bozulup bozulmadığına bakın.
- **Güncellemeden sonra Google bağlantısı koptu**: BETTER_AUTH_SECRET değişmiş ya da birim yeniden oluşturulmuştur. Proje ayarlarından **Yeniden bağlan** deyin.

<!-- Kaynaklar: docs/SELF_HOSTING_DOCKER.md; docs/ENVIRONMENT.md; compose.yaml; docker-entrypoint.sh; src/lib/selfhost-preflight.ts; src/routes/_app/ai.tsx -->
