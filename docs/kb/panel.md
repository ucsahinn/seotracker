---
title: Panel
description: Projeyi açınca gördüğünüz ilk ekran. Son 28 günün arama sayıları, son denetimin özeti ve sıradaki adımlar tek yerde.
screen: Panel
route: /p/<proje>
updated: 2026-10-22
---

Panel, bir projeyi açtığınızda karşınıza çıkan ilk ekrandır. İki soruya cevap verir: Google'da bu hafta nasıl gidiyorum ve şimdi ne yapmalıyım? Sayılar Search Console'dan, denetim özeti uygulamanın kendi taramasından, trafik kartı Google Analytics'ten gelir. Sayfanın üstündeki **Yenile** düğmesi hepsini yeniden çeker; **Denetimi başlat** düğmesi sizi doğrudan denetim ekranına götürür.

## Ekranda neler var

**Dört sayı kartı.** **Tıklama**, **Gösterim**, **Tıklama oranı** ve **Ortalama sıra**. Hepsi son 28 günü gösterir, altında "Son 28 gün" yazar. Her kartın yanında önceki 28 güne göre değişim oku vardır. Ortalama sıra kartında "küçük olan iyidir; 1, en üst sıra" notu durur, çünkü burada düşüş iyi haberdir ve ok ona göre renklenir. Search Console bağlı değilse kartlarda sayı yerine "Search Console'u bağlayın" yazar; dönemde hiç gösterim yoksa "Bu dönemde gösterim yok" görürsünüz.

**Sıradaki adımlar.** Uygulamanın size önerdiği en fazla üç iş. Sıra şöyle: Search Console bağlı değilse **Search Console'u bağla**; hiç denetim yoksa ya da son denetim yedi günden eskiyse **Denetimi başlat**; kritik sorun varsa **Kritik sorunları gör**; sonra **Fırsatları aç** ve uyarı sayısına göre **Uyarıları gör**. Liste, o anki duruma göre değişir; iş bitince madde kaybolur.

**Son denetimde yeni çıkanlar ve Düzelenler.** Son iki denetimi karşılaştırır: hangi sorun türü kaç sayfada yeni ortaya çıktı, hangisi azaldı. "Son denetimin üzerinden N gün" satırı denetimin yaşını söyler. Düzelen bir şey yoksa "Düzelen sorun yok." yazar.

**Tıklama eğilimi.** Son 28 günün günlük tıklama çizgisi. Üstünde "tıklama, son 28 gün" toplamı ve "önceki döneme göre" değişim. Dörtten az günün verisi varsa grafik çizilmez. **Sorguları aç** bağlantısı sizi Arama performansı ekranına götürür.

**Sıra 5-20 arası sorgular.** Google'da 5 ile 20. sıra arasında çıkan, yani bir itişle ilk sayfaya ya da üst sıralara taşınabilecek sorguların ilk dördü. Henüz böyle sorgu yoksa "Şu an 5. ile 20. sıra arasında yer alan sorgu yok" yazar. **Tümünü gör** tam listeyi açar.

**Site denetimi kartı.** Son denetimin özeti: kaç sayfa tarandı, ne zaman, en çok görülen üç sorun türü ve en çok sorunu olan beş sayfa. Denetim sürerken "Denetim sürüyor, sonuçlar bittiğinde görünecek." görürsünüz; kart beş saniyede bir kendini yeniler. Hiç sorun yoksa "Sorun bulunamadı, siteniz sağlıklı görünüyor." yazar. Önem düzeylerinin yanındaki küçük yardım ikonu üç seviyeyi açıklar: kritik "aramada görünürlüğü doğrudan bozan sorunlar", uyarı "sıralamayı zamanla aşındıran, ama acil olmayan sorunlar", bilgi "fırsat niteliğinde küçük iyileştirmeler".

