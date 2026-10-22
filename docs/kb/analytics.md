---
title: Analytics
description: Google Analytics 4 raporları organik arama için süzülmüş halde. Giriş sayfaları, trafik kaynakları, anahtar olaylar ve ölçümün sağlıklı olup olmadığı.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

Search Console, Google'da ne olduğunu söyler; Analytics, siteye gelen kişinin sonra ne yaptığını. Bu ekran Google Analytics 4 mülkünüzün yedi raporunu, varsayılan olarak yalnızca organik arama kanalına süzerek gösterir ve sekizinci bir sekmede ölçümün kendisini kontrol eder: etiket gerçekten çalışıyor mu, anahtar olay tanımlı mı? Ekranın adı menüde "Analytics", sayfa başlığı "Analytics raporları".

## Ekranda neler var

**Sekmeler.** **Giriş sayfaları**, **Sayfa performansı**, **Trafik kaynakları**, **Anahtar olaylar**, **E-ticaret**, **Site içi arama**, **Kitle dağılımı** ve **Ölçüm durumu**. Her sekmenin başlık altında tek cümlelik bir soru vardır; örneğin ölçüm durumu için "Analytics gerçekten ölçüyor mu? Mülkünüzün kurulum ayarlarını okur; rapor kotanızdan harcamaz."

**Kontroller.** **Dönem**: Son 7 gün, Son 28 gün, Son 3 ay. **Kanal**: Organik arama (varsayılan) ya da Tüm trafik. **Satır**: 50, 100, 200. Kitle sekmesinde kırılım **Cihaz**, **Ülke**, **Yeni / geri dönen**; trafik sekmesinde **Kanal grubu**, **Kaynak / ortam**, **Kampanya**. Seçimler adres çubuğuna yazılır.

**Organik oturumlar paneli.** Giriş sayfaları sekmesinde, tablonun üstünde: günlere dağılmış oturum çizgisi, **Oturum** ve **Etkileşim oranı** kartları, gelir ölçülüyorsa **Organik gelir**, hepsinde "… dönemine göre" değişim.

**Tablo.** Sütun adları rapora göre değişir: **Alan adı**, **Giriş sayfası**, **Sayfa**, **Olay**, **Kanal**, **Kaynak / ortam**, **Kampanya**, **Cihaz**, **Ülke**, **Yeni / geri dönen**, **Ürün**, **Arama terimi**; ölçüler **Oturum**, **Aktif kullanıcı**, **Etkileşimli oturum**, **Etkileşim oranı**, **Anahtar olay**, **Olay oranı**, **İşlem**, **Gelir**, **Görüntülenme**, **Etkileşim süresi**, **Arama sayısı**, **Satılan ürün**, **Ürün geliri**. Sütun başlıklarının yanındaki yardım ikonu tanımı açıklar; örneğin anahtar olay için "Sizin 'önemli' saydığınız hareket… Tanımlı değilse hep 0 görünür."

**Tablo altı satırı.** "{mülk} · {tarihler} · {n} / {toplam} satır". Google veriyi örneklediyse "örneklenmiş", gizlilik eşiği yüzünden satır sakladıysa "eşik altı satırlar gizlendi" eklenir.

