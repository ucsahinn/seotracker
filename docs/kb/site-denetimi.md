---
title: Site denetimi
description: Uygulamanın kendi tarayıcısı sitenizi sayfa sayfa gezer, 95 kurala göre bakar, bulduğunu önem sırasına koyar ve her bulgunun altına ne yapacağınızı yazar.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-22
---

Site denetimi, Google'a sormadan sitenizde neyin bozuk olduğunu söyleyen ekrandır. Uygulama kendi tarayıcısıyla sayfalarınızı gezer: kırık bağlantı, yönlendirme zinciri, eksik başlık, çelişen canonical, hreflang hatası, robots.txt ve site haritası sorunları, isterseniz sayfa hızı. Sonuç tek bir puan, önem sırasına konmuş bir bulgu listesi ve her bulgu için düzeltme adımıdır. Ekranın açıklaması da bunu söyler: "Sitenizi kendi tarayıcımızla tarar; bulduğu sorunları önem sırasına göre listeler."

## Ekranda neler var

**Yeni denetim başlat kartı.** Üç alan. **Taranacak site adresi**: projenin alan adıyla dolu gelir. **Kaç sayfa taransın?** En az 10, en fazla 10.000, varsayılan 50; sınırı aşan sayfalar taranmaz. 500'ün üstünde bir sayı yazarsanız "N sayfa taranacak. Bunda bir sakınca yok ama biraz zaman alabilir. Devam edilsin mi?" diye sorar. **Sayfa hızını da ölç** anahtarı varsayılan olarak kapalıdır; açarsanız her sayfa Google Lighthouse ile telefonda ve bilgisayarda ölçülür, yani sayfa başına iki ölçüm. Kart altında süre tahmini yazar; PageSpeed anahtarınız yoksa hız ölçümü en fazla 50 sayfayla sınırlanır ve kart "Tüm sayfaları ölçmek için Ayarlar'dan ücretsiz bir PageSpeed anahtarı ekleyin." der. Yanındaki kota kartı PageSpeed ve URL Denetimi sınırlarını gösterir.

**Önceki denetimler.** Sütunlar: **Tarih**, **URL**, **Durum** (Sürüyor, Bitti, Başarısız), **Sayfa**, **Kritik**, **Uyarı**, **Lighthouse**. Kritik ve uyarı sayıları yüz sayfa başına verilir, toplam parantezde; böylece 50 sayfalık bir denetimle 500 sayfalık bir denetim karşılaştırılabilir. Yanındaki ok, aynı siteye ait bir önceki denetime göre değişimi gösterir. Üstteki küçük grafik "Denetim başına sayfa yoğunluğu" eğilimidir. Satır menüsü: **Görüntüle**, **Aynı ayarlarla yeniden başlat**, **Denetimi sil** (sayfalar, sorunlar ve hız ölçümleri de silinir, geri alınamaz).

**İlerleme kartı.** Denetim sürerken aşamalar görünür: **Keşif**, **Taranıyor**, **Hız ölçümü**, **Tamamlanıyor**. "~X kaldı" tahmini yüzde 5 tamamlandıktan sonra çıkar. Altında "Taranan sayfalar (n)" listesi canlı akar; durum üç saniyede bir yenilenir.

**Denetim ayrıntısı.** Üstte alan adı, durum rozeti ve "Site denetimi · 17 gün önce" gibi bir zaman. Tarama eksik kaldıysa sarı bir uyarı: "Denetim bu siteyi tamamen tarayamadı." (bot koruması engelledi), "Denetim N sayfadan sonra erken durdu.", "N sayfada engellendik.", "Site N sayfada istek sınırı uyguladı." Sonuçlar yine de gösterilir. **Raporu indir** düğmesi tek dosyalık HTML raporu hem indirir hem Raporlar ekranına kaydeder; denetim sürerken çalışmaz.

**Site puanı kartı.** 0 ile 100 arası bir sayı, halka ve bir cümle: "Çok iyi. Birkaç küçük iş kaldı." gibi. Altında en çok puan kazandıracak üç iş "+N puan" ile listelenir.

