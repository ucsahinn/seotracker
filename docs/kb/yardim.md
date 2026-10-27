---
title: Yardım
description: Bir şey ters giderse önce buraya bakın. Kurulumunuzu kontrol eder, sık sorunların çözümünü gösterir ve sorun bildirirken göndereceğiniz dosyayı hazırlar.
screen: Yardım
route: /support
updated: 2026-10-27
---

Bir şey ters giderse ilk buraya bakın. Bu ekran kurulumunuzu kontrol eder, eksiği söyler ve sizi doğru ayara götürür.

## Ekranda neler var

**Hızlı işlemler.** Üstteki düğmeler:

- **Durumu yeniden kontrol et**: aşağıdaki kartı tazeler.
- **Tanılama paketi indir**: sorun bildirirken göndereceğiniz dosyayı indirir. İçinde gizli değer yoktur.
- **Kılavuzu aç**: seowatcher.io'daki kılavuzu açar.
- **seowatcher.io**: uygulamanın sitesini açar. İndirme sayfası ve kılavuz oradadır.
- **Sürüm notları**: ayrı Sürüm notları ekranını açar (`/release-notes`).
- **Ajan kurulumu**: asistan bağlantısı ekranına gider.

**Uygulamanın durumu.** Kart yalnızca bu kurulumun erişim, Google bağlantı ayarı, PageSpeed anahtarı, çalışma ortamı ve veritabanı kontrollerini gösterir. Başarılı sonuç sitenizin hatasız olduğunu veya Google verisinin güncel olduğunu kanıtlamaz. Okunamayan bir ayar başarı sayılmaz; uyarıyı okuyup **Durumu yeniden kontrol et** deyin. Sürüm satırı ve son kontrol zamanı sonuçların ne zaman alındığını gösterir. **Özeti kopyala** bu durumu metin olarak kopyalar. Proje bağlantıları **Bağlantıları aç** ile yönetilir.

**Adres numarası (port) uyarısı.** Windows paketi 3001 numarasını başka bir program tutarken başka bir numarada açılırsa (örneğin eski bir Docker kopyası 3001'i kullanıyorsa), uygulamanın her ekranında üstte sarı bir şerit çıkar: "seowatcher bu sefer 3002 numarasında çalışıyor çünkü 3001 başka bir program tarafından kullanılıyor (ör. eski bir Docker kopyası). Google bağlantısı 3001 için ayarlandı; o programı kapatıp seowatcher'ı yeniden başlatın." Şerit, görev çubuğundaki bildirimi kaçırmış olabilirsiniz diye vardır. Google ile giriş 3001 adresine döner ve uygulamayı 3002'de açtıysanız hata verir. Şeridin sağındaki kapat düğmesi onu bu sekme için gizler. Aynı cümle **Uygulamanın durumu** kartında da yazar. Çözmek için 3001'i tutan programı kapatın, sonra görev çubuğu menüsünden **Yeniden başlat** deyin. Uygulama 3001'e döner ve şerit kaybolur. Başka bir program kullanmıyorsanız bir sonraki açılışta zaten 3001'e döner.

**Projeler.** Her projenin Search Console ve Analytics bağlantısının durumu görünür. **Bağlantıları aç** sizi proje ayarlarına götürür.

**Sık sorunlar.** Altı açılır başlık var: sayfa açılmıyor ya da uygulama kapalı, adres numarası (port) dolu, ajanım bağlanamıyor (401), hız ölçümü yarım kalıyor (429), sorgu verisi yok ve bir ayarı değiştirdim, uygulama görmüyor. Her birinde ne yapacağınız ve ilgili ayarın bağlantısı yazar.

**Google ve sistem sınırları.** **Sınırları göster** deyince Google'ın günlük sınırlarında şu an nerede olduğunuzu görürsünüz.

**Alt liste.** Kayıt dosyalarına ve sağlık adresine (`/api/health`) giden kısayollar var. Windows paketinde kayıtları görev çubuğu menüsündeki **Günlükleri aç** ile açarsınız. Docker'da **Komutu kopyala** ile verilen komutu kullanırsınız.

## Nasıl kullanılır

1. Bir şey çalışmıyorsa önce bu ekranı açın ve karttaki uyarıyı okuyun.
2. Uyarının yanındaki düğmeye basın, sizi doğru ayara götürür. Ayarı yapın, geri dönüp **Durumu yeniden kontrol et** deyin.
3. Kurulum kontrolleri başarılı olduğu halde sorun sürüyorsa **Sık sorunlar** başlıklarına ve ilgili proje ekranına bakın.
4. Yine çözülmezse **Tanılama paketi indir** deyin ve dosyayı GitHub'daki sorun kaydına ekleyin. Windows paketinde görev çubuğu menüsündeki **Sorunu bildir (GitHub)** aynı işi tek tıkla yapar.

## Sık sorulanlar

**"Google girişi" satırı neden sarı?** Henüz Google erişim anahtarı girilmemiştir. Google'a bağlanana kadar bu satır sarı kalır. Google'a bağlanma kılavuzunu izleyin.

**"Giriş ve erişim" satırında "parolasız tek kullanıcı" yazıyor.** Bu normaldir. Uygulama yalnızca kendi bilgisayarınızdan açılır. Dışarıya açmak isterseniz önüne kendi şifreli girişinizi koymanız gerekir.

**Tanılama paketinde ne var?** Sürüm, kurulum kontrolleri, tablo sayıları, son 25 denetimin aşama ve hata özetleri bulunur. PageSpeed hataları URL'ler çıkarılarak özetlenir. Gizli anahtarlar ve parolalar eklenmez; proje adları, alan adları ve Google mülk kimlikleri yer alabilir. Göndermeden önce dosyaları inceleyin.

## Sınırlar

Bu ekran yalnızca kurulumun kendisini kontrol eder. Sitenizdeki bir sorunu bulmak için Site denetimi, Google tarafındaki bir sorunu görmek için Dizin durumu ekranına bakın.

## Hangi ekrana gitmeli?

[Panel](/docs/panel/) seçili projenin veri ve kurulum özetini gösterir. [Fırsatlar](/docs/firsatlar/) Search Console verisinden yapılacak işleri seçmenize yardımcı olur. [Sıralama takibi](/docs/siralama-takibi/) kaydedilen kelimelerin Google verisindeki ortalama konumunu izler; canlı arama sonucu değildir. Veri eksikse önce proje bağlantılarını, tarih aralığını ve ekrandaki veri kapsamı uyarısını kontrol edin. Yardım ekranındaki kurulum sonucu bu raporları doğrulamaz.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/quotas/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