**Çipler.** **Sadece organik**, **Etkileşimi düşük** (yüzde 50'nin altı), **Dönüşümü olan**, **Geliri olan**, **Etkileşim süresi düşük** (medyanın yarısından az), **Trafiği yüksek, dönüşümü düşük**.

**Özet kartları.** Anahtar olaylar sekmesinde "Anahtar olay", "Olay türü", "En çok tetiklenen", "Tetikleyen kullanıcı"; e-ticarette "Ürün geliri", "Satılan ürün", "Sepete eklenen", "Görüntülenen ürün"; site içi aramada "Arama", "Farklı terim", "En çok aranan", "Yalnızca bir kez aranan".

**Ölçüm durumu sekmesi.** Dört kart: **Web veri akışı**, **Anahtar olay**, **Özel boyut**, **Bulgu**. Olası bulgular: "Web veri akışı yok", "Gelişmiş ölçüm kapalı", "Site içi arama ölçülmüyor", "Anahtar olay tanımlı değil", "Envanter eksik olabilir". Gelişmiş ölçümün yedi anahtarı tek tek görünür: Kaydırma, Dış bağlantı, Site içi arama, Video, Dosya indirme, Form, Sayfa geçişleri. Her şey yerindeyse "Ölçüm kurulumunda eksik bulunamadı." yazar.

**Boş ve hata durumları.** "Bu dönemde anahtar olay kaydı yok", "Bu dönemde ürün verisi yok", "Bu dönemde site içi arama kaydı yok", "Bu dönemde veri yok" ve iki kısayol: **Tüm trafiğe bak**, **Ölçüm durumunu kontrol et**. Analytics bağlı değilse "Google Analytics bağlı değil".

## Nasıl kullanılır

1. İlk işiniz **Ölçüm durumu** sekmesi olsun. "Anahtar olay tanımlı değil" görüyorsanız diğer sekmelerdeki dönüşüm sütunları hep sıfır kalacaktır; önce Analytics'te bir anahtar olay tanımlayın.
2. **Giriş sayfaları** sekmesinde **Alan adı** sütununa bakın. Orada localhost ya da 127.0.0.1 görüyorsanız geliştirme ortamınız Analytics'e veri gönderiyor demektir; o satırlar gerçek ziyaret değildir ve uygulama bunu sizin yerinize uyarmaz.
3. Trafik düştü diyorsanız **Trafik kaynakları** sekmesini **Kanal grubu** kırılımıyla açın. Düşüş yalnızca organikteyse arama sorunudur; tüm kanallarda ise ölçüm ya da site sorunudur.
4. **Trafiği yüksek, dönüşümü düşük** çipi, Fırsatlar ekranında yapılacak işin karşılığıdır: Google gönderiyor, sayfa tutmuyor.
5. Ayda bir **Son 3 ay** dönemiyle **Giriş sayfaları** tablosunu CSV'ye alın; bir sonraki ay aynı dosyayla karşılaştırmak en dürüst kontrol yöntemidir.

## Sayılar nasıl hesaplanır

Pencere, mülkün kendi saat diliminde dünle biten N gündür; Analytics veriyi bir gün gecikmeli verir. "Organik arama" seçimi, oturum varsayılan kanal grubu "Organic Search" olan satırları alır. Giriş sayfaları raporu oturuma, sayfa performansı görüntülenmeye, e-ticaret ürün gelirine göre sıralanır; anahtar olaylar sekmesi yalnızca en az bir anahtar olayı olan satırları gösterir; site içi arama "(not set)" terimini dışarıda bırakır.

Her rapor en fazla 200 satır ister. "Örneklenmiş" ve "eşik altı satırlar gizlendi" notları Google'ın cevabındaki üst veriden gelir. Ölçüm durumu, Analytics Yönetim API'sini okur ve rapor kotasından harcamaz. Rapor kotası biterse "Google Analytics reporting quota is exhausted." hatası görürsünüz; kotalar Ayarlar'daki sınırlar bölümünde izlenir.

## Sık sorulanlar

**Oturum sayısı Search Console'daki tıklamadan neden farklı?** Farklı şeyler sayarlar. Search Console Google'daki tıklamayı, Analytics siteye gelen oturumu sayar; çerez onayı verilmeyen ziyaret Analytics'e hiç düşmez.

**Analytics'teki rakamla birebir aynı mı?** Aynı rapor, aynı mülk; ama dönem ve kanal süzgeci farklıysa tutmaz. Analytics'te de "Organic Search" kanalını ve aynı tarihleri seçin.

**Gelir sütunu yok.** Sitede e-ticaret olayları ölçülmüyorsa gelir hiç raporlanmaz; **Ölçüm durumu** sekmesine bakın.

**Satır sayısı 200'de kaldı.** Tek seferde en fazla 200 satır istenir. Daha uzun liste için dönemi kısaltın ya da kırılımı değiştirin.

**Kota neden bitti?** Google Analytics standart mülkte günde 200.000 ve saatte 40.000 belirteç verir; her rapor birkaç belirteç harcar. Yenile'ye art arda basmak kotayı eritir.

## Sınırlar

Analytics'in ölçmediğini bu ekran da gösteremez: çerez onayı verilmeyen ziyaretler, tanımlanmamış anahtar olaylar, kapalı gelişmiş ölçüm. Ekran localhost trafiğini otomatik ayıklamaz; Alan adı sütununa bakmak size kalır. Analytics ve Search Console farklı saat dilimlerinde raporlar, günlük eşleşmeler bir gün kayabilir.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