**İki grafik.** "En çok sayfayı hangi sorun etkiliyor?": sorun türü başına etkilenen sayfa sayısı, en çok sekiz çubuk; bir çubuğa tıklayınca liste daralır. "Sorunlar ne kadar ciddi?": bulgu sayısının kritik, uyarı ve bilgi dilimlerine dağılımı. Dilim açıklamaları: Kritik "Google siteyi anlayamıyor", Uyarı "Sıralamayı ve tıklamayı düşürür", Bilgi "Küçük iyileştirme fırsatları".

**Dört sekme.** **Sorunlu sayfalar (n)**: bulgular, kritikten bilgiye. Her bulgu kartı açılınca önce "neden önemli" paragrafı, sonra **Nasıl düzeltilir?** kutusu, etkilenen sayfalar (onar onar, 20'den fazlaysa arama kutusu) ve üç düğme: **URL'leri kopyala (n)**, **CSV indir**, **Sayfalar sekmesinde göster**. Siteyi bütünüyle ilgilendiren bulgularda "Bu sorun tek bir sayfayla değil, sitenin tamamıyla ilgili." notu çıkar. **Sayfalar (n)**: taranan her sayfa; sütunlar URL, Durum, Sorun, Başlık, H1, Kelime, Görsel, Bağlantı, Hız, Dizin, Derinlik, Harita; hızlı filtreler **Dizine kapalı**, **Yavaş** (1 saniyeden uzun), **Alt metni eksik**, **Site haritasında yok**. **Dizin durumu**: Google'ın her sayfa için kendi cevabı, ayrı kılavuzda anlatılır. **Hız (n)**: yalnızca hız ölçümü açıksa; sütunlar URL, Cihaz, Durum, Perf, A11y, SEO, LCP, CLS, INP, TTFB, Sorunlar; "Sorunları gör" bağlantısı o sayfanın Lighthouse bulgularını açar.

**Dışa aktarma.** Her sekmenin üstünde **E-Tablolar'a aktar**, **CSV**, **JSON**; satır sayısıyla birlikte ve uygulanan filtrelerle. Sorunlar CSV'sinin sütunları Önem, Sorun, Adres, Ayrıntı, Nasıl düzeltilir.

## Nasıl kullanılır

1. İlk denetimde sayfa sayısını 50'de bırakın, hız ölçümünü kapalı tutun. Bir iki dakikada biter ve sitenin genel halini gösterir.
2. Puan kartındaki üç "+N puan" maddesiyle başlayın; bunlar en az emekle en çok puan getiren işlerdir. Her birine tıklayınca ilgili bulgu kartı açılır.
3. **Sorunlu sayfalar** sekmesinde kritik bulguları bitirmeden uyarılara geçmeyin. Kritik, Google'ın sayfayı görmesini engelleyen sorundur; uyarı, zamanla aşındıran.
4. Bulgu kartındaki **URL'leri kopyala** ile listeyi alıp site yöneticinize ya da ajanınıza verin; **Nasıl düzeltilir?** kutusu teknik olmayan dille yazılmıştır, olduğu gibi iletebilirsiniz.
5. Düzeltmeleri yaptıktan sonra **Aynı ayarlarla yeniden başlat** deyin. Panel'deki "Son denetimde yeni çıkanlar" ve "Düzelenler" kartı neyin kapandığını söyler.
6. Sitenin tamamını görmek istediğinizde sayfa sayısını yükseltin. Hız ölçümünü haftada bir, önemli sayfalar için açmak yeterlidir; her sayfa yaklaşık on saniye ve Google kotası harcar.

## Sayılar nasıl hesaplanır

**Puan.** Her sorun türünün bir ağırlığı vardır: kritik 40, uyarı 15, bilgi 3. Türün maliyeti ağırlık çarpı (0,15 artı 0,85 çarpı etkilenen sayfa payı) ile bulunur; pay, etkilenen sayfa sayısının taranan sayfaya bölümüdür. Sitenin tamamını ilgilendiren bulgular (robots.txt, site haritası) tam pay sayılır. Puan, 100 eksi maliyetlerin toplamıdır, aşağı yuvarlanır ve sıfırın altına inmez. Tek bir bulgu bile varsa puan en fazla 99 olur; 100 yalnızca hiç bulgu olmayan sitede görünür. Bu yüzden "+0,5 puan" tek bir sayfadaki küçük bir bilgi bulgusudur, "+40 puan" ise her sayfayı etkileyen kritik bir sorun.

Puan dilimleri: 90 ve üstü çok iyi, 70 ve üstü iyi, 50 ve üstü orta, altı zayıf. Halka 90'da yeşil, 50 ile 89 arasında sarı, altında kırmızıdır.

**Tarama.** Aynı anda en fazla iki istek, saniyede bir istekle başlar. Site 429 (çok fazla istek) dönerse 30 saniye bekler, her seferinde süreyi ikiye katlar, üç kez dener; toplam bekleme 30 dakikayı geçerse tarama durur ve "Tarama erken durdu: istek sınırı" bulgusu yazar. robots.txt'ye uyar; yalnızca aynı alan adındaki ve izin verilen bağlantıları kuyruğa alır. Site haritasını üç seviye derine kadar, en fazla 300 dosya okur. Kullanıcı aracısı "seotracker-audit/1.0" olarak görünür; güvenlik duvarınızda buna izin verirseniz "engellendik" uyarısı kalkar.

**Hız ölçümü.** Beşer sayfalık dalgalar halinde, dalga başına yaklaşık 50 saniye; 212 sayfalık bir sitede ölçülen gerçek süre 35 dakikaydı. Google'ın dakikalık sınırına takılırsa bekler ve yeniden dener; günlük kota biterse ölçüm durur, o ana kadarki sonuçlar kalır. Bulgular telefon ölçümünden üretilir. Eşikler: ana içerik 4 saniyeden geç (LCP), içerik kayması 0,25'ten çok (CLS), tıklamaya yanıt 500 milisaniyeden geç (INP), Lighthouse SEO puanı 90'ın altı.

**Takılan denetim.** 15 dakikadan uzun "Sürüyor" görünen bir denetimi uygulama kontrol eder; süreç yeniden başladıysa ya da 45 dakikadır nabız yoksa denetimi "Başarısız" olarak işaretler ve sebebini yazar. Panel, yedi günden eski denetimi "bayat" sayıp yenisini önerir.

## Sık sorulanlar

**Denetim Google'ın gördüğünü mü gösteriyor?** Hayır. Uygulamanın kendi tarayıcısı sayfayı açar ve HTML'e bakar. Google'ın cevabı **Dizin durumu** sekmesindedir.

**Puan 98 ama hâlâ bulgu var, neden 100 değil?** Tek bir bulgu bile puanı 99'da tutar. 100, hiç bulgusu olmayan sitedir.

**Taranan sayfa sayısı site haritasından az.** Sayfa sınırı dolmuş olabilir; "Kaç sayfa taransın?" değerini yükseltin. Ya da sayfalar birbirine bağlantı vermiyordur; tarayıcı yalnızca bağlantıları izler.

**"Engellendik" uyarısı ne demek?** Sitenizin bot koruması tarayıcıyı durdurmuş. Güvenlik duvarında "seotracker-audit" kullanıcı aracısına izin verin ya da taramayı sitenin IP'sinin tanıdığı bir ağdan yapın.

**Hız ölçümü yarıda kaldı.** Çoğu zaman PageSpeed anahtarı yoktur ya da Google günlük kotası bitmiştir. Ayarlar'daki kota kartı sebebini "Kota doldu", "Dakikalık sınır" ya da "Anahtar yok" diye yazar.

**Aynı anda kaç denetim çalışır?** En fazla üç. İki denetim aynı anda hız ölçerse Google'ın dakikalık sınırını paylaşır ve ikisi de yavaşlar; sırayla çalıştırmak daha hızlıdır.

## Sınırlar

Tarayıcı JavaScript'in sonradan ürettiği içeriği ve tek sayfa uygulamalarının istemci tarafı yönlendirmelerini görmeyebilir. Bir denetim en fazla 10.000 sayfa tarar. Hız ölçümü Google'ın laboratuvar ölçümüdür; gerçek kullanıcı verisi (CrUX) değildir. Denetim, sitenizde hiçbir şeyi değiştirmez; düzeltmeyi siz ya da ajanınız yaparsınız.

<!-- Kaynaklar: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; ProgressCard.tsx; ResultsView.tsx; ResultsTables.tsx; TabIntro.tsx; ScoreCard.tsx; IssueWorkloadChart.tsx; SeverityDonut.tsx; IssueCard.tsx; DownloadReportButton.tsx; export.ts; src/shared/auditScore.ts; src/shared/audit-limits.ts; src/shared/audit-issues/speed.ts; src/server/lib/audit/crawl-window.ts; crawl-throttle.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
