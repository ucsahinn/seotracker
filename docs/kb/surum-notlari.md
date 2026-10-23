---
title: Sürüm notları
description: seowatcher 2.4.1'de neler değişti. Windows'ta tek dosyayla kurulum, kendini güncelleyen uygulama, sade ekranlar ve altı dilde site.
updated: 2026-10-23
---

Son sürüm **2.4.1**, 23 Ekim 2026. Güncellerken veriniz korunur; Windows paketi yeni sürümü kendisi kurar.

## Öne çıkanlar

- **Her bilgisayarda açılır.** Eksik Windows bileşeni kurulumla birlikte gelir; temiz bir bilgisayarda da ilk seferde çalışır.
- **Kendini günceller.** Yeni sürümü indirir, doğrular ve sessizce kurar. Görev çubuğundaki **Güncelle** her zaman bir tık uzakta.
- **Daha sade ekranlar.** Her ekranın boş hali tek bir sonraki adımı gösterir; menü ve metinler doğal Türkçe.
- **Yeni yüz.** Siyah zemin, turuncu vurgu ve göz logosu; uygulama ve site aynı görünür.

## Windows

- **Temiz bilgisayarda açılış.** Kurulum dosyası Microsoft Visual C++ çalışma zamanını taşır, eksikse bir kez izin isteyip kurar.
- **Güncelle.** Görev çubuğu menüsünde her zaman durur. Yeni sürüm varsa kurar, yoksa "Güncel" der.
- **Kurulumu onar.** Geçici dosyaları siler, paketi kontrol eder ve uygulamayı yeniden açar.
- **Sorunu bildir.** Hazır bir sorun kaydı açar. Kullanıcı adı, site adları ve e-postalar maskelenir.
- **Sürümlü kurulum dosyası.** Dosya adı ve kurulum sihirbazı kurulan sürümü yazar.

## Uygulama

- **Yan menü.** Gruplar "Arama ve site" ve "Ajan"; Yardım ve Ayarlar altta.
- **Ajan kurulumu.** Claude Code, Codex ya da diğerleri için tek kart ve tek kopyala düğmesi.
- **Ayarlar.** Google bağlantısı üç adımda anlatılır; tema varsayılan olarak koyu.
- **İki kurulumu da tanır.** Yardım ve ajan yönergeleri Windows'ta görev çubuğunu, Docker'da `docker compose` komutlarını anlatır.

## Site ve kılavuz

- **Altı dil.** Türkçe, İngilizce, Almanca, Fransızca, İtalyanca ve Portekizce; bayraklı dil menüsü.
- **Sade anlatım.** Kısa cümleler, her teknik terim ilk geçtiği yerde açıklanır.

## Düzeltmeler

- Sitedeki indirme bağlantısı yanlış sürüm etiketini gösteriyordu.
- Codex kurulum komutu Git Bash'te parolanın sonundaki satır sonunu silmiyordu.
- Site denetimindeki bir kartta sayılar kartın dışına taşıyordu.

Tüm geçmiş GitHub'daki [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) dosyasında.
