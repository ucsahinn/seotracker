---
title: Sürüm notları
description: seowatcher 2.4.2'de neler değişti. Windows'ta tek dosyayla kurulum, kendini güncelleyen uygulama, sade ekranlar ve altı dilde site.
updated: 2026-10-23
---

Son sürüm **2.4.2**, 23 Ekim 2026. Güncellerken veriniz korunur. Windows paketi yeni sürümü kendisi kurar.

## Öne çıkanlar

- **Temiz bilgisayarda da açılır.** Eksik Windows bileşeni kurulumla birlikte gelir, uygulama ilk seferde çalışır.
- **Kendini günceller.** Yeni sürümü indirir, doğrular ve sessizce kurar. Görev çubuğundaki **Güncelle** maddesiyle istediğiniz an kendiniz de güncelleyebilirsiniz.
- **Daha sade ekranlar.** Verisi olmayan her ekran tek bir sonraki adımı gösterir. Menüler ve metinler Türkçe yeniden yazıldı.
- **Yeni görünüm.** Siyah zemin, turuncu vurgu ve göz logosu. Uygulama ve site artık aynı görünür.

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
