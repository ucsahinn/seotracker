---
title: Yardım
description: Bir şey ters giderse önce buraya bakın. Kurulumunuzu kontrol eder, sık sorunların çözümünü gösterir ve sorun bildirirken göndereceğiniz dosyayı hazırlar.
screen: Yardım
route: /support
updated: 2026-10-22
---

Bir şey ters giderse ilk buraya bakın. Bu ekran kurulumunuzu kontrol eder, eksiği söyler ve sizi doğru ayara götürür.

## Ekranda neler var

**Hızlı işlemler.** Üstteki düğmeler:

- **Durumu yeniden kontrol et**: aşağıdaki kartı tazeler.
- **Tanılama paketi indir**: sorun bildirirken göndereceğiniz dosyayı indirir. İçinde gizli değer yoktur.
- **Belgeleri aç**: GitHub'daki belgeleri açar.
- **Sürüm notları**: Ayarlar'daki sürüm notlarına gider.
- **Kurulum istemini kopyala**: yapay zekâ asistanınıza (uygulamada "ajan") yapıştıracağınız kurulum metnini kopyalar.
- **Ajan kurulumu**: asistan bağlantısı ekranına gider.

**Kurulumunuzun durumu.** Kart dört şeye bakar: **Giriş ve erişim**, **Google girişi**, **PageSpeed anahtarı**, **Veritabanı**. Üstte "Her şey yolunda." ya da "N şey dikkat istiyor." yazar. Altında sürüm satırı ("Sürüm X, güncel." ya da "yeni sürüm Y var") ve son kontrol zamanı görünür. Sorunlu satırın yanındaki düğme sizi ilgili ayara götürür: **Ayarları aç** ya da **Anahtar gir**. **Özeti kopyala** kartın metnini panoya alır.

**Projeler.** Her projenin Search Console ve Analytics bağlantısının durumu görünür. **Bağlantıları aç** sizi proje ayarlarına götürür.

**Sık sorunlar.** Beş açılır başlık var: sayfa açılmıyor, adres numarası (port) dolu, asistan bağlanamıyor (401), PageSpeed sınırı, sorgu verisi yok. Her birinde ne yapacağınız ve ilgili ayarın bağlantısı yazar.

**Google ve sistem sınırları.** **Sınırları göster** deyince Google'ın günlük sınırlarında şu an nerede olduğunuzu görürsünüz.

**Alt liste.** Kayıt dosyalarına ve sağlık adresine (`/api/health`) giden kısayollar var. Windows paketinde kayıtları görev çubuğu menüsündeki **Günlükleri aç** ile açarsınız. Docker'da **Komutu kopyala** ile verilen komutu kullanırsınız.

## Nasıl kullanılır

1. Bir şey çalışmıyorsa önce bu ekranı açın ve karttaki uyarıyı okuyun.
2. Uyarının yanındaki düğmeye basın, sizi doğru ayara götürür. Ayarı yapın, geri dönüp **Durumu yeniden kontrol et** deyin.
3. Kart "Her şey yolunda." diyor ama sorun sürüyorsa **Sık sorunlar** başlıklarına bakın.
4. Yine çözülmezse **Tanılama paketi indir** deyin ve dosyayı GitHub'daki sorun kaydına ekleyin. Windows paketinde görev çubuğu menüsündeki **Sorunu bildir (GitHub)** aynı işi tek tıkla yapar.

## Sık sorulanlar

**"Google girişi" satırı neden sarı?** Henüz Google erişim anahtarı girilmemiştir. Google bağlanmadan bu satır sarı kalır. Google'a bağlanma kılavuzunu izleyin.

**"Giriş ve erişim" satırında "parolasız tek kullanıcı" yazıyor.** Bu normaldir. Uygulama yalnızca kendi bilgisayarınızdan açılır. Dışarıya açmak isterseniz önüne kendi şifreli girişinizi koymanız gerekir.

**Tanılama paketinde ne var?** Sürüm, kurulum kontrolleri, tablo sayıları ve son denetimlerin özeti. Google anahtarları, şifreler ve kişisel veriler yoktur.

## Sınırlar

Bu ekran yalnızca kurulumun kendisini kontrol eder. Sitenizdeki bir sorunu bulmak için Site denetimi, Google tarafındaki bir sorunu görmek için Dizin durumu ekranına bakın.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
