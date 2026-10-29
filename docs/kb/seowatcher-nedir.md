---
title: seowatcher nedir?
description: seowatcher; Search Console, GA4, site denetimi ve PageSpeed verisini bilgisayarınızda tek panelde toplayan ücretsiz, açık kaynaklı SEO uygulamasıdır.
kind: kavram
updated: 2026-10-29
---

seowatcher, Google Search Console, Google Analytics 4, kendi site tarayıcısı ve PageSpeed Insights verisini tek panelde gösteren ücretsiz, MIT lisanslı, açık kaynaklı bir SEO uygulamasıdır. Bulutta değil, kendi bilgisayarınızda çalışır: Windows 10 ve 11'e tek dosyayla kurulur, Mac ve Linux'ta Docker ile çalışır. GitHub'daki adı seotracker'dır; ikisi aynı uygulamadır.

## Kısa bilgiler

| Soru                  | Cevap                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| Fiyat                 | Ücretsiz. Abonelik, hesap ve kart bilgisi yok                                                    |
| Lisans                | MIT lisanslı açık kaynak, kodun tamamı GitHub'da                                                 |
| Platform              | Windows 10/11 (64 bit) kurulum dosyası; Mac ve Linux'ta Docker                                   |
| Veri kaynakları       | Google Search Console, Google Analytics 4, uygulamanın kendi site tarayıcısı, PageSpeed Insights |
| Site denetimi         | 202 kural                                                                                        |
| Yapay zekâ bağlantısı | MCP ile Claude Code, Codex, Cursor ve Gemini CLI gibi asistanlar; 6 hazır görev                  |
| Arayüz dili           | Türkçe, İngilizce, Almanca, Fransızca, İtalyanca, Portekizce                                     |
| Kullanıcı             | Tek kullanıcı, yalnızca kendi bilgisayarınızdan açılır                                           |
| Veri nerede           | Windows'ta `%LOCALAPPDATA%\seowatcher`, Docker'da `seotracker_data` birimi                       |
| Sürüm                 | 0.8.6 Alpha, 29 Ekim 2026                                                                        |
| Boyut                 | Kurulum dosyası 86 MB, kurulu hali 313 MB                                                        |
| Temel aldığı proje    | open-seo (every-app)                                                                             |

## seowatcher ne yapar?

- **Arama performansı:** Search Console'daki tıklama, gösterim, tıklama oranı ve ortalama sırayı sorguya, sayfaya, ülkeye ve cihaza göre gösterir. Google 16 ay geriye veri verir; uygulama kendi arşivini de biriktirir.
- **Fırsatlar:** Google'da görünen sayfalarınızı, sitenizin kendi tıklama oranına göre ne kadar ek tıklama getirebileceklerine göre sıralar ve her sayfa için yapılacak işi önerir.
- **Site denetimi:** Sitenizi 202 kurala göre tarar: kırık bağlantılar, eksik ya da uzun başlıklar, yavaş sayfalar, dizine alınmayan sayfalar. Her bulgunun altında ne yapacağınız yazar.
- **Dizin durumu:** Google'ın her sayfanız için tuttuğu kaydı (dizinde mi, değilse neden, en son ne zaman tarandı) URL Denetimi ile okur. Google bunu mülk başına günde 2.000 adresle sınırlar.
- **Analytics:** GA4'teki ziyaret, etkileşim ve anahtar etkinlikleri arama verisinin yanında gösterir.
- **Raporlar:** Tek dosyalık HTML raporlar kaydeder; telefonda açılır, yazdırılır, e-postayla gönderilir.
- **Yapay zekâ asistanı:** MCP bağlantısıyla asistanınız sayılarınızı okur, denetimi çalıştırır ve rapor yazar.

## seowatcher ne yapmaz?

- Arama hacmi tahmin etmez. Gösterim sayısı Google'dan gelir, arama hacmi değildir.
- Size bağlantı veren siteleri (backlink) saymaz.
- Rakiplerin sıralamasını izlemez; yalnızca projelerinize eklediğiniz siteleri okur.
- Bulutta çalışan bir hizmet değildir; ekip hesabı ve çok kullanıcılı erişim yoktur.
- Ayrı bir mobil uygulaması ve tarayıcı eklentisi henüz yoktur.

