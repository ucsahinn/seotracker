# Docker ile kurulum

seotracker'ı kendi bilgisayarınızda çalıştırmanın yolu budur.

Uygulama kimlik doğrulaması yapmaz (`AUTH_MODE=local_noauth`, tek yönetici
`admin@localhost`) ve yalnızca `127.0.0.1` üzerinden dinler. İnternete açacaksanız
önüne kendi kimlik doğrulamanızı, bir ters vekil sunucu ya da tünel koyun.

## Gerekenler

- Docker Desktop, ya da Docker Engine ile Docker Compose
- Bir Google hesabı (Search Console ve Analytics bağlantısı için)

## Hızlı başlangıç

```sh
docker compose up -d
```

Hepsi bu. `.env` dosyası gerekmiyor: compose onu isteğe bağlı okur ve token
şifreleme anahtarı ilk açılışta kendiliğinden üretilir.

> **`.env.example`'ı kopyalamayın.** O dosya hâlâ upstream projeye ait ve
> DataForSEO, Postgres, barındırılan kimlik doğrulama gibi bu çatalda var
> olmayan şeyleri anlatıyor; içindeki `OPEN_SEO_IMAGE` değişkeni de artık
> okunmuyor. Bu sayfadaki değişkenler, gerçekten okunanların tamamı.

`http://localhost:3001` adresini açın. İlk başlatma uygulamayı konteyner içinde
derler ve birkaç dakika sürebilir (sağlık kontrolü 5 dakikaya kadar bekler);
ilerlemeyi `docker compose logs -f` ile izleyin.

## Ayarlar arayüzde, `.env` isteğe bağlı

Google bağlantısı için hiçbir ortam değişkeni gerekmez. Uygulamayı açın,
**Ayarlar → Google bağlantısı** bölümüne Google Cloud Console'dan aldığınız
istemci kimliğini ve gizli anahtarı yapıştırın. Gizli anahtar sunucuda
şifrelenerek veritabanına yazılır; konteyneri yeniden oluşturmanız gerekmez.

Token'ları şifreleyen anahtarı konteyner ilk açılışta kendisi üretir ve veri
biriminde (`/app/.wrangler/instance-secret`) saklar. Siz bir şey yazmazsınız.

## Ortam değişkenleri

Hepsi isteğe bağlıdır.

| Değişken                                   | Ne için                                                                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PAGESPEED_API_KEY`                        | Denetimdeki hız ölçümü. Önerilir. Bkz. `PAGESPEED_API_KEY.md`                                                                                                                                                      |
| `PORT`                                     | Varsayılan `3001`                                                                                                                                                                                                  |
| `ALLOWED_HOST`                             | Ters vekil sunucu arkasındaysanız dışarıdan görünen tek konak adı                                                                                                                                                  |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | OAuth istemcisini arayüz yerine dışarıdan vermek isterseniz. Ayarlar'a kaydedilen değer bunları geçersiz kılar                                                                                                     |
| `BETTER_AUTH_SECRET`                       | Token şifreleme anahtarını kendiniz yönetmek isterseniz; **en az 32 karakter**. Verdiğinizde kalıcı olarak saklayın: anahtar değişirse kayıtlı Google bağlantısı okunamaz                                          |
| `MCP_TOKEN`                                | `/mcp` için paylaşılan sır. Boş bırakılırsa uçnokta kimlik doğrulaması istemez — 127.0.0.1'e bağlı tek kullanıcılı bir kurulumda doğrusu budur. Ayarlarsanız istemci `Authorization: Bearer <token>` göndermelidir |
| `AUTH_MODE`                                | `local_noauth` (varsayılan) ya da `cloudflare_access`. İkincisi `TEAM_DOMAIN` + `POLICY_AUD` ister                                                                                                                 |

### `/mcp` kimlik doğrulaması

Uygulama 127.0.0.1'e bağlanır ve MCP işleyicisi tarayıcıdan gelen çapraz-site
isteklerini reddeder, yani varsayılan kurulumda uçnoktaya dışarıdan erişilemez.
Kapsamadığı durum, **aynı makinedeki başka bir süreç**: yan bir konteyner ya da
birinin buraya yönlendirdiği bir ajan, altısı yazan ve biri Google kotası
harcayan 28 aracı çalıştırabilir. Bunu kapatmak isterseniz:

```sh
# .env dosyanıza
MCP_TOKEN=$(openssl rand -hex 32)
```

Sonra istemcinizi başlığı gönderecek şekilde güncelleyin; Claude Code için:

```sh
claude mcp add --transport http --scope user seotracker http://localhost:3001/mcp   --header "Authorization: Bearer <token>"
```

Token'ı ayarlayıp istemciyi güncellemezseniz bağlantı 401 döner.

`.env` dosyasını değiştirdiğinizde konteyner yeniden **oluşturulmalıdır**. Düz
`up -d` değişikliği uygulamaz:

```sh
docker compose up -d --force-recreate seotracker
```

## İmaj nereden geliyor

Hiçbir yerden indirilmiyor. Bu çatalın yayınlanmış bir imajı yok; ilk
`docker compose up -d` komutu imajı bu depodan (`Dockerfile.selfhost`) derler ve
`seotracker:local` adıyla saklar.

Süreler konusunda net olmak gerekirse: uygulamanın kendi derlemesi imajda
değil, konteyner ilk açıldığında yapılıyor ve sonucu konteynerin içinde
tutuluyor. Bu yüzden **durdurup başlatmak** saniyeler sürer (derleme yeniden
kullanılır), ama konteyneri **yeniden oluşturan** her komut -- `--build`,
`--force-recreate`, `down` sonrası `up` -- derlemeyi sıfırdan yaptırır ve
birkaç dakika sürer. Günlükte hangisinin olduğu yazar: "Reusing existing
build" ya da "Building client + server".

Depodaki kodu değiştirdiyseniz yeniden derletin:

```sh
docker compose up -d --build
```

## Sık kullanılan komutlar

```sh
docker compose logs -f     # canlı günlük
docker compose ps          # durum ve sağlık
docker compose down        # durdur
```

## Sağlık ve sorun giderme

Açılış denetimi, yavaş adımlardan **önce** ortamı doğrular ve her kontrolü tek
satır olarak yazar. Uygulama ayağa kalktıktan sonra `/api/health` aynı
kontrolleri ve veritabanı durumunu döndürür; `docker compose ps` konteynerin
sağlığını gösterir.

Compose'un hangi değerleri gördüğünü görmek için:

```sh
docker compose config
```

## Veriler nerede duruyor

Her şey `seotracker_data` adlı Docker biriminde, konteynerin `/app/.wrangler`
dizininde: veritabanı, kaydedilmiş denetimler ve Lighthouse yükleri. Konteyneri
silmek veriyi silmez; birimi silmek siler.

## Zamanlanmış görevler

Docker modunda zamanlanmış görevler tetiklenmez. Denetimleri arayüzden
başlatırsınız.
