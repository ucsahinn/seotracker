---
title: Site denetimi
description: Uygulama sitenizi sayfa sayfa gezer, 95 kurala göre bakar ve sorunları önem sırasına koyar. Her sorunun yanında ne yapacağınız yazar.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-22
---

Bu sayfada sitenizdeki sorunları nasıl bulup düzelteceğinizi öğrenirsiniz.

Uygulama sitenizi kendi tarayıcısıyla gezer (sayfaları tek tek açıp okuyan program). Kırık bağlantıları, eksik başlıkları ve yavaş sayfaları arar. Sonunda bir puan ve önem sırasına konmuş bir sorun listesi alırsınız. Her sorunun altında nasıl düzelteceğiniz yazar.

## Ekranda neler var

**Yeni denetim başlat kartı.** Üç alan var.

- **Taranacak site adresi**: projenizin alan adı hazır gelir.
- **Kaç sayfa taransın?**: en az 10, en çok 10.000, varsayılan 50. 500'den büyük sayı yazarsanız uygulama onay ister.
- **Sayfa hızını da ölç**: varsayılan olarak kapalıdır. Açarsanız her sayfa telefonda ve bilgisayarda ölçülür. Ölçümü Google Lighthouse (Google'ın sayfa ölçüm aracı) yapar.

PageSpeed anahtarınız (Google'ın hız ölçümü için verdiği ücretsiz kod) yoksa hız ölçümü en çok 50 sayfayla sınırlanır. Tümünü ölçmek için **Ayarlar**'dan ücretsiz bir anahtar ekleyin.

**Önceki denetimler.** Her denetimin tarihi, durumu, sayfa sayısı ve sorun sayıları listelenir. Sorun sayıları yüz sayfa başınadır. Böylece 50 ve 500 sayfalık denetimleri karşılaştırabilirsiniz. Satır menüsündeki **Denetimi sil** her şeyi siler, geri alınamaz.

**Denetim ayrıntısı.** Tarama eksik kalırsa sarı bir uyarı çıkar. Örneğin "Denetim bu siteyi tamamen tarayamadı." (bot koruması engelledi). Sonuçlar yine de gösterilir. **Raporu indir** tek dosyalık HTML raporu indirir ve **Raporlar** ekranına kaydeder.

**Site puanı.** 0 ile 100 arası bir sayı görürsünüz. Altında en çok puan kazandıracak üç iş "+N puan" ile yazar.

**İki grafik.** Biri en çok sayfayı hangi sorunun etkilediğini, öteki sorunların ne kadar ciddi olduğunu gösterir.

**Dört sekme.**

- **Sorunlu sayfalar**: kartı açınca nedeni ve **Nasıl düzeltilir?** kutusunu görürsünüz. Düğmeler: **URL'leri kopyala**, **CSV indir**, **Sayfalar sekmesinde göster**.
- **Sayfalar**: taranan her sayfa. Hızlı filtreler: **Dizine kapalı**, **Yavaş** (1 saniyeden uzun), **Alt metni eksik**, **Site haritasında yok**.
- **Dizin durumu**: Google'ın her sayfa için cevabı. Ayrı kılavuzda anlatılır.
- **Hız**: yalnızca hız ölçümü açıksa görünür.

## Nasıl kullanılır

1. İlk denetimde sayfa sayısını 50'de bırakın. Hız ölçümünü kapalı tutun. Bir iki dakikada biter.
2. Puan kartındaki üç "+N puan" işiyle başlayın. En az emekle en çok puanı onlar getirir.
3. **Sorunlu sayfalar** sekmesinde önce kritik sorunları bitirin. Kritik sorun Google'ın sayfayı görmesini engeller.
4. **URL'leri kopyala** ile listeyi alıp site yöneticinize verin. **Nasıl düzeltilir?** kutusunu olduğu gibi iletebilirsiniz.
5. Düzeltince **Aynı ayarlarla yeniden başlat**'ı tıklayın. Panelde "Düzelenler" kartı neyin kapandığını gösterir.
6. Hız ölçümünü haftada bir, önemli sayfalar için açın. Her sayfa yaklaşık on saniye ve Google kotası harcar.

## Sayılar nasıl hesaplanır

**Puan.** Her sorunun ağırlığı var: kritik 40, uyarı 15, bilgi 3. Sorun ne kadar çok sayfayı etkilerse puandan o kadar çok düşer. Puan 100'den başlar, sıfırın altına inmez. Tek bir sorun bile varsa puan en çok 99 olur.

Dilimler: 90 ve üstü çok iyi, 70 ve üstü iyi, 50 ve üstü orta, altı zayıf.

**Tarama.** Uygulama sitenizi yormaz: aynı anda en çok iki istek gönderir. Site "çok fazla istek" (429) derse bekler. Toplam bekleme 30 dakikayı geçerse tarama durur.

**Hız ölçümü.** 212 sayfalık bir sitede denetimin tamamı 35 dakika sürdü; bunun yaklaşık 24 dakikası hız ölçümüydü. Günlük kota biterse ölçüm durur, o ana kadarki sonuçlar kalır. Şu durumlarda sorun yazılır:

- Ana içerik 4 saniyeden geç görünür (LCP).
- İçerik 0,25'ten çok kayar (CLS).
- Tıklamaya yanıt 500 milisaniyeden geç gelir (INP).
- Lighthouse SEO puanı 90'ın altındadır.

## Sık sorulanlar

**Denetim Google'ın gördüğünü mü gösterir?** Hayır. Uygulamanın tarayıcısı sayfayı kendi okur. Google'ın cevabı **Dizin durumu** sekmesindedir.

**Puan 98, neden 100 değil?** Tek bir sorun bile puanı 99'da tutar.

**"Engellendik" uyarısı ne demek?** Sitenizin bot koruması tarayıcıyı durdurmuş. Güvenlik duvarında "seotracker-audit" adına izin verin.

**Hız ölçümü yarıda kaldı.** Genelde PageSpeed anahtarı yoktur ya da günlük kota bitmiştir. **Ayarlar**'daki kota kartı nedeni yazar.

**Aynı anda kaç denetim çalışır?** En çok üç. Hız ölçen iki denetim birbirini yavaşlatır.

## Sınırlar

Tarayıcı, JavaScript'in (sayfada çalışan kod) sonradan eklediği içeriği görmeyebilir. Bir denetim en çok 10.000 sayfa tarar. Hız ölçümü Google'ın laboratuvar ölçümüdür, gerçek ziyaretçi verisi değildir. Denetim sitenizde hiçbir şeyi değiştirmez. Düzeltmeyi siz ya da asistanınız yaparsınız.

<!-- Kaynaklar: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; ProgressCard.tsx; ResultsView.tsx; ResultsTables.tsx; TabIntro.tsx; ScoreCard.tsx; IssueWorkloadChart.tsx; SeverityDonut.tsx; IssueCard.tsx; DownloadReportButton.tsx; export.ts; src/shared/auditScore.ts; src/shared/audit-limits.ts; src/shared/audit-issues/speed.ts; src/server/lib/audit/crawl-window.ts; crawl-throttle.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