## Search Console'dan farkı ne?

Search Console verinin kaynağıdır; seowatcher bu veriyi okur ve üzerine iş listesi kurar. Search Console size sayıları gösterir; seowatcher hangi sayfaya önce bakacağınızı, sitenizin 202 kurala göre nerede bozuk olduğunu ve Analytics'teki karşılığını aynı yerde gösterir. Arşivi bilgisayarınızda biriktirdiği için zamanla Google'ın 16 aylık penceresinden eski tarihlere de bakabilirsiniz. Sayılar aynı kaynaktan gelir, ancak Google veriyi yaklaşık üç gün geriden verir ve çok az aranan sorguları gizler; sayfa toplamıyla site toplamının farklı çıkması bu yüzdendir.

## Ücretli SEO araçlarından farkı ne?

Ücretli SEO araçları kendi taramalarından ve satın aldıkları veriden arama hacmi, backlink ve rakip sıralaması tahmini satar. seowatcher bunları yapmaz; yalnızca Google'ın sitenizin sahibi olarak size zaten verdiği veriyi ve kendi taramasını kullanır. Bu yüzden ücretsizdir, ama pazar araştırması için tasarlanmamıştır. Kendi sitenizin Google'daki durumunu izlemek, düzeltmek ve raporlamak istiyorsanız uygundur.

## Kimler için?

Kendi sitesinin ya da müşteri sitelerinin Search Console ve GA4 verisini tek yerde görmek isteyen site sahipleri, içerik ekipleri ve serbest çalışan SEO uzmanları için. Her proje kendi Google mülklerini, denetimlerini ve raporlarını ayrı tutar.

## Sık sorulan sorular

### Gerçekten ücretsiz mi?

Evet. MIT lisanslı, açık kaynak bir projedir. Kullandığı Google servisleri de ücretsiz kullanım sınırları içinde kalır.

### Verilerim nerede duruyor?

Windows'ta `%LOCALAPPDATA%\seowatcher` klasöründe: veritabanı, Google erişim anahtarınız ve günlükler orada durur. Uygulamayı kaldırmak bu klasöre dokunmaz. Docker'da veri `seotracker_data` biriminde durur.

### Uygulama hangi bağlantıları kurar?

Google (Search Console, Analytics, PageSpeed), denetlediğiniz site ve sürüm kontrolü için GitHub. Yapay zekâ asistanı bağlarsanız asistanın okuduğu veri o asistanın sağlayıcısına gidebilir; bu bağlantı isteğe bağlıdır.

### Mac ya da Linux'ta çalışır mı?

Evet, Docker ile. Windows'ta tek dosyalık kurulum daha kolaydır.

### Neden Google Cloud'da bir erişim anahtarı oluşturmam gerekiyor?

seowatcher bulut hizmeti değildir; bilgisayarınızda çalışır ve doğrudan Google'a bağlanır. Google bağlanan uygulamanın kime ait olduğunu bilmek ister. Bunu bir kez yaparsınız.

### Uygulamayı internete açmam gerekir mi?

Hayır. Uygulama yalnızca kendi bilgisayarınızdan açılır.

## Nereden başlamalı?

1. [Windows'a kurulum](/docs/kurulum-windows/) ya da [Docker ile kurulum](/docs/kurulum-docker/).
2. [Google'a bağlanma](/docs/google-baglantisi/).
3. İsterseniz [PageSpeed anahtarı](/docs/pagespeed-anahtari/) ve [ajan kurulumu](/docs/ajan-kurulumu/).

<!-- Kaynaklar: scripts/site-home.tr.html (Kısaca, Sorular, Neler yapar); docs/kb/kurulum-windows.md; docs/kb/kurulum-docker.md; docs/kb/dizin-durumu.md; src/shared/i18n.ts (LOCALES); package.json (version) -->
