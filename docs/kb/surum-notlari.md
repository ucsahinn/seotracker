---
title: Sürüm notları
description: seowatcher 0.6.0 Alpha — canlı duyurular, puanlı sonraki adımlar ve daha kapsamlı ajan raporları.
updated: 2026-10-25
---

Son sürüm **0.6.0 Alpha**, 25 Ekim 2026. Güncellerken veriniz korunur.

2.x serisinden 0.x.x Alpha serisine ilk geçiş için yeni kurulum dosyasını elle çalıştırın; eski otomatik güncelleyici küçük numarayı yeni sürüm olarak tanımaz.

## 0.6.0 Alpha

- Canlı Türkçe ve İngilizce duyurular uygulamadaki Duyurular ekranında görünür. Yönetim ekranından hazırlayıp yayımlayabilirsiniz.
- Panodaki Sıradaki adımlar, Google bağlantıları, güncel denetim, proje bilgisi ve ajan kurulumuna göre görevleri ve hazırlık puanını gösterir. Bu puan SEO başarısını ölçmez.
- Ajan raporları denetim, Search Console, fırsatlar, sıralama geçmişi, kayıtlı kelimeler, Analytics, dizin ve site haritası verilerine bakarak iyileştirme adımları sunar.
- Uygulama menüsündeki seowatcher logosu seowatcher.io sitesini açar.

## 0.5.0 Alpha

- Arayüzü Türkçe veya İngilizce kullanabilirsiniz; sayı ve tarihler seçtiğiniz dile uyar.
- Bildirim merkezi denetimleri, güncellemeleri, Google bağlantısını ve raporları takip eder. Ses ve masaüstü bildirimleri ayrı ayarlanır.
- Sürüm notları sol menüde, Bildirimler’in üstünde yer alır. Renkli etiketler her sürümün yeniliklerini ve düzeltmelerini gösterir.
- Windows açılışında çalışma ve otomatik güncelleme kurulumu Ayarlar → Windows bölümünden açılıp kapatılabilir.
- Denetim sırasında geçen süreyi ve bitiş özetini görebilir, her ekranın başlığından ilgili kılavuza ulaşabilirsiniz.
- Mobil proje formundaki ülke listesi ve küçük pencerelerdeki yardım açıklamaları artık kesilmez. Escape önce ülke listesini kapatır, form açık kalır.
- Aynı anda yapılan dizin kontrollerinde günlük hak daha doğru kullanılır; bir sorgu başarısız olsa da başarılı sonuçlar korunur.

## 0.4.3 Alpha — 2026-10-22

## Öne çıkanlar

- **Temiz bilgisayarda da açılır.** Eksik Windows bileşeni kurulumla birlikte gelir, uygulama ilk seferde çalışır.
- **Kendini günceller.** Yeni sürümü indirir, doğrular ve sessizce kurar. Görev çubuğundaki **Güncelle** maddesiyle istediğiniz an kendiniz de güncelleyebilirsiniz.
- **Daha sade ekranlar.** Verisi olmayan her ekran tek bir sonraki adımı gösterir. Menüler ve metinler Türkçe yeniden yazıldı.
- **Yeni görünüm.** Siyah zemin, turuncu vurgu ve göz logosu. Uygulama ve site artık aynı görünür.
- Ajan kurulumunda ilk kez kuranlar için "Sıfırdan kurulum" en üstte.
- Güncelle maddesi kontrol, indirme yüzdesi ve kurulum aşamasını gösterir.

## Windows

- **Temiz bilgisayarda açılış.** Kurulum dosyası Microsoft Visual C++ çalışma zamanını taşır, eksikse bir kez izin isteyip kurar.
- **Güncelle.** Görev çubuğu menüsünde her zaman durur. Yeni sürüm varsa kurar, yoksa "Güncel" yazar.
- **Kurulumu onar.** Geçici dosyaları siler, paketi kontrol eder ve uygulamayı yeniden açar.
- **Sorunu bildir.** Hazır bir sorun kaydı açar. Kullanıcı adı, site adları ve e-postalar maskelenir.
- **Sürümlü kurulum dosyası.** Dosya adı ve kurulum sihirbazı kurulan sürümü yazar.

## Uygulama

- **Yan menü.** İki grup var: "Arama ve site" ve "Ajan". Yardım ve Ayarlar altta durur.
- **Ajan kurulumu.** Claude Code, Codex ya da başka bir asistan için tek kart ve tek kopyalama düğmesi.
- **Ayarlar.** Google bağlantısı üç adımda anlatılır. Tema varsayılan olarak koyudur.
- **İki kurulum yolu da anlatılır.** Yardım ve ajan yönergeleri Windows'ta görev çubuğunu, Docker'da `docker compose` komutlarını anlatır.

## Site ve kılavuz

- **Altı dil.** Türkçe, İngilizce, Almanca, Fransızca, İtalyanca ve Portekizce. Dil menüsünde her dilin bayrağı var.
- **Sade anlatım.** Cümleler kısa, her teknik terim ilk geçtiği yerde açıklanır.

## Düzeltmeler

- Sitedeki indirme bağlantısı yanlış sürüm etiketini gösteriyordu.
- Codex kurulum komutu Git Bash'te parolanın sonundaki satır sonu karakterini silmiyordu.
- Site denetimindeki bir kartta sayılar kartın dışına taşıyordu.
- Yalnızca hizmet hesabıyla bağlı kurulumda panel yanlışlıkla "Google erişim anahtarı eksik" diyordu.
- Telefonda site denetimi ve Fırsatlar ekranları yana taşıyordu.

Tüm geçmiş GitHub'daki [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) dosyasında.
