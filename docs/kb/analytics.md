---
title: Analytics
description: Aramadan gelenlerin sitede ne yaptığını görürsünüz: Google Analytics 4 raporları, anahtar olaylar ve ölçümün sağlam çalışıp çalışmadığı.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

Siteye gelen kişilerin sonra ne yaptığını burada görürsünüz. Search Console size Google'da ne olduğunu anlatır. Analytics ise ziyaretçinin sitede ne yaptığını anlatır.

Google Analytics 4 hesabınızdaki yedi raporu görürsünüz. Ekran varsayılan olarak yalnızca aramadan gelenleri (organik arama) gösterir. Sekizinci sekme ölçümün kendisini denetler: sayaç çalışıyor mu, anahtar olay tanımlı mı.

## Ekranda neler var

**Sekmeler.** **Giriş sayfaları**, **Sayfa performansı**, **Trafik kaynakları**, **Anahtar olaylar**, **E-ticaret**, **Site içi arama**, **Kitle dağılımı** ve **Ölçüm durumu**. Her sekmenin altında kısa bir soru durur. Giriş sayfası, ziyaretçinin siteye ilk girdiği sayfadır. Anahtar olay, sizin önemli saydığınız harekettir.

**Kontroller.** **Dönem** için Son 7 gün, Son 28 gün ya da Son 3 ay seçilir. **Kanal** için Organik arama (varsayılan) ya da Tüm trafik seçilir. **Satır** 50, 100 ya da 200'dür. Kitle sekmesinde **Cihaz**, **Ülke** ve **Yeni / geri dönen** seçilir. Trafik sekmesinde **Kanal grubu**, **Kaynak / ortam** ve **Kampanya** seçilir. Seçimler adres çubuğuna yazılır.

**Organik oturumlar paneli.** Giriş sayfaları sekmesinde tablonun üstündedir. Oturum, bir ziyaretin tamamıdır. Panelde günlük oturum çizgisi, **Oturum** ve **Etkileşim oranı** kartları var. Gelir ölçülüyorsa **Organik gelir** de görünür. Hepsi önceki döneme göre değişimi de gösterir.

**Tablo.** Sütunlar rapora göre değişir. Örneğin **Alan adı**, **Giriş sayfası**, **Sayfa**, **Olay**, **Kanal**, **Cihaz**, **Ülke**, **Ürün**, **Arama terimi**. Ölçüler de şunlar: **Oturum**, **Aktif kullanıcı**, **Etkileşim oranı**, **Anahtar olay**, **Gelir**, **Görüntülenme**. Anahtar olay tanımlı değilse hep 0 görünür.

**Tablo altı satırı.** Kaç satır gösterildiğini yazar. Google veriyi örneklediyse "örneklenmiş", gizlilik nedeniyle satır sakladıysa "eşik altı satırlar gizlendi" eklenir.

**Hızlı filtreler.** **Sadece organik**, **Etkileşimi düşük** (yüzde 50'nin altı), **Dönüşümü olan**, **Geliri olan**, **Etkileşim süresi düşük**, **Trafiği yüksek, dönüşümü düşük**.

**Özet kartları.** Anahtar olaylar, e-ticaret ve site içi arama sekmelerinin kendi özet kartları vardır.

**Ölçüm durumu sekmesi.** Dört kart var: **Web veri akışı**, **Anahtar olay**, **Özel boyut**, **Bulgu**. Bulgu şunlardan biri olabilir: "Web veri akışı yok", "Gelişmiş ölçüm kapalı", "Site içi arama ölçülmüyor", "Anahtar olay tanımlı değil", "Envanter eksik olabilir". Gelişmiş ölçümün yedi seçeneği tek tek görünür: Kaydırma, Dış bağlantı, Site içi arama, Video, Dosya indirme, Form, Sayfa geçişleri. Sorun yoksa "Ölçüm kurulumunda eksik bulunamadı." yazar.

**Boş durumlar.** Veri yoksa "Bu dönemde veri yok" yazar ve iki kısayol çıkar: **Tüm trafiğe bak**, **Ölçüm durumunu kontrol et**. Analytics bağlı değilse "Google Analytics bağlı değil" yazar.

## Nasıl kullanılır

1. Önce **Ölçüm durumu** sekmesine bakın. "Anahtar olay tanımlı değil" yazıyorsa dönüşüm sütunları hep sıfır kalır. Önce Analytics'te bir anahtar olay tanımlayın.
2. **Giriş sayfaları** sekmesinde **Alan adı** sütununa bakın. localhost ya da 127.0.0.1 görürseniz, kendi bilgisayarınızdaki deneme sitesi veri gönderiyor demektir. O satırlar gerçek ziyaret değildir. Uygulama bunu sizin yerinize ayıklamaz.
3. Trafik düştüyse **Trafik kaynakları** sekmesini **Kanal grubu** ile açın. Düşüş yalnızca aramadaysa sorun aramadadır. Her kanalda düştüyse ölçümde ya da sitede sorun vardır.
4. **Trafiği yüksek, dönüşümü düşük** düğmesi, Google'ın ziyaretçi gönderdiği ama sayfanın onları tutamadığı yerleri gösterir. Yapılacak işi Fırsatlar ekranında bulursunuz.

## Sayılar nasıl hesaplanır

Aralık, hesabın saat diliminde dünle biter. Analytics veriyi bir gün geç verir. "Organik arama" seçiliyse yalnızca Google ya da başka bir arama motorundan gelen ziyaretler sayılır.

Her rapor en fazla 200 satır ister. Ölçüm durumu Analytics ayarlarını okur ve rapor kotasından harcamaz. Rapor kotası dolarsa "Google Analytics reporting quota is exhausted." (Analytics rapor hakkı doldu) hatasını görürsünüz. Kotanızı **Ayarlar** ekranındaki sınırlar bölümünden izlersiniz.

## Sık sorulanlar

**Oturum sayısı Search Console'daki tıklamadan neden farklı?** İkisi farklı şey sayar. Search Console Google'daki tıklamayı sayar. Analytics siteye gelen oturumu sayar. Çerez onayı vermeyen ziyaretçi Analytics'e hiç düşmez.

**Satır sayısı 200'de kaldı.** Tek seferde en fazla 200 satır istenir. Dönemi kısaltın ya da kırılımı değiştirin.

**Kota neden doldu?** Standart hesapta günde 200.000, saatte 40.000 belirteç (kota birimi) verilir. Her rapor birkaç belirteç harcar. **Yenile**'ye art arda basmak kotayı tüketir.

## Sınırlar

Analytics'in ölçmediğini bu ekran da gösteremez. Çerez onayı vermeyen ziyaretler, tanımsız anahtar olaylar ve kapalı gelişmiş ölçüm buna girer. Ekran localhost trafiğini kendiliğinden ayıklamaz. Analytics ve Search Console farklı saat dilimlerinde raporlar. Günlük eşleşmeler bir gün kayabilir.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
