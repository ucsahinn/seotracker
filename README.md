# seotracker

Kendi siteleriniz için, yalnızca ücretsiz veri kaynaklarıyla çalışan bir SEO
aracı. Kendi bilgisayarınızda Docker ile çalışır, hiçbir yere veri göndermez ve
hiçbir abonelik istemez.

[every-app/open-seo](https://github.com/every-app/open-seo) projesinden
türetilmiştir. Özgün proje ücretli bir veri sağlayıcısına (DataForSEO) dayanıyor;
bu çatal o bağımlılığın tamamını ve onunla gelen çok kullanıcılı altyapıyı
kaldırır.

> **Sürümler hakkında.** Yayında tek sürüm tutulur; güncel sürüm ve notlar
> [`CHANGELOG.md`](./CHANGELOG.md) dosyasında. `v0.0.1` – `v0.1.9`
> open-seo'nun etiketleriydi ve kaldırıldı.

## Ne yapar

- **Search Console performansı** — tıklama, gösterim, tıklama oranı ve ortalama
  sıra. "Eşiğe yakın" sekmesi, 5 ile 20 arasında sıradaki sorguları ayrı
  gösterir: en az emekle en çok kazanç oradadır.
- **Sıralama takibi** — Google verinizi 16 ay sonra siliyor. Bu araç günlük
  kayıtları yerelde tuttuğu için o sınırın ötesine geçer. Sıralama sayfası her
  açılışta eksik günleri kendiliğinden tamamlar; zamanlanmış bir göreve gerek
  yoktur.
- **Site denetimi** — kendi tarayıcısıyla sitenizi gezer ve 95 ayrı teknik SEO
  sorununu raporlar: kırık bağlantı, eksik başlık, yinelenen içerik, yönlendirme
  zinciri, yetim sayfa ve diğerleri.
- **Hız skorları** — denetim sırasında Google PageSpeed Insights ile taranan
  her sayfanın (başarılı HTML yanıtı veren) mobil ve masaüstü performans,
  erişilebilirlik ve SEO puanları. PageSpeed anahtarı tanımlı değilse Google'ın
  ortak kotası küçük olduğu için ilk 50 sayfayla sınırlanır. Laboratuvar
  skorlarının yanında, sitenizi gerçekten ziyaret eden Chrome kullanıcılarından
  gelen Çekirdek Web Verileri de gösterilir.
- **İndeksleme durumu** — Google'ın bu sayfaları gerçekten dizine alıp
  almadığı, URL Inspection API'den. Tarayıcı bir sayfanın dizine
  _girebileceğini_ söyler; bu, Google'ın ne yaptığını söyler. İkisi sandığınızdan
  daha sık ayrışır ve her ayrışma boşa çalışan bir sayfadır.
- **Çakışan sorgular** — aynı sorgu için kendi sayfalarınızın birbiriyle
  yarıştığı yerler. Search Console bunu göstermez: sorguları ve sayfaları ayrı
  listeler. İki boyutu birlikte isteyip gruplamak yeter.
- **Fırsatlar** — her sayfa gösterilir ve türüne göre ayrılır (tıklanmıyor,
  yaklaşmış, derinde); talebe, iş değerine ve ne kadar yakın olduklarına göre
  puanlanır. Search Console hangi sayfanın para kazandırdığını bilmez;
  Analytics ile birleştirince bilir.
- **Google Analytics 4** — organik trafik, açılış sayfaları, dönüşümler.
- **Denetim karşılaştırması** — bir haftadır tarama yapılmadıysa panel hatırlatır
  ve son iki denetimi karşılaştırıp yeni çıkan sorunları ayrı gösterir.
- **Raporlar** — yapay zeka ajanının yazdığı, kendi kendine yeten HTML belgeler.
- **MCP sunucusu** — Claude Code gibi ajanlar bu verinin tamamına MCP araçları
  üzerinden erişir. Ajanın göndermesi gereken şifre için
  [`docs/SELF_HOSTING_DOCKER.md`](./docs/SELF_HOSTING_DOCKER.md#mcp-kimlik-doğrulaması).

## Ne yapmaz

Rakip analizi, anahtar kelime hacmi, backlink profili ve üçüncü taraf sıralama
takibi yoktur. Bunların hepsi satın alınan veriye dayanıyordu.

## Kurulum

Gerekenler: Docker, bir Google hesabı ve depoyu indirmek için Git (Git
yoksa GitHub sayfasındaki **Code → Download ZIP** ile de olur). Ayrıntılar için
[`docs/SELF_HOSTING_DOCKER.md`](./docs/SELF_HOSTING_DOCKER.md).

```sh
git clone https://github.com/ucsahinn/seotracker.git
cd seotracker
docker compose up -d
```

Başka bir şey gerekmez: imaj bu depodan derlenir, veritabanı ilk açılışta
kurulur ve şifreleme anahtarı kendiliğinden üretilir. İlk açılış birkaç dakika
sürer. Uygulama `http://localhost:3001` adresinde açılır.

### Hızlı kurulum

Uygulama açıldıktan sonra kalan her şey (Google erişimi, PageSpeed anahtarı,
ilk proje, ajan bağlantısı) için **Ajan kurulumu** sayfasındaki **Kurulum
istemi**ni kopyalayıp kendi ajanınıza (Claude Code, Codex, Cursor...) yapıştırın;
adımları sırayla doğrular ve elle yapmanız gerekenleri söyler. Anahtarları
yalnızca uygulamanın Ayarlar ekranına girersiniz, sohbete değil.

### Açılmıyorsa

- Docker Desktop çalışıyor mu? Windows'ta tepsideki Docker simgesi "running"
  göstermeli.
- `docker compose ps` çalıştırın ve durum **healthy** olana kadar bekleyin; ilk
  açılış birkaç dakika sürebilir.
- Hâlâ açılmıyorsa son günlük satırlarına bakın: `docker compose logs --tail 50`
- `Bind for 127.0.0.1:3001 failed` gibi bir hata, portun başka bir program
  tarafından kullanıldığını gösterir. Proje klasöründe `PORT=3002` satırını içeren
  bir `.env` dosyası oluşturun. Windows'ta Not Defteri dosyayı sessizce
  `.env.txt` diye kaydedebilir; PowerShell ile oluşturmak güvenlidir:

  ```powershell
  Set-Content -Encoding ascii .env 'PORT=3002'
  ```

  Sonra konteyneri yeniden oluşturun ve `http://localhost:3002` adresini açın:

  ```sh
  docker compose up -d --force-recreate seotracker
  ```

  Port değişirse Google OAuth yönlendirme adresini de
  (`http://localhost:3002/api/gsc/oauth/callback`) Google Cloud Console'da
  güncelleyin.

Search Console ve Analytics bağlantısı için kendi Google OAuth istemcinizi
**Ayarlar → Google bağlantısı** bölümüne girin; ikisi de aynı istemciyi
kullanır. İstemciyi nereden alacağınız
[`docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md`](./docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md)
ve [`docs/SELF_HOSTING_GOOGLE_ANALYTICS.md`](./docs/SELF_HOSTING_GOOGLE_ANALYTICS.md)
dosyalarında.

Hız skorları için ücretsiz bir PageSpeed Insights anahtarı önerilir; anahtarı
**Ayarlar → Hız ölçümü** bölümüne yapıştırıp kaydedin, yeniden başlatma gerekmez:
[`docs/PAGESPEED_API_KEY.md`](./docs/PAGESPEED_API_KEY.md).

İsteğe bağlı ortam değişkenlerinin tam listesi:
[`docs/ENVIRONMENT.md`](./docs/ENVIRONMENT.md).

## Güncelleme

```sh
git pull
docker compose up -d --build
```

Depo klasöründe çalıştırın. Veritabanınız ve şifreleme anahtarınız
`seotracker_data` biriminde durur; güncelleme onu silmez, yeni göçler açılışta
kendiliğinden uygulanır. `--build` gerekir çünkü uygulama derlemesi imajın
içinde değil, konteyner açılışında yapılır — bu yüzden ilk açılış birkaç dakika
sürer.

**Ayarlar → Hakkında** bölümü günde bir kez GitHub'a bakıp yeni bir sürüm
yayımlanıp yayımlanmadığını söyler. Bu denetimi oradan kapatabilirsiniz; kapalı
olduğunda istek hiç kurulmaz.

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