**Organik trafik kartı.** Google Analytics bağlıysa görünür. **Oturum**, **Aktif kullanıcı**, **Etkileşim oranı** ve **Anahtar olay** sayılarını yalnızca organik arama kanalı için verir. Sitede satış ölçülüyorsa **Organik gelir** ve **Sipariş** kartları da eklenir. **Raporlar** bağlantısı Analytics ekranına, **Yönet** bağlantısı proje ayarlarına gider.

## Nasıl kullanılır

1. Haftada bir açın, dört kartın yanındaki oklara bakın. Tıklama ve gösterim düşmüşse önce Search Console'un üç günlük gecikmesini aklınıza getirin; son günler henüz eksiktir.
2. **Sıradaki adımlar** kutusundaki ilk maddeyi yapın. Kutu boşsa o hafta yapılacak acil bir şey yoktur.
3. Son denetim yedi günden eskiyse **Denetimi başlat** ile yeni bir tarama açın. Sonuç gelince "Son denetimde yeni çıkanlar" bölümü hangi sorunun yeni olduğunu söyler.
4. **Sıra 5-20 arası sorgular** kartındaki sorgulara tıklayıp o sayfanın başlığını ve açıklamasını gözden geçirin; en ucuz kazanç genellikle oradadır.

## Sayılar nasıl hesaplanır

Dört kart tek bir Search Console raporundan gelir. Pencere bugünden üç gün geriye kadar olan 28 gündür; Google veriyi üç gün gecikmeli verdiği için aralık bugünde bitmez. Önceki dönem, aynı uzunlukta ve bu pencerenin hemen öncesidir. Değişim, (bu dönem eksi önceki dönem) bölü önceki dönem olarak hesaplanır; önceki dönem sıfırsa ok gösterilmez.

Tıklama ve gösterim toplamdır. Tıklama oranı, tıklamanın gösterime bölümüdür. Ortalama sıra, gösterimle ağırlıklandırılmış ortalamadır: çok gösterim alan sorgular ortalamayı daha çok etkiler. Bu dört sayı tarih boyutundan toplandığı için gerçek site toplamıdır. Buna karşılık Arama performansı ekranındaki sorgu ya da sayfa tablosunun satırlarını toplamak site toplamını vermez; Google aynı aramada çıkan her sayfayı ayrı sayar.

Organik trafik kartı, Google Analytics'te "Organic Search" kanal grubunu süzer ve mülkün saat diliminde dünle biten 28 günü alır. Analytics verisi bir gün gecikmeli gelir.

## Sık sorulanlar

**Bugünün verisi neden yok?** Search Console son üç günü henüz vermez. Panel bu yüzden pencereyi üç gün geriden bitirir; eksik değil, Google'ın çalışma biçimi böyle.

**Ortalama sıra arttı, bu iyi mi?** Hayır. Sıra bir sıralamadır: 3'ten 7'ye çıkmak düşmek demektir. Kartın yanındaki ok bunu bildiği için kırmızıya döner.

**Search Console'daki toplamla aynı mı?** Evet, aynı rapordan okunur. Fark görürseniz tarih aralığına bakın; Search Console'da bugünü de içeren bir aralık seçilmiş olabilir.

**Denetim kartı Google'ın dizinini mi gösteriyor?** Hayır. Denetim, uygulamanın kendi tarayıcısının sitede bulduklarıdır. Google'ın bir sayfayı dizine alıp almadığı denetim ekranındaki **Dizin durumu** sekmesinde görünür.

**Organik trafik kartı görünmüyor.** Proje ayarlarında Google Analytics bağlı değildir. Bağlamak isteğe bağlıdır; Search Console tek başına da yeter.

## Sınırlar

Panel arama hacmi, backlink ya da rakip sırası göstermez; bu veriler uygulamada yoktur. Sayılar Google'ın verdiği kadardır: çok az aranan sorgular Search Console'da gizlenir, Analytics çerez onayına bağlı olarak eksik ölçebilir. Panel bir özet ekranıdır; satır satır incelemek için ilgili ekrana geçersiniz.

<!-- Kaynaklar: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/server/features/gsc/searchPerformanceReport.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
