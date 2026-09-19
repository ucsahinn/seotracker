# seotracker

Kendi siteleriniz için, yalnızca ücretsiz veri kaynaklarıyla çalışan bir SEO
aracı. Kendi bilgisayarınızda Docker ile çalışır, hiçbir yere veri göndermez ve
hiçbir abonelik istemez.

[every-app/open-seo](https://github.com/every-app/open-seo) projesinden
türetilmiştir. Özgün proje ücretli bir veri sağlayıcısına (DataForSEO) dayanıyor;
bu çatal o bağımlılığın tamamını ve onunla gelen çok kullanıcılı altyapıyı
kaldırır.

## Ne yapar

- **Search Console performansı** — tıklama, gösterim, tıklama oranı ve ortalama
  sıra. "Eşiğe yakın" sekmesi, 5 ile 20 arasında sıradaki sorguları ayrı
  gösterir: en az emekle en çok kazanç oradadır.
- **Sıralama takibi** — Google verinizi 16 ay sonra siliyor. Bu araç günlük
  kayıtları yerelde tuttuğu için o sınırın ötesine geçer. Sıralama sayfası her
  açılışta eksik günleri kendiliğinden tamamlar; zamanlanmış bir göreve gerek
  yoktur.
- **Site denetimi** — kendi tarayıcısıyla sitenizi gezer ve 28 ayrı teknik SEO
  sorununu raporlar: kırık bağlantı, eksik başlık, yinelenen içerik, yönlendirme
  zinciri, yetim sayfa ve diğerleri.
- **Hız skorları** — denetim sırasında Google PageSpeed Insights ile örnek
  sayfaların performans, erişilebilirlik ve SEO puanları. Laboratuvar
  skorlarının yanında, sitenizi gerçekten ziyaret eden Chrome kullanıcılarından
  gelen Çekirdek Web Verileri de gösterilir.
- **Google Analytics 4** — organik trafik, açılış sayfaları, dönüşümler.
- **Denetim karşılaştırması** — bir haftadır tarama yapılmadıysa panel hatırlatır
  ve son iki denetimi karşılaştırıp yeni çıkan sorunları ayrı gösterir.
- **Raporlar** — yapay zeka ajanının yazdığı, kendi kendine yeten HTML belgeler.
- **MCP sunucusu** — Claude Code gibi ajanlar bu verinin tamamına 28 araç
  üzerinden erişir.

## Ne yapmaz

Rakip analizi, anahtar kelime hacmi, backlink profili ve üçüncü taraf sıralama
takibi yoktur. Bunların hepsi satın alınan veriye dayanıyordu.

## Kurulum

Gerekenler: Docker ve bir Google hesabı. Ayrıntılar için
[`docs/SELF_HOSTING_DOCKER.md`](./docs/SELF_HOSTING_DOCKER.md).

```sh
docker compose up -d
```

Başka bir şey gerekmez: imaj bu depodan derlenir, veritabanı ilk açılışta
kurulur ve şifreleme anahtarı kendiliğinden üretilir. İlk açılış birkaç dakika
sürer. Uygulama `http://localhost:3001` adresinde açılır.

Search Console ve Analytics bağlantısı için kendi Google OAuth istemcinizi
**Ayarlar → Google bağlantısı** bölümüne girin; ikisi de aynı istemciyi
kullanır. İstemciyi nereden alacağınız
[`docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md`](./docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md)
ve [`docs/SELF_HOSTING_GOOGLE_ANALYTICS.md`](./docs/SELF_HOSTING_GOOGLE_ANALYTICS.md)
dosyalarında.

Hız skorları için ücretsiz bir PageSpeed Insights anahtarı önerilir; bu hâlâ bir
ortam değişkeni: [`docs/PAGESPEED_API_KEY.md`](./docs/PAGESPEED_API_KEY.md).

## Güvenlik

Uygulama kimlik doğrulaması yapmaz (`AUTH_MODE=local_noauth`) ve yalnızca
`127.0.0.1` üzerinden dinler. İnternete açacaksanız önüne kendi kimlik
doğrulamanızı koyun.

## Geliştirme

[`docs/LOCAL_DEVELOPMENT.md`](./docs/LOCAL_DEVELOPMENT.md).

Çalışan bir kurulumu uçtan uca sınamak için:

```sh
pnpm run verify:local            # http://localhost:3001
pnpm run verify:local http://127.0.0.1:3002
```

Betik sağlık ucunu, MCP araç listesini ve gerçek bir site denetimini sırayla
kontrol eder. Birim testlerinin yakalayamadığı şeyleri yakalar: eksik bir göç,
bozuk bir binding, açılmayan bir rota.

## Lisans

MIT. Telif hakkı özgün proje için Ben Senescu'ya aittir; lisans metni
[`LICENSE`](./LICENSE) dosyasında korunmuştur.
